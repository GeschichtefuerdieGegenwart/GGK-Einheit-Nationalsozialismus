/* ===== M16 · Was macht den Menschen zum Menschen? (Heft „Geschichte aktuell 1“, M16) ===== */
const L = {
  key:"ggk-m16-mensch:v1", nr:"M16", titel:"Was macht den Menschen zum Menschen?", unter:"Einstieg in die Einheit Nationalsozialismus",
  /* Zeichen der Stunde: zwei Kreise, die sich überschneiden (ich und die anderen) */
  mark:`<svg class="mark" viewBox="0 0 34 34" aria-hidden="true"><circle cx="13" cy="17" r="9" fill="none" stroke="#24221F" stroke-width="2.4"/><circle cx="21" cy="17" r="9" fill="none" stroke="#9B402D" stroke-width="2.4"/></svg>`,
  seiten:[["start","",""],["appell","0–10 Min.","Der Appell"],["menschlich","10–18 Min.","Was ist menschlich?"],["humanismus","18–27 Min.","Humanismus"],["werte","27–38 Min.","Meine Werte"],["frage","38–45 Min.","Die Frage"],["zusammenfassung","Zum Abheften","Zusammenfassung"]],
  breit:["humanismus","werte","zusammenfassung","lehrkraft"],
  loesch:"Dein Appell, deine Wörter, Markierungen, Entscheidungen, Werte und deine Stimme werden auf diesem Gerät entfernt.",
  init:() => ({ appell:"", meint:"", w1:[], w2:[], hsatz:"", dil:{}, top:[], wsatz:"", mehr:false, stimme:null, wo:"" }),
  nachMark(){ const z = document.getElementById("markstand"); if (z) z.textContent = markStand(); },
};
const VIDEO = "https://www.youtube.com/watch?v=hrJBfsXNp1Y";
const QUELLEN = {
  hum:{ titel:"Humanismus", kurz:"Humanismus", kopf:`${status("", "Erklärtext aus dem Heft")} Tippe Sätze an. ▲ = steht auch in unseren Wörtern · ● = neu für mich.`,
    stifte:[["a","▲","steht auch bei uns"],["b","●","neu für mich"]],
    abs:[[null,["Humanismus bezeichnet eine philosophische, kulturelle und ethische Haltung, bei der der Mensch und seine Würde, seine Vernunft, seine Freiheit sowie seine Fähigkeit zu moralischem Handeln im Mittelpunkt stehen.","Humanismus orientiert sich am Ideal des eigenverantwortlichen, mitfühlenden und gebildeten Menschen, dem Respekt gegenüber allen Menschen unabhängig von Herkunft, Überzeugung oder Status zukommt."]],
      ["Herkunft",["Der Begriff stammt ursprünglich aus der Renaissance, als Gelehrte sich wieder verstärkt den Werten, Literatur und der Philosophie der Antike zuwandten, um daraus Orientierungen für ein selbstbestimmtes, aufgeklärtes Leben zu gewinnen."]],
      ["Fünf Merkmale",["Achtung vor jedem Menschen und seiner individuellen Würde.","Streben nach Bildung, kritischem Denken und Selbsterkenntnis.","Förderung von Toleranz, Solidarität und Empathie.","Ablehnung von Fanatismus, Machtmissbrauch und Unterdrückung.","Vertrauen in die Fähigkeiten und die Verantwortung des Menschen, die Gesellschaft zum Besseren zu gestalten."]]],
    nachweis:"Unterrichtsheft „Geschichte aktuell 1“, M16. Das Heft nennt für diesen Text keine Quelle (noch offen)." },
};
/* Wertekonflikte: Situationen und Antworten aus dem Werte-Test der Stunde (Repository Fragen-Humanismus, Teil „Wertekonflikte & Dilemmata“). Die Überschriften dort („Ehrlichkeit vs. Mitgefühl“) sind hier weggelassen: Den Wert benennst du selbst. */
const DIL = [
  ["Die Präsentation","Dein Freund fragt dich, ob seine Präsentation vor der Klasse gut war. Du fandest sie schwach, aber er wirkt sehr verunsichert.",["Ich sage ihm ehrlich meine negative Meinung, um ihm bei Verbesserungen zu helfen.","Ich formuliere es diplomatisch und betone positive Aspekte, verschweige aber Wesentliches.","Ich sage, sie war super, um ihn aufzubauen – auch wenn es nicht stimmt.","Ich versuche, das Gespräch auf ein anderes Thema zu lenken, um niemanden zu verletzen."]],
  ["Die Messengergruppe","In einer Messengergruppe werden diskriminierende Witze verschickt. Du bist neu in der Gruppe.",["Ich sage offen meine Meinung und fordere, mit sowas aufzuhören.","Ich verlasse kommentarlos die Gruppe.","Ich lasse es laufen, weil alle das scheinbar lustig finden.","Ich schreibe den Verfasser privat an und erkläre, warum ich das unpassend finde."]],
  ["Die Klassenarbeit","Du erfährst, dass eine Freundin bei einer wichtigen Klassenarbeit abgeschrieben hat.",["Ich melde den Vorfall der Lehrkraft, weil Regeln für alle gelten müssen.","Ich spreche meine Freundin darauf an und ermutige sie, es selbst der Lehrkraft zu sagen.","Ich schweige, weil sie meine Freundin ist.","Ich sage ihr, dass ich ihr Verhalten nicht gut finde, unternehme aber sonst nichts."]],
  ["In der Bahn","Du siehst, wie eine Person in der Bahn lautstark diskriminiert wird, fühlst dich aber nicht sicher einzugreifen.",["Ich mische mich aktiv ein, auch wenn ich selbst Nachteile befürchte.","Ich filme das Geschehen zur Dokumentation und schicke es an eine Vertrauensperson.","Ich ziehe mich raus, um mich selbst zu schützen.","Ich hole Hilfe (zum Beispiel Fahrer*in, Polizei) oder bitte andere, mit einzuschreiten."]],
  ["Der Spott","Jemand in der Klasse wird ständig wegen eines Makels zum Ziel von Spott. Du wirst gefragt, ob du selbst das auch so siehst.",["Ich widerspreche offen dem Spott, auch wenn ich damit allein dastehe.","Ich versuche, zwischen den Parteien zu vermitteln, ohne klar Stellung zu beziehen.","Ich stimme der Mehrheit diplomatisch zu, um nicht selbst ausgegrenzt zu werden.","Ich sage der betroffenen Person ehrlich, was ich wirklich denke, auch wenn es verletzend sein könnte."]],
  ["Die Sprüche","Ein Mitschüler äußert sich ständig intolerant über andere Religionen und Minderheiten.",["Ich widerspreche klar und fordere Gerechtigkeit für Betroffene.","Ich versuche, die Beweggründe des Mitschülers besser zu verstehen, ohne zu werten.","Ich ignoriere die Aussagen, um keinen Streit zu provozieren.","Ich melde die Aussagen einer Vertrauenslehrkraft."]],
  ["Das Ehrenamt","Du hast versprochen, bei einer ehrenamtlichen Aktion mitzumachen, aber nun ein spannendes Freizeitangebot bekommen.",["Ich sage der Gruppe ehrlich ab und mache, worauf ich Lust habe.","Ich gehe trotzdem zum Ehrenamt, weil Verpflichtungen für mich wichtig sind.","Ich versuche, beiden Seiten gerecht zu werden, plane kurzfristig, kann aber eventuell beides nicht richtig machen.","Ich schütze mich vor Stress und gehe zu keinem der beiden Termine."]],
  ["Der Streit","Zwei Freunde streiten sich. Eine*r ist sehr traurig, obwohl eigentlich die andere Person im Recht ist.",["Ich unterstütze die traurige Person, weil ihr Kummer mir wichtiger ist als die Sache.","Ich ergreife klar Partei für die Person, die sachlich im Recht ist.","Ich höre beiden zu, ohne Position zu beziehen.","Ich ziehe mich zurück, weil ich niemanden enttäuschen will."]],
];
const PFLICHT = 5;
const WERTE = ["Mitgefühl","Gerechtigkeit","Freiheit","Verantwortung","Ehrlichkeit","Toleranz","Menschenwürde","Loyalität","Selbstschutz"];
const STIMMEN = [["A","Ja, das ist möglich"],["B","Nein, das ist nicht möglich"],["C","Kommt darauf an"]];
const markStand = () => { const n = markZahl(["hum"]); return `${n} Sätze markiert. Ziel: mindestens 3.`; };
const dilDa = () => DIL.map((d, i) => (S.dil || {})[i]).filter(x => x && x.o != null && x.w);
const zaehlWerte = () => { const z = {}; dilDa().forEach(x => { z[x.w] = (z[x.w] || 0) + 1; }); return Object.keys(z).sort((a, b) => z[b] - z[a] || WERTE.indexOf(a) - WERTE.indexOf(b)).map(w => [w, z[w]]); };

/* Wörter sammeln: Eingabefeld + Liste, höchstens max Einträge */
function chips(pfad, label, max){
  const a = hol(pfad) || [], id = "c-" + pfad, voll = a.length >= max;
  return `<div class="chipfeld"><label for="${id}">${label}</label>
  <div class="reihe" style="margin-top:.3rem"><input type="text" id="${id}" data-chip="${pfad}" data-max="${max}" maxlength="28" placeholder="ein Wort oder kurzer Ausdruck" autocomplete="off" ${voll ? "disabled" : ""}><button type="button" class="btn dunkel" data-akt="chipplus" data-p="${pfad}" data-max="${max}" ${voll ? "disabled" : ""}>Hinzufügen</button><span class="hinweis">${a.length} von ${max}</span></div>
  <div class="chips" aria-live="polite">${a.map((w, i) => `<span class="chip">${esc(w)}<button type="button" data-akt="chipweg" data-p="${pfad}" data-i="${i}" aria-label="${esc(w)} entfernen">×</button></span>`).join("") || `<span class="leer">Noch kein Wort.</span>`}</div></div>`;
}
const chipsLese = a => (a && a.length) ? `<div class="chips lese">${a.map(w => `<span class="chip">${esc(w)}</span>`).join("")}</div>` : `<p class="leer">Noch keine Wörter gesammelt.</p>`;

/* ---------- Seiten ---------- */
function start(){
  return `${band("M16 · Einzelstunde · 45 Minuten", "Was macht den Menschen zum Menschen?", "Bevor wir fragen, was im Nationalsozialismus geschah, fragen wir: Was ist dir im Zusammenleben wichtig?")}
  <p class="leitfrage">Was macht den Menschen zum Menschen – und was ist mir selbst wichtig?</p>
  ${belastend("Am Anfang spricht Margot Friedländer. Sie hat als Jüdin die Verfolgung durch die Nationalsozialisten überlebt. Es geht um Verfolgung und Verlust. Du darfst jederzeit aussetzen und mit deiner Lehrkraft sprechen.")}
  <h2 class="abschnitt">Am Ende kannst du</h2>
  <ul class="ziele"><li>Margot Friedländers Appell wiedergeben und deuten,</li><li>erklären, was „Humanismus“ meint, und mit deinen eigenen Wörtern vergleichen,</li><li>sagen, welche Werte dir wichtig sind, wenn zwei Werte einander widersprechen.</li></ul>
  <h2 class="abschnitt">So läuft die Stunde</h2>
  <ol class="ablauf">${L.seiten.slice(1, 6).map(s => `<li><b>${esc(s[1])}</b><span>${esc(s[2])}</span></li>`).join("")}</ol>
  <p class="hinweis" style="margin-top:.8rem">Deine Werte brauchst du in M17 wieder. Die Seite merkt sie sich auf diesem Gerät; sichere am Ende trotzdem die Zusammenfassung als PDF.</p>
  ${weiter("appell", "Beginnen")}`;
}

function appell(){
  return `${zeitKopf("appell")}<h1>Der Appell</h1>
  <p class="lead">Margot Friedländer (1921–2025) überlebte als Jüdin den Holocaust. Bis ins hohe Alter sprach sie mit Schüler*innen.</p>
  ${auftrag("Plenum · 5 Minuten · iPad umdrehen", "Erst zuhören", "Deine Lehrkraft zeigt vorn das Gespräch mit Margot Friedländer (WDR, Aktuelle Stunde, etwa vier Minuten). Achte auf das Ende: Dort richtet sie einen Appell an uns. Ein Appell ist ein dringender Aufruf.")}
  ${auftrag("Allein · 2 Minuten", "Dann festhalten", "Schreib den Appell auf, so genau du kannst. Dann deute ihn in ein bis zwei Sätzen.")}
  ${textfeld("appell", "Margot Friedländers Appell", { rows:2, platz:"Sie sagt am Ende: …", zaehl:false })}
  ${textfeld("meint", "Was meint sie damit?", { rows:3, anfaenge:["Sie meint damit","Sie richtet sich an","Wichtig ist ihr das, weil"], zaehl:false })}
  <p class="hinweis" style="margin-top:.8rem">Danach, zu zweit, 3 Minuten: Vergleicht euren Wortlaut. Wo deutet ihr den Appell verschieden?</p>
  ${weiter("menschlich", "Weiter: Was ist menschlich?")}`;
}

function menschlich(){
  const alle = S.w1.length + S.w2.length;
  return `${zeitKopf("menschlich")}<h1>Was ist menschlich?</h1>
  ${auftrag("Zu zweit · 6 Minuten", "Sprecht und sammelt", "Sprecht über beide Fragen. Jede*r sammelt am eigenen Gerät Wörter – höchstens acht je Frage. Ein Wort, kein Satz.")}
  <div class="felder2">
    <div class="karte">${chips("w1", "<b>1. Was ist menschlich? Was unterscheidet den Menschen vom Tier?</b>", 8)}</div>
    <div class="karte">${chips("w2", "<b>2. Welche Eigenschaften hat ein guter Mensch für dich?</b>", 8)}</div>
  </div>
  ${auftrag("Plenum · 2 Minuten", "Ein Gerät vorn", "Ein Paar zeigt seine Wörter am Beamer. Die anderen ergänzen mündlich, was fehlt. Es wird nichts eingesammelt.")}
  <div class="reihe nodruck"><button type="button" class="btn dunkel" data-akt="tafelwoerter" ${alle ? "" : "disabled"}>Meine Wörter groß zeigen</button><span class="hinweis">${alle ? "" : "Erst Wörter sammeln."}</span></div>
  ${weiter("humanismus", "Weiter: Humanismus")}`;
}

function humanismus(){
  return `${zeitKopf("humanismus")}<h1>Humanismus</h1>
  ${auftrag("Allein · 6 Minuten", "Vergleiche", "Inwieweit spiegeln sich eure Überlegungen im Humanismus wider? Lies den Text. Tippe Sätze an: ▲, wenn das auch in euren Wörtern steckt, ● wenn es für dich neu ist. Noch einmal tippen löscht die Markierung.")}
  <div class="qwerk">${quelle("hum")}
    <div><h3 class="klein" style="margin-top:0">Eure Wörter</h3>${chipsLese(S.w1.concat(S.w2))}
    <h3 class="klein">Deine Markierungen</h3>${belege(["hum"], { ta:"Steht auch bei uns", tb:"Neu für mich" })}<p class="hinweis" id="markstand" aria-live="polite" style="margin-top:.5rem">${markStand()}</p></div>
  </div>
  ${textfeld("hsatz", "Mein Vergleich in zwei Sätzen", { rows:3, anfaenge:["Bei uns und im Humanismus steht","Im Humanismus kommt dazu","Bei uns steht etwas, das im Text fehlt:"], ziel:"Ziel: etwa 25 Wörter" })}
  ${weiter("werte", "Weiter: Meine Werte")}`;
}

function werte(){
  const zeige = S.mehr ? DIL.length : PFLICHT, da = dilDa().length, z = zaehlWerte(), fertig = da >= PFLICHT;
  const karte = (d, i) => { const st = (S.dil || {})[i] || {}; return `<div class="karte dil"><p class="kennung">Konflikt ${i + 1}${i >= PFLICHT ? " · für Schnelle" : ""} · ${esc(d[0])}</p><p>${esc(d[1])}</p>
    <div class="optionen" role="group" aria-label="Wie entscheidest du dich?">${d[2].map((o, k) => `<button type="button" data-akt="dil" data-i="${i}" data-o="${k}" aria-pressed="${st.o === k}">${esc(o)}</button>`).join("")}</div>
    ${st.o != null ? `<label for="dw-${i}">Welcher Wert war dir hier am wichtigsten?</label><select id="dw-${i}" data-f="dil.${i}.w" data-neu><option value="">– wähle selbst –</option>${WERTE.map(w => `<option ${st.w === w ? "selected" : ""}>${w}</option>`).join("")}</select>` : `<p class="hinweis">Erst entscheiden, dann den Wert benennen.</p>`}</div>`; };
  const bild = fertig ? `<div class="auflage" id="wertebild"><b>Dein Bild aus ${da} Konflikten.</b> So oft hast du einen Wert nach vorn gestellt:
    <ul class="wzahl">${z.map(x => `<li><b>${esc(x[0])}</b><span aria-hidden="true">${"●".repeat(x[1])}</span><span>${x[1]} von ${da}</span></li>`).join("")}</ul>
    <p class="hinweis">Das ist kein Messwert und kein Urteil über dich. Es zeigt nur, wie du heute in diesen Fällen gewählt hast.</p></div>
    ${auftrag("Allein · 3 Minuten", "Meine Werte", "Stimmt das Bild? Wähle selbst die drei Werte, die dir am wichtigsten sind. Begründe den wichtigsten in einem Satz.")}
    <div class="woerter" role="group" aria-label="Drei Werte wählen">${WERTE.map(w => `<button type="button" data-akt="top" data-w="${w}" aria-pressed="${S.top.includes(w)}" ${!S.top.includes(w) && S.top.length >= 3 ? "disabled" : ""}>${w}</button>`).join("")}</div>
    <p class="hinweis" aria-live="polite">${S.top.length} von 3 gewählt.</p>
    ${textfeld("wsatz", "Mein wichtigster Wert, in einem Satz", { rows:2, anfaenge:["Am wichtigsten ist mir","Das merke ich daran, dass","Schwer fällt mir das, wenn"], zaehl:false })}`
    : `<p class="hinweis" aria-live="polite">${da} von ${PFLICHT} Konflikten entschieden und benannt. Danach erscheint dein Bild.</p>`;
  return `${zeitKopf("werte")}<h1>Meine Werte</h1>
  ${auftrag("Allein · 8 Minuten", "Fünf Konflikte", "In jedem Fall stehen zwei Werte gegeneinander. Entscheide dich – ehrlich, nicht „richtig“. Benenne danach selbst den Wert, der dir dabei am wichtigsten war. Es gibt keine Punkte.")}
  <div class="dilgitter">${DIL.slice(0, zeige).map(karte).join("")}</div>
  ${S.mehr ? "" : `<div class="reihe nodruck" style="margin-top:.8rem"><button type="button" class="btn" data-akt="setz" data-p="mehr" data-w="true">Für Schnelle: drei weitere Konflikte</button></div>`}
  ${bild}
  ${weiter("frage", "Weiter: Die Frage")}`;
}

function frage(){
  return `${zeitKopf("frage")}<h1>Die Frage</h1>
  <p class="leitfrage">Ist es möglich, seine Menschlichkeit zu verlieren? Wenn ja: in welchen Situationen?</p>
  ${auftrag("Allein · 2 Minuten", "Erst festlegen", "Wähle deine Stimme und schreib einen Satz dazu. Diese Frage nimmst du mit in M17: Dort begleitest du zwei Menschen durch die Jahre 1933 bis 1939.")}
  ${stimmkarte("stimme", STIMMEN)}
  ${textfeld("wo", "In welchen Situationen? Oder: Warum nicht?", { rows:3, anfaenge:["Menschlichkeit geht verloren, wenn","Sie geht nicht verloren, weil","Es kommt darauf an, ob"], zaehl:false })}
  ${auftrag("Plenum · 5 Minuten · iPad hochhalten", "Stimmen zeigen", "Auf Ansage zeigen alle ihre Karte. Je eine Stimme aus A, B und C begründet. Niemand muss von sich oder der eigenen Familie erzählen.")}
  <p class="merksatz">iPad umdrehen. Danach: Zusammenfassung sichern.</p>
  ${weiter("zusammenfassung", "Zur Zusammenfassung")}`;
}

function zusammenfassung(){
  const m = (t, leer = "noch offen") => `<p class="mein ${String(t || "").trim() ? "" : "leer"}">${esc(String(t || "").trim() || leer)}</p>`;
  const st = STIMMEN.find(x => x[0] === S.stimme);
  return `<div class="zf"><div class="reihe nodruck" style="margin:0 0 1rem"><button type="button" class="btn dunkel" data-drucken>Drucken oder als PDF sichern</button><span class="hinweis">Zwei Seiten A4. In GoodNotes ablegen – du brauchst sie in M17.</span></div>
  <h1>M16 · Was macht den Menschen zum Menschen?</h1>
  <p class="leitfrage">Was macht den Menschen zum Menschen – und was ist mir selbst wichtig?</p>
  <p class="merksatz">Der Humanismus stellt die Würde jedes Menschen in den Mittelpunkt. Was mir wichtig ist, zeigt sich, wenn zwei Werte einander widersprechen – oder wenn ein Wert etwas kostet.</p>
  <h2>Begriffe</h2>
  <div class="begriffe">
    <div><b>Humanismus:</b> eine Haltung, bei der der Mensch, seine Würde, seine Vernunft und seine Freiheit im Mittelpunkt stehen.</div>
    <div><b>Würde:</b> Jeder Mensch verdient Achtung – unabhängig von Herkunft, Überzeugung oder Status.</div>
    <div><b>Wert:</b> etwas, das dir im Zusammenleben wichtig ist. Beispiel: Ehrlichkeit.</div>
    <div><b>Wertekonflikt (Dilemma):</b> eine Lage, in der zwei Werte nicht zugleich erfüllt werden können. Beispiel: ehrlich sein oder schonen.</div>
    <div><b>Appell:</b> ein dringender Aufruf an andere, etwas zu tun.</div>
  </div>
  <h2>Fünf Merkmale des Humanismus</h2>
  <ul class="zl"><li><b>1</b><span>Achtung vor jedem Menschen und seiner individuellen Würde</span></li><li><b>2</b><span>Streben nach Bildung, kritischem Denken und Selbsterkenntnis</span></li><li><b>3</b><span>Förderung von Toleranz, Solidarität und Empathie</span></li><li><b>4</b><span>Ablehnung von Fanatismus, Machtmissbrauch und Unterdrückung</span></li><li><b>5</b><span>Vertrauen in die Fähigkeiten und die Verantwortung des Menschen, die Gesellschaft zum Besseren zu gestalten</span></li></ul>
  <div class="werk"><b>Denkwerkzeug: Einen Wertekonflikt lesen.</b> 1. Welche zwei Werte stehen gegeneinander? 2. Was kostet jede Wahl – und wen? 3. Wofür entscheide ich mich, und warum?</div>

  <div class="seitenumbruch"><h2 style="margin-top:0">Meine Ergebnisse</h2>
  <h2>Margot Friedländers Appell</h2>${m(S.appell)}${m(S.meint)}
  <h2>Was ist menschlich? Was macht einen guten Menschen aus?</h2>${m(S.w1.concat(S.w2).join(" · "))}
  <h2>Unsere Wörter und der Humanismus</h2>${m(S.hsatz)}
  <h2>Meine Werte</h2>${m(S.top.length ? "Meine drei Werte: " + S.top.join(", ") + "." : "")}${m(S.wsatz)}
  <h2>Kann man seine Menschlichkeit verlieren?</h2>${m(st ? `Meine Stimme: ${st[1]}. ${S.wo}` : S.wo)}</div></div>
  ${weiter("start", "Zur Startseite")}`;
}

function lehrkraft(){
  return `<div class="lk"><p class="zeit"><span class="nr">Für Lehrkräfte</span><span>nicht geschützt – enthält keine Lösungen, die Lernende nicht sehen dürfen</span></p><h1>M16 · Hinweise</h1>
  <p class="lead">Grundlage ist dein Heft „Geschichte aktuell 1“, M16 (zwei Seiten): Video, Appell, zwei Partnerfragen mit Wortwolke, Vergleich mit dem Humanismus-Text, Werte-Test, Schlussfrage. Die Seite übernimmt Aufbau, Text und Aufgaben. Neu ist, was nur das Gerät kann.</p>
  <h2 class="abschnitt">Was das Gerät hier leistet – nach den sechs Prinzipien aus Kidu</h2>
  <ul><li><b>Verdecken:</b> Im Werte-Teil entscheiden die Lernenden zuerst und benennen dann selbst den Wert. Die Überschriften des alten Tests („Ehrlichkeit vs. Mitgefühl“) verraten die Deutung nicht mehr.</li><li><b>Messen:</b> Die eigenen Entscheidungen werden zu einem Bild („so oft stand dieser Wert vorn“) – ohne Punkte und ohne Prozent.</li><li><b>Stufen:</b> Fünf Konflikte für alle, drei weitere für Schnelle; Satzanfänge auf Abruf.</li><li><b>Bündeln:</b> Ein Gerät zeigt die Wörter am Beamer; die Schlussfrage läuft über die Stimmkarte. Es wird nichts eingesammelt und nichts übertragen.</li><li><b>Markierungen werden zu Belegen:</b> Was im Humanismus-Text angetippt wird, steht geordnet neben dem Schreibfeld.</li><li><b>Weitergeben:</b> Die drei Werte und die Antwort auf die Schlussfrage stehen in M17 wieder da (gleiches Gerät, gleicher Browser) und auf der Zusammenfassung.</li></ul>
  <p>Rückmelden und Variieren kommen hier nicht vor: Es gibt in dieser Stunde keine richtige Antwort, die eine Rückmeldung prüfen könnte.</p>
  <p>Papier und Gespräch bleiben besser für: das gemeinsame Sehen des Videos, das Partnergespräch, das Plenum zur Schlussfrage.</p>
  <h2 class="abschnitt">Ablauf (45 Minuten)</h2>
  <div class="matrix-wrap"><table><thead><tr><th>Zeit</th><th>Phase</th><th>Sozialform</th><th>Hinweis</th></tr></thead><tbody>
  <tr><td class="n">0–10</td><td>Der Appell</td><td>Plenum, allein, zu zweit</td><td>Video vorn (4:15 Minuten), iPads umgedreht; dann Appell notieren und deuten</td></tr>
  <tr><td class="n">10–18</td><td>Was ist menschlich?</td><td>zu zweit, kurz Plenum</td><td>Wörter sammeln; ein Gerät am Beamer</td></tr>
  <tr><td class="n">18–27</td><td>Humanismus</td><td>allein</td><td>markieren, Vergleich in zwei Sätzen</td></tr>
  <tr><td class="n">27–38</td><td>Meine Werte</td><td>allein</td><td>fünf Konflikte, Bild, drei Werte</td></tr>
  <tr><td class="n">38–45</td><td>Die Frage</td><td>allein, Plenum</td><td>Stimmkarte, drei Begründungen</td></tr></tbody></table></div>
  <p class="hinweis" id="zeitdiagnose">Zeitdiagnose bei 150 Wörtern pro Minute (gemessen an der fertigen Seite): Lesen rund 8 Minuten (rund 1.150 Wörter mit fünf Konflikten), Video und Start rund 6, Schreiben rund 7 (fünf kurze Texte), Wörter sammeln und Partnergespräche rund 9, Wählen rund 4, Plenum rund 7, Wechsel rund 3. Das sind rund 44 Minuten. <b>Die Stunde passt in 45 Minuten, aber ohne Puffer</b> – empfohlen K1 oder K3.</p>
  <h2 class="abschnitt">Kürzungen zur Auswahl</h2>
  <ul><li><b>K1</b> Vergleich mit dem Humanismus nur markieren, den Satz mündlich: 3 Minuten frei.</li><li><b>K2</b> Wörter nur zu Frage 2 sammeln („ein guter Mensch“): 2 Minuten frei.</li><li><b>K3</b> Schlussfrage nur mit Stimmkarte, der Satz als Hausaufgabe: 2 Minuten frei.</li></ul>
  <h2 class="abschnitt">Video</h2>
  <p>„Holocaust-Überlebende Margot Friedländer im Gespräch | WDR Aktuelle Stunde“, 4:15 Minuten: <a href="${VIDEO}" target="_blank" rel="noopener">${VIDEO}</a>. Das Video ist nicht eingebettet (fremder Server). Zeig es vorn vom Lehrkraftgerät. Den Wortlaut des Appells nennt das Heft nicht; er steht deshalb auch hier nicht.</p>
  <h2 class="abschnitt">Abweichungen vom Heft</h2>
  <ul><li>Anrede durchgehend „du“ (Heft: „Sie“).</li><li><b>Werte-Test:</b> Das Heft verlinkt den „Humanistischen Werte-Test“ (Repository <code>Fragen-Humanismus</code>) und lässt das Ergebnis als Bildschirmfoto einfügen. Die Seite übernimmt daraus nur den Teil „Wertekonflikte“ (acht Situationen, Wortlaut unverändert). Nicht übernommen sind die 16 Situationen mit Punkten – dort ist die erwünschte Antwort immer A – sowie Prozentwerte und Netzdiagramm. Den Wert benennen die Lernenden selbst; die Zuordnung „Antwort → Wert“ des alten Tests entfällt.</li><li>Zur Auswahl der Werte ist „Loyalität“ ergänzt (im alten Test nur in einer Überschrift genannt).</li><li>Die Wortwolke ist eine Wörterliste am eigenen Gerät; gezeigt wird ein Gerät vorn. Grund: Das Zusammenführen vieler Geräte hat in der Erprobung zu viel Zeit gekostet.</li><li>Leitfrage, Merksatz, Begriffserklärungen und Denkwerkzeug der Zusammenfassung sind Vorschläge von Claude. Bitte prüfen.</li><li>Im Arbeitsauftrag „wider“ statt „wieder“; „Appell“ statt „Appel“.</li><li>Das Standbild aus dem Video ist nicht übernommen.</li></ul>
  <h2 class="abschnitt">Vor dem Einsatz prüfen</h2>
  <ul><li>Humanismus-Text: Das Heft nennt keine Quelle. Der Satz „Der Begriff stammt ursprünglich aus der Renaissance“ ist ungenau – die Bewegung stammt aus der Renaissance, das Wort „Humanismus“ ist deutlich jünger (aus dem Gedächtnis: 1808, Niethammer; bitte nachschlagen).</li><li>Lebensdaten Margot Friedländers (1921–2025) und der Titel des Videos.</li><li>Ob das Video unter der Adresse noch erreichbar ist.</li></ul>
  <h2 class="abschnitt">Nur du kannst das</h2>
  <ul><li>Test auf dem iPad in Safari (hoch und quer), VoiceOver, Moodle-Upload.</li><li>Im Plenum niemanden zu Aussagen über sich oder die eigene Familie drängen; die Wertebilder bleiben am Gerät.</li><li>Entscheiden, ob der alte Werte-Test weiter verlinkt bleibt.</li></ul>
  <h2 class="abschnitt">Nach der Stunde</h2>
  <div class="matrix-wrap"><table><thead><tr><th>Beobachtung</th><th>Notiz</th></tr></thead><tbody><tr><td>Haben die Lernenden den Wert selbst benannt – oder geraten, was „gewünscht“ ist?</td><td></td></tr><tr><td>Hat ein Gerät vorn für die Wörter gereicht?</td><td></td></tr><tr><td>Wie viele Tipps bis zum ersten eigenen Wort?</td><td></td></tr><tr><td>Zeit: Wo wurde es eng?</td><td></td></tr><tr><td>Gilt die Lehre nur in Geschichte oder überall? Wo würde sie in einem anderen Fach brechen?</td><td></td></tr></tbody></table></div>
  <p class="hinweis" style="margin-top:1rem">Speicherschlüssel <code>${L.key}</code>. Eingaben bleiben im Browser des Geräts. M17 liest daraus nur die drei Werte, den Satz dazu und die Antwort auf die Schlussfrage.</p></div>
  ${weiter("start", "Zur Startseite")}`;
}

AKTION.chipplus = t => { const p = t.dataset.p, f = document.getElementById("c-" + p), w = (f.value || "").trim().replace(/\s+/g, " "), a = (hol(p) || []).slice(); if (!w) { f.focus(); return; } if (a.length < +t.dataset.max && !a.some(x => x.toLowerCase() === w.toLowerCase())) a.push(w); setz(p, a); zeichneBehalte(); const n = document.getElementById("c-" + p); if (n && !n.disabled) n.focus(); };
AKTION.chipweg = t => { const p = t.dataset.p, a = (hol(p) || []).slice(); a.splice(+t.dataset.i, 1); setz(p, a); zeichneBehalte(); const n = document.getElementById("c-" + p); if (n) n.focus(); };
AKTION.tafelwoerter = () => tafel(`<div class="tafelwoerter"><div><h2>Was ist menschlich?</h2>${chipsLese(S.w1)}</div><div><h2>Ein guter Mensch …</h2>${chipsLese(S.w2)}</div></div>`, { titel:"Unsere Wörter", hell:true });
AKTION.dil = t => { const i = t.dataset.i, alt = (S.dil || {})[i] || {}; setz("dil." + i, { o:+t.dataset.o, w:alt.w || "" }); zeichneBehalte(); };
AKTION.top = t => { const w = t.dataset.w, a = S.top.slice(), i = a.indexOf(w); if (i >= 0) a.splice(i, 1); else if (a.length < 3) a.push(w); setz("top", a); zeichneBehalte(); };
document.addEventListener("keydown", ev => { const t = ev.target; if (ev.key === "Enter" && t.dataset && t.dataset.chip) { ev.preventDefault(); const b = document.querySelector(`[data-akt="chipplus"][data-p="${t.dataset.chip}"]`); if (b) AKTION.chipplus(b); } });
const SEITE_FN = { start, appell, menschlich, humanismus, werte, frage, zusammenfassung, lehrkraft };
kernStart();
