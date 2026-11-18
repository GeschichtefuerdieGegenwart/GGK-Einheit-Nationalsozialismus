#!/usr/bin/env python3
"""Arbeitsblatt Geschichte · Prüfung eines Blatts im Browser (Chromium über Playwright, per file://).
Misst je Seite des Blatts und je Bildschirmgröße: waagerechter Überlauf · Schrift unter 16 px · Ziele unter 44 px ·
Textkontrast unter 4,5 : 1 · Fehler in der Konsole · Anfragen an fremde Server. Dazu: Stand als Datei sichern und laden,
falsche Datei, Stand nach Neuladen, Freigabe mit einem Tipp, Übersicht (Karten, Linien, Bühne im Bild), Ansicht für den Beamer, erster Knopf am Beamer.
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
                      'gelesen': {'A': 1, 'C': 1}, 'gewok': {'A': True, 'C': True, 'F': True}, 'gew': {'C': {'person': 1, 'situation': 3, 'weltbild': 2, 'apparat': 1, 'vorteil': 2}},   # geprüfte Erklärungen: Marken und Linien werden mitgemessen
                      'lk': {'vermutung': 'Die Forscher schauen von verschiedenen Orten und Zeiten auf dasselbe.', 'prinzip': None, 'grund': '', 'ok': False},
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
                    if i == 'akte': varianten += ["document.querySelector('#dash button[data-ebene=weltbild]').click()", "document.querySelector('#dash button[data-ebene=weltbild]').click(); document.querySelector('[data-akte=C]').click()",  "document.querySelector('[data-zu-akte]').click(); document.querySelector('[data-ansicht=vergleich]').click()", "document.querySelector('[data-ansicht=zeit]').click()", "document.querySelector('[data-ansicht=frage]').click()"]
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
            # Sichern: ein Tipp in der Kopfzeile, kein Fenster
            async with pg.expect_download() as dl: await pg.click('.kopf [data-ab="sichern"]')
            d = await dl.value; ziel = pathlib.Path(tempfile.mkdtemp()) / d.suggested_filename; await d.save_as(ziel)
            j = json.loads(ziel.read_text('utf-8'))
            knopf = await pg.inner_text('.kopf [data-ab="sichern"]'); meld = await pg.evaluate('(() => { const p = document.querySelector("[data-ab-rueck]"); return p ? p.textContent : "–"; })()')
            fenster = await pg.evaluate('!!document.querySelector(".ab-fenster:not([hidden])")')
            bericht.append(f"{nr} · Stand als Datei (ein Tipp, Kopfzeile): {d.suggested_filename} · {ziel.stat().st_size} Bytes · Schlüssel: {sorted(j['daten'])} · Knopf zeigt „{knopf}“ · Meldung „{meld[:60]}…“ · Fenster offen: {'JA' if fenster else 'nein'}")
            await pg.evaluate('localStorage.clear()'); await pg.reload(); await pg.wait_for_timeout(300)
            leer = await pg.evaluate('k => localStorage.getItem(k)', B['key'])
            # Laden: ein Tipp öffnet die Dateiwahl; die Rückmeldung steht bei den Werkzeugen
            falsch = pathlib.Path(tempfile.mkdtemp()) / 'falsch.json'; falsch.write_text('{"art":"etwas anderes"}', 'utf-8')
            async with pg.expect_file_chooser() as fc: await pg.click('.ab-reg [data-ab="laden"]')
            await (await fc.value).set_files(str(falsch)); await pg.wait_for_timeout(300)
            bericht.append(f"{nr} · falsche Datei: „{await pg.inner_text('.ab-reg [data-ab-rueck]')}“")
            async with pg.expect_file_chooser() as fc: await pg.click('.ab-reg [data-ab="laden"]')
            await (await fc.value).set_files(str(ziel)); await pg.wait_for_timeout(700)
            await pg.evaluate("geh('extra')"); await pg.wait_for_timeout(200)
            zurueck = await pg.input_value('#ex-u') == 'Das Gespräch hat mein Urteil bestätigt.'
            bericht.append(f"{nr} · löschen → aus Datei laden (ein Tipp und die Dateiwahl): vorher {'leer' if not leer else 'NICHT LEER'}, danach {'wieder da' if zurueck else 'FEHLT'}")
            # Freigabe auf Ansage: ein Tipp, keine Rückfrage
            await pg.evaluate("S.frei = {}; speichere(); geh('jozefow')"); await pg.wait_for_timeout(300)
            zu = await pg.evaluate('!!document.querySelector(".ab-zu")'); await pg.click('.ab-zu [data-frei]'); await pg.wait_for_timeout(300)
            auf = await pg.evaluate('!document.querySelector(".ab-zu") && offen("jozefow")')
            bericht.append(f"{nr} · Freigabe auf Ansage: vorher {'geschlossen' if zu else 'OFFEN'}, nach einem Tipp {'offen' if auf else 'NOCH ZU'}")
            await pg.evaluate('([k, s]) => { localStorage.setItem(k, JSON.stringify(s)); }', [B['key'], B['stand']]); await pg.reload(); await pg.wait_for_timeout(300)
            # Übersicht (Auftrag 4): Karten ohne Überlauf, Linien enden an der Mitte der Karten, Tipp holt die Bühne ganz ins Bild
            for w, h in [(1180, 820), (1180, 712), (1150, 700), (1280, 720), (1440, 900)]:
                await pg.set_viewport_size({'width': w, 'height': h}); await pg.evaluate("geh('akte')"); await pg.wait_for_timeout(350)
                m = await pg.evaluate("""(() => { const d = document.getElementById('dash').getBoundingClientRect(), b = document.getElementById('buehne').getBoundingClientRect();
                  const k = [...document.querySelectorAll('#dash .spalte .akte')].map(e => { const r = e.getBoundingClientRect(), [ax, ay] = ankerKarte(e.dataset.akte);
                    const innen = [...e.children].reduce((u, c) => Math.max(u, c.getBoundingClientRect().bottom), 0);
                    return { s: e.dataset.akte, ueber: Math.round(innen - r.bottom + 6), raus: r.bottom > b.bottom || r.top < b.top, dy: Math.round((r.top + r.height / 2 - d.top) / d.height * 720 - ay), dx: Math.round(((ax < 640 ? r.right : r.left) - d.left) / d.width * 1280 - ax) }; });
                  return { buehne: [Math.round(b.width), Math.round(b.height)], karten: k }; })()""")
                schlecht = [x for x in m['karten'] if x['ueber'] > 0 or x['raus'] or abs(x['dy']) > 6 or abs(x['dx']) > 6]
                await pg.evaluate("window.scrollTo(0, 0)"); await pg.click('#dash [data-akte="C"]'); await pg.wait_for_timeout(900)
                r = await pg.evaluate("(() => { const b = document.getElementById('buehne').getBoundingClientRect(); return [Math.round(b.top), Math.round(b.bottom), innerHeight, Math.round(document.querySelector('.kopf').getBoundingClientRect().bottom)]; })()")
                ganz = r[0] >= r[3] - 1 and r[1] <= r[2] + 1
                bericht.append(f"{nr} · Übersicht {w} × {h}: Bühne {m['buehne'][0]} × {m['buehne'][1]} px · {len(m['karten'])} Karten, davon mit Fehler {len(schlecht)}{' ' + str(schlecht) if schlecht else ''} · nach Tipp auf eine Karte liegt die Bühne von {r[0]} bis {r[1]} px (Kopf bis {r[3]}, Fenster {r[2]}): {'ganz im Bild' if ganz else 'nicht ganz im Bild'}")
                await pg.evaluate("schliessePanel()"); await pg.wait_for_timeout(250)
            await pg.set_viewport_size({'width': 1180, 'height': 820})
            # Beamer-Ansicht und Hefter
            await pg.evaluate("geh('start')"); await pg.wait_for_timeout(200); await pg.check('.ab-reg [data-ab="beamer"]'); await pg.wait_for_timeout(150)
            bg = await pg.evaluate('getComputedStyle(document.getElementById("main")).backgroundColor')
            bericht.append(f'{nr} · Ansicht für den Beamer: Blatt {bg}'); await pg.uncheck('.ab-reg [data-ab="beamer"]')
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
