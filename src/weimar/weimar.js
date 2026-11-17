/* ===== Kapitel »Weimarer Republik« (Heft „Geschichte aktuell 1“, M1–M14): gemeinsame Teile jeder Stunde =====
   Jede Stunde setzt L = { wid, key, nr, titel, unter, mark, dauer, block, hier, frage, satz, ziele, blatt, erledigt, schreib, zf, init } und ruft am Ende weimarStart(). */
const W_KEY = "ggk-weimar:v1";
const wLade = () => { try { return Object.assign({ faden:{}, kg:{} }, JSON.parse(localStorage.getItem(W_KEY)) || {}); } catch(e) { return { faden:{}, kg:{} }; } };
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
  const c = L.deck, b = W_BLOCK[L.block], u = wLade(), vor = wNachbar(-1), faden = vor ? u.faden[vor[0]] : "";
  return `${wBand(c)}
  <p class="leitfrage">${esc(L.frage)}</p>
  ${c.belastend ? belastend(c.belastend) : ""}
  <section class="w-wo" aria-label="Wo wir stehen"><p class="kennung">Wo wir stehen · ${esc(b[0])} (${esc(b[1])})</p>
  ${zeitleiste(W_ANKER.map((a, i) => [a[0], a[1], "", (c.hier || []).includes(i) ? "hier" : ""]), { klasse:"klein" })}
  <p class="hinweis">Leitfrage dieses Abschnitts: ${esc(b[2])}</p></section>
  <div class="deck"><div>
    <h2 class="abschnitt">Am Ende kannst du</h2><ul class="ziele">${c.ziele.map(z => `<li>${esc(z)}</li>`).join("")}</ul>
    ${faden ? `<div class="w-faden"><p class="kennung">Dein roter Faden aus ${esc(vor[1])}</p><p class="mein">${esc(faden)}</p></div>` : ""}
  </div><div>
    <h2 class="abschnitt">So läuft dieses Blatt</h2>${blattAblauf()}
    <p class="hinweis" style="margin-top:.7rem">Links steht das Register mit allen Aufträgen. Manche öffnen erst auf Ansage oder nach deiner Antwort. Dein Stand bleibt auf diesem Gerät; sichere am Ende die Zusammenfassung als PDF.</p>
    <div class="deck-start"><button type="button" class="btn primary" data-geh="${L.blatt[0].id}">Mit Auftrag ${L.blatt[0].nr} beginnen ›</button></div>
  </div></div>`;
}
/* Auftrag und Bild als ein Kopf (Muster aus M22 4.1). Fehlt das Bild, bleibt der Auftrag allein stehen. */
const kopfpaar = (auftragHtml, b) => `<div class="kopfpaar">${auftragHtml}<figure><img src="media/${b.datei}" alt="${esc(b.alt)}" loading="lazy" onerror="this.closest('.kopfpaar').classList.add('ohne');this.closest('figure').remove()"><figcaption>${b.text} <span>${b.nachweis}</span></figcaption></figure></div>`;
/* Roter Faden: ein Satz am Ende jeder Stunde; er wandert in die Übersicht des Kapitels und aufs Deckblatt der nächsten Stunde. */
const fadenFeld = () => `<div class="w-fadenfeld nodruck">${auftrag("Allein · 2 Minuten", "Ein Satz für den roten Faden", "Die Leitfrage dieses Abschnitts: " + esc(W_BLOCK[L.block][2]) + " Was trägt diese Stunde zur Antwort bei?")}
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
  L.kapitel = "Weimarer Republik"; L.seiten = [["start","",""]].concat(L.blatt.map(a => [a.id, a.min + " Min.", a.kurz]));
  const init0 = L.init; L.init = () => Object.assign({ faden:(wLade().faden[L.wid] || ""), kg:(wLade().kg[L.wid] || "") }, init0 ? init0() : {});
  const ne0 = L.nachEingabe; L.nachEingabe = p => { if (p === "faden") wSchreib(u => { u.faden[L.wid] = S.faden; }); if (p === "kg") wSchreib(u => { u.kg[L.wid] = S.kg; }); if (ne0) ne0(p); };
  kernStart();
}
/* Kopf: Rückweg zur Übersicht und zum Kapitel */
const kopf0 = kopf;
kopf = function(){ kopf0(); const k = document.getElementById("kopf"), p = k.querySelector(".pill"); if (p) p.insertAdjacentHTML("beforebegin", `<a class="pill kapitel" href="index.html">Kapitel Weimar</a>`); };

/* ---------- Wahr oder falsch – mit Erklärung je Antwort (Muster 2). aussagen = [[Text, richtig:true|false|null, Erklärung bei „wahr“, Erklärung bei „falsch“]]
   richtig = null heißt: Die Aussage lässt sich nicht mit einem Wort beantworten; beide Antworten bekommen eine einordnende Rückmeldung. ---------- */
function wahrFalsch(pfad, aussagen){
  const st = hol(pfad) || {};
  return `<div class="w-wahrfalsch">${aussagen.map((a, i) => { const v = st[i], r = a[1];
    const stufe = v == null ? "" : (r === null ? "teils" : ((v === "w") === r ? "zentral" : "kaum")), wort = { zentral:"Stimmt.", kaum:"Noch nicht.", teils:"Genauer hinsehen." }[stufe];
    return `<div class="w-wf"><p>${esc(a[0])}</p><div class="w-wfk" role="group" aria-label="Wahr oder falsch"><button type="button" data-akt="wf" data-p="${pfad}" data-i="${i}" data-w="w" aria-pressed="${v === "w"}" ${v ? "disabled" : ""}>Wahr</button><button type="button" data-akt="wf" data-p="${pfad}" data-i="${i}" data-w="f" aria-pressed="${v === "f"}" ${v ? "disabled" : ""}>Falsch</button>${v ? `<button type="button" class="btn" data-akt="wfneu" data-p="${pfad}" data-i="${i}" style="min-width:0">Noch einmal</button>` : ""}</div>
    <div aria-live="polite" style="grid-column:1/-1">${v ? `<div class="rm ${stufe}"><b>${wort}</b> ${esc(v === "w" ? a[2] : a[3])}</div>` : ""}</div></div>`; }).join("")}</div>`;
}
const wfFertig = (pfad, n) => { const st = hol(pfad) || {}; for (let i = 0; i < n; i++) if (!st[i]) return false; return true; };
AKTION.wf = t => { setz(`${t.dataset.p}.${t.dataset.i}`, t.dataset.w); zeichneBehalte(); };
AKTION.wfneu = t => { setz(`${t.dataset.p}.${t.dataset.i}`, null); zeichneBehalte(); };
const lang = (p, n = 10) => String(hol(p) || "").trim().length >= n;
