#!/usr/bin/env python3
"""Baut die Startseite index.html: ein waagerechter Zeitstrahl 1918–1991 mit drei Epochen (Weimarer Republik, Nationalsozialismus, Ost-West-Konflikt).
Alle Links stehen als HTML im Dokument und sind ohne JavaScript erreichbar (die Spur lässt sich wischen). Aufruf: python3 tools/bau_startseite.py"""
import pathlib, html
R = pathlib.Path(__file__).resolve().parent.parent
e = html.escape
LK = 'https://geschichtefuerdiegegenwart.github.io/kognitive-Landkarte-des-Geschichtsunterrichts/'
NS_BILDER = [('media/m21-wc-umschlagplatz-2012.jpg', 'Gedenkstätte am Umschlagplatz in Warschau, 2012 (zu M21).', 'Eine helle Mauer mit eingemeißelten Vornamen an der Gedenkstätte Umschlagplatz in Warschau.'),
 ('media/m22-wc-jozefow-wald-2022.jpg', 'Wald bei Józefów in Polen, 2022 (zu M22).', 'Hohe Kiefern und ein Weg im Wald bei Józefów.'),
 ('media/m23-wc-elisabeth-dragoer-2026.jpg', 'Fischerboot „Elisabeth“ in Dragør, Dänemark; mit ihm wurden 1943 Menschen nach Schweden gebracht (zu M23).', 'Ein kleines Fischerboot liegt im Hafen von Dragør.')]
OW_BILDER = [('ost-west/media/owk-s1-potsdam.jpg', 'Potsdam, Sommer 1945 (Stunde 1).', 'Churchill, Truman und Stalin reichen einander die Hände.'),
 ('ost-west/media/owk-s3-luftbruecke.jpg', 'Luftbrücke nach West-Berlin, 1948/49 (Stunde 3).', 'Ein Flugzeug fliegt tief über Menschen auf einem Trümmerhügel.'),
 ('ost-west/media/owk-s6-bernauer.jpg', 'Mauerbau an der Bernauer Straße in Berlin, August 1961 (Stunde 6).', 'Bauarbeiter setzen Betonsteine zu einer Mauer.'),
 ('ost-west/media/owk-s9-trabi.jpg', 'Nach der Grenzöffnung, November 1989 (Stunde 9).', 'Menschen umringen Autos der Marke Trabant; auf einem Transparent steht „Test the West!“.')]
NS = [('M18', '1920–1935', 'Die fünf Säulen der NS-Ideologie', ['Vermutung', 'Sechs Zeugnisse', 'Fünf Säulen', 'Expertenrunde', 'Von der Idee zur Tat'], 'ns-ideologie.html', None),
 ('M19', '1933–1939', 'Appeasement-Politik – der Weg zum Frieden oder in den Zweiten Weltkrieg?', ['Was bedroht uns?', 'Was tun wir?', '„Anschluss“', 'Sudetenfrage', 'März 1939', 'Polen', 'Beurteilung'], 'appeasement.html', 'media/m19-heft-karte-deutsches-reich.jpg'),
 ('M20', '1940–1944', 'Großbritannien im Zweiten Weltkrieg – drei Dilemmata', ['Mai 1940', 'Juli 1941', 'Februar 1944', 'Beurteilung'], 'm20-dilemmata.html', 'media/m20-heft-london-1940.jpg'),
 ('M21', '1933–1945', 'Es geht um Menschen – Shoa oder Holocaust?', ['Der Brief', 'Das Wort', 'Vier Menschen', 'Die Matrix', 'Die Zahl'], 'm21-es-geht-um-menschen.html', 'media/m21-wc-westerbork-2018.jpg'),
 ('M22', '1942', '„Große Verbrechen brauchen keine Monster!“ – Wie war das möglich?', ['Faktencheck', 'Józefów', 'Erklärungen', 'Landkarte', 'Marktplatz'], 'm22-wie-war-das-moeglich.html', 'media/m22-wc-jozefow-wald-2022.jpg'),
 ('M23', '1943', 'Die Gesellschaft, in der ich leb(t)e? – Ländervergleich', ['Die Karte', 'Der Film', 'Sechs Säulen', 'Thesen testen', 'Deine Position'], 'm23-die-gesellschaft.html', 'media/m23-wc-elisabeth-dragoer-2026.jpg'),
 ('M25', '1945', 'Leben in Ruinen und der Umgang mit Schuld', ['Der Krieg ist vorbei', 'Überleben in Ruinen', 'Im Angesicht des Verbrechens', 'Verantwortung', 'Landkarte'], 'm25-leben-in-ruinen.html', 'media/m25-weimar-frauen-1945.jpg'),
 ('M26', 'nach 1945', 'Ende gut, alles gut? Kontinuitäten des Nationalsozialismus', ['Schätzen', 'Der BND', 'Eure Gruppe', 'Vergleich', 'Urteil'], 'm26-kontinuitaeten.html', 'media/m26-heft-bnd.jpg'),
 ('M27', '1939–1945, weltweit', 'Die Vergessenen! Eine Globalgeschichte des Zweiten Weltkriegs', ['Dein Bild vom Krieg', 'Der Artikel', 'Eurozentrismus', 'Strukturbild', 'Landkarte'], 'm27-die-vergessenen.html', 'media/m27-afrikanische-soldaten-1944.jpg')]
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
KEYS = {'M18': 'ggklabor:', 'M19': 'ggk-m19-appeasement', 'M20': 'ggk-m20-dilemmata', 'M21': 'ggk-m21-menschen', 'M22': 'ggk-m22-taeter', 'M23': 'ggk-m23-gesellschaft', 'M25': 'ggk-m25-ruinen', 'M26': 'ggk-m26-kontinuitaeten', 'M27': 'ggk-m27-vergessene'}
# Kurztitel für die Übersicht (die vollen Titel stehen in der Ordnung nach Prinzip und in den Modulen)
KURZ = {'M18': 'Die fünf Säulen der NS-Ideologie', 'M19': 'Appeasement-Politik', 'M20': 'Großbritannien im Zweiten Weltkrieg', 'M21': 'Shoa oder Holocaust?', 'M22': 'Wie war das möglich? Täterforschung', 'M23': 'Die Gesellschaft, in der ich leb(t)e?', 'M25': 'Leben in Ruinen, Umgang mit Schuld', 'M26': 'Kontinuitäten des Nationalsozialismus', 'M27': 'Globalgeschichte des Zweiten Weltkriegs',
 1: '„Stunde Null“ und Potsdamer Abkommen', 2: 'Truman-Doktrin und Zwei-Lager-Theorie', 3: 'Berlin-Blockade und sowjetische Zone', 4: 'Doppelte Staatsgründung', 5: 'Westbindung der Bundesrepublik', 6: 'Flucht aus der DDR und Mauerbau', 7: 'Der 17. Juni 1953 im Schulbuch', 8: 'Ostverträge', 9: 'Ende der DDR und des Ost-West-Konflikts'}
# Spalten je Zeitstrahl: (Ankerdatum, Ereignis, Modul). Über der Linie das Datum, darunter das Modul. Vorschlag – bitte prüfen.
SPALTEN = {'weimar': [('9. Nov. 1918', 'Ausrufung der Republik', None), ('11. Aug. 1919', 'Weimarer Verfassung', None), ('1923', 'Krisenjahr: Inflation, Hitlerputsch', None), ('Okt. 1929', 'Beginn der Weltwirtschaftskrise', None)],
 'ns': [('30. Jan. 1933', 'Hitler wird Reichskanzler', 'M18'), ('15. Sept. 1935', 'Nürnberger Gesetze', 'M19'), ('9. Nov. 1938', 'Novemberpogrome', None), ('1. Sept. 1939', 'Überfall auf Polen', 'M27'), (None, None, 'M20'), ('22. Juni 1941', 'Überfall auf die Sowjetunion', 'M21'), (None, None, 'M22'), (None, None, 'M23'), ('8. Mai 1945', 'Bedingungslose Kapitulation', 'M25'), (None, None, 'M26')],
 'ostwest': [('2. Aug. 1945', 'Potsdamer Abkommen', 1), ('12. März 1947', 'Truman-Doktrin', 2), ('24. Juni 1948', 'Beginn der Berlin-Blockade', 3), ('1949', 'Zwei deutsche Staaten', 4), (None, None, 5), ('17. Juni 1953', 'Aufstand in der DDR', 7), ('13. Aug. 1961', 'Bau der Berliner Mauer', 6), (None, None, 8), ('9. Nov. 1989', 'Öffnung der Mauer', 9), ('3. Okt. 1990', 'Deutsche Einheit', None)]}
# Zweite Ordnung: Prinzipien der kognitiven Landkarte -> Module (aus den Landkarten-Seiten der Module abgelesen)
PRINZIP = [('2-1-1', 'Retrospektivität', 'Wir betrachten die Vergangenheit immer im Nachhinein, aus der Gegenwart heraus.', ['M19', 'M20', 1, 8]),
 ('2-1-2', 'Perspektivität', 'Jede Betrachtung erfolgt aus einer Sichtweise, geprägt von Überzeugungen, Interessen und Erfahrungen.', ['M22', 'M25', 'M27', 2]),
 ('2-1-3', 'Partikularität', 'Historische Erkenntnisse sind immer nur Ausschnitte der gesamten Vergangenheit.', []),
 ('2-1-4', 'Selektivität', 'Wer Geschichte erzählt, wählt aus: Welche Quellen, Ereignisse und Personen sind wichtig?', [5]),
 ('2-1-5', 'Partialität', 'Quellen zeigen immer nur einen Teil der Vergangenheit, und nur ein Teil der Quellen ist erhalten.', [6]),
 ('2-1-6', 'Narrativität', 'Geschichte gibt es nur als Erzählung.', [3, 9]),
 ('2-1-7', 'Konstruktivität', 'Geschichte wird nicht gefunden, sondern zusammengesetzt. Aus denselben Fakten können verschiedene Geschichten entstehen.', [7]),
 ('2-1-8', 'Standortgebundenheit', 'Wer Geschichte erzählt, ist durch seinen gesellschaftlichen und kulturellen Kontext geprägt, oft unbewusst.', ['M27', 4])]
OFFEN = ['M18', 'M21', 'M23', 'M26']
MOD = {m[0]: (m[2], m[4]) for m in NS}; MOD.update({m[0]: (m[2], 'ost-west/' + m[4]) for m in ST})
MOD = {m[0]: (m[2], m[4]) for m in NS}; MOD.update({m[0]: (m[2], 'ost-west/' + m[4]) for m in ST})
# Nummer im Heft (steht im Titel) und Platz in der Unterrichtsfolge (steht im Kreis)
HEFTNR = {1: 'M29/M30', 2: 'M31', 3: 'M32/M33', 4: 'M34', 5: 'M35/M36', 6: 'M36–M39', 7: 'M40', 8: 'M41', 9: 'M42–M44'}
HEFTNR.update({m[0]: m[0] for m in NS})
FOLGE = {m[0]: i + 1 for i, m in enumerate(NS)}; FOLGE.update({m[0]: m[0] for m in ST})
INFO = {m[0]: (m[1], m[4], m[5], KEYS[m[0]], '') for m in NS}
INFO.update({m[0]: (m[1], 'ost-west/' + m[4], f'ost-west/media/{m[5]}.jpg', f'ggk-owk-s{m[0]}', f's{m[0]}') for m in ST})
def kachel(nr):
    zeit, ziel, bild, key, faden = INFO[nr]
    b = f'<img src="{bild}" alt="" onerror="this.remove()">' if bild else ''
    return (f'<a class="kachel" href="{ziel}"><span class="kbild{"" if bild else " ohne"}">{b}<span class="knr" aria-hidden="true">{FOLGE[nr]}</span></span>'
            f'<span class="ktext"><span class="kzeit">{e(zeit)}</span><b><span class="mnr">{HEFTNR[nr]}</span> {e(KURZ[nr])}</b><span class="stand" data-key="{key}" data-faden="{faden}" hidden></span></span></a>')
def spur(ep, name):
    sp = SPALTEN[ep]
    li = ''.join(f'<li class="sp{" anker" if d else ""}"><span class="oben">' + (f'<b class="datum">{e(d)}</b><span class="was">{e(w)}</span>' if d else '') + '</span><span class="linie" aria-hidden="true"></span>' + (kachel(m) if m else '') + '</li>' for d, w, m in sp)
    return f'<ol class="spur" style="--n:{len(sp)}" aria-label="Zeitstrahl {name}: über der Linie die Ankerdaten, darunter die Module">{li}</ol>'
def kapitel(ep, ziffer, name, jahre, satz, bilder, zusatz=''):
    imgs = ''.join(f'<img src="{e(b[0])}" alt="" data-text="{e(b[1])}"{" class=\"an\"" if i == 0 else ""} onerror="this.remove()">' for i, b in enumerate(bilder))
    bild = f'<p class="bildzeile" data-bildtext>Bild: {e(bilder[0][1])}</p>' if bilder else ''
    return (f'<section class="kapitel" id="{ep}" data-ep="{ep}">{imgs}<div class="huelle"><div class="kopfzeile"><p class="ziffer">{ziffer}</p><div><h2>{name}</h2><p class="jahre">{jahre}</p></div><p class="satz">{satz}</p></div>'
            f'{spur(ep, name)}{zusatz}{bild}</div></section>')
wz = '<p class="werkzeuge"><b>Werkzeuge für alle neun Stunden:</b>' + ''.join(f'<a href="ost-west/index.html#{a}">{e(n)}</a>' for n, w, a in WZ) + '</p>'
zeit_html = (kapitel('weimar', 1, 'Weimarer Republik', '1918 – 1933', 'Die erste deutsche Demokratie.', [], '<p class="leer">Die Module zu diesem Kapitel entstehen gerade. Die Ankerdaten stehen schon über der Linie.</p>')
 + kapitel('ns', 2, 'Nationalsozialismus', '1933 – 1945 und die Folgen', 'Ideologie, Krieg und Menschheitsverbrechen – und die Frage, wer mitgemacht hat und was danach daraus wurde.', NS_BILDER)
 + kapitel('ostwest', 3, 'Ost-West-Konflikt', '1945 – 1991', 'Welchen Einfluss hatten Ideologien, Machtinteressen und Handlungsspielräume der Akteure – und wie wird dieser Konflikt heute erinnert?', OW_BILDER, wz))
def mlink(nr):
    t, z = MOD[nr]; ep = 'ostwest' if isinstance(nr, int) else 'ns'
    return f'<li><a href="{z}" data-ep="{ep}"><span class="pnr">{HEFTNR[nr]}</span>{e(t)}</a></li>'
prinzip_html = ''.join(f'<article class="prinzip"><h3><a href="{LK}#s-{i}">{e(n)}</a></h3><p>{e(t)}</p>' + (f'<ul>{"".join(mlink(m) for m in ms)}</ul>' if ms else '<p class="keins">Noch kein Modul, das dieses Prinzip in den Mittelpunkt stellt.</p>') + '</article>' for i, n, t, ms in PRINZIP)
prinzip_html += f'<article class="prinzip offen"><h3>Noch nicht zugeordnet</h3><p>Diese Module haben noch keinen eigenen Landkarten-Moment.</p><ul>{"".join(mlink(m) for m in OFFEN)}</ul></article>'
CSS = """@font-face{font-family:"Fraunces";src:url(assets/fonts/Fraunces72pt-SemiBold.woff) format("woff");font-weight:600;font-display:swap}
@font-face{font-family:"Atkinson Hyperlegible";src:url(assets/fonts/AtkinsonHyperlegible-Regular.woff2) format("woff2");font-weight:400;font-display:swap}
@font-face{font-family:"Atkinson Hyperlegible";src:url(assets/fonts/AtkinsonHyperlegible-Bold.woff2) format("woff2");font-weight:700;font-display:swap}
:root{color-scheme:dark;--grund:#15171A;--text:#F4F1EA;--leise:#C9C4BA;--weimar:#E0B74A;--ns:#B9C0C8;--ow:#7FA6FF;--display:"Fraunces",Georgia,serif}
*{box-sizing:border-box}html{scroll-padding-top:4.5rem}
body{margin:0;background:var(--grund);color:var(--text);font:400 1.0625rem/1.5 "Atkinson Hyperlegible",system-ui,sans-serif;overflow-x:clip}
a{color:var(--text)}a:focus-visible,button:focus-visible{outline:3px solid #fff;outline-offset:3px}
button{font:inherit;color:inherit;cursor:pointer}
.huelle{max-width:82rem;margin:0 auto;padding-inline:1.5rem}
.sprung{position:absolute;left:-999rem}.sprung:focus{left:1rem;top:1rem;background:#fff;color:#000;padding:.5rem 1rem;z-index:9}
header.kopf{display:flex;flex-wrap:wrap;gap:.5rem 1.5rem;justify-content:space-between;align-items:center;padding-block:.8rem .2rem}
.marke{font-weight:700;font-size:1.15rem;text-decoration:none}
header.kopf nav{display:flex;flex-wrap:wrap;gap:.3rem 1.25rem;font-size:.95rem}
header.kopf nav a{display:inline-block;padding:.5rem 0}
.hero{padding-block:.2rem .8rem}
h1{margin:0;font:600 clamp(2.1rem,4.6vw,3.6rem)/1.02 var(--display);text-wrap:balance}
.hero p{margin:.4rem 0 0;max-width:80ch;color:#D9D4CA}
/* Leiste: Epochen, Breite = Dauer; bleibt oben stehen und zeigt, wo du bist */
.band{position:sticky;top:0;z-index:5;background:var(--grund);padding-block:.4rem;border-bottom:1px solid #2B2F35}
.band ol{list-style:none;margin:0;padding:0;display:flex;gap:4px}
.band li{min-width:4.6rem}
.band a{display:flex;flex-direction:column;justify-content:center;min-height:44px;padding:.15rem .6rem;border:2px solid var(--b);border-radius:.5rem;text-decoration:none;line-height:1.15;overflow:hidden}
.band a b{font-size:.92rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.band a span{font-size:.78rem;color:var(--leise);white-space:nowrap}
.band a[aria-current]{background:var(--b);color:#15171A}.band a[aria-current] span{color:#15171A}
/* Kapitel: eine Epoche = ein Zeitstrahl, der auf einen Blick zu sehen ist */
.kapitel{position:relative;overflow:hidden;border-top:5px solid var(--f);background:var(--tief);padding-block:.8rem .7rem;--f:var(--ns);--tief:#15171A;--karte:#22262B;--rand:#4A5059}
.kapitel[data-ep=weimar]{--f:var(--weimar);--tief:#211D12}
.kapitel[data-ep=ostwest]{--f:var(--ow);--tief:#10182E;--karte:#1C2333;--rand:#3B4A6B}
.kapitel>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1);opacity:0;transition:opacity 600ms cubic-bezier(.23,1,.32,1)}
.kapitel>img.an{opacity:1}
.kapitel::after{content:"";position:absolute;inset:0;background:var(--tief);opacity:.84}
.kapitel>.huelle{position:relative;z-index:1}
.kopfzeile{display:grid;grid-template-columns:auto auto minmax(0,1fr);gap:.2rem 1.25rem;align-items:center}
.ziffer{margin:0;font:600 3.4rem/.85 var(--display);color:var(--f)}
h2{margin:0;font:600 clamp(1.6rem,3vw,2.2rem)/1.04 var(--display)}
.jahre{margin:.1rem 0 0;font-weight:700;color:var(--f)}
.satz{margin:0;max-width:60ch;font-size:.97rem;color:#E2DED5}
.spur{list-style:none;margin:.5rem 0 0;padding:0 0 .3rem;display:grid;grid-template-columns:repeat(var(--n),minmax(5.9rem,1fr));overflow-x:auto;scrollbar-color:var(--f) transparent}
.sp{display:grid;grid-template-rows:3.5rem auto auto;align-content:start;min-width:0}
.oben{display:flex;flex-direction:column;justify-content:flex-end;padding-right:.5rem}
.datum{font:600 1.02rem/1.15 var(--display)}
.was{font-size:.8rem;line-height:1.2;color:#E2DED5}
.linie{display:block;height:4px;background:var(--f);margin:.55rem 0 .75rem;position:relative}
.linie::before{content:"";position:absolute;left:0;top:-.4rem;width:1rem;height:1rem;border-radius:999px;background:var(--grund);border:3px solid var(--f)}
.anker .linie::before{border-radius:2px;background:var(--text);border-color:var(--text);width:.85rem;height:.85rem;top:-.35rem;transform:rotate(45deg)}
.kachel{display:flex;flex-direction:column;margin-right:.5rem;background:var(--karte);border:1px solid var(--rand);border-radius:.7rem;overflow:hidden;text-decoration:none;min-height:9.2rem}
.kbild{position:relative;display:block;flex:0 0 3.4rem;background:rgba(0,0,0,.3)}
.kbild img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1)}
.knr{position:absolute;left:.4rem;top:.4rem;min-width:2.1rem;height:2.1rem;padding:0 .35rem;border-radius:999px;background:var(--f);color:#15171A;font:600 1.15rem/1 var(--display);display:grid;place-items:center}
.knr.lang{font-size:.92rem}
.ktext{padding:.45rem .55rem .55rem;display:flex;flex-direction:column;gap:.15rem;flex:1}
.kzeit{font-size:.76rem;color:var(--f);font-weight:700}
.ktext b{font:600 .98rem/1.18 var(--display);hyphens:auto}
.mnr{display:block;font:700 .8rem/1.3 "Atkinson Hyperlegible",system-ui,sans-serif;color:var(--text)}
.stand{margin-top:auto;font-size:.76rem;font-weight:700;color:var(--f)}
.werkzeuge{margin:.5rem 0 0;display:flex;flex-wrap:wrap;gap:.4rem;align-items:center;font-size:.92rem}
.werkzeuge b{margin-right:.3rem}
.werkzeuge a{display:inline-flex;align-items:center;min-height:44px;padding:0 .8rem;border:2px solid var(--f);border-radius:999px;text-decoration:none;background:rgba(16,24,46,.6)}
.leer{margin:.2rem 0 0;font-size:.95rem;color:#E2DED5;border:2px dashed var(--f);border-radius:.7rem;padding:.5rem .8rem;max-width:44rem}
.bildzeile{margin:.45rem 0 0;font-size:.78rem;color:var(--leise)}
/* Zweite Ordnung: nach den Prinzipien der kognitiven Landkarte */
.prinzipien{padding-block:1.5rem 2rem}
.prinzipien>h2{margin-bottom:.4rem}
.prinzipien>p{margin:0 0 1.2rem;max-width:70ch;color:#D9D4CA}
.pgitter{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(19rem,100%),1fr));gap:1rem}
.prinzip{background:#1E2126;border:1px solid #4A5059;border-top:6px solid var(--text);border-radius:0 0 .9rem .9rem;padding:1rem}
.prinzip.offen{border-top-style:dashed;background:transparent}
.prinzip h3{font-size:1.45rem}
.prinzip p{margin:.2rem 0 .7rem;font-size:.95rem;color:var(--leise)}
.prinzip ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.4rem}
.prinzip li a{display:grid;grid-template-columns:5.2rem minmax(0,1fr);gap:.6rem;align-items:center;min-height:48px;padding:.3rem .7rem;border:1px solid #4A5059;border-left:6px solid var(--ns);border-radius:0 .6rem .6rem 0;text-decoration:none;line-height:1.25;font-size:.98rem}
.prinzip li a[data-ep=ostwest]{border-left-color:var(--ow)}
.pnr{font-weight:700;font-size:.9rem;color:var(--ns)}.prinzip li a[data-ep=ostwest] .pnr{color:var(--ow)}
.legende{margin:1rem 0 0;font-size:.9rem;color:var(--leise)}
.legende i{display:inline-block;width:.9rem;height:.9rem;vertical-align:-.1rem;margin:0 .3rem 0 .8rem}
.wechsel{padding-block:1.4rem 1rem;display:flex;flex-wrap:wrap;gap:.6rem 1rem;align-items:center}
.wechsel button{min-height:52px;padding:0 1.3rem;border:2px solid var(--text);border-radius:.7rem;background:var(--text);color:#15171A;font-weight:700;font-size:1.05rem}
.wechsel span{color:var(--leise);font-size:.95rem;max-width:56ch}
[hidden]{display:none!important}
footer{padding-top:1rem;padding-bottom:2.5rem;font-size:.9rem;color:var(--leise);border-top:1px solid #2B2F35}
footer p{margin:0 0 .4rem}
footer a{display:inline-block;padding:.35rem 0}
footer button{min-height:44px;padding:0 1rem;border:2px solid var(--leise);border-radius:.6rem;background:transparent;margin-right:.6rem}
@media (max-width:900px){.kopfzeile{grid-template-columns:auto minmax(0,1fr)}.satz{grid-column:1/-1}}
/* Hochformat am Tablet: der Zeitstrahl bricht in zwei Zeilen um, statt zu scrollen */
@media (min-width:701px) and (max-width:999px){.spur{grid-template-columns:repeat(5,minmax(0,1fr));row-gap:.6rem;overflow:visible}}
/* Telefon: der Zeitstrahl läuft senkrecht */
@media (max-width:700px){
  .spur{display:block;overflow:visible;margin-top:.9rem}
  .sp{display:block;position:relative;border-left:4px solid var(--f);margin-left:.5rem;padding:0 0 .8rem 1.2rem}
  .sp::before{content:"";position:absolute;left:-.65rem;top:.1rem;width:1rem;height:1rem;border-radius:999px;background:var(--grund);border:3px solid var(--f)}
  .sp.anker::before{border-radius:2px;background:var(--text);border-color:var(--text);width:.85rem;height:.85rem;left:-.57rem;transform:rotate(45deg)}
  .linie{display:none}.oben{display:block;padding:0 0 .35rem}.oben:empty{display:none}.datum{margin-right:.5rem}.was{font-size:.95rem}
  .kachel{flex-direction:row;margin-right:0;min-height:4.6rem}.kbild{flex:0 0 5.5rem}.ktext b{font-size:1.08rem}.kzeit,.stand{font-size:.84rem}
  .band li{flex:1 1 0!important;min-width:0}.band a{padding:.2rem .4rem}.band a b{white-space:normal;font-size:.8rem;hyphens:auto}
}
@media (hover:hover) and (pointer:fine){.kachel:hover,.prinzip li a:hover{border-color:#fff}.werkzeuge a:hover,footer button:hover{background:rgba(255,255,255,.14)}.wechsel button:hover{background:#fff}}
@media (prefers-reduced-motion:reduce){.kapitel>img{transition:none}}
@media print{body{background:#fff;color:#000}.band,.wechsel,.bildzeile,.kapitel>img,.kapitel::after,.kbild img,footer button{display:none}.kapitel{background:#fff}.kachel,.prinzip{background:#fff;border-color:#999}*{color:#000!important}}
"""
JS = """(function(){
  var ruhig = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches, halt = false;
  function naechstes(k){
    var b = k.querySelectorAll(":scope > img"), n = b.length; if (n < 2) return;
    var i = ((+k.dataset.bild || 0) + 1) % n; k.dataset.bild = i; b.forEach(function(im, j){ im.classList.toggle("an", j === i); });
    k.querySelector("[data-bildtext]").textContent = "Bild: " + b[i].dataset.text;
  }
  var knopf = document.querySelector("[data-wechsel]"), satz = document.querySelector("[data-wechselsatz]"), band = document.querySelector(".band");
  function ordnung(w, springen){
    document.getElementById("zeit").hidden = w !== "zeit"; document.getElementById("prinzipien").hidden = w !== "prinzip"; band.hidden = w !== "zeit";
    knopf.dataset.wechsel = w === "zeit" ? "prinzip" : "zeit";
    knopf.textContent = w === "zeit" ? "Module nach Prinzip ordnen" : "Zurück zum Zeitstrahl";
    satz.textContent = w === "zeit" ? "Dieselben Module, geordnet nach den Prinzipien der kognitiven Landkarte – quer durch die Epochen." : "Du siehst die Module nach Prinzip geordnet.";
    try { sessionStorage.setItem("ggk-start:ordnung", w); } catch (e) {}
    if (springen) { var z = document.getElementById(w === "zeit" ? "zeit" : "prinzipien"); z.setAttribute("tabindex", "-1"); z.focus({ preventScroll:true }); z.scrollIntoView({ block:"start" }); }
  }
  document.addEventListener("click", function(e){
    var o = e.target.closest("[data-wechsel]"); if (o) { ordnung(o.dataset.wechsel, true); return; }
    var h = e.target.closest("[data-halt]"); if (h) { halt = !halt; h.setAttribute("aria-pressed", halt); h.textContent = halt ? "Bildwechsel fortsetzen" : "Bildwechsel anhalten"; }
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
  var hb = document.querySelector("[data-halt]");
  if (ruhig) { hb.hidden = true; document.querySelector("[data-haltsatz]").textContent = "Am Gerät ist „weniger Bewegung“ eingestellt: Die Hintergrundbilder wechseln nicht."; return; }
  setInterval(function(){ if (halt || document.hidden) return; document.querySelectorAll("section.kapitel").forEach(naechstes); }, 8000);
})();"""
SEITE = f"""<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="GGK-Labor">
<title>Geschichte für die Gegenwart – GGK-Labor</title>
<meta name="description" content="GGK-Labor: Lernmodule für Geschichte mit Gemeinschaftskunde am Beruflichen Gymnasium – Weimarer Republik, Nationalsozialismus, Ost-West-Konflikt auf drei Zeitstrahlen.">
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
<p>Drei Zeitstrahlen von 1918 bis 1991 – untersucht mit der <a href="{LK}"><b>kognitiven Landkarte des Geschichtsunterrichts</b></a>. Über der Linie stehen die Daten, die du kennen solltest, darunter die Module.</p>
</section>
<nav class="band" aria-label="Epochen"><ol class="huelle">
<li style="flex:15 1 0"><a href="#weimar" data-ep="weimar" style="--b:var(--weimar)"><b>Weimarer Republik</b><span>1918–1933</span></a></li>
<li style="flex:12 1 0"><a href="#ns" data-ep="ns" style="--b:var(--ns)"><b>Nationalsozialismus</b><span>1933–1945</span></a></li>
<li style="flex:46 1 0"><a href="#ostwest" data-ep="ostwest" style="--b:var(--ow)"><b>Ost-West-Konflikt</b><span>1945–1991</span></a></li>
</ol></nav>
<div id="zeit">{zeit_html}</div>
<section class="prinzipien huelle" id="prinzipien" aria-labelledby="ph">
<h2 id="ph">Dieselben Module – nach Prinzip geordnet</h2>
<p>Die kognitive Landkarte nennt Prinzipien, nach denen Geschichte entsteht. Hier siehst du, in welchen Modulen du welches Prinzip übst – quer durch die Epochen.</p>
<div class="pgitter">{prinzip_html}</div>
<p class="legende">Kante links:<i style="background:var(--ns)"></i>Nationalsozialismus<i style="background:var(--ow)"></i>Ost-West-Konflikt</p>
</section>
<div class="wechsel huelle" hidden><button type="button" data-wechsel="prinzip">Module nach Prinzip ordnen</button><span data-wechselsatz aria-live="polite"></span></div>
</main>
<footer class="huelle">
<p><button type="button" data-halt aria-pressed="false">Bildwechsel anhalten</button><span data-haltsatz>Die Hintergrundbilder wechseln alle acht Sekunden.</span></p>
<p>Raute über der Linie: ein Datum zum Merken. Karte unter der Linie: ein Modul mit seiner Nummer im Heft. Die Zahl im Kreis zeigt die Reihenfolge im Unterricht, die Linie die Zeit. Bildnachweise: <a href="M21_Bildliste.html">M21</a> · <a href="M22_Bildliste.html">M22</a> · <a href="M23_Bildliste.html">M23</a> · <a href="M25_Bildliste.html">M25</a> · <a href="M27_Bildliste.html">M27</a> · M19, M20, M26: aus dem Unterrichtsheft, Nachweise offen · <a href="ost-west/Bildliste.html">Ost-West (Heft, Nachweise offen)</a></p>
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
