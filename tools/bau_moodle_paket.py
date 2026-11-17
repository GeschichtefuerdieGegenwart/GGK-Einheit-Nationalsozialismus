#!/usr/bin/env python3
"""Stellt das Moodle-Paket zusammen: eine ZIP-Datei mit index.html ganz oben.
Darin: Startseite, alle Kapitel, Schriften, Bilder, die nur für Moodle bestimmten Texte und Bilder (soweit sie im Arbeitsordner liegen)
und Kopien der eigenen Seiten des Kurses (Wahl-O-Mat, Parteien, Milieus, Landkarte …), damit das Paket ohne GitHub Pages läuft.

Aufruf: python3 tools/bau_moodle_paket.py --apps <Ordner mit den geklonten Seiten> [--ziel dist] [--name GGK-Labor_Moodle]

Was im Paket anders ist als im Repository:
- Rückwege zeigen auf die index.html des Pakets (nicht auf GitHub Pages).
- Links auf eigene Seiten bei GitHub Pages zeigen auf die Kopie unter apps/.
- Links mit Schlüssel im Link (privat/moodle-links.json, nicht im Repository) werden als window.W_LINKS eingetragen.
- In den Kopien der eigenen Seiten sind Verweise auf Google Fonts entfernt.
Geprüft wird das fertige Paket mit tools/pruef/paket_pruef.py."""
import sys, re, json, zipfile, pathlib, datetime, argparse
R = pathlib.Path(__file__).resolve().parent.parent
GH = 'https://geschichtefuerdiegegenwart.github.io/'
EIGEN = 'GGK-Einheit-Nationalsozialismus'
# Name bei GitHub Pages -> (Ordner des Klons, Ordner im Paket)
APPS = {
    'Wahl-o-Mat-1919': ('wahl-o-mat-1919', 'wahl-o-mat-1919'),
    'Parteien-1919': ('parteien-1919', 'parteien-1919'),
    'Die-Gesellschaft-der-Weimarer-Republik-1919': ('die-gesellschaft-der-weimarer-republik-1919', 'milieus-1919'),
    'au-enpolitik_weimarer-Republik': ('au-enpolitik_weimarer-republik', 'aussenpolitik'),
    'Widerstandsformen-im-NS-Vergleich-': ('widerstandsformen-im-ns-vergleich-', 'widerstandsformen'),
    'Widerstandsmodelle-im-Vergleich': ('widerstandsmodelle-im-vergleich', 'widerstandsmodelle'),
    'T-ter-innen-Opfer-Zuschauer-innen...': ('t-ter-innen-opfer-zuschauer-innen...', 'wer-war-was'),
    'kognitive-Landkarte-des-Geschichtsunterrichts': ('kognitive-landkarte-des-geschichtsunterrichts', 'landkarte'),
    'Karte-Zweiter-Weltkrieg': ('karte-zweiter-weltkrieg', 'karte-zweiter-weltkrieg'),
    'NS-Kontinuit-ten': ('ns-kontinuit-ten', 'ns-kontinuitaeten'),
}
ORDNER = ['assets', 'media', 'texte', 'weimar', 'ost-west']
NICHT = re.compile(r'(^|/)(\.git|\.github|archiv|tools|node_modules)(/|$)|\.(md|ps1|py|map)$|(^|/)\.[^/]+$', re.I)

def seite(text, tiefe, links, apps_da):
    """Schreibt eine Seite des Labors für das Paket um. tiefe = 0 (oben) oder 1 (Unterordner)."""
    hoch = '../' * tiefe
    text = text.replace('/github\\.io$/.test(location.hostname)', 'true')
    for gh, (klon, ziel) in APPS.items():
        if ziel not in apps_da: continue
        text = re.sub(re.escape(GH + gh) + r'/?(?:index\.html)?', f'{hoch}apps/{ziel}/index.html', text)
    text = re.sub(re.escape(GH + EIGEN) + r'/?(?=["\'#\s<)])', f'{hoch}index.html', text)
    text = text.replace(GH + EIGEN + '/', hoch)
    if links and '<body>' in text:
        text = text.replace('<body>', '<body>\n<script>window.W_LINKS = ' + json.dumps(links, ensure_ascii=False).replace('</', '<\\/') + ';</script>', 1)
    return text

def app(text):
    """Kopie einer eigenen Seite: keine Schriften von fremden Servern."""
    text = re.sub(r'<link[^>]+fonts\.(?:googleapis|gstatic)\.com[^>]*>\s*', '', text)
    text = re.sub(r"@import\s+url\([^)]*fonts\.googleapis\.com[^)]*\)\s*;?", '', text)
    return text

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--apps'); ap.add_argument('--ziel', default='dist'); ap.add_argument('--name', default='GGK-Labor_Moodle')
    a = ap.parse_args()
    apps = pathlib.Path(a.apps) if a.apps else None
    links = {}
    lp = R/'privat'/'moodle-links.json'
    if lp.exists(): links = json.loads(lp.read_text('utf-8'))
    apps_da = {ziel for gh, (klon, ziel) in APPS.items() if apps and (apps/klon/'index.html').exists()}
    ziel = R/a.ziel; ziel.mkdir(exist_ok=True)
    tag = datetime.date.today().isoformat()
    zp = ziel/f'{a.name}_{tag}.zip'
    n = {'seiten': 0, 'dateien': 0, 'apps': 0}
    with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as z:
        for p in sorted(R.glob('*.html')):
            z.writestr(p.name, seite(p.read_text('utf-8'), 0, links, apps_da)); n['seiten'] += 1
        for o in ORDNER:
            for p in sorted((R/o).rglob('*')):
                rel = p.relative_to(R).as_posix()
                if not p.is_file() or NICHT.search(rel): continue
                if p.suffix == '.html':
                    z.writestr(rel, seite(p.read_text('utf-8'), rel.count('/'), links, apps_da)); n['seiten'] += 1
                else:
                    z.write(p, rel); n['dateien'] += 1
        for gh, (klon, zo) in APPS.items():
            if zo not in apps_da: continue
            for p in sorted((apps/klon).rglob('*')):
                rel = p.relative_to(apps/klon).as_posix()
                if not p.is_file() or NICHT.search(rel): continue
                if p.suffix == '.html': z.writestr(f'apps/{zo}/{rel}', app(p.read_text('utf-8', errors='replace')))
                else: z.write(p, f'apps/{zo}/{rel}')
            n['apps'] += 1
        fehlt = [gh for gh, (klon, zo) in APPS.items() if zo not in apps_da]
        # Dateien, die eine Seite nennt, die aber nicht im Arbeitsordner lagen (Bilder und Filme aus eigenen Kopien der Lehrkraft)
        namen = set(z.namelist()); luecken = {}
        for nm in sorted(namen):
            if not nm.endswith('.html') or nm.startswith('apps/'): continue
            basis = nm.rsplit('/', 1)[0] + '/' if '/' in nm else ''
            roh = z.read(nm).decode('utf-8', errors='replace')
            for m in sorted(set(re.findall(r'["\'(]((?:\.\./)?(?:media|texte)/[\w./-]+\.(?:jpg|jpeg|png|webp|svg|mp4|mp3|js))', roh))):
                ziel = (basis + m).replace('weimar/../', '').replace('ost-west/../', '')
                if ziel not in namen: luecken.setdefault(nm, []).append(ziel)
        liste = '\n'.join(f'  {s}: ' + ', '.join(v) for s, v in luecken.items()) or '  keine'
        z.writestr('LIESMICH.txt', LIESMICH.format(tag=tag, seiten=n['seiten'], apps=n['apps'], fehlt=(', '.join(fehlt) if fehlt else 'keine'), liste=liste))
    print(zp.relative_to(R), f'{zp.stat().st_size / 1e6:.1f} MB', n, 'Links mit Schlüssel:', sorted(links), 'fehlende Kopien:', fehlt, 'Seiten mit fehlenden Dateien:', {s: len(v) for s, v in luecken.items()})

LIESMICH = """GGK-Labor – Paket für Moodle (Stand {tag})
================================================

Inhalt: Startseite (index.html), {seiten} Seiten in drei Kapiteln (Weimarer Republik, Nationalsozialismus, Ost-West-Konflikt),
Schriften, Bilder und {apps} eigene Seiten des Kurses als Kopie (Ordner apps/).

So kommt das Paket in den Kurs
1. Im Kurs »Material oder Aktivität anlegen« > »Datei«.
2. Diese ZIP-Datei hochladen. Im Dateibereich auf die ZIP-Datei klicken > »Entpacken«. Die ZIP-Datei danach löschen.
3. Auf index.html klicken > »Als Hauptdatei festlegen«.
4. Unter »Darstellung«: »Als Popup-Fenster« oder »Öffnen« wählen (nicht »Einbetten«), damit die Seite die volle Breite hat.
Die Schritte heißen je nach Moodle-Fassung etwas anders. Bitte einmal mit einem Schülerzugang auf dem iPad prüfen.

Gut zu wissen
- Das Paket läuft ohne Internet, bis auf: Filme bei ZDF, ARD, YouTube und anderen Anbietern (öffnen im Browser),
  die Kartenkacheln der Karte zum Zweiten Weltkrieg und Links, die ausdrücklich nach außen führen.
- Eingaben der Lernenden bleiben auf dem Gerät (im Browser). In jedem Kapitel lässt sich die Lernspur als Datei sichern.
- Der Lehrkraftbereich jeder Seite ist verschlüsselt und öffnet sich mit der Passphrase.
- Bilder aus dem Heft und fremde Texte im vollen Wortlaut liegen nur in diesem Paket, nicht im öffentlichen Repository.
  Das Paket gehört deshalb in einen Kurs mit Anmeldung (§ 60a UrhG) und nicht auf eine öffentliche Seite.
- Der Film zu M23 (»Voices in the Void«) liegt nur bei, wenn die Datei media/m23-voices-in-the-void-2021.mp4 im Arbeitsordner lag.
  Fehlt sie, zeigt M23 den Link zum Film.
- Nicht als Kopie enthalten: {fehlt}.

Diese Dateien nennt eine Seite, sie lagen aber nicht im Arbeitsordner (Bilder, Ton und Film aus deinen eigenen Kopien).
Die Seiten laufen ohne sie. Wer sie hat, legt sie vor dem Hochladen in den genannten Ordner:
{liste}
"""
if __name__ == '__main__':
    main()
