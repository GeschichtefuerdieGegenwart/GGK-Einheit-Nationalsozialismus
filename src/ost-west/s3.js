/* ===== Stunde 3: Die Berlin-Blockade und die sowjetische Zone (Heft M32, M33) ===== */
const L = {
  sid:"s3", key:"ggk-owk-s3:v1", nr:"Stunde 3", titel:"Die Berlin-Blockade und die sowjetische Zone", unter:"1945 bis 1949", mark:OWK_MARK,
  seiten:[["start","",""],["krise","12 Min.","Entscheiden"],["ablauf","20 Min.","Ablauf"],["sbz","20 Min.","Sowjetische Zone"],["landkarte","8 Min.","Landkarte"],["verorten","12 Min.","Verorten"],["merk","","Merkseite"]],
  breit:["ablauf","sbz","verorten","lehrkraft"],
  loesch:"Alle Eingaben dieser Stunde werden auf diesem Gerät entfernt. Verbindungen und der Satz im roten Faden bleiben in der Übersicht der Einheit.",
  init:() => ({ abruf:{}, reihe:{}, folge:"", sbz:{}, sbzziel:"", v:VINIT() }),
  fadenAnf:["Machtinteressen zeigten sich in Berlin darin, dass", "Handlungsspielraum hatten 1948", "Für die Deutschen im Westen änderte sich"],
};
const KRISE = [
  ["West-Berlin aufgeben und die Truppen abziehen.", "kaum", "Das wurde erwogen und verworfen. Die Befürchtung: Wer in Berlin nachgibt, verliert das Vertrauen der Westdeutschen und der Verbündeten in ganz Europa."],
  ["Mit einem bewaffneten Konvoi die Zufahrt über die Autobahn erzwingen.", "kaum", "Der Vorschlag kam vom amerikanischen Militärgouverneur Lucius D. Clay. Er wurde abgelehnt: Ein Schusswechsel hätte einen Krieg mit der Sowjetunion auslösen können."],
  ["Die Währungsreform in West-Berlin zurücknehmen und verhandeln.", "begruendbar", "Verhandelt wurde tatsächlich monatelang – ohne Ergebnis. Die neue Währung nahmen die Westmächte nicht zurück, weil sie der Kern ihres Plans für einen westdeutschen Staat war."],
  ["Die Stadt aus der Luft versorgen und abwarten.", "zentral", "So kam es. Die Luftkorridore waren vertraglich gesichert; ein Flugzeug abzuschießen, hätte die Sowjetunion zur Angreiferin gemacht. Ob sich zwei Millionen Menschen aus der Luft versorgen lassen, wusste im Juni 1948 aber niemand."],
];
const SCHRITTE = ["Die Westmächte beschließen, ihre Zonen wirtschaftlich an Westeuropa anzuschließen und Länderregierungen zu bilden. Die Sowjetunion sieht darin einen Bruch des Potsdamer Abkommens.", "Währungsreform in den Westzonen (20./21. Juni 1948). Die Sowjetunion führt in ihrer Zone ebenfalls eine neue Währung ein. Die Westmächte führen die D-Mark auch in West-Berlin ein.", "Die Sowjetunion sperrt alle Straßen, Schienen und Wasserwege nach West-Berlin. Auch Strom, Kohle und Lebensmittel werden nicht mehr geliefert.", "Die USA und Großbritannien richten eine Luftbrücke ein. Über zehn Monate landet im Durchschnitt alle drei Minuten ein Flugzeug.", "Am 12. Mai 1949 hebt die Sowjetunion die Blockade auf."];
const SBZ = [["zv","Zentralverwaltungen"],["boden","Bodenreform"],["wirt","Verstaatlichung der Wirtschaft"],["sed","KPD + SPD = SED"],["ulbricht","Gruppe Ulbricht"]];
function start(){
  return `${band("Stunde 3 von 9 · Heft M32 und M33 · 90 Minuten", "Die Berlin-Blockade", "Juni 1948. Aus Worten und Bündnissen wird zum ersten Mal eine Kraftprobe – mitten in Deutschland, in einer Stadt mit vier Sektoren.")}
  <p class="leitfrage">Wie wurden aus Besatzern Beschützer?</p>
  <div class="karte"><b>Am Ende kannst du …</b><ul><li>den Ablauf der Blockade in fünf Schritten erklären,</li><li>zeigen, wie die sowjetische Zone umgebaut wurde,</li><li>begründen, warum sich das Verhältnis zwischen Siegern und Besiegten im Westen veränderte.</li></ul></div>
  ${abruf(["Welche zwei Reden von 1947 stehen für die Spaltung der Welt? Was sagen sie?", "Was war der Marshallplan – und wer durfte ihn nicht annehmen?"])}
  ${weiter("krise", "Los: Entscheiden")}`;
}
function krise(){
  return `${zeitKopf("krise")}<h1>24. Juni 1948</h1>
  <div class="karte"><p><b>Die Lage.</b> Berlin liegt mitten in der sowjetischen Zone und ist in vier Sektoren geteilt. In der Nacht sperren sowjetische Truppen alle Straßen, Bahnlinien und Wasserwege in die drei Westsektoren. Strom und Lebensmittel aus dem Umland kommen nicht mehr an. In West-Berlin leben über zwei Millionen Menschen. Frei bleiben nur drei Luftkorridore, die 1945 schriftlich vereinbart wurden.</p></div>
  ${auftrag("Allein · 5 Minuten, dann Stimmbild im Kurs", "Erst entscheiden", "Du berätst die Regierungen der USA und Großbritanniens. Was rätst du? Wähle und begründe in einem Satz. Danach siehst du, was aus jedem Vorschlag wurde.")}
  <div class="karte">${gWahl("krise", "Was sollen die Westmächte tun?", KRISE, { platz:"Ich rate dazu, weil das Risiko …" })}</div>
  <p class="hinweis">Im Plenum: Welche Option habt ihr am häufigsten gewählt? Welches Risiko habt ihr dabei in Kauf genommen?</p>
  ${weiter("ablauf", "Weiter: Ablauf")}`;
}
function ablauf(){
  return `${zeitKopf("ablauf")}<h1>Wie es dazu kam – und wie es ausging</h1>
  <div class="lesepult"><div>${lesetext("Die Berliner Blockade 1948/49", HEFT.m32, "Unterrichtsheft, M32.")}</div>
  <aside>${bildO("owk-s3-luftbruecke", "Ein Flugzeug der Luftbrücke im Landeanflug auf West-Berlin.", "Schwarz-Weiß-Foto: Ein viermotoriges Flugzeug fliegt tief über eine Gruppe von Menschen, die auf einem Trümmerhügel stehen und hinaufschauen.", "M32")}</aside></div>
  ${auftrag("Allein · 8 Minuten", "Fünf Schritte", "Bring die fünf Schritte in die richtige Reihenfolge. Tippe an, was zuerst geschah.")}
  ${reihe("blockade", SCHRITTE, [3, 0, 4, 2, 1], "Lies im Text nach: Was war die Antwort worauf?")}
  ${auftrag("Zu zweit · 5 Minuten", "Sieger und Besiegte", "Inwiefern veränderten die Ereignisse das Verhältnis zwischen Siegern und Besiegten?")}
  ${textfeld("folge", "Das Verhältnis veränderte sich, weil", { rows:3, zaehl:false })}
  ${weiter("sbz", "Weiter: Sowjetische Zone")}`;
}
function sbz(){
  return `${zeitKopf("sbz")}<h1>Währenddessen in der sowjetischen Zone</h1>
  ${auftrag("Zu zweit · 20 Minuten", "Fünf Maßnahmen, ein Ziel", "Lest den Text. Tragt zu jeder Maßnahme ein, was geschah. Formuliert dann das Ziel, das alle fünf verbindet.")}
  <div class="lesepult"><div>${lesetext("Die Entwicklung in der sowjetischen Besatzungszone", HEFT.m33, "Unterrichtsheft, M33.")}</div>
  <aside class="fragenspalte">${tabelle("sbz", ["Maßnahme", "Was geschah?"], SBZ)}
  ${textfeld("sbzziel", "Ziel dieser Maßnahmen", { rows:2, zaehl:false })}
  ${vergleich("sbz", ["sbz.zv", "sbz.boden", "sbz.wirt", "sbz.sed", "sbzziel"], 10, "Mit dem Heft vergleichen", `<p><b>Zentralverwaltungen:</b> für Wirtschaft, Justiz, Volksbildung; die Länder verlieren ihre Eigenständigkeit. <b>Bodenreform:</b> Enteignung von Gütern und Großbetrieben ohne Entschädigung, Verteilung an Bauern. <b>Verstaatlichung:</b> Banken, Versicherungen, Fabriken und Bergwerke werden enteignet – es entstehen Volkseigene Betriebe. <b>SED:</b> Vereinigung von KPD und SPD im April 1946, damit die Kommunisten die SPD kontrollieren. <b>Gruppe Ulbricht:</b> Kommunisten, die ab Mai 1945 eine kommunistische Ordnung aufbauen.</p><p><b>Ziel:</b> Durchsetzung einer sozialistischen Gesellschaftsordnung. – Prüft: Welches Wort im Text zeigt, dass das nach außen anders aussehen sollte?</p>`)}</aside></div>
  ${weiter("landkarte", "Weiter: Landkarte")}`;
}
const SEITE_FN = { start, krise, ablauf, sbz, verorten, merk, lehrkraft,
  landkarte:() => landkarte({ seite:"landkarte", titel:"„Luftbrücke“ – eine Geschichte mit Wendepunkt", frage:"Im Westen wird die Blockade bis heute als Geschichte erzählt: Aus Besatzern wurden Freunde. Was macht diese Erzählung mit den Ereignissen?", lead:"Was gehört zu dieser Geschichte – und was kommt in ihr nicht vor? Schreib einen Satz.", platz:"Erzählt wird vor allem …", folge:FOLGE,
    urteil:lkU("2-1-6", "Die Blockade ist uns als Erzählung überliefert: mit einem Anfang (Sperrung), Helden (Piloten), einem Wendepunkt und einem guten Ende. Wörter wie „Luftbrücke“ oder „Rosinenbomber“ tragen diese Erzählung. Sie ordnet die Ereignisse – und lässt anderes zurücktreten, etwa die Sicht der Sowjetunion auf die Währungsreform.", { "2-1-2":"Begründbar: Die Erzählung ist die westliche Sicht; die Sowjetunion sprach vom Bruch des Potsdamer Abkommens. Gefragt war aber, was es bedeutet, dass die Ereignisse als Geschichte mit Wendepunkt erzählt werden.", "2-1-4":"Begründbar: Die Erzählung wählt aus, was zu ihr passt. Noch genauer trifft es das Prinzip, das die Form der Erzählung selbst benennt." }),
    bruecke:"<b>Für das Plenum.</b> Wie würde dieselbe Geschichte in einem Schulbuch der DDR beginnen? Merkt euch die Frage für Stunde 7.", nach:["verorten", "Weiter: Verorten"] }),
};
L.merk = { frage:"Wie wurden aus Besatzern Beschützer?", kern:"In Berlin stoßen 1948 die Pläne für einen Weststaat und der sowjetische Anspruch auf die ganze Stadt aufeinander. Die Luftbrücke macht die Westmächte für viele Deutsche zu Schutzmächten.",
  begriffe:[["Währungsreform", "Einführung der D-Mark in den Westzonen am 20./21. Juni 1948, wenig später auch in West-Berlin."],["Blockade", "Sperrung aller Land- und Wasserwege nach West-Berlin durch die Sowjetunion, Juni 1948 bis Mai 1949."],["Luftbrücke", "Versorgung West-Berlins aus der Luft durch die USA und Großbritannien."],["SBZ", "Sowjetische Besatzungszone."],["Bodenreform", "Enteignung von Großgrundbesitz ohne Entschädigung in der SBZ."],["SED", "Sozialistische Einheitspartei Deutschlands; 1946 aus KPD und SPD in der SBZ gebildet."]],
  zeit:[["April 1946", "KPD und SPD werden in der SBZ zur SED"],["20./21. Juni 1948", "Währungsreform im Westen"],["24. Juni 1948", "Beginn der Blockade"],["12. Mai 1949", "Ende der Blockade"]],
  werkzeug:"<b>Kette prüfen:</b> Was war Aktion, was Reaktion? Wer sah welchen Schritt als Bruch einer Abmachung? Wo hätte die Kette anders weitergehen können?",
  mein:[["Mein Rat am 24. Juni 1948", () => (S.wahl.krise || {}).zu ? KRISE[S.wahl.krise.o][0] + " – " + (S.wahl.krise.grund || "") : ""],["Sieger und Besiegte", "folge"],["Ziel der Maßnahmen in der sowjetischen Zone", "sbzziel"]] };
L.lk = { ablauf:[["0–8", "Abruf", "allein", "Zwei Reden, Marshallplan."],["8–20", "Entscheiden", "allein, Plenum", "Lage am 24. Juni 1948, vier Optionen, Stimmbild."],["20–40", "Ablauf", "allein, zu zweit", "M32 lesen, fünf Schritte ordnen, Frage zu Siegern und Besiegten."],["40–60", "Sowjetische Zone", "zu zweit", "M33: fünf Maßnahmen, ein Ziel; Vergleich mit dem Heft."],["60–68", "Landkarte", "allein", "Narrativität."],["68–80", "Verorten und vernetzen", "allein", "Karte 5."],["80–90", "Plenum", "Plenum", "Roter Faden vorlesen: Ideologie oder Machtinteresse?"]],
  muster:["Denkhandlung: entscheiden unter Unsicherheit; Abfolge erklären.", "Muster 7 (Entscheidung vor der Auflösung), Muster 4 (Reihen) für die fünf Schritte, Muster 10 (eigener Eintrag → Vergleich) für M33.", "Papier bleibt besser für: das Schaubild zum Ablauf, wenn du es an der Tafel entwickeln willst."],
  erwartung:["Fünf Schritte wie im Lösungsblatt zu M32.", "Verhältnis: starke Stimmung gegen die Sowjetunion und den Kommunismus, Sympathie für Amerikaner und Briten.", "M33: Lösung wie im Heft; Schlüsselwort für die Fassade: „Es muss demokratisch aussehen, aber wir müssen alles in der Hand haben.“"],
  heft:["Vor dem Text steht eine Entscheidung aus Sicht der Westmächte. Die Angaben zu den vier Optionen (Abzug erwogen, Konvoi-Vorschlag von Clay, Verhandlungen, Luftbrücke) stammen nicht aus dem Heft – bitte prüfen.", "Der Ablauf wird geordnet statt frei formuliert; das Schaubild bleibt als Tafelbild möglich.", "Die Wiederholungskarten zu Sozialismus und Kapitalismus (Lexikon von hanisauland.de) sind nicht übernommen; beide Begriffe stehen im Glossar der Einheit.", "Im Text M33 sind die ersten Sätze beider Spalten nach dem Druckbild ergänzt, weil sie im Heft von einem Textkasten überlagert sind – bitte am Original prüfen."],
  nurdu:["Den Text M33 gegen das Original im Heft lesen."] };
stundeStart();
