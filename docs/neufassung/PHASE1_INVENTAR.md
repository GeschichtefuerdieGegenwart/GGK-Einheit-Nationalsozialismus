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
