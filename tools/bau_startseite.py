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
 ('M19', '1933–1939', 'Appeasement-Politik – der Weg zum Frieden oder in den Zweiten Weltkrieg?', ['Was bedroht uns?', 'Was tun wir?', '„Anschluss“', 'Sudetenfrage', 'März 1939', 'Polen', 'Beurteilung'], 'appeasement.html', None),
 ('M20', '1940–1944', 'Großbritannien im Zweiten Weltkrieg – drei Dilemmata', ['Mai 1940', 'Juli 1941', 'Februar 1944', 'Beurteilung'], 'm20-dilemmata.html', None),
 ('M21', '1933–1945', 'Es geht um Menschen – Shoa oder Holocaust?', ['Der Brief', 'Das Wort', 'Vier Menschen', 'Die Matrix', 'Die Zahl'], 'm21-es-geht-um-menschen.html', 'media/m21-wc-westerbork-2018.jpg'),
 ('M22', '1942', '„Große Verbrechen brauchen keine Monster!“ – Wie war das möglich?', ['Faktencheck', 'Józefów', 'Erklärungen', 'Landkarte', 'Marktplatz'], 'm22-wie-war-das-moeglich.html', 'media/m22-wc-jozefow-wald-2022.jpg'),
 ('M23', '1943', 'Die Gesellschaft, in der ich leb(t)e? – Ländervergleich', ['Die Karte', 'Der Film', 'Sechs Säulen', 'Thesen testen', 'Deine Position'], 'm23-die-gesellschaft.html', 'media/m23-wc-elisabeth-dragoer-2026.jpg'),
 ('M25', '1945', 'Leben in Ruinen und der Umgang mit Schuld', ['Der Krieg ist vorbei', 'Überleben in Ruinen', 'Im Angesicht des Verbrechens', 'Verantwortung', 'Landkarte'], 'm25-leben-in-ruinen.html', 'media/m25-weimar-frauen-1945.jpg'),
 ('M26', 'nach 1945', 'Ende gut, alles gut? Kontinuitäten des Nationalsozialismus', ['Schätzen', 'Der BND', 'Eure Gruppe', 'Vergleich', 'Urteil'], 'm26-kontinuitaeten.html', None),
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
# Ankerereignisse (Vorschlag, von der Lehrkraft zu prüfen): (Sortierwert, Datum, Ereignis)
ANKER = {'weimar': [(1918.86, '9. Nov. 1918', 'Ausrufung der Republik'), (1919.6, '11. Aug. 1919', 'Weimarer Verfassung'), (1923.5, '1923', 'Krisenjahr: Inflation, Hitlerputsch'), (1929.8, 'Okt. 1929', 'Beginn der Weltwirtschaftskrise')],
 'ns': [(1933.08, '30. Jan. 1933', 'Hitler wird Reichskanzler'), (1935.7, '15. Sept. 1935', 'Nürnberger Gesetze'), (1938.86, '9. Nov. 1938', 'Novemberpogrome'), (1939.67, '1. Sept. 1939', 'Überfall auf Polen'), (1941.47, '22. Juni 1941', 'Überfall auf die Sowjetunion'), (1945.35, '8. Mai 1945', 'Bedingungslose Kapitulation')],
 'ostwest': [(1945.59, '2. Aug. 1945', 'Potsdamer Abkommen'), (1947.2, '12. März 1947', 'Truman-Doktrin'), (1948.48, '24. Juni 1948', 'Beginn der Berlin-Blockade'), (1949.4, '23. Mai / 7. Okt. 1949', 'Zwei deutsche Staaten'), (1953.46, '17. Juni 1953', 'Aufstand in der DDR'), (1961.62, '13. Aug. 1961', 'Bau der Berliner Mauer'), (1989.86, '9. Nov. 1989', 'Öffnung der Mauer'), (1990.75, '3. Okt. 1990', 'Deutsche Einheit')]}
# Platz der Module auf der Linie (Sortierwert); die Nummer zeigt die Reihenfolge im Unterricht
ORT = {'M18': 1933.1, 'M19': 1938.5, 'M27': 1939.7, 'M20': 1940, 'M21': 1941.5, 'M22': 1942, 'M23': 1943, 'M25': 1945.4, 'M26': 1945.6,
       1: 1945.6, 2: 1947.3, 3: 1948.5, 4: 1949.8, 5: 1950, 7: 1953.5, 6: 1961.7, 8: 1970, 9: 1989.9}
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
def karte(ep, nr, zeit, titel, teile, ziel, bild, key, faden=''):
    b = f'<img src="{bild}" alt="" onerror="this.remove()">' if bild else ''
    return (f'<li class="station"><span class="oben"><span class="jahr">{e(zeit)}</span></span><span class="linie" aria-hidden="true"></span><a class="modulkarte" href="{ziel}"><span class="sbild{"" if bild else " ohne"}">{b}<span class="snr{" lang" if len(str(nr)) > 1 else ""}">{nr}</span></span>'
            f'<span class="stext"><b>{e(titel)}</b><span class="teile">' + ''.join(f'<span>{e(x)}</span>' for x in teile) + f'</span><span class="stand" data-key="{key}" data-faden="{faden}" hidden></span></span></a></li>')
def anker(datum, was):
    return f'<li class="station anker"><span class="oben"><b class="datum">{e(datum)}</b><span class="was">{e(was)}</span></span><span class="linie" aria-hidden="true"></span></li>'
def spur(ep, stationen, name):
    teile = [(w, anker(d, t)) for w, d, t in ANKER[ep]] + stationen
    return f'<ol class="spur" tabindex="0" aria-label="Zeitstrahl {name}: oben die Ankerdaten, unten die Module">' + ''.join(h for _, h in sorted(teile, key=lambda x: x[0])) + '</ol>'
wz = '<li class="station wz"><span class="oben"><span class="jahr">für alle neun Stunden</span></span><span class="linie" aria-hidden="true"></span><div class="wzkarte"><h3>Fünf Werkzeuge</h3>' + ''.join(f'<a href="ost-west/index.html#{a}"><b>{e(n)}</b><span>{e(w)}</span></a>' for n, w, a in WZ) + '</div></li>'
leer = '<li class="station"><span class="oben"><span class="jahr">1918–1933</span></span><span class="linie" aria-hidden="true"></span><div class="leer"><b>Die Module entstehen gerade.</b><span>Die Ankerdaten stehen schon über der Linie.</span></div></li>'
SP = {'weimar': spur('weimar', [(1918.9, leer)], 'Weimarer Republik'),
      'ns': spur('ns', [(ORT[nr], karte('ns', nr, z, t, teile, d, b, KEYS[nr])) for nr, z, t, teile, d, b in NS], 'Nationalsozialismus'),
      'ostwest': spur('ostwest', [(1945.0, wz)] + [(ORT[nr], karte('ostwest', nr, z, t, teile, 'ost-west/' + d, f'ost-west/media/{b}.jpg', f'ggk-owk-s{nr}', f's{nr}')) for nr, z, t, teile, d, b in ST], 'Ost-West-Konflikt')}
def kapitel(ep, ziffer, name, jahre, satz, bilder):
    imgs = ''.join(f'<img src="{e(b[0])}" alt="" data-text="{e(b[1])}"{" class=\"an\"" if i == 0 else ""} onerror="this.remove()">' for i, b in enumerate(bilder))
    bild = f'<p class="bildzeile"><button type="button" data-bild>Nächstes Bild</button><span aria-live="polite" data-bildtext>Bild 1 von {len(bilder)}: {e(bilder[0][1])}</span></p>' if bilder else ''
    return (f'<section class="kapitel" id="{ep}" data-ep="{ep}">{imgs}<div class="huelle kopfzeile"><p class="ziffer">{ziffer}</p><div><h2>{name}</h2><p class="jahre">{jahre}</p></div><p class="satz">{satz}</p>'
            f'<div class="pfeile"><button type="button" data-schritt="-1" aria-label="{e(name)}: auf dem Zeitstrahl zurück">‹</button><button type="button" data-schritt="1" aria-label="{e(name)}: auf dem Zeitstrahl weiter">›</button></div></div>{SP[ep]}<div class="huelle">{bild}</div></section>')
zeit_html = (kapitel('weimar', 1, 'Weimarer Republik', '1918 – 1933', 'Die erste deutsche Demokratie. Die Module zu diesem Kapitel entstehen gerade.', [])
 + kapitel('ns', 2, 'Nationalsozialismus', '1933 – 1945 und die Folgen · neun Module', 'Ideologie, Krieg und Menschheitsverbrechen – und die Frage, wer mitgemacht hat und was danach daraus wurde.', NS_BILDER)
 + kapitel('ostwest', 3, 'Ost-West-Konflikt', '1945 – 1991 · neun Stunden, fünf Werkzeuge', 'Welchen Einfluss hatten Ideologien, Machtinteressen und Handlungsspielräume der Akteure – und wie wird dieser Konflikt heute erinnert?', OW_BILDER))
def mlink(nr):
    t, z = MOD[nr]; ep = 'ostwest' if isinstance(nr, int) else 'ns'
    return f'<li><a href="{z}" data-ep="{ep}"><span class="pnr">{nr if not isinstance(nr, int) else "Stunde " + str(nr)}</span>{e(t)}</a></li>'
prinzip_html = ''.join(f'<article class="prinzip"><h3><a href="{LK}#s-{i}">{e(n)}</a></h3><p>{e(t)}</p>' + (f'<ul>{"".join(mlink(m) for m in ms)}</ul>' if ms else '<p class="keins">Noch kein Modul, das dieses Prinzip in den Mittelpunkt stellt.</p>') + '</article>' for i, n, t, ms in PRINZIP)
prinzip_html += f'<article class="prinzip offen"><h3>Noch nicht zugeordnet</h3><p>Diese Module haben noch keinen eigenen Landkarten-Moment.</p><ul>{"".join(mlink(m) for m in OFFEN)}</ul></article>'
CSS = """@font-face{font-family:"Fraunces";src:url(assets/fonts/Fraunces72pt-SemiBold.woff) format("woff");font-weight:600;font-display:swap}
@font-face{font-family:"Atkinson Hyperlegible";src:url(assets/fonts/AtkinsonHyperlegible-Regular.woff2) format("woff2");font-weight:400;font-display:swap}
@font-face{font-family:"Atkinson Hyperlegible";src:url(assets/fonts/AtkinsonHyperlegible-Bold.woff2) format("woff2");font-weight:700;font-display:swap}
:root{color-scheme:dark;--grund:#15171A;--text:#F4F1EA;--leise:#C9C4BA;--weimar:#E0B74A;--ns:#B9C0C8;--ow:#7FA6FF;--display:"Fraunces",Georgia,serif}
*{box-sizing:border-box}html{scroll-padding-top:4.5rem}
body{margin:0;background:var(--grund);color:var(--text);font:400 1.0625rem/1.5 "Atkinson Hyperlegible",system-ui,sans-serif;overflow-x:clip}
a{color:var(--text)}a:focus-visible,button:focus-visible,.spur:focus-visible{outline:3px solid #fff;outline-offset:3px}
button{font:inherit;color:inherit;cursor:pointer}
.huelle{max-width:80rem;margin:0 auto;padding-inline:1.5rem}
.sprung{position:absolute;left:-999rem}.sprung:focus{left:1rem;top:1rem;background:#fff;color:#000;padding:.5rem 1rem;z-index:9}
header.kopf{display:flex;flex-wrap:wrap;gap:.5rem 1.5rem;justify-content:space-between;align-items:center;padding-block:.9rem .4rem}
.marke{font-weight:700;font-size:1.15rem;text-decoration:none}
header.kopf nav{display:flex;flex-wrap:wrap;gap:.3rem 1.25rem;font-size:.95rem}
header.kopf nav a{display:inline-block;padding:.5rem 0}
.hero{padding-block:.6rem 1.2rem}
h1{margin:0;font:600 clamp(2.3rem,5.5vw,4.5rem)/1.02 var(--display);text-wrap:balance}
.hero p{margin:.6rem 0 0;max-width:78ch;color:#D9D4CA}
/* Leiste: Epochen (Breite = Dauer) und Umschalter der Ordnung; bleibt oben stehen */
.band{position:sticky;top:0;z-index:5;background:var(--grund);padding-block:.45rem;border-bottom:1px solid #2B2F35}
.band .huelle{display:flex;flex-wrap:wrap;gap:.5rem 1rem;align-items:center}
.band ol{list-style:none;margin:0;padding:0;display:flex;gap:4px;flex:1 1 30rem}
.band li{min-width:4.6rem}
.band a{display:flex;flex-direction:column;justify-content:center;min-height:48px;padding:.2rem .6rem;border:2px solid var(--b);border-radius:.5rem;text-decoration:none;line-height:1.15;overflow:hidden}
.band a b{font-size:.95rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.band a span{font-size:.8rem;color:var(--leise);white-space:nowrap}
.band a[aria-current]{background:var(--b);color:#15171A}.band a[aria-current] span{color:#15171A}
.ordnung{display:flex;gap:4px}
.ordnung button{min-height:48px;padding:0 .9rem;border:2px solid var(--leise);border-radius:.5rem;background:transparent;font-weight:700}
.ordnung button[aria-pressed=true]{background:var(--text);color:#15171A;border-color:var(--text)}
/* Kapitel: eine Epoche = ein waagerechter Zeitstrahl, die Kapitel stehen untereinander */
.kapitel{position:relative;overflow:hidden;border-top:6px solid var(--f);background:var(--tief);padding-block:1.2rem 1rem;--f:var(--ns);--tief:#15171A;--karte:#22262B;--rand:#4A5059;--rand2:#7C848E}
.kapitel[data-ep=weimar]{--f:var(--weimar);--tief:#211D12;--karte:#2A2516;--rand:#6B5A24}
.kapitel[data-ep=ostwest]{--f:var(--ow);--tief:#10182E;--karte:#1C2333;--rand:#3B4A6B;--rand2:#6F86B8}
.kapitel>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1);opacity:0;transition:opacity 600ms cubic-bezier(.23,1,.32,1)}
.kapitel>img.an{opacity:1}
.kapitel::after{content:"";position:absolute;inset:0;background:var(--tief);opacity:.82}
.kapitel>.huelle,.kapitel>.spur{position:relative;z-index:1}
.kopfzeile{display:grid;grid-template-columns:auto minmax(0,auto) minmax(0,1fr) auto;gap:.4rem 1.5rem;align-items:center}
.ziffer{margin:0;font:600 4.5rem/.85 var(--display);color:var(--f)}
h2{margin:0;font:600 clamp(1.8rem,3.4vw,2.6rem)/1.04 var(--display)}
.jahre{margin:.15rem 0 0;font-weight:700;color:var(--f)}
.satz{margin:0;max-width:46ch;font-size:1rem}
.pfeile{display:flex;gap:.5rem}
.pfeile button,.bildzeile button{min-height:44px;min-width:44px;border:2px solid var(--f);border-radius:999px;background:rgba(21,23,26,.6)}
.pfeile button{font-size:1.4rem;line-height:1}
.bildzeile{margin:.2rem 0 0;display:flex;flex-wrap:wrap;gap:.5rem .75rem;align-items:center;font-size:.9rem;color:#E2DED5}
.bildzeile button{padding:0 .9rem}
.spur{list-style:none;margin:.5rem 0 0;padding:0 max(1.5rem,calc((100vw - 80rem)/2 + 1.5rem)) .7rem;display:flex;align-items:stretch;overflow-x:auto;scroll-snap-type:x proximity;scroll-padding-inline:1.5rem;scrollbar-color:var(--f) transparent;overscroll-behavior-x:contain}
.station{flex:0 0 17.5rem;display:grid;grid-template-rows:4.4rem auto 1fr;scroll-snap-align:start}
.station.anker{flex-basis:10.5rem}
.oben{display:flex;flex-direction:column;justify-content:flex-end;padding-right:1rem}
.jahr{font:600 1.05rem/1.2 var(--display);color:var(--f)}
.datum{font:600 1.2rem/1.15 var(--display);color:var(--text)}
.was{font-size:.9rem;line-height:1.25;color:#E2DED5}
.linie{display:block;height:4px;background:var(--f);margin:.6rem 0 .9rem;position:relative}
.linie::before{content:"";position:absolute;left:0;top:-.5rem;width:1.25rem;height:1.25rem;border-radius:999px;background:var(--grund);border:4px solid var(--f)}
.anker .linie::before{border-radius:2px;background:var(--text);border-color:var(--text);width:1rem;height:1rem;top:-.4rem;transform:rotate(45deg)}
.modulkarte,.wzkarte,.leer{margin-right:1rem}
.modulkarte{display:flex;flex-direction:column;background:var(--karte);border:1px solid var(--rand);border-radius:.9rem;overflow:hidden;text-decoration:none}
.sbild{position:relative;display:block;flex:0 0 6.25rem;background:rgba(0,0,0,.28)}
.sbild img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1)}
.snr{position:absolute;left:.75rem;top:.75rem;min-width:44px;height:44px;padding:0 .5rem;border-radius:999px;background:var(--f);color:#15171A;font:600 1.5rem/1 var(--display);display:grid;place-items:center}
.snr.lang{font-size:1.15rem}
.sbild.ohne .snr{left:50%;top:50%;transform:translate(-50%,-50%);height:3.5rem;min-width:5.5rem;font-size:1.9rem;background:transparent;color:var(--f);border:3px solid var(--f)}
.stext{padding:.75rem .9rem .9rem;display:flex;flex-direction:column;gap:.55rem;flex:1}
.stext b{font:600 1.2rem/1.18 var(--display)}
.teile{display:flex;flex-wrap:wrap;gap:.35rem}
.teile span{font-size:.84rem;padding:.1rem .5rem;border:1px solid var(--rand2,#A08A3C);border-radius:.4rem;color:#E9EDF5}
.stand{margin-top:auto;font-size:.88rem;font-weight:700;color:var(--f)}
.wzkarte{display:flex;flex-direction:column;gap:.3rem}
h3{margin:0 0 .2rem;font:600 1.2rem/1.2 var(--display)}
.wzkarte a{display:block;min-height:44px;padding:.2rem .7rem;border:2px solid var(--f);border-radius:.6rem;text-decoration:none;background:rgba(16,24,46,.6);line-height:1.2}
.wzkarte b{display:block}.wzkarte span{font-size:.86rem;color:var(--leise)}
.leer{border:2px dashed var(--f);border-radius:.9rem;padding:1rem;display:flex;flex-direction:column;gap:.3rem;align-self:start}
.leer span{font-size:.92rem;color:var(--leise)}
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
[hidden]{display:none!important}
footer{padding-top:1rem;padding-bottom:2.5rem;font-size:.94rem;color:var(--leise);border-top:1px solid #2B2F35}
footer p{margin:0 0 .4rem}
footer a{display:inline-block;padding:.35rem 0}
footer button{min-height:44px;padding:0 1rem;border:2px solid var(--leise);border-radius:.6rem;background:transparent;margin-right:.6rem}
@media (max-width:900px){.kopfzeile{grid-template-columns:auto minmax(0,1fr) auto}.satz{grid-column:1/-1;grid-row:2}}
/* Telefon: der Zeitstrahl läuft senkrecht */
@media (max-width:700px){
  .pfeile{display:none}.kopfzeile{grid-template-columns:auto minmax(0,1fr)}
  .spur{flex-direction:column;overflow:visible;padding:0 1.5rem;margin-top:1rem}
  .station,.station.anker{flex:none;display:block;position:relative;border-left:4px solid var(--f);margin-left:.5rem;padding:0 0 1.1rem 1.4rem}
  .station::before{content:"";position:absolute;left:-.75rem;top:0;width:1.25rem;height:1.25rem;border-radius:999px;background:var(--grund);border:4px solid var(--f)}
  .station.anker::before{left:-.65rem;top:.15rem;width:1rem;height:1rem;border-radius:2px;background:var(--text);border-color:var(--text);transform:rotate(45deg)}
  .linie{display:none}.oben{display:block;padding:0 0 .4rem}.datum{margin-right:.5rem}.was{font-size:1rem}
  .modulkarte,.wzkarte,.leer{margin-right:0}
  .band li{flex:1 1 0!important;min-width:0}.band a{padding:.2rem .4rem}.band a b{white-space:normal;font-size:.8rem;hyphens:auto}
  .ordnung{flex:1 1 100%}.ordnung button{flex:1}
}
@media (hover:hover) and (pointer:fine){.modulkarte:hover,.prinzip li a:hover{border-color:#fff}.wzkarte a:hover,.pfeile button:hover,.bildzeile button:hover,.ordnung button:hover,footer button:hover{background:rgba(255,255,255,.14)}.ordnung button[aria-pressed=true]:hover{background:var(--text)}}
@media (prefers-reduced-motion:reduce){.kapitel>img{transition:none}}
@media print{body{background:#fff;color:#000}.band,.pfeile,.bildzeile,.kapitel>img,.kapitel::after,.sbild img,footer button{display:none}.kapitel{background:#fff}.spur{flex-wrap:wrap;overflow:visible}.modulkarte,.prinzip{background:#fff;border-color:#999}*{color:#000!important}}
"""
JS = """(function(){
  var ruhig = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches, halt = false, weich = ruhig ? "auto" : "smooth";
  function naechstes(k){
    var b = k.querySelectorAll(":scope > img"), n = b.length; if (!n) return;
    var i = ((+k.dataset.bild || 0) + 1) % n; k.dataset.bild = i; b.forEach(function(im, j){ im.classList.toggle("an", j === i); });
    k.querySelector("[data-bildtext]").textContent = "Bild " + (i + 1) + " von " + n + ": " + b[i].dataset.text;
  }
  function ordnung(w){
    document.getElementById("zeit").hidden = w !== "zeit"; document.getElementById("prinzipien").hidden = w !== "prinzip";
    document.querySelectorAll("[data-ordnung]").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.ordnung === w); });
    document.querySelector(".band ol").style.visibility = w === "zeit" ? "" : "hidden";
    try { sessionStorage.setItem("ggk-start:ordnung", w); } catch (e) {}
  }
  document.addEventListener("click", function(e){
    var s = e.target.closest("[data-schritt]"); if (s) { var sp = s.closest(".kapitel").querySelector(".spur"); sp.scrollBy({ left: (+s.dataset.schritt) * Math.max(280, sp.clientWidth * .75), behavior: weich }); return; }
    var b = e.target.closest("[data-bild]"); if (b) { naechstes(b.closest(".kapitel")); return; }
    var o = e.target.closest("[data-ordnung]"); if (o) { ordnung(o.dataset.ordnung); return; }
    var a = e.target.closest(".band a"); if (a && document.getElementById("zeit").hidden) ordnung("zeit");
    var h = e.target.closest("[data-halt]"); if (h) { halt = !halt; h.setAttribute("aria-pressed", halt); h.textContent = halt ? "Bildwechsel fortsetzen" : "Bildwechsel anhalten"; }
  });
  document.querySelector(".ordnung").hidden = false;
  var start = "zeit"; try { start = sessionStorage.getItem("ggk-start:ordnung") || "zeit"; } catch (e) {}
  ordnung(start);
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function(es){ es.forEach(function(x){ if (!x.isIntersecting) return;
      document.querySelectorAll(".band a").forEach(function(a){ if (a.dataset.ep === x.target.id) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); }); }); }, { rootMargin:"-45% 0px -50% 0px" });
    document.querySelectorAll("section.kapitel").forEach(function(k){ io.observe(k); });
  }
  try {
    var keys = Object.keys(localStorage), owk = JSON.parse(localStorage.getItem("ggk-owk:v1") || "{}"), faden = owk.faden || {};
    document.querySelectorAll(".stand").forEach(function(el){
      var k = el.dataset.key, da = keys.some(function(x){ return x.indexOf(k) === 0; }), f = el.dataset.faden && (faden[el.dataset.faden] || "").trim();
      if (f) { el.textContent = "✓ roter Faden geschrieben"; el.hidden = false; } else if (da) { el.textContent = "schon geöffnet"; el.hidden = false; }
    });
  } catch (e) {}
  var hb = document.querySelector("[data-halt]");
  if (ruhig) { hb.hidden = true; document.querySelector("[data-haltsatz]").textContent = "Am Gerät ist „weniger Bewegung“ eingestellt: Die Bilder wechseln nur auf Tippen."; return; }
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
<nav class="band" aria-label="Epochen und Ordnung"><div class="huelle">
<ol>
<li style="flex:15 1 0"><a href="#weimar" data-ep="weimar" style="--b:var(--weimar)"><b>Weimarer Republik</b><span>1918–1933</span></a></li>
<li style="flex:12 1 0"><a href="#ns" data-ep="ns" style="--b:var(--ns)"><b>Nationalsozialismus</b><span>1933–1945</span></a></li>
<li style="flex:46 1 0"><a href="#ostwest" data-ep="ostwest" style="--b:var(--ow)"><b>Ost-West-Konflikt</b><span>1945–1991</span></a></li>
</ol>
<div class="ordnung" role="group" aria-label="Module ordnen" hidden><button type="button" data-ordnung="zeit" aria-pressed="true">nach Zeit</button><button type="button" data-ordnung="prinzip" aria-pressed="false">nach Prinzip</button></div>
</div></nav>
<div id="zeit">{zeit_html}</div>
<section class="prinzipien huelle" id="prinzipien" aria-labelledby="ph">
<h2 id="ph">Dieselben Module – nach Prinzip geordnet</h2>
<p>Die kognitive Landkarte nennt Prinzipien, nach denen Geschichte entsteht. Hier siehst du, in welchen Modulen du welches Prinzip übst – quer durch die Epochen.</p>
<div class="pgitter">{prinzip_html}</div>
<p class="legende">Kante links:<i style="background:var(--ns)"></i>Nationalsozialismus<i style="background:var(--ow)"></i>Ost-West-Konflikt</p>
</section>
</main>
<footer class="huelle">
<p><button type="button" data-halt aria-pressed="false">Bildwechsel anhalten</button><span data-haltsatz>Die Hintergrundbilder wechseln alle acht Sekunden.</span></p>
<p>Die Nummer auf der Karte zeigt die Reihenfolge im Unterricht, die Linie die Zeit. Bildnachweise: <a href="M21_Bildliste.html">M21</a> · <a href="M22_Bildliste.html">M22</a> · <a href="M23_Bildliste.html">M23</a> · <a href="M25_Bildliste.html">M25</a> · <a href="M27_Bildliste.html">M27</a> · <a href="ost-west/Bildliste.html">Ost-West (Heft, Nachweise offen)</a></p>
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
