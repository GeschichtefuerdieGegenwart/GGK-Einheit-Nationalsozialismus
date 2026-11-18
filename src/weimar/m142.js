/* ===== M14.2 · Warum scheitert Weimar? Teil 2: Verfassung, Reichspräsident, Präsidialkabinette und Hitlers Weg zur Kanzlerschaft (Heft „Geschichte aktuell 1“, M14.2, M14.3, Emotionskurve) ===== */
const L = {
  wid:"m142", key:"ggk-w-m142:v1", nr:"M14.2", titel:"Warum scheitert Weimar? Verfassung und Präsidialkabinette", unter:"Der Reichspräsident, Artikel 48 und Hitlers Weg zur Kanzlerschaft", dauer:90, block:"d",
  /* Zeichen der Stunde: ein Paragraf mit Riss */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><path d="M21 9c0-3-2-5-5-5s-5 2-5 4.5c0 6 11 5 11 11 0 3-2.5 5-5.5 5S11 22 11 20" fill="none" stroke="#24221F" stroke-width="2.6" stroke-linecap="round"/><path d="M11 15.5c0-2 2-3.5 5-3.5m5 6.500c0 2-2 3.500-5 3.500" fill="none" stroke="#24221F" stroke-width="2.6" stroke-linecap="round"/><path d="M4 30l8-3 5 2 6-3 7 3" fill="none" stroke="#9B402D" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  frage:"Warum scheitert Weimar? An ihrer Verfassung – oder an den Menschen, die sie nicht verteidigen?",
  blick:{ name:"Politikgeschichte: Regeln und Entscheidungen an der Spitze", anker:"2-3-8", tut:"Du untersuchst die Verfassung und die Entscheidungen weniger Männer zwischen 1930 und 1933. Das steht der Ereignisgeschichte nahe.", fehlt:"Was fehlt: die Millionen, die wählten, hofften oder wegsahen. Wer nur auf Präsident und Kanzler schaut, übersieht, dass eine Demokratie auch von ihren Bürger*innen verteidigt werden muss." },
  pole:{ frage:"Woran scheitert die Republik am Ende mehr?", links:"an den Regeln der Verfassung", rechts:"an den Menschen" },
  linie:{ fall:"Am 30. Januar 1933 ernennt Hindenburg Hitler zum Reichskanzler – auf Anraten von Beratern wie Franz von Papen, mitten in der Krise und ohne Mehrheit im Reichstag.", frage:"Wie stark bestimmt hier die Umwelt Hindenburgs Entscheidung?", anf:["Die Umwelt wirkt hier durch", "Hindenburg hätte auch"] },
  deck:{ dauer:"Doppelstunde · 90 Minuten", jahr:"1930–1933", hier:[6, 7],
    satz:"Die Weltwirtschaftskrise bringt die Republik ins Wanken. Radikale Parteien gewinnen, das Parlament verliert an Macht. Jetzt muss sich zeigen, ob die junge Republik noch Anhänger*innen hat, die sich für sie einsetzen.",
    ziele:["die besondere Rolle des Reichspräsidenten und den Inhalt von Artikel 48 erklären,", "den Begriff „Präsidialkabinett“ erklären und beschreiben, wie sich die NSDAP zwischen 1929 und 1933 verhält,", "den Weg zu Hitlers Kanzlerschaft in groben Zügen darstellen und die Gefahren der Verfassung beurteilen."] },
  blatt:[
    { id:"erinnern", nr:"1", kurz:"Erst vermuten", name:"Erst erinnern und vermuten", form:"Allein · ohne Heft", min:4, frei:"offen" },
    { id:"praesident", nr:"2", kurz:"Reichspräsident", name:"Die Verfassung und der Reichspräsident", form:"Zu zweit", min:25, frei:"offen" },
    { id:"kabinette", nr:"3", kurz:"Hitlers Weg", name:"Präsidialkabinette und Hitlers Weg zur Kanzlerschaft", form:"Frei wählbar", min:27, frei:"antwort", nach:"praesident", fehlt:"Bearbeite erst Auftrag 2." },
    { id:"kurve", nr:"4", kurz:"Stimmungskurve", name:"Die Stimmungskurve der Weimarer Republik", form:"Allein, dann Plenum", min:10, frei:"ansage", gleich:"Rückblick auf das ganze Kapitel: Du zeichnest die Stimmung von 1918 bis 1933 als Kurve." },
    { id:"landkarte", nr:"L", kurz:"Landkarte", name:"Landkarte: Wozu das alles wissen?", form:"Allein", min:7, frei:"antwort", nach:"kabinette", fehlt:"Bearbeite erst Auftrag 3." },
    { id:"schreiben", nr:"5", kurz:"Schreibauftrag", name:"Schreibauftrag", form:"Allein", min:15, frei:"ansage", marke:"wie in der Klassenarbeit", gleich:"Du erklärst die Präsidialkabinette und erörterst die Rolle der Verfassung." },
    { id:"zusammenfassung", nr:"Z", kurz:"Zusammenfassung", name:"Zusammenfassung", form:"Zum Abheften", min:4, frei:"antwort", nach:"schreiben", fehlt:"Die Zusammenfassung öffnet sich nach deinem Text in Auftrag 5.", kopf:"Zum Abheften" },
  ],
  breit:["lehrkraft"],
  loesch:"Deine Vermutung, eure Notizen zur Verfassung, deine Recherche, deine Stimmungskurve, dein Eintrag ins kollektive Gedächtnis, dein Text und dein Satz für den roten Faden werden auf diesem Gerät entfernt.",
  init:() => ({ ab:{}, legal:"", p:{}, r:{}, ku:{}, wessen:"", anders:"" }),
  erledigt:{
    erinnern:() => [0,1].every(i => (S.ab.auf || {})[i]) && lang("legal", 15), praesident:() => tabelleVoll("p", 3, 1, 15),
    kabinette:() => tabelleVoll("r", 3, 1, 15) && lang("kg", 15), kurve:() => kurveVoll("ku", STATIONEN.length) && lang("wessen", 10) && lang("anders", 15),
    landkarte:() => !!S.lk.ok, schreiben:() => schreibFertig(),
  },
  fadenAnf:["Die Republik konnte sich nicht verteidigen, weil", "Eine Verfassung schützt die Demokratie nur, wenn"],
};
/* Organe der Weimarer Reichsverfassung: Angaben nach dem Verfassungsschaubild M1 des Hefts (Geschichte und Gesellschaft konkret, Cornelsen 2021) */
const ORGANE = [
  { id:"volk", titel:"Die Wahlberechtigten", kurz:"Männer und Frauen über 20 Jahre", punkte:["wählen den Reichstag: auf vier Jahre, nach dem Verhältniswahlrecht", "wählen den Reichspräsidenten: direkt, auf sieben Jahre", "können mit Volksbegehren und Volksentscheid selbst über Gesetze abstimmen"] },
  { id:"rt", titel:"Reichstag", kurz:"gesetzgebende Gewalt", punkte:["zwischen 421 und 647 Abgeordnete", "beschließt die Gesetze", "kann einzelne Minister und die ganze Regierung abberufen", "kann vom Reichspräsidenten aufgelöst werden"] },
  { id:"rr", titel:"Reichsregierung", kurz:"Reichskanzler und Minister", punkte:["Der Reichskanzler schlägt die Reichsminister vor.", "Kanzler und Minister werden vom Reichspräsidenten ernannt und entlassen.", "Die Regierung braucht das Vertrauen des Reichstags."] },
  { id:"rp", titel:"Reichspräsident", kurz:"Staatsoberhaupt", punkte:["vertritt das Reich nach außen", "ernennt und entlässt Reichskanzler und Reichsminister", "hat den Oberbefehl über die Reichswehr", "kann den Reichstag auflösen", "Notverordnungsrecht nach Artikel 48"] },
  { id:"rat", titel:"Reichsrat", kurz:"Vertretung der Länder", punkte:["66 Stimmen der 18 Länder", "kann gegen Gesetze Einspruch einlegen (einfaches Vetorecht)"] },
  { id:"rg", titel:"Reichsgericht", kurz:"richterliche Gewalt", punkte:["oberste Instanz", "entscheidet in Konflikten zwischen Reich und Ländern"] },
];
const EWH2 = [
  ["Reichspräsident – ein „Ersatzkaiser“?", "Er wird direkt vom Volk für sieben Jahre gewählt und steht neben dem Reichstag, in vielem sogar über ihm: Er ernennt und entlässt Kanzler und Minister, hat den Oberbefehl über die Reichswehr, kann den Reichstag auflösen und Notverordnungen erlassen. Wegen dieser Machtfülle wurde er oft „Ersatzkaiser“ genannt. Unter Paul von Hindenburg zeigte sich, dass er in Krisen am Parlament vorbei regieren lassen konnte."],
  ["Artikel 48", "Ist die öffentliche Sicherheit und Ordnung erheblich gestört oder gefährdet, kann der Reichspräsident „die zur Wiederherstellung der öffentlichen Sicherheit und Ordnung nötigen Maßnahmen treffen“ – notfalls mit Hilfe der bewaffneten Macht. Dazu darf er Grundrechte vorübergehend außer Kraft setzen: Freiheit der Person, Unverletzlichkeit der Wohnung, Briefgeheimnis, Meinungs-, Versammlungs- und Vereinigungsfreiheit, Eigentum. Der Reichstag kann die Maßnahmen aufheben – dazu braucht er aber eine Mehrheit."],
  ["Gefahren für die Demokratie", "Die Macht sammelt sich beim Präsidenten; die Regierung kann am Parlament vorbei regieren. Der Ausnahmefall wird zum Normalfall: Allein unter Reichskanzler Brüning ergehen in weniger als zwei Jahren über 60 Notverordnungen. Und wer Grundrechte außer Kraft setzen und das Parlament auflösen kann, kann die Demokratie mit legalen Mitteln abschaffen."],
];
const EWH3 = [
  ["Präsidialkabinette", "Regierungen der Jahre 1930 bis 1933, die sich nicht auf eine Mehrheit im Reichstag stützen, sondern auf das Vertrauen des Reichspräsidenten und seine Notverordnungen. Kanzler: Heinrich Brüning, Franz von Papen, Kurt von Schleicher. Folge: Der Reichstag verliert seine Rolle, das Vertrauen in die Demokratie sinkt weiter, eine autoritäre Lösung erscheint vielen normal."],
  ["Verhalten der NSDAP 1929–1933", "Radikale Opposition gegen die „Systemparteien“ – die Krise liefert den Stoff für die Propaganda. Massenkundgebungen, Plakate, klare Feindbilder: Jüdinnen und Juden, „Novemberverbrecher“, Kommunist*innen. Hitler lässt sich als „Retter“ feiern. Nach außen gilt die Legalitätstaktik: Macht nur über Wahlen. Zugleich übt die SA Terror gegen politische Gegner*innen aus."],
  ["Hitlers Weg zur Kanzlerschaft", "Die Wahlerfolge von 1932 machen die NSDAP für konservative Politiker unumgänglich. Hitler fordert das Kanzleramt, Hindenburg lehnt zunächst ab. Nach Neuwahlen, Intrigen und zwei gescheiterten Kanzlern ernennt Hindenburg ihn am 30. Januar 1933 – auf Anraten von Beratern wie Franz von Papen. Die Konservativen glauben, Hitler „einrahmen“ und kontrollieren zu können. Hitler führt eine Regierung aus NSDAP und DNVP."],
];
/* Machtmechanismus der Präsidialregierungen: nach dem Schaubild von Reinhard Sturm im Unterrichtsheft (M14.3). Eigene Darstellung. */
const MECH = [["1 · Vorlage","Die Regierung bringt ein umstrittenes Gesetz im Reichstag ein.",""],["2 · Ablehnung","Der Reichstag lehnt die Vorlage ab.",""],["3 · Notverordnung","Der Reichspräsident setzt sie nach Artikel 48 trotzdem in Kraft.","rot"],["4 · Einspruch","Der Reichstag verlangt die Aufhebung der Notverordnung.",""],["5 · Auflösung","Der Reichspräsident löst den Reichstag nach Artikel 25 auf und setzt die Notverordnung wieder in Kraft.","rot"],["6 · Ohne Kontrolle","Bis zur Neuwahl regiert die Regierung bis zu 60 Tage mit Notverordnungen.","rot"]];
const WEG = [["30.3.1930","Brüning","Heinrich Brüning wird Kanzler – das erste Präsidialkabinett.",""],["Sept. 1930","Wahl","NSDAP: " + String(wahlAnteil("1930","ns")).replace(".", ",") + " Prozent.",""],["Juni 1932","Papen","Nach Brünings Rücktritt wird Franz von Papen Kanzler.",""],["31.7.1932","Wahl","NSDAP stärkste Partei: " + String(wahlAnteil("1932a","ns")).replace(".", ",") + " Prozent.","rot"],["6.11.1932","Wahl","NSDAP verliert: " + String(wahlAnteil("1932b","ns")).replace(".", ",") + " Prozent.",""],["3.12.1932","Schleicher","Kurt von Schleicher wird Kanzler.",""],["30.1.1933","Hitler","Hindenburg ernennt Hitler zum Reichskanzler.","rot"]];
const STATIONEN = [["1918","Kriegsende, Versailler Vertrag, Dolchstoßlegende"],["Die Gründung","Novemberrevolution, doppelte Ausrufung, Spartakusaufstand"],["Krisenjahr 1923","Ruhrkampf, Hyperinflation, Hitler-Ludendorff-Putsch, Währungsreform"],["Stabilisierung","außenpolitische Erfolge, Goldene Zwanziger"],["Krise ab 1929","Weltwirtschaftskrise, Präsidialkabinette"],["1933","Nationalsozialismus"]];
const QUELLEN3 = [["Bundeszentrale für politische Bildung: Machteroberung 1933","https://www.bpb.de/shop/zeitschriften/izpb/nationalsozialismus-aufstieg-und-herrschaft-314/137194/machteroberung-1933/"],["LeMO (Deutsches Historisches Museum): Etablierung der NS-Herrschaft","https://www.dhm.de/lemo/kapitel/ns-regime/etablierung-der-ns-herrschaft.html"],["Film aus den Empfehlungen des Hefts (YouTube)","https://www.youtube.com/watch?v=ErSO_z2SYtE"]];

function start(){ return deckblatt(); }
function erinnern(){
  return `${auftrag("Allein · 3 Minuten · ohne Heft", "Erst erinnern, dann vermuten", "Beantworte die zwei Fragen aus dem Kopf und deck dann auf. Vermute danach: Wie kann eine Demokratie ausgehöhlt werden, ohne dass jemand die Verfassung bricht?")}
  ${abrufen("ab", [
    ["Was löst die Weltwirtschaftskrise aus – und wie trifft sie Deutschland (M14)?", "Der Börsenkrach in New York im Oktober 1929. Die amerikanischen Banken fordern ihre Kredite zurück; Betriebe entlassen, Banken brechen zusammen, Millionen werden arbeitslos."],
    ["Wie entwickelt sich die NSDAP bei den Wahlen 1928 bis 1932 (M14)?", "Von 2,6 Prozent (1928) über 18,3 (1930) auf 37,3 Prozent im Juli 1932; im November 1932 verliert sie wieder (33,1 Prozent)."],
  ])}
  ${textfeld("legal", "Meine Vermutung: Wie höhlt man eine Demokratie mit legalen Mitteln aus?", { rows:3, zaehl:false, anfaenge:["Indem man", "Gefährlich wird es, wenn"] })}`;
}
function praesident(){
  return `${auftrag("Zu zweit · 25 Minuten", "Die Macht des Reichspräsidenten", "Untersucht die Verfassung: Wer wählt wen, wer darf was? Charakterisiert dann die besondere Rolle des Reichspräsidenten und beurteilt, inwiefern er ein „Ersatzkaiser“ ist. Recherchiert, was Artikel 48 enthält. Diskutiert, welche Gefahren ihr für die Demokratie seht.")}
  <h3 class="klein">Die Weimarer Reichsverfassung von 1919</h3>
  ${bild({ datei:"heft-m14-verfassung.jpg", alt:"Schaubild der Weimarer Reichsverfassung von 1919 mit drei Gewalten: Reichspräsident und Reichsregierung, Reichstag und Reichsrat, Reichsgericht. Darunter stehen die Länder und die wahlberechtigten Staatsbürgerinnen und Staatsbürger.", text:"Schaubild aus dem Heft: Wer wählt wen, wer darf was? Die Karten darunter sagen dasselbe in Worten.", nachweis:"Aus dem Unterrichtsheft, M14.2 (Geschichte und Gesellschaft konkret, Cornelsen 2021)." })}
  ${wahlKarte("org", ORGANE.map((o, i) => ({ id:o.id, nr:String(i + 1), titel:o.titel, unter:o.kurz, html:`<h3>${esc(o.titel)}</h3><p class="kennung">${esc(o.kurz)}</p><ul>${o.punkte.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` })), { titel:"Organ wählen", klasse:"viele" })}
  <p class="quelle">Angaben nach dem Verfassungsschaubild im Unterrichtsheft, M14.2 (Geschichte und Gesellschaft konkret, Cornelsen 2021).</p>
  ${tabelle("p", ["", "Unsere Ergebnisse"], ["Rolle des Reichspräsidenten – ein „Ersatzkaiser“?", "Artikel 48 der Verfassung: Was steht darin?", "Gefahren für die Demokratie"], { rows:3 })}
  ${vergleich("pvgl", ["p.0.0","p.1.0","p.2.0"], 15, "Mit dem Heft vergleichen", `<div class="w-karten k3">${EWH2.map(e => `<article class="w-kk"><h3>${esc(e[0])}</h3><p>${esc(e[1])}</p></article>`).join("")}</div><p class="quelle">Gekürzt nach dem Erwartungshorizont des Unterrichtsheftes, M14.2. Die Zahl der Notverordnungen unter Brüning nach: E. Piper, „Zerstörung der Demokratie 1930–1933“, Bundeszentrale für politische Bildung 2021.</p>`)}`;
}
function kabinette(){
  return `${auftrag("Frei wählbar · 25 Minuten", "Präsidialkabinette und Hitlers Weg zur Kanzlerschaft", "Am 30. Januar 1933 wird Adolf Hitler zum Reichskanzler ernannt. Die Weltwirtschaftskrise hat dazu viel beigetragen, aber sie ist nicht allein schuld. Recherchiere mit mindestens einer der Empfehlungen und halte deine Ergebnisse fest.")}
  <div class="ab-zwei schmalrechts"><div>${tabelle("r", ["Frage", "Meine Ergebnisse"], ["1 · Was sind Präsidialkabinette – und welche Rolle spielen sie bei der Machtübernahme?", "2 · Wie verhält sich die NSDAP zwischen 1929 und 1933?", "3 · Wie wird Hitler schließlich Reichskanzler?"], { rows:4 })}</div>
  <div>${wissen("Empfehlungen des Hefts", `<ul>${QUELLEN3.map(q => `<li><a href="${q[1]}" target="_blank" rel="noopener">${esc(q[0])} ↗</a></li>`).join("")}<li>das Schulbuch: Verfassertext zur Machtübernahme</li></ul><p class="hinweis">Die Links öffnen außerhalb dieser Seite. Notiere, was du woher hast.</p>`)}</div></div>
  ${vergleich("rvgl", ["r.0.0","r.1.0","r.2.0"], 15, "Mit dem Heft vergleichen", `<h3 class="klein">So arbeiteten die Präsidialregierungen</h3><ol class="w-kette">${MECH.map(k => `<li class="${k[2]}"><b>${esc(k[0])}</b>${esc(k[1])}</li>`).join("")}</ol><p>Durch das Zusammenspiel von Artikel 48 und Artikel 25 wurde das Parlament als Ort der Entscheidung ausgeschaltet.</p><p class="quelle">Nach dem Schaubild von Reinhard Sturm im Unterrichtsheft, M14.3. Eigene Darstellung.</p>
  ${zeitleiste(WEG, { klasse:"klein" })}
  <div class="w-karten k3">${EWH3.map(e => `<article class="w-kk"><h3>${esc(e[0])}</h3><p>${esc(e[1])}</p></article>`).join("")}</div><p class="quelle">Gekürzt nach dem Erwartungshorizont des Unterrichtsheftes, M14.3. Daten der Kanzler nach: E. Piper, Bundeszentrale für politische Bildung 2021; Wahlergebnisse berechnet aus den Stimmenzahlen bei der Konrad-Adenauer-Stiftung.</p>`)}
  ${kgFeld("Mein Eintrag: Verhalten der NSDAP", "Wie tritt die NSDAP auf – und was macht das mit dem Bild, das Menschen von der Republik haben? Zwei bis drei Stichpunkte für das Raster aus M8.1.")}
  ${linieFeld()}`;
}
function kurveS(){
  return `${auftrag("Allein · 6 Minuten, dann Plenum · 4 Minuten", "Die Stimmungskurve", "Blick zurück auf das ganze Kapitel: Wie war die Stimmung in der Republik? Tippe für jede Station einen Wert von 1 (sehr schlecht) bis 5 (sehr gut) an. Es entsteht eine Kurve. Vergleicht eure Kurven im Plenum.")}
  ${kurve("ku", STATIONEN)}
  <p class="quelle">Stationen nach der „Emotionskurve der Weimarer Republik“ im Unterrichtsheft. Die Kurve ist deine Einschätzung, kein Messwert.</p>
  <div class="ab-zwei gleich"><div>${textfeld("wessen", "Wessen Stimmung hast du eingetragen? Die von Lotte, die von Anna – oder eine andere?", { rows:2, zaehl:false, anfaenge:["Ich habe an … gedacht, weil"] })}</div>
  <div>${textfeld("anders", "An welcher Stelle hätte es anders kommen können? Was hätte es dazu gebraucht?", { rows:2, zaehl:false, anfaenge:["Anders kommen können hätte es, als", "Dazu hätte es"] })}</div></div>`;
}
function seiteLk(){
  return landkarteL({ teil:"wozu", frage:"Du hast untersucht, wie eine Demokratie Schritt für Schritt ausgehöhlt wurde. Welchen Punkt aus „Wozu Geschichte?“ setzt das um?",
    lead:"Die Republik wurde nicht gestürmt. Vermute: Was nützt es dir heute, zu wissen, wie das ging?", platz:"Es nützt mir, weil …",
    urteil:{
      "1-8":["zentral","Du hast untersucht, wie eine Demokratie gescheitert ist: an Regeln, die sich gegen ihren Sinn nutzen ließen, und an Menschen, die sie nicht verteidigt haben. Wer das versteht, kann sich besser an der Demokratie beteiligen."],
      "1-4":["teils","Lernen lässt sich daraus – aber Vorsicht: Situationen wiederholen sich nie genau. Der Eintrag, der Wissen über das Scheitern von Demokratien mit dem eigenen Handeln verbindet, trifft es genauer."],
      "1-1":["teils","Bei der Propaganda der NSDAP stimmt das. Der Kern dieser Stunde ist aber die Verfassung: Wer kontrolliert wen?"],
      "1-3":["teils","Du befragst Weimar mit Fragen von heute – richtig. Noch genauer ist der Eintrag, der vom Entstehen und Scheitern von Demokratien spricht."],
    },
    bruecke:`<b>Merke:</b> Das Grundgesetz von 1949 zieht Lehren aus Weimar. Welche? Das ist eine Frage für den Gemeinschaftskunde-Teil.` });
}
L.schreib = {
  vor:"So kann die Aufgabe in der Klassenarbeit stehen: Material, zwei Operatoren, höchstens eine Seite. Hier schreibst du eine halbe Seite.",
  aufgabe:`<b>a) Erklären Sie</b> den Begriff „Präsidialkabinett“.<br><b>b) Erörtern Sie</b>, ob die Weimarer Verfassung die Zerstörung der Demokratie ermöglicht hat.`,
  material:`<p><b>M1 · Rechte des Reichspräsidenten:</b> Ernennung und Entlassung des Reichskanzlers · Oberbefehl über die Reichswehr · Auflösung des Reichstags (Artikel 25) · Notverordnungen (Artikel 48), dabei dürfen Grundrechte vorübergehend außer Kraft gesetzt werden.</p><p><b>M2 · Der Mechanismus:</b> Der Reichstag lehnt ein Gesetz ab → der Präsident erlässt es als Notverordnung → der Reichstag verlangt die Aufhebung → der Präsident löst den Reichstag auf.</p><p><b>M3 · Der Weg:</b> 30. März 1930 Brüning · Juli 1932 NSDAP stärkste Partei · 30. Januar 1933 Hitler Reichskanzler einer Regierung aus NSDAP und DNVP.</p><p class="quelle">Nach dem Unterrichtsheft, M14.2 und M14.3.</p>`,
  woerter:150, min:60,
  stufen:[["Grundlegend","Du erklärst, was ein Präsidialkabinett ist, und nennst Artikel 48."],["Sicher","Du erklärst den Mechanismus aus Artikel 48 und Artikel 25 und zeigst an einem Beispiel, wie er das Parlament ausschaltet."],["Souverän","Du wägst ab: Was ermöglicht die Verfassung, was entscheiden Menschen (Hindenburg, die konservativen Berater, die Wähler*innen)? Du kommst zu einem begründeten Urteil."]],
  inhalt:[["Präsidialkabinett:","Regierung ohne Mehrheit im Reichstag, gestützt auf das Vertrauen des Reichspräsidenten und seine Notverordnungen (1930–1933: Brüning, Papen, Schleicher)."],
    ["Dafür, dass die Verfassung es ermöglicht:","Machtfülle des Präsidenten; Artikel 48 ohne klare Grenzen; Zusammenspiel mit Artikel 25 schaltet das Parlament aus; Grundrechte können außer Kraft gesetzt werden."],
    ["Dagegen:","Eine Verfassung handelt nicht selbst. Entscheidend sind Menschen: Parteien, die keine Mehrheit bilden; ein Präsident, der die Republik nicht verteidigt; Konservative, die Hitler „einrahmen“ wollen; Millionen, die antidemokratische Parteien wählen."],
    ["Urteil:","Tragfähig sind verschiedene Urteile – von „Die Verfassung hat es ermöglicht“ bis „Entscheidend waren Menschen“. Es zählt: Du wägst Regeln (Artikel 48 und 25) gegen Entscheidungen ab (Hindenburg, seine Berater, die Parteien, die Wähler*innen) und begründest, was für dich schwerer wiegt."]],
};
L.zf = {
  frage:L.frage,
  kern:"Die Verfassung gibt dem Reichspräsidenten große Macht: Er ernennt den Kanzler, kann den Reichstag auflösen und mit Notverordnungen regieren (Artikel 48). Ab 1930 regieren Präsidialkabinette am Parlament vorbei. In der Krise wird die NSDAP zur stärksten Partei. Am 30. Januar 1933 ernennt Hindenburg Hitler zum Reichskanzler – konservative Politiker glauben, ihn kontrollieren zu können.",
  begriffe:[["Reichspräsident","direkt gewähltes Staatsoberhaupt mit großer Macht; ab 1925 Paul von Hindenburg."],["Artikel 48","Notverordnungsrecht: Der Präsident darf im Notstand ohne Parlament Maßnahmen treffen und Grundrechte außer Kraft setzen."],["Notverordnung","Anordnung des Reichspräsidenten mit der Kraft eines Gesetzes."],["Präsidialkabinett","Regierung ohne Mehrheit im Reichstag, gestützt auf den Reichspräsidenten (1930–1933)."],["Legalitätstaktik","Die NSDAP gibt vor, die Macht nur über Wahlen erreichen zu wollen."],["SA","„Sturmabteilung“ der NSDAP; übt Terror gegen politische Gegner*innen aus."]],
  abfolge:{ titel:"Der Weg zum 30. Januar 1933", punkte:WEG.map(w => [w[0], w[1] + ": " + w[2]]) },
  zahlen:[["über 60","Notverordnungen unter Brüning in weniger als zwei Jahren"],["60 Tage","regiert die Regierung nach einer Auflösung des Reichstags ohne Kontrolle"],["30.1.1933","Hitler wird Reichskanzler"]],
  lk:{ name:"Demokratisches Bewusstsein (1.8)", satz:"Wer versteht, wie Demokratien entstanden sind und wie sie gescheitert sind, kann sich besser an der Demokratie beteiligen.", beispiel:"Die Republik wurde nicht gestürmt. Sie wurde ausgehöhlt – mit Mitteln, die die Verfassung selbst bereitstellte, und weil zu wenige sie verteidigten." },
  werkzeug:{ titel:"Eine Verfassung auf Schwachstellen prüfen", schritte:["Wer kontrolliert wen – und wo fehlt eine Kontrolle?","Was gilt im Ausnahmefall, und wer entscheidet, wann er eintritt?","Was geschieht, wenn Verantwortliche die Regeln gegen ihren Sinn nutzen?"] },
  sonst:"die Organe der Verfassung (Auftrag 2), der Mechanismus der Präsidialregierungen (Auftrag 3), deine Stimmungskurve (Auftrag 4).",
  mein:[["Meine Stimmungskurve 1918–1933 (1 bis 5)", () => kurveVoll("ku", STATIONEN.length) ? STATIONEN.map((s, i) => `${s[0]}: ${S.ku[i]}`).join(" · ") + ". " + S.anders : ""], ["Mein Eintrag ins kollektive Gedächtnis", "kg"]],
};
function zusammenfassung(){ return fadenFeld() + zusammen(); }
const SEITE_FN = { start, erinnern, praesident, kabinette, kurve:kurveS, landkarte:seiteLk, schreiben:schreibauftrag, zusammenfassung, lehrkraft };
weimarStart();
