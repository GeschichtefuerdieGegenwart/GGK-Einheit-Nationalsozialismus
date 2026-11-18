/* Arbeitsblatt Geschichte · Musterblatt · Daten und Verhalten (Vorschlag vom 18.11.2026)
   Alle Inhalte stammen aus den bestehenden Stunden M11, M26 und Ost-West Stunde 6. Neu sind nur Rahmen, Reihenfolge und Farben. */
(function () {
  "use strict";
  const doc = document, $ = (s, r) => (r || doc).querySelector(s), $$ = (s, r) => Array.from((r || doc).querySelectorAll(s));
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const worte = s => String(s || "").trim().split(/\s+/).filter(Boolean).length;
  const zahl = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const heute = () => { const d = new Date(); return ("0" + d.getDate()).slice(-2) + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "." + d.getFullYear(); };

  /* ---------- Farbrichtungen ---------- */
  const R = {
    "W-A": { name: "Litfaßsäule", ton: "Plakat-Ocker", warum: "Politik zieht 1918 auf die Straße: Aufrufe, Wahlplakate, Notgeld. Der Ockerton führt die Farbe weiter, die Weimar heute auf der Startseite hat – und liegt der Farbstimmung des Psycho-Labors am nächsten." },
    "W-B": { name: "Banknote", ton: "Grün der Geldscheine", warum: "Die Republik ist ein Versprechen auf Papier – so wie ein Geldschein. 1923 zeigt, was geschieht, wenn das Vertrauen fehlt. Grün setzt Weimar deutlich von den beiden anderen Einheiten ab." },
    "W-C": { name: "Kopierstift", ton: "Violett des Tintenstifts", warum: "Stimmzettel, Verträge, Notverordnungen: Die Republik wird mit dem Stift gemacht und mit dem Stift ausgehöhlt. Nur wählbar, wenn Ost-West nicht »Matrize« wird – sonst gibt es zwei violette Einheiten." },
    "N-A": { name: "Archiv", ton: "Schieferblau", warum: "Die Farbe kommt aus der Arbeit der Historiker*innen: Archivkarton, Aktenrücken, Findbuch. Sie hält Abstand, ohne kalt zu sein. Kein Rot, kein Schwarz-Weiß-Rot, kein Braun." },
    "N-B": { name: "Bleistift", ton: "Graphit", warum: "Fast ohne Farbe: In dieser Einheit sprechen die Quellen und die Menschen. Führt das Grau weiter, das die Einheit heute auf der Startseite hat. Am ruhigsten – aber auch am wenigsten freundlich." },
    "N-C": { name: "Lesesaal", ton: "Flaschengrün", warum: "Die Farbe der Leselampen und Leinenrücken: Täterforschung ist Lesearbeit (Arendt, Browning, Sälter). Wärmer als Schieferblau, aber weit weg von Uniformfarben." },
    "O-A": { name: "Zwei Tinten", ton: "Blau und Rotbraun als Paar", warum: "Die Einheit denkt in Paaren: zwei Reden, zwei Staaten, zwei Schulbücher. Jede Stimme bekommt ihre Tinte – immer mit Namen, nie nur als Farbe. Führt das Blau der Startseite weiter." },
    "O-B": { name: "Transit", ton: "Stempelgrün", warum: "Grenzen, Pässe, Passierscheine: Wer darf wohin? Eine einzige ruhige Farbe für die ganze Einheit; die beiden Seiten werden nur mit Worten unterschieden." },
    "O-C": { name: "Matrize", ton: "Violett des Umdrucks", warum: "So sahen Arbeitsblätter in beiden deutschen Staaten aus: blauviolett vom Spiritusumdrucker. Passt zur Stunde über Schulbücher – die Einheit fragt auch, wie Geschichte unterrichtet wurde." }
  };

  /* ---------- Titelgrafiken (eigene Grafiken; Farben aus der gewählten Richtung) ---------- */
  const FLUCHT = [[1949, 129245, null], [1950, 197788, null], [1951, 165648, null], [1952, 182393, null], [1953, 331390, 48.7], [1954, 184198, 49.1], [1955, 252870, 49.1], [1956, 279189, 49.0], [1957, 261622, 52.2], [1958, 204092, 48.2], [1959, 143917, 48.3], [1960, 199188, 48.8], [1961, 207026, 49.2]];
  const svgKopf = alt => `<svg viewBox="0 0 400 300" role="img" aria-label="${esc(alt)}"><rect class="g-hauch" width="400" height="300"/>`;
  const BILD = {
    ns: alt => svgKopf(alt) + `<line x1="200" y1="26" x2="200" y2="274" class="s-tief" stroke-width="5" stroke-dasharray="12 10"/><line x1="26" y1="196" x2="374" y2="196" class="s-tinte" stroke-width="18"/><text x="100" y="118" text-anchor="middle" class="g-tief" font-size="64">1945</text><text x="300" y="118" text-anchor="middle" class="g-tief" font-size="64">1949</text><g class="g-tinte">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<circle cx="${61 + i * 40}" cy="246" r="9"/>`).join("")}</g></svg>`,
    weimar: alt => svgKopf(alt) + `<rect class="g-platte" x="160" y="22" width="80" height="204"/>${[58, 104, 150, 196].map(y => `<polyline class="s-tinte" stroke-width="7" stroke-linejoin="round" stroke-linecap="round" points="22,${y} 168,${y} 184,${y - 20} 200,${y + 16} 216,${y - 20} 232,${y} 378,${y}"/>`).join("")}<text x="200" y="282" text-anchor="middle" class="g-tief" font-size="54">1923</text></svg>`,
    ow: alt => svgKopf(alt) + FLUCHT.map((z, i) => { const h = Math.round(z[1] / 331390 * 170); return `<rect class="g-platte" style="stroke:var(--tinte)" stroke-width="3" x="${26 + i * 24.5}" y="${236 - h}" width="18" height="${h}"/>`; }).join("") + `<rect class="g-tinte" x="350" y="34" width="26" height="202"/><line x1="18" y1="237" x2="382" y2="237" class="s-tinte" stroke-width="4"/><text x="26" y="282" class="g-tief" font-size="40">1949</text><text x="376" y="282" text-anchor="end" class="g-tief" font-size="40">1961</text></svg>`
  };
  const NACHWEIS = "Eigene Grafik zum Modul, 2026 · Mario Walter, mit KI-Unterstützung · CC BY-NC-SA 4.0";

  /* ---------- Die drei Musterblätter ---------- */
  const fest = (id, nr, name, form, min, frei, nach) => ({ id, nr, name, form, min, frei, nach, fest: 1 });
  const E = {
    weimar: {
      name: "Weimarer Republik", jahre: "1914–1933", richtungen: ["W-A", "W-B", "W-C"], zaehl: "Blatt",
      frage: "Was hindert Demokratien daran, sich selbst zu verteidigen – damals wie heute?", frageArt: "Leitfrage des Abschnitts »Krisenjahre«",
      blaetter: [["M1", "Mein Leben im Jahr 1917"], ["M2", "Der Ausbruch des Ersten Weltkriegs"], ["M3", "Standortgebundenheit"], ["M4", "Die Matrosen meutern"], ["M5", "Die doppelte Ausrufung der Republik"], ["M6", "Die Versailler Friedenskonferenz"], ["M7", "Der Versailler Vertrag"], ["M7.1", "Wer trägt die Schuld am Ersten Weltkrieg?"], ["M8", "Das kollektive Gedächtnis"], ["M9", "Die Wahlen 1919"], ["M10", "Die Saat der Gewalt"], ["M11", "Das Krisenjahr 1923"], ["M12", "Die Goldenen Zwanziger"], ["M13", "Zwei Leben einer Zeit"], ["M14", "Die Weltwirtschaftskrise"], ["M14.2", "Verfassung und Präsidialkabinette"]],
      hier: 11,
      b: {
        nr: "M11", titel: "Das Krisenjahr 1923 und seine Konsequenzen", frage: "Viele Krisen zugleich: Wie verhalten sich Menschen – und übersteht die Republik das Jahr 1923 gestärkt oder geschwächt?",
        ziele: ["die Krisen des Jahres 1923 darstellen und erklären, wie sie zusammenhängen,", "beschreiben, wie sich Menschen in den Krisen verhalten, und den Einfluss der Krisen auf ihr Leben bewerten,", "untersuchen, wie sich das Krisenjahr auf die Wahl von 1924 auswirkt."],
        alt: "Eigene Grafik: Vier Linien laufen ruhig nebeneinander und schlagen im selben Jahr aus – 1923.",
        hinweis: "Dieses Blatt reicht für zwei Doppelstunden.",
        a: [fest("e", "E", "Erst erinnern", "Allein · ohne Heft", 5, "offen"),
          { id: "a1", nr: "1", name: "Eure Krise: ein Legetechnikvideo", form: "Gruppe", min: 45, frei: "offen" },
          { id: "a2", nr: "2", name: "Vier Krisen ansehen und bewerten", form: "Plenum, dann allein", min: 25, frei: "ansage", gleich: "Ihr seht euch die Videos aller Gruppen an. Danach bewertest du, wie stark jede Krise das Leben der Menschen trifft." },
          { id: "a3", nr: "3", name: "Wie hängen die Krisen zusammen?", form: "Zu zweit", min: 15, frei: "offen", muster: "kette" },
          { id: "a4", nr: "4", name: "Ein Wahlplakat für 1924", form: "Gruppe", min: 30, frei: "ansage", gleich: "Zweite Doppelstunde: Ihr entwerft ein Wahlplakat und vergleicht es mit Plakaten der Zeit." },
          { id: "a5", nr: "5", name: "Was das Krisenjahr an der Wahlurne bewirkt", form: "Allein", min: 12, frei: "antwort", nach: "a3" },
          fest("l", "L", "Landkarte", "Allein", 7, "antwort", "a3"), fest("s", "S", "Schreibauftrag", "Allein · auch von Hand", 15, "ansage"), fest("v", "V", "Verorten", "Allein", 3, "antwort", "s"), fest("z", "Z", "Zusammenfassung", "Zum Abheften", 4, "antwort", "s")],
        e: { fragen: [["Was sind Reparationen (M7)?", "Zahlungen des Verlierers für die Schäden des Krieges. Der Versailler Vertrag verpflichtete Deutschland dazu."], ["Wie stark waren SPD, Zentrum und DDP 1919 zusammen (M9)?", "Gut drei Viertel der Stimmen: 76,1 Prozent."]] },
        lk: { titel: "Wozu das Ganze?", anker: "Wozu Geschichte? (Abschnitt 1)", frage: "Ihr habt festgehalten, wie sich Menschen in ihrer Krise verhalten. Welchen Punkt aus „Wozu Geschichte?“ setzt diese Aufgabe um?", lead: "Denk an eure Videos: Was tun Menschen, wenn ihr Geld nichts mehr wert ist oder fremde Truppen einmarschieren? Vermute: Was lässt sich daraus für andere Zeiten lernen – und was nicht?",
          opt: [["1.2 Anthropologische Konstanten", "zentral", "Die Aufgabe fragt nach wiederkehrenden Mustern: wie Menschen in Krisen reagieren, wem sie die Schuld geben, wie Gruppen sich abgrenzen. Genau das meint der Eintrag."], ["1.3 Verständnis der Gegenwart", "begruendbar", "Stimmt: Du befragst 1923 mit Fragen von heute. Noch genauer trifft der Eintrag, der vom Verhalten der Menschen in Krisen spricht."], ["1.8 Demokratisches Bewusstsein", "begruendbar", "Das Krisenjahr zeigt, was eine Demokratie gefährdet. Die Aufgabe selbst richtet den Blick aber zuerst auf das Verhalten der Menschen."]] },
        s: { aufgabe: "<b>a) Erläutern Sie</b>, wie die Krisen des Jahres 1923 zusammenhängen.<br><b>b) Beurteilen Sie</b>, ob die Republik das Krisenjahr gestärkt oder geschwächt überstanden hat.", material: "<p><b>M1 · Krisen 1923:</b> Ruhrbesetzung (ab Januar) · passiver Widerstand · Hyperinflation · Aufstände von links (Oktober) · Hitler-Putsch (8./9. November).</p><p><b>M2 · Maßnahmen unter Reichskanzler Stresemann:</b> Abbruch des passiven Widerstands (September) · Rentenmark (15. November) · Einsatz der Reichswehr · Verhaftung und Verurteilung Hitlers.</p><p class=\"nachweis\">M1 und M2 nach dem Unterrichtsheft, M11. In der Stunde kommt M3 dazu (Reichstagswahl 1924).</p>", woerter: 150,
          stufen: [["Grundlegend", "Du nennst die Krisen in der richtigen Reihenfolge und sagst, ob die Republik für dich gestärkt oder geschwächt ist."], ["Sicher", "Du erklärst, wie eine Krise die nächste auslöst, und begründest dein Urteil mit einer Maßnahme und einer Zahl aus M3."], ["Souverän", "Du wägst ab: Was gelingt der Republik, was bleibt als Schaden im Gedächtnis der Menschen? Du kommst zu einem begründeten Urteil."]] },
        v: "Die Leitfrage dieses Abschnitts: Was hindert Demokratien daran, sich selbst zu verteidigen – damals wie heute? Was trägt diese Stunde zur Antwort bei?",
        z: { kern: "1923 treffen mehrere Krisen zugleich auf die Republik: Ruhrbesetzung, Hyperinflation, Aufstände von links und der Hitler-Putsch von rechts. Sie hängen eng zusammen. Unter Reichskanzler Stresemann übersteht die Republik das Jahr. Aber viele Menschen haben ihr Erspartes verloren – und ihr Vertrauen.",
          begriffe: [["Ruhrbesetzung", "Französische und belgische Truppen besetzen 1923 das Ruhrgebiet, weil Deutschland mit den Reparationen in Verzug ist."], ["Passiver Widerstand", "Die Arbeiter im Ruhrgebiet legen die Arbeit nieder; der Staat bezahlt sie weiter."], ["Hyperinflation", "Das Geld verliert in rasender Geschwindigkeit seinen Wert."], ["Rentenmark", "neue Währung vom 15. November 1923; beendet die Inflation."]],
          folge: [["Januar", "Französische und belgische Truppen besetzen das Ruhrgebiet; passiver Widerstand."], ["September", "Stresemann bricht den passiven Widerstand ab."], ["Oktober", "Aufstände von links in Sachsen, Thüringen und Hamburg."], ["8./9. Nov.", "Hitler-Putsch in München scheitert."], ["15. Nov.", "Rentenmark."]],
          lk: "Anthropologische Konstanten (1.2): Geschichte zeigt wiederkehrende Muster menschlichen Verhaltens, zum Beispiel wie Menschen in Krisen reagieren.", werkzeug: "Aus Geschichte lernt, wer Muster erkennt und zugleich die Unterschiede prüft." }
      }
    },
    ns: {
      name: "Nationalsozialismus", jahre: "1933–1945 und die Folgen", richtungen: ["N-A", "N-B", "N-C"], zaehl: "Blatt",
      frage: "Wer hat mitgemacht – und was wurde danach daraus?", frageArt: "Frage der Einheit (Vorschlag, aus dem Text der Startseite)",
      blaetter: [["M16", "Was macht den Menschen zum Menschen?"], ["M17", "Mein Leben in der NS-Diktatur"], ["M18", "Die fünf Säulen der NS-Ideologie"], ["M19", "Appeasement-Politik"], ["M20", "Der Krieg und seine Dilemmata"], ["M21", "Es geht um Menschen"], ["M22", "Wie war das möglich?"], ["M23", "Die Shoa im Ländervergleich"], ["M25", "Leben in Ruinen"], ["M26", "Ende gut, alles gut?"], ["M27", "Die Vergessenen"]],
      hier: 9,
      b: {
        nr: "M26", titel: "Ende gut, alles gut?", unter: "Kontinuitäten des Nationalsozialismus in der Bundesrepublik", frage: "Wie viel Nationalsozialismus steckte in der Bundesrepublik?",
        ziele: ["an einem Bereich zeigen, wo nach 1945 dieselben Menschen weiterarbeiteten,", "mindestens drei Gründe nennen, warum das möglich war,", "begründet beurteilen, ob die Bundesrepublik trotzdem ein demokratischer Neuanfang war."],
        alt: "Eigene Grafik: Zwischen den Jahren 1945 und 1949 liegt ein gestrichelter Einschnitt. Eine dicke Linie läuft ununterbrochen hindurch.",
        a: [fest("e", "E", "Erst erinnern", "Allein · ohne Heft", 4, "offen"),
          { id: "a1", nr: "1", name: "Erst schätzen", form: "Allein", min: 6, frei: "offen", muster: "schaetzen" },
          { id: "a2", nr: "2", name: "Der BND", form: "Allein · mit dem Heft", min: 15, frei: "antwort", nach: "a1" },
          { id: "a3", nr: "3", name: "Eure Gruppe", form: "Gruppe", min: 25, frei: "ansage", gleich: "Ihr untersucht einen Bereich der frühen Bundesrepublik und schreibt einen Steckbrief." },
          { id: "a4", nr: "4", name: "Vergleich", form: "Plenum", min: 25, frei: "ansage", gleich: "Die Gruppen stellen ihre Bereiche vor. Ihr füllt gemeinsam die Vergleichstafel." },
          fest("l", "L", "Landkarte", "Allein", 6, "antwort", "a1"), fest("s", "S", "Schreibauftrag", "Allein · auch von Hand", 15, "ansage"), fest("v", "V", "Verorten", "Allein, dann Plenum", 4, "antwort", "s"), fest("z", "Z", "Zusammenfassung", "Zum Abheften", 3, "antwort", "s")],
        e: { fragen: [["Wie sah Deutschland im Mai 1945 aus? Nenne drei Dinge (M25).", ""], ["Wer hatte gemeinsam gegen das nationalsozialistische Deutschland gekämpft?", ""]], quelle: "Die zwei Fragen stehen heute am Anfang von Ost-West Stunde 1. Für M26 schreibe ich sie im Pilot aus deiner Zusammenfassung zu M25." },
        lk: { titel: "Was für ein Satz ist das?", anker: "2.4.3 Vom Sachurteil zum Werturteil", frage: "Bevor du urteilst, trennst du drei Arten von Aussagen. Was für ein Satz ist das: „Die Bundesrepublik war trotz dieser Kontinuitäten ein demokratischer Neuanfang.“", lead: "Vermute zuerst: Woran erkennst du, ob ein Satz beschreibt, erklärt oder bewertet?",
          opt: [["Sachanalyse: Was ist geschehen? Was sagen die Quellen?", "kaum", "Lies noch einmal genau: Als Bewertung („gut genug?“) ist es ein Werturteil."], ["Sachurteil: Ursachen, Spielräume, Folgen – an Quellen prüfbar", "begruendbar", "Vertretbar, wenn du Kriterien nennst, die sich prüfen lassen – Grundgesetz, freie Wahlen, unabhängige Gerichte."], ["Werturteil: Bewertung von heute, mit eigenem Maßstab", "zentral", "Als Bewertung („gut genug?“) ist es ein Werturteil. Nennst du Kriterien, die sich prüfen lassen – Grundgesetz, freie Wahlen, unabhängige Gerichte –, wird ein Teil davon zum Sachurteil."]] },
        s: { aufgabe: "<b>Beurteilen Sie</b>, inwieweit die Bundesrepublik trotz der personellen Kontinuitäten ein demokratischer Neuanfang war. Trennen Sie Sachurteil und Werturteil.", material: "<p><b>M1 · Text zum BND</b> (Heft, M26) · <b>M2 · Steckbrief Ihrer Gruppe</b> · <b>M3 · Vergleichstafel der Klasse</b></p><p class=\"nachweis\">Vorschlag. Im Pilot richte ich die Aufgabe an deiner Klassenarbeitsaufgabe aus („Inwieweit war die Bundesrepublik tatsächlich ein demokratischer Neuanfang?“).</p>", woerter: 150, stufen: null },
        v: "Die Frage der Einheit: Wer hat mitgemacht – und was wurde danach daraus? Was trägt diese Stunde zur Antwort bei?",
        z: { kern: "Die Bundesrepublik begann mit einer neuen Verfassung – aber in vielen Behörden mit altem Personal. Wie stark diese Kontinuität war, unterscheidet sich je Bereich.",
          begriffe: [["Entnazifizierung", "Ab 1945 wollten die Alliierten NSDAP-Mitglieder und NS-Täter aus wichtigen Positionen entfernen."], ["Personelle Kontinuität", "Dieselben Menschen arbeiten nach 1945 in denselben Berufen und Ämtern weiter."], ["BND", "Auslandsgeheimdienst der Bundesrepublik, ab 1956 Bundesbehörde unter dem Kanzleramt. Chef: Reinhard Gehlen."]],
          folge: null, lk: "Vom Sachurteil zum Werturteil (2.4.3): erst die Sache, dann die Bewertung mit offengelegtem Maßstab.", werkzeug: "Drei Arten von Sätzen trennen: Was ist geschehen? Warum? Wie bewerte ich es – und nach welchem Maßstab?" }
      }
    },
    ow: {
      name: "Ost-West-Konflikt", jahre: "1945–1991", richtungen: ["O-A", "O-B", "O-C"], zaehl: "Blatt",
      frage: "Welchen Einfluss hatten Ideologien, Machtinteressen und Handlungsspielräume der Akteure – und wie wird dieser Konflikt heute erinnert?", frageArt: "Leitfrage der Einheit",
      blaetter: [["M29–30", "Die „Stunde Null“"], ["M31", "Kommunismus gegen Kapitalismus"], ["M32–33", "Die Berlin-Blockade"], ["M34", "Die doppelte Staatsgründung"], ["M35–36", "Die Bindung an den Westen"], ["M36–39", "Flucht aus der DDR und Mauerbau"], ["M40", "Geschichte im Staatsdienst?"], ["M41", "Wandel durch Annäherung"], ["M42–44", "Das Ende der DDR"]],
      hier: 5,
      b: {
        nr: "M36–39", titel: "Flucht aus der DDR und Mauerbau", frage: "Hätte es für die DDR eine Alternative zur Mauer gegeben?",
        ziele: ["die Fluchtbewegung in Zahlen beschreiben,", "Fluchtgründe aus Quellen herausarbeiten und ordnen,", "beurteilen, welche Möglichkeiten die DDR-Führung 1961 hatte."],
        alt: "Eigene Grafik aus den Zahlen der Stunde: 13 Balken für die Flüchtlinge pro Jahr von 1949 bis 1961, am Ende eine Mauer.",
        a: [fest("e", "E", "Erst erinnern", "Allein · ohne Heft", 3, "offen"),
          { id: "a1", nr: "1", name: "Die Zahlen", form: "Allein, dann zu zweit", min: 18, frei: "offen", muster: "zahlen" },
          { id: "a2", nr: "2", name: "Die Gründe", form: "Zu zweit", min: 22, frei: "antwort", nach: "a1" },
          { id: "a3", nr: "3", name: "Die Mauer", form: "Allein, dann Plenum", min: 18, frei: "ansage", gleich: "Ihr untersucht, wie die SED-Führung 1961 entscheidet – und welche Namen die Mauer bekommt." },
          fest("l", "L", "Landkarte", "Allein", 8, "antwort", "a1"), fest("s", "S", "Schreibauftrag", "Allein · auch von Hand", 15, "ansage"), fest("v", "V", "Verorten", "Allein", 14, "antwort", "s"), fest("z", "Z", "Zusammenfassung", "Zum Abheften", 3, "antwort", "s")],
        e: { fragen: [["Wie wurde die sowjetische Zone nach 1945 umgebaut? Nenne zwei Maßnahmen.", ""], ["Was änderte sich 1955 für beide deutsche Staaten?", ""]] },
        lk: { titel: "Vier Stimmen – und die anderen?", anker: "Prinzipien historischen Denkens (2.1)", frage: "Die vier Protokolle stammen von Menschen, die gegangen sind und im Westen befragt wurden. Was können uns diese Quellen sagen – und was nicht?", lead: "Wessen Stimme fehlt in diesen vier Quellen? Schreib einen Satz.",
          opt: [["2.1.5 Partialität", "zentral", "Quellen zeigen immer nur einen Teil. Diese vier stammen von Menschen, die die DDR verlassen hatten und in einem westlichen Aufnahmelager ihre Gründe nannten – dort, wo von der Antwort die Anerkennung als Flüchtling abhing. Wer blieb, wer zufrieden war, wer nicht gehen konnte, kommt nicht vor. Das macht die Protokolle nicht falsch, aber unvollständig."], ["2.1.2 Perspektivität", "begruendbar", "Begründbar: Die Protokolle zeigen die Sicht der Geflüchteten. Gefragt war aber, dass uns von vornherein nur ein Teil der Stimmen vorliegt."], ["2.1.1 Retrospektivität", "kaum", "Dieses Prinzip gilt für jede Geschichte. Es erklärt aber nicht gut, worin sich die Darstellungen hier unterscheiden. Lies deine Vermutung noch einmal: Was genau ist hier anders erzählt?"]] },
        s: { aufgabe: "<b>a) Analysieren Sie</b> die Fluchtbewegung aus der DDR von 1949 bis 1961 (M1, M2).<br><b>b) Erörtern Sie</b>, ob die SED-Führung 1961 eine Alternative zum Bau der Mauer hatte.", material: "<p><b>M1 · Flüchtlinge aus der DDR:</b> 1949: 129 245 · 1953: 331 390 (Höchststand, Jahr des 17. Juni) · 1949 bis 1961 zusammen rund 2,7 Millionen, etwa die Hälfte jünger als 25 Jahre.</p><p><b>M2 · Gründe aus vier Protokollen:</b> politischer Druck, Gewissensgründe, Druck zum Eintritt in Partei und Organisationen, Mangel, Verdienst, Familie.</p>", woerter: 140,
          stufen: [["Grundlegend", "Du nennst Zahlen und zwei Fluchtgründe und sagst, ob es eine Alternative gab."], ["Sicher", "Du erklärst die Zahlen mit den Gründen und nennst eine Alternative mit ihrem Risiko für die SED."], ["Souverän", "Du trennst „keine Alternative“ von „keine, die die SED-Führung gehen wollte“ und kommst zu einem begründeten Ergebnis."]] },
        v: "Die Leitfrage der Einheit: Welchen Einfluss hatten Ideologien, Machtinteressen und Handlungsspielräume der Akteure – und wie wird dieser Konflikt heute erinnert? Was trägt diese Stunde zur Antwort bei?",
        z: { kern: "Von 1949 bis 1961 verlassen rund 2,7 Millionen Menschen die DDR, die Hälfte jünger als 25. Die SED-Führung ändert nicht die Verhältnisse, sondern schließt die letzte offene Grenze.",
          begriffe: [["Fluchtbewegung", "Rund 2,7 Millionen Menschen verlassen 1949–1961 die DDR, vor allem über Berlin."], ["Notaufnahmelager Marienfelde", "Lager in West-Berlin, in dem Flüchtlinge aus der DDR aufgenommen und befragt wurden."], ["Kollektivierung", "Zusammenschluss von Bauernhöfen zu Landwirtschaftlichen Produktionsgenossenschaften (LPG), oft unter Druck."], ["13. August 1961", "Beginn des Mauerbaus quer durch Berlin."]],
          folge: [["1949", "129 245 Flüchtlinge"], ["1953", "331 390 – Höchststand (17. Juni)"], ["1960/61", "Kollektivierung, neue Fluchtwelle"], ["13. Aug. 1961", "Mauerbau"]],
          lk: "Partialität (2.1.5): Quellen zeigen immer nur einen Teil der Vergangenheit, und nur ein Teil der Quellen ist überhaupt erhalten.", werkzeug: "Überlieferung prüfen: Wer hat diese Quelle hinterlassen – und wer nicht? In welcher Lage entstand sie? Welche Stimmen fehlen, und wo könnte ich sie finden?" }
      }
    }
  };

  /* ---------- Stand: ein Speicher für alles, als Datei zu sichern ---------- */
  const KEY = "ggk-arbeitsblatt-muster:v1";
  const leer = () => ({ v: 1, einheit: "ns", richtung: { weimar: "W-A", ns: "N-A", ow: "O-A" }, sicht: "blatt", st: { weimar: {}, ns: {}, ow: {} } });
  let D = leer(), aus = false;
  try { const d = JSON.parse(localStorage.getItem(KEY) || "null"); if (d && d.v === 1 && d.st) D = Object.assign(leer(), d); } catch (e) { /* ohne Speicher läuft die Seite weiter */ }
  const sichern = () => { if (aus) return; D.stand = heute(); try { localStorage.setItem(KEY, JSON.stringify(D)); } catch (e) { /* kein Speicher */ } };
  const St = () => { const s = D.st[D.einheit] || (D.st[D.einheit] = {}); ["f", "ansage", "fest"].forEach(k => { if (!s[k] || typeof s[k] !== "object") s[k] = {}; }); return s; };
  const Ei = () => E[D.einheit], B = () => Ei().b;
  const F = k => St().f[k] || "";

  /* ---------- Freigabe und Stand je Auftrag ---------- */
  const auftrag = id => B().a.find(a => a.id === id);
  function erledigt(a) {
    const s = St();
    if (a.id === "e") return B().e.fragen.every((q, i) => F("e" + i).trim().length > 1);
    if (a.muster === "schaetzen") return !!s.fest.schaetz && F("vermutung").trim().length > 1;
    if (a.muster === "kette") return F("v1").trim().length > 1 && F("v2").trim().length > 1;
    if (a.muster === "zahlen") return !!s.fest.schaetz && F("lesen").trim().length > 1;
    if (a.id === "l") return !!s.fest.lk;
    if (a.id === "s") return worte(F("text")) >= 60 || !!s.fest.hand;
    if (a.id === "v") return worte(F("spur")) >= 5;
    if (a.id === "z") return !!s.fest.z;
    return false;
  }
  const offen = a => a.frei === "offen" || (a.frei === "ansage" && !!St().ansage[a.id]) || (a.frei === "antwort" && erledigt(auftrag(a.nach)));
  function stand(a) {
    if (St().ort === a.id) return ["hier", "du bist hier"];
    if (!offen(a)) return a.frei === "ansage" ? ["ansage", "öffnet auf Ansage"] : ["gesperrt", "öffnet nach deiner Antwort"];
    if (erledigt(a)) return ["erledigt", "✓ erledigt"];
    return ["offen", "offen"];
  }

  /* ---------- Bausteine ---------- */
  const linien = (k, lab, rows, platz) => `<div class="feld"><label for="f-${k}">${lab}</label><textarea class="linien" id="f-${k}" data-f="${k}" rows="${rows || 3}" placeholder="${esc(platz || "")}">${esc(F(k))}</textarea></div>`;
  const zeile = (k, lab) => `<div class="feld"><label for="f-${k}">${lab}</label><input class="linien" type="text" id="f-${k}" data-f="${k}" value="${esc(F(k))}"></div>`;
  const akopf = (a, art) => `<div class="akopf"${a.fest ? " data-fest" : ""}><span class="nr" aria-hidden="true">${esc(a.nr)}</span><p class="aart">${art || (a.fest ? "Fester Baustein " + esc(a.nr) : "Arbeitsauftrag " + esc(a.nr))}</p><h2>${esc(a.titel || a.name)}</h2><p class="ameta">${esc(a.form)} · ${a.min} Minuten</p></div>`;
  const kasten = (art, kopf, innen) => `<div class="kasten kasten--${art}"><p class="kasten__kopf">${kopf}</p>${innen}</div>`;
  const blattkopf = () => { const e = Ei(); return `<div class="blattkopf"><span><b>GGK</b> · ${esc(e.name)}</span><span><b>${esc(B().nr)}</b> · Blatt ${e.hier + 1} von ${e.blaetter.length} im Hefter</span><span>Datum: ${heute()}</span></div>`; };
  const punkte = (n, bis) => { let h = ""; for (let i = 0; i < 100; i++) h += `<i class="${i < n ? "an" : (bis && i < bis ? "spanne" : "")}"></i>`; return h; };

  /* ---------- Seiten ---------- */
  function deck() {
    const e = Ei(), b = B(), i = e.hier, vor = e.blaetter[i - 1], nach = e.blaetter[i + 1], sum = b.a.reduce((n, a) => n + a.min, 0), erste = b.a.find(a => !a.fest);
    return `<div class="deck"><div class="deck__kopf"><span class="reiter">${esc(b.nr)}</span><h1>${esc(b.titel)}</h1>${b.unter ? `<p class="klein" style="margin:0">${esc(b.unter)}</p>` : ""}
      <div><p class="marke">Zentrale Frage</p><p class="zfrage">${esc(b.frage)}</p></div>
      <p class="platz"><span><b>Platz im Hefter:</b> Blatt ${i + 1} von ${e.blaetter.length}${vor ? " · davor " + esc(vor[0]) + " " + esc(vor[1]) : ""}${nach ? " · danach " + esc(nach[0]) + " " + esc(nach[1]) : ""}</span></p>
      <div class="reihe"><button type="button" class="knopf knopf--haupt" data-zu="e">Los geht’s: Erst erinnern <span aria-hidden="true">→</span></button>${St().letzt && St().letzt !== "deck" ? `<button type="button" class="knopf" data-zu="${esc(St().letzt)}">Weiter, wo du warst</button>` : ""}</div></div>
      <figure class="titelbild">${BILD[D.einheit](b.alt)}<figcaption class="nachweis">${NACHWEIS}</figcaption></figure>
      <div class="deck__unten"><div class="kasten kasten--sichern"><p class="kasten__kopf">Am Ende kannst du …</p><ul>${b.ziele.map(z => `<li>${esc(z)}</li>`).join("")}</ul></div>
      <div><p class="marke">So läuft dieses Blatt</p><table class="ablauf"><tbody>${b.a.map(a => `<tr><td>${esc(a.nr)}</td><td>${esc(a.name)}<span class="form">${esc(a.form)}</span></td><td>${a.min} Min.</td></tr>`).join("")}<tr><td></td><td>Zusammen</td><td>${sum} Min.</td></tr></tbody></table>
      <p class="klein" style="margin-top:.5rem">${b.hinweis ? esc(b.hinweis) + " " : ""}Buchstaben stehen für feste Bausteine: Sie kommen in jedem Blatt an derselben Stelle. Zahlen gehören den Aufträgen der Stunde.</p></div></div></div>`;
  }
  function seiteE(a) {
    const b = B(), s = St(), alle = b.e.fragen.every((q, i) => F("e" + i).trim().length > 1), auf = !!s.fest.e, hat = b.e.fragen.some(q => q[1]);
    return akopf(a) + `<div class="block">${kasten("auftrag", "Dein Auftrag", "<h3>Ohne Heft, aus dem Kopf</h3><p>Beantworte die Fragen in Stichworten. Raten ist erlaubt. " + (hat ? "Danach deckst du auf." : "Danach vergleicht ihr im Plenum.") + "</p>")}
      ${b.e.fragen.map((q, i) => zeile("e" + i, esc(q[0]))).join("")}
      ${hat ? (auf ? `<div class="kasten kasten--material aufdecken"><p class="kasten__kopf">Zum Vergleich</p><ol>${b.e.fragen.map(q => `<li>${esc(q[1])}</li>`).join("")}</ol></div>` : `<div class="reihe"><button type="button" class="knopf" data-akt="e-auf" ${alle ? "" : "disabled"}>Aufdecken</button><span class="klein">${alle ? "" : "Erst beide Fragen beantworten."}</span></div>`) : ""}
      ${b.e.quelle ? `<p class="nachweis">${esc(b.e.quelle)}</p>` : ""}</div>`;
  }
  function musterSchaetzen(a) {
    const s = St(), zu = !!s.fest.schaetz, n = +(s.f.n || 5);
    return akopf(a) + `<div class="block">${kasten("auftrag", "Dein Auftrag", "<h3>Leg dich fest, bevor du etwas liest</h3><p>Du kommst am Ende darauf zurück.</p>")}
      <div class="neben"><div class="block"><p><b>Der Geheimdienst.</b> Der Bundesnachrichtendienst (BND) ist der Auslandsgeheimdienst der Bundesrepublik. Stell dir 100 seiner Mitarbeiter in den frühen Jahren vor. <b>Wie viele von ihnen waren nach deiner Schätzung im Nationalsozialismus an Mordaktionen beteiligt?</b></p>
        <div class="schieber"><label for="f-n">Meine Schätzung: <b id="nwert">${n}</b> von 100</label><input type="range" id="f-n" data-f="n" min="0" max="50" step="1" value="${n}" ${zu ? "disabled" : ""}></div>
        <div class="reihe">${zu ? '<span class="stempel">Festgelegt</span>' : '<button type="button" class="knopf knopf--haupt" data-akt="schaetz">Festlegen</button>'}</div>
        ${zu ? linien("vermutung", "Frage für die Stunde: Wie kommt es zu dem Abstand zwischen „ein Prozent“ und „10 bis 20 Prozent“ – und warum fiel er so lange niemandem auf? Meine erste Vermutung:", 3) : ""}</div>
      ${zu ? `<div class="kasten kasten--material aufdecken"><p class="kasten__kopf">M1 · Drei Zahlen nebeneinander</p><p>Jeder Punkt steht für einen von 100 Mitarbeitern.</p>
        <div class="pfelder"><figure><div class="pf" role="img" aria-label="${n} von 100 Punkten gefüllt">${punkte(n)}</div><figcaption><b>${n} von 100</b>Deine Schätzung</figcaption></figure>
        <figure><div class="pf" role="img" aria-label="1 von 100 Punkten gefüllt">${punkte(1)}</div><figcaption><b>1 von 100</b>Das sagte BND-Chef Reinhard Gehlen dem Kanzleramt: „Ein Prozent“.</figcaption></figure>
        <figure><div class="pf" role="img" aria-label="10 Punkte gefüllt, 10 weitere schraffiert">${punkte(10, 20)}</div><figcaption><b>10 bis 20 von 100</b>Das ergab die Studie des Historikers Gerhard Sälter.</figcaption></figure></div>
        <p class="nachweis"><b>Belegt:</b> Zahlen nach tagesschau.de, 10.10.2022 (Christine Rütten, hr): „Neue Studie: BND rekrutierte gezielt NS-Verbrecher“ – der Text steht in deinem Heft. <b>Modell:</b> Die Punkte veranschaulichen den Anteil. Sie zeigen keine einzelnen Personen; die schraffierten Punkte stehen für die Spanne.</p></div>`
        : kasten("zu", "M1 · Drei Zahlen nebeneinander", "<p>Das Material öffnet sich nach deiner Festlegung.</p>")}</div></div>`;
  }
  function musterKette(a) {
    const s = St(), beide = F("v1").trim().length > 1 && F("v2").trim().length > 1, auf = !!s.fest.kette;
    return akopf(a) + `<div class="block">${kasten("auftrag", "Euer Auftrag", "<h3>Zusammenhänge</h3><p>Zeigt auf, welche Krisen miteinander zusammenhängen – und wie. Zieht mindestens zwei Verbindungen und belegt sie mit Argumenten. Vergleicht danach mit der Wirkungskette.</p>")}
      <div class="neben"><div class="kasten kasten--material"><p class="kasten__kopf">M1 · Die Krisen des Jahres 1923</p><div class="karten"><div>Ruhrbesetzung (ab Januar)</div><div>Passiver Widerstand</div><div>Hyperinflation</div><div>Aufstände von links (Oktober)</div><div>Hitler-Putsch (8./9. November)</div></div><p class="nachweis">Nach dem Unterrichtsheft, M11.</p></div>
      <div class="block">${linien("v1", "Verbindung 1: Welche zwei Krisen hängen zusammen – und wie?", 3)}${linien("v2", "Verbindung 2", 3)}</div></div>
      ${auf ? `<div class="kasten kasten--material aufdecken"><p class="kasten__kopf">Zum Vergleich · Wirkungskette</p><ol class="kette">${["Reparationen im Verzug", "Ruhrbesetzung", "passiver Widerstand, vom Staat bezahlt", "Geld wird gedruckt", "Hyperinflation", "Vertrauen geht verloren", "Aufstände von links, Putsch von rechts"].map(x => `<li>${x}</li>`).join("")}</ol><p class="nachweis"><b>Modell:</b> Wirkungskette nach dem Erwartungshorizont des Unterrichtsheftes, M11. Es zeigt die Hauptlinie, nicht alle Ursachen.</p></div>`
        : `<div class="reihe"><button type="button" class="knopf" data-akt="kette" ${beide ? "" : "disabled"}>Mit der Wirkungskette vergleichen</button><span class="klein">${beide ? "" : "Öffnet nach euren zwei Verbindungen."}</span></div>`}</div>`;
  }
  function musterZahlen(a) {
    const s = St(), zu = !!s.fest.schaetz, j = Math.min(12, Math.max(0, +(s.f.jahr || 0))), max = 331390;
    const sum = FLUCHT.slice(0, j + 1).reduce((n, z) => n + z[1], 0), z = FLUCHT[j];
    return akopf(a) + `<div class="block">${kasten("auftrag", "Dein Auftrag", "<h3>Erst schätzen</h3><p>In der sowjetischen Zone lebten 1949 rund 18 Millionen Menschen. Wie viele verließen die DDR von 1949 bis 1961? Trag deine Schätzung ein.</p>")}
      <div class="neben"><div class="block">${zu ? `<p><b>Meine Schätzung:</b> ${esc(F("schaetz"))} Personen</p>` : zeile("schaetz", "Meine Schätzung (Personen)")}
        <div class="reihe">${zu ? '<span class="stempel">Festgelegt</span>' : `<button type="button" class="knopf knopf--haupt" data-akt="schaetz" ${F("schaetz").trim() ? "" : "disabled"}>Festlegen</button><span class="klein">${F("schaetz").trim() ? "" : "Erst eine Zahl eintragen."}</span>`}</div>
        ${zu ? linien("lesen", "Zu zweit: In welchem Jahr gehen die meisten? Was fällt beim Anteil der Jugendlichen auf? Was könnte 1953 geschehen sein? (Die Antwort kommt in Stunde 7.)", 4) : ""}</div>
      ${zu ? `<div class="kasten kasten--material aufdecken"><p class="kasten__kopf">M1 · Flüchtlinge aus der DDR, 1949 bis 1961</p><p><b>Zieh die Zeit:</b> Wann gehen die meisten – und wie schnell wächst die Summe?</p>
        <div class="zeit"><div class="zeit__bild" role="img" aria-label="Balken für die Jahre 1949 bis ${z[0]}">${FLUCHT.map((x, i) => `<i class="${i < j ? "da" : (i === j ? "da jetzt" : "")}" style="height:${i <= j ? Math.round(x[1] / max * 100) + "%" : "6px"}"></i>`).join("")}</div>
        <div class="zeit__achse" aria-hidden="true">${FLUCHT.map(x => `<span>${String(x[0]).slice(2)}</span>`).join("")}</div>
        <div class="zeit__regler"><button type="button" data-akt="jahr-" aria-label="Ein Jahr zurück">‹</button><input type="range" id="f-jahr" data-f="jahr" min="0" max="12" step="1" value="${j}" aria-label="Jahr wählen, 1949 bis 1961"><button type="button" data-akt="jahr+" aria-label="Ein Jahr weiter">›</button></div>
        <p class="zeit__wort" id="zeitwort" aria-live="polite"><b>${z[0]}:</b> ${zahl(z[1])} Menschen${z[2] ? ", davon " + String(z[2]).replace(".", ",") + " % jünger als 25" : ""}.<br>Seit 1949 zusammen: <b>${zahl(sum)}</b>.</p></div>
        <p class="nachweis"><b>Belegt:</b> Monatsmeldungen des Bundesministeriums für Vertriebene, Flüchtlinge und Kriegsgeschädigte; Jürgen Rühle/Gunter Holzweißig, Der 13. August. Die Mauer von Berlin, 3. Aufl., Köln 1988, S. 154. Nach dem Unterrichtsheft, M36. Deine Schätzung: ${esc(F("schaetz"))}.</p></div>`
        : kasten("zu", "M1 · Flüchtlinge aus der DDR, 1949 bis 1961", "<p>Das Material öffnet sich nach deiner Festlegung.</p>")}</div></div>`;
  }
  function seiteL(a) {
    const k = B().lk, s = St(), zu = !!s.fest.lk, w = s.f.lkwahl, bereit = worte(F("lkv")) >= 3 && w !== undefined && w !== "" && worte(F("lkb")) >= 3;
    const o = zu ? k.opt[+w] : null, wort = { zentral: "Zentral", begruendbar: "Auch begründbar", kaum: "Passt kaum" };
    return akopf(Object.assign({}, a, { titel: "Landkarte: " + k.titel }), "Fester Baustein L · kognitive Landkarte") + `<div class="block">
      ${kasten("auftrag", "Dein Auftrag in drei Schritten", `<p>${esc(k.frage)}</p>`)}
      ${linien("lkv", "1 · Vermuten: " + esc(k.lead), 2)}
      <fieldset class="wahl"><legend>2 · Benennen: Welcher Eintrag der Landkarte passt am besten? (${esc(k.anker)})</legend>${k.opt.map((x, i) => `<label><input type="radio" name="lkwahl" value="${i}" data-f="lkwahl" ${String(w) === String(i) ? "checked" : ""} ${zu ? "disabled" : ""}><span>${esc(x[0])}</span></label>`).join("")}</fieldset>
      ${linien("lkb", "3 · Belegen: An welcher Stelle der Stunde zeigt sich das? Ein Satz.", 2)}
      ${zu ? `<div class="stufe aufdecken" data-stufe="${o[1]}" role="status"><b>${wort[o[1]]}.</b> ${esc(o[2])}</div><p class="klein">Die Landkarte liegt im Paket: <span style="text-decoration:underline">${esc(k.anker)} nachlesen</span>.</p>`
        : `<div class="reihe"><button type="button" class="knopf knopf--haupt" data-akt="lk" ${bereit ? "" : "disabled"}>Festlegen</button><span class="klein">${bereit ? "Die Rückmeldung kommt nach deiner Festlegung." : "Erst alle drei Schritte."}</span></div>`}</div>`;
  }
  function seiteS(a) {
    const b = B().s, s = St(), w = worte(F("text")), fertig = w >= 60 || !!s.fest.hand;
    return akopf(a, "Fester Baustein S · wie in der Klassenarbeit") + `<div class="block schreibblatt">
      <div class="kasten kasten--sichern"><p class="kasten__kopf">So wird gefragt</p>${b.material}<p>${b.aufgabe}</p><p class="klein">Umfang: etwa ${b.woerter} Wörter – eine halbe Seite. In der Klassenarbeit: höchstens eine Seite.</p></div>
      <div class="feld"><span class="lab">Erst gliedern: drei Stichpunkte</span>${[1, 2, 3].map(i => `<input class="linien" type="text" data-f="g${i}" value="${esc(F("g" + i))}" aria-label="Stichpunkt ${i}">`).join("")}</div>
      <div class="textfeld">${linien("text", "Mein Text", 9)}<p class="zaehler nodruck" id="zaehler">${w} von etwa ${b.woerter} Wörtern</p></div>
      <div class="reihe nodruck"><button type="button" class="knopf" data-akt="drucken">Schreibblatt drucken (A4)</button><label class="haken"><input type="checkbox" data-akt="hand" ${s.fest.hand ? "checked" : ""}> Ich habe von Hand geschrieben</label></div>
      ${fertig ? `<div class="kasten kasten--material aufdecken nodruck"><p class="kasten__kopf">Kriterien zum Abgleich</p>${b.stufen ? `<dl style="margin:0">${b.stufen.map(x => `<dt><b>${esc(x[0])}</b></dt><dd style="margin:0 0 .5rem">${esc(x[1])}</dd>`).join("")}</dl>` : "<p>Die drei Stufen (grundlegend · sicher · souverän) schreibe ich im Pilot aus deinem Erwartungshorizont.</p>"}<p class="klein">Erwartete Inhalte: bei deiner Lehrkraft. Punkte vergibt das Blatt nicht.</p></div>`
        : `<div class="nodruck">${kasten("zu", "Kriterien zum Abgleich", "<p>Sie öffnen sich nach deinem Text – ab 60 Wörtern oder wenn du von Hand geschrieben hast.</p>")}</div>`}</div>`;
  }
  function seiteV(a) {
    const e = Ei(), frueher = e.blaetter.slice(0, e.hier);
    return akopf(a, "Fester Baustein V") + `<div class="block">${kasten("auftrag", "Dein Auftrag", "<h3>Ein Satz für die Lernspur</h3><p>" + esc(B().v) + "</p>")}
      ${linien("spur", "Mein Satz (er wandert in deinen Hefter)", 2)}
      <div class="feld"><label for="f-vb">Verbinden: Mit welchem früheren Blatt hängt dieses zusammen?</label><select id="f-vb" data-f="vb" class="linien" style="height:48px"><option value="">Bitte wählen</option>${frueher.map(x => `<option ${F("vb") === x[0] ? "selected" : ""} value="${esc(x[0])}">${esc(x[0])} · ${esc(x[1])}</option>`).join("")}</select></div>
      ${linien("vw", "… und wie? Ein Satz mit „weil“ oder „aber“.", 2)}</div>`;
  }
  function seiteZ(a) {
    const b = B(), z = b.z, s = St(); s.fest.z = 1;
    const mein = (t, l) => `<p style="border-left:3px solid var(--platte);padding-left:.6rem">${esc(String(t || "").trim() || l)}</p>`;
    return akopf(a, "Fester Baustein Z · zum Abheften") + `<div class="block"><div class="reihe nodruck"><button type="button" class="knopf knopf--haupt" data-akt="drucken">Drucken oder als PDF sichern</button><button type="button" class="knopf" data-akt="datei">Stand als Datei sichern</button><span class="klein">Zwei Seiten A4. In GoodNotes ablegen.</span></div>
      <p class="zfrage">${esc(b.frage)}</p>
      <div class="zf"><section><h3>Das musst du wissen</h3><p><b>${esc(z.kern)}</b></p><dl>${z.begriffe.map(x => `<dt>${esc(x[0])}</dt><dd>${esc(x[1])}</dd>`).join("")}</dl>
        ${z.folge ? `<table class="tab" style="margin-top:.8rem"><tbody>${z.folge.map(x => `<tr><td><b>${esc(x[0])}</b></td><td>${esc(x[1])}</td></tr>`).join("")}</tbody></table>` : ""}</section>
      <section><h3>Das musst du können</h3><p><b>Landkarte.</b> ${esc(z.lk)}</p><p><b>Denkwerkzeug.</b> ${esc(z.werkzeug)}</p><p><b>So wird gefragt.</b> ${b.s.aufgabe}</p>
        <p><b>Mein Text.</b></p>${mein(s.fest.hand && !F("text").trim() ? "Von Hand geschrieben – liegt als Schreibblatt im Hefter." : F("text"), "noch offen")}
        <p><b>Mein Satz für die Lernspur.</b></p>${mein(F("spur"), "noch offen")}</section></div></div>`;
  }
  function seiteOffen(a) {
    return akopf(a) + `<div class="block">${kasten("zu", "Im Musterblatt nicht gebaut", "<p>Diesen Auftrag gibt es in der Stunde schon. Er wird beim Übertragen in das neue Blatt gesetzt. Das Musterblatt zeigt je Einheit einen Auftrag ganz und alle festen Bausteine.</p>")}</div>`;
  }
  function seiteZu(a) {
    if (a.frei === "ansage") return akopf(a) + `<div class="block" style="justify-items:center;text-align:center;padding:1.5rem 0"><h3>Dieser Auftrag öffnet auf Ansage.</h3>${a.gleich ? `<p><b>Darum geht es gleich:</b> ${esc(a.gleich)}</p>` : ""}
      <button type="button" class="knopf knopf--haupt" data-akt="ansage">Unsere Lehrkraft hat freigegeben</button>
      <div class="kasten kasten--sichern" id="ansagefrage" hidden><p><b>Wirklich öffnen?</b> Öffne nur, wenn eure Lehrkraft es angesagt hat.</p><div class="reihe" style="justify-content:center"><button type="button" class="knopf knopf--haupt" data-akt="ansage-ja">Ja, öffnen</button><button type="button" class="knopf" data-akt="ansage-nein">Noch nicht</button></div></div></div>`;
    const v = auftrag(a.nach);
    return akopf(a) + `<div class="block">${kasten("zu", "Noch geschlossen", `<p>Dieser Auftrag öffnet sich nach deiner Antwort in <b>${esc(v.nr)} · ${esc(v.name)}</b>.</p><button type="button" class="knopf" data-zu="${esc(v.id)}">Zu ${esc(v.nr)} · ${esc(v.name)}</button>`)}</div>`;
  }
  function seite(id) {
    if (id === "deck") return deck();
    const a = auftrag(id); if (!a) return deck();
    if (!offen(a)) return seiteZu(a);
    if (a.id === "e") return seiteE(a);
    if (a.muster === "schaetzen") return musterSchaetzen(a);
    if (a.muster === "kette") return musterKette(a);
    if (a.muster === "zahlen") return musterZahlen(a);
    if (a.id === "l") return seiteL(a);
    if (a.id === "s") return seiteS(a);
    if (a.id === "v") return seiteV(a);
    if (a.id === "z") return seiteZ(a);
    return seiteOffen(a);
  }

  /* ---------- Rahmen ---------- */
  function registerHTML() {
    const b = B(), sum = b.a.reduce((n, a) => n + a.min, 0);
    return `<aside class="ab-reg" aria-label="Aufträge dieses Blatts"><p class="ab-reg__kopf">Dieses Blatt · ${sum} Minuten</p><ol>
      <li><button type="button" class="reg" data-zu="deck" data-fest><span class="reg__nr" aria-hidden="true">D</span><span class="reg__text"><b>Deckblatt</b><small>Frage, Ziele, Ablauf</small><span class="reg__stand"></span></span></button></li>
      ${b.a.map(a => `<li><button type="button" class="reg" data-zu="${a.id}"${a.fest ? " data-fest" : ""}><span class="reg__nr" aria-hidden="true">${esc(a.nr)}</span><span class="reg__text"><b>${esc(a.name)}</b><small>${esc(a.form)} · ${a.min} Min.</small><span class="reg__stand"></span></span></button></li>`).join("")}</ol>
      <details class="ab-reg__mehr"><summary>Stand sichern · Ansicht · Löschen</summary><div class="ab-reg__fuss"><button type="button" class="knopf" data-akt="datei">Stand als Datei sichern</button><button type="button" class="knopf" data-akt="laden">Stand aus Datei laden</button><button type="button" class="knopf" data-akt="loeschen">Eingaben löschen …</button>
        <label>Ansicht <select data-akt-wahl="ansicht"><option value="hell">Hell</option><option value="beamer">Beamer</option></select></label>
        <label><input type="checkbox" data-akt="bewegung"> Weniger Bewegung</label>
        <p class="klein">Alles bleibt auf diesem Gerät. Nichts wird gesendet. Sichere deinen Stand als Datei, bevor du das Gerät wechselst.</p></div></details></aside>`;
  }
  function registerStand() {
    const s = St();
    $$(".reg").forEach(k => {
      const id = k.getAttribute("data-zu"), st = id === "deck" ? [s.ort === "deck" || !s.ort ? "hier" : "offen", s.ort === "deck" || !s.ort ? "du bist hier" : ""] : stand(auftrag(id));
      k.setAttribute("data-stand", st[0]); $(".reg__stand", k).textContent = st[1];
      if (st[0] === "hier") k.setAttribute("aria-current", "page"); else k.removeAttribute("aria-current");
    });
  }
  function fussHTML() {
    const b = B(), liste = [{ id: "deck", nr: "D", name: "Deckblatt" }].concat(b.a), i = liste.findIndex(a => a.id === (St().ort || "deck")), v = liste[i - 1], n = liste[i + 1];
    return `${v ? `<button type="button" class="knopf" data-zu="${v.id}"><span aria-hidden="true">‹</span> ${esc(v.nr)} ${esc(v.name)}</button>` : "<span></span>"}${n ? `<button type="button" class="knopf knopf--haupt" data-zu="${n.id}">${esc(n.nr)} ${esc(n.name)} <span aria-hidden="true">›</span></button>` : `<button type="button" class="knopf knopf--haupt" data-sicht="hefter">Zum Hefter <span aria-hidden="true">›</span></button>`}`;
  }
  function blattHTML() {
    const e = Ei(), b = B();
    return `<header class="ab-kopf"><span class="reiter">${esc(b.nr)}</span><div class="ab-kopf__titel"><b>${esc(b.titel)}</b><span>Hefter ${esc(e.name)} · Arbeitsblatt ${e.hier + 1} von ${e.blaetter.length}</span></div><button type="button" class="knopf" data-sicht="hefter"><span aria-hidden="true">←</span> Hefter</button></header>
      <div class="ab-rahmen">${registerHTML()}<main class="ab-tisch"><article class="ab-blatt" id="blatt" tabindex="-1"></article><nav class="ab-fuss" id="fuss" aria-label="Vor und zurück"></nav></main></div>`;
  }
  function zeigen(id, neu) {
    const s = St(); s.ort = id || "deck"; if (s.ort !== "deck") s.letzt = s.ort; sichern();
    const bl = $("#blatt"); if (!bl) return;
    bl.innerHTML = blattkopf() + seite(s.ort); sichern();
    bl.classList.remove("neu"); if (neu) { void bl.offsetWidth; bl.classList.add("neu"); }
    $("#fuss").innerHTML = fussHTML(); registerStand();
    if (neu) { window.scrollTo(0, Math.max(0, $(".ab").offsetTop)); }
  }

  /* ---------- Hefter ---------- */
  function hefterHTML() {
    const e = Ei(), b = B(), s = St(), fertig = b.a.filter(a => offen(a) && erledigt(a)).length, spur = F("spur").trim();
    return `<header class="ab-kopf"><span class="reiter">H</span><div class="ab-kopf__titel"><b>Hefter ${esc(e.name)}</b><span>${esc(e.jahre)} · ${e.blaetter.length} Blätter · dein Überblick wächst</span></div><button type="button" class="knopf" data-sicht="blatt">Zum Blatt ${esc(b.nr)} <span aria-hidden="true">→</span></button></header>
      <div class="hefter"><div class="hefter__kopf"><div><p class="marke">GGK · Hefter</p><h1>${esc(e.name)}</h1><div><p class="marke">${esc(e.frageArt)}</p><p class="zfrage" style="max-width:40ch">${esc(e.frage)}</p></div>
        <div class="reihe"><button type="button" class="knopf knopf--haupt" data-sicht="blatt">Weiter mit ${esc(b.nr)}: ${esc(b.titel)} <span aria-hidden="true">→</span></button></div></div>
        <div class="kasten kasten--sichern"><p class="kasten__kopf">Auf einen Blick</p><dl class="blick"><div><dt>${s.fest.z ? 1 : 0} <small>von ${e.blaetter.length}</small></dt><dd>Blätter abgeheftet (Zusammenfassung geöffnet)</dd></div><div><dt>${fertig} <small>von ${b.a.length}</small></dt><dd>Bausteine in ${esc(b.nr)} erledigt</dd></div><div><dt>${spur ? 1 : 0}</dt><dd>Sätze in deiner Lernspur</dd></div></dl>
        <div class="reihe" style="margin-top:.7rem"><button type="button" class="knopf" data-akt="datei">Stand als Datei sichern</button><button type="button" class="knopf" data-akt="laden">Stand laden</button></div><p class="klein" style="margin:.5rem 0 0">Alles liegt nur auf diesem Gerät. Eine Datei für den ganzen Hefter.</p></div></div>
      <section><h2>Die Blätter</h2><p class="klein">In der Reihenfolge des Unterrichts. Im Musterblatt ist nur ${esc(b.nr)} gebaut.</p><ol class="blaetter">${e.blaetter.map((x, i) => `<li${i === e.hier ? " data-hier" : ""}><span class="reiter">${esc(x[0])}</span><span><b>${esc(x[1])}</b><small>${i === e.hier ? (s.fest.z ? "abgeheftet" : (fertig ? "begonnen · " + fertig + " von " + b.a.length + " Bausteinen" : "noch nicht begonnen")) + " · Musterblatt" : "noch nicht begonnen"}</small></span></li>`).join("")}</ol></section>
      <section><h2>Lernspur</h2><p class="klein">Ein Satz je Blatt aus »Verorten«. Der Hefter zeigt nur, was du schon bearbeitet hast – sonst nähme er Antworten vorweg.</p>${spur ? `<ol class="spur"><li><b>${esc(b.nr)}</b><span>${esc(spur)}${F("vb") ? ` <span class="klein">· hängt zusammen mit ${esc(F("vb"))}${F("vw").trim() ? ": " + esc(F("vw")) : ""}</span>` : ""}</span></li></ol>` : `<div class="kasten kasten--zu"><p>Noch leer. Dein erster Satz entsteht in ${esc(b.nr)}, Baustein V.</p></div>`}</section>
      <section><h2>Für die Klassenarbeit</h2><div class="drei">${[["Lernzettel der Einheit", "Alle Kästen »Das musst du wissen« hintereinander, zum Drucken."], ["Ich-kann-Liste", "»Das musst du können« aus allen Blättern, mit deiner Einschätzung in Worten."], ["Operatoren", "Welcher Operator wurde wo geübt? Jeder kommt bis zur Klassenarbeit mindestens zweimal vor."]].map(x => `<div class="kasten kasten--material"><p class="kasten__kopf">${x[0]}</p><p>${x[1]}</p><p class="klein">Kommt mit Phase 5 (Hefter).</p></div>`).join("")}</div></section></div>`;
  }

  /* ---------- Bausteine: Zustandskarte ---------- */
  const lum = h => { h = h.replace("#", ""); const c = [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16) / 255).map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
  const kon = (a, b) => { const x = lum(a), y = lum(b); return ((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)); };
  function bausteineHTML() {
    const cs = getComputedStyle($(".ab")), t = n => cs.getPropertyValue(n).trim().toUpperCase(), r = R[D.richtung[D.einheit]];
    const farben = [["--platte", "Platte", "Fläche unter dem aktiven Auftrag, Reiter mit der Nummer"], ["--tief", "Tief", "Zentrale Frage, Zeitangabe, Randlinien"], ["--hauch", "Hauch", "Platz im Hefter, gewählte Antwort"], ["--reg", "Register", "altes Papier mit Maserung"], ["--blatt", "Blatt", "Arbeitsfläche"], ["--tinte", "Tinte", "Schrift, Auftragskasten"]];
    const paare = [["Tief auf Blatt", "--tief", "--blatt"], ["Tief auf Hauch", "--tief", "--hauch"], ["Tinte auf Platte", "--tinte", "--platte"], ["Tinte auf Register", "--tinte", "--reg"], ["Tinte auf Blatt", "--tinte", "--blatt"], ["Leise auf Blatt", "--leise", "--blatt"]];
    const regp = (nr, name, st, txt, festk, cur) => `<div class="regprobe"><button type="button" class="reg" data-stand="${st}"${festk ? " data-fest" : ""}${cur ? ' aria-current="page"' : ""} tabindex="-1"><span class="reg__nr">${nr}</span><span class="reg__text"><b>${name}</b><small>Allein · 6 Min.</small><span class="reg__stand">${txt}</span></span></button></div>`;
    return `<header class="ab-kopf"><span class="reiter">B</span><div class="ab-kopf__titel"><b>Bausteine und Zustände</b><span>Richtung »${esc(r.name)}« · alles, was sich wiederholt, an einer Stelle</span></div><button type="button" class="knopf" data-sicht="blatt">Zum Blatt <span aria-hidden="true">→</span></button></header>
      <div class="hefter"><section><h2 style="border-top:0;padding-top:0">Farben dieser Richtung</h2><div class="farbtafel">${farben.map(f => `<div><i style="background:var(${f[0]})"></i><span><b>${f[1]}</b> ${t(f[0])}<br>${f[2]}</span></div>`).join("")}</div>
        <div class="rollen"><table class="tab" style="margin-top:1rem;min-width:28rem"><thead><tr><th>Paar</th><th>Kontrast, gemessen</th><th>Regel</th></tr></thead><tbody>${paare.map(p => { const k = kon(t(p[1]), t(p[2])); return `<tr><td>${p[0]}</td><td><b>${k.toFixed(1).replace(".", ",")} : 1</b></td><td>${k >= 4.5 ? "erfüllt 4,5 : 1" : "unter 4,5 : 1"}</td></tr>`; }).join("")}</tbody></table></div></section>
      <section><h2>Ein Auftrag im Register: fünf Zustände</h2><p class="klein">Der Zustand steht immer als Wort da. Rund = Auftrag der Stunde, eckig = fester Baustein.</p><div class="zustand">${regp("1", "Erst schätzen", "hier", "du bist hier", 0, 1)}${regp("2", "Der BND", "offen", "offen")}${regp("3", "Eure Gruppe", "ansage", "öffnet auf Ansage")}${regp("L", "Landkarte", "gesperrt", "öffnet nach deiner Antwort", 1)}${regp("E", "Erst erinnern", "erledigt", "✓ erledigt", 1)}</div></section>
      <section><h2>Drei Kästen, drei Aufgaben</h2><div class="zustand"><div>${kasten("auftrag", "Dein Auftrag", "<p>Was zu tun ist. Immer dunkel, immer oben.</p>")}</div><div>${kasten("material", "M1 · Material", "<p>Quelle, Zahl oder Bild – mit Nachweis darunter.</p><p class=\"nachweis\">Herkunft · Datum · Urheber · Lizenz</p>")}</div><div>${kasten("sichern", "Sichern", "<p>Was bleibt: Ziele, Aufgabe der Klassenarbeit, Überblick.</p>")}</div><div>${kasten("zu", "Noch geschlossen", "<p>Öffnet nach deiner Antwort oder auf Ansage.</p>")}</div></div></section>
      <section><h2>Rückmeldung in drei Stufen</h2><p class="klein">Nur bei Zuordnungen und bei der Landkarte. Beim Urteil schweigt das Blatt. Jede Stufe hat ein Wort und eine eigene Linie – Farbe allein trägt nie.</p><div class="zustand"><div class="stufe" data-stufe="zentral"><b>Zentral.</b> Genau das meint der Eintrag.</div><div class="stufe" data-stufe="begruendbar"><b>Auch begründbar.</b> Stimmt – noch genauer trifft …</div><div class="stufe" data-stufe="kaum"><b>Passt kaum.</b> Lies deine Vermutung noch einmal.</div></div></section>
      <section><h2>Schreiben und Knöpfe</h2><div class="zustand"><div class="feld"><label for="probe1">Linien zum Schreiben, getippt</label><textarea class="linien" id="probe1" rows="3">So sitzt getippter Text auf der Linie.</textarea></div><div class="feld"><label for="probe2">Linien, leer – für die Handschrift im Ausdruck</label><textarea class="linien" id="probe2" rows="3"></textarea></div><div><div class="reihe"><button type="button" class="knopf knopf--haupt" tabindex="-1">Hauptknopf</button><button type="button" class="knopf" tabindex="-1">Zweiter Knopf</button><button type="button" class="knopf" disabled>Noch gesperrt</button></div><p class="klein" style="margin-top:.6rem">Ein Hauptknopf je Blatt. Gesperrtes ist gestrichelt und sagt, warum.</p></div></div></section>
      <section><h2>Bewegung</h2><div class="rollen"><table class="tab" style="min-width:34rem"><thead><tr><th>Wo</th><th>Was sich bewegt</th><th>Dauer</th><th>Wozu</th></tr></thead><tbody><tr><td>Blattwechsel</td><td>neues Blatt blendet ein, 6 px von unten</td><td>220 ms</td><td>»Du bist weiter« – nur nach eigenem Tippen</td></tr><tr><td>Aufdecken</td><td>Material oder Rückmeldung erscheint</td><td>360 ms</td><td>erst nach der Festlegung</td></tr><tr><td>Knopf</td><td>rückt 2 px ein</td><td>100 ms</td><td>»Angekommen«</td></tr><tr><td>Zeit ziehen</td><td>Balken folgen dem Regler</td><td>ohne Dauer</td><td>Bewegung ist hier die Erkenntnis: Verlauf und Tempo</td></tr></tbody></table></div><p class="klein">Nach dem Laden bewegt sich nichts. Mit »Weniger Bewegung« und im Druck steht alles sofort.</p></section></div>`;
  }

  /* ---------- Datei sichern und laden ---------- */
  const paket = () => JSON.stringify({ art: "ggk-arbeitsblatt-muster", version: 1, gesichert: heute(), daten: D }, null, 1);
  function fenster(html) { let f = $("#fenster"); if (!f) { f = doc.createElement("div"); f.id = "fenster"; f.className = "fenster"; $(".ab").appendChild(f); } f.innerHTML = `<div class="fenster__blatt" role="dialog" aria-modal="true" aria-label="Stand">${html}</div>`; f.hidden = false; const k = $("button,textarea,input", f); if (k) k.focus(); }
  const fensterZu = () => { const f = $("#fenster"); if (f) f.remove(); };
  async function dateiSichern() {
    const text = paket(), name = "Hefter-" + Ei().name.replace(/[^A-Za-zÄÖÜäöü]+/g, "-") + "_" + heute().split(".").reverse().join("-") + ".json";
    let weg = "nicht", dl = null;
    /* In der Vorschau bei Claude übernimmt der Betrachter das Sichern und fragt nach; als Datei oder in Moodle sichert der Browser selbst. */
    try { if (window.claude && typeof window.claude.use === "function") dl = await window.claude.use("downloads"); } catch (e) { dl = null; }
    if (dl) { try { await dl.save({ filename: name, data: text }); weg = "gesichert"; } catch (e) { weg = e && e.code === "declined" ? "abgebrochen" : "nicht"; } }
    else { try { const a = doc.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type: "application/json" })); a.download = name; doc.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); weg = "browser"; } catch (e) { weg = "nicht"; } }
    const satz = { gesichert: `Die Datei <b>${esc(name)}</b> ist gesichert. Leg sie in deinen Ordner für Geschichte.`, browser: `Die Datei <b>${esc(name)}</b> liegt jetzt bei deinen Downloads. Leg sie in deinen Ordner für Geschichte.`, abgebrochen: "Das Sichern wurde abgebrochen. Du kannst es noch einmal versuchen – oder den Text unten kopieren.", nicht: "Hier lässt sich gerade keine Datei sichern. Kopiere den Text unten und sichere ihn in einer Notiz." }[weg];
    fenster(`<h3>${weg === "gesichert" || weg === "browser" ? "Stand gesichert" : "Stand als Text"}</h3><p>${satz}</p>${weg === "browser" ? '<p class="klein">Keine Datei angekommen? Das passiert in manchen Vorschauen. Dann kopiere den Text.</p>' : ""}<textarea readonly id="standtext" aria-label="Stand als Text">${esc(text)}</textarea><div class="reihe"><button type="button" class="knopf" data-akt="kopieren">Text kopieren</button><button type="button" class="knopf knopf--haupt" data-akt="zu">Fertig</button><span class="klein" id="kopiert" role="status"></span></div>`);
  }
  function dateiLaden() {
    fenster(`<h3>Stand laden</h3><p>Wähle die Datei, die du gesichert hast. Dein Stand auf diesem Gerät wird ersetzt.</p><label class="knopf" style="justify-self:start">Datei wählen<input type="file" accept="application/json,.json" class="sr" id="dateiwahl"></label><div class="feld"><label for="ladetext">… oder den gesicherten Text hier einfügen</label><textarea id="ladetext"></textarea></div><p class="klein" id="lademeld" role="status"></p><div class="reihe"><button type="button" class="knopf knopf--haupt" data-akt="text-laden">Text laden</button><button type="button" class="knopf" data-akt="zu">Abbrechen</button></div>`);
  }
  function uebernehmen(text) {
    try { const j = JSON.parse(text); if (!j || j.art !== "ggk-arbeitsblatt-muster" || !j.daten || !j.daten.st) throw 0; D = Object.assign(leer(), j.daten); D.v = 1; sichern(); fensterZu(); bauen(); return true; }
    catch (e) { const m = $("#lademeld"); if (m) m.textContent = "Das passt nicht. Wähle die Datei, die mit »Hefter-« beginnt und auf ».json« endet."; return false; }
  }

  /* ---------- Aufbau und Ereignisse ---------- */
  const ab = () => $(".ab");
  function leiste() {
    const e = Ei(), r = D.richtung[D.einheit];
    $$("[data-einheit-wahl]").forEach(k => k.setAttribute("aria-pressed", String(k.getAttribute("data-einheit-wahl") === D.einheit)));
    $("#ml-richtung").innerHTML = e.richtungen.map(id => `<button type="button" data-richtung-wahl="${id}" aria-pressed="${id === r}"><span class="tupfer" style="background:${farbe(id)}"></span>${esc(R[id].name)}</button>`).join("");
    $("#ml-warum").innerHTML = `<b>${esc(R[r].name)} · ${esc(R[r].ton)}.</b> ${esc(R[r].warum)}`;
    $$("[data-sicht-wahl]").forEach(k => k.setAttribute("aria-pressed", String(k.getAttribute("data-sicht-wahl") === D.sicht)));
  }
  const PLATTE = { "W-A": "#E3B94E", "W-B": "#9CC5A8", "W-C": "#BDB0EA", "N-A": "#A9BDD1", "N-B": "#C3C7CC", "N-C": "#A5CBBE", "O-A": "#A9C2F0", "O-B": "#93CCC6", "O-C": "#C9B8EE" };
  const farbe = id => PLATTE[id];
  function bauen() {
    const el = ab(); el.setAttribute("data-einheit", D.einheit); el.setAttribute("data-richtung", D.richtung[D.einheit]);
    if (D.sicht === "hefter") el.innerHTML = hefterHTML();
    else if (D.sicht === "bausteine") el.innerHTML = bausteineHTML();
    else { el.innerHTML = blattHTML(); const m = $(".ab-reg__mehr"); if (m) m.open = window.matchMedia("(min-width:60.01rem)").matches; zeigen(St().ort || "deck", false); const w = $('[data-akt-wahl="ansicht"]'); if (w) w.value = doc.documentElement.getAttribute("data-ansicht") || "hell"; const bw = $('[data-akt="bewegung"]'); if (bw) bw.checked = doc.documentElement.getAttribute("data-bewegung") === "weniger"; }
    leiste();
  }
  function nachEingabe(k) {
    const s = St();
    if (k === "n") { const w = $("#nwert"); if (w) w.textContent = s.f.n; }
    if (k === "jahr") { zeigen(s.ort, false); const r = $("#f-jahr"); if (r) r.focus(); return; }
    if (k === "text") { const z = $("#zaehler"); if (z) z.textContent = worte(F("text")) + " von etwa " + B().s.woerter + " Wörtern"; if ((worte(F("text")) >= 60) !== !!s.kritOffen) { s.kritOffen = worte(F("text")) >= 60; halten(k); } }
    if (["e0", "e1", "v1", "v2", "lkv", "lkb", "lkwahl", "schaetz"].indexOf(k) >= 0) pruefeKnopf();
    registerStand(); const f = $("#fuss"); if (f) f.innerHTML = fussHTML();
  }
  /* Knöpfe, die erst nach einer Eingabe frei werden, ohne das Blatt neu zu zeichnen (der Fokus bleibt im Feld) */
  function pruefeKnopf() {
    const s = St(), b = B(), setze = (akt, frei, text) => { const k = $(`[data-akt="${akt}"]`); if (!k || s.fest[akt === "e-auf" ? "e" : akt]) return; k.disabled = !frei; const h = k.parentNode.querySelector(".klein"); if (h) h.textContent = frei ? "" : text; };
    setze("e-auf", b.e.fragen.every((q, i) => F("e" + i).trim().length > 1), "Erst beide Fragen beantworten.");
    setze("kette", F("v1").trim().length > 1 && F("v2").trim().length > 1, "Öffnet nach euren zwei Verbindungen.");
    const w = s.f.lkwahl; setze("lk", worte(F("lkv")) >= 3 && w !== undefined && w !== "" && worte(F("lkb")) >= 3, "Erst alle drei Schritte.");
    if (D.einheit === "ow") setze("schaetz", !!F("schaetz").trim(), "Erst eine Zahl eintragen.");
  }
  function halten(k) { const id = "f-" + k, el = doc.getElementById(id), pos = el ? el.selectionStart : null; zeigen(St().ort, false); const n = doc.getElementById(id); if (n) { n.focus(); if (pos != null && n.setSelectionRange) n.setSelectionRange(pos, pos); } }

  doc.addEventListener("input", ev => {
    const t = ev.target, k = t.getAttribute && t.getAttribute("data-f"); if (!k || !ab().contains(t)) return;
    St().f[k] = t.type === "radio" ? t.value : t.value; sichern(); nachEingabe(k);
  });
  doc.addEventListener("change", ev => {
    const t = ev.target;
    if (t.id === "dateiwahl" && t.files && t.files[0]) { const r = new FileReader(); r.onload = () => uebernehmen(String(r.result)); r.readAsText(t.files[0]); return; }
    if (t.getAttribute("data-akt-wahl") === "ansicht") { if (t.value === "beamer") doc.documentElement.setAttribute("data-ansicht", "beamer"); else doc.documentElement.removeAttribute("data-ansicht"); return; }
    const a = t.getAttribute("data-akt");
    if (a === "bewegung") { if (t.checked) doc.documentElement.setAttribute("data-bewegung", "weniger"); else doc.documentElement.removeAttribute("data-bewegung"); }
    if (a === "hand") { St().fest.hand = t.checked ? 1 : 0; sichern(); zeigen(St().ort, false); }
  });
  doc.addEventListener("click", ev => {
    const t = ev.target.closest("button,[data-zu]"); if (!t) return;
    const s = St();
    if (t.hasAttribute("data-einheit-wahl")) { D.einheit = t.getAttribute("data-einheit-wahl"); sichern(); bauen(); return; }
    if (t.hasAttribute("data-richtung-wahl")) { D.richtung[D.einheit] = t.getAttribute("data-richtung-wahl"); sichern(); ab().setAttribute("data-richtung", D.richtung[D.einheit]); if (D.sicht === "bausteine") bauen(); else leiste(); return; }
    if (t.hasAttribute("data-sicht-wahl") || t.hasAttribute("data-sicht")) { D.sicht = t.getAttribute("data-sicht-wahl") || t.getAttribute("data-sicht"); sichern(); bauen(); window.scrollTo(0, Math.max(0, ab().offsetTop)); return; }
    if (t.hasAttribute("data-zu") && !t.closest(".regprobe")) { zeigen(t.getAttribute("data-zu"), true); const b = $("#blatt"); if (b && ev.detail !== 0) b.focus({ preventScroll: true }); return; }
    const a = t.getAttribute("data-akt"); if (!a) return;
    if (a === "schaetz") { s.fest.schaetz = 1; if (s.f.n === undefined && D.einheit === "ns") s.f.n = "5"; sichern(); zeigen(s.ort, false); }
    else if (a === "e-auf") { s.fest.e = 1; sichern(); zeigen(s.ort, false); }
    else if (a === "kette") { s.fest.kette = 1; sichern(); zeigen(s.ort, false); }
    else if (a === "lk") { s.fest.lk = 1; sichern(); zeigen(s.ort, false); }
    else if (a === "jahr-" || a === "jahr+") { s.f.jahr = String(Math.min(12, Math.max(0, +(s.f.jahr || 0) + (a === "jahr+" ? 1 : -1)))); sichern(); zeigen(s.ort, false); const k = $(`[data-akt="${a}"]`); if (k) k.focus(); }
    else if (a === "ansage") { const f = $("#ansagefrage"); if (f) { f.hidden = false; $("button", f).focus(); } }
    else if (a === "ansage-nein") { const f = $("#ansagefrage"); if (f) f.hidden = true; }
    else if (a === "ansage-ja") { s.ansage[s.ort] = 1; sichern(); zeigen(s.ort, true); }
    else if (a === "drucken") { try { window.print(); } catch (e) { /* in manchen Vorschauen nicht möglich */ } }
    else if (a === "datei") dateiSichern();
    else if (a === "laden") dateiLaden();
    else if (a === "zu") fensterZu();
    else if (a === "kopieren") { const x = $("#standtext"), m = $("#kopiert"); x.focus(); x.select(); try { navigator.clipboard.writeText(x.value).then(() => { m.textContent = "Kopiert."; }, () => { m.textContent = "Text ist markiert – jetzt kopieren."; }); } catch (e) { m.textContent = "Text ist markiert – jetzt kopieren."; } }
    else if (a === "text-laden") uebernehmen($("#ladetext").value);
    else if (a === "loeschen") fenster(`<h3>Eingaben löschen</h3><p>Was soll gelöscht werden? Gelöschtes lässt sich nicht zurückholen.</p><div class="reihe"><button type="button" class="knopf" data-akt="loeschen-blatt">Nur dieses Blatt</button><button type="button" class="knopf" data-akt="loeschen-alles">Alles im Muster</button><button type="button" class="knopf knopf--haupt" data-akt="zu">Nichts löschen</button></div>`);
    else if (a === "loeschen-blatt") { D.st[D.einheit] = {}; sichern(); fensterZu(); bauen(); }
    else if (a === "loeschen-alles") { const r = D.richtung, e = D.einheit; D = leer(); D.richtung = r; D.einheit = e; try { localStorage.removeItem(KEY); } catch (x) { /* kein Speicher */ } fensterZu(); bauen(); }
  });
  doc.addEventListener("keydown", ev => { if (ev.key === "Escape" && $("#fenster")) fensterZu(); });

  /* Druck: getippter Text steht auf Linien, leere Felder bleiben Linien für die Handschrift */
  window.addEventListener("beforeprint", () => {
    $$("#blatt textarea.linien, #blatt input.linien").forEach(f => {
      const d = doc.createElement("div"), hand = f.id === "f-text" && (!f.value.trim() || St().fest.hand);
      if (hand) { d.className = "druckfeld druckfeld--hand"; d.innerHTML = Array(41).join("<i></i>"); $("#blatt").classList.add("druck-hand"); }
      else { d.className = "druckfeld"; d.textContent = f.value; d.style.setProperty("--zeilen", f.tagName === "TEXTAREA" ? Math.min(+f.getAttribute("rows") || 3, 4) : 1); }
      f.hidden = true; f.parentNode.insertBefore(d, f.nextSibling);
    });
  });
  window.addEventListener("afterprint", () => { $$(".druckfeld").forEach(d => d.remove()); const bl = $("#blatt"); if (bl) bl.classList.remove("druck-hand"); $$("#blatt .linien").forEach(f => { f.hidden = false; }); });

  bauen();
  window.GGKMuster = { daten: () => D, zeigen: zeigen, bauen: bauen, E: E, R: R };
})();
