/* ===== Stunde 4: Die doppelte Staatsgründung – Perspektivität (Heft M34) ===== */
const L = {
  sid:"s4", key:"ggk-owk-s4:v1", nr:"Stunde 4", titel:"Die doppelte Staatsgründung", unter:"Zwei Regierungserklärungen, Oktober 1949", mark:OWK_MARK,
  seiten:[["start","",""],["weg","18 Min.","Der Weg"],["grotewohl","15 Min.","Grotewohl"],["adenauer","15 Min.","Adenauer"],["spiegel","15 Min.","Vergleich"],["landkarte","8 Min.","Landkarte"],["verorten","10 Min.","Verorten"],["merk","","Merkseite"]],
  breit:["weg","grotewohl","adenauer","spiegel","verorten","lehrkraft"],
  loesch:"Alle Eingaben dieser Stunde werden auf diesem Gerät entfernt. Verbindungen und der Satz im roten Faden bleiben in der Übersicht der Einheit.",
  init:() => ({ abruf:{}, karikatur:"", bezug:"", jetzt:"", v:VINIT() }),
  fadenAnf:["Die Ideologien der Supermächte zeigen sich 1949 in Deutschland darin, dass", "Handlungsspielraum hatten deutsche Politiker", "Beide Regierungen behaupteten"],
};
const ST4 = [["a","▲","Das sagt er über den eigenen Staat"],["b","●","Das sagt er über den anderen Staat"]];
const QUELLEN = {
  lemo:{ titel:"Darstellung · Der Weg zu zwei Staaten", kopf:"Ein Museumstext von heute fasst die Jahre 1945 bis 1949 zusammen.", stifte:[["a","▲","Entscheidung der Westmächte"],["b","●","Entscheidung der Sowjetunion"]], abs:[[null, HEFT.lemo.slice(0, 3)], [null, HEFT.lemo.slice(3, 8)], [null, HEFT.lemo.slice(8)]], nachweis:"Markus Würz: Doppelte Staatsgründung, in: Lebendiges Museum Online, Stiftung Haus der Geschichte der Bundesrepublik Deutschland. Text nach dem Unterrichtsheft, M34 und M36." },
  grotewohl:{ titel:"Quelle 1 · Otto Grotewohl, Regierungserklärung vom 12. Oktober 1949", kopf:"Otto Grotewohl gehörte der SED an und war der erste Ministerpräsident der DDR. Er spricht vor der Provisorischen Volkskammer.", stifte:ST4, abs:[[null, HEFT.grotewohl.slice(0, 2)], [null, HEFT.grotewohl.slice(2, 7)], [null, HEFT.grotewohl.slice(7)]], nachweis:"Aus: Johannes Hohlfeld (Hg.): Dokumente der Deutschen Politik und Geschichte von 1848 bis zur Gegenwart. Band VI. Berlin o. J., S. 435 ff. Text nach dem Unterrichtsheft, M34." },
  adenauer:{ titel:"Quelle 2 · Konrad Adenauer, Regierungserklärung vom 21. Oktober 1949", kopf:"Konrad Adenauer war Vorsitzender der CDU und von 1949 bis 1963 der erste Bundeskanzler. Er spricht vor dem Deutschen Bundestag.", stifte:ST4, abs:[[null, HEFT.adenauer.slice(0, 2)], [null, HEFT.adenauer.slice(2, 7)], [null, HEFT.adenauer.slice(7)]], nachweis:"Aus: Stenografische Berichte, 1. Deutscher Bundestag, Bd. 1, S. 307–309. Text nach dem Unterrichtsheft, M34." },
};
const WER = [
  ["Die Regierung in Bonn.", "begruendbar", "Adenauer begründet das mit der Wahl vom 14. August 1949. Bedenke: Gewählt wurde nur in den drei Westzonen – und der Staat entstand unter Aufsicht der Westmächte."],
  ["Die Regierung in Ost-Berlin.", "kaum", "Grotewohl beruft sich auf eine „Volksbewegung“. Eine freie Wahl hatte es in der sowjetischen Zone aber nicht gegeben; die Wahl zur Volkskammer wurde auf 1950 verschoben."],
  ["Jede nur für ihren Teil.", "begruendbar", "Das ist die Lage, wie sie tatsächlich war – aber keine der beiden Regierungen hat sie 1949 so anerkannt. Beide erhoben den Anspruch auf das ganze Deutschland."],
  ["Keine von beiden.", "begruendbar", "Dafür spricht: Beide Staaten entstanden unter der Aufsicht von Besatzungsmächten. Dagegen: Die Menschen brauchten eine Vertretung, und nur im Westen wurde sie gewählt."],
];
function start(){
  return `${band("Stunde 4 von 9 · Heft M34 · 90 Minuten", "Die doppelte Staatsgründung", "Herbst 1949. Innerhalb weniger Wochen entstehen zwei deutsche Staaten. Jede Regierung erklärt, sie allein spreche für Deutschland.")}
  <p class="leitfrage">Wer darf 1949 für Deutschland sprechen?</p>
  <div class="karte"><b>Am Ende kannst du …</b><ul><li>die Schritte nennen, die zur Teilung führten,</li><li>zeigen, wie Grotewohl und Adenauer den eigenen und den anderen Staat beschreiben,</li><li>die beiden Reden mit den Reden von Truman und Shdanow verbinden.</li></ul></div>
  ${abruf(["Wie endete die Berlin-Blockade – und was änderte sie im Westen?", "Welche Maßnahmen bauten die sowjetische Zone um? Nenne zwei."])}
  ${auftrag("Allein · 3 Minuten", "Erst festlegen", "Bevor du die Reden kennst: Welche Regierung darf deiner Meinung nach für ganz Deutschland sprechen?")}
  <div class="karte">${gWahl("wer", "Wer darf 1949 für ganz Deutschland sprechen?", WER, { platz:"Ich finde das, weil …" })}</div>
  ${weiter("weg", "Los: Der Weg")}`;
}
function weg(){
  return `${zeitKopf("weg")}<h1>Der Weg zu zwei Staaten</h1>
  ${bildO("owk-s4-goldfisch", "„Die vier Großmächte und der deutsche Goldfisch“. Karikatur von STIG (Roland Stigulinszky), in: Der Tintenfisch, Saarbrücken 1948.", "Karikatur in vier Bildern: Vier Soldaten der Besatzungsmächte stehen jeweils an einem Goldfischglas mit einem kleinen Fisch. Jeder geht anders mit dem Fisch um und sagt einen kurzen Satz.", "M34", { nachweis:"Aus: Der Tintenfisch. Das humoristische Blatt des Saarlandes, 1948." })}
  ${auftrag("Zu zweit · 6 Minuten", "Die Karikatur", "Beschreibt, was die vier mit dem Goldfisch tun. Welche Absichten der Siegermächte leitet der Zeichner daraus ab – und wie sieht er Deutschland im September 1948?")}
  ${textfeld("karikatur", "Der Zeichner zeigt Deutschland als", { rows:3, zaehl:false })}
  ${auftrag("Allein · 10 Minuten", "Wer hat was entschieden?", "Markiere im Text die Ereignisse und Entscheidungen, die zur Teilung führten: mit dem Dreieck Entscheidungen der Westmächte, mit dem Punkt Entscheidungen der Sowjetunion.")}
  ${quelle("lemo")}${belege(["lemo"], { ta:"Westmächte", tb:"Sowjetunion" })}
  ${weiter("grotewohl", "Weiter: Grotewohl")}`;
}
const rede = (id, nach, text) => `${zeitKopf(id)}<h1>${id === "grotewohl" ? "Die Sicht aus Ost-Berlin" : "Die Sicht aus Bonn"}</h1>
  ${auftrag("Allein · 15 Minuten", "Mit zwei Stiften lesen", "Markiere mit dem Dreieck, was der Redner über den Staat sagt, den er selbst vertritt. Markiere mit dem Punkt, was er über den anderen Teil Deutschlands behauptet. Wähle je einen Satz, der dir besonders aussagekräftig erscheint.")}
  <div class="lesepult"><div>${quelle(id)}</div><aside>${belege([id], { ta:"Der eigene Staat", tb:"Der andere Staat" })}${text}</aside></div>
  ${weiter(nach[0], nach[1])}`;
function spiegel(){
  const n = markZahl(["grotewohl", "adenauer"]), w = S.wahl.wer || {};
  return `${zeitKopf("spiegel")}<h1>Zwei Staaten, ein Anspruch</h1>
  <div class="zweispalt"><div><h3 class="klein" style="margin-top:0">Grotewohl</h3>${belege(["grotewohl"], { ta:"Der eigene Staat", tb:"Der andere Staat" })}</div><div><h3 class="klein" style="margin-top:0">Adenauer</h3>${belege(["adenauer"], { ta:"Der eigene Staat", tb:"Der andere Staat" })}</div></div>
  ${n < 4 ? `<p class="hinweis">Du hast erst ${n} Sätze markiert. Markiere in jeder Rede mindestens zwei.</p>` : ""}
  ${auftrag("Zu zweit · 8 Minuten", "Die Reden verbinden", "Wie verhalten sich die beiden Reden zueinander? Und welche Sätze könnten fast wörtlich bei Truman oder bei Shdanow stehen (Stunde 2)?")}
  ${textfeld("bezug", "Beziehung der Reden zueinander und zu den Ideologien der USA und der Sowjetunion", { rows:5, anfaenge:["Beide Redner sprechen dem anderen Staat ab, dass", "Grotewohls Vorwurf erinnert an Shdanow, weil", "Adenauers Begründung erinnert an Truman, weil"], ziel:"Ziel: 50 bis 80 Wörter" })}
  ${raster("bezug", 40, "Selbstprüfung", [["Vergleich", "Ich beschreibe eine Rede.", "Ich nenne eine Gemeinsamkeit und einen Unterschied.", "Ich zeige, dass beide dasselbe Muster nutzen: eigene Legitimität, fremde Abhängigkeit."],["Beleg", "Ich behaupte.", "Ich zitiere je einen Satz.", "Ich zitiere und erkläre, was der Satz leisten soll."],["Vernetzung", "Ich bleibe im Jahr 1949.", "Ich verbinde eine Rede mit Truman oder Shdanow.", "Ich verbinde beide und erkläre, warum deutsche Politiker die Sprache der Supermächte sprechen."]])}
  ${auftrag("Allein · 3 Minuten", "Zurück zu deiner Festlegung", w.zu ? "Am Anfang hast du gewählt: „" + esc(WER[w.o][0]) + "“ Was denkst du jetzt – und warum?" : "Am Anfang solltest du dich festlegen. Hol das nach und schreib dann, was du jetzt denkst.")}
  ${textfeld("jetzt", "Was ich jetzt denke", { rows:2, zaehl:false })}
  ${weiter("landkarte", "Weiter: Landkarte")}`;
}
const SEITE_FN = { start, weg, spiegel, verorten, merk, lehrkraft,
  grotewohl:() => rede("grotewohl", ["adenauer", "Weiter: Adenauer"], `<div class="karte"><b>Wörter an der Quelle</b><ul style="padding-left:1.1rem;margin:.3rem 0 0;font-size:.95rem"><li><b>Separatregierung, Sonderstaat:</b> ein Staat, der sich vom Ganzen abgespalten hat.</li><li><b>Besatzungsstatut:</b> Regelung von 1949, mit der sich die Westmächte Rechte in der Bundesrepublik vorbehielten.</li><li><b>Wechselbalg:</b> im Volksglauben ein untergeschobenes Kind; hier: etwas Unechtes.</li></ul></div>`),
  adenauer:() => rede("adenauer", ["spiegel", "Weiter: Vergleich"], `<div class="karte"><b>Wörter an der Quelle</b><ul style="padding-left:1.1rem;margin:.3rem 0 0;font-size:.95rem"><li><b>Satellitenstaat:</b> ein Staat, der von einer Großmacht abhängig ist.</li><li><b>Volksrat:</b> von der SED gelenktes Gremium, aus dem die Provisorische Volkskammer hervorging.</li><li><b>legitim:</b> rechtmäßig, anerkannt.</li></ul></div>`),
  landkarte:() => landkarte({ seite:"landkarte", titel:"Zwei Hauptstädte, zwei Wahrheiten", frage:"Grotewohl spricht in Ost-Berlin unter sowjetischer Besatzung, Adenauer in Bonn unter westlicher. Wie prägt das, was beide für wahr halten?", lead:"Warum kommt keiner der beiden auf die Idee, der eigene Staat könnte abhängig sein? Schreib einen Satz.", platz:"Jeder der beiden steht …", folge:FOLGE,
    urteil:lkU("2-1-8", "Beide Redner sind durch den Ort geprägt, an dem sie stehen: durch die Besatzungsmacht, das politische System, die eigene Partei. Von dort aus erscheint der eigene Staat als frei und der andere als fremdbestimmt – oft, ohne dass es den Sprechern bewusst ist. Das gilt auch für uns: Wir lesen beide Reden von heute aus und aus der Bundesrepublik.", { "2-1-2":"Begründbar: Beide Reden zeigen eine Sichtweise mit Interessen. Gefragt war aber, woher diese Sichtweise kommt – aus dem Standort in einem geteilten Land.", "2-1-9":"Begründbar: Deshalb liest du beide Reden. Das ist die Folge; gefragt ist das Prinzip dahinter." }),
    bruecke:"<b>Für das Plenum.</b> Von welchem Standort aus habt ihr am Anfang entschieden, wer für Deutschland sprechen darf? Hätte ein Kurs in Leipzig 1985 genauso abgestimmt?", nach:["verorten", "Weiter: Verorten"] }),
};
L.merk = { frage:"Wer darf 1949 für Deutschland sprechen?", kern:"1949 entstehen zwei deutsche Staaten. Beide Regierungen beanspruchen, für das ganze Deutschland zu sprechen – und beschreiben den anderen Staat als Geschöpf fremder Mächte.",
  begriffe:[["Doppelte Staatsgründung", "Gründung der Bundesrepublik (23. Mai 1949) und der DDR (7. Oktober 1949)."],["Grundgesetz", "Verfassung der Bundesrepublik, als Provisorium bis zur Einheit gedacht."],["Volkskammer", "Parlament der DDR; 1949 zunächst „provisorisch“, ohne Wahl gebildet."],["Alleinvertretungsanspruch", "Anspruch der Bundesrepublik, als einziger frei gewählter Staat für alle Deutschen zu sprechen."],["Separatstaat", "Vorwurf der DDR an die Bundesrepublik: Sie habe Deutschland gespalten."],["Legitimität", "Rechtmäßigkeit einer Herrschaft – 1949 von beiden Seiten für sich beansprucht."]],
  zeit:[["Frühjahr 1948", "Die Vier-Mächte-Verwaltung scheitert"],["Juni 1948", "Währungsreform, Blockade"],["23. Mai 1949", "Grundgesetz: Bundesrepublik Deutschland"],["14. Aug. 1949", "Wahl zum ersten Bundestag"],["7. Okt. 1949", "Gründung der DDR"]],
  werkzeug:"<b>Standort prüfen:</b> Wo steht die Person, die spricht – in welchem Staat, welchem System, welcher Zeit? Was kann sie von dort aus sehen, was nicht? Und wo stehe ich?",
  mein:[["Am Anfang gewählt", () => (S.wahl.wer || {}).zu ? WER[S.wahl.wer.o][0] + " – " + (S.wahl.wer.grund || "") : ""],["Die Reden und die Ideologien der Supermächte", "bezug"],["Was ich jetzt denke", "jetzt"]] };
stundeStart();
