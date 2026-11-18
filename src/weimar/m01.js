/* ===== M1 · Mein Leben im Jahr 1917 – Was hätte ich gedacht? (Heft „Geschichte aktuell 1“, M1) ===== */
const L = {
  wid:"m01", key:"ggk-w-m01:v1", nr:"M1", titel:"Mein Leben im Jahr 1917 – Was hätte ich gedacht?", unter:"Einstieg mit dem Film „Im Westen nichts Neues“", dauer:90, block:"a",
  /* Zeichen der Stunde: ein aufgeschlagenes Tagebuch */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><path d="M17 9c-3-2-7-3-11-2v19c4-1 8 0 11 2 3-2 7-3 11-2V7c-4-1-8 0-11 2z" fill="none" stroke="#24221F" stroke-width="2.4" stroke-linejoin="round"/><path d="M17 9v19" stroke="#9B402D" stroke-width="2.4"/></svg>`,
  frage:"Du bist 18 Jahre alt und lebst 1917 in Deutschland: Was hättest du gedacht?",
  blick:{ name:"Blick aus der Nähe: ein einzelner Mensch", anker:"2-3-6", tut:"Du folgst einem jungen Menschen durch das Jahr 1917. So arbeitet die Mikrogeschichte – nur ist deine Person ausgedacht.", fehlt:"Was fehlt: die großen Zusammenhänge. Warum es zum Krieg kam, wer entschied und was an anderen Orten geschah, sieht man aus der Nähe kaum. Das klärt M2." },
  deck:{ dauer:"Doppelstunde · dazu der Film", jahr:"1917", hier:[0],
    satz:"Bevor wir Ursachen und Daten ordnen, fragen wir: Wie fühlte sich dieser Krieg für Menschen an, die so alt waren wie du?",
    belastend:"Der Film „Im Westen nichts Neues“ zeigt Kriegsgewalt sehr direkt. Du darfst jederzeit wegsehen, hinausgehen und mit deiner Lehrkraft sprechen.",
    bild:{ datei:"heft-m01-film-paul.jpg", alt:"Szenenbild aus dem Spielfilm: ein junger Soldat mit Stahlhelm und verdrecktem Gesicht, hinter ihm weitere Soldaten.", text:"Szenenbild aus dem Spielfilm „Im Westen nichts Neues“ (2022) – eine Darstellung von heute, kein Foto von damals.", nachweis:"Bild aus dem Unterrichtsheft, M1. Nachweis offen." },
    ziele:["beschreiben, wie junge Menschen den Ersten Weltkrieg erlebt haben könnten,", "unterscheiden: Was zeigt ein Spielfilm über die Vergangenheit – und was nicht?", "den Unterschied zwischen Erleben (M1) und Analysieren (M2) benennen."] },
  blatt:[
    { id:"rolle", nr:"1", kurz:"Rollentausch", name:"Rollentausch: Du bist 18 im Jahr 1917", form:"Allein", min:8, frei:"offen" },
    { id:"vorfilm", nr:"2", kurz:"Vor dem Film", name:"Vor dem Film: ein Werk, viele Urteile", form:"Plenum, dann allein", min:7, frei:"offen" },
    { id:"film", nr:"3", kurz:"Beim Film", name:"Beim Film: Paul vorher und nachher", form:"Plenum · allein notieren", min:45, frei:"ansage", gleich:"Ihr seht den Film (oder einen Ausschnitt). Du beobachtest Paul: seine Vorstellung vom Krieg, die Wirklichkeit und was sich in ihm verändert." },
    { id:"gefuehl", nr:"4", kurz:"Ein Wort", name:"Nachbesprechung im Empfindungs-Modus", form:"Allein · zu zweit · Plenum", min:8, frei:"ansage", gleich:"Nach dem Film geht es zuerst nicht um Fakten, sondern um ein Wort für dein Gefühl." },
    { id:"tagebuch", nr:"5", kurz:"Tagebuch", name:"Tagebucheintrag 1917", form:"Allein", min:12, frei:"antwort", nach:"gefuehl", fehlt:"Halte erst in Auftrag 4 dein Wort und deine Begründung fest." },
    { id:"landkarte", nr:"L", kurz:"Landkarte", name:"Landkarte: Was ist dieser Film?", form:"Allein", min:6, frei:"antwort", nach:"tagebuch", fehlt:"Schreib erst deinen Tagebucheintrag in Auftrag 5." },
    { id:"schreiben", nr:"6", kurz:"Schreibauftrag", name:"Schreibauftrag", form:"Allein", min:15, frei:"ansage", marke:"wie in der Klassenarbeit", gleich:"Du beurteilst, was ein Spielfilm über die Vergangenheit zeigen kann." },
    { id:"zusammenfassung", nr:"Z", kurz:"Zusammenfassung", name:"Zusammenfassung", form:"Zum Abheften", min:4, frei:"antwort", nach:"schreiben", fehlt:"Die Zusammenfassung öffnet sich nach deinem Text in Auftrag 6.", kopf:"Zum Abheften" },
  ],
  breit:["lehrkraft"],
  loesch:"Deine Antworten, dein Wort, dein Tagebucheintrag, dein Text und dein Satz für den roten Faden werden auf diesem Gerät entfernt.",
  init:() => ({ r:{ eltern:"", bruder:"", fehlt:"", erlebt:"" }, warum:"", p:{ vor:"", real:"", innen:"" }, wort:"", wgrund:"", tb:"" }),
  erledigt:{
    rolle:() => lang("r.eltern", 5) && lang("r.fehlt", 5), vorfilm:() => lang("warum"), film:() => lang("p.vor") && lang("p.real") && lang("p.innen"),
    gefuehl:() => lang("wort", 2) && lang("wgrund"), tagebuch:() => woerter(S.tb) >= 40, landkarte:() => !!S.lk.ok, schreiben:() => schreibFertig(),
  },
  fadenAnf:["Der Film zeigt den Krieg als", "Ob ein Film Geschichte zeigt, hängt davon ab,"],
};
const STATIONEN = [["1929","Der Roman","Erich Maria Remarques Roman erscheint. Pazifist*innen feiern ihn als eindringlichen Text gegen den Krieg. Nationalisten bekämpfen ihn als „wehrkraftzersetzend“."],
  ["1930","Der erste Film","Die Verfilmung löst heftige Proteste der Nationalsozialisten aus. Sie wird verboten und später nur stark gekürzt gezeigt."],
  ["2022","Der neue Film","Die neue Verfilmung gilt international als eindrucksvoller Antikriegsfilm. In Deutschland wird sie auch kritisiert: wegen historischer Ungenauigkeiten."],
  ["2023","Vier Oscars","Neun Nominierungen, vier Auszeichnungen: Bester internationaler Film, Kamera, Filmmusik, Szenenbild."]];

function start(){ return deckblatt(); }
function rolle(){
  return `${auftrag("Allein · 8 Minuten", "Rollentausch", "Stell dir vor, du bist 18 Jahre alt und lebst 1917 in Deutschland. Der Krieg dauert seit drei Jahren. Beantworte die vier Fragen so, wie du es dir vorstellst. Du darfst vermuten – geprüft wird später.")}
  <p class="hinweis">${status("", "ausgedachter Fall")} Du schreibst über eine Person, die es so nicht gegeben hat. Sie hilft dir, Fragen an die Zeit zu stellen.</p>
  <div class="w-rolle">
    <div>${textfeld("r.eltern", "Was machen deine Eltern?", { rows:3, zaehl:false })}</div>
    <div>${textfeld("r.bruder", "Was macht dein ältester Bruder?", { rows:3, zaehl:false })}</div>
    <div>${textfeld("r.fehlt", "Was fehlt dir?", { rows:3, zaehl:false })}</div>
    <div>${textfeld("r.erlebt", "Was ist in deinem Leben schon geschehen? Welche Ereignisse hat deine Gesellschaft erlebt?", { rows:3, zaehl:false })}</div>
  </div>
  <p class="hinweis">Hebe deine Antworten auf. In M2 und M4 prüfst du, was davon zutrifft.</p>`;
}
function vorfilm(){
  return `${kopfpaar(auftrag("Plenum · 4 Minuten, dann allein · 3 Minuten", "Ein Werk, viele Urteile", "„Im Westen nichts Neues“ gibt es als Roman und in mehreren Verfilmungen. Lest die vier Stationen. Vermute dann: Warum wurde dasselbe Werk von den einen gefeiert und von den anderen bekämpft?"), { datei:"heft-m01-film-unterstand.jpg", alt:"Szenenbild aus dem Spielfilm: junge Soldaten sitzen dicht gedrängt in einem dunklen Unterstand.", text:"Szenenbild aus dem Spielfilm von 2022.", nachweis:"Bild aus dem Unterrichtsheft, M1. Nachweis offen." })}
  ${zeitleiste(STATIONEN.map(s => [s[0], s[1], s[2]]))}
  <p class="quelle">Nach dem Text „Rezeptionsgeschichte des Films“ im Unterrichtsheft, M1; die Jahreszahlen 1929 und 1930 sind ergänzt.</p>
  ${wissen("Darstellung, keine Quelle", `<p>Der Film von 2022 ist eine <b>Darstellung</b>: Menschen von heute erzählen vom Krieg. Er ist keine <b>Quelle</b> aus dem Jahr 1917. Er kann zeigen, wie sich der Krieg angefühlt haben könnte – aber er wählt aus, verdichtet und erfindet Szenen.</p>`)}
  ${textfeld("warum", "Meine Vermutung: Warum wurde dasselbe Werk gefeiert und bekämpft?", { rows:2, zaehl:false, anfaenge:["Gefeiert wurde es, weil", "Bekämpft wurde es, weil"] })}`;
}
function film(){
  return `${auftrag("Plenum · Film, allein notieren", "Paul vorher und nachher", "Beobachte Paul Bäumer. Notiere in Stichworten. Du kannst während des Films tippen oder mit dem Stift schreiben – oder erst in der Pause.")}
  ${belastend("Der Film zeigt Kriegsgewalt sehr direkt. Du darfst jederzeit wegsehen, hinausgehen und mit deiner Lehrkraft sprechen.")}
  <div class="w-karten k3">
    <article class="w-kk blau"><p class="kennung">vorher</p><h3>Was hat Paul sich vor dem Krieg vorgestellt?</h3>${textfeld("p.vor", "Stichworte", { rows:5, zaehl:false })}</article>
    <article class="w-kk rot"><p class="kennung">an der Front</p><h3>Was erlebt er in der Realität?</h3>${textfeld("p.real", "Stichworte", { rows:5, zaehl:false })}</article>
    <article class="w-kk grau"><p class="kennung">in ihm</p><h3>Was ändert sich innen – in seinem Gefühl, seinem Blick?</h3>${textfeld("p.innen", "Stichworte", { rows:5, zaehl:false })}</article>
  </div>
  ${hilfe("Warum sehen wir einen Film und lesen keinen Text dazu?", `<p>Ein Film macht die Lebenswelt junger Soldaten anschaulich: Bilder, Geräusche und Musik verdichten, was Texte nur beschreiben. Angst, Gruppendruck oder Überforderung werden so deutlicher, und ein Gefühl für „die Zeit“ entsteht. Genau deshalb fragen wir danach auch: Was davon ist belegt, was ist Gestaltung?</p><p class="quelle">Nach dem Unterrichtsheft, M1.</p>`)}`;
}
function gefuehl(){
  const hat = lang("wort", 2);
  return `${auftrag("Allein · 2 Minuten, zu zweit · 3 Minuten, Plenum · 3 Minuten", "Empfindungs-Modus", "Hier geht es zuerst nicht um Fakten, sondern darum, was der Film mit dir gemacht hat. Schreib ein Wort für das Gefühl, das du nach dem Film hattest. Tauscht euch zu zweit aus und begründet kurz. Danach sammelt ihr die Wörter an der Tafel in einer Wortwolke.")}
  <div class="ab-zwei gleich"><div>${eingabe("wort", "Mein Wort", "ein einziges Wort")}
  <div class="reihe nodruck"><button type="button" class="btn dunkel" data-akt="wortgross" ${hat ? "" : "disabled"}>Mein Wort groß zeigen</button><span class="hinweis">Auf Ansage: iPad hochhalten. Es wird nichts übertragen.</span></div></div>
  <div>${textfeld("wgrund", "Warum dieses Wort? (nach dem Gespräch zu zweit)", { rows:3, zaehl:false, anfaenge:["Ich habe dieses Wort gewählt, weil", "Die Szene, die dazu gehört, ist"] })}</div></div>
  <p class="hinweis">Regel für das Gespräch: Jedes Wort darf stehen bleiben. Ihr fragt nach, ihr bewertet nicht.</p>`;
}
function tagebuch(){
  const w = woerter(S.tb);
  return `${auftrag("Allein · 12 Minuten", "Tagebucheintrag", "Schreib einen kurzen Tagebucheintrag zu der Frage: Mein Leben im Jahr 1917 – was hätte ich gedacht? Nutze deine Antworten aus Auftrag 1 und deine Beobachtungen aus dem Film.")}
  <div class="ab-zwei"><div>${textfeld("tb", "1917. Liebes Tagebuch,", { rows:10, ziel:"Ziel: 80 bis 120 Wörter", anfaenge:["Seit drei Jahren ist Krieg, und", "Am meisten fehlt mir", "Ich frage mich, ob"] })}</div>
  <div><div class="karte"><p class="kennung">Aus Auftrag 1</p><p class="mein ${S.r.fehlt ? "" : "leer"}">${esc(S.r.fehlt || "noch nichts notiert")}</p></div>
  <div class="karte"><p class="kennung">Aus dem Film: Was sich in Paul verändert</p><p class="mein ${S.p.innen ? "" : "leer"}">${esc(S.p.innen || "noch nichts notiert")}</p></div>
  <p class="hinweis" style="margin-top:.7rem">${w >= 40 ? "Gut. Die Landkarte ist jetzt offen." : "Ab etwa 40 Wörtern öffnet sich Auftrag L."}</p></div></div>`;
}
function seiteLk(){
  return landkarteL({ teil:"wirkung", frage:"Ein Film von 2022 erzählt vom Krieg der Jahre 1917 und 1918 – und Millionen Menschen sehen ihn. Mit welchem Begriff der Landkarte lässt sich am besten beschreiben, was dieser Film ist?",
    heft:"Was für eine Geschichte (Form der Geschichtsschreibung) wird hier beschrieben? Worin besteht der Unterschied zu M1? (M2 – die zweite Hälfte beantwortest du in der nächsten Stunde.)",
    lead:"Denk an Auftrag 2: Der Film ist eine Darstellung von heute. Wo begegnet er den Menschen – und was macht er mit ihrem Bild vom Krieg?", platz:"Der Film ist …, weil er …",
    urteil:{
      "3-1-2":["zentral","Der Film stellt Geschichte außerhalb von Schule und Universität dar und erreicht damit sehr viele Menschen. Das ist Public History. Deshalb lohnt die Frage: Was ist belegt, was ist Gestaltung?"],
      "3-1-4":["teils","Der Film prägt mit, wie heute an den Ersten Weltkrieg erinnert wird. Erinnerungskultur ist aber der Oberbegriff für alle Formen des Erinnerns; genauer trifft es der Begriff für Geschichte in Film und Medien."],
      "3-1-1":["teils","Bilder aus solchen Filmen gehen in das gemeinsame Bild vom Krieg ein. Der Begriff beschreibt aber das Erinnern von Gruppen, nicht die Form, in der dieser Film Geschichte zeigt."],
      "3-1-3":["teils","Das Verbot der Verfilmung von 1930 nach den Protesten der Nationalsozialisten war Geschichtspolitik. Der Film von 2022 selbst ist zuerst etwas anderes: Geschichte als Unterhaltung und Kunst für ein großes Publikum."],
      "3-1-6":["teils","Mit kritischer Medienkompetenz prüfst du den Film. Sie ist dein Werkzeug – gefragt war aber, was der Film selbst ist."],
    },
    bruecke:`<b>Merke:</b> M1 lässt dich <i>erleben</i>, wie sich Krieg angefühlt haben könnte. M2 <i>analysiert</i>, wie es zu diesem Krieg kam. Beides ist Geschichte – mit verschiedenen Fragen.` });
}
L.schreib = {
  vor:"So kann die Aufgabe in der Klassenarbeit stehen. Du brauchst dafür deine Notizen zum Film und die vier Stationen aus Auftrag 2.",
  aufgabe:`Der Spielfilm „Im Westen nichts Neues“ (2022) erzählt vom Ersten Weltkrieg.<br><b>a) Erläutern Sie</b> an einer Szene, wie der Film den Krieg darstellt.<br><b>b) Beurteilen Sie</b>, was ein Spielfilm über die Vergangenheit zeigen kann und was nicht.`,
  woerter:130, min:60,
  stufen:[["Grundlegend","Du beschreibst eine Szene und nennst deinen Eindruck. Ob der Film „stimmt“, bleibt offen."],["Sicher","Du erläuterst an der Szene, mit welchen Mitteln der Film wirkt (Bilder, Geräusche, Blick auf einzelne Soldaten), und unterscheidest Darstellung und Quelle."],["Souverän","Du wägst ab: Der Film macht Erfahrung nachfühlbar, wählt aber aus und erfindet. Du nutzt die Rezeptionsgeschichte als Beleg dafür, dass Urteile über das Werk vom Standort abhängen."]],
  inhalt:[["Darstellung:","Blick auf junge Soldaten; Begeisterung am Anfang, dann Angst, Erschöpfung, Tod; Bilder, Geräusche und Musik verdichten."],
    ["Kann zeigen:","wie sich Krieg angefühlt haben könnte; die Kluft zwischen Vorstellung und Wirklichkeit; Fragen an die Zeit."],
    ["Kann nicht:","belegen, was genau geschah – der Film ist eine Darstellung von 2022, keine Quelle; er verdichtet und erfindet Szenen; Kritik wegen historischer Ungenauigkeiten."],
    ["Rezeption:","1929/1930 gefeiert und bekämpft, verboten und zensiert; 2022/2023 international ausgezeichnet – Urteile hängen von Zeit und Standort ab."]],
};
L.zf = {
  frage:L.frage,
  kern:"Wer verstehen will, wie Menschen den Ersten Weltkrieg erlebt haben, braucht mehr als Daten. Ein Film kann diese Erfahrung nachfühlbar machen – er bleibt aber eine Darstellung von heute und keine Quelle von damals.",
  begriffe:[["Empathie","Fähigkeit, sich in die Gefühle und die Perspektive anderer hineinzuversetzen."],["Erfahrungsgeschichte","Geschichtsschreibung, die auf Erlebnisse einzelner Menschen und ihren Alltag schaut."],["Rezeptionsgeschichte","Wie ein Werk oder Ereignis in verschiedenen Zeiten wahrgenommen und bewertet wurde."],["Quelle","stammt aus der Zeit selbst, zum Beispiel ein Brief von 1917."],["Darstellung","erzählt später über die Zeit, zum Beispiel ein Film von 2022."],["Public History","Geschichte außerhalb von Schule und Universität: in Museen, Filmen, Serien, Spielen, Social Media."]],
  abfolge:{ titel:"Ein Werk, viele Urteile", punkte:STATIONEN.map(s => [s[0], s[2]]) },
  lk:{ name:"Public History", satz:"Public History bezeichnet alle Formen, in denen Geschichte außerhalb von Schule und Universität dargestellt wird: in Museen, Gedenkstätten, Filmen, Serien, Computerspielen, Podcasts, Social Media.", beispiel:"Der Film von 2022 erreicht Millionen Menschen und prägt ihr Bild vom Krieg – deshalb prüfen wir, was belegt ist und was Gestaltung." },
  werkzeug:{ titel:"Einen Geschichtsfilm prüfen", schritte:["Quelle oder Darstellung? Wann, von wem und für wen wurde der Film gemacht?","Was zeigt er, und mit welchen Mitteln wirkt er (Bilder, Ton, Auswahl der Figuren)?","Was lässt er weg oder erfindet er – und woran kann ich das prüfen?"] },
  sonst:"Rollentausch 1917 (Auftrag 1), Pauls Veränderung im Film (Auftrag 3), ein Wort für das Gefühl nach dem Film (Auftrag 4).",
  mein:[["Mein Wort nach dem Film", () => S.wort ? S.wort + ". " + S.wgrund : ""], ["Mein Tagebucheintrag 1917", "tb"]],
};
function zusammenfassung(){ return fadenFeld() + zusammen(); }
AKTION.wortgross = () => { if (lang("wort", 2)) tafel(`<div class="wort" style="font-size:clamp(3rem,12vw,9rem)">${esc(S.wort)}</div>`, { titel:"Mein Wort nach dem Film" }); };
L.nachEingabe = p => { if (p === "wort") { const b = document.querySelector('[data-akt="wortgross"]'); if (b) b.disabled = !lang("wort", 2); } };
const SEITE_FN = { start, rolle, vorfilm, film, gefuehl, tagebuch, landkarte:seiteLk, schreiben:schreibauftrag, zusammenfassung, lehrkraft };
weimarStart();
