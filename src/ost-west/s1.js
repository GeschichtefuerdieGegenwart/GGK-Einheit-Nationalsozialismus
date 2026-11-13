/* ===== Stunde 1: Die Stunde Null – Was wird jetzt mit Deutschland? (Heft M29, M30) ===== */
const L = {
  sid:"s1", key:"ggk-owk-s1:v1", nr:"Stunde 1", titel:"Die Stunde Null – Was wird jetzt mit Deutschland?", unter:"Potsdam, Sommer 1945", mark:OWK_MARK,
  seiten:[["start","",""],["lage","15 Min.","Die Lage"],["wette","20 Min.","Vorhersagen"],["ergebnis","20 Min.","Das Abkommen"],["landkarte","10 Min.","Landkarte"],["verorten","12 Min.","Verorten"],["merk","","Merkseite"]],
  breit:["lage","ergebnis","verorten","lehrkraft"],
  loesch:"Alle Eingaben dieser Stunde werden auf diesem Gerät entfernt. Verbindungen und der Satz im roten Faden bleiben in der Übersicht der Einheit.",
  init:() => ({ abruf:{}, keim:"", urteil:"", v:VINIT() }),
  fadenAnf:["Schon 1945 zeigten sich Machtinteressen darin, dass", "Handlungsspielraum hatten in Potsdam", "Die Deutschen selbst"],
};
const FRAGEN7 = [["Die fünf D", "Deutschland soll entwaffnet, von Nationalsozialisten gesäubert, demokratisch, dezentral und ohne Rüstungsindustrie sein. Aber wie streng?"], ["Reparationen", "Wie hoch soll die Wiedergutmachung sein, und woher kommt sie?"], ["Grenzen", "Wird die Linie an Oder und Neiße die Westgrenze Polens?"], ["Zonen", "Wie werden Deutschland und Berlin aufgeteilt? Wer kontrolliert was?"], ["Polen und Osteuropa", "Wer bestimmt, wie die Länder östlich von Deutschland regiert werden?"], ["Vertreibungen", "Was geschieht mit den Deutschen in Polen, der Tschechoslowakei und Ungarn?"], ["Kontrollrat", "Wie entscheiden vier Mächte gemeinsam über ganz Deutschland?"]];
const DELEG = [
  ["USA", "Präsident Harry S. Truman, im Amt seit April 1945", ["Rund 400 000 tote Soldaten. Das Land ist unzerstört und wirtschaftlich die stärkste Macht.", "Deutschland soll sich selbst ernähren können, damit nicht die USA für die Besatzung zahlen.", "Reparationen soll jede Macht aus ihrer eigenen Zone nehmen.", "Die Westgrenze Polens soll erst ein Friedensvertrag festlegen. In Osteuropa: freie Wahlen."]],
  ["Sowjetunion", "Josef Stalin, Diktator seit den 1920er-Jahren", ["Rund 27 Millionen Tote, weite Teile des Landes sind verwüstet. Die Rote Armee steht in Berlin.", "Hohe Reparationen für den Wiederaufbau, auch aus den Westzonen.", "Die Oder-Neiße-Linie soll Polens Westgrenze sein; Ostpolen und Königsberg bleiben sowjetisch.", "Sicherheit: befreundete Regierungen in den Ländern zwischen Deutschland und der Sowjetunion."]],
  ["Großbritannien", "Winston Churchill, ab 28. Juli Clement Attlee (nach verlorener Wahl)", ["Rund 450 000 Tote. Das Land hat gesiegt, ist aber hoch verschuldet.", "Kein zweites Versailles: Deutschland soll schwach sein, aber nicht im Chaos versinken.", "Bedenken gegen eine zu weite Verschiebung Polens nach Westen.", "Die eigene Zone mit dem Ruhrgebiet muss versorgt werden – Reparationen dürfen das nicht unmöglich machen."]],
];
const WETTEN = [
  ["rep", "Reparationen: Worauf einigen sich die drei?", [
    ["Deutschland zahlt eine feste Summe, die Hälfte geht an die Sowjetunion.", "kaum", "So kam es nicht. Eine feste Summe wurde in Potsdam nicht vereinbart – genau daran waren die Verhandlungen fast gescheitert."],
    ["Jede Macht nimmt Reparationen aus ihrer eigenen Zone. Die Sowjetunion bekommt zusätzlich einen Anteil aus den Westzonen.", "zentral", "So kam es. Die Folge wurde erst später sichtbar: Wenn jede Macht aus „ihrer“ Zone nimmt, wird Deutschland wirtschaftlich schon geteilt, bevor es politisch geteilt ist."],
    ["Deutschland zahlt nichts, damit es nicht wieder zu einer Krise wie nach 1919 kommt.", "kaum", "So kam es nicht. Dass Deutschland für die Schäden aufkommen soll, war unter den drei Mächten unstrittig – gestritten wurde über Höhe und Herkunft."]]],
  ["grenze", "Oder-Neiße-Linie: Was steht am Ende im Abkommen?", [
    ["Die Grenze ist endgültig. Schlesien, Pommern und Ostpreußen gehören nicht mehr zu Deutschland.", "begruendbar", "Im Abkommen steht es anders: Die Gebiete kommen „unter polnische Verwaltung“. In der Wirklichkeit wirkte es aber genau so – die Deutschen mussten gehen, und die Grenze blieb."],
    ["Die Gebiete kommen unter polnische Verwaltung. Die endgültige Grenze soll ein Friedensvertrag festlegen.", "zentral", "So steht es im Abkommen. Den Friedensvertrag gab es nie. Erst 1990 wurde die Grenze endgültig anerkannt – merke dir das für die letzte Karte der Einheit."],
    ["Die Westmächte lehnen ab, die Gebiete bleiben deutsch.", "kaum", "So kam es nicht. Die Rote Armee stand in diesen Gebieten, die polnische Verwaltung arbeitete bereits. Die Westmächte konnten die Lage nur noch „vorläufig“ nennen."]]],
  ["einheit", "Bleibt Deutschland ein Land?", [
    ["Nein. Die drei beschließen, Deutschland in mehrere Staaten aufzuteilen.", "kaum", "So kam es nicht. Pläne zur Aufteilung gab es während des Krieges, in Potsdam wurden sie nicht beschlossen."],
    ["Ja. Deutschland bekommt sofort wieder eine eigene Regierung unter Aufsicht der Sieger.", "kaum", "So kam es nicht. Eine deutsche Zentralregierung sollte es vorerst nicht geben."],
    ["Deutschland soll als wirtschaftliche Einheit behandelt werden. Regiert wird es vom Alliierten Kontrollrat – und jede Macht in ihrer Zone.", "zentral", "So kam es. Der Kontrollrat konnte nur einstimmig entscheiden. Wo sich die vier nicht einigten, entschied jede Macht in ihrer Zone allein."]]],
];
function start(){
  return `${band("Stunde 1 von 9 · Heft M29 und M30 · 90 Minuten", "Die „Stunde Null“", "Sommer 1945. Deutschland hat bedingungslos kapituliert. Es gibt keine deutsche Regierung mehr. In Potsdam entscheiden drei Männer, was aus dem Land wird.")}
  <p class="leitfrage">Legt Potsdam den Grundstein für den Ost-West-Konflikt?</p>
  <div class="karte"><b>Am Ende kannst du …</b><ul><li>erklären, was die drei Mächte in Potsdam wollten und worauf sie sich einigten,</li><li>zeigen, in welchen Beschlüssen schon der spätere Konflikt steckt,</li><li>beurteilen, was man 1945 wissen konnte – und was erst wir heute wissen.</li></ul></div>
  ${abruf(["Wie sah Deutschland im Mai 1945 aus? Nenne drei Dinge (M25).", "Wer hatte gemeinsam gegen das nationalsozialistische Deutschland gekämpft?"])}
  ${bildO("owk-s1-potsdam", "Potsdam, Sommer 1945: Winston Churchill, Harry S. Truman und Josef Stalin (von links).", "Schwarz-Weiß-Foto: Drei Männer reichen einander über Kreuz die Hände und lächeln in die Kamera, zwei tragen Uniform.", "M30", { klein:true })}
  ${weiter("lage", "Los: Die Lage")}`;
}
function lage(){
  return `${zeitKopf("lage")}<h1>Sieben Fragen, drei Delegationen</h1>
  ${auftrag("Zu zweit · 15 Minuten", "Wer will was?", "Lest die sieben Fragen der Konferenz und die drei Delegationen. Sucht zu jeder Delegation die eine Frage, bei der sie am wenigsten nachgeben kann. Ihr braucht das gleich für eure Vorhersage.")}
  <h2 class="abschnitt">Die sieben Fragen der Konferenz (17. Juli bis 2. August 1945)</h2>
  <ol class="fragen7">${FRAGEN7.map(f => `<li><b>${esc(f[0])}.</b> ${esc(f[1])}</li>`).join("")}</ol>
  <h2 class="abschnitt">Die drei Delegationen ${status("modell", "Zusammenfassung")}</h2>
  <div class="deleg">${DELEG.map(d => `<div class="karte"><h3 style="margin-top:0">${esc(d[0])}</h3><p class="hinweis">${esc(d[1])}</p><ul>${d[2].map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>
  <p class="quelle">Zusammenfassung nach M29 und M30 des Heftes. Frankreich saß in Potsdam nicht mit am Tisch, bekam aber eine eigene Besatzungszone.</p>
  ${bildO("owk-s1-zonen", "Die Besatzungszonen und die Gebiete östlich von Oder und Neiße.", "Farbige Karte Mitteleuropas: Deutschland ist in vier Besatzungszonen eingeteilt; die Gebiete östlich von Oder und Neiße sind gesondert markiert.", "M29")}
  ${weiter("wette", "Weiter: Vorhersagen")}`;
}
function wette(){
  return `${zeitKopf("wette")}<h1>Worauf einigen sie sich?</h1>
  ${auftrag("Allein · 10 Minuten, dann Vergleich zu zweit", "Erst festlegen", "Drei Streitfragen. Wähle jeweils, was am Ende im Abkommen steht, und begründe in einem Satz mit den Interessen der Delegationen. Erst nach dem Festlegen siehst du, wie es kam.")}
  ${WETTEN.map(w => `<div class="karte">${gWahl(w[0], esc(w[1]), w[2], { platz:"Ich erwarte das, weil … am wenigsten nachgeben kann." })}</div>`).join("")}
  <p class="hinweis">Im Plenum: Wo lagt ihr daneben – und warum war das 1945 nicht abzusehen?</p>
  ${weiter("ergebnis", "Weiter: Das Abkommen")}`;
}
function ergebnis(){
  return `${zeitKopf("ergebnis")}<h1>Das Potsdamer Abkommen</h1>
  <div class="lesepult"><div>${`<div class="qblatt lese"><h3>Was am 2. August 1945 beschlossen ist</h3><ol class="fakten">${HEFT.m30.map(x => `<li>${esc(x)}</li>`).join("")}</ol><p class="quelle">Text: Unterrichtsheft, M30. Das Abkommen beruht auf den Konferenzen von Teheran (1943) und Jalta (Februar 1945).</p></div>`}</div>
  <aside>${auftrag("Zu zweit · 10 Minuten", "Wo steckt der Keim?", "Sucht die zwei Beschlüsse, die am ehesten zu neuem Streit zwischen den Siegern führen. Begründet mit dem Wortlaut.")}
  ${textfeld("keim", "Diese zwei Beschlüsse – und warum", { rows:5, anfaenge:["Beschluss Nr.", "Streit ist zu erwarten, weil", "Das Wort „vorläufig“ bedeutet hier"], zaehl:false })}</aside></div>
  ${auftrag("Allein · 8 Minuten", "Dein Urteil", "Legt Potsdam den Grundstein für den Ost-West-Konflikt? Antworte in vier bis sechs Sätzen. Nutze mindestens einen Beschluss als Beleg.")}
  ${textfeld("urteil", "Mein Urteil", { rows:6, anfaenge:["Potsdam legt den Grundstein, weil", "Dagegen spricht, dass die drei Mächte 1945", "Entscheidend ist für mich"], ziel:"Ziel: 60 bis 90 Wörter" })}
  ${raster("urteil", 45, "Selbstprüfung", [["Beleg", "Ich behaupte.", "Ich stütze mein Urteil auf einen Beschluss.", "Ich stütze es auf zwei Beschlüsse und nenne den Wortlaut."],["Abwägen", "Ich nenne eine Seite.", "Ich nenne, was dafür und was dagegen spricht.", "Ich gewichte und sage, was für mich den Ausschlag gibt."],["Zeitebene", "Ich schreibe aus heutiger Sicht.", "Ich unterscheide, was man 1945 wusste und was wir heute wissen.", "Ich zeige, wo sich Zusammenarbeit und Misstrauen 1945 zugleich finden."]])}
  ${weiter("landkarte", "Weiter: Landkarte")}`;
}
const SEITE_FN = { start, lage, wette, ergebnis, verorten, merk, lehrkraft,
  landkarte:() => landkarte({ seite:"landkarte", titel:"„Grundstein“ – wer sagt das?", frage:"Im Heft steht: Die Fragen von Potsdam „legten den Grundstein für den Ost-West-Konflikt“. Konnten Truman, Stalin und Churchill das im Juli 1945 so sehen?", lead:"Warum können wir von einem „Grundstein“ sprechen, die Beteiligten aber nicht? Schreib einen Satz.", platz:"Wir wissen heute, dass …", folge:FOLGE,
    urteil:lkU("2-1-1", "Von einem „Grundstein“ kann nur sprechen, wer weiß, was darauf gebaut wurde. 1945 wussten die Beteiligten nicht, dass es zwei deutsche Staaten und einen Kalten Krieg geben würde. Wer rückblickend erzählt, macht aus offenen Entscheidungen leicht einen geraden Weg.", { "2-1-7":"Begründbar: Wer Potsdam als „Grundstein“ erzählt, setzt Ereignisse zu einer Geschichte mit Ziel zusammen. Noch genauer trifft es aber das Prinzip, das den Blick aus dem Nachhinein benennt.", "2-1-4":"Begründbar: Von den vielen Beschlüssen werden die ausgewählt, die zum späteren Konflikt passen. Der Kern ist hier aber der Blick aus dem Nachhinein." }),
    bruecke:"<b>Für das Plenum.</b> Welche Beschlüsse von Potsdam passen <i>nicht</i> zur Erzählung vom Grundstein – weil sich die drei Mächte dort einig waren?", nach:["verorten", "Weiter: Verorten"] }),
};
L.merk = { frage:"Legt Potsdam den Grundstein für den Ost-West-Konflikt?", kern:"In Potsdam einigen sich die Sieger auf Formeln – „vorläufig“, „aus der eigenen Zone“, „gemeinsam“ –, hinter denen ihre Interessen unvereinbar bleiben.",
  begriffe:[["Potsdamer Abkommen", "Beschlüsse der USA, der Sowjetunion und Großbritanniens vom 2. August 1945 über Deutschland."],["Die fünf D", "Demilitarisierung, Denazifizierung, Demokratisierung, Dezentralisierung, Demontage."],["Reparationen", "Wiedergutmachung für Kriegsschäden; jede Macht entnimmt sie ihrer eigenen Zone."],["Oder-Neiße-Linie", "Die Gebiete östlich davon kommen unter polnische Verwaltung – „bis zu einem Friedensvertrag“."],["Alliierter Kontrollrat", "Gemeinsames Gremium der vier Besatzungsmächte in Berlin; entscheidet nur einstimmig."],["Besatzungszone", "Gebiet, in dem eine Siegermacht regiert. Berlin wird in vier Sektoren geteilt."]],
  zeit:[["Feb. 1945", "Konferenz von Jalta"],["8. Mai 1945", "Bedingungslose Kapitulation"],["17. Juli 1945", "Beginn der Potsdamer Konferenz"],["2. Aug. 1945", "Potsdamer Abkommen"]],
  werkzeug:"<b>Retrospektivität prüfen:</b> Was wussten die Beteiligten damals? Was weiß erst, wer später lebt? Welche Wörter im Text (Grundstein, Vorgeschichte, Anfang vom Ende) verraten den Blick aus dem Nachhinein?",
  mein:[["Zwei Beschlüsse mit Keim zum Streit", "keim"],["Mein Urteil", "urteil"],["Landkarte: mein Prinzip und meine Begründung", () => S.lk.prinzip ? (PRINZIP[S.lk.prinzip] || FOLGE)[0] + " – " + S.lk.grund : ""]] };
stundeStart();
