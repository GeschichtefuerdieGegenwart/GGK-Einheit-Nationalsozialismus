/* ===== M5 · Die doppelte Ausrufung der Republik (Heft „Geschichte aktuell 1“, M5, M5.1–M5.3) ===== */
const L = {
  wid:"m05", key:"ggk-w-m05:v1", nr:"M5", titel:"Die doppelte Ausrufung der Republik", unter:"Novemberrevolution 1918 · Welche Republik?", dauer:90, block:"b",
  /* Zeichen der Stunde: zwei Fahnen an einem Mast */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><path d="M17 4v27" stroke="#24221F" stroke-width="2.4" stroke-linecap="round"/><path d="M17 6h11l-3 4 3 4H17z" fill="#24221F"/><path d="M17 16H6l3 4-3 4h11z" fill="#9B402D"/></svg>`,
  frage:"Der Kaiser ist fort, der Krieg verloren: Welche Republik soll es werden – und welche hättest du unterstützt?",
  deck:{ dauer:"Doppelstunde · 90 Minuten", jahr:"9.11.1918", hier:[1],
    satz:"Am 9. November 1918 wird in Berlin zweimal die Republik ausgerufen – um 14 Uhr und um 16 Uhr. Gemeint sind zwei verschiedene Staaten.",
    bild:{ datei:"heft-m05-berlin-november-1918.jpg", alt:"Bewaffnete Soldaten und Matrosen auf einem Lastwagen vor dem Brandenburger Tor in Berlin, November 1918.", text:"Berlin, November 1918: Revolutionäre vor dem Brandenburger Tor.", nachweis:"Bild aus dem Unterrichtsheft, M5.3. Nachweis offen." },
    ziele:["die Ziele von Ebert, Luxemburg, Hindenburg und Wilhelm II. im November 1918 benennen und vergleichen,", "den Unterschied zwischen parlamentarischer Demokratie und Räterepublik genau erklären,", "ein eigenes Urteil fällen – mit dem Wissen von damals – und es später überprüfen."] },
  blatt:[
    { id:"erinnern", nr:"1", kurz:"Erst erinnern", name:"Erst erinnern: Was war in M4?", form:"Allein · ohne Heft", min:4, frei:"offen" },
    { id:"vier", nr:"2", kurz:"Vier Menschen", name:"Vier Menschen, vier Ziele", form:"Zu zweit", min:15, frei:"offen" },
    { id:"reden", nr:"3", kurz:"Zwei Reden", name:"Zwei Reden an einem Nachmittag", form:"Allein, dann zu zweit", min:15, frei:"offen" },
    { id:"abstimmung", nr:"4", kurz:"Abstimmung", name:"Stimm ab: Welche Republik?", form:"Allein, dann Plenum", min:8, frei:"antwort", nach:"reden", fehlt:"Lies erst die beiden Reden in Auftrag 3 und schreib deine zwei Sätze." },
    { id:"film", nr:"5", kurz:"Wer setzt sich durch?", name:"Welche Republik setzt sich durch?", form:"Plenum, dann allein", min:20, frei:"ansage", gleich:"Ein Film zeigt, wie der Streit zwischen Friedrich Ebert und Rosa Luxemburg ausgeht. Vorher stimmt die Klasse ab." },
    { id:"landkarte", nr:"L", kurz:"Landkarte", name:"Landkarte: Warum fiel die Entscheidung damals schwerer?", form:"Allein", min:6, frei:"antwort", nach:"film", fehlt:"Bearbeite erst Auftrag 5." },
    { id:"schreiben", nr:"6", kurz:"Schreibauftrag", name:"Schreibauftrag", form:"Allein", min:15, frei:"ansage", marke:"wie in der Klassenarbeit", gleich:"Du erklärst die beiden Republiken an den zwei Reden – so, wie es in der Klassenarbeit verlangt wird." },
    { id:"rueckblick", nr:"7", kurz:"Rückblick", name:"Rückblick: Was denkst du jetzt?", form:"Allein, dann Plenum", min:3, frei:"antwort", nach:"schreiben", fehlt:"Schreib erst deinen Text in Auftrag 6." },
    { id:"zusammenfassung", nr:"Z", kurz:"Zusammenfassung", name:"Zusammenfassung", form:"Zum Abheften", min:4, frei:"antwort", nach:"schreiben", fehlt:"Die Zusammenfassung enthält die Auflösung. Sie öffnet sich nach deinem Text in Auftrag 6.", kopf:"Zum Abheften" },
  ],
  breit:["lehrkraft"],
  loesch:"Deine Antworten, Markierungen, deine Stimme, dein Text und dein Satz für den roten Faden werden auf diesem Gerät entfernt.",
  init:() => ({ ab:{}, p:{}, wer:null, wergrund:"", s1:"", s2:"", stimme:null, stimmgrund:"", wf:{}, rep:null, ebert:"", neu:"" }),
  erledigt:{
    erinnern:() => [0,1,2].every(i => (S.ab.auf || {})[i]), vier:() => !!S.wer && lang("wergrund"), reden:() => lang("s1") && lang("s2"),
    abstimmung:() => !!S.stimme && lang("stimmgrund"), film:() => wfFertig("wf", 4) && !!S.rep && lang("ebert"), landkarte:() => !!S.lk.ok,
    schreiben:() => schreibFertig(), rueckblick:() => lang("neu"),
  },
  fadenAnf:["Die Revolution von 1918 zeigt, dass", "Die junge Demokratie war verletzlich, weil"],
};
/* Vier Akteur*innen. Angaben sind Lebensdaten und Ereignisse, die in jedem Nachschlagewerk stehen; die Kurztexte sind Zusammenfassungen, keine Zitate. */
const PERSONEN = [
  { id:"ebert", name:"Friedrich Ebert", leben:"1871–1925", rolle:"Vorsitzender der SPD", milieu:"Arbeiterbewegung, gemäßigt",
    lage:"Am 9. November 1918 übergibt ihm Reichskanzler Max von Baden das Amt des Reichskanzlers.",
    will:["Ruhe und Ordnung statt Bürgerkrieg", "rasche Wahlen zu einer Nationalversammlung: Das ganze Volk soll über die Staatsform entscheiden", "eine parlamentarische Demokratie", "Zusammenarbeit mit der alten Armeeführung, damit die Soldaten geordnet heimkehren"],
    spaeter:"Am 11. Februar 1919 wählt ihn die Nationalversammlung zum ersten Reichspräsidenten." },
  { id:"luxemburg", name:"Rosa Luxemburg", leben:"1871–1919", rolle:"Spartakusbund, Mitgründerin der KPD", milieu:"Arbeiterbewegung, revolutionär",
    lage:"Am 9. November 1918 kommt sie aus dem Gefängnis frei, in dem sie wegen ihres Widerstands gegen den Krieg saß.",
    will:["die Revolution weitertreiben: Die Macht soll bei den Arbeiter- und Soldatenräten liegen", "eine sozialistische Wirtschaft: Fabriken und Boden in gemeinsamer Hand", "keine Zusammenarbeit mit den alten Eliten in Armee und Verwaltung"],
    spaeter:"Am 15. Januar 1919 wird sie in Berlin von Freikorps-Offizieren ermordet, wie Karl Liebknecht am selben Tag." },
  { id:"hindenburg", name:"Paul von Hindenburg", leben:"1847–1934", rolle:"Chef der Obersten Heeresleitung", milieu:"Adel und Militär",
    lage:"Seit 1916 führt er mit Erich Ludendorff die Armee. Im Herbst 1918 ist der Krieg militärisch verloren.",
    will:["die Armee und ihr Ansehen erhalten", "die alte Ordnung: Er bleibt Anhänger der Monarchie", "die Verantwortung für die Niederlage nicht bei der Armeeführung sehen"],
    spaeter:"1919 behauptet er vor einem Ausschuss des Parlaments, die Armee sei „von hinten erdolcht“ worden (Dolchstoßlegende). 1925 wird er Reichspräsident." },
  { id:"wilhelm", name:"Wilhelm II.", leben:"1859–1941", rolle:"Deutscher Kaiser seit 1888", milieu:"Kaiser und Adel",
    lage:"Am 9. November 1918 gibt Max von Baden die Abdankung des Kaisers bekannt – ohne dessen Zustimmung.",
    will:["Kaiser bleiben oder wenigstens König von Preußen", "die Monarchie erhalten"],
    spaeter:"Am 10. November 1918 geht er ins Exil in die Niederlande. Am 28. November 1918 unterschreibt er die Abdankung." },
];
const personKarte = p => `<div class="w-kopfzeile"><h3>${esc(p.name)}</h3><span class="hinweis">${esc(p.leben)}</span></div>
  <p class="rolle"><b>${esc(p.rolle)}</b> · Milieu: ${esc(p.milieu)}</p>
  <p>${esc(p.lage)}</p>
  <p style="margin-top:.8rem"><b>Im November 1918 will ${p.id === "luxemburg" ? "sie" : "er"}:</b></p><ul class="w-liste2">${p.will.map(w => `<li>${esc(w)}</li>`).join("")}</ul>
  ${textfeld("p." + p.id, `Wofür tritt ${p.name} ein? Ein Satz in deinen Worten.`, { rows:2, zaehl:false, platz:p.name + " will …" })}`;
const QUELLEN = {
  q1:{ titel:"Q1 · Philipp Scheidemann (SPD), 9. November 1918, gegen 14 Uhr", kurz:"Q1 Scheidemann",
    kopf:`${status("beleg", "Rede, Auszug")} Von einem Fenster des Reichstags. Tippe Sätze an: ▲ = das ist vorbei · ● = das soll kommen.`,
    stifte:[["a","▲","das ist vorbei"],["b","●","das soll kommen"]],
    abs:[[null,["Der Kaiser hat abgedankt.","Er und seine Freunde sind verschwunden.","Über sie alle hat das Volk auf der ganzen Linie gesiegt.","Das Alte und Morsche, die Monarchie, ist zusammengebrochen.","Es lebe das Neue, es lebe die deutsche Republik!"]]],
    nachweis:"Auszug aus dem Unterrichtsheft, M5.1 (Q1), dort ohne Fundstelle. Der Wortlaut folgt der verbreiteten Fassung, die auf Scheidemanns eigene spätere Wiedergabe zurückgeht; was er am 9. November genau sagte, ist nicht sicher überliefert. Fundstelle: noch offen." },
  q2:{ titel:"Q2 · Karl Liebknecht (Spartakusbund), 9. November 1918, gegen 16 Uhr", kurz:"Q2 Liebknecht",
    kopf:`${status("beleg", "Rede, Auszug")} Vor dem Berliner Stadtschloss. Tippe Sätze an: ▲ = das ist vorbei · ● = das soll kommen.`,
    stifte:[["a","▲","das ist vorbei"],["b","●","das soll kommen"]],
    abs:[[null,["Der Tag der Revolution ist gekommen.","Wir haben den Frieden erzwungen.","Der Friede ist in diesem Augenblick geschlossen.","Das Alte ist nicht mehr. […]","In dieser Stunde proklamieren wir die freie sozialistische Republik Deutschland. […]","Wir wollen an der Stelle, wo die Kaiserstandarte wehte, die rote Fahne der freien Republik Deutschland hissen!"]]],
    nachweis:"Auszug aus dem Unterrichtsheft, M5.1 (Q2), dort ohne Fundstelle; überliefert durch Zeitungsberichte vom folgenden Tag. Fundstelle: noch offen. […] = Kürzung im Heft." },
};
const STIMMEN = [["A","Parlamentarische Republik (Scheidemann)"],["B","Räterepublik (Liebknecht)"],["C","Ich kann mich noch nicht entscheiden"]];
const FILM = "https://youtube.com/watch?v=O6aaGaNcVpY";
const AUSSAGEN = [
  ["Friedrich Ebert war ein radikaler Revolutionär.", false, "Ebert wollte keine Revolution, sondern einen geordneten Übergang: erst Ruhe, dann Wahlen zu einer Nationalversammlung. Sieh dir im Film an, wie er über die Revolution spricht.", "Ebert wollte einen geordneten Übergang: erst Ruhe, dann Wahlen zu einer Nationalversammlung. Eine Revolution nach russischem Vorbild wollte er verhindern."],
  ["Friedrich Ebert wurde 1918 zum Reichskanzler ernannt.", true, "Am 9. November 1918 übergab ihm Max von Baden das Amt des Reichskanzlers. In der Verfassung des Kaiserreichs war das so nicht vorgesehen – es war ein Akt des Übergangs.", "Doch: Am 9. November 1918 übergab ihm Max von Baden das Amt des Reichskanzlers. In der Verfassung des Kaiserreichs war das so nicht vorgesehen."],
  ["Rosa Luxemburg wollte eine friedliche Revolution ohne Gewalt.", null, "Das trifft einen Teil: Luxemburg lehnte Terror als Mittel der Revolution ab. Sie rechnete aber damit, dass die Revolution gegen bewaffneten Widerstand verteidigt werden muss, und stellte sich im Januar 1919 hinter den Aufstand. Belege im Film: Wo spricht sie über Gewalt?", "Das trifft einen Teil: Im Januar 1919 stellte sie sich hinter den bewaffneten Aufstand. Terror als Mittel der Revolution lehnte sie aber ausdrücklich ab. Belege im Film: Wo spricht sie über Gewalt?"],
  ["Friedrich Ebert war der erste Präsident der Weimarer Republik.", true, "Die Nationalversammlung wählte ihn am 11. Februar 1919 zum Reichspräsidenten.", "Doch: Die Nationalversammlung wählte ihn am 11. Februar 1919 zum ersten Reichspräsidenten."],
];

function start(){ return deckblatt(); }
function erinnern(){
  return `${auftrag("Allein · 4 Minuten · ohne Heft", "Erst erinnern", "Beantworte aus dem Kopf, ein Stichwort genügt. Dann deckst du auf und vergleichst. Es geht nicht um richtig oder falsch, sondern darum, was noch da ist.")}
  ${abrufen("ab", [
    ["Wer verweigert Ende Oktober 1918 den Befehl – und welchen?", "Die Matrosen in Wilhelmshaven und Kiel. Sie sollen zu einer letzten Seeschlacht gegen Großbritannien auslaufen, obwohl der Krieg verloren ist."],
    ["Was geschieht am 9. November 1918 in Berlin?", "Die Menschen gehen auf die Straße. Max von Baden gibt die Abdankung des Kaisers bekannt und übergibt das Amt des Reichskanzlers an Friedrich Ebert (SPD)."],
    ["Nenne zwei Milieus der Gesellschaft von 1918 und je einen Wunsch.", "Zum Beispiel: Arbeiterschaft (Frieden, Brot, Mitbestimmung) · Bürgertum (Ordnung, Schutz des Eigentums) · Adel und Militär (Erhalt der alten Ordnung) · Landbevölkerung (Ende des Hungers, Heimkehr der Männer)."],
  ])}`;
}
function vier(){
  const da = PERSONEN.filter(p => lang("p." + p.id)).length;
  return `${kopfpaar(auftrag("Zu zweit · 15 Minuten", "Vier Menschen, vier Ziele", "Das Kaiserreich bricht zusammen und mit ihm die alte Ordnung. Wer hat jetzt das Sagen? Wähle links eine Person, lies ihre Karte und halte in einem Satz fest, wofür sie eintritt. Am Ende entscheidest du: Wen hättest du unterstützt?"), { datei:"heft-m05-vier-personen.jpg", alt:"Vier Porträtfotos: Kaiser Wilhelm II., Paul von Hindenburg, Friedrich Ebert und Rosa Luxemburg.", text:"Wilhelm II., Paul von Hindenburg, Friedrich Ebert, Rosa Luxemburg.", nachweis:"Bild aus dem Unterrichtsheft, M5. Nachweis offen." })}
  ${wahlKarte("person", PERSONEN.map((p, i) => ({ id:p.id, nr:"Person " + (i + 1), titel:p.name, unter:p.rolle, fertig:lang("p." + p.id) ? "Satz notiert" : false, html:personKarte(p) })), { titel:"Person wählen" })}
  <p class="hinweis" style="margin-top:.6rem">${da} von 4 Sätzen notiert.</p>
  ${hilfe("Fragenkatalog aus dem Heft (für das Gespräch zu zweit oder mit den Chatbots aus dem Heft)", `<ul class="w-liste2"><li><b>Selbstverständnis:</b> Wie würde die Person ihr politisches Ziel beschreiben? Was versteht sie unter Demokratie?</li><li><b>Revolution:</b> Wie bewertet sie die Revolution von 1918/19?</li><li><b>Alte Eliten und Militär:</b> Welche Rolle sollen sie im neuen Staat spielen? Wie steht die Person zu Gewalt als Mittel der Politik?</li><li><b>Soziale Frage:</b> Was bedeutet für sie soziale Gerechtigkeit?</li><li><b>Zukunft:</b> Wie stellt sie sich Deutschlands Zukunft vor?</li></ul><p class="hinweis">Die Chatbots aus dem Heft sind KI-Programme. Ihre Antworten sind keine Quelle: Prüfe sie an den Karten und an Q1 und Q2.</p>`)}
  <h2 class="abschnitt">Deine Entscheidung</h2>
  <p>Am Ende dieses Übergangs werden die Verlierer keine politische Macht mehr haben – oder ermordet worden sein. <b>Welche der vier Personen hättest du im November 1918 unterstützt?</b></p>
  <div class="w-milieus" style="grid-template-columns:repeat(4,minmax(0,1fr))" role="group" aria-label="Person wählen">${PERSONEN.map(p => `<button type="button" data-akt="setz" data-p="wer" data-w="${p.id}" aria-pressed="${S.wer === p.id}"><b>${esc(p.name)}</b><small>${esc(p.rolle)}</small></button>`).join("")}</div>
  ${textfeld("wergrund", "Begründe in einem Satz – mit dem, was man im November 1918 wissen konnte.", { rows:2, zaehl:false, anfaenge:["Ich hätte … unterstützt, weil", "Am wichtigsten wäre mir gewesen, dass"] })}`;
}
function reden(){
  const ok = lang("s1") && lang("s2");
  return `${auftrag("Allein · 10 Minuten, dann zu zweit · 5 Minuten", "Zwei Reden an einem Nachmittag", "Berlin, 9. November 1918. Um 14 Uhr spricht Philipp Scheidemann, um 16 Uhr Karl Liebknecht. Beide rufen eine Republik aus. Markiere in jeder Rede: Was ist vorbei (▲)? Was soll kommen (●)? Schreib danach je einen Satz.")}
  <div class="w-vs"><div class="blau">${quelle("q1")}${textfeld("s1", "Scheidemann ruft aus:", { rows:2, zaehl:false, platz:"eine Republik, in der …" })}</div>
  <div class="rot">${quelle("q2")}${textfeld("s2", "Liebknecht ruft aus:", { rows:2, zaehl:false, platz:"eine Republik, in der …" })}</div></div>
  <h3 class="klein">Deine Markierungen</h3>${belege(["q1","q2"], { ta:"Das ist vorbei", tb:"Das soll kommen" })}
  ${vergleich("modelle", ["s1","s2"], 10, "Zwei Modelle im Vergleich zeigen", `${wissen("Zwei Republiken", `<div class="w-vs" style="margin:.6rem 0 0"><div class="blau"><h3>Parlamentarische Demokratie</h3><p>Scheidemann (SPD) will eine Republik, in der gewählte Vertreter*innen in einem Parlament entscheiden. Grundlage ist die Volkssouveränität: Alle Staatsgewalt geht vom Volk aus.</p><ul class="w-liste2"><li><b>Gewaltenteilung:</b> Regierung, Parlament und Gerichte sind getrennt.</li><li><b>Repräsentation:</b> Gewählte Abgeordnete entscheiden.</li><li><b>Rechtsstaat:</b> Eine Verfassung schützt die Rechte der Einzelnen.</li><li><b>Wirtschaft:</b> Eigentum bleibt, mit sozialen Reformen.</li></ul></div>
  <div class="rot"><h3>Räterepublik</h3><p>Liebknecht (Spartakusbund) will eine sozialistische Republik nach dem Vorbild der Räte (Sowjets) in Russland. Arbeiter- und Soldatenräte üben die Macht direkt aus.</p><ul class="w-liste2"><li><b>Räte:</b> Arbeiter*innen und Soldaten wählen Räte, die entscheiden und ausführen.</li><li><b>Sozialistische Wirtschaft:</b> Fabriken und Boden gehören der Gemeinschaft.</li><li><b>Ziel:</b> eine Gesellschaft ohne Klassen.</li><li><b>Keine Gewaltenteilung</b> im Sinn der parlamentarischen Demokratie.</li></ul></div></div><p class="quelle">Zusammenfassung nach dem Unterrichtsheft, M5.1. Status: Erklärtext, vereinfacht.</p>`)}`)}
  ${ok ? "" : `<p class="hinweis">Auftrag 4 (Abstimmung) öffnet sich, wenn beide Sätze stehen.</p>`}`;
}
function abstimmung(){
  return `${auftrag("Allein · 3 Minuten, dann Plenum · 5 Minuten", "Stimm ab – mit dem Wissen von damals", "Versetz dich in den 9. November 1918. Das Kaiserreich ist Geschichte, der Krieg verloren. Du weißt nicht, wie es ausgeht. Welche der beiden Republiken unterstützt du? Wähle, begründe in einem Satz und halte auf Ansage deine Stimmkarte hoch.")}
  ${stimmkarte("stimme", STIMMEN)}
  ${textfeld("stimmgrund", "Meine Begründung", { rows:2, zaehl:false, anfaenge:["Ich unterstütze diese Republik, weil", "Mich überzeugt, dass", "Ich zögere, weil"] })}
  <p class="hinweis">Deine Stimme bleibt auf diesem Gerät. Eure Lehrkraft zählt die hochgehaltenen Karten und hält das Ergebnis an der Tafel fest. Ihr braucht es in Auftrag 7 wieder.</p>`;
}
function film(){
  const fertig = wfFertig("wf", 4);
  return `${auftrag("Plenum · 13 Minuten Film, dann allein · 7 Minuten", "Welche Republik setzt sich durch?", "Seht gemeinsam den Film. Achte auf zwei Dinge: Was will Ebert, was will Luxemburg? Und mit wessen Hilfe setzt sich eine Seite durch? Danach prüfst du vier Aussagen.")}
  ${filmKarte({ art:"Film", dauer:"ca. 13 Minuten", titel:"Im Kampf um die Republik – Rosa Luxemburg vs. Friedrich Ebert", text:"Aus der Reihe „Duelle“ von ARTE. Der Film ist eine Darstellung von heute, keine Quelle von damals: Er wählt aus und deutet.", nachweis:"ARTE, Reihe „Duelle“; Link aus dem Unterrichtsheft, M5.2.", url:FILM, wo:"YouTube" })}
  <h3 class="klein">Nach dem Film: vier Aussagen</h3><p class="hinweis">Leg dich fest. Zu jeder Antwort bekommst du eine Erklärung.</p>
  ${wahrFalsch("wf", AUSSAGEN)}
  <div class="${fertig ? "" : "gesperrt"}"><h3 class="klein">Welche Republik wird am Ende gegründet?</h3>
  <div class="w-milieus" style="grid-template-columns:repeat(2,minmax(0,1fr));max-width:46rem" role="group" aria-label="Republik wählen"><button type="button" data-akt="setz" data-p="rep" data-w="parl" aria-pressed="${S.rep === "parl"}"><b>Parlamentarische Republik</b><small>Ebert, Scheidemann</small></button><button type="button" data-akt="setz" data-p="rep" data-w="raete" aria-pressed="${S.rep === "raete"}"><b>Räterepublik</b><small>Luxemburg, Liebknecht</small></button></div>
  <div aria-live="polite">${S.rep === "parl" ? `<div class="rm zentral"><b>Stimmt.</b> Am 19. Januar 1919 wird die Nationalversammlung gewählt, zum ersten Mal wählen auch Frauen. Im August 1919 tritt die Weimarer Verfassung in Kraft.</div>` : S.rep === "raete" ? `<div class="rm kaum"><b>Noch nicht.</b> Die Räte stimmen im Dezember 1918 selbst für Wahlen zu einer Nationalversammlung. Im Januar 1919 wird der Aufstand in Berlin niedergeschlagen.</div>` : ""}</div>
  ${textfeld("ebert", "Wie gelingt es Ebert, sich durchzusetzen? Nenne zwei Gründe.", { rows:3, zaehl:false, anfaenge:["Ebert verbündet sich mit", "Die Mehrheit der Räte", "Der Aufstand im Januar 1919"] })}
  ${vergleich("ebertvgl", ["ebert"], 15, "Mit vier Stichpunkten vergleichen", `<ul class="w-liste2"><li><b>10. November 1918:</b> Ebert verständigt sich mit General Groener von der Obersten Heeresleitung. Die Armee stützt die neue Regierung, die Regierung lässt die Offiziere im Amt.</li><li><b>Rat der Volksbeauftragten:</b> SPD und USPD regieren zunächst gemeinsam.</li><li><b>Dezember 1918:</b> Der Reichskongress der Arbeiter- und Soldatenräte stimmt mit großer Mehrheit für Wahlen zur Nationalversammlung.</li><li><b>Januar 1919:</b> Die Regierung lässt den Aufstand in Berlin von Truppen und Freikorps niederschlagen. Luxemburg und Liebknecht werden am 15. Januar ermordet.</li></ul><p class="hinweis">Der Preis: Die Demokratie beginnt mit Gewalt zwischen den Arbeiterparteien und mit den alten Eliten in Armee, Justiz und Verwaltung.</p>`)}</div>`;
}
function seiteLk(){
  return landkarteL({ teil:"prinzip", frage:"Wir wissen, welche Republik sich durchsetzte. Die Menschen am 9. November 1918 wussten es nicht. Welches Prinzip der Landkarte erklärt, warum die Entscheidung damals schwerer war, als sie uns heute scheint?",
    lead:"Denk an deine Abstimmung in Auftrag 4 und an das, was du in Auftrag 5 erfahren hast. Was unterscheidet deinen Blick von dem eines Menschen am 9. November 1918?", platz:"Heute wissen wir, dass … Damals …",
    urteil:{
      "2-1-1":["zentral","Wir blicken zurück und kennen den Ausgang: Weimarer Verfassung, Mord an Luxemburg und Liebknecht, das Ende 1933. Am 9. November 1918 war all das offen. Wer das vergisst, hält die Entscheidung für leichter, als sie war (Rückschaufehler)."],
      "2-1-2":["teils","Die beiden Reden zeigen zwei Perspektiven auf denselben Tag. Das erklärt, warum Scheidemann und Liebknecht Verschiedenes ausrufen – aber noch nicht, warum die Entscheidung uns heute leichter scheint."],
      "2-1-8":["teils","Dein Standort heute (in einer parlamentarischen Demokratie aufgewachsen) prägt, was dir selbstverständlich scheint. Den Kern trifft aber das Prinzip, das den Blick im Nachhinein beschreibt."],
      "2-1-9":["teils","Mehrere Perspektiven zu vergleichen war die Arbeit in Auftrag 2 und 3. Die Frage hier zielt auf etwas anderes: auf den Abstand zwischen damals und heute."],
    },
    bruecke:`<b>Merke:</b> Retrospektivität ist unvermeidlich und nützlich – erst der Rückblick zeigt Folgen. Ein Fehler wird daraus, wenn wir unser Wissen den Menschen von damals unterstellen.` });
}
L.schreib = {
  vor:"So kann die Aufgabe in der Klassenarbeit stehen: Material, ein Operator, höchstens eine Seite. Hier schreibst du eine halbe Seite.",
  aufgabe:`Am 9. November 1918 wurde in Berlin zweimal die Republik ausgerufen. <b>Erklären Sie</b> mithilfe von Q1 und Q2 den Unterschied zwischen den beiden Republiken und <b>stellen Sie dar</b>, wie sich eine von beiden 1918/19 durchsetzte.`,
  material:`<p><b>Q1 · Philipp Scheidemann, 14 Uhr:</b> „Der Kaiser hat abgedankt. […] Das Alte und Morsche, die Monarchie, ist zusammengebrochen. Es lebe das Neue, es lebe die deutsche Republik!“</p><p><b>Q2 · Karl Liebknecht, 16 Uhr:</b> „Der Tag der Revolution ist gekommen. […] In dieser Stunde proklamieren wir die freie sozialistische Republik Deutschland. […] Wir wollen an der Stelle, wo die Kaiserstandarte wehte, die rote Fahne der freien Republik Deutschland hissen!“</p><p class="quelle">Auszüge aus dem Unterrichtsheft, M5.1.</p>`,
  woerter:140, min:60,
  stufen:[["Grundlegend","Du nennst beide Republiken und ordnest sie Scheidemann und Liebknecht zu. Der Unterschied bleibt ein Schlagwort."],["Sicher","Du erklärst den Unterschied an mindestens einem Merkmal (wer entscheidet, wie die Wirtschaft geordnet ist) und belegst mit Q1 oder Q2. Der Weg zur Durchsetzung fehlt oder ist ungenau."],["Souverän","Du erklärst den Unterschied mit Belegen aus beiden Quellen und stellst die Durchsetzung in Schritten dar – mit Daten und mit dem Preis, den sie hatte."]],
  inhalt:[["Q1, Scheidemann:","„deutsche Republik“ – parlamentarische Demokratie: Wahlen, Parlament, Gewaltenteilung, Verfassung. Bruch mit der Monarchie („das Alte und Morsche“)."],
    ["Q2, Liebknecht:","„freie sozialistische Republik“, rote Fahne – Räterepublik nach russischem Vorbild: Macht bei Arbeiter- und Soldatenräten, sozialistische Wirtschaft."],
    ["Durchsetzung:","Ebert Reichskanzler (9.11.), Bündnis mit der Armeeführung (10.11.), Rätekongress stimmt für Wahlen (Dezember 1918), Januaraufstand niedergeschlagen, Mord an Luxemburg und Liebknecht (15.1.1919), Wahl der Nationalversammlung (19.1.1919)."],
    ["Preis:","Spaltung der Arbeiterbewegung; alte Eliten bleiben in Armee, Justiz und Verwaltung."]],
};
function rueckblick(){
  const st = STIMMEN.find(x => x[0] === S.stimme);
  return `${auftrag("Allein · 3 Minuten, dann Plenum", "Was denkst du jetzt?", "Du hast in Auftrag 4 abgestimmt, ohne den Ausgang zu kennen. Jetzt kennst du ihn. Würdest du heute noch so abstimmen – und was hat sich an deiner Begründung geändert?")}
  <div class="karte"><p class="kennung">Deine Stimme am 9. November 1918</p><p class="mein ${st ? "" : "leer"}">${st ? esc(st[1]) + ". " + esc(S.stimmgrund) : "noch keine Stimme"}</p></div>
  ${textfeld("neu", "Was denkst du jetzt, und warum?", { rows:3, zaehl:false, anfaenge:["Ich bleibe dabei, weil", "Ich sehe es jetzt anders, weil", "Unterschätzt hatte ich"] })}
  <p class="hinweis">Achte darauf, was du trennst: Was konnte man damals wissen? Was weißt du erst heute?</p>
  ${fadenFeld()}`;
}
L.zf = {
  frage:L.frage,
  kern:"Am 9. November 1918 standen zwei Republiken zur Wahl. Durchgesetzt hat sich die parlamentarische Demokratie – im Bündnis mit den alten Eliten und um den Preis einer gespaltenen Arbeiterbewegung.",
  begriffe:[["Novemberrevolution","Umsturz im November 1918: Ende des Kaiserreichs, Beginn der Republik."],["Doppelte Ausrufung","Scheidemann ruft um 14 Uhr die Republik aus, Liebknecht um 16 Uhr die sozialistische Republik."],["Parlamentarische Demokratie","Gewählte Abgeordnete entscheiden im Parlament; Gewaltenteilung, Verfassung."],["Räterepublik","Arbeiter- und Soldatenräte üben die Macht direkt aus; sozialistische Wirtschaft."],["Volkssouveränität","Alle Staatsgewalt geht vom Volk aus."],["Spartakusbund","Revolutionäre Gruppe um Rosa Luxemburg und Karl Liebknecht; aus ihr entsteht die KPD."]],
  abfolge:{ titel:"Der Weg zur Republik in sieben Schritten", punkte:[["Ende Okt. 1918","Matrosen in Wilhelmshaven und Kiel verweigern den Befehl zur letzten Seeschlacht."],["9. Nov. 1918","Berlin: Abdankung des Kaisers verkündet, Ebert Reichskanzler, zweimal wird die Republik ausgerufen."],["10. Nov. 1918","Rat der Volksbeauftragten (SPD und USPD); Ebert verständigt sich mit der Armeeführung; der Kaiser geht in die Niederlande."],["11. Nov. 1918","Waffenstillstand: Der Erste Weltkrieg ist zu Ende."],["Dez. 1918","Der Kongress der Räte stimmt für Wahlen zur Nationalversammlung."],["Jan. 1919","Aufstand in Berlin niedergeschlagen; 15.1. Mord an Luxemburg und Liebknecht; 19.1. Wahl der Nationalversammlung."],["11. Aug. 1919","Die Weimarer Verfassung wird unterzeichnet."]] },
  lk:{ name:"Retrospektivität", satz:"Wir betrachten die Vergangenheit immer im Nachhinein und kennen den Ausgang. Die Menschen damals kannten ihn nicht.", beispiel:"Am 9. November 1918 war offen, welche Republik sich durchsetzt. Wer das vergisst, begeht den Rückschaufehler." },
  werkzeug:{ titel:"Eine offene Entscheidung untersuchen", schritte:["Was wussten die Menschen damals – und was noch nicht?","Welche Möglichkeiten gab es, und wer vertrat sie mit welchem Ziel?","Erst dann urteilen: Sachurteil (Was war möglich?) und Werturteil (Was halte ich für richtig?) trennen."] },
  sonst:"vier Akteur*innen und ihre Ziele (Auftrag 2), der Film von ARTE als Darstellung von heute (Auftrag 5).",
  mein:[["Wen ich unterstützt hätte", () => { const p = PERSONEN.find(x => x.id === S.wer); return p ? p.name + ". " + S.wergrund : ""; }], ["Meine Stimme am 9. November 1918 – und was ich jetzt denke", () => { const st = STIMMEN.find(x => x[0] === S.stimme); return st ? st[1] + ". " + S.stimmgrund + (S.neu ? " — Jetzt: " + S.neu : "") : ""; }]],
};
function zusammenfassung(){ return zusammen(); }
const SEITE_FN = { start, erinnern, vier, reden, abstimmung, film, landkarte:seiteLk, schreiben:schreibauftrag, rueckblick, zusammenfassung, lehrkraft };
weimarStart();
