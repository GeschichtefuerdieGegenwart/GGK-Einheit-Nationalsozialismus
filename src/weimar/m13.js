/* ===== M13 · Zwei Leben einer Zeit – Forme ich meine Umwelt oder die Umwelt mich? (Heft „Geschichte aktuell 1“, M13 bis M13.4) ===== */
const L = {
  wid:"m13", key:"ggk-w-m13:v1", nr:"M13", titel:"Zwei Leben einer Zeit", unter:"Forme ich meine Umwelt – oder die Umwelt mich?", dauer:90, block:"d",
  /* Zeichen der Stunde: zwei Köpfe, die in verschiedene Richtungen blicken */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><circle cx="11" cy="12" r="5" fill="none" stroke="#24221F" stroke-width="2.4"/><path d="M3 29c0-6 3.5-9 8-9s8 3 8 9" fill="none" stroke="#24221F" stroke-width="2.4" stroke-linecap="round"/><circle cx="24" cy="12" r="5" fill="#E0B74A" stroke="#24221F" stroke-width="2"/><path d="M17 29c0-6 3-9 7-9s7 3 7 9" fill="none" stroke="#9B402D" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  frage:"Wie stark wird das Denken und Handeln eines Menschen durch seine Umwelt geprägt – und wie viel Raum bleibt für eigenständiges Urteilen?",
  blick:{ name:"Blick aus der Nähe: zwei Leben", anker:"2-3-6", tut:"Du folgst zwei Frauen durch ihren Alltag. So arbeitet die Mikrogeschichte – nur sind Lotte und Anna ausgedacht.", fehlt:"Was fehlt: Lotte und Anna sind erfunden und stehen für Milieus. Wirkliche Menschen sind widersprüchlicher. Und zwei Leben sagen noch nichts darüber, wie viele so dachten." },
  deck:{ dauer:"Doppelstunde · 90 Minuten", jahr:"1925", hier:[5],
    satz:"Zwei junge Frauen, dieselbe Zeit, dasselbe Land: Lotte in Berlin, Anna in einem Dorf in Thüringen. Du untersuchst, wie ihr Umfeld ihr Urteil über die Außenpolitik der Republik prägt.",
    ziele:["die Außenpolitik der Stabilisierungsjahre von Dawes-Plan bis Young-Plan darstellen,", "erklären, warum Menschen in Stadt und Land diese Politik so verschieden beurteilen,", "mit dem Agency-Konzept beurteilen, wie viel Raum für ein eigenständiges Urteil bleibt."] },
  blatt:[
    { id:"linie", nr:"1", kurz:"Meinungslinie", name:"Meinungslinie: Wie frei ist mein Denken?", form:"Plenum", min:6, frei:"offen" },
    { id:"rolle", nr:"2", kurz:"Zwei Leben", name:"Zwei Leben einer Zeit", form:"Allein", min:20, frei:"offen" },
    { id:"aussen", nr:"3", kurz:"Außenpolitik", name:"Lotte, Anna und die Außenpolitik", form:"Frei wählbar", min:22, frei:"antwort", nach:"rolle", fehlt:"Wähle erst in Auftrag 2 dein Leben und ordne es ein." },
    { id:"spiel", nr:"4", kurz:"Entscheiden", name:"Wenn Lotte oder Anna entscheiden dürften", form:"Plenum", min:8, frei:"ansage", gleich:"Ihr spielt gemeinsam ein kurzes Entscheidungsspiel zur Außenpolitik und haltet die Kennzahlen fest." },
    { id:"landkarte", nr:"L", kurz:"Landkarte", name:"Landkarte: Agency – wie viel Spielraum bleibt?", form:"Allein", min:9, frei:"antwort", nach:"aussen", fehlt:"Bearbeite erst Auftrag 3." },
    { id:"schreiben", nr:"5", kurz:"Schreibauftrag", name:"Schreibauftrag", form:"Allein", min:15, frei:"ansage", marke:"wie in der Klassenarbeit", gleich:"Du erklärst an Lotte und Anna, wie die Umwelt das Urteil prägt, und beurteilst den Spielraum." },
    { id:"zusammenfassung", nr:"Z", kurz:"Zusammenfassung", name:"Zusammenfassung", form:"Zum Abheften", min:4, frei:"antwort", nach:"schreiben", fehlt:"Die Zusammenfassung öffnet sich nach deinem Text in Auftrag 5.", kopf:"Zum Abheften" },
  ],
  breit:["lehrkraft"],
  loesch:"Deine Position auf der Meinungslinie, deine Einordnung, deine Notizen zur Außenpolitik, die Kennzahlen, dein Text und dein Satz für den roten Faden werden auf diesem Gerät entfernt.",
  init:() => ({ ab:{}, l1:null, lgrund:"", wer:null, privat:"", gesell:"", milieu:"", partei:"", pgrund:"", h:{}, anders:"", kz:{}, modell:"", agency:"", l2:null, jetzt:"" }),
  erledigt:{
    linie:() => S.l1 != null && lang("lgrund", 15), rolle:() => !!S.wer && lang("privat", 20) && lang("gesell", 20) && lang("milieu", 3) && lang("partei", 2) && lang("pgrund", 15),
    aussen:() => tabelleVoll("h", 3, 2, 8) && lang("anders", 20), spiel:() => [0,1,2,3].every(r => lang(`kz.${r}.0`, 1) || lang(`kz.${r}.1`, 1)) && lang("modell", 10),
    landkarte:() => !!S.lk.ok && lang("agency", 20) && S.l2 != null, schreiben:() => schreibFertig(),
  },
  fadenAnf:["Ob jemand die Republik verteidigt, hängt auch von seinem Umfeld ab:", "Eigenständig urteilen kann nur, wer"],
};
const THESE13 = "„Mein Denken ist ein Produkt meiner Umwelt – ich bin nicht frei in meinen Meinungen.“";
/* Sechs Erklärungsansätze nach der Tabelle des Hefts; Kant steht dort unter „Psychologie“ – hier: Philosophie */
const ANSATZ = [["Neurowissenschaft","Entscheidungen beginnen unbewusst im Gehirn.","Libet"],["Soziologie","Der Habitus prägt Denken und Handeln, ohne dass wir es merken.","Bourdieu"],["Philosophie","Ist alles vorherbestimmt – oder gibt es einen freien Willen?","Kant"],["Sozialpsychologie","Die soziale Lage kann Überzeugungen überwältigen.","Milgram, Asch"],["Entwicklungspsychologie","Anlage und Umwelt wirken zusammen.","Piaget, Wygotski"],["Konstruktivismus","Wirklichkeit ist immer vom Menschen gemacht.","Watzlawick"]];
/* Zwei erfundene Rollen nach dem Heft (M13.1, M13.2). Berichtigt: Frauen dürfen seit 1918/19 wählen. */
const LEBEN = {
  lotte:{ name:"Lotte Müller", kurz:"19 Jahre · Berlin", ort:"Berlin", her:"Tochter eines liberalen Anwalts und einer Lehrerin", bild:{ datei:"heft-m13-drei-frauen.jpg", alt:"Szenenbild aus einer Fernsehserie: junge Frauen in einem Berliner Lokal der Zwanzigerjahre", text:"Kein Foto der Zeit: Szenenbild aus der Fernsehserie „Babylon Berlin“.", nachweis:"Foto: Frédéric Batier / X Filme; aus dem Unterrichtsheft, M13.1." },
    punkte:[["Was sie mag","Lotte spielt seit ihrer Kindheit Klavier und liebt Jazz. Sie tanzt Charleston und Foxtrott, besucht Ausstellungen, Theater und Kino. Sie träumt davon, selbst auf der Bühne zu stehen."],
      ["Ihr Alltag","Die Nächte verbringt sie oft in Clubs und Bars. Dort trifft sie Künstler*innen, Musiker*innen und Intellektuelle. Dank ihrer Eltern besucht sie eine höhere Schule und möchte Musik studieren. Berufe in der Kunst stehen ihr offen; Anwältin oder Ärztin zu werden ist für Frauen noch schwer."],
      ["Politik","In ihrer Familie wird über Politik gesprochen. Lotte engagiert sich in Frauenvereinen, die für die Gleichstellung der Frauen kämpfen. Wählen dürfen Frauen seit 1918/19."],
      ["Wie sie ihre Zeit sieht","Berlin ist für sie eine Stadt der Freiheit. Aber sie stößt an die Grenzen alter Rollenbilder. Sie ist zuversichtlich, dass der Aufbruch Bestand hat."]] },
  anna:{ name:"Anna Bauer", kurz:"20 Jahre · ein Dorf bei Weimar", ort:"einem Dorf in Thüringen", her:"Tochter eines Landwirts und einer Hausfrau", bild:{ datei:"heft-m13-landarbeit.jpg", alt:"Menschen und Zugtiere bei der Getreideernte auf einem Feld", text:"Getreideernte in Deutschland um 1922: Die meiste Arbeit leisten Mensch und Tier.", nachweis:"Bild: imago / Gerhard Leber; aus dem Unterrichtsheft, M13.2." },
    punkte:[["Was sie mag","Anna liebt die Natur und kennt sich mit Pflanzen und Tieren aus. Sie singt im Kirchenchor, spielt Harmonika, näht und macht Handarbeiten. Die Feste und Bräuche ihres Dorfes sind ihr wichtig."],
      ["Ihr Alltag","Sie steht früh auf, versorgt die Tiere und arbeitet im Gemüsegarten. Die Ernte bestimmt den Rhythmus des Jahres. Nach der Dorfschule gibt es für sie kaum weitere Bildung. Sie möchte eine Familie gründen und den Hof der Eltern weiterführen."],
      ["Politik","Annas Umfeld ist konservativ und steht den Veränderungen der Republik skeptisch gegenüber. Über Politik wird selten gesprochen; das Dorf hält an Bewährtem fest."],
      ["Wie sie ihre Zeit sieht","Das aufregende Leben in Berlin erscheint ihr fremd und wenig erstrebenswert. Die Lage des Hofes ist unsicher, sie hängt von der Ernte ab. Anna schätzt den Zusammenhalt im Dorf – auch wenn wenig privat bleibt."]] },
};
const FRAGEN13 = { privat:["Tagesablauf: Wie sieht ein typischer Tag aus? Was freut, was belastet?", "Zukunftsträume: Welche Ziele gibt es – und wie erreichbar sind sie?", "Freizeit: Welche Hobbys und Interessen?", "Familie: Welche Rolle spielt sie im Alltag und für die Träume?"],
  gesell:["Soziale Strukturen: Welche Schichten gibt es im Umfeld?", "Politik: Welche Themen sind wichtig? Wie verändert die Republik das Leben?", "Bildung und Beruf: Welche Chancen, welche Schranken?", "Kultur: Was vom Wandel der Zwanzigerjahre ist erreichbar?", "Gesellschaftlicher Wandel: Was wird begrüßt, was kritisch gesehen?"] };
/* Überblick M13.4: historische Fakten der Außenpolitik */
const SCHRITTE13 = [["1924","Dawes-Plan","Die Reparationen werden neu geordnet; internationale Kredite helfen der Wirtschaft.",""],["1925","Vertrag von Locarno","Deutschland erkennt seine Westgrenze als unverletzlich an; Streit soll friedlich beigelegt werden.",""],["1926","Völkerbund","Deutschland wird aufgenommen – ein Zeichen der Anerkennung.",""],["1926","Berliner Vertrag","Vertrag mit der Sowjetunion: Zusammenarbeit und gegenseitige Neutralität.",""],["1926–1930","Rheinlandräumung","Die alliierten Truppen ziehen schrittweise ab.",""],["1929","Young-Plan","Die Reparationen werden endgültig festgelegt: geringere Summe, längere Laufzeit.",""]];
const EWH13 = {
  lotte:["Befürwortend", [["Dawes-Plan und Young-Plan","notwendige Schritte, um die Wirtschaft zu stabilisieren. Kredite und Zusammenarbeit geben Sicherheit – die Grundlage für das kulturelle Leben, das Lotte in Berlin erlebt."],["Locarno und Völkerbund","wichtige Schritte zur Anerkennung Deutschlands und zur Sicherung des Friedens; die Gefahr eines neuen Krieges sinkt."],["Rheinlandräumung","ein Erfolg der Diplomatie, der Deutschlands Souveränität stärkt."]]],
  anna:["Kritisch", [["Dawes-Plan und Young-Plan","Die Reparationen erscheinen als unfaire Last, die den Hof und die ländliche Wirtschaft trifft. Die Abhängigkeit von fremden Krediten weckt Misstrauen."],["Locarno und Völkerbund","Die Anerkennung der Westgrenze gilt in ihrem Umfeld als Kapitulation vor den Siegern; die Zusammenarbeit im Völkerbund als Zugeständnis und Verlust an Souveränität."],["Rheinlandräumung","Im Wirtshaus spielt sie keine Rolle – Erfolge der Regierung werden dort kaum als Erfolge gesehen."]]],
};

function start(){ return deckblatt(); }
function linie(){
  return `${auftrag("Plenum · 6 Minuten", "Meinungslinie", "Stellt euch im Raum zu der These auf: von „stimme gar nicht zu“ bis „stimme voll zu“. Halte danach deine Position und einen Grund fest.")}
  <p class="lead">Jeden Tag begegnen wir Menschen, Nachrichten, Gesprächen, Bildern. Sie formen uns, ohne dass wir es immer bemerken: die Straße, in der wir aufwachsen, die Stimmen in der Bahn, auf TikTok oder Instagram. Was wir denken, was wir wählen, was wir für selbstverständlich halten – wie viel davon ist wirklich unser eigener Gedanke?</p>
  ${zitat("These", esc(THESE13), "")}
  <div class="ab-zwei gleich"><div>${skala("l1", "Wo stehst du?", 5, "1 = stimme gar nicht zu", "5 = stimme voll zu")}</div>
  <div>${textfeld("lgrund", "Mein Grund", { rows:3, zaehl:false, anfaenge:["Ich stehe hier, weil", "Ein Beispiel aus meinem Leben:"] })}</div></div>
  ${vergleich("avgl", ["lgrund"], 15, "Sechs Erklärungsansätze der Forschung ansehen", `<div class="w-karten k3">${ANSATZ.map(a => `<article class="w-kk"><p class="kennung">${esc(a[0])}</p><p>${esc(a[1])}</p><p class="quelle">${esc(a[2])}</p></article>`).join("")}</div><p class="quelle">Nach der Übersicht im Unterrichtsheft, M13. Stark vereinfacht.</p>`)}`;
}
function rolle(){
  const p = LEBEN[S.wer];
  return `${auftrag("Allein · 20 Minuten", "Zwei Leben einer Zeit", "Wähle ein Leben und versetze dich in seine Lage. Beide Frauen sind erfunden; ihr Umfeld ist typisch für die Zeit. Beantworte je eine Frage aus dem privaten und aus dem gesellschaftlichen Bereich aus ihrer Sicht. Ordne sie dann einem Milieu und einer Partei zu: Vergleiche dazu die Werte in Stadt und Land (M12) mit denen der Parteien (M9).")}
  <div class="w-milieus" style="grid-template-columns:1fr 1fr" role="group" aria-label="Leben wählen">${Object.keys(LEBEN).map(k => `<button type="button" data-akt="setz" data-p="wer" data-w="${k}" aria-pressed="${S.wer === k}"><b>${esc(LEBEN[k].name)}</b><small>${esc(LEBEN[k].kurz)} · ${esc(LEBEN[k].her)}</small></button>`).join("")}</div>
  ${p ? `<div class="ab-zwei schmalrechts"><div class="w-karten k2">${p.punkte.map(x => `<article class="w-kk"><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></article>`).join("")}</div>
  <div>${bild(p.bild, { klasse:"hoch" })}<p class="quelle">Erfundene Rolle nach dem Unterrichtsheft, ${S.wer === "lotte" ? "M13.1" : "M13.2"}.</p></div></div>
  <div class="ab-zwei gleich" style="margin-top:1rem"><div><h3 class="klein">Privat</h3><ul class="w-punkte">${FRAGEN13.privat.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
  ${textfeld("privat", `Eine Frage aus Sicht von ${p.name.split(" ")[0]} beantworten`, { rows:4, zaehl:false, anfaenge:["Mein Tag beginnt", "Ich träume davon,"] })}</div>
  <div><h3 class="klein">Gesellschaft</h3><ul class="w-punkte">${FRAGEN13.gesell.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
  ${textfeld("gesell", `Eine Frage aus Sicht von ${p.name.split(" ")[0]} beantworten`, { rows:4, zaehl:false, anfaenge:["In meinem Umfeld", "Von der Republik halte ich"] })}</div></div>
  <h3 class="klein">Deine Einordnung</h3>
  <div class="ab-zwei gleich"><div>${eingabe("milieu", "Milieu", "zum Beispiel: liberales Bürgertum")}${eingabe("partei", "Wahrscheinliche Parteiwahl", "eine Partei der Zeit")}</div>
  <div>${textfeld("pgrund", "Begründung", { rows:3, zaehl:false, anfaenge:["Zu ihren Werten passt", "weil diese Partei"] })}</div></div>
  ${wLink("umfrageM13") ? `<p class="hinweis">Trag deine Einordnung auch in die Umfrage des Kurses ein, damit ihr vergleichen könnt: <a href="${esc(wLink("umfrageM13"))}" target="_blank" rel="noopener">Umfrage öffnen ↗</a></p>` : `<p class="hinweis">Im Plenum vergleicht ihr eure Einordnungen per Handzeichen.</p>`}` : `<p class="hinweis">Wähle Lotte oder Anna.</p>`}`;
}
function aussen(){
  const wer = S.wer || "lotte", p = LEBEN[wer], g = wer === "lotte" ? ["sbahn", "Lotte Müller in der S-Bahn", "M13.1"] : ["wirtshaus", "Anna Bauer im Wirtshaus", "M13.2"], e = EWH13[wer];
  return `${erinnere([["M7: Was legte der Versailler Vertrag für Deutschland fest?", "Gebietsverluste, Reparationen, eine begrenzte Armee und Artikel 231 über die Kriegsschuld."], ["M11: Was geschah im Januar 1923 im Ruhrgebiet?", "Deutschland war mit den Reparationen in Verzug. Französische und belgische Truppen marschierten ins Ruhrgebiet ein."]])}
  ${auftrag("Frei wählbar · 20 Minuten", "Die Außenpolitik", `Lies das Gespräch, das ${p.name.split(" ")[0]} mit anhört. Untersuche: Was hätte sie von der Außenpolitik gehalten – und woran liegt das? Halte dein Ergebnis in der Tabelle fest.`)}
  ${zeitleiste(SCHRITTE13, { klasse:"klein" })}
  <p class="quelle">Sechs Schritte der Außenpolitik nach dem Unterrichtsheft, M13.4. Außenminister in diesen Jahren: Gustav Stresemann.</p>
  <div class="ab-zwei gleich"><div>${leseblatt(g[1], M13_GESPRAECH[g[0]].map(x => x[0] ? [x[0] + ":", "„" + esc(x[1]) + "“"] : esc(x[1])), `Ausgedachtes Gespräch aus dem Unterrichtsheft, ${g[2]}. Die Sprecher*innen sind erfunden; so wurde damals gestritten.`)}</div>
  <div class="klebt">${tabelle("h", ["", `Was ${p.name.split(" ")[0]} davon hält`, "Woran liegt das?"], ["Dawes-Plan und Young-Plan", "Locarno und Völkerbund", "Rheinlandräumung"], { rows:3 })}
  ${textfeld("anders", `Hätte ${p.name.split(" ")[0]} auch anders urteilen können? Was hätte sie dazu gebraucht?`, { rows:3, zaehl:false, anfaenge:["Anders urteilen könnte sie, wenn", "Schwer wäre das, weil"] })}
  ${vergleich("hvgl", ["h.0.0","h.1.0","anders"], 8, "Mit dem Heft vergleichen", `<p><b>${esc(p.name)}: wahrscheinlich ${esc(e[0].toLowerCase())}.</b></p><ul>${e[1].map(x => `<li><b>${esc(x[0])}:</b> ${esc(x[1])}</li>`).join("")}</ul>
  <div class="w-karten k2"><article class="w-kk blau"><h3>Wer war dafür?</h3><p>Die Regierung unter Stresemann, SPD und DDP, viele Intellektuelle, Künstler*innen und Unternehmer – und alle, die an einem friedlichen Europa interessiert waren.</p></article><article class="w-kk rot"><h3>Wer war dagegen?</h3><p>DNVP und NSDAP („Kapitulation“, „nationale Demütigung“), die KPD (Völkerbund als Werkzeug des Kapitalismus) und viele, die unter Krieg und Inflation gelitten hatten.</p></article></div>
  <p><b>Achtung:</b> „wahrscheinlich“ heißt nicht „zwangsläufig“. Das Umfeld macht ein Urteil naheliegend. Es nimmt es einem Menschen nicht ab.</p><p class="quelle">Gekürzt nach dem Erwartungshorizont und den Überblicken M13.3 des Unterrichtsheftes.</p>`)}</div></div>`;
}
function spiel(){
  return `${auftrag("Plenum · 8 Minuten", "Wenn Lotte oder Anna entscheiden dürften", "Spielt das Entscheidungsspiel zur Außenpolitik als Klasse – einmal als Lotte, einmal als Anna. Wie hätte sich die Republik entwickelt? Notiert die Kennzahlen am Ende des Spiels.")}
  ${filmKarte({ art:"Interaktive Seite", dauer:"etwa 5 Minuten", titel:"Außenpolitik der Weimarer Republik – das Entscheidungsspiel", text:"Am Beamer: Die Klasse entscheidet gemeinsam. Am Ende zeigt das Spiel vier Kennzahlen.", nachweis:"Eigene Seite des Kurses; Link aus dem Unterrichtsheft, M13.3.", url:"https://geschichtefuerdiegegenwart.github.io/au-enpolitik_weimarer-Republik/", wo:"geschichtefuerdiegegenwart.github.io", knopf:"Spiel öffnen" })}
  ${tabelle("kz", ["Kennzahl am Ende", "Lotte", "Anna"], ["Arbeitslosigkeit (%)", "Inflation (%)", "Wirtschaftswachstum (%)", "mögliches Wahlergebnis der NSDAP (%)"], { rows:1 })}
  <div class="trift"><b>Ein Modell:</b> Die Zahlen des Spiels sind keine Messwerte. Sie zeigen, wie die Seite Ursache und Folge verknüpft.</div>
  ${textfeld("modell", "Was lässt dieses Modell weg?", { rows:2, zaehl:false, anfaenge:["Das Spiel berücksichtigt nicht,", "In Wirklichkeit entschieden"] })}`;
}
function seiteLk(){
  return landkarteL({ teil:"wirkung", frage:"Du fragst, wie viel Raum Lotte und Anna für ein eigenes Urteil hatten. Welches Analyseinstrument der Landkarte ist das?",
    heft:"Lesen Sie sich das Agency-Konzept (3.1.5) durch und erklären Sie mit dessen Hilfe den Einfluss der sozialen Umwelt, auf das Verhalten von Menschen.",
    lead:"Denk an deine Antwort in Auftrag 3: Hätte sie auch anders urteilen können? Vermute: Wovon hängt das ab?", platz:"Es hängt davon ab, ob …",
    urteil:{
      "3-1-5":["zentral","Agency fragt, inwieweit Menschen eigenständig handeln und entscheiden konnten – und auch anders hätten handeln können. Das hängt von Fähigkeiten ab, aber auch von Strukturen, Macht, Geschlecht, Herkunft und Rechten."],
      "3-1-1":["teils","Was im Wirtshaus und in der S-Bahn gesagt wird, speist sich aus gemeinsamen Erinnerungen und Deutungen – etwa an Versailles. Gefragt war aber nach dem Spielraum der Einzelnen."],
      "3-1-3":["kaum","Geschichtspolitik meint den gezielten Einsatz von Geschichte für politische Ziele. Hier geht es um den Spielraum von zwei Menschen in ihrem Umfeld."],
    },
    bruecke:`<b>Agency-Fragen für jede Epoche:</b> Wer hatte Handlungsspielraum, wer war Getriebene*r? Wo lagen die Grenzen des Handelns, und wer setzte sie? Welche Möglichkeiten wurden genutzt, welche nicht?` })
  + `<div class="ab-zwei gleich" style="margin-top:1.4rem"><div>${textfeld("agency", "Erkläre mit dem Agency-Konzept: Wie beeinflusst die soziale Umwelt das Verhalten von Menschen?", { rows:4, zaehl:false, anfaenge:["Die Umwelt bestimmt, welche Möglichkeiten", "Spielraum entsteht, wenn", "Bei Anna zeigt sich das daran, dass"] })}
  ${vergleich("agvgl", ["agency"], 20, "Mit der Landkarte vergleichen", `<p>Agency meint nicht nur Absichten, sondern die Fähigkeit, überhaupt handeln und auch anders handeln zu können. Sie hängt von Fähigkeiten ab, aber auch von Strukturen, Macht, Geschlecht, Herkunft und Rechten. Die Frage lautet: Wie viel Spielraum hatten Menschen innerhalb von Zwängen – und wie haben sie ihn genutzt?</p><p><b>An den zwei Leben:</b> Lotte hat Schulbildung, Zeitungen, Gespräche über Politik, viele Meinungen um sich. Anna hört im Dorf fast nur eine Sicht; weiterführende Bildung fehlt. Ihr Spielraum ist enger – aber er ist da.</p><p class="quelle">Erster Absatz: kognitive Landkarte, 3.1.5. Zweiter Absatz: Vorschlag.</p>`)}</div>
  <div>${zitat("Zurück zur These", esc(THESE13), "")}${skala("l2", "Wo stehst du jetzt?", 5, "1 = stimme gar nicht zu", "5 = stimme voll zu")}
  <p class="hinweis">Deine Position am Anfang: ${S.l1 == null ? "noch offen" : S.l1 + " von 5"}.</p>
  ${textfeld("jetzt", "Was denkst du jetzt – und warum?", { rows:2, zaehl:false })}</div></div>`;
}
L.schreib = {
  vor:"So kann die Aufgabe in der Klassenarbeit stehen: Material, zwei Operatoren, höchstens eine Seite. Hier schreibst du eine halbe Seite.",
  aufgabe:`<b>a) Erklären Sie</b> an Lotte Müller und Anna Bauer, wie die Umwelt eines Menschen sein Urteil über die Außenpolitik der Weimarer Republik prägt.<br><b>b) Beurteilen Sie</b>, wie viel Raum für ein eigenständiges Urteil bleibt.`,
  material:`<p><b>M1 · Zwei erfundene Leben (1925):</b> Lotte Müller, 19, Berlin, Tochter eines liberalen Anwalts und einer Lehrerin, höhere Schule. Anna Bauer, 20, Dorf in Thüringen, Tochter eines Landwirts, Dorfschule, konservatives Umfeld.</p><p><b>M2 · Außenpolitik:</b> Dawes-Plan (1924) · Vertrag von Locarno (1925) · Völkerbund (1926) · Berliner Vertrag (1926) · Rheinlandräumung (1926–1930) · Young-Plan (1929).</p><p><b>M3 · Agency:</b> fragt, inwieweit Menschen in historischen Situationen eigenständig handeln, Entscheidungen treffen und Entwicklungen beeinflussen konnten. Agency hängt von Fähigkeiten ab, aber auch von Strukturen, Macht, Geschlecht, Herkunft und Rechten.</p><p class="quelle">M1 und M2 nach dem Unterrichtsheft, M13. M3: kognitive Landkarte, 3.1.5.</p>`,
  woerter:150, min:60,
  stufen:[["Grundlegend","Du beschreibst, wie Lotte und Anna die Außenpolitik wahrscheinlich sehen, und nennst je einen Grund aus ihrem Umfeld."],["Sicher","Du erklärst die Unterschiede mit Bildung, Umfeld und wirtschaftlicher Lage und beziehst zwei Schritte der Außenpolitik ein."],["Souverän","Du nutzt das Agency-Konzept: Du zeigst, was den Spielraum begrenzt und was ihn öffnet, und begründest, warum „wahrscheinlich“ nicht „zwangsläufig“ heißt."]],
  inhalt:[["Lotte:","befürwortet wahrscheinlich: Stabilität durch Dawes- und Young-Plan, Frieden und Anerkennung durch Locarno und Völkerbund; Umfeld: liberal, gebildet, viele Meinungen."],
    ["Anna:","sieht es wahrscheinlich kritisch: Reparationen als Last für den Hof, Locarno als Kapitulation; Umfeld: konservativ, eine vorherrschende Sicht, wenig Zugang zu Bildung."],
    ["Erklärung:","Das Umfeld bestimmt, welche Informationen, Deutungen und Vorbilder ein Mensch hat."],
    ["Urteil:","Tragfähig sind verschiedene Urteile – von „viel Raum“ bis „wenig Raum“. Es zählt: Du nennst, was den Spielraum begrenzt und was ihn öffnet (Agency: Fähigkeiten, Strukturen, Herkunft, Rechte, Zugang zu anderen Sichtweisen), und du unterscheidest „wahrscheinlich“ von „zwangsläufig“."]],
};
L.zf = {
  frage:L.frage,
  kern:"In den Stabilisierungsjahren gelingt der Republik unter Außenminister Stresemann die Rückkehr in die Staatengemeinschaft: Dawes-Plan, Locarno, Völkerbund, Young-Plan. Ob Menschen das als Erfolg oder als Verrat sehen, hängt stark von ihrem Umfeld ab. Das Umfeld legt ein Urteil nahe – es nimmt es niemandem ab.",
  begriffe:[["Dawes-Plan (1924)","ordnet die Reparationen neu; internationale Kredite helfen der Wirtschaft."],["Vertrag von Locarno (1925)","Deutschland erkennt seine Westgrenze an."],["Völkerbund (1926)","Deutschland wird in die Staatengemeinschaft aufgenommen."],["Young-Plan (1929)","legt die Reparationen endgültig fest: geringere Summe, längere Laufzeit."],["Milieu","Gruppe mit ähnlicher Lebenslage, ähnlichen Werten und oft derselben Partei."],["Agency","Handlungsspielraum: die Fähigkeit, eigenständig – und auch anders – zu handeln."]],
  abfolge:{ titel:"Außenpolitik der Stabilisierungsjahre", punkte:SCHRITTE13.map(s => [s[0], s[1] + ": " + s[2]]) },
  lk:{ name:"Agency (3.1.5)", satz:"Das Agency-Konzept fragt, inwieweit Menschen oder Gruppen in historischen Situationen eigenständig handeln, Entscheidungen treffen und Entwicklungen beeinflussen konnten.", beispiel:"Anna hört im Dorf fast nur eine Sicht auf die Außenpolitik. Ihr Spielraum für ein eigenes Urteil ist enger als der von Lotte – aber er ist da." },
  werkzeug:{ titel:"Die Agency-Fragen stellen", schritte:["Wer hatte in dieser Lage Handlungsspielraum – wer war Getriebene*r?","Wo lagen die Grenzen des Handelns, und wer setzte sie?","Welche Möglichkeiten wurden genutzt, welche nicht?"] },
  sonst:"sechs Erklärungsansätze zur Willensfreiheit (Auftrag 1), das Entscheidungsspiel zur Außenpolitik (Auftrag 4).",
  mein:[["Mein Leben und meine Einordnung", () => S.wer ? `${LEBEN[S.wer].name}: ${S.milieu}, ${S.partei}. ${S.pgrund}` : ""], ["Die These – vorher und nachher", () => S.l1 == null ? "" : `Vorher: ${S.l1} von 5. Nachher: ${S.l2 == null ? "offen" : S.l2 + " von 5"}. ${S.jetzt}`]],
};
function zusammenfassung(){ return fadenFeld() + zusammen(); }
const SEITE_FN = { start, linie, rolle, aussen, spiel, landkarte:seiteLk, schreiben:schreibauftrag, zusammenfassung, lehrkraft };
weimarStart();
