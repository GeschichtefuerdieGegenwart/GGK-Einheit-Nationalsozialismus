"use strict";
/* ===== Gemeinsamer Kern M25–M27. Jede Stunde definiert danach L (Einstellungen), ihre Daten, SEITE_FN und ruft kernStart(). ===== */
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let S = {};
const lade = () => { try { return JSON.parse(localStorage.getItem(L.key)) || {}; } catch(e) { return {}; } };
const speichere = () => { try { localStorage.setItem(L.key, JSON.stringify(S)); } catch(e) {} };
const hol = p => p.split(".").reduce((o, k) => (o == null ? undefined : o[k]), S);
const setz = (p, v) => { const k = p.split("."); let o = S; for (let i = 0; i < k.length - 1; i++) { if (o[k[i]] == null || typeof o[k[i]] !== "object") o[k[i]] = {}; o = o[k[i]]; } o[k[k.length - 1]] = v; speichere(); };
const woerter = t => String(t || "").trim().split(/\s+/).filter(Boolean).length;
const ruhig = () => { try { return !!S.ruhig || matchMedia("(prefers-reduced-motion: reduce)").matches; } catch(e) { return !!S.ruhig; } };
const neu = (el, k) => { if (!el) return; el.classList.remove(k); void el.offsetWidth; if (!ruhig()) el.classList.add(k); };
const LABOR = /github\.io$/.test(location.hostname) ? "index.html" : "https://geschichtefuerdiegegenwart.github.io/GGK-Einheit-Nationalsozialismus/";
const LK = "https://geschichtefuerdiegegenwart.github.io/kognitive-Landkarte-des-Geschichtsunterrichts/#s-";
const idx = id => Math.max(0, L.seiten.findIndex(s => s[0] === id));

/* ---------- Bausteine für Seiten ---------- */
const zeitKopf = id => { const s = L.seiten[idx(id)]; return `<p class="zeit"><span class="nr">${esc(s[1])}</span><span>${esc(s[2])}</span></p>`; };
const weiter = (nach, text, o = {}) => `<div class="fuss"><span class="hinweis">${o.hinweis || "Dein Stand wird nur auf diesem Gerät gespeichert."}</span><button class="btn primary" data-geh="${nach}">${esc(text)} ›</button></div>`;
const auftrag = (form, titel, text) => `<div class="auftrag"><span class="form">${esc(form)}</span><h3>${esc(titel)}</h3><p>${text}</p></div>`;
const belastend = text => `<p class="belastend"><b>Hinweis vorab.</b> ${text}</p>`;
const status = (art, text) => `<span class="status ${art}">${esc(text)}</span>`;
const band = (ob, titel, text) => `<div class="band"><div class="bt"><span class="ob">${esc(ob)}</span><h2>${esc(titel)}</h2><p>${text}</p></div></div>`;
const hilfe = (titel, html) => `<details class="hilfe"><summary>${esc(titel)}</summary>${html}</details>`;

/* Textfeld mit Satzanfängen und Wortzähler (Gegenwart: Textfeld). pfad = Ort in S. */
function textfeld(pfad, label, o = {}){
  const v = hol(pfad) || "", id = "f-" + pfad.replace(/\W/g, "-");
  return `<div class="tf"><label for="${id}">${label}</label>
  <textarea id="${id}" data-f="${pfad}" rows="${o.rows || 3}" placeholder="${esc(o.platz || "")}">${esc(v)}</textarea>
  ${o.anfaenge ? `<div class="satzanfaenge nodruck" role="group" aria-label="Satzanfänge">${o.anfaenge.map(a => `<button type="button" data-satz="${id}" data-text="${esc(a)}">${esc(a)} …</button>`).join("")}</div>` : ""}
  ${o.zaehl === false ? "" : `<p class="zaehl" data-zaehl="${pfad}">${woerter(v)} Wörter${o.ziel ? " · " + esc(o.ziel) : ""}</p>`}</div>`;
}
const eingabe = (pfad, label, platz = "") => { const id = "f-" + pfad.replace(/\W/g, "-"); return `<div><label for="${id}">${label}</label><input type="text" id="${id}" data-f="${pfad}" value="${esc(hol(pfad) || "")}" placeholder="${esc(platz)}" autocomplete="off"></div>`; };
/* Kriterienraster: erscheint, sobald das Feld pfad mindestens min Wörter hat (P6: Vergleich erst nach dem eigenen Text). */
function raster(pfad, min, titel, zeilen){
  const da = woerter(hol(pfad)) >= min;
  return `<div data-raster="${pfad}" data-min="${min}" ${da ? "" : "hidden"}><h3 class="klein">${esc(titel)}</h3><div class="matrix-wrap"><table><thead><tr><th>Prüfe deinen Text</th><th>Grundlegend</th><th>Sicher</th><th>Souverän</th></tr></thead><tbody>${zeilen.map(z => `<tr><td><b>${esc(z[0])}</b></td><td>${esc(z[1])}</td><td>${esc(z[2])}</td><td>${esc(z[3])}</td></tr>`).join("")}</tbody></table></div></div>
  <p class="hinweis" data-rasterhinweis="${pfad}" ${da ? "hidden" : ""}>Ab ${min} Wörtern erscheint ein Raster, mit dem du deinen Text selbst prüfst.</p>`;
}
/* Vergleich, der erst nach eigenen Antworten erscheint: bed = Liste von Pfaden, die gefüllt sein müssen. */
function vergleich(id, bed, min, titel, html){
  const ok = bed.every(p => String(hol(p) || "").trim().length >= min), offen = !!(S.offen || {})[id];
  return `<div class="reihe nodruck"><button type="button" class="btn dunkel" data-vergleich="${id}" data-bed="${bed.join(",")}" data-min="${min}" data-titel="${esc(titel)}" ${ok ? "" : "disabled"}>${offen ? "Vergleich ausblenden" : esc(titel)}</button><span class="hinweis" data-vergleichhinweis="${id}">${ok ? "" : "Erst deine Antworten, dann der Vergleich."}</span></div>
  <div class="auflage" id="vgl-${id}" ${offen && ok ? "" : "hidden"}>${html}</div>`;
}

/* ---------- Quelle zum Markieren (Muster 11; Gegenwart: Markierung, zwei Stifte) ----------
   QUELLEN[id] = { titel, kopf, abs:[[tag|null, [Sätze…]], …], nachweis, stifte:[[ "a", Zeichen, Name ], [ "b", Zeichen, Name ]] }
   Stand: S.mark[id] = { "0": "a", "3": "b" }, S.stift[id] = "a" */
const STIFTKLASSE = { a:"g-mark g-mark--beleg", b:"g-mark g-mark--gedanke" };
function quelle(id){
  const q = QUELLEN[id], m = (S.mark || {})[id] || {}, st = (S.stift || {})[id] || "a"; let n = 0;
  const text = q.abs.map(([tag, saetze]) => `<p>${tag ? `<span class="qtag">${esc(tag)}</span>` : ""}${saetze.map(s => { const i = n++; return `<span class="g-wort ${m[i] ? STIFTKLASSE[m[i]] : ""}" role="button" tabindex="0" aria-pressed="${!!m[i]}" data-mark="${id}:${i}">${esc(s)}</span>`; }).join(" ")}</p>`).join("");
  return `<div class="qblatt g" data-quelle="${id}"><h3>${esc(q.titel)}</h3><p class="qkopf">${q.kopf}</p>
  <div class="g-stifte nodruck" role="group" aria-label="Stift wählen">${q.stifte.map(s => `<button type="button" class="g-stift" data-stift="${id}:${s[0]}" aria-pressed="${st === s[0]}"><span class="z" aria-hidden="true">${s[1]}</span>${esc(s[2])}</button>`).join("")}</div>
  <div class="qtext">${text}</div><p class="quelle">${q.nachweis}</p></div>`;
}
const saetze = id => QUELLEN[id].abs.flatMap(a => a[1]);
function belegListe(ids, stift){
  const li = ids.flatMap(id => { const m = (S.mark || {})[id] || {}, s = saetze(id); return Object.keys(m).filter(i => m[i] === stift).sort((a, b) => a - b).map(i => `<li>${esc(s[i])} <span class="hinweis">(${esc(QUELLEN[id].kurz)})</span></li>`); });
  return li.length ? `<ul>${li.join("")}</ul>` : `<p class="leer">Noch nichts markiert.</p>`;
}
function belege(ids, o = {}){
  const st = QUELLEN[ids[0]].stifte;
  return `<div class="belege" data-belege="${ids.join(",")}">${st.map(s => `<div class="sp ${s[0]}"><h4><span aria-hidden="true">${s[1]}</span> ${esc(o["t" + s[0]] || s[2])}</h4>${belegListe(ids, s[0])}</div>`).join("")}</div>`;
}
const markZahl = ids => ids.reduce((n, id) => n + Object.keys((S.mark || {})[id] || {}).length, 0);

/* ---------- Wahl mit Erklärung je Option (Muster 2; Gegenwart: Wahl) ---------- */
const STUFENWORT = { zentral:"zentral", begruendbar:"auch begründbar", kaum:"passt kaum" };
function gWahl(id, frage, optionen, o = {}){
  const st = (S.wahl || {})[id] || {}, zu = !!st.zu;
  return `<div class="g"><div class="g-wahl" data-g="wahl" data-mind="${o.mind ?? 8}" data-id="${id}" ${zu ? 'data-zu=""' : ""}>
  <fieldset><legend>${frage}</legend>${optionen.map((op, i) => `<label class="g-option" data-urteil="${op[1]}" data-grund="${esc(op[2])}"><input type="radio" name="w-${id}" value="${i}" ${st.o === i ? "checked" : ""} ${zu ? "disabled" : ""}><span>${esc(op[0])}<span class="g-option__urteil">${STUFENWORT[op[1]]} – ${esc(op[2])}</span></span></label>`).join("")}</fieldset>
  ${o.ohneGrund ? "" : `<label>Begründung in einem Satz<textarea data-grund-feld rows="2" ${zu ? "readonly" : ""} placeholder="${esc(o.platz || "Ich wähle das, weil …")}">${esc(st.grund || "")}</textarea></label>`}
  <div class="g-wahl__fuss"><button type="button" class="g-knopf g-knopf--primaer" data-g-festlegen ${zu ? "disabled" : ""}>Festlegen</button><span class="g-stempel" ${zu ? "" : "hidden"}>Festgelegt</span>${zu ? `<button type="button" class="btn nodruck" data-neu-wahl="${id}">Noch einmal</button>` : ""}<span class="sr" aria-live="polite"></span></div>
  </div></div>`;
}
function pruefeWahl(w){
  if (w.hasAttribute("data-zu")) return;
  const gew = w.querySelector("input:checked"), ta = w.querySelector("textarea"), f = w.querySelector("[data-g-festlegen]");
  if (f) f.disabled = !gew || (ta && ta.value.trim().length < 8);
}

/* ---------- Landkarten-Moment (Muster AT aus M22). Namen und Kurzerklärungen wörtlich aus der kognitiven Landkarte, Abschnitt 2.1. ---------- */
const PRINZIP = {
  "2-1-1": ["Retrospektivität", "Wir betrachten die Vergangenheit immer im Nachhinein (ex post), also aus der Gegenwart heraus."],
  "2-1-2": ["Perspektivität", "Jede Betrachtung erfolgt aus einer bestimmten Sichtweise, geprägt von Überzeugungen, Interessen und Erfahrungen."],
  "2-1-3": ["Partikularität", "Historische Erkenntnisse sind immer nur Ausschnitte der gesamten Vergangenheit."],
  "2-1-4": ["Selektivität", "Wer Geschichte erzählt, wählt aus: Welche Quellen, Ereignisse und Personen sind für die eigene Frage wichtig?"],
  "2-1-5": ["Partialität", "Quellen zeigen immer nur einen Teil der Vergangenheit, und nur ein Teil der Quellen ist überhaupt erhalten."],
  "2-1-6": ["Narrativität", "Geschichte gibt es nur als Erzählung."],
  "2-1-7": ["Konstruktivität", "Geschichte wird nicht „gefunden“, sondern aktiv zusammengesetzt. Deshalb können aus denselben Fakten unterschiedliche Geschichten entstehen."],
  "2-1-8": ["Standortgebundenheit", "Wer Geschichte erzählt, ist durch seinen gesellschaftlichen und kulturellen Gesamtkontext geprägt, oft unbewusst."],
};
const LKSTUFE = { zentral:"Zentral.", teils:"Auch begründbar.", kaum:"Passt kaum." };
/* cfg = { seite, frage, lead, platz, folge:[Name, Kurzerklärung] (Eintrag 2.1.9), urteil:{ id:[stufe, text] }, bruecke } */
function landkarte(cfg){
  const l = S.lk, frei = l.vermutung.trim().length >= 10;
  const liste = Object.keys(PRINZIP).map(id => ({ id, n:PRINZIP[id][0], k:PRINZIP[id][1] })).concat([{ id:"2-1-9", n:cfg.folge[0], k:cfg.folge[1] }]);
  const p = liste.find(x => x.id === l.prinzip), u = p ? cfg.urteil[p.id] : null;
  return `${zeitKopf(cfg.seite)}<h1>${esc(cfg.titel)}</h1>
  <p class="leitfrage">${esc(cfg.frage)}</p>
  ${auftrag("Allein · 2 Minuten", "Erst vermuten", cfg.lead)}
  ${textfeld("lk.vermutung", "Meine Vermutung", { rows:2, platz:cfg.platz, zaehl:false })}
  <p class="hinweis" id="lk-hinweis">${frei ? "Gut. Jetzt die Landkarte öffnen, dann unten ein Prinzip wählen." : "Schreib mindestens einen Satz. Danach geht es weiter."}</p>
  <div id="lk-teil2" class="${frei ? "" : "gesperrt"}">
  ${auftrag("Allein · 4 Minuten", "Dann die Landkarte", "Öffne „Was ist Geschichte?“ in der kognitiven Landkarte. Sie öffnet sich in einem neuen Tab, deine Eingaben hier bleiben. Wähle das Prinzip, das hier am besten passt, und begründe in einem Satz.")}
  <p><a class="btn dunkel" id="lk-link" href="${LK}2-1" target="_blank" rel="noopener" ${frei ? "" : 'aria-disabled="true" tabindex="-1"'}>Landkarte öffnen: 2.1 Die Gemeinsamkeiten einer jeden Geschichte ↗</a></p>
  <div class="prinzipien" role="group" aria-label="Prinzip wählen">${liste.map(x => `<button type="button" data-prinzip="${x.id}" aria-pressed="${l.prinzip === x.id}" class="${l.ok && l.prinzip === x.id ? cfg.urteil[x.id][0] : ""}" ${(!frei || l.ok) ? "disabled" : ""}><b>${esc(x.n)}</b><small>${esc(x.k)}</small></button>`).join("")}</div>
  <label for="lk-grund">Meine Begründung</label><textarea id="lk-grund" data-f="lk.grund" rows="2" placeholder="Dieses Prinzip passt hier, weil …" ${(!frei || !l.prinzip || l.ok) ? "disabled" : ""}>${esc(l.grund)}</textarea>
  <div class="reihe"><button type="button" class="btn dunkel" data-lkpruef ${(!frei || !l.prinzip || l.grund.trim().length < 10 || l.ok) ? "disabled" : ""}>Prüfen</button>${l.ok ? `<button type="button" class="btn" data-lkneu>Noch einmal</button>` : ""}<span class="hinweis">Rückmeldung in drei Stufen: zentral · auch begründbar · passt kaum.</span></div>
  <div id="lk-fb" aria-live="polite">${l.ok && u ? `<div class="rm ${u[0]}"><b>${LKSTUFE[u[0]]}</b> ${esc(u[1])} <a href="${LK}${p.id}" target="_blank" rel="noopener">In der Landkarte nachlesen ↗</a></div>` : ""}</div>
  </div>
  ${cfg.bruecke ? `<div class="trift">${cfg.bruecke}</div>` : ""}
  ${weiter(cfg.nach[0], cfg.nach[1])}`;
}

/* ---------- Stimmkarte (Muster 12; Gegenwart: Stimmkarte): groß am Gerät, hochhalten, Lehrkraft zählt ---------- */
function stimmkarte(pfad, optionen){
  const v = hol(pfad);
  return `<div class="stimmwahl" role="group" aria-label="Stimme wählen">${optionen.map(o => `<button type="button" data-stimme="${pfad}" data-wert="${o[0]}" aria-pressed="${v === o[0]}"><b>${o[0]}</b>${esc(o[1])}</button>`).join("")}</div>
  <div class="reihe nodruck"><button type="button" class="btn dunkel" data-stimmkarte="${pfad}" data-opt="${esc(JSON.stringify(optionen))}" ${v ? "" : "disabled"}>Stimmkarte groß zeigen</button><span class="hinweis">Auf Ansage: iPad hochhalten. Die Lehrkraft zählt. Es wird nichts übertragen.</span></div>`;
}
let TAFEL_ZURUECK = null;
function tafel(html, o = {}){
  TAFEL_ZURUECK = document.activeElement;
  const u = document.getElementById("ueber");
  u.innerHTML = `<div class="tafel-voll ${o.hell ? "hell" : ""}" role="dialog" aria-modal="true" aria-label="${esc(o.titel || "Ansicht für den Beamer")}"><div class="tk"><b>${esc(o.titel || "")}</b><button type="button" class="btn" data-tafelzu>Schließen</button></div><div class="mitte">${html}</div></div>`;
  u.querySelector("[data-tafelzu]").focus();
}
function tafelZu(){ const u = document.getElementById("ueber"); if (!u.innerHTML) return; u.innerHTML = ""; if (TAFEL_ZURUECK && document.contains(TAFEL_ZURUECK)) TAFEL_ZURUECK.focus(); }

/* ---------- Kopf, Löschen, Zeichnen ---------- */
function kopf(){
  document.getElementById("kopf").innerHTML = `${L.mark}<div class="titel">${esc(L.nr)} · ${esc(L.titel)}<small>${esc(L.unter)}</small></div><a class="pill" href="${LABOR}">← GGK-Labor</a><button class="pill" data-geh="lehrkraft">Für Lehrkräfte</button>`;
  const a = idx(S.seite);
  document.getElementById("weg").innerHTML = L.seiten.slice(1).map((s, i) => { const k = i + 1, cls = k === a ? "akt" : (k < a ? "da" : ""); return `<button class="${cls}" data-geh="${s[0]}"${k === a ? ' aria-current="step"' : ""}><b>${esc(s[2])}</b>${esc(s[1])}</button>`; }).join("");
}
function loeschBereich(){
  return `<div class="loesch nodruck"><button class="btn" data-loeschfrage>Eingaben löschen</button><label class="g-schalter" style="font-family:var(--body)"><input type="checkbox" role="switch" data-bewegung ${S.ruhig ? "checked" : ""}> Weniger Bewegung</label><span>Alles bleibt auf diesem Gerät. Nichts wird übertragen.</span>
  <div id="loesch-frage" hidden class="loesch-frage"><p><b>Wirklich alles löschen?</b> ${esc(L.loesch)}</p><div class="reihe"><button class="btn primary" data-loeschen="ja">Ja, alles löschen</button><button class="btn" data-loeschen="nein">Abbrechen</button></div></div>
  <p style="flex:1 0 100%;font-size:.85rem">© 2026 Mario Walter · Inhalte CC BY-NC-SA 4.0 · Code MIT · mit KI-Unterstützung entwickelt</p></div>`;
}
function zeichne(fokus){
  if (!SEITE_FN[S.seite]) S.seite = "start";
  if (S.ruhig) document.documentElement.setAttribute("data-bewegung", "weniger"); else document.documentElement.removeAttribute("data-bewegung");
  kopf();
  const m = document.getElementById("main");
  m.classList.toggle("breit", (L.breit || []).includes(S.seite));
  m.innerHTML = SEITE_FN[S.seite]() + loeschBereich();
  window.Gegenwart && Gegenwart.init(m);
  nachInit();
  if (fokus) { m.focus({ preventScroll:true }); window.scrollTo(0, 0); }
}
function nachInit(){
  document.querySelectorAll(".g-wahl[data-id]").forEach(w => { pruefeWahl(w); const st = (S.wahl || {})[w.dataset.id] || {}; if (st.zu) { w.querySelectorAll("input").forEach(i => { i.disabled = true; }); const f = w.querySelector("[data-g-festlegen]"); if (f) f.disabled = true; } });
  if (typeof L.nachInit === "function") L.nachInit();
}
function geh(id){ S.seite = id; speichere(); tafelZu(); zeichne(true); }
/* Nach einer Texteingabe: Zähler, Raster und Freigaben nachführen, ohne neu zu zeichnen (Fokus und Scrollstand bleiben). */
function nachEingabe(pfad){
  const z = document.querySelector(`[data-zaehl="${pfad}"]`); if (z) z.textContent = z.textContent.replace(/^\d+/, woerter(hol(pfad)));
  const r = document.querySelector(`[data-raster="${pfad}"]`);
  if (r) { const da = woerter(hol(pfad)) >= +r.dataset.min, war = !r.hidden; r.hidden = !da; const h = document.querySelector(`[data-rasterhinweis="${pfad}"]`); if (h) h.hidden = da; if (da && !war) neu(r, "neu"); }
  document.querySelectorAll("[data-vergleich]").forEach(b => { const ok = b.dataset.bed.split(",").every(p => String(hol(p) || "").trim().length >= +b.dataset.min); b.disabled = !ok; const h = document.querySelector(`[data-vergleichhinweis="${b.dataset.vergleich}"]`); if (h) h.textContent = ok ? "" : "Erst deine Antworten, dann der Vergleich."; });
  if (pfad === "lk.vermutung") { const frei = S.lk.vermutung.trim().length >= 10, t = document.getElementById("lk-teil2"); if (t && t.classList.contains("gesperrt") === frei) zeichneBehalte(); }
  if (pfad === "lk.grund") { const b = document.querySelector("[data-lkpruef]"); if (b) b.disabled = !(S.lk.prinzip && S.lk.grund.trim().length >= 10 && !S.lk.ok); }
  if (typeof L.nachEingabe === "function") L.nachEingabe(pfad);
}
/* Neu zeichnen, aber Scrollstand und Fokus (samt Cursor) behalten. */
function zeichneBehalte(){
  const y = window.scrollY, a = document.activeElement, id = a && a.id, pos = a && typeof a.selectionStart === "number" ? a.selectionStart : null;
  zeichne(false); window.scrollTo(0, y);
  if (id) { const e = document.getElementById(id); if (e) { e.focus({ preventScroll:true }); if (pos !== null && e.setSelectionRange) { try { e.setSelectionRange(pos, pos); } catch(err) {} } } }
}

function kernStart(){
  const d = L.init(), g = lade();
  S = Object.assign({ seite:"start", ruhig:false, mark:{}, stift:{}, wahl:{}, offen:{}, lk:{ vermutung:"", prinzip:null, grund:"", ok:false } }, d);
  Object.keys(g).forEach(k => { S[k] = (S[k] && typeof S[k] === "object" && !Array.isArray(S[k]) && g[k] && typeof g[k] === "object" && !Array.isArray(g[k])) ? Object.assign({}, S[k], g[k]) : g[k]; });
  const h = location.hash.replace("#", ""); if (h && SEITE_FN[h]) S.seite = h;
  zeichne(false);
}

document.addEventListener("click", ev => {
  const t = ev.target.closest("[data-geh],[data-mark],[data-stift],[data-satz],[data-vergleich],[data-prinzip],[data-lkpruef],[data-lkneu],[data-stimme],[data-stimmkarte],[data-tafelzu],[data-loeschfrage],[data-loeschen],[data-g-festlegen],[data-neu-wahl],[data-akt],[data-drucken]");
  if (!t) return;
  if (t.dataset.geh) return geh(t.dataset.geh);
  if (t.dataset.mark) return markiere(t);
  if (t.dataset.stift) { const [id, s] = t.dataset.stift.split(":"); setz("stift." + id, s); t.parentElement.querySelectorAll(".g-stift").forEach(b => b.setAttribute("aria-pressed", String(b === t))); return; }
  if (t.dataset.satz) { const f = document.getElementById(t.dataset.satz); if (!f) return; f.value = (f.value.trim() ? f.value.replace(/\s*$/, "") + " " : "") + t.dataset.text + " "; setz(f.dataset.f, f.value); nachEingabe(f.dataset.f); f.focus(); return; }
  if (t.dataset.vergleich) { const id = t.dataset.vergleich; setz("offen." + id, !(S.offen || {})[id]); const v = document.getElementById("vgl-" + id); v.hidden = !S.offen[id]; t.textContent = S.offen[id] ? "Vergleich ausblenden" : (t.dataset.titel || "Vergleich zeigen"); if (S.offen[id] && ev.detail !== 0) neu(v, "neu"); return; }
  if (t.dataset.prinzip) { S.lk.prinzip = t.dataset.prinzip; speichere(); return zeichneBehalte(); }
  if (t.hasAttribute("data-lkpruef")) { S.lk.ok = true; speichere(); zeichneBehalte(); if (ev.detail !== 0) neu(document.querySelector("#lk-fb .rm"), "neu"); return; }
  if (t.hasAttribute("data-lkneu")) { S.lk.ok = false; S.lk.prinzip = null; S.lk.grund = ""; speichere(); return zeichneBehalte(); }
  if (t.dataset.stimme) { setz(t.dataset.stimme, t.dataset.wert); return zeichneBehalte(); }
  if (t.dataset.stimmkarte) { const o = JSON.parse(t.dataset.opt).find(x => x[0] === hol(t.dataset.stimmkarte)); if (o) tafel(`<div class="buchstabe">${esc(o[0])}</div><div class="wort">${esc(o[1])}</div>`, { titel:"Meine Stimme" }); return; }
  if (t.hasAttribute("data-tafelzu")) return tafelZu();
  if (t.hasAttribute("data-loeschfrage")) { const f = document.getElementById("loesch-frage"); f.hidden = false; f.querySelector("button").focus(); return; }
  if (t.dataset.loeschen) { if (t.dataset.loeschen === "ja") { try { localStorage.removeItem(L.key); } catch(e) {} const r = S.ruhig; kernStartLeer(r); } else { document.getElementById("loesch-frage").hidden = true; } return; }
  if (t.hasAttribute("data-g-festlegen")) { const w = t.closest(".g-wahl[data-id]"); if (!w) return; const gew = w.querySelector("input:checked"), ta = w.querySelector("textarea"); if (!gew) return; setz("wahl." + w.dataset.id, { o:+gew.value, grund: ta ? ta.value : "", zu:true }); setTimeout(() => { zeichneBehalte(); if (typeof L.nachWahl === "function") L.nachWahl(w.dataset.id); }, ruhig() ? 0 : 420); return; }
  if (t.dataset.neuWahl) { setz("wahl." + t.dataset.neuWahl, {}); return zeichneBehalte(); }
  if (t.hasAttribute("data-drucken")) return window.print();
  if (t.dataset.akt && AKTION[t.dataset.akt]) return AKTION[t.dataset.akt](t, ev);
});
function kernStartLeer(r){ S = {}; const d = L.init(); S = Object.assign({ seite:"start", ruhig:r, mark:{}, stift:{}, wahl:{}, offen:{}, lk:{ vermutung:"", prinzip:null, grund:"", ok:false } }, d); speichere(); zeichne(true); }
function markiere(t){
  const [id, i] = t.dataset.mark.split(":"), st = (S.stift || {})[id] || "a";
  if (!S.mark[id]) S.mark[id] = {};
  const hat = S.mark[id][i] === st;
  if (hat) delete S.mark[id][i]; else S.mark[id][i] = st;
  speichere();
  t.className = "g-wort " + (hat ? "" : STIFTKLASSE[st]); t.setAttribute("aria-pressed", String(!hat));
  if (!hat && window.Gegenwart && st === "a") Gegenwart.bewegen(t, [{ backgroundSize:"0% 100%" }, { backgroundSize:"100% 100%" }], { dauer:260 });
  document.querySelectorAll("[data-belege]").forEach(b => { const ids = b.dataset.belege.split(","); if (!ids.includes(id)) return; QUELLEN[ids[0]].stifte.forEach(s => { const sp = b.querySelector(".sp." + s[0]); const alt = sp.querySelector("ul,.leer"); if (alt) alt.outerHTML = belegListe(ids, s[0]); }); });
  if (typeof L.nachMark === "function") L.nachMark(id);
}
document.addEventListener("keydown", ev => {
  if (ev.key === "Escape") return tafelZu();
  const t = ev.target.closest && ev.target.closest("[data-mark]");
  if (t && (ev.key === "Enter" || ev.key === " ")) { ev.preventDefault(); markiere(t); }
});
document.addEventListener("input", ev => {
  const t = ev.target;
  if (t.dataset && t.dataset.f) { setz(t.dataset.f, t.type === "range" ? +t.value : t.value); nachEingabe(t.dataset.f); return; }
  if (t.hasAttribute && t.hasAttribute("data-grund-feld")) { const w = t.closest(".g-wahl"); if (w) pruefeWahl(w); }
});
document.addEventListener("change", ev => {
  const t = ev.target;
  if (t.hasAttribute && t.hasAttribute("data-bewegung")) { S.ruhig = t.checked; speichere(); if (S.ruhig) document.documentElement.setAttribute("data-bewegung", "weniger"); else document.documentElement.removeAttribute("data-bewegung"); return; }
  if (t.tagName === "SELECT" && t.dataset.f) { setz(t.dataset.f, t.value); nachEingabe(t.dataset.f); if (t.dataset.neu !== undefined) zeichneBehalte(); return; }
  const w = t.closest && t.closest(".g-wahl"); if (w) pruefeWahl(w);
});
/* ---------- Bilder (Muster aus M21–M23): Dateien liegen nur im Moodle-Paket unter media/. Fehlt eine Datei, verschwindet die Figur ohne Lücke. ---------- */
function foto(b, o = {}){
  return `<figure class="bild ${o.klein ? "klein" : ""}" data-bildgruppe="${o.gruppe || ""}"><img src="media/${b.datei}" alt="${esc(b.alt)}" loading="lazy" onerror="bildFehlt(this)"><figcaption>${b.text}<span class="nachweis">${b.nachweis}</span></figcaption></figure>`;
}
function bildFehlt(img){
  const f = img.closest("figure"), g = f && f.dataset.bildgruppe; if (!f) return; f.remove();
  if (g) { const rest = document.querySelectorAll(`figure[data-bildgruppe="${g}"]`).length, h = document.querySelector(`[data-bildhinweis="${g}"]`); if (!rest && h) h.hidden = false; }
}
const AKTION = {
  /* data-akt="setz" data-p="pfad" data-w="wert": Wert setzen und neu zeichnen */
  setz(t){ let w = t.dataset.w; if (w === "true") w = true; else if (w === "false") w = false; setz(t.dataset.p, w); zeichneBehalte(); },
};
