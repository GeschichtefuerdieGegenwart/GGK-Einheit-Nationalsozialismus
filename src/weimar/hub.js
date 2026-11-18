/* ===== Kapitelübersicht »Weimarer Republik« (weimar/index.html): vier Abschnitte mit Leitfragen, alle Stunden, roter Faden, das wachsende Blatt »Kollektives Gedächtnis« ===== */
const L = {
  key:"ggk-w-hub:v1", hub:true, nr:"Kapitel 1", titel:"Weimarer Republik", unter:"Vom Ersten Weltkrieg bis zum Ende der ersten deutschen Demokratie · 1914–1933",
  /* Zeichen des Kapitels: Schwarz-Rot-Gold, die Farben der Republik */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><path d="M7 4v27" stroke="#24221F" stroke-width="2.6" stroke-linecap="round"/><path d="M9 6h20v6H9z" fill="#24221F"/><path d="M9 12h20v6H9z" fill="#B23A2E"/><path d="M9 18h20v6H9z" fill="#E0B74A"/></svg>`,
  seiten:[["start","",""]], breit:["start","lehrkraft"],
  loesch:"Deine Antworten auf die vier Leitfragen, dein Satz zum Vernetzen und deine Abschlussgeschichte werden auf diesem Gerät entfernt. Die Eingaben in den einzelnen Stunden bleiben erhalten; du löschst sie in der jeweiligen Stunde.",
  init:() => ({ antwort:{ a:"", b:"", c:"", d:"" }, vernetz:"", rk:{ w:{}, grund:"", text:"", pr:{}, aendern:"", halt:"" } }),
};
/* Schlüsselbegriffe je Abschnitt: aus dem Inhaltsverzeichnis des Kurses; bei d berichtigt (Halbwachs) */
const H_BEGRIFFE = {
  a:"Entente · Mittelmächte · Julikrise 1914 · Blankoscheck · Standortgebundenheit · Genozid · Triftigkeitsprüfung",
  b:"Matrosenaufstand · Doppelte Ausrufung · Räterepublik · Volkssouveränität · SPD · Spartakusbund · Milieu",
  c:"Diktatfrieden · Artikel 231 · Reparationen · Selbstbestimmungsrecht · Völkerbund · Fischer und Clark",
  d:"Kollektives Gedächtnis (Halbwachs, Assmann) · Dolchstoßlegende · Hyperinflation · Hitler-Putsch 1923 · Agency · Wahl-O-Mat 1919",
};
const hStand = m => { try { const s = JSON.parse(localStorage.getItem(`ggk-w-${m[0]}:v1`)); if (!s) return ""; const sa = s.sa || {}, w = String(sa.text || "").trim().split(/\s+/).filter(Boolean).length; return (w >= 60 || sa.hand) ? "fertig" : "begonnen"; } catch(e) { return ""; } };
const hZeit = min => !min ? "" : min >= 180 ? "zwei Doppelstunden" : min >= 90 ? "Doppelstunde" : min >= 60 ? min + " Minuten" : "Einzelstunde";
function hKarte(m){
  const da = wGebaut(m[0]), st = da ? hStand(m) : "", min = (window.W_DAUER || {})[m[0]];
  const innen = `<span class="h-nr">${esc(m[1])}</span><b>${esc(m[2])}</b><span class="h-meta">${da ? esc(hZeit(min)) : "entsteht gerade"}</span>${st ? `<span class="h-stand ${st}">${st === "fertig" ? "✓ Schreibauftrag erledigt" : "begonnen"}</span>` : ""}`;
  return da ? `<li><a class="h-karte" href="${m[3]}">${innen}</a></li>` : `<li><span class="h-karte leer">${innen}</span></li>`;
}
function hBlock(k, i){
  const b = W_BLOCK[k], mods = W_MODULE.filter(m => m[4] === k), u = wLade(), mit = mods.filter(m => (u.faden[m[0]] || "").trim());
  return `<section class="h-block" id="abschnitt-${k}" aria-labelledby="h-${k}">
  <div class="h-bkopf"><span class="h-bzeit">${esc(b[1].replace("ca. ", ""))}</span><div><p class="kennung">${mods.length} Stunden · ${esc(mods[0][1])} bis ${esc(mods[mods.length - 1][1])}</p><h2 id="h-${k}">${esc(b[0])}</h2></div></div>
  <p class="h-leit">${esc(b[2])}</p>
  <p class="h-schl"><b>Schlüsselbegriffe:</b> ${esc(H_BEGRIFFE[k])}</p>
  <ol class="h-karten">${mods.map(hKarte).join("")}</ol>
  <div class="h-faden"><div><p class="kennung">Dein roter Faden in diesem Abschnitt</p>
  ${mit.length ? `<ul>${mit.map(m => `<li><b>${esc(m[1])}</b> ${esc(u.faden[m[0]])}</li>`).join("")}</ul>` : `<p class="hinweis">Noch leer. Am Ende jeder Stunde schreibst du einen Satz – er erscheint hier.</p>`}</div>
  <div>${textfeld("antwort." + k, "Meine Antwort auf die Leitfrage dieses Abschnitts", { rows:4, zaehl:false, platz:mit.length ? "Lies deine Sätze links und antworte in drei bis vier Sätzen." : "Schreib hier, wenn du die Stunden des Abschnitts bearbeitet hast." })}</div></div>
  </section>`;
}
function hGedaechtnis(){
  const u = wLade();
  return `<section class="h-kg" aria-labelledby="h-kg"><div class="h-kgkopf"><p class="kennung">Wächst von Stunde zu Stunde · ab M8</p><h2 id="h-kg">Das kollektive Gedächtnis der Weimarer Republik</h2>
  <p>Was geht in den Köpfen der Menschen vor? Acht Einträge kennst du aus M8. Fünf weitere schreibst du selbst.</p></div>
  <ol class="h-kgraster">${W_KG8.map(e => `<li><b>${esc(e.titel)}</b><span>${esc(e.text)}</span></li>`).join("")}
  ${W_KGNEU.map(s => { const m = wMod(s[0]), t = (u.kg[s[0]] || "").trim(); return `<li class="${t ? "mein" : "offen"}"><b>${esc(s[1])}</b><span>${t ? esc(t) : `Noch offen – dein Eintrag entsteht in ${esc(m[1])}.`}</span>${t ? `<i>dein Eintrag aus ${esc(m[1])}</i>` : ""}</li>`; }).join("")}</ol>
  <p class="quelle">Acht Einträge nach dem Unterrichtsheft, M8.1.</p></section>`;
}
/* ---------- Verorten und vernetzen: jede Zeile eine Zeit, drei Ebenen. Alle Ereignisse stehen so in den Stunden; die Nummern führen dorthin. ---------- */
const H_ORT = [
  { zeit:"1914–1918", titel:"Erster Weltkrieg",
    welt:[["1915/16","Völkermord an den Armenier*innen im Osmanischen Reich.","m03"],["Jan. 1918","US-Präsident Wilson nennt 14 Punkte für einen dauerhaften Frieden.","m06"]],
    europa:[["28. Juni 1914","Attentat von Sarajevo – daraus wird ein Krieg der Großmächte.","m02"]],
    de:[["1917","Ein junger Mensch im vierten Kriegsjahr: Was hätte ich gedacht?","m01"],["Nov. 1918","Matrosen meutern; am 9. November wird die Republik ausgerufen – zweimal.","m04","m05"]] },
  { zeit:"1919–1920", titel:"Frieden und Neuordnung",
    welt:[["1919/20","Das Osmanische Reich wird aufgeteilt; im Nahen Osten entstehen Mandatsgebiete.","m07"]],
    europa:[["1919","Pariser Friedenskonferenz: neue Staaten wie Polen und die Tschechoslowakei – und neue Minderheiten.","m06","m07"]],
    de:[["19. Jan. 1919","Wahl zur Nationalversammlung – zum ersten Mal wählen auch Frauen.","m09"],["28. Juni 1919","Versailler Vertrag: Gebietsverluste, Reparationen, Artikel 231.","m07"],["März 1920","Kapp-Putsch – er scheitert am Generalstreik.","m10"]] },
  { zeit:"1921–1923", titel:"Gewalt und Krisen",
    welt:[],
    europa:[["Okt. 1922","Italien: Mussolinis Faschisten übernehmen die Macht.","m10"],["Jan. 1923","Französische und belgische Truppen besetzen das Ruhrgebiet.","m11"]],
    de:[["1921/22","Morde an Matthias Erzberger und Walther Rathenau.","m10"],["1923","Krisenjahr: Hyperinflation und Hitler-Putsch.","m11"]] },
  { zeit:"1924–1929", titel:"Stabilisierung",
    welt:[["1924","Dawes-Plan: Die Reparationen werden neu geordnet; internationale Kredite helfen der Wirtschaft.","m13"]],
    europa:[["1925","Vertrag von Locarno: Deutschland erkennt seine Westgrenze an.","m13"],["1926","Deutschland wird in den Völkerbund aufgenommen.","m13"]],
    de:[["1924–1929","„Goldene Zwanziger“ – aber für wen?","m12"],["1920er-Jahre","Zwei Leben einer Zeit: Lotte in der Großstadt, Anna auf dem Land (beide ausgedacht).","m13"]] },
  { zeit:"1929–1933", titel:"Krise und Ende",
    welt:[["Okt. 1929","Börsenkrach in New York: Die Banken fordern ihre Kredite zurück.","m14"]],
    europa:[["ab 1929","Die Krise trifft viele Länder – Deutschland besonders hart.","m14"]],
    de:[["1930","Erstes Präsidialkabinett: Regieren mit Notverordnungen.","m142"],["Juli 1932","Die NSDAP wird stärkste Partei im Reichstag.","m14"],["30. Jan. 1933","Hindenburg ernennt Hitler zum Reichskanzler.","m142"]] },
];
const hEreignis = e => `<li><b>${esc(e[0])}</b><span>${esc(e[1])}</span><span class="h-om">${e.slice(2).map(id => { const m = wMod(id); return wGebaut(id) ? `<a href="${m[3]}" aria-label="Zur Stunde ${esc(m[1])}">${esc(m[1])}</a>` : `<span>${esc(m[1])}</span>`; }).join("")}</span></li>`;
function hOrt(){
  const sp = [["welt","Welt"],["europa","Europa"],["de","Deutschland"]];
  return `<section class="h-ort" id="h-ort" aria-labelledby="h-ot"><p class="kennung">Verorten und vernetzen · drei Ebenen</p><h2 id="h-ot">Wo spielt das? Welt · Europa · Deutschland</h2>
  <p class="h-olead">Jedes Ereignis des Kapitels hat einen Ort. Lies eine Zeile von links nach rechts: Was geschieht zur selben Zeit in der Welt, in Europa und in Deutschland?</p>
  <table class="h-otab"><thead><tr><th scope="col">Zeit</th>${sp.map(s => `<th scope="col" class="h-o-${s[0]}">${s[1]}</th>`).join("")}</tr></thead>
  <tbody>${H_ORT.map(z => `<tr><th scope="row"><b>${esc(z.zeit)}</b><span>${esc(z.titel)}</span></th>${sp.map(s => `<td class="h-o-${s[0]}" data-ebene="${s[1]}">${z[s[0]].length ? `<ul>${z[s[0]].map(hEreignis).join("")}</ul>` : `<p class="h-oleer">In unseren Stunden kein eigenes Ereignis.</p>`}</td>`).join("")}</tr>`).join("")}</tbody></table>
  <div class="h-vernetz">${textfeld("vernetz", "Vernetzen: Wähle ein Ereignis aus der Spalte Welt oder Europa. Wie wirkt es auf Deutschland?", { rows:2, zaehl:false, anfaenge:["Der Börsenkrach in New York wirkt auf Deutschland, weil", "Die Besetzung des Ruhrgebiets führt dazu, dass", "Wilsons 14 Punkte wecken in Deutschland"] })}</div>
  <p class="quelle">Alle Ereignisse stammen aus den Stunden des Kapitels. Die Nummer führt zur Stunde.</p></section>`;
}
/* ---------- Landkarte des Kapitels: welcher Eintrag in welcher Stunde im Mittelpunkt steht (aus W_LK) – zugleich Lernübersicht für die Klassenarbeit ---------- */
const hLk = wid => { try { const s = JSON.parse(localStorage.getItem(`ggk-w-${wid}:v1`)); return !!(s && s.lk && s.lk.ok); } catch(e) { return false; } };
const H_LKB = [["1 Wozu Geschichte?", "1-0", /^1-/], ["2.1 Was jede Geschichte gemeinsam hat", "2-1", /^2-1-/], ["2.3 Formen von Geschichte", "2-3", /^2-3-/], ["3.1 Analyseinstrumente", "3-1", /^3-1-/]];
function hLinie(){
  const u = wLade().linie || {}, st = [["m13","M13","These: „Mein Denken ist ein Produkt meiner Umwelt.“"],["m14","M14","Ein junger Arbeitsloser, 1932"],["m142","M14.2","Hindenburg am 30. Januar 1933"]];
  return `<div class="h-linie"><div><p class="kennung">Linie des Kurses seit M13</p><h3>Umwelt oder Ich?</h3><p class="hinweis">1 = eigene Entscheidung · 5 = die Umwelt bestimmt. Bleibt deine Linie gleich – oder hängt die Antwort vom Fall ab?</p></div>
  <ol>${st.map(x => { const v = u[x[0]]; return `<li><b>${x[1]}</b><span>${esc(x[2])}</span><span class="h-lskala" role="img" aria-label="${v == null ? "noch offen" : v + " von 5"}">${[1,2,3,4,5].map(i => `<i class="${v === i ? "an" : ""}"></i>`).join("")}</span><small>${v == null ? "noch offen" : v + " von 5"}</small></li>`; }).join("")}</ol></div>`;
}
function hLandkarte(){
  const wo = {}; Object.keys(W_LK).forEach(wid => W_LK[wid].forEach(e => { (wo[e[0]] = wo[e[0]] || { name:e[1], m:[] }).m.push(wid); }));
  wo["2-1-7"] = wo["2-1-7"] || { name:"Konstruktivität", m:[], ende:true };
  const chip = (wid, ziel, haken) => { const m = wMod(wid), ok = haken && hLk(wid); return wGebaut(wid) ? `<a href="${m[3]}#${ziel}" class="${ok ? "ok" : ""}" aria-label="${esc(m[1])}${ok ? ", geprüft" : ""}">${esc(m[1])}${ok ? " ✓" : ""}</a>` : `<span>${esc(m[1])}</span>`; };
  const ende = `<a href="#h-rk">Abschluss</a>`;
  const zeile = id => `<li><a class="h-le" href="${LK}${id}" target="_blank" rel="noopener">${esc(wo[id].name)} ↗</a><span class="h-lm">${wo[id].m.map(w => chip(w, "landkarte", true)).join("")}${wo[id].ende ? ende : ""}</span></li>`;
  const alle = Object.keys(W_LK), fertig = alle.filter(hLk).length;
  return `<section class="h-lk" id="h-lk" aria-labelledby="h-lkt"><p class="kennung">Die kognitive Landkarte in diesem Kapitel · Prüfungsstoff</p><h2 id="h-lkt">Welcher Begriff steht in welcher Stunde im Mittelpunkt?</h2>
  <p class="h-olead">In jeder Stunde übst du einen Eintrag der Landkarte. Die Nummer führt zur Landkarten-Aufgabe der Stunde. Für die Klassenarbeit solltest du zu jedem Begriff das Beispiel aus der Stunde nennen können. Geprüft hast du bisher <b>${fertig} von ${alle.length}</b> Aufgaben.</p>
  <div class="h-lkraster">${H_LKB.map(b => { const ids = Object.keys(wo).filter(id => b[2].test(id)).sort((x, y) => x.localeCompare(y, "de", { numeric:true })); return `<article><h3><a href="${LK}${b[1]}" target="_blank" rel="noopener">${esc(b[0])} ↗</a></h3><ul>${ids.map(zeile).join("")}</ul></article>`; }).join("")}
  <article><h3>2.2 und 2.4 Prüfen, erzählen, urteilen</h3><ul>
  <li><a class="h-le" href="${LK}2-2" target="_blank" rel="noopener">Triftigkeitsprüfung ↗</a><span class="h-lm">${chip("m03", "urteil", false)}${chip("m12", "trift", false)}${ende}</span></li>
  <li><a class="h-le" href="${LK}2-4-1" target="_blank" rel="noopener">Re-Konstruktion ↗</a><span class="h-lm">${ende}</span></li>
  <li><a class="h-le" href="${LK}2-4-3" target="_blank" rel="noopener">Vom Sachurteil zum Werturteil ↗</a><span class="h-lm">${chip("m10", "schreiben", false)}${chip("m12", "schreiben", false)}</span></li></ul></article></div>
  ${hLinie()}</section>`;
}
/* ---------- Abschluss: Re-Konstruktion. Die Lernenden erzählen selbst – Auswahl begründen (Selektivität), erzählen (Narrativität), prüfen (Triftigkeit), vergleichen (Kontroversität). ---------- */
const H_ANSATZ = [
  { id:"last", kopf:"M7 · M8", titel:"Lasten des Anfangs", text:"Niederlage, Versailler Vertrag und Dolchstoßlegende: Die Republik beginnt mit Deutungen, die sie abwerten." },
  { id:"gewalt", kopf:"M10", titel:"Gewalt ohne Antwort", text:"Politische Morde und Putsche – und eine Justiz, die Täter von rechts milde bestraft." },
  { id:"not", kopf:"M11 · M14", titel:"Wirtschaftliche Not", text:"Hyperinflation 1923 und Weltwirtschaftskrise seit 1929: Wer alles verliert, verliert oft auch das Vertrauen in die Republik." },
  { id:"regeln", kopf:"M14.2", titel:"Regeln der Verfassung", text:"Artikel 48 und Präsidialkabinette: Regieren ohne Mehrheit im Reichstag wird möglich." },
  { id:"spitze", kopf:"M14.2", titel:"Entscheidungen an der Spitze", text:"Hindenburg und seine Berater entscheiden 1930 bis 1933. Dieser Ansatz sagt: Sie hätten auch anders entscheiden können." },
  { id:"wenige", kopf:"M5 · M9 · M14", titel:"Zu wenige Verteidiger*innen", text:"Alte Eliten in Armee, Justiz und Verwaltung lehnen die Republik ab; viele Wähler*innen wenden sich von ihr ab." },
];
const H_PRUEF = [["e","Empirisch triftig","Jede Behauptung stützt sich auf etwas aus unseren Stunden: eine Zahl, ein Datum, eine Quelle."],["n","Normativ triftig","Wo ich werte, lege ich meinen Maßstab offen."],["z","Narrativ triftig","Der Zusammenhang ist schlüssig – und ich schreibe nirgends, dass es so kommen musste."]];
function hAbschluss(){
  const n = mwZahl("rk.w"), pr = S.rk.pr || {};
  return `<section class="h-rk" id="h-rk" aria-labelledby="h-rkt"><div class="h-rkkopf"><p class="kennung">Abschluss des Kapitels · nach M14.2 · etwa 45 Minuten</p><h2 id="h-rkt">Deine Geschichte: Warum scheiterte die erste deutsche Demokratie?</h2>
  <p>Bisher hast du Geschichten anderer geprüft. Jetzt erzählst du selbst – begründet und mit Belegen aus unseren Stunden. In der Landkarte heißt das Re-Konstruktion.</p></div>
  <div class="h-rkschritt"><span class="h-rknr" aria-hidden="true">1</span><div><h3>Auswählen</h3><p>Sechs Erklärungsansätze stehen zur Wahl. Markiere die drei, die deine Geschichte tragen sollen. Keine Geschichte kann alles erzählen – begründe deshalb deine Auswahl.</p>
  ${mehrWahl("rk.w", H_ANSATZ, { spalten:3, titel:"Erklärungsansätze wählen", an:"gewählt", aus:"antippen zum Wählen" })}
  <p class="hinweis" aria-live="polite"><b>${n === 3 ? "Drei gewählt." : n < 3 ? `${n} von 3 gewählt.` : `${n} gewählt – entscheide dich für drei.`}</b> Die sechs Ansätze sind für den Unterricht formuliert. Sie bündeln, was die Forschung an Ursachen nennt; sie sind keine Zitate.</p>
  ${textfeld("rk.grund", "Warum diese drei – und was lasse ich weg?", { rows:2, zaehl:false, anfaenge:["Ich wähle diese drei, weil", "Weg lasse ich"] })}</div></div>
  <div class="h-rkschritt"><span class="h-rknr" aria-hidden="true">2</span><div><h3>Erzählen</h3><p>Schreib deine Geschichte in 150 bis 200 Wörtern. Sie braucht einen Anfang, mindestens einen Wendepunkt und ein Ende. Nenne zu jedem Schritt einen Beleg aus einer Stunde: eine Zahl, ein Datum oder eine Quelle.</p>
  ${textfeld("rk.text", "Meine Geschichte", { rows:11, anfaenge:["Am Anfang steht", "Ein Wendepunkt ist", "Entscheidend wird", "Am Ende"] })}
  <p class="reihe nodruck"><button type="button" class="btn" data-akt="wdruckrk">Meine Geschichte drucken oder als PDF sichern</button><span class="hinweis">Druckt nur den Abschluss – zum Abheften hinter der Zusammenfassung von M14.2.</span></p></div></div>
  <div class="h-rkschritt"><span class="h-rknr" aria-hidden="true">3</span><div><h3>Prüfen</h3><p>Prüfe deine eigene Geschichte so, wie du in M12 die „Goldenen Zwanziger“ geprüft hast. Hake ab, was stimmt – und notiere, was du noch änderst.</p>
  <div class="h-rkpr" role="group" aria-label="Drei Triftigkeiten abhaken">${H_PRUEF.map(p => `<button type="button" data-akt="mw" data-p="rk.pr.${p[0]}" aria-pressed="${!!pr[p[0]]}"><b>${pr[p[0]] ? "✓ " : ""}${p[1]}</b><span>${p[2]}</span></button>`).join("")}</div>
  ${textfeld("rk.aendern", "Das ändere ich noch", { rows:2, zaehl:false })}</div></div>
  <div class="h-rkschritt"><span class="h-rknr" aria-hidden="true">4</span><div><h3>Vergleichen</h3><p>Erst wenn deine Geschichte steht, liest du eine Stimme aus der Forschung.</p>
  ${vergleich("rkv", ["rk.text"], 400, "Eine Stimme aus der Forschung lesen", `${zitat("Darstellung · Ursula Büttner, Historikerin, 2018", "Den letzten Ausschlag, dass die Krise in die Katastrophe mündete, gaben aber konkrete politische Entscheidungen.", "Ursula Büttner: Ausgeforscht? Die Weimarer Republik als Gegenstand historischer Forschung, in: Aus Politik und Zeitgeschichte, Heft zur Weimarer Republik, 2018 (bpb.de), Abschnitt „Fazit und eine Erklärung für Weimars Ende“.")}
  <p>Davor nennt Büttner vier Bündel von Ursachen: Probleme im Aufbau der Republik, die Folgen des Krieges, die aktuellen Krisen und die Prägungen in den Köpfen. Den Ausschlag geben für sie aber Entscheidungen von Menschen.</p>
  <p class="hinweis">Das ist eine Stimme, nicht die Lösung. Andere Historiker*innen gewichten anders. Deine Geschichte darf zu einem anderen Urteil kommen – wenn sie triftig ist.</p>
  ${textfeld("rk.halt", "Stützt deine Geschichte dieses Urteil – oder widerspricht sie ihm? Begründe in zwei Sätzen.", { rows:3, zaehl:false, anfaenge:["Meine Geschichte stützt das Urteil, weil", "Ich gewichte anders:"] })}`)}</div></div>
  <div class="trift"><b>Landkarte:</b> Was du hier getan hast, heißt <a href="${LK}2-4-1" target="_blank" rel="noopener">Re-Konstruktion (2.4.1) ↗</a>. Dabei zeigt sich die <a href="${LK}2-1-7" target="_blank" rel="noopener">Konstruktivität (2.1.7) ↗</a>: Geschichte wird nicht „gefunden“, sondern aktiv zusammengesetzt. Deshalb können aus denselben Fakten unterschiedliche Geschichten entstehen – aber nicht jede ist gleich triftig.</div></section>`;
}
function start(){
  return `<section class="h-kopf"><p class="kennung">GGK · Jahrgangsstufe 1 · Kapitel 1</p><h1>Weimarer Republik</h1>
  <p class="h-unter">Vom Ersten Weltkrieg bis zum Ende der ersten deutschen Demokratie</p>
  ${zeitleiste(W_ANKER.map(a => [a[0], a[1], "", ""]), { klasse:"klein" })}
  <p class="h-nav">${Object.keys(W_BLOCK).map(k => `<a href="#abschnitt-${k}">${esc(W_BLOCK[k][1].replace("ca. ", ""))}</a>`).join("")}<a href="#h-ort">Verorten</a><a href="#h-kg">Kollektives Gedächtnis</a><a href="#h-lk">Landkarte</a><a href="#h-rk">Abschluss</a><a href="#h-sichern">Sichern</a></p></section>
  ${Object.keys(W_BLOCK).map(hBlock).join("")}
  ${hOrt()}
  ${hGedaechtnis()}
  ${hLandkarte()}
  ${hAbschluss()}
  <section class="h-sichern nodruck" id="h-sichern" aria-labelledby="h-si"><h2 id="h-si" class="abschnitt">Deine Arbeit sichern</h2>
  <p>Alles, was du in diesem Kapitel schreibst, liegt nur auf diesem Gerät. Sichere es als Datei, bevor du das Gerät wechselst – und lade die Datei auf dem neuen Gerät wieder.</p>
  <div class="reihe"><button type="button" class="btn dunkel" data-akt="wexport">Lernspur als Datei sichern</button>
  <label class="btn h-datei">Datei laden<input type="file" accept="application/json,.json" data-wimport></label>
  <button type="button" class="btn" data-akt="wdruck">Übersicht drucken</button></div>
  <p class="hinweis" id="h-meld" aria-live="polite"></p></section>`;
}
AKTION.wexport = () => {
  const d = {}; try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (/^ggk-w(eimar|-)/.test(k)) d[k] = localStorage.getItem(k); } } catch(e) {}
  const tag = new Date().toISOString().slice(0, 10), b = new Blob([JSON.stringify({ art:"ggk-weimar-lernspur", stand:tag, daten:d })], { type:"application/json" }), a = document.createElement("a");
  a.href = URL.createObjectURL(b); a.download = `weimar-lernspur-${tag}.json`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  const m = document.getElementById("h-meld"); if (m) m.textContent = `Gesichert: ${Object.keys(d).length} Einträge in der Datei weimar-lernspur-${tag}.json.`;
};
/* Druck: Ein Textfeld druckt nur, was gerade sichtbar ist. Vor dem Drucken bekommt deshalb jedes Feld einen Spiegel aus normalem Text; das Feld selbst bleibt im Druck verborgen. */
const hDruckNach = () => document.querySelectorAll(".h-druckspiegel").forEach(d => d.remove());
const hDruckVor = () => { hDruckNach(); document.querySelectorAll("#main textarea").forEach(t => { const d = document.createElement("div"); d.className = "h-druckspiegel"; d.textContent = t.value.trim() || "–"; t.insertAdjacentElement("afterend", d); }); };
window.addEventListener("beforeprint", hDruckVor); window.addEventListener("afterprint", hDruckNach);
AKTION.wdruck = () => window.print();
AKTION.wdruckrk = () => { document.body.classList.add("druck-rk"); const weg = () => { document.body.classList.remove("druck-rk"); window.removeEventListener("afterprint", weg); }; window.addEventListener("afterprint", weg); window.print(); };
document.addEventListener("change", ev => {
  const t = ev.target.closest && ev.target.closest("[data-wimport]"); if (!t || !t.files || !t.files[0]) return;
  const r = new FileReader(), meld = s => { const m = document.getElementById("h-meld"); if (m) m.textContent = s; };
  r.onload = () => { try { const j = JSON.parse(r.result); if (j.art !== "ggk-weimar-lernspur" || !j.daten) throw 0; let n = 0;
      Object.keys(j.daten).forEach(k => { if (/^ggk-w(eimar|-)/.test(k) && typeof j.daten[k] === "string") { localStorage.setItem(k, j.daten[k]); n++; } });
      S = null; location.reload(); } catch(e) { meld("Diese Datei passt nicht. Wähle eine Datei, die mit „weimar-lernspur“ beginnt."); } };
  r.readAsText(t.files[0]);
});
const SEITE_FN = { start, lehrkraft };
kernStart();
