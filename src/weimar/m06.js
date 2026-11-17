/* ===== M6 · Die Versailler Friedenskonferenz – Friedensvertrag oder künftige Kriegserklärung? (Heft „Geschichte aktuell 1“, M6, M6.1–M6.3) ===== */
const L = {
  wid:"m06", key:"ggk-w-m06:v1", nr:"M6", titel:"Die Versailler Friedenskonferenz", unter:"Friedensvertrag oder künftige Kriegserklärung?", dauer:105, block:"c",
  /* Zeichen der Stunde: eine Grenze, mit dem Stift gezogen */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><rect x="5" y="6" width="24" height="22" rx="3" fill="none" stroke="#24221F" stroke-width="2.4"/><path d="M8 20c4-6 6 3 10-3s5 1 8-4" fill="none" stroke="#9B402D" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="1 4.5"/></svg>`,
  frage:"Die Sieger wollen einen Frieden, der jeden neuen Krieg verhindert: Lässt sich Europa nach dem „Selbstbestimmungsrecht der Völker“ neu ordnen?",
  deck:{ dauer:"Doppelstunde und Teil der nächsten Stunde · etwa 105 Minuten", jahr:"1919", hier:[2],
    satz:"Das Zarenreich, das deutsche Kaiserreich und Österreich-Ungarn sind Geschichte. In Paris setzen die Siegermächte die Grenzen neu. Was sie dort verabreden, wirkt bis heute.",
    bild:{ datei:"heft-m06-friedenskonferenz.jpg", alt:"Gemälde: Staatsmänner sitzen an einem langen Tisch im Spiegelsaal von Versailles, einer unterschreibt.", text:"Unterzeichnung des Friedensvertrags im Spiegelsaal von Versailles, 28. Juni 1919 (Gemälde).", nachweis:"Bild aus dem Unterrichtsheft, M6. Nachweis offen." },
    ziele:["Wilsons 14 Punkte nennen und erklären, wo in ihnen Streit steckt,", "an Österreich-Ungarn zeigen, warum sich Grenzen nach dem „Selbstbestimmungsrecht der Völker“ schwer ziehen lassen,", "beurteilen, inwieweit das Selbstbestimmungsrecht 1919 verwirklicht wurde – und dein Urteil mit dem des Historikers Ian Kershaw vergleichen."] },
  blatt:[
    { id:"erinnern", nr:"1", kurz:"Erst erinnern", name:"Erst erinnern: Europa im Winter 1918/19", form:"Allein · ohne Heft", min:3, frei:"offen" },
    { id:"wilson", nr:"2", kurz:"14 Punkte", name:"Wilsons 14 Punkte: Wo steckt Streit?", form:"Zu zweit", min:10, frei:"offen" },
    { id:"grenzen", nr:"3", kurz:"Grenzen ziehen", name:"Die neuen Staatsgrenzen: Wie sollen sie aussehen?", form:"Kleingruppe", min:15, frei:"offen" },
    { id:"doku", nr:"4", kurz:"Die Umsetzung", name:"Die Umsetzung des Selbstbestimmungsrechts", form:"Allein · Film", min:40, frei:"ansage", gleich:"Ein Film zeigt, wie die Grenzen wirklich gezogen wurden. Vorher zeichnet ihr eure eigenen." },
    { id:"kershaw", nr:"5", kurz:"Das Urteil Kershaws", name:"Dein Urteil und das Urteil des Historikers", form:"Zu zweit", min:10, frei:"antwort", nach:"doku", fehlt:"Schreib erst dein eigenes Urteil in Auftrag 4." },
    { id:"landkarte", nr:"L", kurz:"Landkarte", name:"Landkarte: Wozu Grenzen von 1919?", form:"Allein", min:5, frei:"antwort", nach:"kershaw", fehlt:"Bearbeite erst Auftrag 5." },
    { id:"schreiben", nr:"6", kurz:"Schreibauftrag", name:"Schreibauftrag", form:"Allein", min:15, frei:"ansage", marke:"wie in der Klassenarbeit", gleich:"Du erklärst und beurteilst das Selbstbestimmungsrecht der Völker." },
    { id:"zusammenfassung", nr:"Z", kurz:"Zusammenfassung", name:"Zusammenfassung", form:"Zum Abheften", min:4, frei:"antwort", nach:"schreiben", fehlt:"Die Zusammenfassung enthält die Auflösung. Sie öffnet sich nach deinem Text in Auftrag 6.", kopf:"Zum Abheften" },
  ],
  breit:["lehrkraft"],
  loesch:"Deine Auswahl, deine gezeichneten Grenzen, deine Urteile, dein Text und dein Satz für den roten Faden werden auf diesem Gerät entfernt.",
  init:() => ({ ab:{}, pkt:[], pgrund:"", gz:[], gzStift:"a", schwer:"", probleme:"", d:{ krit:"", wer:"", urteil:"" }, kh:"", kv:"" }),
  erledigt:{
    erinnern:() => [0,1,2].every(i => (S.ab.auf || {})[i]), wilson:() => S.pkt.length === 5 && lang("pgrund", 20), grenzen:() => lang("schwer") && lang("probleme"),
    doku:() => lang("d.krit") && lang("d.urteil"), kershaw:() => lang("kh") && lang("kv"), landkarte:() => !!S.lk.ok, schreiben:() => schreibFertig(),
  },
  fadenAnf:["Der Frieden von 1919 war schwierig, weil", "Selbstbestimmung für die einen bedeutete für die anderen"],
};
/* Wilsons 14 Punkte, Rede vor dem amerikanischen Kongress am 8. Januar 1918 – eigene Kurzfassung nach der Zusammenfassung im Heft (M1 in M6). */
const PUNKTE = ["Öffentliche Friedensverträge, keine geheimen Absprachen", "Freiheit der Schifffahrt auf den Meeren", "Abbau von Handelsschranken, gleiche Bedingungen im Handel", "Abrüstung: Rüstung nur noch für die innere Sicherheit eines Landes", "Regelung aller kolonialen Ansprüche; die Interessen der betroffenen Völker zählen mit", "Räumung Russlands; Russland entscheidet selbst über seine Entwicklung", "Räumung und Wiederherstellung Belgiens", "Befreiung und Wiederaufbau Frankreichs; Rückgabe von Elsass-Lothringen", "Neue Grenzen Italiens entlang der Nationalitäten", "Die Völker Österreich-Ungarns können sich selbstständig entwickeln", "Rumänien, Serbien und Montenegro werden geräumt; Serbien erhält Zugang zum Meer", "Die türkischen Gebiete des Osmanischen Reichs bleiben selbstständig; die anderen Völker dort entwickeln sich selbstständig", "Ein unabhängiger polnischer Staat mit allen Gebieten, die „unbestreitbar“ polnisch bewohnt sind", "Ein Bund der Nationen (Völkerbund) sichert Unabhängigkeit und Grenzen aller Staaten"];
const FILM6 = "https://www.ardmediathek.de/video/planet-schule/frieden-krieg-der-traeume/swr/Y3JpZDovL3BsYW5ldC1zY2h1bGUuZGUvQVJEXzEwODU3X3ZpZGVv";

function start(){ return deckblatt(); }
function erinnern(){
  return `${auftrag("Allein · 3 Minuten · ohne Heft", "Erst erinnern", "Beantworte aus dem Kopf, ein Stichwort genügt. Dann deckst du auf.")}
  ${abrufen("ab", [
    ["Wann endet der Erste Weltkrieg – und wie?", "Am 11. November 1918 mit dem Waffenstillstand. Die Mittelmächte haben den Krieg verloren."],
    ["Welche drei Reiche gibt es im Winter 1918/19 nicht mehr?", "Das russische Zarenreich, das deutsche Kaiserreich und Österreich-Ungarn."],
    ["Welche Republik setzt sich in Deutschland durch (M5)?", "Die parlamentarische Republik. Am 19. Januar 1919 wird die Nationalversammlung gewählt."],
  ])}`;
}
function wilson(){
  const n = S.pkt.length;
  return `${auftrag("Zu zweit · 10 Minuten", "Wo steckt Streit?", "Der amerikanische Präsident Woodrow Wilson will einen dauerhaften Frieden für die ganze Welt. Im Januar 1918 nennt er dafür 14 Punkte. Wählt fünf Punkte aus, in denen ihr Konfliktpotenzial für einen dauerhaften Frieden seht. Begründet eure Auswahl.")}
  <div class="ab-zwei schmalrechts"><div>
  <div class="w-punkte" role="group" aria-label="Fünf Punkte wählen">${PUNKTE.map((p, i) => `<button type="button" data-akt="punkt" data-w="${i}" aria-pressed="${S.pkt.includes(i)}" ${!S.pkt.includes(i) && n >= 5 ? "disabled" : ""}><b>${i + 1}</b><span>${esc(p)}</span></button>`).join("")}</div>
  <p class="quelle">Eigene Kurzfassung nach der Zusammenfassung im Unterrichtsheft, M6 (M1): Friedensbotschaft des Präsidenten Wilson an den amerikanischen Kongress, 8. Januar 1918.</p>
  </div><aside>
  <p class="hinweis" aria-live="polite"><b>${n} von 5 Punkten gewählt.</b> ${n >= 5 ? "Tippe einen gewählten Punkt an, um ihn wieder freizugeben." : ""}</p>
  ${textfeld("pgrund", "Begründung: Warum gerade diese fünf?", { rows:5, zaehl:false, anfaenge:["Streit entsteht, wenn", "Punkt … widerspricht den Interessen von"] })}
  ${wissen("Andere Sieger, andere Ziele", `<p>Wilsons Konzept standen die Interessen der anderen Siegermächte entgegen: <b>Frankreich</b> wollte Sicherheit und Ausgleich für die Kriegsschäden. <b>Großbritannien</b> wollte seinen Einfluss in den Kolonien und im Nahen Osten sichern. <b>Italien</b> pochte auf die Gebiete, die ihm 1915 für den Kriegseintritt versprochen worden waren.</p><p class="quelle">Nach dem Einführungstext im Unterrichtsheft, M6.</p>`)}
  ${vergleich("pvgl", ["pgrund"], 20, "So lässt sich begründen", `<ul class="w-liste2"><li><b>Punkt 5:</b> Die Kolonialmächte unter den Siegern wollen ihre Kolonien behalten.</li><li><b>Punkte 9 bis 13:</b> Grenzen „entlang der Nationalitäten“ – aber in vielen Gebieten leben mehrere Völker durcheinander.</li><li><b>Punkt 13:</b> Ein polnischer Staat mit Zugang zum Meer geht nur durch Gebiete, in denen auch Deutsche leben.</li><li><b>Punkt 4:</b> Wer rüstet ab – alle oder nur die Besiegten?</li><li><b>Punkt 14:</b> Ein Völkerbund braucht Mitglieder, die sich an seine Beschlüsse halten.</li></ul><p class="hinweis">Andere Auswahlen sind ebenso begründbar.</p>`)}
  </aside></div>`;
}
function grenzen(){
  return `${auftrag("Kleingruppe · 15 Minuten", "Wie sollen die neuen Grenzen aussehen?", "Du bist Hilfskraft der amerikanischen Friedensdelegation in Paris. Deine Aufgabe: Mach nach dem „Selbstbestimmungsrecht der Völker“ einen Vorschlag für das Staatsgebiet des deutschsprachigen Österreich und für Ungarn. Zeichne die Grenzen in die Karte. Besprecht eure Ergebnisse und haltet fest, auf welche Schwierigkeiten ihr stoßt.")}
  <p class="hinweis">${status("", "ausgedachter Fall")} Die Rolle ist erfunden; die Karte zeigt die Völker Österreich-Ungarns vor 1914. Zeichne mit dem Stift oder dem Finger direkt auf die Karte.</p>
  <div class="ab-zwei schmalrechts"><div>
  ${zeichenKarte("gz", { datei:"heft-m06-karte-oesterreich-ungarn.jpg", alt:"Karte von Österreich-Ungarn mit den Siedlungsgebieten der Nationalitäten in verschiedenen Farben: Deutsche, Ungarn, Tschechen, Slowaken, Polen, Ukrainer, Rumänen, Serben, Kroaten, Slowenen, Italiener.", text:"Die Nationalitäten Österreich-Ungarns.", nachweis:"Karte aus dem Unterrichtsheft, M6.1 (Cornelsen/Volkhard Binder).", fehlt:"Die Karte liegt nur im Moodle-Paket. Nimm die Karte im Heft (M6.1) und zeichne dort mit zwei Farben." }, [["a","#9B402D","deutschsprachiges Österreich"],["b","#1E4FB5","Ungarn"]])}
  </div><aside>
  ${textfeld("schwer", "Auf welche Schwierigkeiten stoßt ihr beim Zeichnen?", { rows:4, zaehl:false, anfaenge:["Schwierig ist, dass", "An dieser Stelle leben"] })}
  ${textfeld("probleme", "Welche Probleme könnten aus euren Grenzen entstehen?", { rows:4, zaehl:false, anfaenge:["Innerhalb der neuen Grenzen", "Wer auf der „falschen“ Seite lebt,"] })}
  </aside></div>
  ${vergleich("gzvgl", ["schwer","probleme"], 10, "So wurde 1919/20 entschieden", `${bild({ datei:"heft-m06-karten-1914-1919.jpg", alt:"Zwei Karten nebeneinander: Südost- und Ostmitteleuropa 1914 und nach den Pariser Friedensverträgen mit neuen Staaten.", text:"Südost- und Ostmitteleuropa 1914 und nach den Pariser Friedenskonferenzen.", nachweis:"Karten aus dem Unterrichtsheft, M6.2. Nachweis offen." })}<p>Aus Österreich-Ungarn gehen neue Staaten hervor, darunter Österreich, Ungarn und die Tschechoslowakei; andere Gebiete kommen zu Polen, Rumänien, Italien und zum Königreich der Serben, Kroaten und Slowenen. In fast jedem dieser Staaten leben danach Minderheiten.</p>`)}`;
}
function doku(){
  return `${auftrag("Allein · 40 Minuten (Film und Notizen)", "Wurde das Selbstbestimmungsrecht umgesetzt?", "Sieh dir den Film „Frieden – Krieg der Träume“ an. Achte auf zwei Fragen: Nach welchen Kriterien wurden die neuen Grenzen gezogen? Wer setzte sich durch? Beurteile danach, inwieweit das Selbstbestimmungsrecht der Völker umgesetzt worden ist.")}
  ${filmKarte({ art:"Dokumentation", dauer:"40 Minuten Arbeitszeit mit Notizen", titel:"Frieden – Krieg der Träume", text:"Der Film ist eine Darstellung von heute: Er wählt aus und deutet. Notiere, woran er seine Aussagen festmacht.", nachweis:"SWR / planet schule; Link aus dem Unterrichtsheft, M6.2.", url:FILM6, wo:"der ARD Mediathek" })}
  <div class="ab-zwei gleich"><div>${textfeld("d.krit", "Nach welchen Kriterien wurden die neuen Grenzen gezogen?", { rows:4, zaehl:false })}
  ${textfeld("d.wer", "Wer setzte sich durch?", { rows:3, zaehl:false })}</div>
  <div>${textfeld("d.urteil", "Mein Urteil: Inwieweit wurde das Selbstbestimmungsrecht der Völker umgesetzt?", { rows:6, zaehl:false, anfaenge:["Umgesetzt wurde es dort, wo", "Nicht umgesetzt wurde es, weil", "Insgesamt"] })}</div></div>
  ${vergleich("dvgl", ["d.krit","d.urteil"], 15, "Mit Stichpunkten vergleichen", `<div class="w-karten k2"><article class="w-kk"><h3>Kriterien der Grenzziehung</h3><ul><li><b>Zusammensetzung der Bevölkerung:</b> Grenzen möglichst entlang der Nationalitäten – oft nicht möglich, weil viele Gebiete gemischt waren.</li><li><b>Historische Ansprüche:</b> frühere Grenzen und Zugehörigkeiten.</li><li><b>Strategische Interessen</b> der Siegermächte.</li><li><b>Wirtschaft:</b> Zugang zu Rohstoffen und Häfen.</li></ul></article><article class="w-kk rot"><h3>Wer setzte sich durch?</h3><ul><li>vor allem die <b>Siegermächte</b> Großbritannien, Frankreich und die USA,</li><li>der <b>Völkerbund</b> sollte überwachen, hatte aber wenig Macht,</li><li>in einigen Fällen <b>Bewegungen vor Ort</b>, etwa in den baltischen Staaten.</li></ul></article></div><p class="quelle">Stichpunkte nach dem Erwartungshorizont des Unterrichtsheftes, M6.2; dort ohne Beleg. Prüfe sie am Film.</p>`)}`;
}
function kershaw(){
  return `${auftrag("Zu zweit · 10 Minuten", "Dein Urteil und das Urteil des Historikers", "Stellt eurem Ergebnis die Beurteilung des Historikers Ian Kershaw gegenüber. Formuliert zuerst die Hauptaussage seines Urteils in einem Satz. Vergleicht dann: Wo deckt sich sein Urteil mit eurem, wo geht es darüber hinaus?")}
  <div class="ab-zwei gleich"><div>
  <figure class="w-zitat"><figcaption class="kennung">${status("beleg", "Darstellung, Auszug")} Ian Kershaw, Historiker, 2016</figcaption><blockquote>Den „Großen Vier“ war von Anfang an klar, dass wegen der ethnisch komplexen Zusammensetzung der Regionen Mittel- und Osteuropas nationale Selbstbestimmung nicht zu verwirklichen war.<span class="wer">Ian Kershaw: Höllensturz. Europa 1914–1949. München: DVA 2016, S. 170 f. Die „Großen Vier“: die Regierungschefs der USA, Großbritanniens, Frankreichs und Italiens.</span></blockquote></figure>
  ${bild({ datei:"heft-m06-kershaw.jpg", alt:"Abbildung eines Schulbuchauszugs: Der Historiker Ian Kershaw über die Formulierung des Selbstbestimmungsrechts der Völker im Kontext der Pariser Vorortverträge (2016).", text:"Der ganze Auszug aus dem Heft (M3 in M6.3). Zum Vergrößern mit zwei Fingern aufziehen.", nachweis:"Schulbuchseite aus dem Unterrichtsheft; Text: Ian Kershaw, Höllensturz, 2016." }, { klasse:"hoch" })}
  </div><div>
  ${textfeld("kh", "Hauptaussage Kershaws in einem Satz", { rows:3, zaehl:false, anfaenge:["Kershaw urteilt, dass", "Nach Kershaw war Selbstbestimmung"] })}
  ${textfeld("kv", "Vergleich mit meinem Urteil aus Auftrag 4", { rows:3, zaehl:false, anfaenge:["Wie Kershaw sehe ich, dass", "Kershaw geht weiter, wenn er sagt, dass"] })}
  <div class="karte"><p class="kennung">Dein Urteil aus Auftrag 4</p><p class="mein ${S.d.urteil ? "" : "leer"}">${esc(S.d.urteil || "noch nichts notiert")}</p></div>
  ${vergleich("kvgl", ["kh","kv"], 15, "Mit einer Zusammenfassung vergleichen", `<p>Kershaw sieht ein grundsätzliches Problem: In den meisten Gebieten der zerfallenen Reiche lebten mehrere Nationalitäten, die alle Land, Rohstoffe und einen eigenen Staat beanspruchten. Selbstbestimmung für alle war dort nicht zu verwirklichen. Die Sieger konnten nur hoffen, dass in den neuen Staaten mit der Zeit eine nationale Einheit über die ethnischen Unterschiede hinweg entsteht.</p><p class="quelle">Eigene Zusammenfassung des Auszugs im Heft (Kershaw 2016, S. 170 f.).</p>`)}
  </div></div>`;
}
function seiteLk(){
  return landkarteL({ teil:"wozu", frage:"Die Bestimmungen von 1919 „sollten die Welt bis heute beeinflussen“, heißt es im Heft. Wozu beschäftigen wir uns hundert Jahre später mit Grenzen von 1919?",
    lead:"Denk an die Schwierigkeiten beim Zeichnen in Auftrag 3 und an die Minderheiten in den neuen Staaten. Kennst du Konflikte von heute, in denen um Grenzen und Zugehörigkeit gestritten wird?", platz:"Wir beschäftigen uns damit, weil …",
    urteil:{
      "1-3":["zentral","Wir befragen die Vergangenheit mit heutigen Fragen: Wer verstehen will, warum in Europa und im Nahen Osten bis heute um Grenzen und Zugehörigkeit gestritten wird, findet 1919 einen Teil der Antwort."],
      "1-9":["teils","Die Pariser Verträge ordneten nicht nur Europa neu, sondern auch den Nahen Osten und die Kolonien. Das ist ein Blick über Grenzen hinweg – darum geht es in M7 noch genauer."],
      "1-4":["teils","Man kann aus 1919 lernen, wie schwer Friedensschlüsse sind. Die Landkarte warnt aber: Situationen wiederholen sich nie genau."],
      "1-2":["teils","Wie Gruppen sich abgrenzen und wie Macht gesichert wird, zeigt sich 1919 deutlich. Das ist ein Muster – die Frage zielte aber auf den Bezug zu heute."],
      "1-8":["teils","Selbstbestimmung und Volkssouveränität sind Grundgedanken der Demokratie. Im Mittelpunkt dieser Stunde standen aber die Grenzen und ihre Folgen bis heute."],
    },
    sonst:["kaum","Dieser Grund trifft die Stunde kaum. Lies die Frage noch einmal: Es geht um die Wirkung von 1919 bis in die Gegenwart."],
    bruecke:`<b>Merke:</b> Auch dein Urteil in Auftrag 4 ist ein Urteil im Rückblick. Du weißt, welche Konflikte folgten – die Menschen in Paris wussten es 1919 nicht.` });
}
L.schreib = {
  vor:"So kann die Aufgabe in der Klassenarbeit stehen: Material, zwei Operatoren, höchstens eine Seite. Hier schreibst du eine halbe Seite.",
  aufgabe:`<b>Erklären Sie</b> an einem Beispiel, warum sich das „Selbstbestimmungsrecht der Völker“ nach dem Ersten Weltkrieg schwer umsetzen ließ, und <b>beurteilen Sie</b>, inwieweit es 1919/20 verwirklicht wurde.`,
  material:`<p><b>M1 · Aus Wilsons 14 Punkten (8. Januar 1918):</b> 10. Die Völker Österreich-Ungarns können sich selbstständig entwickeln. · 13. Ein unabhängiger polnischer Staat mit allen Gebieten, die „unbestreitbar“ polnisch bewohnt sind.</p><p><b>M2 · Der Historiker Ian Kershaw (2016):</b> „Den ‚Großen Vier‘ war von Anfang an klar, dass wegen der ethnisch komplexen Zusammensetzung der Regionen Mittel- und Osteuropas nationale Selbstbestimmung nicht zu verwirklichen war.“</p><p class="quelle">M1: eigene Kurzfassung. M2: Ian Kershaw, Höllensturz. Europa 1914–1949, München 2016, S. 170 f.</p>`,
  woerter:140, min:60,
  stufen:[["Grundlegend","Du erklärst, was Selbstbestimmungsrecht meint, und nennst ein Gebiet, in dem es Streit gab."],["Sicher","Du erklärst am Beispiel, warum Grenzen entlang der Nationalitäten kaum zu ziehen waren, und nennst, wer sich bei der Grenzziehung durchsetzte."],["Souverän","Du wägst ab: Wo wurde das Recht umgesetzt (neue Staaten), wo nicht (Minderheiten, Interessen der Sieger)? Du stützt dein Urteil auf M1 und M2."]],
  inhalt:[["Begriff:","Völker sollen selbst bestimmen, zu welchem Staat sie gehören."],
    ["Schwierigkeit:","In Mittel- und Osteuropa lebten viele Nationalitäten gemischt (Beispiel Österreich-Ungarn); jede Grenze schuf neue Minderheiten."],
    ["Umsetzung:","neue Staaten wie Polen, die Tschechoslowakei, Österreich, Ungarn; aber Grenzziehung auch nach strategischen und wirtschaftlichen Interessen der Sieger."],
    ["Urteil:","nur teilweise verwirklicht; Kershaw: den „Großen Vier“ war das von Anfang an klar; Folge: neue Spannungen."]],
};
L.zf = {
  frage:L.frage,
  kern:"Die Sieger wollten 1919 einen dauerhaften Frieden auf der Grundlage von Wilsons 14 Punkten. Das „Selbstbestimmungsrecht der Völker“ ließ sich aber nur teilweise verwirklichen: Wo viele Nationalitäten gemischt lebten, schuf jede Grenze neue Minderheiten – und die Interessen der Sieger hatten Vorrang.",
  begriffe:[["Wilsons 14 Punkte","Friedensprogramm des amerikanischen Präsidenten vom Januar 1918."],["Selbstbestimmungsrecht der Völker","Völker sollen selbst bestimmen, zu welchem Staat sie gehören."],["Pariser Vorortverträge","die Friedensverträge der Sieger mit den Besiegten 1919/20, darunter der Versailler Vertrag."],["Siegermächte","vor allem Frankreich, Großbritannien, die USA und Italien."],["Minderheit","Gruppe, die in einem Staat lebt, dessen Mehrheit eine andere Sprache oder Herkunft hat."],["Völkerbund","Bund der Staaten, der ab 1920 den Frieden sichern sollte."]],
  abfolge:{ titel:"Vom Friedensprogramm zum Vertrag", punkte:[["8. Jan. 1918","Wilson nennt vor dem amerikanischen Kongress seine 14 Punkte."],["11. Nov. 1918","Waffenstillstand; das Zarenreich, das Kaiserreich und Österreich-Ungarn bestehen nicht mehr."],["1919","Friedenskonferenz in Paris: Die Sieger verhandeln untereinander, mit verschiedenen Zielen."],["28. Juni 1919","Unterzeichnung des Versailler Vertrags."],["1919/20","Neue Staaten und neue Grenzen in Mittel- und Osteuropa; in fast allen leben Minderheiten."]] },
  lk:{ name:"Wozu Geschichte? Verständnis der Gegenwart", satz:"Wir befragen die Vergangenheit mit unseren heutigen Fragen, und ihre Antworten helfen uns, unsere Gegenwart zu verstehen.", beispiel:"Wer verstehen will, warum bis heute um Grenzen und Zugehörigkeit gestritten wird, findet in den Entscheidungen von 1919 einen Teil der Antwort." },
  werkzeug:{ titel:"Ein Urteil mit dem Urteil der Forschung vergleichen", schritte:["Erst selbst urteilen – mit Kriterien (hier: Wurde das Selbstbestimmungsrecht umgesetzt?).","Die Hauptaussage der Historikerin oder des Historikers in einem Satz fassen.","Vergleichen: Wo deckt sich das Urteil mit meinem, wo geht es weiter, worauf stützt es sich?"] },
  sonst:"eigene Grenzen für Österreich und Ungarn (Auftrag 3), der Film „Frieden – Krieg der Träume“ (Auftrag 4).",
  mein:[["Mein Urteil zur Umsetzung des Selbstbestimmungsrechts", "d.urteil"], ["Kershaws Hauptaussage in meinen Worten", "kh"]],
};
function zusammenfassung(){ return fadenFeld() + zusammen(); }
AKTION.punkt = t => { const i = +t.dataset.w, a = S.pkt.slice(), k = a.indexOf(i); if (k >= 0) a.splice(k, 1); else if (a.length < 5) a.push(i); setz("pkt", a); zeichneBehalte(); };
const SEITE_FN = { start, erinnern, wilson, grenzen, doku, kershaw, landkarte:seiteLk, schreiben:schreibauftrag, zusammenfassung, lehrkraft };
weimarStart();
