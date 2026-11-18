/* ===== M11 · Das Krisenjahr 1923 und seine Konsequenzen (Heft „Geschichte aktuell 1“, M11 mit Erwartungshorizont) ===== */
const L = {
  wid:"m11", key:"ggk-w-m11:v1", nr:"M11", titel:"Das Krisenjahr 1923 und seine Konsequenzen", unter:"Vier Krisen, ein Jahr – und die Frage, was daraus folgt", dauer:180, block:"d",
  /* Zeichen der Stunde: ein Geldschein, der zerfällt */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><path d="M4 9h17l-3 6 4 4-3 6H4z" fill="none" stroke="#24221F" stroke-width="2.4" stroke-linejoin="round"/><circle cx="11" cy="17" r="3.4" fill="#E0B74A" stroke="#24221F" stroke-width="1.6"/><path d="M25 10l4 3M24 17h6M25 24l4-3" stroke="#9B402D" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  frage:"Viele Krisen zugleich: Wie verhalten sich Menschen – und übersteht die Republik das Jahr 1923 gestärkt oder geschwächt?",
  blick:{ name:"Vergleich: Muster im Verhalten von Menschen", anker:"1-2", tut:"Du untersuchst vier Krisen nebeneinander und fragst: Wie verhalten sich Menschen, wenn alles unsicher wird?", fehlt:"Was fehlt: das Einmalige. Wer nach Mustern sucht, übersieht leicht, was nur 1923 so war – und was heute anders ist." },
  pole:{ frage:"Eine junge Demokratie gerät in mehrere Krisen zugleich und übersteht sie. Wie geht sie daraus hervor?", links:"geschwächt", rechts:"gestärkt" },
  deck:{ dauer:"Zwei Doppelstunden · 2 × 90 Minuten", jahr:"1923", hier:[4],
    satz:"Besetzung, Geldentwertung, Aufstände, ein Putsch: 1923 trifft alles zugleich auf die junge Republik. Ihr untersucht, wie Menschen darauf antworten.",
    ziele:["die Krisen des Jahres 1923 darstellen und erklären, wie sie zusammenhängen,", "beschreiben, wie sich Menschen in den Krisen verhalten, und den Einfluss der Krisen auf ihr Leben bewerten,", "untersuchen, wie sich das Krisenjahr auf die Wahl von 1924 auswirkt."] },
  blatt:[
    { id:"vorher", nr:"1", kurz:"Erst vermuten", name:"Erst erinnern und vermuten", form:"Allein · ohne Heft", min:5, frei:"offen" },
    { id:"krise", nr:"2", kurz:"Eure Krise", name:"Eure Krise: ein Legetechnikvideo", form:"Gruppe", min:45, frei:"offen" },
    { id:"kino", nr:"3", kurz:"Vier Krisen", name:"Vier Krisen ansehen und bewerten", form:"Plenum, dann allein", min:25, frei:"ansage", gleich:"Ihr seht euch die Videos aller Gruppen an. Danach bewertest du, wie stark jede Krise das Leben der Menschen trifft." },
    { id:"kette", nr:"4", kurz:"Zusammenhänge", name:"Wie hängen die Krisen zusammen?", form:"Zu zweit", min:15, frei:"antwort", nach:"kino", fehlt:"Bewerte erst die vier Krisen (Auftrag 3)." },
    { id:"plakat", nr:"5", kurz:"Wahlplakat", name:"Ein Wahlplakat für 1924", form:"Gruppe", min:30, frei:"ansage", gleich:"Zweite Doppelstunde: Ihr entwerft ein Wahlplakat und vergleicht es mit Plakaten der Zeit." },
    { id:"wahl", nr:"6", kurz:"Wahl 1924", name:"Was das Krisenjahr an der Wahlurne bewirkt", form:"Allein", min:12, frei:"antwort", nach:"kette", fehlt:"Bearbeite erst Auftrag 4." },
    { id:"landkarte", nr:"L", kurz:"Landkarte", name:"Landkarte: Wozu das Ganze?", form:"Allein", min:7, frei:"antwort", nach:"kino", fehlt:"Bearbeite erst Auftrag 3." },
    { id:"schreiben", nr:"7", kurz:"Schreibauftrag", name:"Schreibauftrag", form:"Allein", min:15, frei:"ansage", marke:"wie in der Klassenarbeit", gleich:"Du erläuterst den Zusammenhang der Krisen und urteilst, wie die Republik das Jahr übersteht." },
    { id:"zusammenfassung", nr:"Z", kurz:"Zusammenfassung", name:"Zusammenfassung", form:"Zum Abheften", min:4, frei:"antwort", nach:"schreiben", fehlt:"Die Zusammenfassung öffnet sich nach deinem Text in Auftrag 7.", kopf:"Zum Abheften" },
  ],
  breit:["lehrkraft"],
  loesch:"Eure Planung, deine Bewertungen, deine Notizen, dein Eintrag ins kollektive Gedächtnis, dein Text und dein Satz für den roten Faden werden auf diesem Gerät entfernt.",
  init:() => ({ ab:{}, schuld:"", gruppe:null, sz:{}, b:{}, bgrund:"", v:{}, heute1:"", heute2:"", p:{}, punter:"", wv:"", gew:"", verl:"" }),
  erledigt:{
    vorher:() => [0,1].every(i => (S.ab.auf || {})[i]) && lang("schuld", 15), krise:() => !!S.gruppe && [0,1,2,3].filter(r => lang(`sz.${r}.0`, 10)).length >= 3,
    kino:() => KRISEN.every(k => (S.b || {})[k.id] != null) && lang("bgrund", 20), kette:() => [0,1,2].filter(r => lang(`v.${r}.0`, 10)).length >= 2,
    plakat:() => [0,1,2].every(r => lang(`p.${r}.0`, 5)) && lang("punter", 15), wahl:() => lang("wv") && lang("gew", 5) && lang("verl", 5) && lang("kg", 15),
    landkarte:() => !!S.lk.ok, schreiben:() => schreibFertig(),
  },
  fadenAnf:["Wenn viele Krisen zugleich kommen, verteidigen Menschen die Demokratie schlechter, weil", "1923 zeigt:"],
};
/* Vier Gruppen nach dem Heft; Texte der Auflösung gekürzt nach dem Erwartungshorizont des Hefts (M11) */
const KRISEN = [
  { id:"ruhr", titel:"Ruhrkampf", kurz:"ab Januar 1923", ewh:"Deutschland war mit den Reparationen in Verzug. Im Januar 1923 marschierten französische und belgische Truppen ins Ruhrgebiet ein – das industrielle Herz Deutschlands. Die Regierung rief zum passiven Widerstand auf: Die Arbeiter legten die Arbeit nieder und erhielten ihren Lohn weiter vom Staat. Das war äußerst teuer." },
  { id:"infl", titel:"Hyperinflation und ihre Folgen", kurz:"1923", ewh:"Um den Streik zu bezahlen und Kriegsschulden zu tilgen, ließ die Regierung massenhaft Geld drucken. Die Preise stiegen täglich. Ersparnisse, Renten und Barvermögen wurden wertlos. Im November 1923 kam die Währungsreform: Eine Billion Papiermark entsprach einer Rentenmark. Zurück blieb tiefes Misstrauen gegenüber der demokratischen Regierung." },
  { id:"putsch", titel:"Hitler-Ludendorff-Putsch", kurz:"8./9. November 1923", ewh:"Am Abend des 8. November 1923 ließ Adolf Hitler den Münchner Bürgerbräukeller von SA-Männern umstellen, rief die „nationale Revolution“ aus und erklärte die Regierung in Berlin für abgesetzt. Der Marsch zur Feldherrnhalle am nächsten Tag wurde von der Polizei gestoppt. Hitler wurde verhaftet und zu einer milden Strafe verurteilt. Der Putsch scheiterte – aber der Prozess machte Hitler in ganz Deutschland bekannt." },
  { id:"terror", titel:"Terror von links und rechts", kurz:"Herbst 1923", ewh:"Im Oktober 1923 bildeten sich in Sachsen, Thüringen und Hamburg kommunistische „Proletarische Hundertschaften“, die eine Revolution nach sowjetischem Vorbild anstrebten. Die Aufstände wurden niedergeschlagen; es gab Tote und Verletzte. Im Rheinland versuchten Separatisten, eine eigene Republik auszurufen." },
];
const GRUPPEN = KRISEN.concat([{ id:"extra", titel:"Extrastation: Rassismus in der Weimarer Republik", kurz:"für Schnelle" }]);
const STRES = [["Ruhrbesetzung","Abbruch des passiven Widerstands (September 1923), Verständigung auf diplomatischem Weg"],["Hyperinflation","Einführung der Rentenmark (15. November 1923), Dawes-Plan (1924)"],["Aufstände von links","Einsatz der Reichswehr"],["Hitler-Putsch","Verhaftung und Verurteilung Hitlers"]];
const KETTE = [["Reparationen","Deutschland gerät mit den Zahlungen in Verzug.",""],["Ruhrbesetzung","Frankreich und Belgien besetzen das Ruhrgebiet.",""],["Passiver Widerstand","Der Staat bezahlt die Streikenden.",""],["Geld wird gedruckt","Die Notenpresse läuft ohne Halt.",""],["Hyperinflation","Erspartes wird wertlos, Vertrauen geht verloren.","rot"],["Extreme greifen an","Aufstände von links, Putsch von rechts.","rot"]];
const ARCHIV = "https://www.wahlplakate-archiv.de/parteien/nsdap/";

function start(){ return deckblatt(); }
function vorher(){
  return `${auftrag("Allein · 4 Minuten · ohne Heft", "Erst erinnern, dann vermuten", "Beantworte die zwei Fragen aus dem Kopf und deck dann auf. Stell dir danach vor: Alles, was deine Familie gespart hat, ist in wenigen Monaten nichts mehr wert. Wem gibst du die Schuld?")}
  ${abrufen("ab", [
    ["Was sind Reparationen (M7)?", "Zahlungen des Verlierers für die Schäden des Krieges. Der Versailler Vertrag verpflichtete Deutschland dazu."],
    ["Wie stark waren SPD, Zentrum und DDP 1919 zusammen (M9)?", "Gut drei Viertel der Stimmen: 76,1 Prozent."],
  ])}
  ${textfeld("schuld", "Meine Vermutung: Wem geben Menschen in so einer Lage die Schuld – und warum?", { rows:3, zaehl:false, anfaenge:["Viele geben die Schuld", "weil"] })}`;
}
function krise(){
  const g = GRUPPEN.find(x => x.id === S.gruppe), pad = wLink("padlet1923");
  return `${auftrag("Gruppe · 45 Minuten", "Eure Krise", "Erstellt ein Legetechnikvideo zu eurer Krise. Haltet dabei fest, wie sich die Menschen in dieser Krise verhalten. Plant zuerst die vier Szenen, dann dreht ihr.")}
  <div class="w-milieus" style="grid-template-columns:repeat(5,minmax(0,1fr))" role="group" aria-label="Gruppe wählen">${GRUPPEN.map((x, i) => `<button type="button" data-akt="setz" data-p="gruppe" data-w="${x.id}" aria-pressed="${S.gruppe === x.id}"><b>${i < 4 ? i + 1 + " · " : ""}${esc(x.titel)}</b><small>${esc(x.kurz)}</small></button>`).join("")}</div>
  <div class="ab-zwei schmalrechts ${g ? "" : "gesperrt"}"><div>
  ${tabelle("sz", ["Szene", g ? "Unser Plan: " + g.titel : "Unser Plan"], ["1 · Was geschieht?", "2 · Warum geschieht es?", "3 · Wie verhalten sich die Menschen?", "4 · Was folgt daraus?"], { rows:2 })}</div>
  <div>${wissen("Material", `<p>Schulbuch und die Pinnwand eurer Lehrkraft.</p>${pad ? `<p><a class="btn dunkel" href="${esc(pad)}" target="_blank" rel="noopener">Pinnwand öffnen ↗</a></p>` : `<p class="hinweis">Den Link zur Pinnwand findest du im Moodle-Kurs oder im Heft (QR-Code bei M11).</p>`}`)}
  ${wissen("So gelingt das Legetechnikvideo", `<ul><li>Zeichnet oder schneidet Figuren und Schlagwörter aus.</li><li>Filmt von oben; eine Hand schiebt die Teile ins Bild.</li><li>Eine Person spricht den Text. Höchstens zwei Minuten.</li></ul>`)}</div></div>`;
}
function kino(){
  const alle = KRISEN.every(k => (S.b || {})[k.id] != null);
  return `${auftrag("Plenum · 15 Minuten, dann allein · 10 Minuten", "Vier Krisen bewerten", "Im Jahr 1923 trifft eine Vielzahl von Krisen auf die Bevölkerung. Seht euch eure Videos an. Bewerte dann für jede Krise ihren Einfluss auf das Leben der Menschen auf einer Skala von 1 bis 5 und begründe.")}
  <div class="w-vier">${KRISEN.map(k => skala("b." + k.id, k.titel, 5, "1 = kaum Einfluss", "5 = trifft alle")).join("")}</div>
  ${textfeld("bgrund", "Begründung für meine Bewertungen", { rows:4, zaehl:false, anfaenge:["Am stärksten trifft die Menschen", "weil", "Weniger stark wirkt"] })}
  ${vergleich("kvgl", ["bgrund"], 20, "Mit den Angaben des Hefts vergleichen", `<div class="w-karten k2">${KRISEN.map(k => `<article class="w-kk"><p class="kennung">${esc(k.kurz)}</p><h3>${esc(k.titel)}</h3><p>${esc(k.ewh)}</p></article>`).join("")}</div>
  <h3 class="klein">Bewältigung der Krisen unter Stresemann</h3><div class="matrix-wrap"><table><thead><tr><th scope="col">Krise</th><th scope="col">Maßnahme</th></tr></thead><tbody>${STRES.map(s => `<tr><th scope="row">${esc(s[0])}</th><td>${esc(s[1])}</td></tr>`).join("")}</tbody></table></div>
  <p>Reichskanzler Gustav Stresemann gilt als der entscheidende Krisenmanager des Jahres 1923.</p><p class="quelle">Gekürzt nach dem Erwartungshorizont des Unterrichtsheftes, M11.</p>`)}
  <p class="hinweis">${alle ? "" : "Noch nicht alle vier Krisen bewertet."}</p>`;
}
function kette(){
  return `${auftrag("Zu zweit · 15 Minuten", "Zusammenhänge", "Zeigt auf, welche Krisen miteinander zusammenhängen – und wie. Zieht mindestens zwei Verbindungen und belegt sie mit Argumenten. Vergleicht danach mit der Wirkungskette.")}
  ${tabelle("v", ["Verbindung", "Unser Argument"], ["Ruhrkampf → Hyperinflation", "Hyperinflation → Putsch und Aufstände", "Eine eigene Verbindung"], { rows:2, platz:["Die eine Krise führt zur anderen, weil …"] })}
  ${vergleich("kettevgl", ["v.0.0","v.1.0"], 10, "Mit der Wirkungskette vergleichen", `<ol class="w-kette">${KETTE.map(k => `<li class="${k[2]}"><b>${esc(k[0])}</b>${esc(k[1])}</li>`).join("")}</ol><p>Alle diese Krisen hingen eng zusammen: Kriegsfolgen, wirtschaftlicher Druck und politischer Extremismus von links wie rechts brachten die junge Demokratie an den Rand des Zusammenbruchs.</p><p class="quelle">Wirkungskette nach dem Erwartungshorizont des Unterrichtsheftes, M11. Ein Modell: Es zeigt die Hauptlinie, nicht alle Ursachen.</p>`)}
  <h3 class="klein">Und heute?</h3>
  <p class="lead">Auch heute erleben Menschen Krisen und steigende Preise, und Parteien an den Rändern gewinnen Stimmen. Wo siehst du Parallelen zu 1923 – und wo Unterschiede?</p>
  <div class="ab-zwei gleich"><div>${textfeld("heute1", "Parallelen", { rows:3, zaehl:false, anfaenge:["Ähnlich ist, dass"] })}</div><div>${textfeld("heute2", "Unterschiede", { rows:3, zaehl:false, anfaenge:["Anders ist heute, dass"] })}</div></div>`;
}
function plakat(){
  return `${auftrag("Gruppe · 30 Minuten", "Ein Wahlplakat", "Erstellt ein Wahlplakat, um eure Ansichten zu verbreiten. Welche Gruppen würdet ihr im Wahlkampf ansprechen – und warum? Mit welchen Themen? Plant hier, gestaltet dann auf dem Tablet (zum Beispiel mit einer Collagen-App) oder auf Papier.")}
  <div class="trift"><b>Die Grenze:</b> Euer Plakat wirbt mit Argumenten für eure Sicht. Es hetzt nicht gegen Menschen. Plakate von Parteien, die die Demokratie abschaffen wollen, untersuchen wir – wir machen sie nicht nach.</div>
  ${tabelle("p", ["", "Unser Plakat"], ["Wen sprechen wir an – und warum?", "Mit welchem Thema?", "Unser Satz und unser Bild"], { rows:2 })}
  <h3 class="klein">Vergleich mit Plakaten der Zeit</h3>
  ${belastend("Die Plakate im Archiv sind Propaganda der NSDAP. Sie hetzen und sie lügen. Ihr untersucht, wie sie gemacht sind. Ihr übernehmt nichts davon.")}
  ${filmKarte({ art:"Archiv", titel:"Wahlplakate der NSDAP", text:"Wählt ein Plakat aus den Jahren der Republik. Achtet auf Bild, Farbe, Schlagwort – und darauf, wer als Feind gezeigt wird.", nachweis:"Wahlplakate-Archiv; Link aus dem Unterrichtsheft, M11.", url:ARCHIV, wo:"wahlplakate-archiv.de", knopf:"Archiv öffnen" })}
  ${textfeld("punter", "Unterschiede zwischen unserem Plakat und dem Plakat der Zeit", { rows:3, zaehl:false, anfaenge:["Unser Plakat wirbt mit", "Das Plakat der Zeit dagegen", "Als Feind zeigt es"] })}`;
}
function wahl(){
  const da = lang("wv");
  return `${auftrag("Allein · 12 Minuten", "Die Wahl vom Mai 1924", "Untersuche, welchen Einfluss das Krisenjahr 1923 auf die nächste Wahl hatte. Vermute zuerst. Vergleiche dann die Wahl von 1920 mit der Wahl vom Mai 1924: Welche Parteien haben profitiert, welche verloren?")}
  ${textfeld("wv", "Meine Vermutung: Wer gewinnt nach dem Krisenjahr, wer verliert?", { rows:2, zaehl:false, anfaenge:["Gewinnen werden", "Verlieren werden"] })}
  <div class="${da ? "" : "gesperrt"}"><div class="ab-zwei gleich">
  <div>${halbrund("Reichstagswahl · 6. Juni 1920 · Stimmen in Prozent", wahlWerte("1920"), "", { mitte:"VOR DER KRISE", mitte2:"1920", schmal:true })}</div>
  <div>${halbrund("Reichstagswahl · 4. Mai 1924 · Stimmen in Prozent", wahlWerte("1924a"), "", { mitte:"NACH DER KRISE", mitte2:"1924", schmal:true })}</div></div>
  <p class="quelle">${W_WAHLQ} „Völkische · NS“: Die NSDAP war nach dem Putsch verboten; ihre Anhänger traten mit der Deutschvölkischen Freiheitspartei an. Die USPD hatte sich 1922 größtenteils wieder mit der SPD vereinigt.</p>
  <div class="ab-zwei gleich"><div>${textfeld("gew", "Profitiert haben", { rows:2, zaehl:false })}</div><div>${textfeld("verl", "Verloren haben", { rows:2, zaehl:false })}</div></div>
  ${vergleich("wvgl", ["gew","verl"], 5, "Mit den Zahlen vergleichen", `<div class="w-karten k2"><article class="w-kk rot"><h3>Gewinner</h3><ul><li>DNVP: von ${k(wahlAnteil("1920","dnvp"))} auf ${k(wahlAnteil("1924a","dnvp"))} Prozent</li><li>Völkische und Nationalsozialisten: aus dem Stand ${k(wahlAnteil("1924a","ns"))} Prozent</li><li>kleine Parteien („Sonstige“): von ${k(wahlAnteil("1920","sonst"))} auf ${k(wahlAnteil("1924a","sonst"))} Prozent</li></ul></article><article class="w-kk blau"><h3>Verlierer</h3><ul><li>DVP: von ${k(wahlAnteil("1920","dvp"))} auf ${k(wahlAnteil("1924a","dvp"))} Prozent</li><li>DDP: von ${k(wahlAnteil("1920","ddp"))} auf ${k(wahlAnteil("1924a","ddp"))} Prozent</li><li>SPD: von ${k(wahlAnteil("1920","spd"))} auf ${k(wahlAnteil("1924a","spd"))} Prozent – obwohl ein großer Teil der USPD zu ihr zurückgekehrt war</li></ul></article></div><p>Die Parteien der Mitte verlieren, die Ränder gewinnen. SPD, Zentrum und DDP kommen zusammen noch auf ${k(Math.round((wahlAnteil("1924a","spd") + wahlAnteil("1924a","z") + wahlAnteil("1924a","ddp")) * 10) / 10)} Prozent (1919: 76,1 Prozent).</p>`)}
  ${kgFeld("Mein Eintrag: Krisenjahr 1923", "Was bleibt vom Krisenjahr im Gedächtnis der Menschen – und wie wirkt es weiter? Zwei bis drei Stichpunkte für das Raster aus M8.1.")}</div>`;
}
const k = z => String(z).replace(".", ",");
function seiteLk(){
  return landkarteL({ teil:"wozu", frage:"Ihr habt festgehalten, wie sich Menschen in ihrer Krise verhalten. Welchen Punkt aus „Wozu Geschichte?“ setzt diese Aufgabe um?",
    lead:"Denk an eure Videos: Was tun Menschen, wenn ihr Geld nichts mehr wert ist oder fremde Truppen einmarschieren? Vermute: Was lässt sich daraus für andere Zeiten lernen – und was nicht?", platz:"Lernen lässt sich, dass …; nicht übertragen lässt sich …",
    urteil:{
      "1-2":["zentral","Die Aufgabe fragt nach wiederkehrenden Mustern: wie Menschen in Krisen reagieren, wem sie die Schuld geben, wie Gruppen sich abgrenzen. Genau das meint der Eintrag."],
      "1-4":["zentral","Das ist der zweite Kern, vor allem in Auftrag 4: Du suchst Parallelen und Unterschiede zu heute. Situationen wiederholen sich nie genau – deshalb beides."],
      "1-3":["teils","Stimmt: Du befragst 1923 mit Fragen von heute. Noch genauer trifft der Eintrag, der vom Verhalten der Menschen in Krisen spricht."],
      "1-8":["teils","Das Krisenjahr zeigt, was eine Demokratie gefährdet. Die Aufgabe selbst richtet den Blick aber zuerst auf das Verhalten der Menschen."],
      "1-1":["teils","Bei den Wahlplakaten (Auftrag 5) übst du genau das. Die Videos fragen nach etwas anderem: nach dem Verhalten in der Krise."],
    },
    bruecke:`<b>Merke:</b> Aus Geschichte lernt, wer Muster erkennt und zugleich die Unterschiede prüft.` });
}
L.schreib = {
  vor:"So kann die Aufgabe in der Klassenarbeit stehen: Material, zwei Operatoren, höchstens eine Seite. Hier schreibst du eine halbe Seite.",
  aufgabe:`<b>a) Erläutern Sie</b>, wie die Krisen des Jahres 1923 zusammenhängen.<br><b>b) Beurteilen Sie</b>, ob die Republik das Krisenjahr gestärkt oder geschwächt überstanden hat.`,
  material:`<p><b>M1 · Krisen 1923:</b> Ruhrbesetzung (ab Januar) · passiver Widerstand · Hyperinflation · Aufstände von links (Oktober) · Hitler-Putsch (8./9. November).</p><p><b>M2 · Maßnahmen unter Reichskanzler Stresemann:</b> Abbruch des passiven Widerstands (September) · Rentenmark (15. November) · Einsatz der Reichswehr · Verhaftung und Verurteilung Hitlers.</p><p><b>M3 · Reichstagswahl 4. Mai 1924 (in Klammern: 1920):</b> SPD ${k(wahlAnteil("1924a","spd"))} % (${k(wahlAnteil("1920","spd"))}) · DNVP ${k(wahlAnteil("1924a","dnvp"))} % (${k(wahlAnteil("1920","dnvp"))}) · DVP ${k(wahlAnteil("1924a","dvp"))} % (${k(wahlAnteil("1920","dvp"))}) · DDP ${k(wahlAnteil("1924a","ddp"))} % (${k(wahlAnteil("1920","ddp"))}) · Völkische und Nationalsozialisten ${k(wahlAnteil("1924a","ns"))} % (–).</p><p class="quelle">M1 und M2 nach dem Unterrichtsheft, M11. M3 berechnet aus den Stimmenzahlen bei der Konrad-Adenauer-Stiftung.</p>`,
  woerter:150, min:60,
  stufen:[["Grundlegend","Du nennst die Krisen in der richtigen Reihenfolge und sagst, ob die Republik für dich gestärkt oder geschwächt ist."],["Sicher","Du erklärst, wie eine Krise die nächste auslöst, und begründest dein Urteil mit einer Maßnahme und einer Zahl aus M3."],["Souverän","Du wägst ab: Was gelingt der Republik, was bleibt als Schaden im Gedächtnis der Menschen? Du kommst zu einem begründeten Urteil."]],
  inhalt:[["Zusammenhang:","Reparationen im Verzug → Ruhrbesetzung → passiver Widerstand, vom Staat bezahlt → Geld wird gedruckt → Hyperinflation → Vertrauen geht verloren → Aufstände von links, Putsch von rechts."],
    ["Gestärkt:","Die Republik übersteht alle Krisen; die Rentenmark beendet die Inflation; Putsch und Aufstände scheitern; Stresemann als Krisenmanager."],
    ["Geschwächt:","Ersparnisse sind vernichtet; tiefes Misstrauen gegenüber der demokratischen Regierung; Hitler wird durch den Prozess bekannt und milde bestraft; 1924 gewinnen Parteien, die die Republik ablehnen."],
    ["Urteil:","Beide Antworten sind möglich. Es zählt die Abwägung."]],
};
L.zf = {
  frage:L.frage,
  kern:"1923 treffen mehrere Krisen zugleich auf die Republik: Ruhrbesetzung, Hyperinflation, Aufstände von links und der Hitler-Putsch von rechts. Sie hängen eng zusammen. Unter Reichskanzler Stresemann übersteht die Republik das Jahr. Aber viele Menschen haben ihr Erspartes verloren – und ihr Vertrauen.",
  begriffe:[["Ruhrbesetzung","Französische und belgische Truppen besetzen 1923 das Ruhrgebiet, weil Deutschland mit den Reparationen in Verzug ist."],["Passiver Widerstand","Die Arbeiter im Ruhrgebiet legen die Arbeit nieder; der Staat bezahlt sie weiter."],["Hyperinflation","Das Geld verliert in rasender Geschwindigkeit seinen Wert."],["Rentenmark","neue Währung vom 15. November 1923; beendet die Inflation."],["Putsch","Versuch, die Regierung mit Gewalt zu stürzen."],["Dawes-Plan","Abkommen von 1924, das die Reparationen neu regelt."]],
  abfolge:{ titel:"Das Krisenjahr 1923", punkte:[["Januar","Französische und belgische Truppen besetzen das Ruhrgebiet; passiver Widerstand."],["1923","Hyperinflation: Ersparnisse, Renten und Barvermögen werden wertlos."],["September","Stresemann bricht den passiven Widerstand ab."],["Oktober","Aufstände von links in Sachsen, Thüringen und Hamburg."],["8./9. Nov.","Hitler-Putsch in München scheitert."],["15. Nov.","Rentenmark: Eine Billion Papiermark entspricht einer Rentenmark."]] },
  zahlen:[["1 Billion","Papiermark für eine Rentenmark"],[k(wahlAnteil("1924a","dnvp")) + " %","DNVP im Mai 1924 (1920: " + k(wahlAnteil("1920","dnvp")) + " %)"],[k(wahlAnteil("1924a","ns")) + " %","Völkische und Nationalsozialisten im Mai 1924"]],
  lk:{ name:"Anthropologische Konstanten (1.2)", satz:"Geschichte zeigt wiederkehrende Muster menschlichen Verhaltens, zum Beispiel wie Menschen in Krisen reagieren, wie Gruppen sich abgrenzen oder wie Macht gesichert wird.", beispiel:"1923 suchen viele Menschen Schuldige und wenden sich Parteien zu, die einfache Antworten versprechen." },
  werkzeug:{ titel:"Krisen verknüpfen", schritte:["Ursache und Folge trennen: Was löst was aus?","Auf die Menschen sehen: Wie verhalten sie sich, wem geben sie die Schuld?","Folgen prüfen: Wer gewinnt politisch, wer verliert?"] },
  sonst:"euer Legetechnikvideo (Auftrag 2), euer Wahlplakat (Auftrag 5), Parallelen und Unterschiede zu heute (Auftrag 4).",
  mein:[["Meine Bewertung der Krisen (1 bis 5)", () => KRISEN.every(x => (S.b || {})[x.id] != null) ? KRISEN.map(x => `${x.titel}: ${S.b[x.id]}`).join(" · ") + ". " + S.bgrund : ""], ["Mein Eintrag ins kollektive Gedächtnis", "kg"]],
};
function zusammenfassung(){ return fadenFeld() + zusammen(); }
const SEITE_FN = { start, vorher, krise, kino, kette, plakat, wahl, landkarte:seiteLk, schreiben:schreibauftrag, zusammenfassung, lehrkraft };
weimarStart();
