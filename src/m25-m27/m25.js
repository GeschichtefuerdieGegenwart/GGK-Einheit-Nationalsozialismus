/* ===== M25 · Leben in Ruinen und der Umgang mit Schuld ===== */
const L = {
  key:"ggk-m25-ruinen:v1", nr:"M25", titel:"Leben in Ruinen und der Umgang mit Schuld", unter:"Kriegsende 1945",
  /* Zeichen der Stunde: ein offenes Tor */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><path d="M5 30V8h24v22" fill="none" stroke="#24221F" stroke-width="2.4" stroke-linejoin="round"/><path d="M12 30V14l10-3v19" fill="none" stroke="#9B402D" stroke-width="2.4" stroke-linejoin="round"/><path d="M3 30h28" stroke="#24221F" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  seiten:[["start","",""],["kriegsende","0–20 Min.","Der Krieg ist vorbei"],["ruinen","20–30 Min.","Überleben in Ruinen"],["verbrechen","30–50 Min.","Im Angesicht des Verbrechens"],["verantwortung","50–72 Min.","Verantwortung"],["landkarte","72–80 Min.","Landkarte"],["plenum","80–90 Min.","Plenum"],["zusammenfassung","Zum Abheften","Zusammenfassung"]],
  breit:["kriegsende","ruinen","verbrechen","verantwortung","zusammenfassung","lehrkraft"],
  loesch:"Erste Antwort, Markierungen, alle Texte, Wörter, Urteil und Stimme werden auf diesem Gerät entfernt.",
  init:() => ({ vor:{ wahl:null, satz:"", zu:false }, q12:"q1", b1:"", b2:"", schwur:"", fotos:false, wort:[], woran:"", wortzu:false, deutung:"", satzwahl:null, satz:"", ab:null, urteilA:"", urteilB:"", pos:{ wert:50 }, stimme:null, nach:"" }),
  nachEingabe(p){ if (p === "vor.satz") { const b = document.querySelector("[data-akt=vorfest]"); if (b) b.disabled = !(S.vor.wahl && S.vor.satz.trim().length >= 8); } if (p === "woran") { const b = document.querySelector("[data-akt=wortfest]"); if (b) b.disabled = !(S.wort.length >= 3 && S.woran.trim().length >= 10); } if (p === "pos.wert") { const w = document.getElementById("poswert"); if (w) w.textContent = posWort(S.pos.wert); } },
  nachMark(){ const z = document.getElementById("markstand"); if (z) z.textContent = markStand(); },
};

const VOR = [["a","ein Tag der Befreiung"],["b","ein Tag der Niederlage"],["c","beides zugleich"],["d","je nach Person etwas anderes"]];
const QUELLEN = {
  q1:{ kurz:"Q1", titel:"Quelle 1 · Befreiung des Lagers Dachau", kopf:"Der niederländische Journalist Nico Rost war Häftling im Konzentrationslager Dachau. In seinem Tagebuch beschreibt er den Tag der Befreiung durch die US-Armee, den 29. April 1945.",
    stifte:[["a","▲","Befreiung, Erleichterung"],["b","●","Bedrohung, Angst, Gewalt"]],
    abs:[[null,["Es war genau 5.28 Uhr – nach der Uhr der Kommandantur – als sich das große Tor öffnete.","Das Schießen hatte aufgehört und alles rannte über den Appellplatz zum Tor.","Die SS-Männer im Torgebäude und in den Wachttürmen wurden von den Amerikanern heruntergeholt und niedergeknallt. […]","Vorsichtig betraten die ersten Amerikaner unser Lager – ihre Maschinenpistolen schußbereit – […]: „Hallo boys, here we are!“","Nun gab es kein Halten mehr.","In einem einzigen, brüllenden, jubelnden, langanhaltenden Schrei entlud sich die aufgespeicherte Spannung der letzten Stunden, und Tausende stürzten auf die Amerikaner zu: lachend, weinend, rufend. […]"]],
         [null,["Viele Kranke waren durch den Schock gestorben, andere wollten und konnten es einfach nicht glauben […].","[Ein Amerikaner kommt in die Krankenstube.] Alle wollten sie ihm danken; jeder ihm die Hand drücken; aus allen Betten streckten sich ihm magere Arme und zitternde Hände entgegen […].","Dann legte er kurz entschlossen seine Maschinenpistole auf den Tisch und ging von Bett zu Bett, um jeden einzelnen der Kranken zu umarmen. […]","Der Franzose im zweiten Bett rechts war gerade fünf Minuten vorher gestorben, aber der Amerikaner umarmte auch ihn, entdeckte dann plötzlich, daß der Franzose tot war und schüttelte – all das noch nicht begreifend erschrocken den Kopf."]]],
    nachweis:"Nico Rost: Goethe in Dachau. Frankfurt 1983, S. 244–245. Gekürzt; Auslassungen […]; Ergänzung in eckigen Klammern. Schreibweise wie im Original." },
  q2:{ kurz:"Q2", titel:"Quelle 2 · Tagebuch einer 20-Jährigen", kopf:"Eine 20-jährige Frau aus Aichach in Bayern schreibt Tagebuch. Sie arbeitet in einem Amt. Ihren Namen kennen wir nicht.",
    stifte:[["a","▲","Befreiung, Erleichterung"],["b","●","Bedrohung, Angst, Gewalt"]],
    abs:[["24.4.",["Ganz kopflos und aufgescheucht laufen die Leute alle herum […].","Zwischendurch kommen wieder Tiefflieger, die Leute laufen auseinander, suchen Deckung. […]","Ganz Aichach räumt fleißig auf mit allem Nazi-Kram.","Im Amt nahmen wir das Hitlerbild von der Wand.","Der HJ-Bann machte im Hof gestern ein offenes Feuer und verbrannte Akten usw. […]"]],
         ["27.4.",["Kein Mensch will mehr arbeiten. […] Alles ist nervös und aufgeregt.","Aichach soll verteidigt werden. Alle Brücken sind bereit zum Sprengen.","Marie traf ich mittags. Wir verabschiedeten uns, weil wir uns vielleicht nicht mehr wiedersehen.","Mein Gott, ist das eine Zeit. Im Grunde eigentlich sehr interessant, wenn man sie überlebt. […]"]],
         ["28.4.",["Alles schimpfte über die Nazis, alle wollten sofort weiße Tücher hissen. […]","Nun ist es aus, nun ist Friede, unser schönes Bayernland ist gerettet!","Am liebsten wären sie sich alle um den Hals gefallen.","Ich dachte nur immer: Jetzt wird's interessant. Und es wurde interessant."]]],
    nachweis:"Aus: Erich Kuby (Hrsg.): Das Ende des Schreckens. Dokumente des Untergangs Januar bis Mai 1945. München 1955, S. 131–132. Gekürzt; Auslassungen […]. „HJ-Bann“: Dienststelle der Hitlerjugend im Kreis." },
  q3:{ kurz:"M3", titel:"Quelle M3 · Berlin, Mai 1945", kopf:"Die Journalistin Marta Hillers, 34 Jahre alt, schreibt in Berlin Tagebuch. Das Buch erschien zuerst ohne ihren Namen („Anonyma“).",
    stifte:[["a","▲","Problem"],["b","●","Ressource: Was hilft?"]],
    abs:[["9.5.",["Beim Holzsuchen betrat ich zum ersten Mal seit zwei Wochen den Rasenplatz vorm Kino, auf dem man jetzt die Toten unseres Blocks begräbt.","Zwischen Trümmerbrocken und Geschoßtrichtern drei Doppelgräber, drei Ehepaare, dreimal Selbstmord. […]","Ein anderer, sehr umlagerter, sehr umstrittener Anschlag meldet, daß die Russen neue und höhere Lebensmittelrationen zur Verfügung stellen, die in fünf Gruppen gestuft an uns ausgegeben werden sollen. […]","Zum Teil höhere Rationen als zuletzt unter Adolf.","Die Wirkung dieser Neuigkeit ist stark. Ich hörte: „Da sieht man wieder, daß unsere Propaganda uns bloß dumm gemacht hat.“"]],
         ["22.5.",["[…] Die Straße vor dem Rathaus bot das Bild einer wiederbelebten Baustelle.","Der Graben in der Mitte des Fahrdamms […] wird nun von den Unsrigen zugeschüttet – ein Vorgang, dessen Logik mir einleuchtet. […]","Morgen früh um acht soll ich auch zu dieser Arbeit antreten. Ich habe nichts dagegen."]]],
    nachweis:"Anonyma: Eine Frau in Berlin, hg. von Hans Magnus Enzensberger. Frankfurt a. M. 2003, S. 174–176, 196, 228–230. Gekürzt; Auslassungen […]. „Anschlag“: ein öffentlich ausgehängter Zettel." },
};
const WOERTER = ["stumpf","bewegt","fassungslos","ohnmächtig","angewidert","distanziert","leugnend","arrogant","hochnäsig","unberührt","schuldig","angstvoll","empathisch","unschuldig","erschreckt","schockiert","abwehrend","schlechtes Gewissen"];
const WGRUPPE = [
  ["Ausdruck", "Das lässt sich an Gesicht, Haltung und Abstand beschreiben.", ["bewegt","fassungslos","erschreckt","schockiert","angewidert","angstvoll","stumpf","unberührt","distanziert","abwehrend"]],
  ["Deutung des Inneren", "Das vermutest du. Es braucht eine Begründung am Bild.", ["ohnmächtig","empathisch","arrogant","hochnäsig","schlechtes Gewissen"]],
  ["Urteil über Schuld und Wahrheit", "Das kann ein Foto allein nicht belegen. Dafür brauchst du weitere Quellen.", ["schuldig","unschuldig","leugnend"]],
];
const SATZWAHL = ["Der protestantische Pfarrer lügt, weil","Der protestantische Pfarrer will es nicht wahrhaben, dass diese Verbrechen in unmittelbarer Nähe geschehen sind. Denn das würde bedeuten, dass","Der protestantische Pfarrer wusste tatsächlich nichts von den Verbrechen in Buchenwald, weil","Der protestantische Pfarrer hat die Gerüchte über die Geschehnisse in Buchenwald nicht glauben können und beruft sich jetzt auf sein Nichtwissen, denn","Die befreiten Häftlinge lügen, denn","Die amerikanische Journalistin ist vom Besuch Buchenwalds geschockt und übertreibt die Reaktion der Ex-Häftlinge, denn","Die amerikanischen Journalisten berichten nicht objektiv über die Besichtigung, weil"];
const STIMMEN = [["A","geeignet"],["B","nicht geeignet"],["C","kommt darauf an"]];
const URTEILRASTER = [
  ["Sachanalyse: Was ist geschehen?", "Ich nenne das Ereignis.", "Ich nenne Datum, Beteiligte und einen Beleg aus M4 bis M6.", "Ich nenne Belege aus mehreren Quellen und sage, wer jeweils spricht."],
  ["Sachurteil: aus der Zeit heraus", "Ich nenne ein Ziel oder eine Wirkung.", "Ich wäge Ziel, Wirkung und Handlungsspielraum im April 1945 ab.", "Ich prüfe meine Einschätzung an den Reaktionen in M5 und M6."],
  ["Werturteil: mein Maßstab", "Ich sage, wie ich es finde.", "Ich nenne den Maßstab, nach dem ich urteile.", "Ich trenne Sach- und Werturteil und nenne einen Einwand gegen mich."],
];
const markStand = () => { const n = markZahl(["q1","q2"]); return `${n} Stellen markiert. Ziel: mindestens 4, in beiden Quellen.`; };
const posWort = v => v < 35 ? "eher ungeeignet" : (v > 65 ? "eher geeignet" : "dazwischen");
const vorText = () => (VOR.find(v => v[0] === S.vor.wahl) || [,"–"])[1];

/* ---------- Seiten ---------- */
function start(){
  return `${band("M25 · Doppelstunde · 90 Minuten", "Leben in Ruinen und der Umgang mit Schuld", "Im Frühjahr 1945 endet der Krieg in Europa. Was das bedeutet, hängt davon ab, wen du fragst.")}
  <p class="leitfrage">Wie erlebten Menschen das Kriegsende 1945 – und wie gingen sie mit der Frage nach Schuld um?</p>
  ${belastend("In dieser Stunde liest du Berichte aus befreiten Lagern und aus zerstörten Städten. Es geht um Tod, Selbsttötung und Mord. Fotos aus Buchenwald erscheinen nur, wenn du sie selbst öffnest. Du darfst jederzeit aussetzen und mit deiner Lehrkraft sprechen.")}
  <h2 class="abschnitt">Am Ende kannst du</h2>
  <ul class="ziele"><li>an Quellen zeigen, wie verschieden Menschen das Kriegsende erlebten,</li><li>auf einem Foto unterscheiden, was du siehst und was du deutest,</li><li>begründet beurteilen, wie Deutsche 1945 mit ihrer Verantwortung konfrontiert wurden.</li></ul>
  <h2 class="abschnitt">So läuft die Stunde</h2>
  <ol class="ablauf">${L.seiten.slice(1, 7).map(s => `<li><b>${esc(s[1])}</b><span>${esc(s[2])}</span></li>`).join("")}</ol>
  <p class="hinweis" style="margin-top:.8rem">So arbeitest du: Du tippst Sätze in den Quellen an, um sie zu markieren. Deine Markierungen stehen danach als Belege neben deinem Schreibfeld und am Ende auf deiner Zusammenfassung.</p>
  ${weiter("kriegsende", "Beginnen")}`;
}

function kriegsende(){
  const v = S.vor, q = S.q12 === "q2" ? "q2" : "q1";
  const kopfteil = v.zu
    ? `<p class="auflage"><b>Deine erste Antwort ist festgehalten:</b> Der 8. Mai 1945 war für die Menschen in Deutschland vor allem <b>${esc(vorText())}</b>. Am Ende der Stunde kommst du darauf zurück.</p>`
    : `${auftrag("Allein · 2 Minuten", "Erst festlegen", "Am 7. und 8. Mai 1945 kapituliert Deutschland. Vervollständige den Satz und begründe kurz. Es gibt hier keine falsche Wahl – am Ende prüfst du sie an den Quellen.")}
  <p><b>Der 8. Mai 1945 war für die Menschen in Deutschland vor allem …</b></p>
  <div class="woerter" role="group" aria-label="Erste Antwort">${VOR.map(o => `<button type="button" data-akt="setz" data-p="vor.wahl" data-w="${o[0]}" aria-pressed="${v.wahl === o[0]}">${esc(o[1])}</button>`).join("")}</div>
  ${textfeld("vor.satz", "Weil …", { rows:2, platz:"Ich denke das, weil …", zaehl:false })}
  <div class="reihe"><button type="button" class="btn dunkel" data-akt="vorfest" ${v.wahl && v.satz.trim().length >= 8 ? "" : "disabled"}>Festlegen</button></div>`;
  const arbeit = `
  ${auftrag("Allein · 10 Minuten", "Zwei Menschen, dieselben Tage", "Lies beide Quellen. Tippe Sätze an, die zeigen, wie die Person das Kriegsende erlebt. Wähle vorher den Stift: ▲ für Befreiung und Erleichterung, ● für Bedrohung, Angst und Gewalt. Noch einmal tippen löscht die Markierung.")}
  <div class="qreiter" role="tablist" aria-label="Quelle wählen">${["q1","q2"].map(id => `<button type="button" role="tab" aria-selected="${q === id}" data-akt="setz" data-p="q12" data-w="${id}">${esc(QUELLEN[id].titel)}</button>`).join("")}</div>
  <div class="qwerk" style="margin-top:0">${quelle(q)}
    <div><h3 class="klein" style="margin-top:0">Deine Belege aus beiden Quellen</h3>${belege(["q1","q2"], { ta:"Als Befreiung …", tb:"Als Bedrohung …" })}<p class="hinweis" id="markstand" aria-live="polite" style="margin-top:.5rem">${markStand()}</p></div>
  </div>
  ${auftrag("Allein · 6 Minuten", "Zusammenfassen", "Fasse mit eigenen Worten zusammen, wie unterschiedlich die Menschen das Kriegsende und das Ende der nationalsozialistischen Herrschaft erlebten. Etwa fünf Sätze. Nutze deine Belege.")}
  ${textfeld("b1", "Meine Zusammenfassung", { rows:6, anfaenge:["Für die Häftlinge in Dachau bedeutete das Kriegsende","Die junge Frau in Aichach erlebt","Gemeinsam ist beiden","Der wichtigste Unterschied ist"], ziel:"Ziel: etwa 60 Wörter" })}
  ${raster("b1", 40, "Selbstprüfung", [["Beide Seiten", "Ich beschreibe eine Sicht.", "Ich beschreibe beide Sichten.", "Ich erkläre, warum sie sich unterscheiden."],["Belege", "Ich behaupte ohne Beleg.", "Ich nenne je Quelle einen Beleg.", "Ich zitiere kurz und sage, wer spricht."],["Sprache", "Ich übernehme Wörter der Quelle.", "Ich formuliere in eigenen Worten.", "Ich setze Wörter der Zeit in Anführungszeichen."]])}
  <p class="hinweis" style="margin-top:.8rem">Danach, zu zweit, 2 Minuten: Lest euch je einen Satz vor. Wo habt ihr verschieden markiert?</p>`;
  return `${zeitKopf("kriegsende")}<h1>Der Krieg ist vorbei</h1>
  <p class="lead">Seit März 1945 rücken die alliierten Truppen von Westen und Osten vor. Sie befreien die Konzentrationslager. Hunderte deutsche Städte liegen in Trümmern, Millionen Menschen sind auf der Flucht. Mehr als 65 Millionen Menschen sind in diesem von Deutschland begonnenen Krieg gestorben.</p>
  ${kopfteil}${v.zu ? arbeit : ""}
  ${weiter("ruinen", "Weiter: Überleben in Ruinen")}`;
}

function ruinen(){
  return `${zeitKopf("ruinen")}<h1>Überleben in Ruinen</h1>
  <p class="lead">Die Wirtschaft ist zusammengebrochen. Für Reichsmark gibt es nichts mehr zu kaufen. Viele Männer sind in Kriegsgefangenschaft. Vor allem Frauen sichern jetzt das Überleben.</p>
  ${belastend("Die Quelle erwähnt Gräber und Selbsttötungen.")}
  ${auftrag("Allein · 10 Minuten", "Probleme und Ressourcen", "Markiere in der Quelle: ▲ Welche Probleme müssen sofort gelöst werden? ● Was hilft den Frauen dabei – was können sie nutzen? Schreib danach zwei bis vier Sätze.")}
  <div class="qwerk">${quelle("q3")}
    <div>${belege(["q3"], { ta:"Probleme", tb:"Ressourcen" })}
    <div style="margin-top:1rem">${textfeld("b2", "Meine Erkenntnisse", { rows:5, anfaenge:["Das dringendste Problem ist","Die Frauen können nutzen, dass","Auffällig finde ich"], ziel:"Ziel: 3 bis 4 Sätze" })}</div></div>
  </div>
  ${hilfe("Hilfe: Was ist eine Ressource?", "<p>Eine Ressource ist alles, was beim Überleben hilft: Dinge (Holz, Lebensmittelkarten), Regeln (Rationen in Gruppen), Arbeit, andere Menschen, eine Haltung.</p>")}
  ${weiter("verbrechen", "Weiter: Im Angesicht des Verbrechens")}`;
}

function verbrechen(){
  const fest = S.wortzu;
  const fotos = S.fotos ? `<div class="felder2" id="fotos">${[1,2].map(n => `<figure style="margin:0"><img src="media/m25-buchenwald-besichtigung-${n}.jpg" alt="Foto der Besichtigung des Lagers Buchenwald durch Einwohner*innen Weimars, April 1945. Beschreibung siehe Text." style="width:100%;border-radius:.6rem;display:block;filter:grayscale(1)" onerror="fotoFehlt()"><figcaption class="quelle">Deutsche Zivilist*innen, die gezwungen wurden, das befreite Lager Buchenwald zu besichtigen. Foto: Margaret Bourke-White, April 1945 (Bild teilweise retuschiert).</figcaption></figure>`).join("")}</div>`
    : `<div class="reihe"><button type="button" class="btn dunkel" data-akt="setz" data-p="fotos" data-w="true">Fotos zeigen</button><span class="hinweis">Du kannst die Aufgabe auch mit den Fotos im Heft oder am Beamer bearbeiten.</span></div>`;
  return `${zeitKopf("verbrechen")}<h1>Im Angesicht des Verbrechens</h1>
  <p class="lead">Am 11. April 1945 befreit die US-Armee das Konzentrationslager Buchenwald bei Weimar. Jetzt stellt sich die Frage: Was soll mit den Tätern geschehen – und mit allen anderen Deutschen?</p>
  ${auftrag("Allein · 6 Minuten", "Der Schwur von Buchenwald", "Am 19. April 1945 gedenken die Überlebenden auf dem Appellplatz ihrer Toten. Die Ansprache wird in mehreren Sprachen verlesen. Fasse in ein bis zwei Sätzen zusammen: Was fordern die befreiten Häftlinge?")}
  <blockquote>„Wir Buchenwälder Antifaschisten sind heute angetreten zu Ehren der in Buchenwald und seinen Außenkommandos […] ermordeten 51 000 Gefangenen! […] Noch leben die Mörder unserer Kameraden! […] Wir schwören deshalb vor aller Welt auf diesem Appellplatz […]: Wir stellen den Kampf erst ein, wenn auch der letzte Schuldige vor den Richtern der Völker steht! Die Vernichtung des Nazismus mit seinen Wurzeln ist unsere Losung. Der Aufbau einer neuen Welt des Friedens und der Freiheit ist unser Ziel. Das sind wir unseren gemordeten Kameraden, ihren Angehörigen schuldig.“<span class="wer">Quelle M4 · Schwur von Buchenwald, 19. April 1945. Gekürzt. Die Zahl 51 000 war die damalige Schätzung der Toten.</span></blockquote>
  ${textfeld("schwur", "Die Forderungen in ein bis zwei Sätzen", { rows:3, platz:"Die Überlebenden fordern …", zaehl:false })}
  ${vergleich("schwur", ["schwur"], 20, "Mit dem Text vergleichen", "<p><b>Drei Forderungen stehen im Text:</b> 1. Jeder Schuldige soll vor Gericht („vor den Richtern der Völker“). 2. Der Nationalsozialismus soll „mit seinen Wurzeln“ beseitigt werden. 3. Eine „neue Welt des Friedens und der Freiheit“ soll aufgebaut werden.</p><p>Prüfe: Welche der drei hast du genannt? Ergänze deinen Satz.</p>")}

  <h2 class="abschnitt">Die Besichtigung, 16. April 1945</h2>
  <p>Fünf Tage nach der Befreiung befiehlt der US-General George S. Patton: Rund 1.000 Frauen und Männer aus Weimar müssen das Lager ansehen – noch bevor die Toten bestattet sind. Die US-Armee lässt das fotografieren. Unter den Fotograf*innen ist Margaret Bourke-White.</p>
  ${belastend("Die Fotos zeigen Menschen aus Weimar vor einem Anhänger mit Toten. Die Toten sind auf den Bildern im Heft unkenntlich gemacht. Sieh sie dir nur an, wenn du möchtest.")}
  ${fotos}
  ${auftrag("Allein · 8 Minuten", "Sehen und deuten", "Sieh dir die Menschen aus Weimar auf den Fotos an. Wähle drei bis fünf Wörter, mit denen du ihre Reaktion beschreiben würdest. Schreib dann auf, woran du das im Bild festmachst.")}
  <div class="woerter" role="group" aria-label="Wörter wählen">${WOERTER.map(w => `<button type="button" data-akt="wort" data-w="${esc(w)}" aria-pressed="${S.wort.includes(w)}" ${fest ? "disabled" : ""}>${esc(w)}</button>`).join("")}</div>
  ${textfeld("woran", "Woran im Bild machst du das fest?", { rows:2, platz:"Ich sehe … (Blick, Haltung, Hände, Abstand)", zaehl:false })}
  <div class="reihe"><button type="button" class="btn dunkel" data-akt="wortfest" ${(!fest && S.wort.length >= 3 && S.woran.trim().length >= 10) ? "" : "disabled"}>Festlegen</button>${fest ? `<button type="button" class="btn" data-akt="setz" data-p="wortzu" data-w="false">Noch einmal</button>` : `<span class="hinweis">${S.wort.length} gewählt · mindestens 3, höchstens 5</span>`}</div>
  ${fest ? `<div class="auflage" id="wortauf"><p><b>Sehen ist nicht dasselbe wie deuten.</b> Ein Foto zeigt Gesichter und Haltungen – keine Gedanken. Ordne deine Wörter ein:</p>
    <div class="wgrp">${WGRUPPE.map(g => `<div><b>${esc(g[0])}</b>${esc(g[1])}<br><span class="dein">${g[2].filter(w => S.wort.includes(w)).map(esc).join(" · ") || "–"}</span></div>`).join("")}</div>
    <p style="margin-top:.6rem">Frag außerdem: <b>Wer fotografiert, in wessen Auftrag – und wer fehlt im Bild?</b> Die Fotos entstanden im Auftrag der US-Armee. Sie sollten zeigen, dass Deutsche die Verbrechen ansehen mussten.</p></div>` : ""}
  ${auftrag("Allein · 6 Minuten", "Interpretieren", "Wie interpretierst du die Gefühle der fotografierten Menschen aus Weimar? Schreib fünf bis sechs Sätze. Trenne dabei, was du siehst, von dem, was du vermutest.")}
  ${textfeld("deutung", "Meine Interpretation", { rows:6, anfaenge:["Auf den Fotos sehe ich","Das deute ich als","Nicht belegen kann ich","Um mehr zu wissen, bräuchte ich"], ziel:"Ziel: 5 bis 6 Sätze" })}
  ${weiter("verantwortung", "Weiter: Verantwortung")}`;
}
function fotoFehlt(){ const f = document.getElementById("fotos"); if (f) f.outerHTML = `<p class="hinweis" id="fotos">Die Fotos liegen in dieser Fassung nicht vor (Bildrechte). Du findest sie im Heft, M25, Baustein 3. Deine Lehrkraft kann sie am Beamer zeigen.</p>`; }

function verantwortung(){
  const ab = S.ab;
  const A = `${auftrag("Aufgabe A · allein · 10 Minuten", "Schuld der Nazis oder aller Deutschen?", "Der Pfarrer betont: „So dürfen wir vor Gott bekennen, daß wir keinerlei Mitschuld an diesen Greueln haben.“ Kann man das im Frühjahr 1945 so sagen? Beurteile die Frage nach der Schuld aller Deutschen für die Verbrechen.")}
    ${textfeld("urteilA", "Mein Urteil", { rows:8, anfaenge:["In den Quellen steht","Aus Sicht der Zeit","Ich unterscheide zwischen Schuld und Verantwortung, weil","Mein Maßstab ist"], ziel:"Ziel: etwa 100 Wörter" })}
    ${raster("urteilA", 60, "Vom Sachurteil zum Werturteil", URTEILRASTER)}`;
  const B = `${auftrag("Aufgabe B · allein · 10 Minuten", "Die richtige Methode?", "Rund 1.000 Einwohner*innen Weimars werden gezwungen, das Lager zu besichtigen, noch bevor die Ermordeten bestattet sind. War das ein geeignetes Mittel, um Deutsche mit ihrer Verantwortung zu konfrontieren? Setz zuerst den Regler, dann schreib zehn bis zwölf Sätze.")}
    <div class="karte"><div class="g"><div class="g-skala"><div class="g-skala__spur"><input type="range" min="0" max="100" step="1" value="${S.pos.wert}" data-f="pos.wert" aria-label="Zwangsbesichtigung: ungeeignet (0) bis geeignet (100)"></div><div class="g-skala__enden"><span>ungeeignet</span><span>geeignet</span></div><p>Deine Einschätzung: <span class="g-skala__wert" id="poswert">${posWort(S.pos.wert)}</span></p></div></div></div>
    ${hilfe("Denkanstöße (erst nach einem eigenen Versuch)", "<p>Was wollten die Amerikaner erreichen? · Was zeigen M5 und M6 über die Wirkung? · Was bedeutet es für die Würde der Toten, dass sie gezeigt wurden? · Welche anderen Wege hätte es gegeben?</p>")}
    ${textfeld("urteilB", "Mein Urteil", { rows:8, anfaenge:["Die Amerikaner wollten","Für die Maßnahme spricht","Dagegen spricht","Mein Maßstab ist"], ziel:"Ziel: 10 bis 12 Sätze" })}
    ${raster("urteilB", 60, "Vom Sachurteil zum Werturteil", URTEILRASTER)}`;
  return `${zeitKopf("verantwortung")}<h1>Verantwortung und Verbrechen</h1>
  <p class="lead">Die Überlebenden verlangen, dass alle Schuldigen bestraft werden. Die Menschen aus Weimar reagieren sehr verschieden. Zwei Quellen berichten davon – und widersprechen sich.</p>
  <div class="zwei">
    <div class="karte" style="margin:0"><p class="kennung">Quelle M5 · der Pfarrer</p><p>Fünf Tage nach der Besichtigung wird in allen evangelischen Kirchen Weimars verlesen (Propst Richard Kade):</p><blockquote>„Dort sind Vorgänge ans Licht gekommen, die uns bisher völlig unbekannt waren. Wir verurteilen die Grausamkeit und den Sadismus, mit denen Menschen behandelt und vielfach zu Tode gequält wurden. Das ist alles nur möglich gewesen auf dem Boden einer Geisteshaltung, die mit dem Christentum völlig gebrochen hat und unter der wir als Kirche auch sonst schmerzlich gelitten haben. So dürfen wir vor Gott bekennen, daß wir keinerlei Mitschuld an diesen Greueln haben.“</blockquote><p class="quelle">Stadtarchiv Weimar, Hauptamt nach 1945, 008/02/3; zitiert nach Volkhard Knigge: Buchenwald, in: Detlef Hoffmann (Hg.): Das Gedächtnis der Dinge, Frankfurt a. M./New York 1998, S. 161, Fußnote 63. Gekürzt.</p></div>
    <div class="karte" style="margin:0"><p class="kennung">Quelle M6 · die Journalistin</p><p>Die US-Fotografin Margaret Bourke-White schreibt in ihrer Reportage über den Tag der Besichtigung:</p><blockquote>„Als die Zivilisten immer wieder riefen: ‚Wir haben nichts gewusst! Wir haben nichts gewusst!‘, gerieten die Ex-Häftlinge außer sich vor Wut. ‚Ihr habt es gewusst‘, schrien sie. ‚Wir haben neben Euch in den Fabriken gearbeitet. Wir haben es euch gesagt und dabei unser Leben riskiert. Aber ihr habt nichts getan.‘“</blockquote><p class="quelle">Zitiert nach: Der SPIEGEL, 23.2.2018: Konfrontation mit der Hölle. Gekürzt.</p></div>
  </div>
  ${auftrag("Allein · 8 Minuten", "„Wir haben nichts gewusst!“", "Der Pfarrer und die Journalistin widersprechen einander. Worauf könnte man das zurückführen? Wähle den Satz, der deiner Einschätzung am nächsten kommt, führe ihn zu Ende und erkläre, warum du diese Deutung für wahrscheinlicher hältst.")}
  <div class="g"><div class="g-wahl"><fieldset><legend>Satz wählen</legend>${SATZWAHL.map((s, i) => `<label class="g-option"><input type="radio" name="satzwahl" value="${i}" data-satzwahl ${S.satzwahl === i ? "checked" : ""}><span>${esc(s)} …</span></label>`).join("")}</fieldset></div></div>
  <div style="margin-top:1rem">${textfeld("satz", "Mein Satz und meine Begründung", { rows:5, platz:"Wähle oben einen Satz. Er erscheint hier – schreib ihn zu Ende und begründe.", ziel:"Ziel: mindestens 30 Wörter" })}</div>
  ${vergleich("satz", ["satz"], 120, "An den Quellen prüfen", "<p><b>Drei Prüffragen für deine Deutung:</b></p><ol style='padding-left:1.2rem;display:grid;gap:.3rem'><li><b>Was steht da – und was nicht?</b> M5 sagt „uns bisher völlig unbekannt“ und „keinerlei Mitschuld“. Über die eigene Stadt und die Häftlinge in Weimar sagt der Text nichts.</li><li><b>Womit belegen die Überlebenden ihren Vorwurf?</b> „Wir haben neben Euch in den Fabriken gearbeitet.“</li><li><b>Wer spricht, wann, vor wem?</b> Ein Pfarrer vor seiner Gemeinde, wenige Tage danach. Eine Journalistin für Leser*innen in den USA. Überlebende, die im Lager waren.</li></ol><p>Die Gedenkstätte Buchenwald hält fest: Schon wenige Tage nach der Besichtigung wiesen Vertreter der Stadt jede Schuld der Bürger*innen zurück.</p>")}

  <h2 class="abschnitt">Jetzt urteilst du</h2>
  <p>Wähle eine der beiden Aufgaben.</p>
  <div class="qreiter" role="tablist" aria-label="Aufgabe wählen"><button type="button" role="tab" aria-selected="${ab === "A"}" data-akt="setz" data-p="ab" data-w="A">Aufgabe A · Schuld aller Deutschen?</button><button type="button" role="tab" aria-selected="${ab === "B"}" data-akt="setz" data-p="ab" data-w="B">Aufgabe B · Die richtige Methode?</button></div>
  ${ab === "A" ? A : (ab === "B" ? B : `<p class="hinweis" style="margin-top:.6rem">Noch keine Aufgabe gewählt.</p>`)}
  ${weiter("landkarte", "Weiter: Landkarte")}`;
}

const LKCFG = { seite:"landkarte", titel:"Ein Tag, drei Stimmen", nach:["plenum","Weiter: Plenum"],
  frage:"Ein Pfarrer, eine Journalistin und die Überlebenden berichten über dieselben Tage in Weimar – und sagen Verschiedenes. Warum?",
  lead:"Schreib einen Satz: Warum berichten die drei so verschieden über dasselbe Ereignis?", platz:"Sie berichten verschieden, weil …",
  folge:["Multiperspektivität (Folgerung)", "Ein Ereignis wird aus Quellen verschiedener Beteiligter betrachtet (z. B. Täter*innen, Opfer, Zuschauende)."],
  urteil:{
    "2-1-1":["kaum","Alle drei Zeugnisse stammen aus dem April 1945. Sie blicken nicht aus großem Abstand zurück. Retrospektivität betrifft hier eher dich: Du kennst die Forschung von heute, die Menschen in Weimar sprachen mitten im Geschehen."],
    "2-1-2":["zentral","Die Landkarte nennt Perspektivität zuerst „bei den Quellen (wer hat sie verfasst?)“. Der Pfarrer spricht für seine Gemeinde und weist Mitschuld zurück. Die Überlebenden haben das Lager erlitten. Die Journalistin begleitet die US-Armee und schreibt für Leser*innen in den USA. Jede Stimme hat eigene Erfahrungen und Interessen."],
    "2-1-3":["kaum","Dass jede Quelle nur einen Ausschnitt zeigt, stimmt. Es erklärt aber nicht, warum sich die Aussagen widersprechen. Dafür braucht es ein Prinzip, das auf die Sprechenden schaut."],
    "2-1-4":["teils","Bourke-White wählt aus, was sie fotografiert und zitiert. Die Abkündigung wählt aus, was sie nennt: die Grausamkeit ja, das eigene Wissen nein. Zentral bleibt, wer da auswählt und warum: Perspektivität."],
    "2-1-5":["teils","Was die 1.000 Besucher*innen dachten, haben die wenigsten aufgeschrieben. Überliefert sind vor allem Fotos der Armee, eine Reportage und eine Erklärung der Kirche. Das begrenzt, was wir wissen können – erklärt aber nicht den Widerspruch."],
    "2-1-6":["kaum","Narrativität betrifft die Form der Erzählung. Hier unterscheiden sich die Stimmen im Inhalt: gewusst oder nicht gewusst."],
    "2-1-7":["kaum","Konstruktivität betrifft die Geschichte, die du am Ende aus den Quellen zusammensetzt. Die Quellen selbst sind Zeugnisse von Beteiligten."],
    "2-1-8":["teils","Das Umfeld prägt, was selbstverständlich scheint: In der Kirchengemeinde ist „wir haben gelitten“ selbstverständlich, für die Befreiten ist es das Lager. Die Landkarte unterscheidet davon die Perspektivität als Weltanschauung und Interessen."],
    "2-1-9":["zentral","Genau das tut diese Stunde: Sie betrachtet ein Ereignis aus Quellen verschiedener Beteiligter – Überlebende (M4, in M6), Zuschauende (M5), eine Beobachterin von außen (M6). Achtung: Kontroversität meint etwas anderes, nämlich Deutungen von Historiker*innen (so in M22)."],
  },
  bruecke:`<b>Brücke zum Urteil.</b> Mehrere Perspektiven heißt nicht, dass alle gleich gut belegt sind. Die Landkarte trennt drei Schritte: <i>Sachanalyse</i> (Was ist geschehen?), <i>Sachurteil</i> (Wie ist es aus der Zeit heraus zu beurteilen?), <i>Werturteil</i> (Wie bewerte ich es heute, nach welchem Maßstab?). <a href="${LK}2-4-3" target="_blank" rel="noopener">Landkarte 2.4.3 Vom Sachurteil zum Werturteil ↗</a>` };

function plenum(){
  return `${zeitKopf("plenum")}<h1>Plenum</h1>
  ${auftrag("Plenum · 6 Minuten · iPad hochhalten", "War die Zwangsbesichtigung ein geeignetes Mittel?", "Wähle deine Stimme. Auf Ansage zeigen alle ihre Karte. Dann begründen je zwei Stimmen aus A, B und C ihre Wahl.")}
  ${stimmkarte("stimme", STIMMEN)}
  <p class="hinweis" style="margin-top:.8rem">Gesprächsregel: Erst die Quelle nennen, dann die eigene Bewertung. Niemand muss von der eigenen Familie erzählen.</p>
  <h2 class="abschnitt">Zurück zum Anfang</h2>
  <p>Am Anfang hast du gewählt: Der 8. Mai 1945 war für die Menschen in Deutschland vor allem <b>${esc(vorText())}</b>${S.vor.satz ? ` – „${esc(S.vor.satz)}“` : "."}</p>
  ${textfeld("nach", "Was denkst du jetzt – und warum?", { rows:3, anfaenge:["Ich bleibe dabei, weil","Ich sehe es jetzt anders, weil","Neu ist für mich"], zaehl:false })}
  <p class="merksatz">iPad umdrehen. Danach: Zusammenfassung sichern.</p>
  ${weiter("zusammenfassung", "Zur Zusammenfassung")}`;
}

function zusammenfassung(){
  const m = (t, leer = "noch offen") => `<p class="mein ${String(t || "").trim() ? "" : "leer"}">${esc(String(t || "").trim() || leer)}</p>`;
  const urteil = S.ab === "A" ? S.urteilA : S.urteilB;
  const lkp = S.lk.ok && S.lk.prinzip ? ((PRINZIP[S.lk.prinzip] || LKCFG.folge)[0] + ": " + S.lk.grund) : "";
  return `<div class="zf"><div class="reihe nodruck" style="margin:0 0 1rem"><button type="button" class="btn dunkel" data-drucken>Drucken oder als PDF sichern</button><span class="hinweis">Zwei Seiten A4. In GoodNotes ablegen.</span></div>
  <h1>M25 · Leben in Ruinen und der Umgang mit Schuld</h1>
  <p class="leitfrage">Wie erlebten Menschen das Kriegsende 1945 – und wie gingen sie mit der Frage nach Schuld um?</p>
  <p class="merksatz">Das Kriegsende war nicht für alle dasselbe: Für die Befreiten der Lager war es Rettung, für viele Deutsche zuerst Zusammenbruch und Angst. Mit ihrer Verantwortung konfrontiert, wiesen viele die Schuld zurück.</p>
  <h2>Begriffe</h2>
  <div class="begriffe">
    <div><b>Befreiung:</b> Alliierte Truppen öffnen die Lager. Beispiel: Dachau, 29. April 1945 (Quelle 1).</div>
    <div><b>Kapitulation:</b> Die Wehrmacht gibt am 7./8. Mai 1945 bedingungslos auf. Der Krieg in Europa ist zu Ende.</div>
    <div><b>Schwur von Buchenwald:</b> Überlebende fordern am 19. April 1945 Gericht über alle Schuldigen und eine „neue Welt des Friedens und der Freiheit“.</div>
    <div><b>Zwangsbesichtigung:</b> Am 16. April 1945 müssen rund 1.000 Menschen aus Weimar das Lager Buchenwald ansehen (Befehl von General Patton).</div>
    <div><b>Multiperspektivität:</b> Ein Ereignis wird aus Quellen verschiedener Beteiligter betrachtet (z. B. Täter*innen, Opfer, Zuschauende).</div>
    <div><b>Sach- und Werturteil:</b> Erst aus der Zeit heraus beurteilen (an Quellen prüfbar), dann heute bewerten – und den eigenen Maßstab nennen.</div>
  </div>
  <h2>Frühjahr 1945</h2>
  <ul class="zl"><li><b>11. April</b><span>Die US-Armee befreit das Konzentrationslager Buchenwald.</span></li><li><b>16. April</b><span>Menschen aus Weimar müssen das Lager besichtigen.</span></li><li><b>19. April</b><span>Schwur von Buchenwald.</span></li><li><b>29. April</b><span>Die US-Armee befreit das Konzentrationslager Dachau.</span></li><li><b>7./8. Mai</b><span>Kapitulation Deutschlands. Ende des Krieges in Europa.</span></li></ul>
  <div class="werk"><b>Denkwerkzeug: Ein Foto lesen.</b> 1. <b>Sehen:</b> Blick, Haltung, Abstand – ohne Deutung. 2. <b>Fragen:</b> Wer fotografiert, in wessen Auftrag, und wer fehlt im Bild? 3. <b>Deuten:</b> Welche Deutung kann ich am Bild belegen, welche nicht?</div>
  <div class="werk" style="background:var(--kuli-hi)"><b>Zwei Stimmen zum selben Tag.</b> Pfarrer (M5): „keinerlei Mitschuld“. Überlebende (M6): „Ihr habt es gewusst.“ Prüffragen: Was steht da – und was nicht? Womit wird belegt? Wer spricht, wann, vor wem?</div>

  <div class="seitenumbruch"><h2 style="margin-top:0">Meine Ergebnisse</h2>
  <h2>Der 8. Mai 1945 – vorher und nachher</h2>${m(S.vor.zu ? `Am Anfang: ${vorText()} – ${S.vor.satz}` : "")}${m(S.nach ? "Am Ende: " + S.nach : "")}
  <h2>Wie Menschen das Kriegsende erlebten (Quelle 1 und 2)</h2>${m(S.b1)}
  <h2>Überleben in Ruinen (M3)</h2>${m(S.b2)}
  <h2>Schwur von Buchenwald: die Forderungen</h2>${m(S.schwur)}
  <h2>Die Fotos aus Buchenwald</h2>${m(S.wort.length ? "Meine Wörter: " + S.wort.join(", ") + ". " + S.woran : "")}${m(S.deutung)}
  <h2>„Wir haben nichts gewusst!“</h2>${m(S.satz)}
  <h2>Mein Urteil${S.ab ? " (Aufgabe " + S.ab + ")" : ""}</h2>${m(urteil)}
  <h2>Landkarte</h2>${m(lkp)}</div></div>
  ${weiter("start", "Zur Startseite")}`;
}

function lehrkraft(){
  return `<div class="lk"><p class="zeit"><span class="nr">Für Lehrkräfte</span><span>nicht geschützt – enthält keine Lösungen, die Lernende nicht sehen dürfen</span></p><h1>M25 · Hinweise</h1>
  <p class="lead">Grundlage ist dein Heft „Geschichte aktuell 1“, M25 (vier Bausteine, Quellen 1–2, M3–M6). Die Seite übernimmt Aufbau, Quellen und Aufgaben. Neu ist, was nur das Gerät kann.</p>
  <h2 class="abschnitt">Was das Gerät hier leistet</h2>
  <ul><li><b>Markierungen werden zu Belegen:</b> Was Lernende antippen, steht geordnet neben dem Schreibfeld (Befreiung · Bedrohung, Problem · Ressource).</li><li><b>Festlegen vor dem Lesen:</b> erste Antwort zum 8. Mai, am Ende die Rückkehr dazu.</li><li><b>Fotos nur nach Hinweis und eigener Entscheidung</b>; die Wortwahl wird danach in „Ausdruck · Deutung · Urteil“ sortiert.</li><li><b>Vergleiche erst nach dem eigenen Text</b> (Schwur, Prüffragen zu M5/M6, Raster Sach- und Werturteil).</li><li><b>Stimmkarte</b> für das Plenum; <b>Zusammenfassung</b> auf zwei Seiten A4 mit den eigenen Texten.</li></ul>
  <p>Papier bleibt besser für: die langen Originalfassungen der Quellen (Heft) und das Gespräch.</p>
  <h2 class="abschnitt">Ablauf (90 Minuten)</h2>
  <div class="matrix-wrap"><table><thead><tr><th>Zeit</th><th>Phase</th><th>Sozialform</th><th>Hinweis</th></tr></thead><tbody>
  <tr><td class="n">0–20</td><td>Der Krieg ist vorbei</td><td>allein, dann zu zweit</td><td>Erste Antwort 2, Quellen 10, Text 6, Austausch 2</td></tr>
  <tr><td class="n">20–30</td><td>Überleben in Ruinen</td><td>allein</td><td>Hinweis zu Selbsttötungen in der Quelle</td></tr>
  <tr><td class="n">30–50</td><td>Im Angesicht des Verbrechens</td><td>allein; Fotos am Beamer</td><td>Schwur 6, Wörter 8, Interpretation 6</td></tr>
  <tr><td class="n">50–72</td><td>Verantwortung</td><td>allein</td><td>M5/M6 und Satz 12, Urteil A oder B 10</td></tr>
  <tr><td class="n">72–80</td><td>Landkarte</td><td>allein</td><td>Perspektivität, Multiperspektivität</td></tr>
  <tr><td class="n">80–90</td><td>Plenum</td><td>Plenum, iPad zu</td><td>Stimmkarte, Begründungen, Rückkehr zur ersten Antwort</td></tr></tbody></table></div>
  <p class="hinweis">Zeitdiagnose bei 150 Wörtern pro Minute (gemessen an der fertigen Seite): Lesen rund 18 Minuten (rund 2.700 Wörter mit beiden Quellen), Schreiben rund 38 Minuten (sieben Texte), Markieren und Wählen rund 12 Minuten, Landkarte, Plenum und Wechsel rund 30 Minuten. Das sind fast 100 Minuten. <b>In 90 Minuten passt die Stunde nur mit einer Kürzung</b> – empfohlen K1, oder K2 und K3 zusammen.</p>
  <h2 class="abschnitt">Kürzungen zur Auswahl</h2>
  <ul><li><b>K1</b> Baustein 2 (Ruinen) als Hausaufgabe: 10 Minuten frei.</li><li><b>K2</b> Interpretation der Fotos mündlich im Plenum statt schriftlich: 6 Minuten frei.</li><li><b>K3</b> Landkarten-Moment gemeinsam am Beamer: 4 Minuten frei.</li><li><b>K4</b> Urteil A/B als Hausaufgabe, im Unterricht nur Stimmkarte und Gespräch: 10 Minuten frei.</li></ul>
  <h2 class="abschnitt">Abweichungen vom Heft</h2>
  <ul><li>Anrede durchgehend „du“ (Heft: gemischt).</li><li>Die Quellen sind für die öffentliche Seite stärker gekürzt als im Heft; jede Kürzung ist mit […] markiert. Die vollen Auszüge stehen im Heft.</li><li>In M3 ist ein Nebensatz mit einer abwertenden Bezeichnung gekürzt.</li><li>Die Leitfrage der Stunde ist neu formuliert (das Heft nennt keine).</li><li>Die Sortierung der 18 Wörter in „Ausdruck · Deutung · Urteil“ ist ein Vorschlag von Claude, kein Forschungsstand. Bitte prüfen.</li><li>Die Einstufungen im Landkarten-Moment (zentral: Perspektivität, Multiperspektivität) sind ein Vorschlag. Wortlaut der Prinzipien aus der Landkarte 2.1.</li><li>Ergänzt aus der Gedenkstätte Buchenwald: Datum der Besichtigung (16. April), Befehl Pattons, Schwur am 19. April, 51 000 als damalige Schätzung.</li></ul>
  <h2 class="abschnitt">Quellen und Rechte</h2>
  <ul><li>Textauszüge von Rost, Kuby (Hg.), Hillers, Bourke-White: kurze Zitate mit Fundstelle zur Analyse im Unterricht (§ 51 UrhG). Ob der Umfang auf einer öffentlichen Seite trägt, entscheidest du; sonst die Stunde nur im Moodle-Kurs einsetzen.</li><li><b>Fotos Buchenwald</b> (Margaret Bourke-White / Getty Images): nicht im Repository. Für den Moodle-Kurs (§ 60a UrhG) zwei Dateien in <code>media/</code> legen: <code>m25-buchenwald-besichtigung-1.jpg</code> und <code>-2.jpg</code>. Fehlen sie, verweist die Seite auf das Heft.</li><li>Gedenkstätte Buchenwald: buchenwald.de, Dossiers „Die Bevölkerung konfrontieren“ und „Schwur von Buchenwald“; liberation.buchenwald.de, „Denials of guilt“.</li></ul>
  <h2 class="abschnitt">Vor dem Einsatz prüfen</h2>
  <ul><li>Nico Rost: Angaben „niederländischer Journalist, Tagebuch“ und Datum 29. April 1945.</li><li>Fußnote des Hefts zu Baustein 4 (offene-geschichte.de): Übernahmen von dort kennzeichnen.</li><li>Zitat Bourke-White: im Heft nach SPIEGEL 23.2.2018; die Gedenkstätte zitiert nach „Dear Fatherland, Rest Quietly“ (1946).</li></ul>
  <h2 class="abschnitt">Nur du kannst das</h2>
  <ul><li>Entscheiden, ob und wie die Fotos gezeigt werden; Lernende mit Flucht- oder Kriegserfahrung in der Familie im Blick behalten.</li><li>Test auf dem iPad in Safari (hoch und quer), VoiceOver, Moodle-Upload.</li><li>Im Plenum Sach- und Werturteil trennen helfen; kein Moral-Ranking der Weimarer*innen.</li></ul>
  <h2 class="abschnitt">Nach der Stunde</h2>
  <div class="matrix-wrap"><table><thead><tr><th>Beobachtung</th><th>Notiz</th></tr></thead><tbody><tr><td>Haben die Markierungen beim Schreiben geholfen – oder wurde nur markiert?</td><td></td></tr><tr><td>Wie viele haben die Fotos am Gerät geöffnet?</td><td></td></tr><tr><td>Welche Satzanfänge zu „Wir haben nichts gewusst“ wurden gewählt?</td><td></td></tr><tr><td>Zeit: Wo wurde es eng?</td><td></td></tr></tbody></table></div>
  <p class="hinweis" style="margin-top:1rem">Speicherschlüssel <code>${L.key}</code>. Eingaben bleiben im Browser des Geräts.</p></div>
  ${weiter("start", "Zur Startseite")}`;
}

AKTION.vorfest = () => { S.vor.zu = true; speichere(); zeichne(true); };
AKTION.wort = t => { const w = t.dataset.w, i = S.wort.indexOf(w); if (i >= 0) S.wort.splice(i, 1); else if (S.wort.length < 5) S.wort.push(w); speichere(); zeichneBehalte(); };
AKTION.wortfest = (t, ev) => { S.wortzu = true; speichere(); zeichneBehalte(); if (ev.detail !== 0) neu(document.getElementById("wortauf"), "neu"); };
document.addEventListener("change", ev => { const t = ev.target; if (t.hasAttribute && t.hasAttribute("data-satzwahl")) { S.satzwahl = +t.value; const s = SATZWAHL[S.satzwahl]; if (!S.satz.trim() || SATZWAHL.some(x => S.satz.trim() === x)) S.satz = s + " "; speichere(); const f = document.getElementById("f-satz"); if (f) { f.value = S.satz; f.focus(); } nachEingabe("satz"); } });
const SEITE_FN = { start, kriegsende, ruinen, verbrechen, verantwortung, landkarte:() => landkarte(LKCFG), plenum, zusammenfassung, lehrkraft };
kernStart();
