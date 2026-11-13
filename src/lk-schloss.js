/* ===== Lehrkraft-Schloss · Quelle: src/lk-schloss.js – nur dort ändern =====
   Der Text für Lehrkräfte steht verschlüsselt auf dieser Seite (Datenblock mit der id lehr-daten): AES-GCM 256,
   Schlüssel per PBKDF2-SHA-256 (600 000 Runden) aus dem Passwort. Weder Passwort noch Klartext stehen im Repository.
   Nach dem Öffnen bleibt der abgeleitete Schlüssel bis zum Schließen des Tabs im sessionStorage, damit andere
   Module ohne neue Eingabe öffnen. »Lehrkraftbereich schließen« entfernt ihn. Nichts wird übertragen. */
const LEHR_ORT = "ggk-lehr:schluessel";
const LEHR = { html:null, laeuft:false, versucht:false };
const lehrB = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
const lehrT = u => btoa(String.fromCharCode.apply(null, u));
const lehrKrypto = () => !!(window.crypto && crypto.subtle);
function lehrDaten(){ try { return JSON.parse(document.getElementById("lehr-daten").textContent); } catch(e) { return null; } }
function lehrMerk(){ try { return JSON.parse(sessionStorage.getItem(LEHR_ORT) || "null"); } catch(e) { return null; } }
function lehrVergiss(){ try { sessionStorage.removeItem(LEHR_ORT); } catch(e) {} }
async function lehrAuf(roh, d){
  const key = await crypto.subtle.importKey("raw", roh, "AES-GCM", false, ["decrypt"]);
  return new TextDecoder().decode(await crypto.subtle.decrypt({ name:"AES-GCM", iv:lehrB(d.iv) }, key, lehrB(d.ct)));
}
async function lehrMitPasswort(pass, d){
  const klar = pass.normalize("NFC").trim().replace(/\s+/g, " ");
  const km = await crypto.subtle.importKey("raw", new TextEncoder().encode(klar), "PBKDF2", false, ["deriveBits"]);
  const roh = new Uint8Array(await crypto.subtle.deriveBits({ name:"PBKDF2", salt:lehrB(d.salt), iterations:d.iter, hash:"SHA-256" }, km, 256));
  const html = await lehrAuf(roh, d);
  try { sessionStorage.setItem(LEHR_ORT, JSON.stringify({ salt:d.salt, k:lehrT(roh) })); } catch(e) {}
  return html;
}
/* Mit dem Schlüssel aus dieser Sitzung öffnen (ohne neue Eingabe). */
async function lehrStill(m, d){
  LEHR.laeuft = true;
  try { LEHR.html = await lehrAuf(lehrB(m.k), d); } catch(e) { lehrVergiss(); }
  LEHR.laeuft = false; lehrNeu();
}
function lehrNeu(){
  if (typeof LEHR_ZEICHNE === "function") LEHR_ZEICHNE();
  else { if (typeof S !== "undefined" && S && S.seite !== "lehrkraft") return; zeichne(false); }
  const z = document.getElementById("lehr-inhalt") || document.getElementById("lehr-pass");
  if (z) z.focus({ preventScroll:true });
  window.scrollTo(0, 0);
}
const lehrZurueck = () => typeof LEHR_ZURUECK === "string" ? LEHR_ZURUECK : `<button type="button" class="btn" data-geh="start">‹ Zum Anfang</button>`;
const lehrTuer = () => `<button type="button" class="lehr-tuer" data-geh="lehrkraft">Für Lehrkräfte</button>`;
function lehrkraft(){
  if (LEHR.html !== null) return `<div id="lehr-inhalt" tabindex="-1">${LEHR.html}${typeof lehrWerkzeuge === "function" ? lehrWerkzeuge() : ""}</div>
  <div class="fuss lehr-fuss nodruck">${lehrZurueck()}<button type="button" class="btn" data-lehrzu>Lehrkraftbereich schließen</button></div>`;
  const d = lehrDaten(), m = lehrMerk(), kopf = `<p class="zeit"><span class="nr">Für Lehrkräfte</span><span>mit Passwort geschützt</span></p><h1>Lehrkraftbereich</h1>`;
  if (d && m && m.salt === d.salt && lehrKrypto() && !LEHR.versucht) { LEHR.versucht = true; lehrStill(m, d); }
  if (LEHR.laeuft) return `<div class="lehr-schloss">${kopf}<p class="lead" role="status">Der Bereich wird geöffnet …</p></div>`;
  const geht = d && lehrKrypto();
  return `<div class="lehr-schloss">${kopf}
  <p class="lead">Ablauf, Erwartungen und Hinweise zur Stunde. Der Bereich ist verschlüsselt und öffnet nur mit dem Passwort.</p>
  ${geht ? `<form class="lehr-form" data-lehrform novalidate>
    <label for="lehr-pass">Passwort</label>
    <input id="lehr-pass" type="password" autocomplete="current-password" autocapitalize="off" autocorrect="off" spellcheck="false" aria-describedby="lehr-hilfe lehr-meldung">
    <button type="submit" class="btn primary lehr-knopf">Öffnen</button>
    <p id="lehr-meldung" role="status" aria-live="polite"></p>
  </form>
  <p class="hinweis" id="lehr-hilfe">Das Passwort wird nur auf diesem Gerät geprüft und nicht übertragen. Groß- und Kleinschreibung zählen.</p>`
  : `<p class="hinweis" role="status">${d ? "Dieser Browser kann den Bereich hier nicht öffnen. Öffne die Seite über https oder in einem aktuellen Browser." : "Für diese Seite ist kein Text für Lehrkräfte hinterlegt."}</p>`}
  <div class="fuss lehr-fuss">${lehrZurueck()}</div></div>`;
}
document.addEventListener("submit", async ev => {
  const f = ev.target.closest && ev.target.closest("[data-lehrform]"); if (!f) return;
  ev.preventDefault(); if (LEHR.laeuft) return;
  const ein = f.querySelector("input"), kn = f.querySelector("button"), m = document.getElementById("lehr-meldung");
  if (!ein.value.trim()) { m.textContent = "Bitte gib das Passwort ein."; ein.focus(); return; }
  LEHR.laeuft = true; kn.disabled = true; m.textContent = "Wird geprüft …";
  try { LEHR.html = await lehrMitPasswort(ein.value, lehrDaten()); LEHR.laeuft = false; lehrNeu(); }
  catch(e) { LEHR.laeuft = false; if (document.contains(f)) { kn.disabled = false; m.textContent = "Das Passwort passt nicht."; ein.focus(); ein.select(); } }
});
document.addEventListener("click", ev => {
  if (!(ev.target.closest && ev.target.closest("[data-lehrzu]"))) return;
  LEHR.html = null; LEHR.versucht = false; lehrVergiss(); lehrNeu();
});
document.head.insertAdjacentHTML("beforeend", `<style id="lehr-stil">
.lehr-form{display:grid;gap:.6rem;max-width:30rem;margin:1.4rem 0 1rem}
.lehr-form label{font-weight:700}
.lehr-form input{width:100%;min-height:48px;border:1.5px solid #77716A;border-radius:var(--r,.75rem);padding:.5rem .8rem;background:var(--surface2,#fff);color:var(--ink,#24221F);font:inherit;margin:0}
.lehr-form .lehr-knopf{justify-self:start}
:where(.lehr-knopf){min-height:48px;padding:.6rem 1.2rem;font:inherit;font-weight:700;border-radius:.75rem;border:1px solid transparent;background:#9B402D;color:#FFFAF2;cursor:pointer}
:where(.lehr-fuss .btn){min-height:48px;padding:.6rem 1.2rem;font:inherit;font-weight:700;border-radius:.75rem;border:1px solid #77716A;background:#FFFDF8;color:#24221F;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center}
#lehr-meldung{min-height:1.5em;margin:0;font-weight:700;color:var(--red,#9B402D)}
:where(.lehr-schloss .zeit){display:flex;gap:.8rem;flex-wrap:wrap;font-weight:700}
:where(.lehr-fuss){display:flex;gap:1rem;flex-wrap:wrap;justify-content:space-between;align-items:center;margin-top:2.2rem;padding-top:1.3rem;border-top:1px solid #D5CEC3}
#lehr-inhalt:focus{outline:none}
.lehr-tuer{margin-left:auto;min-height:44px;padding:.3rem .2rem;border:0;background:none;font:inherit;color:inherit;text-decoration:underline;text-underline-offset:.2em;cursor:pointer}
</style>`);
/* ===== Ende Lehrkraft-Schloss ===== */
