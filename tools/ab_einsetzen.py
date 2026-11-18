#!/usr/bin/env python3
"""Arbeitsblatt Geschichte: setzt die gemeinsame Schicht (src/arbeitsblatt/ab.css, hefter.js, ab.js) in die Seiten ein
und baut die Hefter-Seiten (Startdatei je Einheit).
Die Seiten tragen dafür zwei Markenpaare: im Stil /* AB-STIL:ANFANG */ … /* AB-STIL:ENDE */ und im Skript
/* AB-KERN:ANFANG */ … /* AB-KERN:ENDE */. Aufruf: python3 tools/ab_einsetzen.py   (nach jeder Änderung in src/arbeitsblatt/)"""
import pathlib, re
REPO = pathlib.Path(__file__).resolve().parent.parent
SRC = REPO / 'src' / 'arbeitsblatt'
SEITEN = ['m22-wie-war-das-moeglich.html']                                   # wächst mit der Übertragung
HEFTER = {'ns': ('hefter-nationalsozialismus.html', 'Nationalsozialismus')}  # Einheit → (Datei, Name)
# Register: altes Papier mit Maserung (Entscheidung vom 16.11.2026) – feines Korn und lange Fasern, ohne eigene Farbe; die Farbe kommt aus --reg.
KORN = ("url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='360' height='360'%3E%3Cfilter id='k'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .17  0 0 0 0 .15  0 0 0 0 .12  0 0 0 .42 -.13'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23k)'/%3E%3C/svg%3E\"),"
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='720' height='360'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.012 .55' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .20  0 0 0 0 .18  0 0 0 0 .15  0 0 0 .38 -.12'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E\")")
def stil(): return (SRC / 'ab.css').read_text('utf-8').replace('KORN', KORN).strip()
def kern():
    t = (SRC / 'hefter.js').read_text('utf-8').strip() + '\n' + (SRC / 'ab.js').read_text('utf-8').strip()
    assert '</script' not in t and '</style' not in stil(); return t
def zwischen(t, a, e, neu, datei):
    assert t.count(a) == 1 and t.count(e) == 1, f'{datei}: Marken {a} … {e} fehlen oder stehen doppelt'
    i, j = t.index(a), t.index(e)
    return t[:i] + a + '\n' + neu + '\n' + t[j:]
def seite(datei):
    p = REPO / datei; t = p.read_text('utf-8')
    t = zwischen(t, '/* AB-STIL:ANFANG */', '/* AB-STIL:ENDE */', stil(), datei)
    t = zwischen(t, '/* AB-KERN:ANFANG */', '/* AB-KERN:ENDE */', kern(), datei)
    p.write_text(t, 'utf-8'); print(datei, len(t.encode()) // 1024, 'KB')
def hefter(einheit, datei, name):
    t = (SRC / 'hefter.html').read_text('utf-8')
    t = t.replace('EINHEIT', einheit).replace('NAME', name)
    t = t.replace('/*AB-BASIS*/', (SRC / 'basis.css').read_text('utf-8').strip()).replace('/*AB-STIL*/', stil()).replace('/*AB-KERN*/', kern())
    (REPO / datei).write_text(t, 'utf-8'); print(datei, len(t.encode()) // 1024, 'KB')
if __name__ == '__main__':
    for d in SEITEN: seite(d)
    for k, (d, n) in HEFTER.items(): hefter(k, d, n)
