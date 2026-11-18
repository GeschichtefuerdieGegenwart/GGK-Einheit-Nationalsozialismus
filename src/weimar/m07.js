/* ===== M7 · Der Versailler Vertrag aus „deutscher“ Perspektive – und als globalhistorisches Ereignis (Heft „Geschichte aktuell 1“, M7 mit Extraaufgabe) ===== */
const L = {
  wid:"m07", key:"ggk-w-m07:v1", nr:"M7", titel:"Der Versailler Vertrag aus „deutscher“ Perspektive", unter:"… und was diese Geschichte nicht erzählt", dauer:90, block:"c",
  /* Zeichen der Stunde: ein Blatt mit Siegel */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><path d="M9 4h12l6 6v20H9z" fill="none" stroke="#24221F" stroke-width="2.4" stroke-linejoin="round"/><path d="M13 13h8M13 18h10" stroke="#24221F" stroke-width="2"/><circle cx="20" cy="25" r="3.2" fill="#9B402D"/></svg>`,
  frage:"Was erzählt eine Geschichte des Versailler Vertrags, die nur auf Deutschland schaut – und was lässt sie weg?",
  blick:{ name:"Nationalgeschichte – und ihr Gegenstück, die Globalgeschichte", anker:"2-3-4", tut:"Du erzählst den Versailler Vertrag erst aus deutscher Sicht und dann mit dem Blick über die Grenzen hinweg.", fehlt:"Was fehlt: Auch der globale Blick lässt etwas weg – die Erfahrungen einzelner Menschen und die Frage, wie der Vertrag in den Köpfen weiterwirkt. Das untersuchst du in M8." },
  deck:{ dauer:"Doppelstunde · 90 Minuten", jahr:"28.6.1919", hier:[2],
    satz:"In Deutschland heißt der Vertrag bald „Diktatfrieden“. Für viele Völker in Osteuropa und im Nahen Osten bedeutet dieselbe Friedensordnung etwas ganz anderes.",
    ziele:["die wichtigsten Bestimmungen des Versailler Vertrags für Deutschland nennen und erklären, warum er auf Ablehnung stieß,", "Folgen der Pariser Friedensordnung außerhalb Deutschlands darstellen,", "Nationalgeschichte und Globalgeschichte unterscheiden und zeigen, wie die Form der Erzählung das Urteil verändert."] },
  blatt:[
    { id:"erinnern", nr:"1", kurz:"Erst erinnern", name:"Erst erinnern: Paris 1919", form:"Allein · ohne Heft", min:3, frei:"offen" },
    { id:"deutsch", nr:"2", kurz:"„Deutsche“ Sicht", name:"Der Vertrag aus „deutscher“ Perspektive", form:"Zu zweit", min:15, frei:"offen" },
    { id:"global", nr:"3", kurz:"Globale Sicht", name:"Der Vertrag als globalhistorisches Ereignis", form:"Allein · Film", min:45, frei:"ansage", gleich:"Ein Film zeigt, was dieselbe Friedensordnung außerhalb Deutschlands bedeutete. Vorher hältst du fest, wie bedeutsam dir der Vertrag aus deutscher Sicht erscheint." },
    { id:"vergleich", nr:"4", kurz:"Zwei Geschichten", name:"Zwei Geschichten gegenüberstellen", form:"Allein, dann Plenum", min:8, frei:"antwort", nach:"global", fehlt:"Bearbeite erst Auftrag 3." },
    { id:"landkarte", nr:"L", kurz:"Landkarte", name:"Landkarte: Welche Form von Geschichte ist das?", form:"Allein", min:6, frei:"antwort", nach:"deutsch", fehlt:"Bearbeite erst Auftrag 2." },
    { id:"schreiben", nr:"5", kurz:"Schreibauftrag", name:"Schreibauftrag", form:"Allein", min:15, frei:"ansage", marke:"wie in der Klassenarbeit", gleich:"Du stellst die deutsche Sicht dar und erläuterst, warum sie zu kurz greift." },
    { id:"zusammenfassung", nr:"Z", kurz:"Zusammenfassung", name:"Zusammenfassung", form:"Zum Abheften", min:4, frei:"antwort", nach:"schreiben", fehlt:"Die Zusammenfassung öffnet sich nach deinem Text in Auftrag 5.", kopf:"Zum Abheften" },
  ],
  breit:["lehrkraft"],
  loesch:"Deine Notizen, deine beiden Einschätzungen, deine Tabelle, dein Text und dein Satz für den roten Faden werden auf diesem Gerät entfernt.",
  init:() => ({ ab:{}, inhalt:"", bed1:null, fehlt:"", wf:{}, land:null, osten:"", t:{}, bed2:null, wandel:"" }),
  erledigt:{
    erinnern:() => [0,1,2].every(i => (S.ab.auf || {})[i]), deutsch:() => lang("inhalt", 20) && S.bed1 != null,
    global:() => wfFertig("wf", 3) && !!S.land && lang("osten"), vergleich:() => tabelleVoll("t", 2, 2, 5) && S.bed2 != null && lang("wandel"),
    landkarte:() => !!S.lk.ok, schreiben:() => schreibFertig(),
  },
  fadenAnf:["Ob Versailles ein gerechter Frieden war, hängt davon ab,", "Aus deutscher Sicht …, aus globaler Sicht …"],
};
/* Fünf Punkte nach dem Text des Hefts (M7). Berichtigt: Das Saargebiet wurde nicht abgetreten, sondern für 15 Jahre dem Völkerbund unterstellt. */
const FELDER = [
  { id:"diktat", titel:"„Diktatfrieden“", kurz:"ohne Verhandlung", text:["Der Vertrag wurde in Deutschland oft als „Diktatfrieden“ bezeichnet: Die deutsche Delegation war von den Verhandlungen ausgeschlossen und musste den Vertrag annehmen, ohne ihn mitgestalten zu können."] },
  { id:"gebiet", titel:"Gebietsverluste und Reparationen", kurz:"Land und Geld", text:["Deutschland verlor erhebliche Gebiete, darunter Elsass-Lothringen und große Teile Westpreußens. Das Saargebiet kam für 15 Jahre unter die Verwaltung des Völkerbunds.", "Dazu kamen hohe Reparationen: Zahlungen für die Schäden des Krieges. Sie belasteten die deutsche Wirtschaft stark. Begründet wurden sie mit Artikel 231 des Vertrags, der sogenannten Kriegsschuldklausel: Er machte Deutschland und seine Verbündeten für den Krieg verantwortlich."] },
  { id:"militaer", titel:"Militärische Einschränkungen", kurz:"100.000 Mann", text:["Der Vertrag beschränkte die deutsche Armee auf 100.000 Mann und verbot schwere Waffen und Flugzeuge. Viele empfanden das als Bedrohung der nationalen Sicherheit."] },
  { id:"politik", titel:"Politische Reaktionen", kurz:"Schuld bei der Republik?", text:["Politisch schwächte der Vertrag die Weimarer Republik. Viele Deutsche gaben der neuen demokratischen Regierung die Schuld an den Bedingungen, die sie als demütigend empfanden. Das stärkte extremistische Kräfte."], q:"Das Heft nennt als Quelle: Detlev Peukert, „Die Weimarer Republik“ (ohne Seitenangabe)." },
  { id:"meinung", titel:"Öffentliche Meinung", kurz:"Empörung", text:["In der deutschen Öffentlichkeit herrschte weit verbreitete Empörung. Es gab häufig Demonstrationen und Proteste. Der Vertrag galt als Zeichen nationaler Schande; viele fühlten sich ungerecht behandelt und gedemütigt."] },
];
const FILM7 = "https://www.zdf.de/dokumentation/zdfinfo-doku/der-vergiftete-frieden--versailles-und-europa-100.html";
const AUSSAGEN7 = [
  ["Die USA stiegen nach dem Ersten Weltkrieg zur Supermacht auf.", null, "Wirtschaftlich ja: Die USA waren nach dem Krieg die stärkste Wirtschaftsmacht und der größte Geldgeber Europas. Politisch zogen sie sich aber zurück – dem Völkerbund traten sie nicht bei. Prüfe am Film, was er mit „Supermacht“ meint.", "Politisch zogen sich die USA tatsächlich zurück: Dem Völkerbund traten sie nicht bei. Wirtschaftlich waren sie nach dem Krieg aber die stärkste Macht und der größte Geldgeber Europas. Prüfe am Film, was er mit „Supermacht“ meint."],
  ["Die Ukraine wurde nach dem Krieg ein unabhängiger Staat.", false, "Nicht auf Dauer: Die Ukraine erklärte sich zwar für unabhängig. Nach mehreren Kriegen wurde ihr Gebiet aber aufgeteilt, vor allem zwischen Sowjetrussland und Polen.", "Die Ukraine erklärte sich zwar für unabhängig, konnte das aber nicht behaupten: Nach mehreren Kriegen wurde ihr Gebiet aufgeteilt, vor allem zwischen Sowjetrussland und Polen."],
  ["Der amerikanische Präsident Wilson entwickelte einen 14-Punkte-Plan für den Frieden.", true, "Im Januar 1918 stellte Wilson seine 14 Punkte vor (M6).", "Doch: Im Januar 1918 stellte Wilson seine 14 Punkte vor (M6)."],
];

function start(){ return deckblatt(); }
function erinnern(){
  return `${auftrag("Allein · 3 Minuten · ohne Heft", "Erst erinnern", "Beantworte aus dem Kopf, ein Stichwort genügt. Dann deckst du auf.")}
  ${abrufen("ab", [
    ["Was meint „Selbstbestimmungsrecht der Völker“ (M6)?", "Völker sollen selbst bestimmen, zu welchem Staat sie gehören."],
    ["Warum ließ es sich 1919 nur teilweise verwirklichen?", "In vielen Gebieten lebten mehrere Nationalitäten gemischt; jede Grenze schuf neue Minderheiten. Außerdem hatten die Interessen der Siegermächte Vorrang."],
    ["Wann und wo wurde der Friedensvertrag mit Deutschland unterzeichnet?", "Am 28. Juni 1919 im Schloss von Versailles bei Paris."],
  ])}`;
}
function deutsch(){
  return `${auftrag("Zu zweit · 15 Minuten", "Der Vertrag aus „deutscher“ Perspektive", "Seht euch die fünf Punkte genau an. Stellt euch vor, das wären die einzigen Informationen, die ihr im Unterricht über den Versailler Vertrag bekommt. Haltet die Inhalte in Stichpunkten fest und schätzt ein: Wie bedeutsam erscheint der Vertrag, wenn man nur das weiß?")}
  <p class="lead">In Deutschland stieß der Versailler Vertrag auf breite Ablehnung und wurde als demütigend empfunden. Die Reaktionen waren von Empörung, Wut und Enttäuschung geprägt.</p>
  ${wahlKarte("feld", FELDER.map((f, i) => ({ id:f.id, nr:String(i + 1), titel:f.titel, unter:f.kurz, html:`<h3>${esc(f.titel)}</h3>${f.text.map(t => `<p>${esc(t)}</p>`).join("")}<p class="quelle">Nach dem Text des Unterrichtsheftes, M7. ${f.q || ""}</p>` })), { titel:"Punkt wählen" })}
  <div class="ab-zwei gleich" style="margin-top:1.2rem"><div>${textfeld("inhalt", "Inhalte dieser Geschichte (deutsche Perspektive) in Stichpunkten", { rows:5, zaehl:false })}</div>
  <div>${skala("bed1", "Wie bedeutsam erscheint der Vertrag, wenn du nur diese Geschichte kennst?", 5, "1 = kaum bedeutsam", "5 = sehr bedeutsam")}
  ${textfeld("fehlt", "Vermute: Was erzählt diese Geschichte nicht?", { rows:2, zaehl:false, anfaenge:["Nicht erzählt wird, wie", "Es fehlen die Menschen in"] })}</div></div>`;
}
function global(){
  const fertig = wfFertig("wf", 3);
  return `${auftrag("Allein · 45 Minuten (Film und Notizen)", "Der Vertrag als globalhistorisches Ereignis", "Nach dem Ende des Ersten Weltkriegs hofften viele Völker auf Freiheit und Eigenständigkeit, die bis dahin von Russland, Deutschland und Österreich-Ungarn beherrscht worden waren. Sieh dir den Film an. Arbeite heraus, welche Folgen die Friedensordnung von 1919 außerhalb Deutschlands hatte.")}
  ${filmKarte({ art:"Dokumentation", dauer:"etwa 45 Minuten", titel:"Der vergiftete Frieden: Versailles und Europa", text:"Folge 1 einer zweiteiligen Dokumentation. Der Film ist eine Darstellung von heute: Er wählt aus und deutet.", nachweis:"ZDFinfo; Link aus dem Unterrichtsheft, M7 (Extraaufgabe).", url:FILM7, wo:"zdf.de" })}
  <h3 class="klein">Nach dem Film</h3>
  ${wahrFalsch("wf", AUSSAGEN7)}
  <div class="${fertig ? "" : "gesperrt"}"><h3 class="klein">Welches Land wurde nach dem Ersten Weltkrieg zwischen Russland und Polen aufgeteilt?</h3>
  <div class="w-milieus" role="group" aria-label="Land wählen">${[["fin","Finnland"],["ukr","Ukraine"],["cs","Tschechoslowakei"]].map(x => `<button type="button" data-akt="setz" data-p="land" data-w="${x[0]}" aria-pressed="${S.land === x[0]}"><b>${x[1]}</b></button>`).join("")}</div>
  <div aria-live="polite">${S.land === "ukr" ? `<div class="rm zentral"><b>Stimmt.</b> Den Westen erhielt Polen, der größere Teil wurde eine Sowjetrepublik.</div>` : S.land === "fin" ? `<div class="rm kaum"><b>Noch nicht.</b> Finnland wurde von Russland unabhängig und blieb es.</div>` : S.land === "cs" ? `<div class="rm kaum"><b>Noch nicht.</b> Die Tschechoslowakei entstand 1918 als neuer Staat aus Gebieten Österreich-Ungarns.</div>` : ""}</div>
  ${textfeld("osten", "Folgen der Friedensordnung im Osten Europas und darüber hinaus", { rows:4, zaehl:false, anfaenge:["Neue Staaten entstanden:", "Zu Minderheiten wurden", "Im Nahen Osten"] })}
  ${vergleich("ovgl", ["osten"], 15, "Mit Stichpunkten vergleichen", `<div class="w-karten k3"><article class="w-kk"><h3>Reiche zerfallen</h3><ul><li>Österreich-Ungarn zerfällt 1918. Die Verträge von Saint-Germain und Trianon regeln die Nachfolge: Österreich, Ungarn, die Tschechoslowakei, das Königreich der Serben, Kroaten und Slowenen.</li><li>Das Osmanische Reich wird aufgeteilt; im Nahen Osten entstehen Mandatsgebiete.</li></ul></article><article class="w-kk blau"><h3>Neue Staaten</h3><ul><li>Polen wird wieder ein Staat – aus Gebieten Deutschlands, Österreich-Ungarns und Russlands.</li><li>Finnland, Estland, Lettland und Litauen werden von Russland unabhängig.</li></ul></article><article class="w-kk rot"><h3>Neue Probleme</h3><ul><li>Minderheiten in fast allen neuen Staaten.</li><li>Mandate: Frühere Kolonien und Gebiete der Verlierer kommen unter die Verwaltung der Sieger.</li><li>Wirtschaftlich und politisch schwache junge Staaten.</li></ul></article></div><p class="quelle">Stichpunkte nach dem Erwartungshorizont des Unterrichtsheftes, M7; dort berichtigt: Österreich-Ungarn wurde nicht durch den Versailler Vertrag aufgelöst. Prüfe am Film.</p>`)}</div>`;
}
function vergleichS(){
  return `${auftrag("Allein · 5 Minuten, dann Plenum · 3 Minuten", "Zwei Geschichten gegenüberstellen", "Du kennst jetzt zwei Geschichten über dieselbe Friedensordnung. Stell die inhaltlichen Unterschiede gegenüber. Schätze dann noch einmal ein, wie bedeutsam der Vertrag ist – und erkläre, was sich verändert hat.")}
  ${tabelle("t", ["", "Geschichte aus „deutscher“ Perspektive (Auftrag 2)", "Globale Geschichte (Auftrag 3)"], ["Wovon wird erzählt?", "Wer kommt vor – wer nicht?"], { rows:3 })}
  <div class="ab-zwei gleich" style="margin-top:1rem"><div>${skala("bed2", "Wie bedeutsam erscheint dir der Vertrag jetzt?", 5, "1 = kaum bedeutsam", "5 = sehr bedeutsam")}
  <p class="hinweis">Deine erste Einschätzung in Auftrag 2: ${S.bed1 == null ? "noch offen" : S.bed1 + " von 5"}.</p></div>
  <div>${textfeld("wandel", "Wie hat sich meine Einschätzung verändert – und warum?", { rows:3, zaehl:false, anfaenge:["Vorher dachte ich, der Vertrag", "Jetzt sehe ich, dass"] })}</div></div>`;
}
function seiteLk(){
  return landkarteL({ teil:"formen", frage:"Auftrag 2 erzählt den Versailler Vertrag aus „deutscher“ Perspektive. Welche Form von Geschichte ist das – und welche Aussagen legt sie nahe?",
    heft:"Was für eine Geschichte (Form der Geschichtsschreibung) wird hier beschrieben? Welche Aussagen ziehen Sie aus der Darstellung?",
    lead:"Sieh dir deine Stichpunkte aus Auftrag 2 an. Wer steht im Mittelpunkt dieser Geschichte, wer kommt nicht vor?", platz:"Im Mittelpunkt steht …; nicht erzählt wird …",
    urteil:{
      "2-3-2":["zentral","Die fünf Punkte stellen die Geschichte eines Landes in den Mittelpunkt: Verluste, Lasten und Empörung der Deutschen. Das ist Nationalgeschichte. Sie legt nahe, den Vertrag vor allem als Unrecht an Deutschland zu sehen."],
      "2-3-4":["teils","Das ist die Form der Dokumentation in Auftrag 3: Sie blickt über Grenzen hinweg. Gefragt war die Form von Auftrag 2."],
      "2-3-8":["teils","Der Vertrag ist ein Ereignis mit Folgen – das stimmt. Entscheidend ist hier aber, aus wessen Sicht das Ereignis erzählt wird."],
      "2-3-9":["kaum","Um Symbole, Rituale oder Kunst geht es in den fünf Punkten kaum. Die „öffentliche Meinung“ ist hier Teil der nationalen Erzählung."],
    },
    bruecke:`<b>Merke:</b> Nationalgeschichte ist nicht falsch, aber sie wählt aus. Die Globalgeschichte fragt, was dieselbe Friedensordnung für Polen, die Ukraine oder den Nahen Osten bedeutete.` });
}
L.schreib = {
  vor:"So kann die Aufgabe in der Klassenarbeit stehen: Material, zwei Operatoren, höchstens eine Seite. Hier schreibst du eine halbe Seite.",
  aufgabe:`<b>a) Stellen Sie dar</b>, wie der Versailler Vertrag in Deutschland aufgenommen wurde.<br><b>b) Erläutern Sie</b> mithilfe der Begriffe Nationalgeschichte und Globalgeschichte, warum eine Darstellung nur aus deutscher Perspektive zu kurz greift.`,
  material:`<p><b>M1 · Aus deutscher Perspektive:</b> „Diktatfrieden“ ohne Verhandlung · Gebietsverluste · Reparationen, begründet mit Artikel 231 (Kriegsschuldklausel) · Armee auf 100.000 Mann begrenzt · Empörung und Proteste.</p><p><b>M2 · Außerhalb Deutschlands:</b> Polen wird wieder ein Staat · Finnland und die baltischen Staaten werden unabhängig · die Ukraine wird aufgeteilt · Minderheiten in fast allen neuen Staaten · Mandatsgebiete im Nahen Osten.</p><p class="quelle">Zusammenstellung aus den Aufträgen 2 und 3.</p>`,
  woerter:140, min:60,
  stufen:[["Grundlegend","Du nennst Bestimmungen des Vertrags und die Ablehnung in Deutschland. Die beiden Begriffe kommen vor, bleiben aber unerklärt."],["Sicher","Du stellst die deutsche Aufnahme geordnet dar und erklärst an einem Beispiel aus M2, was die nationale Sicht nicht zeigt."],["Souverän","Du erläuterst mit beiden Begriffen, dass die Form der Erzählung das Urteil lenkt, und zeigst an Beispielen, wie sich die Bedeutung des Vertrags im globalen Blick verändert."]],
  inhalt:[["Aufnahme in Deutschland:","„Diktatfrieden“; Gebietsverluste; Reparationen und Artikel 231; Begrenzung der Armee; Empörung; die Republik wird für den Vertrag verantwortlich gemacht."],
    ["Nationalgeschichte:","stellt die Geschichte eines Landes in den Mittelpunkt – hier Verluste und Demütigung Deutschlands."],
    ["Globalgeschichte:","untersucht Prozesse über Grenzen hinweg – neue Staaten, Minderheiten, Mandate, die geteilte Ukraine."],
    ["Zu kurz, weil:","die Hoffnungen und Folgen für andere Völker fehlen; der Vertrag erscheint nur als Unrecht an Deutschland."]],
};
L.zf = {
  frage:L.frage,
  kern:"In Deutschland wurde der Versailler Vertrag als „Diktatfrieden“ abgelehnt; viele machten die Republik dafür verantwortlich. Dieselbe Friedensordnung ließ in Osteuropa neue Staaten entstehen und schuf neue Minderheiten. Welche Bedeutung der Vertrag hat, hängt davon ab, wessen Geschichte erzählt wird.",
  begriffe:[["Versailler Vertrag","Friedensvertrag der Sieger mit Deutschland, unterzeichnet am 28. Juni 1919."],["„Diktatfrieden“","deutsche Bezeichnung für den Vertrag: Er musste ohne Verhandlung angenommen werden."],["Reparationen","Zahlungen des Verlierers für die Schäden des Krieges."],["Artikel 231 (Kriegsschuldklausel)","macht Deutschland und seine Verbündeten für den Krieg verantwortlich; begründet die Reparationen."],["Mandat","Gebiet, das der Völkerbund einer Siegermacht zur Verwaltung übertrug."],["Minderheit","Gruppe, die in einem Staat lebt, dessen Mehrheit eine andere Sprache oder Herkunft hat."]],
  abfolge:{ titel:"Was der Vertrag für Deutschland bestimmte", punkte:[["Gebiete","Elsass-Lothringen an Frankreich; große Teile Westpreußens und Posen an Polen; das Saargebiet 15 Jahre unter Verwaltung des Völkerbunds; alle Kolonien."],["Militär","Armee höchstens 100.000 Mann; keine schweren Waffen, keine Flugzeuge."],["Artikel 231","Deutschland und seine Verbündeten gelten als verantwortlich für den Krieg."],["Reparationen","hohe Zahlungen an die Sieger."],["Folgen","Empörung; die Republik wird für den Vertrag verantwortlich gemacht; extremistische Kräfte gewinnen."]] },
  lk:{ name:"Nationalgeschichte und Globalgeschichte", satz:"Nationalgeschichte stellt die Geschichte eines Landes oder einer Nation in den Mittelpunkt. Globalgeschichte untersucht Prozesse, die über nationale Grenzen hinausgehen.", beispiel:"„Diktatfrieden“ ist die nationale Erzählung. Die geteilte Ukraine und die neuen Staaten Osteuropas erzählt erst die globale." },
  werkzeug:{ titel:"Fragen, was eine Geschichte weglässt", schritte:["Wer steht im Mittelpunkt dieser Geschichte – und wer kommt nicht vor?","Eine zweite Geschichte desselben Ereignisses danebenlegen.","Vergleichen: Wie verändert sich mein Urteil über die Bedeutung des Ereignisses?"] },
  sonst:"der Film „Der vergiftete Frieden“ (Auftrag 3), deine zwei Einschätzungen der Bedeutung (Aufträge 2 und 4).",
  mein:[["Bedeutung des Vertrags: vorher und nachher", () => S.bed1 == null ? "" : `Aus deutscher Sicht: ${S.bed1} von 5. Danach: ${S.bed2 == null ? "offen" : S.bed2 + " von 5"}. ${S.wandel}`]],
};
function zusammenfassung(){ return fadenFeld() + zusammen(); }
const SEITE_FN = { start, erinnern, deutsch, global, vergleich:vergleichS, landkarte:seiteLk, schreiben:schreibauftrag, zusammenfassung, lehrkraft };
weimarStart();
