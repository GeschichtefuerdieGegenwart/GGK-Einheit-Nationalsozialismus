/* ===== Blatt-Rahmen (Standard aus M22, Fassung 4.1) =====
   Ein Modul ist ein Arbeitsblatt: links das Register mit allen Arbeitsaufträgen und ihrem Stand, rechts genau ein Auftrag (eine Seite zum Scrollen).
   L.blatt   = [{ id, nr, kurz, name, form, min, frei:"offen"|"ansage"|"antwort", nach, fehlt, gleich, marke, kopf }]
   L.erledigt = { id: () => wahr, wenn der Auftrag bearbeitet ist }
   L.schmal  = [ids]  – Aufträge, die die ganze Breite brauchen (Register wird zur Nummernleiste)
   L.kapitel = "Weimarer Republik" · L.dauer = 90
   L.schreib = Schreibauftrag im Format der Klassenarbeit · L.zf = Zusammenfassung in zwei Teilen (wissen / können) */
let BLATT_AN = false;   // wahr, während eine Auftragsseite gebaut wird: zeitKopf() und weiter() liefern dann nichts, der Rahmen trägt Kopf und Fuß
const BLATT = () => Array.isArray(L.blatt);
const AUFI = id => BLATT() ? L.blatt.findIndex(a => a.id === id) : -1;
const AUF = id => L.blatt[AUFI(id)];
const QUER = () => { try { return matchMedia("(min-width:900px)").matches; } catch(e) { return true; } };
const probe = f => { try { return !!(f && f()); } catch(e) { return false; } };
const beantwortet = id => { const f = (L.erledigt || {})[id]; return f ? probe(f) : !!(S.durch || {})[id]; };
const erledigt = id => probe((L.erledigt || {})[id]) || !!(S.durch || {})[id];
/* Was schon einmal offen war (S.war) oder schon bearbeitet ist, bleibt offen: Eine neue Freigaberegel darf vorhandene Arbeit nicht verstecken. */
const offen = id => { const a = AUF(id); if (!a || !a.frei || a.frei === "offen" || (S.frei || {})[id] || (S.war || {})[id] || probe((L.erledigt || {})[id])) return true; return a.frei === "antwort" && beantwortet(a.nach); };
const SCHMAL = () => BLATT() && (L.schmal || []).includes(S.seite) && offen(S.seite);

function register(immer){
  const r = document.getElementById("reg"); if (!r || !BLATT()) return;
  const lf = document.getElementById("loesch-frage");
  if (!immer && (r.contains(document.activeElement) || (lf && !lf.hidden && r.contains(lf)))) return;
  const sl = r.scrollLeft, st = r.scrollTop;
  r.innerHTML = `<p class="ab-regtitel">Dieses Blatt · ${L.dauer || 90} Minuten</p><ol>${L.blatt.map(a => { const hier = a.id === S.seite;
    const [wort, kl] = hier ? ["du bist hier","hier"] : erledigt(a.id) ? ["fertig","fertig"] : offen(a.id) ? ["offen","offen"] : a.frei === "ansage" ? ["öffnet auf Ansage","ansage"] : ["öffnet nach deiner Antwort","antwort"];
    return `<li><button type="button" data-geh="${a.id}" class="${kl}"${hier ? ' aria-current="step"' : ""} aria-label="Auftrag ${a.nr}: ${esc(a.kurz)}, ${esc(a.form)}, ${a.min} Minuten, ${wort}"><span class="ab-nr" aria-hidden="true">${a.nr}</span><span><b>${esc(a.kurz)}</b><small>${esc(a.form)} · ${a.min} Min.</small><span class="ab-st">${wort}</span></span></button></li>`; }).join("")}</ol>`;
  if (QUER() && !SCHMAL()) r.insertAdjacentHTML("beforeend", loeschBereich());
  r.scrollLeft = sl; r.scrollTop = st;
}
function zuSeite(a){
  const ans = a.frei === "ansage", nach = ans ? null : AUF(a.nach);
  return `<div class="ab-zu"><p class="ab-zu-t">${ans ? "Dieser Auftrag öffnet auf Ansage." : "Dieser Auftrag öffnet nach deiner Antwort."}</p>
  <p>${esc(ans ? "Darum geht es gleich: " + (a.gleich || a.name) : (a.fehlt || "Bearbeite erst den Auftrag davor."))}</p>
  ${nach ? `<button type="button" class="btn dunkel" data-geh="${nach.id}">Zu Auftrag ${nach.nr}</button>` : ""}
  <button type="button" class="btn${ans ? " dunkel" : ""}" data-freifrage aria-expanded="false">${ans ? "Unsere Lehrkraft hat freigegeben" : "Auf Ansage trotzdem öffnen"}</button>
  <div id="ab-frage" hidden class="loesch-frage"><p><b>Hat eure Lehrkraft Auftrag ${a.nr} freigegeben?</b></p><div class="reihe"><button type="button" class="btn primary" data-frei="${a.id}">Ja, öffnen</button><button type="button" class="btn" data-frei="">Nein, noch nicht</button></div></div></div>`;
}
const blattzeile = () => `<div class="ab-zeile"><span>GGK · ${esc(L.kapitel || "")}</span><span>${esc(L.nr)} · Arbeitsblatt</span><span>Datum: ${new Date().toLocaleDateString("de-DE")}</span></div>`;
function blatt(a){
  const zu = !offen(a.id), ai = AUFI(a.id);
  if (!zu && a.frei && a.frei !== "offen" && !(S.war || {})[a.id]) { if (!S.war) S.war = {}; S.war[a.id] = true; speichere(); }
  let html; BLATT_AN = true;
  try { html = zu ? zuSeite(a) : String(SEITE_FN[a.id]()).replace(/^\s*(<p class="zeit">[\s\S]*?<\/p>)?\s*<h1[^>]*>[\s\S]*?<\/h1>/, ""); } finally { BLATT_AN = false; }
  const davor = ai > 0 ? L.blatt[ai - 1] : null, danach = ai < L.blatt.length - 1 ? L.blatt[ai + 1] : null;
  return `<h1 class="ab-h"><span class="ab-nr" aria-hidden="true">${a.nr}</span><span>${esc(a.kopf || "Arbeitsauftrag " + a.nr)}: ${esc(a.name)}</span></h1>
  <p class="ab-meta">${esc(a.form)} · ${a.min} Minuten${a.marke ? `<span class="ab-marke">${esc(a.marke)}</span>` : ""}</p>
  <section class="ab-teil">${html}</section>
  <div class="ab-fuss nodruck"><button type="button" class="btn" data-geh="${davor ? davor.id : "start"}">‹ ${davor ? esc(davor.nr + " " + davor.kurz) : "Deckblatt"}</button><span></span>
  ${danach ? `<button type="button" class="btn primary" data-geh="${danach.id}"${zu ? "" : ` data-durch="${a.id}"`}>${esc(danach.nr + " " + danach.kurz)} ›</button>` : `<a class="btn primary" href="${LABOR}">Zur Übersicht</a>`}</div>`;
}
/* Ablauf fürs Deckblatt: die Aufträge als Liste */
const blattAblauf = () => `<ol class="ablauf ab-ablauf">${L.blatt.map(a => `<li><b>${a.nr}</b><span>${esc(a.name)} <small>${esc(a.form)} · ${a.min} Min.${a.frei === "ansage" ? " · auf Ansage" : ""}</small></span></li>`).join("")}</ol>`;

/* ---------- Auswahl links, die eine Karte rechts (Muster aus M22 4.1) ----------
   eintraege = [{ id, nr, titel, unter, html, fertig }] · Stand: S.wk[gruppe] = id */
function wahlKarte(gruppe, eintraege, o = {}){
  const akt = (S.wk || {})[gruppe] || (o.leer ? null : eintraege[0].id), e = eintraege.find(x => x.id === akt);
  return `<div class="w-wahl ${o.klasse || ""}" data-wahlgruppe="${gruppe}">
  <div class="w-liste" role="group" aria-label="${esc(o.titel || "Auswahl")}">${eintraege.map(x => `<button type="button" data-akt="wk" data-p="${gruppe}" data-w="${x.id}" aria-pressed="${x.id === akt}" class="${x.fertig ? "um" : ""}">${x.nr ? `<span class="w-nr">${esc(x.nr)}</span>` : ""}<span class="w-t">${esc(x.titel)}</span>${x.unter ? `<span class="w-u">${esc(x.unter)}</span>` : ""}${x.fertig ? `<span class="w-st">✓ ${esc(typeof x.fertig === "string" ? x.fertig : "bearbeitet")}</span>` : ""}</button>`).join("")}</div>
  <div class="w-karte" id="wk-${gruppe}" tabindex="-1" aria-live="polite">${e ? e.html : `<p class="w-leer">${esc(o.leer)}</p>`}</div></div>`;
}
/* ---------- Skala: sich festlegen auf einer Linie (Meinungslinie, Bewertung 1–5) ---------- */
function skala(pfad, frage, n, links, rechts, o = {}){
  const v = hol(pfad), von = o.von ?? 1;
  return `<fieldset class="w-skala"><legend>${frage}</legend><div class="w-stufen" style="--n:${n}">${Array.from({ length:n }, (_, i) => i + von).map(i => `<button type="button" data-akt="skala" data-p="${pfad}" data-w="${i}" aria-pressed="${v === i}" aria-label="${i} von ${n + von - 1}">${i}</button>`).join("")}</div><div class="pole"><span>${esc(links)}</span><span>${esc(rechts)}</span></div></fieldset>`;
}
/* ---------- Erst erinnern (P2): Frage – eigene Antwort im Kopf oder im Feld – dann aufdecken ---------- */
function abrufen(pfad, fragen){
  const a = hol(pfad) || {};
  return `<div class="w-abruf">${fragen.map((f, i) => { const auf = !!(a.auf || {})[i], t = (a.t || {})[i] || "";
    return `<div class="w-frage"><label for="ab-${pfad}-${i}"><span class="w-nr">${i + 1}</span> ${esc(f[0])}</label><input type="text" id="ab-${pfad}-${i}" data-f="${pfad}.t.${i}" value="${esc(t)}" placeholder="Stichwort genügt" autocomplete="off" ${auf ? "readonly" : ""}>
    <button type="button" class="btn" data-akt="abrufauf" data-p="${pfad}" data-w="${i}" ${auf ? "disabled" : ""}>${auf ? "Aufgedeckt" : "Aufdecken"}</button>
    <div class="w-loesung" aria-live="polite">${auf ? `<b>Das gehört dazu:</b> ${f[1]}` : ""}</div></div>`; }).join("")}</div>`;
}
/* ---------- Tabelle zum Ausfüllen: kopf = [Spalten], zeilen = [Zeilentitel] ---------- */
function tabelle(pfad, kopf, zeilen, o = {}){
  return `<div class="matrix-wrap w-tab"><table><thead><tr>${kopf.map(k => `<th scope="col">${esc(k)}</th>`).join("")}</tr></thead><tbody>${zeilen.map((z, r) => `<tr><th scope="row">${z}</th>${kopf.slice(1).map((k, c) => `<td><textarea data-f="${pfad}.${r}.${c}" rows="${o.rows || 2}" aria-label="${esc(String(z).replace(/<[^>]+>/g, ""))}: ${esc(k)}" placeholder="${esc((o.platz || [])[c] || "")}">${esc(hol(`${pfad}.${r}.${c}`) || "")}</textarea></td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}
const tabelleVoll = (pfad, zeilen, spalten, min = 3) => { for (let r = 0; r < zeilen; r++) for (let c = 0; c < spalten; c++) if (String(hol(`${pfad}.${r}.${c}`) || "").trim().length < min) return false; return true; };
/* ---------- Film oder Seite außerhalb: öffnet erst auf eigenes Tippen in einem neuen Tab (nichts wird vorab geladen) ---------- */
function filmKarte(v){
  return `<div class="w-film"><div class="w-film-t"><span class="kennung">${esc(v.art || "Film")}${v.dauer ? " · " + esc(v.dauer) : ""}</span><h3>${esc(v.titel)}</h3><p>${v.text || ""}</p><p class="quelle">${v.nachweis || ""}</p></div>
  <a class="btn dunkel" href="${esc(v.url)}" target="_blank" rel="noopener">${esc(v.knopf || "Film öffnen")} ↗</a><p class="hinweis">Öffnet in einem neuen Tab bei ${esc(v.wo)}. Deine Eingaben hier bleiben.</p></div>`;
}
/* ---------- Großes Bild mit Nachweis; fehlt die Datei (öffentliche Fassung), verschwindet die Figur ---------- */
function bild(b, o = {}){
  return `<figure class="w-bild ${o.klasse || ""}" data-bildgruppe="${o.gruppe || ""}"><img src="${b.pfad || "media/"}${b.datei}" alt="${esc(b.alt)}" loading="lazy" onerror="bildFehlt(this)"><figcaption>${b.text || ""}<span class="nachweis">${b.nachweis || "Bild aus dem Unterrichtsheft. Nachweis offen."}</span></figcaption></figure>`;
}
/* ---------- Zeitleiste (Orientierung): punkte = [[datum, titel, text, klasse]] ---------- */
const zeitleiste = (punkte, o = {}) => `<ol class="w-zeit ${o.klasse || ""}" style="--n:${punkte.length}">${punkte.map(p => `<li class="${p[3] || ""}"><b>${esc(p[0])}</b><span class="w-zt">${esc(p[1])}</span>${p[2] ? `<span class="w-zx">${esc(p[2])}</span>` : ""}</li>`).join("")}</ol>`;
/* ---------- Karten im Raster (Personen, Parteien, Positionen) ---------- */
const karten = (liste, o = {}) => `<div class="w-karten k${o.spalten || 3}">${liste.map(k => `<article class="w-kk ${k.klasse || ""}">${k.kopf ? `<p class="kennung">${esc(k.kopf)}</p>` : ""}<h3>${esc(k.titel)}</h3>${k.html || ""}</article>`).join("")}</div>`;
/* ---------- Kasten »Das brauchst du« (Erklärung direkt an der Aufgabe, wortgleich mit der Zusammenfassung) ---------- */
const wissen = (titel, html) => `<aside class="w-wissen"><p class="kennung">Das brauchst du</p><h3>${esc(titel)}</h3>${html}</aside>`;

/* ---------- Landkarte als fester Auftrag L: erst vermuten, dann einen Eintrag der kognitiven Landkarte wählen und begründen ----------
   Namen und Erklärungen wörtlich aus der kognitiven Landkarte (Repository kognitive-Landkarte-des-Geschichtsunterrichts, Stand 17.11.2026). */
const LKTEIL = {
  wozu:{ anker:"1-0", titel:"1 Wozu Geschichte?", liste:[
    ["1-1","Resilienz gegen Manipulation","Wenn du weißt, wie Propaganda in der Vergangenheit funktioniert hat und wie Geschichten gebaut werden, erkennst du leichter, mit welchen Absichten dir heute etwas erzählt wird."],
    ["1-2","Anthropologische Konstanten","Geschichte zeigt wiederkehrende Muster menschlichen Verhaltens, zum Beispiel wie Menschen in Krisen reagieren, wie Gruppen sich abgrenzen oder wie Macht gesichert wird."],
    ["1-3","Verständnis der Gegenwart","Wir befragen die Vergangenheit mit unseren heutigen Fragen, und ihre Antworten helfen uns, unsere Gegenwart zu verstehen."],
    ["1-4","Lernen aus der Vergangenheit","Kann man aus Geschichte lernen? Situationen wiederholen sich nie genau."],
    ["1-5","Kulturelles Bewusstsein","Wer sich mit anderen Zeiten und Kulturen beschäftigt, erkennt auch, dass die eigene Lebensweise nicht selbstverständlich ist."],
    ["1-6","Identitätsbildung","Geschichte stiftet Identität, für Einzelne wie für Gruppen und Nationen. Aber Identitäten sind gemacht."],
    ["1-7","Kritisches Denken","Quellen kritisch prüfen: Wer hat sie verfasst? Wann, wozu, für wen? Was kann eine Quelle wissen und was nicht?"],
    ["1-8","Demokratisches Bewusstsein","Wer versteht, wie Demokratien entstanden sind und wie sie gescheitert sind, kann sich besser an der Demokratie beteiligen."],
    ["1-9","Verständnis globaler Zusammenhänge","Globalgeschichte hilft, Entwicklungen zu verstehen, die an keiner Grenze haltmachen."],
    ["1-10","Inspiration und Motivation","Geschichten von Mut, Widerstand und sozialem Wandel können motivieren, sich selbst einzusetzen."]] },
  trift:{ anker:"2-2", titel:"2.2 Die Unterschiede: Triftigkeitsprüfungen", liste:[
    ["2-2-1","Empirische Triftigkeit","Stimmen die Tatsachen? Eine Geschichte ist empirisch triftig, wenn die behaupteten Fakten durch Quellen belegt und mit dem Forschungsstand vereinbar sind."],
    ["2-2-2","Normative Triftigkeit","Sind die Wertungen begründet? Normativ triftig ist eine Geschichte, wenn ihre Wertungen offengelegt und durch begründbare, allgemein zustimmungsfähige Normen gedeckt sind."],
    ["2-2-3","Narrative Triftigkeit","Ist der Zusammenhang schlüssig? Ursache und Folge, Kontinuität und Wandel müssen begründet sein, nicht nur behauptet."]] },
  formen:{ anker:"2-3", titel:"2.3 Formen von Geschichte", liste:[
    ["2-3-1","Ideengeschichte","untersucht, wie philosophische, religiöse und politische Ideen entstehen, sich verbreiten und verändern."],
    ["2-3-2","Nationalgeschichte","stellt die Geschichte eines Landes oder einer Nation in den Mittelpunkt."],
    ["2-3-4","Globalgeschichte","untersucht Prozesse, die über nationale Grenzen hinausgehen: Handel, Migration, Imperien, Krankheiten, Wissen."],
    ["2-3-5","Postkoloniale Geschichte","untersucht die Folgen des Kolonialismus für Kolonisierte und Kolonialmächte."],
    ["2-3-6","Mikrogeschichte","untersucht kleine Einheiten wie ein Dorf, eine Familie oder eine einzelne Person sehr genau, um daran größere Zusammenhänge sichtbar zu machen."],
    ["2-3-7","Sozialgeschichte","untersucht gesellschaftliche Strukturen und Prozesse: Klassen, Schichten, soziale Bewegungen, Lebensbedingungen."],
    ["2-3-8","Ereignisgeschichte","erzählt einzelne Ereignisse wie Schlachten, Verträge oder Revolutionen und ihre unmittelbaren Ursachen und Folgen."],
    ["2-3-9","Kulturgeschichte","untersucht Deutungen, Symbole, Rituale, Kunst und Alltagspraktiken: Wie haben Menschen ihre Welt wahrgenommen und ihr Sinn gegeben?"]] },
  wirkung:{ anker:"3-1", titel:"3.1 Analyseinstrumente", liste:[
    ["3-1-1","Kollektives Gedächtnis","Auch wenn wir uns als Einzelne erinnern, geschieht das immer in „sozialen Rahmen“ wie Familie, Religion, Klasse oder Nation (Maurice Halbwachs, 1925)."],
    ["3-1-2","Public History","alle Formen, in denen Geschichte außerhalb von Schule und Universität dargestellt wird: in Museen, Gedenkstätten, Filmen, Serien, Computerspielen, Podcasts, Social Media."],
    ["3-1-3","Geschichtspolitik","der bewusste Versuch politischer Akteure, Geschichte für ihre Ziele zu nutzen: durch Gesetze, Gedenktage, Denkmäler, Lehrpläne, Reden oder das Löschen von Erinnerung."],
    ["3-1-4","Erinnerungskultur","der Oberbegriff für alle Formen, in denen eine Gesellschaft bewusst an Vergangenes erinnert: Denkmäler, Gedenktage, Rituale, Museen, Straßennamen, Schulbücher."],
    ["3-1-5","Agency (Handlungsspielraum)","fragt, inwieweit Menschen oder Gruppen in historischen Situationen eigenständig handeln, Entscheidungen treffen und Entwicklungen beeinflussen konnten."],
    ["3-1-6","Kritische Medienkompetenz","verbindet die historischen Prüfwerkzeuge (Quellenkritik, Triftigkeiten) mit Strategien, die Faktenchecker*innen nutzen."]] },
};
LKTEIL.prinzip = { anker:"2-1", titel:"2.1 Die Gemeinsamkeiten einer jeden Geschichte", liste:Object.keys(PRINZIP).map(id => [id, PRINZIP[id][0], PRINZIP[id][1]]).concat([["2-1-9","Multiperspektivität · Kontroversität · Pluralität","Was folgt daraus? Quellen verschiedener Beteiligter, unterschiedliche Deutungen von Historiker*innen und verschiedene begründete Urteile gehören nebeneinander."]]) };
/* cfg = { teil:"prinzip"|"wozu"|"trift"|"formen"|"wirkung", frage, lead, platz, heft (Frage aus dem Heft, wörtlich), urteil:{ id:[stufe,text] }, sonst:[stufe,text], bruecke } */
function landkarteL(cfg){
  const T = LKTEIL[cfg.teil || "prinzip"], l = S.lk, frei = l.vermutung.trim().length >= 10;
  const p = T.liste.find(x => x[0] === l.prinzip), u = p ? (cfg.urteil[p[0]] || cfg.sonst || ["kaum", "Dieser Eintrag trifft den Kern der Stunde kaum. Lies deine Vermutung noch einmal und vergleiche sie mit den Erklärungen."]) : null;
  return `<p class="leitfrage">${esc(cfg.frage)}</p>
  ${cfg.heft ? `<p class="ab-unter">Im Heft steht dazu unter „Geschichtstheorie: Die Meta-Ebene“: ${esc(cfg.heft)}</p>` : ""}
  <div class="ab-zwei gleich"><div>
  ${auftrag("Allein · 2 Minuten", "Erst vermuten", cfg.lead)}
  ${textfeld("lk.vermutung", "Meine Vermutung", { rows:3, platz:cfg.platz, zaehl:false })}
  <p class="hinweis" id="lk-hinweis">${frei ? "Gut. Jetzt die Landkarte öffnen, dann rechts einen Eintrag wählen." : "Schreib mindestens einen Satz. Danach geht es weiter."}</p>
  </div><div id="lk-teil2" class="${frei ? "" : "gesperrt"}">
  ${auftrag("Allein · 4 Minuten", "Dann die Landkarte", `Öffne „${esc(T.titel)}“ in der kognitiven Landkarte. Sie öffnet sich in einem neuen Tab, deine Eingaben hier bleiben. Wähle unten den Eintrag, der hier am besten passt, und begründe in einem Satz.`)}
  <p><a class="btn dunkel" id="lk-link" href="${LK}${T.anker}" target="_blank" rel="noopener" ${frei ? "" : 'aria-disabled="true" tabindex="-1"'}>Landkarte öffnen: ${esc(T.titel)} ↗</a></p>
  </div></div>
  <div class="lk-wahl ${frei ? "" : "gesperrt"}"><div class="prinzipien" role="group" aria-label="Eintrag der Landkarte wählen">${T.liste.map(x => `<button type="button" data-prinzip="${x[0]}" aria-pressed="${l.prinzip === x[0]}" class="${l.ok && l.prinzip === x[0] ? u[0] : ""}" ${(!frei || l.ok) ? "disabled" : ""}><b>${esc(x[1])}</b><small>${esc(x[2])}</small></button>`).join("")}</div>
  <label for="lk-grund">Meine Begründung</label><textarea id="lk-grund" data-f="lk.grund" rows="2" placeholder="Dieser Eintrag passt hier, weil …" ${(!frei || !l.prinzip || l.ok) ? "disabled" : ""}>${esc(l.grund)}</textarea>
  <div class="reihe"><button type="button" class="btn dunkel" data-lkpruef ${(!frei || !l.prinzip || l.grund.trim().length < 10 || l.ok) ? "disabled" : ""}>Prüfen</button>${l.ok ? `<button type="button" class="btn" data-lkneu>Noch einmal</button>` : ""}<span class="hinweis">Rückmeldung in drei Stufen: zentral · auch begründbar · passt kaum.</span></div>
  <div id="lk-fb" aria-live="polite">${l.ok && u ? `<div class="rm ${u[0]}"><b>${LKSTUFE[u[0]]}</b> ${esc(u[1])} <a href="${LK}${p[0]}" target="_blank" rel="noopener">In der Landkarte nachlesen ↗</a></div>` : ""}</div></div>
  ${cfg.bruecke ? `<div class="trift">${cfg.bruecke}</div>` : ""}`;
}

/* ---------- Schreibauftrag im Format der Klassenarbeit (Standard aus M22, Auftrag 7) ----------
   L.schreib = { vor, aufgabe (HTML, Sie-Form mit <b>Operator</b>), material (HTML, optional), woerter:130, min:60, stufen:[[Name,Text]×3], inhaltKopf, inhalt:[[Kopf,Text]] } · Stand: S.sa */
const schreibFertig = () => !!S.sa.hand || woerter(S.sa.text) >= (L.schreib.min || 60);
const kaRaster = () => `<div class="raster3">${L.schreib.stufen.map(([s, x]) => `<div><b>${esc(s)}</b>${esc(x)}</div>`).join("")}</div>`;
function schreibauftrag(){
  const c = L.schreib, w = woerter(S.sa.text), fertig = schreibFertig(), ziel = c.woerter || 130;
  const schreibteil = `<p><b>Erst gliedern.</b> Drei Stichpunkte, bevor du schreibst:</p>
    <div class="gliederung">${[0,1,2].map(i => `<input type="text" data-f="sa.gl.${i}" aria-label="Stichpunkt ${i + 1}" placeholder="${i + 1}" value="${esc(S.sa.gl[i] || "")}" autocomplete="off">`).join("")}</div>
    <label for="sa-text">Dein Text · etwa ${ziel} Wörter</label><textarea id="sa-text" data-f="sa.text" rows="${c.material ? 9 : 8}">${esc(S.sa.text)}</textarea>
    <p class="hinweis" id="sa-zahl" aria-live="polite">${w} von etwa ${ziel} Wörtern</p>`;
  const handteil = `<p><b>Lieber von Hand?</b> Öffne das Schreibblatt, sichere es als PDF und schreib mit dem Stift.</p>
    <div class="reihe"><button type="button" class="btn" data-schreibblatt>Schreibblatt für den Stift</button></div>
    <label class="haken"><input type="checkbox" data-hand ${S.sa.hand ? "checked" : ""}> Ich habe von Hand geschrieben.</label>
    <div class="reihe"><button type="button" class="btn dunkel" data-krit ${fertig ? "" : "disabled"} aria-expanded="${!!(S.sa.krit && fertig)}">Kriterien zum Abgleich</button></div>
    <p class="hinweis" id="krit-hinweis">${fertig ? "" : `Die Kriterien öffnen sich nach deinem Text: ab etwa ${c.min || 60} Wörtern oder wenn du von Hand geschrieben hast.`}</p>`;
  return `<p class="ab-unter">${c.vor || "So kann die Aufgabe in der Klassenarbeit stehen. Dort gibt es dafür etwa 10 Punkte und höchstens eine Seite."}</p>
  <blockquote class="ka-aufgabe">${c.aufgabe}</blockquote>
  ${c.material ? `<div class="ab-zwei gleich"><div class="ka-material"><p class="kennung">Material</p>${c.material}</div><div>${schreibteil}${handteil}</div></div>` : `<div class="ab-zwei"><div>${schreibteil}</div><div>${handteil}</div></div>`}
  <div id="krit" ${S.sa.krit && fertig ? "" : "hidden"}><h2 class="abschnitt">Kriterien zum Abgleich</h2>
    <p class="hinweis">Lies deinen Text noch einmal. Wo stehst du? Die Seite vergibt keine Punkte.</p>${kaRaster()}
    <div class="ka-inhalt"><p><b>${esc(c.inhaltKopf || "Das kann in deinem Text stehen")}</b></p>${c.inhalt.map(([a, b]) => `<p><b>${esc(a)}</b> ${esc(b)}</p>`).join("")}</div></div>
  <div id="schreibblatt" aria-hidden="true"><p class="zeit"><span class="nr">${esc(L.nr)} · Schreibblatt</span><span>Name: ______________ · Datum: __________</span></p>
    <h2>Schreibauftrag wie in der Klassenarbeit</h2><blockquote class="ka-aufgabe">${c.aufgabe}</blockquote>${c.material ? `<div class="ka-material">${c.material}</div>` : ""}
    <p><b>Erst gliedern.</b> Drei Stichpunkte:</p><div class="gl3"><div class="linien"></div><div class="linien"></div><div class="linien"></div></div>
    <p style="margin-top:5mm"><b>Mein Text</b> (etwa eine halbe Seite)</p>${'<div class="linien"></div>'.repeat(c.material ? 14 : 20)}</div>`;
}
function schreibStand(){
  const z = document.getElementById("sa-zahl"); if (!z) return;
  const c = L.schreib, f = schreibFertig(), k = document.querySelector("[data-krit]"), h = document.getElementById("krit-hinweis");
  z.textContent = woerter(S.sa.text) + " von etwa " + (c.woerter || 130) + " Wörtern"; if (k) k.disabled = !f;
  if (h) h.textContent = f ? "" : `Die Kriterien öffnen sich nach deinem Text: ab etwa ${c.min || 60} Wörtern oder wenn du von Hand geschrieben hast.`;
  if (!f) { const kr = document.getElementById("krit"); if (kr) kr.hidden = true; }
}

/* ---------- Zusammenfassung: höchstens zwei Seiten A4 in zwei Teilen ----------
   L.zf = { frage, kern, begriffe:[[Begriff,Erklärung]], abfolge:{ titel, punkte:[[Datum,Text]] }, zahlen:[[Zahl,Text]] (optional),
            lk:{ name, satz, beispiel }, werkzeug:{ titel, schritte:[3] }, sonst:"…", mein:[[Titel, Pfad|Funktion]] } */
function zusammen(){
  const c = L.zf, s = L.schreib, m = (t, leer = "noch offen") => `<p class="mein ${String(t || "").trim() ? "" : "leer"}">${esc(String(t || "").trim() || leer)}</p>`;
  const meinText = S.sa.text.trim() ? S.sa.text : (S.sa.hand ? "Von Hand geschrieben – siehe Schreibblatt." : "");
  return `<div class="zf zf2"><div class="reihe nodruck" style="margin:0 0 1rem"><button type="button" class="btn dunkel" data-drucken>Drucken oder als PDF sichern</button><span class="hinweis">Zwei Seiten A4. In GoodNotes ablegen.</span></div>
  <section class="zf-seite"><p class="zf-teil">${esc(L.nr)} · ${esc(L.titel)} · Seite 1</p><h1>Das musst du wissen</h1>
  <p class="leitfrage">${esc(c.frage)}</p><p class="merksatz">${esc(c.kern)}</p>
  <h2>Begriffe</h2><div class="begriffe">${c.begriffe.map(b => `<div><b>${esc(b[0])}:</b> ${esc(b[1])}</div>`).join("")}</div>
  <h2>${esc(c.abfolge.titel)}</h2><ol class="zl">${c.abfolge.punkte.map(z => `<li><b>${esc(z[0])}</b><span>${esc(z[1])}</span></li>`).join("")}</ol>
  ${c.zahlen ? `<h2>Daten und Zahlen</h2><ul class="zl">${c.zahlen.map(z => `<li><b>${esc(z[0])}</b><span>${esc(z[1])}</span></li>`).join("")}</ul>` : ""}</section>
  <section class="zf-seite seitenumbruch"><p class="zf-teil">${esc(L.nr)} · ${esc(L.titel)} · Seite 2</p><h1>Das musst du können</h1>
  <h2>Landkarte: ${esc(c.lk.name)}</h2><p>${esc(c.lk.satz)}</p><p><b>Beispiel aus der Stunde:</b> ${esc(c.lk.beispiel)}</p>
  <div class="werk"><b>Denkwerkzeug: ${esc(c.werkzeug.titel)}</b><ol>${c.werkzeug.schritte.map(x => `<li>${esc(x)}</li>`).join("")}</ol></div>
  <h2>So wird gefragt</h2><blockquote class="ka-aufgabe klein">${s.aufgabe}</blockquote>
  <h2>Mein Text</h2>${m(meinText, "noch offen – Schreibauftrag")}
  ${kaRaster()}
  ${(c.mein || []).length ? `<h2>Meine Ergebnisse</h2>${c.mein.map(x => `<div class="karte"><b>${esc(x[0])}</b>${m(typeof x[1] === "function" ? x[1]() : hol(x[1]))}</div>`).join("")}` : ""}
  ${c.sonst ? `<p class="zf-sonst"><b>Was sonst Thema war:</b> ${esc(c.sonst)}</p>` : ""}</section></div>`;
}

/* ---------- Aktionen des Rahmens ---------- */
AKTION.wk = t => { if (!S.wk) S.wk = {}; S.wk[t.dataset.p] = t.dataset.w; speichere(); zeichneBehalte(); const k = document.getElementById("wk-" + t.dataset.p); if (k) { k.focus({ preventScroll:true }); const r = k.getBoundingClientRect(); if (r.top < 70 || r.top > innerHeight * .6) window.scrollBy({ top:r.top - 90, behavior: ruhig() ? "auto" : "smooth" }); } };
AKTION.skala = t => { setz(t.dataset.p, +t.dataset.w); zeichneBehalte(); };
AKTION.abrufauf = t => { setz(`${t.dataset.p}.auf.${t.dataset.w}`, true); zeichneBehalte(); };
window.addEventListener("afterprint", () => document.body.classList.remove("druck-sb"));
let BREIT_ALT = null;
window.addEventListener("resize", () => { if (!BLATT()) return; const q = QUER(); if (q !== BREIT_ALT) { BREIT_ALT = q; const a = document.activeElement; if (!a || !/^(TEXTAREA|INPUT|SELECT)$/.test(a.tagName)) zeichneBehalte(); } });
