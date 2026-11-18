/* ===== M7.1 · Wer trägt die Schuld am Ersten Weltkrieg? Historisches Urteil (Heft „Geschichte aktuell 1“, M7.1) ===== */
const L = {
  wid:"m071", key:"ggk-w-m071:v1", nr:"M7.1", titel:"Wer trägt die Schuld am Ersten Weltkrieg?", unter:"Ein historisches Urteil – zwei Historiker, zwei Antworten", dauer:45, block:"c",
  /* Zeichen der Stunde: eine Waage */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><path d="M17 5v23M9 28h16M6 10h22" fill="none" stroke="#24221F" stroke-width="2.4" stroke-linecap="round"/><path d="M6 10l-4 9h8zM28 10l-4 9h8z" fill="#E0B74A" stroke="#24221F" stroke-width="1.6" stroke-linejoin="round"/><circle cx="17" cy="5" r="2.4" fill="#9B402D"/></svg>`,
  frage:"Wer trägt die Schuld am Ersten Weltkrieg – und warum kommen Historiker*innen zu verschiedenen Urteilen?",
  blick:{ name:"Forschungskontroverse", anker:"2-1-9", tut:"Du vergleichst nicht Quellen, sondern Deutungen: zwei Historiker, ein Ereignis, zwei Urteile.", fehlt:"Was fehlt: die Quellen selbst. Du prüfst Urteile über 1914, nicht die Akten und Telegramme von 1914. Wer den Streit entscheiden will, muss dorthin zurück." },
  deck:{ dauer:"Einzelstunde · 45 Minuten", jahr:"1914", hier:[0, 2],
    satz:"Artikel 231 gab Deutschland und seinen Verbündeten die Verantwortung für den Krieg. Die Geschichtswissenschaft streitet darüber bis heute.",
    bild:{ datei:"heft-m07-schlachtfeld.jpg", alt:"Schwarz-Weiß-Foto: Ein Soldat steht mit dem Rücken zur Kamera in einem zerschossenen Wald. Aus dem aufgewühlten Boden ragen nur noch Baumstümpfe.", text:"Zerstörte Landschaft im Ersten Weltkrieg. Ort und Jahr sind im Heft nicht angegeben.", nachweis:"Bild aus dem Unterrichtsheft, M7.1. Nachweis offen." },
    ziele:["die Thesen von Fritz Fischer und Christopher Clark wiedergeben und ihre Unterschiede herausarbeiten,", "weitere Überlegungen der Forschung prüfen und ein eigenes Urteil begründen,", "erklären, warum die Entstehungszeit eines Urteils das Urteil prägt (Standortgebundenheit)."] },
  blatt:[
    { id:"vorher", nr:"1", kurz:"Erst festlegen", name:"Erst erinnern und festlegen", form:"Allein · ohne Heft", min:4, frei:"offen" },
    { id:"thesen", nr:"2", kurz:"Zwei Thesen", name:"Zwei Thesen: Fischer und Clark", form:"Allein", min:10, frei:"offen" },
    { id:"weitere", nr:"3", kurz:"Weitere Urteile", name:"Weitere historische Urteile", form:"Allein", min:5, frei:"antwort", nach:"thesen", fehlt:"Bearbeite erst Auftrag 2." },
    { id:"abstimmen", nr:"4", kurz:"Abstimmung", name:"Abstimmung: Welche These überzeugt mehr?", form:"Plenum", min:6, frei:"ansage", gleich:"Ihr stimmt im Kurs ab. Vorher begründest du deine Stimme in einem Satz." },
    { id:"landkarte", nr:"L", kurz:"Landkarte", name:"Landkarte: Zwei Historiker, zwei Urteile – was zeigt das?", form:"Allein", min:7, frei:"antwort", nach:"thesen", fehlt:"Bearbeite erst Auftrag 2." },
    { id:"schreiben", nr:"5", kurz:"Schreibauftrag", name:"Schreibauftrag", form:"Allein", min:12, frei:"ansage", marke:"wie in der Klassenarbeit", gleich:"Du vergleichst die zwei Urteile und kommst zu einem eigenen." },
    { id:"zusammenfassung", nr:"Z", kurz:"Zusammenfassung", name:"Zusammenfassung", form:"Zum Abheften", min:2, frei:"antwort", nach:"schreiben", fehlt:"Die Zusammenfassung öffnet sich nach deinem Text in Auftrag 5.", kopf:"Zum Abheften" },
  ],
  breit:["lehrkraft"],
  loesch:"Deine Einschätzungen, deine Tabelle, deine Markierungen, deine Stimme, dein Text und dein Satz für den roten Faden werden auf diesem Gerät entfernt.",
  init:() => ({ ab:{}, s1:null, grund1:"", t:{}, ue:{}, staerkste:"", satz:"", stimme:null, kurs:"", s2:null, jetzt:"", wozu:"" }),
  erledigt:{
    vorher:() => [0,1].every(i => (S.ab.auf || {})[i]) && S.s1 != null && lang("grund1"),
    thesen:() => tabelleVoll("t", 2, 2, 5), weitere:() => mwZahl("ue") >= 1 && lang("staerkste", 15),
    abstimmen:() => !!S.stimme && lang("satz") && S.s2 != null, landkarte:() => !!S.lk.ok, schreiben:() => schreibFertig(),
  },
  fadenAnf:["Ob Versailles gerecht war, hängt auch davon ab, wie man die Schuld am Krieg beurteilt:", "Artikel 231 behauptet …, die Forschung dagegen …"],
};
const POL = ["Deutschland trägt die Hauptschuld", "Alle Großmächte tragen gemeinsam Verantwortung"];
/* Sechs Überlegungen nach dem Heft (M7.1). Namen stehen nur dort, wo Buch und Aussage zusammenpassen; siehe Lehrkraftbereich. */
const UEBERL = [
  { id:"dipl", kopf:"1", titel:"Fehler der Diplomatie", text:"Der Krieg wurde durch eine Verkettung von diplomatischen Fehlern und Missverständnissen ausgelöst. Starre Pläne für die Mobilmachung ließen wenig Zeit, und die Diplomaten konnten die Krise nicht entschärfen. <i>Das Heft nennt dazu: Barbara Tuchman, „The Guns of August“.</i>" },
  { id:"imp", kopf:"2", titel:"Imperialismus und Wirtschaft", text:"Der Wettlauf um Kolonien und die wirtschaftliche Konkurrenz zwischen den Großmächten führten zu Spannungen, die schließlich in den Krieg mündeten. <i>Das Heft nennt dazu: Margaret MacMillan, „The War That Ended Peace“.</i>" },
  { id:"bund", kopf:"3", titel:"Bündnissysteme", text:"Bündnisse teilten Europa in zwei Lager. Sie begünstigten, dass aus einem regionalen Konflikt ein Weltkrieg wurde." },
  { id:"mil", kopf:"4", titel:"Die Rolle des Militärs", text:"Besonders in Deutschland herrschte eine aggressive Militärkultur, die den Schritt in den Krieg erleichterte. <i>Das Heft nennt dazu: Isabel V. Hull, „Absolute Destruction“.</i>" },
  { id:"nat", kopf:"5", titel:"Nationalismus und Innenpolitik", text:"Regierungen sahen im Krieg ein Mittel, von Problemen im Innern abzulenken und die nationale Einheit zu stärken." },
  { id:"pers", kopf:"6", titel:"Einzelne Akteure", text:"Entscheidungen und Fehler einzelner Personen gaben den Ausschlag – zum Beispiel Kaiser Wilhelm II. und andere führende Politiker und Militärs." },
];
const STIMMEN = [["A","Fischer: Hauptschuld des Deutschen Kaiserreichs"],["B","Clark: Keine Großmacht trägt allein die Schuld"],["C","Ich kann mich noch nicht entscheiden"]];

function start(){ return deckblatt(); }
function vorher(){
  return `${auftrag("Allein · 4 Minuten · ohne Heft", "Erst erinnern und festlegen", "Beantworte die zwei Fragen aus dem Kopf und deck dann auf. Leg dich danach auf der Linie fest – bevor du liest, was Historiker*innen sagen.")}
  ${abrufen("ab", [
    ["Was legt Artikel 231 des Versailler Vertrags fest (M7)?", "Deutschland und seine Verbündeten sind für den Krieg verantwortlich. Damit wurden die Reparationen begründet."],
    ["Was war der Anlass des Krieges im Sommer 1914 (M2)?", "Das Attentat von Sarajevo am 28. Juni 1914 auf den österreichischen Thronfolger Franz Ferdinand."],
  ])}
  <div class="ab-zwei gleich" style="margin-top:1.2rem"><div>${skala("s1", "Wer trägt die Schuld am Ersten Weltkrieg? Leg dich fest.", 5, "1 = " + POL[0], "5 = " + POL[1])}</div>
  <div>${textfeld("grund1", "Mein Grund in einem Satz", { rows:3, zaehl:false, anfaenge:["Ich vermute das, weil", "Aus M2 weiß ich, dass"] })}</div></div>`;
}
function thesen(){
  return `${auftrag("Allein · 10 Minuten", "Zwei Thesen", "Lies die zwei Thesen aufmerksam durch. Arbeite die Unterschiede der beiden historischen Bewertungen heraus.")}
  <p class="lead">Der Ausbruch des Ersten Weltkriegs ist ein viel diskutiertes Thema in der Geschichtswissenschaft. Historiker*innen haben dazu unterschiedliche und oft kontroverse Meinungen geäußert.</p>
  <div class="w-vs"><div class="rot"><p class="kennung">These 1</p><h3>Fritz Fischer: die „Kriegsschuldthese“</h3>
    <ul class="w-steck"><li><b>Wer?</b> deutscher Historiker</li><li><b>Wann?</b> 1961</li><li><b>Buch:</b> „Griff nach der Weltmacht“</li></ul>
    <p>Fritz Fischer vertrat in den 1960er-Jahren die umstrittene These, dass das Deutsche Kaiserreich die <b>Hauptschuld</b> am Ausbruch des Ersten Weltkriegs trage.</p>
    <p>Er argumentierte, dass Deutschland <b>bewusst</b> einen europäischen Krieg provozierte, um seine hegemonialen Ambitionen zu verwirklichen.</p>
    <p>Diese These war besonders in Deutschland umstritten: Sie stellte das Bild von Deutschland als Opfer der Umstände infrage und betonte stattdessen eine aggressive, expansionistische Außenpolitik.</p>
    <p class="hinweis"><b>hegemonial:</b> auf Vorherrschaft gerichtet · <b>expansionistisch:</b> auf Ausdehnung gerichtet</p></div>
  <div class="blau"><p class="kennung">These 2</p><h3>Christopher Clark: die „Schlafwandler“-These</h3>
    <ul class="w-steck"><li><b>Wer?</b> australischer Historiker</li><li><b>Wann?</b> 2012</li><li><b>Buch:</b> „The Sleepwalkers“ (deutsch: „Die Schlafwandler“)</li></ul>
    <p>Christopher Clark argumentiert, dass <b>keine der Großmächte die alleinige Schuld</b> am Ausbruch des Krieges trägt.</p>
    <p>Er beschreibt die europäischen Führer als „Schlafwandler“, die <b>unabsichtlich</b> in den Krieg stolperten – getrieben von einer Verkettung von Ereignissen, Missverständnissen und einem Mangel an diplomatischem Geschick.</p>
    <p>Diese These betont, wie verwickelt die Beziehungen zwischen den Staaten waren, und die Rolle von Zufällen und Missverständnissen statt gezielter Aggression.</p></div></div>
  <p class="quelle">Zusammenfassungen nach dem Unterrichtsheft, M7.1 – keine wörtlichen Zitate der beiden Historiker.</p>
  <h3 class="klein">Gegenüberstellung</h3>
  ${tabelle("t", ["", "Fischer", "Clark"], ["Wer trägt die Verantwortung?", "Absicht oder Versehen?"], { rows:2 })}
  ${vergleich("tvgl", ["t.0.0","t.0.1","t.1.0","t.1.1"], 5, "Mit der Gegenüberstellung vergleichen", `<div class="w-karten k2"><article class="w-kk rot"><h3>Blick auf Deutschland ↔ Verantwortung vieler</h3><p>Fischer legt den Blick auf die aggressive Politik Deutschlands. Clark nimmt eine breitere Sicht ein, die die Verantwortung auf mehrere Staaten verteilt.</p></article><article class="w-kk blau"><h3>Absicht ↔ Unabsichtlichkeit</h3><p>Fischer sieht den Kriegsausbruch als Ergebnis bewusster Entscheidungen der deutschen Führung. Clark betont die Unabsichtlichkeit und die Verkettung unglücklicher Umstände.</p></article></div><p class="quelle">Nach dem Erwartungshorizont des Unterrichtsheftes, M7.1.</p>`)}`;
}
function weitere(){
  const n = mwZahl("ue");
  return `${auftrag("Allein · 5 Minuten", "Weitere historische Urteile", "Sieh dir sechs weitere Überlegungen aus der Forschung an. Markiere die, die dich überzeugen. Entscheide dann, welche für dich am stärksten ist.")}
  ${mehrWahl("ue", UEBERL, { spalten:3, titel:"Überzeugende Überlegungen markieren", an:"überzeugt mich", aus:"antippen, wenn dich das überzeugt" })}
  <p class="quelle">Sechs Überlegungen nach dem Unterrichtsheft, M7.1. Wo das Heft ein Buch nennt, steht es dabei; ob die Bücher genau das sagen, ist noch nicht an den Büchern geprüft.</p>
  <p class="hinweis" aria-live="polite">${n ? `Du hast ${n} von 6 markiert.` : "Noch nichts markiert."}</p>
  ${textfeld("staerkste", "Welche Überlegung ist für dich am stärksten – und stützt sie eher Fischer oder eher Clark?", { rows:3, zaehl:false, anfaenge:["Am stärksten finde ich", "Sie stützt eher", "weil"] })}`;
}
function abstimmen(){
  const da = !!S.stimme && lang("satz");
  return `${auftrag("Plenum · 6 Minuten", "Abstimmung", "Welche These überzeugt mehr? Begründe deine Stimme zuerst in einem Satz. Auf Ansage hältst du deine Stimmkarte hoch.")}
  <div class="ab-zwei gleich"><div>${textfeld("satz", "Meine Begründung in einem Satz", { rows:3, zaehl:false, anfaenge:["Mich überzeugt … mehr, weil", "Dagegen spricht zwar, dass"] })}
  ${stimmkarte("stimme", STIMMEN)}</div>
  <div class="${da ? "" : "gesperrt"}">${textfeld("kurs", "Ergebnis im Kurs (A · B · C)", { rows:1, zaehl:false, platz:"zum Beispiel: A 7 · B 11 · C 3" })}
  ${skala("s2", "Und jetzt? Leg dich noch einmal fest.", 5, "1 = " + POL[0], "5 = " + POL[1])}
  <p class="hinweis">Deine Einschätzung in Auftrag 1: ${S.s1 == null ? "noch offen" : S.s1 + " von 5"}.</p>
  ${textfeld("jetzt", "Was denkst du jetzt – und warum?", { rows:2, zaehl:false, anfaenge:["Ich bleibe dabei, weil", "Ich sehe es jetzt anders, weil"] })}</div></div>
  <div class="trift"><b>Beide Urteile sind begründbar.</b> Die Forschung streitet weiter. In deinem Urteil zählt nicht die Seite, sondern die Begründung.</div>`;
}
function seiteLk(){
  return landkarteL({ teil:"prinzip", frage:"Zwei Historiker untersuchen denselben Sommer 1914 und kommen zu verschiedenen Urteilen. Um welchen Punkt aus „Was ist Geschichte?“ dreht sich diese Aufgabe?",
    heft:"II. Was ist Geschichte: Um welchen der dort aufgeführten Punkte dreht sich die gestellte Aufgabe?",
    lead:"Fischer veröffentlicht sein Buch 1961 in der Bundesrepublik, Clark seines rund fünfzig Jahre später. Vermute: Warum urteilen sie verschieden, obwohl beide dasselbe Ereignis untersuchen?", platz:"Sie urteilen verschieden, weil …",
    urteil:{
      "2-1-8":["zentral","Fischers Thesen entstanden in einer Zeit, in der die Debatte über deutsche Schuld und Verantwortung nach dem Zweiten Weltkrieg besonders heikel war. Clarks Buch erschien in einer Zeit, in der die Verflechtung der Staaten stärker im Vordergrund stand. Der Standort prägt, wonach jemand fragt."],
      "2-1-7":["teils","Aus denselben Ereignissen des Sommers 1914 setzen Fischer und Clark zwei verschiedene Geschichten zusammen – richtig. Die Aufgabe geht einen Schritt weiter: Sie stellt beide Deutungen gegeneinander und fragt, woher der Unterschied kommt."],
      "2-1-2":["teils","Beide blicken aus einer bestimmten Sichtweise. Noch genauer trifft es der Eintrag, der erklärt, woher diese Sichtweise kommt: aus der Zeit und der Gesellschaft, in der jemand schreibt."],
      "2-1-4":["teils","Stimmt: Fischer wählt vor allem die deutsche Politik aus, Clark die Abläufe zwischen allen Mächten. Die Aufgabe fragt aber weiter: Warum wählen sie so verschieden?"],
      "2-1-1":["teils","Beide urteilen im Nachhinein. Das erklärt aber noch nicht, warum ihre Urteile verschieden ausfallen."],
      "2-1-9":["zentral","Zwei Historiker deuten dasselbe Geschehen verschieden – und beide Deutungen stehen nebeneinander. Das ist Kontroversität: Unterschiedliche Deutungen von Historiker*innen werden gegenübergestellt. Besprecht: Warum ist das kein Mangel der Geschichtswissenschaft, sondern gehört zu ihr?"],
    },
    bruecke:`<b>Merke:</b> Dass Historiker*innen streiten, heißt nicht, dass jede Deutung gleich gut begründet ist. Prüfe jede: Wer urteilt, wann und wo – und worauf stützt sich das Urteil? Das gilt auch für dein eigenes.` })
  + `<div class="ab-zwei gleich" style="margin-top:1.4rem"><div>${auftrag("Allein · 2 Minuten", "Und wozu?", "Das Heft fragt außerdem: Welchen Punkt aus „Wozu Geschichte?“ setzt diese Aufgabe um? Nenne einen Punkt der Landkarte und begründe kurz.")}</div>
  <div>${textfeld("wozu", "Mein Punkt aus „Wozu Geschichte?“", { rows:2, zaehl:false, platz:"Die Aufgabe übt …, weil …" })}
  ${vergleich("wozuvgl", ["wozu"], 10, "Mit einem Vorschlag vergleichen", `<p><b>Naheliegend: Kritisches Denken (1.7).</b> Du übernimmst ein Urteil nicht einfach, sondern prüfst: Wer hat es verfasst? Wann, wozu, für wen? Ein anderer Punkt ist ebenso möglich, wenn du ihn an der Aufgabe zeigen kannst.</p>`)}</div></div>`;
}
L.schreib = {
  vor:"So kann die Aufgabe in der Klassenarbeit stehen: Material, zwei Operatoren, höchstens eine Seite. Hier schreibst du eine halbe Seite.",
  aufgabe:`<b>a) Vergleichen Sie</b> die Urteile von Fritz Fischer und Christopher Clark über den Ausbruch des Ersten Weltkriegs.<br><b>b) Beurteilen Sie</b> die Überzeugungskraft der beiden Deutungen.`,
  material:`<p><b>M1 · Fritz Fischer (1961):</b> Das Deutsche Kaiserreich trägt die Hauptschuld. Es provozierte bewusst einen europäischen Krieg, um seine Vorherrschaft durchzusetzen.</p><p><b>M2 · Christopher Clark (2012):</b> Keine Großmacht trägt allein die Schuld. Die Regierungen stolperten wie „Schlafwandler“ in den Krieg: Verkettung von Ereignissen, Missverständnisse, fehlendes diplomatisches Geschick.</p><p><b>M3 · Entstehungszeit:</b> Fischers Thesen entstanden, als nach dem Zweiten Weltkrieg heftig über deutsche Schuld und Verantwortung gestritten wurde. Clarks Buch erschien in einer Zeit, in der die Verflechtung der Staaten stärker im Vordergrund stand.</p><p class="quelle">Nach dem Unterrichtsheft, M7.1, mit Erwartungshorizont.</p>`,
  woerter:140, min:60,
  stufen:[["Grundlegend","Du gibst beide Thesen richtig wieder und sagst, welche dich mehr überzeugt."],["Sicher","Du vergleichst nach zwei Gesichtspunkten (Verantwortung, Absicht) und begründest dein Urteil mit einer Überlegung aus Auftrag 3."],["Souverän","Du beziehst die Entstehungszeit der Urteile ein (Standortgebundenheit), wägst eine Gegenüberlegung ab und kommst zu einem begründeten eigenen Urteil."]],
  inhalt:[["Fischer:","Hauptschuld des Deutschen Kaiserreichs; bewusst provozierter Krieg; Ziel Vorherrschaft."],
    ["Clark:","keine Großmacht trägt allein die Schuld; „Schlafwandler“; Verkettung von Ereignissen, Missverständnissen und fehlendem diplomatischem Geschick."],
    ["Unterschiede:","Blick auf Deutschland ↔ Blick auf alle Mächte; Absicht ↔ Unabsichtlichkeit."],
    ["Urteil:","Beide Entscheidungen sind möglich. Es zählt die Begründung: einen Maßstab nennen, eine Gegenüberlegung abwägen, die Entstehungszeit der Urteile bedenken."]],
};
L.zf = {
  frage:L.frage,
  kern:"Über die Schuld am Ersten Weltkrieg urteilen Historiker*innen verschieden. Fritz Fischer sah die Hauptschuld beim Deutschen Kaiserreich. Christopher Clark sieht keine Großmacht allein in der Verantwortung. Die Urteile hängen auch davon ab, wann und wo sie entstanden sind. Der Streit ist nicht entschieden.",
  begriffe:[["Kriegsschuldfrage","die Frage, wer für den Ausbruch des Ersten Weltkriegs verantwortlich ist."],["Fischer-These (1961)","Das Deutsche Kaiserreich trägt die Hauptschuld; es provozierte den Krieg bewusst."],["„Schlafwandler“-These (Clark, 2012)","Keine Großmacht trägt allein die Schuld; die Regierungen stolperten unabsichtlich in den Krieg."],["Hegemonie","Vorherrschaft eines Staates über andere."],["Historisches Urteil","begründete Bewertung eines Geschehens – offen für Widerspruch."],["Artikel 231","Kriegsschuldklausel des Versailler Vertrags (M7)."]],
  abfolge:{ titel:"Sechs Überlegungen aus der Forschung", punkte:[["Diplomatie","Fehler und Missverständnisse; starre Pläne für die Mobilmachung."],["Imperialismus","Wettlauf um Kolonien, wirtschaftliche Konkurrenz."],["Bündnisse","zwei Lager; aus einem regionalen Konflikt wird ein Weltkrieg."],["Militär","aggressive Militärkultur, besonders in Deutschland."],["Innenpolitik","Nationalismus; Krieg als Ablenkung von inneren Problemen."],["Personen","Entscheidungen und Fehler einzelner Politiker und Militärs."]] },
  lk:{ name:"Kontroversität und Standortgebundenheit", satz:"Kontroversität: Unterschiedliche Deutungen von Historiker*innen werden gegenübergestellt. Standortgebundenheit: Wer Geschichte erzählt, ist durch seinen gesellschaftlichen und kulturellen Gesamtkontext geprägt, oft unbewusst.", beispiel:"Fischer urteilt 1961, als in Deutschland über Schuld und Verantwortung gestritten wird. Clark schreibt 2012 mit Blick auf die Verflechtung der Staaten." },
  werkzeug:{ titel:"Historische Urteile vergleichen", schritte:["Was behauptet das Urteil – und worauf stützt es sich?","Wann und wo ist es entstanden? Was beschäftigte diese Zeit?","Selbst urteilen: Welche Überlegung überzeugt mich, welche Gegenüberlegung muss ich abwägen?"] },
  sonst:"sechs weitere Überlegungen (Auftrag 3), die Abstimmung im Kurs (Auftrag 4).",
  mein:[["Meine Einschätzung: vorher und nachher", () => S.s1 == null ? "" : `Vorher: ${S.s1} von 5. Nachher: ${S.s2 == null ? "offen" : S.s2 + " von 5"} (1 = ${POL[0]}, 5 = ${POL[1]}). ${S.jetzt}`],
    ["Meine Stimme", () => { const st = STIMMEN.find(x => x[0] === S.stimme); return st ? `${st[1]}. ${S.satz}` : ""; }]],
};
function zusammenfassung(){ return fadenFeld() + zusammen(); }
const SEITE_FN = { start, vorher, thesen, weitere, abstimmen, landkarte:seiteLk, schreiben:schreibauftrag, zusammenfassung, lehrkraft };
weimarStart();
