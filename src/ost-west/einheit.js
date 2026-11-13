/* ===== Ost-West-Einheit: gemeinsame Teile für Übersicht und Stunden ===== */
const OWK_KEY = "ggk-owk:v1";
/* Stunden der Einheit: [id, Datei, Titel, Material im Heft, Karten, Lehrplan (BPE)] */
const STUNDEN = [
  ["s1", "s1-stunde-null.html", "Die Stunde Null – Was wird jetzt mit Deutschland?", "M29, M30", ["k01"], "3.1 Potsdamer Abkommen"],
  ["s2", "s2-ideologien.html", "Kommunismus gegen Kapitalismus", "M31", ["k02","k03","k04"], "3.1 Truman-Doktrin, Zwei-Lager-Theorie, Marshallplan"],
  ["s3", "s3-blockade.html", "Die Berlin-Blockade und die sowjetische Zone", "M32, M33", ["k05"], "3.1 Berlin-Blockade, Währungsreform"],
  ["s4", "s4-staatsgruendung.html", "Die doppelte Staatsgründung", "M34", ["k06"], "3.1 Gründung zweier deutscher Staaten"],
  ["s5", "s5-westintegration.html", "Die Bindung der Bundesrepublik an den Westen", "M35", ["k07","k08"], "3.1 NATO und Warschauer Pakt, Wiederbewaffnung, EWG"],
  ["s6", "s6-flucht-und-mauer.html", "Flucht und Mauer", "M36–M39", ["k09","k10"], "3.1 Mauerbau"],
  ["s7", "s7-geschichte-im-staatsdienst.html", "Geschichte im Staatsdienst? Der 17. Juni 1953", "M40", [], "3.1 Aufstände im Ostblock"],
  ["s8", "s8-ostpolitik.html", "Wandel durch Annäherung", "M41", ["k11","k12","k13","k14"], "3.2 Entspannungs- und Ostpolitik, KSZE; 3.1 Stellvertreterkriege"],
  ["s9", "s9-ende.html", "Das Ende der DDR und des Ost-West-Konflikts", "M42–M44", ["k15","k16"], "3.2 Glasnost und Perestroika, Mauerfall, Zwei-plus-Vier"],
];
const GEBAUT = window.OWK_GEBAUT || [];   /* Stunden, deren Seite es schon gibt */
const karte = id => KARTEN.find(k => k.id === id);
const owkLade = () => { try { return Object.assign({ bearbeitet:{}, links:[], faden:{}, jahr:{} }, JSON.parse(localStorage.getItem(OWK_KEY)) || {}); } catch(e) { return { bearbeitet:{}, links:[], faden:{}, jahr:{} }; } };
const owkSchreib = fn => { const u = owkLade(); fn(u); try { localStorage.setItem(OWK_KEY, JSON.stringify(u)); } catch(e) {} return u; };
const SPUR = { w:"Welt", e:"Europa", d:"Deutschland" };
const ARTEN = [["folge","führt zu"],["reaktion","ist die Reaktion auf"],["gegen","ist das Gegenstück zu"],["parallel","geschieht parallel zu"],["wider","widerspricht"]];
const artWort = a => (ARTEN.find(x => x[0] === a) || ARTEN[0])[1];

/* Ereigniskarte (Entwurf der Lehrkraft aus M28, hier als Text gesetzt). o.ohneDatum: für Ordnen und Datieren. */
function karteHtml(k, o = {}){
  return `<article class="ekarte spur-${k.spur}" aria-label="Ereigniskarte ${esc(k.titel)}">
    <header><span class="espur">${SPUR[k.spur]}</span><h3>${esc(k.titel)}</h3>${o.ohneDatum ? "" : `<p class="edatum">${esc(k.datum)}</p>`}</header>
    <h4>Was geschah?</h4><p>${esc(k.was)}</p>
    <h4>${esc(k.liste[0])}</h4><ul>${k.liste[1].map(x => `<li>${x[0] ? `<b>${esc(x[0])}</b>${x[1] ? " – " : ""}` : ""}${esc(x[1])}</li>`).join("")}</ul>
    <p class="ekasten"><b>${esc(k.kasten[0])}:</b> ${esc(k.kasten[1])}</p>
    ${o.ohneDatum ? "" : `<p class="efuss">${k.fuss.map(esc).join(" · ")}</p>`}
    ${o.ohneBild ? "" : `<figure class="bild ebild"><img src="media/owk-karte-${String(k.nr).padStart(2, "0")}.jpg" alt="${esc(k.bild[1])}" loading="lazy" onerror="bildFehlt(this)"><figcaption>${esc(k.bild[0])}<span class="nachweis">Bild aus dem Unterrichtsheft, M28. Nachweis offen.</span></figcaption></figure>`}
  </article>`;
}
/* Kopf mit Rückweg zur Einheit */
function kopf(){
  const hub = L.hub;
  document.getElementById("kopf").innerHTML = `${L.mark}<div class="titel">${esc(L.nr)} · ${esc(L.titel)}<small>${esc(L.unter)}</small></div>${hub ? `<a class="pill" href="../index.html">← GGK-Labor</a>` : `<a class="pill" href="index.html">← Einheit</a>`}`;
  const a = idx(S.seite);
  document.getElementById("weg").innerHTML = L.seiten.slice(1).map((s, i) => { const k = i + 1, cls = k === a ? "akt" : (k < a ? "da" : ""); return `<button class="${cls}" data-geh="${s[0]}"${k === a ? ' aria-current="step"' : ""}><b>${esc(s[2])}</b>${esc(s[1])}</button>`; }).join("");
}
const OWK_MARK = `<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><path d="M17 4v26" stroke="#24221F" stroke-width="2.4" stroke-dasharray="3 3"/><path d="M5 10h9v14H5z" fill="none" stroke="#1E4FB5" stroke-width="2.4" stroke-linejoin="round"/><path d="M20 10h9v14h-9z" fill="none" stroke="#9B402D" stroke-width="2.4" stroke-linejoin="round"/></svg>`;
/* Zurück aus einer Stunde: den Stand der Einheit neu lesen */
window.addEventListener("pageshow", e => { if (e.persisted) location.reload(); });
