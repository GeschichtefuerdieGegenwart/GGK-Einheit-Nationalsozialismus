#!/usr/bin/env python3
"""Setzt das Lehrkraft-Schloss (src/lk-schloss.js) und den verschlüsselten Text (lk/<schluessel>.enc.json)
in die von Hand gepflegten Seiten ein: M21, M22, M23 und lehrkraft.html (M18).
Die Seiten tragen dafür zwei Marken: den Datenblock <script type="application/json" id="lehr-daten">
und im Skript den Abschnitt zwischen /* LEHR-SCHLOSS:ANFANG */ und /* LEHR-SCHLOSS:ENDE */.
Aufruf: python3 tools/lk_einsetzen.py   (nach node tools/lk-bauen.mjs oder nach einer Änderung an src/lk-schloss.js)
M16, M17, M25–M27 und die Ost-West-Seiten bekommen beides beim Bauen (tools/bau_m25_m27.py, tools/bau_ost_west.py)."""
import pathlib, re
REPO = pathlib.Path(__file__).resolve().parent.parent
SEITEN = {'m21': 'm21-es-geht-um-menschen.html', 'm22': 'm22-wie-war-das-moeglich.html', 'm23': 'm23-die-gesellschaft.html', 'm18': 'lehrkraft.html'}
A, E = '/* LEHR-SCHLOSS:ANFANG */', '/* LEHR-SCHLOSS:ENDE */'
def setze(k, datei):
    p = REPO/datei; t = p.read_text('utf-8')
    schloss = (REPO/'src'/'lk-schloss.js').read_text('utf-8'); assert '</script' not in schloss
    lehr = (REPO/'lk'/f'{k}.enc.json').read_text('utf-8').strip()
    assert t.count(A) == 1 and t.count(E) == 1, f'{datei}: Marken fehlen'
    a, e = t.index(A), t.index(E)
    t = t[:a] + A + '\n' + schloss + t[e:]
    t, n = re.subn(r'<script type="application/json" id="lehr-daten">.*?</script>', lambda m: f'<script type="application/json" id="lehr-daten">{lehr}</script>', t, flags=re.S)
    assert n == 1, f'{datei}: Datenblock fehlt'
    p.write_text(t, 'utf-8'); print(datei, len(t))
if __name__ == '__main__':
    for k, d in SEITEN.items(): setze(k, d)
