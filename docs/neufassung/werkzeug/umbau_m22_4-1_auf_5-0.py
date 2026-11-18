#!/usr/bin/env python3
"""Einmaliger Umbau: M22 von Fassung 4.1 auf Fassung 5.0 (Arbeitsblatt Geschichte, Farbwelt Archiv).
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
/* ===== Fassung 5.0 (18.11.2026): Arbeitsblatt Geschichte · Farbwelt Archiv · nichts unter 16 px ===== */
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
.band figcaption{font-size:1rem}
.merksatz{border-color:var(--tinte)}
.karte{border-color:var(--linie)}
h1{font-size:clamp(1.8rem,1.4rem + 1.6vw,2.6rem)}
.zeit{color:var(--tief)}
.urheberzeile{font-size:1rem;color:var(--leise);margin:0 1.2rem 1.2rem}
.ab-rahmen:not(.schmal) ~ .urheberzeile{display:none}
@media (max-width:899px){.ab-rahmen:not(.schmal) ~ .urheberzeile{display:none}}
/* Auftrag 4 · Übersicht: Die Karten tragen Name, Kennung und Frage in 16 px. Das Rad zeigt nur die Namen der Ebenen; ihre Erklärung steht darunter. */
#main.dashboard .ab-zeile,#main.dashboard .ab-meta{display:none}
#main.dashboard .ab-h{font-size:1.35rem;margin-bottom:.5rem}
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
.ebenen-legende li{padding:.4rem .6rem;border-left:5px solid var(--eb);background:var(--blatt);font-size:1rem;line-height:1.35}
.ebenen-legende b{display:block}
.ebenen-legende [data-ebene=person]{--eb:var(--e-person)}
.ebenen-legende [data-ebene=situation]{--eb:var(--e-situation)}
.ebenen-legende [data-ebene=weltbild]{--eb:var(--e-weltbild)}
.ebenen-legende [data-ebene=apparat]{--eb:var(--e-apparat)}
.ebenen-legende [data-ebene=vorteil]{--eb:var(--e-vorteil)}
.modellhinweis{font-size:1rem;color:var(--leise);margin:0}
@media (min-width:1150px){
  #main.dashboard .spalte{width:26%}
  #main.dashboard .spalte .akte{font-size:1rem;grid-template-columns:3.3rem minmax(0,1fr);gap:.05rem .7rem;padding:.5rem .75rem;align-content:center}
  #main.dashboard .spalte .akte .pf{grid-row:1/3;width:3.3rem;height:3.3rem;font-size:1.2rem;border-radius:.3rem}
  #main.dashboard .spalte .akte b{font-size:1.28rem;align-self:end}
  #main.dashboard .spalte .akte .j{align-self:start}
  #main.dashboard .spalte .akte .fr{font-size:1rem;line-height:1.3;margin-top:.3rem}
  #main.dashboard .spalte .akte .fs{margin-top:.3rem}
  #main.dashboard .spalte .akte .fs span{font-size:1rem;padding:0 .4rem}
  .ebfeld small{display:none}
  .ebfeld{width:13%}
  .frage-kern{font-size:1rem;width:16.5%;height:29.3%;padding:.4rem}
  .frage-kern b{font-size:1.45rem}
  .frage-kern span{margin-top:.3rem;line-height:1.2}
  .rad-satz{left:28%;right:28%;top:auto;bottom:1.2%;min-height:0}
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
/* Deckblatt, Extra, Am Beamer */
.ab-deck .ab-titelbild img{aspect-ratio:5/4;object-fit:cover;object-position:center 40%}
.ab-deck .belastend,.ab-deck .merksatz{grid-column:1/-1;margin:0}
.ab-deck ul{padding-left:1.2rem;display:grid;gap:.25rem}
.eingabe fieldset{border:2px solid var(--stahl);border-radius:.3rem}
@media print{
  .ab-deck .ab-titelbild img{aspect-ratio:16/10}
  html[data-seite="zusammenfassung"]{font-size:9pt}
  html[data-seite="zusammenfassung"] .ab-h,html[data-seite="zusammenfassung"] .ab-meta{display:none!important}
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
  document.getElementById("kopf").innerHTML = `<span class="reiter">M22</span><div class="titel">„Große Verbrechen brauchen keine Monster!“<small>Hefter ${esc(PLATZ.name)} · Arbeitsblatt ${PLATZ.i} von ${PLATZ.n}</small></div><a class="btn" href="${HEFTER}">← Hefter</a>`;
  document.documentElement.style.setProperty("--ab-kopf", document.querySelector(".kopf").offsetHeight + "px");
  register(true);
}
''')

# Aufträge: breite Seiten kennzeichnen, Extra anhängen
for kid in ['einstieg', 'fakten', 'jozefow', 'akte', 'landkarte', 'markt', 'diskussion']:
    einmal(f'  {{ id:"{kid}", nr:', f'  {{ weit:true, id:"{kid}", nr:')
einmal('''fehlt:"Die Zusammenfassung enthält die Erklärungen. Sie öffnet sich nach deinem Text in Auftrag 7." },
];''', '''fehlt:"Die Zusammenfassung enthält die Erklärungen. Sie öffnet sich nach deinem Text in Auftrag 7." },
  { id:"extra", nr:"＋", kurz:"Extra · freiwillig", name:"Extra: Ein Gespräch über einen Satz", form:"Freiwillig · außerhalb der 90 Minuten", min:0, frei:"antwort", nach:"schreiben", fehlt:"Das Extra öffnet sich nach deinem Text in Auftrag 7.", extra:true },
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
       '''  return `<h1 class="ab-h${a.extra ? " eckig" : ""}"><span class="ab-nr" aria-hidden="true">${a.nr}</span><span>${a.extra ? "" : `Arbeitsauftrag ${a.nr}${n > 1 ? BUCHST[i] : ""}: `}${esc(a.name)}</span></h1>
  <p class="ab-meta">${esc(a.form)}${a.extra ? "" : ` · ${a.min} Minuten`}${a.marke ? `<span class="ab-marke">${esc(a.marke)}</span>` : ""}</p>''')
einmal('''`<a class="btn" href="${LABOR}">Zum GGK-Labor</a>`}</div>`;''', '''`<a class="btn" href="${HEFTER}">Zum Hefter</a>`}</div>`;''')

fn('start', r'''
function start(){
  const b = BILDER.wald, da = b && !FEHLT.has("wald"), runden = AUF.filter(a => !a.extra);
  return `<div class="ab-deck"><div class="ab-deck__kopf"><span class="reiter">M22</span>
    <h1>„Große Verbrechen brauchen keine Monster!“</h1>
    <div><p class="ab-zentral">Zentrale Frage</p><p class="leitfrage">Wie war das möglich? Wer wurde zum Täter, wer zur Täterin?</p></div>
    <p class="ab-platz"><b>Platz im Hefter:</b> Blatt ${PLATZ.i} von ${PLATZ.n}<br>davor: ${PLATZ.davor.nr} ${esc(PLATZ.davor.kurz)}<br>danach: ${PLATZ.danach.nr} ${esc(PLATZ.danach.kurz)}</p>
    <div class="reihe nodruck" style="margin-top:0"><button class="btn primary" data-geh="einstieg">Arbeitsauftrag 1 beginnen ›</button></div></div>
  ${da ? `<figure class="ab-titelbild"><img src="${b.datei}" alt="${esc(b.alt)}" width="1000" height="1248" data-bild="wald" onerror="bildFehlt(this)"><figcaption>${esc(b.unter)}. ${esc(b.quelle)}.</figcaption></figure>` : "<span></span>"}
  <div class="ab-deck__unten"><div><h2>Darum geht es</h2><p>In M21 ging es um die Menschen, die ermordet wurden. Heute fragst du nach denen, die die Morde möglich machten. Die Täter waren keine Monster. Das ist das Ergebnis von siebzig Jahren Forschung, und es ist das Beunruhigende daran.</p>
    <p>Du prüfst drei Sätze, untersuchst einen Fall und vergleichst Erklärungen der Forschung. Am Ende schreibst du eine Erklärung – so, wie sie in der Klassenarbeit verlangt wird.</p>
    <h2 style="margin-top:1rem">So arbeitest du mit diesem Blatt</h2><ul><li>Links stehen alle Arbeitsaufträge. Du siehst immer, wo du bist und was noch kommt.</li><li>Jeder Auftrag hat eine eigene Seite. Du scrollst von oben nach unten.</li><li>Manche Aufträge öffnen sich erst nach deiner Antwort, manche auf Ansage deiner Lehrkraft.</li><li>Am Ende sicherst du deinen Stand als Datei. So geht nichts verloren, auch wenn du das Gerät wechselst.</li></ul></div>
  <div><h2>So läuft dieses Blatt</h2><table class="ab-ablauf"><tbody>${runden.map(a => `<tr><td>${a.nr}</td><td>${esc(a.name)}<span class="form">${esc(a.form)}</span></td><td>${a.min} Min.</td></tr>`).join("")}<tr><td></td><td>zusammen</td><td>${runden.reduce((n, a) => n + a.min, 0)} Min.</td></tr></tbody></table>
    <p class="hinweis" style="margin-top:.5rem">Dazu ein Extra: freiwillig und außerhalb der 90 Minuten.</p></div></div>
  <div class="belastend"><b>Hinweis:</b> In dieser Stunde geht es um Massenmord. Die Texte beschreiben ihn knapp und ohne Einzelheiten der Gewalt. Es gibt keine Bilder von Gewalt. Wenn dich etwas belastet, sprich mit deiner Lehrkraft.</div>
  <p class="merksatz">Erklären heißt nicht entschuldigen.</p></div>`;
}
''')

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
  return `<p class="ab-unter"><span class="ab-frei">freiwillig</span> Dieses Extra gehört nicht zu den 90 Minuten und wird nicht benotet. Du brauchst dafür ein Gespräch. Das kann dir kein Programm abnehmen.</p>
  ${auftrag("Allein · mit einer erwachsenen Person", "Ein Gespräch über einen Satz", "In Auftrag 2 hast du drei Sätze geprüft. Solche Sätze hört man bis heute. Führ ein kurzes Gespräch und halte es hier fest – getippt oder von Hand auf dem ausgedruckten Blatt.")}
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
  return `<h1 class="ab-h eckig"><span class="ab-nr" aria-hidden="true">B</span><span>Am Beamer</span></h1>
  <p class="ab-meta">Für das Gerät der Lehrkraft · ohne Lösungen</p>
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
  document.querySelector(".ab-rahmen").classList.toggle("schmal", SCHMAL());
  kopf();
  const m = document.getElementById("main"), auf = AUF[AUFI(S.seite)], auf_offen = !auf || offen(S.seite);
  m.classList.toggle("breit", S.seite === "lehrkraft" || (S.seite === "zusammenfassung" && auf_offen));
  m.classList.toggle("dashboard", S.seite === "akte" && auf_offen);
  m.classList.toggle("weit", !!(auf && auf.weit) && S.seite !== "akte" && auf_offen);   // Aufträge, deren Material die Breite braucht (Entscheidung vom 16.11.2026)
  if (S.seite === "zusammenfassung" && auf_offen && !S.durch.zusammenfassung) { S.durch.zusammenfassung = true; speichere(); }
  m.innerHTML = blattzeile() + (auf ? blatt(auf) : SEITE_FN[S.seite]()) + (QUER() && !SCHMAL() ? "" : werkzeuge());
  m.querySelectorAll("[data-vt]").forEach(b => b.style.viewTransitionName = b.dataset.vt);
  if (LETZTE_SEITE !== S.seite) { const b = document.getElementById("band"); if (b && b.classList.contains("mit")) neu(b, "neu"); }
  LETZTE_SEITE = S.seite;
  if (fokus) { m.focus({ preventScroll:true }); window.scrollTo(0, 0); }
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
einmal('''<span class="fs" aria-label="Stand"><span class="${gel ? "ok" : ""}">''', '''<span class="fs" aria-label="Stand">${emp ? `<span class="emp">Empfehlung</span>` : ""}<span class="${gel ? "ok" : ""}">''')
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
# aktenStand() zählte die Marken der Karte nach ihrer Stelle; mit der Marke »Empfehlung« davor stimmt die Stelle nicht mehr
einmal('''sp = b.querySelector(".fs span:nth-child(2)"); if (sp) {''', '''sp = [...b.querySelectorAll(".fs span:not(.emp)")][1]; if (sp) {''')

einmal('''<summary style="cursor:pointer;min-height:40px;display:flex;''', '''<summary style="cursor:pointer;min-height:44px;display:flex;''')
# »Eingaben löschen« nimmt auch den Eintrag im Hefter weg (Stand und Satz der Lernspur); beim Start gleicht das Blatt den Hefter ab
einmal('''if (d.loeschen === "ja") { try { localStorage.removeItem(KEY); } catch(e) {} location.reload(); return; }''', '''if (d.loeschen === "ja") { try { localStorage.removeItem(KEY); } catch(e) {} GGKBlatt.vergiss("M22"); location.reload(); return; }''')
assert s.rstrip().endswith('</html>') and s.count('zeichne();\n</script>') == 1
s = s.replace('zeichne();\n</script>', 'zeichne();\nif (localStorage.getItem(KEY)) melde();   // Hefter abgleichen, falls schon gearbeitet wurde\n</script>')
# ---------------------------------------------------------------- Fußzeile der Datei
einmal('''  <p class="urheberzeile" style="font-size:1rem;opacity:.72;margin-top:1.5rem">''', '''  <p class="urheberzeile">''')

assert 'KA_INHALT' not in s and 'LABOR' not in s.replace('GGK-Labor', '') and 'loeschBereich' not in s, 'Reste'
(REPO / DATEI).write_text(s, 'utf-8')
print('M22 umgebaut:', len(s.encode()) // 1024, 'KB ·', n_klein, 'Schriftgrößen auf 1 rem gehoben')
