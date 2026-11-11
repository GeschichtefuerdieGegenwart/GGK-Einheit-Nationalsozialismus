/* ===== Stunde 2: Kommunismus gegen Kapitalismus (Heft M31, M31.1) ===== */
const L = {
  sid:"s2", key:"ggk-owk-s2:v1", nr:"Stunde 2", titel:"Kommunismus gegen Kapitalismus", unter:"Truman-Doktrin und Zwei-Lager-Theorie, 1947", mark:OWK_MARK,
  seiten:[["start","",""],["truman","18 Min.","Truman"],["shdanow","15 Min.","Shdanow"],["spiegel","15 Min.","Spiegelbild"],["bloecke","15 Min.","Blöcke"],["landkarte","8 Min.","Landkarte"],["verorten","14 Min.","Verorten"],["merk","","Merkseite"]],
  breit:["truman","shdanow","spiegel","bloecke","verorten","lehrkraft"],
  loesch:"Alle Eingaben dieser Stunde werden auf diesem Gerät entfernt. Verbindungen und der Satz im roten Faden bleiben in der Übersicht der Einheit.",
  init:() => ({ abruf:{}, a1:"", a2:"", spiegel:"", block:{}, blockgepr:false, ziel:{ w:"", o:"" }, v:VINIT() }),
  fadenAnf:["Ideologien zeigten sich 1947 darin, dass", "Hinter den Worten standen Machtinteressen, zum Beispiel", "Beide Seiten beschrieben sich selbst als"],
};
const STIFTE = [["a","▲","So beschreibt der Redner die eigene Seite"],["b","●","Das wirft er der Gegenseite vor"]];
const QUELLEN = {
  truman:{ titel:"Quelle 1 · Harry S. Truman vor dem Kongress, 12. März 1947", kopf:"US-Präsident Truman begründet vor beiden Häusern des Kongresses die außenpolitische Leitlinie der USA. Die Rede geht als „Truman-Doktrin“ in die Geschichte ein.", stifte:STIFTE, abs:[[null, HEFT.truman.slice(0, 4)], [null, HEFT.truman.slice(4, 9)], [null, HEFT.truman.slice(9)]], nachweis:"Aus: Wolfgang Lautemann/Manfred Schlenke (Hrsg.), Die Welt seit 1945. München 1980, S. 576 f. Text nach dem Unterrichtsheft, M31." },
  shdanow:{ titel:"Quelle 2 · Andrej Shdanow bei der Gründung des Kominform, September 1947", kopf:"Im September 1947 gründen kommunistische Parteien das Kommunistische Informationsbüro (Kominform). Der Leningrader Parteisekretär Shdanow verkündet dort die „Zwei-Lager-Theorie“.", stifte:STIFTE, abs:[[null, HEFT.shdanow.slice(0, 4)], [null, HEFT.shdanow.slice(4)]], nachweis:"Aus: Wolfgang Lautemann/Manfred Schlenke (Hrsg.), Die Welt seit 1945. München 1980, S. 156 f. Text nach dem Unterrichtsheft, M31." },
};
const SCHULD = [
  ["Die Sowjetunion. Sie dehnte ihren Machtbereich aus und zwang Osteuropa ihr System auf; der Westen reagierte nur.", "begruendbar", "So sahen es viele westliche Historiker in den 1950er-Jahren („traditionelle“ Deutung). Dafür spricht die Politik Stalins in Osteuropa. Die Deutung übernimmt aber weitgehend Trumans eigene Sicht."],
  ["Die USA. Sie wollten Märkte und Einfluss sichern und setzten die geschwächte Sowjetunion unter Druck.", "begruendbar", "So argumentierten „revisionistische“ Historiker seit den 1960er-Jahren. Dafür sprechen die wirtschaftlichen Interessen hinter dem Marshallplan. Die Deutung nimmt aber Stalins Herrschaft in Osteuropa wenig ernst."],
  ["Beide. Jede Seite hielt ihr eigenes Handeln für Verteidigung und das der anderen für Angriff – so schaukelte sich der Konflikt hoch.", "zentral", "So sehen es viele Historiker seit den 1970er-Jahren („postrevisionistische“ Deutung). Deine Markierungen zeigen genau das: Beide Reden beschreiben die eigene Seite als friedlich und die andere als Bedrohung. Offen bleibt, ob beide Seiten gleich viel Verantwortung tragen."],
];
const BSLOT = [["w1","Westen · wirtschaftlich · 1948–1951","marshall","Der Marshallplan bindet Westeuropa wirtschaftlich an die USA."],["o1","Osten · wirtschaftlich · 1949","rgw","Der RGW ist die sowjetische Antwort: Die Staaten im sowjetischen Einflussbereich durften keine Marshallplan-Kredite annehmen."],["w2","Westen · militärisch · 1949","nato","In der NATO verpflichten sich die Mitglieder, einander bei einem Angriff beizustehen."],["o2","Osten · militärisch · 1955","wp","Der Warschauer Pakt entsteht 1955 – als Antwort auf den NATO-Beitritt der Bundesrepublik."]];
const BOPT = [["marshall","Marshallplan"],["rgw","Rat für gegenseitige Wirtschaftshilfe (RGW)"],["nato","NATO"],["wp","Warschauer Pakt"],["kominform","Kominform"]];

function start(){
  return `${band("Stunde 2 von 9 · Heft M31 · 90 Minuten", "Kommunismus gegen Kapitalismus", "1945 standen sie gemeinsam in Potsdam. 1947 erklären beide Seiten öffentlich, warum die andere den Frieden bedroht.")}
  <p class="leitfrage">Wer ist schuld am Ost-West-Konflikt?</p>
  <div class="karte"><b>Am Ende kannst du …</b><ul><li>zeigen, wie Truman und Shdanow die eigene und die andere Seite beschreiben,</li><li>erklären, warum die beiden Reden wie Spiegelbilder wirken,</li><li>die Blockbildung in Wirtschaft und Militär zuordnen.</li></ul></div>
  ${abruf(["Welche Beschlüsse von Potsdam trugen den Keim zum Streit in sich?", "Was verstehst du unter Kapitalismus, was unter Kommunismus? Je ein Satz."])}
  <div class="trift"><b>Vorgeschichte in drei Sätzen.</b> Seit der Revolution von 1917 versuchten die USA, die von den Kommunisten angestrebte Weltrevolution zu verhindern. Im Zweiten Weltkrieg trat der Gegensatz zurück, weil beide gegen das nationalsozialistische Deutschland kämpften. Als die Sieger eine gemeinsame Ordnung für Deutschland finden mussten, brach er wieder auf. <span class="hinweis">(nach M31)</span></div>
  ${weiter("truman", "Los: Truman")}`;
}
const pult = (id, rechts) => `<div class="lesepult"><div>${quelle(id)}</div><aside>${rechts}</aside></div>`;
function truman(){
  return `${zeitKopf("truman")}<h1>Die Position der USA</h1>
  ${auftrag("Allein · 18 Minuten", "Mit zwei Stiften lesen", "Tippe Sätze an. Mit dem Dreieck markierst du, wie Truman die eigene Seite beschreibt. Mit dem Punkt markierst du, was er der Gegenseite vorwirft. Dann beantworte die zwei Fragen.")}
  ${pult("truman", `${bildO("owk-s2-truman", "Harry S. Truman, Präsident der USA 1945–1953.", "Porträtfoto eines älteren Mannes mit Brille, Anzug und Krawatte.", "M31", { klein:true })}
  ${textfeld("a1", "Welche Lage sieht Truman – und was kündigt er an?", { rows:4, anfaenge:["Truman sieht, dass", "Er kündigt an, dass die USA"], zaehl:false })}
  ${textfeld("a2", "Seine Werte rechtfertigen für ihn die Einmischung in andere Staaten. Was spricht dafür, was dagegen?", { rows:4, anfaenge:["Dafür spricht", "Dagegen spricht"], zaehl:false })}`)}
  ${belege(["truman"], { ta:"Die eigene Seite", tb:"Die Gegenseite" })}
  ${weiter("shdanow", "Weiter: Shdanow")}`;
}
function shdanow(){
  return `${zeitKopf("shdanow")}<h1>Die Position der Sowjetunion</h1>
  ${auftrag("Allein · 15 Minuten", "Dieselben zwei Stifte", "Markiere wieder: Wie beschreibt Shdanow die eigene Seite? Was wirft er den USA und Großbritannien vor? Achte auf die Wörter „demokratisch“ und „Freiheit“ – sie kommen in beiden Reden vor.")}
  ${pult("shdanow", `<div class="karte"><b>Wörter an der Quelle</b><ul style="padding-left:1.1rem;margin:.3rem 0 0;font-size:.95rem"><li><b>Imperialismus:</b> Streben eines Staates, andere Länder zu beherrschen.</li><li><b>reaktionär:</b> rückschrittlich; wer alte Verhältnisse zurückhaben will.</li><li><b>„München-Politik“:</b> Anspielung auf 1938, als Großbritannien und Frankreich Hitler nachgaben.</li><li><b>zweite Front:</b> die Landung der Westalliierten in Frankreich, die erst 1944 kam.</li><li><b>Berliner Konferenz:</b> sowjetischer Name für die Potsdamer Konferenz.</li></ul></div>`)}
  ${belege(["shdanow"], { ta:"Die eigene Seite", tb:"Die Gegenseite" })}
  ${weiter("spiegel", "Weiter: Spiegelbild")}`;
}
function spiegel(){
  const n = markZahl(["truman", "shdanow"]);
  return `${zeitKopf("spiegel")}<h1>Zwei Reden, ein Muster</h1>
  <div class="zweispalt"><div><h3 class="klein" style="margin-top:0">Truman</h3>${belege(["truman"], { ta:"Die eigene Seite", tb:"Die Gegenseite" })}</div><div><h3 class="klein" style="margin-top:0">Shdanow</h3>${belege(["shdanow"], { ta:"Die eigene Seite", tb:"Die Gegenseite" })}</div></div>
  ${n < 4 ? `<p class="hinweis">Du hast erst ${n} Sätze markiert. Geh zurück und markiere in jeder Rede mindestens zwei.</p>` : ""}
  ${auftrag("Zu zweit · 6 Minuten", "Was fällt auf?", "Legt eure Markierungen nebeneinander. Was haben die beiden Reden gemeinsam, obwohl sie Gegner sind?")}
  ${textfeld("spiegel", "Die beiden Reden gleichen sich darin, dass", { rows:3, zaehl:false })}
  ${auftrag("Allein · 5 Minuten, dann Plenum", "Wer ist schuld?", "Die Frage steht so im Heft. Historikerinnen und Historiker haben sie sehr verschieden beantwortet. Wähle die Antwort, die du nach den beiden Quellen am besten begründen kannst.")}
  <div class="karte">${gWahl("schuld", "Wer ist schuld am Ost-West-Konflikt?", SCHULD, { platz:"Ich wähle das, weil in den Quellen …" })}</div>
  ${weiter("bloecke", "Weiter: Blöcke")}`;
}
function bloecke(){
  const b = S.block, alle = BSLOT.every(s => b[s[0]]), g = S.blockgepr;
  return `${zeitKopf("bloecke")}<h1>Aus Worten werden Blöcke</h1>
  ${auftrag("Zu zweit · 15 Minuten", "Lesen und zuordnen", "Lest die vier kurzen Texte. Ordnet dann die Bündnisse in das Schema ein und schreibt zu jedem Block das Ziel auf.")}
  <div class="zweispalt"><div>${lesetext("1 · Die Truman-Doktrin", HEFT.m311_1, "Unterrichtsheft, M31.1")}${lesetext("2 · Der Marshallplan", HEFT.m311_2, "Unterrichtsheft, M31.1. Im Heft fehlt an der Stelle […] ein Wort.")}
  <div class="matrix-wrap"><table><thead><tr><th>Marshallplan-Hilfe (Milliarden US-Dollar)</th>${HEFT.marshall.map(m => `<th>${esc(m[0])}</th>`).join("")}</tr></thead><tbody><tr><td>Betrag</td>${HEFT.marshall.map(m => `<td class="n">${String(m[1]).replace(".", ",")}</td>`).join("")}</tr></tbody></table></div></div>
  <div>${lesetext("3 · Wirtschaftliche Blockbildung", HEFT.m311_3, "Unterrichtsheft, M31.1")}${lesetext("4 · Militärische Blockbildung", HEFT.m311_4, "Unterrichtsheft, M31.1")}</div></div>
  <div class="bilder">${bildO("owk-s2-marshallplan", "Plakat für den Marshallplan: „Freie Bahn dem Marshallplan“.", "Plakat: Ein Lastwagen fährt durch eine geöffnete Schranke, darüber die Schrift „Freie Bahn“, darunter „dem Marshallplan“.", "M31.1")}${bildO("owk-s2-bloecke-europa", "Europa in zwei Blöcken.", "Karte Europas: der Westen blau, der Osten rot eingefärbt.", "M35")}</div>
  <h2 class="abschnitt">Die Entstehung des Ost-West-Konflikts: das Schema</h2>
  <div class="karte">${BSLOT.map(s => `<div class="bslot"><label for="f-block-${s[0]}">${esc(s[1])}</label><select id="f-block-${s[0]}" data-f="block.${s[0]}" data-neu ${g ? "disabled" : ""}><option value="">wählen …</option>${BOPT.map(o => `<option value="${o[0]}" ${b[s[0]] === o[0] ? "selected" : ""}>${esc(o[1])}</option>`).join("")}</select>${g ? `<div class="rm ${b[s[0]] === s[2] ? "zentral" : "teils"}"><b>${b[s[0]] === s[2] ? "Passt." : "Noch einmal prüfen."}</b> ${b[s[0]] === s[2] ? esc(s[3]) : "Lies den Text 3 oder 4 noch einmal: Welches Bündnis gehört zu diesem Jahr?"}</div>` : ""}</div>`).join("")}
  <div class="reihe"><button type="button" class="btn dunkel" data-akt="blockpruef" ${alle && !g ? "" : "disabled"}>Prüfen</button>${g ? `<button type="button" class="btn" data-akt="blockneu">Noch einmal</button>` : ""}</div></div>
  <div class="zweispalt" style="margin-top:.8rem">${textfeld("ziel.w", "Ziel des Westblocks", { rows:2, zaehl:false })}${textfeld("ziel.o", "Ziel des Ostblocks", { rows:2, zaehl:false })}</div>
  <div class="bilder">${bildO("owk-s2-karikatur-drei", "Karikatur: Die Sieger über der Karte.", "Zeichnung: Drei Männer beugen sich über einen Tisch mit einer Landkarte und schieben Teile hin und her.", "M31.1")}${bildO("owk-s2-bloecke-welt", "Die Blöcke weltweit: NATO und Verbündete der USA, Warschauer Pakt und Verbündete der Sowjetunion.", "Weltkarte mit blau und rot eingefärbten Staaten und einer Legende: NATO, Verbündete der USA, Warschauer Pakt, verbündete sozialistische Staaten.", "M31.1")}</div>
  ${weiter("landkarte", "Weiter: Landkarte")}`;
}
AKTION.blockpruef = () => { S.blockgepr = true; speichere(); zeichneBehalte(); };
AKTION.blockneu = () => { S.blockgepr = false; speichere(); zeichneBehalte(); };
const SEITE_FN = { start, truman, shdanow, spiegel, bloecke, verorten, merk, lehrkraft,
  landkarte:() => landkarte({ seite:"landkarte", titel:"Zweimal „Freiheit“, zweimal „Demokratie“", frage:"Truman und Shdanow benutzen dieselben Wörter – und meinen Gegensätzliches. Wie kann das sein?", lead:"Warum beschreiben zwei Redner dieselbe Weltlage so verschieden? Schreib einen Satz.", platz:"Beide sehen die Lage aus …", folge:FOLGE,
    urteil:lkU("2-1-2", "Beide Reden zeigen die Welt aus einer Sichtweise, die von Überzeugungen und Interessen geprägt ist. Truman sieht freie Völker, die bedroht werden; Shdanow sieht friedliche Demokratien, die der Imperialismus unterwerfen will. Wer nur eine Rede liest, hält ihre Sicht leicht für die Wirklichkeit.", { "2-1-8":"Begründbar: Beide Redner sind durch ihr Land und ihr politisches System geprägt. Noch genauer trifft es hier aber das Prinzip, das die Sichtweise mit ihren Interessen benennt.", "2-1-9":"Begründbar: Genau deshalb hast du beide Reden gelesen. Das ist aber die Folge – gefragt ist das Prinzip dahinter." }),
    bruecke:"<b>Für das Plenum.</b> Die Frage „Wer ist schuld?“ verlangt ein Urteil. Aus welcher Perspektive urteilst du – und woran merkt man das an deiner Antwort?", nach:["verorten", "Weiter: Verorten"] }),
};
L.merk = { frage:"Wer ist schuld am Ost-West-Konflikt?", kern:"1947 erklären beide Supermächte die Welt für zweigeteilt. Jede sieht sich als Verteidigerin von Freiheit und Frieden – und die andere als Angreiferin.",
  begriffe:[["Truman-Doktrin", "Zusage der USA vom März 1947, „freien Völkern“ gegen Unterwerfung beizustehen."],["Eindämmung (Containment)", "Politik der USA, die Ausbreitung des Kommunismus aufzuhalten."],["Zwei-Lager-Theorie", "Sowjetische Sicht: Ein „imperialistisches“ und ein „antiimperialistisches“ Lager stehen sich gegenüber."],["Marshallplan", "Wirtschaftshilfe der USA für Europa ab 1948; die Staaten im sowjetischen Einflussbereich durften sie nicht annehmen."],["RGW", "Rat für gegenseitige Wirtschaftshilfe, 1949; wirtschaftlicher Zusammenschluss des Ostblocks."],["NATO / Warschauer Pakt", "Militärbündnisse des Westens (1949) und des Ostens (1955)."]],
  zeit:[["12. März 1947", "Truman-Doktrin"],["Juni 1947", "Ankündigung des Marshallplans"],["Sept. 1947", "Kominform, Zwei-Lager-Theorie"],["1949", "RGW und NATO"],["1955", "Warschauer Pakt"]],
  werkzeug:"<b>Perspektive prüfen:</b> Wer spricht? Zu wem? Wie beschreibt er sich selbst, wie den Gegner? Welche Wörter benutzen beide – und was meinen sie damit?",
  mein:[["Was die beiden Reden gemeinsam haben", "spiegel"],["Wer ist schuld? Meine Begründung", () => (S.wahl.schuld || {}).zu ? SCHULD[S.wahl.schuld.o][0] + " – " + (S.wahl.schuld.grund || "") : ""],["Ziel des Westblocks / des Ostblocks", () => [S.ziel.w, S.ziel.o].filter(Boolean).join(" / ")]] };
L.lk = { ablauf:[["0–8", "Abruf, Vorgeschichte", "allein", "Potsdam und die beiden Begriffe aus dem Kopf."],["8–26", "Truman", "allein", "Zwei Stifte: eigene Seite, Gegenseite. Aufgaben 1 und 2 aus M31."],["26–41", "Shdanow", "allein", "Dieselben Stifte, Aufgabe 3 aus M31 erweitert."],["41–56", "Spiegelbild", "zu zweit, Plenum", "Markierungen nebeneinander; Schuldfrage mit drei Deutungen."],["56–70", "Blöcke", "zu zweit", "M31.1 lesen, Schema ausfüllen."],["70–78", "Landkarte", "allein", "Perspektivität."],["78–90", "Verorten und vernetzen", "allein", "Karten 2, 3 und 4."]],
  muster:["Denkhandlung: vergleichen und beurteilen.", "Muster 11 (Markieren mit zwei Stiften) für beide Reden, Muster 2 (Einfachwahl mit Erklärung je Option) für die Schuldfrage und die Landkarte, Muster 3 (Zuordnen) für das Schema aus M31.1.", "Mehrwert gegenüber Papier: Die Markierungen beider Reden stehen danach automatisch nebeneinander – das Spiegelbild wird sichtbar."],
  erwartung:["Truman, eigene Seite: frei von Zwang, Wille der Mehrheit, freie Wahlen. Gegenseite: totalitäre Regierungsformen, Terror, Zensur, manipulierte Wahlen.", "Shdanow, eigene Seite: gerechter demokratischer Frieden, Länder der neuen Demokratie. Gegenseite: imperialistisches Joch, Sabotage der zweiten Front, Missachtung der sowjetischen Interessen in Potsdam.", "Schema: Marshallplan – RGW; NATO – Warschauer Pakt."],
  heft:["Aufgabe 3 (Vorwürfe Shdanows markieren) ist auf beide Reden ausgeweitet und um das Selbstbild ergänzt.", "Die Schuldfrage aus dem Schaubild in M31.1 ist mit drei Deutungen der Geschichtswissenschaft unterlegt (traditionell, revisionistisch, postrevisionistisch). Die Zuordnung der Stufen bitte prüfen.", "Im Text zum Marshallplan fehlt im Heft ein Wort („Krediten, die nur zu … zurückbezahlt werden mussten“); die Lücke ist mit […] markiert.", "Die Karikatur Kennedy/Chruschtschow aus M31.1 steht bei Stunde 6 (Kuba-Krise), weil sie 1962 zeigt.", "Die Porträtreihe in M31.1 (Wilson, Stalin, Churchill, Chruschtschow, Kennedy) ist nicht übernommen."],
  nurdu:["Entscheiden, ob Truman und Shdanow arbeitsteilig gelesen werden (spart etwa zehn Minuten)."] };
stundeStart();
