/* ===== M8 · Das kollektive Gedächtnis – Identität und Erinnerung · mit M8.1 Das kollektive Gedächtnis der Weimarer Republik (Heft „Geschichte aktuell 1“) ===== */
const L = {
  wid:"m08", key:"ggk-w-m08:v1", nr:"M8", titel:"Das kollektive Gedächtnis – Identität und Erinnerung", unter:"… und was 1919 in den Köpfen der Menschen vorgeht (M8.1)", dauer:90, block:"d",
  /* Zeichen der Stunde: ein Kopf, in dem sich Erinnerungen verbinden */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><path d="M17 4a11 11 0 0 0-7 19.5V30h14v-6.5A11 11 0 0 0 17 4z" fill="none" stroke="#24221F" stroke-width="2.4" stroke-linejoin="round"/><path d="M12 14l5-4 5 5-4 4z" fill="none" stroke="#24221F" stroke-width="1.6"/><circle cx="12" cy="14" r="2" fill="#9B402D"/><circle cx="17" cy="10" r="2" fill="#E0B74A"/><circle cx="22" cy="15" r="2" fill="#9B402D"/><circle cx="18" cy="19" r="2" fill="#24221F"/></svg>`,
  frage:"Was geht 1919 in den Köpfen der Menschen vor – und warum belastet das die junge Republik?",
  deck:{ dauer:"Doppelstunde · 90 Minuten", jahr:"1919", hier:[2, 3],
    satz:"Der Krieg ist vorbei, aber nicht in den Köpfen. Was eine Gesellschaft erinnert und wie sie es deutet, bestimmt, wie sie handelt.",
    belastend:"In Auftrag 4 geht es um Eugenik: die Vorstellung, Menschen nach einem angeblichen „Wert“ einzuteilen. Das kann belasten. Du darfst jederzeit aussetzen und mit deiner Lehrkraft sprechen.",
    ziele:["individuelles und kollektives Gedächtnis unterscheiden und erklären, wie gemeinsame Erinnerung Identität stiftet,", "acht Erfahrungen und Deutungen nennen, die das Denken vieler Menschen in der frühen Republik prägen,", "erläutern, wie das kollektive Gedächtnis politisches Handeln lenkt."] },
  blatt:[
    { id:"erinnern", nr:"1", kurz:"Ich und wir", name:"Erst überlegen: Ich erinnere mich, wir erinnern uns", form:"Allein, dann zu zweit", min:5, frei:"offen" },
    { id:"theorie", nr:"2", kurz:"Theorie", name:"Wie Gruppen sich erinnern", form:"Allein", min:18, frei:"offen" },
    { id:"republik", nr:"3", kurz:"In den Köpfen 1919", name:"Das kollektive Gedächtnis der Weimarer Republik", form:"Zu zweit", min:22, frei:"antwort", nach:"theorie", fehlt:"Bearbeite erst Auftrag 2." },
    { id:"recherche", nr:"4", kurz:"Recherche", name:"Rechercheauftrag: Eugenik und „Rassenkunde“", form:"Allein oder zu zweit", min:10, frei:"ansage", gleich:"Ein Rechercheauftrag zu einer Idee aus dem 19. Jahrhundert, die später mörderische Folgen hatte. Deine Lehrkraft sagt, ob ihr ihn in der Stunde oder zu Hause bearbeitet." },
    { id:"landkarte", nr:"L", kurz:"Landkarte", name:"Landkarte: Womit untersuchst du das?", form:"Allein", min:8, frei:"antwort", nach:"republik", fehlt:"Bearbeite erst Auftrag 3." },
    { id:"schreiben", nr:"5", kurz:"Schreibauftrag", name:"Schreibauftrag", form:"Allein", min:15, frei:"ansage", marke:"wie in der Klassenarbeit", gleich:"Du erklärst den Begriff und wendest ihn auf die frühe Republik an." },
    { id:"zusammenfassung", nr:"Z", kurz:"Zusammenfassung", name:"Zusammenfassung", form:"Zum Abheften", min:4, frei:"antwort", nach:"schreiben", fehlt:"Die Zusammenfassung öffnet sich nach deinem Text in Auftrag 5.", kopf:"Zum Abheften" },
  ],
  breit:["lehrkraft"],
  loesch:"Deine Notizen, deine Antworten, deine Auswahl, deine Recherche, dein Text und dein Satz für den roten Faden werden auf diesem Gerät entfernt.",
  init:() => ({ ich:"", wir:"", woher:"", ck:{}, top:{}, topgrund:"", r:{}, rq:"", meta:"" }),
  erledigt:{
    erinnern:() => lang("ich") && lang("wir") && lang("woher", 5), theorie:() => checkFertig("ck", 3),
    republik:() => mwZahl("top") === 3 && lang("topgrund", 20), recherche:() => tabelleVoll("r", 3, 1, 8) && lang("rq", 5),
    landkarte:() => !!S.lk.ok, schreiben:() => schreibFertig(),
  },
  fadenAnf:["Die Republik hat es von Anfang an schwer, weil in den Köpfen", "Eine Demokratie kann sich schwer verteidigen, wenn"],
};
/* Fünf Karten zur Theorie: nach dem Heft (M8) und der kognitiven Landkarte (3.1.1). Berichtigt: Der Begriff stammt von Maurice Halbwachs. */
const THEORIE = [
  { id:"ind", titel:"Individuelles Gedächtnis", kurz:"ich erinnere mich", text:"Persönliche Erinnerungen und Erfahrungen eines Menschen. Sie sind subjektiv und formen die persönliche Identität. Doch schon sie werden durch Gespräche, Fotos und Familienerzählungen geprägt.", bsp:"Eine Person erinnert sich an das Spielen im Garten ihrer Großeltern oder an den ersten Schultag." },
  { id:"koll", titel:"Kollektives Gedächtnis", kurz:"wir erinnern uns", text:"Die gemeinsamen Erinnerungen einer Gruppe oder Gesellschaft. Es ist nicht einfach die Summe einzelner Erinnerungen, sondern entsteht durch Austausch. Erzählungen, Rituale, Symbole und Traditionen geben es weiter. Es ist beweglich: Es verändert sich mit den Bedürfnissen der Gegenwart.", bsp:"Eine Gemeinschaft, die den Zweiten Weltkrieg erlebt hat, teilt Erinnerungen an Krieg, Flucht und Wiederaufbau. Sie werden weitergegeben, zum Beispiel beim jährlichen Gedenken an das Kriegsende." },
  { id:"ident", titel:"Wozu? Identität", kurz:"wer wir sind", text:"Das kollektive Gedächtnis hilft einer Gemeinschaft, sich selbst zu bestimmen, ihre Geschichte zu verstehen und ihre Werte zu bewahren. Gemeinsame Erinnerungen stiften Zusammenhalt.", bsp:"Der 9. November: 1918 Ausrufung der Republik, 1923 Hitlerputsch, 1938 Novemberpogrome, 1989 Mauerfall. An diesem Datum überlagern sich stolze und beschämende Erinnerungen." },
  { id:"speicher", titel:"Speicher und Funktion", kurz:"was genutzt wird", text:"Die Kulturwissenschaftlerin Aleida Assmann unterscheidet: Das Speichergedächtnis ist das „Archiv“ aller überlieferten Spuren, auch des Ungenutzten und Vergessenen. Das Funktionsgedächtnis ist der Teil, den eine Gruppe aktiv nutzt, um sich ihrer Identität zu vergewissern und ihr Handeln zu begründen.", bsp:"Das erklärt, warum dasselbe Ereignis in verschiedenen Ländern ganz unterschiedlich wirkt." },
  { id:"pol", titel:"Politische Dimension", kurz:"wem es nützt", text:"Kollektive Erinnerung kann Macht rechtfertigen und Gruppen in Bewegung bringen. Erinnerungen an historische Ereignisse können politisch eingesetzt werden, um bestimmte Erzählungen zu stärken oder infrage zu stellen.", bsp:"Die Erinnerung an die Friedliche Revolution von 1989 wird heute von sehr unterschiedlichen politischen Gruppen beansprucht." },
];
const FAELLE = [
  ["In einem Stadtarchiv liegen Akten über einen Streik von 1920. In der Stadt spricht niemand mehr darüber.", [["Funktionsgedächtnis", false, "Zum Funktionsgedächtnis gehört nur, was eine Gruppe aktiv nutzt. Über den Streik spricht niemand."], ["Speichergedächtnis", true, "Die Spuren sind überliefert, werden aber nicht genutzt. Sie liegen im „Archiv“ – und könnten eines Tages wieder hervorgeholt werden."], ["Individuelles Gedächtnis", false, "Hier erinnert sich kein einzelner Mensch. Es geht um überlieferte Spuren, die niemand nutzt."]], "die Karte „Speicher und Funktion“"],
  ["Jedes Jahr am selben Tag legt eine Stadt Kränze nieder. Die Schulen gestalten dazu eine Feier.", [["Individuelles Gedächtnis", false, "Die Feier gehört nicht einem Menschen allein. Eine ganze Stadt erinnert gemeinsam – mit einem Ritual."], ["Speichergedächtnis", false, "Was jedes Jahr gefeiert wird, liegt nicht ungenutzt im Archiv. Es wird aktiv erinnert."], ["Kollektives Gedächtnis", true, "Ein Ritual gibt Erinnerung in einer Gruppe weiter – auch an Menschen, die nicht dabei waren."]], "die Karte „Kollektives Gedächtnis“"],
  ["Eine Partei wirbt im Wahlkampf mit dem Ruf von 1989: „Wir sind das Volk“.", [["Politische Dimension", true, "Die Erinnerung wird eingesetzt, um eigene Ziele zu begründen und Menschen zu gewinnen. Ob zu Recht, ist eine andere Frage."], ["Individuelles Gedächtnis", false, "Es geht nicht um die Erinnerung eines einzelnen Menschen, sondern um den Einsatz einer gemeinsamen Erinnerung in der Politik."], ["Speichergedächtnis", false, "Der Ruf liegt nicht vergessen im Archiv – er wird gerade benutzt."]], "die Karte „Politische Dimension“"],
];
/* Acht Einträge nach dem Heft, M8.1. Verweise auf die Stunden nach der heutigen Zählung. */
const KG8 = [
  { id:"trauma", titel:"Kriegstrauma", m:"M1, M2", text:"Die Schrecken und Entbehrungen des Ersten Weltkriegs haben Millionen von Soldaten für ihr Leben gezeichnet und Hass auf die Sieger verbreitet. Stichwort: „Kriegszitterer“. Der Krieg war ein industrielles Töten." },
  { id:"dolch", titel:"Dolchstoßlegende", m:"M4", text:"„Im Felde unbesiegt“: Durch Propaganda wurde der Bevölkerung über Jahre der nahe Sieg versprochen. Die Oberste Heeresleitung – die selbst den Waffenstillstand wollte – schob die Schuld an der Niederlage Demokrat*innen und Jüdinnen und Juden zu." },
  { id:"selbst", titel:"Selbstbestimmungsrecht der Völker", m:"M6", text:"Der Nationalismus hat sich als „Ersatzreligion“ auf der höchsten politischen Ebene durchgesetzt. Damit gehen dauernde Konflikte einher: Wer gehört zur Nation, wer nicht? Welches Land gehört „uns“?" },
  { id:"diktat", titel:"Versailles als „Diktatfrieden“", m:"M7", text:"Große Gebietsverluste, Reparationen, Kriegsschuld (so wurde Artikel 231 verstanden), nur noch 100.000 Soldaten. Viele empfinden das als Kränkung ihres früheren Selbstbilds." },
  { id:"staat", titel:"Gegner der Demokratie im Staatsdienst", m:"", text:"In Polizei, Behörden und Gerichten der neuen Republik arbeiten überwiegend dieselben Menschen wie in der Kaiserzeit. Viele sind konservativ, der Monarchie treu und der Demokratie gegenüber skeptisch bis feindlich." },
  { id:"doppelt", titel:"Doppelte Ausrufung der Republik", m:"M5", text:"Am 9. November 1918 rufen Scheidemann und Liebknecht zwei verschiedene Republiken aus. Die Republik entsteht im Streit. Neu sind das Wahlrecht für Frauen und das niedrigere Wahlalter." },
  { id:"eugenik", titel:"Eugenik und „Rassenkunde“", m:"Auftrag 4", text:"Eine Idee aus dem 19. Jahrhundert (Ideengeschichte): Menschen werden nach einem angeblichen „Wert“ eingeteilt. Dazu recherchierst du in Auftrag 4." },
  { id:"justiz", titel:"„Auf dem rechten Auge blind“", m:"M10", text:"Die Justiz beurteilt Straftaten deutlich milder, wenn sie von Rechten verübt werden. Stichwort: Attentate auf Politiker." },
];
const TREPPE = [["Nachkriegsdebatten","Verschiedene politische Lager streiten über Deutschlands Zukunft nach dem Ersten Weltkrieg."],["Gesellschaftliche Spannungen","Zunehmende soziale Unruhen und wirtschaftliche Schwierigkeiten schaffen ein unsicheres Umfeld."],["Politische Zersplitterung","Extreme Gruppen nehmen zu, gemäßigte Parteien werden schwächer."],["Wachstum der NSDAP","Die NSDAP gewinnt an Einfluss und Unterstützung in der Gesellschaft."],["Machtübernahme","Die NSDAP erlangt die Kontrolle über die deutsche Regierung."]];

function start(){ return deckblatt(); }
function erinnern(){
  return `${auftrag("Allein · 3 Minuten, dann zu zweit · 2 Minuten", "Ich erinnere mich, wir erinnern uns", "Notiere ein Ereignis, an das du dich selbst erinnerst. Notiere dann eines, an das sich „alle“ erinnern – auch du, obwohl du nicht dabei warst. Woher kennst du es? Tauscht euch danach zu zweit aus.")}
  <div class="ab-zwei gleich"><div>${textfeld("ich", "Daran erinnere ich mich selbst", { rows:3, zaehl:false, platz:"ein Tag, ein Fest, ein Ort …" })}</div>
  <div>${textfeld("wir", "Daran erinnern sich „alle“ – obwohl ich nicht dabei war", { rows:3, zaehl:false, platz:"ein Ereignis aus der Geschichte, der Familie, dem Verein …" })}</div></div>
  ${textfeld("woher", "Woher kenne ich das zweite Ereignis?", { rows:2, zaehl:false, anfaenge:["Aus Erzählungen von", "Aus der Schule:", "Durch einen Gedenktag:", "Aus Filmen oder Bildern:"] })}`;
}
function theorie(){
  return `${auftrag("Allein · 18 Minuten", "Wie Gruppen sich erinnern", "Lies die fünf Karten. Prüfe dann an drei Fällen, ob du die Begriffe anwenden kannst.")}
  <p class="lead">Der Begriff kollektives Gedächtnis stammt von dem französischen Soziologen Maurice Halbwachs (1925). Die Kulturwissenschaftler*innen Jan und Aleida Assmann haben das Konzept seit den 1980er-Jahren weiterentwickelt.</p>
  ${wahlKarte("th", THEORIE.map((t, i) => ({ id:t.id, nr:String(i + 1), titel:t.titel, unter:t.kurz, html:`<h3>${esc(t.titel)}</h3><p>${esc(t.text)}</p><div class="trift"><b>Beispiel:</b> ${esc(t.bsp)}</div>` })), { titel:"Karte wählen" })}
  <p class="quelle">Nach dem Unterrichtsheft, M8, und der kognitiven Landkarte, 3.1.1.</p>
  <h3 class="klein">Drei Fälle: Welcher Begriff passt?</h3>
  ${check("ck", FAELLE)}
  <p class="quelle">Die drei Fälle sind ausgedacht.</p>`;
}
function republik(){
  const n = mwZahl("top");
  return `${auftrag("Zu zweit · 22 Minuten", "Das kollektive Gedächtnis der Weimarer Republik", "Lest die acht Einträge. Sie zeigen, was um 1919 in den Köpfen vieler Menschen vorgeht. Wählt dann die drei Einträge, die die junge Republik eurer Meinung nach am stärksten belasten, und begründet eure Wahl.")}
  <p class="lead">Um den Aufstieg des Nationalsozialismus zu verstehen, muss man die damalige Gesellschaft möglichst genau betrachten. Der Zweite Weltkrieg und die Shoah entstehen nicht aus dem Nichts. Trotzdem bleibt die Frage: Musste es so kommen? 1918 war nicht klar, wohin sich Deutschland entwickeln würde. Die NSDAP gibt es noch nicht. Sozialist*innen, Demokrat*innen und Monarchist*innen streiten um die Zukunft.</p>
  <ol class="w-treppe" style="--n:${TREPPE.length}" aria-label="Stufenmodell: Aufstieg der NSDAP verstehen">${TREPPE.map((t, i) => `<li style="--i:${i}"><b>${esc(t[0])}</b><span>${esc(t[1])}</span></li>`).join("")}</ol>
  <p class="quelle">Stufenmodell „Aufstieg der NSDAP verstehen“ nach dem Unterrichtsheft, M8.1. Ein Modell: Eine Treppe sieht zwangsläufig aus. Das war dieser Weg nicht.</p>
  <h3 class="klein">Was in den Köpfen ist: acht Einträge</h3>
  ${wahlKarte("kg8", KG8.map((e, i) => { const an = !!(S.top || {})[e.id]; return { id:e.id, nr:String(i + 1), titel:e.titel, unter:e.m ? "aus " + e.m : "neu", fertig:an ? "gewählt" : false,
    html:`<h3>${esc(e.titel)}</h3><p>${esc(e.text)}</p><p class="quelle">Nach dem Unterrichtsheft, M8.1.</p><div class="reihe" style="margin-top:1.2rem"><button type="button" class="btn ${an ? "dunkel" : ""}" data-akt="mw" data-p="top.${e.id}" aria-pressed="${an}">${an ? "✓ Gehört zu unseren drei" : "Zu unseren drei stärksten Belastungen nehmen"}</button></div>` }; }), { titel:"Eintrag wählen", klasse:"viele" })}
  <p class="hinweis" aria-live="polite"><b>Eure Auswahl:</b> ${n ? KG8.filter(e => (S.top || {})[e.id]).map(e => esc(e.titel)).join(" · ") : "noch nichts gewählt"} – ${n === 3 ? "drei gewählt." : n > 3 ? `das sind ${n}. Entscheidet euch für drei.` : `${n} von 3.`}</p>
  ${textfeld("topgrund", "Unsere Begründung", { rows:3, zaehl:false, anfaenge:["Am stärksten belastet die Republik", "weil viele Menschen dadurch", "Zusammen bewirken diese drei, dass"] })}
  <p class="hinweis">Das Blatt wächst weiter: Krisenjahr 1923 (M11) · Goldene Zwanziger (M12) · Saal- und Straßenschlachten (M10) · Weltwirtschaftskrise 1929 und Verhalten der NSDAP (M14). Du findest es in der Übersicht des Kapitels.</p>`;
}
function recherche(){
  return `${belastend("Eugenik teilte Menschen nach einem angeblichen „Wert“ ein. Bei der Recherche stößt du auf Texte über Zwangssterilisation und Mord. Du musst nichts ansehen, was dich belastet.")}
  ${auftrag("Allein oder zu zweit · 10 Minuten (oder als Hausaufgabe)", "Rechercheauftrag", "Recherchiere zu Eugenik und „Rassenkunde“. Beantworte die drei Fragen in Stichpunkten und notiere, woher deine Angaben stammen.")}
  <div class="ab-zwei schmalrechts"><div>
  ${tabelle("r", ["", "Meine Stichpunkte"], ["Was behauptete die Eugenik?", "Wo und wie wurde sie umgesetzt?", "Warum gehört sie ins Gedächtnis der Weimarer Republik?"], { rows:3 })}
  ${textfeld("rq", "Meine Quellen (Seite, Verfasser*in, Datum des Abrufs)", { rows:2, zaehl:false })}</div>
  <div>${wissen("Eugenik und „Rassenkunde“", `<p>Beide entstanden im 19. Jahrhundert. Die Idee: Menschen sollten nach ihrem angeblichen „Wert“ eingeteilt und wie Tiere „gezüchtet“ werden. Leben, das als „unwert“ galt, sollte verhindert oder ausgelöscht werden – durch Sterilisation und Mord. Solche Vorstellungen waren in vielen Ländern verbreitet, sehr stark in den USA. Stichwort: Sozialdarwinismus.</p><p><b>Heute ist klar:</b> Menschliche „Rassen“ gibt es nicht. Die „Rassenkunde“ gab Vorurteilen nur einen wissenschaftlichen Anstrich.</p><p class="quelle">Nach dem Unterrichtsheft, M8.1 (Rechercheauftrag).</p>`)}
  <p class="hinweis"><b>Gute Startpunkte:</b> LeMO, das Online-Portal des Deutschen Historischen Museums, und die Bundeszentrale für politische Bildung. Prüfe bei jeder Seite: Wer hat sie verfasst – und wozu?</p></div></div>`;
}
function seiteLk(){
  return landkarteL({ teil:"wirkung", frage:"Du fragst, was 1919 in den Köpfen der Menschen vorgeht. Welches Analyseinstrument der Landkarte benutzt du dabei?",
    heft:"3. Auswirkungen von Geschichte: Inwiefern hilft uns die Theorie des kollektiven Gedächtnisses von Assmann, hist. Prozesse, Ereignisse und Entscheidung besser zu verstehen?",
    lead:"Sieh dir die acht Einträge aus Auftrag 3 noch einmal an. Vermute: Was erklären sie, was eine bloße Liste von Ereignissen nicht erklärt?", platz:"Die Einträge erklären, warum …",
    urteil:{
      "3-1-1":["zentral","Du untersuchst die gemeinsamen Erinnerungen und Deutungen einer Gesellschaft: Kriegstrauma, „Dolchstoß“, „Diktatfrieden“. Nicht die Ereignisse „an sich“ treiben das Handeln an, sondern wie Menschen sie erinnern und deuten."],
      "3-1-3":["teils","Bei der Dolchstoßlegende stimmt das: Die Oberste Heeresleitung setzte eine falsche Erzählung bewusst ein. Die meisten Einträge beschreiben aber, was viele Menschen erinnern und glauben. Dafür gibt es einen weiteren Begriff."],
      "3-1-4":["teils","Erinnerungskultur meint das bewusste Erinnern einer Gesellschaft, etwa mit Denkmälern und Gedenktagen. Hier geht es grundlegender darum, welche Erfahrungen und Deutungen in den Köpfen sind."],
      "3-1-5":["kaum","Agency fragt nach dem Handlungsspielraum einzelner Menschen oder Gruppen. Hier fragst du, was eine ganze Gesellschaft erinnert und glaubt."],
    },
    bruecke:`<b>Merke:</b> Wer historische Prozesse nur aus Tatsachen und Interessen erklärt, übersieht die Rahmen, in denen Menschen denken, fühlen und handeln.` })
  + `<div class="ab-zwei gleich" style="margin-top:1.4rem"><div>${auftrag("Allein · 3 Minuten", "Die Frage des Hefts", "Inwiefern hilft die Theorie des kollektiven Gedächtnisses, historische Prozesse, Ereignisse und Entscheidungen besser zu verstehen? Antworte in zwei Sätzen.")}</div>
  <div>${textfeld("meta", "Meine Antwort", { rows:3, zaehl:false, anfaenge:["Die Theorie hilft, weil sie zeigt, dass", "Zum Beispiel erklärt sie, warum"] })}
  ${vergleich("metavgl", ["meta"], 20, "Mit vier Beiträgen vergleichen", `<div class="w-karten k2"><article class="w-kk"><h3>1 · Gedächtnis als Ursache</h3><p>Menschen handeln innerhalb gemeinsamer Erinnerungsrahmen. Diese lassen bestimmte Entscheidungen als berechtigt erscheinen.</p></article><article class="w-kk"><h3>2 · Auswahl</h3><p>Aus dem Archiv aller Tatsachen (Speichergedächtnis) nutzt eine Gesellschaft nur, was ihre Ziele in der Gegenwart stützt (Funktionsgedächtnis).</p></article><article class="w-kk"><h3>3 · Konflikte</h3><p>Täter-, Opfer- und Siegergedächtnis bestehen nebeneinander und sind oft unvereinbar. Beispiel in der Landkarte (4.4.2): der 9. Mai.</p></article><article class="w-kk"><h3>4 · Wandel</h3><p>Wenn sich das Gedächtnis verschiebt, ist das selbst ein historisches Ereignis. Beispiel in der Landkarte (4.4.4): die Rede Richard von Weizsäckers am 8. Mai 1985.</p></article></div><p class="quelle">Gekürzt nach dem Erwartungshorizont des Unterrichtsheftes, M8.</p>`)}</div></div>`;
}
L.schreib = {
  vor:"So kann die Aufgabe in der Klassenarbeit stehen: Material, zwei Operatoren, höchstens eine Seite. Hier schreibst du eine halbe Seite.",
  aufgabe:`<b>Erklären Sie</b> den Begriff „kollektives Gedächtnis“ und <b>erläutern Sie</b> an zwei Beispielen, wie das kollektive Gedächtnis die Weimarer Republik von Beginn an belastete.`,
  material:`<p><b>M1 · Begriff:</b> Das kollektive Gedächtnis umfasst die gemeinsamen Erinnerungen einer Gruppe oder Gesellschaft. Es entsteht durch Austausch, wird durch Erzählungen, Rituale und Symbole weitergegeben und verändert sich mit den Bedürfnissen der Gegenwart.</p><p><b>M2 · Aus dem Raster M8.1:</b> Kriegstrauma · Dolchstoßlegende · Versailles als „Diktatfrieden“ · Gegner der Demokratie im Staatsdienst · eine Justiz, die „auf dem rechten Auge blind“ ist.</p><p class="quelle">Nach dem Unterrichtsheft, M8 und M8.1.</p>`,
  woerter:140, min:60,
  stufen:[["Grundlegend","Du erklärst den Begriff in eigenen Worten und nennst zwei Einträge aus dem Raster."],["Sicher","Du erklärst, wie gemeinsame Erinnerung entsteht und wirkt, und zeigst an zwei Beispielen, wie sie das Bild der Republik prägt."],["Souverän","Du unterscheidest Ereignis und Deutung (zum Beispiel Niederlage und „Dolchstoß“), zeigst die politische Nutzung der Erinnerung und erklärst, warum das eine Demokratie schwächt."]],
  inhalt:[["Begriff:","gemeinsame Erinnerungen einer Gruppe; entsteht durch Austausch; weitergegeben durch Erzählungen, Rituale, Symbole; stiftet Identität; verändert sich; kann politisch genutzt werden."],
    ["Beispiel Dolchstoßlegende:","Die Niederlage wird als „Verrat“ erinnert; die Schuld wird Demokrat*innen und Jüdinnen und Juden zugeschoben. Die Republik erscheint als Werk der „Schuldigen“."],
    ["Beispiel „Diktatfrieden“:","Der Vertrag wird als Kränkung erinnert; die Republik wird dafür verantwortlich gemacht."],
    ["Belastung:","Die Demokratie beginnt mit Deutungen, die sie abwerten; viele im Staatsdienst lehnen sie ab; Gewalt und Hass aus dem Krieg wirken weiter."]],
};
L.zf = {
  frage:L.frage,
  kern:"Menschen erinnern sich nicht nur allein, sondern in Gruppen. Dieses kollektive Gedächtnis stiftet Identität und lenkt das Handeln. In der frühen Weimarer Republik ist es von Kriegstrauma, Dolchstoßlegende und dem Bild des „Diktatfriedens“ geprägt. Das ist eine schwere Last für die Demokratie.",
  begriffe:[["Individuelles Gedächtnis","persönliche Erinnerungen eines Menschen."],["Kollektives Gedächtnis","gemeinsame Erinnerungen einer Gruppe; weitergegeben durch Erzählungen, Rituale, Symbole (Maurice Halbwachs, 1925)."],["Speichergedächtnis","das „Archiv“ aller überlieferten Spuren, auch des Vergessenen."],["Funktionsgedächtnis","der Teil, den eine Gruppe aktiv nutzt, um ihr Handeln zu begründen (Aleida Assmann)."],["Dolchstoßlegende","falsche Erzählung: Nicht das Militär, sondern Demokrat*innen und Jüdinnen und Juden seien schuld an der Niederlage."],["Eugenik","Lehre des 19. Jahrhunderts, die Menschen nach einem angeblichen „Wert“ einteilte; Scheinwissenschaft."]],
  abfolge:{ titel:"Was um 1919 in den Köpfen ist (M8.1)", punkte:[["Kriegstrauma","Millionen gezeichnete Soldaten; Hass auf die Sieger."],["Dolchstoß","„Im Felde unbesiegt“ – Schuld bei den Demokrat*innen."],["Nationalismus","Wer gehört zur Nation? Welches Land gehört „uns“?"],["„Diktatfrieden“","Versailles als Kränkung."],["Staatsdienst","Beamte und Richter aus der Kaiserzeit, oft Gegner der Republik."],["Gründung im Streit","zwei Republiken am 9. November 1918."],["Eugenik","Menschen nach „Wert“ eingeteilt."],["Justiz","„auf dem rechten Auge blind“."]] },
  lk:{ name:"Kollektives Gedächtnis (3.1.1)", satz:"Auch wenn wir uns als Einzelne erinnern, geschieht das immer in „sozialen Rahmen“ wie Familie, Religion, Klasse oder Nation (Maurice Halbwachs, 1925).", beispiel:"Viele Deutsche erinnern 1918 nicht als militärische Niederlage, sondern als „Verrat“ – und handeln danach." },
  werkzeug:{ titel:"Nach dem Gedächtnis einer Gesellschaft fragen", schritte:["Was erinnert die Gruppe – und was lässt sie weg?","Wie deutet sie es: als Sieg, Niederlage, Unrecht, Verrat?","Wozu dient die Erinnerung: Wer nutzt sie, und wofür?"] },
  sonst:"das Stufenmodell „Aufstieg der NSDAP verstehen“ (Auftrag 3), der Rechercheauftrag zur Eugenik (Auftrag 4).",
  mein:[["Unsere drei stärksten Belastungen", () => { const w = KG8.filter(e => (S.top || {})[e.id]).map(e => e.titel); return w.length ? `${w.join(" · ")}. ${S.topgrund}` : ""; }]],
};
function zusammenfassung(){ return fadenFeld() + zusammen(); }
const SEITE_FN = { start, erinnern, theorie, republik, recherche, landkarte:seiteLk, schreiben:schreibauftrag, zusammenfassung, lehrkraft };
weimarStart();
