#!/usr/bin/env python3
"""Zieht Quellen, Texte und Bilder der Stunden M29–M44 aus dem Heft-PDF (kein Abtippen).
Aufruf: python3 tools/owk_texte.py <Heft.pdf> [Ordner mit OCR-Seiten s-236.png, s-237.png]
Schreibt: src/ost-west/quellen.js (öffentlich), ost-west/texte/owk-m41.js (nur Moodle), ost-west/media/owk-*.jpg"""
import sys, re, json, subprocess, pathlib, tempfile
PDF = sys.argv[1]; OCR = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 else None
REPO = pathlib.Path(__file__).resolve().parent.parent
def roh(p, crop=None):
    cmd = ['pdftotext', '-f', str(p), '-l', str(p)]
    if crop: x, y, w, h = [int(round(v)) for v in crop]; cmd += ['-r', '72', '-x', str(x), '-y', str(y), '-W', str(w), '-H', str(h)]
    return subprocess.run(cmd + [PDF, '-'], capture_output=True, text=True).stdout
def glatt(t):
    z = [l.strip() for l in t.split('\n')]
    z = [l for l in z if l and not re.fullmatch(r'\d{1,2}', l) and not re.match(r'(Klasse: J2|Walter \(WM\)|GGK$)', l)]
    s = ' '.join(z)
    s = re.sub(r'(?<=[a-zäöüß])- (?=[a-zäöüß])', '', s)          # Silbentrennung
    s = re.sub(r'\s(\d{1,2})\s(?=[a-zäöüßA-ZÄÖÜ])', ' ', s)     # Zeilennummern im Satz
    s = s.replace(' ,', ',').replace('„„', '„').replace(',Kalte Krieg"', '„Kalte Krieg“')
    s = re.sub(r'"([^"]+)"', r'„\1“', s).replace('“"', '“')
    return re.sub(r'\s+', ' ', s).strip()
def zwischen(s, a, b=None):
    i = s.index(a); j = s.index(b, i) + len(b) if b else len(s); return s[i:j]
def saetze(s):
    t = re.split(r'(?<=[.!?“”…\]])\s+(?=[A-ZÄÖÜ„\[])', s); aus = []
    for x in t:
        if aus and (re.search(r'(\d\.|\bz\. B\.|\bNr\.|\bu\. a\.|\bbzw\.)$', aus[-1]) or len(x) < 12 or re.fullmatch(r'\[(\.\.\.|…)\]', aus[-1]) and False): aus[-1] += ' ' + x
        elif aus and re.fullmatch(r'\[(\.\.\.|…)\]', x): aus[-1] += ' ' + x
        else: aus.append(x)
    aus = [a.replace('[...]', '[…]') for a in aus]
    if len(aus) > 1 and aus[0] == '[…]': aus[1] = '[…] ' + aus[1]; aus = aus[1:]
    return aus
Q = {}
# --- M31: Truman, Shdanow
t = glatt(roh(222)); Q['truman'] = saetze(zwischen(t, '[...] Es ist eines', 'eigenen Nation. [...]'))
t = glatt(roh(224)); Q['shdanow'] = saetze(zwischen(t, 'Das durch den Zweiten', 'zu berücksichtigen.'))
# --- M34: Grotewohl, Adenauer (Seiten sind Bilder -> OCR)
def ocr(n):
    s = subprocess.run(['tesseract', str(OCR/f's-{n}.png'), '-', '-l', 'deu'], capture_output=True, text=True).stdout
    s = re.sub(r'\s+', ' ', s.replace('-\n', '').replace('\n', ' '))
    for a, b in (('eisemen', 'eisernen'), ('alllierte', 'alliierte'), ('in dem - ich', 'in dem – ich'), ('hervor - die', 'hervor – die'), ('[...]', '[…]')): s = s.replace(a, b)
    return s
if OCR:
    Q['grotewohl'] = saetze(zwischen(ocr(236), 'Die Bildung der Provisorischen', 'bestehen.'))
    Q['adenauer'] = saetze(zwischen(ocr(237), 'Die jüngsten Vorgänge', 'des deutschen Volkes.'))
# --- M30 Fakten
t = glatt(roh(221)); f = zwischen(t, '1. Die Sowjetunion behält')
Q['m30'] = [x.strip() for x in re.split(r'\s(?=[1-7]\. [A-Z])', f)]
Q['m30'] = [re.sub(r'^\d\. ', '', x) for x in Q['m30']]
# --- M31.1 (zweispaltig, je Abschnitt)
def spalten(p, y0, y1, xm=303, x0=60, x1=560):
    return glatt(roh(p, (x0, y0, xm - x0, y1 - y0)) + '\n' + roh(p, (xm, y0, x1 - xm, y1 - y0)))
def ykopf(p, muster):
    with tempfile.NamedTemporaryFile(suffix='.html') as f:
        subprocess.run(['pdftotext', '-f', str(p), '-l', str(p), '-bbox-layout', PDF, f.name]); h = open(f.name, encoding='utf-8').read()
    aus = {}
    for m in re.finditer(r'<line xMin="[\d.]+" yMin="([\d.]+)" xMax="[\d.]+" yMax="([\d.]+)">(.*?)</line>', h, re.S):
        w = ' '.join(re.findall(r'>([^<]+)</word>', m.group(3)))
        for k in muster:
            if w.startswith(k) and k not in aus: aus[k] = (float(m.group(1)), float(m.group(2)))
    return aus
y = ykopf(225, ['1.)', '2.)', 'England:']); 
Q['m311_1'] = spalten(225, y['1.)'][1], y['2.)'][0] - 2)
Q['m311_2'] = spalten(225, y['2.)'][1], 842)
y = ykopf(226, ['3.)', '4.)'])
Q['m311_3'] = spalten(226, y['3.)'][1], y['4.)'][0] - 2)
Q['m311_4'] = spalten(226, y['4.)'][1], 842)
Q['m311_2'] = zwischen(Q['m311_2'], 'George Marshall', 'Sachlieferungen und Kredite.').replace('die nur zu, Zurückbezahlt', 'die nur zu […] zurückbezahlt').replace('die nur zu , Zurückbezahlt', 'die nur zu […] zurückbezahlt')
Q['marshall'] = [['England', 3.3], ['Frankreich', 2.6], ['Italien', 1.4], ['Westdeutschland', 1.3], ['Niederlande', 1.1]]   # Tabelle M31.1, Milliarden US-Dollar
for k in ('m311_1', 'm311_2', 'm311_3', 'm311_4'): Q[k] = Q[k].replace('TrumanDoktrin', 'Truman-Doktrin').replace('Marshall-plan', 'Marshallplan').replace('Lânder', 'Länder').replace('erschärft', 'verschärft').replace('vorangetrieben', 'vorangetrieben')
# --- M32, M33, M35/36, M39
Q['m32'] = zwischen(glatt(roh(228)), 'Als sich zeigte', 'Amerikaner und Briten.')
m33 = [glatt(roh(231, (82, 289, 223, 361))), glatt(roh(231, (305, 289, 225, 361)))]
Q['m33'] = ['In ihrer Zone stellte die sowjetische Besatzungsmacht von Anfang an die Weichen in Richtung Volksdemokratie. Immer deutlicher und größer wurden deshalb die Gegensätze ' + m33[0],
            'Bis 1949 führte die sowjetische Militärverwaltung in Zusammenarbeit mit den deutschen Kommunisten einige wichtige Maßnahmen durch: Bereits Ende Juli 1945 begann die Er' + m33[1]]
t = glatt(roh(238)); Q['m36_lemo'] = zwischen(t, 'Die Meinungsverschiedenheiten', '(SED).'); Q['lemo'] = saetze(Q['m36_lemo']); Q['m36_a'] = zwischen(t, 'Konrad Adenauer – der erste', 'Soldaten geben.'); Q['m36_spd'] = zwischen(t, 'Die Bundesrepublik hat nach', 'führen …')
Q['m36_b'] = zwischen(glatt(roh(239)), 'Im Juli 1951', 'allgemeinen Wehrpflicht.')
Q['m35_wahl'] = zwischen(glatt(roh(241)), 'Bundeskanzler Konrad Adenauer hatte', 'durchgesetzt.')
t = glatt(roh(251)); Q['m39'] = zwischen(t, 'Bis 1961 verließen', 'höchsten Lebensstandar') + 'd.'
# --- M37 Flüchtlingsprotokolle
t = glatt(roh(246))
q3 = zwischen(t, 'Ich konnte dem Druck', 'kaum möglich.')
Q['m37'] = [zwischen(t, 'Wir, meine Frau', 'entzogen.'),
            (zwischen(t, '1941 wurde ich', 'Papieren und Filmen,') + ' ' + zwischen(t, 'mit alten Apparaten', 'verlassen.')),
            q3, zwischen(t, 'Am 15.7.', 'bieten.')]
Q['m37'] = [re.sub(r'\.(?=[A-ZÄÖÜ])', '. ', x) for x in Q['m37']]
# --- M36 Tabelle
t = roh(242); Q['flucht'] = [[int(a), int(b.replace(' ', '')), (float(c.replace(',', '.')) if c != '-' else None)] for a, b, c in re.findall(r'(19\d\d)\s+(\d{3} \d{3})\s+(-|\d\d,\d)', ' '.join(t.split()))]
assert len(Q['flucht']) == 13, Q['flucht']
(REPO/'src'/'ost-west'/'quellen.js').write_text('/* Aus dem Heft gezogen mit tools/owk_texte.py – nicht von Hand ändern. */\nconst HEFT = ' + json.dumps(Q, ensure_ascii=False, indent=0) + ';\n', 'utf-8')
for k, v in Q.items():
    d = json.dumps(v, ensure_ascii=False); print(k, len(v) if isinstance(v, list) else len(v.split()), '|', d[:70], '…', d[-60:])
# --- M41 (Artikel der bpb im vollen Wortlaut): nur Moodle
t = glatt(roh(259) + '\n' + roh(260)); (REPO/'ost-west'/'texte').mkdir(exist_ok=True)
(REPO/'ost-west'/'texte'/'owk-m41.js').write_text('window.OWK_M41 = ' + json.dumps(t, ensure_ascii=False) + ';\n', 'utf-8'); # --- Bilder
import shutil
BILD = {'p215-000':'owk-s1-zonen','p221-000':'owk-s1-potsdam','p222-000':'owk-s2-truman','p225-000':'owk-s2-marshallplan','p225-003':'owk-s2-karikatur-drei','p226-000':'owk-s2-bloecke-welt','p238-000':'owk-s2-bloecke-europa','p228-000':'owk-s3-luftbruecke','p239-000':'owk-s5-andernach','p239-001':'owk-s5-protest','p240-000':'owk-s5-wahlen','p251-000':'owk-s6-bernauer','p251-001':'owk-s6-schulze','p251-003':'owk-s6-schumann','p225-002':'owk-s6-kuba-karikatur','p252-000':'owk-s7-juni','p259-000':'owk-s8-demo','p266-000':'owk-s9-trabi'}
SCAN = {'p263-000':'owk-scan-m42-a','p264-000':'owk-scan-m42-b','p265-000':'owk-scan-m43','p267-000':'owk-scan-m44-zeit','p268-000':'owk-scan-m44-b'}
with tempfile.TemporaryDirectory() as d:
    for p in sorted({int(k[1:4]) for k in list(BILD) + list(SCAN)}):
        subprocess.run(['pdfimages', '-f', str(p), '-l', str(p), '-png', PDF, f'{d}/p{p}'])
    gross = lambda f: int(subprocess.run(['identify', '-format', '%w', f], capture_output=True, text=True).stdout or 0)
    for p in sorted({int(k[1:4]) for k in list(BILD) + list(SCAN)}):
        fs = [f for f in sorted(pathlib.Path(d).glob(f'p{p}-*.png')) if gross(str(f)) != 209 and gross(str(f)) >= 150]
        for i, f in enumerate(fs):
            k = f'p{p}-{i:03d}'; n = BILD.get(k) or SCAN.get(k)
            if n: subprocess.run(['convert', str(f), '-background', 'white', '-alpha', 'remove', '-resize', '1600x1600>', '-quality', '82', str(REPO/'ost-west'/'media'/f'{n}.jpg')]); print(k, n)
    # Karikatur M34 (Seite ist ein Bild): Ausschnitt
    if OCR: subprocess.run(['convert', str(OCR/'h-234.png'), '-crop', '1580x700+440+545', '+repage', '-quality', '85', str(REPO/'ost-west'/'media'/'owk-s4-goldfisch.jpg')])
print('m41', len(t.split()), t[:90], '…', t[-140:])
