#!/usr/bin/env python3
"""Baut die Startseite index.html (Fassung 3.0, Entwurf F2 »Nacht mit Papierkarten«): drei Kapitel 1918–1991.
Je Kapitel: Kopf mit wechselndem Bild, eine schmale Leiste mit Merkdaten und Modulnummern, darunter das Regal mit gleich großen Papierkarten.
Alle Links stehen als HTML im Dokument und sind ohne JavaScript erreichbar. Aufruf: python3 tools/bau_startseite.py"""
import pathlib, html
R = pathlib.Path(__file__).resolve().parent.parent
e = html.escape
LK = 'https://geschichtefuerdiegegenwart.github.io/kognitive-Landkarte-des-Geschichtsunterrichts/'
# Bilder hinter dem Kapitelkopf: (Datei, Bildtext). Schmuck mit sichtbarem Bildtext, deshalb alt="". Bildtexte nach den Bildlisten der Module.
NS_BILDER = [('media/m19-heft-karte-deutsches-reich.jpg', 'Karte aus dem Heft: das Deutsche Reich und seine Nachbarn (zu M19).'),
 ('media/m20-heft-london-1940.jpg', 'London, 7. September 1940 (zu M20).'),
 ('media/m21-wc-umschlagplatz-2012.jpg', 'Tor des Umschlagplatz-Denkmals in Warschau, errichtet 1988; Foto von 2012 (zu M21).'),
 ('media/m22-wc-jozefow-wald-2022.jpg', 'Tafel im Wald bei Józefów in Polen an den Massengräbern der Opfer vom 13. Juli 1942; Foto von 2022 (zu M22).'),
 ('media/m23-wc-elisabeth-dragoer-2026.jpg', 'Fischerboot „Elisabeth“ im Hafen von Dragør, Dänemark; mit ihm wurden 1943 Menschen nach Schweden gebracht (zu M23).')]
OW_BILDER = [('ost-west/media/owk-s1-potsdam.jpg', 'Potsdam, Sommer 1945 (Stunde 1).'),
 ('ost-west/media/owk-s3-luftbruecke.jpg', 'Luftbrücke nach West-Berlin, 1948/49 (Stunde 3).'),
 ('ost-west/media/owk-s6-bernauer.jpg', 'Mauerbau an der Bernauer Straße in Berlin, August 1961 (Stunde 6).'),
 ('ost-west/media/owk-s9-trabi.jpg', 'Nach der Grenzöffnung, November 1989 (Stunde 9).')]
# Reihenfolge = Zeitfolge auf dem Strahl (nicht die Nummernfolge im Heft): M27 steht beim Krieg, nicht am Ende.
NS = [('M16', 'Einstieg in die Einheit', 'Was macht den Menschen zum Menschen?', ['Der Appell', 'Menschlich', 'Humanismus', 'Meine Werte', 'Die Frage'], 'm16-was-macht-den-menschen.html', None),
 ('M17', '1933–1939', 'Mein Leben in der NS-Diktatur I – Ausgrenzung 1933 bis 1939 aus zwei Blickwinkeln', ['Rolle', 'Boykott 1933', 'Entlassung 1933', 'Nürnberger Gesetze 1935', 'Pogrom 1938', 'Spielraum'], 'm17-leben-in-der-diktatur.html', None),
 ('M18', '1920–1935', 'Die fünf Säulen der NS-Ideologie', ['Vermutung', 'Sechs Zeugnisse', 'Fünf Säulen', 'Expertenrunde', 'Von der Idee zur Tat'], 'ns-ideologie.html', None),
 ('M19', '1933–1939', 'Appeasement-Politik – der Weg zum Frieden oder in den Zweiten Weltkrieg?', ['Was bedroht uns?', 'Was tun wir?', '„Anschluss“', 'Sudetenfrage', 'März 1939', 'Polen', 'Beurteilung'], 'appeasement.html', 'media/m19-heft-karte-deutsches-reich.jpg'),
 ('M20', '1940–1944', 'Der Verlauf des Zweiten Weltkriegs. Der Krieg und seine Dilemmata.', ['Mai 1940', 'Juli 1941', 'Februar 1944', 'Beurteilung'], 'm20-dilemmata.html', 'media/m20-heft-london-1940.jpg'),
 ('M27', '1939–1945, weltweit', 'Die Vergessenen! Eine Globalgeschichte des Zweiten Weltkriegs', ['Dein Bild vom Krieg', 'Der Artikel', 'Eurozentrismus', 'Strukturbild', 'Landkarte'], 'm27-die-vergessenen.html', 'media/m27-afrikanische-soldaten-1944.jpg'),
 ('M21', '1933–1945', 'Es geht um Menschen – Shoa oder Holocaust?', ['Der Brief', 'Das Wort', 'Vier Menschen', 'Die Matrix', 'Die Zahl'], 'm21-es-geht-um-menschen.html', 'media/m21-wc-westerbork-2018.jpg'),
 ('M22', '1942', '„Große Verbrechen brauchen keine Monster!“ – Wie war das möglich?', ['Faktencheck', 'Józefów', 'Erklärungen', 'Landkarte', 'Marktplatz'], 'm22-wie-war-das-moeglich.html', 'media/m22-wc-jozefow-wald-2022.jpg'),
 ('M23', '1943', 'Die Gesellschaft, in der ich leb(t)e? – Die Shoa im Ländervergleich', ['Die Karte', 'Der Film', 'Sechs Säulen', 'Thesen testen', 'Deine Position'], 'm23-die-gesellschaft.html', 'media/m23-wc-elisabeth-dragoer-2026.jpg'),
 ('M25', '1945', 'Kriegsende 1945: Leben in Ruinen und der Umgang mit Schuld – nach dem Modul von Offene Geschichte', ['Der Krieg ist vorbei', 'Überleben in Ruinen', 'Im Angesicht des Verbrechens', 'Verantwortung', 'Landkarte'], 'm25-leben-in-ruinen.html', 'media/m25-weimar-frauen-1945.jpg'),
 ('M26', 'nach 1945', 'Ende gut, alles gut? Kontinuitäten des Nationalsozialismus in der Bundesrepublik', ['Schätzen', 'Der BND', 'Eure Gruppe', 'Vergleich', 'Urteil'], 'm26-kontinuitaeten.html', 'media/m26-heft-bnd.jpg')]
WZ = [('Zeitraster', '16 Ereignisse im Überblick', 'raster'), ('Ordnen', 'Was kam wann?', 'ordnen'), ('Vernetzen', 'Ereignisse verbinden', 'netz'), ('Glossar', 'Begriffe nachschlagen', 'glossar'), ('Roter Faden', 'Deine Antwort auf die Leitfrage', 'faden')]
ST = [(1, 'Potsdam, 1945', 'Die „Stunde Null“ – Was wird jetzt mit Deutschland?', ['Die Lage', 'Vorhersagen', 'Das Potsdamer Abkommen'], 's1-stunde-null.html', 'owk-s1-potsdam'),
 (2, '1947', 'Kommunismus gegen Kapitalismus: Truman-Doktrin und Zwei-Lager-Theorie', ['Truman', 'Shdanow', 'Spiegelbild', 'Blockbildung'], 's2-ideologien.html', 'owk-s2-marshallplan'),
 (3, '1945–1949', 'Die Berlin-Blockade und die sowjetische Besatzungszone', ['Entscheiden', 'Ablauf', 'Sowjetische Zone'], 's3-blockade.html', 'owk-s3-luftbruecke'),
 (4, '1949', 'Die doppelte Staatsgründung', ['Der Weg zu zwei Staaten', 'Grotewohl', 'Adenauer', 'Vergleich'], 's4-staatsgruendung.html', 'owk-s4-goldfisch'),
 (5, '1949–1957', 'Die Bindung der Bundesrepublik an den Westen', ['Der Streit', 'Die Schritte', 'Das Urteil'], 's5-westintegration.html', 'owk-s5-andernach'),
 (6, '1949–1961', 'Flucht aus der DDR und Mauerbau', ['Die Zahlen', 'Die Gründe', 'Die Mauer'], 's6-flucht-und-mauer.html', 'owk-s6-bernauer'),
 (7, '17. Juni 1953', 'Geschichte im Staatsdienst? Der 17. Juni 1953 im Schulbuch', ['Zwei Texte', 'Was geschah', 'Lehrpläne'], 's7-geschichte-im-staatsdienst.html', 'owk-s7-juni'),
 (8, '1970–1972', 'Wandel durch Annäherung: die Ostverträge', ['Die Verträge', 'Die Debatte'], 's8-ostpolitik.html', 'owk-s8-demo'),
 (9, '1985–1991', 'Das Ende der DDR und des Ost-West-Konflikts', ['Vier Blickwinkel', 'Moskau', 'Herbst 1989'], 's9-ende.html', 'owk-s9-trabi')]
KEYS = {'M16': 'ggk-m16-mensch', 'M17': 'ggk-m17-leben', 'M18': 'ggklabor:', 'M19': 'ggk-m19-appeasement', 'M20': 'ggk-m20-dilemmata', 'M21': 'ggk-m21-menschen', 'M22': 'ggk-m22-taeter', 'M23': 'ggk-m23-gesellschaft', 'M25': 'ggk-m25-ruinen', 'M26': 'ggk-m26-kontinuitaeten', 'M27': 'ggk-m27-vergessene'}
# Kurztitel für die Übersicht (die vollen Titel stehen in der Ordnung nach Prinzip und in den Modulen)
KURZ = {'M16': 'Was macht den Menschen zum Menschen?', 'M17': 'Leben in der NS-Diktatur: Ausgrenzung 1933–1939', 'M18': 'Die fünf Säulen der NS-Ideologie', 'M19': 'Appeasement: Frieden oder Krieg?', 'M20': 'Der Verlauf des Zweiten Weltkriegs. Der Krieg und seine Dilemmata.', 'M27': 'Globalgeschichte des Zweiten Weltkriegs', 'M21': 'Die Shoa: Es geht um Menschen', 'M22': 'Wie war das möglich? Täterforschung', 'M23': 'Die Shoa im Ländervergleich', 'M25': 'Kriegsende 1945 – nach dem Modul von Offene Geschichte', 'M26': 'NS-Kontinuitäten in der Bundesrepublik',
 1: '„Stunde Null“ und Potsdamer Abkommen', 2: 'Truman-Doktrin und Zwei-Lager-Theorie', 3: 'Berlin-Blockade und sowjetische Zone', 4: 'Doppelte Staatsgründung', 5: 'Westbindung der Bundesrepublik', 6: 'Flucht aus der DDR und Mauerbau', 7: 'Der 17. Juni 1953 im Schulbuch', 8: 'Ostverträge', 9: 'Ende der DDR und des Ost-West-Konflikts'}
# Halte je Kapitel in Zeitfolge: (Merkdatum, Ereignis, Modul). In der Leiste stehen die Daten abwechselnd über und unter der Linie. Vorschlag – bitte prüfen.
SPALTEN = {'weimar': [('9. Nov. 1918', 'Ausrufung der Republik', None), ('11. Aug. 1919', 'Weimarer Verfassung', None), ('1923', 'Krisenjahr: Inflation, Hitlerputsch', None), ('Okt. 1929', 'Beginn der Weltwirtschaftskrise', None)],
 'ns': [(None, None, 'M16'), ('30. Jan. 1933', 'Hitler wird Reichskanzler', 'M17'), ('15. Sept. 1935', 'Nürnberger Gesetze', 'M18'), ('9. Nov. 1938', 'Novemberpogrome', 'M19'), ('1. Sept. 1939', 'Überfall auf Polen', 'M20'), (None, None, 'M27'), ('22. Juni 1941', 'Überfall auf die Sowjetunion', 'M21'), (None, None, 'M22'), (None, None, 'M23'), ('8. Mai 1945', 'Bedingungslose Kapitulation', 'M25'), (None, None, 'M26')],
 'ostwest': [('2. Aug. 1945', 'Potsdamer Abkommen', 1), ('12. März 1947', 'Truman-Doktrin', 2), ('24. Juni 1948', 'Beginn der Berlin-Blockade', 3), ('1949', 'Zwei deutsche Staaten', 4), (None, None, 5), ('17. Juni 1953', 'Aufstand in der DDR', 7), ('13. Aug. 1961', 'Bau der Berliner Mauer', 6), (None, None, 8), ('9. Nov. 1989', 'Öffnung der Mauer', 9), ('3. Okt. 1990', 'Deutsche Einheit', None)]}
# Zweite Ordnung: Prinzipien der kognitiven Landkarte -> Module (aus den Landkarten-Seiten der Module abgelesen)
PRINZIP = [('2-1-1', 'Retrospektivität', 'Wir betrachten die Vergangenheit immer im Nachhinein, aus der Gegenwart heraus.', ['M19', 'M20', 1, 8]),
 ('2-1-2', 'Perspektivität', 'Jede Betrachtung erfolgt aus einer Sichtweise, geprägt von Überzeugungen, Interessen und Erfahrungen.', ['M17', 'M27', 'M22', 'M25', 2]),
 ('2-1-3', 'Partikularität', 'Historische Erkenntnisse sind immer nur Ausschnitte der gesamten Vergangenheit.', []),
 ('2-1-4', 'Selektivität', 'Wer Geschichte erzählt, wählt aus: Welche Quellen, Ereignisse und Personen sind wichtig?', [5]),
 ('2-1-5', 'Partialität', 'Quellen zeigen immer nur einen Teil der Vergangenheit, und nur ein Teil der Quellen ist erhalten.', [6]),
 ('2-1-6', 'Narrativität', 'Geschichte gibt es nur als Erzählung.', [3, 9]),
 ('2-1-7', 'Konstruktivität', 'Geschichte wird nicht gefunden, sondern zusammengesetzt. Aus denselben Fakten können verschiedene Geschichten entstehen.', [7]),
 ('2-1-8', 'Standortgebundenheit', 'Wer Geschichte erzählt, ist durch seinen gesellschaftlichen und kulturellen Kontext geprägt, oft unbewusst.', ['M27', 4])]
OFFEN = ['M16', 'M18', 'M21', 'M23', 'M26']
MOD = {m[0]: (m[2], m[4]) for m in NS}; MOD.update({m[0]: (m[2], 'ost-west/' + m[4]) for m in ST})
# Nummer im Heft (steht im Titel). Die Reihenfolge der Karten ist die Zeitfolge; eine zweite Zählung gibt es nicht mehr.
HEFTNR = {1: 'M29/M30', 2: 'M31', 3: 'M32/M33', 4: 'M34', 5: 'M35/M36', 6: 'M36–M39', 7: 'M40', 8: 'M41', 9: 'M42–M44'}
HEFTNR.update({m[0]: m[0] for m in NS})
INFO = {m[0]: (m[1], m[4], m[5], KEYS[m[0]], '') for m in NS}
INFO.update({m[0]: (m[1], 'ost-west/' + m[4], f'ost-west/media/{m[5]}.jpg', f'ggk-owk-s{m[0]}', f's{m[0]}') for m in ST})
ZAHLWORT = {1: 'ein', 2: 'zwei', 3: 'drei', 4: 'vier', 5: 'fünf', 6: 'sechs', 7: 'sieben', 8: 'acht', 9: 'neun', 10: 'zehn', 11: 'elf', 12: 'zwölf'}
def karte(nr):
    """Eine Papierkarte: Bildfeld (oder Nummernfeld), Zeile »Nummer · Zeit«, Kurztitel. Alle Karten sind gleich groß."""
    zeit, ziel, bild, key, faden = INFO[nr]
    feld = (f'<img src="{bild}" alt="" loading="lazy" onerror="this.parentNode.classList.add(\'ohne\');this.remove()">' if bild else '') + f'<span class="knr" aria-hidden="true">{HEFTNR[nr]}</span>'
    return (f'<a class="karte" href="{ziel}"><span class="kbild{"" if bild else " ohne"}">{feld}</span>'
            f'<span class="ktext"><span class="kmeta">{HEFTNR[nr]} · {e(zeit)}</span><b>{e(KURZ[nr])}</b></span>'
            f'<span class="stand" data-key="{key}" data-faden="{faden}" hidden></span></a>')
def lagen(ep):
    """Merkdaten abwechselnd über und unter der Linie, damit sie sich nicht in die Quere kommen."""
    k = 0; out = []
    for d, w, m in SPALTEN[ep]:
        out.append(None if not d else ('ob' if k % 2 == 0 else 'un')); k += 1 if d else 0
    return out
def leiste(ep):
    """Die schmale Leiste: alle Halte in einer Zeile. Nur fürs Auge (aria-hidden); dieselben Daten stehen im Regal als Text."""
    L = lagen(ep); z = ''
    for (d, w, m), lage in zip(SPALTEN[ep], L):
        dt = f'<span class="dt"><b>{e(d)}</b><span>{e(w)}</span></span>' if d else ''
        z += (f'<span class="st{" ank" if d else ""}"><span class="ob">{dt if lage == "ob" else ""}</span><span class="pk"></span>'
              f'<span class="nr">{HEFTNR[m] if m else ""}</span><span class="un">{dt if lage == "un" else ""}</span></span>')
    return f'<div class="leiste{"" if any(m for d, w, m in SPALTEN[ep]) else " ohnenr"}" aria-hidden="true">{z}</div>'
def regal(ep, name):
    """Das Regal: je Halt ein Listenpunkt mit Merkdatum (als Text) und Karte. Auf dem Telefon wird daraus der senkrechte Zeitstrahl."""
    z = ''
    for d, w, m in SPALTEN[ep]:
        merk = f'<p class="merk"><b>{e(d)}</b> <span>{e(w)}</span></p>' if d else ''
        kl = 'sp' + (' anker' if d else '') + ('' if m else ' nurdatum')
        z += f'<li class="{kl}"{f" id=\"k-{HEFTNR[m].replace(chr(47), chr(45))}\"" if m else ""}>{merk}{karte(m) if m else ""}</li>'
    return f'<ol class="regal" aria-label="{name}: Merkdaten und Module in der Reihenfolge der Zeit">{z}</ol>'
def kapitel(ep, ziffer, name, jahre, satz, bilder, zusatz=''):
    hinter = ''
    wahl = ''
    if bilder:
        imgs = ''.join(f'<img src="{e(b[0])}" alt="" data-text="{e(b[1])}"{" class=\"an\"" if i == 0 else " loading=\"lazy\""} onerror="this.remove()">' for i, b in enumerate(bilder))
        hinter = f'<div class="hinter">{imgs}</div>'
        wahl = (f'<div class="bildwahl"><button type="button" data-bildschritt="-1" aria-label="Vorheriges Bild: {name}" hidden>‹</button>'
                f'<button type="button" data-bildschritt="1" aria-label="Nächstes Bild: {name}" hidden>›</button>'
                f'<p data-bildtext>Bild 1 von {len(bilder)}: {e(bilder[0][1])}</p></div>')
    return (f'<section class="kapitel" id="{ep}" data-ep="{ep}" aria-labelledby="h-{ep}">{hinter}<div class="huelle">'
            f'<div class="kkopf"><div class="ktitel"><span class="ziffer" aria-hidden="true">{ziffer}</span><div><h2 id="h-{ep}">{name}</h2><p class="jahre">{jahre}</p></div></div>'
            f'<p class="satz">{satz}</p>{wahl}</div>{leiste(ep)}{regal(ep, name)}{zusatz}</div></section>')
wz = '<p class="werkzeuge"><b>Werkzeuge für alle neun Stunden:</b>' + ''.join(f'<a href="ost-west/index.html#{a}">{e(n)}</a>' for n, w, a in WZ) + '</p>'
zeit_html = (kapitel('weimar', 1, 'Weimarer Republik', '1918 – 1933', 'Die erste deutsche Demokratie.', [], '<p class="leer">Die Module zu diesem Kapitel entstehen gerade. Die Merkdaten stehen schon da.</p>')
 + kapitel('ns', 2, 'Nationalsozialismus', f'1933 – 1945 und die Folgen · {ZAHLWORT[len(NS)]} Module', 'Ideologie, Krieg und Menschheitsverbrechen – und die Frage, wer mitgemacht hat und was danach daraus wurde.', NS_BILDER)
 + kapitel('ostwest', 3, 'Ost-West-Konflikt', f'1945 – 1991 · {ZAHLWORT[len(ST)]} Stunden', 'Welchen Einfluss hatten Ideologien, Machtinteressen und Handlungsspielräume der Akteure – und wie wird dieser Konflikt heute erinnert?', OW_BILDER, wz))
def mlink(nr):
    t, z = MOD[nr]; ep = 'ostwest' if isinstance(nr, int) else 'ns'
    return f'<li><a href="{z}" data-ep="{ep}"><span class="pnr">{HEFTNR[nr]}</span>{e(t)}</a></li>'
prinzip_html = ''.join(f'<article class="prinzip"><h3><a href="{LK}#s-{i}">{e(n)}</a></h3><p>{e(t)}</p>' + (f'<ul>{"".join(mlink(m) for m in ms)}</ul>' if ms else '<p class="keins">Noch kein Modul, das dieses Prinzip in den Mittelpunkt stellt.</p>') + '</article>' for i, n, t, ms in PRINZIP)
prinzip_html += f'<article class="prinzip offen"><h3>Noch nicht zugeordnet</h3><p>Diese Module haben noch keinen eigenen Landkarten-Moment.</p><ul>{"".join(mlink(m) for m in OFFEN)}</ul></article>'
CSS = """@font-face{font-family:"Fraunces";src:url(assets/fonts/Fraunces72pt-SemiBold.woff) format("woff");font-weight:600;font-display:swap}
@font-face{font-family:"Atkinson Hyperlegible";src:url(assets/fonts/AtkinsonHyperlegible-Regular.woff2) format("woff2");font-weight:400;font-display:swap}
@font-face{font-family:"Atkinson Hyperlegible";src:url(assets/fonts/AtkinsonHyperlegible-Bold.woff2) format("woff2");font-weight:700;font-display:swap}
:root{color-scheme:dark;--seite:#15171A;--text:#F4F1EA;--leise:#C9C4BA;--weimar:#E0B74A;--ns:#B9C0C8;--ow:#7FA6FF;--display:"Fraunces",Georgia,serif}
*{box-sizing:border-box}html{scroll-padding-top:5rem}
body{margin:0;background:var(--seite);color:var(--text);font:400 1.0625rem/1.5 "Atkinson Hyperlegible",system-ui,sans-serif;overflow-x:clip}
a{color:var(--text)}a:focus-visible,button:focus-visible{outline:3px solid #fff;outline-offset:3px}
button{font:inherit;color:inherit;cursor:pointer}
/* Eine Spalte für alles: Kopf, Epochen-Leiste, Kapitel und Fuß stehen an derselben linken Kante */
.huelle{max-width:72.5rem;margin:0 auto;padding-inline:1.5rem}
.sprung{position:absolute;left:-999rem}.sprung:focus{left:1rem;top:1rem;background:#fff;color:#000;padding:.5rem 1rem;z-index:9}
.nurvorlesen{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}
header.kopf{display:flex;flex-wrap:wrap;gap:.3rem 1.5rem;justify-content:space-between;align-items:center;padding-block:1rem 0}
.marke{font-weight:700;font-size:.95rem;color:var(--leise);text-decoration:none;display:inline-block;padding:.5rem 0}
header.kopf nav{display:flex;flex-wrap:wrap;gap:.3rem 1.25rem;font-size:.95rem}
header.kopf nav a{display:inline-block;padding:.5rem 0}
.hero{padding-block:.3rem 1rem}
h1{margin:0;font:600 clamp(2.4rem,5.4vw,4rem)/1.02 var(--display);text-wrap:balance}
.hero p{margin:.9rem 0 0;max-width:62ch;font-size:1.125rem;color:var(--leise)}
.hero p a{font-weight:700}
/* Epochen-Leiste: bleibt oben stehen und zeigt, in welchem Kapitel du bist */
.band{position:sticky;top:0;z-index:5;background:var(--seite);padding-block:.6rem}
.band ol{list-style:none;margin:0 auto;display:flex;flex-wrap:wrap;gap:.6rem}
.band a{display:inline-flex;align-items:center;min-height:44px;padding:0 1rem;border:2px solid var(--b);border-radius:6px;text-decoration:none;font-weight:700;font-size:1rem}
.band a[aria-current]{background:var(--b);color:#15171A}
/* Kapitel: eigener Grund, eigene Farbe, eigenes Papier */
.kapitel{position:relative;overflow:hidden;border-top:6px solid var(--akz);background:var(--grund);
  --grund:#1B1E22;--akz:#B9C0C8;--akzt:#D5DAE0;--papier:#E2E3E4;--kink:#1C1E21;--kakz:#2E3238;--slot:#CDCFD2;--slotink:#565B62;--korn:url(assets/papier-ns.jpg)}
.kapitel[data-ep=weimar]{--grund:#211D12;--akz:#E0B74A;--akzt:#F0D58A;--papier:#F3E8C8;--kink:#2A2110;--kakz:#7A5200;--slot:#E6D7A8;--slotink:#735E1F;--korn:url(assets/papier-weimar.jpg)}
.kapitel[data-ep=ostwest]{--grund:#131A2E;--akz:#7FA6FF;--akzt:#BFD2FF;--papier:#DCE7F6;--kink:#14203A;--kakz:#173F86;--slot:#C3D3EA;--slotink:#4B6694;--korn:url(assets/papier-ostwest.jpg)}
.kapitel>.huelle{position:relative;z-index:1;padding-block:2.1rem 2.5rem}
/* Bild hinter dem Kapitelkopf: grau, stark abgedunkelt, läuft unten in den Grund aus */
.hinter{position:absolute;z-index:0;left:0;right:0;top:0;height:20.6rem;overflow:hidden}
.hinter img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1);opacity:0;transition:opacity 600ms cubic-bezier(.23,1,.32,1)}
.hinter img.an{opacity:1}
.hinter::before{content:"";position:absolute;inset:0;z-index:1;background:var(--grund);opacity:.72}
.hinter::after{content:"";position:absolute;left:0;right:0;bottom:0;height:5.6rem;z-index:1;background:linear-gradient(to bottom,transparent,var(--grund))}
.kkopf{margin-bottom:1.4rem}
.ktitel{display:flex;align-items:center;gap:.9rem}
.ziffer{font:600 4.5rem/.9 var(--display);color:var(--akzt)}
h2{margin:0;font:600 clamp(1.7rem,3.4vw,2.25rem)/1.05 var(--display)}
.jahre{margin:.15rem 0 0;font-weight:700;font-size:1rem;color:var(--akzt)}
.satz{margin:.75rem 0 0;max-width:54ch;font-size:1rem;color:#D9D4CA}
.bildwahl{display:flex;flex-wrap:wrap;gap:.6rem;align-items:center;margin-top:.9rem;min-height:44px}
.bildwahl button{width:44px;height:44px;padding:0;border:2px solid var(--akz);border-radius:999px;background:transparent;font-size:1.4rem;line-height:1}
.bildwahl p{margin:0;flex:1 1 14rem;font-size:.875rem;line-height:1.35;color:#D9D4CA}
/* Leiste: alle Halte in einer Zeile. Raute = Merkdatum, Ring = Modul ohne eigenes Merkdatum, darunter die Nummer im Heft */
.leiste{position:relative;display:flex;margin-bottom:1.4rem}
.leiste::before{content:"";position:absolute;left:0;right:0;top:calc(3.3rem + 8px);height:4px;background:var(--akz)}
.st{flex:1 1 0;min-width:0;display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:3.3rem 20px auto auto}
.ob{display:flex;align-items:flex-end;padding:0 0 .4rem 4px}
.un{padding:.25rem 0 0 4px;min-height:3.1rem}
.dt{display:block;flex:0 0 auto;width:max-content;max-width:calc(200% - .6rem)}
.dt b{display:block;font:600 .94rem/1.15 var(--display);white-space:nowrap}
.dt span{display:block;font-size:.75rem;line-height:1.2;color:#D9D4CA}
.pk{position:relative}
.pk::before{content:"";position:absolute;left:4px;top:1px;width:10px;height:10px;border-radius:999px;background:var(--grund);border:4px solid var(--akz)}
.ank .pk::before{top:2px;width:12px;height:12px;border-radius:0;transform:rotate(45deg);background:var(--text);border:2px solid var(--grund)}
.nr{padding:.1rem 0 0 4px;font-size:.8125rem;font-weight:700;color:var(--akzt);white-space:nowrap}
.nr{min-height:1.3rem}.ohnenr .nr{display:none}
/* Regal: gleich große Papierkarten in der Reihenfolge der Zeit */
.regal{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(14rem,1fr));gap:1.25rem}
.sp{min-width:0}
.merk,.sp.nurdatum{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.karte{position:relative;display:flex;flex-direction:column;height:100%;min-height:13.25rem;border:1px solid var(--akz);border-radius:6px;overflow:hidden;text-decoration:none;color:var(--kink);
  background-color:var(--papier);background-image:var(--korn);background-size:384px;background-blend-mode:multiply}
.kbild{position:relative;display:block;flex:0 0 6rem;background:var(--slot)}
.kbild img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1)}
.knr{display:none}
.kbild.ohne .knr{display:flex;align-items:center;height:100%;padding:0 .9rem;font:600 2.5rem/1 var(--display);color:var(--slotink)}
.ktext{display:block;padding:.6rem .9rem .75rem}
.kmeta{display:block;font-size:.875rem;font-weight:700;color:var(--kakz)}
.ktext b{display:block;margin-top:.2rem;font:600 1.125rem/1.22 var(--display);hyphens:manual;overflow-wrap:break-word}
.stand{position:absolute;right:.5rem;top:.5rem;padding:.1rem .5rem;border-radius:4px;background:var(--papier);color:var(--kink);font-size:.8125rem;font-weight:700}
.werkzeuge{margin:1.6rem 0 0;display:flex;flex-wrap:wrap;gap:.6rem;align-items:center;font-size:1rem}
.werkzeuge b{margin-right:.4rem}
.werkzeuge a{display:inline-flex;align-items:center;min-height:44px;padding:0 1rem;border:2px solid var(--akz);border-radius:999px;text-decoration:none}
.leer{margin:0;display:inline-block;padding:.6rem 1rem;border:2px dashed var(--akz);border-radius:6px;font-size:1rem}
/* Zweite Ordnung: nach den Prinzipien der kognitiven Landkarte */
.prinzipien{padding-block:2rem 2rem}
.prinzipien>h2{margin-bottom:.4rem}
.prinzipien>p{margin:0 0 1.2rem;max-width:70ch;color:#D9D4CA}
.pgitter{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(19rem,100%),1fr));gap:1rem}
.prinzip{background:#1E2126;border:1px solid #4A5059;border-top:6px solid var(--text);border-radius:0 0 6px 6px;padding:1rem}
.prinzip.offen{border-top-style:dashed;background:transparent}
.prinzip h3{margin:0;font:600 1.45rem/1.15 var(--display)}
.prinzip p{margin:.2rem 0 .7rem;font-size:.95rem;color:var(--leise)}
.prinzip ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.4rem}
.prinzip li a{display:grid;grid-template-columns:5.2rem minmax(0,1fr);gap:.6rem;align-items:center;min-height:48px;padding:.3rem .7rem;border:1px solid #4A5059;border-left:6px solid var(--ns);border-radius:0 6px 6px 0;text-decoration:none;line-height:1.25;font-size:.98rem}
.prinzip li a[data-ep=ostwest]{border-left-color:var(--ow)}
.pnr{font-weight:700;font-size:.9rem;color:var(--ns)}.prinzip li a[data-ep=ostwest] .pnr{color:var(--ow)}
.legende{margin:1rem 0 0;font-size:.9rem;color:var(--leise)}
.legende i{display:inline-block;width:.9rem;height:.9rem;vertical-align:-.1rem;margin:0 .3rem 0 .8rem}
.wechsel{padding-block:1.6rem 1.4rem;display:flex;flex-wrap:wrap;gap:.9rem 1.25rem;align-items:center}
.wechsel button{min-height:48px;padding:0 1.25rem;border:2px solid var(--text);border-radius:6px;background:transparent;font-size:1rem}
.wechsel button[data-wechsel]{background:var(--text);color:#15171A;font-weight:700}
.wechsel span{flex:1 1 18rem;max-width:56ch;color:var(--leise);font-size:.94rem}
[hidden]{display:none!important}
footer{padding-top:1rem;padding-bottom:2.5rem;font-size:.9rem;color:var(--leise);border-top:1px solid #2B2F35}
footer p{margin:0 0 .4rem;max-width:100ch}
footer a{display:inline-block;padding:.35rem 0}
/* Schmal: Das letzte Datum einer Leiste endet am rechten Rand, statt darüber hinauszuragen */
@media (max-width:1099px){.st:last-child .ob,.st:last-child .un{display:flex;justify-content:flex-end;text-align:right}.st:last-child .un{align-items:flex-start}}
/* Telefon: Die Leiste entfällt. Das Regal wird zum senkrechten Zeitstrahl, die Merkdaten stehen an ihrer Stelle über den Karten */
@media (max-width:699px){
  .band{position:static}.band ol{gap:.4rem}.band li{flex:1 1 auto}.band a{width:100%;padding:0 .7rem;font-size:.94rem}
  .ziffer{font-size:3.4rem}
  .leiste{display:none}
  .regal{display:block;margin-left:7px;border-left:4px solid var(--akz)}
  .sp,.sp.nurdatum{position:relative;width:auto;height:auto;margin:0;overflow:visible;clip-path:none;white-space:normal;padding:0 0 .9rem 1.1rem}
  .sp::before{content:"";position:absolute;left:-11px;top:.2rem;width:10px;height:10px;border-radius:999px;background:var(--grund);border:4px solid var(--akz)}
  .sp.anker::before{left:-10px;top:.3rem;width:12px;height:12px;border-radius:0;transform:rotate(45deg);background:var(--text);border:2px solid var(--grund)}
  .merk{position:static;width:auto;height:auto;margin:0 0 .4rem;overflow:visible;clip-path:none;white-space:normal;line-height:1.25}
  .merk b{font:600 1.06rem/1.2 var(--display);margin-right:.3rem}.merk span{font-size:.94rem;color:#D9D4CA}
  .karte{flex-direction:row;min-height:6rem;height:auto}
  .kbild{flex:0 0 5.75rem}.kbild.ohne .knr{padding:0 .5rem;font-size:1.35rem}
  .ktext{padding:.5rem .7rem .6rem;min-width:0}
  .stand{position:static;align-self:flex-end;margin:0 .5rem .5rem auto;background:transparent;padding:0}
  .leer{margin-top:.6rem}
}
@media (hover:hover) and (pointer:fine){.karte:hover{border-color:#fff}.prinzip li a:hover{border-color:#fff}.werkzeuge a:hover,.bildwahl button:hover,.wechsel button[data-halt]:hover,.band a:hover{background-color:rgba(255,255,255,.14)}.band a[aria-current]:hover{background:var(--b)}.wechsel button[data-wechsel]:hover{background:#fff}}
@media (prefers-reduced-motion:reduce){.hinter img{transition:none}}
@media print{body{background:#fff;color:#000}.band,.wechsel,.bildwahl,.hinter,.kbild img,.leiste{display:none}.kapitel{background:#fff;border-top-color:#000}.karte,.prinzip{background:#fff;border-color:#999}
  .merk,.sp.nurdatum{position:static;width:auto;height:auto;margin:0;overflow:visible;clip-path:none;white-space:normal}*{color:#000!important}}
"""
JS = """(function(){
  var ruhig = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches, halt = false;
  var ansage = document.querySelector("[data-ansage]");
  /* Bild hinter dem Kapitelkopf wechseln; sag = true: der neue Bildtext wird auch angesagt (nur nach eigenem Tippen) */
  function zeige(k, i, sag){
    var b = k.querySelectorAll(".hinter img"), n = b.length; if (!n) return;
    i = ((i % n) + n) % n; k.dataset.bild = i;
    b.forEach(function(im, j){ im.classList.toggle("an", j === i); });
    var t = "Bild " + (i + 1) + " von " + n + ": " + b[i].dataset.text;
    k.querySelector("[data-bildtext]").textContent = t; if (sag) ansage.textContent = t;
  }
  document.querySelectorAll("[data-bildschritt]").forEach(function(b){ b.hidden = false; });
  var knopf = document.querySelector("[data-wechsel]"), satz = document.querySelector("[data-wechselsatz]"), band = document.querySelector(".band"), hb = document.querySelector("[data-halt]");
  function haltsatz(){ return ruhig ? " Am Gerät ist „weniger Bewegung“ eingestellt: Die Bilder wechseln nur, wenn du auf die Pfeile tippst." : (halt ? " Die Bilder stehen still." : " Die Bilder hinter den Kapiteln wechseln alle acht Sekunden."); }
  function ordnung(w, springen){
    document.getElementById("zeit").hidden = w !== "zeit"; document.getElementById("prinzipien").hidden = w !== "prinzip"; band.hidden = w !== "zeit";
    hb.hidden = ruhig || w !== "zeit";
    knopf.dataset.wechsel = w === "zeit" ? "prinzip" : "zeit";
    knopf.textContent = w === "zeit" ? "Module nach Prinzip ordnen" : "Zurück zu den Zeitstrahlen";
    satz.textContent = w === "zeit" ? "Dieselben Module, geordnet nach den Prinzipien der kognitiven Landkarte – quer durch die Epochen." + haltsatz() : "Du siehst die Module nach Prinzip geordnet.";
    try { sessionStorage.setItem("ggk-start:ordnung", w); } catch (e) {}
    if (springen) { var z = document.getElementById(w === "zeit" ? "zeit" : "prinzipien"); z.setAttribute("tabindex", "-1"); z.focus({ preventScroll:true }); z.scrollIntoView({ block:"start" }); }
  }
  document.addEventListener("click", function(e){
    var o = e.target.closest("[data-wechsel]"); if (o) { ordnung(o.dataset.wechsel, true); return; }
    var s = e.target.closest("[data-bildschritt]"); if (s) { var k = s.closest("section.kapitel"); zeige(k, (+k.dataset.bild || 0) + (+s.dataset.bildschritt), true); return; }
    var h = e.target.closest("[data-halt]"); if (h) { halt = !halt; h.setAttribute("aria-pressed", halt); h.textContent = halt ? "Bildwechsel fortsetzen" : "Bildwechsel anhalten"; ordnung("zeit", false); }
  });
  document.querySelector(".wechsel").hidden = false;
  var start = "zeit"; try { start = sessionStorage.getItem("ggk-start:ordnung") || "zeit"; } catch (e) {}
  ordnung(start, false);
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function(es){ es.forEach(function(x){ if (!x.isIntersecting) return;
      document.querySelectorAll(".band a").forEach(function(a){ if (a.dataset.ep === x.target.id) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); }); }); }, { rootMargin:"-40% 0px -55% 0px" });
    document.querySelectorAll("section.kapitel").forEach(function(k){ io.observe(k); });
  }
  try {
    var keys = Object.keys(localStorage), owk = JSON.parse(localStorage.getItem("ggk-owk:v1") || "{}"), faden = owk.faden || {};
    document.querySelectorAll(".stand").forEach(function(el){
      var k = el.dataset.key, da = keys.some(function(x){ return x.indexOf(k) === 0; }), f = el.dataset.faden && (faden[el.dataset.faden] || "").trim();
      if (f) { el.textContent = "✓ Faden geschrieben"; el.hidden = false; } else if (da) { el.textContent = "schon geöffnet"; el.hidden = false; }
    });
  } catch (e) {}
  if (ruhig) return;
  setInterval(function(){ if (halt || document.hidden) return; document.querySelectorAll("section.kapitel").forEach(function(k){ zeige(k, (+k.dataset.bild || 0) + 1, false); }); }, 8000);
})();"""
SEITE = f"""<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="GGK-Labor">
<title>Geschichte für die Gegenwart – GGK-Labor</title>
<meta name="description" content="GGK-Labor: Lernmodule für Geschichte mit Gemeinschaftskunde am Beruflichen Gymnasium – Weimarer Republik, Nationalsozialismus, Ost-West-Konflikt in drei Kapiteln mit Zeitleiste.">
<style>
{CSS}</style>
</head>
<body>
<a class="sprung" href="#inhalt">Zum Inhalt</a>
<header class="kopf huelle">
<a class="marke" href="index.html">GGK-Labor</a>
<nav aria-label="Weitere Seiten"><a href="{LK}">Kognitive Landkarte</a><a href="lehrkraft.html">Für Lehrkräfte</a></nav>
</header>
<main id="inhalt">
<section class="hero huelle">
<h1>Geschichte für die Gegenwart</h1>
<p>Drei Zeitstrahlen von 1918 bis 1991 – untersucht mit der <a href="{LK}">kognitiven Landkarte des Geschichtsunterrichts</a>. In jedem Kapitel stehen zuerst die Daten, die du kennen solltest. Darunter liegen die Module in derselben Reihenfolge.</p>
</section>
<nav class="band" aria-label="Epochen"><ol class="huelle">
<li><a href="#weimar" data-ep="weimar" style="--b:var(--weimar)">1 · Weimarer Republik</a></li>
<li><a href="#ns" data-ep="ns" style="--b:var(--ns)">2 · Nationalsozialismus</a></li>
<li><a href="#ostwest" data-ep="ostwest" style="--b:var(--ow)">3 · Ost-West-Konflikt</a></li>
</ol></nav>
<div id="zeit">{zeit_html}</div>
<section class="prinzipien huelle" id="prinzipien" aria-labelledby="ph">
<h2 id="ph">Dieselben Module – nach Prinzip geordnet</h2>
<p>Die kognitive Landkarte nennt Prinzipien, nach denen Geschichte entsteht. Hier siehst du, in welchen Modulen du welches Prinzip übst – quer durch die Epochen.</p>
<div class="pgitter">{prinzip_html}</div>
<p class="legende">Kante links:<i style="background:var(--ns)"></i>Nationalsozialismus<i style="background:var(--ow)"></i>Ost-West-Konflikt</p>
</section>
<div class="wechsel huelle" hidden><button type="button" data-wechsel="prinzip">Module nach Prinzip ordnen</button><button type="button" data-halt aria-pressed="false">Bildwechsel anhalten</button><span data-wechselsatz aria-live="polite"></span></div>
<p class="nurvorlesen" data-ansage aria-live="polite"></p>
</main>
<footer class="huelle">
<p>Raute auf der Linie: ein Datum zum Merken. Ring: ein Modul ohne eigenes Merkdatum. Unter der Linie steht die Nummer des Moduls im Heft. Die Karten liegen in der Reihenfolge der Zeit, nicht in der Reihenfolge der Nummern. Datum und Modul stehen an derselben Stelle des Strahls; sie gehören nicht immer zum selben Thema.</p>
<p>Bildnachweise: <a href="M17_Bildliste.html">M17</a> · <a href="M21_Bildliste.html">M21</a> · <a href="M22_Bildliste.html">M22</a> · <a href="M23_Bildliste.html">M23</a> · <a href="M25_Bildliste.html">M25</a> · <a href="M27_Bildliste.html">M27</a> · M19, M20, M26: aus dem Unterrichtsheft, Nachweise offen · <a href="ost-west/Bildliste.html">Ost-West (Heft, Nachweise offen)</a></p>
<p>Datenschutz: Alle Ergebnisse bleiben auf deinem Gerät. Diese Seiten senden nichts ins Internet und brauchen keine Anmeldung. · <a href="auswertung.html">Kursauswertung für die Lehrkraft</a></p>
<p>© 2026 Mario Walter · Inhalte CC BY-NC-SA 4.0 · Code MIT · mit KI-Unterstützung entwickelt</p>
</footer>
<script>
{JS}
</script>
</body>
</html>
"""
(R/'index.html').write_text(SEITE, 'utf-8'); print('index.html', len(SEITE))
