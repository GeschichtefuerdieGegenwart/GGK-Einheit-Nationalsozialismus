#!/usr/bin/env python3
"""Baut m16/m17 und m25/m26/m27 als je eine HTML-Datei (CSS und JS eingebettet; Gegenwart-Bundle und Schriften aus assets/)."""
import sys, pathlib
H = pathlib.Path(__file__).resolve().parent.parent / 'src' / 'm25-m27'
REPO = pathlib.Path(__file__).resolve().parent.parent
ST = {
 'm16': ('m16-was-macht-den-menschen.html', 'M16 Was macht den Menschen zum Menschen?', 'GGK M16: Einstieg in die Einheit Nationalsozialismus. Margot Friedländers Appell, eigene Wörter mit dem Humanismus vergleichen, Wertekonflikte entscheiden, drei eigene Werte benennen.', []),
 'm17': ('m17-leben-in-der-diktatur.html', 'M17 Mein Leben in der NS-Diktatur I – Ausgrenzung 1933 bis 1939', 'GGK M17: Zwei ausgedachte Lebensläufe 1933 bis 1939. Boykott, Berufsbeamtengesetz, Nürnberger Gesetze, Novemberpogrom – erst antworten, dann mit dem Fachtext abgleichen, Spielraum einschätzen.', []),
 'm25': ('m25-leben-in-ruinen.html', 'M25 Leben in Ruinen und der Umgang mit Schuld – nach dem Modul von Offene Geschichte', 'GGK M25, nach dem Modul zum Kriegsende von Offene Geschichte: Kriegsende 1945. Quellen markieren, Belege sammeln, Fotos lesen, die Zwangsbesichtigung von Buchenwald beurteilen.', []),
 'm26': ('m26-kontinuitaeten.html', 'M26 Ende gut, alles gut? Kontinuitäten', 'GGK M26: Wie viel Nationalsozialismus steckte in der BRD? Schätzen, BND-Text, Steckbrief der Gruppe, Vergleichstafel, Sach- und Werturteil.', []),
 'm27': ('m27-die-vergessenen.html', 'M27 Die Vergessenen – Globalgeschichte des Zweiten Weltkriegs', 'GGK M27: Welche Geschichten des Zweiten Weltkriegs sind bekannt, welche nicht? Eigene Karte des Krieges, Weltkarte drehen, Strukturbild legen.', ['m27-karte.js']),
}
def bau(k):
    datei, titel, desc, extra = ST[k]
    css = (H/'basis.css').read_text('utf-8') + (H/'kern.css').read_text('utf-8') + ((H/f'{k}.css').read_text('utf-8') if (H/f'{k}.css').exists() else '')
    js = (H/'kern.js').read_text('utf-8') + ''.join((H/e).read_text('utf-8') for e in extra) + (H/f'{k}.js').read_text('utf-8')
    assert '</script' not in js
    texte = {'m26':'\n<script src="texte/m26-bnd.js"></script>','m27':'\n<script src="texte/m27-artikel.js"></script>'}.get(k,'')
    html = f'''<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>{titel}</title>
<meta name="description" content="{desc}">
<link rel="stylesheet" href="assets/gegenwart/bundle.css">
<style>
{css}</style>
</head>
<body>
<header class="kopf"><div class="kopf-in" id="kopf"></div><nav class="weg" id="weg" aria-label="Lernweg"></nav></header>
<main id="main" tabindex="-1"></main>
<div id="ueber"></div>
<noscript><p style="padding:2rem;max-width:40rem;margin:auto">Diese Lernumgebung braucht JavaScript. Die Inhalte stehen auch im Unterrichtsheft „Geschichte aktuell 1“ ({k.upper()}).</p></noscript>
<script src="assets/gegenwart/bundle.js"></script>{texte}
<script>
{js}</script>
</body>
</html>
'''
    (REPO/datei).write_text(html, 'utf-8'); print(datei, len(html))
for k in (sys.argv[1:] or ST): bau(k)
