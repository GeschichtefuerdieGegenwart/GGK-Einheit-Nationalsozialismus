#!/usr/bin/env python3
"""Arbeitsblatt Geschichte: baut je Einheit zwei ZIP-Pakete für Moodle – eines für die Lernenden, eines für die Lehrkraft.

Aufruf: python3 tools/bau_einheit_paket.py --einheit ns [--nur M22] [--apps <Ordner mit den geklonten eigenen Seiten>] [--ziel dist]

Paket für die Lernenden: index.html (der Hefter) ganz oben, die Blätter, Schriften, Bilder, Bildlisten, bei Bedarf eine Kopie der
kognitiven Landkarte (apps/landkarte/) und die Anleitung für Moodle. Nur relative Pfade.
Was dort anders ist als im Repository:
- Der Lehrkraftbereich fehlt ganz: Der Datenblock lehr-daten und das Schloss (zwischen den Marken LEHR-SCHLOSS) werden entfernt.
  Geprüft wird, dass kein Rest davon im Paket steht.
- »← Hefter« zeigt auf index.html. Links auf eigene Seiten bei GitHub Pages zeigen auf die Kopie unter apps/.
Paket für die Lehrkraft: die Texte aus privat/lk/ (Klartext, nicht im Repository) als eigene Seiten. Fehlt der Klartext, entsteht dieses
Paket nicht; zurückholen lässt er sich mit: LK_PASS='…' node tools/lk-bauen.mjs --holen
Geprüft werden die entpackten Pakete mit: python3 tools/pruef/ab_pruef.py <Ordner>"""
import argparse, datetime, json, pathlib, re, sys, zipfile
R = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(R / 'tools'))
from bau_moodle_paket import seite as umschreiben, app as app_seite, APPS, NICHT
from ab_einsetzen import stil

EINHEITEN = {
    'ns': {'name': 'Nationalsozialismus', 'hefter': 'hefter-nationalsozialismus.html',
           'blaetter': {   # wächst mit der Übertragung: Nummer → Seiten des Blatts, Schlüssel des Lehrkrafttexts, Bildliste
               'M22': {'titel': '„Große Verbrechen brauchen keine Monster!“ – Wie war das möglich?', 'seiten': ['m22-wie-war-das-moeglich.html', 'm22-film-erklaerungen.html'], 'lk': 'm22', 'bildliste': 'M22_Bildliste.html'},
           }},
}
VERBOTEN = ['lehr-daten', 'LEHR-SCHLOSS', 'lehrMitPasswort', 'lehrkraft()', '.enc.json', 'KA_INHALT']   # darf im Paket der Lernenden nirgends stehen
DATEI = re.compile(r'''["'(=]\s*((?:assets|media|texte)/[\w./%-]+\.(?:woff2?|jpe?g|png|webp|svg|mp4|mp3|js|css|json|txt))''')

def lernende(text, datei):
    """Nimmt den Lehrkraftbereich ganz aus einer Seite: Datenblock und Schloss."""
    text = re.sub(r'<script type="application/json" id="lehr-daten">.*?</script>\s*', '', text, flags=re.S)
    a, e = '/* LEHR-SCHLOSS:ANFANG */', '/* LEHR-SCHLOSS:ENDE */'
    if a in text:
        assert text.count(a) == 1 and text.count(e) == 1, datei
        i = text.index(a); j = text.index(e) + len(e)
        k = text.rfind('/* ---------- Für Lehrkräfte', 0, i)     # der Kommentar über dem Schloss gehört dazu
        text = text[:(k if k >= 0 and i - k < 400 else i)] + text[j:]
    return text

def aussen(text):
    """Was eine Seite von fremden Servern laden würde (nicht: Links zum Anklicken)."""
    return sorted(set(re.findall(r'''<(?:script|img|iframe|video|audio|source|link)\b[^>]*?(?:src|href)=["'](https?://[^"']+)''', text)) | set(re.findall(r'''url\(["']?(https?://[^"')]+)''', text)) | set(re.findall(r'''@import\s+["'](https?://[^"']+)''', text)))

ANLEITUNG = """So lade ich das Paket in Moodle hoch
====================================
{name} · Stand {tag}

Dieses Paket: {was}

1. Im Kurs: Bearbeiten einschalten > »Material oder Aktivität anlegen« > »Datei«.
2. Einen Namen eintragen, zum Beispiel: {titel}
3. Diese ZIP-Datei in das Feld »Dateien auswählen« ziehen.
4. Im Feld auf die ZIP-Datei klicken > »Entpacken«. Danach die ZIP-Datei im Feld wieder löschen.
5. Auf index.html klicken > »Als Hauptdatei festlegen«. (Der Name index.html erscheint dann fett.)
6. Unter »Darstellung« > »Anzeigen«: »Öffnen« oder »Als Popup-Fenster« wählen – nicht »Einbetten«. Sonst ist die Seite zu schmal.
7. {sichtbar}
8. Speichern. Danach einmal selbst öffnen und einmal mit einem Schülerzugang auf dem iPad prüfen.

Die Bezeichnungen heißen je nach Moodle-Fassung etwas anders.

Gut zu wissen
- Alles liegt im Paket: Seiten, Schriften und Bilder. Die Seiten laden nichts von fremden Servern.
{punkte}
"""
PUNKTE_L = """- Was die Lernenden eingeben, bleibt auf ihrem Gerät (im Browser). Es gibt keine Anmeldung und keinen Server.
- Wechsel des Geräts: im Blatt oben rechts »Stand sichern« antippen (ein Tipp, die Datei liegt dann bei den Downloads).
  Auf dem anderen Gerät im Hefter »Stand aus Datei laden« antippen und die Datei wählen.
  In der Moodle-App kann das Sichern als Datei scheitern. Dann die Seite in Safari öffnen oder bei den Werkzeugen
  »Geht keine Datei? Stand als Text« nehmen.
- Auf geteilten iPads am Ende der Stunde: erst den Stand sichern, dann im Hefter »Alle Eingaben dieses Hefters löschen«.
- In diesem Paket steht kein Text für die Lehrkraft – auch nicht versteckt im Quelltext. Er liegt im zweiten Paket.
- Im Paket liegen diese Blätter: {blaetter}. Die anderen Blätter zeigt der Hefter als »liegt noch nicht in diesem Paket«.
- Bilder, die nicht frei lizenziert sind, sind für den Unterricht eingebunden. Das Paket gehört deshalb in einen Kurs mit Anmeldung
  (§ 60a UrhG), nicht auf eine öffentliche Seite. Die Nachweise stehen in der Bildliste ({bildlisten}).
- Diese Links führen nach außen und brauchen Internet (Nachweise unter Bildern und Quellen):
{links}
- Diese Dateien nennt eine Seite, sie lagen beim Bauen aber nicht im Arbeitsordner (die Seiten laufen ohne sie):
{luecken}"""
PUNKTE_K = """- Dieses Paket enthält Ablauf, Erwartungen und Hinweise zu den Stunden. Es ist nicht verschlüsselt.
  Deshalb: nur für dich sichtbar ablegen und nicht am Beamer öffnen.
- Die Werkzeuge für den Beamer (Freigabe, Moderation, Modelle der Tischgruppen) stehen im Blatt der Lernenden auf der Seite
  »Am Beamer«. Sie enthalten keine Lösungen.
- Im Paket liegen die Texte zu: {blaetter}."""

LK_SEITE = """<!doctype html>
<html lang="de" data-einheit="{einheit}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex">
<title>{titel}</title>
<style>
{basis}
{stil}
.lk{{max-width:58rem;margin:1.4rem auto 3rem;padding:1.4rem clamp(1rem,4vw,2.6rem) 2rem;background:var(--blatt);border:1px solid var(--linie);box-shadow:6px 6px 0 0 var(--karton)}}
.lk h1{{font-size:clamp(1.8rem,1.4rem + 1.6vw,2.5rem);margin:.3rem 0 .7rem}}
.lk h2{{font-size:1.4rem;margin:2rem 0 .6rem;padding-top:.8rem;border-top:2px solid var(--tinte)}}
.lk p{{max-width:74ch}}
.lk p + p{{margin-top:.6rem}}
.lk ul{{max-width:74ch}}
.lk .zeit{{display:flex;gap:.8rem;flex-wrap:wrap;font-weight:700;color:var(--tief)}}
.lk .lead{{font-size:1.15rem;color:var(--leise);margin-bottom:1rem}}
.lk .tab-wrap{{overflow-x:auto;margin:.7rem 0}}
.lk table{{border-collapse:collapse;width:100%;font-size:1rem}}
.lk th,.lk td{{text-align:left;vertical-align:top;padding:.4rem .55rem;border-bottom:1px solid var(--linie);line-height:1.4}}
.lk th{{border-bottom:2px solid var(--tinte)}}
.lk td.n{{white-space:nowrap}}
.lk code{{background:var(--karton);padding:0 .3rem;overflow-wrap:anywhere}}
.lk-liste{{list-style:none;display:grid;gap:.6rem;padding:0;margin:1rem 0}}
.lk-liste a{{display:grid;grid-template-columns:auto minmax(0,1fr);gap:.8rem;align-items:center;padding:.6rem .8rem;border:2px solid var(--tinte);background:var(--blatt);color:var(--tinte);text-decoration:none;font-weight:700;min-height:48px}}
.lk-liste a:hover{{background:var(--hauch)}}
@media print{{.lk{{margin:0;padding:0;border:0;box-shadow:none;max-width:none}} .lk h2{{break-after:avoid}} .lk tr,.lk li{{break-inside:avoid}}}}
</style>
</head>
<body>
<header class="kopf"><div class="kopf-in"><span class="reiter">{reiter}</span><div class="titel">{kopf}<small>Paket für die Lehrkraft · nicht für Lernende · Stand {tag}</small></div>{zurueck}</div></header>
<main class="lk">
{inhalt}
</main>
</body>
</html>
"""

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--einheit', required=True, choices=sorted(EINHEITEN)); ap.add_argument('--nur'); ap.add_argument('--apps'); ap.add_argument('--ziel', default='dist')
    a = ap.parse_args(); E = EINHEITEN[a.einheit]
    nur = [x.strip() for x in a.nur.split(',')] if a.nur else list(E['blaetter'])
    assert all(x in E['blaetter'] for x in nur), f'unbekanntes Blatt in {nur}; bekannt: {list(E["blaetter"])}'
    apps = pathlib.Path(a.apps) if a.apps else None
    apps_da = {zo for gh, (klon, zo) in APPS.items() if apps and (apps / klon / 'index.html').exists()}
    links = {}; lp = R / 'privat' / 'moodle-links.json'
    if lp.exists(): links = json.loads(lp.read_text('utf-8'))
    ziel = R / a.ziel; ziel.mkdir(exist_ok=True); heute = datetime.date.today(); tag = heute.isoformat(); tag_de = heute.strftime('%d.%m.%Y')
    zusatz = ('_Pilot-' + '-'.join(nur)) if a.nur else ''
    basis_name = f"Hefter-{E['name']}"

    # ---------------------------------------------------------------- Paket für die Lernenden
    seiten = {}
    h = (R / E['hefter']).read_text('utf-8')
    h = re.sub(r'<!--LABOR-->.*?<!--/LABOR-->', '', h, flags=re.S)                        # im Paket ist der Hefter selbst die Startdatei
    h = h.replace('<script>\n"use strict";', '<script>\n"use strict";\nwindow.GGK_PAKET = ' + json.dumps(nur) + ';   // Blätter in diesem Paket', 1)
    seiten['index.html'] = h
    bildlisten = []
    for nr in nur:
        B = E['blaetter'][nr]
        for d in B['seiten']: seiten[d] = lernende((R / d).read_text('utf-8'), d)
        if B.get('bildliste'): seiten[B['bildliste']] = (R / B['bildliste']).read_text('utf-8'); bildlisten.append(B['bildliste'])
    for d in list(seiten):
        t = umschreiben(seiten[d], 0, links if d != 'index.html' and 'W_LINKS' in seiten[d] else None, apps_da)   # Links mit Schlüssel nur in Seiten, die sie brauchen
        seiten[d] = t.replace(E['hefter'], 'index.html')
    dateien, luecken, nach_aussen, fremd, app_noetig = set(), set(), set(), {}, set()
    for d, t in seiten.items():
        for m in DATEI.findall(t):
            (dateien if (R / m).is_file() else luecken).add(m)
        nach_aussen |= set(re.findall(r'''(?:href=|url:)\s*["'](https?://[^"'$]+)''', t))
        x = aussen(t)
        if x: fremd[d] = x
        app_noetig |= set(re.findall(r'apps/([\w-]+)/index\.html', t))
        for v in VERBOTEN: assert v not in t, f'{d}: »{v}« steht noch im Paket der Lernenden'
    for p in sorted((R / 'assets' / 'fonts').glob('*')): dateien.add(p.relative_to(R).as_posix())   # Schriften mit ihren Lizenztexten
    assert not fremd, f'Seiten laden von fremden Servern: {fremd}'
    fehlende_apps = sorted(app_noetig - apps_da)
    zl = ziel / f'{basis_name}_Lernende{zusatz}_{tag}.zip'
    with zipfile.ZipFile(zl, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as z:
        for d, t in seiten.items(): z.writestr(d, t)
        for m in sorted(dateien): z.write(R / m, m)
        for gh, (klon, zo) in APPS.items():
            if zo not in app_noetig or zo not in apps_da: continue
            for p in sorted((apps / klon).rglob('*')):
                rel = p.relative_to(apps / klon).as_posix()
                if not p.is_file() or NICHT.search(rel): continue
                if p.suffix == '.html':
                    t = app_seite(p.read_text('utf-8', errors='replace')); x = aussen(t)
                    if x: fremd[f'apps/{zo}/{rel}'] = x
                    z.writestr(f'apps/{zo}/{rel}', t)
                else: z.write(p, f'apps/{zo}/{rel}')
        z.writestr('So-lade-ich-das-Paket-in-Moodle-hoch.txt', ANLEITUNG.format(
            name=f"Hefter {E['name']} · Paket für die Lernenden", tag=tag_de, was='der Hefter (index.html) und die Arbeitsblätter für die Lernenden.',
            titel=f"Hefter {E['name']}", sichtbar='Das Material bleibt für die Lernenden sichtbar.',
            punkte=PUNKTE_L.format(blaetter=', '.join(nur), bildlisten=', '.join(bildlisten) or 'keine',
                                   links='\n'.join('    ' + u for u in sorted(nach_aussen)) or '    keine',
                                   luecken='\n'.join('    ' + u for u in sorted(luecken)) or '    keine')))
    print(zl.relative_to(R), f'{zl.stat().st_size / 1e6:.1f} MB ·', len(seiten), 'Seiten ·', len(dateien), 'Dateien · Kopien eigener Seiten:', sorted(app_noetig & apps_da) or 'keine',
          '· fehlende Kopien:', fehlende_apps or 'keine', '· fehlende Dateien:', sorted(luecken) or 'keine', '· lädt von außen (Kopien):', fremd or 'nichts')

    # ---------------------------------------------------------------- Paket für die Lehrkraft
    klar = {nr: R / 'privat' / 'lk' / f"{E['blaetter'][nr]['lk']}.html" for nr in nur}
    fehlt = [nr for nr, p in klar.items() if not p.exists()]
    if fehlt:
        print('Paket für die Lehrkraft: nicht gebaut – Klartext fehlt für', fehlt, "(zurückholen: LK_PASS='…' node tools/lk-bauen.mjs --holen)"); return
    basis = (R / 'src' / 'arbeitsblatt' / 'basis.css').read_text('utf-8').strip()
    def lk_seite(titel, reiter, kopf, inhalt, zurueck):
        return LK_SEITE.format(einheit=a.einheit, titel=titel, basis=basis, stil=stil(), reiter=reiter, kopf=kopf, tag=tag_de, inhalt=inhalt, zurueck=zurueck)
    zk = ziel / f'{basis_name}_Lehrkraft{zusatz}_{tag}.zip'
    with zipfile.ZipFile(zk, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as z:
        liste = ''.join(f'<li><a href="lehrkraft-{nr.lower()}.html"><span class="reiter">{nr}</span><span>{E["blaetter"][nr]["titel"]}</span></a></li>' for nr in nur)
        z.writestr('index.html', lk_seite(f"Hefter {E['name']} · für die Lehrkraft", 'Hefter', f"{E['name']} · für die Lehrkraft",
            f'''<p class="zeit"><span>Für die Lehrkraft</span><span>nicht für Lernende</span></p><h1>Hinweise zu den Stunden</h1>
<p class="lead">Ablauf, Erwartungen und Hinweise zu jedem Blatt. Diese Texte stehen im Paket der Lernenden nicht – auch nicht im Quelltext.</p>
<p>Leg dieses Paket in Moodle so ab, dass nur du es siehst. Öffne es nicht am Beamer. Die Werkzeuge für den Beamer stehen im Blatt der Lernenden auf der Seite „Am Beamer“.</p>
<ul class="lk-liste">{liste}</ul>''', ''))
        for nr in nur:
            t = klar[nr].read_text('utf-8')
            z.writestr(f'lehrkraft-{nr.lower()}.html', lk_seite(f'{nr} · für die Lehrkraft', nr, E['blaetter'][nr]['titel'], t, '<a class="btn" href="index.html">← Übersicht</a>'))
        for p in sorted((R / 'assets' / 'fonts').glob('*')): z.write(p, p.relative_to(R).as_posix())
        z.writestr('So-lade-ich-das-Paket-in-Moodle-hoch.txt', ANLEITUNG.format(
            name=f"Hefter {E['name']} · Paket für die Lehrkraft", tag=tag_de, was='die Hinweise für die Lehrkraft (Ablauf, Erwartungen, Kürzungen). Nicht für Lernende.',
            titel=f"Hefter {E['name']} · Lehrkraft", sichtbar='WICHTIG: das Material verbergen. Beim Material auf die drei Punkte > »Verbergen« (Auge durchgestrichen).\n   So sehen es nur Lehrkräfte des Kurses.',
            punkte=PUNKTE_K.format(blaetter=', '.join(nur))))
    print(zk.relative_to(R), f'{zk.stat().st_size / 1e3:.0f} KB · Texte:', ', '.join(nur))

if __name__ == '__main__':
    main()
