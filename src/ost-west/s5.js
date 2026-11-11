/* ===== Stunde 5: Die Bindung der Bundesrepublik an den Westen (Heft M35, M36) ===== */
const L = {
  sid:"s5", key:"ggk-owk-s5:v1", nr:"Stunde 5", titel:"Die Bindung der Bundesrepublik an den Westen", unter:"Westintegration und Wiederbewaffnung, 1949 bis 1957", mark:OWK_MARK,
  seiten:[["start","",""],["streit","20 Min.","Der Streit"],["schritte","15 Min.","Die Schritte"],["wahl","20 Min.","Das Urteil"],["landkarte","8 Min.","Landkarte"],["verorten","14 Min.","Verorten"],["merk","","Merkseite"]],
  breit:["streit","schritte","wahl","verorten","lehrkraft"],
  loesch:"Alle Eingaben dieser Stunde werden auf diesem Gerät entfernt. Verbindungen und der Satz im roten Faden bleiben in der Übersicht der Einheit.",
  init:() => ({ abruf:{}, stimme:"", stimmgrund:"", arg:{}, reihe:{}, personal:"", tipp57:"", urteil:"", v:VINIT() }),
  fadenAnf:["Handlungsspielraum hatte Adenauer, weil", "Machtinteressen der USA zeigten sich darin, dass", "Der Preis der Westbindung war"],
};
const STIMMEN = [["A", "Ja – mit eigener Armee im westlichen Bündnis"], ["B", "Nein – keine deutschen Soldaten mehr"], ["C", "Nur, wenn Deutschland dafür neutral und vereint wird"]];
const WEG = ["Mai 1952: Der Deutschlandvertrag wird unterzeichnet. Er regelt die Beziehungen zwischen der Bundesrepublik und den drei Westmächten.", "Oktober 1954: Pariser Verträge.", "5. Mai 1955: Die Bundesrepublik erhält ihre volle Souveränität. Die Alliierte Hohe Kommission wird aufgelöst.", "9. Mai 1955: Die Bundesrepublik tritt der NATO bei. Die Aufstellung der Bundeswehr beginnt.", "7. Juli 1956: Einführung der allgemeinen Wehrpflicht."];
function start(){
  return `${band("Stunde 5 von 9 · Heft M35 und M36 · 90 Minuten", "Die Bindung an den Westen", "Zehn Jahre nach dem Krieg soll es wieder deutsche Soldaten geben. Der Bundeskanzler will es so. Die halbe Republik streitet.")}
  <p class="leitfrage">Sicherheit oder Einheit – was zählt mehr?</p>
  <div class="karte"><b>Am Ende kannst du …</b><ul><li>die beiden Positionen im Streit um die Westbindung erklären,</li><li>die Schritte von 1952 bis 1956 ordnen,</li><li>beurteilen, was das Wahlergebnis von 1957 über diese Politik sagt – und was nicht.</li></ul></div>
  ${abruf(["Was beanspruchten 1949 beide deutschen Regierungen?", "Wie steht das Grundgesetz zur Einheit Deutschlands? (Stichwort Präambel)"])}
  <div class="trift"><b>Der Auftrag des Grundgesetzes.</b> In der Präambel stand: Das gesamte deutsche Volk bleibt aufgefordert, in freier Selbstbestimmung die Einheit und Freiheit Deutschlands zu vollenden. Wie das erreicht werden sollte, blieb umstritten. <span class="hinweis">(nach M35)</span></div>
  ${auftrag("Allein · 3 Minuten, dann Stimmbild", "Erst festlegen", "1955. Der Krieg ist zehn Jahre her. In Korea haben von 1950 bis 1953 Ost und West gegeneinander gekämpft. Soll die Bundesrepublik wieder Soldaten haben?")}
  ${stimmkarte("stimme", STIMMEN)}
  ${textfeld("stimmgrund", "Mein wichtigster Grund", { rows:2, zaehl:false })}
  ${weiter("streit", "Los: Der Streit")}`;
}
function streit(){
  return `${zeitKopf("streit")}<h1>Zwei Wege zum selben Ziel</h1>
  ${auftrag("Zu zweit · 20 Minuten", "Wer will was – und warum?", "Lest beide Positionen. Tragt zu jeder Seite das Kernargument ein und das, was sie befürchtet. Beide wollen die Einheit – sie streiten über den Weg.")}
  <div class="zweispalt"><div>${lesetext("Die Bundesrepublik bindet sich an den Westen", HEFT.m36_a, "Unterrichtsheft, M36.")}</div>
  <div><div class="qblatt lese"><h3>Die SPD lehnt einen Verteidigungsbeitrag ab</h3><div class="qtext"><p>„${esc(HEFT.m36_spd)}“</p></div><p class="quelle">Erklärung der SPD, nach dem Unterrichtsheft, M36 (dort ohne Nachweis).</p></div>
  ${bildO("owk-s5-protest", "Protest gegen die Wiederbewaffnung der Bundesrepublik.", "Schwarz-Weiß-Foto: Junge Leute auf einem Lastwagen mit Plakaten gegen die Wiederbewaffnung.", "M36")}</div></div>
  ${tabelle("arg", ["Position", "Kernargument", "Befürchtung"], [["cdu", "CDU/CSU, Adenauer"], ["spd", "SPD, Gewerkschaften, Teile der evangelischen Kirche"]])}
  ${vergleich("arg", ["arg.cdu_0", "arg.spd_0"], 12, "Mit dem Heft vergleichen", `<p><b>CDU/CSU, Adenauer:</b> Integration in die westliche Welt, Politik der Stärke, Wiederbewaffnung, Beitritt zur NATO. Sicherheit gibt es nur an der Seite Westeuropas und der USA; nur so lässt sich die Wiedervereinigung durchsetzen.</p><p><b>SPD, Gewerkschaften:</b> Die enge Anlehnung an den Westen vertieft die Teilung und macht die Wiedervereinigung unmöglich. Kein Beitritt zur NATO.</p>`)}
  ${weiter("schritte", "Weiter: Die Schritte")}`;
}
function schritte(){
  return `${zeitKopf("schritte")}<h1>Wer setzt sich durch?</h1>
  <div class="lesepult"><div>${lesetext("Schritte zur Westintegration", HEFT.m36_b, "Unterrichtsheft, M36.")}</div>
  <aside>${bildO("owk-s5-andernach", "„Neue Armee, altes Personal“: Bundeskanzler Konrad Adenauer besucht am 20. Januar 1956 in Andernach Soldaten der neu aufgestellten Bundeswehr. Viele der Freiwilligen waren ehemalige Wehrmachtssoldaten.", "Schwarz-Weiß-Foto von oben: Drei Männer in Mänteln gehen an einer langen Reihe angetretener Soldaten mit Stahlhelmen vorbei.", "M36")}
  ${textfeld("personal", "„Neue Armee, altes Personal“ – woran aus M26 erinnert dich das?", { rows:2, zaehl:false })}</aside></div>
  ${auftrag("Allein · 6 Minuten", "Fünf Schritte", "Bring die Schritte in die richtige Reihenfolge.")}
  ${reihe("weg", WEG, [2, 4, 0, 3, 1], "Achte auf die Jahreszahlen: Erst der Vertrag, dann die Souveränität, dann das Bündnis.")}
  ${weiter("wahl", "Weiter: Das Urteil")}`;
}
function wahl(){
  return `${zeitKopf("wahl")}<h1>1957: Die Wählerinnen und Wähler urteilen</h1>
  ${auftrag("Allein · 3 Minuten", "Erst vorhersagen", "Im Wahlkampf 1957 steht die ganze bisherige Regierungspolitik zur Abstimmung. Wie geht die Wahl für Adenauer aus – und warum? Schreib deine Vorhersage.")}
  ${textfeld("tipp57", "Meine Vorhersage", { rows:2, platz:"Die CDU/CSU … weil viele Menschen …", zaehl:false })}
  ${vergleich("wahl57", ["tipp57"], 15, "Ergebnis zeigen", `${bildO("owk-s5-wahlen", "Sitzverteilung im Bundestag nach den Wahlen 1953 und 1957.", "Zwei Halbkreis-Diagramme mit der Sitzverteilung im Bundestag 1953 und 1957; die CDU/CSU hat 1953 249 und 1957 277 Sitze, die SPD 162 und 181.", "M35")}<p>${esc(HEFT.m35_wahl)}</p><p class="quelle">Unterrichtsheft, M35.</p><p><b>Prüffrage:</b> Was beweist ein Wahlsieg – und was nicht? Menschen wählen aus vielen Gründen: Wohlstand, Rente, Sicherheit. Und abstimmen konnten nur die Westdeutschen.</p>`)}
  ${auftrag("Allein · 10 Minuten", "Dein Urteil", "Sicherheit oder Einheit: Hat Adenauers Westbindung die Freiheit gesichert oder die Teilung vertieft? Vier bis sechs Sätze. Geh auch auf deine Stimme vom Anfang ein.")}
  ${textfeld("urteil", "Mein Urteil", { rows:6, anfaenge:["Die Westbindung sicherte", "Die Kritik der SPD traf zu, insofern", "Am Anfang habe ich gestimmt für", "Den Ausschlag gibt für mich"], ziel:"Ziel: 60 bis 90 Wörter" })}
  ${raster("urteil", 45, "Selbstprüfung", [["Beide Seiten", "Ich nenne eine Position.", "Ich nenne Argument und Gegenargument.", "Ich zeige, dass beide dasselbe Ziel auf verschiedenen Wegen wollten."],["Beleg", "Ich behaupte.", "Ich nenne einen Schritt oder das Wahlergebnis.", "Ich prüfe, was der Beleg zeigt und was nicht."],["Weltlage", "Ich bleibe in der Bundesrepublik.", "Ich beziehe die USA oder die Sowjetunion ein.", "Ich verbinde mit Korea-Krieg oder Warschauer Pakt."]])}
  ${weiter("landkarte", "Weiter: Landkarte")}`;
}
const SEITE_FN = { start, streit, schritte, wahl, verorten, merk, lehrkraft,
  landkarte:() => landkarte({ seite:"landkarte", titel:"„Seine Außenpolitik hatte sich durchgesetzt“", frage:"Der Satz steht am Ende von M35. Er erzählt die Westbindung als Erfolg. Was kommt in dieser Erzählung vor – und was nicht?", lead:"Was müsste man zusätzlich erzählen, damit das Bild vollständiger wird? Schreib einen Satz.", platz:"Nicht erzählt wird …", folge:FOLGE,
    urteil:lkU("2-1-4", "Wer die Westbindung als Erfolgsgeschichte erzählt, wählt aus: Verträge, Souveränität, Wahlsieg. Weniger Platz bekommen die Proteste gegen die Wiederbewaffnung, die ehemaligen Wehrmachtssoldaten in der neuen Armee und die Menschen in der DDR, für die sich die Teilung verfestigte. Jede Darstellung wählt aus – die Frage ist, nach welchem Maßstab.", { "2-1-1":"Begründbar: Wir wissen, dass 1990 die Einheit kam, und lesen die Westbindung von dort aus leicht als richtigen Weg. Gefragt war aber, was die Erzählung auswählt und weglässt.", "2-1-2":"Begründbar: Der Satz gibt die Sicht der Regierung wieder. Noch genauer trifft es das Prinzip, das die Auswahl benennt." }),
    bruecke:"<b>Für das Plenum.</b> Im Mai 1955 tritt die Bundesrepublik der NATO bei. Wenige Tage später entsteht der Warschauer Pakt. Wer reagiert hier auf wen – und wer würde das anders erzählen?", nach:["verorten", "Weiter: Verorten"] }),
};
L.merk = { frage:"Sicherheit oder Einheit – was zählt mehr?", kern:"Adenauer bindet die Bundesrepublik fest an den Westen und gewinnt dafür Souveränität. Seine Gegner fürchten, dass genau das die Teilung Deutschlands vertieft.",
  begriffe:[["Westintegration", "Einbindung der Bundesrepublik in die Bündnisse Westeuropas und der USA."],["Politik der Stärke", "Annahme: Nur ein starker Westen kann mit der Sowjetunion verhandeln."],["Wiederbewaffnung", "Aufstellung der Bundeswehr ab 1955; allgemeine Wehrpflicht ab 1956."],["Souveränität", "Volle staatliche Selbstbestimmung; die Bundesrepublik erhält sie am 5. Mai 1955 – mit Vorbehalten der Westmächte für Berlin und Deutschland als Ganzes."],["Pariser Verträge", "Verträge vom Oktober 1954; Grundlage für Souveränität und NATO-Beitritt."],["Warschauer Pakt", "Militärbündnis des Ostblocks vom Mai 1955."]],
  zeit:[["1950–1953", "Korea-Krieg"],["Mai 1952", "Deutschlandvertrag"],["Okt. 1954", "Pariser Verträge"],["5./9. Mai 1955", "Souveränität, NATO-Beitritt"],["14. Mai 1955", "Warschauer Pakt"],["1957", "Absolute Mehrheit für Adenauer"]],
  werkzeug:"<b>Auswahl prüfen:</b> Was wird erzählt? Was fehlt? Wem nützt diese Auswahl? Welche Quelle müsste ich zusätzlich lesen?",
  mein:[["Meine Stimme am Anfang", () => S.stimme ? S.stimme + " – " + (STIMMEN.find(x => x[0] === S.stimme) || ["", ""])[1] + ". " + S.stimmgrund : ""],["Meine Vorhersage für 1957", "tipp57"],["Mein Urteil", "urteil"]] };
L.lk = { ablauf:[["0–10", "Abruf, Stimmkarte", "allein, Plenum", "Stimme A/B/C groß zeigen, Lehrkraft zählt."],["10–30", "Der Streit", "zu zweit", "Zwei Positionen lesen, Tabelle, Vergleich mit M35."],["30–45", "Die Schritte", "allein", "Text M36, Foto Andernach, fünf Schritte ordnen."],["45–65", "Das Urteil", "allein, Plenum", "Vorhersage 1957, Ergebnis, eigenes Urteil."],["65–73", "Landkarte", "allein", "Selektivität."],["73–90", "Verorten und vernetzen", "allein", "Karten 7 (Korea-Krieg) und 8 (Warschauer Pakt)."]],
  muster:["Denkhandlung: abwägen und beurteilen.", "Muster 12 (Stimmkarte) für die Festlegung, Muster 4 (Reihen) für die Schritte, Muster 1/10 (Vorhersage → Auflösung, Urteil mit Raster).", "Papier bleibt besser für: die Debatte zwischen den beiden Positionen."],
  erwartung:["Tabelle wie im Lösungsblatt M35.", "Reihenfolge: 1952 Deutschlandvertrag, 1954 Pariser Verträge, 5. Mai 1955, 9. Mai 1955, 7. Juli 1956.", "Urteil: beide Richtungen vertretbar; stark ist, wer den Wahlsieg nicht als Beweis für die Richtigkeit nimmt."],
  heft:["Im Heft tragen zwei Blätter die Nummer M36 (Westintegration und Fluchtbewegung); die Seite nennt die Westintegration M35/M36.", "Die Lesefassung des Museumstextes (LeMO) steht bei Stunde 4.", "Neu: Stimmkarte am Anfang und Vorhersage zur Wahl 1957 vor dem Ergebnis.", "Die Sitzzahlen im Alternativtext des Wahldiagramms sind aus dem Bild im Heft abgelesen – bitte prüfen.", "Das Zitat der SPD hat im Heft keinen Nachweis."],
  nurdu:["Nachweis für das SPD-Zitat ergänzen.", "Entscheiden, ob die Stalin-Note von 1952 zusätzlich besprochen wird (nicht im Heft)."] };
stundeStart();
