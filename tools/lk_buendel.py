#!/usr/bin/env python3
"""Klartext der Lehrkraftbereiche zwischen dem Projekt (zwei Sammeldateien) und privat/lk/ hin- und hertragen.
Der Klartext gehört nicht ins Repository: privat/ steht in .gitignore, die Sammeldateien liegen im Projekt »Geschichtsdidaktik«.
  python3 tools/lk_buendel.py packen           → privat/Lehrkraftbereiche_Klartext_NS.html und …_Ost-West.html
  python3 tools/lk_buendel.py teilen <Datei …> → privat/lk/<schluessel>.html
Danach: LK_PASS='…' node tools/lk-bauen.mjs"""
import sys, pathlib, re
REPO = pathlib.Path(__file__).resolve().parent.parent; P = REPO/'privat'; LK = P/'lk'
MARKE = '<!-- ===== DATEI: {} ===== -->'
KOPF = '<!-- {}: Texte der Lehrkraftbereiche im Klartext. NICHT veröffentlichen, nicht ins Repository legen.\n     Je Abschnitt eine Datei für privat/lk/. Zurückholen: python3 tools/lk_buendel.py teilen <diese Datei>\n     Verschlüsseln: LK_PASS=… node tools/lk-bauen.mjs (das Passwort steht nirgends in einer Datei). -->\n'
def packen():
    for name, wahl in (('Lehrkraftbereiche_Klartext_NS.html', lambda k: not k.startswith('ow-')), ('Lehrkraftbereiche_Klartext_Ost-West.html', lambda k: k.startswith('ow-'))):
        teile = [MARKE.format(p.name) + '\n' + p.read_text('utf-8').rstrip('\n') + '\n' for p in sorted(LK.glob('*.html')) if wahl(p.stem)]
        (P/name).write_text(KOPF.format(name) + '\n'.join(teile), 'utf-8'); print(name, len(teile), 'Abschnitte')
def teilen(dateien):
    LK.mkdir(parents=True, exist_ok=True)
    for d in dateien:
        t = pathlib.Path(d).read_text('utf-8'); st = re.split(r'<!-- ===== DATEI: ([a-z0-9-]+\.html) ===== -->\n', t)
        for name, inhalt in zip(st[1::2], st[2::2]):
            (LK/name).write_text(inhalt.rstrip('\n') + '\n', 'utf-8'); print('privat/lk/' + name, len(inhalt))
if __name__ == '__main__':
    if sys.argv[1:2] == ['packen']: packen()
    elif sys.argv[1:2] == ['teilen'] and sys.argv[2:]: teilen(sys.argv[2:])
    else: print(__doc__)
