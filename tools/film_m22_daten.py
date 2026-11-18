#!/usr/bin/env python3
"""Erklärfilm zu M22, Auftrag 4: holt Namen, Jahre, Leitfragen, Gewichtungen, Aufträge und Bildnachweise aus dem Blatt
(m22-wie-war-das-moeglich.html) und schreibt sie in den Film (m22-film-erklaerungen.html), zwischen die Marken
/* FILM-DATEN:ANFANG */ … /* FILM-DATEN:ENDE */. So zeigt der Film dieselben Angaben wie das Blatt.
Aufruf: python3 tools/film_m22_daten.py            schreibt den Datenblock neu
        python3 tools/film_m22_daten.py --pruefen  vergleicht nur (Rückgabewert 1, wenn Film und Blatt auseinanderlaufen)
Braucht Chromium über Playwright (wie tools/pruef/)."""
import asyncio, json, pathlib, sys
from playwright.async_api import async_playwright

REPO = pathlib.Path(__file__).resolve().parent.parent
ORDNER = pathlib.Path(sys.argv[sys.argv.index('--ordner') + 1]).resolve() if '--ordner' in sys.argv else REPO   # nur zum Prüfen: z. B. ein entpacktes Paket
BLATT, FILM = ORDNER / 'm22-wie-war-das-moeglich.html', ORDNER / 'm22-film-erklaerungen.html'
A, E = '/* FILM-DATEN:ANFANG */', '/* FILM-DATEN:ENDE */'
LESEN = """() => ({
  akten: AKTEN.map(a => ({ s: a.s, name: a.name, titel: a.titel, jahr: a.jahr, frage: a.frage, gew: EBENEN.map(([k]) => a.gew[k]),
                          datei: (BILDER[a.bild] || {}).datei || "", nachweis: ((BILDER[a.bild] || {}).unter || "") + ". " + ((BILDER[a.bild] || {}).quelle || "") })),
  ebenen: EBENEN.map(([k, n, t]) => [k, n, t.split(": ").pop()]),
  stufe: STUFE,
  auf: AUF.map(a => ({ nr: a.nr, kurz: a.kurz, name: a.name, form: a.form, min: a.min })),
})"""

async def lesen():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page()
        await pg.goto(BLATT.as_uri()); await pg.wait_for_timeout(300)
        d = await pg.evaluate(LESEN); await b.close(); return d

def main():
    d = asyncio.run(lesen())
    neu = json.dumps(d, ensure_ascii=False, separators=(',', ':'))
    t = FILM.read_text('utf-8'); assert t.count(A) == 1 and t.count(E) == 1, 'Marken FILM-DATEN fehlen im Film'
    i, j = t.index(A) + len(A), t.index(E); alt = t[i:j]
    if '--pruefen' in sys.argv:
        gleich = alt == neu
        print('Film und Blatt:', 'gleiche Daten' if gleich else 'VERSCHIEDEN – python3 tools/film_m22_daten.py ausführen und die Standbilder ansehen')
        sys.exit(0 if gleich else 1)
    FILM.write_text(t[:i] + neu + t[j:], 'utf-8')
    print('Datenblock geschrieben:', len(neu), 'Zeichen ·', len(d['akten']), 'Erklärungen ·', len(d['auf']), 'Aufträge', '(unverändert)' if alt == neu else '(geändert)')

if __name__ == '__main__':
    main()
