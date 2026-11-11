/* ===== M27 · Die Vergessenen! Eine Globalgeschichte des Zweiten Weltkriegs ===== */
const L = {
  key:"ggk-m27-vergessene:v1", nr:"M27", titel:"Die Vergessenen!", unter:"Eine Globalgeschichte des Zweiten Weltkriegs",
  /* Zeichen der Stunde: ein Globus, der auf dem Kopf steht */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><circle cx="17" cy="17" r="12" fill="none" stroke="#24221F" stroke-width="2.4"/><path d="M5 17h24M17 5c-6 7-6 17 0 24M17 5c6 7 6 17 0 24" fill="none" stroke="#24221F" stroke-width="1.8"/><path d="M12 23l5 6 5-6" fill="none" stroke="#9B402D" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  seiten:[["start","",""],["bild","0–10 Min.","Dein Bild vom Krieg"],["artikel","10–30 Min.","Der Artikel"],["karte","30–48 Min.","Eurozentrismus"],["struktur","48–70 Min.","Strukturbild"],["landkarte","70–78 Min.","Landkarte"],["schluss","78–90 Min.","Was fehlt?"],["zusammenfassung","Zum Abheften","Zusammenfassung"]],
  breit:["bild","artikel","karte","struktur","zusammenfassung","lehrkraft"],
  loesch:"Deine Orte, Jahre, Erkenntnisse, Hypothese, das Strukturbild, alle Texte werden auf diesem Gerät entfernt.",
  init:() => ({ orte:{ t1:"", r1:"", t2:"", r2:"", t3:"", r3:"" }, jahrA:"", jahrE:"", bildzu:false, art:{}, erk:{ e1:"", e2:"", e3:"" }, ueber:"", hyp:"", kartefrage:"", welt:{ sued:false, mitte:"eu" }, euro:"", sb:{ b:{}, e:{}, hand:null, n:0, gepr:false, hilfe:false }, pfeil:{ p1:"", p2:"", p3:"" }, schulbuch:"" }),
  nachEingabe(p){
    if (/^orte\.|^jahr/.test(p)) { const b = document.querySelector("[data-akt=bildfest]"); if (b) b.disabled = !bildBereit(); }
    if (p === "kartefrage") { const k = document.getElementById("kartenteil"); if (k && k.classList.contains("gesperrt") === (S.kartefrage.trim().length >= 10)) zeichneBehalte(); }
  },
  nachInit(){ weltAktualisieren(false); },
};
const REGIONEN = [["eu","Europa",15,50],["na","Nordafrika und Naher Osten",28,28],["af","Afrika südlich der Sahara",22,-4],["sa","Südasien (Indien)",79,22],["oa","Ostasien (China, Japan, Korea)",114,36],["so","Südostasien und Pazifik",135,2],["am","Amerika",-98,38],["xx","auf See oder weiß ich nicht",null,null]];
const ARTORTE = [
  ["fr","Frankreich, 1940",2.5,47,"Edouard Kouka Ouédraogo, Unteroffizier aus dem heutigen Burkina Faso, gerät am 4. Juni 1940 in deutsche Gefangenschaft.",true],
  ["bf","Burkina Faso (damals Obervolta)",-1.5,12.3,"Französische Kolonie. Von hier kommt Ouédraogo.",false],
  ["et","Äthiopien, 1935",39,9,"Italien überfällt Äthiopien. Für Karl Rössel beginnt hier der Krieg.",false],
  ["cn","China, 1937",112,33,"Japan greift China an. In Asien beginnt der Krieg spätestens jetzt.",false],
  ["ly","Libyen",17,27,"Kriegsschauplatz in Afrika. Auch Soldaten aus Südafrika kämpfen hier.",false],
  ["za","Südafrika",24,-29,"Tritt auf alliierter Seite in den Krieg ein. Tote werden nach Hautfarbe getrennt beerdigt.",false],
  ["in","Indien, 1944",79,23,"Japanischer Invasionsversuch. Subhas Chandra Bose kämpft an der Seite Japans.",false],
  ["kr","Korea",127.5,36.5,"Frauen aus Korea und anderen Ländern werden in japanische Militärbordelle gezwungen.",false],
  ["ph","Manila, Februar 1945",121,14.6,"Die Hauptstadt der Philippinen wird zerstört. Massaker an der Zivilbevölkerung.",false],
  ["pz","Pazifikinseln",165,-6,"Palmen werden für Flugpisten gefällt, Menschen verschleppt.",false],
  ["hi","Hiroshima, August 1945",132.5,34.4,"Atombombe – drei Monate nach dem 8. Mai.",false],
  ["ke","Kenia",38,0,"Im Jahr 2000 erhalten nur 330 Veteranen eine Rente.",false],
];
const MITTEN = { eu:[10,"Europa und Afrika"], pz:[160,"Pazifik"], am:[-90,"Amerika"] };
const bildBereit = () => [1,2,3].every(i => S.orte["t" + i].trim().length >= 2 && S.orte["r" + i]) && S.jahrA && S.jahrE;
const eigene = () => [1,2,3].map(i => ({ i, t:S.orte["t" + i], r:REGIONEN.find(x => x[0] === S.orte["r" + i]) })).filter(o => o.r && o.r[2] !== null);

/* ---------- Weltkarte ---------- */
function weltPos(lon, lat){ const c = MITTEN[S.welt.mitte][0]; const dx = ((lon - c + 540) % 360) - 180; let x = 360 + dx * 2, y = (90 - lat) * 2; if (S.welt.sued) { x = 720 - x; y = 360 - y; } return [x, y]; }
function welt(o = {}){
  const ich = S.bildzu ? eigene() : [], art = o.artikel ? ARTORTE.filter(a => S.art[a[0]]) : [];
  const c = MITTEN[S.welt.mitte][0];
  const pk = ich.map((e, k) => `<g class="pkt ich" data-lon="${e.r[2] + (e.i - 2) * 7}" data-lat="${e.r[3] + (k % 2) * 4}" style="transform:translate(${weltPos(e.r[2] + (e.i - 2) * 7, e.r[3] + (k % 2) * 4).join("px,")}px)"><circle r="8"/><text y="3">${e.i}</text><title>${esc(e.t)} (${esc(e.r[1])})</title></g>`).join("")
    + art.map(a => `<g class="pkt art" data-lon="${a[2]}" data-lat="${a[3]}" style="transform:translate(${weltPos(a[2], a[3]).join("px,")}px)"><path d="M0-8L7 5H-7Z"/><title>${esc(a[1])}</title></g>`).join("");
  const text = `Weltkarte, ${S.welt.sued ? "Süden" : "Norden"} oben, Mitte: ${MITTEN[S.welt.mitte][1]}. ${ich.length ? "Deine Orte: " + ich.map(e => e.t + " in " + e.r[1]).join("; ") + ". " : ""}${art.length ? "Aus dem Artikel: " + art.map(a => a[1]).join("; ") + "." : ""}`;
  return `<div class="weltwrap"><svg class="welt" id="welt" viewBox="0 0 720 360" role="img" aria-label="${esc(text)}">
    <g class="dreh" style="transform:rotate(${S.welt.sued ? 180 : 0}deg)"><g class="schub" style="transform:translateX(${-c * 2}px)"><path class="land" d="${LAND}"/><path class="land" d="${LAND}" transform="translate(720 0)"/><path class="land" d="${LAND}" transform="translate(-720 0)"/><line class="aeq" x1="-720" x2="1440" y1="180" y2="180"/></g></g>
    ${pk}<text class="rand" id="weltoben" x="360" y="14">${S.welt.sued ? "Süden" : "Norden"}</text><text class="rand" id="weltunten" x="360" y="354">${S.welt.sued ? "Norden" : "Süden"}</text></svg>
    <div class="kartenleg"><span><i></i>deine drei Orte</span>${o.artikel ? `<span><i class="t"></i>Orte aus dem Artikel</span>` : ""}<span>${status("modell", "Modell")}Plattkarte: Jede Weltkarte verzerrt. Landflächen: Natural Earth.</span></div></div>`;
}
function weltAktualisieren(){
  const w = document.getElementById("welt"); if (!w) return;
  w.querySelector(".dreh").style.transform = `rotate(${S.welt.sued ? 180 : 0}deg)`;
  w.querySelector(".schub").style.transform = `translateX(${-MITTEN[S.welt.mitte][0] * 2}px)`;
  w.querySelectorAll(".pkt").forEach(p => { const [x, y] = weltPos(+p.dataset.lon, +p.dataset.lat); p.style.transform = `translate(${x}px,${y}px)`; });
  document.getElementById("weltoben").textContent = S.welt.sued ? "Süden" : "Norden"; document.getElementById("weltunten").textContent = S.welt.sued ? "Norden" : "Süden";
  document.querySelectorAll("[data-akt=weltsued]").forEach(b => b.setAttribute("aria-pressed", String((b.dataset.w === "1") === S.welt.sued)));
  document.querySelectorAll("[data-akt=weltmitte]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.w === S.welt.mitte)));
  const live = document.getElementById("weltlive"); if (live) live.textContent = `${S.welt.sued ? "Süden" : "Norden"} oben, Mitte: ${MITTEN[S.welt.mitte][1]}.`;
}
function zaehlSatz(){
  const ich = eigene(), eu = ich.filter(e => e.r[0] === "eu").length, art = ARTORTE.filter(a => S.art[a[0]]), aeu = art.filter(a => a[5]).length;
  return `<p class="zahlsatz">Deine drei Orte: ${eu} in Europa, ${ich.length - eu} außerhalb.${art.length ? ` Aus dem Artikel: ${aeu} in Europa, ${art.length - aeu} außerhalb.` : ""}</p>`;
}

/* ---------- Seiten ---------- */
function start(){
  return `${band("M27 · Doppelstunde · 90 Minuten", "Die Vergessenen!", "Eine Globalgeschichte des Zweiten Weltkriegs: Wer kämpfte, wer litt – und von wem erzählen unsere Schulbücher?")}
  <p class="leitfrage">Welche Geschichten zum Zweiten Weltkrieg sind bekannt, welche nicht? Warum werden manche Geschichten erzählt und andere verschwiegen?</p>
  ${belastend("Der Artikel im Heft berichtet von Rassismus, Gewalt gegen Gefangene und Zivilist*innen und von Frauen, die zur Prostitution gezwungen wurden. Du darfst jederzeit aussetzen und mit deiner Lehrkraft sprechen.")}
  <h2 class="abschnitt">Am Ende kannst du</h2>
  <ul class="ziele"><li>Beispiele dafür nennen, wer im Zweiten Weltkrieg außerhalb Europas kämpfte und litt,</li><li>mit dem Begriff Eurozentrismus erklären, warum diese Menschen in europäischen Erzählungen fehlen,</li><li>in einem Strukturbild zeigen, wie aus Vergangenheit Geschichte wird und wie Geschichte auf Denken, Fühlen und Handeln wirkt.</li></ul>
  <h2 class="abschnitt">So läuft die Stunde</h2>
  <ol class="ablauf">${L.seiten.slice(1, 7).map(s => `<li><b>${esc(s[1])}</b><span>${esc(s[2])}</span></li>`).join("")}</ol>
  <p class="hinweis" style="margin-top:.8rem">Du brauchst dein Heft (M27, Artikel von Nils Sandrisser). Die Seite zeigt dir dein eigenes Bild vom Krieg – und was sich daran ändert.</p>
  ${weiter("bild", "Beginnen")}`;
}

function bild(){
  const z = S.bildzu, sel = (p) => `<select data-f="${p}" aria-label="Region" ${z ? "disabled" : ""}><option value="">Wo liegt das?</option>${REGIONEN.map(r => `<option value="${r[0]}" ${hol(p) === r[0] ? "selected" : ""}>${esc(r[1])}</option>`).join("")}</select>`;
  return `${zeitKopf("bild")}<h1>Dein Bild vom Krieg</h1>
  ${auftrag("Allein · 4 Minuten · ohne Heft", "Was fällt dir zuerst ein?", "Schreib drei Orte oder Ereignisse des Zweiten Weltkriegs auf – die ersten, die dir einfallen. Wähle zu jedem die Region. Beantworte dann die zwei Fragen und lege fest. Es gibt hier kein Richtig oder Falsch: Du hältst fest, was du im Kopf hast.")}
  <div class="karte"><div class="orte3">${[1,2,3].map(i => `<div class="oz"><b>${i}</b><input type="text" data-f="orte.t${i}" id="f-orte-t${i}" value="${esc(S.orte["t" + i])}" placeholder="Ort oder Ereignis" aria-label="Ort oder Ereignis ${i}" ${z ? "disabled" : ""} autocomplete="off">${sel("orte.r" + i)}</div>`).join("")}</div>
  <div class="felder2" style="margin-top:1rem"><div><label for="f-jahrA">Wann begann der Zweite Weltkrieg?</label><select id="f-jahrA" data-f="jahrA" ${z ? "disabled" : ""}><option value="">Jahr wählen</option>${["1931","1935","1937","1939","1941"].map(j => `<option ${S.jahrA === j ? "selected" : ""}>${j}</option>`).join("")}</select></div>
  <div><label for="f-jahrE">Wann endete er?</label><select id="f-jahrE" data-f="jahrE" ${z ? "disabled" : ""}><option value="">Datum wählen</option>${["8. Mai 1945","2. September 1945"].map(j => `<option ${S.jahrE === j ? "selected" : ""}>${j}</option>`).join("")}</select></div></div>
  <div class="reihe"><button type="button" class="btn dunkel" data-akt="bildfest" ${!z && bildBereit() ? "" : "disabled"}>Festlegen</button>${z ? `<button type="button" class="btn" data-akt="setz" data-p="bildzu" data-w="false">Noch einmal</button>` : ""}</div></div>
  ${z ? `<div id="bildauf"><h2 class="abschnitt">Deine Karte des Krieges</h2>${welt()}${zaehlSatz()}
  <p>Das ist kein Fehler – es ist ein Befund. Heb ihn auf. Nach dem Artikel siehst du, was auf deiner Karte fehlt.</p></div>` : ""}
  ${weiter("artikel", "Weiter: Der Artikel")}`;
}

function artikel(){
  const n = ARTORTE.filter(a => S.art[a[0]]).length;
  return `${zeitKopf("artikel")}<h1>Der Artikel</h1>
  ${auftrag("Allein · 10 Minuten · mit dem Heft", "Lesen und festhalten", "Lies im Heft den Artikel von Nils Sandrisser: „Kolonien stellten Kanonenfutter und füllten Bordelle“ (2015). Halte drei zentrale Erkenntnisse fest. Welche hat dich am meisten überrascht?")}
  <div class="feldgruppe">${eingabe("erk.e1", "Erkenntnis 1")}${eingabe("erk.e2", "Erkenntnis 2")}${eingabe("erk.e3", "Erkenntnis 3")}${textfeld("ueber", "Die größte Überraschung – und warum", { rows:2, zaehl:false })}</div>
  <h2 class="abschnitt">Orte aus dem Artikel</h2>
  ${auftrag("Allein · 3 Minuten", "Was steht im Text?", "Tippe die Orte an, die du im Artikel gefunden hast. Sie erscheinen als Dreiecke auf deiner Karte – neben deinen drei Punkten vom Anfang.")}
  <div class="artorte" role="group" aria-label="Orte aus dem Artikel">${ARTORTE.map(a => `<button type="button" data-akt="art" data-w="${a[0]}" aria-pressed="${!!S.art[a[0]]}"><b>${esc(a[1])}</b><small>${esc(a[4])}</small></button>`).join("")}</div>
  ${welt({ artikel:true })}
  ${S.bildzu ? zaehlSatz() : `<p class="hinweis">Deine drei Orte fehlen noch (Seite „Dein Bild vom Krieg“).</p>`}
  <p class="hinweis" aria-live="polite">${n} von ${ARTORTE.length} Orten eingetragen.</p>
  ${S.jahrA ? `<div class="auflage"><p><b>Und die Jahre?</b> Du hast als Beginn <b>${esc(S.jahrA)}</b> gewählt, als Ende <b>${esc(S.jahrE)}</b>.</p>
  <ul class="zl"><li><b>1935</b><span>Italien überfällt Äthiopien. „In Afrika würde jeder sagen, dass der Krieg 1935 angefangen hat“ (Karl Rössel).</span></li><li><b>1937</b><span>Japan greift China an. „In Asien begann der Krieg spätestens 1937“ (Rössel).</span></li><li><b>1939</b><span>Deutschland überfällt Polen. So steht es in den meisten europäischen Schulbüchern.</span></li><li><b>8. Mai 1945</b><span>Kapitulation Deutschlands: Ende des Krieges in Europa.</span></li><li><b>2. Sept. 1945</b><span>Kapitulation Japans nach den Atombomben im August: Ende des Krieges in Asien.</span></li></ul>
  <p style="margin-top:.5rem">Keine dieser Antworten ist einfach falsch. Welche „richtig“ wirkt, hängt davon ab, von wo aus man schaut.</p></div>` : ""}
  ${weiter("karte", "Weiter: Eurozentrismus")}`;
}

function karte(){
  const frei = S.kartefrage.trim().length >= 10;
  return `${zeitKopf("karte")}<h1>Eurozentrismus</h1>
  ${auftrag("Zu zweit · 5 Minuten", "Hypothese", "Diskutiert und haltet fest: Warum wurden diese Menschen in der Geschichte bisher so wenig beachtet? Schreibt eine Vermutung auf.")}
  ${textfeld("hyp", "Unsere Hypothese", { rows:3, anfaenge:["Diese Menschen wurden wenig beachtet, weil","Wer die Geschichte schreibt,","Es könnte auch daran liegen, dass"], zaehl:false })}
  <h2 class="abschnitt">Europa – wirklich in der Mitte der Welt?</h2>
  ${auftrag("Allein · 6 Minuten", "Erst eine Frage, dann die Karte", "Auf fast jeder Weltkarte, die du kennst, ist Norden oben und Europa in der Mitte. Schreib einen Satz: Wer hat das festgelegt – und könnte es auch anders sein?")}
  ${textfeld("kartefrage", "Meine Antwort", { rows:2, zaehl:false, platz:"Ich vermute, dass …" })}
  <div id="kartenteil" class="${frei ? "" : "gesperrt"}">
  <div class="kartenknopf" role="group" aria-label="Karte umstellen"><button type="button" data-akt="weltsued" data-w="0" ${frei ? "" : "disabled"}>Norden oben</button><button type="button" data-akt="weltsued" data-w="1" ${frei ? "" : "disabled"}>Süden oben</button><span class="tr" aria-hidden="true"></span><span class="hinweis">Mitte:</span>${Object.keys(MITTEN).map(k => `<button type="button" data-akt="weltmitte" data-w="${k}" ${frei ? "" : "disabled"}>${esc(MITTEN[k][1])}</button>`).join("")}</div>
  ${welt({ artikel:true })}<p class="sr" id="weltlive" aria-live="polite"></p>
  <p style="margin-top:.6rem">Dieselbe Erde, dieselben Orte. Keine der Ansichten ist falsch: Dass Norden oben liegt und Europa in der Mitte, ist eine Gewohnheit – entstanden dort, wo diese Karten gezeichnet wurden. <b>Achte darauf, wo deine Punkte und die Dreiecke jetzt liegen.</b></p></div>
  <h2 class="abschnitt">Der Begriff</h2>
  <blockquote>„Eurozentrismus, eine Einstellung, die Europa unhinterfragt in den Mittelpunkt des Denkens und Handelns stellt. […] Die europäische Geschichte und Gesellschaftsentwicklung wird als Norm verstanden, die erfüllt oder von der abgewichen wird, ohne die historische und kulturelle Partialität dieser Perspektive zu erkennen.“<span class="wer">Lexikon der Geographie, spektrum.de, Stichwort Eurozentrismus. Gekürzt. „Partialität“ heißt hier: Die Perspektive zeigt nur einen Teil.</span></blockquote>
  ${auftrag("Allein · 5 Minuten", "Erklären", "Erkläre mithilfe der Definition, weshalb viele Opfer in der europäischen Geschichtsschreibung unerwähnt bleiben. Nutze ein Beispiel aus dem Artikel.")}
  ${textfeld("euro", "Meine Erklärung", { rows:5, anfaenge:["Eurozentrismus bedeutet","Deshalb fehlen in europäischen Darstellungen","Ein Beispiel aus dem Artikel ist"], ziel:"Ziel: etwa 50 Wörter" })}
  ${raster("euro", 35, "Selbstprüfung", [["Begriff", "Ich nenne den Begriff.", "Ich erkläre ihn in eigenen Worten.", "Ich erkläre auch, warum er „unhinterfragt“ wirkt."],["Beispiel", "Ich nenne ein Beispiel.", "Ich verbinde Beispiel und Begriff.", "Ich zeige am Beispiel, was die europäische Erzählung weglässt."],["Vergleich mit der Hypothese", "–", "Ich sage, ob unsere Hypothese passt.", "Ich verbessere unsere Hypothese mit dem Begriff."]])}
  ${weiter("struktur", "Weiter: Strukturbild")}`;
}

/* ---------- Strukturbild (Lernaufgabe aus dem Heft) ---------- */
const SBB = [["v","Vergangenheit"],["p","Perspektivität"],["g","Geschichte"],["sk","Selbstkonzept"],["de","Denken"],["fu","Fühlen"],["ha","Handeln"]];
const SBE = [["v","Schwarze und weiße Soldaten befreien Frankreich"],["g","Weiße Soldaten stehen im Schulbuch"],["p","Eurozentrismus"],["sk","Überlegenheitsgefühl"],["de","„Schwarze haben nicht für Frankreich gekämpft“"],["fu","Keine Sympathie und Solidarität mit Schwarzen Soldaten"],["ha","Keine Unterstützung für Denkmäler oder Pensionen"]];
const SBSLOT = { sk:["sk"], v:["v"], p:["p"], g:["g"], d1:["de","fu","ha"], d2:["de","fu","ha"], d3:["de","fu","ha"] };
const SBTIPP = { v:"Was ist geschehen – egal, wer davon erzählt?", p:"Durch welche „Brille“ wird aus dem Geschehen eine Erzählung?", g:"Was wird am Ende erzählt, gedruckt, gelernt?", sk:"Was denkt eine Gruppe über sich selbst – und prägt damit ihren Blick?", d1:"Geschichte wirkt auf Kopf, Gefühl und Tat. Welche Ebene ist das?", d2:"Geschichte wirkt auf Kopf, Gefühl und Tat. Welche Ebene ist das?", d3:"Geschichte wirkt auf Kopf, Gefühl und Tat. Welche Ebene ist das?" };
const sbName = (liste, id) => (liste.find(x => x[0] === id) || [,""])[1];
const sbVoll = () => Object.keys(SBSLOT).every(s => S.sb.b[s] && S.sb.e[s]);
const sbBok = s => SBSLOT[s].includes(S.sb.b[s]);
const sbEok = s => sbBok(s) && S.sb.e[s] === S.sb.b[s];
const sbFertig = () => Object.keys(SBSLOT).every(s => sbBok(s) && sbEok(s));
function sbFeld(s, o = {}){
  const b = S.sb.b[s], e = S.sb.e[s], hand = S.sb.hand, gp = S.sb.gepr && !o.loesung;
  const B = o.loesung ? o.loesung[0] : (b ? sbName(SBB, b) : "Begriff"), E = o.loesung ? o.loesung[1] : (e ? sbName(SBE, e) : "Beispiel");
  const kl = gp ? `${b ? (sbBok(s) ? "ok" : "nein") : ""} ${e ? (sbEok(s) ? "eok" : "enein") : ""}` : "";
  const fb = gp && (b || e) ? ((sbBok(s) && sbEok(s)) ? "passt" : (!sbBok(s) ? "Begriff noch einmal prüfen: " + SBTIPP[s] : "Der Begriff passt. Beispiel noch einmal prüfen.")) : "";
  if (o.loesung) return `<div class="sbf" style="grid-area:${s}"><div class="ab b">${esc(B)}</div><div class="ab e">${esc(E)}</div>${s === "sk" ? `<div class="runter" aria-hidden="true">↓</div>` : ""}</div>`;
  return `<div class="sbf ${kl}" style="grid-area:${s}"><button type="button" class="ab b ${b ? "" : "leer"} ${hand && hand[0] === "b" ? "ziel" : ""}" data-akt="sbslot" data-art="b" data-slot="${s}" aria-label="Feld für einen Begriff: ${esc(b ? B : "leer")}">${esc(B)}</button><button type="button" class="ab e ${e ? "" : "leer"} ${hand && hand[0] === "e" ? "ziel" : ""}" data-akt="sbslot" data-art="e" data-slot="${s}" aria-label="Feld für ein Beispiel: ${esc(e ? E : "leer")}">${esc(E)}</button>${fb ? `<p class="fb">${esc(fb)}</p>` : ""}${s === "sk" ? `<div class="runter" aria-hidden="true">↓</div>` : ""}</div>`;
}
const sbPfeile = `<div class="pf" style="grid-area:a1" aria-hidden="true">→</div><div class="pf" style="grid-area:a2" aria-hidden="true">→</div><div class="pf drei" style="grid-area:a3" aria-hidden="true"><span>↗</span><span>→</span><span>↘</span></div>`;
function struktur(){
  const sb = S.sb, bFrei = SBB.filter(x => !Object.values(sb.b).includes(x[0])), eFrei = SBE.filter(x => !Object.values(sb.e).includes(x[0])), fertig = sb.gepr && sbFertig();
  return `${zeitKopf("struktur")}<h1>Wir erstellen ein Strukturbild</h1>
  ${auftrag("Allein oder zu zweit · 15 Minuten", "Begriffe ordnen, Beispiele zuordnen", "Bring die sieben Begriffe in eine sinnvolle Struktur und ordne jedem ein Beispiel zu. So geht es: Karte antippen, dann ein Feld antippen. Ein belegtes Feld antippen holt die Karte zurück. Wenn alles liegt: prüfen.")}
  <div class="sbpool" aria-label="Karten">
    <div class="pr"><span>Begriffe</span>${bFrei.map(x => `<button type="button" class="sbk" data-akt="sbkarte" data-k="b:${x[0]}" aria-pressed="${sb.hand === "b:" + x[0]}">${esc(x[1])}</button>`).join("") || `<span class="hinweis" style="font-weight:400">alle gelegt</span>`}</div>
    <div class="pr"><span>Beispiele</span>${eFrei.map(x => `<button type="button" class="sbk e" data-akt="sbkarte" data-k="e:${x[0]}" aria-pressed="${sb.hand === "e:" + x[0]}">${esc(x[1])}</button>`).join("") || `<span class="hinweis" style="font-weight:400">alle gelegt</span>`}</div>
  </div>
  <div class="sb" id="sb">${Object.keys(SBSLOT).map(s => sbFeld(s)).join("")}${sbPfeile}</div>
  <div class="reihe"><button type="button" class="btn dunkel" data-akt="sbpruef" ${sbVoll() && !sb.gepr ? "" : "disabled"}>Prüfen</button><span class="hinweis" aria-live="polite">${sb.gepr ? (fertig ? "Alle Felder passen." : "Grüne Kante: passt. Goldene Kante: noch einmal prüfen. Tippe das Feld an, um die Karte zurückzuholen.") : (sbVoll() ? "Alles liegt. Jetzt prüfen." : "Lege alle 14 Karten.")}</span></div>
  ${sb.n >= 1 && !fertig ? hilfe("Hilfe 1: Wo fängt es an?", "<p>Die Kette beginnt links mit dem, was geschehen ist, und endet rechts bei dem, was Menschen heute denken, fühlen und tun. Ein Begriff steht über der Kette und wirkt auf sie ein.</p>") + `<div class="reihe"><button type="button" class="btn" data-akt="sbhilfe">Hilfe 2: Begriffe an ihren Platz legen</button><span class="hinweis">Die Beispiele ordnest du weiter selbst zu.</span></div>` : ""}
  ${fertig ? `<div class="auflage" id="sbauf"><p><b>So liest du dein Bild.</b> Aus der <b>Vergangenheit</b> (was geschah) wird durch eine <b>Perspektive</b> eine <b>Geschichte</b> (was erzählt wird). Die Perspektive hängt vom <b>Selbstkonzept</b> ab – davon, wie eine Gruppe sich selbst sieht. Die erzählte Geschichte wirkt weiter auf <b>Denken, Fühlen und Handeln</b>.</p><p><b>Achtung:</b> Der Satz „Schwarze haben nicht für Frankreich gekämpft“ ist falsch. Er steht hier als Beispiel für ein Denken, das entsteht, wenn im Schulbuch nur weiße Soldaten vorkommen.</p></div>` : ""}
  <h2 class="abschnitt">Die Pfeile erklären</h2>
  ${auftrag("Allein · 5 Minuten", "Was bewirkt der Pfeil?", "Schreib zu jedem Pfeil einen Satz: Wie beeinflusst der eine Begriff den nächsten?")}
  <div class="feldgruppe">${textfeld("pfeil.p1", "Vergangenheit → Perspektivität → Geschichte", { rows:2, platz:"Aus Vergangenheit wird Geschichte, indem …", zaehl:false })}${textfeld("pfeil.p2", "Selbstkonzept ↓ Perspektivität", { rows:2, platz:"Das Bild von sich selbst prägt die Perspektive, weil …", zaehl:false })}${textfeld("pfeil.p3", "Geschichte → Denken, Fühlen, Handeln", { rows:2, platz:"Die erzählte Geschichte wirkt, indem …", zaehl:false })}</div>
  ${hilfe("Zwei Begriffe aus deinem Heft", "<p><b>Retrospektivität:</b> Wir wenden uns der Vergangenheit immer im Nachhinein zu, von der Gegenwart aus. Vergangenheit ist uns deshalb nur als Erzählung zugänglich.</p><p><b>Perspektivität:</b> Dieser Blick zurück ist an einen Standort gebunden. Ob eine Perspektive haltbar ist, zeigt die Prüfung der Triftigkeit: empirisch, narrativ, normativ.</p>")}
  ${weiter("landkarte", "Weiter: Landkarte")}`;
}

const LKCFG = { seite:"landkarte", titel:"Warum fehlen sie?", nach:["schluss","Weiter: Was fehlt?"],
  frage:"Millionen Menschen aus Afrika, Asien und Ozeanien kämpften und litten – und stehen in europäischen Schulbüchern kaum. Welches Prinzip der Landkarte erklärt das am besten?",
  lead:"Schreib einen Satz in der Sprache der Landkarte: Warum erzählen europäische Schulbücher den Krieg so?", platz:"Europäische Schulbücher erzählen so, weil …",
  folge:["Multiperspektivität (Folgerung)", "Ein Ereignis wird aus Quellen verschiedener Beteiligter betrachtet (z. B. Täter*innen, Opfer, Zuschauende)."],
  urteil:{
    "2-1-1":["teils","Wir blicken von heute zurück – und fragen heute anders als 1950. Dass die Kolonialsoldaten jetzt Thema werden, hat mit neuen Fragen der Gegenwart zu tun. Die Landkarte ordnet das dem zeitlichen Kontext zu (Standortgebundenheit, 2.1.8.3). Warum sie fehlten, erklärt es noch nicht."],
    "2-1-2":["zentral","„Wer erzählt, und mit welcher Weltanschauung und welchen Interessen?“ Europäische Autor*innen erzählten für europäische Leser*innen. Eurozentrismus ist eine solche Sichtweise – so steht es auch in deinem Strukturbild. Die Landkarte nennt auch die dritte Ebene: Wer liest mit welchen Erwartungen?"],
    "2-1-3":["teils","Keine Darstellung kann alles erzählen, das stimmt. Die Frage ist aber, warum gerade dieser Ausschnitt fehlt. Dafür braucht es ein Prinzip, das auf die Erzählenden schaut."],
    "2-1-4":["teils","„Was wurde ausgewählt, was weggelassen, und warum?“ – das ist die Leitfrage der Stunde. Die Auswahl ist aber die Folge. Die Ursache liegt davor: bei der Perspektive und beim Standort derer, die auswählen."],
    "2-1-5":["teils","Die Landkarte nennt genau dieses Beispiel: Aus der Kolonialzeit gibt es viele Akten der Verwaltung, aber wenige schriftliche Zeugnisse der Kolonisierten. Das verzerrt das Bild, bevor jemand erzählt. Es erklärt einen Teil – nicht, warum vorhandene Stimmen wie die von Ouédraogo so lange niemand druckte."],
    "2-1-6":["kaum","Dass Geschichte nur als Erzählung existiert, gilt immer. Es erklärt nicht, warum diese Erzählung bestimmte Menschen auslässt."],
    "2-1-7":["teils","„1935, 1937 oder 1939?“ zeigt: Aus denselben Fakten entstehen verschiedene Geschichten. Konstruiert heißt aber nicht beliebig – welche Fassung besser begründet ist, prüfst du mit den Triftigkeiten."],
    "2-1-8":["zentral","Die Landkarte nennt die geografische Perspektive ausdrücklich (2.1.8.1): Wo jemand lebt, prägt, was ihm selbstverständlich scheint. Für Europa beginnt der Krieg 1939 und endet am 8. Mai. Das Wort „unhinterfragt“ in der Definition von Eurozentrismus meint genau das."],
    "2-1-9":["teils","Multiperspektivität ist die Antwort auf das Problem, nicht seine Erklärung: Wer Quellen von Kolonialsoldaten, Zwangsarbeiter*innen und Zivilist*innen aus Asien und Afrika dazunimmt, erzählt den Krieg vollständiger."],
  },
  bruecke:`<b>Brücke zur Gegenwart.</b> Die Landkarte fragt unter <i>Agency</i>: „Wer darf an der Erinnerung mitwirken, wessen Geschichten werden gehört?“ Und unter <i>Erinnerungskultur</i>: Schulbücher sind zugleich „Konstrukteure und Konstruktionen von Erinnerungskultur“. <a href="${LK}3-1-4" target="_blank" rel="noopener">Landkarte 3.1.4 Erinnerungskultur ↗</a> · <a href="${LK}3-1-5" target="_blank" rel="noopener">3.1.5 Agency ↗</a>` };

function schluss(){
  return `${zeitKopf("schluss")}<h1>Was fehlt im Schulbuch?</h1>
  ${auftrag("Allein · 6 Minuten", "Ein Absatz, der fehlt", "Schreib vier bis fünf Sätze für ein Schulbuchkapitel über den Zweiten Weltkrieg – über jemanden oder etwas, das dort bisher fehlt. Begründe im letzten Satz, warum das hineingehört.")}
  ${textfeld("schulbuch", "Mein Absatz für das Schulbuch", { rows:6, anfaenge:["Im Zweiten Weltkrieg kämpften auch","Nach dem Krieg","Das gehört ins Schulbuch, weil"], ziel:"Ziel: etwa 60 Wörter" })}
  ${raster("schulbuch", 40, "Selbstprüfung", [["Inhalt", "Ich nenne eine Gruppe oder einen Ort.", "Ich nenne Gruppe, Ort und Zeit mit einem Beleg aus dem Artikel.", "Ich zeige, was die Menschen taten und was ihnen angetan wurde."],["Sprache", "Ich übernehme Wörter des Artikels.", "Ich schreibe sachlich und in eigenen Worten.", "Ich vermeide abwertende Wörter der Zeit oder setze sie in Anführungszeichen."],["Begründung", "Ich sage, dass es wichtig ist.", "Ich begründe mit Perspektivität oder Eurozentrismus.", "Ich sage, was sich im Denken, Fühlen oder Handeln ändern könnte."]])}
  ${auftrag("Plenum · 6 Minuten · iPad zu", "Vorlesen und fragen", "Drei von euch lesen ihren Absatz vor. Die anderen fragen: Wer müsste diese Geschichte erzählen? Welche Quelle bräuchten wir dafür?")}
  ${hilfe("Extra für Schnelle: Chimamanda Adichie", `<p>Sieh dir zu Hause den Vortrag „Die Gefahr einer einzigen Geschichte“ an und stelle ihre Kritik an einer solchen Geschichtsschreibung dar. <a href="https://www.youtube.com/watch?v=mgs2Do88zp0" target="_blank" rel="noopener">Vortrag auf YouTube öffnen ↗</a> (verlässt diese Seite; YouTube überträgt Daten an Google).</p>`)}
  <p class="merksatz">iPad umdrehen. Danach: Zusammenfassung sichern.</p>
  ${weiter("zusammenfassung", "Zur Zusammenfassung")}`;
}

function zusammenfassung(){
  const m = (t, leer = "noch offen") => `<p class="mein ${String(t || "").trim() ? "" : "leer"}">${esc(String(t || "").trim() || leer)}</p>`;
  const ich = eigene(), lkp = S.lk.ok && S.lk.prinzip ? ((PRINZIP[S.lk.prinzip] || LKCFG.folge)[0] + ": " + S.lk.grund) : "";
  const lsg = { v:["Vergangenheit","Schwarze und weiße Soldaten befreien Frankreich"], sk:["Selbstkonzept","Überlegenheitsgefühl"], p:["Perspektivität","Eurozentrismus"], g:["Geschichte","Weiße Soldaten stehen im Schulbuch"], d1:["Denken","„Schwarze haben nicht für Frankreich gekämpft“ (falsch!)"], d2:["Fühlen","Keine Sympathie und Solidarität"], d3:["Handeln","Keine Unterstützung für Denkmäler oder Pensionen"] };
  return `<div class="zf"><div class="reihe nodruck" style="margin:0 0 1rem"><button type="button" class="btn dunkel" data-drucken>Drucken oder als PDF sichern</button><span class="hinweis">Zwei Seiten A4. In GoodNotes ablegen.</span></div>
  <h1>M27 · Die Vergessenen!</h1>
  <p class="leitfrage">Welche Geschichten zum Zweiten Weltkrieg sind bekannt, welche nicht – und warum?</p>
  <p class="merksatz">Der Zweite Weltkrieg war ein Weltkrieg: Millionen Soldaten und Opfer kamen aus Kolonien in Afrika, Asien und Ozeanien. Dass sie in Europa kaum vorkommen, liegt nicht an der Vergangenheit, sondern an der Perspektive, aus der erzählt wird.</p>
  <h2>Begriffe</h2>
  <div class="begriffe">
    <div><b>Kolonialsoldaten:</b> Soldaten aus den Kolonien, vor allem in den Armeen Großbritanniens und Frankreichs. Beispiel: Edouard Kouka Ouédraogo aus dem heutigen Burkina Faso.</div>
    <div><b>Eurozentrismus:</b> eine Einstellung, die Europa unhinterfragt in den Mittelpunkt des Denkens und Handelns stellt.</div>
    <div><b>Perspektivität:</b> Jede Betrachtung erfolgt aus einer bestimmten Sichtweise, geprägt von Überzeugungen, Interessen und Erfahrungen.</div>
    <div><b>Standortgebundenheit:</b> Wer Geschichte erzählt, ist durch seinen gesellschaftlichen und kulturellen Gesamtkontext geprägt, oft unbewusst – auch durch den Ort.</div>
    <div><b>Selbstkonzept:</b> das Bild, das ein Mensch oder eine Gruppe von sich selbst hat. Es prägt die Perspektive.</div>
    <div><b>Erinnerungskultur:</b> alle Formen, in denen eine Gesellschaft bewusst an Vergangenes erinnert – auch Schulbücher.</div>
  </div>
  <h2>Wann begann, wann endete der Krieg?</h2>
  <ul class="zl"><li><b>1935</b><span>Italien überfällt Äthiopien (Beginn aus afrikanischer Sicht, nach Karl Rössel).</span></li><li><b>1937</b><span>Japan greift China an (Beginn aus asiatischer Sicht).</span></li><li><b>1939</b><span>Deutschland überfällt Polen (Beginn aus europäischer Sicht).</span></li><li><b>8. Mai 1945</b><span>Ende des Krieges in Europa.</span></li><li><b>2. Sept. 1945</b><span>Kapitulation Japans: Ende des Krieges in Asien.</span></li></ul>
  <h2>Strukturbild ${status("modell", "Modell")}</h2>
  <div class="sb klein" role="img" aria-label="Strukturbild: Vergangenheit führt über Perspektivität zu Geschichte; Selbstkonzept wirkt auf Perspektivität; Geschichte wirkt auf Denken, Fühlen und Handeln. Zu jedem Begriff steht ein Beispiel.">${Object.keys(SBSLOT).map(s => sbFeld(s, { loesung:lsg[s] })).join("")}${sbPfeile}</div>
  <div class="werk"><b>Denkwerkzeug: Drei Fragen an jede Erzählung.</b> 1. Von wo aus wird erzählt (Ort, Zeit, Gruppe)? 2. Wer kommt vor – und wer fehlt? 3. Was ändert sich, wenn ich die Karte drehe: Wie würde dieselbe Geschichte von dort aus klingen?</div>

  <div class="seitenumbruch"><h2 style="margin-top:0">Meine Ergebnisse</h2>
  <h2>Mein Bild vom Krieg am Anfang</h2>${m(S.bildzu ? `${[1,2,3].map(i => S.orte["t" + i]).join(" · ")} – davon ${ich.filter(e => e.r[0] === "eu").length} in Europa. Beginn: ${S.jahrA}, Ende: ${S.jahrE}.` : "")}
  <h2>Erkenntnisse aus dem Artikel</h2>${m([S.erk.e1, S.erk.e2, S.erk.e3].filter(x => x && x.trim()).map((x, i) => (i + 1) + ". " + x).join("\n"))}${m(S.ueber ? "Größte Überraschung: " + S.ueber : "", "")}
  <h2>Unsere Hypothese</h2>${m(S.hyp)}
  <h2>Eurozentrismus: meine Erklärung</h2>${m(S.euro)}
  <h2>Die Pfeile im Strukturbild</h2>${m([S.pfeil.p1 && "Vergangenheit → Geschichte: " + S.pfeil.p1, S.pfeil.p2 && "Selbstkonzept → Perspektivität: " + S.pfeil.p2, S.pfeil.p3 && "Geschichte → Denken, Fühlen, Handeln: " + S.pfeil.p3].filter(Boolean).join("\n"))}
  <h2>Landkarte</h2>${m(lkp)}
  <h2>Mein Absatz für das Schulbuch</h2>${m(S.schulbuch)}</div></div>
  ${weiter("start", "Zur Startseite")}`;
}

function lehrkraft(){
  return `<div class="lk"><p class="zeit"><span class="nr">Für Lehrkräfte</span><span>nicht geschützt</span></p><h1>M27 · Hinweise</h1>
  <p class="lead">Grundlage ist dein Heft, M27: zentrale Frage, Artikel von Nils Sandrisser mit Erkenntnissen und größter Überraschung (10 Min.), Hypothese zu zweit (5 Min.), Eurozentrismus mit Weltkarte und Definition (5 Min.), Extra Adichie, Lernaufgabe Strukturbild in zwei Fassungen (15 Min.).</p>
  <h2 class="abschnitt">Was das Gerät hier leistet</h2>
  <ul><li><b>Das eigene Bild sichtbar machen:</b> Drei Orte, Beginn und Ende des Krieges – festgelegt vor dem Lesen. Die Seite zeigt sie als Punkte auf einer Weltkarte und zählt: wie viele in Europa?</li><li><b>Vorher neben nachher:</b> Die Orte aus dem Artikel kommen als Dreiecke dazu. Der Abstand ist der Gesprächsanlass.</li><li><b>Die Karte drehen:</b> Süden oben, Pazifik in der Mitte – dieselben Punkte wandern mit. Das ersetzt das Poster im Heft (Bildrechte) und ist die eine Bewegung der Stunde; vorher steht eine Frage.</li><li><b>Strukturbild zum Legen:</b> 14 Karten, Rückmeldung je Feld erst nach dem Prüfen, zwei Hilfen, danach die Pfeile erklären. Die Lösung erscheint erst auf der Zusammenfassung.</li><li><b>Landkarten-Moment</b> und ein eigener Absatz „fürs Schulbuch“ als Produkt.</li></ul>
  <p>Papier bleibt besser für: den Artikel (Heft) und das Vorlesen im Plenum.</p>
  <h2 class="abschnitt">Ablauf (90 Minuten)</h2>
  <div class="matrix-wrap"><table><thead><tr><th>Zeit</th><th>Phase</th><th>Sozialform</th><th>Hinweis</th></tr></thead><tbody>
  <tr><td class="n">0–10</td><td>Dein Bild vom Krieg</td><td>allein, dann Beamer</td><td>4 Min. festlegen; eine Karte am Beamer zeigen und zählen lassen</td></tr>
  <tr><td class="n">10–30</td><td>Der Artikel</td><td>allein, mit Heft</td><td>Lesen 10, Erkenntnisse 5, Orte und Jahre 5</td></tr>
  <tr><td class="n">30–48</td><td>Eurozentrismus</td><td>zu zweit, allein</td><td>Hypothese 5, Karte 6, Definition und Erklärung 7</td></tr>
  <tr><td class="n">48–70</td><td>Strukturbild</td><td>frei wählbar</td><td>Legen 15, Pfeile 5; ein Bild am Beamer besprechen</td></tr>
  <tr><td class="n">70–78</td><td>Landkarte</td><td>allein</td><td>Perspektivität, Standortgebundenheit</td></tr>
  <tr><td class="n">78–90</td><td>Was fehlt?</td><td>allein, Plenum</td><td>Absatz 6, Vorlesen 6</td></tr></tbody></table></div>
  <p class="hinweis">Zeitdiagnose bei 150 Wörtern pro Minute (gemessen): Der Artikel im Heft hat rund 970 Wörter – 6 bis 7 Minuten, mit Markieren 10. Die Seite selbst hat rund 1.600 Wörter Lesetext (gut 10 Minuten). Mit Schreiben, Legen und Plenum füllt das 90 Minuten ohne Puffer.</p>
  <h2 class="abschnitt">Kürzungen zur Auswahl</h2>
  <ul><li><b>K1 · Einzelstunde (45 Min.):</b> Dein Bild (6) · Artikel als Hausaufgabe vorab, im Unterricht nur Orte und Jahre (8) · Karte und Begriff (10) · Strukturbild mit Hilfe 2 (15) · Plenum (6).</li><li><b>K2</b> Landkarten-Moment gemeinsam am Beamer: 4 Minuten frei.</li><li><b>K3</b> Absatz fürs Schulbuch als Hausaufgabe: 6 Minuten frei.</li></ul>
  <h2 class="abschnitt">Abweichungen vom Heft</h2>
  <ul><li>Anrede „du“ (Heft: „Sie“).</li><li>Der Artikel (welt.de, 22.06.2015) bleibt im Heft; die Seite fasst nur Orte in je einem Satz zusammen.</li><li>Das Foto des rassistischen „Vermessens“ (Stadtarchiv Münster) und das Poster der Upside-down-Weltkarte (interkart.de) sind nicht übernommen: Rechte, und beim Foto die Würde des Abgebildeten. Die drehbare Karte beruht auf gemeinfreien Daten (Natural Earth).</li><li>Im Strukturbild sind die Felder vorgegeben (zweite Fassung im Heft). Die freie Fassung bleibt auf Papier möglich.</li><li>Die Zuordnung „Schwarze haben nicht für Frankreich gekämpft“ → Denken ist als falsche Vorstellung gekennzeichnet.</li><li>Schreibweise „Schwarze Soldaten“ mit großem S als Selbstbezeichnung – bitte nach deiner Linie anpassen.</li><li>Ergänzt: 2. September 1945 (Kapitulation Japans) als Gegenstück zum 8. Mai.</li><li>Einstufungen im Landkarten-Moment (zentral: Perspektivität, Standortgebundenheit) sind ein Vorschlag von Claude. Wortlaut aus der Landkarte 2.1.</li></ul>
  <h2 class="abschnitt">Vor dem Einsatz prüfen</h2>
  <ul><li>Die Kurzsätze zu den zwölf Orten gegen den Artikel im Heft lesen.</li><li>Buch: Rheinisches JournalistInnenbüro (Hg.): Unsere Opfer zählen nicht. Die Dritte Welt im Zweiten Weltkrieg, bpb-Schriftenreihe Bd. 10408, Bonn 2014.</li><li>Auswahl der Jahre zum Kriegsbeginn (1931, 1935, 1937, 1939, 1941): 1931 und 1941 stehen nicht im Artikel; sie sind als weitere mögliche Antworten gedacht.</li></ul>
  <h2 class="abschnitt">Nur du kannst das</h2>
  <ul><li>Lernende mit Familiengeschichte in ehemaligen Kolonien oder mit Rassismuserfahrung im Blick behalten; niemand muss „für eine Gruppe“ sprechen.</li><li>Den Abschnitt zu erzwungener Prostitution vorab ankündigen.</li><li>iPad in Safari hoch und quer, Beamer, VoiceOver, Moodle.</li></ul>
  <h2 class="abschnitt">Nach der Stunde</h2>
  <div class="matrix-wrap"><table><thead><tr><th>Beobachtung</th><th>Notiz</th></tr></thead><tbody><tr><td>Wie viele der drei ersten Orte lagen in Europa (grob, im Kurs)?</td><td></td></tr><tr><td>Hat das Drehen der Karte ein Gespräch ausgelöst – oder war es nur ein Effekt?</td><td></td></tr><tr><td>Wo hakte das Strukturbild (Selbstkonzept? Denken/Fühlen/Handeln)?</td><td></td></tr><tr><td>Zeit: Wo wurde es eng?</td><td></td></tr></tbody></table></div>
  <p class="hinweis" style="margin-top:1rem">Speicherschlüssel <code>${L.key}</code>. Eingaben bleiben im Browser des Geräts.</p></div>
  ${weiter("start", "Zur Startseite")}`;
}

AKTION.bildfest = (t, ev) => { S.bildzu = true; speichere(); zeichneBehalte(); if (ev.detail !== 0) neu(document.getElementById("bildauf"), "neu"); };
AKTION.art = t => { const k = t.dataset.w; if (S.art[k]) delete S.art[k]; else S.art[k] = 1; speichere(); zeichneBehalte(); };
AKTION.weltsued = t => { S.welt.sued = t.dataset.w === "1"; speichere(); weltAktualisieren(); };
AKTION.weltmitte = t => { S.welt.mitte = t.dataset.w; speichere(); weltAktualisieren(); };
AKTION.sbkarte = t => { S.sb.hand = S.sb.hand === t.dataset.k ? null : t.dataset.k; speichere(); zeichneBehalte(); };
AKTION.sbslot = t => { const sb = S.sb, art = t.dataset.art, s = t.dataset.slot; if (sb.hand && sb.hand[0] === art) { sb[art][s] = sb.hand.slice(2); sb.hand = null; } else if (!sb.hand && sb[art][s]) { delete sb[art][s]; } else return; sb.gepr = false; speichere(); zeichneBehalte(); };
AKTION.sbpruef = (t, ev) => { S.sb.n++; S.sb.gepr = true; speichere(); zeichneBehalte(); if (ev.detail !== 0) neu(document.getElementById("sbauf"), "neu"); };
AKTION.sbhilfe = () => { S.sb.b = { sk:"sk", v:"v", p:"p", g:"g", d1:"de", d2:"fu", d3:"ha" }; S.sb.hilfe = true; S.sb.gepr = false; S.sb.hand = null; speichere(); zeichneBehalte(); };
const SEITE_FN = { start, bild, artikel, karte, struktur, landkarte:() => landkarte(LKCFG), schluss, zusammenfassung, lehrkraft };
kernStart();
