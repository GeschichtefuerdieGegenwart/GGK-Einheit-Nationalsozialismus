#!/usr/bin/env python3
"""Rauchprüfung für Arbeitsblätter (Blatt-Rahmen): lädt die Seite per file://, geht alle Aufträge durch, gibt »auf Ansage« frei,
prüft Konsole, fremde Anfragen, Querlauf, Zielflächen und macht Bildschirmfotos.
Aufruf: python3 tools/pruef/blatt_rauch.py <seite.html> [--breite 1180] [--hoehe 820] [--fotos ordner] [--stand datei.json]
Ein Stand (JSON) wird vor dem Laden in localStorage gelegt, damit auch Seiten sichtbar sind, die erst nach einer Antwort öffnen.
Seit 18.11.2026 zusätzlich: wirksame Schriftgröße in Schaubildern (Schrift × gezeigte Breite ÷ viewBox), eine Adresse – eine Seite (Deckblatt, Anker, »Weitermachen«),
Selbsttests überspringbar, private Felder nicht in der Zusammenfassung (--privat), Zeitdiagnose am vollen Stand (--voll)."""
import sys, json, pathlib, argparse, asyncio
from playwright.async_api import async_playwright
ap = argparse.ArgumentParser(); ap.add_argument('seite'); ap.add_argument('--breite', type=int, default=1180); ap.add_argument('--hoehe', type=int, default=820)
ap.add_argument('--fotos'); ap.add_argument('--stand'); ap.add_argument('--nur'); ap.add_argument('--pdf', action='store_true')
ap.add_argument('--voll', action='store_true', help='Felder füllen und Vergleiche öffnen: Zeitdiagnose am vollen Stand (150 Wörter je Minute)')
ap.add_argument('--privat', help='Pfade privater Felder, mit Komma getrennt: dürfen in der Zusammenfassung nicht erscheinen'); a = ap.parse_args()
URL = pathlib.Path(a.seite).resolve().as_uri()
async def main():
    fehler, fremd, ok, bad, fehlend = [], [], 0, [], []
    def pr(bed, text):
        nonlocal ok
        if bed: ok += 1
        else: bad.append(text)
    async with async_playwright() as p:
        b = await p.chromium.launch(); ctx = await b.new_context(viewport={'width': a.breite, 'height': a.hoehe}, device_scale_factor=1)
        pg = await ctx.new_page()
        pg.on('console', lambda m: (fehlend if 'ERR_FILE_NOT_FOUND' in m.text else fehler).append(m.text) if m.type == 'error' else None)
        pg.on('pageerror', lambda e: fehler.append('pageerror: ' + str(e)))
        pg.on('request', lambda r: fremd.append(r.url) if not r.url.startswith(('file:', 'data:', 'about:', 'blob:')) else None)
        await pg.goto(URL)
        if a.stand:
            st = json.loads(pathlib.Path(a.stand).read_text('utf-8'))
            await pg.evaluate("([k, v]) => localStorage.setItem(k, JSON.stringify(v))", [await pg.evaluate("L.key"), st]); await pg.reload()
        await pg.wait_for_timeout(250)
        auf = await pg.evaluate("L.blatt.map(a => ({ id:a.id, nr:a.nr, frei:a.frei || 'offen', min:a.min }))")
        pr(await pg.locator('#reg ol li').count() == len(auf), 'Register zeigt nicht alle Aufträge')
        pr('Deckblatt' not in (await pg.title()), 'Titel')
        if a.fotos: pathlib.Path(a.fotos).mkdir(parents=True, exist_ok=True); await pg.screenshot(path=f'{a.fotos}/00-deckblatt.png', full_page=True)
        masse, lese, kleinst = {}, [], 99
        for i, x in enumerate(auf):
            if a.nur and x['id'] not in a.nur.split(','): continue
            await pg.evaluate("id => geh(id)", x['id']); await pg.wait_for_timeout(120)
            zu = await pg.locator('.ab-zu').count()
            if zu:
                await pg.locator('[data-freifrage]').click(); await pg.locator('[data-frei]:not([data-frei=""])').click(); await pg.wait_for_timeout(150)
                pr(await pg.locator('.ab-zu').count() == 0, f"{x['nr']}: öffnet nach Freigabe nicht")
            pr(await pg.locator('.ab-h').count() == 1, f"{x['nr']}: Kopf fehlt")
            pr(await pg.locator('#reg button[aria-current]').count() == 1, f"{x['nr']}: Register ohne Standort")
            quer = await pg.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
            pr(quer <= 1, f"{x['nr']}: Querlauf {quer}px")
            klein = await pg.evaluate("""() => [...document.querySelectorAll('#main button, #main a.btn, #main label.haken, #reg button')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.height && (r.height < 43.5 || r.width < 43.5); }).map(e => (e.textContent || e.getAttribute('aria-label') || e.tagName).trim().slice(0, 30) + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height))""")
            pr(not klein, f"{x['nr']}: Zielflächen unter 44 px: {klein[:4]}")
            schrift = await pg.evaluate("""() => { let m = 99, wo = ''; document.querySelectorAll('#main *').forEach(e => { if (!e.offsetParent || !e.childNodes.length) return; if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) return; const f = parseFloat(getComputedStyle(e).fontSize); if (f < m) { m = f; wo = (e.className || e.tagName) + ': ' + e.textContent.trim().slice(0, 30); } }); return [m, wo]; }""")
            pr(schrift[0] >= 11.5, f"{x['nr']}: Schrift {schrift[0]:.1f}px ({schrift[1]})")
            svg = await pg.evaluate("""() => { let m = 99, wo = ''; document.querySelectorAll('#main svg').forEach(s => { const vb = s.viewBox && s.viewBox.baseVal, r = s.getBoundingClientRect(); if (!vb || !vb.width || !r.width) return; const k = r.width / vb.width; s.querySelectorAll('text').forEach(t => { if (!t.textContent.trim()) return; const f = parseFloat(getComputedStyle(t).fontSize) * k; if (f < m) { m = f; wo = t.textContent.trim().slice(0, 30); } }); }); return [m, wo]; }""")
            pr(svg[0] >= 11, f"{x['nr']}: Schrift im Schaubild wirksam nur {svg[0]:.1f}px ({svg[1]})"); kleinst = min(kleinst, svg[0])
            if await pg.locator('#main [data-akt="skip"]').count():
                await pg.locator('#main [data-akt="skip"]').first.click(); await pg.wait_for_timeout(80)
                pr(await pg.locator('#main [data-akt="skip"][aria-pressed="true"]').count() >= 1, f"{x['nr']}: Überspringen greift nicht")
                await pg.locator('#main [data-akt="skip"][aria-pressed="true"]').first.click(); await pg.wait_for_timeout(60)
            if a.voll:
                fuell = """() => { const T = 'Das ist ein Beispielsatz für die Messung im vollen Stand, damit sich alle Vergleiche öffnen und nichts verborgen bleibt.'; const e = [...document.querySelectorAll('#main textarea:not([readonly]):not([disabled]), #main input[type=text]:not([readonly]):not([disabled])')].find(x => !x.value.trim()); if (!e) return false; e.value = e.inputMode === 'decimal' ? '50' : T; e.dispatchEvent(new Event('input', { bubbles:true })); return true; }"""
                for _ in range(60):
                    if not await pg.evaluate(fuell): break
                    await pg.wait_for_timeout(15)
                if x['id'] == 'landkarte':   # Landkarte: einen Eintrag wählen und prüfen, damit Rückmeldung und Blick der Stunde sichtbar sind
                    if await pg.locator('#main [data-prinzip]:not([disabled])').count():
                        await pg.locator('#main [data-prinzip]:not([disabled])').first.click(); await pg.wait_for_timeout(60)
                        for _ in range(6):
                            if not await pg.evaluate(fuell): break
                            await pg.wait_for_timeout(15)
                        if await pg.locator('#main [data-lkpruef]:not([disabled])').count(): await pg.locator('#main [data-lkpruef]').click(); await pg.wait_for_timeout(80)
                        for _ in range(6):
                            if not await pg.evaluate(fuell): break
                            await pg.wait_for_timeout(15)
                for _ in range(10):
                    n = await pg.evaluate("""() => { const b = [...document.querySelectorAll('#main [data-vergleich]:not([disabled])')].find(x => !/ausblenden/.test(x.textContent)); if (b) b.click(); return !!b; }""")
                    await pg.wait_for_timeout(50)
                    if not n: break
                for _ in range(8):
                    n = await pg.evaluate("""() => { const b = [...document.querySelectorAll('#main [data-akt="abrufauf"]:not([disabled])')][0]; if (b) b.click(); return !!b; }""")
                    await pg.wait_for_timeout(40)
                    if not n: break
                w = await pg.evaluate("document.querySelector('#main .ab-teil').innerText.trim().split(/\\s+/).length"); f = await pg.evaluate("document.querySelectorAll('#main .ab-teil textarea, #main .ab-teil input[type=text]').length")
                lese.append((x['nr'], w, f, x['min']))
            h = await pg.evaluate("document.documentElement.scrollHeight"); masse[x['nr']] = h
            if a.fotos: await pg.screenshot(path=f"{a.fotos}/{i+1:02d}-{x['id']}.png", full_page=True)
        if a.pdf:
            import subprocess, tempfile, re
            async def seiten(vor):
                await pg.evaluate(vor); await pg.wait_for_timeout(120); await pg.emulate_media(media='print')
                with tempfile.NamedTemporaryFile(suffix='.pdf') as f:
                    await pg.pdf(path=f.name, format='A4', print_background=True)
                    n = int(re.search(r'Pages:\s+(\d+)', subprocess.run(['pdfinfo', f.name], capture_output=True, text=True).stdout).group(1))
                await pg.emulate_media(media='screen'); return n
            z = [x for x in auf if x['id'] == 'zusammenfassung']
            if z:
                n = await seiten("geh('zusammenfassung')"); pr(n == 2, f'Zusammenfassung druckt {n} Seiten statt 2'); print('  Zusammenfassung:', n, 'Seite(n) A4')
            if await pg.evaluate("!!L.schreib"):
                n = await seiten("(() => { geh((L.blatt.find(a => SEITE_FN[a.id] === schreibauftrag) || {}).id); document.body.classList.add('druck-sb'); })()"); pr(n == 1, f'Schreibblatt druckt {n} Seiten statt 1'); print('  Schreibblatt:', n, 'Seite(n) A4')
                await pg.evaluate("document.body.classList.remove('druck-sb')")
        if a.privat:
            for pf in a.privat.split(','): await pg.evaluate("p => setz(p, 'PRIVATMARKE-XYZ')", pf)
            await pg.evaluate("geh('zusammenfassung')"); await pg.wait_for_timeout(100)
            pr('PRIVATMARKE-XYZ' not in await pg.evaluate("document.querySelector('#main').innerText"), 'Privates Feld erscheint in der Zusammenfassung')
        if len(auf) > 1 and not a.nur:   # eine Adresse, eine Seite
            ziel = auf[1]['id']; await pg.evaluate("id => geh(id)", ziel); await pg.wait_for_timeout(80)
            pr(await pg.evaluate("location.hash") == '#' + ziel, 'Auftrag ohne eigenen Anker in der Adresse')
            pr(await pg.locator('#reg .w-zumdeck').count() == 1, 'Register ohne Weg zum Deckblatt')
            await pg.goto(URL); await pg.reload(); await pg.wait_for_timeout(200)
            pr(await pg.evaluate("S.seite") == 'start', 'Adresse ohne Anker zeigt nicht das Deckblatt')
            pr(await pg.locator('.deck-start .btn.primary, .w-weiter .btn.primary', has_text='Weitermachen').count() >= 1, 'Deckblatt ohne »Weitermachen«')
            await pg.goto(URL + '#' + ziel); await pg.reload(); await pg.wait_for_timeout(200)
            pr(await pg.evaluate("S.seite") == ziel, 'Adresse mit Anker zeigt nicht den Auftrag')
            if a.fotos: await pg.goto(URL); await pg.reload(); await pg.wait_for_timeout(200); await pg.screenshot(path=f'{a.fotos}/99-deckblatt-weiter.png', full_page=False)
        pr(not fehler, f'Konsole: {fehler[:3]}'); pr(not fremd, f'fremde Anfragen: {fremd[:3]}')
        await b.close()
    print(f"{pathlib.Path(a.seite).name} @ {a.breite}x{a.hoehe}: {ok} bestanden, {len(bad)} offen"); [print('  –', x) for x in bad]
    print('  Seitenhöhen:', masse)
    if kleinst < 99: print(f'  Kleinste wirksame Schrift in Schaubildern: {kleinst:.1f}px')
    if lese:
        ges = sum(w for _, w, _, _ in lese); print(f'  Zeitdiagnose am vollen Stand (150 Wörter je Minute): {ges} Wörter = {ges/150:.0f} Min. Lesen · {sum(f for _, _, f, _ in lese)} Felder · geplant {sum(m for _, _, _, m in lese)} Min.')
        print('   ', ' · '.join(f"{nr}: {w} W. = {w/150:.1f} Min., {f} Felder, geplant {m}" for nr, w, f, m in lese))
        eng = [nr for nr, w, f, m in lese if nr != 'Z' and w / 150 + f * 0.75 > m]
        if eng: print('    eng (Lesen + 45 Sekunden je Feld übersteigt die geplante Zeit):', ', '.join(eng))
    if fehlend: print(f'  Hinweis: {len(fehlend)} Datei(en) nicht gefunden (Bilder oder Texte, die nur im Moodle-Paket liegen).')
    return 1 if bad else 0
sys.exit(asyncio.run(main()))
