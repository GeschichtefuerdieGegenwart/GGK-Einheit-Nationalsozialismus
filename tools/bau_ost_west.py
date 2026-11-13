#!/usr/bin/env python3
"""Baut die Ost-West-Einheit nach ost-west/: Übersicht (index.html) und Stunden s1 … s9.
Je Seite eine HTML-Datei mit eingebettetem CSS und JS; Schriften und Gegenwart-Bausteine aus ../assets/.
Aufruf: python3 tools/bau_ost_west.py [hub s1 …]"""
import sys, pathlib, json
REPO = pathlib.Path(__file__).resolve().parent.parent
K = REPO/'src'/'m25-m27'; H = REPO/'src'/'ost-west'; ZIEL = REPO/'ost-west'
# Schlüssel: (Datei, Titel, Beschreibung, weitere JS-Dateien, Textdateien aus ost-west/texte/)
ST = {
 's1': ('s1-stunde-null.html', 'Ost-West 1 · Die Stunde Null', 'Potsdam 1945: Interessen der Sieger, Vorhersage, Abkommen, Urteil.', [], []),
 's2': ('s2-ideologien.html', 'Ost-West 2 · Kommunismus gegen Kapitalismus', 'Truman-Doktrin und Zwei-Lager-Theorie im Vergleich, Marshallplan, Blockbildung.', [], []),
 's3': ('s3-blockade.html', 'Ost-West 3 · Die Berlin-Blockade', 'Währungsreform, Blockade und Luftbrücke; die sowjetische Besatzungszone.', [], []),
 's4': ('s4-staatsgruendung.html', 'Ost-West 4 · Die doppelte Staatsgründung', 'Grotewohl und Adenauer 1949: zwei Regierungserklärungen im Vergleich.', [], []),
 's5': ('s5-westintegration.html', 'Ost-West 5 · Die Bindung an den Westen', 'Westintegration und Wiederbewaffnung der Bundesrepublik: Streit, Schritte, Wahl 1957.', [], []),
 's6': ('s6-flucht-und-mauer.html', 'Ost-West 6 · Flucht und Mauer', 'Fluchtbewegung 1949 bis 1961, Fluchtgründe, Mauerbau.', [], []),
 's7': ('s7-geschichte-im-staatsdienst.html', 'Ost-West 7 · Geschichte im Staatsdienst?', 'Der 17. Juni 1953 in einem Schulbuch der DDR und einem der Bundesrepublik.', [], []),
 's8': ('s8-ostpolitik.html', 'Ost-West 8 · Wandel durch Annäherung', 'Ostverträge, Streit im Bundestag, KSZE.', [], ['owk-m41.js']),
 's9': ('s9-ende.html', 'Ost-West 9 · Das Ende der DDR und des Ost-West-Konflikts', '1989 bis 1991: Wege zum Mauerfall, friedliche Revolution, Zwei-plus-Vier.', [], []),
 'hub': ('index.html', 'Der Ost-West-Konflikt – Einheit', 'GGK Jahrgangsstufe 2: Der Ost-West-Konflikt 1945–1991. Zeitraster mit 16 Ereigniskarten, Ordnen, Vernetzen, Glossar und roter Faden.', [], []),
}
def gebaut():
    return [k for k in ST if k != 'hub' and (H/f'{k}.js').exists()]
def vorhanden():
    return ['hub'] + gebaut()
def bau(k):
    datei, titel, desc, extra, texte = ST[k]
    css = (K/'basis.css').read_text('utf-8').replace('url(assets/', 'url(../assets/') + (K/'kern.css').read_text('utf-8') + (H/'owk.css').read_text('utf-8') + ((H/f'{k}.css').read_text('utf-8') if (H/f'{k}.css').exists() else '')
    teile = [K/'kern.js', REPO/'src'/'lk-schloss.js', H/'karten.js'] + ([H/'glossar.js', H/'einheit.js'] if k == 'hub' else [H/'einheit.js', H/'quellen.js', H/'stunde.js']) + [H/e for e in extra] + [H/f'{k}.js']
    js = 'window.OWK_GEBAUT = ' + json.dumps(gebaut()) + ';\n' + ''.join(t.read_text('utf-8') for t in teile)
    assert '</script' not in js
    lehr = (REPO/'lk'/f'ow-{k}.enc.json').read_text('utf-8').strip()
    tx = ''.join(f'\n<script src="texte/{t}"></script>' for t in texte)
    html = f'''<!doctype html>
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
<header class="kopf"><div class="kopf-in" id="kopf"></div><nav class="weg" id="weg" aria-label="Lernweg"></nav></header>
<main id="main" tabindex="-1"></main>
<div id="ueber"></div>
<noscript><p style="padding:2rem;max-width:40rem;margin:auto">Diese Lernumgebung braucht JavaScript. Die Inhalte stehen auch im Unterrichtsheft „Geschichte aktuell 1“ (M28–M44).</p></noscript>
<script type="application/json" id="lehr-daten">{lehr}</script>
<script src="../assets/gegenwart/bundle.js"></script>{tx}
<script>
{js}</script>
</body>
</html>
'''
    (ZIEL/datei).write_text(html, 'utf-8'); print(datei, len(html))
if __name__ == '__main__':
    for k in (sys.argv[1:] or vorhanden()): bau(k)
