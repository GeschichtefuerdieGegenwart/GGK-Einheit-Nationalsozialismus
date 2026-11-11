/* ===== M26 · Ende gut, alles gut? Kontinuitäten des Nationalsozialismus ===== */
const BEREICHE = [["bnd","BND (Geheimdienst)"],["justiz","Justiz (Richter und Staatsanwälte)"],["medizin","Medizin (Ärzt*innen)"],["bundeswehr","Bundeswehr (Offiziere)"],["aa","Auswärtiges Amt (Diplomaten)"],["polizei","Polizei (Kriminal- und Ordnungspolizei)"]];
const GRUPPEN = BEREICHE.slice(1);
const STUFEN = ["–","gering","mittel","hoch","sehr hoch"];
const L = {
  key:"ggk-m26-kontinuitaeten:v1", nr:"M26", titel:"Ende gut, alles gut?", unter:"Kontinuitäten des Nationalsozialismus",
  /* Zeichen der Stunde: eine Akte, die weiterwandert */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><path d="M4 9h9l3 4h14v16H4z" fill="none" stroke="#24221F" stroke-width="2.4" stroke-linejoin="round"/><path d="M10 21h12m-4-4 4 4-4 4" fill="none" stroke="#9B402D" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  seiten:[["start","",""],["schaetzen","0–6 Min.","Schätzen"],["bnd","6–21 Min.","Der BND"],["gruppe","21–46 Min.","Eure Gruppe"],["vergleich","46–71 Min.","Vergleich"],["urteil","71–90 Min.","Urteil"],["zusammenfassung","Zum Abheften","Zusammenfassung"]],
  breit:["schaetzen","bnd","gruppe","vergleich","urteil","zusammenfassung","lehrkraft"],
  loesch:"Schätzung, Antworten zum BND, Steckbrief, Vergleichstafel, Gründe, Urteil und Stimme werden auf diesem Gerät entfernt.",
  init:() => ({ pos:{ start:50, ende:50, ref:false }, schaetz:{ n:5, zu:false }, bnd:{ a:"", b:"", c:"", d:"" }, bereich:null, steck:{ f1:"", f2:"", f3:"", f4:"", beleg:"", quelle:"" }, tafel:{}, gruende:{ g1:"", g2:"", g3:"" }, wo:"", urteil:"", stimme:null }),
  nachEingabe(p){
    if (p === "schaetz.n") { const z = document.getElementById("schaetzzahl"); if (z) z.textContent = S.schaetz.n; const f = document.getElementById("pf-ich"); if (f) f.innerHTML = punkte(S.schaetz.n); }
    if (p === "pos.start" || p === "pos.ende") { const w = document.getElementById("w-" + p.split(".")[1]); if (w) w.textContent = posWort(hol(p)); }
  },
};
const posWort = v => v < 35 ? "eher Neuanfang" : (v > 65 ? "eher Weiter-so" : "dazwischen");
/* Punktefeld (Muster Y aus M22): 100 Punkte = 100 Mitarbeiter. n gefüllt; von n bis n2 schraffiert (Spanne). */
function punkte(n, n2 = n){
  let s = ""; for (let i = 0; i < 100; i++) { const x = 7 + (i % 10) * 14, y = 7 + Math.floor(i / 10) * 14; s += `<circle cx="${x}" cy="${y}" r="5" class="${i < n ? "voll" : (i < n2 ? "halb" : "leer")}"/>`; }
  return `<svg viewBox="0 0 140 140" aria-hidden="true">${s}</svg>`;
}
const stufe = b => ((S.tafel || {})[b] || {}).s || 0;
const stichwort = b => ((S.tafel || {})[b] || {}).w || "";
function stufenWahl(b){ return `<div class="stufen" role="group" aria-label="Stärke der Kontinuität">${[1,2,3,4].map(i => `<button type="button" data-akt="stufe" data-b="${b}" data-w="${i}" aria-pressed="${stufe(b) === i}">${STUFEN[i]}</button>`).join("")}</div>`; }

function start(){
  return `${band("M26 · Doppelstunde · 90 Minuten", "Ende gut, alles gut?", "1945 endet die NS-Diktatur. Deutschland soll demokratisch neu aufgebaut werden. Aber wer baut auf?")}
  <p class="leitfrage">Wie viel Nationalsozialismus steckte in der Bundesrepublik?</p>
  <p>Die Alliierten begannen 1945 mit der <b>Entnazifizierung</b>: Mitglieder der NSDAP und NS-Täter sollten aus wichtigen Positionen entfernt werden. Wie gründlich war dieser Neuanfang wirklich?</p>
  <h2 class="abschnitt">Am Ende kannst du</h2>
  <ul class="ziele"><li>an einem Bereich zeigen, wo nach 1945 dieselben Menschen weiterarbeiteten,</li><li>mindestens drei Gründe nennen, warum das möglich war,</li><li>begründet beurteilen, ob die Bundesrepublik trotzdem ein demokratischer Neuanfang war.</li></ul>
  <h2 class="abschnitt">So läuft die Stunde</h2>
  <ol class="ablauf">${L.seiten.slice(1, 6).map(s => `<li><b>${esc(s[1])}</b><span>${esc(s[2])}</span></li>`).join("")}</ol>
  <p class="hinweis" style="margin-top:.8rem">Du brauchst dein Heft (M26, Text zum BND). Die Seite ersetzt den Text nicht – sie sammelt deine Schätzung, eure Ergebnisse und dein Urteil.</p>
  ${weiter("schaetzen", "Beginnen")}`;
}

function schaetzen(){
  const z = S.schaetz;
  return `${zeitKopf("schaetzen")}<h1>Erst schätzen</h1>
  ${auftrag("Allein · 3 Minuten", "Zwei Festlegungen", "Bevor du etwas liest: Leg dich zweimal fest. Du kommst am Ende darauf zurück.")}
  <div class="karte"><h3 class="klein" style="margin-top:0">1 · Neuanfang oder Weiter-so?</h3><p>Wie stellst du dir die frühe Bundesrepublik vor – in ihren Behörden, Gerichten, Krankenhäusern?</p>
    <div class="g"><div class="g-skala"><div class="g-skala__spur"><input type="range" min="0" max="100" step="1" value="${S.pos.start}" data-f="pos.start" ${z.zu ? "disabled" : ""} aria-label="Erste Einschätzung: Neuanfang (0) bis Weiter-so (100)"></div><div class="g-skala__enden"><span>Neuanfang mit neuen Leuten</span><span>Weiter-so mit dem alten Personal</span></div><p>Deine Einschätzung: <span class="g-skala__wert" id="w-start">${posWort(S.pos.start)}</span></p></div></div></div>
  <div class="karte"><h3 class="klein" style="margin-top:0">2 · Der Geheimdienst</h3><p>Der Bundesnachrichtendienst (BND) ist der Auslandsgeheimdienst der Bundesrepublik. Stell dir 100 seiner Mitarbeiter in den frühen Jahren vor. <b>Wie viele von ihnen waren nach deiner Schätzung im Nationalsozialismus an Mordaktionen beteiligt?</b></p>
    <label for="f-schaetz-n">Meine Schätzung: <span id="schaetzzahl">${z.n}</span> von 100</label><input type="range" id="f-schaetz-n" min="0" max="50" step="1" value="${z.n}" data-f="schaetz.n" ${z.zu ? "disabled" : ""} style="width:100%;accent-color:var(--kuli);height:32px">
    <div class="reihe"><button type="button" class="btn dunkel" data-akt="schaetzfest" ${z.zu ? "disabled" : ""}>Festlegen</button>${z.zu ? `<span class="g"><span class="g-stempel" style="width:auto;height:auto;border-radius:.4rem;padding:.3rem .7rem;transform:rotate(-3deg)">Festgelegt</span></span>` : ""}</div></div>
  <div class="auflage" id="schaetzauf" ${z.zu ? "" : "hidden"}>
    <p><b>Drei Zahlen nebeneinander.</b> Jeder Punkt steht für einen von 100 Mitarbeitern.</p>
    <div class="pfelder"><figure><div class="pf ich" id="pf-ich">${punkte(z.n)}</div><figcaption><b>${z.n} von 100</b>Deine Schätzung</figcaption></figure>
      <figure><div class="pf gehlen">${punkte(1)}</div><figcaption><b>1 von 100</b>Das sagte BND-Chef Reinhard Gehlen dem Kanzleramt: „Ein Prozent“.</figcaption></figure>
      <figure><div class="pf studie">${punkte(10, 20)}</div><figcaption><b>10 bis 20 von 100</b>Das ergab die Studie des Historikers Gerhard Sälter.</figcaption></figure></div>
    <p class="quelle">${status("beleg", "belegt")}Zahlen nach tagesschau.de, 10.10.2022 (Christine Rütten, hr): „Neue Studie: BND rekrutierte gezielt NS-Verbrecher“ – der Text steht in deinem Heft. ${status("modell", "Modell")}Die Punkte veranschaulichen den Anteil. Sie zeigen keine einzelnen Personen; die schraffierten Punkte stehen für die Spanne.</p>
    <p><b>Frage für die Stunde:</b> Wie kommt es zu dem Abstand zwischen „ein Prozent“ und „10 bis 20 Prozent“ – und warum fiel er so lange niemandem auf?</p></div>
  ${weiter("bnd", "Weiter: Der BND")}`;
}

/* ---------- Der BND-Text als Akte (Text aus dem Heft, Datei texte/m26-bnd.js nur im Moodle-Paket) ---------- */
const T26 = window.TEXT_M26 || null;
const p26 = t => t.map(x => `<p>${esc(x)}</p>`).join("");
const personKarte = p => { const m = p.name.match(/^([^(]+)\s*\((.+)\)\s*$/); return `<div class="pakte"><span class="preiter">Personalakte</span><h4>${esc(m ? m[1].trim() : p.name)}</h4>${m ? `<p class="pmeta">${esc(m[2])}</p>` : ""}${p26(p.saetze)}</div>`; };
function akteKarte(k, i){
  const kopf = `<p class="anr">${i + 1}</p><h3>${esc(k.titel)}</h3>`;
  if (k.personen) return `<section class="akarte personen">${kopf}<div class="pzwei">${k.personen.map(personKarte).join("")}</div></section>`;
  if (i === 0) return `<section class="akarte studie">${kopf}<div class="sgross"><span class="zahl">10–20&nbsp;%</span><span class="pf studie klein" aria-hidden="true">${punkte(10, 20)}</span></div>${p26(k.saetze)}</section>`;
  if (/vier Lügen/.test(k.titel)) { const q = k.saetze.join(" ").match(/„([^“]+)“/), l = q ? q[1].replace(/\[[^\]]*\]/g, "").split(",").map(x => x.trim()).filter(Boolean) : [];
    return `<section class="akarte luegen">${kopf}${l.length === 4 ? `<ol class="vier" aria-label="Die vier Behauptungen">${l.map(x => `<li>${esc(x)}</li>`).join("")}</ol>` : ""}${p26(k.saetze)}</section>`; }
  return `<section class="akarte ${/Bilanz/.test(k.titel) ? "bilanz" : ""}">${kopf}${p26(k.saetze)}</section>`;
}
function akte(){
  const t = T26;
  return `<article class="akte" aria-label="Text: ${esc(t.titel)}"><div class="akopf"><span class="areiter">Akte · Bundesnachrichtendienst</span><h2>${esc(t.titel)}</h2><p class="ameta">${esc(t.autor)} · tagesschau.de, 10.10.2022</p><p class="alead">${esc(t.lead)}</p></div>
  ${t.karten.map(akteKarte).join("")}<p class="quelle">${esc(t.nachweis)}</p></article>`;
}
/* Schaubild: Kette des Wegsehens (aus dem Text abgeleitet; Modell) */
const KETTE = `<div class="kette" role="img" aria-label="Schaubild Kette des Wegsehens: NS-Täter wie Schreiber und Grauer werden von Gehlen für den BND angeworben. Gehlen meldet dem Kanzleramt: ein Prozent, alle überprüft. Das Kanzleramt unter Globke, selbst belastet, akzeptiert. Adenauer nutzt den BND gegen die SPD und greift nicht ein.">
  <div class="kg"><b>NS-Täter</b><span>z. B. Schreiber (Oradour, Einsatzgruppe B), Grauer (Einsatzgruppe A)</span></div><div class="kp" aria-hidden="true"><span>angeworben von</span>→</div>
  <div class="kg"><b>Reinhard Gehlen</b><span>BND-Chef ab 1956</span></div><div class="kp" aria-hidden="true"><span>meldet: „Ein Prozent … alle ok“</span>→</div>
  <div class="kg"><b>Kanzleramt</b><span>Chef Hans Globke, selbst belastet: akzeptiert</span></div><div class="kp" aria-hidden="true"><span>Kontrolle bei</span>→</div>
  <div class="kg"><b>Konrad Adenauer</b><span>nutzt den BND gegen die SPD, greift nicht ein</span></div></div>
  <p class="hinweis">${status("modell", "Modell")}Schaubild aus dem Text: Es zeigt, wer wen gewähren ließ. Was lässt es weg? Zum Beispiel, wer außerhalb der Regierung nachfragte – und warum Kritik als „übertrieben“ galt.</p>`;
function bnd(){
  const fragen = `<div class="feldgruppe">
  ${textfeld("bnd.a", "a) Welche Personen wurden vom BND gezielt angeworben?", { rows:2, zaehl:false })}
  ${textfeld("bnd.b", "b) Welche Rolle spielte Reinhard Gehlen bei der Personalpolitik des BND?", { rows:2, zaehl:false })}
  ${textfeld("bnd.c", "c) Wie rechtfertigte der BND die Einstellung ehemaliger NS-Täter? Zitiere aus dem Text.", { rows:2, platz:"„…“", zaehl:false })}
  ${textfeld("bnd.d", "d) Warum griff das Bundeskanzleramt nicht ein?", { rows:2, zaehl:false })}
  </div>`;
  if (!T26) return `${zeitKopf("bnd")}<h1>Der BND</h1>
  ${auftrag("Allein · 15 Minuten · mit dem Heft", "Text lesen, vier Fragen", "Lies im Heft den Text „Neue Studie: BND rekrutierte gezielt NS-Verbrecher“ (M26, Arbeitsauftrag 1). Beantworte dann die vier Fragen in Stichworten oder kurzen Sätzen. Bei c) zitierst du wörtlich.")}
  ${fragen}${VGL()}${EINSTUFUNG()}`;
  return `${zeitKopf("bnd")}<h1>Der BND</h1>
  ${auftrag("Allein · 15 Minuten", "Die Akte lesen, vier Fragen", "Lies die Akte Karte für Karte. Beantworte daneben die vier Fragen in Stichworten oder kurzen Sätzen. Bei c) zitierst du wörtlich.")}
  <div class="lesepult"><div>${akte()}</div><aside class="fragenspalte" aria-label="Vier Fragen">${fragen}</aside></div>
  ${VGL()}${EINSTUFUNG()}`;
}
const VGL = () => `${vergleich("bnd", ["bnd.a","bnd.b","bnd.c","bnd.d"], 15, "Mit dem Text vergleichen", `<p><b>Das steht im Text.</b> Vergleiche und ergänze deine Antworten.</p><ul style="padding-left:1.2rem;display:grid;gap:.3rem"><li><b>a)</b> Ehemalige SS- und Gestapoleute – darunter Männer, die an Mordaktionen beteiligt waren. Der Text nennt Helmut Schreiber und Gustav Grauer.</li><li><b>b)</b> Gehlen, Chef des BND ab 1956, warb sie gezielt an. Der Historiker Sälter: „Da hat sich keiner reingeschlichen, sondern man hatte eine Leitung, die die einfach gewollt hat.“</li><li><b>c)</b> Gehlen antwortete auf Nachfragen stets: „Ein Prozent [NS-Belastete], alle entnazifiziert, alle überprüft, alle ok.“ Kritik von außen galt als „übertrieben“.</li><li><b>d)</b> Das Kanzleramt nahm diese Antworten hin. Sein Chef Hans Globke war selbst belastet. Laut Text nutzte Adenauer den BND für parteipolitische Zwecke.</li></ul><p class="quelle">Nach tagesschau.de, 10.10.2022, wie im Heft abgedruckt.</p>${KETTE}`)}`;
const EINSTUFUNG = () => `<h2 class="abschnitt">Deine Einstufung</h2>
  <p>Wie stark war nach dem Text die personelle Kontinuität im BND? Diese Einstufung erscheint später in deiner Vergleichstafel.</p>
  ${stufenWahl("bnd")}
  ${weiter("gruppe", "Weiter: Eure Gruppe")}`;

function gruppe(){
  const b = S.bereich, name = b ? BEREICHE.find(x => x[0] === b)[1] : "";
  return `${zeitKopf("gruppe")}<h1>Eure Gruppe</h1>
  ${auftrag("Gruppe · 25 Minuten", "Ein Bereich, vier Fragen, ein Steckbrief", "Wählt euren Bereich. Lest das Infomaterial. Füllt den Steckbrief – auf <b>einem</b> Gerät der Gruppe. Dieses Gerät zeigt den Steckbrief später am Beamer. Ihr habt höchstens 5 Minuten für eure Präsentation.")}
  <div class="woerter" role="group" aria-label="Bereich wählen">${GRUPPEN.map((g, i) => `<button type="button" data-akt="setz" data-p="bereich" data-w="${g[0]}" aria-pressed="${b === g[0]}">Gruppe ${i + 1}: ${esc(g[1])}</button>`).join("")}</div>
  ${b ? `<p><a class="btn dunkel" href="https://geschichtefuerdiegegenwart.github.io/NS-Kontinuit-ten/" target="_blank" rel="noopener">Infomaterial öffnen: NS-Kontinuitäten ↗</a> <span class="hinweis">Öffnet in einem neuen Tab. Wählt dort euren Bereich.</span></p>
  <div class="karte"><p class="kennung">Steckbrief · ${esc(name)}</p><div class="felder2">
    ${textfeld("steck.f1", "1 · Personelle Kontinuität: Wie viele arbeiteten nach 1945 weiter?", { rows:3, zaehl:false })}
    ${textfeld("steck.f2", "2 · Rollen im NS-Regime: Welche Funktionen hatten diese Personen?", { rows:3, zaehl:false })}
    ${textfeld("steck.f3", "3 · Entnazifizierung: Wie lief sie hier ab? War sie erfolgreich?", { rows:3, zaehl:false })}
    ${textfeld("steck.f4", "4 · Folgen: Was bedeutete das für die Demokratie?", { rows:3, zaehl:false })}
    ${eingabe("steck.beleg", "Unser stärkster Beleg (eine Zahl oder ein Name)")}
    ${eingabe("steck.quelle", "Woher stammt dieser Beleg? Welche Quelle nennt die Seite?")}
  </div>
  <p style="margin-top:.8rem"><b>Wie stark war die personelle Kontinuität in eurem Bereich?</b></p>${stufenWahl(b)}
  ${eingabe("tafel." + b + ".w", "Ein Stichwort, das hängen bleiben soll")}
  <div class="reihe"><button type="button" class="btn primary" data-akt="folie">Präsentation am Beamer zeigen</button><span class="hinweis">Tipp: iPad per AirPlay mit dem Beamer verbinden. Escape oder „Schließen“ beendet die Ansicht.</span></div></div>
  ${hilfe("Hilfe: Wie prüfen wir einen Beleg?", "<p>Steht bei der Angabe eine Quelle? Ist es eine Forschungsarbeit, ein Zeitungsbericht oder ein Lexikon? Könnt ihr die Zahl an einer zweiten Stelle finden? Wenn nicht: Sagt in der Präsentation dazu, dass die Angabe noch zu prüfen ist.</p>")}` : `<p class="hinweis">Wählt zuerst euren Bereich.</p>`}
  ${weiter("vergleich", "Weiter: Vergleich")}`;
}
function folieHtml(){
  const b = S.bereich, name = BEREICHE.find(x => x[0] === b)[1], s = S.steck, t = k => esc(String(s[k] || "").trim() || "–");
  return `<div class="folie"><div><p class="kennung">M26 · Wie viel Nationalsozialismus steckte in der BRD?</p><h2>${esc(name)}</h2></div>
  <div class="vier"><div><b>1 · Personelle Kontinuität</b><p>${t("f1")}</p></div><div><b>2 · Rollen im NS-Regime</b><p>${t("f2")}</p></div><div><b>3 · Entnazifizierung</b><p>${t("f3")}</p></div><div><b>4 · Folgen für die Demokratie</b><p>${t("f4")}</p></div></div>
  <div class="fq"><b>Stärkster Beleg:</b> ${t("beleg")} · <b>Quelle:</b> ${t("quelle")} · <b>Unsere Einstufung:</b> ${STUFEN[stufe(b)]}${stichwort(b) ? " · „" + esc(stichwort(b)) + "“" : ""}</div></div>`;
}

function vergleich_(){
  const zeilen = BEREICHE.map(b => `<div class="vz"><div class="vn"><b>${esc(b[1])}</b>${b[0] === S.bereich ? `<span class="status beleg">eure Gruppe</span>` : ""}</div>${stufenWahl(b[0])}
    <div class="g vb"><span class="g-balken__spur"><span class="g-balken__wert" style="--w:${stufe(b[0]) * 25};--farbe:var(--red)"></span></span></div>
    <input type="text" data-f="tafel.${b[0]}.w" id="f-tafel-${b[0]}-w" value="${esc(stichwort(b[0]))}" placeholder="Stichwort" aria-label="Stichwort zu ${esc(b[1])}"></div>`).join("");
  const n = BEREICHE.filter(b => stufe(b[0])).length, max = Math.max(...BEREICHE.map(b => stufe(b[0])));
  const spitze = max ? BEREICHE.filter(b => stufe(b[0]) === max).map(b => b[1].split(" (")[0]).join(", ") : "";
  return `${zeitKopf("vergleich")}<h1>Vergleich</h1>
  ${auftrag("Plenum · 25 Minuten · zuhören und einstufen", "Fünf Präsentationen, eine Tafel", "Während jede Gruppe präsentiert: Stufe ein, wie stark die personelle Kontinuität in diesem Bereich war, und notiere ein Stichwort. So entsteht deine eigene Vergleichstafel. Frag nach, wenn ein Beleg keine Quelle hat.")}
  <div class="vtafel" role="group" aria-label="Vergleichstafel">${zeilen}</div>
  <p class="hinweis" aria-live="polite" style="margin-top:.6rem">${n} von 6 Bereichen eingestuft.${spitze ? " Am stärksten nach deiner Tafel: " + esc(spitze) + "." : ""} ${status("modell", "Modell")}Die Balken zeigen deine Einstufung, keine Messwerte.</p>
  ${textfeld("wo", "In welchen Bereichen war die Kontinuität am stärksten? Gibt es Unterschiede?", { rows:3, anfaenge:["Am stärksten war sie","Anders war es bei","Der Unterschied liegt daran, dass"], zaehl:false })}
  ${weiter("urteil", "Weiter: Urteil")}`;
}

const SW = [
  ["sw1", "Gehlen antwortete auf Nachfragen: „Ein Prozent, alle entnazifiziert, alle überprüft, alle ok.“", "a", "Das ist eine Aussage darüber, was geschehen ist und was die Quellen sagen."],
  ["sw2", "Der BND hatte größere NS-Kontinuitäten als jede andere Behörde.", "s", "Ein Vergleich und eine Einordnung. Sie lässt sich an Quellen und Zahlen überprüfen."],
  ["sw3", "Adenauer unternahm nichts, weil er den BND für parteipolitische Zwecke nutzte.", "s", "Achte auf das Wort „weil“: Hier wird eine Ursache behauptet. Das ist ein Sachurteil – es muss sich an Quellen prüfen lassen."],
  ["sw4", "Das Kanzleramt hätte eingreifen müssen.", "w", "„Hätte müssen“ ist eine Bewertung. Sie braucht einen Maßstab – zum Beispiel: Ein Rechtsstaat darf keine Mörder beschäftigen."],
  ["sw5", "Die Bundesrepublik war trotz dieser Kontinuitäten ein demokratischer Neuanfang.", "w", "Als Bewertung („gut genug?“) ist es ein Werturteil. Nennst du Kriterien, die sich prüfen lassen – Grundgesetz, freie Wahlen, unabhängige Gerichte –, wird ein Teil davon zum Sachurteil."],
];
const SWNAME = { a:"Sachanalyse: Was ist geschehen? Was sagen die Quellen?", s:"Sachurteil: Ursachen, Spielräume, Folgen – an Quellen prüfbar", w:"Werturteil: Bewertung von heute, mit eigenem Maßstab" };
function swOpt(x){ return ["a","s","w"].map(k => [SWNAME[k], k === x[2] ? "zentral" : ((x[0] === "sw5" && k === "s") ? "begruendbar" : "kaum"), k === x[2] ? x[3] : ((x[0] === "sw5" && k === "s") ? "Vertretbar, wenn du Kriterien nennst, die sich prüfen lassen. " + x[3] : "Lies noch einmal genau: " + x[3])]); }

function urteil(){
  const fertig = SW.filter(x => ((S.wahl || {})[x[0]] || {}).zu).length;
  return `${zeitKopf("urteil")}<h1>Urteil</h1>
  <p class="leitfrage">War die Bundesrepublik trotz dieser Kontinuitäten ein demokratischer Neuanfang?</p>
  ${auftrag("Allein · 6 Minuten · Landkarte 2.4.3", "Erst sortieren: Was für ein Satz ist das?", `Bevor du urteilst, trennst du drei Arten von Aussagen. So steht es in der kognitiven Landkarte: <a style="color:var(--marker)" href="${LK}2-4-3" target="_blank" rel="noopener">Vom Sachurteil zum Werturteil ↗</a>. Ordne jeden Satz ein und lege fest.`)}
  ${SW.map(x => `<div class="karte">${gWahl(x[0], esc(x[1]), swOpt(x), { ohneGrund:true })}</div>`).join("")}
  <p class="hinweis" style="margin-top:.5rem">${fertig} von ${SW.length} eingeordnet. Typischer Fehler laut Landkarte: Das Werturteil kommt vor der Sachanalyse.</p>

  <h2 class="abschnitt">Warum war das möglich?</h2>
  ${auftrag("Zu zweit · 4 Minuten", "Mindestens drei Gründe", "Sammelt drei Gründe, warum die Kontinuitäten möglich waren. Nutzt eure Vergleichstafel und den BND-Text.")}
  <div class="feldgruppe">${eingabe("gruende.g1", "Grund 1")}${eingabe("gruende.g2", "Grund 2")}${eingabe("gruende.g3", "Grund 3")}</div>
  ${hilfe("Denkanstöße (erst nach einem eigenen Versuch)", "<p>Wer hätte die Ämter sonst besetzen sollen? · Wer prüfte wen – und wer bescheinigte wem die Unschuld? · Was war der Politik ab 1949 wichtiger als die Aufarbeitung? · Wer hatte ein Interesse daran, dass nicht genau hingesehen wurde?</p>")}

  <h2 class="abschnitt">Dein Urteil</h2>
  ${auftrag("Allein · 5 Minuten", "Position und Begründung", "Setz den Regler neu. Dann erscheint deine Marke vom Anfang. Schreib dein Urteil: erst die Sache, dann deine Bewertung mit Maßstab.")}
  <div class="karte"><div class="g"><div class="g-skala" data-g="skala" data-referenz="${S.pos.start}" id="skala"><div class="g-skala__spur"><input type="range" min="0" max="100" step="1" value="${S.pos.ende}" data-f="pos.ende" aria-label="Urteil: Neuanfang (0) bis Weiter-so (100)"><span class="g-skala__ref" ${S.pos.ref ? `style="left:${S.pos.start}%"` : "hidden"}></span></div><div class="g-skala__enden"><span>Neuanfang</span><span>Weiter-so</span></div><p>Jetzt: <span id="w-ende" style="font-weight:700;color:var(--kuli)">${posWort(S.pos.ende)}</span><span class="g-skala__wert" hidden></span></p>
    <div class="reihe"><button type="button" class="g-knopf g-knopf--sekundaer" data-g-vergleichen data-akt="ref" ${S.pos.ref ? "disabled" : ""}>Marke vom Anfang zeigen</button><span class="g-skala__ref-text" ${S.pos.ref ? "" : "hidden"}>Am Anfang: ${posWort(S.pos.start)} (${S.pos.start})</span></div></div></div></div>
  ${textfeld("urteil", "Mein Urteil", { rows:7, anfaenge:["In den Behörden zeigt sich","Möglich war das, weil","Für einen Neuanfang spricht trotzdem","Mein Maßstab ist"], ziel:"Ziel: etwa 80 Wörter" })}
  ${raster("urteil", 50, "Vom Sachurteil zum Werturteil", [["Sachanalyse", "Ich nenne einen Bereich.", "Ich nenne zwei Bereiche mit je einem Beleg.", "Ich vergleiche Bereiche und nenne die Herkunft der Belege."],["Sachurteil", "Ich nenne einen Grund.", "Ich erkläre mit zwei Gründen, warum es möglich war.", "Ich wäge Gründe und Folgen für die Demokratie ab."],["Werturteil", "Ich sage ja oder nein.", "Ich nenne meinen Maßstab für „demokratischer Neuanfang“.", "Ich trenne Sach- und Werturteil und nenne einen Einwand gegen mich."]])}
  ${auftrag("Plenum · 4 Minuten · iPad hochhalten", "Abstimmung", "War die Bundesrepublik trotz der Kontinuitäten ein demokratischer Neuanfang? Zeigt eure Karte. Je eine Stimme aus A, B und C begründet.")}
  ${stimmkarte("stimme", [["A","Ja"],["B","Nein"],["C","Ja, aber"]])}
  <p class="merksatz">iPad umdrehen. Danach: Zusammenfassung sichern.</p>
  ${weiter("zusammenfassung", "Zur Zusammenfassung")}`;
}

function zusammenfassung(){
  const m = (t, leer = "noch offen") => `<p class="mein ${String(t || "").trim() ? "" : "leer"}">${esc(String(t || "").trim() || leer)}</p>`;
  const b = S.bereich, name = b ? BEREICHE.find(x => x[0] === b)[1] : "", s = S.steck, g = S.gruende;
  return `<div class="zf"><div class="reihe nodruck" style="margin:0 0 1rem"><button type="button" class="btn dunkel" data-drucken>Drucken oder als PDF sichern</button><span class="hinweis">Zwei Seiten A4. In GoodNotes ablegen.</span></div>
  <h1>M26 · Ende gut, alles gut?</h1>
  <p class="leitfrage">Wie viel Nationalsozialismus steckte in der Bundesrepublik?</p>
  <p class="merksatz">Die Bundesrepublik begann mit einer neuen Verfassung – aber in vielen Behörden mit altem Personal. Wie stark diese Kontinuität war, unterscheidet sich je Bereich.</p>
  <h2>Begriffe</h2>
  <div class="begriffe">
    <div><b>Entnazifizierung:</b> Ab 1945 wollten die Alliierten NSDAP-Mitglieder und NS-Täter aus wichtigen Positionen entfernen.</div>
    <div><b>Personelle Kontinuität:</b> Dieselben Menschen arbeiten nach 1945 in denselben Berufen und Ämtern weiter.</div>
    <div><b>BND:</b> Auslandsgeheimdienst der Bundesrepublik, ab 1956 Bundesbehörde unter dem Kanzleramt. Chef: Reinhard Gehlen.</div>
    <div><b>Die „vier Lügen“:</b> Gehlens Antwort auf Nachfragen: „Ein Prozent, alle entnazifiziert, alle überprüft, alle ok.“</div>
    <div><b>Sachurteil:</b> Wie ist das Geschehen aus seiner Zeit heraus zu beurteilen? Ursachen, Spielräume, Folgen – an Quellen prüfbar.</div>
    <div><b>Werturteil:</b> Wie bewerte ich das Geschehen heute, und nach welchen Normen? Nur gut, wenn der Maßstab offenliegt.</div>
  </div>
  <h2>Der BND in Zahlen</h2>
  <div class="pfelder druck"><figure><div class="pf gehlen">${punkte(1)}</div><figcaption><b>1 von 100</b>Gehlens Auskunft</figcaption></figure><figure><div class="pf studie">${punkte(10, 20)}</div><figcaption><b>10 bis 20 von 100</b>Studie Sälter: „Blut an den Händen“</figcaption></figure><figure><div class="pf ich">${punkte(S.schaetz.n)}</div><figcaption><b>${S.schaetz.n} von 100</b>Meine Schätzung am Anfang</figcaption></figure></div>
  <p class="quelle">Nach tagesschau.de, 10.10.2022 (Heft M26). Modell: Punkte zeigen Anteile, keine Personen.</p>
  <div class="werk"><b>Denkwerkzeug: Drei Schritte zum Urteil</b> (Landkarte 2.4.3). 1. <b>Sachanalyse:</b> Was ist geschehen? Was sagen die Quellen? 2. <b>Sachurteil:</b> Ursachen, Handlungsspielräume, Folgen – aus der Zeit heraus. 3. <b>Werturteil:</b> Bewertung von heute, Maßstab offenlegen. Typischer Fehler: Das Werturteil kommt vor der Sachanalyse.</div>
  <div class="werk" style="background:var(--kuli-hi)"><b>Vier Fragen an jeden Bereich:</b> Wie viele arbeiteten weiter? · Welche Rolle hatten sie im NS-Regime? · Wie lief die Entnazifizierung? · Was folgte daraus für die Demokratie?</div>

  <div class="seitenumbruch"><h2 style="margin-top:0">Meine Ergebnisse</h2>
  <h2>Der BND (Fragen a bis d)</h2>${m(["a","b","c","d"].map(k => S.bnd[k] ? k + ") " + S.bnd[k] : "").filter(Boolean).join("\n"))}
  <h2>Unser Steckbrief${name ? ": " + esc(name) : ""}</h2>${m([s.f1 && "1 · " + s.f1, s.f2 && "2 · " + s.f2, s.f3 && "3 · " + s.f3, s.f4 && "4 · " + s.f4, s.beleg && "Beleg: " + s.beleg + (s.quelle ? " (Quelle: " + s.quelle + ")" : "")].filter(Boolean).join("\n"))}
  <h2>Meine Vergleichstafel</h2>
  <div class="matrix-wrap"><table><thead><tr><th>Bereich</th><th>Kontinuität (meine Einstufung)</th><th>Stichwort</th></tr></thead><tbody>${BEREICHE.map(x => `<tr><td>${esc(x[1])}</td><td>${STUFEN[stufe(x[0])]}</td><td class="mein">${esc(stichwort(x[0]))}</td></tr>`).join("")}</tbody></table></div>${m(S.wo, "")}
  <h2>Drei Gründe</h2>${m([g.g1, g.g2, g.g3].filter(x => x && x.trim()).map((x, i) => (i + 1) + ". " + x).join("\n"))}
  <h2>Mein Urteil</h2>${m(`Am Anfang: ${posWort(S.pos.start)} (${S.pos.start}) · am Ende: ${posWort(S.pos.ende)} (${S.pos.ende})${S.stimme ? " · Stimme " + S.stimme : ""}`)}${m(S.urteil)}</div></div>
  ${weiter("start", "Zur Startseite")}`;
}

function lehrkraft(){
  return `<div class="lk"><p class="zeit"><span class="nr">Für Lehrkräfte</span><span>nicht geschützt</span></p><h1>M26 · Hinweise</h1>
  <p class="lead">Grundlage ist dein Heft, M26: zentrale Frage, BND-Text mit vier Fragen (15 Min.), fünf Gruppen mit vier Fragen (25 Min.), Plenum mit Vergleich, Ursachen und Bewertung (20 Min.). Die Seite übernimmt diese drei Arbeitsaufträge und ihre Zeiten.</p>
  <h2 class="abschnitt">Was das Gerät hier leistet</h2>
  <ul><li><b>Schätzen vor dem Lesen:</b> eigene Zahl neben Gehlens „ein Prozent“ und den 10 bis 20 Prozent der Studie, als Punktefeld. Der Abstand ist die Frage der Stunde.</li><li><b>Steckbrief statt Folien:</b> Die vier Fragen der Gruppe werden direkt zur Präsentation am Beamer (ein Gerät je Gruppe, keine Übertragung zwischen Geräten). Zusätzlich: stärkster Beleg und seine Herkunft.</li><li><b>Vergleichstafel beim Zuhören:</b> Jede*r stuft alle sechs Bereiche ein; daraus entsteht das eigene Profil für Frage a) des Plenums.</li><li><b>Landkarte 2.4.3:</b> fünf Sätze aus dem BND-Text als Sachanalyse, Sachurteil oder Werturteil einordnen – vor dem eigenen Urteil.</li><li><b>Skala mit Marke vom Anfang</b> und <b>Stimmkarte</b> für die Abstimmung.</li></ul>
  <p>Papier bleibt besser für: den BND-Text (Heft) und die Diskussion im Plenum.</p>
  <h2 class="abschnitt">Ablauf (90 Minuten)</h2>
  <div class="matrix-wrap"><table><thead><tr><th>Zeit</th><th>Phase</th><th>Sozialform</th><th>Hinweis</th></tr></thead><tbody>
  <tr><td class="n">0–6</td><td>Schätzen</td><td>allein</td><td>zwei Festlegungen, dann drei Punktefelder am Beamer besprechen</td></tr>
  <tr><td class="n">6–21</td><td>Der BND</td><td>allein, mit Heft</td><td>Arbeitsauftrag 1; Vergleich erst nach vier Antworten</td></tr>
  <tr><td class="n">21–46</td><td>Eure Gruppe</td><td>fünf Gruppen</td><td>Arbeitsauftrag 2; ein Gerät je Gruppe für den Steckbrief</td></tr>
  <tr><td class="n">46–71</td><td>Vergleich</td><td>Plenum</td><td>5 × 5 Minuten; alle füllen die Vergleichstafel</td></tr>
  <tr><td class="n">71–90</td><td>Urteil</td><td>allein, zu zweit, Plenum</td><td>Sortieren 6, Gründe 4, Urteil 5, Abstimmung und Gespräch 4</td></tr></tbody></table></div>
  <p class="hinweis">Zeitdiagnose bei 150 Wörtern pro Minute (gemessen): Die Seite hat rund 1.600 Wörter Lesetext (gut 10 Minuten, die Hälfte davon auf der Seite „Urteil“), der BND-Text im Heft rund 340 Wörter (gut 2 Minuten). Eng wird es bei den Präsentationen und am Schluss: Für „Urteil“ sind 19 Minuten knapp – K2 oder K3 einplanen.</p>
  <h2 class="abschnitt">Kürzungen zur Auswahl</h2>
  <ul><li><b>K1</b> Präsentationen auf 4 Minuten begrenzen: 5 Minuten frei für das Plenum.</li><li><b>K2</b> Sortieraufgabe (Landkarte 2.4.3) gemeinsam am Beamer mit zwei statt fünf Sätzen: 4 Minuten frei.</li><li><b>K3</b> Urteilstext als Hausaufgabe; im Unterricht nur Skala, Abstimmung, Gespräch: 5 Minuten frei.</li><li><b>K4</b> Zwei Doppelstunden: Gruppenarbeit und Präsentationen in der ersten, Vergleich und Urteil in der zweiten.</li></ul>
  <h2 class="abschnitt">Abweichungen vom Heft</h2>
  <ul><li>Anrede „du“/„ihr“ (Heft: gemischt mit „Sie“).</li><li><b>BND-Text als Akte:</b> Der Text aus dem Heft steht in deinen sieben Abschnitten als Karten (Studie mit Punktefeld, Personalakten Schreiber und Grauer, Globke und Adenauer, die „vier Lügen“ als vier Felder, Bilanz), daneben die vier Fragen. Nach den Antworten erscheint mit dem Vergleich das Schaubild „Kette des Wegsehens“ (Modell). Der Text liegt in <code>texte/m26-bnd.js</code> – nur im Moodle-Paket, nicht im öffentlichen Repository; fehlt die Datei, verweist die Seite aufs Heft.</li><li>„Digitale Präsentation“: Der Steckbrief ist die Präsentation. Wer lieber Folien baut, kann das weiterhin tun.</li><li>Neu: Herkunft des stärksten Belegs. Grund: Die Infoseite „NS-Kontinuitäten“ enthält prüfbedürftige Angaben (im Tresor vermerkt: Landgericht München 1951 und die Urteile gegen die Weiße Rose).</li><li>Plenumsfragen a) bis c) sind auf „Vergleich“ und „Urteil“ verteilt.</li><li>Das Foto im Heft (Teppich mit dem Bundesadler und dem Schriftzug des BND) ist nicht übernommen: Es hat keine Aufgabe in der Stunde und zeigt ein Hoheitszeichen.</li></ul>
  <h2 class="abschnitt">Vor dem Einsatz prüfen</h2>
  <ul><li>Die Zahlen und Zitate zum BND stammen aus dem Heft (dort nach tagesschau.de, 10.10.2022). Den Artikel konnte Claude nicht selbst abrufen. Bitte am Original prüfen: Worauf beziehen sich die „10 bis 20 Prozent“ genau (welcher Zeitraum, welche Gruppe)? Stimmen die Zitate von Sälter und Gehlen wörtlich?</li><li>Studie: Gerhard Sälter, NS-Kontinuitäten im BND. Rekrutierung, Diskurse, Vernetzungen (2022).</li><li>Infoseite: Angaben ohne belastbare Quelle (teils Wikipedia, YouTube) markieren oder ersetzen.</li><li>Der Link zur Infoseite führt in der Arbeitsphase aus der Lernseite heraus. Das ist gewollt, aber die einzige Stelle.</li></ul>
  <h2 class="abschnitt">Nur du kannst das</h2>
  <ul><li>AirPlay und Beamer im Raum testen; iPad in Safari hoch und quer; Moodle.</li><li>Im Gespräch auf den Unterschied achten: Mitgliedschaft in der NSDAP ist nicht dasselbe wie Beteiligung an Verbrechen.</li><li>Beutelsbacher Konsens bei Frage c): „Ja“, „Nein“ und „Ja, aber“ sind vertretbar, wenn der Maßstab genannt wird.</li></ul>
  <h2 class="abschnitt">Nach der Stunde</h2>
  <div class="matrix-wrap"><table><thead><tr><th>Beobachtung</th><th>Notiz</th></tr></thead><tbody><tr><td>Hat der Steckbrief als Präsentation am Beamer funktioniert (Lesbarkeit, Zeit)?</td><td></td></tr><tr><td>Wurde die Vergleichstafel beim Zuhören wirklich gefüllt?</td><td></td></tr><tr><td>Welche Sätze wurden bei Sach- und Werturteil verwechselt?</td><td></td></tr><tr><td>Hat sich die Position gegenüber dem Anfang bewegt?</td><td></td></tr></tbody></table></div>
  <p class="hinweis" style="margin-top:1rem">Speicherschlüssel <code>${L.key}</code>. Eingaben bleiben im Browser des Geräts.</p></div>
  ${weiter("start", "Zur Startseite")}`;
}

AKTION.schaetzfest = (t, ev) => { S.schaetz.zu = true; speichere(); zeichneBehalte(); if (ev.detail !== 0) neu(document.getElementById("schaetzauf"), "neu"); };
AKTION.stufe = t => { const b = t.dataset.b, w = +t.dataset.w; if (!S.tafel[b]) S.tafel[b] = {}; S.tafel[b].s = S.tafel[b].s === w ? 0 : w; speichere(); zeichneBehalte(); };
AKTION.folie = () => tafel(folieHtml(), { hell:true, titel:"Präsentation der Gruppe" });
AKTION.ref = () => { S.pos.ref = true; speichere(); };
const SEITE_FN = { start, schaetzen, bnd, gruppe, vergleich:vergleich_, urteil, zusammenfassung, lehrkraft };
kernStart();
