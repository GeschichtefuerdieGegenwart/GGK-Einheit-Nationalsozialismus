#!/usr/bin/env python3
"""Baut m16/m17 und m25/m26/m27 als je eine HTML-Datei (CSS und JS eingebettet; Gegenwart-Bundle und Schriften aus assets/).
Seit 18.11.2026 im Blatt-Rahmen: links das Register, rechts ein Auftrag je Seite (blatt.js, blatt.css; L.blattAuto in der Stunde)."""
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
# Teil 2 zu den handgebauten Stunden (seit 18.11.2026): Landkarte und Schreibauftrag im Blatt-Rahmen. Der Lehrkrafttext ist der der Stunde.
T2 = {
 'm18t': ('m18-teil2.html', 'M18 Teil 2 – Landkarte und Schreibauftrag zu den fünf Säulen der NS-Ideologie', 'GGK M18, Teil 2 nach der Stunde: Wozu die Ideen der Täter kennen? Landkarten-Auftrag und Schreibauftrag im Format der Klassenarbeit.', 'm18'),
 'm19t': ('m19-teil2.html', 'M19 Teil 2 – Landkarte und Schreibauftrag zur Appeasement-Politik', 'GGK M19, Teil 2 nach der Stunde: Retrospektivität und Rückschaufehler, Schreibauftrag zum Münchner Abkommen im Format der Klassenarbeit. Öffnet nach dem dritten Codewort.', 'm19'),
 'm20t': ('m20-teil2.html', 'M20 Teil 2 – Landkarte und Schreibauftrag zu den Dilemmata des Krieges', 'GGK M20, Teil 2 nach der Stunde: Wer konnte entscheiden? Sach- und Werturteil zu den Flächenangriffen im Format der Klassenarbeit. Öffnet nach dem dritten Codewort.', 'm20'),
 'm21t': ('m21-teil2.html', 'M21 Teil 2 – Schreibauftrag: Es geht um Menschen', 'GGK M21, Teil 2 nach der Stunde: Schreibauftrag im Format der Klassenarbeit zu einem belegten Lebensweg.', 'm21'),
 'm23t': ('m23-teil2.html', 'M23 Teil 2 – Landkarte und Schreibauftrag zum Ländervergleich', 'GGK M23, Teil 2 nach der Stunde: Was tut ein Modell? Schreibauftrag im Format der Klassenarbeit zum Ländervergleich.', 'm23'),
}
def bau(k):
    t2 = k in T2
    datei, titel, desc, extra = (T2[k][0], T2[k][1], T2[k][2], ['teil2.js']) if t2 else ST[k]
    css = (H/'basis.css').read_text('utf-8') + (H/'kern.css').read_text('utf-8') + (H/'blatt.css').read_text('utf-8') + ((H/'teil2.css').read_text('utf-8') if t2 else '') + ((H/f'{k}.css').read_text('utf-8') if (H/f'{k}.css').exists() else '')
    js = (H/'kern.js').read_text('utf-8') + (H/'blatt.js').read_text('utf-8') + (REPO/'src'/'lk-schloss.js').read_text('utf-8') + ''.join((H/e).read_text('utf-8') for e in extra) + (H/f'{k}.js').read_text('utf-8')
    assert '</script' not in js
    lehr = (REPO/'lk'/f'{T2[k][3] if t2 else k}.enc.json').read_text('utf-8').strip()
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
<header class="kopf"><div class="kopf-in" id="kopf"></div></header>
<div class="ab-rahmen"><aside class="ab-reg" id="reg" aria-label="Aufträge dieses Blatts"></aside><main id="main" tabindex="-1"></main></div>
<div id="ueber"></div>
<noscript><p style="padding:2rem;max-width:40rem;margin:auto">Diese Lernumgebung braucht JavaScript. Die Inhalte stehen auch im Unterrichtsheft „Geschichte aktuell 1“ ({(T2[k][3] if t2 else k).upper()}).</p></noscript>
<script type="application/json" id="lehr-daten">{lehr}</script>
<script src="assets/gegenwart/bundle.js"></script>{texte}
<script>
{js}</script>
</body>
</html>
'''
    (REPO/datei).write_text(html, 'utf-8'); print(datei, len(html))
for k in (sys.argv[1:] or list(ST) + list(T2)): bau(k)
