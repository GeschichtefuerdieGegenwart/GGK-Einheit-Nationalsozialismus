/* ===== Stunde 6: Flucht und Mauer (Heft M36 Fluchtbewegung, M37, M38, M39) ===== */
const L = {
  sid:"s6", key:"ggk-owk-s6:v1", nr:"Stunde 6", titel:"Flucht und Mauer", unter:"1949 bis 1961", mark:OWK_MARK,
  seiten:[["start","",""],["zahlen","18 Min.","Die Zahlen"],["gruende","22 Min.","Die Gründe"],["mauer","18 Min.","Die Mauer"],["landkarte","8 Min.","Landkarte"],["verorten","14 Min.","Verorten"],["merk","","Merkseite"]],
  breit:["zahlen","gruende","mauer","verorten","lehrkraft"],
  loesch:"Alle Eingaben dieser Stunde werden auf diesem Gerät entfernt. Verbindungen und der Satz im roten Faden bleiben in der Übersicht der Einheit.",
  init:() => ({ abruf:{}, schaetz:"", ort:30000, lesen:"", g:{}, auffall:"", alt:"", name:"", v:VINIT() }),
  fadenAnf:["Handlungsspielraum hatten die Menschen in der DDR bis 1961, weil", "Die SED-Führung entschied sich für die Mauer, weil", "Ideologie und Alltag passten nicht zusammen, denn"],
};
const FL = HEFT.flucht, SUMME = FL.reduce((n, z) => n + z[1], 0), SCHNITT = Math.round(SUMME / FL.length), DDR = 18000000;
const zahl = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
function diagramm(){
  const W = 640, H = 300, l = 56, u = 36, o = 14, max = 350000, x = i => l + i * (W - l - 12) / (FL.length - 1), y = v => o + (H - o - u) * (1 - v / max);
  const linie = FL.map((z, i) => `${x(i).toFixed(1)},${y(z[1]).toFixed(1)}`).join(" "), jung = FL.map((z, i) => z[2] ? `${x(i).toFixed(1)},${y(z[1] * z[2] / 100).toFixed(1)}` : null).filter(Boolean).join(" ");
  return `<figure class="dia"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Liniendiagramm: Zahl der Flüchtlinge aus der DDR pro Jahr 1949 bis 1961. Höchstwert 1953 mit 331 390, niedrigster Wert 1949 mit 129 245. Zweite Linie ab 1953: Jugendliche unter 25, jeweils etwa die Hälfte.">
  ${[0, 100000, 200000, 300000].map(v => `<line x1="${l}" x2="${W - 8}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)"/><text x="${l - 6}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="var(--muted)">${zahl(v)}</text>`).join("")}
  ${FL.map((z, i) => `<text x="${x(i)}" y="${H - 14}" text-anchor="middle" font-size="11" fill="var(--muted)">${String(z[0]).slice(2)}</text>`).join("")}
  <polyline points="${linie}" fill="none" stroke="var(--kuli)" stroke-width="3" stroke-linejoin="round"/><polyline points="${jung}" fill="none" stroke="var(--red)" stroke-width="3" stroke-dasharray="6 4" stroke-linejoin="round"/>
  ${FL.map((z, i) => `<circle cx="${x(i)}" cy="${y(z[1])}" r="4" fill="var(--kuli)"/>`).join("")}
  <text x="${x(4)}" y="${y(331390) - 8}" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">1953</text></svg>
  <figcaption><span style="color:var(--kuli);font-weight:700">— Flüchtlinge insgesamt</span> · <span style="color:var(--red);font-weight:700">- - davon Jugendliche unter 25</span> (berechnet aus den Prozentangaben, ab 1953)<span class="nachweis">Daten: Monatsmeldungen des Bundesministeriums für Vertriebene, Flüchtlinge und Kriegsgeschädigte; Jürgen Rühle/Gunter Holzweißig, Der 13. August. Die Mauer von Berlin, 3. Aufl., Köln 1988, S. 154. Nach dem Unterrichtsheft, M36.</span></figcaption></figure>`;
}
function start(){
  return `${band("Stunde 6 von 9 · Heft M36 bis M39 · 90 Minuten", "Flucht und Mauer", "Die DDR nennt sich Arbeiter-und-Bauern-Staat. Jahr für Jahr verlassen sie Hunderttausende – bis zum 13. August 1961.")}
  <p class="leitfrage">Hätte es für die DDR eine Alternative zur Mauer gegeben?</p>
  <div class="karte"><b>Am Ende kannst du …</b><ul><li>die Fluchtbewegung in Zahlen beschreiben,</li><li>Fluchtgründe aus Quellen herausarbeiten und ordnen,</li><li>beurteilen, welche Möglichkeiten die DDR-Führung 1961 hatte.</li></ul></div>
  ${abruf(["Wie wurde die sowjetische Zone nach 1945 umgebaut? Nenne zwei Maßnahmen.", "Was änderte sich 1955 für beide deutsche Staaten?"])}
  ${weiter("zahlen", "Los: Die Zahlen")}`;
}
function zahlen(){
  const e = String(S.schaetz).trim().length > 0, n = +S.ort || 30000, proJahr = n * SCHNITT / DDR, pct = SCHNITT / DDR * 100;
  return `${zeitKopf("zahlen")}<h1>Abstimmung mit den Füßen</h1>
  ${auftrag("Allein · 2 Minuten", "Erst schätzen", "In der sowjetischen Zone lebten 1949 rund 18 Millionen Menschen. Wie viele verließen die DDR von 1949 bis 1961? Trag deine Schätzung ein.")}
  ${eingabe("schaetz", "Meine Schätzung (Personen)", "zum Beispiel 500 000")}
  ${vergleich("zahlen", ["schaetz"], 3, "Zahlen zeigen", `${diagramm()}
  <div class="matrix-wrap"><table><thead><tr><th>Jahr</th>${FL.map(z => `<th>${z[0]}</th>`).join("")}</tr></thead><tbody><tr><td>Personen</td>${FL.map(z => `<td class="n">${zahl(z[1])}</td>`).join("")}</tr><tr><td>unter 25 Jahre (%)</td>${FL.map(z => `<td class="n">${z[2] ? String(z[2]).replace(".", ",") : "–"}</td>`).join("")}</tr></tbody></table></div>
  <p><b>Zusammen: ${zahl(SUMME)} Personen</b> in 13 Jahren, im Durchschnitt ${zahl(SCHNITT)} pro Jahr. ${e ? "Deine Schätzung: " + esc(S.schaetz) + "." : ""}</p>`)}
  ${auftrag("Zu zweit · 6 Minuten", "Das Diagramm lesen", "In welchem Jahr gehen die meisten? Was fällt beim Anteil der Jugendlichen auf? Was könnte 1953 geschehen sein? (Die Antwort kommt in Stunde 7.)")}
  ${textfeld("lesen", "Das fällt uns auf", { rows:3, zaehl:false })}
  <h2 class="abschnitt">Und wenn es deine Stadt wäre? ${status("modell", "Modell")}</h2>
  <div class="karte"><label for="f-ort">Einwohnerzahl deiner Stadt: <b id="ortwert">${zahl(n)}</b></label><input type="range" id="f-ort" data-f="ort" min="5000" max="700000" step="5000" value="${n}" style="width:100%;min-height:44px">
  <p id="ortfolge" aria-live="polite">${ortText(n)}</p>
  <p class="hinweis">Gerechnet wird mit dem Durchschnitt von ${zahl(SCHNITT)} Flüchtlingen pro Jahr bei rund 18 Millionen Einwohnern (${pct.toFixed(2).replace(".", ",")} % pro Jahr). <b>Was lässt dieses Modell weg?</b> Zum Beispiel, dass etwa die Hälfte jünger als 25 war – und dass vor allem gut Ausgebildete gingen.</p></div>
  ${weiter("gruende", "Weiter: Die Gründe")}`;
}
const ortText = n => { const p = n * SCHNITT / DDR; return `Jedes Jahr würden etwa <b>${zahl(p)} Menschen</b> deine Stadt verlassen. Nach 13 Jahren fehlten <b>${zahl(p * 13)}</b>. Ginge es so weiter, wäre die Stadt nach etwa ${Math.round(DDR / SCHNITT)} Jahren leer.`; };
L.nachEingabe = p => { if (p === "ort") { const a = document.getElementById("ortwert"), b = document.getElementById("ortfolge"); if (a) a.textContent = zahl(S.ort); if (b) b.innerHTML = ortText(+S.ort); } };
function gruende(){
  const kat = ["Daten zur Person", "persönlich-familiäre Gründe", "politische Gründe", "wirtschaftliche Gründe"];
  return `${zeitKopf("gruende")}<h1>Warum sie gingen</h1>
  ${auftrag("Zu zweit · 22 Minuten", "Vier Protokolle", "Die Texte sind Flüchtlingsprotokolle aus dem Notaufnahmelager Marienfelde in West-Berlin. Wer waren diese Menschen, und warum verließen sie die DDR? Ordnet die Gründe den Kategorien zu – mit Stichworten aus dem Text.")}
  ${HEFT.m37.map((q, i) => `<div class="lesepult"><div><div class="qblatt lese"><h3>Quelle ${i + 1}</h3><div class="qtext"><p>${esc(q)}</p></div><p class="quelle">Flüchtlingsprotokoll, Notaufnahmelager Marienfelde. Nach dem Unterrichtsheft, M37 (dort ohne weiteren Nachweis).</p></div></div>
  <aside class="fragenspalte">${kat.map((k, j) => `<div class="tf"><label for="f-g-q${i}-${j}">${esc(k)}</label><textarea id="f-g-q${i}-${j}" data-f="g.q${i}_${j}" rows="${j ? 2 : 1}">${esc(hol("g.q" + i + "_" + j) || "")}</textarea></div>`).join("")}</aside></div>`).join("")}
  ${auftrag("Zu zweit · 4 Minuten", "Über alle vier hinweg", "Welche Art von Gründen kommt am häufigsten vor? Lässt sich „politisch“ von „persönlich“ überhaupt trennen?")}
  ${textfeld("auffall", "Unser Befund", { rows:3, zaehl:false })}
  ${weiter("mauer", "Weiter: Die Mauer")}`;
}
function mauer(){
  return `${zeitKopf("mauer")}<h1>Sommer 1961</h1>
  ${auftrag("Allein · 5 Minuten", "Erst überlegen", "Du kennst die Zahlen und die Gründe. Wie hätte die DDR-Führung auf die Fluchtbewegung reagieren können? Gab es Alternativen zum Bau einer Mauer? Nenne mindestens eine – und was sie für die SED bedeutet hätte.")}
  ${textfeld("alt", "Meine Alternative – und ihr Preis", { rows:4, anfaenge:["Die DDR hätte", "Für die SED hätte das bedeutet, dass", "Die Sowjetunion hätte"], zaehl:false })}
  ${vergleich("mauer", ["alt"], 30, "Was am 13. August 1961 geschah", `${lesetext("Der 13. August 1961 – die Mauer in Berlin", HEFT.m39, "Unterrichtsheft, M39.")}
  <div class="bilder">${bildO("owk-s6-bernauer", "Bernauer Straße, August 1961: Bauarbeiter errichten unter Bewachung die Mauer.", "Schwarz-Weiß-Foto: Männer setzen große Betonsteine zu einer Mauer; im Hintergrund Wohnhäuser und ein Straßenschild „Bernauer Straße“.", "M39")}${bildO("owk-s6-schumann", "Der Grenzpolizist Conrad Schumann springt über den Stacheldraht – am dritten Tag nach Beginn des Mauerbaus.", "Schwarz-Weiß-Foto: Ein junger Soldat mit Stahlhelm springt über eine Rolle Stacheldraht.", "M39")}${bildO("owk-s6-schulze", "Die 77-jährige Frieda Schulze flüchtet am 24. September 1961 aus ihrer Wohnung im ersten Stock eines Grenzhauses.", "Schwarz-Weiß-Foto: Eine Frau hängt außen an einem Fenster im ersten Stock; von oben wird sie festgehalten, unten stehen Menschen bereit, sie aufzufangen.", "M39", { nachweis:"Foto: A. Waidmann, ullstein bild (Angabe im Heft)." })}</div>
  <p><b>Zwei Namen für ein Bauwerk.</b> Im Westen hieß es „die Mauer“. Die DDR nannte es „antifaschistischer Schutzwall“.</p>`)}
  ${textfeld("name", "Was behauptet der Name „antifaschistischer Schutzwall“ – und gegen wen richtete sich die Mauer wirklich?", { rows:3, zaehl:false })}
  ${bildO("owk-s6-kuba-karikatur", "Ein Jahr später: Kennedy und Chruschtschow in der Kuba-Krise, Karikatur von 1962.", "Karikatur: Zwei Männer sitzen einander beim Armdrücken gegenüber; beide sitzen auf Bomben, und jeder hat einen Finger über einem Knopf.", "M31.1", { klein:true })}
  ${weiter("landkarte", "Weiter: Landkarte")}`;
}
const SEITE_FN = { start, zahlen, gruende, mauer, verorten, merk, lehrkraft,
  landkarte:() => landkarte({ seite:"landkarte", titel:"Vier Stimmen – und die anderen?", frage:"Die vier Protokolle stammen von Menschen, die gegangen sind und im Westen befragt wurden. Was können uns diese Quellen sagen – und was nicht?", lead:"Wessen Stimme fehlt in diesen vier Quellen? Schreib einen Satz.", platz:"Nicht zu Wort kommen …", folge:FOLGE,
    urteil:lkU("2-1-5", "Quellen zeigen immer nur einen Teil. Diese vier stammen von Menschen, die die DDR verlassen hatten und in einem westlichen Aufnahmelager ihre Gründe nannten – dort, wo von der Antwort die Anerkennung als Flüchtling abhing. Wer blieb, wer zufrieden war, wer nicht gehen konnte, kommt nicht vor. Das macht die Protokolle nicht falsch, aber unvollständig.", { "2-1-2":"Begründbar: Die Protokolle zeigen die Sicht der Geflüchteten. Gefragt war aber, dass uns von vornherein nur ein Teil der Stimmen vorliegt.", "2-1-4":"Begründbar: Für das Heft wurden vier Protokolle ausgewählt. Noch grundsätzlicher ist: Schon die Überlieferung selbst ist nur ein Ausschnitt." }),
    bruecke:"<b>Für das Plenum.</b> Welche Quelle würdet ihr suchen, um zu erfahren, warum Menschen in der DDR blieben?", nach:["verorten", "Weiter: Verorten"] }),
};
L.merk = { frage:"Hätte es für die DDR eine Alternative zur Mauer gegeben?", kern:"Von 1949 bis 1961 verlassen rund 2,7 Millionen Menschen die DDR, die Hälfte jünger als 25. Die SED-Führung ändert nicht die Verhältnisse, sondern schließt die letzte offene Grenze.",
  begriffe:[["Fluchtbewegung", "Rund 2,7 Millionen Menschen verlassen 1949–1961 die DDR, vor allem über Berlin."],["Notaufnahmelager Marienfelde", "Lager in West-Berlin, in dem Flüchtlinge aus der DDR aufgenommen und befragt wurden."],["Kollektivierung", "Zusammenschluss von Bauernhöfen zu Landwirtschaftlichen Produktionsgenossenschaften (LPG), oft unter Druck."],["13. August 1961", "Beginn des Mauerbaus quer durch Berlin."],["„Antifaschistischer Schutzwall“", "Name der DDR für die Mauer; behauptet einen Schutz vor dem Westen."],["Schießbefehl", "Grenzsoldaten sollten Fluchtversuche auch mit der Waffe verhindern."]],
  zeit:[["1949", "129 245 Flüchtlinge"],["1953", "331 390 – Höchststand (17. Juni)"],["1960/61", "Kollektivierung, neue Fluchtwelle"],["13. Aug. 1961", "Mauerbau"],["Okt. 1962", "Kuba-Krise"]],
  werkzeug:"<b>Überlieferung prüfen:</b> Wer hat diese Quelle hinterlassen – und wer nicht? In welcher Lage entstand sie? Welche Stimmen fehlen, und wo könnte ich sie finden?",
  mein:[["Das fällt uns am Diagramm auf", "lesen"],["Unser Befund zu den Fluchtgründen", "auffall"],["Meine Alternative zur Mauer – und ihr Preis", "alt"],["Zum Namen „antifaschistischer Schutzwall“", "name"]] };
L.lk = { ablauf:[["0–8", "Abruf", "allein", "SBZ, 1955."],["8–26", "Die Zahlen", "allein, zu zweit", "Schätzen, Diagramm lesen, eigene Stadt (Arbeitsaufträge 1 und 2 aus M36)."],["26–48", "Die Gründe", "zu zweit", "Vier Protokolle, vier Kategorien (M37)."],["48–66", "Die Mauer", "allein, Plenum", "Alternativen (Arbeitsauftrag 3), dann M39 und Fotos; Name der Mauer (M38)."],["66–74", "Landkarte", "allein", "Partialität."],["74–90", "Verorten und vernetzen", "allein", "Karten 9 (Mauer) und 10 (Kuba-Krise)."]],
  muster:["Denkhandlung: Daten lesen, Gründe ordnen, Handlungsspielraum beurteilen.", "Muster 1 (Schätzen → Auflösung), Muster 5 (Regler mit sichtbarer Folge) für die eigene Stadt, Muster 3 (Zuordnen mit Stichworten aus dem Text) für die Protokolle.", "Mehrwert gegenüber Papier: Das Diagramm entsteht aus der Tabelle; der Regler rechnet Arbeitsauftrag 2 für jede Stadt. Papier bleibt besser, wenn die Lernenden das Diagramm selbst zeichnen sollen."],
  erwartung:["Höchststand 1953 (17. Juni), durchgehend etwa die Hälfte unter 25.", "Quelle 1: wissenschaftliche Assistenten, politischer Druck und Gewissensgründe. Quelle 2: Druck zur Organisation, Mangel, Propaganda. Quelle 3: Traktorist, Druck zum Eintritt in SED und Kampfgruppe, Verdienst, christliche Erziehung. Quelle 4: Familie, Druck am Arbeitsplatz wegen der geflohenen Töchter.", "Alternativen: Reformen, Reisefreiheit, höhere Löhne – jeweils mit dem Risiko für die Herrschaft der SED."],
  heft:["Das Lösungsblatt zu M37 ist nicht übernommen; die Erwartungen oben stützen sich nur auf den Wortlaut der vier Quellen.", "In Quelle 2 und 3 sind im Heft zwei Textkästen ineinandergeschoben; die Seite setzt sie nach dem Sinn wieder zusammen – bitte prüfen.", "Die Zahl von rund 18 Millionen Einwohnern stammt aus Adenauers Rede (M34), nicht aus M36; die Stadt-Rechnung ist als Modell gekennzeichnet.", "M38 (Tonmaterial zur Begründung des Mauerbaus) ist nicht eingebaut, weil die Seite keine fremden Server lädt. Die drei Links aus dem Heft (chronik-der-mauer.de/blatt6/link1 bis link3) eignen sich für das Plenum.", "Die Karikatur zur Kuba-Krise stammt aus M31.1."],
  nurdu:["Die drei Tonquellen aus M38 am Lehrkraftgerät vorspielen.", "Nachweise der Flüchtlingsprotokolle ergänzen."] };
stundeStart();
