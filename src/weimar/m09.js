/* ===== M9 · Wohin soll die Reise gehen? Die Wahlen 1919 (Heft „Geschichte aktuell 1“, M9) ===== */
const L = {
  wid:"m09", key:"ggk-w-m09:v1", nr:"M9", titel:"Wohin soll die Reise gehen? Die Wahlen 1919", unter:"Sechs Herausforderungen, viele Antworten – und ein Wahlergebnis", dauer:45, block:"d",
  /* Zeichen der Stunde: ein Stimmzettel in der Urne */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><path d="M5 17h24v12H5z" fill="none" stroke="#24221F" stroke-width="2.4" stroke-linejoin="round"/><path d="M11 17l3-11h9l2 11" fill="#FBF8F1" stroke="#24221F" stroke-width="2" stroke-linejoin="round"/><path d="M15 12l2 2 4-4" fill="none" stroke="#9B402D" stroke-width="2.2" stroke-linecap="round"/><path d="M11 22h12" stroke="#24221F" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  frage:"Wofür entscheiden sich die Menschen 1919 – und war die Demokratie da schon zum Scheitern verurteilt?",
  deck:{ dauer:"Einzelstunde · 45 Minuten (Schreibauftrag als Hausaufgabe)", jahr:"19.1.1919", hier:[1, 3],
    satz:"Zwei Monate nach der Revolution wählen die Deutschen eine Nationalversammlung. Zum ersten Mal dürfen auch Frauen wählen. Wohin soll die Reise gehen?",
    ziele:["sechs Herausforderungen der Zeit nennen und zu einer davon Stellung nehmen,", "das Wahlergebnis von 1919 auswerten und erklären, welche Milieus sich durchgesetzt haben,", "beurteilen, ob die Demokratie 1919 bereits zum Scheitern verurteilt war."] },
  blatt:[
    { id:"lage", nr:"1", kurz:"Herausforderungen", name:"Die Herausforderungen der Zeit", form:"Allein", min:3, frei:"offen" },
    { id:"wahlomat", nr:"2", kurz:"Wahl-O-Mat", name:"Wofür wärst du gewesen? Der Wahl-O-Mat 1919", form:"Frei wählbar", min:10, frei:"antwort", nach:"lage", fehlt:"Leg dich erst in Auftrag 1 fest." },
    { id:"partei", nr:"3", kurz:"Deine Partei", name:"Wofür steht deine Partei?", form:"Frei wählbar", min:5, frei:"antwort", nach:"wahlomat", fehlt:"Bearbeite erst Auftrag 2." },
    { id:"ergebnis", nr:"4", kurz:"Wahlergebnis", name:"Das historische Wahlergebnis 1919", form:"Frei wählbar", min:18, frei:"offen" },
    { id:"urteil", nr:"5", kurz:"Urteil", name:"War die Demokratie 1919 schon verloren?", form:"Allein, dann Plenum", min:4, frei:"antwort", nach:"ergebnis", fehlt:"Bearbeite erst Auftrag 4." },
    { id:"landkarte", nr:"L", kurz:"Landkarte", name:"Landkarte: Von wo aus urteilst du?", form:"Allein", min:5, frei:"antwort", nach:"urteil", fehlt:"Bearbeite erst Auftrag 5." },
    { id:"schreiben", nr:"6", kurz:"Schreibauftrag", name:"Schreibauftrag", form:"Allein · auch als Hausaufgabe", min:12, frei:"ansage", marke:"wie in der Klassenarbeit", gleich:"Du wertest das Wahlergebnis aus und kommst zu einem Urteil." },
    { id:"zusammenfassung", nr:"Z", kurz:"Zusammenfassung", name:"Zusammenfassung", form:"Zum Abheften", min:2, frei:"antwort", nach:"schreiben", fehlt:"Die Zusammenfassung öffnet sich nach deinem Text in Auftrag 6.", kopf:"Zum Abheften" },
  ],
  breit:["lehrkraft"],
  loesch:"Deine Antworten, deine Rechnungen, dein Urteil, dein Text und dein Satz für den roten Faden werden auf diesem Gerät entfernt.",
  init:() => ({ hf:null, antw:"", partei:"", passt:"", steht:"", re1:{}, re2:{}, milieus:"", werte:"", u:null, ugrund:"" }),
  erledigt:{
    lage:() => !!S.hf && lang("antw", 15), wahlomat:() => lang("partei", 2) && lang("passt"), partei:() => lang("steht", 20),
    ergebnis:() => rechneOk("re1") && rechneOk("re2") && lang("milieus") && lang("werte"), urteil:() => S.u != null && lang("ugrund", 15),
    landkarte:() => !!S.lk.ok, schreiben:() => schreibFertig(),
  },
  fadenAnf:["1919 steht die Demokratie auf einer breiten Mehrheit. Schwer wird es trotzdem, weil", "Eine Demokratie braucht mehr als eine Mehrheit bei der Wahl:"],
};
/* Sechs Herausforderungen und Leitfragen nach dem Heft, M9 */
const HF = [
  { id:"verf", titel:"Politische Struktur und Verfassung", frage:"Wie sollte die neue Verfassung aussehen?" },
  { id:"vers", titel:"Friedensverhandlungen und Versailler Vertrag", frage:"Wie sollte Deutschland auf den Versailler Vertrag reagieren?" },
  { id:"soz", titel:"Soziale Fragen", frage:"Wie können die sozialen Bedingungen der Bevölkerung verbessert werden?" },
  { id:"wirt", titel:"Wirtschaftliche Stabilität", frage:"Wie können die wirtschaftlichen Bedingungen verbessert werden?" },
  { id:"ident", titel:"Nationale Identität und Gesellschaft", frage:"Wie kann der gesellschaftliche Zusammenhalt gestärkt werden?" },
  { id:"unruhe", titel:"Revolutionäre Bewegungen und Unruhen", frage:"Wie kann die Republik gegen Aufstände geschützt werden?" },
];
/* Wahl zur Nationalversammlung, 19. Januar 1919, Stimmen in Prozent – Zahlen aus dem Schaubild des Hefts (M9) */
const WAHL19 = [["USPD", 7.6, "#C4622D", "links von der SPD"], ["SPD", 37.9, "#B23A2E", "stärkste Partei"], ["DDP", 18.5, "#E0B74A", "linksliberal"], ["Zentrum", 19.7, "#6E6A62", "katholisch"], ["DVP", 4.4, "#4F7FB5", "rechtsliberal"], ["DNVP", 10.3, "#2F4B6E", "nationalkonservativ"], ["Sonstige", 1.6, "#A8A195", ""]];

function start(){ return deckblatt(); }
function lage(){
  const h = HF.find(x => x.id === S.hf);
  return `${auftrag("Allein · 3 Minuten", "Die Herausforderungen der Zeit", "Deutschland im Januar 1919: Sechs große Fragen sind offen. Wähle die Herausforderung, die dir am dringendsten erscheint, und schreib auf, welche Antwort du darauf gehabt hättest.")}
  <div class="w-milieus" role="group" aria-label="Herausforderung wählen">${HF.map((x, i) => `<button type="button" data-akt="setz" data-p="hf" data-w="${x.id}" aria-pressed="${S.hf === x.id}"><b>${i + 1} · ${esc(x.titel)}</b><small>${esc(x.frage)}</small></button>`).join("")}</div>
  <p class="quelle">Sechs Herausforderungen und Leitfragen nach dem Unterrichtsheft, M9.</p>
  <div class="${h ? "" : "gesperrt"}">${textfeld("antw", h ? `Meine Antwort: ${h.frage}` : "Meine Antwort", { rows:3, zaehl:false, anfaenge:["Ich wäre dafür gewesen, dass", "Am wichtigsten ist mir dabei"] })}</div>`;
}
function wahlomat(){
  return `${auftrag("Frei wählbar · 10 Minuten", "Wofür wärst du gewesen?", "Stell dich den Herausforderungen der Zeit und nimm Stellung. Der Wahl-O-Mat 1919 zeigt dir, welche Partei am ehesten zu deinen Antworten gepasst hätte. Notiere danach dein Ergebnis.")}
  ${filmKarte({ art:"Interaktive Seite", dauer:"10 Fragen · etwa 5 Minuten", titel:"Wahl-O-Mat 1919", text:"Du beantwortest zehn Fragen mit den Augen der Zeit. Die Zuordnung zu den Parteien ist vereinfacht.", nachweis:"Eigene Seite des Kurses; Link aus dem Unterrichtsheft, M9.", url:"https://geschichtefuerdiegegenwart.github.io/Wahl-o-Mat-1919/", wo:"geschichtefuerdiegegenwart.github.io", knopf:"Wahl-O-Mat öffnen" })}
  <div class="trift"><b>Hinweis:</b> Zur Wahl im Januar 1919 traten sechs Parteien an. Die KPD boykottierte die Wahl, die NSDAP gab es noch nicht. Beide kommen im Wahl-O-Mat trotzdem vor, damit du ihre Kernbotschaften kennenlernst. Das ist ahistorisch.</div>
  <div class="ab-zwei gleich" style="margin-top:1rem"><div>${eingabe("partei", "Meine Partei laut Wahl-O-Mat", "zum Beispiel: DDP")}</div>
  <div>${textfeld("passt", "Passt das zu meiner Antwort aus Auftrag 1? Was überrascht mich?", { rows:2, zaehl:false })}</div></div>`;
}
function partei(){
  return `${auftrag("Frei wählbar · 5 Minuten", "Wofür steht deine Partei?", "Informiere dich über deine Partei – und über eine zweite, die ganz anders denkt. Halte in Stichpunkten fest, wofür deine Partei steht.")}
  ${filmKarte({ art:"Interaktive Seite", dauer:"etwa 5 Minuten", titel:"Überblick über die Parteien der Weimarer Republik", text:"Ziele, Wählerschaft und Rolle der Parteien – mit Parteienvergleich.", nachweis:"Eigene Seite des Kurses; Link aus dem Unterrichtsheft, M9.", url:"https://geschichtefuerdiegegenwart.github.io/Parteien-1919/", wo:"geschichtefuerdiegegenwart.github.io", knopf:"Parteien öffnen" })}
  ${textfeld("steht", `Wofür steht ${S.partei ? "die Partei „" + esc(S.partei) + "“" : "meine Partei"}?`, { rows:4, zaehl:false, anfaenge:["Sie fordert", "Gewählt wird sie vor allem von", "Zur Republik steht sie so:"] })}`;
}
function ergebnis(){
  const r = rechneOk("re1") && rechneOk("re2");
  return `${auftrag("Frei wählbar · 18 Minuten", "Das historische Wahlergebnis", "Vergleiche deine Ansichten mit dem echten Wahlergebnis. Rechne zuerst zwei Lager zusammen. Informiere dich dann über die Milieus der Gesellschaft: Wer hat diese Parteien gewählt?")}
  ${halbrund("Wahl zur Nationalversammlung · 19. Januar 1919 · Stimmen in Prozent", WAHL19, "Zahlen aus dem Schaubild des Unterrichtsheftes, M9. Eigene Grafik.", { mitte:"19. JANUAR", mitte2:"1919" })}
  <div class="ab-zwei gleich"><div>${rechne("re1", "SPD, Zentrum und DDP tragen die Republik (später „Weimarer Koalition“). Wie viel Prozent haben sie zusammen?", 76.1, { ja:"76,1 Prozent – gut drei Viertel der Stimmen gehen an Parteien, die die Republik tragen.", nein:"Zähl 37,9 und 19,7 und 18,5 zusammen." })}</div>
  <div>${rechne("re2", "DNVP und DVP stehen der Republik 1919 ablehnend oder fern. Wie viel Prozent haben sie zusammen?", 14.7, { ja:"14,7 Prozent. Die DNVP lehnt die Republik ab; die rechtsliberale DVP steht ihr 1919 noch fern.", nein:"Zähl 10,3 und 4,4 zusammen." })}</div></div>
  <div class="${r ? "" : "gesperrt"}">
  ${filmKarte({ art:"Interaktive Seite", dauer:"etwa 15 Minuten", titel:"Die Gesellschaft der Weimarer Republik 1919", text:"Wer lebte wie? Wer hatte welche Interessen – und wen wählte man deshalb? Tippe auf ein Milieu in der Pyramide.", nachweis:"Eigene Seite des Kurses; Link aus dem Unterrichtsheft, M9. Die Prozentangaben zu den Milieus sind Näherungen.", url:"https://geschichtefuerdiegegenwart.github.io/Die-Gesellschaft-der-Weimarer-Republik-1919/", wo:"geschichtefuerdiegegenwart.github.io", knopf:"Milieus öffnen" })}
  <div class="ab-zwei gleich"><div>${textfeld("milieus", "Welche Milieus haben sich 1919 durchgesetzt?", { rows:3, zaehl:false, anfaenge:["Durchgesetzt haben sich", "Sie wählten vor allem"] })}</div>
  <div>${textfeld("werte", "Welche Werte vertreten diese Milieus?", { rows:3, zaehl:false, anfaenge:["Wichtig ist ihnen", "Von der Republik erwarten sie"] })}</div></div>
  ${vergleich("mvgl", ["milieus","werte"], 10, "Mit Stichpunkten vergleichen", `<div class="w-karten k3"><article class="w-kk rot"><h3>SPD</h3><p>vor allem die Industriearbeiterschaft: soziale Gerechtigkeit, Arbeiterrechte, parlamentarische Demokratie.</p></article><article class="w-kk"><h3>Zentrum</h3><p>das katholische Milieu quer durch die Schichten: Schutz der Kirche, sozialer Ausgleich, Stabilität.</p></article><article class="w-kk blau"><h3>DDP</h3><p>liberales Bürgertum: Grundrechte, Verfassung, eine weltoffene demokratische Gesellschaft.</p></article></div><p class="quelle">Stichpunkte nach den Seiten „Parteien 1919“ und „Wahl-O-Mat 1919“ des Kurses. Prüfe an der Seite zu den Milieus.</p>`)}</div>`;
}
function urteil(){
  return `${auftrag("Allein · 2 Minuten, dann Plenum · 2 Minuten", "Dein Urteil", "War die Demokratie 1919 bereits zum Scheitern verurteilt? Leg dich auf der Linie fest und begründe mit dem Wahlergebnis und den Herausforderungen der Zeit.")}
  <div class="ab-zwei gleich"><div>${skala("u", "War die Demokratie 1919 bereits zum Scheitern verurteilt?", 5, "1 = Nein, sie hatte eine echte Chance", "5 = Ja, sie war von Anfang an verloren")}</div>
  <div>${textfeld("ugrund", "Meine Begründung", { rows:3, zaehl:false, anfaenge:["Dafür spricht das Wahlergebnis:", "Dagegen spricht, dass", "Entscheidend ist für mich"] })}</div></div>`;
}
function seiteLk(){
  return landkarteL({ teil:"prinzip", frage:"„War die Demokratie 1919 schon zum Scheitern verurteilt?“ Welches Prinzip der Landkarte musst du bei dieser Frage besonders beachten?",
    lead:"Du weißt, wie es 1933 ausging. Die Wähler*innen von 1919 wussten es nicht. Vermute: Was macht das mit deinem Urteil?", platz:"Weil ich das Ende kenne, …",
    urteil:{
      "2-1-1":["zentral","Du urteilst im Nachhinein. Wer 1933 kennt, hält die Republik leicht für „von Anfang an verloren“. Das Wahlergebnis zeigt etwas anderes: Gut drei Viertel wählten 1919 Parteien, die die Republik trugen. Die Zukunft war offen."],
      "2-1-8":["teils","Unser Standort heute prägt die Frage – wir wissen von 1933. Ein anderer Eintrag benennt genau diesen Blick im Nachhinein."],
      "2-1-2":["teils","Die Milieus blickten sehr verschieden auf die Republik. Bei der Frage „schon verurteilt?“ geht es aber vor allem darum, dass du vom Ende her zurückblickst."],
      "2-1-4":["teils","Wer nur die Belastungen auswählt, erzählt eine Geschichte des Scheiterns; wer nur das Wahlergebnis auswählt, eine des Aufbruchs. Frag weiter: Warum liegt die erste Auswahl so nahe?"],
      "2-1-7":["teils","„Weimar musste scheitern“ ist eine zusammengesetzte Geschichte – das stimmt. Noch genauer trifft der Eintrag, der sagt, von wann aus sie erzählt wird."],
    },
    bruecke:`<b>Merke:</b> Frag bei jedem Urteil über Weimar: Was konnten die Menschen damals wissen – und was weiß nur ich?` });
}
L.schreib = {
  vor:"So kann die Aufgabe in der Klassenarbeit stehen: Material, zwei Operatoren, höchstens eine Seite. Hier schreibst du eine halbe Seite.",
  aufgabe:`<b>Werten Sie</b> das Ergebnis der Wahl zur Nationalversammlung 1919 <b>aus</b> und <b>beurteilen Sie</b>, ob die Demokratie 1919 bereits zum Scheitern verurteilt war.`,
  material:`<p><b>M1 · Wahl zur Nationalversammlung, 19. Januar 1919 (Stimmen in Prozent):</b> USPD 7,6 · SPD 37,9 · DDP 18,5 · Zentrum 19,7 · DVP 4,4 · DNVP 10,3 · Sonstige 1,6.</p><p><b>M2 · Herausforderungen der Zeit:</b> Verfassung · Versailler Vertrag · soziale Fragen · wirtschaftliche Stabilität · nationale Identität und Gesellschaft · revolutionäre Bewegungen und Unruhen.</p><p class="quelle">Nach dem Unterrichtsheft, M9.</p>`,
  woerter:140, min:60,
  stufen:[["Grundlegend","Du nennst die stärksten Parteien mit Zahlen und sagst, ob die Demokratie für dich verloren war."],["Sicher","Du fasst Parteien zu Lagern zusammen, rechnest ihre Stärke aus und begründest dein Urteil mit Zahlen und einer Herausforderung."],["Souverän","Du wägst die Mehrheit von 1919 gegen die Belastungen ab und zeigst, dass ein Urteil vom Ende 1933 her die offene Lage von 1919 verfehlt."]],
  inhalt:[["Auswertung:","SPD stärkste Partei (37,9 %); SPD, Zentrum und DDP zusammen 76,1 % – eine klare Mehrheit für Parteien, die die Republik tragen; DNVP und DVP zusammen 14,7 %; USPD 7,6 %."],
    ["Für eine echte Chance:","breite demokratische Mehrheit; zum ersten Mal wählen auch Frauen; die Nationalversammlung kann eine Verfassung ausarbeiten."],
    ["Für eine schwere Last:","sechs Herausforderungen zugleich; der Versailler Vertrag steht bevor; Gegner der Demokratie im Staatsdienst und Deutungen wie die Dolchstoßlegende (M8.1)."],
    ["Urteil:","Beide Antworten sind möglich. Es zählt, dass du Zahlen und Belastungen gegeneinander abwägst – und nicht vom Ende her urteilst."]],
};
L.zf = {
  frage:L.frage,
  kern:"Am 19. Januar 1919 wählen die Deutschen die Nationalversammlung – zum ersten Mal auch die Frauen. Gut drei Viertel der Stimmen gehen an SPD, Zentrum und DDP, die die Republik tragen. Die Demokratie beginnt mit einer klaren Mehrheit, aber auch mit sechs großen Herausforderungen.",
  begriffe:[["Nationalversammlung","das 1919 gewählte Parlament, das die Verfassung ausarbeitet."],["Weimarer Koalition","SPD, Zentrum und DDP: die Parteien, die die Republik tragen."],["Milieu","Gruppe von Menschen mit ähnlicher Lebenslage, ähnlichen Werten und oft derselben Partei."],["USPD","Abspaltung der SPD; fordert weiterreichende soziale Reformen."],["DVP","rechtsliberal; vertritt Wirtschaftsinteressen des Bürgertums."],["DNVP","nationalkonservativ; für die Monarchie, gegen Republik und Versailler Vertrag."]],
  abfolge:{ titel:"Sechs Herausforderungen der Zeit", punkte:HF.map((x, i) => [String(i + 1), x.titel]) },
  zahlen:[["19.1.1919","Wahl zur Nationalversammlung"],["37,9 %","SPD – stärkste Partei"],["76,1 %","SPD, Zentrum und DDP zusammen"],["14,7 %","DNVP und DVP zusammen"]],
  lk:{ name:"Retrospektivität (2.1.1)", satz:"Wir betrachten die Vergangenheit immer im Nachhinein (ex post), also aus der Gegenwart heraus.", beispiel:"Wer 1933 kennt, hält die Republik leicht für „von Anfang an verloren“. Die Wähler*innen von 1919 kannten das Ende nicht." },
  werkzeug:{ titel:"Ein Wahlergebnis auswerten", schritte:["Wer ist am stärksten? Welche Parteien gehören zu einem Lager?","Zusammenrechnen: Wie stark sind die Lager?","Deuten: Was sagt das Ergebnis über die Lage – und was sagt es nicht?"] },
  sonst:"Wahl-O-Mat 1919 und die Parteien (Aufträge 2 und 3), die Milieus der Gesellschaft (Auftrag 4).",
  mein:[["Meine Partei laut Wahl-O-Mat", () => S.partei ? `${S.partei}. ${S.steht}` : ""], ["Mein Urteil", () => S.u == null ? "" : `${S.u} von 5 (1 = echte Chance, 5 = von Anfang an verloren). ${S.ugrund}`]],
};
function zusammenfassung(){ return fadenFeld() + zusammen(); }
const SEITE_FN = { start, lage, wahlomat, partei, ergebnis, urteil, landkarte:seiteLk, schreiben:schreibauftrag, zusammenfassung, lehrkraft };
weimarStart();
