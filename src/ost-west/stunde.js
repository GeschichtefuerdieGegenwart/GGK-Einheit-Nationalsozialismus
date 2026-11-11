/* ===== Ost-West-Einheit: gemeinsame Teile jeder Stunde =====
   Jede Stunde setzt L = { sid, key, nr, titel, unter, mark, seiten, breit, loesch, init } und ruft am Ende stundeStart(). */
const meine = () => STUNDEN.find(s => s[0] === L.sid);
const stundeNr = () => STUNDEN.findIndex(s => s[0] === L.sid) + 1;
const VINIT = () => ({ jahr:{}, ok:{}, n:{}, link:{ a:(meine()[4][0] || "k01"), b:"", art:"folge", satz:"" }, faden:(owkLade().faden[L.sid] || "") });
const abs_ = t => (Array.isArray(t) ? t : String(t).split(/\n+/)).map(a => `<p>${esc(a)}</p>`).join("");
/* Lesetext aus dem Heft (HEFT.x) */
const lesetext = (titel, t, nachweis) => `<div class="qblatt lese"><h3>${esc(titel)}</h3><div class="qtext">${abs_(t)}</div><p class="quelle">${nachweis}</p></div>`;
/* Bild aus dem Heft; fehlt die Datei, verschwindet die Figur */
const bildO = (datei, text, alt, m, o = {}) => `<figure class="bild ${o.klein ? "klein" : ""}" data-bildgruppe="${o.gruppe || ""}"><img src="media/${datei}.jpg" alt="${esc(alt)}" loading="lazy" onerror="bildFehlt(this)"><figcaption>${text}<span class="nachweis">Bild aus dem Unterrichtsheft, ${esc(m)}. ${o.nachweis || "Nachweis offen."}</span></figcaption></figure>`;
/* Abruf am Anfang (P2): ohne Heft */
const abruf = fragen => `${auftrag("Allein · 3 Minuten · ohne Heft", "Erst abrufen", "Beantworte aus dem Kopf. Stichworte reichen. Es geht nicht um richtig oder falsch, sondern darum, was noch da ist.")}${fragen.map((f, i) => textfeld("abruf." + i, f, { rows:2, zaehl:false })).join("")}`;
/* Urteile für die Landkarte: ein zentrales Prinzip, einige begründbare, der Rest „passt kaum“ */
function lkU(z, zt, teils = {}){
  const u = {}; Object.keys(PRINZIP).concat(["2-1-9"]).forEach(id => { u[id] = ["kaum", "Dieses Prinzip gilt für jede Geschichte. Es erklärt aber nicht gut, worin sich die Darstellungen hier unterscheiden. Lies deine Vermutung noch einmal: Was genau ist hier anders erzählt?"]; });
  Object.keys(teils).forEach(id => { u[id] = ["teils", teils[id]]; }); u[z] = ["zentral", zt]; return u;
}
const FOLGE = ["Multiperspektivität als Folge", "Weil jede Geschichte an einen Standort gebunden ist, braucht man mehrere Perspektiven, um ihr näherzukommen."];

/* ---------- Verorten und vernetzen: der feste Schluss jeder Stunde ---------- */
function verorten(){
  const ks = meine()[4].map(karte), v = S.v, u = owkLade(), eigene = u.links.filter(l => l.von === L.sid);
  const wahl = (p, w, liste, leer) => `<select data-f="${p}" data-neu aria-label="Karte wählen">${leer ? `<option value="">${leer}</option>` : ""}${liste.map(k => `<option value="${k.id}" ${w === k.id ? "selected" : ""}>${k.nr} · ${esc(k.titel)}</option>`).join("")}</select>`;
  const bereit = v.link.a && v.link.b && v.link.a !== v.link.b && v.link.satz.trim().length >= 15;
  return `${zeitKopf("verorten")}<h1>Verorten und vernetzen</h1>
  <p class="lead">Drei Schritte am Ende jeder Stunde. Was du hier einträgst, wandert in die Übersicht der Einheit: ins Zeitraster, in dein Netz und in deinen roten Faden.</p>
  ${ks.length ? `${auftrag("Allein · 4 Minuten", "1 · Verorten", "Lies die Karte. In welchem Jahr beginnt das Ereignis? Trag das Jahr ein und prüfe. Bei Zeiträumen zählt das erste Jahr.")}
  <div class="verorten">${ks.map(k => { const ok = !!v.ok[k.id], n = v.n[k.id] || 0, e = +v.jahr[k.id] || 0;
    return `${k.belastend ? belastend("Diese Karte nennt Kriege mit Millionen Toten.") : ""}<div class="vkarte">${karteHtml(k, { ohneDatum:!ok, ohneBild:!ok })}
    <div class="vjahr spur-${k.spur}"><label for="f-v-jahr-${k.id}">Beginn von „${esc(k.titel)}“ (Jahr)</label><input type="text" inputmode="numeric" maxlength="4" id="f-v-jahr-${k.id}" data-f="v.jahr.${k.id}" value="${esc(v.jahr[k.id] || "")}" ${ok ? "readonly" : ""} placeholder="19…" autocomplete="off">
    <div class="reihe" style="grid-column:1/-1"><button type="button" class="btn dunkel" data-akt="vpruef" data-w="${k.id}" ${ok ? "disabled" : ""}>Prüfen</button></div>
    <div aria-live="polite" style="grid-column:1/-1">${ok ? `<div class="rm zentral"><b>${esc(k.datum)}.</b> Die Karte liegt jetzt in deinem Zeitraster: Ebene ${SPUR[k.spur]}, Phase „${esc(PHASEN.find(p => p[0] === k.phase)[2])}“.</div>` : (n ? `<div class="rm teils"><b>Noch nicht.</b> ${e ? (e < k.jahr ? "Das Ereignis beginnt später." : "Das Ereignis beginnt früher.") : "Trag eine Jahreszahl ein."} ${n >= 2 ? "Hinweis: " + esc(VTIPP[k.id] || "") : ""}</div>` : "")}</div></div></div>`; }).join("")}</div>` : `${auftrag("Allein · 3 Minuten", "1 · Verorten", "Zu dieser Stunde gibt es keine eigene Ereigniskarte. Wo im Zeitraster gehört das Thema hin?")}${L.ohneKarte || ""}`}
  ${auftrag("Allein · 4 Minuten", "2 · Vernetzen", "Verbinde ein Ereignis dieser Stunde mit einem anderen Ereignis der Einheit. Wähle die Art der Verbindung und begründe sie in einem Satz.")}
  <div class="karte netzbau"><div class="netzzeile">${wahl("v.link.a", v.link.a, ks.length ? ks : KARTEN)}<select data-f="v.link.art" data-neu aria-label="Art der Verbindung">${ARTEN.map(a => `<option value="${a[0]}" ${v.link.art === a[0] ? "selected" : ""}>${esc(a[1])}</option>`).join("")}</select>${wahl("v.link.b", v.link.b, KARTEN.filter(k => k.id !== v.link.a), "Karte wählen …")}</div>
  ${textfeld("v.link.satz", "Wie hängen die beiden zusammen?", { rows:2, platz:"… weil …", zaehl:false })}
  <div class="reihe"><button type="button" class="btn dunkel" data-akt="vlink" ${bereit ? "" : "disabled"}>Verbindung festhalten</button></div>
  ${eigene.length ? `<ul class="netzliste" style="margin-top:.6rem">${eigene.map(l => `<li><span class="nk spur-${karte(l.a).spur}">${esc(karte(l.a).titel)}</span><span class="nart">${esc(artWort(l.art))}</span><span class="nk spur-${karte(l.b).spur}">${esc(karte(l.b).titel)}</span><p class="mein">${esc(l.satz)}</p></li>`).join("")}</ul>` : `<p class="hinweis">Noch keine Verbindung aus dieser Stunde.</p>`}</div>
  ${auftrag("Allein · 3 Minuten", "3 · Roter Faden", "Die Leitfrage der Einheit: " + esc(LEITFRAGE) + " Was trägt diese Stunde zur Antwort bei? Ein Satz.")}
  ${textfeld("v.faden", "Mein Satz für den roten Faden", { rows:2, anfaenge:L.fadenAnf || ["Ideologien zeigten sich darin, dass", "Machtinteressen zeigten sich darin, dass", "Handlungsspielraum hatte"], zaehl:false })}
  ${weiter("merk", "Zur Merkseite")}`;
}
const VTIPP = { k01:"Im Sommer nach Kriegsende.", k02:"Zwei Jahre nach Kriegsende, im März.", k03:"Im selben Jahr wie die Truman-Doktrin.", k04:"Im selben Jahr wie die Truman-Doktrin angekündigt.", k05:"Wenige Tage nach der Währungsreform im Westen.", k06:"Im Jahr, in dem die Blockade endet.", k07:"Ein Jahr nach der Gründung der beiden deutschen Staaten.", k08:"Wenige Tage nach dem NATO-Beitritt der Bundesrepublik.", k09:"An einem Sonntag im August, zwölf Jahre nach der Gründung der DDR.", k10:"Ein Jahr nach dem Mauerbau.", k11:"Mit dem Beginn der sozial-liberalen Koalition.", k12:"Im selben Jahr wie die neue Ostpolitik.", k13:"Am Ende der 1970er-Jahre.", k14:"Mit dem Korea-Krieg.", k15:"Als Gorbatschow Generalsekretär wird.", k16:"Im Jahr der deutschen Einheit." };
AKTION.vpruef = t => { const id = t.dataset.w, k = karte(id), e = +String(S.v.jahr[id] || "").trim(); S.v.n[id] = (S.v.n[id] || 0) + 1; if (e === k.jahr) { S.v.ok[id] = true; owkSchreib(u => { u.bearbeitet[id] = true; u.jahr[id] = e; }); } speichere(); zeichneBehalte(); };
AKTION.vlink = () => { const l = S.v.link; if (!(l.a && l.b && l.a !== l.b && l.satz.trim().length >= 15)) return; owkSchreib(u => { u.links.push({ a:l.a, b:l.b, art:l.art, satz:l.satz.trim(), von:L.sid }); }); S.v.link.satz = ""; S.v.link.b = ""; speichere(); zeichneBehalte(); };

/* ---------- Merkseite: genau zwei Seiten A4 ---------- */
function merk(){
  const c = L.merk, m = (t, leer = "noch offen") => `<span class="mein ${String(t || "").trim() ? "" : "leer"}">${esc(String(t || "").trim() || leer)}</span>`;
  const u = owkLade(), eigene = u.links.filter(l => l.von === L.sid);
  return `<div class="zf"><div class="nodruck">${zeitKopf("merk")}</div><h1>${esc(L.titel)}</h1><p class="leitfrage">${esc(c.frage)}</p>
  <p class="merksatz">${esc(c.kern)}</p>
  <h2>Begriffe</h2><div class="begriffe">${c.begriffe.map(b => `<div><b>${esc(b[0])}:</b> ${esc(b[1])}</div>`).join("")}</div>
  <h2>Zeitleiste</h2><ol class="zl">${c.zeit.map(z => `<li><b>${esc(z[0])}</b><span>${esc(z[1])}</span></li>`).join("")}</ol>
  ${c.werkzeug ? `<h2>Denkwerkzeug</h2><div class="werk">${c.werkzeug}</div>` : ""}
  <div class="seitenumbruch"><h2 style="margin-top:0">Meine Ergebnisse</h2>
  ${c.mein.map(x => `<div class="karte"><b>${esc(x[0])}</b><br>${m(typeof x[1] === "function" ? x[1]() : hol(x[1]))}</div>`).join("")}
  <h2>Mein Platz im Netz</h2>
  <div class="karte"><b>Verbindungen aus dieser Stunde</b>${eigene.length ? `<ul style="margin:.2rem 0 0;padding-left:1.1rem">${eigene.map(l => `<li><b>${esc(karte(l.a).titel)}</b> ${esc(artWort(l.art))} <b>${esc(karte(l.b).titel)}</b>: ${m(l.satz)}</li>`).join("")}</ul>` : `<br>${m("")}`}</div>
  <div class="karte"><b>Mein Satz für den roten Faden</b><br>${m(S.v.faden)}</div>
  <p class="hinweis">Leitfrage der Einheit: ${esc(LEITFRAGE)}</p></div></div>
  <div class="reihe nodruck"><button type="button" class="btn dunkel" data-drucken>Merkseite drucken oder als PDF sichern</button><a class="btn" href="index.html#raster">Zum Zeitraster der Einheit</a><span class="hinweis">Zwei Seiten A4.</span></div>
  ${weiter("start", "Zum Anfang der Stunde")}`;
}

/* ---------- Für Lehrkräfte ---------- */
function lehrkraft(){
  const c = L.lk, s = meine();
  return `<div class="lk"><p class="zeit"><span class="nr">Für Lehrkräfte</span><span>nicht geschützt</span></p><h1>Stunde ${stundeNr()} · ${esc(L.titel)}</h1>
  <p class="lead">Heft: ${esc(s[3])} · Bildungsplan: ${esc(s[5])} · Karten: ${s[4].map(id => esc(karte(id).titel)).join(", ") || "keine"}</p>
  <h2 class="abschnitt">Ablauf (90 Minuten)</h2><div class="matrix-wrap"><table><thead><tr><th>Zeit</th><th>Phase</th><th>Sozialform</th><th>Was passiert</th></tr></thead><tbody>${c.ablauf.map(a => `<tr><td class="n">${esc(a[0])}</td><td><b>${esc(a[1])}</b></td><td>${esc(a[2])}</td><td>${esc(a[3])}</td></tr>`).join("")}</tbody></table></div>
  <h2 class="abschnitt">Denkhandlung und Muster</h2><ul>${c.muster.map(x => `<li>${x}</li>`).join("")}</ul>
  <h2 class="abschnitt">Erwartungen</h2><ul>${c.erwartung.map(x => `<li>${x}</li>`).join("")}</ul>
  <h2 class="abschnitt">Abweichungen vom Heft</h2><ul>${c.heft.map(x => `<li>${x}</li>`).join("")}</ul>
  <h2 class="abschnitt">Nur du kannst das</h2><ul>${c.nurdu.concat(["iPad in Safari hoch und quer, Beamer, VoiceOver, Moodle.", "Bildnachweise klären: Die Bilder stammen aus dem Heft und liegen auf deine Verantwortung im öffentlichen Repository."]).map(x => `<li>${x}</li>`).join("")}</ul>
  <p class="hinweis" style="margin-top:1rem">Speicherschlüssel <code>${esc(L.key)}</code>. „Verorten und vernetzen“ schreibt zusätzlich in den Speicher der Einheit (<code>${OWK_KEY}</code>). „Eingaben löschen“ auf dieser Seite löscht nur die Stunde; Verbindungen und roter Faden löschst du in der Übersicht der Einheit.</p></div>
  ${weiter("start", "Zum Anfang der Stunde")}`;
}
/* ---------- Reihen (Muster 4): Schritte durch Antippen in eine Reihenfolge bringen ----------
   schritte = Texte in der richtigen Reihenfolge; misch = Reihenfolge der Anzeige (Indizes) */
function reihe(id, schritte, misch, tipp){
  const r = (S.reihe = S.reihe || {})[id] || (S.reihe[id] = { folge:[], gepr:false }), frei = misch.filter(i => !r.folge.includes(i)), alle = r.folge.length === schritte.length;
  const falsch = r.gepr ? r.folge.filter((x, i) => x !== i) : [];
  return `<div class="ordwerk"><div><h3 class="klein" style="margin-top:0">Noch offen (${frei.length})</h3><div class="ordpool eins" role="group" aria-label="Noch nicht eingeordnet">${frei.map(i => `<button type="button" class="chip" data-akt="rrein" data-id="${id}" data-w="${i}">${esc(schritte[i])}</button>`).join("") || `<p class="hinweis">Alles liegt.</p>`}</div></div>
  <div><h3 class="klein" style="margin-top:0">Deine Reihenfolge</h3><ol class="ordfolge eins">${r.folge.map((x, i) => `<li class="${r.gepr ? (x === i ? "ok" : "nein") : ""}"><button type="button" data-akt="rraus" data-id="${id}" data-w="${x}" aria-label="Schritt ${i + 1} herausnehmen"><span>${i + 1}</span><b>${esc(schritte[x])}</b></button></li>`).join("") || `<li class="leer">Tippe links an, was zuerst geschah.</li>`}</ol></div></div>
  <div class="reihe"><button type="button" class="btn dunkel" data-akt="rpruef" data-id="${id}" ${alle && !r.gepr ? "" : "disabled"}>Prüfen</button><button type="button" class="btn" data-akt="rneu" data-id="${id}">Neu beginnen</button></div>
  <div aria-live="polite">${r.gepr ? (falsch.length ? `<div class="rm teils"><b>${schritte.length - falsch.length} von ${schritte.length} liegen richtig.</b> Goldene Kante: noch einmal prüfen. ${esc(tipp || "Lies im Text nach, was worauf antwortet.")}</div>` : `<div class="rm zentral"><b>Die Reihenfolge stimmt.</b> Achte auf das Muster: Jeder Schritt ist eine Antwort auf den Schritt davor.</div>`) : ""}</div>`;
}
const reiheOk = id => { const r = (S.reihe || {})[id]; return !!(r && r.gepr && r.folge.every((x, i) => x === i)); };
AKTION.rrein = t => { const r = S.reihe[t.dataset.id]; r.folge.push(+t.dataset.w); r.gepr = false; speichere(); zeichneBehalte(); };
AKTION.rraus = t => { const r = S.reihe[t.dataset.id]; r.folge = r.folge.filter(x => x !== +t.dataset.w); r.gepr = false; speichere(); zeichneBehalte(); };
AKTION.rpruef = t => { S.reihe[t.dataset.id].gepr = true; speichere(); zeichneBehalte(); };
AKTION.rneu = t => { S.reihe[t.dataset.id] = { folge:[], gepr:false }; speichere(); zeichneBehalte(); };
/* Tabelle mit eigenen Einträgen: zeilen = [[schlüssel, Titel]], pfad = Ort in S */
const tabelle = (pfad, kopf, zeilen) => `<div class="matrix-wrap"><table class="tab3"><thead><tr>${kopf.map(k => `<th>${esc(k)}</th>`).join("")}</tr></thead><tbody>${zeilen.map(z => `<tr><th scope="row">${esc(z[1])}</th>${kopf.slice(1).map((k, i) => { const p = pfad + "." + z[0] + (kopf.length > 2 ? "_" + i : ""); return `<td><label class="sr" for="f-${p.replace(/\W/g, "-")}">${esc(z[1])}: ${esc(k)}</label><textarea id="f-${p.replace(/\W/g, "-")}" data-f="${p}" rows="2">${esc(hol(p) || "")}</textarea></td>`; }).join("")}</tr>`).join("")}</tbody></table></div>`;
function stundeStart(){
  const eig = L.nachEingabe;
  L.nachEingabe = p => {
    if (p === "v.faden") owkSchreib(u => { u.faden[L.sid] = S.v.faden; });
    if (p === "v.link.satz") { const b = document.querySelector("[data-akt=vlink]"), l = S.v.link; if (b) b.disabled = !(l.a && l.b && l.a !== l.b && l.satz.trim().length >= 15); }
    if (eig) eig(p);
  };
  kernStart();
}
