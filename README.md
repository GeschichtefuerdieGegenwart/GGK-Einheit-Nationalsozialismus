# GGK-Labor

Interaktive Quellen-Labore für Geschichte (GGK) am beruflichen Gymnasium – gebaut nach dem Orientierungsmodell „Lernwirksame digitale Lernumgebungen“ und mit derselben Technik wie das [Psycho-Labor](https://github.com/GeschichtefuerdieGegenwart/psycho-labor).

**Für Schüler\*innen:** https://geschichtefuerdiegegenwart.github.io/GGK-Einheit-Nationalsozialismus/

| Datei | Inhalt |
| --- | --- |
| `index.html` | Übersicht aller Bausteine |
| `ns-ideologie.html` | M18 · Die fünf Säulen der NS-Ideologie (eine Datei, aus `src/` erzeugt) |
| `appeasement.html` | M19 · Appeasement-Politik – der Weg zum Frieden oder in den Zweiten Weltkrieg? (iPad-Fassung nach der Print-Stunde; drei Entscheidungen in je sieben Schritten; `?ansicht=lehrkraft` öffnet den verschlüsselten Lehrkraftbereich) |
| `m20-dilemmata.html` | M20 · Großbritannien im Zweiten Weltkrieg – drei Dilemmata (Mai 1940, Juli 1941, Februar 1944), durchgängige iPad-Fassung mit geprüften Quellen. Ablauf je Dilemma: selbst ein Bild machen → kurz diskutieren → abstimmen → mit den Ereignissen abgleichen; am Ende eine Zusammenfassung auf zwei Seiten A4; `?ansicht=lehrkraft` öffnet den verschlüsselten Lehrkraftbereich (`lk/m20-lehrkraft.enc.json`). Karten: `tools/karten_m20.py` → `assets/karten-m20.js` (CShapes 2.0, CC BY-NC-SA 4.0) |
| `m22-wie-war-das-moeglich.html` | M22 · „Große Verbrechen brauchen keine Monster!“ – Wie war das möglich? Täterforschung in 90 Minuten: versiegelte erste Antwort, Faktencheck zu drei Floskeln, der Fall Józefów 1942 als Kartenstapel, sechs Forschungsakten (Adorno, Arendt, Browning, Goldhagen, Milgram, Bauman/Welzer) in drei Lesestufen, Marktplatz, Erklärungsmodell mit fünf Ebenen, Beamer-Ansicht der Tischmodelle, Rückblick und Zusammenfassung auf zwei Seiten A4. Keine Bilder. |
| `docs/M19_Faktensicherung.pdf` | Faktensicherung M19, 2 Seiten (Quelle: `src/m19-faktensicherung.html`) |
| `auswertung.html` | Kursbild für die Lehrkraft (QR-Codes scannen) |
| `lehrkraft.html` | Diagnose, Entscheidung, Stundenablauf, Quellenprüfung |
| `assets/` | gemeinsames Design und Werkzeuge, Schaubilder, Foto |
| `docs/M18_*.pdf` | Lernmappe, Lösungskarte und Hinweise zu M18 (früher als M19 nummeriert) |
| `docs/Prompt_NS-Ideologie.md` | Prompt für die Überarbeitung |

Druckvorlagen: `ns-ideologie.html?druck=leer`, `?druck=beispiel`, `?druck=loesung`.

Bauen: `node tools/inline.js src/ns-ideologie.html` bettet CSS, Skripte und das Foto in eine einzige Datei ein.

## Datenschutz

Keine externen Skripte oder Tracking. Schriften liegen lokal in `assets/fonts/`. In `appeasement.html` werden Foto und Originalton aus `media/` geladen; fehlen die Dateien, lädt die Seite sie erst nach einem Klick von der Science Museum Group bzw. Wikimedia Commons (Zwei-Klick-Lösung). Die vier Orientierungskarten erzeugt `tools/karten.py` aus dem Datensatz CShapes 2.0 (Schvitz u. a. 2022, CC BY-NC-SA 4.0) als `assets/karten.js`; die Karten stehen unter derselben Lizenz.

**Bewegung:** `assets/motion.css` und `assets/motion.js` (Muster D–L aus dem Motion-Musterbuch: Reiter, Karte wird gezogen, Stempel, Laufzettel, Schwärzung, Textmarker, Randnotiz, Lupe, „Du bist hier“; dazu P Fächer und Q Kartenstapel zum Selbst-Blättern im Einstieg von M20, per Scroll-Snap und scroll-gesteuerter Animation mit Fallback). Jede Bewegung läuft nur einmal, wenn ein Element neu erscheint, nie nach Tastaturbedienung und bei „Weniger Bewegung“ (Systemeinstellung) nur als kurzes Überblenden. Der Endzustand ist immer der Ruhezustand. Gespeichert wird nur ein Sitzungsmerker für den Reiter der Startseite (sessionStorage). Im Einstieg von M20 wird zusätzlich die aktuelle Karte gemerkt (localStorage, wie die übrigen Antworten).

**Bilder M20:** Dreizehn Bildplätze (Heft, Imperial War Museums unter der IWM Non-Commercial Licence, London Transport Museum). Die Dateien liegen nur im Moodle-Paket (`media/`, nicht im Repository); fehlen sie, verschwinden die Abbildungen ohne Lücke.

**M20 · Ablauf und Zeit:** Jedes Dilemma hat sieben Schritte: Lage → Optionen (wer entscheidet, welche Wege) → Folgen abwägen → Nachdenken → Diskussion → Abstimmung → Auswertung. Die Diskussion vor der Abstimmung hat zwei Runden (Dilemma 1: 2 + 2 Minuten, Dilemma 2 und 3: je 1,5 + 1,5 Minuten; Impulsfragen freiwillig; Tafelansicht für den Beamer). Dilemma 2 ist die Kurzfassung (drei Meldungen, Schritt 2 gemeinsam am Beamer, ohne Nachdenken). In der Auswertung: Codewort, Schwärzung aufgedeckt, Fächer mit fünf Ereignissen (Muster P), eine Besprechungsfrage; Quellen „danach“ sind freiwillig aufklappbar.

**M20 · Eröffnung und Abstimmungen:** Beim ersten Öffnen je Sitzung läuft eine Eröffnung von etwa 9,6 Sekunden (Muster W, aus R–V des Motion-Musterbuchs 3): Halbrund der Unterhaus-Abstimmung vom 8. Mai 1940 (281 zu 200; Hansard, Division No. 61), Foto Churchill 1940 (IWM MH 26392, nur im Moodle-Paket), Kabinettsakte vom 26. Mai 1940 mit Schwärzung, dann die Leitfrage. Überspringbar per Knopf, Tippen, Escape, Leertaste, Eingabetaste; entfällt bei „Weniger Bewegung“. Nach jeder Abstimmung gibt es die Beamer-Ansicht „Ergebnis der Klasse“ (Muster V): Stimmen A/B/C eintragen, Halbrund formt sich; in der Auswertung und auf der Seite „Beurteilung“ erscheinen die Halbrunde wieder. Auf jeder Seite: „← GGK-Labor“ und „Eingaben löschen“ mit Rückfrage auf der Seite.

**Lehrkraftbereich M19:** `lk/m19-lehrkraft.enc.json` ist mit AES-GCM verschlüsselt (Schlüssel per PBKDF2 aus dem Passwort). Der Klartext liegt nicht im Repository (`privat/` steht in `.gitignore`). Neu verschlüsseln: `tools/lk-verschluesseln.html` im Browser öffnen oder `LK_PASS='…' node tools/lk-verschluesseln.mjs`. Grenzen: Wer das Passwort kennt, kann es weitergeben; ein Widerruf ist nur durch Neuverschlüsselung möglich. Ältere Fassungen im Git-Verlauf enthalten die früheren Hinweise im Klartext. Eingaben bleiben im Browser des iPads (localStorage). Der QR-Code enthält nur Zahlen; die Daten stehen im Anker der Adresse und werden nicht an den Server übertragen.

## Bilder und Lizenzen

- Boykott jüdischer Geschäfte, Berlin, 1.4.1933: Bundesarchiv, Bild 102-14468, Foto: Georg Pahl, CC BY-SA 3.0 DE (via Wikimedia Commons), in Graustufen verkleinert.
- Schaubilder und Logo: selbst gezeichnet (SVG).
- QR-Code-Erzeugung: Kazuhiko Arase, MIT-Lizenz.
- Schriften: Fraunces (Undercase Type) und Atkinson Hyperlegible (Braille Institute), beide SIL Open Font License 1.1 – Lizenztexte in `assets/fonts/`.
- Appeasement: Foto „Digging In“, 27.9.1938, Reg Sayers / Daily Herald Archive, Science Museum Group Collection 1983-5236/10691 (nicht-kommerziell, Bedingungen prüfen); Originalton Chamberlain, Heston, 30.9.1938, Wikimedia Commons (dort gemeinfrei); Zitate aus Hansard (Open Parliament Licence).

**M22 · Ablauf und Muster (Fassung 2.0, 26.10.2026):** Einstieg „Es geht um Menschen“ (fünf Menschen aus M21 mit Namen und Foto) und „Jede Phase brauchte Menschen“ (AF), versiegelte erste Antwort (X) · Faktencheck mit Karten, die sich erst nach der Schätzung drehen (Z) · „Józefów, 13. Juli 1942“ als Kartenstapel mit Beamer-Schalter, „Hier waren wir“ und Punktefeld (AI, Y) · Akten: Frage groß, fünf Ebenen als Modell, „Sechs Versuche, das zu erklären“ mit Lesestufen (AB), Erklärungskarte und **Gewichtungs-Check mit Rückmeldung je Ebene und Zähler „Richtig gelegen“ (AK)**; mindestens zwei Akten vor dem Marktplatz · Marktplatz mit drei Streitpaaren und gestufter Rückmeldung (zentral · auch begründbar · passt kaum), Empfehlung für den nächsten Stand, Stand als Vollbild, Tischmodell (AC) · Diskussion in vier Schritten, geführt am Beamer mit Uhr, Tischmodellen und Streitpunkt (AL, AD) · Rückblick: Siegel öffnen, „Person oder Umstände?“ (AH) · Zusammenfassung: sechs Ansätze als Karten, Erklärung in zehn Sätzen mit Satzanfängen und Kriterienraster, Abrufübung mit erklärender Rückmeldung. **Bildbänder (AJ)** kündigen Abschnitte an; die Bilder liegen nur im Moodle-Paket (`media/`), fehlen sie, bleibt ein Textband. Speicherschlüssel `ggk-m22-taeter:v2`.
