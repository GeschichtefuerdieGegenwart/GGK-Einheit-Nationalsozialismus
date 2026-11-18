# Neufassung »Arbeitsblatt Geschichte« · Phase 1: Inventar und Diagnose

Stand: 18.11.2026 · Branch `neufassung-arbeitsblatt-geschichte` · Auftrag vom 18.11.2026, 17:12 Uhr

Diese Datei wächst Block für Block. Nach jedem Block wird gesichert (Commit und Push), damit bei einem Abbruch nichts verloren geht.

Reihenfolge der Blöcke: A Psycho-Labor · B Tresor · C Skills · D Ist-Stand und Bildlücken · E Zuordnungstabelle · F Spannungen und Fragen.

---

## A · Das Psycho-Labor als Vorbild

Gelesen am 18.11.2026: Repository `GeschichtefuerdieGegenwart/psycho-labor`, Stand `7b37c7c` (17.11.2026, »Einheit Motivation, Fassung 2.1«). Gelesen wurden `DESIGN.md`, `PRODUCT.md`, `docs/motivation-einheit.md`, der Kern `src/motivation/kern.js` und `kern.css` in Auszügen, die Farbwerte in `assets/gegenwart/tokens.css`. Angesehen wurden drei Bildschirmfotos bei 1180 × 820 (Deckblatt Stunde 1, Auftrag 1, Einheitsseite).

### A1 · Wichtigster Befund

Die Einheit Motivation ist selbst **nach dem Blatt-Standard des GGK-Labors** gebaut (so steht es in `kern.css` und in `docs/motivation-einheit.md`). Das Psycho-Labor ist also kein fremdes Format, sondern die **weiterentwickelte Fassung desselben Blatts**. Übertragen wird deshalb nicht »ein neues Format«, sondern das, was das Psycho-Labor dem GGK-Blatt voraushat.

### A2 · Was das Psycho-Labor dem GGK-Blatt voraushat

| Nr. | Baustein im Psycho-Labor | Stand im GGK-Labor heute | Folge für die Neufassung |
| --- | --- | --- | --- |
| P1 | **Ein Speicher für die ganze Einheit** (`psycholabor:motivation:v2`), alte Stände werden übernommen | je Stunde ein eigener Schlüssel | je Einheit ein Speicher, alte Schlüssel werden beim ersten Öffnen übernommen |
| P2 | **»Stand als Datei sichern« / »Stand aus Datei laden«** auf jeder Seite, unten im Register; Datei `mein-motivprofil.json` mit Kennung `art` und `version`; falsche Datei wird mit einem Satz abgewiesen | fehlt in fast allen Modulen (nur M22 hat eine Datei) | einheitlich in allen Modulen, eine Datei je Einheit |
| P3 | **Blattkopf** auf jedem Blatt: »Psychologie · Motivation │ Stunde 1 · Arbeitsblatt │ Datum« | Kopfzeile vorhanden, aber ohne festen Platz im Hefter | Kopf mit Modulnummer, Titel, zentraler Frage, Platz im Hefter |
| P4 | **Deckblatt** jeder Stunde: Titel, Leitfrage in Schreibschrift-Kursive, ein großer Knopf »Los geht’s: Auftrag 1«, daneben Ziele (»Am Ende kannst du …«) | Deckblatt vorhanden, uneinheitlich | gleich in allen Modulen |
| P5 | **Auftragskopf:** Nummer im Kreis, kleine Zeile »Arbeitsauftrag 1«, Titel, darunter Sozialform und Minuten als Marken | vorhanden (Sozialform seit 18.11. überall) | bleibt, wird vereinheitlicht |
| P6 | **Feste Bausteine in jeder Stunde:** Start · »Erst erinnern« (ab Stunde 2) · Aufträge · »Verorten und vernetzen« · Schreiben wie in der Klassenarbeit (drei Zugänge: mit Beispiel · mit Hilfekarte · ohne Hilfe) · Kann-Liste · Zusammenfassung »Wissen · Können« | L, Schreibauftrag und Zusammenfassung sind da; »Erst erinnern«, »Verorten« und Kann-Liste fehlen als feste Bausteine | fünf feste Bausteine mit festen Namen und Plätzen |
| P7 | **Einheitsseite** »Dein Überblick wächst«: Landkarte der Stunden, »Auf einen Blick«, Lernspur (ein Satz je Stunde), Lernkarten, »Das muss ich können«, Sichern | fehlt; es gibt nur die Startseite mit Zeitleisten | je Einheit eine Einheitsseite = der Hefter |
| P8 | **Lernspur:** jede Stunde endet mit einem Satz zur Leitfrage der Einheit; die Einheitsseite sammelt die Sätze | fehlt | übernehmen – das ist die Stelle, an der »von Stunde zu Stunde weiterarbeiten« sichtbar wird |
| P9 | **Tafelmodus** »Für Lehrkräfte: alle Aufträge öffnen« (nur dieses Gerät, nur diese Sitzung) und **Klassenbild** (Stimmkarte hochhalten, vorne zählen) | Freigabe »auf Ansage« ja, Tafelmodus nein | übernehmen |
| P10 | **Ansicht** hell · dunkel · Beamer und Schalter »Weniger Bewegung« im Register | teils | übernehmen |
| P11 | **Eingaben löschen** mit Rückfrage auf der Seite: nur diese Stunde oder die ganze Einheit | je Stunde | übernehmen |
| P12 | **Lernmappe als PDF, vier Seiten** je Stunde (Merkseite zwei Seiten + »Können« mit den eigenen Ergebnissen) | Zusammenfassung zwei Seiten + Schreibblatt | prüfen: zwei Seiten Zusammenfassung bleiben Regel; »Können« kommt in den Hefter |
| P13 | **Zeitdiagnose am vollen Stand** (Wörter ÷ 150, 0,75 Min. je Wahl, 1,5 je Festlegung, Schreiben 8 Wörter/Min.) als Tabelle in der Doku | nur für M25–M27 gemessen | für jede Stunde im Pilot messen |
| P14 | **»Beim Urteilen schweigt das Gerät«:** gestufte Rückmeldung nur beim Anwenden; Urteile bekommen Kriterien nach dem eigenen Text | gilt im GGK-Labor schon (16.11.) | bleibt |

### A3 · Farbstimmung des Psycho-Labors (Designsystem »Gegenwart«)

Gemessen aus `assets/gegenwart/tokens.css`:

| Rolle | Wert hell | Wirkung |
| --- | --- | --- |
| Grund | `#f3efe7` | warmes Papier, kein Weiß |
| Blatt | `#faf8f3` | cremefarbenes Blatt, liegt mit versetztem Schatten auf dem Grund |
| Register | `#e9e2d7` | Karton, eine Stufe dunkler als der Grund |
| Schrift | `#2a2622` / leise `#625a52` | warmes Schwarzbraun statt reinem Schwarz |
| Akzent 1 | Honig `#f2b233` (Platte), `#a26a1c` (Linie) | die versetzte »Platte« unter dem aktiven Auftrag und unter Kästen |
| Akzent 2 | Oxid `#9b402d` | Leitfrage in Kursive, »du bist hier« |
| Weitere | Petrol `#1e6b67`, Kuli-Blau `#1e4fb5`, Marker `#f3d54e` | Wahrnehmung in Petrol, Motivation in Honig |
| Schriften | Bricolage Grotesque (Titel) · Fraunces kursiv (Leitfrage) · Atkinson Hyperlegible Next (Text) | dieselben Schriften liegen schon im GGK-Labor |

Was die Stimmung ausmacht: **warmes Papier, eine kräftige Farbe als versetzte Platte, eine zweite Farbe nur für die Frage.** Keine Verläufe, keine weichen Schatten, klare zwei Pixel starke Linien. Das Psycho-Labor trennt seine beiden Blöcke über die Akzentfarbe (Wahrnehmung Petrol, Motivation Honig) bei gleichem Raster. Genau dieses Prinzip trägt die »Farbwelt je Einheit«.

### A4 · Was das Psycho-Labor nicht hat – und Geschichte braucht

- **Kein DIN-A4-Blatt am Bildschirm.** Das Blatt ist eine Karte mit runder Ecke; A4 gilt nur im Druck (`.pg` = eine Seite). Die im Auftrag genannte »DIN-A4-Grundlage« und die »Linien zum Schreiben« sind also eine Weiterentwicklung, die hier erst vorgeschlagen wird.
- **Kein »Platz im Hefter« im Kopf.** Im Kopf steht »davor Klassenarbeit 1 · danach Stunde 2«. Ein Hefterplatz (»Hefter Weimar · Blatt 7 von 18«) fehlt.
- **Kein Material neben dem Auftrag.** Die Aufträge stehen in einer Spalte; Quellen stehen unter dem Auftrag. Geschichte arbeitet mit Quellen – hier braucht es die zweite Spalte.
- **Keine Bilder.** Das Psycho-Labor kommt ohne Fotos aus. Titelbilder, Bildquellen und Bildnachweise sind für Geschichte neu zu regeln.
- **Bekannte Abweichungen im alten Teil** (`lab.css`, Block Wahrnehmung): Schrift unter 16 px, Bewegung 350 ms, weiche Schatten. Der Kern der Einheit Motivation hat sie nicht mehr.

---

## B · Funde im Tresor »Arbeitsgedächtnis«

Gelesen am 18.11.2026 über den verbundenen Ordner. Die Liste des Tresors nennt 482 Einträge; **43 Notizen sind seit dem 4.11.2026 neu oder geändert**. Ganz gelesen wurden die kurzen Notizen; die großen Stand- und Entscheidungsnotizen wurden gezielt nach Datum (ab 4.11.) und nach den Stichwörtern Kidu, Webdesign, Aufgaben, Struktur, Bewegung gelesen. Nicht gelesen: Claude-Coach, einzelne Doppelstunden der Demokratiebildung, das Protokoll im Volltext.

### B1 · Die vier Pflichtnotizen

| Notiz | Stand | Was dort steht | Was ich nutze |
| --- | --- | --- | --- |
| **Digitale Didaktik – Prinzipien und Fachgrenzen** | 08.11. (Status: Vorschlag) | zehn Prinzipien: Papierprobe zuerst · erst denken, dann zeigen · eine Frage vor jeder Bewegung · Bewegung zeigt Veränderung · Lernende steuern das Tempo · Bild, Zahl und Wort zusammen · Modelle heißen Modell · Lernhilfe, keine Leistungsmessung · Ergebnisse kommen zurück in den Raum · Zugang für alle. Fachgrenze Geschichte: Rückschaufehler, Grenzen der Perspektivübernahme, keine Ästhetisierung bei NS-Themen | **alle zehn als Prüfliste für die Zuordnungstabelle** (Block E); »ein großer Moment je Seite« als Obergrenze für Bewegung |
| **Erfahrungen aus Erprobungen** | 17.11. | getragen hat: gemeinsam geführt am Smartboard, parallel am eigenen Gerät. Nachzuschärfen: Zwischenstand beim Sortieren, einzeln zurücklegen, Zwischenstände speichern, ein Satz zur Bedienung vor jedem Film, **weniger Klicken, ein Arbeitsfenster**, **Ergebnisse brauchen eine Datei**. Aus dem Bauen: Übersicht darf keine Antwort verraten · Linien enden am Ziel · Lehrkraftbereich von Anfang an verschlüsselt · eine Seitenleiste kostet Breite · mit einem Register darf die Seite scrollen · eine Adresse zeigt immer dieselbe Seite · neue Freigaben dürfen übernommene Arbeit nicht verstecken · wirksame Schriftgröße in SVG · ein Maß ersetzt den Blick aufs Foto nicht. Nicht getragen: Ergebnisse vieler Geräte per QR bündeln | **Datei sichern und laden** als Pflichtbaustein · **die Nummer des Auftrags als Anker** zwischen Board und iPad · Register, das scrollen darf · Prüfregeln für Phase 3 |
| **Lernmappe und Lernübersicht** | 18.10. | Belastung niedrig · Inhalte bleiben sichtbar (Lernübersicht 1–2 Seiten, Hilfekästen wortgleich an der Aufgabe) · Auftrag, Information, Sicherung getrennt · Lernmappe als PDF für GoodNotes, Ziel 4 Seiten · Variante A (Labor als Einstieg) und B (ganze Stunde) je Stunde begründen | **drei getrennte Kastenarten** im Blatt · Hilfen wortgleich mit der Zusammenfassung · die Frage A oder B je Stunde in der Tabelle |
| **Didaktische Signatur – Lesart des Hefts** | 26.10. | vier Leitfragen statt Chronologie (Standortgebundenheit · erst entscheiden, dann auflösen · Umwelt oder Ich? · Geschichte wirkt in die Gegenwart); »die Landkarte ist der eigentliche Lehrplan«; Handschrift: Urteil vor Vollständigkeit, Rollen ohne Täterrollen, Ebenenwechsel Mensch – Struktur – Mensch; Schwächen: Erwartungshorizonte liefern das Urteil mit, die Ost-West-Einheit hat die Handschrift noch nicht, »Umwelt oder Ich« ohne Linie | **die vier Leitfragen als rote Fäden der Hefter** · die Linie »Umwelt oder Ich?« (seit 18.11. beschlossen) als sichtbare Spur im Hefter NS |

### B2 · Weitere Funde der letzten zwei Wochen

| Thema | Fundstelle | Fund | Nutzen für Geschichte |
| --- | --- | --- | --- |
| **Struktur** | Psychologie J2, Stand 17.11. · Entscheidungen 10.–17.11. | Einheit Motivation 2.1 auf einem Kern nach dem GGK-Blatt; Einheitsseite; Lernspur; jede Stunde endet mit Verorten, Verbinden und einem Satz; »beim Urteilen schweigt das Gerät«; Selbsttests überspringbar; Privates weder in Zusammenfassung noch Lernmappe; Einheitsseite zeigt nur Bearbeitetes | Vorbild für Hefter und feste Bausteine (Block A) |
| **Struktur** | Demokratiebildung, Stand 17.11. (Leitfaden 3.0) | drittes Projekt auf dem Blatt-Standard: Deckblatt und Register, »Als Datei sichern« und »Datei laden«, Kompass mit »wir sind hier« | bestätigt: Deckblatt + Register + Datei ist inzwischen dein fachübergreifender Standard |
| **Struktur** | Politikdidaktik, v16–v18 (16.–18.11.) | Halbjahreskarte · Ich-kann-Liste · Zusammenfassung je Modul · Wiederholung vor der Klassenarbeit, deren Zusammenfassung erst nach den fünf Bereichen öffnet · Urteilslinie mit Klassenbild vorher und nachher | **Ich-kann-Liste** und **Urteilslinie vorher – nachher** als Bausteine für den Hefter |
| **Aufgabenformate** | Unterricht digital, 11.11. (4.31/4.32) und 16.11. (4.44) | Aufgabenkoffer nach Unterrichtsphasen (Einstieg · Erarbeitung · Sichern und üben · Übertragen und Ausblick), 16 Ideen; fünf Legeformen (Reihe · Ordnung · Netz · Gegensatz · Kreislauf); fünf Lese-Muster (Markieren mit Grund · Lesen in drei Schritten · Lesen in Rollen · Zweimal lesen · Struktur legen und begründen). **»Zwei Aufgaben gehen ohne Gerät besser«: Lesen in drei Schritten und ein Urteil schreiben** | Legeformen für Ursachen und Abfolgen; **lange Quellen und das Urteil gehören auf Papier oder in die Handschrift** – das stützt Schreibblatt und Linien |
| **Aufgabenformate** | Unterricht digital, 13.11. (Sichtung) | Lehrfunktion je Phase; die Phase »Übertragen und Ausblick« ist in deinen Beispielen die seltenste; nicht das Gerät wirkt, sondern die Lerntätigkeit (Sailer u. a. 2024: reiner Ersatz g = 0,01 · neue Aufgabe mit eigenem Denken 0,85) | jede Stunde braucht eine Stelle **Übertragen** – in Geschichte ist das »Verorten« und der Gegenwartsbezug |
| **Modell** | Unterricht digital, 09.11. | sechs Prinzipien (früher Hebel): **verdecken · rückmelden · messen · variieren · stufen · bündeln**; im Raum: deuten, streiten, urteilen; das Gerät trägt AFB I und II, der Raum das Urteil | Spalte »digitale Technik« in Block E nennt je Zeile eines der sechs Prinzipien |
| **Webdesign** | Unterricht digital, 14.11. (4.41/4.42) | »Wo bin ich?«: eine Zeile oben (Weg zurück), unten ein kleiner Fahrplan mit »Du bist hier«; ganze Bildschirmbreite, Fließtext höchstens 68 Zeichen; »Auf einen Blick« in jedem Werkzeug; erste Handlung am Beamer im ersten Bildschirm | Kopfzeile des Blatts mit Platz im Hefter; Deckblatt mit erstem Knopf oberhalb von 720 px |
| **Webdesign** | Quellen/Webdesign-Trends 2026 (18.10.) | übernehmen: eigenes Erscheinungsbild, View Transitions, Beamer-Ansicht, »als Arbeitsbogen drucken«, lokale Merkliste ohne Tracking. Nicht: WebGL, Glas, KI-Bilder, bewegter Fließtext, Autoplay | »als Arbeitsbogen drucken« = die A4-Grundlage |
| **Bewegung** | Politikdidaktik, v9 (08.11.) | Scroll-Fassung des Gesetzgebungswegs gebaut; **Rückblick nach zwei bis drei Wochen steht noch aus** – ob die Bewegung beim Verstehen hilft, ist nicht beobachtet | Scrollytelling in Geschichte nur als Vorschlag, nicht als Standard (Block C) |
| **Bilder** | Bausteine/Geschichtsdidaktik/Bildrechte und Veröffentlichung | zwei Orte: öffentlich nur Gemeinfreies und frei Lizenziertes; Moodle zusätzlich § 60a UrhG. Liste geprüfter Bilder aus M19 und M20 (z. B. Bundesarchiv Bild 183-41636-0002, CC BY-SA 3.0, »gerahmt als Täterfoto«) | Grundlage der Bildlisten; **dein neuer Auftrag ist strenger** (nur frei lizenziert) – siehe Block F |
| **Erprobung** | Psychologie, Nach der Stunde 06.11. | gemeinsam geführt am Smartboard: »sehr gut«, schafft Orientierung. Fachgrenze Geschichte: Das Führen darf die Festlegung nicht vorwegnehmen | Tafelmodus und Freigabe »auf Ansage« bleiben getrennt von der eigenen Entscheidung |
| **Skills** | Unterricht digital, 18.11. (4.49) · Meine Skills | »Eine Regel, ein Ort«; Plugins »kidu« 0.8.0 und »kidu-bau« 0.8.0; »kidu-bau« 0.9.0 liegt bereit (mit `website-design-workflow` v6.1), ist hier aber noch nicht eingespielt | gearbeitet wird mit den Fassungen vom 18.11. (Block C); die vier Fallstricke aus 0.9.0 kenne ich nur aus der Notiz |

### B3 · Lehren anderer Fächer, die hier greifen – und wo sie in Geschichte brechen

1. **Psychologie: »Gemeinsam geführt, parallel am Gerät.«** Greift: die Auftragsnummer als gemeinsamer Anker. Bricht: in Entscheidungsstunden (M9, M19, M20, Ost-West 1 und 5) darf vorne nichts stehen, was die Entscheidung vorwegnimmt.
2. **Politik: »Ergebnisse brauchen eine Datei.«** Greift ohne Bruch – und ist die Voraussetzung dafür, dass der Hefter über Wochen wächst.
3. **Psychologie: »Beim Urteilen schweigt das Gerät.«** Greift verstärkt: In Geschichte ist fast jede Schlussaufgabe ein Urteil. Gestufte Rückmeldung (zentral · auch begründbar · passt kaum) nur bei Landkarte und Zuordnungen.
4. **Psychologie: »Die Einheitsseite zeigt nur Bearbeitetes.«** Greift doppelt: Eine Zeitleiste im Hefter nähme sonst Ausgänge vorweg (Rückschaufehler).
5. **Politik: »Urteilslinie vorher – nachher.«** Greift als Linie »Umwelt oder Ich?«. Bricht, wenn die Linie als Fortschritt gelesen wird: Eine Position, die sich nicht bewegt, ist kein Fehler.
6. **Kidu: »Ein Urteil schreiben geht ohne Gerät besser.«** Greift: Schreibblatt mit Linien, Handschrift erlaubt, Kriterien erst danach.

---

## C · Die acht Skills in der neuesten Fassung

Gelesen am 18.11.2026 aus den eingespielten Plugins: `unterricht-digitalisieren` v4.7 · `digital-check` v1.6 (beide »kidu« 0.8.0) · `lernseite-bauen` v3.0 · `signatur-design` v8.0 · `bewegung-als-lernmittel` v3.0 · `schaubild-design` v1.4 · `website-design-workflow` v6.0 (alle »kidu-bau« 0.8.0) · `fachdidaktik-geschichte` v1 (einzeln). Alle tragen das Datum 18.11.2026. Gelesen wurden die Skill-Texte und die Fallstrick-Dateien von `lernseite-bauen` und (Abschnitt Druck) `website-design-workflow`; nicht gelesen: `film-regie`, die Code-Bausteine im Einzelnen, `lehrfunktionen.md`.

### C1 · Was neu ist – und ob es in Geschichte einen echten Lerngewinn bringt

**Bewegung (Motion)**

| Technik | Was der Skill sagt | Echter Lerngewinn in Geschichte? | Wo |
| --- | --- | --- | --- |
| **Zeit ziehen (Scrubbing)** | die Person zieht Zeit vor und zurück und hält an; lernt Verlauf, Tempo, Wendepunkte; Zeitpunkte rasten ein, Zwischenwerte sind keine Daten | **Ja.** Zeit ist der Gegenstand des Fachs. Wer zieht, sieht, dass etwas schneller oder langsamer kam, als die Erzählung behauptet | Inflation 1923 (M11) · Wahlen 1928–1933 (M14) · Verordnungen 1933–1939 (M17) · Fluchtzahlen bis 1961 (Ost-West 6) |
| **Vorher–nachher** | einen Zustand über den anderen schieben; nur wenn beide nicht nebeneinander passen | **Ja, bei Karten und bei zwei Fassungen desselben Gegenstands** | Grenzen 1914/1919 (M7) · 1937/1945 (Ost-West 1) · zwei Schulbuchtexte (M8, Ost-West 7) |
| **Aufdecken nach Festlegung** (Muster 8) | Schwärzung dessen, was man damals nicht wissen konnte; fällt erst nach der eigenen Entscheidung | **Ja – das ist Retrospektivität als Handlung.** Auf Papier geht es nicht ohne zweites Blatt | M9 · M15 · M19 · M20 · Ost-West 1 und 5 |
| **Spielraum verschieben** (Regler mit sichtbarer Folge) | Folge als Zahl und Wort; »Was lässt das Modell weg?« | **Ja, wenn der Spielraum selbst die Frage ist** (Agency). Nein als Meinungsregler ohne Folge | Linie »Umwelt oder Ich?« (M13, M14, M14.2, M17, M22, M23) |
| **Zustandskarte** | alle Zustände eines Bausteins nebeneinander, mit Tokens; »ohne Zustandskarte ist der Baustein nicht fertig« | kein Lerngewinn für Lernende, aber **Pflicht für den Standard**: offen · auf Ansage · nach deiner Antwort · erledigt · du bist hier | DESIGN.md »Arbeitsblatt Geschichte« |
| **View Transitions** (Ansichtswechsel) | dasselbe Ding von der Übersicht ins Detail verfolgen; 320 ms; Rückfall: sofortiger Wechsel | **Bedingt.** Gewinn nur an einer Stelle: vom Hefter ins Blatt und zurück (»Wo bin ich?«). Innerhalb der Stunde ist es Schmuck | Hefter ↔ Blatt, Zeitleiste ↔ Modul |
| **Scrollytelling** | feste Bühne, Text scrollt; gut für Abläufe, nicht für Inhalte zum Vergleichen; Status im Skill: »Vorschlag, noch nicht erprobt«; der Rückblick in Politik steht aus | **Eher nein als Standard.** Geschichte vergleicht und urteilt; ein geführter Ablauf erzählt eine Geschichte als gegeben (Narrativität!). Sinnvoll nur, wo die **Abfolge selbst** gelernt wird – und dann mit der Frage »Wer erzählt hier?« | höchstens: 30. Januar bis August 1934 (M15), Sommer bis November 1989 (Ost-West 9) – als Option zur Wahl, nicht gesetzt |
| **Sich aufbauender Text** | nur die eine Leitfrage oder ein Zitat, höchstens 2,4 s | **Nein.** Kein Erkenntnisgewinn; bei NS-Themen heikel | nirgends |
| **Autoplay** | nur wenn Bewegung Lerngegenstand ist, unter fünf Bedingungen | **Nein.** Geschichte braucht kein Abspielen; alles wird gezogen | nirgends |

Grenzen aus den Skills, die ich übernehme: höchstens **zwei** Bewegungsformen je Stunde, höchstens **drei** Interaktionsmuster · vor jeder Bewegung eine Frage · Zahl und Wort stehen neben dem Bild · alles lässt sich mit Finger, Regler und Knopf bedienen · in der Arbeitsphase bewegt sich nur die Antwort auf die eigene Handlung (Quiet Work) · nach dem Laden bewegt sich nichts (Input-First) · bei NS-Themen keine Belohnungsbewegung, keine Geräusche.

**Aufgabenmöglichkeiten** (Katalog der 13 Interaktionsmuster in `lernseite-bauen`)

| Muster | Denkhandlung | In Geschichte tragend? |
| --- | --- | --- |
| 1 Vorhersage → Auflösung | vorhersagen | ja – als »Festlegung« vor jeder Quelle |
| 3 Zuordnen mit Begründung, gestuft | zuordnen und begründen | ja – Landkarten-Auftrag L |
| 4 Reihen und ordnen | Abläufe | ja – Abfolgen sind Prüfungsstoff (Machtübernahme, Stufen der Ausgrenzung) |
| 7 Entscheidungsweg | beurteilen, Folgen abwägen | ja – Agency-Stunden |
| 8 Aufdecken nach Festlegung | »damals nicht wissbar« | ja – siehe oben |
| 10 Satzanfänge → Kriterienvergleich | erklären, Produkt | ja – Schreibauftrag; Kriterien erst nach dem eigenen Text |
| 11 Markieren im Text | Quelle erschließen | bedingt – nur bei Texten bis zu einer Bildschirmseite, mit Regel; sonst Papier |
| 12 Stimmkarte | Urteil ins Plenum | ja – Klassenbild vorne |
| 13 Selbsteinschätzung mit Wort | eigenes Können | ja – Ich-kann-Liste im Hefter |
| 2 Einfachwahl mit Erklärung | verstehen | sparsam – nur für Sachwissen, nie für Deutung |
| 5 Regler · 6 Vorher–nachher | Zusammenhang, Veränderung | wie oben |
| 9 Karte dreht nach Antwort | abrufen | ja – »Erst erinnern« am Stundenanfang |

**Strukturen**

- **Ganze Einheit als Rahmen** (`unterricht-digitalisieren` Schritt E, `lernseite-bauen` »mehrere Stunden als Einheit«): Einheitsseite mit Leitfrage und Landkarte aller Stunden – **Papierstunden stehen mit darauf** –, in jeder Stunde dieselben Bausteine, Lernspur, die sich als Datei sichern lässt, gemeinsamer Kern, Speicher je Einheit. → Das ist der Hefter.
- **Lehrfunktion je Phase:** Einstieg · Erarbeitung · Sichern und üben · Übertragen und Ausblick. Für jede Stunde zu prüfen: Gibt es eine Stelle zum Abrufen ohne Vorlage und eine zum Übertragen?
- **Papierfrage** (neun Regeln, 17.11.): hybrid ist der Normalfall · eine Kernentscheidung je Stunde · zurück in den Raum · Schreiben geht auch von Hand · eine Stunde ganz auf Papier ist ein gutes Ergebnis.
- **Zeitdiagnose am vollen Stand:** Wörter ÷ 150 je Minute plus Eingaben; Kürzungen nur als Liste K1, K2 …

**Webdesign** (benannte Regeln, die ich in DESIGN.md übernehme)

Three-Tap (höchstens drei Tipps bis zur ersten eigenen Antwort) · First-Action und Beamer Rule (erster Knopf bei 1280 × 720 im ersten Bildschirm) · Two-Line (Überschrift nie über zwei Zeilen) · Screen-Width (Breite nutzen, Text höchstens 68 Zeichen) · One-Order (eine Ordnung je Bild) · Line-to-Target (jede Linie trägt eine Beziehung) · Input-First · Quiet Work · One Moment · Visible-at-Rest · Reader-Paced · Grow-in-Place · Brightest-Spot (Kontrast an der ungünstigsten Bildstelle) · Device-Switch (Ergebnisse überleben den Gerätewechsel) · Locked-from-Start (Lehrkraftbereich von Anfang an verschlüsselt) · 16-Pixel Floor · Zielflächen 44 px.

Aus der Nie-Liste von `signatur-design` v8.0, wichtig für die Farbwahl: **»Creme mit Terrakotta« gilt als KI-Standard und braucht eine Begründung in DESIGN.md**; ebenso Pillen-Etiketten, gesperrte Versalien, Haarlinien, weiche Schatten. Für NS-Themen verboten: Rot-Schwarz-Weiß, Fraktur, Kriegsästhetik (Fachbaustein GGK).

### C2 · Fallstricke, die für diesen Auftrag besonders zählen

1. Eine Übersicht verrät, was die Aufgabe abfragt → der Hefter zeigt nur Bearbeitetes.
2. Rückmeldung vor der Festlegung lesbar (im gemeinsamen Kern, also in allen Stunden) → nach jeder Kernänderung alle Stunden prüfen.
3. Neue Freigaben verstecken übernommene Arbeit → beim Übernehmen alter Stände jeden bearbeiteten Auftrag freigeben.
4. Ein Speicherschlüssel bekommt eine neue Version, die Nachbarstunde liest den alten → beim Wechsel auf einen Speicher je Einheit alle alten Schlüssel einsammeln (`grep`), mit Rückfall.
5. Nach »Eingaben löschen« legt ein später Speichervorgang den Stand wieder an.
6. Moodle-Paket ohne Schriften, weil nur `media/` gesammelt wurde → alle relativen Pfade einsammeln, entpackt per `file://` öffnen.
7. Eine neue Seitenart (Hefter) druckt ihre Bildschirmfassung mit (14 statt 4 Seiten) → jede neue Seitenart in die Druckregel.
8. Druckregeln werden von einer späteren Grundregel aufgehoben → Druckregeln ans Ende, jedes PDF ansehen.
9. Bildunterschriften nie nach der Miniatur; Datum und Ort an einer Fundstelle prüfen (M17: 1935 statt 27. Juli 1933).
10. Kontrast über Fotos an der hellsten Stelle rechnen → betrifft Titelbilder im Blattkopf.
11. Die passende Antwort ist die längste → Längen vergleichen.
12. Eine Rückmeldung aus dem Unterricht wird auf alle Stunden übertragen, obwohl sie nur zu einzelnen gehört.

---

## D · Ist-Stand der Geschichtsmodule und Bildlücken

Gemessen am 18.11.2026 am Stand `ea6a695` (Branch `blatt-standard-und-weimar`): alle Seiten in Chromium bei 1180 × 820 geöffnet, Register ausgelesen (`tools`-Skript im Arbeitsordner, Ergebnis `inventar.json`), Bilddateien gegen das Repository und die Bildlisten abgeglichen.

### D1 · Was da ist: 41 Seiten, vier Bauarten

| Einheit | Stunden | Bauart | Register | Kopf mit Leitfrage | Sozialform an jedem Auftrag | Freigabe (offen · Ansage · Antwort) | »Erst erinnern« | »Verorten« | Schreibauftrag | L | Z heißt | Datei sichern |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Weimar** | 16 (M1–M14.2) | Kern `src/weimar` (17./18.11.) | ja | ja | ja | ja, alle drei | in 9 von 16 | als »roter Faden« (ein Satz je Stunde) | 16 | 16 | Zusammenfassung | nur auf der Kapitelseite |
| **NS, neuer Kern** | 5 (M16, M17, M25, M26, M27) | Kern `src/m25-m27` | ja | Leitfrage nicht im Kopf | **nein** (nur L und Schreibauftrag) | **nein, alles offen** | nein | nein | M16, M17 | 4 von 5 (M26: Blick am Urteil) | Zusammenfassung | nein |
| **NS, von Hand gebaut** | 5 (M18, M19, M20, M21, M23) + je ein »Teil 2« | eigene Seiten, je anders | Teil 2: ja · Stunde: nein | – | Teil 2: ja | Teil 2: Ansage oder Codewort | nein | nein | in Teil 2 | in Teil 2 (M21 in der Stunde) | je anders | nein |
| **NS, M22** | 1 | eigene Fassung 4.1 | ja | ja | ja | ja | nein | nein | ja | ja | Zusammenfassung | nein (zwei Verweise zum Herunterladen, kein Laden) |
| **Ost-West** | 9 (Stunde 1–9 = M29–M44) | Kern `src/ost-west` | ja | Leitfrage nicht im Kopf | ja | **nein, alles offen** | nein | **ja, fester Auftrag** | 9 | 9 | **Merkseite** | nein |

Dazu: Startseite `index.html`, Kapitelseiten `weimar/index.html` und `ost-west/index.html`, sechs Bildlisten. **M15 und M24 gibt es im Heft, aber nicht als Modul.**

**Befunde:**

1. **Kein einziges Arbeitsblatt kann seinen Stand als Datei sichern oder laden.** Nur die Kapitelseite Weimar kann es (`weimar-lernspur-….json`, alle Weimar-Schlüssel in einer Datei). Wer das Gerät wechselt, verliert in NS und Ost-West alles.
2. **44 getrennte Speicherschlüssel.** Weimar und Ost-West haben zusätzlich einen Schlüssel für die Einheit (`ggk-weimar:v1`, `ggk-owk:v1`), NS nicht.
3. **Dieselbe Sache heißt verschieden:** »Zusammenfassung« (Weimar, NS) und »Merkseite« (Ost-West); »roter Faden« (Weimar) und »Verorten« (Ost-West); »Stunde 3« (Ost-West) und »M17« (NS, Weimar).
4. **Die NS-Einheit ist am uneinheitlichsten:** drei Bauarten in elf Stunden; fünf Stunden bestehen aus zwei Seiten (Stunde und Teil 2).
5. **»Erst erinnern«** (Abruf ohne Heft) gibt es nur in Weimar, **»Verorten«** als Auftrag nur in Ost-West. Beides fordert die Lehrfunktion »Sichern und üben« und »Übertragen«.
6. **Planzeiten über 90 Minuten:** M1 (105), M6 (104), M11 (158), M17 (108), Ost-West 2 (103), Ost-West 4 (99), Ost-West 6 (98). Ob das Doppelstunden mit Reserve oder zwei Stunden sind, weißt nur du. Gekürzt wird nichts ohne deine Auswahl (K-Listen im Pilot und bei der Übertragung).
7. **Wortlaut der Landkarte:** Der »Blick« von M14.2 heißt »Politikgeschichte« – diesen Namen hat die Landkarte nicht (dort: Ereignisgeschichte, 2.3.8). In NS und Ost-West ist das am 18.11. schon berichtigt, in Weimar noch nicht.

### D2 · Titelbilder: 8 Lücken, 22 zu prüfen oder zu ersetzen, 6 geklärt

Maßstab ist dein neuer Auftrag: nur frei lizenzierte oder gemeinfreie Bilder oder eigene Grafiken; unter jedem Bild Herkunft, Datum, Urheber, Lizenz.

| Stand | Module | Anzahl |
| --- | --- | --- |
| **Kein Titelbild** | Weimar M1, M3, M7, M7.1, M8, M9, M10, M11 | **8** |
| **Bild da, Herkunft oder Lizenz ungeklärt** (aus dem Heft übernommen) | Weimar M2, M4, M5, M6, M12, M13, M14, M14.2 · NS M19 (Karte aus dem Heft), M20 (London 1940), M25 (»im Heft ohne Angabe – prüfen«), M26 (aus dem Heft), M27 (»vermutlich IWM – prüfen«) · Ost-West Stunde 1, 2, 3, 5, 6, 7, 8 (»Nachweis offen«) | **20** |
| **Bild da, aber nicht frei** | Ost-West Stunde 4 (Karikatur STIG 1948, Ausschnitt der Heftseite) · Stunde 9 (laut Heft ndr.de) | **2** |
| **Geklärt und frei** | NS M16, M17, M18 (eigene Grafiken) · M21 (Steven Lek, CC BY-SA, Wikimedia Commons) · M22 (Paweł Byra, CC BY-SA 4.0) · M23 (Jens Cederskjold, CC BY 4.0) | **6** |

Das heißt: **Von 36 Stunden haben heute 6 ein Titelbild, das deinem neuen Maßstab genügt.** 8 fehlen ganz, 22 müssen geprüft oder ersetzt werden.

Weitere Befunde zu Bildern:

- **Weimar hat keine Bildliste.** 24 Bilder aus dem Heft liegen in `weimar/media/` (nur im Moodle-Paket, nicht im Repository), ohne einen einzigen Nachweis.
- **Ost-West:** 35 Bilder, davon tragen fast alle »Nachweis offen«.
- **Nicht als Titelbild geeignet,** auch wenn die Datei da ist: M1 (zwei Standbilder aus einem Spielfilm), M3 (Foto von 1915 – steht zu Recht hinter Hinweis und eigenem Tippen), M17 (Boykott-Plakat, Pranger in Cuxhaven: Propaganda und Demütigung realer Menschen), M25 (Buchenwald-Fotos), M27 (Vermessung eines Kriegsgefangenen).
- **Bildlisten fehlen** für M16, M18, M19, M20, M26 und ganz Weimar.

**Vorschlag für den Weg zum Titelbild** (Reihenfolge der Prüfung je Modul):
1. **Eigene Grafik** nach `schaubild-design`, wenn das Modul ein Denkbild hat (Karte, Linie, Schaubild). Sofort frei, passt zur Farbwelt.
2. **Gemeinfreies oder frei lizenziertes Dokument oder Ortsfoto** (Wikimedia Commons, Bundesarchiv mit CC-Lizenz), an der Fundstelle geprüft: Datum, Urheber, Lizenz, Signatur.
3. **»offen«,** wenn beides nicht geht – dann zeigt der Kopf das Nummernfeld der Einheit.

Motivrichtungen für die acht Lücken (noch **keine** Bildangaben – Fundstellen werden erst im Pilot und bei der Übertragung geprüft und dir je Modul als Bildliste vorgelegt):

| Modul | Motivrichtung | Weg | Nicht |
| --- | --- | --- | --- |
| M1 Mein Leben 1917 | Feldpostbrief oder Lebensmittelkarte von 1917 als Dokument | 2 | Filmstandbild |
| M3 Standortgebundenheit | eigene Grafik: ein Ereignis, zwei Wörter, zwei Rednerpulte | 1 | Opferfoto |
| M7 Versailler Vertrag | Vertragsseite mit Siegeln oder der Spiegelsaal als Ort | 2 | Karikatur mit unklarem Urheber |
| M7.1 Kriegsschuld | eigene Grafik: zwei Buchrücken, zwei Thesen | 1 | Porträts lebender Historiker ohne Lizenz |
| M8 Kollektives Gedächtnis | Kriegerdenkmal als Ortsfoto | 2 | – |
| M9 Wahlen 1919 | Stimmzettel oder Wahlaufruf von 1919; oder eigene Grafik der Sitzverteilung | 2 oder 1 | Parteiplakate mit Feindbildern |
| M10 Saat der Gewalt | Zeitungsseite von 1919–1922 als Dokument | 2 | Gewaltfotos |
| M11 Krisenjahr 1923 | Geldschein von 1923 als Dokument | 2 | – |

---

## E · Zuordnungstabelle: Modul × Prinzip × digitale Technik × Lerngewinn gegenüber Papier

**Lesehilfe.** »Prinzip« ist der Abschnitt der kognitiven Landkarte, den der Auftrag L der Stunde heute als zentral setzt. »Zugang« ist der Blick der Stunde (acht Zugänge aus `fachdidaktik-geschichte`). »Technik« nennt das Interaktionsmuster (Nummer aus dem Katalog) und in Klammern, was das Gerät dabei tut (verdecken · rückmelden · messen · variieren · stufen · bündeln). **da** = steht heute schon in der Stunde · **neu** = Vorschlag. »Bewegung« steht nur dort, wo sie selbst die Erkenntnis ist. Alle neuen Techniken sind Vorschläge; Daten für Regler und Zeitachsen werden vor dem Bau am Heft und an einer Fundstelle belegt.

### E1 · Weimarer Republik

| Modul | Prinzip (L) | Zugang | Technik | Lerngewinn gegenüber Papier | Bewegung als Erkenntnis |
| --- | --- | --- | --- | --- | --- |
| M1 Mein Leben 1917 | 3.1.2 Darstellung in der Geschichtskultur | Mensch und Biografie | Festlegung vor dem Film versiegeln, danach »Was denkst du jetzt?« (1 · verdecken) – **da** | Die erste Antwort lässt sich nicht nachträglich schönen; vorher und nachher stehen nebeneinander | – |
| M2 Kriegsausbruch | 2.3.8 Ereignisgeschichte | Ereignis | Bündnisse auf der Karte färben mit Rückmeldung je Land (3 · rückmelden) – **da**; Bündnisjahre ziehen – **neu** | Fehler beim Färben werden sofort erklärt; das Wachsen der Bündnisse wird als Abfolge sichtbar | Zeit ziehen: Bündnisse rasten Jahr für Jahr ein |
| M3 Standortgebundenheit | 2.1.8 Standortgebundenheit | Geschichtskultur | Vier Stimmen ohne Amt lesen, Amt vermuten, dann aufdecken (8 · verdecken) – **neu** | Der Standort wird erschlossen statt mitgeteilt – auf Papier steht das Amt schon in der Überschrift | Quelle aufdecken: Das Amt erscheint an der Stimme |
| M4 Matrosenaufstand | 2.1.3 Partikularität, 2.1.4 Selektivität | Sozialgeschichte | Sechs Karten ansehen, eine Person wählen; die Seite zeigt, wen man nicht gewählt hat (bündeln) – **da**, Rückblick **neu** | Die eigene Auswahl wird selbst zum Material: »Wessen Novembertag fehlt in deiner Geschichte?« | – |
| M5 Doppelte Ausrufung | 2.1.1 Retrospektivität | Agency | Abstimmen, Stimmkarte, Auflösung auf Ansage (7, 12 · verdecken) – **da** | Alle legen sich fest, bevor der Ausgang bekannt ist | Aufdecken: späteres Wissen im eigenen Kasten |
| M6 Friedenskonferenz | 1.3 Verständnis der Gegenwart | Ideengeschichte | Eigene Grenzen skizzieren, dann die Karte von 1919 darüberschieben (6 · variieren) – **neu** | Der eigene Entwurf liegt über dem Ergebnis; man sieht, wo Selbstbestimmung an Grenzen stößt | Vorher–nachher: 1914 und 1919 |
| M7 Versailler Vertrag | 2.3.2 Nationalgeschichte gegen 2.3.4 Globalgeschichte | Global | Aussagen den zwei Erzählungen zuordnen, mit Begründung (3 · rückmelden) – **da** | gering: Die Tabelle geht auf Papier gleich gut. Gewinn nur durch die gestufte Rückmeldung | – |
| M7.1 Kriegsschuld | 2.1.9 Kontroversität, 2.1.8 | Forschungskontroverse | Position auf einer Linie vor und nach Fischer und Clark; Klassenbild vorne (5, 12 · messen) – **da** (Abstimmung), Linie **neu** | Man sieht, wer sich bewegt hat – und fragt, warum | Position verschieben |
| M8 Kollektives Gedächtnis | 3.1.1 Kollektives Gedächtnis | Geschichtskultur | Ereignis – Erinnerung – Folge als Netz legen und jede Verbindung benennen (Legeform Netz · stufen) – **neu** | Umbauen ohne Radieren; Zwischenstand; die Struktur wandert in den Hefter | – |
| M9 Wahlen 1919 | 2.1.1 Retrospektivität | Agency | Politik-Check 1919: eigene Positionen, Auswertung, dann das Wahlergebnis (1 · messen, verdecken) – **da** | Auswerten kann Papier nicht; das Ergebnis bleibt bis zur eigenen Wahl verdeckt | – |
| M10 Saat der Gewalt | 2.1.6 Narrativität, 2.1.1 | Geschichtskultur | Vermutung zum Titel vor dem Film, Beobachtung mit Zeitmarken (1 · verdecken) – **da** | gering: Der Film trägt die Stunde. Das Gerät sichert nur die Vermutung | – |
| M11 Krisenjahr 1923 | 1.2, 1.4 Wozu Geschichte | Vergleich | Krisen als Netz oder Kreislauf legen – **da** (Zusammenhang); Geldentwertung als Verlauf ziehen (5 · variieren) – **neu** | Das Tempo der Entwertung wird spürbar; eine Tabelle zeigt Zahlen, aber nicht die Beschleunigung | Zeit ziehen: 1923 Monat für Monat |
| M12 Goldene Zwanziger | 2.1.2 Perspektivität, 2.1.4 Selektivität | Geschichtskultur | Aus vielen Belegen wenige für die eigene Collage wählen; die Seite zeigt den Rest (bündeln) – **neu** | Selektivität wird an der eigenen Auswahl erfahren | – |
| M13 Zwei Leben | 3.1.5 Agency | Mensch und Biografie | Meinungslinie »Umwelt oder Ich?« als Startpunkt; kehrt in M14 und M14.2 wieder (5 · messen) – **da** | Die Linie über drei Stunden gibt es auf Papier nicht: Dort ist die frühere Position weg | Spielraum verschieben |
| M14 Weltwirtschaftskrise | 2.1.5 Partialität, 2.1.3 | Sozialgeschichte | Arbeitslosigkeit und Wahlergebnisse 1928–1932 gemeinsam ziehen (5 · variieren) – **neu**; Linie aus M13 – **da** | Gleichzeitigkeit wird sichtbar – und die Frage »Was lässt dieses Bild weg?« | Zeit ziehen: Wahl für Wahl |
| M14.2 Verfassung | 1.8 Wozu Geschichte | Ereignis | Stimmungskurve der Republik selbst zeichnen – **da** | gering bis mittel: Zeichnen geht auf Papier gleich gut; Gewinn ist, dass die Kurve im Hefter neben der Linie aus M13 liegt | – |

### E2 · Nationalsozialismus

| Modul | Prinzip (L) | Zugang | Technik | Lerngewinn gegenüber Papier | Bewegung als Erkenntnis |
| --- | --- | --- | --- | --- | --- |
| M16 Was macht den Menschen zum Menschen? | 1.10, 1.4 Wozu Geschichte | Gegenwartsfrage | Eigene Werte in eine Reihenfolge legen (4 · messen) – **da**; dieselbe Reihenfolge kehrt in M17 wieder – **neu** | Die eigene Rangfolge wird in M17 unter Druck noch einmal geprüft | – |
| M17 Leben in der Diktatur | 2.1.2 Perspektivität | Mensch und Biografie | Spielraum je Station für zwei Lebensläufe einschätzen (5 · messen) – **da**; Verordnungen 1933–1939 ziehen – **neu** | Zwei Spielräume schrumpfen verschieden schnell – nebeneinander und in der Zeit | Spielraum verschieben; Zeit ziehen |
| M18 Fünf Säulen | 1.1 Wozu Geschichte | Ideengeschichte | Sechs Zeugnisse zuordnen, mit Detail begründen, gestufte Rückmeldung (3 · rückmelden) – **da** | Rückmeldung zu jeder Zuordnung, sofort und erklärend | – (bewusst ruhig) |
| M19 Appeasement | 2.1.1 Retrospektivität | Agency | Entscheiden, Stimmkarte, Codewort, Auswertung (7, 12, 8 · verdecken) – **da**; vier Lagekarten 1936–1939 ziehen – **neu** | Entscheidung unter dem Wissen von damals; auf Papier liegt die Auflösung schon im Heft | Aufdecken; Zeit ziehen über die Karten |
| M20 Dilemmata | 3.1.5 Agency | Agency | wie M19, drei Entscheidungen – **da** | wie M19 | Aufdecken |
| M21 Es geht um Menschen | 3.1.2 | Mensch und Biografie | Lebenswege in Stationen im eigenen Tempo lesen, dann gemeinsame Matrix (stufen) – **da** | Der Wechsel vom Einzelleben zum System wird in Schritten geführt | – (bewusst ruhig) |
| M22 Wie war das möglich? | 2.1.2, 2.1.9 Kontroversität | Forschungskontroverse | Erklärungen gewichten vor und nach den Akten (5 · messen) – **da** | Die eigene Gewichtung vorher und nachher; Klassenbild | Gewichte verschieben |
| M23 Ländervergleich | 2.1.7 Konstruktivität | Vergleich und Modell | Vorhersagen, Karte aufdecken, These an einem neuen Land testen (1 · verdecken, variieren) – **da** | Das Modell entsteht aus den eigenen Faktoren, erst danach kommt das der Lehrkraft | Aufdecken |
| M25 Leben in Ruinen | 2.1.2, 2.1.9 | Alltagsgeschichte | Fotos erst nach Hinweis und eigenem Tippen; drei Fragen der Quellenkritik (verdecken) – **da** | Sorgfalt: Niemand sieht ein belastendes Bild ungefragt | – |
| M26 Kontinuitäten | Blick 2.3.7 Sozialgeschichte (kein L) | Gegenwartsfrage | Schätzen, dann die belegte Zahl (1 · verdecken, messen) – **da** | Die eigene Schätzung steht neben dem Befund | – |
| M27 Die Vergessenen | 2.1.2, 2.1.8 | Global | Zentrum der Weltkarte verschieben; Strukturbild legen (Geste · variieren) – **da** | Eurozentrismus wird als Blickpunkt erfahren: Dieselbe Karte, ein anderes Zentrum | Zentrum verschieben |

### E3 · Ost-West-Konflikt

| Stunde (Heft) | Prinzip (L) | Zugang | Technik | Lerngewinn gegenüber Papier | Bewegung als Erkenntnis |
| --- | --- | --- | --- | --- | --- |
| 1 Stunde Null (M29/M30) | 2.1.1 Retrospektivität | Agency | Vorhersagen, dann das Abkommen (1 · verdecken) – **da**; Karte 1937 und 1945 – **neu** | Festlegung vor der Auflösung | Vorher–nachher |
| 2 Kommunismus gegen Kapitalismus (M31) | 2.1.2 Perspektivität | Ideengeschichte | Zwei Reden, Sprecher verdeckt, zuordnen, aufdecken (8 · verdecken) – **neu**; Spiegelbild – **da** | Die Spiegelstruktur wird entdeckt, nicht mitgeteilt | Quelle aufdecken |
| 3 Berlin-Blockade (M32/M33) | 2.1.6 Narrativität | Agency | Entscheiden vor dem Verlauf (7) – **da**; Ablauf in eine Reihe legen (4 · rückmelden) – **da** | Entscheidung mit dem Wissen von damals | Aufdecken |
| 4 Doppelte Staatsgründung (M34) | 2.1.8 Standortgebundenheit | Perspektiven | Zwei Reden markieren mit Regel, Vergleichstabelle (11, 3) – **da** | mittel: Lange Reden bleiben auf Papier; am Gerät nur der Vergleich der Markierungen | – |
| 5 Westbindung (M35/M36) | 2.1.4 Selektivität | Ereignis | Schritte reihen (4) – **da**; Urteilslinie vor und nach dem Streit (5 · messen) – **neu** | Die eigene Position vorher und nachher | Position verschieben |
| 6 Flucht und Mauer (M36–M39) | 2.1.5 Partialität | Sozialgeschichte | Fluchtzahlen 1949–1961 ziehen (5 · variieren) – **neu**; Gründe ordnen – **da** | Spitzen und Tempo werden sichtbar; »Was zeigen Zahlen nicht?« | Zeit ziehen |
| 7 Geschichte im Staatsdienst (M40) | 2.1.7 Konstruktivität | Geschichtspolitik | Zwei Schulbuchtexte, Herkunft verdeckt, Wertung markieren, aufdecken (8, 11 · verdecken) – **neu** | Die Texte werden als Quellen ihrer Staaten gelesen, bevor man weiß, woher sie sind | Quelle aufdecken |
| 8 Ostverträge (M41) | 2.1.1 Retrospektivität | Ereignis | Debatte: Position vorher und nachher, Stimmkarte (12 · messen) – **neu** | Klassenbild als Gesprächsanlass | – |
| 9 Ende der DDR (M42–M44) | 2.1.6 Narrativität | Erklären aus mehreren Ursachen | Vier Blickwinkel gewichten (5 · messen) – **neu**; Herbst 1989 reihen (4) – **da** | Mehrere Ursachen bekommen ein eigenes Gewicht; die Gewichte der Klasse unterscheiden sich | Gewichte verschieben |

### E4 · Was die Tabelle zeigt

- **Wo das Gerät am meisten kann:** verdecken und aufdecken (Retrospektivität, Standortgebundenheit) – in 14 von 36 Stunden. Das ist der fachliche Kern deines Konzepts und auf Papier nicht zu haben.
- **Bewegung als Erkenntnis** schlage ich in 21 von 36 Stunden vor, in fünf Formen: Zeit ziehen (6) · Vorher–nachher (2) · Aufdecken (8) · Spielraum, Position oder Gewicht verschieben (6) · Zentrum verschieben (1). Das sind 23 Stellen, weil M17 und M19 zwei Formen haben. In 15 Stunden bleibt die Seite still.
- **Ehrlich gering oder nur mittel** ist der Gewinn in M7, M10, M14.2 und Ost-West 4. Dort trägt Film, Papier oder Gespräch die Stunde; das Blatt gibt nur Ordnung, Sicherung und den Platz im Hefter. Das ist ein gutes Ergebnis, kein Mangel.
- **Kein Scrollytelling, kein Autoplay, kein sich aufbauender Text** (Begründung in Block C).
- **Jede Stunde behält höchstens drei Muster und zwei Bewegungsformen.** M17 und M19 liegen an der Grenze (zwei Formen).
- **Kontroversität (2.1.9) ist dünn besetzt:** nur M7.1, M22, M25. Die Ost-West-Einheit hat keine Stunde, die eine Forschungskontroverse trägt. Das ist eine fachliche Lücke, keine technische – ich nenne sie, ohne sie zu füllen.
