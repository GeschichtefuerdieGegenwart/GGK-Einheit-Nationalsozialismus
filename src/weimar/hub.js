/* ===== Kapitelübersicht »Weimarer Republik« (weimar/index.html): vier Abschnitte mit Leitfragen, alle Stunden, roter Faden, das wachsende Blatt »Kollektives Gedächtnis« ===== */
const L = {
  key:"ggk-w-hub:v1", hub:true, nr:"Kapitel 1", titel:"Weimarer Republik", unter:"Vom Ersten Weltkrieg bis zum Ende der ersten deutschen Demokratie · 1914–1933",
  /* Zeichen des Kapitels: Schwarz-Rot-Gold, die Farben der Republik */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><path d="M7 4v27" stroke="#24221F" stroke-width="2.6" stroke-linecap="round"/><path d="M9 6h20v6H9z" fill="#24221F"/><path d="M9 12h20v6H9z" fill="#B23A2E"/><path d="M9 18h20v6H9z" fill="#E0B74A"/></svg>`,
  seiten:[["start","",""]], breit:["start","lehrkraft"],
  loesch:"Deine Antworten auf die vier Leitfragen werden auf diesem Gerät entfernt. Die Eingaben in den einzelnen Stunden bleiben erhalten; du löschst sie in der jeweiligen Stunde.",
  init:() => ({ antwort:{ a:"", b:"", c:"", d:"" } }),
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
  <div class="h-bkopf"><span class="h-bnr" aria-hidden="true">${i + 1}</span><div><p class="kennung">Abschnitt ${i + 1} · ${esc(b[1])}</p><h2 id="h-${k}">${esc(b[0])}</h2></div></div>
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
function start(){
  return `<section class="h-kopf"><p class="kennung">GGK · Jahrgangsstufe 1 · Kapitel 1</p><h1>Weimarer Republik</h1>
  <p class="h-unter">Vom Ersten Weltkrieg bis zum Ende der ersten deutschen Demokratie</p>
  ${zeitleiste(W_ANKER.map(a => [a[0], a[1], "", ""]), { klasse:"klein" })}
  <p class="h-nav">${Object.keys(W_BLOCK).map((k, i) => `<a href="#abschnitt-${k}">${i + 1} · ${esc(W_BLOCK[k][1])}</a>`).join("")}<a href="#h-kg">Kollektives Gedächtnis</a><a href="#h-sichern">Sichern</a></p></section>
  ${Object.keys(W_BLOCK).map(hBlock).join("")}
  ${hGedaechtnis()}
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
AKTION.wdruck = () => window.print();
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
