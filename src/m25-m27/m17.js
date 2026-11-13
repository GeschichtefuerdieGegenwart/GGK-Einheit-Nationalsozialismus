/* ===== M17 · Mein Leben in der NS-Diktatur I (Heft „Geschichte aktuell 1“, M17) ===== */
/* Jede Figur hat ihre eigenen Antworten: Wer die Figur wechselt, schreibt nicht in die Texte der anderen. */
const leer = () => ({ s1:{ sehen:"", denkt:"", d14:{ a:false, b:false, c:false }, d14zu:false, nach:"" }, s2:{ pro:"", contra:"", tun:"", nach:"", extra:"" }, s3:{ folgen:"", foto:false, bild:"" }, s4:{ tun:"", nach:"" },
  raum:{ 1:null, 2:null, 3:null, 4:null }, raum2:{ 1:"", 2:"", 3:"", 4:"" }, j39:"", agency:null, agrund:"", tausch:"", zurueck:"" });
const L = {
  key:"ggk-m17-leben:v1", nr:"M17", titel:"Mein Leben in der NS-Diktatur I", unter:"Ausgrenzung 1933–1939 aus zwei Blickwinkeln",
  /* Zeichen der Stunde: eine Linie, die sich teilt */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><path d="M3 17h10l8-8h10" fill="none" stroke="#24221F" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 17l8 8h10" fill="none" stroke="#9B402D" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  seiten:[["start","",""],["rolle","0–10 Min.","Erinnern und Rolle"],["weg","10–56 Min.","Vier Stationen"],["bilanz","56–66 Min.","1939: Spielraum"],["tausch","66–72 Min.","Zwei Leben"],["landkarte","72–78 Min.","Landkarte"],["plenum","78–90 Min.","Plenum"],["zusammenfassung","Zum Abheften","Zusammenfassung"]],
  breit:["rolle","weg","bilanz","tausch","zusammenfassung","lehrkraft"],
  loesch:"Rolle, alle Texte, Entscheidungen, Spielraum-Werte und deine Stimme werden auf diesem Gerät entfernt.",
  init:() => ({ rolle:null, ab1:"", ab2:"", ab3:"", st:1, w:leer(), j:leer() }),
  nachEingabe(p){ if (/\.raum2\./.test(p)) { const b = document.getElementById("raumbild"); if (b) b.outerHTML = raumBild(true); } },
  nachWahl(id){ if (/^boykott/.test(id)) { const e = document.getElementById("nach-boykott"); if (e && !ruhig()) neu(e, "neu"); } },
};
/* Was M16 auf diesem Gerät gespeichert hat (nur lesen) */
const M16 = (() => { try { return JSON.parse(localStorage.getItem("ggk-m16-mensch:v1")) || null; } catch(e) { return null; } })();
const M16STIMME = { A:"Ja, das ist möglich", B:"Nein, das ist nicht möglich", C:"Kommt darauf an" };

const ROLLE = {
  w:{ name:"Werner", kurz:"W", gilt:"gilt den Nationalsozialisten als „arisch“",
    karte:"Werner arbeitet als Beamter im Rathaus von Herrenberg. Er ist 40 Jahre alt, seit über zehn Jahren mit Maria verheiratet und hat zwei Söhne: Wilhelm (8) und Fritz (5). Seine Familie lebt seit Generationen in Herrenberg und sieht sich als deutsch. Sein Vater kämpfte im Ersten Weltkrieg als Soldat bei Verdun. Werner ist nicht gläubig. Dass Deutschland nach dem Ersten Weltkrieg Gebiete verlor, empfindet er als Schmach, den Versailler Vertrag als Schande. Die Unruhen der letzten Jahre sollen endlich ein Ende finden.",
    info:[["Viele fühlen sich angezogen", "Dass sich viele Deutsche von der NSDAP angezogen fühlen, liegt nicht nur am Parteiprogramm. Die Partei strahlt Kraft und Dynamik aus. Außerdem sind die Naziführer jung, anders als die grauhaarigen Politiker der etablierten Parteien. Und Hitlers Image eines starken Führers spricht die Fantasie an. Viele sehen in ihm jemanden, der das Volk vereinen und die politischen Auseinandersetzungen beenden wird. […]", "Anne Frank Haus: „Deutschland 1933: Von der Demokratie zur Diktatur“ (annefrank.org), nach dem Unterrichtsheft M17. Gekürzt."],
      ["Ein Schüler erinnert sich an 1933", "„Nach diesem Tag veränderte sich fast schlagartig das gesamte Leben in Deutschland. Auch wir Kinder in der Schule wurden davon betroffen […]. Es gab zwar einige [Lehrer], die sehr bedrückt wirkten, aber die anderen, und das war die Mehrheit im Kollegium, befanden sich in einer überschäumenden Jubelstimmung. […] Jetzt würde man uns eine andere Gesinnung beibringen, jetzt würde Schluß sein mit dem sozialistischen Gedankengut, jetzt würde eine nationale Erziehung in den Schulen Einzug halten, jetzt nach der Machtergreifung.“", "Werner Mork (*1921): Erinnerung an die Machtübernahme 1933. LeMO Zeitzeugen (Deutsches Historisches Museum), nach dem Unterrichtsheft M17. Gekürzt; Ergänzung in eckigen Klammern. Dieser Zeitzeuge war 1933 Schüler. Er ist nicht die Figur Werner dieser Stunde."]] },
  j:{ name:"Willi", kurz:"J", gilt:"gilt den Nationalsozialisten als „nichtarisch“",
    karte:"Willi arbeitet als Beamter im Rathaus von Herrenberg. Er ist 34 Jahre alt, seit über sieben Jahren mit Else verheiratet und hat zwei Kinder: Jona (5) und Rahel (4). Seine Familie lebt seit Generationen in Herrenberg und sieht sich als deutsch. Sein Vater kämpfte im Ersten Weltkrieg als Soldat bei Verdun. Sein Großvater war Jude und sehr gläubig; Willi selbst ist nicht gläubig. Dass die Nationalsozialisten jetzt an der Macht sind, gefällt ihm nicht. Er sieht aber kein Anzeichen, dass sie länger regieren als die Regierungen davor. Er hofft, dass sie scheitern.",
    info:[["Jüdische Deutsche vor 1933", "Für die Juden in Deutschland war die Zeit der Weimarer Republik voller Paradoxa. […] [Die] Republik [verwirklichte] zum ersten Mal in der Praxis das Prinzip der Gleichberechtigung der Juden […]. Auf der anderen Seite waren die Zeichen der Krise vor allem im Erstarken des Antisemitismus erkennbar, der zu dieser Zeit brutaler wurde als je zuvor. […] Am Vorabend des Aufstiegs der nationalsozialistischen Partei an die Macht lebten in Deutschland etwa 500.000 Juden, weniger als ein Prozent (0,8 %) der Gesamtbevölkerung. Trotz aller Schwierigkeiten betrachteten sich die meisten als loyale Patrioten, als mit der deutschen Lebensweise durch ihre Sprache und Kultur verbunden. In breiten Kreisen der jüdischen Öffentlichkeit hielt sich der Glaube, dass, aufgrund ihrer Funktion im Handel und in der Industrie und dank ihres Beitrags zur deutschen Wirtschaft, die Nationalsozialisten vor ihrer totalen Verdrängung zurückschrecken würden.", "Yad Vashem: „Die Weimarer Republik“ (yadvashem.org), nach dem Unterrichtsheft M17. Gekürzt; Ergänzungen in eckigen Klammern."]] },
};
const RK = () => S.rolle || "w", R = () => ROLLE[RK()], N = () => R().name, Z = () => S[RK()], P = p => RK() + "." + p;
const NW = "LeMO (Deutsches Historisches Museum): „Ausgrenzung und Verfolgung“, nach dem Unterrichtsheft M17. Gekürzt; Auslassungen […].";
const ft = (titel, text) => `<div class="fachtext"><p class="kennung">${status("beleg", "Fachtext")} ${esc(titel)}</p><p>${text}</p><p class="quelle">${NW}</p></div>`;
const FT = {
  1:"Die erste Welle staatlichen Terrors gegen Juden setzte im Frühjahr 1933 ein. Ende März begann unter großem Propagandaaufwand die Vorbereitung einer Boykottaktion gegen jüdische Geschäfte, Warenhäuser, Anwaltskanzleien und Arztpraxen. […] Angehörige der Sturmabteilung (SA) und der Schutzstaffel (SS) hinderten Passanten unter Androhung von Gewalt und Repressalien am Betreten jüdischer Geschäfte. […] So drückten zum Beispiel in Annaberg/Sachsen SS-Angehörige den Kunden jüdischer Geschäfte einen Stempel mit der Inschrift „Wir Verräter kauften bei Juden“ ins Gesicht. Da der Boykott jedoch die von den Nationalsozialisten gewünschte Wirkung nicht erzielte, […] wurde der Boykott [am Abend des 1. April] „ausgesetzt“ und drei Tage später für beendet erklärt. Scharfe Reaktionen aus dem Ausland bis hin zu Boykottdrohungen deutscher Waren ließen negative Konsequenzen für die Wirtschaft und das Ansehen des NS-Regimes befürchten. Zudem reagierte die deutsche Bevölkerung zumeist nur sehr reserviert auf den nationalsozialistischen Boykottaufruf. Besonders in katholischen Bevölkerungskreisen war es zu zahlreichen Gesten der Solidarität aus Mitleid und Betroffenheit gekommen. Allerdings zogen es viele Bürger für die Zukunft vor, ihre Waren in eigens ausgewiesenen „Deutschen Geschäften“ zu kaufen.",
  "2a":"Zwei Monate nach der nationalsozialistischen Machtübernahme verabschiedete die Reichsregierung am 7. April 1933 das „Gesetz zur Wiederherstellung des Berufsbeamtentums“. […] Der in diesem Gesetz erstmals ausformulierte „Arierparagraph“ (Paragraph 3) verbot die Beschäftigung von „Nichtariern“ im öffentlichen Dienst, die in den sofortigen Ruhestand zu versetzen waren. […] Als „nichtarisch“ galt, wer einen jüdischen Eltern- oder Großelternteil besaß.",
  "2b":"Von dem „Gesetz zur Wiederherstellung des Berufsbeamtentums“ vorerst ausgenommen waren jüdische Frontkämpfer des Ersten Weltkriegs und ihre Angehörigen sowie vor dem 1. August 1914 Verbeamtete. Mit Verabschiedung der Nürnberger Gesetze im September 1935 entfiel diese Ausnahme. Der […] „Arierparagraph“ verdrängte jüdische Bürger aus allen beruflichen und gesellschaftlichen Bereichen. Auf Druck der NSDAP übernahmen 1933 nahezu sämtliche Organisationen, Verbände und berufsständischen Vereinigungen den „Arierparagraph“. […] Mit Gründung der Reichskulturkammer im September 1933 wurden Juden aus der Presse sowie aus künstlerischen und freien Berufen ausgeschlossen.",
  3:"Am 15. September [1935] wurden das „Reichsbürgergesetz“ und das „Gesetz zum Schutze des deutschen Blutes und der deutschen Ehre“ verabschiedet. Beide „Nürnberger Gesetze“ stempelten die jüdischen Mitbürger zu Menschen minderen Rechts. Im Gegensatz zu den mit vollen Rechten versehenen „Reichsbürgern“, die „deutschen oder artverwandten Blutes“ sein mussten, konnten Juden fortan nur noch „Staatsangehörige“ des Deutschen Reichs ohne politische Rechte sein. „Volljude“ war, wer von mindestens drei jüdischen Großeltern abstammte. Als Bürger minderen Rechts galten auch „Mischlinge“ mit einem oder zwei jüdischen Großeltern, die der jüdischen Religionsgemeinschaft angehörten oder mit einem „Volljuden“ verheiratet waren. Alle anderen „jüdischen Mischlinge“ erhielten das „vorläufige Reichsbürgerrecht“. Das „Blutschutzgesetz“ verbot Eheschließungen zwischen Nichtjuden und Juden und stellte auch deren als „Rassenschande“ bewerteten Geschlechtsverkehr unter Strafe. […] Wer nicht den Diskriminierungen der „Nürnberger Gesetze“ zum Opfer fallen wollte, musste einen Ariernachweis erbringen.",
  4:"In der Nacht vom 9. zum 10. November 1938 brannten Synagogen und weitere jüdische Einrichtungen im gesamten Deutschen Reich. Menschen wurden getötet, gedemütigt, verhaftet, misshandelt […], Geschäfte und Wohnungen demoliert und zerstört. […] [Die] Weisung zu dem Pogrom [war] von München ausgegangen, wo sich die Führung der NSDAP […] versammelt hatte […]. Als Vorwand des von ihnen als angeblich spontanen Akt des „Volkszorns“ deklarierten Terrors nutzten die Nationalsozialisten den Tod des Legationssekretärs an der deutschen Botschaft in Paris, Ernst vom Rath. […] Beteiligt waren nicht nur Organisationen und Gliederungen der NSDAP, sondern auch Schulklassen, „einfache“ Nachbarn, Männer und Frauen. Eine Mehrheit der Bevölkerung stand dem Pogrom und vor allem den Zerstörungen ablehnend gegenüber, nicht alle beteiligten sich aktiv, aber auch nur wenige halfen ihren jüdischen Nachbarn.",
};
const BILD = {
  boykott:{ datei:"m17-heft-boykott-1933.jpg", alt:"Schwarz-Weiß-Foto: Ein Mann in Uniform klebt ein Plakat mit altertümlicher Druckschrift an ein Schaufenster. Ein zweiter Mann in Uniform mit Armbinde steht daneben. Links schauen zwei Passantinnen zu.", text:"Vor einem Geschäft, laut Heft am 1. April 1933. Ort und Fotograf*in nennt das Heft nicht.", nachweis:"Wiedergabe nach dem Unterrichtsheft, M17. Nachweis noch offen (prüfen)." },
  pranger:{ datei:"m17-heft-pranger-cuxhaven-1933.jpg", alt:"Schwarz-Weiß-Foto: Eine Frau und ein Mann stehen auf der Straße, jede*r mit einem großen Schild vor dem Körper. Hinter ihnen steht eine Reihe Männer in Uniform. Die Texte auf den Schildern verhöhnen die beiden als Paar.", text:"Cuxhaven, 27. Juli 1933: SA- und SS-Männer führen eine nichtjüdische Frau und einen jüdischen Mann öffentlich vor und lassen sich mit ihnen fotografieren. Ein Täterfoto: Es sollte demütigen und abschrecken.", nachweis:"Foto: Keystone / Getty Images (Angabe nach Google Arts & Culture, abgerufen am 12.11.2026). Wiedergabe nach dem Unterrichtsheft, M17; dort ohne Datum bei 1935 eingeordnet." },
};
const ST = [[1,"1. April 1933","Boykott","1.4.1933"],[2,"7. April 1933","Entlassung","7.4.1933"],[3,"15. Sept. 1935","Nürnberger Gesetze","15.9.1935"],[4,"9./10. Nov. 1938","Novemberpogrom","9.11.1938"]];
const RAUMWORT = { 1:"kein Spielraum", 2:"wenig", 3:"mittel", 4:"viel", 5:"sehr viel Spielraum" };
const D14 = [["a","… vor ihren Geschäften warten, die Leute abhalten und angreifen, wenn sie dort einkaufen wollen.", true, "Steht im Text: SA und SS hinderten Passant*innen „unter Androhung von Gewalt und Repressalien“ am Betreten. In Annaberg drückten SS-Angehörige Kund*innen einen Stempel ins Gesicht."],
  ["b","… indem die Prügeltruppe der Nazis (SA) Juden mit Knüppeln bis zum Tode prügelt.", false, "Steht in diesem Text nicht. Der Text nennt Drohungen, Repressalien und Demütigungen. Ob es an diesem Tag Tote gab, kannst du mit diesem Text nicht belegen."],
  ["c","… indem sie den Juden Geld geben, damit diese auswandern.", false, "Steht nicht im Text. Es wäre auch keine Drohung."]];
const GRUPPE = {
  w:[["„Reichsbürger“ mit vollen Rechten","zentral","Der Text nennt die Bedingung: „deutschen oder artverwandten Blutes“. Werner muss das mit einem Ariernachweis belegen."],
     ["„Staatsangehöriger“ ohne politische Rechte","kaum","So stuft das Gesetz Menschen ein, die es als Juden zählt – ab drei jüdischen Großeltern. Auf Werner trifft das nach dem Text nicht zu."],
     ["„Mischling“ mit vorläufigem Reichsbürgerrecht","kaum","Dafür zählt das Gesetz jüdische Großeltern. In Werners Rollenkarte steht keiner."]],
  j:[["„Reichsbürger“ mit vollen Rechten","kaum","Volle Rechte sollten nur Menschen „deutschen oder artverwandten Blutes“ haben. Willis Großvater war Jude – das Gesetz zählt ihn mit."],
     ["„Staatsangehöriger“ ohne politische Rechte","begruendbar","Das Gesetz zählt Großeltern: „Volljude“ ist, wer mindestens drei jüdische Großeltern hat. Willi hat einen. Zu den „Bürgern minderen Rechts“ gehört er nur, wenn er der jüdischen Religionsgemeinschaft angehört oder mit einem „Volljuden“ verheiratet ist. Er ist nicht gläubig; über Else sagt die Rollenkarte nichts."],
     ["„Mischling“ mit vorläufigem Reichsbürgerrecht","zentral","Ein jüdischer Großvater, selbst nicht gläubig: Nach dem Text erhält Willi das „vorläufige Reichsbürgerrecht“. Seine Stelle hat er trotzdem schon 1933 verloren. Merke: Nicht Willi entscheidet, wer er ist. Das Gesetz zählt seine Großeltern."]],
};
const raumZeile = n => { const v = Z().raum[n]; return `<div class="raumwahl"><p><b>Wie groß ist ${N()}s Spielraum an dieser Station?</b> <span class="hinweis">Deine Einschätzung, kein Messwert.</span></p><div class="woerter" role="group" aria-label="Spielraum von 1 bis 5">${[1,2,3,4,5].map(k => `<button type="button" data-akt="raum" data-n="${n}" data-w="${k}" aria-pressed="${v === k}"><b>${k}</b> ${RAUMWORT[k]}</button>`).join("")}</div></div>`; };
const stationFuss = n => `${raumZeile(n)}<div class="fuss"><span class="hinweis">Dein Stand wird nur auf diesem Gerät gespeichert.</span>${n < 4 ? `<button class="btn primary" data-akt="station" data-w="${n + 1}">Nächste Station: ${ST[n][1]} ›</button>` : `<button class="btn primary" data-geh="bilanz">Weiter: 1939 ›</button>`}</div>`;

/* Spielraum-Linie: eigene Werte (durchgezogen), Werte der Partnerin oder des Partners (gestrichelt) */
function raumBild(mitPartner){
  const X = [46, 128, 210, 292], y = v => 118 - (v - 1) * 24, e = [1,2,3,4].map(n => Z().raum[n]), p = [1,2,3,4].map(n => +Z().raum2[n] || null);
  const linie = (w, cls) => { const pt = w.map((v, i) => v ? `${X[i]},${y(v)}` : null).filter(Boolean); return (pt.length > 1 ? `<polyline class="${cls}" points="${pt.join(" ")}"/>` : "") + w.map((v, i) => v ? `<circle class="${cls}" cx="${X[i]}" cy="${y(v)}" r="5"/>` : "").join(""); };
  const wort = w => w.map((v, i) => `${ST[i][3]}: ${v || "–"}`).join(" · ");
  const andere = S.rolle === "w" ? "Willi" : "Werner";
  return `<figure class="raumbild" id="raumbild"><svg viewBox="0 0 320 150" role="img" aria-label="Spielraum von ${N()} an vier Stationen. ${wort(e)}${mitPartner ? `. ${andere}: ${wort(p)}` : ""}">
  ${[1,2,3,4,5].map(k => `<line class="gitter" x1="30" x2="306" y1="${y(k)}" y2="${y(k)}"/><text class="achse" x="22" y="${y(k) + 4}" text-anchor="end">${k}</text>`).join("")}
  ${ST.map((s, i) => `<text class="achse" x="${X[i]}" y="142" text-anchor="middle">${s[3]}</text>`).join("")}
  ${mitPartner ? linie(p, "partner") : ""}${linie(e, "eigen")}</svg>
  <figcaption><span class="leg eigen"></span>${N()} (dein Gerät): ${wort(e)}${mitPartner ? `<br><span class="leg partner"></span>${andere} (Partner*in): ${wort(p)}` : ""}<br><span class="hinweis">1 = kein Spielraum, 5 = sehr viel Spielraum. Einschätzungen, keine Messwerte.</span></figcaption></figure>`;
}

/* ---------- Seiten ---------- */
function start(){
  return `${band("M17 · Doppelstunde · 90 Minuten", "Mein Leben in der NS-Diktatur I", "Vier Ereignisse zwischen 1933 und 1938. Zwei Menschen. Dieselben Tage – und zwei ganz verschiedene Leben.")}
  <p class="leitfrage">Wie viel Spielraum hatten Menschen in Deutschland zwischen 1933 und 1939 – und wovon hing er ab?</p>
  ${belastend("In dieser Stunde geht es um Ausgrenzung, Entrechtung und Gewalt gegen jüdische Deutsche. Ein Foto zeigt eine öffentliche Demütigung; es erscheint nur, wenn du es selbst öffnest. Du darfst jederzeit aussetzen und mit deiner Lehrkraft sprechen.")}
  <div class="trift" style="margin-top:0"><b>So arbeiten wir mit den Rollen.</b> Werner und Willi sind ${status("modell", "ausgedachte Fälle")} Sie stützen sich auf Forschung, aber es gab sie nicht. Du begleitest eine der beiden Figuren und schreibst über sie – du musst nicht sie sein. Verstehen heißt nicht billigen: Erst sammelst du, was die Figur damals denken und tun konnte. Am Ende beurteilst du.</div>
  <h2 class="abschnitt">Am Ende kannst du</h2>
  <ul class="ziele"><li>vier Schritte der Ausgrenzung zwischen 1933 und 1938 nennen und einordnen,</li><li>an zwei Lebensläufen zeigen, wie verschieden dieselben Ereignisse wirkten,</li><li>mit dem Begriff „Agency“ begründen, wie viel Spielraum ein Mensch hatte.</li></ul>
  <h2 class="abschnitt">So läuft die Stunde</h2>
  <ol class="ablauf">${L.seiten.slice(1, 7).map(s => `<li><b>${esc(s[1])}</b><span>${esc(s[2])}</span></li>`).join("")}</ol>
  ${weiter("rolle", "Beginnen")}`;
}

function rolle(){
  const r = S.rolle ? R() : null;
  const m16 = M16 && M16.top && M16.top.length ? `Auf diesem Gerät steht aus M16: ${esc(M16.top.join(", "))}.` : "Sieh auf deiner Zusammenfassung von M16 nach.";
  return `${zeitKopf("rolle")}<h1>Erinnern und Rolle</h1>
  ${auftrag("Allein · 3 Minuten · ohne Heft", "Erst erinnern", "Beantworte die drei Fragen aus dem Kopf. Ein Stichwort reicht. Danach deckst du auf.")}
  <div class="felder3">${eingabe("ab1", "1. An welchem Tag wurde Hitler Reichskanzler?")}${eingabe("ab2", "2. Nenne zwei Merkmale des Humanismus (M16).")}${eingabe("ab3", "3. Welcher Wert war dir in M16 am wichtigsten?")}</div>
  ${vergleich("ab", ["ab1","ab2","ab3"], 2, "Aufdecken", `<p><b>1.</b> Am 30. Januar 1933.</p><p><b>2.</b> Fünf Merkmale: Achtung vor der Würde jedes Menschen · Bildung, kritisches Denken, Selbsterkenntnis · Toleranz, Solidarität, Empathie · Ablehnung von Fanatismus, Machtmissbrauch, Unterdrückung · Vertrauen in die Verantwortung des Menschen.</p><p><b>3.</b> ${m16}</p>`)}
  <h2 class="abschnitt">Deine Figur</h2>
  ${auftrag("Allein · 6 Minuten", "Lesen", "Deine Lehrkraft teilt die Figuren zu. Tippe deine an. Lies die Rollenkarte und den Hintergrund. Beide Figuren arbeiten im selben Rathaus.")}
  <div class="rollenwahl" role="group" aria-label="Figur wählen">${["w","j"].map(k => `<button type="button" data-akt="setz" data-p="rolle" data-w="${k}" aria-pressed="${S.rolle === k}"><b>${ROLLE[k].name}</b><span>${ROLLE[k].gilt}</span></button>`).join("")}</div>
  ${r ? `<div class="qwerk"><div class="karte rollenkarte"><p class="kennung">${status("modell", "ausgedachter Fall")} Rollenkarte</p><h3>${r.name}</h3><p>${esc(r.karte)}</p></div>
  <div>${r.info.map(i => `<div class="fachtext"><p class="kennung">${status("beleg", "Hintergrund")} ${esc(i[0])}</p><p>${esc(i[1])}</p><p class="quelle">${esc(i[2])}</p></div>`).join("")}</div></div>
  <p class="hinweis" style="margin-top:.8rem">Die Nationalsozialisten teilten Menschen in „arisch“ und „nichtarisch“ ein. Das ist ihre Sprache, nicht unsere. Werner und Willi sind beide Deutsche.</p>` : `<p class="hinweis">Erst die Figur wählen.</p>`}
  <div class="fuss"><span class="hinweis">Dein Stand wird nur auf diesem Gerät gespeichert.</span><button class="btn primary" data-geh="weg" ${r ? "" : "disabled"}>Weiter: Vier Stationen ›</button></div>`;
}

function station1(){
  const s = Z().s1, zu = !!(S.wahl["boykott-" + RK()] || {}).zu;
  const teil2 = zu ? `<div id="nach-boykott">${ft("1. April 1933: der Boykott", FT[1])}
  ${auftrag("Aufgabe 1.4 · allein · 3 Minuten", "Am Text prüfen", "Die Nationalsozialisten bedrohen die Juden, indem sie … Tippe nur die Aussagen an, die im Fachtext stehen. Dann prüfe.")}
  <div class="optionen" role="group" aria-label="Aussagen übernehmen">${D14.map(d => `<button type="button" data-akt="d14" data-k="${d[0]}" aria-pressed="${!!s.d14[d[0]]}" ${s.d14zu ? "disabled" : ""}>${esc(d[1])}</button>`).join("")}</div>
  <div class="reihe"><button type="button" class="btn dunkel" data-akt="d14fest" ${s.d14zu ? "disabled" : ""}>Prüfen</button>${s.d14zu ? `<button type="button" class="btn" data-akt="d14neu">Noch einmal</button>` : ""}</div>
  <div aria-live="polite">${s.d14zu ? D14.map(d => { const gew = !!s.d14[d[0]], ok = gew === d[2]; return `<div class="rm ${ok ? "zentral" : "teils"}"><b>${gew ? "Übernommen" : "Nicht übernommen"} – ${ok ? "passt zum Text." : "sieh noch einmal in den Text."}</b> ${esc(d[3])}</div>`; }).join("") : ""}</div>
  ${textfeld(P("s1.nach"), "Zurück zu deiner These: Was stimmt daran, was überrascht dich?", { rows:2, anfaenge:["Meine These stimmt zum Teil, weil","Überrascht hat mich","Für " + N() + " heißt das"], zaehl:false })}
  ${stationFuss(1)}</div>` : `<p class="hinweis">Nach dem Festlegen erscheint der Fachtext. Dann prüfst du deine These.</p>`;
  return `<p class="lead">Am 30. Januar 1933 wird Adolf Hitler zum Reichskanzler ernannt. Die Nationalsozialisten machen sich daran, die demokratische Verfassung der Weimarer Republik zu zerstören. Als Erstes versuchen sie, ihre politischen Gegner auszuschalten.</p>
  <p><b>1. April 1933.</b> ${N()} geht mit einem Freund und einer Freundin die Straße hinunter. Heute ist etwas anders: Männer mit dem Hakenkreuz am Arm bekleben ein Geschäft mit Plakaten.</p>
  <div class="qwerk"><div>${foto(BILD.boykott, { klein:true, gruppe:"boykott" })}<p class="hinweis" data-bildhinweis="boykott" hidden>Das Foto fehlt in dieser Fassung. Du findest es im Heft, M17, beim Fachtext.</p>
  ${hilfe("Lesehilfe: die Schrift auf dem Plakat", "<p>Die Schrift heißt Fraktur. Auf dem großen Plakat steht: „Deutsche! Wehrt Euch! Kauft nicht bei Juden!“</p>")}</div>
  <div>${auftrag("Aufgabe 1.1 und 1.2 · allein · 5 Minuten", "Sehen, dann denken", "Beschreibe zuerst nur, was du siehst und was auf dem Plakat steht. Dann überlege: Was geht " + N() + " bei diesem Anblick durch den Kopf?")}
  ${textfeld(P("s1.sehen"), "1.1 Was siehst du? Was steht auf dem Plakat?", { rows:2, platz:"Ich sehe …", zaehl:false })}
  ${textfeld(P("s1.denkt"), "1.2 Gedanken und Gefühle von " + N(), { rows:3, anfaenge:[N() + " denkt wahrscheinlich", N() + " fürchtet", N() + " hofft"], zaehl:false })}</div></div>
  ${auftrag("Aufgabe 1.3 · allein · 2 Minuten", "Erst festlegen", "Entscheide dich für eine These – aus der Sicht des 1. April 1933. Begründe in einem Satz. Die Auflösung kommt aus dem Fachtext.")}
  ${gWahl("boykott-" + RK(), "Werden die Nationalsozialisten mit ihrem Aufruf zum Boykott Erfolg haben?", [["Die Menschen werden weiterhin dort einkaufen.","begruendbar","Dafür spricht im Fachtext: Die Bevölkerung reagierte „zumeist nur sehr reserviert“, es gab Gesten der Solidarität, der Boykott wurde am Abend ausgesetzt. Dagegen: Viele kauften künftig lieber in „Deutschen Geschäften“."],["Die Menschen trauen sich nicht an den Männern vorbei, die am Eingang stehen.","begruendbar","Dafür spricht im Fachtext: SA und SS hinderten Passant*innen „unter Androhung von Gewalt“ am Betreten. Dagegen: Der Boykott erzielte die gewünschte Wirkung nicht und wurde nach einem Tag ausgesetzt."]], { platz:"Ich glaube das, weil …" })}
  ${teil2}`;
}

function station2(){
  const w = S.rolle === "w";
  const aufgabe = w ? `${auftrag("Aufgabe 2 · allein · 6 Minuten", "Gehorchen oder widersetzen?", "Die Entlassungen beginnen. Werner bekommt den Auftrag, seinem Kollegen Willi die Entlassung mitzuteilen. Ergänze beide Satzanfänge mit je einer Begründung, die Werner 1933 haben konnte. Du sammelst Gründe – du musst sie nicht gut finden.")}
  <div class="felder2">${textfeld(P("s2.pro"), "Werner sollte gehorchen und seinen Kollegen entlassen, weil …", { rows:3, zaehl:false })}${textfeld(P("s2.contra"), "Werner sollte sich widersetzen und seinen Kollegen nicht entlassen, weil …", { rows:3, zaehl:false })}</div>`
  : `${auftrag("Aufgabe 2 · allein · 6 Minuten", "Was jetzt?", "Willi wird entlassen, weil sein Großvater Jude war. Eine andere Stelle als Beamter bekommt er nicht. Er muss seine Familie weiter versorgen und die Miete bezahlen. Was tut er jetzt? Schreib zwei Sätze.")}
  ${textfeld(P("s2.tun"), "Willis Überlegungen", { rows:3, anfaenge:["Willi versucht zuerst","Wenn das nicht geht,","Schwierig ist für ihn"], zaehl:false })}`;
  const bed = w ? [P("s2.pro"), P("s2.contra")] : [P("s2.tun")];
  return `<p><b>7. April 1933.</b> Eine Woche nach dem Boykott tritt ein neues Gesetz in Kraft. Es betrifft das Rathaus, in dem Werner und Willi arbeiten.</p>
  ${ft("Das Gesetz", FT["2a"])}
  ${aufgabe}
  ${vergleich("s2-" + RK(), bed, 15, "Mit dem Fachtext abgleichen", `${ft("Was folgte", FT["2b"])}<p>${w ? "Der Text nennt die Folgen für die Entlassenen. Über Beamte wie Werner sagt er nichts. Was folgt daraus für deine beiden Begründungen – und was kannst du mit diesem Text nicht wissen?" : "Welche Wege, die du dir für Willi überlegt hast, waren damit versperrt? Welche blieben?"}</p>`)}
  ${textfeld(P("s2.nach"), "Was ändert der Fachtext an deiner Einschätzung?", { rows:2, zaehl:false })}
  ${hilfe("Für Schnelle: die Ausnahme", `<p>Im Fachtext steht eine Ausnahme für „Frontkämpfer“ und ihre Angehörigen. Willis Vater war Soldat bei Verdun. Prüfe am Text: Hätte die Ausnahme Willi 1933 schützen können? Was müsstest du dafür noch wissen?</p>${textfeld(P("s2.extra"), "Meine Prüfung", { rows:2, zaehl:false })}`)}
  ${stationFuss(2)}`;
}

function station3(){
  const s = Z().s3, id = "gruppe-" + RK();
  const fotoTeil = s.foto ? `<div class="bilder">${foto(BILD.pranger, { klein:true, gruppe:"pranger" })}</div><p class="hinweis" data-bildhinweis="pranger" hidden>Das Foto fehlt in dieser Fassung. Du findest es im Heft, M17, auf der Seite mit der Zeitleiste. Deine Lehrkraft kann es am Beamer zeigen.</p>
    <div class="reihe nodruck"><button type="button" class="btn" data-akt="setz" data-p="${P("s3.foto")}" data-w="false">Foto ausblenden</button></div>`
    : `<div class="reihe"><button type="button" class="btn dunkel" data-akt="setz" data-p="${P("s3.foto")}" data-w="true">Foto zeigen</button><span class="hinweis">Du kannst die Aufgabe auch mit der Beschreibung bearbeiten: SA- und SS-Männer haben eine Frau und einen Mann mit Schildern auf die Straße gestellt und posieren hinter ihnen.</span></div>`;
  return `<p><b>15. September 1935.</b> Auf dem Reichsparteitag in Nürnberg lässt Hitler zwei Gesetze beschließen. Sie legen fest, wer künftig welche Rechte hat.</p>
  <p class="hinweis">Die Wörter in Anführungszeichen sind die Sprache der Täter. Wir benutzen sie nur, um die Gesetze zu untersuchen.</p>
  ${ft("Die Nürnberger Gesetze", FT[3])}
  ${auftrag("Aufgabe 3.1 · allein · 6 Minuten", "Welche Einteilung macht das Gesetz?", "Lies den Fachtext genau. Ordne " + N() + " mit der Rollenkarte ein und begründe in einem Satz. Dann leite ab, was das für sein Leben bedeutet.")}
  ${hilfe("Rollenkarte noch einmal lesen", `<p>${esc(R().karte)}</p>`)}
  ${gWahl(id, "In welche Gruppe ordnet das Gesetz " + N() + " ein?", GRUPPE[RK()], { platz:"Im Text steht dazu …" })}
  ${textfeld(P("s3.folgen"), "Folgen für " + N() + "s Leben", { rows:3, anfaenge:[N() + " darf jetzt nicht mehr", N() + " muss jetzt", "Für seine Familie heißt das"], zaehl:false })}
  <h2 class="abschnitt">Rückblick: schon im Juli 1933</h2>
  <p>Was das Gesetz 1935 unter Strafe stellt, wurde schon vorher öffentlich angeprangert – ohne Gesetz. Das Foto entstand am 27. Juli 1933 in Cuxhaven, zwei Jahre vor den Nürnberger Gesetzen.</p>
  ${belastend("Das Foto zeigt, wie zwei Menschen öffentlich gedemütigt werden. Es wurde von den Tätern gewollt. Du entscheidest, ob du es öffnest.")}
  ${fotoTeil}
  ${auftrag("Aufgabe 3.2 · allein · 4 Minuten", "Ein Täterfoto lesen", "Geh in drei Schritten vor: Sehen – Fragen – Deuten. Wer steht wo? Wer wollte dieses Bild? Was soll es bei denen bewirken, die es sehen – und was bedeutet es für " + N() + "?")}
  ${textfeld(P("s3.bild"), "Mein Befund", { rows:3, anfaenge:["Ich sehe","Die Männer in Uniform wollen zeigen","Wer das Bild 1933 sieht, soll","Für " + N() + " bedeutet es"], zaehl:false })}
  ${stationFuss(3)}`;
}

function station4(){
  const w = S.rolle === "w";
  return `<p><b>9. November 1938, abends.</b> ${N()} geht gerade nach Hause, als er Rauch aufsteigen sieht. Er ahnt, welches Gebäude brennt. Als er ankommt, stehen Nationalsozialisten um die brennende Synagoge.</p>
  ${auftrag("Aufgabe 4 · allein · 4 Minuten", "Und dann?", "Was tut " + N() + " in den nächsten Tagen? Schreib zwei Sätze – aus dem, was er an diesem Abend wissen kann.")}
  ${textfeld(P("s4.tun"), N() + " in den nächsten Tagen", { rows:3, anfaenge:[N() + " geht am nächsten Morgen", N() + " spricht mit", N() + " beschließt"], zaehl:false })}
  ${vergleich("s4-" + RK(), [P("s4.tun")], 15, "Mit dem Fachtext abgleichen", `${belastend("Der Text nennt Gewalt und Tod.")}${ft("Das Novemberpogrom", FT[4])}<p>${w ? "Der Text nennt drei Arten, sich zu verhalten: sich beteiligen, ablehnen und nichts tun, helfen. Wo steht Werner in deinen zwei Sätzen?" : "Der Text sagt: „nur wenige halfen ihren jüdischen Nachbarn“. Was bedeutet das für Willis Pläne?"}</p>`)}
  ${textfeld(P("s4.nach"), w ? "Werners Verhalten einordnen" : "Was der Text für Willi bedeutet", { rows:2, zaehl:false })}
  ${stationFuss(4)}`;
}

function weg(){
  const n = Math.min(4, Math.max(1, +S.st || 1));
  if (!S.rolle) return `${zeitKopf("weg")}<h1>Vier Stationen</h1><p>Wähle zuerst deine Figur.</p>${weiter("rolle", "Zur Rollenwahl")}`;
  return `${zeitKopf("weg")}<h1>Vier Stationen mit ${N()}</h1>
  <p class="hinweis">Etwa 11 Minuten je Station. An jeder Station: Lage – deine Antwort – Abgleich mit dem Fachtext – Spielraum einschätzen. Alles bleibt in diesem Fenster.</p>
  <div class="strahl" id="strahl" role="tablist" aria-label="Zeitleiste 1933 bis 1938" tabindex="-1">${ST.map(s => `<button type="button" role="tab" aria-selected="${n === s[0]}" data-akt="station" data-w="${s[0]}"><b>${s[1]}</b><span>${s[2]}${Z().raum[s[0]] ? " · ✓" : ""}</span></button>`).join("")}</div>
  <div class="stationsfeld" role="tabpanel" aria-label="${ST[n - 1][1]}: ${ST[n - 1][2]}">${[station1, station2, station3, station4][n - 1]()}</div>`;
}

function bilanz(){
  const offen = [1,2,3,4].filter(n => !Z().raum[n]).length;
  return `${zeitKopf("bilanz")}<h1>1939: Rückblick und Spielraum</h1>
  ${auftrag("Aufgabe 5 · allein · 4 Minuten", "Es ist 1939", N() + " hat die letzten sechs Jahre in Deutschland erlebt. Wie war sein Leben in dieser Zeit? Welche Pläne hat er? Wie, denkt er, geht es weiter?")}
  ${textfeld(P("j39"), N() + " im Jahr 1939", { rows:4, anfaenge:["In den letzten sechs Jahren hat " + N(), "Für die Zukunft plant er", "Er rechnet damit, dass"], ziel:"Ziel: etwa 50 Wörter" })}
  ${vergleich("j39-" + RK(), [P("j39")], 40, "Was " + N() + " 1939 nicht wissen kann", `<p>Der Fachtext schreibt über 1935: „Doch kaum jemand ahnte 1935, dass diese infamen Gesetze noch längst nicht der Höhepunkt des nationalsozialistischen Rassenwahns waren.“ Am 1. September 1939 beginnt mit dem deutschen Überfall auf Polen der Zweite Weltkrieg.</p><p>Du weißt das. ${N()} weiß es nicht. Prüfe deinen Text: Wo hast du ihm Wissen von heute gegeben?</p>`)}
  <h2 class="abschnitt">Die Agency unserer Figuren</h2>
  <div class="karte"><p class="kennung">Begriff</p><p><b>Agency</b> ist immer sozial eingebettet. Sie hängt von individuellen Fähigkeiten, aber auch von gesellschaftlichen Strukturen, Machtverhältnissen und Identitäten ab. Das Agency-Konzept steht im Spannungsfeld zwischen individueller Freiheit und gesellschaftlicher Struktur. Es fragt, wie viel Spielraum Menschen innerhalb historischer Zwänge tatsächlich hatten und wie sie diesen nutzten.</p></div>
  <div class="qwerk"><div>${raumBild(false)}${offen ? `<p class="hinweis">An ${offen} ${offen === 1 ? "Station fehlt" : "Stationen fehlt"} noch deine Einschätzung. <button type="button" class="btn" data-geh="weg">Zu den Stationen</button></p>` : ""}</div>
  <div>${auftrag("Allein · 4 Minuten", "Bewerte den Spielraum insgesamt", "Sieh dir deine Linie an. Bewerte den Spielraum von " + N() + " zwischen 1933 und 1939 mit einer Zahl von 1 bis 5 und begründe.")}
  <div class="woerter" role="group" aria-label="Spielraum insgesamt">${[1,2,3,4,5].map(k => `<button type="button" data-akt="agency" data-w="${k}" aria-pressed="${Z().agency === k}"><b>${k}</b> ${RAUMWORT[k]}</button>`).join("")}</div>
  ${textfeld(P("agrund"), "Begründung", { rows:3, anfaenge:["Am größten war der Spielraum, als","Am kleinsten war er, als","Bestimmt wurde er vor allem durch"], zaehl:false })}</div></div>
  ${weiter("tausch", "Weiter: Zwei Leben")}`;
}

function tausch(){
  const andere = S.rolle === "w" ? "Willi" : "Werner";
  const zeilen = [["1. April 1933","geht an dem beklebten Geschäft vorbei","geht an dem beklebten Geschäft vorbei"],["7. April 1933","soll seinem Kollegen die Entlassung mitteilen","wird entlassen"],["15. Sept. 1935","wird als „Reichsbürger“ eingeordnet und braucht einen Ariernachweis","wird nach seinen Großeltern eingeordnet"],["9./10. Nov. 1938","steht vor der brennenden Synagoge","steht vor der brennenden Synagoge"]];
  return `${zeitKopf("tausch")}<h1>Zwei Leben</h1>
  ${auftrag("Zu zweit · 6 Minuten · Werner trifft Willi", "Legt die Geräte nebeneinander", "Setzt euch mit jemandem zusammen, der die andere Figur begleitet hat. Tragt die vier Werte eurer Partnerin oder eures Partners ein. Dann seht ihr beide Linien in einem Bild.")}
  <div class="matrix-wrap"><table><thead><tr><th>Tag</th><th>Werner</th><th>Willi</th><th>Spielraum von ${andere} (1–5)</th></tr></thead><tbody>${zeilen.map((z, i) => `<tr><td><b>${z[0]}</b></td><td>${z[1]}</td><td>${z[2]}</td><td><label class="sr" for="r2-${i + 1}">Spielraum von ${andere} am ${z[0]}</label><select id="r2-${i + 1}" data-f="${P("raum2." + (i + 1))}"><option value="">–</option>${[1,2,3,4,5].map(k => `<option value="${k}" ${+Z().raum2[i + 1] === k ? "selected" : ""}>${k} · ${RAUMWORT[k]}</option>`).join("")}</select></td></tr>`).join("")}</tbody></table></div>
  ${raumBild(true)}
  ${textfeld(P("tausch"), "Derselbe Tag, zwei Leben: Wo unterscheiden sich eure Linien am stärksten – und warum?", { rows:3, anfaenge:["Am stärksten unterscheiden sich die Linien","Das liegt daran, dass","Gemeinsam ist beiden"], zaehl:false })}
  ${weiter("landkarte", "Weiter: Landkarte")}`;
}

const LKCFG = { seite:"landkarte", titel:"Derselbe Tag, zwei Leben", nach:["plenum","Weiter: Plenum"],
  frage:"Werner und Willi stehen vor demselben Geschäft, demselben Gesetz, derselben brennenden Synagoge – und erleben etwas ganz anderes. Warum?",
  lead:"Schreib einen Satz: Warum erleben die beiden dieselben Ereignisse so verschieden?", platz:"Sie erleben es verschieden, weil …",
  folge:["Multiperspektivität (Folgerung)", "Ein Ereignis wird aus Quellen verschiedener Beteiligter betrachtet (z. B. Täter*innen, Opfer, Zuschauende)."],
  urteil:{
    "2-1-1":["teils","Retrospektivität betrifft hier dich: Du weißt, was nach 1939 kam. Werner und Willi wissen es nicht. Darauf hast du bei „1939“ geachtet. Die Frage hier ist aber, warum die beiden einander so verschieden erleben."],
    "2-1-2":["zentral","Jede Sichtweise ist geprägt von Überzeugungen, Interessen und Erfahrungen. Werner hofft 1933 auf Ruhe und Ordnung; ihn treffen die Gesetze nicht. Willi verliert seine Stelle und wird nach seinen Großeltern eingeordnet. Dieselben Tage – zwei Erfahrungen."],
    "2-1-3":["teils","Zwei ausgedachte Lebensläufe und vier Tage sind nur ein Ausschnitt. Es fehlen zum Beispiel Frauen, Kinder, politisch Verfolgte, Menschen, die halfen, und Menschen, die mitmachten. Das begrenzt, was du verallgemeinern darfst – erklärt aber nicht den Unterschied zwischen den beiden."],
    "2-1-4":["teils","Für die Stunde wurden vier Ereignisse ausgewählt, andere nicht. Das ist Selektivität. Sie erklärt, was du siehst – nicht, warum Werner und Willi es verschieden erleben."],
    "2-1-5":["kaum","Partialität betrifft Quellen: Sie zeigen nur einen Teil, und nur ein Teil ist erhalten. Werner und Willi sind keine Quellen, sondern ausgedachte Fälle."],
    "2-1-6":["kaum","Narrativität betrifft die Form der Erzählung. Hier unterscheiden sich nicht zwei Erzählweisen, sondern zwei Lagen im Leben."],
    "2-1-7":["teils","Die beiden Lebensläufe sind aus Forschung zusammengesetzt – also konstruiert. Das ist wichtig, um die Rollen nicht mit Quellen zu verwechseln. Der Unterschied zwischen den Figuren liegt aber in ihrer Sichtweise."],
    "2-1-8":["teils","Das Heft nennt deinen Weg einen „standortgebundenen Ausschnitt“. Die Landkarte meint mit Standortgebundenheit vor allem die, die Geschichte erzählen – also auch dich heute. Für die Figuren selbst passt Perspektivität genauer."],
    "2-1-9":["teils","Die Stunde betrachtet Ereignisse aus zwei Blickwinkeln. Aber: Multiperspektivität im Sinn der Landkarte braucht Quellen verschiedener Beteiligter. Werner und Willi sind ausgedacht. Eine Quelle hast du gelesen: den Schüler von 1933."],
  },
  bruecke:"<b>Merke:</b> Perspektivität heißt nicht, dass alle Sichtweisen gleich viel wert sind. Sie hilft zu erklären, warum Menschen so handelten. Beurteilen musst du trotzdem." };

function plenum(){
  const karten = [1,2,3,4,5].map(k => [String(k)]);
  const alt = M16 ? `<p>In M16 hast du auf die Frage „Ist es möglich, seine Menschlichkeit zu verlieren?“ geantwortet: <b>${esc(M16STIMME[M16.stimme] || "noch offen")}</b>${M16.wo ? ` – „${esc(M16.wo)}“` : "."}${M16.top && M16.top.length ? ` Deine drei Werte: <b>${esc(M16.top.join(", "))}</b>.` : ""}</p>` : `<p>In M16 hast du die Frage beantwortet: „Ist es möglich, seine Menschlichkeit zu verlieren?“ Sieh auf deiner Zusammenfassung nach, was du gewählt hast und welche drei Werte dir wichtig sind.</p>`;
  return `${zeitKopf("plenum")}<h1>Plenum</h1>
  ${auftrag("Plenum · 7 Minuten · iPad hochhalten", "Wie viel Spielraum?", "Zeig deine Zahl groß. Auf Ansage halten erst alle hoch, die Werner begleitet haben, dann alle mit Willi. Je zwei Stimmen begründen. An der Tafel entstehen zwei Spalten: Was bestimmte den Spielraum von Werner, was den von Willi?")}
  <div class="stimmwahl" role="group" aria-label="Spielraum insgesamt">${karten.map(o => `<button type="button" data-akt="agency" data-w="${o[0]}" aria-pressed="${String(Z().agency) === o[0]}"><b>${o[0]}</b>${esc(RAUMWORT[o[0]])}</button>`).join("")}</div>
  <div class="reihe nodruck"><button type="button" class="btn dunkel" data-akt="agencykarte" ${Z().agency ? "" : "disabled"}>Stimmkarte groß zeigen</button><span class="hinweis">Die Lehrkraft zählt. Es wird nichts übertragen. Zwei Geräte – einmal Werner, einmal Willi – können ihre Linien am Beamer zeigen.</span></div>
  <p class="hinweis" style="margin-top:.8rem">Gesprächsregel: Erst sagen, was im Text steht, dann bewerten. Niemand muss von der eigenen Familie erzählen.</p>
  <h2 class="abschnitt">Zurück zu M16</h2>
  ${alt}
  ${textfeld(P("zurueck"), "Was denkst du jetzt? Welcher deiner Werte wäre zwischen 1933 und 1938 unter Druck geraten?", { rows:3, anfaenge:["Unter Druck geraten wäre","Ich bleibe bei meiner Antwort, weil","Ich sehe es jetzt anders, weil"], zaehl:false })}
  <p class="merksatz">iPad umdrehen. Danach: Zusammenfassung sichern.</p>
  ${weiter("zusammenfassung", "Zur Zusammenfassung")}`;
}

function zusammenfassung(){
  const m = (t, leer = "noch offen") => `<p class="mein ${String(t || "").trim() ? "" : "leer"}">${esc(String(t || "").trim() || leer)}</p>`;
  const w = S.rolle === "w", lkp = S.lk.ok && S.lk.prinzip ? ((PRINZIP[S.lk.prinzip] || LKCFG.folge)[0] + ": " + S.lk.grund) : "";
  const wahl = (id, opt) => { const st = S.wahl[id] || {}; return st.zu ? `${opt[st.o][0]} – ${st.grund}` : ""; };
  return `<div class="zf"><div class="reihe nodruck" style="margin:0 0 1rem"><button type="button" class="btn dunkel" data-drucken>Drucken oder als PDF sichern</button><span class="hinweis">Zwei Seiten A4. In GoodNotes ablegen.</span></div>
  <h1>M17 · Mein Leben in der NS-Diktatur I</h1>
  <p class="leitfrage">Wie viel Spielraum hatten Menschen in Deutschland zwischen 1933 und 1939 – und wovon hing er ab?</p>
  <p class="merksatz">Zwischen 1933 und 1938 wurden jüdische Deutsche Schritt für Schritt ausgegrenzt, entrechtet und verfolgt. Wie viel Spielraum ein Mensch hatte, hing davon ab, wo ihn die Nationalsozialisten einordneten – und was er aus seinem Spielraum machte.</p>
  <h2>Begriffe</h2>
  <div class="begriffe">
    <div><b>Boykott:</b> Aufruf, bei jemandem nicht zu kaufen. Am 1. April 1933 hindern SA und SS Menschen daran, jüdische Geschäfte zu betreten.</div>
    <div><b>„Arierparagraph“:</b> Bestimmung im Gesetz vom 7. April 1933. Wer einen jüdischen Eltern- oder Großelternteil hat, wird aus dem öffentlichen Dienst entlassen.</div>
    <div><b>Nürnberger Gesetze:</b> Gesetze vom 15. September 1935. Sie machen jüdische Deutsche zu Menschen minderen Rechts und verbieten Ehen zwischen Juden und Nichtjuden.</div>
    <div><b>Novemberpogrom:</b> In der Nacht vom 9. zum 10. November 1938 brennen im ganzen Reich Synagogen. Menschen werden getötet, verhaftet, misshandelt.</div>
    <div><b>Agency:</b> der Spielraum, den ein Mensch innerhalb der Zwänge seiner Zeit hat – und wie er ihn nutzt.</div>
    <div><b>Perspektivität:</b> Jede Sichtweise ist geprägt von Überzeugungen, Interessen und Erfahrungen.</div>
  </div>
  <h2>1933 bis 1939</h2>
  <ul class="zl"><li><b>30. Jan. 1933</b><span>Hitler wird Reichskanzler.</span></li><li><b>1. April 1933</b><span>Boykott jüdischer Geschäfte, Kanzleien und Praxen; nach einem Tag ausgesetzt.</span></li><li><b>7. April 1933</b><span>„Gesetz zur Wiederherstellung des Berufsbeamtentums“ mit dem „Arierparagraphen“.</span></li><li><b>15. Sept. 1935</b><span>Nürnberger Gesetze.</span></li><li><b>9./10. Nov. 1938</b><span>Novemberpogrom.</span></li><li><b>1. Sept. 1939</b><span>Überfall auf Polen: Der Zweite Weltkrieg beginnt.</span></li></ul>
  <div class="werk"><b>Denkwerkzeug: Drei Fragen zur Agency.</b> 1. Was konnte die Person tun? 2. Was hätte es sie gekostet? 3. Wer oder was bestimmte den Spielraum – Gesetze, Gewalt, andere Menschen?</div>
  <div class="werk" style="background:var(--kuli-hi)"><b>Sprache der Täter.</b> Wörter wie „arisch“, „Mischling“ oder „Rassenschande“ stehen in Anführungszeichen. Sie sagen, wie die Nationalsozialisten Menschen einteilten – nicht, wer diese Menschen waren.</div>

  <div class="seitenumbruch"><h2 style="margin-top:0">Meine Ergebnisse${S.rolle ? " · begleitet: " + N() + " (ausgedachter Fall)" : ""}</h2>
  <h2>1. April 1933: Boykott</h2>${m(Z().s1.denkt)}${m(wahl("boykott-" + RK(), [["These 1: Die Menschen kaufen weiter dort ein"],["These 2: Die Menschen trauen sich nicht vorbei"]]))}${m(Z().s1.nach)}
  <h2>7. April 1933: Entlassung</h2>${w ? m(Z().s2.pro ? "Gehorchen, weil " + Z().s2.pro : "") + m(Z().s2.contra ? "Widersetzen, weil " + Z().s2.contra : "") : m(Z().s2.tun)}${m(Z().s2.nach)}
  <h2>15. September 1935: Nürnberger Gesetze</h2>${m(wahl("gruppe-" + RK(), GRUPPE[RK()]))}${m(Z().s3.folgen)}${m(Z().s3.bild)}
  <h2>9./10. November 1938: Pogrom</h2>${m(Z().s4.tun)}${m(Z().s4.nach)}
  <h2>1939 und der Spielraum</h2>${m(Z().j39)}${raumBild([1,2,3,4].some(n => Z().raum2[n]))}${m(Z().agency ? `Spielraum insgesamt: ${Z().agency} (${RAUMWORT[Z().agency]}). ${Z().agrund}` : "")}${m(Z().tausch)}
  <h2>Landkarte und Rückblick auf M16</h2>${m(lkp)}${m(Z().zurueck)}</div></div>
  ${weiter("start", "Zur Startseite")}`;
}

/* Für Lehrkräfte: Der Text liegt verschlüsselt in lk/ (Klartext nicht im Repository). Anzeige und Schloss: src/lk-schloss.js. */

AKTION.station = t => { S.st = +t.dataset.w; speichere(); zeichne(false); const e = document.getElementById("strahl"); if (e) { e.scrollIntoView({ block:"start" }); const a = e.querySelector("[aria-selected=true]"); if (a) a.focus({ preventScroll:true }); } };
AKTION.raum = t => { setz(P("raum." + t.dataset.n), +t.dataset.w); zeichneBehalte(); };
AKTION.agency = t => { setz(P("agency"), +t.dataset.w); zeichneBehalte(); };
AKTION.agencykarte = () => { if (Z().agency) tafel(`<div class="buchstabe">${Z().agency}</div><div class="wort">${esc(N())} · ${esc(RAUMWORT[Z().agency])}</div>`, { titel:"Spielraum von " + N() }); };
AKTION.d14 = t => { if (Z().s1.d14zu) return; setz(P("s1.d14." + t.dataset.k), !Z().s1.d14[t.dataset.k]); t.setAttribute("aria-pressed", String(Z().s1.d14[t.dataset.k])); };
AKTION.d14fest = (t, ev) => { setz(P("s1.d14zu"), true); zeichneBehalte(); };
AKTION.d14neu = () => { Z().s1.d14 = { a:false, b:false, c:false }; Z().s1.d14zu = false; speichere(); zeichneBehalte(); };
const SEITE_FN = { start, rolle, weg, bilanz, tausch, landkarte:() => landkarte(LKCFG), plenum, zusammenfassung, lehrkraft };
kernStart();
