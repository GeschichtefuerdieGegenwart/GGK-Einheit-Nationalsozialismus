#!/usr/bin/env python3
"""Arbeitsblatt Geschichte · Prüfung eines Blatts im Browser (Chromium über Playwright, per file://).
Misst je Seite des Blatts und je Bildschirmgröße: waagerechter Überlauf · Schrift unter 16 px · Ziele unter 44 px ·
Textkontrast unter 4,5 : 1 · Fehler in der Konsole · Anfragen an fremde Server. Dazu: Stand als Datei sichern und laden,
falsche Datei, Stand nach Neuladen, Ansicht für den Beamer, erster Knopf am Beamer.
Aufruf: python3 tools/pruef/ab_pruef.py [Ordner mit den Seiten]      (ohne Angabe: das Repository; sonst z. B. ein entpacktes Paket)
Grenzen: Text auf Fotos (Bildbänder) und Text in SVG-Grafiken wird beim Kontrast nicht gemessen. Kein Safari, kein iPad, kein VoiceOver."""
import asyncio, json, pathlib, sys, tempfile
from playwright.async_api import async_playwright

ORDNER = pathlib.Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else pathlib.Path(__file__).resolve().parents[2]
START = 'index.html' if not (ORDNER / 'hefter-nationalsozialismus.html').exists() else 'hefter-nationalsozialismus.html'
LANG = ' '.join(['Die Polizisten waren keine Monster, sondern handelten in einer Gruppe unter Druck.'] * 7)
BLATT = {   # wächst mit der Übertragung
    'M22': {'datei': 'm22-wie-war-das-moeglich.html', 'key': 'ggk-m22-taeter:v3', 'erster_knopf': '[data-geh="einstieg"].primary',
            'stand': {'seite': 'start', 'frei': {'jozefow': 1, 'akte': 1, 'markt': 1, 'diskussion': 1, 'schreiben': 1},
                      'x': {'text': 'Ich glaube, die meisten hatten Angst und wollten nicht auffallen.', 'zu': True, 'zeit': ''}, 'y': 2,
                      'neu': 'Ich sehe jetzt, dass die Lage in der Gruppe mehr erklärt, als ich dachte.',
                      'karte': {'A': {'these': 'Die Erziehung macht autoritätshörig.', 'erkl': 'Wer so erzogen ist, gehorcht und tritt nach unten.'},
                                'C': {'these': 'Ganz normale Männer wurden zu Mördern.', 'erkl': 'Gruppendruck und Gehorsam wirkten stärker als das Gewissen.'}},
                      'gelesen': {'A': 1, 'C': 1}, 'lk': {'vermutung': 'Die Forscher schauen von verschiedenen Orten und Zeiten auf dasselbe.', 'prinzip': None, 'grund': '', 'ok': False},
                      'grund': 'Wir halten die Situation für am wichtigsten, weil fast alle mitmachten.', 'erz': LANG,
                      'gl': ['Bild vom Monster', 'Browning: Gruppe', 'Arendt: Gedankenlosigkeit'], 'krit': True, 'durch': {}}},
}
GROESSEN = [(1180, 820, 'iPad quer'), (820, 1180, 'iPad hoch'), (1280, 720, 'Beamer'), (1080, 810, 'iPad 9 quer'), (390, 844, 'Telefon')]
MESSEN = r"""() => {
  const lum = c => { const v = c.map(x => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
  const rgb = s => { const m = s.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(parseFloat); return { c: p.slice(0, 3), a: p.length > 3 ? p[3] : 1 }; };
  const grund = el => { let e = el; while (e) { const s = getComputedStyle(e); if (s.backgroundImage !== 'none' && !/gradient/.test(s.backgroundImage) && e !== el) return null; const b = rgb(s.backgroundColor); if (b && b.a > 0.98) return b.c; e = e.parentElement; } return [255, 255, 255]; };
  const sicht = e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && !e.closest('[hidden],.sr,[aria-hidden=true]'); };
  const name = e => e.tagName.toLowerCase() + (typeof e.className === 'string' && e.className ? '.' + e.className.trim().split(/\s+/).join('.') : '');
  const out = { klein: [], ziel: [], kontrast: [], ueber: document.documentElement.scrollWidth - document.documentElement.clientWidth };
  document.querySelectorAll('body *').forEach(e => {
    const svg = e.closest('svg'); if (svg && e.tagName !== 'text' && e.tagName !== 'tspan') return;
    if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 0) || !sicht(e) && !svg) return;
    if (svg && !sicht(svg)) return;
    let px = parseFloat(getComputedStyle(e).fontSize);
    if (svg) { const vb = svg.viewBox && svg.viewBox.baseVal, r = svg.getBoundingClientRect(); if (vb && vb.width) px = px * r.width / vb.width; }
    if (px < 15.95) out.klein.push(name(e) + ' ' + px.toFixed(1) + ' px „' + e.textContent.trim().slice(0, 20) + '“');
    if (svg) return;
    if (e.closest('.frage-kern')) return;   // helle Schrift auf dem dunklen Kreis der SVG-Grafik darunter: Hintergrund hier nicht messbar (Hell auf Tinte, rund 15 : 1)
    const s = getComputedStyle(e), fg = rgb(s.color), b = grund(e); if (!fg || !b || e.disabled || e.closest('[disabled],[aria-disabled=true]')) return;
    const L1 = lum(fg.c), L2 = lum(b), k = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05), gross = px >= 24 || (px >= 18.66 && +s.fontWeight >= 700);
    if (k < (gross ? 3 : 4.5)) out.kontrast.push(name(e) + ' ' + k.toFixed(2) + ' „' + e.textContent.trim().slice(0, 20) + '“');
  });
  document.querySelectorAll('button,a[href],input,select,textarea,summary').forEach(e => {
    if (!sicht(e)) return; const r = e.getBoundingClientRect();
    if (e.tagName === 'INPUT' && (e.type === 'checkbox' || e.type === 'radio' || e.type === 'file')) { const l = e.closest('label'); if (l && l.getBoundingClientRect().height >= 43.5) return; }
    if (r.height < 43.5 || r.width < 43.5) out.ziel.push(name(e) + ' ' + Math.round(r.width) + '×' + Math.round(r.height));
  });
  for (const k of ['klein', 'ziel', 'kontrast']) out[k] = [...new Set(out[k])];
  return out; }"""

async def main():
    fehler, fremd, bericht = [], [], []
    async with async_playwright() as p:
        b = await p.chromium.launch()
        async def seite(w, h):
            c = await b.new_context(viewport={'width': w, 'height': h}, accept_downloads=True); pg = await c.new_page()
            pg.on('pageerror', lambda e: fehler.append(str(e)[:160])); pg.on('console', lambda m: fehler.append(m.text[:160]) if m.type == 'error' else None)
            pg.on('request', lambda r: fremd.append(r.url) if not r.url.startswith(('file:', 'data:', 'blob:', 'about:')) else None)
            pg.on('requestfailed', lambda r: fehler.append('lädt nicht: ' + r.url[-70:]))
            return c, pg
        for nr, B in BLATT.items():
            url = (ORDNER / B['datei']).as_uri()
            if not (ORDNER / B['datei']).exists(): print(nr, 'fehlt in', ORDNER); continue
            # 1 · alle Seiten in allen Größen, mit vollem Beispielstand (alles sichtbar, was erst nach einer Festlegung erscheint)
            for w, h, was in GROESSEN:
                c, pg = await seite(w, h)
                await pg.goto(url); await pg.evaluate('([k, s]) => localStorage.setItem(k, JSON.stringify(s))', [B['key'], B['stand']]); await pg.reload(); await pg.wait_for_timeout(350)
                ids = await pg.evaluate('Object.keys(SEITE_FN)'); n = {'klein': set(), 'ziel': set(), 'kontrast': set(), 'ueber': []}
                for i in ids:
                    await pg.evaluate('i => geh(i)', i); await pg.wait_for_timeout(260)
                    varianten = [None]
                    if i == 'akte': varianten += ["document.querySelector('[data-akte=C]').click()", "document.querySelector('[data-zu-akte]').click(); document.querySelector('[data-ansicht=vergleich]').click()", "document.querySelector('[data-ansicht=zeit]').click()", "document.querySelector('[data-ansicht=frage]').click()"]
                    for v in varianten:
                        if v: await pg.evaluate(v); await pg.wait_for_timeout(420)
                        m = await pg.evaluate(MESSEN)
                        for k in ('klein', 'ziel', 'kontrast'): n[k] |= {i + ': ' + x for x in m[k]}
                        if m['ueber'] > 0: n['ueber'].append(f"{i} {m['ueber']} px")
                if (w, h) == (1280, 720):
                    await pg.evaluate("geh('start')"); await pg.wait_for_timeout(200)
                    y = await pg.evaluate('s => Math.round(document.querySelector(s).getBoundingClientRect().bottom)', B['erster_knopf'])
                    bericht.append(f'{nr} · Beamer 1280 × 720: Unterkante des ersten Knopfs bei {y} px von 720 px')
                    lauf = await pg.evaluate('document.getAnimations().filter(a => a.playState === "running").length')
                    bericht.append(f'{nr} · laufende Animationen nach dem Laden: {lauf}')
                bericht.append(f"{nr} · {w} × {h} ({was}), {len(ids)} Seiten: Überlauf {n['ueber'] or 'keiner'} · unter 16 px {len(n['klein'])} · Ziele unter 44 px {len(n['ziel'])} · Kontrast unter 4,5 : 1 {len(n['kontrast'])}")
                for k in ('klein', 'ziel', 'kontrast'):
                    for x in sorted(n[k])[:10]: bericht.append(f'      {k}: {x}')
                await c.close()
            # 2 · Stand: Neuladen, Datei sichern, löschen, Datei laden, falsche Datei, Hefter
            c, pg = await seite(1180, 820)
            await pg.goto(url); await pg.evaluate('([k, s]) => localStorage.setItem(k, JSON.stringify(s))', [B['key'], B['stand']]); await pg.reload(); await pg.wait_for_timeout(300)
            await pg.evaluate("geh('extra')"); await pg.wait_for_timeout(200); await pg.fill('#ex-u', 'Das Gespräch hat mein Urteil bestätigt.'); await pg.wait_for_timeout(400)
            await pg.reload(); await pg.wait_for_timeout(300)
            bericht.append(f"{nr} · Stand nach Neuladen: {'bleibt' if await pg.input_value('#ex-u') == 'Das Gespräch hat mein Urteil bestätigt.' else 'FEHLT'}")
            await pg.evaluate("geh('start')"); await pg.wait_for_timeout(200)
            await pg.click('.ab-werk summary'); await pg.wait_for_timeout(150)
            async with pg.expect_download() as dl: await pg.click('[data-ab="sichern"]')
            d = await dl.value; ziel = pathlib.Path(tempfile.mkdtemp()) / d.suggested_filename; await d.save_as(ziel)
            j = json.loads(ziel.read_text('utf-8'))
            bericht.append(f"{nr} · Stand als Datei: {d.suggested_filename} · {ziel.stat().st_size} Bytes · Schlüssel: {sorted(j['daten'])}")
            await pg.click('[data-ab="zu"]')
            await pg.evaluate('localStorage.clear()'); await pg.reload(); await pg.wait_for_timeout(300)
            leer = await pg.evaluate('k => localStorage.getItem(k)', B['key'])
            await pg.click('.ab-werk summary'); await pg.click('[data-ab="laden"]'); await pg.wait_for_timeout(150)
            falsch = pathlib.Path(tempfile.mkdtemp()) / 'falsch.json'; falsch.write_text('{"art":"etwas anderes"}', 'utf-8')
            await pg.set_input_files('#ab-dateiwahl', str(falsch)); await pg.wait_for_timeout(300)
            bericht.append(f"{nr} · falsche Datei: „{await pg.inner_text('#ab-lademeld')}“")
            await pg.set_input_files('#ab-dateiwahl', str(ziel)); await pg.wait_for_timeout(700)
            await pg.evaluate("geh('extra')"); await pg.wait_for_timeout(200)
            zurueck = await pg.input_value('#ex-u') == 'Das Gespräch hat mein Urteil bestätigt.'
            bericht.append(f"{nr} · löschen → aus Datei laden: vorher {'leer' if not leer else 'NICHT LEER'}, danach {'wieder da' if zurueck else 'FEHLT'}")
            # Beamer-Ansicht und Hefter
            await pg.evaluate("geh('start')"); await pg.click('.ab-werk summary'); await pg.check('[data-ab="beamer"]'); await pg.wait_for_timeout(150)
            bg = await pg.evaluate('getComputedStyle(document.getElementById("main")).backgroundColor')
            bericht.append(f'{nr} · Ansicht für den Beamer: Blatt {bg}'); await pg.uncheck('[data-ab="beamer"]')
            await pg.click('.kopf a.btn'); await pg.wait_for_timeout(400)
            hier = await pg.evaluate('(() => { const a = document.querySelector(".blaetter [data-hier]"); return a ? a.textContent.replace(/\\s+/g, " ").trim().slice(0, 110) : "–"; })()')
            m = await pg.evaluate(MESSEN)
            bericht.append(f"Hefter ({pg.url.split('/')[-1]}): zuletzt „{hier}“ · unter 16 px {len(m['klein'])} · Ziele unter 44 px {len(m['ziel'])} · Kontrast {len(m['kontrast'])} · Überlauf {m['ueber']}")
            for k in ('klein', 'ziel', 'kontrast'):
                for x in m[k][:6]: bericht.append(f'      {k}: {x}')
            await c.close()
        await b.close()
    print('\n'.join(bericht))
    print('Fehler in der Konsole:', sorted(set(fehler))[:8] or 'keine')
    print('Anfragen an fremde Server:', sorted(set(fremd))[:8] or 'keine')

asyncio.run(main())
