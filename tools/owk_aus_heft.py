#!/usr/bin/env python3
"""Liest Texte der Ost-West-Einheit (M28–M44) aus dem Heft „Geschichte aktuell 1“ (PDF).
Aufruf: python3 tools/owk_aus_heft.py <Heft.pdf>
Schreibt src/ost-west/glossar.js (Glossar M28, Texte der Lehrkraft)."""
import sys, re, json, subprocess, pathlib
REPO = pathlib.Path(__file__).resolve().parent.parent
def seite(pdf, p):
    t = subprocess.run(['pdftotext', '-raw', '-f', str(p), '-l', str(p), pdf, '-'], capture_output=True, text=True).stdout
    L = [l.strip() for l in t.split('\n') if l.strip() and not re.match(r'^(Klasse: (SGG )?J[12]|Walter \(WM\)|GGK)$', l.strip())]
    out = ''
    for l in L:
        if out.endswith('-') and not out.endswith(' -'):
            pre = re.search(r'(\S+)-$', out).group(1).split('[')[-1].strip('„"(')
            if l[:1].islower() and not re.fullmatch(r'[A-ZÄÖÜ]{2,}', pre) and not l.startswith(('und ', 'oder ')): out = out[:-1] + l
            elif l[:1].islower(): out += ' ' + l
            else: out += l
        else: out = (out + ' ' + l) if out else l
    out = re.sub(r'\s*(Klasse: (SGG )?J[12]|Walter \(WM\)|\bGGK\b)\s*', ' ', out)
    out = re.sub(r'„([^"“„]*)"', r'„\1“', out); out = re.sub(r'"([^"“„]*)"', r'„\1“', out)
    return re.sub(r'\s+', ' ', out).strip()
def text(pdf, a, b): return ' '.join(seite(pdf, p) for p in range(a, b + 1))
def schneide(t, anker):
    """anker: Liste (schluessel, startwort). Liefert dict schluessel -> Text bis zum nächsten Anker."""
    pos = []
    i = 0
    for k, a in anker:
        j = t.index(a, i); pos.append((k, a, j)); i = j + len(a)
    out = {}
    for n, (k, a, j) in enumerate(pos):
        e = pos[n + 1][2] if n + 1 < len(pos) else len(t)
        out[k] = t[j + len(a):e].strip(' :•')
    return out
def sauber(s):
    s = re.sub(r'\s*•\s*', ' ', s); s = re.sub(r'\s+', ' ', s).strip()
    return s
if __name__ == '__main__':
    pdf = sys.argv[1]
    t = text(pdf, 188, 197); t = t[t.index("1. Grundbegriffe und Ideologien"):]
    G = [
     ('g', 'Blockbildung', 'Blockbildung Die'), ('g', 'Blockfreiheit', 'Blockfreiheit:'), ('g', 'Containment-Politik (Eindämmungspolitik)', 'Containment-Politik (Eindämmungspolitik):'),
     ('g', 'Demokratie vs. Diktatur', 'Demokratie vs. Diktatur:'), ('g', 'Kommunismus', 'Östliche Ideologie(n) Kommunismus:'), ('g', 'Sozialismus', 'Sozialismus:'),
     ('g', 'Westliche Ideologie (Liberale Demokratie / Kapitalismus)', 'Westliche Ideologie(n) (Liberale Demokratie / Kapitalismus):'), ('g', 'Eurozentrismus', 'Eurozentrismus:'),
     ('x', 'ereignisse', 'Wichtige Ereignisse und Krisen (chronologisch)'),
     ('i', 'COMECON / RGW (Rat für gegenseitige Wirtschaftshilfe)', 'COMECON / RGW (Rat für gegenseitige Wirtschaftshilfe)'), ('i', 'EWG / EG / EU', 'EWG / EG / EU'),
     ('i', 'KSZE (Konferenz über Sicherheit und Zusammenarbeit in Europa)', 'KSZE (Konferenz über Sicherheit und Zusammenarbeit in Europa)'), ('i', 'NATO (North Atlantic Treaty Organization)', 'NATO (North Atlantic Treaty Organization)'),
     ('i', 'UNO (United Nations Organization)', 'UNO (United Nations Organization)'),
     ('x', 'akteure', '3. Wichtige hist. Akteure im Ost-West-Konflikt'),
     ('a', 'Konrad Adenauer (1876–1967)', 'Adenauer, Konrad (1876-1967)'), ('a', 'Willy Brandt (1913–1992)', 'Brandt, Willy (1913-1992)'), ('a', 'Michail Gorbatschow (1931–2022)', 'Gorbatschow, Michail (geb. 1931)'),
     ('a', 'Erich Honecker (1912–1994)', 'Honecker, Erich (1912-1994)'), ('a', 'Josef Stalin (1878–1953)', 'Stalin, Josef (1878-1953)'), ('a', 'Harry S. Truman (1884–1972)', 'Truman, Harry S. (1884-1972)'),
     ('f', 'frauen', 'Die Frage, warum hier keine Frau'), ('a', 'Hanna Rydh (Schweden)', 'Hanna Rydh (Schweden):'), ('a', 'Gertrud Dorka (West-Berlin)', 'Gertrud Dorka (West-Berlin):'),
     ('x', 'konzepte', '4. Geschichtswissenschaftliche Konzepte'),
     ('k', 'Erinnerungskultur', 'Erinnerungskultur:'), ('k', 'Geschichtspolitik', 'Geschichtspolitik:'), ('k', 'Kollektives Gedächtnis (Aleida Assmann)', 'Kollektives Gedächtnis (Aleida Assmann):'),
     ('x', 'korea', 'Koreakrieg (1950-1953) als Fallbeispiel:'),
     ('k', 'Narrativität', 'Narrativität:'), ('k', 'Perspektivität', 'Perspektivität:'), ('k', 'Public History', 'Public History:'), ('k', 'Retrospektivität', 'Retrospektivität:'),
     ('k', 'Selektivität', 'Selektivität:'), ('k', 'Standortgebundenheit', 'Standortgebundenheit:'),
    ]
    st = schneide(t, [((g, n), a) for g, n, a in G])
    eintr = []; frauen = ''
    for (g, n), v in st.items():
        v = sauber(v)
        v = re.sub(r'\s*\d\. (Grundbegriffe|Institutionen).*$', '', v)
        v = re.sub(r'\s*2\. Institutionen&Organisationen im Ost-West-Konflikt$', '', v)
        if g == 'x': continue
        if g == 'f': frauen = 'Die Frage, warum hier keine Frau ' + v; continue
        v = re.sub(r'^Definition: ', '', v)
        eintr.append({'g': g, 't': n, 'x': v})
    for e in eintr:
        if e['t'] == 'Sozialismus': e['x'] = e['x'].replace('entwickelte sich der Sozia Rahmen', 'entwickelte sich der Sozia[lismus zur Sozialdemokratie, die Reformen im] Rahmen')
        if e['t'].startswith('Blockbildung'): e['x'] = 'Die ' + e['x']
    (REPO / 'src' / 'ost-west' / 'glossar.js').write_text('/* Glossar nach M28 (Unterrichtsheft „Geschichte aktuell 1“, Texte der Lehrkraft). Erzeugt mit tools/owk_aus_heft.py. */\nconst GLOSSAR = ' + json.dumps(eintr, ensure_ascii=False, indent=1) + ';\nconst GLOSSAR_FRAUEN = ' + json.dumps(frauen, ensure_ascii=False) + ';\n', 'utf-8')
    for e in eintr: print(e['g'], e['t'][:34].ljust(34), len(e['x'].split()), '|', e['x'][:60], '…', e['x'][-45:])
    print('FRAUEN', frauen[:80])
