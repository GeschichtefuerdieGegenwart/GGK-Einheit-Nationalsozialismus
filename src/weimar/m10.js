/* ===== M10 · Die Saat der Gewalt 1918–1922 (Heft „Geschichte aktuell 1“, M10) ===== */
const L = {
  wid:"m10", key:"ggk-w-m10:v1", nr:"M10", titel:"Die Saat der Gewalt 1918–1922", unter:"Ein Film – und was er über die Köpfe der Zeit zeigt", dauer:60, block:"d",
  /* Zeichen der Stunde: ein Samenkorn, aus dem ein Riss wächst */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><path d="M4 26h26" stroke="#24221F" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="17" cy="26" rx="4" ry="2.6" fill="#9B402D"/><path d="M17 23l-3-6 4-4-3-7" fill="none" stroke="#24221F" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 17l-5-2M18 13l5-1" stroke="#24221F" stroke-width="2" stroke-linecap="round"/></svg>`,
  frage:"Welche Erfahrungen von Gewalt prägen die Menschen der frühen Republik – und was wächst daraus?",
  deck:{ dauer:"60 Minuten · davon 45 Minuten Film", jahr:"1918–1922", hier:[1, 2, 3],
    satz:"Der Krieg ist zu Ende, die Gewalt nicht. Um zu verstehen, was die Menschen der Zeit umtreibt, musst du dir ihre Erfahrungen vor Augen führen.",
    belastend:"Der Film zeigt Aufnahmen von Krieg und politischer Gewalt und spricht über antisemitische Hetze. Er ist ab 12 Jahren freigegeben. Du darfst jederzeit aussetzen und mit deiner Lehrkraft sprechen.",
    ziele:["Erfahrungen von Gewalt in den Jahren 1918 bis 1922 nennen,", "erklären, wie Hetze und Schuldzuweisungen die Stimmung nach dem Versailler Vertrag ausnutzen,", "das kollektive Gedächtnis der Weimarer Republik um einen Eintrag ergänzen."] },
  blatt:[
    { id:"vorher", nr:"1", kurz:"Vor dem Film", name:"Vor dem Film: erinnern und vermuten", form:"Allein · ohne Heft", min:4, frei:"offen" },
    { id:"film", nr:"2", kurz:"Film", name:"Der Film: Saat der Gewalt 1918–1922", form:"Frei wählbar", min:45, frei:"antwort", nach:"vorher", fehlt:"Halte erst in Auftrag 1 deine Vermutung fest." },
    { id:"gedaechtnis", nr:"3", kurz:"Gedächtnis", name:"Das kollektive Gedächtnis ergänzen", form:"Allein", min:6, frei:"antwort", nach:"film", fehlt:"Sieh erst den Film und mach dir Notizen (Auftrag 2)." },
    { id:"landkarte", nr:"L", kurz:"Landkarte", name:"Landkarte: Was für eine Darstellung ist der Film?", form:"Allein", min:5, frei:"antwort", nach:"film", fehlt:"Sieh erst den Film (Auftrag 2)." },
    { id:"schreiben", nr:"4", kurz:"Schreibauftrag", name:"Schreibauftrag", form:"Allein · auch als Hausaufgabe", min:12, frei:"ansage", marke:"wie in der Klassenarbeit", gleich:"Du erläuterst, wie die Gewalt der Jahre 1918 bis 1922 die Republik belastete." },
    { id:"zusammenfassung", nr:"Z", kurz:"Zusammenfassung", name:"Zusammenfassung", form:"Zum Abheften", min:2, frei:"antwort", nach:"schreiben", fehlt:"Die Zusammenfassung öffnet sich nach deinem Text in Auftrag 4.", kopf:"Zum Abheften" },
  ],
  breit:["lehrkraft"],
  loesch:"Deine Vermutung, deine Notizen zum Film, dein Eintrag ins kollektive Gedächtnis, dein Text und dein Satz für den roten Faden werden auf diesem Gerät entfernt.",
  init:() => ({ ab:{}, saat:"", n:{}, saat2:"", justiz:"", mittel:"" }),
  erledigt:{
    vorher:() => [0,1].every(i => (S.ab.auf || {})[i]) && lang("saat", 15), film:() => [0,1,2,3].filter(r => lang(`n.${r}.0`, 8)).length >= 3,
    gedaechtnis:() => lang("kg", 20) && lang("saat2", 15), landkarte:() => !!S.lk.ok, schreiben:() => schreibFertig(),
  },
  fadenAnf:["Eine Demokratie tut sich schwer, sich zu verteidigen, wenn Gewalt", "Aus den Jahren 1918 bis 1922 wächst"],
};
const FILM10 = "https://www.zdf.de/play/dokus/krieg-und-holocaust-der-deutsche-abgrund-100/krieg-und-holocaust-der-deutsche-abgrund-saat-der-gewalt-1918-1922-100";
/* Zeitleiste zur Orientierung: allgemein bekannte Daten; nicht alle kommen im Film vor (siehe Lehrkraftbereich). */
const GEWALT = [
  ["Jan. 1919","Aufstand in Berlin","Freikorps schlagen den Januaraufstand nieder. Am 15. Januar ermorden Soldaten Rosa Luxemburg und Karl Liebknecht.","rot"],
  ["März 1920","Kapp-Putsch","Rechte Militärs putschen gegen die Regierung. Ein Generalstreik lässt den Putsch scheitern.",""],
  ["26.8.1921","Mord an Erzberger","Matthias Erzberger (Zentrum) hatte 1918 den Waffenstillstand unterzeichnet. Rechtsterroristen erschießen ihn.","rot"],
  ["24.6.1922","Mord an Rathenau","Außenminister Walther Rathenau wird in Berlin von Rechtsterroristen ermordet.","rot"],
  ["Okt. 1922","Italien","Mussolinis Faschisten übernehmen in Italien die Macht – ein Vorbild für Hitler.",""],
];

function start(){ return deckblatt(); }
function vorher(){
  return `${auftrag("Allein · 4 Minuten · ohne Heft", "Erst erinnern, dann vermuten", "Beantworte die zwei Fragen aus dem Kopf und deck dann auf. Der Film heißt „Saat der Gewalt“. Vermute: Was wird in den Jahren 1918 bis 1922 gesät – und von wem?")}
  ${abrufen("ab", [
    ["Was behauptet die Dolchstoßlegende (M8.1)?", "Das Heer sei „im Felde unbesiegt“ geblieben. Schuld an der Niederlage seien Demokrat*innen und Jüdinnen und Juden. Das ist falsch: Die Oberste Heeresleitung selbst wollte den Waffenstillstand."],
    ["Was heißt: Die Justiz ist „auf dem rechten Auge blind“ (M8.1)?", "Straftaten von Rechten werden deutlich milder beurteilt als Straftaten von Linken."],
  ])}
  ${textfeld("saat", "Meine Vermutung: Was wird gesät – und von wem?", { rows:3, zaehl:false, anfaenge:["Gesät wird", "Verantwortlich dafür sind"] })}`;
}
function film(){
  return `${belastend("Der Film zeigt Aufnahmen von Krieg und politischer Gewalt und spricht über antisemitische Hetze. Du musst nicht alles ansehen. Sag Bescheid, wenn du eine Pause brauchst.")}
  ${auftrag("Frei wählbar · 45 Minuten", "Der Film", "Sieh dir den Film an. Mach dir zu den vier Fragen Stichpunkte – keine ganzen Sätze. Du kannst den Film jederzeit anhalten und zurückspringen.")}
  ${filmKarte({ art:"Dokumentation", dauer:"45 Minuten · ab 12 Jahren", titel:"Krieg und Holocaust – Der deutsche Abgrund: Saat der Gewalt 1918–1922", text:"Erste Folge einer Reihe von ZDFinfo. Der Film ist eine Darstellung von heute: Er wählt aus, ordnet und deutet.", nachweis:"ZDF; Link aus dem Unterrichtsheft, M10. Laut ZDF verfügbar bis 7. Mai 2031.", url:FILM10, wo:"zdf.de" })}
  ${tabelle("n", ["Darauf achtest du", "Meine Stichpunkte"], ["Welche Folgen des Krieges und des Versailler Vertrags zeigt der Film?", "Wer hetzt – gegen wen, und mit welchen Behauptungen?", "Welche Gewalt zeigt der Film? Wer übt sie aus, wen trifft sie?", "Was geschieht 1922 in Italien – und was hat das mit Deutschland zu tun?"], { rows:3 })}
  <p class="hinweis">Mindestens drei der vier Felder brauchst du für Auftrag 3.</p>`;
}
function gedaechtnis(){
  return `${auftrag("Allein · 6 Minuten", "Das kollektive Gedächtnis ergänzen", "Arbeite das kollektive Gedächtnis der Weimarer Republik weiter aus: Was aus diesen Jahren setzt sich in den Köpfen fest? Vergleiche danach mit deiner Vermutung aus Auftrag 1.")}
  ${zeitleiste(GEWALT, { klasse:"gross" })}
  <p class="quelle">Zeitleiste zur Orientierung. Nicht alle Ereignisse kommen im Film vor.</p>
  <div class="ab-zwei gleich" style="margin-top:1rem"><div>${kgFeld("Mein Eintrag: Gewalt auf den Straßen, Morde an Politikern (1918–1922)", "Was bleibt aus diesen Jahren im Gedächtnis der Menschen – und wie wirkt es weiter? Zwei bis drei Stichpunkte für das Raster aus M8.1.")}</div>
  <div>${textfeld("saat2", "Was wurde gesät – und was wächst daraus?", { rows:3, zaehl:false, anfaenge:["Gesät wurde", "Daraus wächst", "Meine Vermutung war"] })}
  <p class="hinweis">Deine Vermutung aus Auftrag 1: ${S.saat ? "„" + esc(S.saat) + "“" : "noch offen"}</p></div></div>
  ${wissen("„Auf dem rechten Auge blind“ – nachgezählt", `<p>Der Mathematiker Emil Julius Gumbel untersuchte, wie Gerichte alle politischen Morde seit der Revolution vom November 1918 verfolgten. Sein Ergebnis von 1921 und 1922: Die weit überwiegende Zahl der Morde ging von Rechten aus. Sie wurden wesentlich milder bestraft als Morde von Linken – oder blieben häufig ganz ohne Strafe.</p><p class="quelle">Nach: Universität Heidelberg, Journal@RupertoCarola, M. Mohr: „Krieg gegen einen Pazifisten“. Gumbels Bücher: „Zwei Jahre Mord“ (1921), „Vier Jahre politischer Mord“ (1922).</p>`)}
  ${textfeld("justiz", "Was lernen Täter – und was lernen ihre Opfer – aus solchen Urteilen?", { rows:2, zaehl:false, anfaenge:["Die Täter lernen, dass", "Wer die Republik verteidigt, erfährt"] })}`;
}
function seiteLk(){
  return landkarteL({ teil:"wirkung", frage:"Du hast eine Fernsehdokumentation gesehen. Unter welchen Begriff der Landkarte fällt der Film selbst?",
    lead:"Der Film ist keine Quelle aus der Zeit, sondern eine Darstellung von heute. Vermute: Woran merkst du das beim Zuschauen?", platz:"Man merkt es daran, dass …",
    urteil:{
      "3-1-2":["zentral","Eine Fernsehdokumentation stellt Geschichte außerhalb von Schule und Universität dar. Sie wählt Bilder aus, setzt Musik ein und lässt Fachleute deuten. Das ist Public History – und deshalb prüfst du sie wie jede Darstellung."],
      "3-1-6":["teils","Damit prüfst du, ob der Film stimmt: Wer hat ihn gemacht, welche Belege zeigt er? Gefragt war zuerst, was für eine Art von Darstellung der Film ist."],
      "3-1-4":["teils","Die Reihe versteht sich als „Warnung der Geschichte“ – sie will erinnern. Erinnerungskultur ist der Oberbegriff. Für den Film als Medium gibt es einen genaueren Eintrag."],
      "3-1-1":["teils","Das kollektive Gedächtnis ist dein Werkzeug für den Inhalt: für das, was in den Köpfen der Menschen von damals ist. Gefragt war nach dem Film als Darstellung von heute."],
    },
    bruecke:`<b>Merke:</b> Auch ein Film über Geschichte ist eine Erzählung. Frag: Wer erzählt, mit welchen Mitteln – und was lässt er weg?` })
  + `<div style="margin-top:1.2rem">${textfeld("mittel", "Mit welchen Mitteln erzeugt der Film Wirkung? Nenne zwei.", { rows:2, zaehl:false, anfaenge:["Musik:", "Schnitt und Bilder:", "Fachleute im Gespräch:", "Sprecher*in:"] })}</div>`;
}
L.schreib = {
  vor:"So kann die Aufgabe in der Klassenarbeit stehen: Material, ein Operator, höchstens eine Seite. Hier schreibst du eine halbe Seite.",
  aufgabe:`<b>Erläutern Sie</b>, wie die Gewalt der Jahre 1918 bis 1922 die Weimarer Republik belastete. Beziehen Sie den Begriff „kollektives Gedächtnis“ ein.`,
  material:`<p><b>M1 · Zeitleiste:</b> Januar 1919 Niederschlagung des Aufstands in Berlin, Mord an Rosa Luxemburg und Karl Liebknecht · März 1920 Kapp-Putsch · 26. August 1921 Mord an Matthias Erzberger · 24. Juni 1922 Mord an Walther Rathenau.</p><p><b>M2 · Emil Julius Gumbel (1921/1922):</b> Die weit überwiegende Zahl der politischen Morde ging von Rechten aus; sie wurden wesentlich milder bestraft oder blieben häufig ohne Strafe.</p><p><b>M3:</b> deine Notizen zum Film (Auftrag 2).</p><p class="quelle">M2 nach: Universität Heidelberg, Journal@RupertoCarola, M. Mohr.</p>`,
  woerter:140, min:60,
  stufen:[["Grundlegend","Du nennst Beispiele für Gewalt aus den Jahren 1918 bis 1922 und sagst, dass sie die Republik belastete."],["Sicher","Du zeigst an zwei Beispielen, wer Gewalt ausübte und wie der Staat darauf antwortete, und erklärst die Folge für das Vertrauen in die Republik."],["Souverän","Du erklärst mit dem Begriff kollektives Gedächtnis, wie Gewalt, Hetze und milde Urteile sich als Erfahrung festsetzen und späteres Handeln lenken."]],
  inhalt:[["Gewalt:","Niederschlagung von Aufständen durch Freikorps; Putsch von rechts (1920); Morde an Politikern der Republik (Erzberger 1921, Rathenau 1922)."],
    ["Antwort des Staates:","Die Justiz urteilt bei Tätern von rechts wesentlich milder; viele Morde bleiben ohne Strafe (Gumbel)."],
    ["Hetze:","Schuld an Niederlage und Vertrag wird Demokrat*innen und Jüdinnen und Juden zugeschoben (Dolchstoßlegende)."],
    ["Kollektives Gedächtnis:","Gewalt wird als Mittel der Politik erinnert und gewöhnlich; die Republik erscheint als schwach oder schuldig; ihre Verteidiger*innen erfahren, dass der Staat sie nicht schützt."]],
};
L.zf = {
  frage:L.frage,
  kern:"Nach dem Krieg geht die Gewalt weiter: Aufstände werden blutig niedergeschlagen, Rechte putschen und ermorden Politiker der Republik. Die Justiz bestraft Täter von rechts milde. Hetzer schieben die Schuld an Niederlage und Versailler Vertrag den Demokrat*innen und den Jüdinnen und Juden zu. Diese Erfahrungen setzen sich im kollektiven Gedächtnis fest.",
  begriffe:[["Freikorps","Verbände ehemaliger Soldaten, die nach 1918 gegen Aufstände eingesetzt werden; viele sind Gegner der Republik."],["Kapp-Putsch","Putsch rechter Militärs im März 1920; scheitert am Generalstreik."],["Politischer Mord","Mord an einem Menschen wegen seiner politischen Haltung oder seines Amtes."],["Dolchstoßlegende","falsche Erzählung, Demokrat*innen und Jüdinnen und Juden seien schuld an der Niederlage."],["Antisemitismus","Feindschaft gegen Jüdinnen und Juden."],["Public History","Geschichte außerhalb von Schule und Universität, zum Beispiel im Fernsehen."]],
  abfolge:{ titel:"Gewalt 1918–1922", punkte:GEWALT.map(g => [g[0], g[1] + ": " + g[2]]) },
  lk:{ name:"Public History (3.1.2)", satz:"Public History meint alle Formen, in denen Geschichte außerhalb von Schule und Universität dargestellt wird: in Museen, Gedenkstätten, Filmen, Serien, Computerspielen, Podcasts, Social Media.", beispiel:"Die ZDF-Dokumentation „Saat der Gewalt“ wählt Bilder aus, setzt Musik ein und lässt Fachleute deuten." },
  werkzeug:{ titel:"Einen Geschichtsfilm prüfen", schritte:["Wer hat den Film gemacht – wann, für wen?","Was zeigt er als Beleg (Aufnahmen der Zeit, Dokumente), was ist Deutung (Sprecher*in, Musik, Fachleute)?","Was lässt der Film weg? Mit einer zweiten Darstellung vergleichen."] },
  sonst:"deine Notizen zum Film (Auftrag 2), Emil Julius Gumbels Zählung der politischen Morde (Auftrag 3).",
  mein:[["Mein Eintrag ins kollektive Gedächtnis", "kg"], ["Was gesät wurde", "saat2"]],
};
function zusammenfassung(){ return fadenFeld() + zusammen(); }
const SEITE_FN = { start, vorher, film, gedaechtnis, landkarte:seiteLk, schreiben:schreibauftrag, zusammenfassung, lehrkraft };
weimarStart();
