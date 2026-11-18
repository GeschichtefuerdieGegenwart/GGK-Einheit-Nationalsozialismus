#!/usr/bin/env python3
"""Einmaliger Umbau: M22 von Fassung 4.1 auf Fassung 5.1 (Arbeitsblatt Geschichte in den Maßen des Moduls Motivation
im Psycho-Labor, Farbwelt Archiv, wenige Tipps).
Arbeitet auf der Fassung 4.1 aus dem Commit vor dem Umbau (git show) und schreibt die Seite neu.
Danach: python3 tools/ab_einsetzen.py"""
import pathlib, re, subprocess, sys
REPO = pathlib.Path('/home/claude/ggk-einheit-nationalsozialismus')
DATEI = 'm22-wie-war-das-moeglich.html'
ALT = subprocess.run(['git', '-C', str(REPO), 'show', 'de200e5:' + DATEI], capture_output=True, text=True, check=True).stdout
s = ALT

def einmal(alt, neu, n=1):
    global s
    assert s.count(alt) == n, f'{s.count(alt)}× statt {n}×: {alt[:70]!r}'
    s = s.replace(alt, neu)
def fn(name, neu):
    """Ersetzt eine Funktion der obersten Ebene (von »function name(« bis zur schließenden Klammer in Spalte 0)."""
    global s
    a = s.index('\nfunction ' + name + '(') + 1; e = s.index('\n}\n', a) + 3
    s = s[:a] + neu.strip('\n') + '\n' + s[e:]

# ---------------------------------------------------------------- Kopf der Datei
einmal('<html lang="de">', '<html lang="de" data-einheit="ns">')
einmal('<meta name="description" content="GGK M22: „Große Verbrechen brauchen keine Monster!“ – Wer wurde zum Täter? Es geht um Menschen, Faktencheck, der Fall Józefów 1942, sechs Akten der Forschung mit Rückmeldung, Marktplatz, geführte Diskussion, Zusammenfassung.">',
       '<meta name="description" content="GGK M22, Arbeitsblatt 7 von 11 im Hefter Nationalsozialismus: „Große Verbrechen brauchen keine Monster!“ – Wie war das möglich? Faktencheck, der Fall Józefów 1942, sechs Erklärungen der Forschung, Landkarte, Marktplatz, Diskussion, Schreibauftrag, Zusammenfassung.">')

# ---------------------------------------------------------------- Stil
a = s.index('<style>'); e = s.index('</style>')
css = s[a + 7:e]
# 1 · Rahmen der Fassung 4.0 heraus (kommt jetzt aus der gemeinsamen Schicht)
i = css.index('/* ===== Arbeitsblatt-Rahmen (Fassung 4.0'); j = css.index('/* ===== Fassung 4.1 (16.11.2026)')
css = css[:i] + css[j:]
# 2 · Nichts unter 16 px: alle festen Größen unter 1 rem werden 1 rem (Druckangaben in pt bleiben)
css, n_klein = re.subn(r'font-size:\.\d+rem', 'font-size:1rem', css)
def ecke(m):
    return 'border-radius:' + re.sub(r'(\d*\.?\d+)rem', lambda x: '.3rem' if float(x.group(1)) > .3 else x.group(0), m.group(1))
css = re.sub(r'border-radius:([^;}]+)', ecke, css)
# 3 · Übersicht (Auftrag 4): Rad erst ab 1150 px Breite, darunter Liste – nur so bleibt alles bei 16 px
assert css.count('@media (max-width:820px){') == 1 and css.count('@media (min-width:821px){') == 2
css = css.replace('@media (max-width:820px){', '@media (max-width:1149px){').replace('@media (min-width:821px){', '@media (min-width:1150px){')
css = css.replace('/* Bewusst nur hell (Beamer, Druck), wie M18–M20. Farben aus dem GGK-Labor. Bildbänder dunkel auf heller Seite. */',
                  '/* Bewusst nur hell (Beamer, Druck). Seit Fassung 5.0 kommen Farben, Rahmen und Blatt aus der gemeinsamen Schicht »Arbeitsblatt Geschichte« (unten, zwischen den Marken AB-STIL). */')
NEU_CSS = r'''
/* AB-STIL:ANFANG */
/* AB-STIL:ENDE */
/* ===== Fassung 5.1 (18.11.2026): Arbeitsblatt Geschichte · Blatt in den Maßen des Moduls Motivation (Psycho-Labor) · Farbwelt Archiv · nichts unter 16 px ===== */
/* Fünf Ebenen (Modell der Lehrkraft): eigene Kennfarben, immer mit Wort. Rot entfällt; »Weltbild« trägt Pflaume. */
:root{--e-person:#1E4FB5;--e-person-hi:#DCE5F7;--e-situation:var(--ok);--e-weltbild:#6A3B6E;--e-weltbild-hi:#EADFEB;--e-apparat:var(--slate);--e-vorteil:var(--achtung);--fast:150ms;--uebergang:300ms}
.e-person,.ebenen .eb-person{color:var(--e-person);background:var(--e-person-hi)}
.e-weltbild,.ebenen .eb-weltbild{color:var(--e-weltbild);background:var(--e-weltbild-hi)}
.b-person b{background:var(--e-person)}
.b-weltbild b{background:var(--e-weltbild)}
/* Rückmeldung in drei Stufen: Wort und Linie (durchgezogen · gestrichelt · gepunktet), kein Rot */
.optionen button{border-width:2px}
.optionen button.teils,.prinzipien button.teils{border-style:dashed}
.optionen button.kaum,.prinzipien button.kaum{border-style:dotted;border-color:var(--stahl)}
.rm.teils{border-left-style:dashed}
.rm.nicht{background:var(--karton);border-left:4px dotted var(--tinte)}
.streit{border:2px solid var(--tinte);background:var(--hauch)}
.umschalter [role=tab],.stufen{border-radius:.3rem}
.umschalter [role=tab]{border:2px solid var(--tinte)}
.stempel{width:5.6rem;height:5.6rem;border-color:var(--tief);color:var(--tief)}
.band .taeter{background:var(--tinte)}
/* Bildband: Die Bildunterschrift steht unter dem Bild, nicht darauf – so bleibt sie an jeder Bildstelle lesbar und verdeckt nichts */
.band figure{display:grid;grid-template-rows:minmax(0,1fr) auto}
.band figure img{min-height:0}
.band figcaption{position:static;font-size:1rem;background:#2A2824;padding:.5rem .8rem .6rem}
.dash-kopf [data-film]{margin-left:auto}
.tafel.filmtafel{padding:0;overflow:hidden}
.filmtafel .filmrahmen{height:100vh;height:100dvh;min-height:0;margin:0}
.dreh,.jz-karte{scroll-margin:calc(var(--ab-kopf) + 12px) 0 12px}
.merksatz{border-color:var(--tinte)}
.karte{border-color:var(--linie)}
h1{font-size:clamp(1.8rem,1.4rem + 1.6vw,2.6rem)}
.zeit{color:var(--tief)}
.urheberzeile{display:none}   /* die Zeile steht bei den Werkzeugen: im Register oder unter dem Blatt */
/* Auftrag 4 · Übersicht: Die Karten tragen Name, Kennung und Frage in 16 px. Das Rad zeigt nur die Namen der Ebenen; ihre Erklärung steht darunter. */
#main.dashboard .dash-fuss{margin-top:.6rem;display:grid;gap:.5rem}
.fortschritt{font-size:1rem}
.ring-text,#main.dashboard .ring-text{font-size:1rem;text-transform:none;letter-spacing:0;color:var(--leise)}
.akte.zeile{min-height:44px}
.akte{font-size:1rem;border-width:2px;border-color:var(--stahl);border-radius:.3rem}
.akte .j,.akte .fr,.akte .fs span,.akte .fs .emp{font-size:1em}
.akte .pf{grid-row:1/3}
.akte b{align-self:end}
.akte .fs .emp{border-style:dashed;border-color:var(--achtung);color:var(--achtung);font-weight:700}
.akte.empfohlen{border-style:dashed;border-color:var(--achtung)}
.ebfeld{font-size:1.06rem}
.ebfeld .marke{font-size:1rem}
/* Marken am Rad: drei Stufen, jede mit vollem Kontrast – gefüllt = entscheidend, grau = sehr wichtig, Rahmen = wichtig (bisher über Durchsichtigkeit, zu blass) */
.ebfeld .marke.m3{opacity:1;background:var(--leise)}
.ebfeld .marke.m2{opacity:1;background:var(--blatt);color:var(--tinte);box-shadow:inset 0 0 0 2px var(--tinte)}
@media (max-width:1149px){   /* in der Liste ist das gewählte Feld dunkel: Marken dort umgekehrt */
  .ebfeld[aria-pressed=true] .marke.m3{background:var(--linie);color:var(--tinte)}
  .ebfeld[aria-pressed=true] .marke.m2{background:transparent;color:var(--grund);box-shadow:inset 0 0 0 2px var(--grund)}
}
.ebfeld small{font-size:1rem}
.frage-kern span{font-size:1rem}
.rad-satz{font-size:1rem}
.ansicht{font-size:1rem}
.zeitachse .jahr,.zeitachse .dekade,.zeitachse-fuss{font-size:1rem}
/* Zeitachse: Die Karten tragen nur Name und Kennung – das Jahr steht an der Achse */
.zeitachse .akte{display:block;width:auto;max-width:10.5rem;padding:.35rem .65rem;font-size:1rem}
.zeitachse .akte .pf,.zeitachse .akte .fs,.zeitachse .akte .jz{display:none}
.zeitachse .jahr.tief{top:61%}
.zeitachse .jahr.tief::before{top:-2.45em;height:2.2em}
.ebenen-legende{list-style:none;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:.5rem;margin:0;padding:0}
.ebenen-legende li{padding:.4rem .6rem;border-left:5px solid var(--eb);background:var(--grund);font-size:1rem;line-height:1.35}
.ebenen-legende b{display:block}
.ebenen-legende [data-ebene=person]{--eb:var(--e-person)}
.ebenen-legende [data-ebene=situation]{--eb:var(--e-situation)}
.ebenen-legende [data-ebene=weltbild]{--eb:var(--e-weltbild)}
.ebenen-legende [data-ebene=apparat]{--eb:var(--e-apparat)}
.ebenen-legende [data-ebene=vorteil]{--eb:var(--e-vorteil)}
.modellhinweis{font-size:1rem;color:var(--leise);margin:0}
@media (min-width:1150px){
  /* Die Bühne behält ihr Raster 16:9 (alle Punkte im Rad bleiben, wo sie sind). Die beiden Kartenspalten reichen oben und unten darüber hinaus:
     zusammen 32:21. So tragen die Karten Name, Kennung, Frage und Stand in 16 px auch auf dem Blatt in der Größe des Vorbilds.
     Die Bühne ist nie höher als das Fenster unter der Kopfzeile, aber nie schmaler als 945 px (darunter gilt ohnehin die Liste). */
  #main.dashboard .buehne{aspect-ratio:32/21;width:100%;width:min(100%,max(945px,calc((100dvh - var(--ab-kopf) - 16px) * 1.5238)));margin-inline:auto;scroll-margin:calc(var(--ab-kopf) + 8px) 0 8px}
  #main.dashboard .buehne .dash{height:auto;width:100%;margin:4.6875% auto}
  #main.dashboard .spalte{width:27.5%;top:-3.9cqi;bottom:-3.9cqi;gap:1cqi}
  #main.dashboard .spalte .akte{font-size:1rem;grid-template-columns:2.75rem minmax(0,1fr);gap:.15rem .7rem;padding:.45rem .75rem;align-content:center}
  #main.dashboard .spalte .akte .pf{grid-row:1;width:2.75rem;height:2.75rem;font-size:1.2rem;border-radius:.3rem}
  #main.dashboard .spalte .akte b{font-size:1.2rem;align-self:center}
  #main.dashboard .spalte .akte .j{grid-column:1/-1;align-self:start}
  #main.dashboard .spalte .akte .fr{font-size:1rem;line-height:1.3;margin-top:.1rem}
  #main.dashboard .spalte .akte .fs{margin-top:.25rem}
  #main.dashboard .spalte .akte .fs span{font-size:1rem;padding:0 .4rem}
  .ebfeld small{display:none}
  .ebfeld{width:13%}
  .frage-kern{font-size:1rem;width:16.5%;height:29.3%;padding:.4rem}
  .frage-kern b{font-size:1.45rem}
  .frage-kern span{margin-top:.3rem;line-height:1.2}
  .rad-satz{left:30%;right:30%;top:auto;bottom:1.2%;min-height:0}
  /* Panel offen: Der Satz unter dem Rad steht in der freien Fläche zwischen den Karten und dem Panel – nie unter dem Panel.
     Er darf bis an den unteren Rand der Bühne reichen (wie die Karten), damit er auch dreizeilig das Rad nicht berührt. */
  #main.dashboard .buehne.offen.rechts .rad-satz{left:29.6%;right:44.2%;bottom:-3cqi}
  #main.dashboard .buehne.offen.links .rad-satz{left:44.2%;right:29.6%;bottom:-3cqi}
  /* Vergleich: Die Tabelle steht ganz da, die Bühne wächst mit ihr (kein Scrollen im Scrollen) */
  #main.dashboard .buehne.a-vergleich{aspect-ratio:auto;width:100%}
  #main.dashboard .buehne.a-vergleich .dash{aspect-ratio:auto;margin:0;padding:1rem 1rem 1.2rem}
  #main.dashboard .buehne.a-vergleich .ring-text{position:static;transform:none;white-space:normal;margin:0 0 .6rem}
  #main.dashboard .buehne.a-vergleich .ansicht{position:static;overflow:visible}
  /* Zeitachse: nutzt die ganze Höhe der Bühne */
  #main.dashboard .buehne.a-zeit .dash{aspect-ratio:32/21;margin:0 auto}
  .zeitachse-fuss{top:0}
  .panel{width:43%}
  .panel .stufen button{padding-inline:.8rem}
}
@media (max-width:1149px){
  #main.dashboard .buehne{aspect-ratio:auto;overflow:visible}
  .ebfeld,.zeitachse .akte{font-size:1rem;width:auto}
  .ansicht.zeitachse{min-height:29rem}
  .ebenen-legende{display:none}
}
@media (min-width:821px) and (max-width:1149px){   /* zwischen Hochformat und Rad: die sechs Karten in zwei Spalten */
  .buehne .dash{grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start}
  .buehne .dash > .ring-text,.buehne .dash > .frage-kern,.buehne .dash > .ebfelder,.buehne .dash > .rad-satz,.buehne .dash > .ansicht{grid-column:1/-1}
  .buehne .dash > .spalte.l{grid-column:1;grid-row:3}
  .buehne .dash > .spalte.r{grid-column:2;grid-row:3}
  .ebfelder{grid-template-columns:repeat(5,minmax(0,1fr))}
}
.panel .portraet{width:8.5rem}
.portraet figcaption{overflow-wrap:anywhere;hyphens:auto}
#main summary{min-height:44px}
/* Zusammenfassung: Das Rad ist so groß, dass seine Beschriftung 16 px erreicht (im Druck rund 9 pt) */
.zf .schau{grid-template-columns:minmax(0,19rem) minmax(0,1fr)}
/* Deckblatt */
.ab-deck .ab-titelbild img{aspect-ratio:5/4;object-fit:cover;object-position:center 40%}
.eingabe fieldset{border:2px solid var(--stahl);border-radius:.3rem}
@media print{
  .ab-deck .ab-titelbild img{aspect-ratio:16/10}
  html[data-seite="zusammenfassung"]{font-size:9pt}
  html[data-seite="zusammenfassung"] .ab-akopf{display:none!important}
  .zf .ab-druckfeld{--zeile:6.6mm}
  .zf .schau{grid-template-columns:46mm minmax(0,1fr)}
  html[data-seite="zusammenfassung"] .zf > .zeit{display:none}
  .zf .merksatz{margin:.3rem 0;padding:.2rem 0;font-size:10.5pt}
  .zf .ansaetze{gap:.3rem}
  .zf .ans{padding:.3rem .45rem;font-size:8.2pt;line-height:1.27}
  .zf h2{margin:.4rem 0 .15rem}
}
'''
css = css.rstrip() + '\n' + NEU_CSS
s = s[:a + 7] + css + s[e:]

# ---------------------------------------------------------------- Skript: gemeinsamer Kern
einmal('<script>\n"use strict";\n', '<script>\n"use strict";\n/* AB-KERN:ANFANG */\n/* AB-KERN:ENDE */\n')

# Stand: Felder für das Extra
einmal('gl:["","",""], hand:false, krit:false }, lade());', 'gl:["","",""], hand:false, krit:false, ex:{} }, lade());')
einmal('if (!Array.isArray(S.gl)) S.gl = ["","",""];', 'if (!Array.isArray(S.gl)) S.gl = ["","",""]; if (!S.ex) S.ex = {};')
# Jede Änderung meldet dem Hefter: wie viele Aufträge fertig sind und den Satz aus dem Rückblick
einmal('''const speichere = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e) {} clearTimeout(REGT); REGT = setTimeout(() => { if (typeof register === "function") register(); }, 200); };''',
       '''const melde = () => { try { const zaehlt = AUF.filter(a => !a.extra); GGKBlatt.melde("M22", { fertig: zaehlt.filter(a => erledigt(a.id)).length, von: zaehlt.length, satz: (S.neu || "").trim() }); } catch(e) {} };
const speichere = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e) {} clearTimeout(REGT); REGT = setTimeout(() => { melde(); if (typeof register === "function") register(); }, 200); };''')
a = s.index('const MARK = '); e = s.index('\n', a); s = s[:a] + s[e + 1:]
# Bilder in Reserve (nie gezeigt) stehen nicht mehr in der Seite – sonst reisen sie ungenutzt im Paket mit. Sie bleiben in media/ und in der Bildliste.
for k in ['familie', 'eichmann', 'bauman', 'aufbau']:
    m = re.search(r'\n  ' + k + r':\s*\{ datei:"media/[^\n]*\},?(?=\n)', s); assert m, k
    assert not re.search(r'(bild:\s*"' + k + r'"|\("' + k + r'"|BILDER\.' + k + r'\b)', s), k + ' wird benutzt'
    s = s[:m.start()] + s[m.end():]
# Hefter statt Labor
einmal('''const LABOR = /github\\.io$/.test(location.hostname) ? "index.html" : "https://geschichtefuerdiegegenwart.github.io/GGK-Einheit-Nationalsozialismus/";''',
       '''const HEFTER = "hefter-nationalsozialismus.html";   // Startdatei des Hefters; im Moodle-Paket heißt sie index.html
const PLATZ = GGKBlatt.platz("M22");                // Blatt 7 von 11, davor M21, danach M23''')

fn('kopf', r'''
function kopf(){
  document.getElementById("kopf").innerHTML = `<span class="reiter">M22</span><div class="titel">„Große Verbrechen brauchen keine Monster!“<small>Hefter ${esc(PLATZ.name)} · Arbeitsblatt ${PLATZ.i} von ${PLATZ.n}</small></div><button type="button" class="btn" data-ab="sichern">Stand sichern</button><a class="btn" href="${HEFTER}">← Hefter</a>`;
  document.documentElement.style.setProperty("--ab-kopf", document.querySelector(".kopf").offsetHeight + "px");
  register(true);
}
''')

# Aufträge: Extra anhängen (seit 5.1 gibt es keine »breiten« Seiten mehr: jedes Blatt hat dieselbe Größe)
einmal('''fehlt:"Die Zusammenfassung enthält die Erklärungen. Sie öffnet sich nach deinem Text in Auftrag 7." },
];''', '''fehlt:"Die Zusammenfassung enthält die Erklärungen. Sie öffnet sich nach deinem Text in Auftrag 7." },
  { id:"extra", nr:"＋", kurz:"Extra · freiwillig", name:"Ein Gespräch über einen Satz", form:"Freiwillig · außerhalb der 90 Minuten", min:0, frei:"antwort", nach:"schreiben", fehlt:"Das Extra öffnet sich nach deinem Text in Auftrag 7.", extra:true },
];''')
einmal('''markt: () => (S.grund || "").trim().length >= 10, schreiben: schreibFertig, rueckblick: () => (S.neu || "").trim().length >= 10 };''',
       '''markt: () => (S.grund || "").trim().length >= 10, schreiben: schreibFertig, rueckblick: () => (S.neu || "").trim().length >= 10, extra: () => (S.ex.u || "").trim().length >= 10 };''')

fn('register', r'''
function register(immer){
  const r = document.getElementById("reg"), lf = document.getElementById("loesch-frage"); if (!r || (!immer && (r.contains(document.activeElement) || (lf && !lf.hidden && r.contains(lf))))) return;
  const sl = r.scrollLeft, st = r.scrollTop;
  const zeile = (id, nr, kurz, unter, kl, label) => `<li><button data-geh="${id}" class="${kl}"${id === S.seite ? ' aria-current="step"' : ""} aria-label="${esc(label)}"><span class="ab-nr" aria-hidden="true">${nr}</span><span><b>${esc(kurz)}</b><span class="ab-st">${esc(unter)}</span></span></button></li>`;
  r.innerHTML = `<p class="ab-regtitel">Dieses Blatt · 90 Minuten</p><ol>${zeile("start", "D", "Deckblatt", S.seite === "start" ? "du bist hier" : "Frage und Ablauf", "eckig", "Deckblatt: Zentrale Frage und Ablauf")}${AUF.map(a => { const hier = a.id === S.seite;
    const [wort, kl] = hier ? ["du bist hier","hier"] : erledigt(a.id) ? ["✓ fertig","fertig"] : offen(a.id) ? ["offen","offen"] : a.frei === "ansage" ? ["auf Ansage","ansage"] : ["nach Antwort","antwort"];
    const lang = { "auf Ansage":"öffnet auf Ansage", "nach Antwort":"öffnet nach deiner Antwort", "✓ fertig":"fertig" }[wort] || wort;
    return zeile(a.id, a.nr, a.kurz, (a.extra ? "" : a.min + " Min. · ") + wort, kl + (a.extra ? " eckig" : ""), `${a.extra ? "Extra" : "Auftrag " + a.nr}: ${a.kurz}, ${a.form}${a.extra ? "" : ", " + a.min + " Minuten"}, ${lang}`); }).join("")}</ol>`;
  if (QUER() && !SCHMAL()) r.insertAdjacentHTML("beforeend", werkzeuge());
  r.scrollLeft = sl; r.scrollTop = st;
}
''')

einmal('''const blattzeile = () => `<div class="ab-zeile"><span>GGK · Nationalsozialismus</span><span>M22 · Arbeitsblatt</span><span>Datum: ${new Date().toLocaleDateString("de-DE")}</span></div>`;''',
       '''const blattzeile = () => `<div class="ab-zeile"><span>GGK · ${esc(PLATZ.name)}</span><span><b>M22</b> · Blatt ${PLATZ.i} von ${PLATZ.n} im Hefter</span><span>Datum: ${new Date().toLocaleDateString("de-DE")}</span></div>`;''')
einmal('''  return `<h1 class="ab-h"><span class="ab-nr" aria-hidden="true">${a.nr}</span><span>Arbeitsauftrag ${a.nr}${n > 1 ? BUCHST[i] : ""}: ${esc(a.name)}</span></h1>
  <p class="ab-meta">${esc(a.form)} · ${a.min} Minuten${a.marke ? `<span class="ab-marke">${esc(a.marke)}</span>` : ""}</p>''',
       '''  return `<header class="ab-akopf${a.extra ? " eckig" : ""}"><span class="ab-nr" aria-hidden="true">${a.nr}</span><div><p class="ab-kicker">${a.extra ? "Extra · freiwillig" : `Arbeitsauftrag ${a.nr}${n > 1 ? BUCHST[i] : ""}`}</p><h1 class="ab-titel">${esc(a.name)}</h1>
  <p class="ab-meta">${a.form.split(" · ").map(x => `<span>${esc(x)}</span>`).join("")}${a.extra ? "" : `<span>${a.min} Minuten</span>`}${a.marke ? `<span class="ab-marke">${esc(a.marke)}</span>` : ""}</p></div></header>''')
einmal('''`<a class="btn" href="${LABOR}">Zum GGK-Labor</a>`}</div>`;''', '''`<a class="btn" href="${HEFTER}">Zum Hefter</a>`}</div>`;''')

fn('start', r'''
function start(){
  const b = BILDER.wald, da = b && !FEHLT.has("wald"), runden = AUF.filter(a => !a.extra);
  const naechst = runden.find(a => !erledigt(a.id)), begonnen = runden.some(a => erledigt(a.id));
  return `<div class="ab-deck"><div class="ab-deck__text">
    <p class="ab-kicker">M22 · Blatt ${PLATZ.i} von ${PLATZ.n} im Hefter · davor ${PLATZ.davor.nr} · danach ${PLATZ.danach.nr} · 90 Minuten</p>
    <h1>„Große Verbrechen brauchen keine Monster!“</h1>
    <p class="ab-zentral">Zentrale Frage</p>
    <p class="leitfrage">Wie war das möglich? Wer wurde zum Täter, wer zur Täterin?</p>
    <div class="reihe nodruck"><button class="btn primary" data-geh="einstieg">Los geht’s: Auftrag 1 →</button>${begonnen && naechst && naechst.id !== "einstieg" ? `<button class="btn" data-geh="${naechst.id}">Weiter, wo du warst: Auftrag ${naechst.nr}</button>` : ""}</div></div>
  ${da ? `<figure class="ab-titelbild"><img src="${b.datei}" alt="${esc(b.alt)}" width="1000" height="1248" data-bild="wald" onerror="bildFehlt(this)"><figcaption>${esc(b.unter)}. ${esc(b.quelle)}.</figcaption></figure>` : ""}</div>
  <div class="ab-paar"><div><h3>Darum geht es</h3><p>In M21 ging es um die Menschen, die ermordet wurden. Heute fragst du nach denen, die die Morde möglich machten. Die Täter waren keine Monster. Das ist das Ergebnis von siebzig Jahren Forschung, und es ist das Beunruhigende daran.</p>
    <p>Du prüfst drei Sätze, untersuchst einen Fall und vergleichst Erklärungen der Forschung. Am Ende schreibst du eine Erklärung – so, wie sie in der Klassenarbeit verlangt wird.</p></div>
  <div><h3>So arbeitest du mit diesem Blatt</h3><ul><li>Links stehen alle Arbeitsaufträge. Du siehst immer, wo du bist und was noch kommt.</li><li>Jeder Auftrag ist ein Blatt. Du scrollst von oben nach unten.</li><li>Manche Aufträge öffnen nach deiner Antwort, manche auf Ansage deiner Lehrkraft.</li><li>Oben rechts sicherst du deinen Stand als Datei. So geht nichts verloren, auch wenn du das Gerät wechselst.</li></ul></div></div>
  <h3 class="ab-deck-h">So läuft dieses Blatt</h3>
  <table class="ab-ablauf"><thead><tr><th scope="col">Nr.</th><th scope="col">Arbeitsauftrag</th><th scope="col">Sozialform</th><th scope="col">Minuten</th></tr></thead>
  <tbody>${runden.map(a => `<tr><td>${a.nr}</td><td>${esc(a.name)}</td><td class="form">${esc(a.form)}</td><td>${a.min}</td></tr>`).join("")}<tr><td></td><td>zusammen</td><td></td><td>${runden.reduce((n, a) => n + a.min, 0)}</td></tr></tbody></table>
  <p class="hinweis" style="margin-top:.5rem">Dazu ein Extra: freiwillig und außerhalb der 90 Minuten.</p>
  <div class="ab-info"><p><b>Hinweis:</b> In dieser Stunde geht es um Massenmord. Die Texte beschreiben ihn knapp und ohne Einzelheiten der Gewalt. Es gibt keine Bilder von Gewalt. Wenn dich etwas belastet, sprich mit deiner Lehrkraft.</p></div>
  <p class="merksatz">Erklären heißt nicht entschuldigen.</p>
  <div class="ab-fuss nodruck"><a class="btn" href="${HEFTER}">‹ Zum Hefter</a><button class="btn primary" data-geh="einstieg">1 Es geht um Menschen ›</button></div>`;
}
''')

# Geschlossener Auftrag: Wortlaut wie im Vorbild; die Freigabe braucht einen Tipp statt zwei (Rückmeldung vom 18.11.2026: unnötige Klicks vermeiden)
fn('zuSeite', r'''
function zuSeite(a){
  const ans = a.frei === "ansage";
  return `<div class="ab-zu"><p class="ab-zu-t">${ans ? "Dieser Auftrag öffnet auf Ansage." : "Dieser Auftrag öffnet nach deiner Antwort."}</p>
  ${ans ? `<p>Warte, bis deine Lehrkraft sagt, dass es weitergeht. So bleibt die Klasse beisammen.</p><p><b>Darum geht es gleich:</b> ${esc(a.gleich)}</p>` : `<p>${esc(a.fehlt)}</p>`}
  <div class="reihe">${ans ? `<button class="btn primary" data-frei="${a.id}">Auftrag ${a.nr} öffnen</button>` : `<button class="btn primary" data-geh="${a.nach}">Zu Auftrag ${AUF[AUFI(a.nach)].nr}</button><button class="btn still" data-frei="${a.id}">Auf Ansage trotzdem öffnen</button>`}</div></div>`;
}
''')
einmal('''  if ("freifrage" in d) { const f = document.getElementById("ab-frage"); f.hidden = false; t.setAttribute("aria-expanded", "true"); f.querySelector("button").focus(); return; }
''', '')
einmal('''if (d.frei !== undefined) { if (d.frei) { S.frei[d.frei] = true; speichere(); zeichne(true); } else { document.getElementById("ab-frage").hidden = true; document.querySelector("[data-freifrage]").focus(); } return; }''',
       '''if (d.frei) { S.frei[d.frei] = true; speichere(); zeichne(true); return; }   // Freigabe mit einem Tipp''')

# Faktencheck (Auftrag 2): Die Schätzung ist die Festlegung – danach dreht sich die Karte von selbst, wie es im Auftrag steht (ein Tipp statt zwei je Satz).
# »Umdrehen« bleibt nur für den Weg zurück: wenn die Karte nach »Zur Vorderseite« wieder vorn liegt.
einmal('''<div class="reihe"><button class="btn dunkel" data-dreh="${f.id}" ${w === undefined ? "disabled" : ""}>Umdrehen</button></div></div>''',
       '''${w === undefined ? "" : `<div class="reihe"><button class="btn dunkel" data-dreh="${f.id}">Umdrehen</button></div>`}</div>''')
einmal('''if (d.z) { S.z[d.z] = +d.o; speichere(); t.parentNode.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b === t)); document.querySelector(`[data-dreh="${d.z}"]`).disabled = false; { const fs = document.getElementById("fc-st-" + d.z); if (fs) fs.textContent = "geschätzt · jetzt umdrehen"; } return; }''',
       '''if (d.z) { const id = d.z; S.z[id] = +d.o; S.zum[id] = true; speichere(); zeichne(); const k = document.getElementById("dreh-" + id); if (!tast && !ruhig()) { k.classList.remove("um"); k.querySelector(".hinten").hidden = false; void k.offsetWidth; k.classList.add("um"); } k.querySelector("[data-zurueck]").focus({ preventScroll:true }); k.scrollIntoView({ block:"nearest", behavior: ruhig() ? "auto" : "smooth" }); return; }''')

# Schreibauftrag: Erwartete Inhalte stehen nicht mehr im Blatt (Paket der Lehrkraft)
a = s.index('const KA_INHALT = '); e = s.index('const kaRaster = ')
s = s[:a] + '/* Die erwarteten Inhalte stehen seit Fassung 5.0 nur noch im Text für die Lehrkraft (privat/lk/m22.html). */\n' + s[e:]
einmal('''${kaRaster()}
    <div class="ka-inhalt"><p><b>Das kann in deinem Text stehen</b> (ein Konzept genügt):</p>${KA_INHALT.map(([a, b]) => `<p><b>${esc(a)}</b> ${esc(b)}</p>`).join("")}</div></div>''',
       '''${kaRaster()}
    <p class="hinweis" style="margin-top:.6rem">Ein Konzept genügt. Was genau im Text stehen kann, besprecht ihr im Plenum.</p></div>''')

# Druck von Auftrag 7: Aufgabe, Stichpunkte und Text – ohne Wortzähler, Schalter und Kriterien
einmal('''<p class="hinweis" id="erz-zahl" aria-live="polite">''', '''<p class="hinweis nodruck" id="erz-zahl" aria-live="polite">''')
einmal('''  </div><div>
    <p><b>Lieber von Hand?</b>''', '''  </div><div class="nodruck">
    <p><b>Lieber von Hand?</b>''')
einmal('''<div id="krit" ${S.krit && fertig ? "" : "hidden"}>''', '''<div id="krit" class="nodruck" ${S.krit && fertig ? "" : "hidden"}>''')
# Extra (freiwillig) und die Seite »Am Beamer« (bisher im Lehrkraftbereich; enthält keine Lösungen)
a = s.index('/* ---------- Für Lehrkräfte: Text verschlüsselt im Datenblock lehr-daten')
EXTRA = r'''/* ---------- Extra · freiwillig (Vorschlag vom 18.11.2026): hängt an einem Gespräch, am eigenen Rad und an einer Stelle aus diesem Blatt ---------- */
function extra(){
  const feld = (k, marke, lab, rows) => `<li><label for="ex-${k}"><b>${marke}</b> ${lab}</label><textarea id="ex-${k}" data-ex="${k}" rows="${rows}">${esc(S.ex[k] || "")}</textarea></li>`;
  return `<p class="ab-unter">Dieses Extra gehört nicht zu den 90 Minuten und wird nicht benotet. Du brauchst dafür ein Gespräch. Das kann dir kein Programm abnehmen.</p>
  ${auftrag("Allein · mit einer erwachsenen Person", "Fragen, zuhören, festhalten", "In Auftrag 2 hast du drei Sätze geprüft. Solche Sätze hört man bis heute. Führ ein kurzes Gespräch und halte es hier fest – getippt oder von Hand auf dem ausgedruckten Blatt.")}
  <p><b>Deine Frage an die Person:</b></p>
  <blockquote class="ka-aufgabe">„Waren die Täter Monster – oder ganz normale Menschen?“</blockquote>
  <ol class="ab-schritte">
  ${feld("a", "Die Antwort.", "Schreib sie in zwei Sätzen auf. Ohne Namen: Schreib nur „eine erwachsene Person“.", 3)}
  ${feld("e", "Die Ebene.", "Auf welcher Ebene setzt die Antwort an – Person, Situation, Weltbild, Apparat oder Vorteil? Begründe in einem Satz.", 2)}
  ${feld("b", "Deine Antwort mit Beleg.", "Was würdest du der Person sagen? Stütz dich auf eine Stelle aus diesem Blatt und nenne sie, zum Beispiel „Auftrag 3, Karte 4“ oder „Erklärung C“.", 3)}
  ${feld("u", "Ein Satz zu dir.", "Was hat das Gespräch an deinem Urteil geändert – oder bestätigt?", 2)}
  </ol>
  <p class="hinweis" style="margin-top:1rem">Bring das Blatt mit. Zu Beginn der nächsten Stunde hören wir zwei oder drei Gespräche.</p>
  <div class="reihe nodruck"><button class="btn" data-drucken>Dieses Blatt drucken oder als PDF sichern</button></div>`;
}

'''
s = s[:a] + EXTRA + s[a:]

a = s.index('/* Beamer-Werkzeuge der Lehrkraft: erscheinen erst im geöffneten Bereich. Sie enthalten keine Lösungen. */'); e = s.index('\n}\n', s.index('function lehrWerkzeuge(){')) + 3
alt_werk = s[a:e]
m = re.search(r'return `(<h2 class="abschnitt">Freigabe</h2>.*)`;\n\}\n$', alt_werk, re.S); assert m
BEAMER = '''/* Am Beamer (seit Fassung 5.0 eine eigene Seite, bisher im Lehrkraftbereich): Freigabe, Moderation, Modelle der Tischgruppen. Keine Lösungen. */
function beamer(){
  return `<header class="ab-akopf eckig"><span class="ab-nr" aria-hidden="true">B</span><div><p class="ab-kicker">Für das Gerät der Lehrkraft</p><h1 class="ab-titel">Am Beamer</h1><p class="ab-meta"><span>Plenum</span><span>ohne Lösungen</span></p></div></header>
  <p>Diese Seite ist für das Gerät am Beamer gedacht. Sie zeigt Werkzeuge für das Plenum. Erwartungen und Hinweise zur Stunde stehen hier nicht; sie liegen im Paket für die Lehrkraft.</p>
  ''' + m.group(1) + '''
  <div class="ab-fuss nodruck"><button class="btn" data-geh="start">‹ Deckblatt</button><span></span><span></span></div>`;
}
'''
s = s[:a] + BEAMER + s[e:]

einmal('const SEITE_FN = { start, einstieg, fakten, jozefow, akte, landkarte, markt, diskussion, schreiben, rueckblick, zusammenfassung, lehrkraft };',
       'const SEITE_FN = { start, einstieg, fakten, jozefow, akte, landkarte, markt, diskussion, schreiben, rueckblick, zusammenfassung, extra, beamer };\nif (typeof lehrkraft === "function") SEITE_FN.lehrkraft = lehrkraft;   // nur in der Fassung mit Schloss; im Paket für Lernende fehlt der Bereich ganz')

fn('loeschBereich', r'''
function werkzeuge(){
  const mitte = `<button class="btn" data-loeschfrage>Eingaben löschen …</button>
  <div id="loesch-frage" hidden class="loesch-frage"><p><b>Wirklich alles löschen?</b> Antworten, Siegel, Erklärungskarten, Gewichtungen, Landkarte, Notizen, Modell und Position werden auf diesem Gerät entfernt. Brauchst du sie noch? Dann sichere zuerst den Stand als Datei.</p><div class="reihe"><button class="btn primary" data-loeschen="ja">Ja, alles löschen</button><button class="btn" data-loeschen="nein">Abbrechen</button></div></div>
  <button class="btn" data-geh="beamer">Am Beamer (für die Lehrkraft)</button>${typeof lehrTuer === "function" && S.seite !== "lehrkraft" ? lehrTuer() : ""}`;
  return GGKBlatt.werkzeuge(mitte, (document.querySelector(".urheberzeile") || {}).textContent || "");
}
''')

fn('zeichne', r'''
function zeichne(fokus){
  if (!SEITE_FN[S.seite]) S.seite = "start";
  document.documentElement.setAttribute("data-seite", S.seite);   // für den Druck: die Zusammenfassung hat ihr eigenes Maß
  document.querySelector(".ab-rahmen").classList.toggle("schmal", SCHMAL());   // nur die Übersicht (Auftrag 4): Register als Nummernleiste, dasselbe Blatt darf breiter werden
  kopf();
  const m = document.getElementById("main"), auf = AUF[AUFI(S.seite)], auf_offen = !auf || offen(S.seite);
  m.classList.toggle("dashboard", S.seite === "akte" && auf_offen);
  if (S.seite === "zusammenfassung" && auf_offen && !S.durch.zusammenfassung) { S.durch.zusammenfassung = true; speichere(); }
  m.innerHTML = blattzeile() + (auf ? blatt(auf) : SEITE_FN[S.seite]());
  document.getElementById("unten").innerHTML = QUER() && !SCHMAL() ? "" : werkzeuge();   // Werkzeuge: neben dem Blatt im Register, sonst unter dem Blatt
  m.querySelectorAll("[data-vt]").forEach(b => b.style.viewTransitionName = b.dataset.vt);
  if (LETZTE_SEITE !== S.seite) { const b = document.getElementById("band"); if (b && b.classList.contains("mit")) neu(b, "neu"); }
  LETZTE_SEITE = S.seite;
  if (fokus) { m.focus({ preventScroll:true }); window.scrollTo(0, 0); }
}
''')
einmal('<div class="ab-rahmen"><nav class="ab-reg" id="reg" aria-label="Alle Arbeitsaufträge"></nav><main id="main" tabindex="-1"></main></div>',
       '<div class="ab-rahmen"><nav class="ab-reg" id="reg" aria-label="Alle Arbeitsaufträge"></nav><main id="main" tabindex="-1"></main></div>\n<div class="ab-unten nodruck" id="unten"></div>')
einmal('matchMedia("(min-width:900px)")', 'matchMedia("(min-width:981px)")')   # Register neben dem Blatt ab 981 px, wie im Vorbild
# Übersicht: Die Kartenspalten reichen jetzt über das Raster 16:9 hinaus (zusammen 16:10). Die Linien enden an der Mitte der Karten.
einmal('const y = [134, 360, 586][l >= 0 ? l : r]; return l >= 0 ? [340, y] : [940, y]; };', 'const y = [82, 360, 638][l >= 0 ? l : r]; return l >= 0 ? [365, y] : [915, y]; };')
# Die Bühne kennt ihre Ansicht: Das Rad hat ein festes Format, die Tabelle wächst mit ihrem Inhalt, die Zeitachse nutzt die ganze Höhe
einmal('<div class="buehne${a ? " offen " +', '<div class="buehne a-${S.ansicht || "frage"}${a ? " offen " +')
# Satz unter dem Rad: bei einer Erklärung in der Einzahl
n_alt = s.count('} setzen hier an. ${'); assert n_alt == 1, n_alt
einmal('} setzen hier an. ${', '} ${AKTEN.filter(a => geprueft(a.s) && a.gew[S.filter] >= 2).length === 1 ? "setzt" : "setzen"} hier an. ${')
# Satz zur offenen Erklärung und Rückmeldung im Panel: Mehrzahl bei zwei Namen (»Bauman · Welzer setzen …«)
einmal('<b>${esc(sel.name)}</b> setzt vor allem bei <b>', '<b>${esc(sel.name)}</b> ${sel.name.includes("·") ? "setzen" : "setzt"} vor allem bei <b>')
einmal('Ebenen genau getroffen. ${esc(a.name)} setzt vor allem bei <b>', 'Ebenen genau getroffen. ${esc(a.name)} ${a.name.includes("·") ? "setzen" : "setzt"} vor allem bei <b>')
# Panel offen, Erklärung noch nicht geprüft: ein kurzer Satz, der in die freie Fläche neben dem Panel passt (der lange Hinweis lag halb unter dem Panel)
einmal(': "Tippe auf eine Erklärung: Du liest sie im Panel und prüfst, wo sie ansetzt. Tippe auf ein Feld: Welche geprüften Erklärungen setzen dort an?"}</p>`;',
       ': S.akte ? "Lies die Erklärung im Panel. Mach dort den Gewichtungs-Check: Wo setzt sie an?" : "Tippe auf eine Erklärung: Du liest sie im Panel und prüfst, wo sie ansetzt. Tippe auf ein Feld: Welche geprüften Erklärungen setzen dort an?"}</p>`;')
# Über der Bühne steht eine Zeile: drei Ansichten links, der Film rechts
einmal('<span class="hinweis">Tippe auf eine Ansicht; deine Eingaben bleiben.</span>', '')
# Tipp auf eine Erklärung: Die Bühne rückt ganz ins Bild (das Blatt beginnt wie jedes Blatt mit Blattkopf und Auftragskopf)
einmal('''S.akte = d.akte; S.gelesen[d.akte] = true; speichere(); zeichne(); const z = document.querySelector("#panel [data-zu-akte]"); if (z) z.focus({ preventScroll:true }); return; }''',
       '''S.akte = d.akte; S.gelesen[d.akte] = true; speichere(); zeichne(); const z = document.querySelector("#panel [data-zu-akte]"); if (z) z.focus({ preventScroll:true });
    const bu = document.getElementById("buehne"); if (bu && bu.scrollIntoView && matchMedia("(min-width:1150px)").matches) bu.scrollIntoView({ block:"nearest", behavior: ruhig() ? "auto" : "smooth" }); return; }''')
# Wortlaut: keine Hausaufgaben (Auswahl vom 18.11.2026), Freigabe mit einem Tipp, »Auftrag 4« statt »Phase 4«
einmal('<p class="hinweis"><b>Für Schnelle – oder als Hausaufgabe.</b> In der Stunde ist dafür keine Zeit eingeplant.</p>',
       '<p class="hinweis"><b>Für Schnelle – freiwillig.</b> In der Stunde ist dafür keine Zeit eingeplant.</p>')
einmal('Auf den iPads tippen die Schüler*innen selbst auf „Unsere Lehrkraft hat freigegeben“, wenn du es ansagst.',
       'Auf den iPads tippen die Schüler*innen selbst auf „Auftrag … öffnen“, wenn du es ansagst. Ein Tipp genügt.')
# Der Film füllt das Fenster: So bleibt seine Schrift auf dem iPad lesbar. »Schließen« steht in der Bedienzeile des Films.
fn('filmAnsicht', r'''
function filmAnsicht(von){
  FILM_VON = von || null;
  document.getElementById("ueber").innerHTML = `<div class="tafel filmtafel" role="dialog" aria-modal="true" aria-label="Erklärfilm zu Auftrag 4: So arbeitest du mit der Übersicht">
    <iframe class="filmrahmen" src="m22-film-erklaerungen.html?eingebettet" title="Erklärfilm zu Auftrag 4, ohne Ton"></iframe></div>`;
  const f = document.querySelector("#ueber .filmrahmen");
  f.addEventListener("load", () => { try { f.contentWindow.focus(); } catch (e) {} }); f.focus();
}
''')

# Eingaben im Extra
einmal('''document.addEventListener("input", ev => {
  const t = ev.target, d = t.dataset;
''', '''document.addEventListener("input", ev => {
  const t = ev.target, d = t.dataset;
  if (d.ex !== undefined) { S.ex[d.ex] = t.value; speichere(); return; }
''')

# ---------------------------------------------------------------- Auftrag 4: Karten und Rad in 16 px
einmal('''    <span class="nr">Erklärung ${a.s}${emp ? ` <span class="emp">Empfehlung</span>` : ""}</span>
    <span class="pf" aria-hidden="true">''', '''    <span class="pf" aria-hidden="true">''')
einmal('''<b>${esc(a.name)}</b><span class="j">${esc(a.jahr)}${ok ? " · " + ebenenNachCheck(a) : ""}</span>''',
       '''<b>${esc(a.name)}</b><span class="j">Erklärung ${a.s}<span class="jz"> · ${esc(a.jahr)}</span></span>''')
# Stand der Erklärung in einer Zeile (5.1): Drei Marken nebeneinander passten nicht mehr in die Karte. »gelesen« steht nur, solange noch keine Karte geschrieben ist.
einmal('''<span class="fs" aria-label="Stand"><span class="${gel ? "ok" : ""}">${gel ? "✓ " : ""}gelesen</span><span class="${gesch ? "ok" : ""}">${gesch ? "✓ " : ""}Karte</span><span class="${ok ? "ok" : ""}">${ok ? "✓ " : ""}geprüft</span></span></button>`;''',
       '''<span class="fs" aria-label="Stand">${standHTML(a, emp)}</span></button>`;''')
einmal('\nfunction karteHTML(a, extra = ""){', '''
/* Stand einer Erklärung in einer Zeile: »gelesen« steht nur, solange noch keine Karte geschrieben ist (wer die Karte schreibt, hat gelesen). So passt der Stand in jede Kartenbreite. */
const standHTML = (a, emp) => { const m = []; if (karteFertig(a.s)) m.push("Karte"); else if (S.gelesen[a.s]) m.push("gelesen"); if (geprueft(a.s)) m.push("geprüft");
  return (emp ? `<span class="emp">Empfehlung</span>` : "") + (m.length ? m.map(x => `<span class="ok">✓ ${x}</span>`).join("") : `<span>noch offen</span>`); };
function karteHTML(a, extra = ""){''')
einmal('''  return `<p class="ring-text">Sechs Erklärungen der Forschung · fünf Ebenen, auf denen sie ansetzen · eine Frage</p>
  <div class="spalte l">''', '''  return `<div class="spalte l">''')
einmal('''<p class="modellhinweis">Fünf Ebenen und Gewichtungen sind ein Modell der Lehrkraft zum Ordnen der Erklärungen, keine Forschungseinteilung und keine Messwerte.</p></div>''',
       '''<ul class="ebenen-legende" aria-label="Die fünf Ebenen">${EBENEN.map(([k, n, u]) => `<li data-ebene="${k}"><b>${n}</b>${esc(u)}</li>`).join("")}</ul><p class="modellhinweis">Sechs Erklärungen der Forschung, fünf Ebenen, auf denen sie ansetzen, eine Frage. Die fünf Ebenen und die Gewichtungen sind ein Modell der Lehrkraft zum Ordnen der Erklärungen, keine Forschungseinteilung und keine Messwerte.</p></div>''')
# Zeitachse: Karten unter der Achse rücken tiefer, eng stehende Jahreszahlen wechseln die Zeile (in 16 px überdeckten sie sich)
einmal('''let reihe = i % 2 === 0 ? "oben" : "unten", top = reihe === "oben" ? "14%" : "58%";''', '''let reihe = i % 2 === 0 ? "oben" : "unten", top = reihe === "oben" ? "14%" : "68%";''')
einmal('''{ top = reihe === "oben" ? "36%" : "78%"; }''', '''{ top = reihe === "oben" ? "34%" : "85%"; }''')
einmal('''      h += `<span class="jahr" style="left:${xx}%">${JZ[a.s]}</span>` + karteHTML(a, `left:${xx}%;top:${top}`); });''',
       '''      const doppelt = JZ[a.s] === jvor, tief = !doppelt && xx - jx < 6 && !jtief; if (!doppelt) { jx = xx; jtief = tief; jvor = JZ[a.s]; }
      h += (doppelt ? "" : `<span class="jahr${tief ? " tief" : ""}" style="left:${xx}%">${JZ[a.s]}</span>`) + karteHTML(a, `left:${xx}%;top:${top}`); });''')
einmal('''const letzte = { oben:-99, unten:-99 }; let h = "";''', '''const letzte = { oben:-99, unten:-99 }; let h = "", jx = -99, jtief = false, jvor = null;''')
# aktenStand() schreibt den Stand der Karte neu, ohne die Übersicht neu zu zeichnen (der Fokus bleibt im Feld)
einmal('''document.querySelectorAll("#dash .akte").forEach(b => { const s = b.dataset.akte, ok = karteFertig(s), sp = b.querySelector(".fs span:nth-child(2)"); if (sp) { sp.classList.toggle("ok", ok); sp.textContent = (ok ? "✓ " : "") + "Karte"; } });''',
       '''document.querySelectorAll("#dash .akte").forEach(b => { const st = b.querySelector(".fs"); if (st) st.innerHTML = standHTML(AKTE(b.dataset.akte), b.classList.contains("empfohlen")); });''')

einmal('''<summary style="cursor:pointer;min-height:40px;display:flex;''', '''<summary style="cursor:pointer;min-height:44px;display:flex;''')
# »Eingaben löschen« nimmt auch den Eintrag im Hefter weg (Stand und Satz der Lernspur); beim Start gleicht das Blatt den Hefter ab
einmal('''if (d.loeschen === "ja") { try { localStorage.removeItem(KEY); } catch(e) {} location.reload(); return; }''', '''if (d.loeschen === "ja") { try { localStorage.removeItem(KEY); } catch(e) {} GGKBlatt.vergiss("M22"); location.reload(); return; }''')
assert s.rstrip().endswith('</html>') and s.count('zeichne();\n</script>') == 1
s = s.replace('zeichne();\n</script>', 'zeichne();\nif (localStorage.getItem(KEY)) melde();   // Hefter abgleichen, falls schon gearbeitet wurde\n</script>')
# ---------------------------------------------------------------- Fußzeile der Datei
einmal('''  <p class="urheberzeile" style="font-size:1rem;opacity:.72;margin-top:1.5rem">''', '''  <p class="urheberzeile">''')

assert 'KA_INHALT' not in s and 'LABOR' not in s.replace('GGK-Labor', '') and 'loeschBereich' not in s, 'Reste'
assert 'class="ab-h' not in s and 'weit:true' not in s and 'freifrage' not in s and 'ab-frage' not in s, 'Reste des Rahmens von 5.0'
(REPO / DATEI).write_text(s, 'utf-8')
print('M22 umgebaut (Fassung 5.1):', len(s.encode()) // 1024, 'KB ·', n_klein, 'Schriftgrößen auf 1 rem gehoben')
