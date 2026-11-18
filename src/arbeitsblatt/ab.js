/* ===== Arbeitsblatt Geschichte · gemeinsamer Kern · Quelle: src/arbeitsblatt/ab.js – nur dort ändern =====
   Platz im Hefter · Stand an den Hefter melden · Stand als Datei sichern und laden (Text als Rückfall) · Ansicht für den Beamer.
   Alles bleibt im Browser oder in der Datei: keine Anmeldung, kein Server, keine Namen. */
(function () {
  "use strict";
  const doc = document, root = doc.documentElement;
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const H = window.GGK_HEFTER || {};
  const einheit = () => root.getAttribute("data-einheit") || "";
  const E = () => H[einheit()] || null;
  const lies = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const schreib = (k, v) => { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } };
  const standKey = () => "ggk-hefter-" + einheit() + ":v1";

  /* Platz im Hefter: »Blatt 7 von 11«, davor und danach */
  function platz(nr) {
    const e = E(); if (!e) return null;
    const i = e.blaetter.findIndex(b => b.nr === nr); if (i < 0) return null;
    return { i: i + 1, n: e.blaetter.length, blatt: e.blaetter[i], davor: e.blaetter[i - 1] || null, danach: e.blaetter[i + 1] || null, name: e.name, start: e.start };
  }
  /* Jedes Blatt meldet dem Hefter nur: wie viele Aufträge fertig sind und – wenn vorhanden – den eigenen Satz zum Schluss. */
  function stand() { try { return JSON.parse(lies(standKey()) || "{}") || {}; } catch (e) { return {}; } }
  function melde(nr, d) {
    if (!E()) return; const s = stand(), alt = JSON.stringify(s[nr] || null);
    const neu = { fertig: d.fertig | 0, von: d.von | 0, satz: String(d.satz || "").slice(0, 400) };
    if (JSON.stringify(Object.assign({}, s[nr], neu)) === alt) return;
    s[nr] = Object.assign(neu, { zeit: new Date().toISOString().slice(0, 10) }); s._zuletzt = nr; schreib(standKey(), JSON.stringify(s));
  }

  /* ---------- Stand als Datei ---------- */
  function paket() {
    const e = E(), re = new RegExp(e.schluessel), daten = {};
    try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (re.test(k)) daten[k] = localStorage.getItem(k); } } catch (x) {}
    return JSON.stringify({ art: "ggk-hefter", einheit: einheit(), name: e.name, version: 1, datum: new Date().toISOString(), daten: daten });
  }
  const dateiname = () => "Hefter-" + E().name.replace(/[^A-Za-zÄÖÜäöüß]+/g, "-") + "_" + new Date().toISOString().slice(0, 10) + ".json";
  let VON = null;
  function fenster(html) {
    let f = doc.getElementById("ab-fenster");
    if (!f) { f = doc.createElement("div"); f.id = "ab-fenster"; f.className = "ab-fenster nodruck"; doc.body.appendChild(f); }
    if (f.hidden !== false || !f.innerHTML) VON = doc.activeElement;
    f.innerHTML = '<div class="ab-fenster__blatt" role="dialog" aria-modal="true" aria-labelledby="ab-fenster-t">' + html + "</div>"; f.hidden = false;
    const k = f.querySelector("[data-fokus]") || f.querySelector("button,textarea,input"); if (k) k.focus();
  }
  function fensterZu() { const f = doc.getElementById("ab-fenster"); if (f) { f.hidden = true; f.innerHTML = ""; } if (VON && doc.contains(VON)) VON.focus(); VON = null; }
  function sichern() {
    if (!E()) return;
    const text = paket(), name = dateiname(); let weg = true;
    try { const a = doc.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type: "application/json" })); a.download = name; doc.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); }
    catch (e) { weg = false; }
    fenster('<h2 id="ab-fenster-t">' + (weg ? "Stand gesichert" : "Stand als Text") + "</h2><p>" +
      (weg ? "Die Datei <b>" + esc(name) + "</b> liegt jetzt bei deinen Downloads. Leg sie in deinen Ordner für Geschichte. Auf einem anderen Gerät lädst du sie mit „Stand aus Datei laden“."
           : "Hier lässt sich gerade keine Datei sichern. Kopiere den Text und sichere ihn in einer Notiz.") + "</p>" +
      '<p class="hinweis">Keine Datei angekommen? Dann kopiere den Text. Er enthält dasselbe.</p>' +
      '<textarea readonly id="ab-standtext" aria-label="Stand als Text">' + esc(text) + "</textarea>" +
      '<div class="reihe"><button type="button" class="btn" data-ab="kopieren">Text kopieren</button><button type="button" class="btn primary" data-ab="zu" data-fokus>Fertig</button><span class="hinweis" id="ab-kopiert" role="status"></span></div>');
  }
  function laden() {
    if (!E()) return;
    fenster('<h2 id="ab-fenster-t">Stand laden</h2><p>Wähle die Datei, die du gesichert hast. Sie heißt „Hefter-' + esc(E().name) + '_…“. Was in der Datei steht, ersetzt den Stand dieser Blätter auf diesem Gerät.</p>' +
      '<div class="reihe"><label class="btn" data-fokus tabindex="0">Datei wählen<input type="file" accept="application/json,.json,text/plain" class="sr" id="ab-dateiwahl"></label></div>' +
      '<label for="ab-ladetext">… oder den gesicherten Text hier einfügen</label><textarea id="ab-ladetext"></textarea>' +
      '<p class="hinweis" id="ab-lademeld" role="status" aria-live="polite"></p>' +
      '<div class="reihe"><button type="button" class="btn primary" data-ab="text-laden">Text laden</button><button type="button" class="btn" data-ab="zu">Abbrechen</button></div>');
  }
  function uebernehmen(text) {
    const m = doc.getElementById("ab-lademeld"), e = E();
    try {
      const j = JSON.parse(text);
      if (!j || j.art !== "ggk-hefter" || !j.daten || typeof j.daten !== "object") throw 0;
      if (j.einheit !== einheit()) { if (m) m.textContent = "Diese Datei gehört zum Hefter „" + (j.name || j.einheit) + "“. Hier ist der Hefter „" + e.name + "“."; return false; }
      const re = new RegExp(e.schluessel); let n = 0;
      Object.keys(j.daten).forEach(k => { if (re.test(k) && typeof j.daten[k] === "string" && schreib(k, j.daten[k])) n++; });
      if (!n) throw 0;
      location.reload(); return true;
    } catch (x) { if (m) m.textContent = "Das passt nicht. Wähle die Datei, die mit „Hefter-“ beginnt und auf „.json“ endet."; return false; }
  }

  /* ---------- Ansicht für den Beamer (gilt für alle Blätter auf diesem Gerät) ---------- */
  const beamer = () => root.getAttribute("data-ansicht") === "beamer";
  function setzeBeamer(an) { if (an) root.setAttribute("data-ansicht", "beamer"); else root.removeAttribute("data-ansicht"); schreib("ggk-ansicht", an ? "beamer" : ""); }
  if (lies("ggk-ansicht") === "beamer") root.setAttribute("data-ansicht", "beamer");

  /* ---------- Druck: Schreibfelder werden zu Text auf Linien (ein Feld druckt sonst nur seinen sichtbaren Ausschnitt) ---------- */
  function vorDruck() {
    nachDruck();
    doc.querySelectorAll("main textarea").forEach(t => {
      if (t.closest("[hidden]") || !t.getClientRects().length) return;
      const d = doc.createElement("div"); d.className = "ab-druckfeld"; d.textContent = t.value;
      d.style.setProperty("--zeilen", String(Math.max(2, +t.getAttribute("rows") || 2)));
      t.insertAdjacentElement("afterend", d); t.classList.add("ab-druckweg");
    });
  }
  function nachDruck() { doc.querySelectorAll(".ab-druckfeld").forEach(d => d.remove()); doc.querySelectorAll(".ab-druckweg").forEach(t => t.classList.remove("ab-druckweg")); }
  window.addEventListener("beforeprint", vorDruck); window.addEventListener("afterprint", nachDruck);

  /* ---------- Werkzeuge: überall dieselben Knöpfe an derselben Stelle ---------- */
  let WERK_AUF = false;
  function werkzeuge(mitte, lizenz) {
    return '<details class="ab-werk nodruck"' + (WERK_AUF ? " open" : "") + '><summary>Sichern · Laden · Ansicht</summary><div class="ab-werk__in">' +
      '<button type="button" class="btn" data-ab="sichern">Stand als Datei sichern</button>' +
      '<button type="button" class="btn" data-ab="laden">Stand aus Datei laden</button>' + (mitte || "") +
      '<label class="haken"><input type="checkbox" data-ab="beamer"' + (beamer() ? " checked" : "") + "> Ansicht für den Beamer</label>" +
      (lizenz ? '<p class="ab-c">' + esc(lizenz) + "</p>" : "") + "</div></details>";
  }
  doc.addEventListener("toggle", ev => { const t = ev.target; if (t && t.classList && t.classList.contains("ab-werk")) WERK_AUF = t.open; }, true);
  doc.addEventListener("click", ev => {
    const t = ev.target.closest && ev.target.closest("[data-ab]"); if (!t) return;
    const a = t.getAttribute("data-ab");
    if (a === "sichern") sichern();
    else if (a === "laden") laden();
    else if (a === "zu") fensterZu();
    else if (a === "kopieren") { const ta = doc.getElementById("ab-standtext"), s = doc.getElementById("ab-kopiert"); ta.select(); let ok = false; try { ok = doc.execCommand("copy"); } catch (e) {} if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(ta.value).then(() => { s.textContent = "Kopiert."; }, () => { s.textContent = ok ? "Kopiert." : "Markiere den Text und kopiere ihn von Hand."; }); else s.textContent = ok ? "Kopiert." : "Markiere den Text und kopiere ihn von Hand."; }
    else if (a === "text-laden") uebernehmen((doc.getElementById("ab-ladetext") || {}).value || "");
  });
  doc.addEventListener("change", ev => {
    const t = ev.target; if (!t) return;
    if (t.getAttribute && t.getAttribute("data-ab") === "beamer") { setzeBeamer(t.checked); doc.dispatchEvent(new Event("ab:ansicht")); return; }
    if (t.id === "ab-dateiwahl" && t.files && t.files[0]) { const r = new FileReader(); r.onload = () => uebernehmen(String(r.result || "")); r.onerror = () => uebernehmen(""); r.readAsText(t.files[0]); }
  });
  doc.addEventListener("keydown", ev => {
    const f = doc.getElementById("ab-fenster"); if (!f || f.hidden) return;
    if (ev.key === "Escape") { fensterZu(); return; }
    if ((ev.key === "Enter" || ev.key === " ") && ev.target.matches && ev.target.matches("label.btn")) { ev.preventDefault(); const i = ev.target.querySelector("input"); if (i) i.click(); }
  });

  window.GGKBlatt = { platz, stand, melde, sichern, laden, werkzeuge, beamer, einheit: E, esc };
})();
/* ===== Ende des gemeinsamen Kerns ===== */
