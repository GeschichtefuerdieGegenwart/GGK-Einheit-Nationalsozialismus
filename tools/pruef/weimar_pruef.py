#!/usr/bin/env python3
"""Statische Prüfungen für das Kapitel Weimar (ohne Browser):
1. Landkarte des Kapitels: Stimmt W_LK in weimar.js mit den Einträgen überein, die die Stunden als »zentral« zurückmelden? Kommen alle neun Einträge aus 2.1 vor?
2. Selbsttests: Ist die richtige Antwort auffällig oft die längste oder die erste? (Fallstrick »Die Lösung verrät sich durch die Form«)
3. Operatoren der Schreibaufträge: Welche kommen wie oft vor?
Aufruf: python3 tools/pruef/weimar_pruef.py"""
import re, json, sys
from pathlib import Path
W = Path(__file__).resolve().parents[2] / 'src' / 'weimar'
bad = []
wj = (W / 'weimar.js').read_text('utf-8')
wlk = json.loads(re.sub(r'(m\d+):', r'"\1":', re.search(r'const W_LK = (\{.*?\});', wj, re.S).group(1)))
mods = re.findall(r'\["(m\d+)","(M[\d.]+)","[^"]+","[^"]+\.html","[a-d]"\]', wj)
alle = set()
print('1 · Landkarte des Kapitels')
for k, nr in mods:
    s = (W / f'{k}.js').read_text('utf-8')
    m = re.search(r'landkarteL\(\{(.*?)bruecke:', s, re.S)
    zentral = set(re.findall(r'"([\d-]+)":\["zentral"', m.group(1))) if m else set()
    soll = {e[0] for e in wlk.get(k, [])}
    alle |= zentral
    if zentral != soll: bad.append(f'{nr}: W_LK {sorted(soll)} ≠ zentral in der Stunde {sorted(zentral)}')
    zf = re.search(r'\n  lk:\{ name:"([^"]*)"', s)
    print(f'  {nr:6} zentral: {", ".join(sorted(zentral)):22} Zusammenfassung: {zf.group(1) if zf else "–"}')
fehlt = [f'2-1-{i}' for i in range(1, 10) if f'2-1-{i}' not in alle and i != 7]
if fehlt: bad.append(f'Einträge aus 2.1 ohne Stunde: {fehlt}')
print('  2.1 abgedeckt:', sorted(x for x in alle if x.startswith('2-1-')), '· 2.1.7 Konstruktivität steht im Abschluss der Kapitelübersicht')
print('2 · Selbsttests: Länge und Platz der richtigen Antwort')
n = lang = erst = 0
for p in sorted(W.glob('m*.js')):
    s = p.read_text('utf-8')
    for q in re.finditer(r'\[\[("(?:[^"\\]|\\.)*"),\s*(true|false),\s*"(?:[^"\\]|\\.)*"\](?:,\s*\["(?:[^"\\]|\\.)*",\s*(?:true|false),\s*"(?:[^"\\]|\\.)*"\])+\]', s):
        opt = re.findall(r'\["((?:[^"\\]|\\.)*)",\s*(true|false),', q.group(0))
        r = [i for i, o in enumerate(opt) if o[1] == 'true']
        if len(r) != 1: bad.append(f'{p.name}: Frage mit {len(r)} richtigen Antworten: {opt[0][0][:40]}'); continue
        n += 1; L = [len(o[0]) for o in opt]
        if L[r[0]] == max(L) and L.count(max(L)) == 1: lang += 1
        if r[0] == 0: erst += 1
if n:
    print(f'  {n} Fragen · richtige Antwort ist die längste: {lang} · steht an erster Stelle: {erst}')
    if lang > n * .5: bad.append(f'Richtige Antwort ist in {lang} von {n} Fragen die längste')
    if erst > n * .5: bad.append(f'Richtige Antwort steht in {erst} von {n} Fragen an erster Stelle')
print('3 · Operatoren der Schreibaufträge')
op = {}
for k, nr in mods:
    s = (W / f'{k}.js').read_text('utf-8'); a = re.search(r'aufgabe:`([^`]*)`', s).group(1)
    for o in re.findall(r'<b>(?:[ab]\) )?([^<]+?)\.?</b>', a): op.setdefault(o.strip().split(' Sie')[0], []).append(nr)
for o, wo in sorted(op.items(), key=lambda x: -len(x[1])): print(f'  {o:14} {len(wo)}×  {", ".join(wo)}')
print(f'\n{len(bad)} offen'); [print('  –', b) for b in bad]
sys.exit(1 if bad else 0)
