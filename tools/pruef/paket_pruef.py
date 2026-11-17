#!/usr/bin/env python3
"""Prüft ein Moodle-Paket: entpackt die ZIP-Datei, öffnet jede Seite direkt vom Gerät (file://) und meldet
fehlende Dateien, Aufrufe fremder Server beim Laden, Fehler in der Konsole und Verweise ins Leere.
Aufruf: python3 tools/pruef/paket_pruef.py <Paket.zip> [--nur weimar]"""
import sys, re, zipfile, tempfile, pathlib, asyncio, urllib.parse
from playwright.async_api import async_playwright
async def main():
    zp = pathlib.Path(sys.argv[1]); nur = sys.argv[sys.argv.index('--nur') + 1] if '--nur' in sys.argv else ''
    tmp = pathlib.Path(tempfile.mkdtemp(prefix='paket-'))
    with zipfile.ZipFile(zp) as z: z.extractall(tmp)
    seiten = sorted(p for p in tmp.rglob('*.html') if nur in p.relative_to(tmp).as_posix())
    print(f'{zp.name}: {len(list(tmp.rglob("*")))} Einträge, {len(seiten)} Seiten zu prüfen; index.html oben: {(tmp/"index.html").exists()}')
    probleme = 0
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        for s in seiten:
            rel = s.relative_to(tmp).as_posix()
            pg = await b.new_page(viewport={'width': 1180, 'height': 820})
            fremd, fehlt, konsole = [], [], []
            pg.on('request', lambda r: fremd.append(r.url) if r.url.startswith('http') else None)
            pg.on('requestfailed', lambda r: fehlt.append(urllib.parse.unquote(r.url).replace(tmp.as_uri() + '/', '')) if r.url.startswith('file:') else None)
            pg.on('pageerror', lambda e: konsole.append(str(e)[:140]))
            try:
                await pg.goto(s.as_uri(), wait_until='load', timeout=20000); await pg.wait_for_timeout(250)
            except Exception as ex:
                konsole.append('Laden: ' + str(ex)[:100])
            # Verweise im Dokument, die auf Dateien des Pakets zeigen
            refs = await pg.evaluate("""() => [...document.querySelectorAll('a[href],img[src],script[src],link[href],source[src],iframe[src],video[src]')].map(e => e.getAttribute('href') || e.getAttribute('src')).filter(u => u && !/^(https?:|mailto:|data:|blob:|#|javascript:)/.test(u))""")
            tot = []
            for u in set(refs):
                ziel = (s.parent / urllib.parse.unquote(u.split('#')[0].split('?')[0])).resolve()
                if not ziel.exists(): tot.append(u)
            # Dateinamen in Daten der Seite (Bilder, Filme, Texte), die es im Paket nicht gibt
            roh = s.read_text('utf-8', errors='replace')
            daten = sorted({m for m in re.findall(r'["\'(]((?:\.\./)?(?:media|texte|assets)/[\w./-]+\.(?:jpg|jpeg|png|webp|svg|mp4|mp3|js|css|woff2?))', roh) if not (s.parent / m).resolve().exists()})
            ext = sorted({urllib.parse.urlparse(u).netloc for u in fremd})
            if fremd or fehlt or konsole or tot or daten:
                probleme += 1
                print(f'  {rel}:' + (f' fremde Server beim Laden {ext};' if ext else '') + (f' nicht geladen {sorted(set(fehlt))[:5]};' if fehlt else '') + (f' Fehler {konsole[:2]};' if konsole else '') + (f' Verweise ins Leere {tot[:5]};' if tot else '') + (f' in den Daten genannt, aber nicht im Paket {daten[:6]}' if daten else ''))
            await pg.close()
        # Rückweg: aus einer Stunde zur Startseite des Pakets
        for rel in ('weimar/m05-doppelte-ausrufung.html', 'm25-leben-in-ruinen.html', 'ost-west/s1-stunde-null.html'):
            p = tmp/rel
            if not p.exists(): continue
            pg = await b.new_page(); await pg.goto(p.as_uri()); await pg.wait_for_timeout(200)
            h = await pg.evaluate("() => { const a = [...document.querySelectorAll('a.pill, header a')].map(x => x.getAttribute('href')); return a; }")
            print(f'  Rückwege {rel}: {h}')
            await pg.close()
        await b.close()
    print(f'Seiten mit Meldung: {probleme} von {len(seiten)}')
asyncio.run(main())
