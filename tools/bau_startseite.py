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
def karte(ep, nr, zeit, titel, teile, ziel, bild, key, faden=''):
    b = f'<img src="{bild}" alt="" onerror="this.remove()">' if bild else ''
    return (f'<li class="station" data-ep="{ep}"><span class="jahr">{e(zeit)}</span><span class="linie" aria-hidden="true"></span><a class="modulkarte" href="{ziel}"><span class="sbild{"" if bild else " ohne"}">{b}<span class="snr{" lang" if len(str(nr)) > 1 else ""}">{nr}</span></span>'
            f'<span class="stext"><b>{e(titel)}</b><span class="teile">' + ''.join(f'<span>{e(x)}</span>' for x in teile) + f'</span><span class="stand" data-key="{key}" data-faden="{faden}" hidden></span></span></a></li>')
def kapitel(ep, ziffer, name, jahre, satz, grenze):
    return (f'<li class="station kap" id="{ep}" data-ep="{ep}"><span class="jahr gross">{grenze}</span><span class="linie" aria-hidden="true"></span><div class="kapkarte"><p class="ziffer">{ziffer}</p><h2>{name}</h2><p class="jahre">{jahre}</p><p class="satz">{satz}</p></div></li>')
ns_html = ''.join(karte('ns', nr, z, t, teile, d, b, KEYS[nr]) for nr, z, t, teile, d, b in NS)
st_html = ''.join(karte('ostwest', nr, z, t, teile, 'ost-west/' + d, f'ost-west/media/{b}.jpg', f'ggk-owk-s{nr}', f's{nr}') for nr, z, t, teile, d, b in ST)
wz_html = '<li class="station" data-ep="ostwest"><span class="jahr">für alle neun Stunden</span><span class="linie" aria-hidden="true"></span><div class="wzkarte"><h3>Fünf Werkzeuge</h3>' + ''.join(f'<a href="ost-west/index.html#{a}"><b>{e(n)}</b><span>{e(w)}</span></a>' for n, w, a in WZ) + '</div></li>'
spur = (kapitel('weimar', 1, 'Weimarer Republik', '1918 – 1933', 'Dieses Kapitel entsteht gerade. Die Module erscheinen hier, sobald sie fertig sind.', '1918')
        + kapitel('ns', 2, 'National&shy;sozialismus', '1933 – 1945 und die Folgen · neun Module', 'Ideologie, Krieg und Menschheitsverbrechen – und die Frage, wer mitgemacht hat und was danach daraus wurde.', '1933') + ns_html
        + kapitel('ostwest', 3, 'Ost-West-Konflikt', '1945 – 1991 · neun Stunden, fünf Werkzeuge', 'Welchen Einfluss hatten Ideologien, Machtinteressen und Handlungsspielräume der Akteure – und wie wird dieser Konflikt heute erinnert?', '1945') + wz_html + st_html
        + '<li class="station ende" data-ep="ostwest"><span class="jahr gross">1991</span><span class="linie" aria-hidden="true"></span></li>')
bilder = ''.join(f'<img src="{e(b[0])}" alt="" data-ep="{ep}" data-text="{e(b[1])}"{" class=\"an\"" if i == 0 else ""} onerror="this.remove()">' for ep, L in (('ns', NS_BILDER), ('ostwest', OW_BILDER)) for i, b in enumerate(L))
CSS = """@font-face{font-family:"Fraunces";src:url(assets/fonts/Fraunces72pt-SemiBold.woff) format("woff");font-weight:600;font-display:swap}
@font-face{font-family:"Atkinson Hyperlegible";src:url(assets/fonts/AtkinsonHyperlegible-Regular.woff2) format("woff2");font-weight:400;font-display:swap}
@font-face{font-family:"Atkinson Hyperlegible";src:url(assets/fonts/AtkinsonHyperlegible-Bold.woff2) format("woff2");font-weight:700;font-display:swap}
:root{color-scheme:dark;--grund:#15171A;--text:#F4F1EA;--leise:#C9C4BA;--weimar:#E0B74A;--ns:#B9C0C8;--ow:#7FA6FF;--display:"Fraunces",Georgia,serif}
*{box-sizing:border-box}
body{margin:0;background:var(--grund);color:var(--text);font:400 1.0625rem/1.5 "Atkinson Hyperlegible",system-ui,sans-serif;overflow-x:clip}
a{color:var(--text)}a:focus-visible,button:focus-visible{outline:3px solid #fff;outline-offset:3px}
button{font:inherit;color:inherit;cursor:pointer}
.huelle{max-width:80rem;margin:0 auto;padding-inline:1.5rem}
.sprung{position:absolute;left:-999rem}.sprung:focus{left:1rem;top:1rem;background:#fff;color:#000;padding:.5rem 1rem;z-index:9}
header.kopf{display:flex;flex-wrap:wrap;gap:.5rem 1.5rem;justify-content:space-between;align-items:center;padding-block:.9rem .4rem}
.marke{font-weight:700;font-size:1.15rem;text-decoration:none}
header.kopf nav{display:flex;flex-wrap:wrap;gap:.3rem 1.25rem;font-size:.95rem}
header.kopf nav a{display:inline-block;padding:.5rem 0}
.hero{padding-block:.2rem .8rem}
h1{margin:0;font:600 clamp(2.1rem,4.6vw,3.6rem)/1.02 var(--display);text-wrap:balance}
.hero p{margin:.5rem 0 0;max-width:78ch;color:#D9D4CA}
/* Bühne: Hintergrundbild der Epoche, in der man gerade ist */
.zeit{position:relative;overflow:hidden;--f:var(--weimar);--tief:#211D12;--karte:#2A2516;--rand:#6B5A24;--rand2:#A08A3C;background:var(--tief);border-top:6px solid var(--f);padding-block:.75rem 1rem}
.zeit[data-ep=ns]{--f:var(--ns);--tief:#15171A;--karte:#22262B;--rand:#4A5059;--rand2:#7C848E}
.zeit[data-ep=ostwest]{--f:var(--ow);--tief:#10182E;--karte:#1C2333;--rand:#3B4A6B;--rand2:#6F86B8}
.zeit>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1);opacity:0;transition:opacity 600ms cubic-bezier(.23,1,.32,1)}
.zeit[data-ep=ns]>img.an[data-ep=ns],.zeit[data-ep=ostwest]>img.an[data-ep=ostwest]{opacity:1}
.zeit::after{content:"";position:absolute;inset:0;background:var(--tief);opacity:.8}
.zeit>.huelle,.zeit>.spur{position:relative;z-index:1}
/* Übersichtsband: Breite = Dauer */
.band ol{list-style:none;margin:0;padding:0;display:flex;gap:4px}
.band li{min-width:4.6rem}
.band a{display:flex;flex-direction:column;justify-content:center;min-height:48px;padding:.2rem .6rem;border:2px solid var(--b);border-radius:.5rem;text-decoration:none;line-height:1.15;overflow:hidden;background:rgba(21,23,26,.6)}
.band a b{font-size:.95rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.band a span{font-size:.8rem;color:var(--leise);white-space:nowrap}
.band a[aria-current]{background:var(--b);color:#15171A}.band a[aria-current] span{color:#15171A}
.leiste{display:flex;flex-wrap:wrap;gap:.5rem .75rem;align-items:center;margin-top:.5rem}
.leiste button{min-height:44px;min-width:44px;padding:0 .9rem;border:2px solid var(--f);border-radius:999px;background:rgba(21,23,26,.6)}
.leiste .pfeil{font-size:1.4rem;line-height:1;padding:0}
.leiste p{margin:0;font-size:.9rem;color:#E2DED5;flex:1 1 14rem}
/* Spur: waagerechter Zeitstrahl */
.spur{list-style:none;margin:.6rem 0 0;padding:0 max(1.5rem,calc((100vw - 80rem)/2 + 1.5rem)) .6rem;display:flex;align-items:stretch;overflow-x:auto;scroll-snap-type:x proximity;scroll-padding-inline:1.5rem;scrollbar-color:var(--f) transparent;overscroll-behavior-x:contain}
.station{flex:0 0 17.5rem;display:grid;grid-template-rows:auto auto 1fr;scroll-snap-align:start;--f:var(--ns);--karte:#22262B;--rand:#4A5059;--rand2:#7C848E}
.station[data-ep=weimar]{--f:var(--weimar)}.station[data-ep=ostwest]{--f:var(--ow);--karte:#1C2333;--rand:#3B4A6B;--rand2:#6F86B8}
.station.kap{flex-basis:19rem}.station.ende{flex-basis:5rem}
.jahr{font:600 1.05rem/1.2 var(--display);color:var(--f);min-height:1.35rem;white-space:nowrap}
.jahr.gross{font-size:1.5rem;min-height:1.35rem;line-height:.9}
.linie{display:block;height:4px;background:var(--f);margin:.6rem 0 .9rem;position:relative}
.linie::before{content:"";position:absolute;left:0;top:-.5rem;width:1.25rem;height:1.25rem;border-radius:999px;background:var(--grund);border:4px solid var(--f)}
.kap .linie::before{top:-.75rem;width:1.75rem;height:1.75rem;background:var(--f)}
.ende .linie{background:transparent}
.modulkarte,.kapkarte,.wzkarte{margin-right:1rem}
.modulkarte{display:flex;flex-direction:column;background:var(--karte);border:1px solid var(--rand);border-radius:.9rem;overflow:hidden;text-decoration:none}
.sbild{position:relative;display:block;flex:0 0 6.25rem;background:rgba(0,0,0,.28)}
.sbild img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1)}
.snr{position:absolute;left:.75rem;top:.75rem;min-width:44px;height:44px;padding:0 .5rem;border-radius:999px;background:var(--f);color:#15171A;font:600 1.5rem/1 var(--display);display:grid;place-items:center}
.snr.lang{font-size:1.15rem}
.sbild.ohne .snr{left:50%;top:50%;transform:translate(-50%,-50%);height:3.5rem;min-width:5.5rem;font-size:1.9rem;background:transparent;color:var(--f);border:3px solid var(--f)}
.stext{padding:.75rem .9rem .9rem;display:flex;flex-direction:column;gap:.55rem;flex:1}
.stext b{font:600 1.2rem/1.18 var(--display)}
.teile{display:flex;flex-wrap:wrap;gap:.35rem}
.teile span{font-size:.84rem;padding:.1rem .5rem;border:1px solid var(--rand2);border-radius:.4rem;color:#E9EDF5}
.stand{margin-top:auto;font-size:.88rem;font-weight:700;color:var(--f)}
.kapkarte{padding-right:.5rem}
.ziffer{margin:0;font:600 3.6rem/.9 var(--display);color:var(--f)}
h2{margin:.3rem 0 .3rem;font:600 2.1rem/1.04 var(--display);hyphens:manual}
.jahre{margin:0 0 .5rem;font-weight:700;color:var(--f)}
.satz{margin:0;font-size:1rem}
.wzkarte{display:flex;flex-direction:column;gap:.3rem}
h3{margin:0 0 .2rem;font:600 1.2rem/1.2 var(--display)}
.wzkarte a{display:block;min-height:44px;padding:.2rem .7rem;border:2px solid var(--f);border-radius:.6rem;text-decoration:none;background:rgba(16,24,46,.6);line-height:1.2}
.wzkarte b{display:block}.wzkarte span{font-size:.86rem;color:var(--leise)}
footer{padding-top:1rem;padding-bottom:2.5rem;font-size:.94rem;color:var(--leise)}
footer p{margin:0 0 .4rem}
footer a{display:inline-block;padding:.35rem 0}
@media (max-width:640px){.station{flex-basis:80vw}.station.kap{flex-basis:84vw}.band li{flex:1 1 0!important;min-width:0}.band a{padding:.2rem .4rem}.band a b{white-space:normal;font-size:.8rem;hyphens:auto}}
@media (hover:hover) and (pointer:fine){.modulkarte:hover{border-color:#fff}.wzkarte a:hover,.leiste button:hover{background:rgba(255,255,255,.14)}}
@media (prefers-reduced-motion:reduce){.zeit>img{transition:none}}
@media print{body{background:#fff;color:#000}.zeit{background:#fff;border:0}.zeit>img,.zeit::after,.leiste,.sbild img{display:none}.spur{flex-wrap:wrap;overflow:visible;gap:.5rem 0}.station{flex-basis:33%}.modulkarte{background:#fff;border-color:#999}a,.jahr,.jahre,.ziffer,.teile span,.snr,.band a span{color:#000!important}.band a{background:#fff}}
"""
JS = """(function(){
  var ruhig = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches, halt = false, idx = { ns:0, ostwest:0 };
  var zeit = document.querySelector(".zeit"), spur = document.querySelector(".spur"), text = document.querySelector("[data-bildtext]"), bildKnopf = document.querySelector("[data-bild]"), haltKnopf = document.querySelector("[data-halt]");
  var weich = ruhig ? "auto" : "smooth";
  function bilder(ep){ return zeit.querySelectorAll(':scope > img[data-ep="' + ep + '"]'); }
  function zeigBild(ep, i){
    var b = bilder(ep), n = b.length; if (!n) { text.textContent = ""; return; }
    i = ((i % n) + n) % n; idx[ep] = i; b.forEach(function(im, j){ im.classList.toggle("an", j === i); });
    text.textContent = "Bild " + (i + 1) + " von " + n + ": " + b[i].dataset.text;
  }
  function epoche(ep){
    if (zeit.dataset.ep === ep) return; zeit.dataset.ep = ep;
    document.querySelectorAll(".band a").forEach(function(a){ if (a.dataset.ep === ep) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
    zeigBild(ep, idx[ep] || 0); bildKnopf.hidden = haltKnopf.hidden = !bilder(ep).length; if (ruhig) haltKnopf.hidden = true;
  }
  function wo(){
    var l = spur.getBoundingClientRect().left + 80, ep = "weimar";
    spur.querySelectorAll(".station").forEach(function(s){ if (s.getBoundingClientRect().left <= l) ep = s.dataset.ep; });
    epoche(ep); try { sessionStorage.setItem("ggk-start:x", String(Math.round(spur.scrollLeft))); } catch (e) {}
  }
  var wartet = false;
  spur.addEventListener("scroll", function(){ if (wartet) return; wartet = true; requestAnimationFrame(function(){ wartet = false; wo(); }); }, { passive:true });
  document.addEventListener("click", function(e){
    var a = e.target.closest(".band a"); if (a) { e.preventDefault(); var z = document.getElementById(a.dataset.ep); spur.scrollTo({ left: z.offsetLeft - spur.querySelector(".station").offsetLeft, behavior: weich }); return; }
    var s = e.target.closest("[data-schritt]"); if (s) { spur.scrollBy({ left: (+s.dataset.schritt) * Math.max(280, spur.clientWidth * .75), behavior: weich }); return; }
    if (e.target.closest("[data-bild]")) { var ep = zeit.dataset.ep; zeigBild(ep, (idx[ep] || 0) + 1); return; }
    var h = e.target.closest("[data-halt]"); if (h) { halt = !halt; h.setAttribute("aria-pressed", halt); h.textContent = halt ? "Bildwechsel fortsetzen" : "Bildwechsel anhalten"; }
  });
  /* Stand: Was hast du auf diesem Gerät schon geöffnet? */
  try {
    var keys = Object.keys(localStorage), owk = JSON.parse(localStorage.getItem("ggk-owk:v1") || "{}"), faden = owk.faden || {};
    document.querySelectorAll(".stand").forEach(function(el){
      var k = el.dataset.key, da = keys.some(function(x){ return x.indexOf(k) === 0; }), f = el.dataset.faden && (faden[el.dataset.faden] || "").trim();
      if (f) { el.textContent = "✓ roter Faden geschrieben"; el.hidden = false; } else if (da) { el.textContent = "schon geöffnet"; el.hidden = false; }
    });
  } catch (e) {}
  try { var x = +sessionStorage.getItem("ggk-start:x"); if (x) spur.scrollLeft = x; } catch (e) {}
  zeit.dataset.ep = ""; wo();
  if (!ruhig) setInterval(function(){ if (halt || document.hidden) return; var ep = zeit.dataset.ep; zeigBild(ep, (idx[ep] || 0) + 1); }, 8000);
})();"""
SEITE = f"""<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="GGK-Labor">
<title>Geschichte für die Gegenwart – GGK-Labor</title>
<meta name="description" content="GGK-Labor: Lernmodule für Geschichte mit Gemeinschaftskunde am Beruflichen Gymnasium – Weimarer Republik, Nationalsozialismus, Ost-West-Konflikt auf einem Zeitstrahl.">
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
<p>Ein Zeitstrahl von 1918 bis 1991 – untersucht mit der <a href="{LK}"><b>kognitiven Landkarte des Geschichtsunterrichts</b></a>. In jedem Modul legst du dich zuerst fest und prüfst dann an Quellen, ob dein Urteil trägt.</p>
</section>
<section class="zeit" data-ep="weimar" aria-label="Zeitstrahl">{bilder}
<div class="huelle">
<nav class="band" aria-label="Epochen auf dem Zeitstrahl"><ol>
<li style="flex:15 1 0"><a href="#weimar" data-ep="weimar" style="--b:var(--weimar)"><b>Weimarer Republik</b><span>1918–1933</span></a></li>
<li style="flex:12 1 0"><a href="#ns" data-ep="ns" style="--b:var(--ns)"><b>Nationalsozialismus</b><span>1933–1945</span></a></li>
<li style="flex:46 1 0"><a href="#ostwest" data-ep="ostwest" style="--b:var(--ow)"><b>Ost-West-Konflikt</b><span>1945–1991</span></a></li>
</ol></nav>
<div class="leiste"><button type="button" class="pfeil" data-schritt="-1" aria-label="Auf dem Zeitstrahl zurück">‹</button><button type="button" class="pfeil" data-schritt="1" aria-label="Auf dem Zeitstrahl weiter">›</button>
<p aria-live="polite" data-bildtext></p><button type="button" data-bild hidden>Nächstes Bild</button><button type="button" data-halt aria-pressed="false" hidden>Bildwechsel anhalten</button></div>
</div>
<ol class="spur" tabindex="0" aria-label="Zeitstrahl: Epochen und Module von 1918 bis 1991, waagerecht zu wischen">{spur}</ol>
</section>
</main>
<footer class="huelle">
<p>Die Reihenfolge innerhalb einer Epoche folgt dem Unterricht. Bildnachweise: <a href="M21_Bildliste.html">M21</a> · <a href="M22_Bildliste.html">M22</a> · <a href="M23_Bildliste.html">M23</a> · <a href="M25_Bildliste.html">M25</a> · <a href="M27_Bildliste.html">M27</a> · <a href="ost-west/Bildliste.html">Ost-West (Heft, Nachweise offen)</a></p>
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
