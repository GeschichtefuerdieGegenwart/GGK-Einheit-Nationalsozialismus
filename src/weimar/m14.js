/* ===== M14 · Warum scheitert Weimar? Teil 1: Ein neuer Wind – die Weltwirtschaftskrise 1929 (Heft „Geschichte aktuell 1“, M14 und M14.1) ===== */
const L = {
  wid:"m14", key:"ggk-w-m14:v1", nr:"M14", titel:"Warum scheitert Weimar? Die Weltwirtschaftskrise", unter:"Ein neuer Wind weht durch die Straßen", dauer:90, block:"d",
  /* Zeichen der Stunde: eine fallende Kurve */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><path d="M5 5v24h24" fill="none" stroke="#24221F" stroke-width="2.4" stroke-linecap="round"/><path d="M8 10l6 3 4-2 9 14" fill="none" stroke="#9B402D" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M27 19v6h-6" fill="none" stroke="#9B402D" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  frage:"Warum scheitert Weimar? Zerstört die Weltwirtschaftskrise die Republik – oder trifft sie eine Republik, die schon geschwächt ist?",
  blick:{ name:"Sozialgeschichte", anker:"2-3-7", tut:"Du erklärst Politik aus der Lage von Millionen: Arbeitslosigkeit, Verelendung, Wahlverhalten. Wer nur Ereignisse erzählt, sieht den Börsenkrach. Wer nach Strukturen fragt, sieht, warum er eine Demokratie ins Wanken bringt.", fehlt:"Was fehlt: die Entscheidungen einzelner Menschen an der Spitze des Staates. Wer nur auf die Not schaut, übersieht, dass Politiker 1930 bis 1933 auch anders hätten handeln können. Das untersuchst du in M14.2." },
  pole:{ frage:"Wie viel erklärt die Weltwirtschaftskrise am Ende der Republik?", links:"wenig – die Republik war schon geschwächt", rechts:"fast alles – ohne Krise kein Ende" },
  linie:{ fall:"Der junge Arbeitslose aus M5 sagt 1932: „Ich hasse diesen Staat.“ Hunger und die vergebliche Suche nach Arbeit haben ihn geprägt.", frage:"Wie stark bestimmt hier die Umwelt, was er über den Staat denkt?", anf:["Seine Lage wirkt durch", "Spielraum bleibt ihm, weil"] },
  deck:{ dauer:"Doppelstunde · 90 Minuten", jahr:"Okt. 1929", hier:[6],
    satz:"Die „goldenen“ Jahre sind vorbei. 1929 wird das Tanzbein seltener geschwungen; viele Menschen haben Angst um ihre Existenz. In den kommenden Stunden fragt ihr, weshalb die Republik unterging.",
    belastend:"In Auftrag 3 geht es um Hunger, Verzweiflung und Selbsttötungen in der Krise. Wenn dich das belastet oder betrifft: Sprich mit deiner Lehrkraft oder einem Menschen, dem du vertraust. Die TelefonSeelsorge ist kostenlos erreichbar: 0800 111 0 111.",
    ziele:["erklären, wie die Weltwirtschaftskrise Deutschland traf und wie sie verlief,", "Folgen der Arbeitslosigkeit für die einzelnen Menschen aus Quellen herausarbeiten,", "den Einfluss der Krise auf die Wahlergebnisse beurteilen: Wie hängen Wirtschaft und Politik zusammen?"] },
  blatt:[
    { id:"stimmung", nr:"1", kurz:"Stimmungen", name:"Zwei Stimmungen vergleichen", form:"Plenum", min:8, frei:"offen" },
    { id:"kreislauf", nr:"2", kurz:"Kreislauf", name:"Die Weltwirtschaftskrise: Wer hängt an wem?", form:"Gruppe", min:14, frei:"offen" },
    { id:"leben", nr:"3", kurz:"Leben in der Krise", name:"Auswirkungen auf das Leben", form:"Frei wählbar", min:12, frei:"antwort", nach:"kreislauf", fehlt:"Bearbeite erst Auftrag 2." },
    { id:"wahlen", nr:"4", kurz:"Wahlen", name:"Wirtschaft und Politik: die Wahlen 1928 bis 1932", form:"Frei wählbar", min:15, frei:"antwort", nach:"leben", fehlt:"Bearbeite erst Auftrag 3." },
    { id:"landkarte", nr:"L", kurz:"Landkarte", name:"Landkarte: Was zeigen die Quellen – und was nicht?", form:"Allein", min:7, frei:"antwort", nach:"wahlen", fehlt:"Bearbeite erst Auftrag 4." },
    { id:"schreiben", nr:"5", kurz:"Schreibauftrag", name:"Schreibauftrag", form:"Allein", min:15, frei:"ansage", marke:"wie in der Klassenarbeit", gleich:"Du erklärst die Krise und beurteilst ihren Einfluss auf die Wahlen." },
    { id:"zusammenfassung", nr:"Z", kurz:"Zusammenfassung", name:"Zusammenfassung", form:"Zum Abheften", min:4, frei:"antwort", nach:"schreiben", fehlt:"Die Zusammenfassung öffnet sich nach deinem Text in Auftrag 5.", kopf:"Zum Abheften" },
  ],
  breit:["lehrkraft"],
  loesch:"Deine Beschreibungen, eure Hypothese, deine Gedankenblase, deine Bewertung, deine Auswertung der Wahlen, dein Eintrag ins kollektive Gedächtnis, dein Text und dein Satz für den roten Faden werden auf diesem Gerät entfernt.",
  init:() => ({ ab:{}, st:{}, wandel:"", kr:{}, blase:"", pol:null, polgrund:"", w:{} }),
  erledigt:{
    stimmung:() => tabelleVoll("st", 1, 2, 10) && lang("wandel", 15), kreislauf:() => tabelleVoll("kr", 2, 1, 15),
    leben:() => lang("blase", 30) && S.pol != null && lang("polgrund"), wahlen:() => tabelleVoll("w", 3, 1, 15) && lang("kg", 15),
    landkarte:() => !!S.lk.ok, schreiben:() => schreibFertig(),
  },
  fadenAnf:["Eine Demokratie ist in der Wirtschaftskrise besonders gefährdet, weil", "Die Krise allein erklärt den Aufstieg der NSDAP nicht:"],
};
/* Kreislauf nach dem Schaubild M1 des Hefts (aus: Geschichte und Gesellschaft konkret, Cornelsen 2021; dort nach K. Dederke: Reich und Republik. Deutschland 1917–1933, Stuttgart 1984, S. 309). Eigene Darstellung. */
const KREIS = `<figure class="w-kreis"><svg viewBox="0 0 640 310" role="img" aria-label="Kreislauf des Geldes bis 1929: Die USA geben Deutschland Kredite von etwa 20,5 Milliarden Reichsmark. Deutschland zahlt Reparationen an die Alliierten: gefordert etwa 132 Milliarden Goldmark, geleistet etwa 21 Milliarden. Die Alliierten zahlen Kriegsschulden an die USA: etwa 11,5 Milliarden Dollar, bezahlt etwa 2,6 Milliarden.">
  <defs><marker id="kr-p" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0l10 5-10 5z" fill="#9B402D"/></marker></defs>
  <rect x="20" y="24" width="150" height="62" rx="12" fill="#F3DDE0" stroke="#24221F" stroke-width="2"/><text x="95" y="52" text-anchor="middle" class="kr-k">USA</text><text x="95" y="72" text-anchor="middle" class="kr-t">Banken und Staat</text>
  <rect x="450" y="24" width="170" height="78" rx="12" fill="#E3E8EE" stroke="#24221F" stroke-width="2"/><text x="535" y="50" text-anchor="middle" class="kr-k">Deutschland</text><text x="535" y="69" text-anchor="middle" class="kr-t">Banken → Wirtschaft</text><text x="535" y="87" text-anchor="middle" class="kr-t">und Staat → Haushalt</text>
  <rect x="225" y="226" width="190" height="62" rx="12" fill="#FBE7C6" stroke="#24221F" stroke-width="2"/><text x="320" y="253" text-anchor="middle" class="kr-k">Alliierte</text><text x="320" y="273" text-anchor="middle" class="kr-t">Frankreich, Großbritannien …</text>
  <path d="M172 48h274" fill="none" stroke="#9B402D" stroke-width="3" marker-end="url(#kr-p)"/><text x="310" y="34" text-anchor="middle" class="kr-z">Kredite: ca. 20,5 Milliarden RM</text><text x="310" y="68" text-anchor="middle" class="kr-t">kurzfristig und langfristig</text>
  <path d="M545 104C545 200 500 262 419 262" fill="none" stroke="#9B402D" stroke-width="3" marker-end="url(#kr-p)"/><text x="522" y="150" text-anchor="end" class="kr-z">Reparationen</text><text x="522" y="168" text-anchor="end" class="kr-t">gefordert ca. 132 Mrd. Goldmark</text><text x="522" y="186" text-anchor="end" class="kr-t">geleistet ca. 21 Mrd. Goldmark</text>
  <path d="M221 262C140 262 95 200 95 90" fill="none" stroke="#9B402D" stroke-width="3" marker-end="url(#kr-p)"/><text x="118" y="150" class="kr-z">Kriegsschulden</text><text x="118" y="168" class="kr-t">ca. 11,5 Mrd. Dollar</text><text x="118" y="186" class="kr-t">bezahlt ca. 2,6 Mrd. Dollar</text></svg>
  <p class="quelle">Zahlen aus dem Schaubild M1 im Unterrichtsheft (Geschichte und Gesellschaft konkret, Cornelsen 2021; nach K. Dederke: Reich und Republik. Deutschland 1917–1933, Stuttgart 1984, S. 309). Eigene Darstellung, vereinfacht. Stand jeweils bis zur Weltwirtschaftskrise 1929.</p></figure>`;
const WJ = ["1928","1930","1932a","1932b"];
const summe = (k, ids) => Math.round(ids.reduce((a, id) => a + wahlAnteil(k, id), 0) * 10) / 10;
const REIHEN = [["NSDAP", WJ.map(k => wahlAnteil(k, "ns")), "#E0B74A", true], ["SPD", WJ.map(k => wahlAnteil(k, "spd")), "#E5746A"], ["KPD", WJ.map(k => wahlAnteil(k, "links")), "#F0A07A"], ["Zentrum", WJ.map(k => wahlAnteil(k, "z")), "#C9C4BA"], ["DNVP", WJ.map(k => wahlAnteil(k, "dnvp")), "#8FB1DE"], ["DDP und DVP", WJ.map(k => summe(k, ["ddp","dvp"])), "#B6A9E0"]];
const kom = z => String(z).replace(".", ",");

function start(){ return deckblatt(); }
function stimmung(){
  return `${auftrag("Plenum · 7 Minuten", "Zwei Stimmungen", "Eure Lehrkraft zeigt zwei Quellen: ein Bild aus den „goldenen“ Zwanzigern und zwei Minuten aus einem Propagandafilm von 1935. Beschreibe die Stimmung in beiden Quellen und vergleiche.")}
  <div class="trift"><b>Achtung, Propaganda:</b> Der Film „Triumph des Willens“ (Leni Riefenstahl, 1935) zeigt nicht, wie es war. Er zeigt, wie das NS-Regime gesehen werden wollte. Ihr untersucht seine Wirkung – am Beamer, gemeinsam.</div>
  ${tabelle("st", ["", "Quelle 1: Bild aus den „goldenen“ Zwanzigern (Berlin 1926)", "Quelle 2: Ausschnitt aus dem Propagandafilm (1935)"], ["Beschreibung der Stimmung"], { rows:4 })}
  ${textfeld("wandel", "Zwischen beiden Quellen liegen neun Jahre. Vermute: Was ist dazwischen geschehen?", { rows:2, zaehl:false, anfaenge:["Ich vermute, dass", "Die Menschen suchten"] })}`;
}
function kreislauf(){
  return `${erinnere([["M13: Was regelte der Dawes-Plan von 1924?", "Die Reparationen wurden neu geordnet. Internationale Kredite halfen der deutschen Wirtschaft."], ["M12: Für wen waren die Zwanziger „golden“ – und für wen kaum?", "Vor allem für Menschen in den Großstädten. Für viele auf dem Land, für Arbeitslose und Ausgegrenzte galt das kaum."]])}
  ${auftrag("Gruppe · 12 Minuten", "Wer hängt an wem?", "Erläutert die wirtschaftlichen Verflechtungen zwischen den USA und der Weimarer Republik mit dem Schaubild. Stellt danach eine Hypothese auf: Welche Gefahren stecken in diesem System?")}
  ${KREIS}
  ${tabelle("kr", ["", "Unsere Ergebnisse"], ["Erkenntnisse: wirtschaftliche Verflechtungen zwischen den USA und der Weimarer Republik", "Hypothese: Welche Gefahren stecken in diesem System?"], { rows:3 })}
  ${vergleich("krvgl", ["kr.0.0","kr.1.0"], 15, "Auflösung: Was im Oktober 1929 geschah", `<p><b>Im Oktober 1929 bricht die Börse in New York zusammen.</b> In der Not fordern die amerikanischen Banken ihre Kredite zurück. Große Teile der deutschen Wirtschaft stürzen in eine tiefe Krise und entlassen massenhaft Arbeiter*innen. Die Ersparnisse der fast fünf Millionen Arbeitslosen sind bald aufgebraucht: Hunger, Mietrückstände, Verelendung. Deutsche Banken gehen bankrott – Sparguthaben und privates Vermögen sind vernichtet.</p><p class="quelle">Infotext des Unterrichtsheftes, M14.1.</p><p class="hinweis">Zur Vertiefung nennt das Heft einen Film: <a href="https://www.youtube.com/watch?v=X5ZMD6dvXew" target="_blank" rel="noopener">youtube.com ↗</a> (öffnet außerhalb dieser Seite).</p>`)}`;
}
function leben(){
  return `${belastend("In dieser Aufgabe geht es um Hunger, Verzweiflung und Selbsttötungen in der Krise. Wenn dich das belastet oder betrifft: Sprich mit deiner Lehrkraft oder einem Menschen, dem du vertraust. Die TelefonSeelsorge ist kostenlos erreichbar: 0800 111 0 111.")}
  ${auftrag("Frei wählbar · 10 Minuten", "Auswirkungen auf das Leben", "Untersuche die Folgen der Arbeitslosigkeit für die einzelnen Menschen an den drei Materialien. Welche Gefühle und Gedanken lassen sich daraus ableiten? Halte sie in der Gedankenblase fest. Bewerte danach die Politik der Republik.")}
  <div class="ab-zwei gleich"><div>${bild({ datei:"heft-m14-arbeitslose-1931.jpg", alt:"Mehrere Männer schlafen im Sitzen, nach vorn auf ein gespanntes Seil gestützt", text:"M3 · Schlafende Arbeitslose, 1931. Für ein paar Pfennige schliefen sie in einer Unterkunft „an der Leine“: auf ein Seil gestützt, wenigstens geschützt vor dem Wetter.", nachweis:"Aus dem Unterrichtsheft, M14.1 (Geschichte und Gesellschaft konkret, Cornelsen 2021)." }, { klasse:"hoch" })}
  <div class="matrix-wrap"><table><caption style="text-align:left;font-weight:700;padding:.4rem 0">M4 · Selbsttötungen je eine Million Einwohner*innen, 1932</caption><thead><tr><th scope="col">Land</th><th scope="col">Zahl</th></tr></thead><tbody><tr><th scope="row">Großbritannien</th><td>85</td></tr><tr><th scope="row">USA</th><td>133</td></tr><tr><th scope="row">Frankreich</th><td>155</td></tr><tr><th scope="row">Deutschland</th><td>260</td></tr></tbody></table></div>
  <p class="quelle">Nach Fritz Blaich: Der Schwarze Freitag, München 1985, S. 74 (Tabelle im Unterrichtsheft).</p></div>
  <div>${zitat("M5 · Ein junger Arbeitsloser, 1932", "Der Hunger ist noch lange nicht das Schlimmste. Aber seine Arbeit verlernen, bummeln müssen und nicht wissen, ob man jemals wieder in seine Arbeit kommt, das macht kaputt. Man ist rumgelaufen nach Arbeit, Tag für Tag. Man ist bekannt bei den einzelnen Fabriken, und wenn man dann immer das eine hört: Nichts zu machen – da wird man abgestumpft. Ich hasse diesen Staat und habe als Arbeitsloser das Recht und die Pflicht, den […] Besitzenden zu hassen.", "„Der Wiener Tag“, 22. September 1932 (aus dem Unterrichtsheft)")}
  <div class="w-blase">${textfeld("blase", "Gedanken und Gefühle der Menschen in der Krise", { rows:5, zaehl:false, anfaenge:["Ich fühle mich", "Ich frage mich,", "Schuld ist für mich"] })}</div></div></div>
  <div class="ab-zwei gleich"><div>${skala("pol", "Wie erfolgreich bewertest du die Politik der Weimarer Republik?", 6, "1 = miserabel", "6 = grandios")}</div>
  <div>${textfeld("polgrund", "Mein Grund in einem Satz", { rows:2, zaehl:false })}</div></div>
  ${linieFeld()}`;
}
function wahlen(){
  return `${auftrag("Frei wählbar · 15 Minuten", "Wirtschaft und Politik", "Analysiere den Einfluss der Weltwirtschaftskrise auf die Wahlergebnisse der Weimarer Republik – in drei Schritten.")}
  ${linien("Reichstagswahlen 1928 bis 1932 · Stimmen in Prozent", ["Mai 1928","Sept. 1930","Juli 1932","Nov. 1932"], REIHEN, W_WAHLQ + " „DDP und DVP“ ist die Summe beider Parteien.", { max:40 })}
  ${tabelle("w", ["Schritt", "Meine Analyse"], ["1 · Beschreibung: Was zeigen die Wahlergebnisse?", "2 · Fachwissen: Was weißt du über die Weltwirtschaftskrise, das dazu passt?", "3 · Bewertung: Wie stark beeinflusst die Krise die Politik?"], { rows:3 })}
  ${vergleich("wvgl", ["w.0.0","w.1.0","w.2.0"], 15, "Mit Stichpunkten vergleichen", `<div class="w-karten k3"><article class="w-kk"><h3>1 · Beschreibung</h3><p>Die NSDAP steigt von ${kom(wahlAnteil("1928","ns"))} Prozent (1928) auf ${kom(wahlAnteil("1930","ns"))} (1930) und ${kom(wahlAnteil("1932a","ns"))} Prozent (Juli 1932); im November 1932 fällt sie auf ${kom(wahlAnteil("1932b","ns"))}. Die KPD wächst stetig. SPD, DNVP und vor allem die liberalen Parteien verlieren. Das Zentrum bleibt stabil.</p></article><article class="w-kk"><h3>2 · Fachwissen</h3><p>Nach dem Börsenkrach im Oktober 1929 werden Kredite abgezogen; Betriebe entlassen, Banken brechen zusammen, Millionen sind arbeitslos. Wer alles verliert, verliert oft auch das Vertrauen in die Republik.</p></article><article class="w-kk"><h3>3 · Bewertung</h3><p>Hier ist mehr als ein Urteil tragfähig. Für einen starken Einfluss spricht: Mit der Not wachsen die Parteien, die die Republik bekämpfen. Dagegen, dass die Krise alles erklärt, spricht: Das Zentrum hält seine Wähler*innen, und im November 1932 verliert die NSDAP wieder. Dazu kommen die Lasten aus M8.1. Wie gewichtest du?</p></article></div><p class="quelle">Stichpunkte: Vorschlag. Zahlen aus der Grafik.</p>`)}
  ${kgFeld("Mein Eintrag: Weltwirtschaftskrise 1929", "Was setzt sich aus der Krise in den Köpfen fest – und an wen erinnert sie viele (1923)? Zwei bis drei Stichpunkte für das Raster aus M8.1.")}`;
}
function seiteLk(){
  return landkarteL({ teil:"prinzip", frage:"Du erklärst Wahlergebnisse mit Arbeitslosigkeit. Aber was zeigen deine Quellen – und was zeigen sie nicht? Welches Prinzip der Landkarte ist hier wichtig?",
    lead:"Du hast Wahlzahlen, eine Statistik, ein Foto und die Stimme eines einzigen Arbeitslosen. Vermute: Woher könntest du wissen, warum ein Mensch 1932 so gewählt hat, wie er gewählt hat?", platz:"Wissen könnte ich es nur, wenn …",
    urteil:{
      "2-1-5":["zentral","Quellen zeigen immer nur einen Teil der Vergangenheit, und nur ein Teil ist erhalten. Erhalten sind die Zahlen der Wahlen. Umfragen zum Wahlverhalten gab es in der Weimarer Republik nicht. Warum ein Mensch so wählte, hat fast niemand aufgeschrieben. Das ist Partialität – und der Grund, warum die Forschung das Wahlverhalten nur schätzen kann."],
      "2-1-3":["zentral","Die Stimme des jungen Arbeitslosen (M5) ist ein Ausschnitt: ein Mensch von Millionen. Auch die Kurven zeigen nur einen Ausschnitt – Stimmen, nicht Gründe. Besprecht: Was unterscheidet „nur ein Ausschnitt“ (Partikularität) von „mehr ist nicht erhalten“ (Partialität)?"],
      "2-1-4":["teils","Dein Heft hat ausgewählt: ein Foto, eine Statistik, eine Stimme. Das stimmt. Die größere Grenze liegt aber tiefer: Auch wer nichts auswählt, findet keine Befragung der Wähler*innen – es gab keine."],
      "2-1-7":["teils","„Die Krise trieb die Menschen zur NSDAP“ ist eine zusammengesetzte Erklärung – richtig. Frag weiter: Auf welche Quellen stützt sie sich, und welche Quellen fehlen?"],
      "2-1-1":["teils","Wir wissen, wie es 1933 weiterging, und lesen die Kurven von dort aus. Das ist wichtig. Gefragt war aber, was die Quellen selbst zeigen können."],
      "2-1-2":["kaum","Um die Sichtweise eines Erzählers geht es hier weniger. Es geht darum, was überhaupt überliefert ist."],
    },
    bruecke:`<b>Merke:</b> Zwei Kurven, die gemeinsam steigen, zeigen einen Zusammenhang – noch keinen Grund. Eine Untersuchung für Schleswig-Holstein schätzt sogar: Arbeitslose in den Städten wählten meist KPD oder SPD, nicht die NSDAP; auf dem Land war es anders. Schreib deshalb: „Die Zahlen legen nahe, dass …“` })
  + `<p class="quelle">Keine Umfragen zum Wahlverhalten in der Weimarer Republik; Schätzung für Schleswig-Holstein nach: Frank Omland, „Die Nordmark steht zu Hitler!“ Wählerwanderungen und Wählerherkunft der NSDAP in Schleswig-Holstein 1924–1933, in: Informationen zur Schleswig-Holsteinischen Zeitgeschichte 48 (2007), S. 4–67.</p>`;
}
L.schreib = {
  vor:"So kann die Aufgabe in der Klassenarbeit stehen: Material, zwei Operatoren, höchstens eine Seite. Hier schreibst du eine halbe Seite.",
  aufgabe:`<b>a) Erklären Sie</b>, wie die Weltwirtschaftskrise von 1929 Deutschland traf.<br><b>b) Beurteilen Sie</b> ihren Einfluss auf die Wahlergebnisse von 1928 bis 1932 (M3).`,
  material:`<p><b>M1 · Kreislauf bis 1929:</b> Kredite aus den USA (ca. 20,5 Milliarden RM) → deutsche Wirtschaft und Staat → Reparationen an die Alliierten → Kriegsschulden der Alliierten an die USA.</p><p><b>M2 · Oktober 1929:</b> Börsenkrach in New York; die Banken fordern ihre Kredite zurück; Entlassungen, Bankrotte, fast fünf Millionen Arbeitslose.</p><p><b>M3 · Reichstagswahlen (Stimmen in Prozent):</b> NSDAP ${WJ.map(k => kom(wahlAnteil(k, "ns"))).join(" – ")} · KPD ${WJ.map(k => kom(wahlAnteil(k, "links"))).join(" – ")} · SPD ${WJ.map(k => kom(wahlAnteil(k, "spd"))).join(" – ")} · Zentrum ${WJ.map(k => kom(wahlAnteil(k, "z"))).join(" – ")} (jeweils Mai 1928 – September 1930 – Juli 1932 – November 1932).</p><p class="quelle">M1 und M2 nach dem Unterrichtsheft, M14.1. M3 berechnet aus den Stimmenzahlen bei der Konrad-Adenauer-Stiftung.</p>`,
  woerter:150, min:60,
  stufen:[["Grundlegend","Du beschreibst den Börsenkrach und seine Folgen für Deutschland und nennst den Anstieg der NSDAP mit Zahlen."],["Sicher","Du erklärst mit dem Kreislauf der Kredite, warum die Krise Deutschland so hart traf, und verbindest Arbeitslosigkeit und Wahlergebnisse."],["Souverän","Du wägst ab: Was erklärt die Krise, was erklärt sie nicht (Zentrum, November 1932, ältere Belastungen)? Du kommst zu einem begründeten Urteil."]],
  inhalt:[["Die Krise:","Deutschlands Aufschwung hing an amerikanischen Krediten; nach dem Börsenkrach vom Oktober 1929 werden sie zurückgefordert; Betriebe entlassen, Banken gehen bankrott, Millionen werden arbeitslos."],
    ["Die Wahlen:","NSDAP von 2,6 auf 37,3 Prozent (Juli 1932), die KPD wächst; SPD, DNVP und die liberalen Parteien verlieren; das Zentrum bleibt stabil; im November 1932 verliert die NSDAP."],
    ["Urteil:","Tragfähig sind verschiedene Urteile – von „entscheidender Auslöser“ bis „Verstärker älterer Belastungen“. Es zählt: Du belegst mit den Wahlzahlen, nennst mindestens eine Gegenüberlegung (das Zentrum bleibt stabil, die NSDAP verliert im November 1932, Belastungen seit 1918 und 1923) und sagst, was die Zahlen nicht zeigen: die Gründe der einzelnen Wähler*innen."]],
};
L.zf = {
  frage:L.frage,
  kern:"Deutschlands Aufschwung hing an Krediten aus den USA. Nach dem Börsenkrach vom Oktober 1929 werden sie zurückgefordert: Betriebe entlassen, Banken brechen zusammen, Millionen Menschen werden arbeitslos und verelenden. Mit der Not wachsen die Parteien, die die Republik bekämpfen – vor allem die NSDAP.",
  begriffe:[["Weltwirtschaftskrise","weltweite Krise nach dem Börsenkrach in New York im Oktober 1929."],["Börsenkrach","plötzlicher Absturz der Aktienkurse."],["Kredit","geliehenes Geld, das mit Zinsen zurückgezahlt werden muss."],["Reparationen","Zahlungen Deutschlands an die Sieger des Ersten Weltkriegs."],["Massenarbeitslosigkeit","Millionen Menschen ohne Arbeit; fast fünf Millionen, später über sechs."],["Verelendung","Absturz in Hunger, Wohnungsnot und Hoffnungslosigkeit."]],
  abfolge:{ titel:"Von New York nach Deutschland", punkte:[["bis 1929","Kredite aus den USA tragen den deutschen Aufschwung."],["Okt. 1929","Börsenkrach in New York."],["danach","Die Banken fordern ihre Kredite zurück."],["Folge 1","Betriebe entlassen, Banken gehen bankrott, Ersparnisse sind vernichtet."],["Folge 2","Hunger, Mietrückstände, Verelendung."],["Folge 3","Die Gegner der Republik gewinnen Wahlen."]] },
  zahlen:[["Okt. 1929","Börsenkrach in New York"],[kom(wahlAnteil("1928","ns")) + " %","NSDAP im Mai 1928"],[kom(wahlAnteil("1930","ns")) + " %","NSDAP im September 1930"],[kom(wahlAnteil("1932a","ns")) + " %","NSDAP im Juli 1932 – stärkste Partei"]],
  lk:{ name:"Partialität (2.1.5)", satz:"Quellen zeigen immer nur einen Teil der Vergangenheit, und nur ein Teil der Quellen ist überhaupt erhalten.", beispiel:"Erhalten sind die Wahlzahlen von 1928 bis 1932. Warum Menschen so wählten, zeigen sie nicht – Umfragen zum Wahlverhalten gab es nicht." },
  werkzeug:{ titel:"Eine Statistik in drei Schritten auswerten", schritte:["Beschreiben: Was zeigen die Zahlen? Wer steigt, wer fällt, wer bleibt?","Anreichern: Welches Fachwissen erklärt die Entwicklung?","Bewerten: Wie stark ist der Zusammenhang – und was erklärt er nicht?"] },
  sonst:"zwei Stimmungen im Vergleich (Auftrag 1), drei Quellen zum Leben in der Krise (Auftrag 3).",
  mein:[["Meine Bewertung der Politik (1 bis 6)", () => S.pol == null ? "" : `${S.pol} von 6. ${S.polgrund}`], ["Mein Eintrag ins kollektive Gedächtnis", "kg"]],
};
function zusammenfassung(){ return fadenFeld() + zusammen(); }
const SEITE_FN = { start, stimmung, kreislauf, leben, wahlen, landkarte:seiteLk, schreiben:schreibauftrag, zusammenfassung, lehrkraft };
weimarStart();
