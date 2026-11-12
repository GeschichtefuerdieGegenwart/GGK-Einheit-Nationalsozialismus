#!/usr/bin/env python3
"""Baut die Startseite index.html: drei Epochen als Kapitel (Weimarer Republik, Nationalsozialismus, Ost-West-Konflikt).
Alle Links stehen als HTML im Dokument; JavaScript wechselt nur die Bilder. Aufruf: python3 tools/bau_startseite.py"""
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
NS = [('Herrschaft und Ideologie', [('M18', 'Die fünf Säulen der NS-Ideologie', 'Quellen-Labor zur Ideologie', 'ns-ideologie.html')]),
 ('Außenpolitik und Krieg', [('M19', 'Appeasement-Politik – der Weg zum Frieden oder in den Zweiten Weltkrieg?', 'NS-Außenpolitik 1933–1939', 'appeasement.html'), ('M20', 'Großbritannien im Zweiten Weltkrieg – drei Dilemmata', 'Mai 1940 · Juli 1941 · Februar 1944', 'm20-dilemmata.html'), ('M27', 'Die Vergessenen! Eine Globalgeschichte des Zweiten Weltkriegs', 'Dein Bild vom Krieg auf der Weltkarte', 'm27-die-vergessenen.html')]),
 ('Verbrechen und Verantwortung', [('M21', 'Es geht um Menschen – Shoa oder Holocaust?', 'Der letzte Brief, vier Lebenswege', 'm21-es-geht-um-menschen.html'), ('M22', '„Große Verbrechen brauchen keine Monster!“ – Wie war das möglich?', 'Täterforschung · der Fall Józefów 1942', 'm22-wie-war-das-moeglich.html'), ('M23', 'Die Gesellschaft, in der ich leb(t)e? – Ländervergleich', 'Dänemark 1943, Niederlande, Bulgarien, Ungarn', 'm23-die-gesellschaft.html')]),
 ('Nach 1945', [('M25', 'Leben in Ruinen und der Umgang mit Schuld', 'Kriegsende 1945', 'm25-leben-in-ruinen.html'), ('M26', 'Ende gut, alles gut? Kontinuitäten des Nationalsozialismus', 'Personal und Denken nach 1945', 'm26-kontinuitaeten.html')])]
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
def buehne(kennung, bilder, name):
    imgs = ''.join(f'<img src="{e(b[0])}" alt="{e(b[2]) if i == 0 else ""}" data-alt="{e(b[2])}" data-text="{e(b[1])}"{" class=\"an\"" if i == 0 else ""} onerror="this.remove()">' for i, b in enumerate(bilder))
    return imgs, f'<div class="blaettern" data-buehne="{kennung}"><button type="button" data-schritt="-1" aria-label="Vorheriges Bild: {name}">‹</button><button type="button" data-schritt="1" aria-label="Nächstes Bild: {name}">›</button><p aria-live="polite"><span data-zaehl>Bild 1 von {len(bilder)}</span>: <span data-bildtext>{e(bilder[0][1])}</span></p></div>'
ns_img, ns_nav = buehne('ns', NS_BILDER, 'Nationalsozialismus'); ow_img, ow_nav = buehne('ow', OW_BILDER, 'Ost-West-Konflikt')
ns_html = ''.join(f'<div><h3>{e(g)}</h3><div class="liste">' + ''.join(f'<a class="modul" href="{d}"><span class="nr">{nr}</span><b>{e(t)}</b><span class="th">{e(th)}</span></a>' for nr, t, th, d in ms) + '</div></div>' for g, ms in NS)
wz_html = ''.join(f'<a href="ost-west/index.html#{a}"><b>{e(n)}</b><span>{e(w)}</span></a>' for n, w, a in WZ)
st_html = ''.join(f'<li><a class="stunde" href="ost-west/{d}"><span class="sbild"><img src="ost-west/media/{b}.jpg" alt="" loading="lazy" onerror="this.remove()"><span class="snr">{nr}</span></span><span class="stext"><span class="zeit">{e(z)}</span><b>{e(t)}</b><span class="teile">' + ''.join(f'<span>{e(x)}</span>' for x in teile) + '</span></span></a></li>' for nr, z, t, teile, d, b in ST)
CSS = '''@font-face{font-family:"Fraunces";src:url(assets/fonts/Fraunces72pt-SemiBold.woff) format("woff");font-weight:600;font-display:swap}
@font-face{font-family:"Atkinson Hyperlegible";src:url(assets/fonts/AtkinsonHyperlegible-Regular.woff2) format("woff2");font-weight:400;font-display:swap}
@font-face{font-family:"Atkinson Hyperlegible";src:url(assets/fonts/AtkinsonHyperlegible-Bold.woff2) format("woff2");font-weight:700;font-display:swap}
:root{color-scheme:dark;--grund:#15171A;--text:#F4F1EA;--leise:#C9C4BA;--weimar:#E0B74A;--ns:#B9C0C8;--ow:#7FA6FF;--display:"Fraunces",Georgia,serif}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:var(--grund);color:var(--text);font:400 1.0625rem/1.5 "Atkinson Hyperlegible",system-ui,sans-serif;overflow-x:clip}
a{color:var(--text)}a:focus-visible,button:focus-visible{outline:3px solid #fff;outline-offset:3px}
button{font:inherit;color:inherit;cursor:pointer}
.huelle{max-width:75rem;margin:0 auto;padding-inline:1.5rem}
.sprung{position:absolute;left:-999rem}.sprung:focus{left:1rem;top:1rem;background:#fff;color:#000;padding:.5rem 1rem;z-index:9}
header.kopf{display:flex;flex-wrap:wrap;gap:.75rem;justify-content:space-between;align-items:center;padding-block:1.25rem}
.marke{font-weight:700;font-size:1.25rem;text-decoration:none}
.epochen{display:flex;flex-wrap:wrap;gap:.5rem}
.epochen a{min-height:44px;display:inline-flex;align-items:center;padding:0 .9rem;border:2px solid var(--f);border-radius:999px;text-decoration:none}
.hero{padding-block:2.2rem 2.8rem}
h1{margin:0;font:600 clamp(2.75rem,8vw,6.75rem)/.98 var(--display);text-wrap:balance}
.hero p{margin:1.4rem 0 0;max-width:60ch;font-size:1.25rem;color:#D9D4CA}
section.kapitel{border-top:6px solid var(--f)}
section.kapitel+section.kapitel{margin-top:3.5rem}
.buehne{position:relative;min-height:30rem;display:flex;align-items:flex-end;overflow:hidden;background:var(--tief)}
.buehne>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1);opacity:0;transition:opacity 600ms cubic-bezier(.23,1,.32,1)}
.buehne>img.an{opacity:1}
.buehne::after{content:"";position:absolute;inset:0;background:var(--tief);opacity:.72}
.buehne .huelle{position:relative;z-index:1;width:100%;padding-block:2.5rem 1.5rem}
.ziffer{margin:0;font:600 6rem/.9 var(--display);color:var(--f)}
h2{margin:.5rem 0 .4rem;font:600 clamp(2.1rem,5vw,3.75rem)/1.02 var(--display);hyphens:manual}
.jahre{margin:0 0 .6rem;font-size:1.19rem;font-weight:700;color:var(--f)}
.frage{margin:0;max-width:56ch;font-size:1.19rem}
.blaettern{margin-top:1.1rem;display:flex;flex-wrap:wrap;gap:.6rem;align-items:center}
.blaettern button{width:44px;height:44px;border:2px solid var(--f);border-radius:999px;background:transparent;font-size:1.4rem;line-height:1}
.blaettern p{margin:0;font-size:.94rem;color:#E2DED5;flex:1 1 18rem}
.leer{border:2px dashed var(--f);border-radius:.9rem;padding:1.5rem}
.weimar .huelle{padding-block:2.5rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(18rem,1fr));gap:2rem;align-items:end}
.gruppen{padding-top:1.75rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1.5rem;align-items:start}
h3{margin:0 0 .6rem;font-size:1rem;font-weight:700;color:var(--f)}
.liste{display:flex;flex-direction:column;gap:.5rem}
.modul{display:block;min-height:76px;padding:.75rem .9rem;background:#22262B;border:1px solid #4A5059;border-radius:.75rem;text-decoration:none}
.modul .nr{font-size:.94rem;color:var(--ns);font-weight:700}
.modul b{display:block;font:600 1.19rem/1.22 var(--display)}
.modul .th{font-size:.94rem;color:var(--leise)}
.werkzeuge{display:flex;flex-wrap:wrap;gap:.6rem}
.werkzeuge a{flex:1 1 11rem;min-height:80px;padding:.75rem .9rem;border:2px solid var(--ow);border-radius:.75rem;text-decoration:none}
.werkzeuge b{display:block;font-size:1.125rem}.werkzeuge span{font-size:.94rem;color:var(--leise)}
.stunden{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(20rem,100%),1fr));gap:1rem}
.stunde{display:flex;flex-direction:column;height:100%;background:#1C2333;border:1px solid #3B4A6B;border-radius:.9rem;overflow:hidden;text-decoration:none}
.sbild{position:relative;display:block;height:150px;background:#10182E}
.sbild img{width:100%;height:150px;object-fit:cover;filter:grayscale(1);display:block}
.snr{position:absolute;left:.75rem;top:.75rem;width:44px;height:44px;border-radius:999px;background:var(--ow);color:#10182E;font:600 1.5rem/1 var(--display);display:grid;place-items:center}
.stext{padding:.9rem 1rem 1rem;display:flex;flex-direction:column;gap:.5rem}
.stext .zeit{font-size:.94rem;color:#BFD2FF;font-weight:700}
.stext b{font:600 1.35rem/1.18 var(--display)}
.teile{display:flex;flex-wrap:wrap;gap:.4rem}
.teile span{font-size:.875rem;padding:.15rem .55rem;border:1px solid #6F86B8;border-radius:.4rem;color:#E4EBFB}
.klein{font-size:.94rem;color:var(--leise)}
footer{margin-top:4rem;padding-top:1.1rem;padding-bottom:3rem;border-top:1px solid #4A5059;font-size:.94rem;color:var(--leise)}
footer p{margin:0 0 .4rem}
footer a,.klein a{display:inline-block;padding:.35rem 0}
.halt{display:flex;flex-wrap:wrap;gap:.75rem;align-items:center;margin-bottom:.7rem}
.halt button{min-height:44px;padding:0 1rem;border:2px solid var(--leise);border-radius:.6rem;background:transparent}
@media (hover:hover) and (pointer:fine){.modul:hover,.stunde:hover{border-color:#fff}.werkzeuge a:hover,.epochen a:hover,.blaettern button:hover,.halt button:hover{background:rgba(255,255,255,.1)}}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}.buehne>img{transition:none}}
@media print{body{background:#fff;color:#000}.buehne>img,.sbild,.blaettern,.halt{display:none}.buehne::after{display:none}.buehne{min-height:0}a{color:#000}.modul,.stunde{background:#fff;border-color:#999}.modul .th,.klein,.teile span,.stext .zeit,.modul .nr,h3,.jahre,.ziffer{color:#000}}
'''
JS = '''(function(){
  var ruhig = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches, halt = false, stand = {};
  function zeig(k, i){
    var b = document.querySelector('.buehne[data-buehne="' + k + '"]'), imgs = b.querySelectorAll(":scope > img"), n = imgs.length; if (!n) return;
    i = ((i % n) + n) % n; stand[k] = i;
    imgs.forEach(function(im, j){ im.classList.toggle("an", j === i); im.alt = j === i ? im.dataset.alt : ""; });
    var nav = document.querySelector('.blaettern[data-buehne="' + k + '"]');
    nav.querySelector("[data-zaehl]").textContent = "Bild " + (i + 1) + " von " + n; nav.querySelector("[data-bildtext]").textContent = imgs[i].dataset.text;
  }
  document.addEventListener("click", function(e){
    var s = e.target.closest("[data-schritt]"); if (s) { var k = s.parentNode.dataset.buehne; zeig(k, (stand[k] || 0) + (+s.dataset.schritt)); return; }
    var h = e.target.closest("[data-halt]"); if (h) { halt = !halt; h.setAttribute("aria-pressed", halt); h.textContent = halt ? "Bildwechsel fortsetzen" : "Bildwechsel anhalten"; }
  });
  var hb = document.querySelector("[data-halt]");
  if (ruhig) { hb.parentNode.querySelector("span").textContent = "Am Gerät ist „weniger Bewegung“ eingestellt: Die Bilder wechseln nur auf Tippen."; hb.hidden = true; return; }
  setInterval(function(){ if (halt || document.hidden) return; ["ns", "ow"].forEach(function(k){ zeig(k, (stand[k] || 0) + 1); }); }, 8000);
})();'''
SEITE = f'''<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="GGK-Labor">
<title>Geschichte für die Gegenwart – GGK-Labor</title>
<meta name="description" content="GGK-Labor: Lernmodule für Geschichte mit Gemeinschaftskunde am Beruflichen Gymnasium – Weimarer Republik, Nationalsozialismus, Ost-West-Konflikt.">
<style>
{CSS}</style>
</head>
<body>
<a class="sprung" href="#inhalt">Zum Inhalt</a>
<header class="kopf huelle">
<a class="marke" href="index.html">GGK-Labor</a>
<nav class="epochen" aria-label="Epochen">
<a href="#weimar" style="--f:var(--weimar)">1 · Weimarer Republik</a>
<a href="#ns" style="--f:var(--ns)">2 · Nationalsozialismus</a>
<a href="#ostwest" style="--f:var(--ow)">3 · Ost-West-Konflikt</a>
</nav>
</header>
<main id="inhalt">
<section class="hero huelle">
<h1>Geschichte für die Gegenwart</h1>
<p>Drei Epochen, 1918 bis 1991 – untersucht mit der <a href="{LK}"><b>kognitiven Landkarte des Geschichtsunterrichts</b></a>. In jedem Modul legst du dich zuerst fest und prüfst dann an Quellen, ob dein Urteil trägt.</p>
</section>

<section class="kapitel weimar" id="weimar" style="--f:var(--weimar);background:#211D12">
<div class="huelle">
<div><p class="ziffer">1</p><h2>Weimarer Republik</h2><p class="jahre">1918 – 1933</p></div>
<div class="leer"><p style="margin:0 0 .4rem;font-weight:700;font-size:1.19rem">Dieses Kapitel entsteht gerade.</p><p style="margin:0;color:#D9D4CA">Die Module zur Weimarer Republik erscheinen hier, sobald sie fertig sind.</p></div>
</div>
</section>

<section class="kapitel" id="ns" style="--f:var(--ns)">
<div class="buehne" data-buehne="ns" style="--tief:#15171A">{ns_img}
<div class="huelle"><p class="ziffer">2</p><h2>National&shy;sozialismus</h2><p class="jahre">1933 – 1945 und die Folgen · neun Module</p>
<p class="frage">Ideologie, Krieg und Menschheitsverbrechen – und die Frage, wer mitgemacht hat und was danach daraus wurde.</p>
{ns_nav}</div></div>
<div class="huelle gruppen">{ns_html}</div>
<p class="huelle klein" style="margin-top:1rem">Bildnachweise: <a href="M21_Bildliste.html">Bildliste M21</a> · <a href="M22_Bildliste.html">M22</a> · <a href="M23_Bildliste.html">M23</a></p>
</section>

<section class="kapitel" id="ostwest" style="--f:var(--ow)">
<div class="buehne" data-buehne="ow" style="--tief:#10182E">{ow_img}
<div class="huelle"><p class="ziffer">3</p><h2>Ost-West-Konflikt</h2><p class="jahre">1945 – 1991 · neun Stunden, fünf Werkzeuge</p>
<p class="frage">Welchen Einfluss hatten Ideologien, Machtinteressen und Handlungsspielräume der Akteure – und wie wird dieser Konflikt heute erinnert?</p>
{ow_nav}</div></div>
<div class="huelle" style="padding-top:1.75rem">
<h3>Werkzeuge für die ganze Einheit</h3>
<div class="werkzeuge">{wz_html}</div>
<h3 style="margin-top:2rem">Neun Stunden – und was in jeder steckt</h3>
<ol class="stunden">{st_html}</ol>
<p class="klein" style="margin:.9rem 0 0">Am Ende jeder Stunde: Landkarte · Verorten und vernetzen · Merkseite. Bilder aus dem Unterrichtsheft, Nachweise offen (<a href="ost-west/Bildliste.html">Bildliste</a>).</p>
</div>
</section>
</main>
<footer class="huelle">
<div class="halt"><button type="button" data-halt aria-pressed="false">Bildwechsel anhalten</button><span>Die Bilder der Epochen wechseln alle acht Sekunden.</span></div>
<p>Datenschutz: Alle Ergebnisse bleiben auf deinem Gerät. Diese Seiten senden nichts ins Internet und brauchen keine Anmeldung.</p>
<p><a href="{LK}">Kognitive Landkarte des Geschichtsunterrichts</a> · <a href="auswertung.html">Kursauswertung für die Lehrkraft</a> · <a href="lehrkraft.html">Hinweise für Lehrkräfte</a></p>
<p>© 2026 Mario Walter · Inhalte CC BY-NC-SA 4.0 · Code MIT · mit KI-Unterstützung entwickelt</p>
</footer>
<script>
{JS}
</script>
</body>
</html>
'''
(R/'index.html').write_text(SEITE, 'utf-8'); print('index.html', len(SEITE))
