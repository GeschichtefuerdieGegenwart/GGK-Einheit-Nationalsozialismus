#!/usr/bin/env python3
"""Baut das Musterblatt »Arbeitsblatt Geschichte« als eine Datei (Schriften eingebettet).
Aufruf: python3 docs/neufassung/musterblatt/bau_muster.py [Ausgabe für die Vorschau-Fassung]"""
import base64, pathlib, sys
H = pathlib.Path(__file__).resolve().parent
R = H.parents[2]
F = R / 'assets' / 'fonts'
def b64(n): return base64.b64encode((F / n).read_bytes()).decode()
FACES = [('Fraunces', 'Fraunces72pt-SemiBold.woff', 'woff', 600, 'normal'), ('Fraunces', 'Fraunces72pt-SemiBoldItalic.woff', 'woff', 600, 'italic'),
         ('Atkinson Hyperlegible', 'AtkinsonHyperlegible-Regular.woff2', 'woff2', 400, 'normal'), ('Atkinson Hyperlegible', 'AtkinsonHyperlegible-Bold.woff2', 'woff2', 700, 'normal'),
         ('Atkinson Hyperlegible', 'AtkinsonHyperlegible-Italic.woff2', 'woff2', 400, 'italic')]
fonts = ''.join(f'@font-face{{font-family:"{fam}";src:url(data:font/{fmt};base64,{b64(dat)}) format("{fmt}");font-weight:{w};font-style:{st};font-display:swap}}\n' for fam, dat, fmt, w, st in FACES)
KORN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='360' height='360'%3E%3Cfilter id='k'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .17  0 0 0 0 .15  0 0 0 0 .12  0 0 0 .42 -.13'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23k)'/%3E%3C/svg%3E\")"
css = (H / 'muster.css').read_text('utf-8').replace('KORN', KORN)
js = (H / 'muster.js').read_text('utf-8')
body = (H / 'muster.html').read_text('utf-8')
datei = body.replace('HINWEIS', 'Sichern, Laden und Drucken kannst du hier ausprobieren.')
vorschau = body.replace('HINWEIS', 'In dieser Vorschau starten Datei-Download und Drucken nicht; dafür gibt es die Datei-Fassung. »Stand als Text« und »Stand laden« gehen auch hier.')
kopf = '<title>Arbeitsblatt Geschichte</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n<style>\n' + fonts + css + '\n</style>\n'
voll = '<!DOCTYPE html>\n<html lang="de">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<meta name="robots" content="noindex">\n' + kopf + '</head>\n<body>\n' + datei + '<script>\n' + js + '\n</script>\n</body>\n</html>\n'
ziel = H.parent / 'Musterblatt_Arbeitsblatt_Geschichte.html'
ziel.write_text(voll, 'utf-8')
print(ziel.relative_to(R), len(voll.encode()) // 1024, 'KB')
if len(sys.argv) > 1:
    p = pathlib.Path(sys.argv[1]); p.write_text(kopf + vorschau + '<script>\n' + js + '\n</script>\n', 'utf-8'); print(p, p.stat().st_size // 1024, 'KB')
