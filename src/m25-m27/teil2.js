/* ===== Teil 2 zu den handgebauten Stunden M18, M19, M20, M21 und M23: Landkarte und Schreibauftrag im Blatt-Rahmen =====
   Die erprobten Stunden bleiben, wie sie sind. Dieser Teil ergänzt, was der Blatt-Standard verlangt und was dort fehlt:
   die kognitive Landkarte als fester Auftrag L, ein Schreibauftrag im Format der Klassenarbeit und der Blick der Stunde.
   Zusammenfassungen gibt es in den Stunden selbst; hier entsteht keine zweite.
   L.stunde = [Datei, Titel] · L.deck = { ob, satz, ziele:[…], belastend? }
   L.tor = { key, stufe, salz, hash, text }: nur M19 und M20. Der Teil öffnet, wenn in der Stunde das dritte Codewort eingegeben wurde
   (Stand der Stunde auf diesem Gerät) oder wenn es hier eingegeben wird. Geprüft wird wie in der Stunde nur eine Prüfsumme.
   Stunden mit Codewort tragen in L: torOffen:() => t2TorOffen(), torSeite:() => t2TorSeite() und frei:"code" an den Aufträgen. */
async function t2Hash(t){ const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t)); return [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, "0")).join(""); }
const t2TorOffen = () => {
  if (!L.tor || S.tor) return true;
  try { const d = JSON.parse(localStorage.getItem(L.tor.key) || "null"); if (d && +d.stufe >= L.tor.stufe) { S.tor = true; speichere(); return true; } } catch(e) {}
  return false;
};
const t2TorSeite = () => `<div class="ab-zu t2-tor"><p class="ab-zu-t">Dieser Teil öffnet nach der Stunde.</p><p>${esc(L.tor.text)}</p>
  <div class="reihe"><input type="text" id="t2-code" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="Codewort von der Tafel" aria-label="Drittes Codewort der Stunde"><button type="button" class="btn dunkel" data-akt="t2code">Öffnen</button></div>
  <p class="hinweis" id="t2-fehler" role="status"></p></div>`;
AKTION.t2code = async () => {
  const f = document.getElementById("t2-code"), m = document.getElementById("t2-fehler"); if (!f) return;
  const v = (f.value || "").replace(/\s+/g, "").toUpperCase(); let ok = false;
  try { ok = (await t2Hash(L.tor.salz + v)) === L.tor.hash; } catch(e) {}
  if (ok) { S.tor = true; speichere(); zeichne(false); if (BLATT()) register(true); }
  else if (m) m.textContent = "Das Codewort passt nicht. Gemeint ist das dritte Codewort der Stunde.";
};
document.addEventListener("keydown", e => { if (e.key === "Enter" && e.target && e.target.id === "t2-code") { e.preventDefault(); AKTION.t2code(); } });

function start(){
  const c = L.deck, zu = L.tor && !t2TorOffen(), a0 = L.blatt[0];
  return `${weiterLeiste()}${band(c.ob, L.blatt.length > 1 ? "Landkarte und Schreibauftrag" : "Schreibauftrag", c.satz)}
  <p class="leitfrage">${esc(L.frage)}</p>
  ${c.belastend ? belastend(c.belastend) : ""}
  <div class="deck"><div>
    <h2 class="abschnitt">Am Ende kannst du</h2><ul class="ziele">${c.ziele.map(z => `<li>${esc(z)}</li>`).join("")}</ul>
    <p class="hinweis t2-zur">Dieser Teil gehört zur Stunde <a href="${L.stunde[0]}">${esc(L.stunde[1])}</a>. Bearbeite erst die Stunde. Deine Eingaben dort bleiben erhalten; die Zusammenfassung zum Abheften steht dort.</p>
  </div><div>
    <h2 class="abschnitt">So läuft dieser Teil</h2>${blattAblauf()}
    ${zu ? `<p class="hinweis" style="margin-top:.7rem">Die Aufträge öffnen nach der Stunde: wenn du dort alle drei Entscheidungen ausgewertet hast.</p>` : ""}
    <div class="deck-start"><button type="button" class="btn primary" data-geh="${a0.id}">Mit Auftrag ${a0.nr} beginnen ›</button></div>
  </div></div>`;
}
/* Seiten dieses Teils: Landkarte (falls die Stunde selbst keinen Landkarten-Auftrag hat) und Schreibauftrag; der Blick der Stunde steht am Ende. */
const t2Seiten = lkFn => Object.assign({ start, schreiben:() => schreibauftrag() + (lkFn ? "" : blickKarte(true)), lehrkraft }, lkFn ? { landkarte:() => lkFn() + blickKarte() } : {});
const T2_MARK = `<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><rect x="7" y="4" width="18" height="26" rx="2" fill="none" stroke="#24221F" stroke-width="2.4"/><path d="M11 11h10M11 16h10M11 21h5" stroke="#24221F" stroke-width="2" stroke-linecap="round"/><path d="M19 28l9-9" stroke="#9B402D" stroke-width="2.8" stroke-linecap="round"/></svg>`;
const T2_VOR = "So kann die Aufgabe in der Klassenarbeit stehen: Material, zwei Operatoren, höchstens eine Seite. Hier schreibst du eine halbe Seite – auf Ansage in der Stunde oder als Hausaufgabe.";
