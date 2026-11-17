/* ===== M2 · Der Ausbruch des Ersten Weltkriegs (Heft „Geschichte aktuell 1“, M2) ===== */
const L = {
  wid:"m02", key:"ggk-w-m02:v1", nr:"M2", titel:"Der Ausbruch des Ersten Weltkriegs", unter:"Allgemeinwissen: Ursachen, Anlass, Julikrise 1914", dauer:45, block:"a",
  /* Zeichen der Stunde: Lunte am Pulverfass */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><rect x="8" y="14" width="18" height="15" rx="3" fill="none" stroke="#24221F" stroke-width="2.4"/><path d="M8 19h18M8 24h18" stroke="#24221F" stroke-width="1.6"/><path d="M17 14c0-5 4-4 4-8" fill="none" stroke="#9B402D" stroke-width="2.4" stroke-linecap="round"/><circle cx="21" cy="5" r="1.8" fill="#9B402D"/></svg>`,
  frage:"Wie konnte aus einem Attentat in Sarajevo ein Krieg der europäischen Großmächte werden?",
  deck:{ dauer:"Einzelstunde · 45 Minuten", jahr:"1914", hier:[0],
    satz:"In M1 hast du erlebt, wie sich der Krieg angefühlt haben könnte. Jetzt ordnest du: Welche Ursachen hatte er, was war der Anlass, und wie griff eines ins andere?",
    ziele:["die Ursachen des Ersten Weltkriegs nennen und miteinander verknüpfen,", "erklären, wie die Bündnisse in der Julikrise 1914 aus einem Konflikt einen großen Krieg machten,", "den Unterschied zwischen dieser Stunde und M1 benennen: Analysieren statt Erleben."] },
  blatt:[
    { id:"vermuten", nr:"1", kurz:"Erst vermuten", name:"Erst vermuten: Warum Krieg?", form:"Allein", min:3, frei:"offen" },
    { id:"lesen", nr:"2", kurz:"Sechs Ursachen", name:"Sechs Abschnitte: von den Kolonien zur Julikrise", form:"Allein", min:10, frei:"offen" },
    { id:"buendnisse", nr:"3", kurz:"Bündnisse", name:"Zwei Bündnissysteme färben", form:"Allein oder zu zweit", min:7, frei:"offen" },
    { id:"wissen", nr:"4", kurz:"Wissens-Check", name:"Wissens-Check mit Erklärung", form:"Allein", min:8, frei:"antwort", nach:"lesen", fehlt:"Lies erst die Abschnitte in Auftrag 2 und setze deine Kette." },
    { id:"landkarte", nr:"L", kurz:"Landkarte", name:"Landkarte: Welche Form von Geschichte ist das?", form:"Allein", min:4, frei:"antwort", nach:"wissen", fehlt:"Bearbeite erst den Wissens-Check in Auftrag 4." },
    { id:"schreiben", nr:"5", kurz:"Schreibauftrag", name:"Schreibauftrag", form:"Allein", min:10, frei:"ansage", marke:"wie in der Klassenarbeit", gleich:"Du stellst die Julikrise dar und erklärst die Rolle der Bündnisse." },
    { id:"zusammenfassung", nr:"Z", kurz:"Zusammenfassung", name:"Zusammenfassung", form:"Zum Abheften", min:3, frei:"antwort", nach:"schreiben", fehlt:"Die Zusammenfassung öffnet sich nach deinem Text in Auftrag 5.", kopf:"Zum Abheften" },
  ],
  breit:["lehrkraft"],
  loesch:"Deine Vermutung, deine Kette, die gefärbten Bündnisse, deine Antworten und dein Text werden auf diesem Gerät entfernt.",
  init:() => ({ vermutung:"", kette:"", b:{}, stiftb:"e", bok:false, q:{} }),
  erledigt:{
    vermuten:() => lang("vermutung"), lesen:() => lang("kette", 20), buendnisse:() => !!S.bok, wissen:() => checkFertig("q", FRAGEN.length),
    landkarte:() => !!S.lk.ok, schreiben:() => schreibFertig(),
  },
  fadenAnf:["Der Krieg entstand, weil", "Die Bündnisse sorgten dafür, dass"],
};
/* Sechs Abschnitte nach dem Text des Hefts (M2), sprachlich geglättet. Berichtigt: Kaiserreich 1871–1918; Entente cordiale (1904) als Verständigung, nicht als Bündnis; „Triple Entente“ statt „triple cordiale“. */
const ABSCHNITTE = [
  { id:"kolonien", titel:"Konflikte um Kolonien", kurz:"Streit in Afrika", text:["Fast die ganze Welt war unter den europäischen Mächten aufgeteilt. Immer häufiger kamen sie sich in Afrika in die Quere. Streit um Grenzen sorgte für Spannungen.", "Frankreich und Großbritannien beanspruchten beide das Gebiet am oberen Nil. 1898 drohte ein Krieg. Doch die beiden einigten sich und schlossen 1904 eine Verständigung: die „Entente cordiale“."] },
  { id:"ruestung", titel:"Wettrüsten", kurz:"Armeen und Flotten", text:["Alle Länder rüsteten stark auf. Jede Nation hielt sich für stark und bereit für einen Krieg. Ein Krieg galt vielen nicht mehr als das Schlimmste; manche sehnten ihn sogar herbei, als „reinigendes Gewitter“.", "Das Deutsche Kaiserreich (1871–1918) vertrat seit etwa 1890 seine Ansprüche auf Kolonien und Macht aggressiver. Kaiser Wilhelm II. ließ eine große Flotte bauen: „Unsere Zukunft liegt auf dem Wasser.“ Vor allem Großbritannien war davon wenig begeistert, denn es beherrschte bisher mit seiner Flotte die Weltmeere."] },
  { id:"buendnis", titel:"Zwei Bündnissysteme", kurz:"Entente und Mittelmächte", text:["Russland und Frankreich schlossen schon 1892 ein Militärabkommen. 1904 kam die Verständigung zwischen Frankreich und Großbritannien hinzu, 1907 ein Vertrag zwischen Großbritannien und Russland. So entstand die Triple Entente.", "Auf der anderen Seite standen das Deutsche Kaiserreich, Österreich-Ungarn, Italien und Rumänien im Bündnis. Italien und Rumänien erklärten sich bei Kriegsausbruch allerdings für neutral und kämpften später auf der Seite der Entente.", "Wurde eine Seite angegriffen, mussten die Verbündeten helfen. Auf diese Weise konnte ein einzelner Konflikt alle diese Länder zum Krieg zwingen."] },
  { id:"balkan", titel:"Das Pulverfass Balkan", kurz:"Wer bekommt Bosnien?", text:["Lange herrschte auf dem Balkan das Osmanische Reich. Im 19. Jahrhundert wurden Griechenland, Bulgarien, Rumänien und Serbien selbstständig. Sie rangen nun um Gebiete.", "Der große Nachbar Österreich-Ungarn nahm sich Bosnien-Herzegowina. Serbien hätte dieses Gebiet ebenfalls gern gehabt, weil dort viele Slawen lebten. Russland verstand sich als Schutzmacht aller Slawen und stand deshalb auf der Seite Serbiens."] },
  { id:"attentat", titel:"Das Attentat von Sarajevo", kurz:"28. Juni 1914", text:["Österreich-Ungarn wollte gegenüber Serbien seinen Anspruch auf Bosnien deutlich machen. Deshalb fuhren der Thronfolger Franz Ferdinand und seine Frau Sophie Chotek nach Sarajevo.", "Als die beiden am 28. Juni 1914 durch die Stadt fuhren, wurden sie von einem serbischen Nationalisten erschossen."] },
  { id:"juli", titel:"Die Julikrise 1914", kurz:"vom Attentat zum Krieg", text:["So heißt die Zeit zwischen Attentat und Kriegsausbruch. Österreich-Ungarn wollte Serbien für das Attentat zur Verantwortung ziehen und die Chance nutzen, Serbien durch einen Krieg zu schwächen. Hinter Serbien stand Russland.", "Deshalb versicherte sich Österreich-Ungarn der Rückendeckung des Deutschen Kaiserreichs. Dieses stellte einen „Blankoscheck“ aus: volle Rückendeckung.", "Österreich-Ungarn stellte Serbien ein Ultimatum mit Forderungen, die kaum zu erfüllen waren. Serbien ging auf fast alles ein. Das reichte Österreich-Ungarn nicht: Es erklärte Serbien den Krieg. Russland machte seine Truppen mobil – es bereitete sich auf den Krieg vor."] },
];
const NACHWEIS = "Nach dem Text des Unterrichtsheftes, M2 (sprachlich geglättet, drei Angaben berichtigt). Das Heft nennt für diesen Text keine Quelle (noch offen).";
/* Acht Länder, die im Text vorkommen. soll: e = Entente, m = Bündnis mit dem Deutschen Kaiserreich (spätere Mittelmächte), n = keinem der beiden Bündnisse fest verpflichtet */
const LAENDER = [
  { id:"gb", name:"Großbritannien", feld:"1 / 1 / 3 / 5", u:{ e:["zentral","Verständigung mit Frankreich 1904, Vertrag mit Russland 1907."], m:["kaum","Großbritannien fühlte sich durch die deutsche Flotte bedroht und rückte an Frankreich und Russland heran."], n:["kaum","Bis 1904 hielt sich Großbritannien heraus. Danach band es sich: 1904 an Frankreich, 1907 an Russland."] } },
  { id:"ru", name:"Russland", feld:"1 / 8 / 4 / 13", u:{ e:["zentral","Militärabkommen mit Frankreich 1892, Vertrag mit Großbritannien 1907."], m:["kaum","Russland stand auf dem Balkan gegen Österreich-Ungarn – es gehörte zum anderen Bündnis."], n:["kaum","Russland war seit 1892 mit Frankreich verbunden."] } },
  { id:"de", name:"Deutsches Kaiserreich", feld:"2 / 5 / 4 / 8", u:{ m:["zentral","Im Bündnis mit Österreich-Ungarn, dazu Italien und Rumänien."], e:["kaum","Die Entente richtete sich gerade gegen die wachsende Macht des Deutschen Kaiserreichs."], n:["kaum","Das Kaiserreich war fest mit Österreich-Ungarn verbündet."] } },
  { id:"fr", name:"Frankreich", feld:"4 / 1 / 6 / 5", u:{ e:["zentral","Militärabkommen mit Russland 1892, Verständigung mit Großbritannien 1904."], m:["kaum","Frankreich stand dem Deutschen Kaiserreich gegenüber."], n:["kaum","Frankreich war seit 1892 mit Russland verbunden."] } },
  { id:"oe", name:"Österreich-Ungarn", feld:"4 / 5 / 5 / 9", u:{ m:["zentral","Im Bündnis mit dem Deutschen Kaiserreich."], e:["kaum","Österreich-Ungarn stand auf dem Balkan gegen Serbien und Russland."], n:["kaum","Österreich-Ungarn war fest mit dem Deutschen Kaiserreich verbündet."] } },
  { id:"ro", name:"Rumänien", feld:"4 / 9 / 6 / 13", u:{ m:["zentral","Auf dem Papier im Bündnis mit dem Deutschen Kaiserreich und Österreich-Ungarn."], n:["teils","Bei Kriegsausbruch erklärte sich Rumänien für neutral und kämpfte später auf der Seite der Entente. Vor dem Krieg stand es aber im Bündnis mit dem Kaiserreich."], e:["kaum","Erst im Krieg wechselte Rumänien die Seite. Gefragt ist der Stand vor dem Krieg."] } },
  { id:"it", name:"Italien", feld:"5 / 5 / 7 / 7", u:{ m:["zentral","Auf dem Papier im Bündnis mit dem Deutschen Kaiserreich und Österreich-Ungarn."], n:["teils","Bei Kriegsausbruch erklärte sich Italien für neutral und kämpfte später auf der Seite der Entente. Vor dem Krieg stand es aber im Bündnis mit dem Kaiserreich."], e:["kaum","Erst im Krieg wechselte Italien die Seite. Gefragt ist der Stand vor dem Krieg."] } },
  { id:"se", name:"Serbien", feld:"5 / 7 / 6 / 9", u:{ n:["zentral","Serbien gehörte keinem der beiden Bündnisse an. Russland verstand sich aber als seine Schutzmacht – deshalb zog der Streit um Serbien Russland hinein."], e:["teils","Im Krieg kämpfte Serbien an der Seite der Entente, und Russland stand hinter ihm. Einen Platz in der Triple Entente hatte es vor dem Krieg aber nicht."], m:["kaum","Serbien war der Gegner Österreich-Ungarns."] } },
];
const STIFTE = [["e","▲","Triple Entente"],["m","●","Bündnis um das Deutsche Kaiserreich"],["n","○","keinem Bündnis fest verpflichtet"]];
const FRAGEN = [
  ["Was bedeutet „Wettrüsten“ im Text?", [["Länder bauen ihre Armeen und Flotten stark aus", true, "Jede Macht rüstet auf, weil die anderen aufrüsten. So schaukelt es sich hoch."], ["Länder verkleinern ihre Armeen", false, "Das wäre Abrüstung. Im Text steht das Gegenteil: Alle rüsteten stark auf."], ["Länder schließen alle Waffenfabriken", false, "Die Fabriken arbeiteten mehr, nicht weniger."]], "Wettrüsten"],
  ["Welches Ziel verfolgte Kaiser Wilhelm II. mit dem Flottenbau?", [["Nur Handelsschiffe bauen", false, "Es ging um Kriegsschiffe: Die Flotte sollte Macht zeigen."], ["Die Macht des Kaiserreichs in der Welt sichern", true, "„Unsere Zukunft liegt auf dem Wasser“ – die Flotte sollte Kolonien und Einfluss sichern."], ["Die Flotte Russlands unterstützen", false, "Russland gehörte zum anderen Bündnis."]], "Wettrüsten"],
  ["Welches Land fühlte sich durch die deutsche Flotte besonders bedroht?", [["Russland", false, "Russlands Streit mit den Mittelmächten lag auf dem Balkan, nicht auf dem Meer."], ["Italien", false, "Italien war mit dem Kaiserreich verbündet."], ["Großbritannien", true, "Großbritannien beherrschte bisher mit seiner Flotte die Weltmeere."]], "Wettrüsten"],
  ["Welche Länder bildeten die Triple Entente?", [["Deutsches Kaiserreich, Österreich-Ungarn, Italien", false, "Das ist das andere Bündnis."], ["Frankreich, Großbritannien, Russland", true, "1892 Frankreich und Russland, 1904 Frankreich und Großbritannien, 1907 Großbritannien und Russland."], ["Italien, Rumänien, Österreich-Ungarn", false, "Diese drei standen im Bündnis mit dem Deutschen Kaiserreich."]], "Zwei Bündnissysteme"],
  ["Was folgte aus den Bündnissen, wenn ein Land angegriffen wurde?", [["Nur das angegriffene Land kämpfte", false, "Genau das verhinderten die Bündnisse."], ["Die Verbündeten mussten helfen", true, "So konnte ein einzelner Konflikt alle in den Krieg ziehen."], ["Der Krieg wurde automatisch verboten", false, "Die Bündnisse verboten nichts. Sie verpflichteten zum Beistand."]], "Zwei Bündnissysteme"],
  ["Was wird im Text als „Pulverfass“ bezeichnet?", [["Die Kolonien in Afrika", false, "Dort gab es Streit um Grenzen. Das Bild vom Pulverfass meint aber eine andere Gegend."], ["Der Balkan", true, "Viele neue Staaten, zwei Großmächte mit Ansprüchen – ein Funke genügte."], ["Der Pazifikraum", false, "Der Pazifik kommt im Text nicht vor."]], "Das Pulverfass Balkan"],
  ["Welches Land verstand sich als „Schutzmacht der Slawen“?", [["Frankreich", false, "Frankreich war mit Russland verbündet, hatte aber auf dem Balkan keine solche Rolle."], ["Russland", true, "Deshalb stand Russland auf der Seite Serbiens."], ["Großbritannien", false, "Großbritanniens Sorge galt vor allem der deutschen Flotte."]], "Das Pulverfass Balkan"],
  ["Welches Gebiet nahm sich Österreich-Ungarn, das auch Serbien haben wollte?", [["Elsass-Lothringen", false, "Um Elsass-Lothringen stritten das Deutsche Kaiserreich und Frankreich."], ["Bosnien-Herzegowina", true, "Dort lebten viele Slawen – deshalb erhob auch Serbien Anspruch."], ["Belgien", false, "Belgien liegt im Westen Europas und war nicht umstritten."]], "Das Pulverfass Balkan"],
  ["Wer wurde beim Attentat von Sarajevo ermordet?", [["Kaiser Wilhelm II. und seine Frau", false, "Wilhelm II. regierte bis 1918."], ["Franz Ferdinand und Sophie Chotek", true, "Der Thronfolger Österreich-Ungarns und seine Frau, erschossen von einem serbischen Nationalisten."], ["Der russische Zar und seine Frau", false, "Der Zar war nicht in Sarajevo."]], "Das Attentat von Sarajevo"],
  ["Was ist mit „Julikrise 1914“ gemeint?", [["Die Zeit zwischen Attentat und Kriegsausbruch", true, "In diesen Wochen fielen die Entscheidungen, die zum Krieg führten."], ["Die Zeit nach dem Kriegsende", false, "Der Krieg endete erst 1918."], ["Eine Hungersnot in Österreich", false, "Gemeint ist eine politische Krise zwischen den Staaten."]], "Die Julikrise 1914"],
  ["Was bedeutete der „Blankoscheck“ des Deutschen Kaiserreichs?", [["Das Kaiserreich versprach, neutral zu bleiben", false, "Im Gegenteil: Es stellte sich hinter Österreich-Ungarn."], ["Volle Rückendeckung für Österreich-Ungarns Vorgehen gegen Serbien", true, "Damit konnte Österreich-Ungarn hart gegen Serbien auftreten, obwohl Russland hinter Serbien stand."], ["Das Kaiserreich verlangte Frieden um jeden Preis", false, "Eine solche Forderung gab es nicht."]], "Die Julikrise 1914"],
  ["Wie reagierte Österreich-Ungarn auf das Attentat?", [["Es schloss sofort Frieden mit Serbien", false, "Österreich-Ungarn wollte Serbien schwächen."], ["Es stellte ein Ultimatum und erklärte dann den Krieg", true, "Serbien ging auf fast alles ein. Trotzdem folgte die Kriegserklärung."], ["Es bat Serbien um Entschuldigung", false, "Österreich-Ungarn sah Serbien in der Verantwortung."]], "Die Julikrise 1914"],
];
const alleGefaerbt = () => LAENDER.every(l => S.b[l.id]);

function start(){ return deckblatt(); }
function vermuten(){
  return `${auftrag("Allein · 3 Minuten", "Erst vermuten", "Im Sommer 1914 beginnt ein Krieg, an dem fast alle großen Staaten Europas beteiligt sind. Vermute, bevor du liest: Was braucht es, damit aus einem Streit zwischen zwei Staaten ein Krieg zwischen vielen wird?")}
  ${textfeld("vermutung", "Meine Vermutung", { rows:3, zaehl:false, anfaenge:["Ein großer Krieg entsteht, wenn", "Vielleicht lag es daran, dass"] })}
  <p class="hinweis">Am Ende der Stunde vergleichst du deine Vermutung mit dem, was du herausgefunden hast.</p>`;
}
function lesen(){
  return `${auftrag("Allein · 10 Minuten", "Von den Kolonien zur Julikrise", "Lies die sechs Abschnitte. Wähle links, lies rechts. Schreib danach eine Kette aus mindestens vier Gliedern: Was führte wozu?")}
  ${wahlKarte("abschnitt", ABSCHNITTE.map((a, i) => ({ id:a.id, nr:"Abschnitt " + (i + 1), titel:a.titel, unter:a.kurz, html:`<h3>${esc(a.titel)}</h3>${a.text.map(t => `<p>${esc(t)}</p>`).join("")}<p class="quelle">${NACHWEIS}</p>` })), { titel:"Abschnitt wählen" })}
  ${textfeld("kette", "Meine Kette: Ursachen → Anlass → Krieg", { rows:3, zaehl:false, platz:"Wettrüsten → … → Attentat von Sarajevo → … → Krieg", anfaenge:["Konflikte um Kolonien →", "Attentat von Sarajevo →"] })}
  ${vergleich("kettevgl", ["kette"], 20, "Mit einer Beispielkette vergleichen", `<p><b>Tiefere Ursachen:</b> Konflikte um Kolonien · Wettrüsten · zwei Bündnissysteme · Spannungen auf dem Balkan.</p><p><b>Anlass:</b> das Attentat von Sarajevo (28. Juni 1914).</p><p><b>Julikrise:</b> Blankoscheck → Ultimatum → Kriegserklärung an Serbien → russische Mobilmachung → die Bündnisse ziehen die anderen Mächte hinein.</p><p class="hinweis">Deine Kette darf anders aussehen. Prüfe: Hast du Ursachen und Anlass getrennt?</p>`)}`;
}
function buendnisse(){
  const st = S.stiftb, voll = alleGefaerbt();
  return `${auftrag("Allein oder zu zweit · 7 Minuten", "Zwei Bündnissysteme färben", "Im Heft zeichnest du die Bündnisse mit zwei Farben in die Karte. Hier färbst du die acht Länder aus dem Text: Wähle einen Stift und tippe die Länder an. Gefragt ist der Stand vor dem Krieg. Wenn alle Länder gefärbt sind, prüfst du.")}
  <p class="hinweis">${status("modell", "Modell")} Die Felder zeigen nur ungefähr, wo die Länder liegen. Das ist keine Landkarte: Grenzen und Größen stimmen nicht.</p>
  <div class="ab-zwei schmalrechts"><div>
  <div class="g-stifte" role="group" aria-label="Stift wählen">${STIFTE.map(s => `<button type="button" class="g-stift" data-akt="setz" data-p="stiftb" data-w="${s[0]}" aria-pressed="${st === s[0]}"><span class="z" aria-hidden="true">${s[1]}</span>${esc(s[2])}</button>`).join("")}</div>
  <div class="w-kacheln" role="group" aria-label="Länder färben">${LAENDER.map(l => { const v = S.b[l.id], u = S.bok && v ? l.u[v] : null; return `<button type="button" class="b-${v || "leer"} ${u ? u[0] : ""}" style="grid-area:${l.feld}" data-akt="farbe" data-w="${l.id}" aria-label="${esc(l.name)}: ${v ? STIFTE.find(s => s[0] === v)[2] : "noch nicht gefärbt"}" ${S.bok ? "disabled" : ""}><b>${esc(l.name)}</b><span aria-hidden="true">${v ? STIFTE.find(s => s[0] === v)[1] : ""}</span></button>`; }).join("")}</div>
  <div class="reihe"><button type="button" class="btn dunkel" data-akt="bpruef" ${voll && !S.bok ? "" : "disabled"}>Prüfen</button>${S.bok ? `<button type="button" class="btn" data-akt="bneu">Noch einmal färben</button>` : ""}<span class="hinweis">${voll ? "" : LAENDER.filter(l => S.b[l.id]).length + " von 8 Ländern gefärbt."}</span></div></div>
  <div aria-live="polite">${S.bok ? `<h3 class="klein" style="margin-top:0">Rückmeldung je Land</h3>${LAENDER.map(l => { const u = l.u[S.b[l.id]]; return `<div class="rm ${u[0]}"><b>${esc(l.name)}: ${LKSTUFE[u[0]]}</b> ${esc(u[1])}</div>`; }).join("")}` : wissen("Aus Abschnitt 3", `<p>1892 Russland und Frankreich · 1904 Frankreich und Großbritannien · 1907 Großbritannien und Russland.</p><p>Auf der anderen Seite: Deutsches Kaiserreich, Österreich-Ungarn, Italien und Rumänien.</p>`)}</div></div>`;
}
function wissenCheck(){
  const n = FRAGEN.filter((f, i) => (S.q || {})[i] != null).length;
  return `${auftrag("Allein · 8 Minuten", "Wissens-Check mit Erklärung", "Zwölf Fragen zum Text. Deine erste Antwort zählt: Tippe an, dann bekommst du eine Erklärung. Die Seite vergibt keine Punkte. Liegst du daneben, lies den genannten Abschnitt noch einmal und versuch es erneut.")}
  <p class="hinweis">${n} von ${FRAGEN.length} beantwortet.</p>
  ${check("q", FRAGEN)}`;
}
function seiteLk(){
  return landkarteL({ teil:"formen", frage:"M1 hat dich erleben lassen, M2 erklärt Ursachen und Abläufe. Welche Form von Geschichte ist der Text dieser Stunde?",
    heft:"Was für eine Geschichte (Form der Geschichtsschreibung) wird hier beschrieben? Worin besteht der Unterschied zu M1?",
    lead:"Sieh dir deine Kette aus Auftrag 2 an. Wovon handelt der Text: von einzelnen Menschen, von Ideen, von der Gesellschaft – oder von etwas anderem?", platz:"Der Text erzählt vor allem von …, im Unterschied zu M1 …",
    urteil:{
      "2-3-8":["zentral","Der Text erzählt Ereignisse – Attentat, Ultimatum, Kriegserklärung – mit ihren unmittelbaren Ursachen und Folgen. Das ist Ereignisgeschichte. M1 schaute dagegen auf das Erleben einzelner Menschen."],
      "2-3-2":["teils","Der Text handelt von Staaten und ihren Interessen. Er stellt aber nicht die Geschichte einer Nation in den Mittelpunkt, sondern das Zusammenspiel vieler Staaten in einer Kette von Ereignissen."],
      "2-3-4":["teils","Der Abschnitt über die Kolonien blickt über Europa hinaus. Der Text als Ganzes bleibt aber bei den europäischen Großmächten und ihren Entscheidungen."],
      "2-3-6":["kaum","Mikrogeschichte untersucht einzelne Menschen oder kleine Einheiten sehr genau. Das passt eher zum Blick von M1 auf Paul – nicht zu diesem Überblick."],
      "2-3-7":["kaum","Von Schichten, Lebensbedingungen oder sozialen Bewegungen steht im Text nichts. Das kommt in M4."],
    },
    bruecke:`<b>Merke:</b> Dieselbe Zeit lässt sich verschieden erzählen. Jede Form stellt andere Fragen und sieht deshalb andere Dinge.` });
}
L.schreib = {
  vor:"So kann die Aufgabe in der Klassenarbeit stehen. In dieser Einzelstunde schreibst du etwa 100 Wörter.",
  aufgabe:`Am 28. Juni 1914 wurden in Sarajevo der österreichisch-ungarische Thronfolger und seine Frau erschossen. <b>Stellen Sie dar</b>, wie daraus innerhalb weniger Wochen ein Krieg der Großmächte wurde, und <b>erklären Sie</b> die Rolle der Bündnissysteme.`,
  woerter:100, min:50,
  stufen:[["Grundlegend","Du nennst das Attentat und den Kriegsbeginn. Die Schritte dazwischen fehlen."],["Sicher","Du stellst die Julikrise in der richtigen Reihenfolge dar (Blankoscheck, Ultimatum, Kriegserklärung, Mobilmachung) und nennst die beiden Bündnisse."],["Souverän","Du trennst Anlass und tiefere Ursachen und erklärst, warum gerade die Bündnisse aus einem Konflikt auf dem Balkan einen Krieg aller Großmächte machten."]],
  inhalt:[["Anlass:","Attentat von Sarajevo, 28. Juni 1914."],
    ["Julikrise:","Österreich-Ungarn will Serbien schwächen; Blankoscheck des Deutschen Kaiserreichs; Ultimatum an Serbien; Kriegserklärung an Serbien; Russland macht mobil."],
    ["Bündnisse:","Triple Entente (Frankreich, Großbritannien, Russland) gegen das Bündnis um das Deutsche Kaiserreich und Österreich-Ungarn; Beistandspflicht zieht alle hinein."],
    ["Tiefere Ursachen:","Konflikte um Kolonien, Wettrüsten, Spannungen auf dem Balkan."]],
};
L.zf = {
  frage:L.frage,
  kern:"Der Erste Weltkrieg hatte tiefere Ursachen – Konflikte um Kolonien, Wettrüsten, zwei Bündnissysteme, Spannungen auf dem Balkan – und einen Anlass: das Attentat von Sarajevo. In der Julikrise 1914 machten die Bündnisse aus einem Konflikt einen Krieg der Großmächte.",
  begriffe:[["Entente","Verbindung von Frankreich, Großbritannien und Russland (Triple Entente, 1907)."],["Mittelmächte","das Deutsche Kaiserreich, Österreich-Ungarn und ihre Verbündeten im Ersten Weltkrieg."],["Wettrüsten","Staaten rüsten auf, weil die anderen aufrüsten."],["Pulverfass Balkan","Bild für die gespannte Lage auf dem Balkan um 1914."],["Julikrise 1914","die Wochen zwischen dem Attentat von Sarajevo und dem Kriegsausbruch."],["Blankoscheck","volle Rückendeckung des Deutschen Kaiserreichs für Österreich-Ungarn."]],
  abfolge:{ titel:"Die Julikrise 1914 in Schritten", punkte:[["28. Juni","Attentat von Sarajevo."],["Anfang Juli","„Blankoscheck“: Das Deutsche Kaiserreich sagt Österreich-Ungarn volle Rückendeckung zu."],["23. Juli","Ultimatum Österreich-Ungarns an Serbien."],["28. Juli","Österreich-Ungarn erklärt Serbien den Krieg."],["Ende Juli","Russland macht mobil."],["1.–4. August","Das Deutsche Kaiserreich erklärt Russland und Frankreich den Krieg; Großbritannien tritt in den Krieg ein."]] },
  lk:{ name:"Ereignisgeschichte", satz:"Ereignisgeschichte erzählt einzelne Ereignisse wie Schlachten, Verträge oder Revolutionen und ihre unmittelbaren Ursachen und Folgen.", beispiel:"Der Text zu M2 erzählt vom Attentat bis zur Kriegserklärung. M1 fragte dagegen, wie einzelne Menschen den Krieg erlebten." },
  werkzeug:{ titel:"Ursachen ordnen", schritte:["Tiefere Ursachen und Anlass trennen: Was bestand schon lange, was löste aus?","Die Schritte in die richtige Reihenfolge bringen.","Prüfen, welches Glied die Kette größer machte (hier: die Bündnisse)."] },
  sonst:"deine Vermutung vom Anfang (Auftrag 1), acht Länder und ihre Bündnisse (Auftrag 3), zwölf Fragen mit Erklärung (Auftrag 4).",
  mein:[["Meine Vermutung am Anfang", "vermutung"], ["Meine Kette", "kette"]],
};
function zusammenfassung(){ return fadenFeld() + zusammen(); }
AKTION.farbe = t => { const id = t.dataset.w; setz("b." + id, S.b[id] === S.stiftb ? null : S.stiftb); zeichneBehalte(); };
AKTION.bpruef = () => { if (alleGefaerbt()) { setz("bok", true); zeichneBehalte(); } };
AKTION.bneu = () => { setz("bok", false); zeichneBehalte(); };
const SEITE_FN = { start, vermuten, lesen, buendnisse, wissen:wissenCheck, landkarte:seiteLk, schreiben:schreibauftrag, zusammenfassung, lehrkraft };
weimarStart();
