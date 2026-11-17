/* ===== M12 · Stabilisierungsjahre: Die Goldenen Zwanziger (Heft „Geschichte aktuell 1“, M12 mit Erwartungshorizont) ===== */
const L = {
  wid:"m12", key:"ggk-w-m12:v1", nr:"M12", titel:"Stabilisierungsjahre: Die Goldenen Zwanziger", unter:"Wie golden waren sie – und für wen?", dauer:90, block:"d",
  /* Zeichen der Stunde: eine Schallplatte mit goldenem Etikett */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><circle cx="17" cy="17" r="13" fill="#24221F"/><circle cx="17" cy="17" r="9" fill="none" stroke="#FBF8F1" stroke-width=".8" opacity=".6"/><circle cx="17" cy="17" r="5" fill="#E0B74A"/><circle cx="17" cy="17" r="1.3" fill="#24221F"/></svg>`,
  frage:"Inwieweit ist es gerechtfertigt, von den „Goldenen Zwanzigern“ zu sprechen?",
  deck:{ dauer:"Doppelstunde · 90 Minuten", jahr:"1924–1929", hier:[5],
    satz:"Revuen, Jazz, Kino, Bauhaus: Die Jahre nach der Inflation gelten als golden. Die meisten Menschen lebten aber nicht in Berlin.",
    ziele:["Kunst, Kultur und Lebensgefühl der Zwanzigerjahre an Beispielen beschreiben,", "Unterschiede zwischen Stadt und Land darstellen,", "mit den drei Triftigkeiten prüfen, wie gerechtfertigt der Begriff „Goldene Zwanziger“ ist."] },
  blatt:[
    { id:"vorher", nr:"1", kurz:"Bild im Kopf", name:"Erst erinnern – und dein Bild im Kopf", form:"Allein · ohne Heft", min:4, frei:"offen" },
    { id:"collage", nr:"2", kurz:"Recherche", name:"Recherche und Collage", form:"Zu zweit", min:30, frei:"offen" },
    { id:"land", nr:"3", kurz:"Stadt und Land", name:"Stadt und Land", form:"Allein", min:12, frei:"offen" },
    { id:"trift", nr:"4", kurz:"Triftigkeit", name:"Die Triftigkeitsprüfung", form:"Zu zweit", min:18, frei:"antwort", nach:"land", fehlt:"Bearbeite erst Auftrag 3." },
    { id:"landkarte", nr:"L", kurz:"Landkarte", name:"Landkarte: Welche Prinzipien werden deutlich?", form:"Allein", min:6, frei:"antwort", nach:"trift", fehlt:"Bearbeite erst Auftrag 4." },
    { id:"schreiben", nr:"5", kurz:"Schreibauftrag", name:"Schreibauftrag", form:"Allein", min:15, frei:"ansage", marke:"wie in der Klassenarbeit", gleich:"Du überprüfst den Begriff „Goldene Zwanziger“ und nimmst Stellung." },
    { id:"zusammenfassung", nr:"Z", kurz:"Zusammenfassung", name:"Zusammenfassung", form:"Zum Abheften", min:4, frei:"antwort", nach:"schreiben", fehlt:"Die Zusammenfassung öffnet sich nach deinem Text in Auftrag 5.", kopf:"Zum Abheften" },
  ],
  breit:["lehrkraft"],
  loesch:"Deine Notizen, eure Recherche, eure Triftigkeitsprüfung, dein Eintrag ins kollektive Gedächtnis, dein Text und dein Satz für den roten Faden werden auf diesem Gerät entfernt.",
  init:() => ({ ab:{}, bild:"", g1:null, re:{}, coll:"", sch:"", wer:"", tr:{}, g2:null, urteil:"" }),
  erledigt:{
    vorher:() => [0,1].every(i => (S.ab.auf || {})[i]) && lang("bild", 10) && S.g1 != null, collage:() => [0,1,2,3].filter(r => lang(`re.${r}.0`, 10)).length >= 3 && lang("coll", 10),
    land:() => lang("sch", 1) && lang("wer", 20), trift:() => tabelleVoll("tr", 3, 2, 8) && S.g2 != null && lang("urteil", 20) && lang("kg", 15),
    landkarte:() => !!S.lk.ok, schreiben:() => schreibFertig(),
  },
  fadenAnf:["Auch in guten Jahren bleibt die Demokratie verwundbar, weil", "„Golden“ waren die Zwanziger nur für"],
};
/* Vier Recherchefelder des Hefts; Hinweise gekürzt nach dem Erwartungshorizont (Heft S. 53) */
const FELDER12 = [
  { id:"avant", titel:"Avantgarde", frage:"Wer brach mit den alten Formen – und wie?", ewh:"Künstler*innen und Intellektuelle, die bewusst mit überlieferten Formen brachen und neue Ausdrucksweisen suchten. Schlagworte: Bauhaus (Walter Gropius in Weimar), Dadaismus, Surrealismus, Neue Sachlichkeit, Jazz und Revue." },
  { id:"expr", titel:"Expressionismus", frage:"Wie sieht expressionistische Kunst aus, wovon handelt sie?", ewh:"Stark vereinfachte, ausdrucksstarke Formen, grelle Farben, Betonung von Gefühl und innerem Erleben. Themen: Krieg, Elend, Hektik der Großstadt, soziale Gegensätze. Gegenstück: die nüchternen Bilder der Neuen Sachlichkeit." },
  { id:"charl", titel:"Charleston", frage:"Woher kommt der Tanz, wofür steht er?", ewh:"Der Modetanz der 1920er-Jahre. Entstanden in den USA zu James P. Johnsons Jazzstück „The Charleston“, ab 1925 durch Josephine Baker in Europa bekannt. Schnelle Jazzrhythmen, ausgelassenes Nachtleben in Tanzlokalen und Revuen – gerade in Berlin." },
  { id:"rausch", titel:"Rausch und Drogen", frage:"Welche Drogen wurden in dieser Zeit konsumiert – und von wem?", ewh:"Morphium: verbreitet unter Kriegsversehrten, die im Krieg damit gegen Schmerzen behandelt worden waren. Kokain: Modedroge bestimmter Milieus der Großstadt – neuere Forschung widerspricht dem Bild einer „Drogenrepublik“. Opium und Heroin: in Arzneien enthalten; das Suchtrisiko wurde unterschätzt. Alkohol und Nikotin: überall." },
];
/* Tabelle des Hefts: Unterschiede zwischen Stadt und Land */
const STADTLAND = [
  { id:"sozial", titel:"Soziale Strukturen", stadt:"Vielfältige soziale Schichten, von Arbeiter*innen bis zur Oberschicht. Offen für neue Ideen.", land:"Hergebrachte, hierarchische Strukturen. Einheitlicher und konservativer." },
  { id:"wirt", titel:"Wirtschaft", stadt:"Geprägt von Industrie und Dienstleistungen. Mehr Arbeitsplätze, wirtschaftliche Bewegung.", land:"Landwirtschaftlich geprägt. Abhängig von den Erträgen, oft in unsicherer Lage." },
  { id:"bild", titel:"Bildung und Kultur", stadt:"Viele Bildungseinrichtungen und kulturelle Angebote. Besserer Zugang zu Bildung und Kunst.", land:"Eingeschränkter Zugang zu Bildung. Kulturelle Angebote meist örtlich und überliefert." },
  { id:"pol", titel:"Politische Einstellungen", stadt:"Vielfältige politische Landschaft. Aktive Teilnahme an politischen Bewegungen und Debatten.", land:"Konservativere Einstellungen. Skepsis gegenüber den Veränderungen der Weimarer Republik." },
  { id:"alltag", titel:"Lebensstil und Alltag", stadt:"Hektisches, modernes Leben in Mietskasernen. Abhängig von den Annehmlichkeiten der Stadt.", land:"Leben in größeren, eigenen Häusern. Stärker vom Rhythmus der Landwirtschaft geprägt." },
];
const TRIFT = LKTEIL.trift.liste;
const TR_ERG = [
  ["Empirisch", "Belegt sind die wirtschaftliche Stabilisierung nach 1924 (Rentenmark, Dawes-Plan), technischer Fortschritt (Elektrifizierung, Radio, Auto) und ein deutlicher Kulturboom in den Großstädten. Belegt ist aber auch Elend: Arbeitslosigkeit in Krisenjahren, enge Mietskasernen, belastete ländliche Regionen. Über 70 Prozent lebten auf dem Land oder in kleinen Städten.", "Für Großstädte und bestimmte Milieus gut belegt – für die ganze Gesellschaft nur eingeschränkt."],
  ["Normativ", "„Golden“ ist eine starke, positive Wertung: kulturelle Blüte, Lebensfreude, neue Rollenbilder. Sie entspricht den Erfahrungen bestimmter Gruppen – städtisches Bürgertum, Künstler*innen, Intellektuelle. Für Landbevölkerung, Arbeitslose und Ausgegrenzte gilt sie kaum. Sie überdeckt politische Gewalt und Unsicherheit.", "Nur eingeschränkt triftig: golden für bestimmte Gruppen, zwiespältig für die Gesellschaft insgesamt."],
  ["Narrativ", "Die Erzählung „Krise nach 1918 – Stabilisierung 1924 bis 1929 – erneute Krise ab 1929“ ordnet die Zeit schlüssig und hat klare Symbole: Charleston, Kino, „Neue Frau“, Bauhaus. Sie vereinfacht aber (Glanz gegen Elend) und baut die politische Radikalisierung und die Anfälligkeit der Wirtschaft zu wenig ein.", "Als Ordnung der Zeit triftig, aber vereinfachend. Sie braucht Gegen-Erzählungen."],
];

function start(){ return deckblatt(); }
function vorher(){
  return `${auftrag("Allein · 4 Minuten · ohne Heft", "Erst erinnern – und dein Bild im Kopf", "Beantworte die zwei Fragen aus dem Kopf und deck dann auf. Notiere danach, welche Bilder du im Kopf hast, wenn du „Goldene Zwanziger“ hörst, und schätze ein, wie golden diese Jahre waren.")}
  ${abrufen("ab", [
    ["Was beendete im November 1923 die Hyperinflation (M11)?", "Die Währungsreform: Am 15. November 1923 wurde die Rentenmark eingeführt. Eine Billion Papiermark entsprach einer Rentenmark."],
    ["Welche Parteien gewannen bei der Wahl im Mai 1924 (M11)?", "Die Ränder: die DNVP sowie Völkische und Nationalsozialisten. Die Parteien der Mitte verloren."],
  ])}
  <div class="ab-zwei gleich" style="margin-top:1.2rem"><div>${textfeld("bild", "Meine Bilder im Kopf: „Goldene Zwanziger“", { rows:3, zaehl:false, platz:"Stichworte: Was siehst du, was hörst du?" })}</div>
  <div>${skala("g1", "Wie golden waren die Zwanziger? Deine erste Einschätzung.", 5, "1 = gar nicht golden", "5 = wirklich golden")}</div></div>`;
}
function collage(){
  return `${auftrag("Zu zweit · 30 Minuten", "Recherche und Collage", "Recherchiert zu den vier Feldern und erstellt eine Collage über die Goldenen Zwanziger – auf dem Tablet oder auf Papier. Notiert eure Ergebnisse in Stichpunkten und schreibt auf, woher sie stammen.")}
  <p class="lead">Als „Goldene Zwanziger“ werden – etwas verklärt – vor allem die Jahre zwischen 1924 und 1929 bezeichnet: die Zeit zwischen dem Ende der Hyperinflation und der Weltwirtschaftskrise. Kunst und Kultur konnten sich in der Weimarer Republik recht frei entfalten. Die Grenze zwischen Hochkultur und Massenkunst brach auf. In Berlin gab es einen Boom an Revuen, Tanz, Operetten, Unterhaltungsmusik und Kino: Schon 1922 zählte die Hauptstadt 32 Kabarettbühnen.</p>
  <p class="quelle">Nach: Bundesarchiv, virtuelle Ausstellung „Aufbruch in die Moderne“, Abschnitt „Goldene Zwanziger“ (Link im Unterrichtsheft, M12). Der Zeitraum ist gegenüber dem Heft berichtigt.</p>
  ${tabelle("re", ["Feld", "Was wir herausgefunden haben", "Unsere Quelle"], FELDER12.map(f => f.titel + ": " + f.frage), { rows:3 })}
  ${textfeld("coll", "Unsere Collage zeigt … (ein Satz, wenn sie fertig ist)", { rows:2, zaehl:false })}
  ${vergleich("cvgl", ["re.0.0","re.1.0","re.2.0"], 10, "Mit den Hinweisen des Hefts vergleichen", `<div class="w-karten k2">${FELDER12.map(f => `<article class="w-kk"><h3>${esc(f.titel)}</h3><p>${esc(f.ewh)}</p></article>`).join("")}</div><p class="quelle">Gekürzt nach dem Erwartungshorizont des Unterrichtsheftes, M12.</p>`)}
  <p class="hinweis"><b>Gute Startpunkte:</b> LeMO (Deutsches Historisches Museum), die Bundeszentrale für politische Bildung, das Bundesarchiv. Bilder für die Collage brauchen eine Quellenangabe.</p>`;
}
function land(){
  return `${auftrag("Allein · 12 Minuten", "Stadt und Land", "Die Amüsierbetriebe Berlins waren nur eine Seite des Lebens. Schätze zuerst. Vergleiche dann Stadt und Land an fünf Gesichtspunkten und beantworte die Frage: Für wen waren die Zwanziger „golden“ – für wen nicht?")}
  <div class="ab-zwei gleich"><div>${eingabe("sch", "Schätze: Wie viel Prozent der Menschen lebten auf dem Land oder in kleinen Städten?", "eine Zahl")}</div>
  <div>${vergleich("svgl", ["sch"], 1, "Mit der Angabe des Hefts vergleichen", `<p><b>Über 70 Prozent</b> lebten auf dem Land oder in kleinen Städten. In den ländlich geprägten Regionen gab es den „Kultur-Boom“ gar nicht oder nur stark abgeschwächt.</p><p class="quelle">Angabe des Unterrichtsheftes, M12.</p>`)}</div></div>
  ${wahlKarte("sl", STADTLAND.map((s, i) => ({ id:s.id, nr:String(i + 1), titel:s.titel, unter:"Stadt und Land", html:`<h3>${esc(s.titel)}</h3><div class="w-vs"><div class="blau"><p class="kennung">Stadt</p><p>${esc(s.stadt)}</p></div><div class="rot"><p class="kennung">Land</p><p>${esc(s.land)}</p></div></div><p class="quelle">Nach der Tabelle im Unterrichtsheft, M12.</p>` })), { titel:"Gesichtspunkt wählen" })}
  ${textfeld("wer", "Für wen waren die Zwanziger „golden“ – für wen nicht?", { rows:3, zaehl:false, anfaenge:["Golden waren sie für", "Kaum etwas davon hatten", "Das liegt daran, dass"] })}`;
}
function trift(){
  return `${auftrag("Zu zweit · 18 Minuten", "Die Triftigkeitsprüfung", "Inwieweit ist es gerechtfertigt, von den „Goldenen Zwanzigern“ zu sprechen? Prüft den Begriff mit den drei Triftigkeiten der kognitiven Landkarte. Notiert zu jeder, was dafür und was dagegen spricht. Entscheidet euch dann.")}
  <div class="w-karten k3">${TRIFT.map(t => `<article class="w-kk"><h3>${esc(t[1])}</h3><p>${esc(t[2])}</p></article>`).join("")}</div>
  <p class="quelle">Wortlaut der kognitiven Landkarte, 2.2.</p>
  ${tabelle("tr", ["Prüfung", "Was spricht für „golden“?", "Was spricht dagegen?"], TRIFT.map(t => t[1].replace(" Triftigkeit", "")), { rows:3 })}
  ${vergleich("trvgl", ["tr.0.0","tr.1.0","tr.2.0"], 8, "Mit dem Ergebnis des Hefts vergleichen", `<div class="w-karten k3">${TR_ERG.map(t => `<article class="w-kk"><h3>${esc(t[0])}</h3><p>${esc(t[1])}</p><p><b>Ergebnis:</b> ${esc(t[2])}</p></article>`).join("")}</div><p>Die Formel „Goldene Zwanziger“ ist weniger eine neutrale Beschreibung als eine Deutung. Sinnvoll ist sie, wenn man offenlegt, für wen sie gilt.</p><p class="quelle">Gekürzt nach dem Erwartungshorizont des Unterrichtsheftes, M12.</p>`)}
  <div class="ab-zwei gleich" style="margin-top:1rem"><div>${skala("g2", "Wie golden waren die Zwanziger? Eure Einschätzung jetzt.", 5, "1 = gar nicht golden", "5 = wirklich golden")}
  <p class="hinweis">Deine erste Einschätzung in Auftrag 1: ${S.g1 == null ? "noch offen" : S.g1 + " von 5"}.</p></div>
  <div>${textfeld("urteil", "Unsere Stellungnahme in zwei Sätzen", { rows:3, zaehl:false, anfaenge:["Gerechtfertigt ist der Begriff, wenn", "Nicht gerechtfertigt ist er, weil"] })}</div></div>
  ${kgFeld("Mein Eintrag: Die Goldenen Zwanziger", "Was setzt sich aus diesen Jahren in den Köpfen fest – in der Großstadt, auf dem Land? Zwei bis drei Stichpunkte für das Raster aus M8.1.")}`;
}
function seiteLk(){
  return landkarteL({ teil:"prinzip", frage:"Welche Prinzipien werden bei der Frage, wie gerechtfertigt es ist, von den „Goldenen Zwanzigern“ zu sprechen, besonders deutlich?",
    heft:"Welche Prinzipien werden bei der Frage, wie gerechtfertigt es ist, von den „Goldenen Zwanzigern“ zu sprechen besonders deutlich?",
    lead:"Denk an eure Prüfung: Für wen stimmt das Wort „golden“, was lässt es weg? Vermute: Was sagt das darüber, wie Geschichte erzählt wird?", platz:"Der Begriff zeigt, dass Geschichte …",
    urteil:{
      "2-1-2":["zentral","„Golden“ gilt aus einer bestimmten Sicht: der von Menschen in der Großstadt, von Künstler*innen und dem städtischen Bürgertum. Aus der Sicht eines Landarbeiters sieht dieselbe Zeit anders aus."],
      "2-1-4":["zentral","Der Begriff wählt aus: Revuen, Kino, Bauhaus. Elend, Land und politische Gewalt bleiben draußen. Genau das hat eure Prüfung gezeigt."],
      "2-1-3":["teils","Stimmt: Der Begriff beschreibt nur einen Ausschnitt – vor allem die Großstadt. Noch genauer treffen die Einträge, die sagen, wer auswählt und aus welcher Sicht."],
      "2-1-6":["teils","„Goldene Zwanziger“ ist eine Erzählung mit Anfang und Ende (1924 bis 1929). Die Frage, wie gerechtfertigt sie ist, zielt aber darauf, was sie auswählt und wessen Sicht sie wiedergibt."],
      "2-1-1":["teils","Im Rückblick wirken die Jahre vor der Krise von 1929 heller, als viele sie erlebt haben. Das verstärkt die Verklärung. Im Kern geht es aber um Auswahl und Sichtweise."],
      "2-1-7":["teils","Der Begriff ist zusammengesetzt, nicht gefunden – richtig. Frag weiter: Was wurde ausgewählt, und aus wessen Sicht?"],
    },
    bruecke:`<b>Merke:</b> Ein Epochenbegriff ist eine Deutung. Prüfe ihn: Was wählt er aus, wessen Sicht gibt er wieder?` });
}
L.schreib = {
  vor:"So kann die Aufgabe in der Klassenarbeit stehen: Material, zwei Operatoren, höchstens eine Seite. Hier schreibst du eine halbe Seite.",
  aufgabe:`<b>Überprüfen Sie</b> mithilfe der drei Triftigkeiten, inwieweit es gerechtfertigt ist, von den „Goldenen Zwanzigern“ zu sprechen, und <b>nehmen Sie Stellung</b>.`,
  material:`<p><b>M1 · Großstadt:</b> Kunst und Kultur entfalten sich frei; Revuen, Tanz, Kino; in Berlin 1922 bereits 32 Kabarettbühnen; wirtschaftliche Stabilisierung nach 1924.</p><p><b>M2 · Land:</b> Über 70 Prozent leben auf dem Land oder in kleinen Städten. Dort: hergebrachte Ordnung, unsichere wirtschaftliche Lage, wenig Zugang zu Bildung und Kultur, Skepsis gegenüber der Republik.</p><p><b>M3 · Drei Fragen:</b> Stimmen die Tatsachen (empirisch)? Sind die Wertungen begründet (normativ)? Ist der Zusammenhang schlüssig (narrativ)?</p><p class="quelle">Nach dem Unterrichtsheft, M12, und der kognitiven Landkarte, 2.2.</p>`,
  woerter:150, min:60,
  stufen:[["Grundlegend","Du nennst, was für und was gegen den Begriff spricht, und sagst, ob du ihn für gerechtfertigt hältst."],["Sicher","Du prüfst den Begriff mit zwei Triftigkeiten, nennst sie beim Namen und begründest deine Stellungnahme mit M1 und M2."],["Souverän","Du prüfst mit allen drei Triftigkeiten, zeigst, für wen der Begriff gilt und was er überdeckt, und kommst zu einer abgewogenen Stellungnahme."]],
  inhalt:[["Empirisch:","Aufschwung und Kulturboom sind belegt – aber vor allem für Großstädte; über 70 Prozent leben auf dem Land oder in kleinen Städten."],
    ["Normativ:","„Golden“ ist eine starke Wertung; sie entspricht der Erfahrung bestimmter Gruppen und überdeckt Elend, Gewalt und Unsicherheit."],
    ["Narrativ:","Die Folge Krise – Stabilisierung – Krise ist schlüssig, vereinfacht aber."],
    ["Stellungnahme:","Gerechtfertigt, wenn offengelegt wird, für wen der Begriff gilt; als Bezeichnung für die ganze Gesellschaft nicht."]],
};
L.zf = {
  frage:L.frage,
  kern:"Die Jahre 1924 bis 1929 gelten als „Goldene Zwanziger“: Die Wirtschaft stabilisiert sich, in den Großstädten blühen Kunst, Kino und Tanz. Doch über 70 Prozent der Menschen leben auf dem Land oder in kleinen Städten und haben daran kaum teil. „Golden“ ist deshalb eine Deutung, keine neutrale Beschreibung.",
  begriffe:[["Goldene Zwanziger","verklärende Bezeichnung für die Jahre 1924 bis 1929."],["Avantgarde","Künstler*innen, die bewusst mit überlieferten Formen brechen (Bauhaus, Dadaismus)."],["Expressionismus","Kunst, die Gefühl und inneres Erleben mit starken Formen und grellen Farben zeigt."],["Neue Sachlichkeit","nüchterne, genaue Darstellung der Wirklichkeit; Gegenstück zum Expressionismus."],["Charleston","Modetanz der 1920er-Jahre aus den USA."],["Triftigkeit","Stichhaltigkeit einer Geschichte: empirisch, normativ, narrativ."]],
  abfolge:{ titel:"Stadt und Land", punkte:[["Stadt","viele Schichten, offen für Neues; Industrie und Dienstleistung; viele Schulen, Theater, Kinos; vielfältige Politik; modernes Leben in Mietskasernen."],["Land","hergebrachte Ordnung; Landwirtschaft, oft unsichere Lage; wenig Zugang zu Bildung; konservativ, skeptisch gegenüber der Republik; Leben im Rhythmus der Landwirtschaft."]] },
  zahlen:[["1924–1929","Jahre der Stabilisierung"],["über 70 %","lebten auf dem Land oder in kleinen Städten"],["32","Kabarettbühnen in Berlin (1922)"]],
  lk:{ name:"Triftigkeitsprüfung (2.2)", satz:"Empirisch: Stimmen die Tatsachen? Normativ: Sind die Wertungen begründet? Narrativ: Ist der Zusammenhang schlüssig?", beispiel:"„Goldene Zwanziger“: empirisch vor allem für Großstädte belegt, normativ nur für bestimmte Gruppen „golden“, narrativ schlüssig, aber vereinfachend." },
  werkzeug:{ titel:"Einen Epochenbegriff prüfen", schritte:["Empirisch: Für wen und wo stimmen die Tatsachen?","Normativ: Wessen Maßstab steckt in der Wertung?","Narrativ: Was ordnet der Begriff – und was lässt er weg?"] },
  sonst:"eure Recherche und Collage (Auftrag 2), der Vergleich von Stadt und Land (Auftrag 3).",
  mein:[["Wie golden? Vorher und nachher", () => S.g1 == null ? "" : `Vorher: ${S.g1} von 5. Nachher: ${S.g2 == null ? "offen" : S.g2 + " von 5"}. ${S.urteil}`], ["Mein Eintrag ins kollektive Gedächtnis", "kg"]],
};
function zusammenfassung(){ return fadenFeld() + zusammen(); }
const SEITE_FN = { start, vorher, collage, land, trift, landkarte:seiteLk, schreiben:schreibauftrag, zusammenfassung, lehrkraft };
weimarStart();
