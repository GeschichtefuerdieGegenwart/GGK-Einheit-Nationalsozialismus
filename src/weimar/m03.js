/* ===== M3 · Das Prinzip der Standortgebundenheit – am Beispiel des Völkermords an den Armenier*innen (Heft „Geschichte aktuell 1“, M3) =====
   Die Stunde folgt dem Modul „Völkermord an den Armeniern?“ des Blogs historischdenken.hypotheses.org (Link im Heft). */
const L = {
  wid:"m03", key:"ggk-w-m03:v1", nr:"M3", titel:"Standortgebundenheit: der Völkermord an den Armenier*innen", unter:"Wie der Standort prägt, was erzählt wird", dauer:90, block:"a",
  /* Zeichen der Stunde: zwei Standorte, ein Gegenstand */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><circle cx="17" cy="9" r="4" fill="#24221F"/><path d="M5 28l12-15 12 15" fill="none" stroke="#9B402D" stroke-width="2.4" stroke-linejoin="round"/><circle cx="5" cy="28" r="2.6" fill="#24221F"/><circle cx="29" cy="28" r="2.6" fill="#24221F"/></svg>`,
  frage:"Warum sprechen zwei Menschen über dasselbe Ereignis von 1915 so verschieden – und was hat ihr Amt damit zu tun?",
  blick:{ name:"Geschichtskultur und Geschichtspolitik", anker:"3-1-3", tut:"Du klärst zuerst, was 1915/16 geschah. Dann untersuchst du, wie hundert Jahre später darüber gesprochen wird – und wozu.", fehlt:"Was fehlt: die Stimmen der Betroffenen selbst. In dieser Stunde sprechen vor allem Amtsträger von 2015 – nicht die Armenier*innen von 1915." },
  deck:{ dauer:"Doppelstunde · 90 Minuten", jahr:"1915/16", hier:[0],
    satz:"Im April 2015 jährt sich der Beginn der Deportationen und Massentötungen an den Armenier*innen zum hundertsten Mal. Viele äußern sich. Eine Frage steht immer im Raum: Fällt das Wort „Völkermord“ – oder nicht?",
    belastend:"In dieser Stunde geht es um Deportationen und die Ermordung von Hunderttausenden Menschen. Bilder der Toten zeigt die Seite nicht. Du darfst jederzeit aussetzen und mit deiner Lehrkraft sprechen.",
    ziele:["darstellen, was 1915/16 im Osmanischen Reich geschah und worüber bis heute gestritten wird,", "erklären, wie Amt und Interessen prägen, was jemand über die Vergangenheit sagt (Standortgebundenheit),", "zwei Positionen mit den Triftigkeitsprüfungen beurteilen."] },
  blatt:[
    { id:"vermuten", nr:"1", kurz:"Erst vermuten", name:"Erst vermuten: ein Ereignis, zwei Wörter", form:"Allein", min:5, frei:"offen" },
    { id:"ereignis", nr:"2", kurz:"Was geschah?", name:"Was geschah 1915/16 im Osmanischen Reich?", form:"Zu zweit · Recherche", min:20, frei:"offen" },
    { id:"stimmen", nr:"3", kurz:"Vier Stimmen", name:"Vier Stimmen im April 2015", form:"Allein oder zu zweit", min:20, frei:"offen" },
    { id:"urteil", nr:"4", kurz:"Prüfen und urteilen", name:"Prüfen und urteilen mit den Triftigkeiten", form:"Allein", min:12, frei:"antwort", nach:"stimmen", fehlt:"Untersuche erst zwei der vier Stimmen in Auftrag 3." },
    { id:"landkarte", nr:"L", kurz:"Landkarte", name:"Landkarte: Welches Prinzip zeigt sich hier?", form:"Allein", min:7, frei:"antwort", nach:"urteil", fehlt:"Bearbeite erst Auftrag 4." },
    { id:"schreiben", nr:"5", kurz:"Schreibauftrag", name:"Schreibauftrag", form:"Allein", min:15, frei:"ansage", marke:"wie in der Klassenarbeit", gleich:"Du erläuterst die Standortgebundenheit am Beispiel dieser Stunde." },
    { id:"rueckblick", nr:"6", kurz:"Rückblick", name:"Rückblick: Was denkst du jetzt?", form:"Allein, dann Plenum", min:4, frei:"antwort", nach:"schreiben", fehlt:"Schreib erst deinen Text in Auftrag 5." },
    { id:"zusammenfassung", nr:"Z", kurz:"Zusammenfassung", name:"Zusammenfassung", form:"Zum Abheften", min:4, frei:"antwort", nach:"schreiben", fehlt:"Die Zusammenfassung öffnet sich nach deinem Text in Auftrag 5.", kopf:"Zum Abheften" },
  ],
  breit:["lehrkraft"],
  loesch:"Deine Vermutung, deine Recherche, deine Tabelle, dein Urteil, dein Text und dein Satz für den roten Faden werden auf diesem Gerät entfernt.",
  init:() => ({ ab:{}, vermutung:"", f:{}, t:{}, tr:{ e:"", n:"", na:"" }, urteil:"", neu:"" }),
  erledigt:{
    vermuten:() => lang("vermutung"), ereignis:() => [0,1,2,3].filter(i => lang("f." + i)).length >= 3, stimmen:() => tabelleVoll("t", 3, 2, 5),
    urteil:() => lang("tr.e") && lang("tr.n") && lang("urteil"), landkarte:() => !!S.lk.ok, schreiben:() => schreibFertig(), rueckblick:() => lang("neu"),
  },
  fadenAnf:["Was über die Vergangenheit gesagt wird, hängt davon ab,", "Für den Ersten Weltkrieg heißt das:"],
};
const BLOG = "https://historischdenken.hypotheses.org/2343";
const FRAGEN3 = [
  ["a) Wer waren die Armenier*innen? Welche Religion und welche Stellung in der Gesellschaft hatten sie? Wo lebten sie?", "Sie waren überwiegend christlich (Armenisch-Apostolische Kirche), eine bedeutende Minderheit im Osmanischen Reich, und lebten vor allem in den östlichen Provinzen – Gebieten, die heute zur Türkei gehören."],
  ["b) Wer organisierte die Deportationen und Massentötungen – und mit welchem Ziel?", "Die osmanische Regierung der Jungtürken (Komitee für Einheit und Fortschritt). Als Ziel nennt die Forschung, die armenische Bevölkerung zu vernichten und ein ethnisch einheitliches Land zu schaffen."],
  ["c) Das Osmanische Reich und das Deutsche Kaiserreich waren Kriegsverbündete. Welche Rolle spielten die deutschen Militärangehörigen vor Ort?", "Deutsche Offiziere und Diplomaten waren Zeugen. Einige berichteten und protestierten, andere stützten den Verbündeten. Die deutsche Regierung unternahm wenig, um die Tötungen zu stoppen."],
  ["d) Über die Zahl der Getöteten gibt es sehr verschiedene Angaben. Welche findest du – und wer hat sie jeweils aufgestellt?", "Die Angaben gehen weit auseinander: Armenische Stellen nennen etwa 1,5 Millionen Tote, türkische Stellen deutlich weniger. Entscheidend ist, wer eine Zahl nennt und worauf sie sich stützt."],
];
const STIMMEN4 = [
  { id:"gauck", name:"Joachim Gauck", amt:"Bundespräsident von Deutschland", seite:"spricht das Wort aus", was:"Der Artikel berichtet: Gauck spricht bei einem Gedenkgottesdienst am 23. April 2015 klar von „Völkermord“.", quelle:"Spiegel Online, 23. April 2015", url:"http://www.spiegel.de/politik/deutschland/armenier-joachim-gauck-spricht-klar-von-voelkermord-a-1030261.html" },
  { id:"papst", name:"Papst Franziskus", amt:"Oberhaupt der katholischen Kirche", seite:"spricht das Wort aus", was:"Der Artikel berichtet: Der Papst nennt die Ereignisse bei einer Messe im April 2015 einen Völkermord.", quelle:"Zeit Online, 12. April 2015", url:"http://www.zeit.de/politik/ausland/2015-04/papst-franziskus-armenien-voelkermord" },
  { id:"steinmeier", name:"Frank-Walter Steinmeier", amt:"Außenminister von Deutschland", seite:"vermeidet das Wort", was:"Der Artikel berichtet: Steinmeier vermeidet die Bezeichnung „Völkermord“ für die Massaker an den Armeniern.", quelle:"Stern.de, 17. April 2015", url:"http://www.stern.de/politik/ausland/frank-walter-steinmeier-vermeidet-die-bezeichnung--voelkermord--fuer-massaker-an-armeniern-6213590.html" },
  { id:"erdogan", name:"Recep Tayyip Erdoğan", amt:"Präsident der Türkei", seite:"lehnt das Wort ab", was:"Der Artikel berichtet: Erdoğan kritisiert Gauck wegen dessen Rede und weist den Vorwurf des Völkermords zurück.", quelle:"Welt.de, 25. April 2015", url:"http://www.welt.de/politik/ausland/article140088726/Erdogan-kritisiert-Gauck-wegen-Voelkermord-Rede.html" },
];
const stimmKarte = p => `<div class="w-kopfzeile"><h3>${esc(p.name)}</h3><span class="status ${p.seite.includes("spricht") ? "beleg" : ""}">${esc(p.seite)}</span></div>
  <p class="rolle"><b>${esc(p.amt)}</b> im April 2015</p><p>${esc(p.was)}</p>
  <p><a class="btn dunkel" href="${p.url}" target="_blank" rel="noopener">Artikel öffnen: ${esc(p.quelle)} ↗</a></p>
  <p class="hinweis">Öffnet in einem neuen Tab, deine Eingaben bleiben. Der Artikel ist von 2015: Falls der Link nicht mehr öffnet, suche nach Titel und Datum.</p>
  <p style="margin-top:.8rem"><b>Darauf achtest du beim Lesen:</b></p><ul class="w-liste2"><li>Welche Argumente nennt die Person für ihre Wortwahl?</li><li>Welche Aufgabe hat ihr Amt – und wem gegenüber muss sie Rücksicht nehmen?</li><li>Was hätte sie zu gewinnen oder zu verlieren, wenn sie anders spräche?</li></ul>`;

function start(){ return deckblatt(); }
function vermuten(){
  return `${erinnere([["M2: Was war der Anlass des Ersten Weltkriegs?", "Das Attentat von Sarajevo am 28. Juni 1914: Der österreichisch-ungarische Thronfolger und seine Frau werden erschossen."], ["M2: Warum wurde daraus ein Krieg der Großmächte?", "Wegen der Bündnisse: Die Staaten hatten sich Beistand versprochen. Dazu kamen tiefere Ursachen wie das Wettrüsten, der Streit um Kolonien und die Spannungen auf dem Balkan."]])}
  ${auftrag("Allein · 3 Minuten", "Ein Ereignis, zwei Wörter", "April 2015, Deutschland. Der Bundespräsident spricht vom „Völkermord“ an den Armeniern. Der Außenminister desselben Landes vermeidet das Wort. Vermute, bevor du mehr weißt: Woran kann das liegen?")}
  ${textfeld("vermutung", "Meine Vermutung", { rows:3, zaehl:false, anfaenge:["Es könnte daran liegen, dass", "Vielleicht hat das Amt damit zu tun, weil"] })}`;
}
function ereignis(){
  const n = [0,1,2,3].filter(i => lang("f." + i)).length;
  return `${auftrag("Zu zweit · 20 Minuten · Recherche", "Was geschah 1915/16?", "Informiert euch über die Ereignisse 1915/16 im Osmanischen Reich und klärt die vier Fragen. Notiert je zwei bis drei Sätze und schreibt dazu, woher die Angabe stammt. Startpunkt ist die Seite, die das Heft nennt.")}
  ${belastend("Die Texte, die ihr findet, beschreiben Deportationen, Hunger und Mord. Manche Seiten zeigen Fotos der Toten. Ihr müsst sie nicht ansehen.")}
  ${bildNachTipp("foto1915", { datei:"heft-m03-foto-1915.jpg", alt:"Schwarz-Weiß-Foto: Auf einem kahlen Feld kniet eine Frau mit Kopftuch und beugt sich über ein Kind, das reglos am Boden liegt. Ein zweites Kind steht daneben.", text:"Foto aus dem Heft (dort Abbildung 1). Ort, Datum und Fotograf*in nennt das Heft nicht. <b>Prüfe das Foto als Quelle:</b> Was zeigt es? Was zeigt es nicht? Was müsstest du wissen, um es als Beleg zu nutzen?", nachweis:"Im Unterrichtsheft, M3, mit Verweis auf: Der Tagesspiegel, „Die Vernichtungsabsicht kann belegt werden“ (tagesspiegel.de). Nachweis des Fotos offen." }, "Es zeigt eine Frau, die sich über ein lebloses Kind beugt.")}
  <div class="ab-zwei schmalrechts"><div>
  ${FRAGEN3.map((f, i) => textfeld("f." + i, f[0], { rows:3, zaehl:false, platz:"Antwort in zwei bis drei Sätzen · Fundstelle:" })).join("")}
  <p class="hinweis">${n} von 4 Fragen beantwortet (mindestens 3).</p>
  ${vergleich("f3", ["f.0","f.1","f.2"], 15, "Mit Stichpunkten vergleichen", `<ul class="w-liste2">${FRAGEN3.map(f => `<li><b>${esc(f[0].slice(0, 2))}</b> ${esc(f[1])}</li>`).join("")}</ul><p class="quelle">Stichpunkte nach dem Erwartungshorizont des Unterrichtsheftes, M3; dort ohne Beleg. Prüft sie an euren Fundstellen.</p>`)}
  </div><aside>
  ${wissen("Worum gestritten wird", `<p>Im 20. Jahrhundert wurden mehrfach Menschengruppen allein wegen ihrer Herkunft oder Religion auf Anordnung einer Regierung systematisch ermordet. Das bekannteste Beispiel ist der Holocaust.</p><p>Unter dem Eindruck des Holocaust beschloss die UNO 1948 eine Konvention zur Verhütung und Bestrafung des <b>Völkermords</b> (Genozid).</p><p>Ob die Deportationen und Massentötungen an den Armenier*innen 1915/16 so genannt werden, ist bis heute ein politischer Streit. Der Deutsche Bundestag hat das Wort im Juni 2016 in einer Resolution offiziell verwendet.</p>`)}
  <p><a class="btn dunkel" href="${BLOG}" target="_blank" rel="noopener">Startpunkt der Recherche öffnen ↗</a></p><p class="hinweis">historischdenken.hypotheses.org – Link aus dem Unterrichtsheft, M3. Öffnet in einem neuen Tab.</p>
  </aside></div>`;
}
function stimmen(){
  return `${auftrag("Allein oder zu zweit · 20 Minuten", "Vier Stimmen im April 2015", "Zum hundertsten Jahrestag äußern sich viele. Vier Presseartikel berichten darüber. Wähle zwei Personen: eine, die das Wort „Völkermord“ ausspricht, und eine, die es vermeidet oder ablehnt. Sammle ihre Argumente und erkläre, welche Interessen mit ihrem Amt verbunden sein könnten. Halte alles in der Tabelle fest.")}
  ${wahlKarte("stimme", STIMMEN4.map(p => ({ id:p.id, nr:p.seite, titel:p.name, unter:p.amt, html:stimmKarte(p) })), { titel:"Person wählen" })}
  <h3 class="klein">Meine Tabelle</h3>
  ${tabelle("t", ["", "Spricht von Völkermord", "Vermeidet oder lehnt das Wort ab"], ["Person und Amt", "Argumente", "Einfluss der politischen Rolle auf die erzählte Geschichte"], { rows:3 })}`;
}
function urteil(){
  return `${auftrag("Allein · 12 Minuten", "Prüfen und urteilen", "Vergleiche die beiden Äußerungen, die du untersucht hast. Welcher Position stimmst du zu, welcher nicht? Prüfe erst mit den Triftigkeiten aus der kognitiven Landkarte, dann urteile.")}
  <div class="ab-zwei schmalrechts"><div>
  ${textfeld("tr.e", "1 · Empirisch: Stimmen die Tatsachen, auf die sich die beiden stützen?", { rows:3, zaehl:false, anfaenge:["Belegt ist, dass", "Bestritten wird, dass"] })}
  ${textfeld("tr.n", "2 · Normativ: Welche Wertungen stecken in der Wortwahl – und sind sie begründet?", { rows:3, zaehl:false, anfaenge:["Wer „Völkermord“ sagt, wertet", "Wer das Wort vermeidet, stellt … über"] })}
  ${textfeld("tr.na", "3 · Narrativ: Ist der Zusammenhang, den die beiden herstellen, schlüssig?", { rows:2, zaehl:false })}
  ${textfeld("urteil", "Mein Urteil: Welcher Position stimme ich zu – und warum?", { rows:3, zaehl:false, anfaenge:["Ich stimme … zu, weil", "Nicht überzeugt mich, dass"] })}
  </div><aside>${wissen("Drei Prüfungen (Jörn Rüsen)", `<ul><li><b>Empirische Triftigkeit:</b> Stimmen die Tatsachen? Sind die behaupteten Fakten durch Quellen belegt und mit dem Forschungsstand vereinbar?</li><li><b>Normative Triftigkeit:</b> Sind die Wertungen begründet? Sind sie offengelegt und durch begründbare, allgemein zustimmungsfähige Normen gedeckt, zum Beispiel durch Menschenrechte?</li><li><b>Narrative Triftigkeit:</b> Ist der Zusammenhang schlüssig? Ursache und Folge müssen begründet sein, nicht nur behauptet.</li></ul><p class="quelle">Wortlaut nach der kognitiven Landkarte, 2.2.</p>`)}
  <p class="hinweis">Achte auf den Unterschied: Ob die Deportationen und Tötungen stattfanden, ist eine Frage der Belege. Wie man sie nennt, hat rechtliche und politische Folgen – deshalb wird um das Wort gestritten.</p></aside></div>`;
}
function seiteLk(){
  return landkarteL({ teil:"prinzip", frage:"Bundespräsident und Außenminister, Papst und türkischer Präsident: Welches Prinzip der Landkarte zeigt sich hier besonders deutlich – und warum sind die Unterschiede so groß?",
    heft:"2.1 Die Gemeinsamkeit einer jeden Geschichte: Welche Prinzipien zeigen sich hier besonders deutlich? Warum bestehen so große Unterschiede?",
    lead:"Sieh in deine Tabelle aus Auftrag 3, Zeile „Einfluss der politischen Rolle“. Was genau prägt hier, was jemand sagt?", platz:"Die Unterschiede entstehen, weil …",
    urteil:{
      "2-1-8":["zentral","Wer Geschichte erzählt, ist durch seinen gesellschaftlichen und kulturellen Gesamtkontext geprägt: Land, Amt, Zeit. Ein türkischer Präsident, ein deutscher Außenminister und ein Bundespräsident sprechen von verschiedenen Standorten aus – das erklärt die Unterschiede."],
      "2-1-2":["teils","Überzeugungen und Interessen prägen jede Sichtweise, auch hier. Der Kern dieser Stunde ist aber der Ort, von dem aus gesprochen wird: Staat und Amt. Das beschreibt die Landkarte mit einem eigenen Prinzip."],
      "2-1-4":["teils","Jede der vier Personen wählt aus, was sie betont. Warum sie so auswählt, erklärt aber erst ihr Standort."],
      "2-1-7":["teils","Aus denselben Fakten entstehen verschiedene Geschichten – das sieht man hier. Die Frage zielt auf den Grund dafür."],
      "2-1-9":["teils","Dass du mehrere Stimmen verglichen hast, ist die Folgerung aus dem Prinzip. Gefragt ist das Prinzip selbst."],
    },
    bruecke:`<b>Vergleiche mit M2:</b> Dort ging es um Ereignisse und ihre Ursachen. Hier geht es darum, wie über ein Ereignis gesprochen wird – und wozu. Geschichte wirkt in die Gegenwart.` });
}
L.schreib = {
  vor:"So kann die Aufgabe in der Klassenarbeit stehen. Die Begriffe der kognitiven Landkarte sind dort Prüfungsstoff.",
  aufgabe:`Im April 2015 sprach Bundespräsident Joachim Gauck vom „Völkermord“ an den Armeniern; Außenminister Frank-Walter Steinmeier vermied das Wort.<br><b>a) Erläutern Sie</b> mithilfe des Begriffs Standortgebundenheit, warum Menschen über dasselbe Ereignis verschieden sprechen.<br><b>b) Beurteilen Sie</b> eine der beiden Positionen mit einer Triftigkeitsprüfung.`,
  woerter:140, min:60,
  stufen:[["Grundlegend","Du nennst den Begriff Standortgebundenheit und stellst fest, dass die beiden verschieden sprechen."],["Sicher","Du erklärst an Amt und Interessen, warum die beiden verschieden sprechen, und wendest eine Triftigkeitsprüfung richtig an."],["Souverän","Du trennst die Frage der Belege von der Frage der Benennung, zeigst die Folgen der Wortwahl und kommst zu einem begründeten eigenen Urteil."]],
  inhalt:[["Standortgebundenheit:","Wer Geschichte erzählt, ist durch seinen gesellschaftlichen und kulturellen Gesamtkontext geprägt – hier durch Staat, Amt und Zeitpunkt."],
    ["Gauck:","Staatsoberhaupt, spricht für das Erinnern; nennt das Wort."],
    ["Steinmeier:","Außenminister, verantwortlich für die Beziehungen zu anderen Staaten, auch zur Türkei; vermeidet das Wort."],
    ["Triftigkeit:","empirisch – die Deportationen und Massentötungen sind belegt; normativ – die Benennung als Völkermord stützt sich auf die UN-Konvention von 1948 und hat rechtliche und politische Folgen."]],
};
function rueckblick(){
  return `${auftrag("Allein · 2 Minuten, dann Plenum", "Was denkst du jetzt?", "Lies deine Vermutung vom Anfang. Was hat sich bestätigt, was siehst du jetzt genauer?")}
  <div class="karte"><p class="kennung">Deine Vermutung aus Auftrag 1</p><p class="mein ${S.vermutung ? "" : "leer"}">${esc(S.vermutung || "noch nichts notiert")}</p></div>
  ${textfeld("neu", "Was denke ich jetzt?", { rows:3, zaehl:false, anfaenge:["Bestätigt hat sich, dass", "Neu ist für mich, dass"] })}
  ${fadenFeld()}`;
}
L.zf = {
  frage:L.frage,
  kern:"Was jemand über die Vergangenheit sagt, hängt auch von seinem Standort ab: von Land, Amt, Zeit und Interessen. Deshalb kann dasselbe Ereignis bis in die Gegenwart Streit auslösen – und deshalb prüfen wir Darstellungen mit den Triftigkeiten.",
  begriffe:[["Standortgebundenheit","Wer Geschichte erzählt, ist durch seinen gesellschaftlichen und kulturellen Gesamtkontext geprägt, oft unbewusst."],["Völkermord (Genozid)","systematische, beabsichtigte Vernichtung einer Gruppe wegen ihrer Herkunft oder Religion; seit der UN-Konvention von 1948 ein Rechtsbegriff."],["Deportation","erzwungene Verschleppung von Menschen."],["Empirische Triftigkeit","Stimmen die Tatsachen?"],["Normative Triftigkeit","Sind die Wertungen begründet?"],["Narrative Triftigkeit","Ist der Zusammenhang schlüssig?"]],
  abfolge:{ titel:"Vom Ereignis zum Streit um ein Wort", punkte:[["1915/16","Deportationen und Massentötungen an den Armenier*innen im Osmanischen Reich, organisiert von der Regierung der Jungtürken."],["1948","Die UNO beschließt die Konvention zur Verhütung und Bestrafung des Völkermords."],["April 2015","Hundertster Jahrestag: Gauck und Papst Franziskus sprechen von Völkermord, Steinmeier vermeidet das Wort, Erdoğan weist es zurück."],["Juni 2016","Der Deutsche Bundestag verwendet in einer Resolution das Wort „Völkermord“."]] },
  lk:{ name:"Standortgebundenheit", satz:"Wer Geschichte erzählt, ist durch seinen gesellschaftlichen und kulturellen Gesamtkontext geprägt, oft unbewusst.", beispiel:"Ein Bundespräsident, ein Außenminister, der Papst und der türkische Präsident sprechen 2015 von verschiedenen Standorten aus über 1915." },
  werkzeug:{ titel:"Eine Äußerung über die Vergangenheit prüfen", schritte:["Wer spricht – von welchem Standort (Land, Amt, Zeit) und mit welchem Interesse?","Stimmen die Tatsachen (empirisch)?","Sind die Wertungen begründet (normativ) und ist der Zusammenhang schlüssig (narrativ)?"] },
  sonst:"Recherche zu 1915/16 (Auftrag 2), vier Stimmen im April 2015 (Auftrag 3).",
  mein:[["Mein Urteil", "urteil"], ["Was ich jetzt denke", "neu"]],
};
function zusammenfassung(){ return zusammen(); }
const SEITE_FN = { start, vermuten, ereignis, stimmen, urteil, landkarte:seiteLk, schreiben:schreibauftrag, rueckblick, zusammenfassung, lehrkraft };
weimarStart();
