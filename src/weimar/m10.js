/* ===== M10 · Die Saat der Gewalt 1918–1922 (Heft „Geschichte aktuell 1“, M10) ===== */
const L = {
  wid:"m10", key:"ggk-w-m10:v1", nr:"M10", titel:"Die Saat der Gewalt 1918–1922", unter:"Ein Film – und was er über die Köpfe der Zeit zeigt", dauer:60, block:"d",
  /* Zeichen der Stunde: ein Samenkorn, aus dem ein Riss wächst */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><path d="M4 26h26" stroke="#24221F" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="17" cy="26" rx="4" ry="2.6" fill="#9B402D"/><path d="M17 23l-3-6 4-4-3-7" fill="none" stroke="#24221F" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 17l-5-2M18 13l5-1" stroke="#24221F" stroke-width="2" stroke-linecap="round"/></svg>`,
  frage:"Der Krieg ist zu Ende, die Gewalt nicht: Musste aus der „Saat der Gewalt“ von 1918 bis 1922 die Diktatur wachsen – oder war die Republik noch offen?",
  blick:{ name:"Geschichtskultur: ein Film als Darstellung", anker:"3-1-2", tut:"Du lernst die Jahre 1918 bis 1922 durch eine Fernsehdokumentation von heute kennen – und prüfst den Film zugleich als Erzählung.", fehlt:"Was fehlt: alles, was der Film nicht ausgewählt hat – der Alltag ohne Gewalt und die Menschen, die die Republik aufbauten. Ein Film mit diesem Titel sucht nach Gewalt." },
  pole:{ frage:"Musste aus der Gewalt der Jahre 1918 bis 1922 die Diktatur wachsen?", links:"Nein, es war noch alles offen", rechts:"Ja, das musste so kommen" },
  deck:{ dauer:"60 Minuten · davon 45 Minuten Film", jahr:"1918–1922", hier:[1, 2, 3],
    satz:"Der Krieg ist zu Ende, die Gewalt nicht. Um zu verstehen, was die Menschen der Zeit umtreibt, musst du dir ihre Erfahrungen vor Augen führen.",
    belastend:"Der Film zeigt Aufnahmen von Krieg und politischer Gewalt und spricht über antisemitische Hetze. Er ist ab 12 Jahren freigegeben. Du darfst jederzeit aussetzen und mit deiner Lehrkraft sprechen.",
    ziele:["Erfahrungen von Gewalt in den Jahren 1918 bis 1922 nennen,", "erklären, wie Hetze und Schuldzuweisungen die Stimmung nach dem Versailler Vertrag ausnutzen,", "das kollektive Gedächtnis der Weimarer Republik um einen Eintrag ergänzen."] },
  blatt:[
    { id:"vorher", nr:"1", kurz:"Vor dem Film", name:"Vor dem Film: erinnern und vermuten", form:"Allein · ohne Heft", min:5, frei:"offen" },
    { id:"film", nr:"2", kurz:"Film", name:"Der Film: Saat der Gewalt 1918–1922", form:"Frei wählbar", min:45, frei:"antwort", nach:"vorher", fehlt:"Halte erst in Auftrag 1 deine Vermutung fest." },
    { id:"gedaechtnis", nr:"3", kurz:"Gedächtnis", name:"Das kollektive Gedächtnis ergänzen", form:"Allein", min:6, frei:"antwort", nach:"film", fehlt:"Sieh erst den Film und mach dir Notizen (Auftrag 2)." },
    { id:"landkarte", nr:"L", kurz:"Landkarte", name:"Landkarte: Was erzählt schon der Titel?", form:"Allein", min:7, frei:"antwort", nach:"film", fehlt:"Sieh erst den Film (Auftrag 2)." },
    { id:"schreiben", nr:"4", kurz:"Schreibauftrag", name:"Schreibauftrag", form:"Allein · auch als Hausaufgabe", min:12, frei:"ansage", marke:"wie in der Klassenarbeit", gleich:"Du erläuterst, wie die Gewalt der Jahre 1918 bis 1922 die Republik belastete, und bewertest die Urteile der Justiz." },
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
  return landkarteL({ teil:"prinzip", frage:"Der Film heißt „Saat der Gewalt“. Schon der Titel erzählt eine Geschichte. Welches Prinzip der Landkarte steckt in diesem Titel?",
    lead:"Eine Saat geht auf, etwas wächst, am Ende steht eine Ernte. Vermute: Was sagt der Titel über die Jahre 1918 bis 1922 – noch bevor der Film beginnt?", platz:"Der Titel sagt, dass …",
    urteil:{
      "2-1-6":["zentral","Der Titel verbindet einzelne Ereignisse zu einem Zusammenhang mit Anfang und Ende: Aus einer Saat wächst etwas. So bekommen Morde, Putsche und Hetze eine gemeinsame Bedeutung. Das ist Narrativität: Geschichte gibt es nur als Erzählung. Besprecht: Welches Ende hat diese Erzählung im Blick?"],
      "2-1-1":["zentral","Von einer „Saat“ spricht nur, wer die Ernte kennt. Der Film blickt von heute aus zurück und weiß, was 1933 kam. Die Menschen von 1922 wussten es nicht. Besprecht: Was am Titel ist Rückblick – und was ist Erzählung (Narrativität)?"],
      "2-1-4":["teils","Der Film wählt aus: Gewalt, Hetze, Putsche. Vom Alltag der meisten Menschen und vom Aufbau der Republik zeigt er wenig. Die Auswahl folgt aber aus der Geschichte, die der Titel erzählen will."],
      "2-1-7":["teils","Der Film setzt Bilder, Musik und Aussagen von Fachleuten zu einer Geschichte zusammen – richtig. Der Titel zeigt noch genauer, wie: als Erzählung mit Anfang und Ende."],
      "2-1-8":["teils","Der Film ist für ein Publikum von heute gemacht, das von Diktatur und Holocaust weiß. Das prägt ihn. Gefragt war aber, was schon im Titel steckt."],
      "2-1-2":["teils","Jede Darstellung hat eine Sichtweise, auch dieser Film. Der Titel zeigt aber vor allem die Form: eine Erzählung, die auf ein Ende zuläuft."],
    },
    bruecke:`<b>Merke:</b> Eine Erzählung braucht ein Ende – und das Ende färbt den Anfang. Frag bei jedem Film über Geschichte: Welche Geschichte erzählt schon der Titel? Besprecht: Wie könnte ein Titel für dieselben Jahre heißen, der offenlässt, wie es weitergeht?` })
  + `<div style="margin-top:1.2rem">${textfeld("mittel", "Mit welchen Mitteln erzeugt der Film Wirkung? Nenne zwei.", { rows:2, zaehl:false, anfaenge:["Musik:", "Schnitt und Bilder:", "Fachleute im Gespräch:", "Sprecher*in:"] })}</div>`;
}
L.schreib = {
  vor:"So kann die Aufgabe in der Klassenarbeit stehen: Material, zwei Operatoren, höchstens eine Seite. Hier schreibst du eine halbe Seite. Bei b) ist ein Werturteil gefragt: Nenne den Maßstab, an dem du misst.",
  aufgabe:`<b>a) Erläutern Sie</b> mithilfe des Begriffs „kollektives Gedächtnis“, wie die Gewalt der Jahre 1918 bis 1922 die Weimarer Republik belastete.<br><b>b) Bewerten Sie</b> die Urteile der Justiz (M2). Legen Sie Ihren Maßstab offen.`,
  material:`<p><b>M1 · Zeitleiste:</b> Januar 1919 Niederschlagung des Aufstands in Berlin, Mord an Rosa Luxemburg und Karl Liebknecht · März 1920 Kapp-Putsch · 26. August 1921 Mord an Matthias Erzberger · 24. Juni 1922 Mord an Walther Rathenau.</p><p><b>M2 · Emil Julius Gumbel (1921/1922):</b> Die weit überwiegende Zahl der politischen Morde ging von Rechten aus; sie wurden wesentlich milder bestraft oder blieben häufig ohne Strafe.</p><p><b>M3:</b> deine Notizen zum Film (Auftrag 2).</p><p class="quelle">M2 nach: Universität Heidelberg, Journal@RupertoCarola, M. Mohr.</p>`,
  woerter:140, min:60,
  stufen:[["Grundlegend","Du nennst Beispiele für Gewalt aus den Jahren 1918 bis 1922 und sagst, dass sie die Republik belastete."],["Sicher","Du zeigst an zwei Beispielen, wer Gewalt ausübte und wie der Staat darauf antwortete, und erklärst die Folge für das Vertrauen in die Republik. Du bewertest die Urteile der Justiz und nennst deinen Maßstab."],["Souverän","Du erklärst mit dem Begriff kollektives Gedächtnis, wie Gewalt, Hetze und milde Urteile sich als Erfahrung festsetzen und späteres Handeln lenken. Du bewertest die Urteile der Justiz an einem Maßstab, den du nennst, und trennst dabei Erklären von Rechtfertigen."]],
  inhalt:[["Gewalt:","Niederschlagung von Aufständen durch Freikorps; Putsch von rechts (1920); Morde an Politikern der Republik (Erzberger 1921, Rathenau 1922)."],
    ["Antwort des Staates:","Die Justiz urteilt bei Tätern von rechts wesentlich milder; viele Morde bleiben ohne Strafe (Gumbel)."],
    ["Hetze:","Schuld an Niederlage und Vertrag wird Demokrat*innen und Jüdinnen und Juden zugeschoben (Dolchstoßlegende)."],
    ["Kollektives Gedächtnis:","Gewalt wird als Mittel der Politik erinnert und gewöhnlich; die Republik erscheint als schwach oder schuldig; ihre Verteidiger*innen erfahren, dass der Staat sie nicht schützt."],
    ["Bewertung:","Es zählt der offengelegte Maßstab – zum Beispiel: Vor dem Gesetz sind alle gleich; der Staat schützt das Leben aller. Erklären (viele Richter stammen aus dem Kaiserreich) ist nicht dasselbe wie rechtfertigen."]],
};
L.zf = {
  frage:L.frage,
  kern:"Nach dem Krieg geht die Gewalt weiter: Aufstände werden blutig niedergeschlagen, Rechte putschen und ermorden Politiker der Republik. Die Justiz bestraft Täter von rechts milde. Hetzer schieben die Schuld an Niederlage und Versailler Vertrag den Demokrat*innen und den Jüdinnen und Juden zu. Diese Erfahrungen setzen sich im kollektiven Gedächtnis fest.",
  begriffe:[["Freikorps","Verbände ehemaliger Soldaten, die nach 1918 gegen Aufstände eingesetzt werden; viele sind Gegner der Republik."],["Kapp-Putsch","Putsch rechter Militärs im März 1920; scheitert am Generalstreik."],["Politischer Mord","Mord an einem Menschen wegen seiner politischen Haltung oder seines Amtes."],["Dolchstoßlegende","falsche Erzählung, Demokrat*innen und Jüdinnen und Juden seien schuld an der Niederlage."],["Antisemitismus","Feindschaft gegen Jüdinnen und Juden."],["Public History","Geschichte außerhalb von Schule und Universität, zum Beispiel im Fernsehen."]],
  abfolge:{ titel:"Gewalt 1918–1922", punkte:GEWALT.map(g => [g[0], g[1] + ": " + g[2]]) },
  lk:{ name:"Narrativität (2.1.6)", satz:"Geschichte gibt es nur als Erzählung. Eine historische Erzählung verbindet Ereignisse zu einem zeitlichen Zusammenhang mit Anfang, Wendepunkten und Ende und gibt ihnen so Bedeutung.", beispiel:"„Saat der Gewalt“: Der Titel verbindet Morde, Putsche und Hetze zu einer Geschichte, die auf ein Ende zuläuft. Wer das Ende kennt, sieht im Anfang die Saat." },
  werkzeug:{ titel:"Einen Geschichtsfilm prüfen", schritte:["Wer hat den Film gemacht – wann, für wen?","Was zeigt er als Beleg (Aufnahmen der Zeit, Dokumente), was ist Deutung (Sprecher*in, Musik, Fachleute)?","Was lässt der Film weg? Mit einer zweiten Darstellung vergleichen."] },
  sonst:"deine Notizen zum Film (Auftrag 2), Emil Julius Gumbels Zählung der politischen Morde (Auftrag 3).",
  mein:[["Mein Eintrag ins kollektive Gedächtnis", "kg"], ["Was gesät wurde", "saat2"]],
};
function zusammenfassung(){ return fadenFeld() + zusammen(); }
const SEITE_FN = { start, vorher, film, gedaechtnis, landkarte:seiteLk, schreiben:schreibauftrag, zusammenfassung, lehrkraft };
weimarStart();
