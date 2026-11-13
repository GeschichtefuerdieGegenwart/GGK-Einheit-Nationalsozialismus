/* ===== Ost-West-Konflikt: Übersicht der Einheit (Orientierungsrahmen) ===== */
const L = {
  key:OWK_KEY, hub:true, nr:"Einheit", titel:"Der Ost-West-Konflikt", unter:"Orientierungsrahmen 1945–1991", mark:OWK_MARK,
  seiten:[["start","",""],["raster","16 Karten","Zeitraster"],["ordnen","Abruf","Ordnen"],["netz","Verbindungen","Vernetzen"],["glossar","Begriffe","Glossar"],["faden","Leitfrage","Roter Faden"]],
  breit:["start","raster","ordnen","netz","glossar","faden","lehrkraft"],
  loesch:"Alle Eingaben der Einheit werden auf diesem Gerät entfernt: bearbeitete Karten, deine Reihenfolge, deine Verbindungen und dein roter Faden.",
  init:() => ({ bearbeitet:{}, links:[], faden:{}, jahr:{}, ordnen:{ folge:[], gepr:false, n:0, zeig:false }, entwurf:{ a:"k02", b:"k03", art:"reaktion", satz:"" }, gruppe:"g", suche:"", text:"" }),
  nachEingabe(p){
    if (p === "entwurf.satz") { const b = document.querySelector("[data-akt=linkneu]"); if (b) b.disabled = !linkBereit(); }
    if (p === "suche") { const g = document.getElementById("gliste"); if (g) g.innerHTML = glossarListe(); }
  },
};
const linkBereit = () => S.entwurf.a && S.entwurf.b && S.entwurf.a !== S.entwurf.b && S.entwurf.satz.trim().length >= 15;
const stundeFertig = id => !!(S.faden[id] && S.faden[id].trim());
const linksVon = id => S.links.filter(l => l.a === id || l.b === id);
/* feste Mischung für das Ordnen (bei allen gleich, damit man am Beamer darüber sprechen kann) */
const MISCH = ["k09","k03","k14","k06","k16","k01","k11","k07","k13","k04","k10","k15","k02","k12","k08","k05"];
const TIPP = { k01:"Steht ganz am Anfang: Die Sieger regeln, was aus Deutschland wird.", k02:"Zwei Jahre nach Kriegsende sagen die USA dem Kommunismus den Kampf an.", k03:"Die sowjetische Antwort auf die Truman-Doktrin – also danach.", k04:"Setzt die Eindämmung wirtschaftlich um. Beginnt im Jahr der Truman-Doktrin.", k05:"Anlass war die Währungsreform im Westen – noch bevor es zwei deutsche Staaten gab.", k06:"Folgt direkt auf die Blockade.", k07:"Der erste „heiße“ Krieg – kurz nach der Gründung der beiden deutschen Staaten.", k08:"Eine Reaktion auf den NATO-Beitritt der Bundesrepublik.", k09:"Schließt die letzte offene Grenze, nach 2,7 Millionen Flüchtlingen seit 1949.", k10:"Ein gutes Jahr nach dem Mauerbau.", k11:"Beginnt mit der sozial-liberalen Koalition.", k12:"Umfasst die Ostpolitik und endet mit der Invasion in Afghanistan.", k13:"Beendet die Entspannung.", k14:"Zieht sich über Jahrzehnte. Diese Karte darf an mehreren Stellen liegen.", k15:"Ein neuer Mann kommt in Moskau an die Macht.", k16:"Macht die deutsche Einheit möglich – ganz am Ende." };

function start(){
  const nB = KARTEN.filter(k => S.bearbeitet[k.id]).length, nF = STUNDEN.filter(s => stundeFertig(s[0])).length;
  return `${band("Jahrgangsstufe 2 · Bildungsplaneinheit 3 · neun Doppelstunden", "Der Ost-West-Konflikt", "1945 kämpfen die USA und die Sowjetunion noch gemeinsam. Zwei Jahre später stehen sie einander als Feinde gegenüber – 44 Jahre lang, mit Deutschland in der Mitte.")}
  <p class="leitfrage">${esc(LEITFRAGE)}</p>
  <h2 class="abschnitt">So arbeitest du in dieser Einheit</h2>
  <div class="regeln">
    <div><b>1 · Vernetzen</b>Zieh Verbindungen zwischen Ereignissen und Begriffen. Wie hängen Truman-Doktrin und Zwei-Lager-Theorie zusammen?</div>
    <div><b>2 · Nach der Perspektive fragen</b>Aus wessen Sicht wird hier erzählt? Welche Erzählung wird bedient?</div>
    <div><b>3 · Die Landkarte anwenden</b>Welches Prinzip der kognitiven Landkarte hilft hier: Retrospektivität, Perspektivität, Selektivität, Standortgebundenheit, Narrativität, Konstruktivität?</div>
    <div><b>4 · Nach Handlungsspielraum fragen</b>Wer konnte entscheiden? Wer war Getriebener? Wo liegen die Grenzen des Handelns?</div>
  </div>
  <h2 class="abschnitt">Dein Überblick wächst</h2>
  <div class="standzeile" role="group" aria-label="Dein Stand">
    <button type="button" data-geh="raster"><b>${nB} von 16</b>Karten bearbeitet</button>
    <button type="button" data-geh="netz"><b>${S.links.length}</b>eigene Verbindungen</button>
    <button type="button" data-geh="faden"><b>${nF} von ${STUNDEN.length}</b>Sätze im roten Faden</button>
  </div>
  <p class="hinweis">Jede Stunde endet mit drei Schritten: Karten einordnen, eine Verbindung ziehen, einen Satz zur Leitfrage schreiben. Alles sammelt sich hier.</p>
  <h2 class="abschnitt">Die neun Stunden</h2>
  <ol class="stunden">${STUNDEN.map((s, i) => { const da = GEBAUT.includes(s[0]); return `<li class="${stundeFertig(s[0]) ? "fertig" : ""}">${da ? `<a href="${s[1]}">` : `<span class="nochnicht">`}<span class="snr">${i + 1}</span><span class="st"><b>${esc(s[2])}</b><small>Heft ${esc(s[3])}${s[4].length ? " · Karten: " + s[4].map(id => esc(karte(id).titel)).join(", ") : ""}</small></span><span class="sstat">${stundeFertig(s[0]) ? "✓ Faden geschrieben" : (da ? "öffnen ›" : "in Arbeit")}</span>${da ? "</a>" : "</span>"}</li>`; }).join("")}</ol>
  ${weiter("raster", "Zum Zeitraster")}`;
}

/* ---------- Zeitraster: neun Phasen × drei Ebenen ---------- */
function chip(k){
  const n = linksVon(k.id).length;
  return `<button type="button" class="chip spur-${k.spur} ${S.bearbeitet[k.id] ? "da" : ""}" data-akt="kzeig" data-w="${k.id}" aria-label="${esc(k.titel)}, ${esc(k.datum)}${S.bearbeitet[k.id] ? ", bearbeitet" : ""}${n ? ", " + n + " Verbindungen" : ""}"><b>${esc(k.titel)}</b><small>${esc(k.datum)}</small>${S.bearbeitet[k.id] ? `<i aria-hidden="true">✓</i>` : ""}${n ? `<em aria-hidden="true">${n}</em>` : ""}</button>`;
}
function rasterHtml(o = {}){
  const zelle = (p, sp) => KARTEN.filter(k => k.phase === p[0] && k.spur === sp).map(k => o.druck ? `<span class="chip spur-${k.spur}"><b>${esc(k.titel)}</b><small>${esc(k.datum)}</small></span>` : chip(k)).join("");
  return `<div class="zraster ${o.druck ? "druck" : "gross"}">
    <div class="zspur" aria-hidden="true"><span></span>${["w","e","d"].map(sp => `<span class="ze spur-${sp}">${SPUR[sp]}</span>`).join("")}</div>
    ${PHASEN.map((p, i) => `<section class="zphase" aria-label="Phase ${i + 1}: ${esc(p[1])}, ${esc(p[2])}"><h3><b>${esc(p[1])}</b><small>${esc(p[2])}</small></h3>${["w","e","d"].map(sp => { const z = zelle(p, sp); return `<div class="zz ${z ? "" : "leer"}" ${o.druck ? "" : `role="group" aria-label="${SPUR[sp]}"`}><span class="zlab">${SPUR[sp]}</span>${z}</div>`; }).join("")}</section>`).join("")}
  </div>`;
}
function zeitraster(){
  return `${zeitKopf("raster")}<h1>Das Zeitraster</h1>
  <p class="lead">Neun Phasen von 1945 bis 1991, drei Ebenen: die Welt, Europa, Deutschland. Tippe eine Karte an, um sie zu lesen. Ein Haken zeigt, dass du sie in einer Stunde bearbeitet hast; die Zahl zeigt deine Verbindungen.</p>
  ${rasterHtml()}
  <p class="hinweis" style="margin-top:.6rem">${status("modell", "Modell")}Die Einteilung in Phasen stammt aus dem Glossar M28. Sie ist eine Deutung: Andere Darstellungen setzen die Grenzen anders. Was lässt dieses Raster weg? Zum Beispiel die Blockfreien und alles, was nicht in eine Spalte passt.</p>
  ${weiter("ordnen", "Weiter: Ordnen")}`;
}
function karteDialog(id){
  const k = karte(id), ls = linksVon(id);
  tafel(`<div class="kdialog">${karteHtml(k)}
    <div class="kdneben"><h4>Deine Verbindungen</h4>${ls.length ? `<ul>${ls.map(l => `<li><b>${esc(karte(l.a).titel)}</b> ${esc(artWort(l.art))} <b>${esc(karte(l.b).titel)}</b><br><span class="mein">${esc(l.satz)}</span></li>`).join("")}</ul>` : `<p class="hinweis">Noch keine. Verbinde diese Karte mit einer anderen.</p>`}
    <div class="reihe"><button type="button" class="btn dunkel" data-akt="kverbind" data-w="${id}">Diese Karte verbinden</button></div>
    <h4>Vier Fragen an die Karte</h4><ul class="vierfragen"><li>Womit hängt sie zusammen?</li><li>Aus wessen Sicht ist sie erzählt?</li><li>Welches Prinzip der Landkarte steckt im Kasten „${esc(k.kasten[0])}“?</li><li>Wer hatte hier Handlungsspielraum?</li></ul></div></div>`, { hell:true, titel:"Ereigniskarte " + k.nr + " von 16" });
}

/* ---------- Ordnen: die Aufgabe „__/16“ aus dem Heft ---------- */
function ordnungPruefen(){
  const f = S.ordnen.folge, ohne14 = f.filter(x => x !== "k14"), soll = KARTEN.map(k => k.id).filter(x => x !== "k14"), res = {};
  ohne14.forEach((id, i) => { let ok = soll[i] === id; if (!ok && ((id === "k11" && soll[i] === "k12") || (id === "k12" && soll[i] === "k11"))) ok = true; res[id] = ok; });
  const p14 = f.indexOf("k14"); res.k14 = p14 >= 6; return res;
}
function ordnen(){
  const o = S.ordnen, frei = MISCH.filter(id => !o.folge.includes(id)), res = o.gepr ? ordnungPruefen() : {}, alle = o.folge.length === 16;
  const falsch = o.gepr ? o.folge.filter(id => !res[id]) : [], erste = falsch[0];
  return `${zeitKopf("ordnen")}<h1>Ordnen</h1>
  ${auftrag("Allein oder zu zweit · 10 Minuten · ohne Heft", "Was kam wann?", "Bring die 16 Ereignisse in die richtige Reihenfolge. Tippe das Ereignis an, das als Nächstes kommt. Ein Tipp auf ein Ereignis in deiner Reihe nimmt es wieder heraus. Wenn alle liegen: prüfen.")}
  <div class="ordwerk">
    <div><h3 class="klein" style="margin-top:0">Noch offen (${frei.length})</h3><div class="ordpool" role="group" aria-label="Noch nicht eingeordnet">${frei.map(id => `<button type="button" class="chip spur-${karte(id).spur}" data-akt="ordrein" data-w="${id}"><b>${esc(karte(id).titel)}</b></button>`).join("") || `<p class="hinweis">Alles liegt.</p>`}</div></div>
    <div><h3 class="klein" style="margin-top:0">Deine Reihenfolge</h3><ol class="ordfolge" aria-label="Deine Reihenfolge">${o.folge.map((id, i) => `<li class="${o.gepr ? (res[id] ? "ok" : "nein") : ""}"><button type="button" data-akt="ordraus" data-w="${id}" aria-label="${i + 1}. ${esc(karte(id).titel)} – herausnehmen"><span>${i + 1}</span><b>${esc(karte(id).titel)}</b>${o.gepr && o.zeig ? `<small>${esc(karte(id).datum)}</small>` : ""}</button></li>`).join("") || `<li class="leer">Tippe links das erste Ereignis an.</li>`}</ol></div>
  </div>
  <div class="reihe"><button type="button" class="btn dunkel" data-akt="ordpruef" ${alle && !o.gepr ? "" : "disabled"}>Prüfen</button>${o.n >= 1 ? `<button type="button" class="btn" data-akt="ordzeig" ${o.zeig ? "disabled" : ""}>Daten einblenden</button>` : ""}<button type="button" class="btn" data-akt="ordneu">Neu beginnen</button></div>
  <div aria-live="polite">${o.gepr ? (falsch.length ? `<div class="rm teils"><b>${16 - falsch.length} von 16 liegen richtig.</b> Grüne Kante: passt. Goldene Kante: noch einmal prüfen. Ein Hinweis zu „${esc(karte(erste).titel)}“: ${esc(TIPP[erste])}</div>` : `<div class="rm zentral"><b>Alle 16 liegen richtig.</b> Jetzt die schwierigere Frage: Welche zwei Ereignisse hängen am engsten zusammen – und warum? Halte es unter „Vernetzen“ fest.</div>`) : ""}</div>
  <p class="hinweis" style="margin-top:.6rem">Ostpolitik und Entspannungspolitik dürfen die Plätze tauschen, die „Stellvertreterkriege weltweit“ dürfen an mehreren Stellen liegen: Beide Karten beschreiben Zeiträume, keine einzelnen Tage.</p>
  ${weiter("netz", "Weiter: Vernetzen")}`;
}

/* ---------- Vernetzen ---------- */
function netz(){
  const e = S.entwurf, wahl = (p, v) => `<select data-f="${p}" data-neu aria-label="Karte wählen">${KARTEN.map(k => `<option value="${k.id}" ${v === k.id ? "selected" : ""}>${k.nr} · ${esc(k.titel)}</option>`).join("")}</select>`;
  const inseln = KARTEN.filter(k => !linksVon(k.id).length);
  return `${zeitKopf("netz")}<h1>Vernetzen</h1>
  ${auftrag("Allein · immer wieder", "Eine Verbindung, ein Satz", "Wähle zwei Karten und die Art der Verbindung. Schreib dann in einem Satz, wie sie zusammenhängen. So entsteht dein eigenes Netz des Ost-West-Konflikts. Es gibt keine vorgegebene Lösung – dein Satz muss die Verbindung begründen.")}
  <div class="karte netzbau">
    <div class="netzzeile">${wahl("entwurf.a", e.a)}<select data-f="entwurf.art" data-neu aria-label="Art der Verbindung">${ARTEN.map(a => `<option value="${a[0]}" ${e.art === a[0] ? "selected" : ""}>${esc(a[1])}</option>`).join("")}</select>${wahl("entwurf.b", e.b)}</div>
    ${textfeld("entwurf.satz", "Wie hängen die beiden zusammen?", { rows:2, platz:"Zum Beispiel: Die Zwei-Lager-Theorie antwortet auf …, weil …", zaehl:false })}
    <div class="reihe"><button type="button" class="btn dunkel" data-akt="linkneu" ${linkBereit() ? "" : "disabled"}>Verbindung festhalten</button>${e.a === e.b ? `<span class="hinweis">Wähle zwei verschiedene Karten.</span>` : ""}</div>
  </div>
  <h2 class="abschnitt">Dein Netz (${S.links.length})</h2>
  ${S.links.length ? `<ul class="netzliste">${S.links.map((l, i) => `<li><span class="nk spur-${karte(l.a).spur}">${esc(karte(l.a).titel)}</span><span class="nart">${esc(artWort(l.art))}</span><span class="nk spur-${karte(l.b).spur}">${esc(karte(l.b).titel)}</span><p class="mein">${esc(l.satz)}</p>${l.von ? `<small class="hinweis">aus Stunde ${esc(l.von.replace("s", ""))}</small>` : ""}<button type="button" class="btn klein nodruck" data-akt="linkweg" data-w="${i}" aria-label="Verbindung entfernen">Entfernen</button></li>`).join("")}</ul>` : `<p class="hinweis">Noch keine Verbindung. Ein Anfang steht schon oben: Truman-Doktrin und Zwei-Lager-Theorie.</p>`}
  ${S.links.length >= 3 ? `<div class="auflage"><p><b>Inseln in deinem Netz.</b> ${inseln.length ? "Diese Karten haben noch keine Verbindung: " + inseln.map(k => esc(k.titel)).join(" · ") + "." : "Jede Karte ist mit mindestens einer anderen verbunden."}</p><p>Prüffrage: Verbindest du nur Nachbarn in der Zeit – oder auch Ereignisse, die Jahrzehnte auseinanderliegen?</p></div>` : ""}
  ${weiter("glossar", "Weiter: Glossar")}`;
}

/* ---------- Glossar ---------- */
const GRUPPEN = [["g","Grundbegriffe und Ideologien"],["i","Institutionen"],["a","Akteur*innen"],["k","Konzepte der Geschichtswissenschaft"]];
function glossarListe(){
  const q = S.suche.trim().toLowerCase();
  const l = GLOSSAR.filter(e => q ? (e.t + " " + e.x).toLowerCase().includes(q) : e.g === S.gruppe);
  const fmt = e => e.g === "a" && /^Rolle:/.test(e.x) ? e.x.replace(/^Rolle: (.*?) Politik: (.*)$/, (m, r, p) => `<b>Rolle:</b> ${esc(r)}<br><b>Politik:</b> ${esc(p)}`) : esc(e.x);
  return (l.map(e => `<details class="gl"><summary>${esc(e.t)}</summary><p>${fmt(e)}</p></details>`).join("") || `<p class="hinweis">Kein Eintrag gefunden.</p>`)
    + (!q && S.gruppe === "a" ? `<div class="trift"><b>Und die Frauen?</b> ${esc(GLOSSAR_FRAUEN)}</div>` : "");
}
function glossar(){
  return `${zeitKopf("glossar")}<h1>Glossar</h1>
  <p class="lead">Dieses Glossar ist kein Lexikon zum Auswendiglernen. Es soll dir helfen, Geschichte als etwas Erzähltes zu sehen – aus einer Perspektive, mit Folgen bis heute.</p>
  <div class="glkopf"><div class="qreiter" role="tablist" aria-label="Gruppe">${GRUPPEN.map(g => `<button type="button" role="tab" aria-selected="${!S.suche && S.gruppe === g[0]}" data-akt="setz" data-p="gruppe" data-w="${g[0]}">${esc(g[1])}</button>`).join("")}</div>
  <label class="sr" for="f-suche">Im Glossar suchen</label><input type="text" id="f-suche" data-f="suche" value="${esc(S.suche)}" placeholder="Suchen, z. B. KSZE" autocomplete="off"></div>
  <div id="gliste">${glossarListe()}</div>
  <p class="quelle">Texte: Glossar M28 aus dem Unterrichtsheft. Die 16 Ereignisse stehen im Zeitraster.</p>
  ${weiter("faden", "Weiter: Roter Faden")}`;
}

/* ---------- Roter Faden und Orientierungsblatt ---------- */
function faden(){
  const m = (t, leer = "noch offen") => `<span class="mein ${String(t || "").trim() ? "" : "leer"}">${esc(String(t || "").trim() || leer)}</span>`;
  return `<div class="zf"><div class="nodruck">${zeitKopf("faden")}<h1>Der rote Faden</h1>
  <p class="lead">Am Ende jeder Stunde schreibst du einen Satz zur Leitfrage. Hier stehen sie nebeneinander. Am Ende der Einheit wird daraus dein eigener Text.</p></div>
  <h1 class="nurdruck">Der Ost-West-Konflikt · Orientierungsblatt</h1>
  <p class="leitfrage">${esc(LEITFRAGE)}</p>
  <h2>Das Zeitraster ${status("modell", "Modell")}</h2>${rasterHtml({ druck:true })}
  <div class="seitenumbruch"><h2 style="margin-top:0">Mein roter Faden</h2>
  <ol class="fadenliste">${STUNDEN.map(s => `<li><b>${esc(s[2])}</b><br>${m(S.faden[s[0]])}</li>`).join("")}</ol>
  <h2>Meine Verbindungen (${S.links.length})</h2>
  ${S.links.length ? `<ul class="netzliste klein">${S.links.map(l => `<li><b>${esc(karte(l.a).titel)}</b> ${esc(artWort(l.art))} <b>${esc(karte(l.b).titel)}</b>: ${m(l.satz)}</li>`).join("")}</ul>` : `<p class="mein leer">noch keine</p>`}
  <h2>Meine Antwort auf die Leitfrage</h2>
  <div class="nodruck">${auftrag("Allein · am Ende der Einheit · 20 Minuten", "Dein Orientierungstext", "Beantworte die Leitfrage in zehn bis zwölf Sätzen. Nutze deine Sätze aus den Stunden und mindestens drei deiner Verbindungen. Nenne Ideologien, Machtinteressen und Handlungsspielräume je mit einem Beispiel.")}
  ${textfeld("text", "Mein Text", { rows:10, anfaenge:["Der Ost-West-Konflikt entstand, weil","Ideologien spielten eine Rolle, zum Beispiel","Machtinteressen zeigten sich, als","Handlungsspielraum hatten","Erinnert wird der Konflikt heute"], ziel:"Ziel: etwa 150 Wörter" })}
  ${raster_("text")}</div>
  <p class="mein nurdruck">${esc(S.text || "")}</p></div></div>
  <div class="reihe nodruck"><button type="button" class="btn dunkel" data-drucken>Orientierungsblatt drucken oder als PDF sichern</button><span class="hinweis">Zwei Seiten A4.</span></div>
  ${weiter("start", "Zur Übersicht")}`;
}
const raster_ = pfad => { return raster(pfad, 90, "Selbstprüfung", [["Drei Faktoren", "Ich nenne einen Faktor.", "Ich nenne Ideologien, Machtinteressen und Handlungsspielräume je mit Beispiel.", "Ich gewichte die drei Faktoren gegeneinander."],["Vernetzung", "Ich zähle Ereignisse auf.", "Ich verbinde mindestens drei Ereignisse mit „weil“ oder „deshalb“.", "Ich verbinde Ebenen: Welt, Europa, Deutschland."],["Perspektive und Erinnerung", "Ich erzähle aus einer Sicht.", "Ich nenne zwei Sichtweisen auf dasselbe Ereignis.", "Ich zeige, wie heute verschieden erinnert wird, und nenne meinen Standort."]]); };

/* Für Lehrkräfte: Der Text liegt verschlüsselt in lk/ (Klartext nicht im Repository). Anzeige und Schloss: src/lk-schloss.js. */

AKTION.kzeig = t => karteDialog(t.dataset.w);
AKTION.kverbind = t => { S.entwurf.a = t.dataset.w; if (S.entwurf.b === t.dataset.w) S.entwurf.b = KARTEN.find(k => k.id !== t.dataset.w).id; S.entwurf.satz = ""; speichere(); geh("netz"); };
AKTION.ordrein = t => { S.ordnen.folge.push(t.dataset.w); S.ordnen.gepr = false; speichere(); zeichneBehalte(); };
AKTION.ordraus = t => { S.ordnen.folge = S.ordnen.folge.filter(x => x !== t.dataset.w); S.ordnen.gepr = false; speichere(); zeichneBehalte(); };
AKTION.ordpruef = () => { S.ordnen.gepr = true; S.ordnen.n++; speichere(); zeichneBehalte(); };
AKTION.ordzeig = () => { S.ordnen.zeig = true; S.ordnen.gepr = true; speichere(); zeichneBehalte(); };
AKTION.ordneu = () => { S.ordnen = { folge:[], gepr:false, n:0, zeig:false }; speichere(); zeichneBehalte(); };
AKTION.linkneu = () => { if (!linkBereit()) return; const e = S.entwurf; S.links.push({ a:e.a, b:e.b, art:e.art, satz:e.satz.trim() }); S.entwurf.satz = ""; speichere(); zeichneBehalte(); };
AKTION.linkweg = t => { S.links.splice(+t.dataset.w, 1); speichere(); zeichneBehalte(); };
const SEITE_FN = { start, raster:zeitraster, ordnen, netz, glossar, faden, lehrkraft };
kernStart();
