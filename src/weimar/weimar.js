/* ===== Kapitel »Weimarer Republik« (Heft „Geschichte aktuell 1“, M1–M14): gemeinsame Teile jeder Stunde =====
   Jede Stunde setzt L = { wid, key, nr, titel, unter, mark, dauer, block, hier, frage, satz, ziele, blatt, erledigt, schreib, zf, init } und ruft am Ende weimarStart(). */
const W_KEY = "ggk-weimar:v1";
const wLade = () => { try { return Object.assign({ faden:{}, kg:{}, linie:{} }, JSON.parse(localStorage.getItem(W_KEY)) || {}); } catch(e) { return { faden:{}, kg:{}, linie:{} }; } };
const wSchreib = f => { const u = wLade(); f(u); try { localStorage.setItem(W_KEY, JSON.stringify(u)); } catch(e) {} };
/* Vier Blöcke mit Leitsatz – Titel und Leitsätze wörtlich aus dem digitalen Inhaltsverzeichnis des Kurses (Inhaltsverzeichnis-GGK). */
const W_BLOCK = {
  a:["Einstieg und Erster Weltkrieg – Standortgebundenheit", "ca. 1914–1918", "Wie entstand der Erste Weltkrieg – und wie beeinflusst unser Standort, was wir davon erzählen?"],
  b:["Novemberrevolution und Gründung der Weimarer Republik", "1918–1919", "Warum scheiterte die Revolution – und was sagt das über die Fragilität von Demokratie?"],
  c:["Versailler Vertrag und internationale Neuordnung", "1919", "War Versailles ein gerechter Frieden – oder die Ursache des nächsten Krieges?"],
  d:["Kollektives Gedächtnis und Weimarer Republik – Krisenjahre", "1919–1933", "Was hindert Demokratien daran, sich selbst zu verteidigen – damals wie heute?"],
};
/* Stundenfolge des Kapitels: [wid, Nummer, Titel, Datei, Block] */
const W_MODULE = [
  ["m01","M1","Mein Leben im Jahr 1917 – Was hätte ich gedacht?","m01-mein-leben-1917.html","a"],
  ["m02","M2","Der Ausbruch des Ersten Weltkriegs","m02-ausbruch-erster-weltkrieg.html","a"],
  ["m03","M3","Standortgebundenheit: der Völkermord an den Armenier*innen","m03-standortgebundenheit.html","a"],
  ["m04","M4","Der Krieg ist verloren! Die Matrosen meutern!","m04-novemberrevolution.html","b"],
  ["m05","M5","Die doppelte Ausrufung der Republik","m05-doppelte-ausrufung.html","b"],
  ["m06","M6","Die Versailler Friedenskonferenz","m06-friedenskonferenz.html","c"],
  ["m07","M7","Der Versailler Vertrag aus „deutscher“ Perspektive","m07-versailler-vertrag.html","c"],
  ["m071","M7.1","Wer trägt die Schuld am Ersten Weltkrieg?","m07-1-kriegsschuld.html","c"],
  ["m08","M8","Das kollektive Gedächtnis – Identität und Erinnerung","m08-kollektives-gedaechtnis.html","d"],
  ["m09","M9","Wohin soll die Reise gehen? Die Wahlen 1919","m09-wahlen-1919.html","d"],
  ["m10","M10","Die Saat der Gewalt 1918–1922","m10-saat-der-gewalt.html","d"],
  ["m11","M11","Das Krisenjahr 1923 und seine Konsequenzen","m11-krisenjahr-1923.html","d"],
  ["m12","M12","Stabilisierungsjahre: Die Goldenen Zwanziger","m12-goldene-zwanziger.html","d"],
  ["m13","M13","Zwei Leben einer Zeit","m13-zwei-leben.html","d"],
  ["m14","M14","Warum scheitert Weimar? Die Weltwirtschaftskrise","m14-warum-scheitert-weimar.html","d"],
  ["m142","M14.2","Warum scheitert Weimar? Verfassung und Präsidialkabinette","m14-2-verfassung-praesidialkabinette.html","d"],
];
/* Ankerdaten des Kapitels (Orientierungswissen) */
const W_ANKER = [["1914","Der Erste Weltkrieg beginnt"],["9. Nov. 1918","Ausrufung der Republik"],["28. Juni 1919","Versailler Vertrag"],["11. Aug. 1919","Weimarer Verfassung"],["1923","Krisenjahr"],["1924–1929","Jahre der Stabilisierung"],["Okt. 1929","Weltwirtschaftskrise"],["30. Jan. 1933","Hitler wird Reichskanzler"]];
const wMod = id => W_MODULE.find(m => m[0] === (id || L.wid));
const wNachbar = d => W_MODULE[W_MODULE.findIndex(m => m[0] === L.wid) + d];
const wGebaut = id => (window.W_GEBAUT || []).includes(id);
/* Bild im Kopfband: Liegt die Datei nicht vor (öffentliche Fassung), bleibt die Jahreszahl als Zeichen stehen. */
const wBand = c => `<div class="band gross mit w-band"><div class="bt"><span class="ob">${esc(L.nr)} · ${esc(c.dauer)}</span><h2>${esc(L.titel)}</h2><p>${c.satz}</p></div>
  <figure><div class="w-jahr" aria-hidden="true"><span>${esc(c.jahr)}</span></div>${c.bild ? `<img src="media/${c.bild.datei}" alt="${esc(c.bild.alt)}" onerror="this.closest('figure').classList.add('ohne');this.remove()"><figcaption>${c.bild.text} <span>${c.bild.nachweis}</span></figcaption>` : ""}</figure></div>`;
/* Deckblatt: Kopfband, Leitfrage, Ziele, Ablauf, »Wo wir stehen«, roter Faden bisher */
function deckblatt(){
  const c = L.deck, b = L.blockinfo || W_BLOCK[L.block], u = wLade(), vor = wNachbar(-1) || (L.vorher ? wMod(L.vorher) : null), faden = vor ? u.faden[vor[0]] : "";
  const zl = S.zuletzt && AUF(S.zuletzt) && S.zuletzt !== L.blatt[0].id ? AUF(S.zuletzt) : null;
  return `${zl ? `<p class="w-weiter nodruck"><span>Zuletzt warst du bei Auftrag ${zl.nr}: <b>${esc(zl.kurz)}</b>.</span><button type="button" class="btn primary" data-geh="${zl.id}">Weitermachen ›</button></p>` : ""}${wBand(c)}
  <p class="leitfrage">${esc(L.frage)}</p>
  ${c.belastend ? belastend(c.belastend) : ""}
  <section class="w-wo" aria-label="Wo wir stehen"><p class="kennung">Wo wir stehen · ${esc(b[0])} (${esc(b[1])})</p>
  ${zeitleiste((L.anker || W_ANKER).map((a, i) => [a[0], a[1], "", (c.hier || []).includes(i) ? "hier" : ""]), { klasse:"klein" })}
  <p class="hinweis">Leitfrage dieses Abschnitts: ${esc(b[2])}</p></section>
  <div class="deck"><div>
    <h2 class="abschnitt">Am Ende kannst du</h2><ul class="ziele">${c.ziele.map(z => `<li>${esc(z)}</li>`).join("")}</ul>
    ${faden ? `<div class="w-faden"><p class="kennung">Dein roter Faden aus ${esc(vor[1])}</p><p class="mein">${esc(faden)}</p></div>` : ""}
  </div><div>
    <h2 class="abschnitt">So läuft dieses Blatt</h2>${blattAblauf()}
    <p class="hinweis" style="margin-top:.7rem">Links steht das Register mit allen Aufträgen. Manche öffnen erst auf Ansage oder nach deiner Antwort. Dein Stand bleibt auf diesem Gerät; sichere am Ende die Zusammenfassung als PDF.</p>
    <div class="deck-start">${zl ? `<button type="button" class="btn" data-geh="${L.blatt[0].id}">Von vorn: Auftrag ${L.blatt[0].nr}</button><button type="button" class="btn primary" data-geh="${zl.id}">Weitermachen bei Auftrag ${zl.nr}: ${esc(zl.kurz)} ›</button>` : `<button type="button" class="btn primary" data-geh="${L.blatt[0].id}">Mit Auftrag ${L.blatt[0].nr} beginnen ›</button>`}</div>
  </div></div>`;
}
/* Auftrag und Bild als ein Kopf (Muster aus M22 4.1). Fehlt das Bild, bleibt der Auftrag allein stehen. */
const kopfpaar = (auftragHtml, b) => `<div class="kopfpaar">${auftragHtml}<figure><img src="media/${b.datei}" alt="${esc(b.alt)}" loading="lazy" onerror="this.closest('.kopfpaar').classList.add('ohne');this.closest('figure').remove()"><figcaption>${b.text} <span>${b.nachweis}</span></figcaption></figure></div>`;
/* Links, die nur im Moodle-Paket stehen (Pinnwände, Umfragen mit Schlüssel im Link): Das Paket-Werkzeug schreibt window.W_LINKS in die Seite; öffentlich fehlt der Eintrag. */
const wLink = k => (window.W_LINKS || {})[k] || null;
/* Acht Einträge nach dem Heft, M8.1. Verweise auf die Stunden nach der heutigen Zählung. */
const W_KG8 = [
  { id:"trauma", titel:"Kriegstrauma", m:"M1, M2", text:"Die Schrecken und Entbehrungen des Ersten Weltkriegs haben Millionen von Soldaten für ihr Leben gezeichnet und Hass auf die Sieger verbreitet. Stichwort: „Kriegszitterer“. Der Krieg war ein industrielles Töten." },
  { id:"dolch", titel:"Dolchstoßlegende", m:"M4", text:"„Im Felde unbesiegt“: Durch Propaganda wurde der Bevölkerung über Jahre der nahe Sieg versprochen. Die Oberste Heeresleitung – die selbst den Waffenstillstand wollte – schob die Schuld an der Niederlage Demokrat*innen und Jüdinnen und Juden zu." },
  { id:"selbst", titel:"Selbstbestimmungsrecht der Völker", m:"M6", text:"Der Nationalismus hat sich als „Ersatzreligion“ auf der höchsten politischen Ebene durchgesetzt. Damit gehen dauernde Konflikte einher: Wer gehört zur Nation, wer nicht? Welches Land gehört „uns“?" },
  { id:"diktat", titel:"Versailles als „Diktatfrieden“", m:"M7", text:"Große Gebietsverluste, Reparationen, Kriegsschuld (so wurde Artikel 231 verstanden), nur noch 100.000 Soldaten. Viele empfinden das als Kränkung ihres früheren Selbstbilds." },
  { id:"staat", titel:"Gegner der Demokratie im Staatsdienst", m:"", text:"In Polizei, Behörden und Gerichten der neuen Republik arbeiten überwiegend dieselben Menschen wie in der Kaiserzeit. Viele sind konservativ, der Monarchie treu und der Demokratie gegenüber skeptisch bis feindlich." },
  { id:"doppelt", titel:"Doppelte Ausrufung der Republik", m:"M5", text:"Am 9. November 1918 rufen Scheidemann und Liebknecht zwei verschiedene Republiken aus. Die Republik entsteht im Streit. Neu sind das Wahlrecht für Frauen und das niedrigere Wahlalter." },
  { id:"eugenik", titel:"Eugenik und „Rassenkunde“", m:"Auftrag 4", text:"Eine Idee aus dem 19. Jahrhundert (Ideengeschichte): Menschen werden nach einem angeblichen „Wert“ eingeteilt. Dazu recherchierst du in Auftrag 4." },
  { id:"justiz", titel:"„Auf dem rechten Auge blind“", m:"M10", text:"Die Justiz beurteilt Straftaten deutlich milder, wenn sie von Rechten verübt werden. Stichwort: Attentate auf Politiker." },
];
/* Das Raster aus M8.1 wächst weiter: In diesen Stunden schreiben die Lernenden je einen Eintrag (Speicher der Einheit, kg[wid]). */
const W_KGNEU = [["m10","Gewalt auf den Straßen, Morde an Politikern"],["m11","Krisenjahr 1923"],["m12","Die Goldenen Zwanziger"],["m14","Weltwirtschaftskrise 1929"],["m142","Verhalten der NSDAP"]];
/* Roter Faden: ein Satz am Ende jeder Stunde; er wandert in die Übersicht des Kapitels und aufs Deckblatt der nächsten Stunde. */
const fadenFeld = () => leitNach() + `<div class="w-fadenfeld nodruck">${auftrag("Allein · 2 Minuten", "Ein Satz für den roten Faden", "Die Leitfrage dieses Abschnitts: " + esc(W_BLOCK[L.block][2]) + " Was trägt diese Stunde zur Antwort bei?")}
  ${textfeld("faden", "Mein Satz", { rows:2, zaehl:false, anfaenge:L.fadenAnf || ["Diese Stunde zeigt, dass", "Für die Leitfrage heißt das:"] })}</div>`;
/* Eintrag ins »kollektive Gedächtnis der Weimarer Republik« (Raster aus M8.1, wächst von M8 bis M14) */
const kgFeld = (titel, text) => `<div class="w-kgfeld">${auftrag("Allein · 3 Minuten", "Eintrag ins kollektive Gedächtnis der Republik", text || "Was aus dieser Stunde bleibt im Gedächtnis der Menschen von damals – und wie wirkt es weiter? Zwei bis drei Stichpunkte für das Raster aus M8.1.")}
  ${textfeld("kg", titel, { rows:3, zaehl:false })}</div>`;
/* Text aus dem Heft als Leseblatt; Absätze als Liste */
const leseblatt = (titel, abs, nachweis, o = {}) => `<div class="qblatt lese ${o.klasse || ""}"><h3>${esc(titel)}</h3><div class="qtext">${abs.map(a => Array.isArray(a) ? `<p><span class="qtag">${esc(a[0])}</span>${a[1]}</p>` : `<p>${a}</p>`).join("")}</div><p class="quelle">${nachweis}</p></div>`;
/* Wortlautquelle (Rede, Vertrag) groß gesetzt */
const zitat = (kopf, text, wer) => `<figure class="w-zitat"><figcaption class="kennung">${kopf}</figcaption><blockquote>${text}<span class="wer">${wer}</span></blockquote></figure>`;
/* Balken für Wahlergebnisse (eigene Grafik aus den Zahlen der Tabelle im Heft, M14) */
const balken = (titel, werte, nachweis) => { const max = Math.max.apply(null, werte.map(w => w[1]));
  return `<figure class="w-balken"><figcaption><b>${esc(titel)}</b></figcaption><div class="w-bz" role="list">${werte.map(w => `<div class="w-bzeile" role="listitem"><span class="w-bn">${esc(w[0])}</span><span class="w-bb"><span style="width:${(w[1] / max * 100).toFixed(1)}%;background:${w[2] || "var(--ink)"}"></span></span><span class="w-bw">${String(w[1]).replace(".", ",")} %</span></div>`).join("")}</div><p class="quelle">${nachweis}</p></figure>`; };

function weimarStart(){
  L.kapitel = L.kapitel || "Weimarer Republik"; L.seiten = [["start","",""]].concat(L.blatt.map(a => [a.id, a.min + " Min.", a.kurz]));
  const init0 = L.init; L.init = () => Object.assign({ faden:(wLade().faden[L.wid] || ""), kg:(wLade().kg[L.wid] || ""), lf:{ vor:null, nach:null }, blickfehlt:"", linie:null, liniegrund:"", zuletzt:"" }, init0 ? init0() : {});
  const ne0 = L.nachEingabe; L.nachEingabe = p => { if (p === "faden") wSchreib(u => { u.faden[L.wid] = S.faden; }); if (p === "kg") wSchreib(u => { u.kg[L.wid] = S.kg; }); if (ne0) ne0(p); };
  const ni0 = L.nachInit; L.nachInit = () => { zkInit(); if (ni0) ni0(); };
  /* Leitfrage als Linie: vor dem ersten Auftrag festlegen, am Ende zurückkehren (L.pole) · Blick der Stunde an der Landkarte offenlegen (L.blick) */
  if (L.pole) { const id0 = L.blatt[0].id, f0 = SEITE_FN[id0]; SEITE_FN[id0] = () => leitVor() + f0();
    if (L.zf && !L.pole.eigen) (L.zf.mein = L.zf.mein || []).push(["Die Leitfrage – am Anfang und am Ende", () => { const lf = S.lf || {}; return lf.vor == null && lf.nach == null ? "" : `Am Anfang: ${lf.vor == null ? "offen" : lf.vor + " von 5"} · am Ende: ${lf.nach == null ? "offen" : lf.nach + " von 5"} (1 = ${L.pole.links} · 5 = ${L.pole.rechts})`; }]); }
  if (L.blick && SEITE_FN.landkarte) { const f1 = SEITE_FN.landkarte; SEITE_FN.landkarte = () => f1() + blickKarte(); }
  kernStart();
  /* Eine Adresse zeigt immer dieselbe Seite: ohne Anker das Deckblatt, mit Anker den Auftrag. Der gemerkte Platz bleibt als »Weitermachen« erhalten. */
  const h = location.hash.replace("#", "");
  if (AUF(S.seite)) S.zuletzt = S.seite;
  if (!(h && SEITE_FN[h]) && S.seite !== "start") { S.seite = "start"; zeichne(false); }
}
/* Kopf: Rückweg zur Übersicht und zum Kapitel */
const kopf0 = kopf;
kopf = function(){ kopf0(); const k = document.getElementById("kopf"), p = k.querySelector(".pill"); if (p && !L.hub && wMod()) p.insertAdjacentHTML("beforebegin", `<a class="pill kapitel" href="index.html">Kapitel Weimar</a>`); };

/* ---------- Wahr oder falsch – mit Erklärung je Antwort (Muster 2). aussagen = [[Text, richtig:true|false|null, Erklärung bei „wahr“, Erklärung bei „falsch“]]
   richtig = null heißt: Die Aussage lässt sich nicht mit einem Wort beantworten; beide Antworten bekommen eine einordnende Rückmeldung. ---------- */
function wahrFalsch(pfad, aussagen){
  const st = hol(pfad) || {};
  return `<div class="w-wahrfalsch">${aussagen.map((a, i) => { const v = st[i], r = a[1];
    const stufe = v == null ? "" : (r === null ? "teils" : ((v === "w") === r ? "zentral" : "kaum")), wort = { zentral:"Stimmt.", kaum:"Noch nicht.", teils:"Genauer hinsehen." }[stufe];
    return `<div class="w-wf"><p>${esc(a[0])}</p><div class="w-wfk" role="group" aria-label="Wahr oder falsch"><button type="button" data-akt="wf" data-p="${pfad}" data-i="${i}" data-w="w" aria-pressed="${v === "w"}" ${v ? "disabled" : ""}>Wahr</button><button type="button" data-akt="wf" data-p="${pfad}" data-i="${i}" data-w="f" aria-pressed="${v === "f"}" ${v ? "disabled" : ""}>Falsch</button>${v ? `<button type="button" class="btn" data-akt="wfneu" data-p="${pfad}" data-i="${i}" style="min-width:0">Noch einmal</button>` : ""}</div>
    <div aria-live="polite" style="grid-column:1/-1">${v ? `<div class="rm ${stufe}"><b>${wort}</b> ${esc(v === "w" ? a[2] : a[3])}</div>` : ""}</div></div>`; }).join("")}${skipZeile(pfad, aussagen.length)}</div>`;
}
const wfFertig = (pfad, n) => { const st = hol(pfad) || {}; if (st.skip) return true; for (let i = 0; i < n; i++) if (!st[i]) return false; return true; };
AKTION.wf = t => { setz(`${t.dataset.p}.${t.dataset.i}`, t.dataset.w); zeichneBehalte(); };
AKTION.wfneu = t => { setz(`${t.dataset.p}.${t.dataset.i}`, null); zeichneBehalte(); };
const lang = (p, n = 10) => String(hol(p) || "").trim().length >= n;

/* ---------- Wissens-Check mit Erklärung je Antwort (Muster 2): Die erste Antwort zählt, jede Antwort bekommt ihre eigene Erklärung. Keine Punkte.
   fragen = [[Frage, [[Antwort, richtig, Erklärung], …], Abschnitt zum Nachlesen]] · Stand: S[pfad][i] = Index der gewählten Antwort ---------- */
function check(pfad, fragen){
  const st = hol(pfad) || {};
  return `<div class="w-check">${fragen.map((f, i) => { const v = st[i], gew = v == null ? null : f[1][v];
    return `<fieldset class="w-cf"><legend><span class="w-nr">${i + 1}</span> ${esc(f[0])}</legend><div class="w-co">${f[1].map((o, k) => `<button type="button" data-akt="check" data-p="${pfad}" data-i="${i}" data-w="${k}" aria-pressed="${v === k}" ${v == null ? "" : "disabled"}>${esc(o[0])}</button>`).join("")}</div>
    <div aria-live="polite">${gew ? `<div class="rm ${gew[1] ? "zentral" : "kaum"}"><b>${gew[1] ? "Stimmt." : "Noch nicht."}</b> ${esc(gew[2])}${gew[1] ? "" : ` <span class="hinweis">Lies noch einmal: ${esc(f[2])}.</span> <button type="button" class="btn" data-akt="checkneu" data-p="${pfad}" data-i="${i}">Noch einmal</button>`}</div>` : ""}</div></fieldset>`; }).join("")}${skipZeile(pfad, fragen.length)}</div>`;
}
const checkFertig = (pfad, n) => { const st = hol(pfad) || {}; if (st.skip) return true; for (let i = 0; i < n; i++) if (st[i] == null) return false; return true; };
AKTION.check = t => { setz(`${t.dataset.p}.${t.dataset.i}`, +t.dataset.w); zeichneBehalte(); };
AKTION.checkneu = t => { setz(`${t.dataset.p}.${t.dataset.i}`, null); zeichneBehalte(); };

/* ---------- Mehrfachauswahl: Karten mit dem Marker anstreichen (Heft: »Markieren Sie die überzeugenden Überlegungen mit gelb«) ---------- */
const mehrWahl = (pfad, eintraege, o = {}) => `<div class="w-mw k${o.spalten || 3}" role="group" aria-label="${esc(o.titel || "Karten markieren")}">${eintraege.map(e => { const an = !!hol(`${pfad}.${e.id}`); return `<button type="button" data-akt="mw" data-p="${pfad}.${e.id}" aria-pressed="${an}">${e.kopf ? `<span class="kennung">${esc(e.kopf)}</span>` : ""}<b>${esc(e.titel)}</b><span class="w-mwt">${e.text}</span><span class="w-mws">${an ? "✓ " + esc(o.an || "markiert") : esc(o.aus || "antippen zum Markieren")}</span></button>`; }).join("")}</div>`;
const mwZahl = pfad => Object.values(hol(pfad) || {}).filter(Boolean).length;
AKTION.mw = t => { setz(t.dataset.p, !hol(t.dataset.p)); zeichneBehalte(); };
/* ---------- Wahlen 1919–1933: gültige Stimmen in Tausend. Quelle: Konrad-Adenauer-Stiftung, »Wahlen zum Reichstag in der Weimarer Republik 1919–1933« (kas.de, Geschichte der CDU; abgerufen 17.11.2026).
   Die Anteile sind daraus berechnet. KPD und USPD stehen dort in einer Zeile. Reihenfolge der Werte wie W_PARTEI. ---------- */
const W_PARTEI = [["links","KPD · USPD","#8E1F1F"],["spd","SPD","#B23A2E"],["ddp","DDP","#E0B74A"],["z","Zentrum","#6E6A62"],["bvp","BVP","#8C8579"],["dvp","DVP","#4F7FB5"],["dnvp","DNVP","#2F4B6E"],["ns","NSDAP","#5A3A1E"],["sonst","Sonstige","#B9B2A6"]];
const W_WAHLEN = {
  "1919":{ datum:"19. Januar 1919", bet:83.0, v:[2317,11509,5642,5980,0,1346,3121,0,485], namen:{ links:"USPD" } },
  "1920":{ datum:"6. Juni 1920", bet:79.1, v:[5637,6104,2334,3845,1239,3919,4249,0,869], namen:{ links:"USPD · KPD" } },
  "1924a":{ datum:"4. Mai 1924", bet:77.4, v:[3928,6009,1655,3914,947,2694,5696,1918,2520], namen:{ ns:"Völkische · NS" } },
  "1924b":{ datum:"7. Dezember 1924", bet:78.8, v:[2808,7881,1920,4119,1134,3049,6206,907,2266], namen:{ ns:"NS-Freiheitsbewegung" } },
  "1928":{ datum:"20. Mai 1928", bet:75.6, v:[3286,9153,1506,3712,946,2680,4382,810,4278], namen:{ links:"KPD" } },
  "1930":{ datum:"14. September 1930", bet:82.0, v:[4604,8578,1322,4128,1059,1578,2458,6410,4834], namen:{ links:"KPD", ddp:"DStP" } },
  "1932a":{ datum:"31. Juli 1932", bet:84.0, v:[5283,7960,372,4589,1193,436,2177,13746,1126], namen:{ links:"KPD", ddp:"DStP" } },
  "1932b":{ datum:"6. November 1932", bet:80.6, v:[5980,7248,337,4231,1095,662,2959,11737,1222], namen:{ links:"KPD", ddp:"DStP" } },
  "1933":{ datum:"5. März 1933", bet:88.7, v:[4848,7182,334,4425,1074,432,3137,17277,634], namen:{ links:"KPD", ddp:"DStP", dnvp:"DNVP (Kampffront)" } },
};
const W_WAHLQ = "Stimmenanteile berechnet aus den Stimmenzahlen bei der Konrad-Adenauer-Stiftung, „Wahlen zum Reichstag in der Weimarer Republik 1919–1933“ (kas.de). KPD und USPD sind dort zusammengezählt. Eigene Grafik.";
const wahlAnteil = (k, id) => { const w = W_WAHLEN[k], sum = w.v.reduce((a, b) => a + b, 0); return Math.round(w.v[W_PARTEI.findIndex(p => p[0] === id)] / sum * 1000) / 10; };
const wahlWerte = k => { const w = W_WAHLEN[k]; return W_PARTEI.map(p => [(w.namen || {})[p[0]] || p[1], wahlAnteil(k, p[0]), p[2], ""]).filter(x => x[1] > 0); };
/* ---------- Halbrund: Stimmenanteile als Bogen (eigene Grafik). werte = [[Name, Prozent, Farbe, Zusatz?]], von links nach rechts ---------- */
function halbrund(titel, werte, nachweis, o = {}){
  const sum = werte.reduce((a, w) => a + w[1], 0), R = 150, r = 80, cx = 170, cy = 166, komma = z => String(z).replace(".", ","); let a0 = Math.PI;
  const pt = (rad, a) => [(cx + rad * Math.cos(a)).toFixed(1), (cy - rad * Math.sin(a)).toFixed(1)];
  const seg = werte.map(w => { const a1 = a0 - Math.PI * w[1] / sum, A = pt(R, a0), B = pt(R, a1), C = pt(r, a1), D = pt(r, a0), M = pt((R + r) / 2, (a0 + a1) / 2);
    const d = `M${A[0]} ${A[1]}A${R} ${R} 0 0 1 ${B[0]} ${B[1]}L${C[0]} ${C[1]}A${r} ${r} 0 0 0 ${D[0]} ${D[1]}Z`; a0 = a1;
    return `<path d="${d}" fill="${w[2]}" stroke="#FBF8F1" stroke-width="2"/>` + (w[1] / sum > .07 ? `<text x="${M[0]}" y="${+M[1] + 5}" text-anchor="middle" class="hr-z">${komma(w[1])}</text>` : ""); }).join("");
  return `<figure class="w-halbrund ${o.schmal ? "schmal" : ""}"><figcaption class="kennung">${esc(titel)}</figcaption><div class="hr-in"><svg viewBox="0 0 340 176" role="img" aria-label="${esc(titel)}: ${werte.map(w => `${w[0]} ${komma(w[1])} Prozent`).join(", ")}">${seg}${o.mitte ? `<text x="${cx}" y="${cy - 26}" text-anchor="middle" class="hr-m">${esc(o.mitte)}</text>` : ""}${o.mitte2 ? `<text x="${cx}" y="${cy - 6}" text-anchor="middle" class="hr-m2">${esc(o.mitte2)}</text>` : ""}</svg>
  <ul class="hr-leg">${werte.map(w => `<li><span style="background:${w[2]}"></span><b>${esc(w[0])}</b><i>${komma(w[1])} %</i>${w[3] ? `<small>${esc(w[3])}</small>` : ""}</li>`).join("")}</ul></div><p class="quelle">${nachweis}</p></figure>`;
}
/* ---------- Linien: Entwicklung über mehrere Zeitpunkte (eigene Grafik) mit Zahlentabelle. reihen = [[Name, [Werte], Farbe]] ---------- */
function linien(titel, xs, reihen, nachweis, o = {}){
  const W = 640, H = 300, l = 38, r = 132, ob = 14, un = 34, max = o.max || 45, komma = z => String(z).replace(".", ",");
  const x = i => l + (W - l - r) * i / (xs.length - 1), y = v => ob + (H - ob - un) * (1 - v / max);
  let gitter = ""; for (let g = 0; g <= max; g += 10) gitter += `<line x1="${l}" x2="${W - r}" y1="${y(g)}" y2="${y(g)}" stroke="#6B655B" stroke-width="${g ? .6 : 1.4}"/><text x="${l - 6}" y="${y(g) + 4}" text-anchor="end" class="li-a">${g}</text>`;
  const achse = xs.map((n, i) => `<text x="${x(i)}" y="${H - 12}" text-anchor="middle" class="li-a">${esc(n)}</text>`).join("");
  /* Namen am rechten Rand: mindestens 15 Einheiten Abstand */
  const ende = reihen.map((q, k) => ({ k, y:y(q[1][q[1].length - 1]) })).sort((a, b) => a.y - b.y); for (let i = 1; i < ende.length; i++) if (ende[i].y - ende[i - 1].y < 15) ende[i].y = ende[i - 1].y + 15;
  const ly = {}; ende.forEach(e => { ly[e.k] = e.y; });
  const kurven = reihen.map((q, k) => `<polyline points="${q[1].map((v, i) => x(i).toFixed(1) + "," + y(v).toFixed(1)).join(" ")}" fill="none" stroke="${q[2]}" stroke-width="${q[3] ? 4.5 : 2.6}" stroke-linejoin="round"/>${q[1].map((v, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="${q[3] ? 5 : 3.6}" fill="${q[2]}" stroke="#211D12" stroke-width="1"/>`).join("")}<text x="${W - r + 10}" y="${(ly[k] + 4).toFixed(1)}" class="li-n" fill="${q[2]}">${esc(q[0])} ${komma(q[1][q[1].length - 1])}</text>`).join("");
  return `<figure class="w-linien"><figcaption class="kennung">${esc(titel)}</figcaption><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(titel)}. Die Zahlen stehen in der Tabelle darunter.">${gitter}${achse}${kurven}</svg>
  <div class="matrix-wrap"><table class="li-tab"><thead><tr><th scope="col">Stimmen in Prozent</th>${xs.map(n => `<th scope="col">${esc(n)}</th>`).join("")}</tr></thead><tbody>${reihen.map(q => `<tr><th scope="row"><span style="background:${q[2]}"></span>${esc(q[0])}</th>${q[1].map(v => `<td>${komma(v)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p class="quelle">${nachweis}</p></figure>`;
}
/* ---------- Stimmungskurve: je Station ein Wert von 1 bis 5; die gewählten Felder verbindet eine Linie. Stand: S[pfad][i] ---------- */
function kurve(pfad, stationen, o = {}){
  const st = hol(pfad) || {}, n = stationen.length, pts = stationen.map((s, i) => st[i] ? [(i + .5) / n * 600, (5 - st[i] + .5) / 5 * 250] : null);
  const stuecke = []; let lauf = []; pts.forEach(q => { if (q) lauf.push(q.map(z => z.toFixed(1)).join(",")); else { if (lauf.length > 1) stuecke.push(lauf); lauf = []; } }); if (lauf.length > 1) stuecke.push(lauf);
  return `<div class="w-kurve" style="--n:${n}"><div class="ku-achse" aria-hidden="true"><span>${esc(o.oben || "sehr gute Stimmung")}</span><span>${esc(o.unten || "sehr schlechte Stimmung")}</span></div>
  <div class="ku-feld">${stationen.map((s, i) => `<div class="ku-sp" role="group" aria-label="${esc(s[0])}">${[5,4,3,2,1].map(v => `<button type="button" data-akt="kurve" data-p="${pfad}.${i}" data-w="${v}" aria-pressed="${st[i] === v}" aria-label="${esc(s[0])}: ${v} von 5">${v}</button>`).join("")}</div>`).join("")}
  <svg viewBox="0 0 600 250" preserveAspectRatio="none" aria-hidden="true">${stuecke.map(q => `<polyline points="${q.join(" ")}" fill="none" stroke="#9B402D" stroke-width="4" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>`).join("")}</svg></div>
  <ol class="ku-namen">${stationen.map(s => `<li><b>${esc(s[0])}</b><span>${esc(s[1])}</span></li>`).join("")}</ol></div>`;
}
AKTION.kurve = t => { setz(t.dataset.p, +t.dataset.w); zeichneBehalte(); };
const kurveVoll = (pfad, n) => { const st = hol(pfad) || {}; return Array.from({ length:n }, (_, i) => st[i]).every(Boolean); };
/* ---------- Rechnen mit Rückmeldung: erst die eigene Zahl, dann die Erklärung (Muster 1). Stand: S[pfad] = { v, ok } ---------- */
function rechne(pfad, frage, soll, o = {}){
  const st = hol(pfad) || {}, ok = st.ok, id = "re-" + pfad.replace(/\W/g, "-");
  return `<div class="w-rechne"><label for="${id}">${esc(frage)}</label><div class="reihe"><input id="${id}" type="text" inputmode="decimal" data-f="${pfad}.v" value="${esc(st.v || "")}" placeholder="Zahl" autocomplete="off" ${ok === true ? "readonly" : ""}><span class="w-re-e">${esc(o.einheit || "%")}</span><button type="button" class="btn dunkel" data-akt="rechne" data-p="${pfad}" data-soll="${soll}" data-tol="${o.tol ?? .15}" ${ok === true ? "disabled" : ""}>Prüfen</button>${ok === true ? "" : `<button type="button" class="w-skipk" data-akt="skip" data-p="${pfad}" aria-pressed="${!!st.skip}">${st.skip ? "Übersprungen" : "Überspringen"}</button>`}</div>
  <div aria-live="polite">${ok === true ? `<div class="rm zentral"><b>Stimmt.</b> ${esc(o.ja || "")}</div>` : ok === false ? `<div class="rm kaum"><b>Noch nicht.</b> ${esc(o.nein || "Rechne noch einmal nach.")}</div>` : ""}</div></div>`;
}
AKTION.rechne = t => { const p = t.dataset.p, v = parseFloat(String((hol(p) || {}).v || "").replace(",", ".").replace(/[^\d.\-]/g, "")); setz(p + ".ok", !isNaN(v) && Math.abs(v - +t.dataset.soll) <= +t.dataset.tol); zeichneBehalte(); };
const rechneOk = p => { const s = hol(p) || {}; return s.ok === true || !!s.skip; };
/* ---------- Auf einem Bild zeichnen (Stift oder Finger): Linien liegen als Zahlen im Stand, nichts wird übertragen.
   pfad → S[pfad] = [{ s:Stift, p:[[x,y] …] }] mit x, y zwischen 0 und 1 · stifte = [[id, Farbe, Name]] ---------- */
function zeichenKarte(pfad, b, stifte){
  const st = hol(pfad + "Stift") || stifte[0][0], n = (hol(pfad) || []).length;
  return `<div class="w-zk" data-zk="${pfad}" data-stifte="${esc(JSON.stringify(stifte))}">
  <div class="g-stifte nodruck" role="group" aria-label="Stift wählen">${stifte.map(s => `<button type="button" class="g-stift" data-akt="setz" data-p="${pfad}Stift" data-w="${s[0]}" aria-pressed="${st === s[0]}"><span class="z" aria-hidden="true" style="color:${s[1]}">▬</span>${esc(s[2])}</button>`).join("")}
  <button type="button" class="btn" data-akt="zkzurueck" data-p="${pfad}" ${n ? "" : "disabled"}>Letzte Linie zurück</button><button type="button" class="btn" data-akt="zkleer" data-p="${pfad}" ${n ? "" : "disabled"}>Alles löschen</button></div>
  <div class="w-zk-b"><img src="media/${b.datei}" alt="${esc(b.alt)}" onerror="zkFehlt(this)"><canvas data-zkc="${pfad}" aria-label="Zeichenfläche über der Karte. Mit Stift oder Finger Linien ziehen."></canvas></div>
  <p class="quelle">${b.text || ""} ${b.nachweis || ""}</p>
  <p class="hinweis" data-zkh hidden>${b.fehlt || "Dieses Bild liegt nur im Moodle-Paket. Nimm die Karte im Heft und zeichne dort."}</p></div>`;
}
function zkFehlt(img){ const w = img.closest(".w-zk"); w.querySelector(".w-zk-b").hidden = true; w.querySelector(".g-stifte").hidden = true; w.querySelector("[data-zkh]").hidden = false; }
function zkMale(c){
  const pfad = c.dataset.zkc, w = c.closest(".w-zk"), img = w.querySelector("img"); if (!img || !img.naturalWidth) return;
  const r = img.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1); c.width = Math.round(r.width * dpr); c.height = Math.round(r.height * dpr);
  const x = c.getContext("2d"), farbe = Object.fromEntries(JSON.parse(w.dataset.stifte).map(s => [s[0], s[1]]));
  x.lineCap = "round"; x.lineJoin = "round"; x.lineWidth = 4 * dpr;
  (hol(pfad) || []).forEach(l => { if (!l.p.length) return; x.strokeStyle = farbe[l.s] || "#24221F"; x.beginPath(); l.p.forEach((q, i) => { const px = q[0] * c.width, py = q[1] * c.height; if (i) x.lineTo(px, py); else x.moveTo(px, py); }); if (l.p.length === 1) x.lineTo(l.p[0][0] * c.width + .1, l.p[0][1] * c.height); x.stroke(); });
}
function zkInit(){
  document.querySelectorAll("canvas[data-zkc]").forEach(c => { const img = c.closest(".w-zk").querySelector("img"); if (img.complete) zkMale(c); else img.addEventListener("load", () => zkMale(c), { once:true }); });
}
let ZK = null;
document.addEventListener("pointerdown", ev => { const c = ev.target.closest && ev.target.closest("canvas[data-zkc]"); if (!c) return; ev.preventDefault(); c.setPointerCapture(ev.pointerId);
  const r = c.getBoundingClientRect(), pfad = c.dataset.zkc, l = (hol(pfad) || []).slice(); ZK = { c, pfad, l, akt:{ s:hol(pfad + "Stift") || JSON.parse(c.closest(".w-zk").dataset.stifte)[0][0], p:[[+((ev.clientX - r.left) / r.width).toFixed(4), +((ev.clientY - r.top) / r.height).toFixed(4)]] } }; l.push(ZK.akt); });
document.addEventListener("pointermove", ev => { if (!ZK) return; const r = ZK.c.getBoundingClientRect(), q = [+((ev.clientX - r.left) / r.width).toFixed(4), +((ev.clientY - r.top) / r.height).toFixed(4)], v = ZK.akt.p[ZK.akt.p.length - 1];
  if (Math.abs(q[0] - v[0]) + Math.abs(q[1] - v[1]) < .004) return; ZK.akt.p.push(q); S[ZK.pfad] = ZK.l; zkMale(ZK.c); });
const zkEnde = () => { if (!ZK) return; setz(ZK.pfad, ZK.l); ZK.c.closest(".w-zk").querySelectorAll('[data-akt="zkzurueck"],[data-akt="zkleer"]').forEach(b => { b.disabled = false; }); ZK = null; if (typeof L.nachEingabe === "function") L.nachEingabe("zk"); if (BLATT()) register(); };
document.addEventListener("pointerup", zkEnde); document.addEventListener("pointercancel", zkEnde);
AKTION.zkzurueck = t => { const l = (hol(t.dataset.p) || []).slice(0, -1); setz(t.dataset.p, l); zeichneBehalte(); };
AKTION.zkleer = t => { setz(t.dataset.p, []); zeichneBehalte(); };
window.addEventListener("resize", () => document.querySelectorAll("canvas[data-zkc]").forEach(zkMale));

/* ===== Nachgerüstet am 18.11.2026 (Fachdidaktik Geschichte v1, Lernseite bauen v3.0) ===== */
/* ---------- Selbsttests sind freiwillig: überspringen sperrt nichts (»Freiwillig heißt freiwillig«) ---------- */
const skipZeile = (pfad, n) => { const st = hol(pfad) || {}; let alle = true; for (let i = 0; i < n; i++) if (st[i] == null) alle = false; if (alle && !st.skip) return "";
  return `<p class="w-skip nodruck"><button type="button" class="w-skipk" data-akt="skip" data-p="${pfad}" aria-pressed="${!!st.skip}">${st.skip ? "Übersprungen – doch bearbeiten" : "Selbsttest überspringen"}</button><span class="hinweis">${st.skip ? "Du kannst ihn jederzeit nachholen." : "Der Selbsttest ist freiwillig. Er sperrt nichts."}</span></p>`; };
AKTION.skip = t => { setz(t.dataset.p + ".skip", !(hol(t.dataset.p) || {}).skip); zeichneBehalte(); };

/* ---------- Leitfrage als Linie: festlegen vor dem ersten Material, zurückkehren am Ende (»Wer hat sich bewegt?«)
   L.pole = { frage?, links, rechts } · Stand: S.lf = { vor, nach } · steht automatisch vor Auftrag 1 und beim Satz für den roten Faden ---------- */
const leitVor = () => !L.pole ? "" : `<div class="w-leit vor"><p class="kennung">Leg dich fest – noch ohne Material · 1 Minute</p>${skala("lf.vor", esc(L.pole.frage || L.frage), 5, "1 = " + L.pole.links, "5 = " + L.pole.rechts)}<p class="hinweis">Hier gibt es kein Richtig oder Falsch. Am Ende der Stunde kommst du auf diese Linie zurück.</p></div>`;
const leitBeweg = () => { const lf = S.lf || {}, v = lf.vor, n = lf.nach;
  return n == null ? (v == null ? "Am Anfang hast du dich noch nicht festgelegt." : `Am Anfang standest du bei ${v} von 5.`) : v == null ? `Jetzt stehst du bei ${n} von 5.` : v === n ? `Am Anfang ${v}, jetzt ${n} von 5: Du bist bei deiner Einschätzung geblieben. Welcher Beleg aus der Stunde stützt sie am stärksten?` : `Am Anfang ${v}, jetzt ${n} von 5: Du hast dich bewegt. Was hat dich bewegt? Halte es in deiner Begründung fest.`; };
/* Steht die Rückkehr schon in einem eigenen Auftrag der Stunde (L.pole.eigen), entfällt sie beim roten Faden. */
const leitNach = () => { if (!L.pole || L.pole.eigen) return "";
  return `<div class="w-leit nach nodruck"><p class="kennung">Zurück zur Leitfrage · 1 Minute</p>${skala("lf.nach", "Wo stehst du jetzt? " + esc(L.pole.frage || L.frage), 5, "1 = " + L.pole.links, "5 = " + L.pole.rechts)}<p class="w-beweg" aria-live="polite">${leitBeweg()}</p></div>`; };

/* ---------- Erst erinnern (P2): zwei Fragen zu früheren Stunden, ohne Heft; aufdecken nach der eigenen Antwort ---------- */
const erinnere = (fragen, pfad = "ab") => `<div class="w-erinn"><p class="kennung">Erst erinnern · ohne Heft · ${fragen.length > 1 ? "2 Minuten" : "1 Minute"}</p>${abrufen(pfad, fragen)}</div>`;

/* ---------- Der Blick dieser Stunde: Der Zugang wird als Form von Geschichte offengelegt – erst selbst überlegen, was er ausblendet, dann vergleichen.
   L.blick = { name, anker (Abschnitt der Landkarte, z. B. "2-3-8"), tut, fehlt } ---------- */
const blickKarte = () => { const b = L.blick; if (!b) return "";
  /* Der Blick wird erst nach der Landkarten-Aufgabe benannt: Sonst nähme die Karte die Antwort vorweg (erst die Sache, dann der Begriff). */
  if (!S.lk.ok && !String(S.blickfehlt || "").trim()) return `<p class="w-blickzu">Der Blick dieser Stunde · öffnet sich, wenn du die Landkarten-Aufgabe geprüft hast.</p>`;
  return `<section class="w-blickk"><p class="kennung">Der Blick dieser Stunde · 1 Minute</p><h3>So haben wir heute auf Geschichte geschaut: ${esc(b.name)}</h3><p>${esc(b.tut)}${b.anker ? ` <a href="${LK}${b.anker}" target="_blank" rel="noopener">In der Landkarte nachlesen ↗</a>` : ""}</p>
  ${textfeld("blickfehlt", "Was blendet dieser Blick aus? Ein Satz.", { rows:2, zaehl:false, platz:"Nicht in den Blick kommt …" })}
  ${vergleich("blickv", ["blickfehlt"], 10, "Mit einem Vorschlag vergleichen", `<p>${esc(b.fehlt)}</p><p class="hinweis">Jeder Blick zeigt etwas und lässt etwas weg. Deshalb wechselt der Blick von Stunde zu Stunde.</p>`)}</section>`; };

/* ---------- Linie des Kurses »Umwelt oder Ich?« (Vorschlag vom 18.11.2026 – abschaltbar: L.linie in der Stunde weglassen).
   Die Linie beginnt mit der These aus M13 und kehrt mit derselben Skala wieder. L.linie = { fall, frage, anf } · Stand: S.linie, im Speicher der Einheit linie[wid] ---------- */
const linieFeld = () => { const c = L.linie; if (!c) return ""; const u = wLade().linie || {}, alt = W_MODULE.filter(m => u[m[0]] != null && m[0] !== L.wid);
  return `<section class="w-linie"><p class="kennung">Linie des Kurses seit M13 · 2 Minuten</p><h3>Umwelt oder Ich?</h3><p>${esc(c.fall)}</p>
  <div class="ab-zwei gleich"><div>${skala("linie", esc(c.frage), 5, "1 = eigene Entscheidung", "5 = die Umwelt bestimmt")}${alt.length ? `<p class="hinweis">Deine Linie bisher: ${alt.map(m => `${esc(m[1])}: ${u[m[0]]} von 5`).join(" · ")}</p>` : ""}</div>
  <div>${textfeld("liniegrund", "Mein Grund in einem Satz", { rows:2, zaehl:false, anfaenge:c.anf || ["Die Umwelt wirkt hier durch", "Spielraum bleibt, weil"] })}</div></div></section>`; };
const skala0 = AKTION.skala;
AKTION.skala = t => { skala0(t); const p = t.dataset.p; if (typeof L.wid !== "string") return;
  if (p === "linie") wSchreib(u => { (u.linie = u.linie || {})[L.wid] = S.linie; });
  if (L.wid === "m13" && (p === "l1" || p === "l2")) wSchreib(u => { (u.linie = u.linie || {}).m13 = S.l2 != null ? S.l2 : S.l1; }); };

/* ---------- Landkarte des Kapitels: welcher Eintrag in welcher Stunde zentral ist (tools/pruef/weimar_landkarte.py gleicht das mit den Stunden ab) ---------- */
const W_LK = { m01:[["3-1-2","Public History"]], m02:[["2-3-8","Ereignisgeschichte"]], m03:[["2-1-8","Standortgebundenheit"]], m04:[["2-1-3","Partikularität"],["2-1-4","Selektivität"]], m05:[["2-1-1","Retrospektivität"]],
  m06:[["1-3","Verständnis der Gegenwart"]], m07:[["2-3-2","Nationalgeschichte"]], m071:[["2-1-9","Kontroversität"],["2-1-8","Standortgebundenheit"]], m08:[["3-1-1","Kollektives Gedächtnis"]],
  m09:[["2-1-1","Retrospektivität"]], m10:[["2-1-6","Narrativität"],["2-1-1","Retrospektivität"]], m11:[["1-2","Anthropologische Konstanten"],["1-4","Lernen aus der Vergangenheit"]],
  m12:[["2-1-2","Perspektivität"],["2-1-4","Selektivität"]], m13:[["3-1-5","Agency"]], m14:[["2-1-5","Partialität"],["2-1-3","Partikularität"]], m142:[["1-8","Demokratisches Bewusstsein"]] };

/* ---------- Eine Adresse, eine Seite: Jeder Auftrag hat seinen Anker; das Deckblatt bleibt über das Register erreichbar ---------- */
const geh0 = geh;
geh = function(id){ if (BLATT() && AUF(id)) S.zuletzt = id; geh0(id); wAdresse(); };
const wAdresse = () => { try { const z = S.seite === "start" ? "" : "#" + S.seite; if (location.hash !== z) history.replaceState(null, "", z || (location.pathname + location.search)); } catch(e) {} };
window.addEventListener("hashchange", () => { if (!S) return; const h = location.hash.replace("#", ""), z = h && SEITE_FN[h] ? h : "start"; if (z !== S.seite && (SEITE_FN[h] || !h)) geh0(z); });
const register0 = register;
register = function(immer){ register0(immer); const r = document.getElementById("reg"); if (!r || !BLATT()) return; const t = r.querySelector(".ab-regtitel");
  if (t && !r.querySelector(".w-zumdeck")) t.insertAdjacentHTML("afterend", `<button type="button" class="w-zumdeck${S.seite === "start" ? " hier" : ""}" data-geh="start"${S.seite === "start" ? ' aria-current="page"' : ""}>Deckblatt<small>Leitfrage und Ablauf</small></button>`); };
