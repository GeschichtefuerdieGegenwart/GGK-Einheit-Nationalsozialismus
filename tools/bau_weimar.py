#!/usr/bin/env python3
"""Baut das Kapitel »Weimarer Republik« nach weimar/: Übersicht (index.html) und die Stunden M1 … M14.2.
Je Seite eine HTML-Datei mit eingebettetem CSS und JS; Schriften und Gegenwart-Bausteine aus ../assets/.
Aufruf: python3 tools/bau_weimar.py [hub m01 m05 …]"""
import sys, pathlib, json, re
REPO = pathlib.Path(__file__).resolve().parent.parent
K = REPO/'src'/'m25-m27'; H = REPO/'src'/'weimar'; ZIEL = REPO/'weimar'
# Stundenfolge aus weimar.js lesen: ["m01","M1","Titel","datei.html","a"]
MODULE = re.findall(r'\["(m\d+)","(M[\d.]+)","([^"]+)","([^"]+\.html)","([a-d])"\]', (H/'weimar.js').read_text('utf-8'))
# Fremde Texte im vollen Wortlaut: nur im Moodle-Paket (weimar/texte/, in .gitignore)
TEXTE = {'m03': ['m03-tagesspiegel.js'], 'm06': ['m06-kershaw.js'], 'm14': ['m14-quellen.js']}
SCHALE = '''<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>{titel}</title>
<meta name="description" content="{desc}">
<link rel="stylesheet" href="../assets/gegenwart/bundle.css">
<style>
{css}</style>
</head>
<body>
<header class="kopf"><div class="kopf-in" id="kopf"></div></header>
{rumpf}
<div id="ueber"></div>
<noscript><p style="padding:2rem;max-width:40rem;margin:auto">Diese Lernumgebung braucht JavaScript. Die Inhalte stehen auch im Unterrichtsheft „Geschichte aktuell 1“ (M1–M14).</p></noscript>
<script type="application/json" id="lehr-daten">{lehr}</script>
<script src="../assets/gegenwart/bundle.js"></script>{tx}
<script>
{js}</script>
</body>
</html>
'''
BLATT = '<div class="ab-rahmen"><aside class="ab-reg" id="reg" aria-label="Aufträge dieses Blatts"></aside><main id="main" tabindex="-1"></main></div>'
def gebaut():
    return [m[0] for m in MODULE if (H/f'{m[0]}.js').exists()]
def css(extra=''):
    return (K/'basis.css').read_text('utf-8').replace('url(assets/', 'url(../assets/') + (K/'kern.css').read_text('utf-8') + (K/'blatt.css').read_text('utf-8') + (H/'weimar.css').read_text('utf-8') + extra
def lehr(k):
    p = REPO/'lk'/f'w-{k}.enc.json'
    return p.read_text('utf-8').strip() if p.exists() else 'null'
def kopfjs():
    return 'window.GGK_ZURUECK = "../index.html";\nwindow.W_GEBAUT = ' + json.dumps(gebaut()) + ';\n'
def bau(k):
    if k == 'hub':
        js = kopfjs() + ''.join(p.read_text('utf-8') for p in (K/'kern.js', K/'blatt.js', REPO/'src'/'lk-schloss.js', H/'weimar.js', H/'hub.js'))
        assert '</script' not in js
        html = SCHALE.format(titel='Weimarer Republik 1914–1933 – Kapitelübersicht', desc='GGK Jahrgangsstufe 1: Vom Ersten Weltkrieg bis zum Ende der Weimarer Republik. Alle Stunden, Ankerdaten, roter Faden und das kollektive Gedächtnis der Republik.',
                             css=css((H/'hub.css').read_text('utf-8')), rumpf='<main id="main" tabindex="-1"></main>', lehr=lehr('hub'), tx='', js=js)
        (ZIEL/'index.html').write_text(html, 'utf-8'); print('index.html', len(html)); return
    m = next(x for x in MODULE if x[0] == k)
    teile = [K/'kern.js', K/'blatt.js', REPO/'src'/'lk-schloss.js', H/'weimar.js', H/f'{k}.js']
    js = kopfjs() + ''.join(p.read_text('utf-8') for p in teile)
    assert '</script' not in js, k
    extra = (H/f'{k}.css').read_text('utf-8') if (H/f'{k}.css').exists() else ''
    tx = ''.join(f'\n<script src="texte/{t}"></script>' for t in TEXTE.get(k, []))
    desc = f'GGK {m[1]}: {m[2]}. Arbeitsblatt mit Register, Schreibauftrag im Format der Klassenarbeit und Zusammenfassung auf zwei Seiten.'
    html = SCHALE.format(titel=f'{m[1]} {m[2]}', desc=desc.replace('"', '&quot;'), css=css(extra), rumpf=BLATT, lehr=lehr(k), tx=tx, js=js)
    (ZIEL/m[3]).write_text(html, 'utf-8'); print(m[3], len(html))
if __name__ == '__main__':
    ZIEL.mkdir(exist_ok=True)
    for k in (sys.argv[1:] or (gebaut() + (['hub'] if (H/'hub.js').exists() else []))): bau(k)
