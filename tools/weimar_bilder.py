#!/usr/bin/env python3
"""Holt die Bilder für das Kapitel »Weimarer Republik« (und M15, M24) aus dem Unterrichtsheft nach weimar/media/ und media/.
Die Bilder stammen aus dem Heft „Geschichte aktuell 1“; ihre Rechte sind nicht geklärt. Sie liegen deshalb NUR im Moodle-Paket
(weimar/media/heft-*.jpg und media/m15-heft-*.jpg, media/m24-heft-*.jpg stehen in .gitignore). Fehlt ein Bild, läuft die Seite ohne Lücke.
Aufruf: python3 tools/weimar_bilder.py <Geschichte_aktuell_1.pdf>
Die Nummern sind die Bildnummern von `pdfimages -p -f 1 -l 90` bzw. `-f 164 -l 168` (Seite, laufende Nummer)."""
import sys, subprocess, tempfile, pathlib
from PIL import Image
REPO = pathlib.Path(__file__).resolve().parent.parent
W = REPO/'weimar'/'media'; N = REPO/'media'
A = {  # Lauf 1: Seiten 1–90
 (3,7):(W,'heft-m01-film-unterstand'), (4,9):(W,'heft-m01-film-paul'),
 (5,15):(W,'heft-m02-karte-europa'), (8,19):(W,'heft-m03-foto-1915'),
 (16,30):(W,'heft-m04-matrosen'),
 (23,73):(W,'heft-m05-berlin-november-1918'), (18,35):(W,'heft-m05-vier-personen'), (22,71):(W,'heft-m05-scheidemann-luxemburg'),
 (24,75):(W,'heft-m06-friedenskonferenz'), (26,91):(W,'heft-m06-karte-oesterreich-ungarn'), (27,93):(W,'heft-m06-karten-1914-1919'), (25,87):(W,'heft-m06-wilson-14-punkte'), (29,96):(W,'heft-m06-kershaw'),
 (36,128):(W,'heft-m07-schlachtfeld'),
 (51,168):(W,'heft-m12-zwanziger'),
 (56,174):(W,'heft-m13-drei-frauen'), (59,180):(W,'heft-m13-landarbeit'), (70,202):(W,'heft-m13-locarno'),
 (73,210):(W,'heft-m14-arbeitslose-1931'), (72,208):(W,'heft-m14-schaubild-kredite'), (73,211):(W,'heft-m14-tabelle-1932'), (73,212):(W,'heft-m14-arbeitsloser-1932'),
 (76,218):(W,'heft-m14-verfassung'), (82,229):(W,'heft-m14-praesidialregierungen'),
 (85,271):(N,'m15-heft-reichstagsbrand'), (86,273):(N,'m15-heft-wahlplakat-1933'),
}
B = { (165,3):(N,'m24-heft-landmesser-1936') }   # Lauf 2: Seiten 164–168
def lauf(pdf, von, bis, wahl):
    with tempfile.TemporaryDirectory() as t:
        subprocess.run(['pdfimages','-p','-png','-f',str(von),'-l',str(bis),pdf,t+'/b'], check=True)
        for (s,n),(ziel,name) in wahl.items():
            q = pathlib.Path(t)/f'b-{s:03d}-{n:03d}.png'
            if not q.exists(): print('FEHLT', s, n, name); continue
            im = Image.open(q).convert('RGB')
            if im.width > 1600: im = im.resize((1600, round(im.height*1600/im.width)), Image.LANCZOS)
            ziel.mkdir(parents=True, exist_ok=True); im.save(ziel/f'{name}.jpg', quality=86, optimize=True); print(f'{ziel.name}/{name}.jpg', im.size)
if __name__ == '__main__':
    if len(sys.argv) < 2: print(__doc__); sys.exit(1)
    lauf(sys.argv[1], 1, 90, A); lauf(sys.argv[1], 164, 168, B)
