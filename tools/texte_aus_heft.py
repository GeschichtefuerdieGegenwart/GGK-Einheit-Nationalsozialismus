#!/usr/bin/env python3
"""Liest den BND-Text (M26) und den Artikel von Nils Sandrisser (M27) aus dem Heft
„Geschichte aktuell 1“ (PDF) und schreibt sie als texte/m26-bnd.js und texte/m27-artikel.js.
Aufruf: python3 tools/texte_aus_heft.py <Heft.pdf>
Die Dateien enthalten Texte Dritter und liegen nur im Moodle-Paket (siehe .gitignore)."""
import sys, re, json, subprocess, pathlib
REPO = pathlib.Path(__file__).resolve().parent.parent
def seite(pdf, p):
    t = subprocess.run(['pdftotext', '-raw', '-f', str(p), '-l', str(p), pdf, '-'], capture_output=True, text=True).stdout
    L = [l.strip() for l in t.split('\n') if l.strip() and not re.match(r'^(Klasse: SGG J[12]|Walter \(WM\)|GGK)$', l.strip())]
    out = ''
    for l in L:
        if out.endswith('-'):
            pre = re.search(r'(\S+)-$', out).group(1).split('[')[-1].strip('„"')
            if l[:1].islower() and not re.fullmatch(r'[A-ZÄÖÜ]{2,}', pre): out = out[:-1] + l
            elif l[:1].islower(): out += ' ' + l
            else: out += l
        else: out = (out + ' ' + l) if out else l
    out = re.sub(r'\s*(Klasse: SGG J[12]|Walter \(WM\)|\bGGK\b)\s*', ' ', out)
    out = re.sub(r'„([^"“„]*)"', r'„\1“', out)
    out = re.sub(r'"([^"“„]*)"', r'„\1“', out)
    return re.sub(r'\s+', ' ', out).strip()
def zwischen(s, a, b=None):
    i = s.index(a); j = s.index(b, i + len(a)) if b else len(s); return s[i:j].strip()
def saetze(t):
    t = t.strip(); teile = re.split(r'(?<=[.!?“"])\s+(?=[A-ZÄÖÜ„"0-9•])', t)
    return [x.strip() for x in teile if x.strip()]
pdf = sys.argv[1]
# ---------- M26
s = seite(pdf, 178) + ' ' + seite(pdf, 179)
s = zwischen(s, 'Neue Studie: BND rekrutierte', 'a) Welche Personen wurden vom BND gezielt angeworben? b)') if s.count('a) Welche') > 1 else s
t = zwischen(s, 'Neue Studie: BND rekrutierte')
titel = 'Neue Studie: BND rekrutierte gezielt NS-Verbrecher'
stand = zwischen(t, 'Stand:', 'Der Bundesnachrichtendienst')
lead = zwischen(t, 'Der Bundesnachrichtendienst', 'Von Christine Rütten')
autor = zwischen(t, 'Von Christine Rütten', '10 bis 20 Prozent')
A = ['10 bis 20 Prozent', 'Konkrete Beispiele von NS-Mördern', 'Kein Unrechtsbewusstsein:', 'Gehlen wollte ein neues', 'Die „vier Lügen“', 'Adenauer und Globke griffen nicht ein:', 'Bilanz:']
ende = t.index('a) Welche Personen') if 'a) Welche Personen' in t else len(t)
pos = [t.index(a) for a in A] + [ende]
karten = []
for k, a in enumerate(A):
    stueck = t[pos[k]:pos[k + 1]].strip()
    if ':' in stueck[:60] and k > 0:
        kopf, rest = stueck.split(':', 1)
    else:
        kopf, rest = 'Die Studie', stueck
    kopf = kopf.strip(); rest = rest.strip()
    if '•' in rest:
        teile = [x.strip() for x in rest.split('•') if x.strip()]
        pers = []
        for x in teile:
            name, _, text = x.partition(':') if ':' in x[:80] else (x, '', '')
            pers.append({'name': name.strip(), 'saetze': saetze(text)})
        karten.append({'titel': kopf, 'personen': pers})
    else:
        karten.append({'titel': kopf, 'saetze': saetze(rest)})
m26 = {'titel': titel, 'stand': stand.replace('?utm_source=pocket-newtab-global-de-DE', ''), 'lead': lead, 'autor': autor, 'karten': karten,
       'nachweis': 'Text nach dem Unterrichtsheft „Geschichte aktuell 1“, M26 (Fassung der Lehrkraft nach tagesschau.de, 10.10.2022, Christine Rütten, hr).'}
# ---------- M27
s = seite(pdf, 181) + ' ' + seite(pdf, 182)
t = zwischen(s, 'Kolonien stellten Kanonenfutter und füllten Bordelle', '(Quelle: welt')
titel = 'Kolonien stellten Kanonenfutter und füllten Bordelle'
t = t[len(titel):].strip()
P = ['Millionen Soldaten', 'Für Edouard', 'Die Afrikaner und Asiaten', 'Die Opferzahlen', 'Bislang ist', 'Schon die gängige', 'Entschädigungen']
pos = [t.index(a) for a in P] + [len(t)]
abs_ = [t[pos[k]:pos[k + 1]].strip() for k in range(len(P))]
# Druckfehler im Heft: fehlender Punkt nach „an“ (im Original des Artikels vorhanden)
abs_ = [a.replace('Massaker unter der Zivilbevölkerung an Rössel ist', 'Massaker unter der Zivilbevölkerung an. Rössel ist') for a in abs_]
ORTE = [('fr', 'Frankreich'), ('bf', 'Burkina Faso'), ('ly', 'Libyen'), ('za', 'Südafrika'), ('et', 'Äthiopien'), ('cn', 'Chinas'), ('pz', 'Pazifikinseln'), ('kr', 'Korea'), ('in', 'Indien'), ('ph', 'Manila'), ('hi', 'Hiroshima'), ('ke', 'Kenia')]
for oid, wort in ORTE:
    for k, a in enumerate(abs_):
        m = re.search(r'(?<![\wÄÖÜäöü])' + re.escape(wort) + r'(?![\wäöü-])', a)
        if m: abs_[k] = a[:m.start()] + '{{' + oid + '|' + wort + '}}' + a[m.end():]; break
    else: raise SystemExit('Ort nicht gefunden: ' + wort)
m27 = {'titel': titel, 'autor': 'Nils Sandrisser', 'datum': '22.06.2015', 'lead': abs_[0], 'abs': abs_[1:],
       'nachweis': 'Nils Sandrisser: Kolonien stellten Kanonenfutter und füllten Bordelle, welt.de, 22.06.2015. Wiedergabe nach dem Unterrichtsheft „Geschichte aktuell 1“, M27.'}
for name, var, d in (('m26-bnd.js', 'TEXT_M26', m26), ('m27-artikel.js', 'TEXT_M27', m27)):
    (REPO / 'texte' / name).write_text(f'/* {d["nachweis"]} Nur im Moodle-Paket. */\nwindow.{var} = ' + json.dumps(d, ensure_ascii=False, indent=1) + ';\n', 'utf-8')
    print(name, sum(len(json.dumps(d, ensure_ascii=False).split()) for _ in [0]))
