/* ===== M4 · Der Krieg ist verloren! Die Matrosen meutern! (Heft „Geschichte aktuell 1“, M4 und M4.1) ===== */
const L = {
  wid:"m04", key:"ggk-w-m04:v1", nr:"M4", titel:"Der Krieg ist verloren! Die Matrosen meutern!", unter:"Der Start der Novemberrevolution in Deutschland", dauer:45, block:"b",
  /* Zeichen der Stunde: ein Anker */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><circle cx="17" cy="7" r="3" fill="none" stroke="#24221F" stroke-width="2.4"/><path d="M17 10v19M10 15h14" stroke="#24221F" stroke-width="2.4" stroke-linecap="round"/><path d="M6 21c1 6 6 8 11 8s10-2 11-8" fill="none" stroke="#9B402D" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  frage:"Der Krieg ist verloren, der Kaiser fort: Wollen die Menschen im November 1918 dasselbe – oder trennt sie mehr, als sie verbindet?",
  blick:{ name:"Sozialgeschichte", anker:"2-3-7", tut:"Du schaust auf Gruppen der Gesellschaft, ihre Lebensbedingungen und ihre Gegensätze. Die Ereignisgeschichte (Auftrag 2) zeigt, was im November 1918 geschah. Die Sozialgeschichte hilft zu erklären, warum so viele mitmachten.", fehlt:"Was fehlt: einzelne Menschen und ihre Entscheidungen. Wer am 9. November was tat und warum gerade so, erklärt der Blick auf Gruppen nicht. Das zeigt M5." },
  pole:{ frage:"Wollen die Menschen im November 1918 dasselbe?", links:"Sie wollen dasselbe", rechts:"Sie trennt mehr, als sie verbindet" },
  deck:{ dauer:"Einzelstunde · 45 Minuten", jahr:"Nov. 1918", hier:[1],
    satz:"In Kiel verweigern Matrosen den Befehl zu einer letzten Schlacht. Aus der Meuterei wird in wenigen Tagen eine Revolution.",
    bild:{ datei:"heft-m04-matrosen.jpg", alt:"Gemälde: Matrosen mit roter Fahne laufen über ein Hafengelände, im Hintergrund Kriegsschiffe.", text:"Matrosen im Aufstand, November 1918 (Darstellung).", nachweis:"Bild aus dem Unterrichtsheft, M4. Nachweis offen." },
    ziele:["erklären, wie aus der Meuterei der Matrosen eine Revolution wurde,", "die Gruppen der Gesellschaft von 1918 und ihre Stellung beschreiben,", "aus der Sicht einer ausgedachten Person begründen, was sie sich im November 1918 wünscht."] },
  blatt:[
    { id:"erinnern", nr:"1", kurz:"Erst erinnern", name:"Erst erinnern: Krieg und Standort", form:"Allein · ohne Heft", min:4, frei:"offen" },
    { id:"lage", nr:"2", kurz:"Die Lage", name:"Die Lage im November 1918", form:"Plenum, dann allein", min:6, frei:"offen" },
    { id:"gesellschaft", nr:"3", kurz:"Gesellschaft 1918", name:"Die Gesellschaft des Kaiserreichs im Jahr 1918", form:"Allein", min:9, frei:"offen" },
    { id:"rolle", nr:"4", kurz:"Meine Person", name:"Eine Person im November 1918", form:"Allein, dann zu zweit", min:10, frei:"antwort", nach:"gesellschaft", fehlt:"Lies erst drei Karten zur Gesellschaft in Auftrag 3 und notiere je einen Wunsch." },
    { id:"landkarte", nr:"L", kurz:"Landkarte", name:"Landkarte: Was zeigen sechs Karten – und was nicht?", form:"Allein", min:6, frei:"antwort", nach:"rolle", fehlt:"Bau erst deine Person in Auftrag 4." },
    { id:"schreiben", nr:"5", kurz:"Schreibauftrag", name:"Schreibauftrag", form:"Allein", min:10, frei:"ansage", marke:"wie in der Klassenarbeit", gleich:"Du erklärst an zwei Gruppen, warum es zur Revolution kam." },
    { id:"zusammenfassung", nr:"Z", kurz:"Zusammenfassung", name:"Zusammenfassung", form:"Zum Abheften", min:3, frei:"antwort", nach:"schreiben", fehlt:"Die Zusammenfassung öffnet sich nach deinem Text in Auftrag 5.", kopf:"Zum Abheften" },
  ],
  breit:["lehrkraft"],
  loesch:"Deine Antworten, deine ausgedachte Person, dein Text und dein Satz für den roten Faden werden auf diesem Gerät entfernt.",
  init:() => ({ ab:{}, vermutung:"", w:{}, r:{ milieu:null, alter:"", name:"", erf:"", wunsch:"" }, streit:"" }),
  erledigt:{
    erinnern:() => [0,1,2].every(i => (S.ab.auf || {})[i]), lage:() => lang("vermutung"), gesellschaft:() => MILIEUS.filter(m => lang("w." + m.id)).length >= 3,
    rolle:() => !!S.r.milieu && lang("r.erf") && lang("r.wunsch"), landkarte:() => !!S.lk.ok, schreiben:() => schreibFertig(),
  },
  fadenAnf:["Die Revolution begann, weil", "Die Gesellschaft von 1918 war gespalten, denn"],
};
/* Sechs Gruppen nach dem Infomaterial M4.1 des Hefts (Fußnotenziffern entfernt; die Angabe „etwa 5 %“ für den Adel ist nicht belegt und gestrichen). */
const MILIEUS = [
  { id:"adel", name:"Kaiser und Adel", kurz:"an der Spitze", punkte:["An der Spitze stand der Kaiser, gefolgt vom Hochadel und dem Landadel, zum Beispiel den preußischen Junkern.", "Der Adel hatte großen Einfluss auf Politik, Militär und Verwaltung. Viele hohe Beamte und Offiziere stammten aus adligen Familien.", "Der Adel war nur eine sehr kleine Minderheit der Bevölkerung."] },
  { id:"militaer", name:"Militär", kurz:"hohes Ansehen", punkte:["Das Militär genoss hohes Ansehen und prägte das gesellschaftliche Leben stark.", "Militärische Disziplin und Gehorsam galten als Tugenden.", "Eine militärische Karriere war für viele Bürger ein Weg zum sozialen Aufstieg."] },
  { id:"buerger", name:"Bürgertum", kurz:"Besitz und Bildung", punkte:["Das Bürgertum gewann durch Industrialisierung und wirtschaftlichen Erfolg an Bedeutung.", "Es teilte sich in Großbürgertum (Industrie, Banken), Bildungsbürgertum (Akademiker, Beamte) und Kleinbürgertum (Handwerker, kleine Kaufleute).", "Großbürgertum und Adel bildeten gemeinsam die gesellschaftliche Elite."] },
  { id:"arbeiter", name:"Arbeiterschaft", kurz:"die größte Gruppe", punkte:["Die Arbeiterschaft wuchs durch die Industrialisierung stark an und bildete die größte Bevölkerungsgruppe.", "Viele Arbeiter*innen lebten in Großstädten unter schwierigen Bedingungen: Wohnungsnot, lange Arbeitszeiten, niedrige Löhne.", "Arbeiterbewegung und Gewerkschaften forderten bessere Arbeits- und Lebensbedingungen und politische Mitbestimmung."] },
  { id:"land", name:"Landbevölkerung", kurz:"Bauern und Landarbeiter", punkte:["Bauern und Landarbeiter standen meist am unteren Ende der sozialen Rangordnung, besonders in Ostpreußen und anderen ländlichen Regionen.", "Die soziale Stellung hing stark von Besitz und Herkunft ab."] },
  { id:"frauen", name:"Frauen", kurz:"in jeder Schicht", punkte:["Frauen hatten rechtlich und gesellschaftlich eine untergeordnete Stellung.", "Während des Ersten Weltkriegs übernahmen viele Frauen neue Rollen in der Arbeitswelt. Das führte langfristig zu Veränderungen.", "Die Frauenbewegung setzte sich für mehr Rechte und Bildungschancen ein."] },
];
const milieuKarte = m => `<h3>${esc(m.name)}</h3><ul class="w-liste2">${m.punkte.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
  ${textfeld("w." + m.id, "Was wünscht sich diese Gruppe im November 1918 vermutlich? Ein Satz.", { rows:2, zaehl:false, platz:"Diese Gruppe wünscht sich vermutlich …, weil …" })}`;

function start(){ return deckblatt(); }
function erinnern(){
  return `${auftrag("Allein · 3 Minuten · ohne Heft", "Erst erinnern", "Beantworte aus dem Kopf, ein Stichwort genügt. Dann deckst du auf und vergleichst.")}
  ${abrufen("ab", [
    ["Nenne zwei Ursachen des Ersten Weltkriegs (M2).", "Zum Beispiel: Konflikte um Kolonien, Wettrüsten, zwei Bündnissysteme, das „Pulverfass Balkan“. Anlass war das Attentat von Sarajevo, darauf folgte die Julikrise 1914."],
    ["Was bedeutet Standortgebundenheit (M3)?", "Wer Geschichte erzählt, ist durch seinen gesellschaftlichen und kulturellen Gesamtkontext geprägt, oft unbewusst."],
    ["Wie lange dauert der Krieg im Herbst 1918 schon?", "Seit dem Sommer 1914 – mehr als vier Jahre."],
  ])}`;
}
function lage(){
  return `${kopfpaar(auftrag("Plenum · 3 Minuten, dann allein · 3 Minuten", "Die Lage im November 1918", "Lest die vier Schritte gemeinsam. Danach vermutest du allein: Was wollen die Menschen jetzt am dringendsten?"), { datei:"heft-m04-matrosen.jpg", alt:"Gemälde: Matrosen mit roter Fahne laufen über ein Hafengelände, im Hintergrund Kriegsschiffe.", text:"Matrosen im Aufstand (Darstellung).", nachweis:"Bild aus dem Unterrichtsheft, M4. Nachweis offen." })}
  <ol class="w-schritte" style="--n:4"><li><b>Der Befehl</b>Ende Oktober 1918 ist der Krieg verloren. Trotzdem befiehlt die Marineleitung eine letzte Schlacht gegen Großbritannien.</li>
  <li><b>Die Meuterei</b>Die Matrosen in Wilhelmshaven und Kiel verweigern den Befehl. Diese Meuterei löst einen Aufstand aus, der sich über ganz Deutschland ausbreitet: der Matrosenaufstand.</li>
  <li><b>Berlin, 9. November</b>Der Aufstand erreicht Berlin. Die Menschen gehen auf die Straße und fordern die Abdankung des Kaisers. Reichskanzler Max von Baden gibt sie eigenmächtig bekannt und übergibt die Macht an Friedrich Ebert (SPD).</li>
  <li><b>Zwei Ausrufungen</b>Gegen 14 Uhr ruft Philipp Scheidemann (SPD) die Republik aus. Zwei Stunden später ruft Karl Liebknecht (Spartakusbund) die „freie sozialistische Republik“ aus. Wie soll es nun weitergehen?</li></ol>
  <p class="quelle">Nach dem Infotext des Unterrichtsheftes, M4. Dort berichtigt: Der Kaiser ging am 10. November 1918 in die Niederlande (nicht nach Belgien); Liebknecht rief die „freie sozialistische Republik“ aus.</p>
  ${textfeld("vermutung", "Meine Vermutung: Was wollen die Menschen jetzt am dringendsten?", { rows:2, zaehl:false, anfaenge:["Am dringendsten wollen die Menschen", "Nicht alle wollen dasselbe, weil"] })}`;
}
function gesellschaft(){
  const n = MILIEUS.filter(m => lang("w." + m.id)).length;
  return `${auftrag("Allein · 9 Minuten", "Die Gesellschaft des Kaiserreichs im Jahr 1918", "Die Gesellschaft war 1918 durch eine starke Rangordnung, tiefe Umbrüche und wachsende Spannungen geprägt. Wähle links eine Gruppe und lies ihre Karte. Notiere zu mindestens drei Gruppen, was sie sich im November 1918 vermutlich wünschen.")}
  <div class="ab-zwei schmalrechts"><div>${wahlKarte("milieu", MILIEUS.map(m => ({ id:m.id, titel:m.name, unter:m.kurz, fertig:lang("w." + m.id) ? "Wunsch notiert" : false, html:milieuKarte(m) })), { titel:"Gruppe wählen" })}
  <p class="hinweis" style="margin-top:.6rem">${n} von mindestens 3 Wünschen notiert.</p></div>
  <aside><p class="kennung">${status("modell", "Modell")} Rangordnung</p><div class="w-pyramide"><div>Kaiser und Adel</div><div>Militär <small>Offiziere</small></div><div>Bürgertum</div><div>Arbeiterschaft</div><div>Landbevölkerung</div></div>
  <p class="hinweis">Das Bild zeigt nur die Rangordnung, keine Größenverhältnisse. Frauen waren in jeder Schicht rechtlich untergeordnet. Was lässt dieses Modell weg? Zum Beispiel: Wer zu mehreren Gruppen gehört und wer auf- oder absteigt.</p>
  ${wissen("Wandel", `<p>Durch Industrialisierung und das Wachsen der Städte wurden die Grenzen zwischen den Schichten durchlässiger. Trotzdem blieben die sozialen Gegensätze groß. Sie entluden sich 1918 in der Revolution.</p>`)}</aside></div>`;
}
function rolle(){
  const r = S.r, m = MILIEUS.find(x => x.id === r.milieu);
  return `${auftrag("Allein · 7 Minuten, dann zu zweit · 3 Minuten", "Eine Person im November 1918", "Bau dir eine ausgedachte Person. Ordne sie einer Gruppe zu, gib ihr ein Alter und einen Namen. Überlege, was sie in den letzten Jahren erlebt hat – und was sie sich zu Beginn der Novemberrevolution wünscht. Danach stellt ihr euch eure Personen zu zweit vor.")}
  <p class="hinweis">${status("", "ausgedachter Fall")} Deine Person hat es nicht gegeben. Sie hilft, die Lage von damals zu verstehen. Du musst nichts nachspielen.</p>
  <div class="w-milieus" role="group" aria-label="Gruppe wählen">${MILIEUS.map(x => `<button type="button" data-akt="setz" data-p="r.milieu" data-w="${x.id}" aria-pressed="${r.milieu === x.id}"><b>${esc(x.name)}</b><small>${esc(x.kurz)}</small></button>`).join("")}</div>
  <div class="w-rolle"><div>${eingabe("r.name", "Name", "zum Beispiel Martha Krüger")}</div><div>${eingabe("r.alter", "Alter im November 1918", "zum Beispiel 23")}</div>
  <div class="voll">${textfeld("r.erf", "Erfahrungen: Was hat die Person seit 1914 erlebt?", { rows:3, zaehl:false, platz:"Krieg, Hunger, Arbeit, Familie …" })}</div>
  <div class="voll">${textfeld("r.wunsch", "Wünsche: Was wünscht sie sich zu Beginn der Novemberrevolution?", { rows:3, zaehl:false, anfaenge:["Sie wünscht sich vor allem", "Angst hat sie davor, dass"] })}</div></div>
  ${m ? `<p class="hinweis">Zur Erinnerung – ${esc(m.name)}: ${esc(m.punkte[0])}</p>` : ""}
  <h3 class="klein">Zu zweit</h3>
  ${textfeld("streit", "Worüber würden eure beiden Personen streiten? Ein Satz.", { rows:2, zaehl:false })}`;
}
function seiteLk(){
  return landkarteL({ teil:"prinzip", frage:"Sechs Karten für eine Gesellschaft von vielen Millionen Menschen. Welches Prinzip der Landkarte zeigt sich daran besonders deutlich?",
    lead:"Sieh dir die sechs Gruppen aus Auftrag 3 noch einmal an. Vermute: Wer kommt auf keiner Karte vor – und was erfährst du über die sechs Gruppen nicht?", platz:"Auf keiner Karte steht …",
    urteil:{
      "2-1-3":["zentral","Sechs Karten zeigen sechs Ausschnitte. Keine Darstellung kann „alles“ erzählen – auch dein Heft nicht. Kinder, Kriegsversehrte oder religiöse Minderheiten haben hier keine eigene Karte. Das ist Partikularität: Historische Erkenntnisse sind immer nur Ausschnitte der gesamten Vergangenheit."],
      "2-1-4":["zentral","Jemand hat ausgewählt, welche Gruppen eine Karte bekommen – passend zur Frage, warum das Kaiserreich seinen Rückhalt verlor. Das ist Selektivität. Besprecht: Was unterscheidet „Es wurde ausgewählt“ von „Es ist immer nur ein Ausschnitt“ (Partikularität)?"],
      "2-1-2":["teils","Jede Gruppe blickt aus ihrer Lage auf den November 1918 – das hast du in Auftrag 4 ausprobiert. Gefragt war aber nach den Karten selbst: Was zeigen sie, was nicht?"],
      "2-1-5":["teils","Partialität meint: Quellen sind lückenhaft, vieles ist verloren. Hier fehlen Gruppen aber nicht, weil Quellen fehlen, sondern weil eine Darstellung nie alles zeigen kann."],
      "2-1-7":["teils","Die sechs Gruppen sind ein Modell, zusammengesetzt aus vielen Einzelbefunden – richtig. Noch genauer trifft der Eintrag, der sagt, dass jedes Modell nur einen Ausschnitt zeigt."],
      "2-1-1":["kaum","Wir blicken zwar im Nachhinein auf 1918. Bei den sechs Karten geht es aber nicht um den Rückblick, sondern um den Ausschnitt."],
    },
    bruecke:`<b>Merke:</b> Frag bei jeder Übersicht: Wer hat hier keine eigene Karte? Ein Ausschnitt ist kein Fehler – er muss nur als Ausschnitt erkennbar sein.` });
}
L.schreib = {
  vor:"So kann die Aufgabe in der Klassenarbeit stehen. In dieser Einzelstunde schreibst du etwa 100 Wörter.",
  aufgabe:`Im November 1918 wurde aus einer Meuterei eine Revolution. <b>Erklären Sie</b> an zwei gesellschaftlichen Gruppen, warum viele Menschen das Kaiserreich nicht mehr stützten.`,
  woerter:100, min:50,
  stufen:[["Grundlegend","Du nennst den Matrosenaufstand und eine Gruppe. Warum die Gruppe unzufrieden war, bleibt offen."],["Sicher","Du erklärst an zwei Gruppen, was sie belastete oder was sie forderten. Der Zusammenhang mit dem verlorenen Krieg ist benannt."],["Souverän","Du verbindest Auslöser (Befehl, Meuterei) und tiefere Ursachen (soziale Gegensätze, Kriegsmüdigkeit) und zeigst, dass die Gruppen Verschiedenes wollten."]],
  inhalt:[["Auslöser:","Der Krieg ist verloren; der Befehl zu einer letzten Seeschlacht; die Matrosen in Wilhelmshaven und Kiel verweigern ihn; der Aufstand breitet sich aus."],
    ["Arbeiterschaft:","größte Gruppe; Wohnungsnot, lange Arbeitszeiten, niedrige Löhne; fordert Mitbestimmung."],
    ["Soldaten und Matrosen:","wollen nicht für einen verlorenen Krieg sterben; Gehorsam bricht."],
    ["Frauen, Landbevölkerung:","neue Rollen im Krieg, aber kaum Rechte; am unteren Ende der Rangordnung."],
    ["Adel, Militärführung:","wollen die alte Ordnung erhalten – verlieren aber den Rückhalt."]],
};
L.zf = {
  frage:L.frage,
  kern:"Im Herbst 1918 ist der Krieg verloren. Matrosen verweigern einen sinnlosen Befehl; ihr Aufstand erfasst in wenigen Tagen das ganze Land – weil die Gesellschaft des Kaiserreichs kriegsmüde und tief gespalten ist.",
  begriffe:[["Meuterei","Aufstand von Soldaten oder Matrosen gegen ihre Befehlshaber."],["Matrosenaufstand","Meuterei der Matrosen in Wilhelmshaven und Kiel, Ende Oktober und Anfang November 1918; Auslöser der Revolution."],["Novemberrevolution","Umsturz im November 1918: Ende des Kaiserreichs, Beginn der Republik."],["Milieu","soziales Umfeld, das Denken, Werte und Verhalten von Menschen prägt."],["Soziale Rangordnung (Hierarchie)","Ordnung der Gruppen nach Macht, Ansehen und Besitz."],["Soziale Mobilität","Möglichkeit, in der Gesellschaft auf- oder abzusteigen."]],
  abfolge:{ titel:"Von der Meuterei zur Revolution", punkte:[["24. Okt. 1918","Die Marineleitung befiehlt eine letzte Seeschlacht gegen Großbritannien."],["Ende Okt. 1918","Matrosen in Wilhelmshaven verweigern den Befehl."],["Anfang Nov. 1918","Aufstand in Kiel; Arbeiter- und Soldatenräte entstehen in vielen Städten."],["9. Nov. 1918","Der Aufstand erreicht Berlin: Abdankung des Kaisers verkündet, Ebert Reichskanzler, zweimal wird die Republik ausgerufen."],["10. Nov. 1918","Der Kaiser geht ins Exil in die Niederlande."]] },
  lk:{ name:"Partikularität (2.1.3)", satz:"Historische Erkenntnisse sind immer nur Ausschnitte der gesamten Vergangenheit. Keine Darstellung kann „alles“ erzählen.", beispiel:"Sechs Karten stehen für die Gesellschaft von 1918. Wer keine eigene Karte hat – etwa Kinder oder Kriegsversehrte –, kommt in dieser Darstellung nicht vor." },
  werkzeug:{ titel:"Eine Gesellschaft lesen", schritte:["Welche Gruppen gibt es – wer steht oben, wer unten?","Was hat jede Gruppe zu gewinnen, was zu verlieren?","Wo entstehen daraus Konflikte?"] },
  sonst:"die vier Schritte bis zum 9. November (Auftrag 2), eine ausgedachte Person und ihre Wünsche (Auftrag 4).",
  mein:[["Meine Person", () => { const m = MILIEUS.find(x => x.id === S.r.milieu); return m ? `${S.r.name || "ohne Namen"}, ${S.r.alter || "?"} Jahre, ${m.name}. Erlebt: ${S.r.erf} Wünscht sich: ${S.r.wunsch}` : ""; }], ["Worüber unsere Personen streiten würden", "streit"]],
};
function zusammenfassung(){ return fadenFeld() + zusammen(); }
const SEITE_FN = { start, erinnern, lage, gesellschaft, rolle, landkarte:seiteLk, schreiben:schreibauftrag, zusammenfassung, lehrkraft };
weimarStart();
