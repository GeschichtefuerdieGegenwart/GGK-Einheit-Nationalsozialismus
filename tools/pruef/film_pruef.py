#!/usr/bin/env python3
"""Erklärfilm zu M22, Auftrag 4 · Prüfung (»erst messen, dann bewerten«, Skill film-regie, Abschnitt 7).
Misst auf der Bühne 1280 × 720 an jedem Standbild und alle 0,5 Sekunden:
  Text unter der Mindestgröße (Bildsätze 28 px, sonst 18 px – im Blatt auf dem iPad sind das rund 16 px) ·
  Text außerhalb der sicheren Fläche (5 % Rand links und rechts, 24 px oben und unten: Der Film läuft im Browser, nicht auf einem Fernseher) ·
  Text, der Text überdeckt · Kontrast an der ungünstigsten Stelle hinter dem Text (aus dem Bild gemessen) ·
  Lesezeit je Satz (1 s + 0,3 s je Wort).
Dazu: Daten des Films gegen das Blatt · Belegstellen im Blatt · Bedienung (Start, Fokus, Leertaste, »Weniger Bewegung«,
Sprungmarken) · Konsole und fremde Server · Größe im Blatt (eingebettet, iPad quer).
Aufruf: python3 tools/pruef/film_pruef.py [--bilder ORDNER]    (mit --bilder werden die Standbilder als PNG abgelegt)
Grenzen: Chromium statt Safari; ob der Film trägt, entscheidet der Mensch beim Ansehen."""
import asyncio, io, pathlib, subprocess, sys
from playwright.async_api import async_playwright
from PIL import Image

REPO = pathlib.Path(__file__).resolve().parents[2]
FILM, BLATT = REPO / 'm22-film-erklaerungen.html', REPO / 'm22-wie-war-das-moeglich.html'
BILDER = pathlib.Path(sys.argv[sys.argv.index('--bilder') + 1]) if '--bilder' in sys.argv else None
# Sätze des Films, die sich auf Wortlaut im Blatt stützen: Ändert sich das Blatt, schlägt die Prüfung an.
BELEGE = ['Marktplatz · eine Runde, 5 Minuten', 'Wer eine Karte zu Erklärung A, C oder E hat, steht am Stand.', 'Alle anderen besuchen zwei Stände.',
          'Tischgruppe · 4 Minuten · ein iPad', 'Auftrag L (Landkarte) ist frei', 'Richtig gelegen:', 'Ebenen genau getroffen', 'setzt vor allem bei',
          'Mindestens zwei Erklärungen, eine aus einer anderen Ebene', 'Ebene: nach deinem Gewichtungs-Check', 'Die These in einem Satz, in deinen Worten',
          'Was erklärt sie am Fall Józefów?', 'Was erklärt sie nicht?', 'Gewichtungs-Check: Wo setzt diese Erklärung an?', 'Erklären heißt nicht entschuldigen.',
          'Sechs Antworten, fünf Ebenen', '"Einstieg","Vertiefung","Kontroverse"', 'noch offen']
LESEN = ['.satz', '.blase', '.modell', '.frei', '.hier-t', '.bsp2', '.auftrag .tx', '.merk', '.raffer']   # Texte, die ganz gelesen werden sollen
TEXTE = r"""() => {
  const B = document.getElementById('buehne'), b = B.getBoundingClientRect(), k = b.width / 1280, out = [];
  const deck = e => { let o = 1; for (let x = e; x && x !== B.parentNode; x = x.parentElement) { const s = getComputedStyle(x); if (s.visibility === 'hidden' || s.display === 'none') return 0; o *= parseFloat(s.opacity); } return o; };
  const stapel = (x, y) => document.elementsFromPoint(x, y);
  const mass = e => { let m = 1; for (let x = e; x && x !== B; x = x.parentElement) { const tr = getComputedStyle(x).transform; if (tr && tr !== 'none') { const z = tr.match(/matrix\(([^)]+)\)/); if (z) { const q = z[1].split(',').map(parseFloat); m *= Math.hypot(q[0], q[1]); } } } return m; };   // Maßstab aus den Bewegungen auf der Bühne (ohne den Maßstab der Bühne selbst)
  const dicht = e => { const m = getComputedStyle(e).backgroundColor.match(/rgba?\(([^)]+)\)/); if (!m) return false; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(parseFloat); return (p.length < 4 || p[3] > .9) && deck(e) > .9; };
  const w = document.createTreeWalker(B, NodeFilter.SHOW_TEXT); let n, nr = 0;
  while ((n = w.nextNode())) {
    if (!n.textContent.trim()) continue; const e = n.parentElement; if (e.closest('svg')) continue;
    const o = deck(e); if (o < .05) continue;
    const r = document.createRange(); r.selectNodeContents(n);
    const q = [...r.getClientRects()].filter(x => x.width > 1 && x.height > 1); if (!q.length) continue;
    const L = Math.min(...q.map(x => x.left)), T = Math.min(...q.map(x => x.top)), Rr = Math.max(...q.map(x => x.right)), U = Math.max(...q.map(x => x.bottom));
    const s = getComputedStyle(e), mx = (q[0].left + q[0].right) / 2, my = (q[0].top + q[0].bottom) / 2, st = stapel(mx, my);
    const ix = st.indexOf(e), oben = ix >= 0 && !st.slice(0, ix).some(x => !e.contains(x) && !x.contains(e) && dicht(x));   // liegt nichts Deckendes darüber?
    e.dataset.pn = e.dataset.pn || String(++nr + 1000 * Math.random() | 0);
    out.push({ id: e.dataset.pn, wer: (e.id ? '#' + e.id : (e.className && typeof e.className === 'string' ? '.' + e.className.split(' ').join('.') : e.tagName.toLowerCase())), text: n.textContent.trim().slice(0, 44),
      x: (L - b.left) / k, y: (T - b.top) / k, r: (Rr - b.left) / k, u: (U - b.top) / k, px: parseFloat(s.fontSize) * mass(e), fett: +s.fontWeight >= 700,
      farbe: s.color, deck: o, oben: oben, satz: !!e.closest('.satz'), zeilen: q.map(x => [(x.left - b.left) / k, (x.top - b.top) / k, (x.right - b.left) / k, (x.bottom - b.top) / k]),
      vor: e.closest('#panel') ? 'panel' : '' });
  }
  return out; }"""
SICHT = r"""(sel) => [...document.querySelectorAll('#buehne ' + sel)].map(e => { let o = 1; for (let x = e; x && x.id !== 'rahmen'; x = x.parentElement) { const s = getComputedStyle(x); if (s.visibility === 'hidden') { o = 0; break; } o *= parseFloat(s.opacity); } return o; })"""

def lum(c):
    v = [x / 255 for x in c]; v = [x / 12.92 if x <= .03928 else ((x + .055) / 1.055) ** 2.4 for x in v]
    return .2126 * v[0] + .7152 * v[1] + .0722 * v[2]
def kontrast(a, b): L1, L2 = lum(a), lum(b); return (max(L1, L2) + .05) / (min(L1, L2) + .05)
def rgb(s): p = s[s.index('(') + 1:s.index(')')].replace('/', ' ').replace(',', ' ').split(); return tuple(int(float(x)) for x in p[:3])

def schlechtester(bild, t):
    """Kontrast der Schrift gegen die Flächen hinter ihr: häufige Farben im Ausschnitt, die nicht Schrift sind (Brightest-Spot Rule)."""
    f = rgb(t['farbe']); werte = []
    for z in t['zeilen']:
        box = (max(0, int(z[0])), max(0, int(z[1])), min(1280, int(z[2]) + 1), min(720, int(z[3]) + 1))
        if box[2] - box[0] < 2 or box[3] - box[1] < 2: continue
        aus = bild.crop(box); px = list(aus.get_flattened_data() if hasattr(aus, 'get_flattened_data') else aus.getdata()); zaehl = {}
        for p in px:
            if sum(abs(p[i] - f[i]) for i in range(3)) < 96: continue           # Schrift selbst und ihre Kanten
            q = (p[0] >> 3, p[1] >> 3, p[2] >> 3); zaehl[q] = zaehl.get(q, 0) + 1
        n = sum(zaehl.values())
        if not n: continue
        for q, c in zaehl.items():
            if c / n >= .12: werte.append(kontrast(f, (q[0] * 8 + 4, q[1] * 8 + 4, q[2] * 8 + 4)))
    return min(werte) if werte else None

async def main():
    bericht, fehler, fremd = [], [], []
    # 1 · Daten und Belegstellen
    r = subprocess.run([sys.executable, str(REPO / 'tools' / 'film_m22_daten.py'), '--pruefen'], capture_output=True, text=True)
    bericht.append('Daten: ' + r.stdout.strip())
    blatt = BLATT.read_text('utf-8'); fehlt = [b for b in BELEGE if b not in blatt]
    bericht.append(f"Belegstellen im Blatt: {len(BELEGE) - len(fehlt)} von {len(BELEGE)} gefunden" + (f" · FEHLT: {fehlt}" if fehlt else ''))
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1316, 'height': 960})
        pg.on('pageerror', lambda e: fehler.append(str(e)[:160])); pg.on('console', lambda m: fehler.append(m.text[:160]) if m.type == 'error' else None)
        pg.on('request', lambda q: fremd.append(q.url) if not q.url.startswith(('file:', 'data:', 'blob:', 'about:')) else None)
        pg.on('requestfailed', lambda q: fehler.append('lädt nicht: ' + q.url[-70:]))
        await pg.goto(FILM.as_uri()); await pg.wait_for_timeout(700)
        breite = await pg.evaluate("document.getElementById('rahmen').clientWidth"); assert breite == 1280, f'Bühne {breite} px statt 1280'
        dauer = await pg.evaluate('FILM.dauer'); stand = await pg.evaluate('FILM.bilder'); teile = await pg.evaluate('FILM.teile')
        bericht.append(f"Film: {int(dauer // 60)}:{int(dauer % 60):02d} Minuten · {len(teile)} Teile · {len(stand)} Standbilder")
        zeiten = sorted(set([round(x * .5, 2) for x in range(int(dauer * 2) + 1)] + [round(x, 2) for x in stand]))
        klein, rand, ueber, kontr, zurueck = {}, {}, {}, {}, 0
        rahmen = await pg.query_selector('#rahmen')
        if BILDER: BILDER.mkdir(parents=True, exist_ok=True)
        for t in zeiten:
            await pg.evaluate('t => FILM.seek(t)', t); await pg.wait_for_timeout(40)
            texte = await pg.evaluate(TEXTE); png = await rahmen.screenshot(); bild = Image.open(io.BytesIO(png)).convert('RGB')
            if bild.size != (1284, 724): bild = bild.resize((1284, 724))
            bild = bild.crop((2, 2, 1282, 722))                                   # ohne den Rahmen von 2 px
            if BILDER and t in [round(x, 2) for x in stand]: bild.save(BILDER / f't{t:07.2f}.png')
            voll = [x for x in texte if x['oben'] and x['deck'] >= .9]
            zurueck += sum(1 for x in texte if x['oben'] and .05 < x['deck'] < .9 and x['deck'] > .35)
            for x in voll:
                if x['px'] < (27.9 if x['satz'] else 17.9): klein.setdefault(f"{x['wer']} {x['px']:.1f} px „{x['text']}“", t)
                if not x['vor'] and (x['x'] < 63 or x['r'] > 1217 or x['y'] < 23.5 or x['u'] > 696.5): rand.setdefault(f"{x['wer']} „{x['text']}“ ({x['x']:.0f}–{x['r']:.0f} × {x['y']:.0f}–{x['u']:.0f})", t)
                k = schlechtester(bild, x); gross = x['px'] >= 24 or (x['px'] >= 18.6 and x['fett'])
                if k is not None and k < (3 if gross else 4.5): kontr.setdefault(f"{x['wer']} „{x['text']}“ {k:.2f} : 1", t)
            for i, a in enumerate(voll):
                for c in voll[i + 1:]:
                    if a['id'] == c['id']: continue
                    for za in a['zeilen']:
                        for zc in c['zeilen']:
                            w, h = min(za[2], zc[2]) - max(za[0], zc[0]), min(za[3], zc[3]) - max(za[1], zc[1])
                            if w > 3 and h > .3 * min(za[3] - za[1], zc[3] - zc[1]):   # mehr als ein Drittel der Zeilenhöhe: enge Zeilen berühren sich im Maß, nicht im Bild
                                ueber.setdefault(f"„{a['text']}“ ({a['wer']}) über „{c['text']}“ ({c['wer']})", t)
        for name, d in (('Text unter der Mindestgröße', klein), ('Text außerhalb der sicheren Fläche', rand), ('Text überdeckt Text', ueber), ('Kontrast unter 4,5 : 1 (große Schrift 3 : 1)', kontr)):
            bericht.append(f"{name}: {len(d)}" + ''.join(f"\n      bei {t:.1f} s: {x}" for x, t in sorted(d.items(), key=lambda q: q[1])[:14]))
        bericht.append(f"Zurückgetretene Texte (gedimmt, nicht zum Lesen gedacht): an {zurueck} Messpunkten – kein Kontrastmaß")
        # 2 · Lesezeit
        dt, sicht = .1, {}
        for i in range(int(dauer / dt) + 1):
            await pg.evaluate('t => FILM.seek(t)', i * dt)
            for sel in LESEN:
                for j, o in enumerate(await pg.evaluate(SICHT, sel)):
                    if o >= .95: sicht[(sel, j)] = sicht.get((sel, j), 0) + dt
        worte = await pg.evaluate("(sels) => sels.map(s => [...document.querySelectorAll('#buehne ' + s)].map(e => e.textContent.trim()))", LESEN)
        kurz, n = [], 0
        for sel, ws in zip(LESEN, worte):
            for j, text in enumerate(ws):
                n += 1; noetig = 1 + .3 * len(text.split()); da = sicht.get((sel, j), 0)
                if da + .15 < noetig: kurz.append(f"{sel} „{text[:50]}“: steht {da:.1f} s, nötig {noetig:.1f} s")
        bericht.append(f"Lesezeit: {n} Sätze, davon zu kurz {len(kurz)}" + ''.join('\n      ' + x for x in kurz))
        # 3 · Bedienung
        await pg.reload(); await pg.wait_for_timeout(600)
        await pg.click('#start'); await pg.wait_for_timeout(700)
        fokus = await pg.evaluate('document.activeElement.id'); laeuft = await pg.evaluate('FILM.zeit()') > .2; wort = await pg.inner_text('#spielt')
        await pg.evaluate('document.activeElement.blur()'); await pg.focus('#film'); await pg.keyboard.press('Space'); await pg.wait_for_timeout(250)
        t1 = await pg.evaluate('FILM.zeit()'); await pg.wait_for_timeout(400); t2 = await pg.evaluate('FILM.zeit()')
        bericht.append(f"Start: Film läuft {'ja' if laeuft else 'NEIN'} · Fokus nach dem Start auf #{fokus} („{wort}“) · Leertaste ohne Fokus auf einem Knopf hält an: {'ja' if abs(t2 - t1) < .01 else 'NEIN'}")
        await pg.check('#ruhig'); await pg.evaluate('FILM.seek(0)'); folge = []
        for _ in range(len(stand) + 1):
            await pg.click('#spiel'); await pg.wait_for_timeout(60); folge.append(round(await pg.evaluate('FILM.zeit()'), 2))
        ok = [round(x, 2) for x in stand] == folge[:len(stand)]
        bericht.append(f"Weniger Bewegung: »Nächstes Bild« geht durch {len(stand)} Standbilder in der richtigen Folge: {'ja' if ok else 'NEIN ' + str(folge)} · danach „{await pg.inner_text('#spielt')}“")
        await pg.uncheck('#ruhig'); await pg.evaluate('FILM.seek(50)'); await pg.evaluate('document.activeElement.blur()'); await pg.focus('#film')
        await pg.keyboard.press('ArrowRight'); a = round(await pg.evaluate('FILM.zeit()'), 2); await pg.keyboard.press('ArrowLeft'); c = round(await pg.evaluate('FILM.zeit()'), 2)
        bericht.append(f"Sprungmarken: Pfeil rechts von 50,0 s → {a} s, Pfeil links → {c} s · Ort: „{await pg.inner_text('#ort')}“")
        ziele = await pg.evaluate("[...document.querySelectorAll('.steuer button,.steuer input,.kapitel button,.text summary,#start')].filter(e => e.getClientRects().length).map(e => { const r = e.getBoundingClientRect(), l = e.closest('label'); return [e.id || e.textContent.trim().slice(0, 14), Math.round(r.width), Math.round(l ? l.getBoundingClientRect().height : r.height)]; }).filter(x => x[2] < 44 || (x[1] < 44 && x[0] !== 'ruhig'))")
        bericht.append(f"Bedienelemente unter 44 px: {len(ziele)} {ziele if ziele else ''}")
        await pg.close()
        # 4 · eingebettet im Blatt, iPad quer
        pg = await b.new_page(viewport={'width': 1180, 'height': 820})
        pg.on('pageerror', lambda e: fehler.append(str(e)[:160])); pg.on('console', lambda m: fehler.append(m.text[:160]) if m.type == 'error' else None)
        await pg.goto(BLATT.as_uri()); await pg.evaluate("S.frei.akte = true; S.frei.jozefow = true; speichere(); geh('akte')"); await pg.wait_for_timeout(400)
        await pg.click('[data-film]'); await pg.wait_for_timeout(900)
        fr = pg.frame_locator('iframe.filmrahmen')
        w = await fr.locator('#rahmen').evaluate('e => e.clientWidth'); kn = await fr.locator('#start').evaluate('e => [Math.round(e.getBoundingClientRect().height), parseFloat(getComputedStyle(e).fontSize)]')
        titel = await pg.get_attribute('#ueber [role=dialog]', 'aria-label')
        bericht.append(f"Im Blatt (iPad quer 1180 × 820): Bühne {w} px breit, Maßstab {w / 1280:.2f} · kleinste Schrift im Bild 18 px entspricht {18 * w / 1280:.1f} px, Bildsätze {31 * w / 1280:.1f} px · Startknopf {kn[0]} px hoch, Schrift {kn[1]:.0f} px · Name des Fensters „{titel}“")
        if BILDER: await pg.screenshot(path=str(BILDER / 'im_blatt_1180.png'))
        for hh in (746, 712):
            await pg.set_viewport_size({'width': 1180, 'height': hh}); await pg.wait_for_timeout(250)
            w2 = await fr.locator('#rahmen').evaluate('e => e.clientWidth'); zeile = await fr.locator('.steuer').evaluate('e => Math.round(e.getBoundingClientRect().bottom)')
            bericht.append(f"Im Blatt (Safari mit Leisten, 1180 × {hh}): Bühne {w2} px, kleinste Schrift {18 * w2 / 1280:.1f} px, Bildsätze {31 * w2 / 1280:.1f} px · Bedienzeile endet bei {zeile} px von {hh} px")
        await pg.set_viewport_size({'width': 1180, 'height': 820})
        await fr.locator('#zu').click(); await pg.wait_for_timeout(300)
        bericht.append(f"Schließen aus dem Film: Fenster {'zu' if not await pg.query_selector('#ueber iframe') else 'NOCH OFFEN'} · Fokus zurück auf „{(await pg.evaluate('document.activeElement.textContent')).strip()[:24]}“")
        await pg.close(); await b.close()
    print('\n'.join(bericht))
    print('Fehler in der Konsole:', sorted(set(fehler))[:8] or 'keine')
    print('Anfragen an fremde Server:', sorted(set(fremd))[:8] or 'keine')

asyncio.run(main())
