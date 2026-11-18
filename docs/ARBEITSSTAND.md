# Arbeitsstand · Blatt-Standard für alle Module und Kapitel Weimarer Republik

## Stand am 18.11.2026, Nachmittag · NS und Ost-West überarbeitet, ein Paket für alle drei Kapitel

Branch `blatt-standard-und-weimar`, alles gepusht. Nichts ist zusammengeführt.

**Auftrag vom 18.11., 13:06 Uhr:** vier Vorschläge angenommen (sieben Leitfragen · Landkarten-Aufträge in M4, M10, M14, M7.1 · Linie »Umwelt oder Ich?« · Re-Konstruktion als Abschluss), Bild zu M12 zurück, Foto zu M3 einbauen; dann NS und Ost-West überarbeiten und **eine** Zip-Datei aus allem erstellen.

**Erledigt:**

- Weimar: Bild zu M12 wieder auf Startseite und Deckblatt; Foto zu M3 hinter Hinweis und eigenem Tipp (`bildNachTipp`).
- Gemeinsamer Rahmen: Bausteine aus `weimar.js` nach `blatt.js` verlegt (Leitfrage als Linie, Abruf, Blick der Stunde, Bild nach Tipp, Adresse und »Weitermachen«); `L.blattAuto` baut das Register aus `L.seiten`; dritte Sperre `frei:"code"`; `gefragtBlock()` für eigene Zusammenfassungen.
- Ost-West, Stunden 1–9: Blatt-Rahmen, je Stunde Schreibauftrag im Format der Klassenarbeit, Blick der Stunde, Sozialformen im Register; die Merkseite zeigt jetzt auch »So wird gefragt« und den eigenen Text.
- NS, M16, M17, M25–M27: Blatt-Rahmen und Blick der Stunde; M16 mit neuem Landkarten-Auftrag (Wozu Geschichte?) und Schreibauftrag, M17 mit Schreibauftrag; M27 mit 44-px-Ortsmarken und lesbarer Begleitkarte.
- NS, M18, M19, M20, M21, M23: je eine neue Seite `mNN-teil2.html` (Landkarte, Schreibauftrag, Blick). Die erprobten Stunden bleiben bis auf einen Verweis am Ende unverändert. M19 und M20: Teil 2 öffnet erst nach dem dritten Codewort (dieselbe Prüfsumme wie in der Stunde). M22 ist unverändert.
- Startseite: Verweis auf Teil 2 im Fenster des Moduls; in der zweiten Ordnung ist kein Modul mehr »nicht zugeordnet«.
- Lehrkraft-Texte: 19 Texte mit einem datierten Abschnitt ergänzt und neu verschlüsselt (alle 38 öffnen); Werkzeug `lk-bauen.mjs --holen` stellt fehlende Klartexte wieder her.

**Gelaufen (Chromium, 1180 × 820, `file://`):** Rauchprüfung aller 35 Blätter (16 Weimar, 9 Ost-West, 5 NS im Kern, 5 Teil 2): 1823 Prüfungen bestanden, 0 offen · Zusammenfassung 2 Seiten auf allen 30 Blättern, die eine haben – auch mit 144 Wörtern im Schreibauftrag · Schreibblatt 1 Seite auf allen 32 · Tor von M19/M20: zu ohne Stand der Stunde, falsches Wort abgewiesen, mit Stand der Stunde offen · die fünf geänderten Stunden laden ohne Fehler · Startseite ohne Konsolenfehler und Querlauf · `weimar_pruef.py` 0 offen · Paketprüfung siehe Bericht.

**Nicht gelaufen:** das richtige Codewort (kenne ich nicht) · andere Breiten, echtes iPad und Safari, Stift und Tastatur, GoodNotes, VoiceOver, Moodle-Upload, axe · keine Stunde ist erprobt.

**Offen, wenn Mario es sagt:** M15 und M24 · Entscheidung, ob Teil 2 bleibt oder ob M18–M21 und M23 selbst in den Blatt-Rahmen umgebaut werden · Abschluss der Kapitel NS und Ost-West als Re-Konstruktion (gibt es bisher nur in Weimar) · Pull Request.

Prüfen: `python3 tools/pruef/blatt_rauch.py <seite> --voll --pdf` (für `m19-teil2.html` und `m20-teil2.html` mit `--stand` und `{"tor":true}`). Bauen: `python3 tools/bau_weimar.py && python3 tools/bau_ost_west.py && python3 tools/bau_m25_m27.py && python3 tools/lk_einsetzen.py && python3 tools/bau_startseite.py`; Paket: `python3 tools/bau_moodle_paket.py --apps <Ordner mit den eigenen Seiten>`.

## Stand am 18.11.2026, Mittag · Halt nach dem Kapitel Weimar

Branch `blatt-standard-und-weimar`, alles gepusht (Stand `5222864` und folgende). Nichts ist zusammengeführt.

**Auftrag vom 18.11.:** Auftrag wieder aufnehmen, neue Skills beachten (`fachdidaktik-geschichte` v1, `lernseite-bauen` v3.0), weiter schärfen – und nach den Modulen zur Weimarer Republik anhalten. **Hier steht die Arbeit.** M15, M24, die Übertragung auf NS und Ost-West, das Abschluss-Paket und der Pull Request warten auf ein neues Wort.

**Neu am 18.11. (alle 16 Stunden und die Kapitelübersicht):**

- Rahmen: eine Adresse – eine Seite (Deckblatt ohne Anker, jeder Auftrag mit Anker, »Weitermachen«, Deckblatt im Register) · was einmal offen war, bleibt offen (`S.war`) · Selbsttests überspringbar · Leitfrage als Linie vor Auftrag 1 und bei der Zusammenfassung (`L.pole`) · Blick der Stunde nach dem Landkarten-Auftrag (`L.blick`) · Abruf früherer Stunden (`erinnere`) · Linie »Umwelt oder Ich?« in M13, M14, M14.2 (`L.linie`, Vorschlag) · Ebenen Welt · Europa · Deutschland auf dem Deckblatt (`W_EBENE`).
- Stunden: Leitfragen mit zwei Polen (M2, M4, M8, M10, M11, M14, M14.2) · Landkarte: M4 Partikularität, M7.1 Kontroversität, M10 Narrativität, M14 Partialität – über das Kapitel alle Einträge aus 2.1 · Schreibaufträge in Teilaufgaben a) und b) · Operatoren analysieren (M5, M9) und bewerten (M10) · Erwartungshorizonte als Bandbreite (M6, M12, M13, M14, M14.2) · M8: eigene Erinnerung freiwillig.
- Kapitelübersicht: Zeitspannen statt zweiter Zählung · Raster Welt · Europa · Deutschland mit Vernetzen · Landkarte des Kapitels (`W_LK`) · Abschluss als Re-Konstruktion »Warum scheiterte die erste deutsche Demokratie?« mit eigenem Ausdruck.
- Prüfen: `tools/pruef/blatt_rauch.py` mit `--voll` (Zeitdiagnose am vollen Stand, 150 Wörter je Minute) und `--privat`; misst jetzt auch die wirksame Schrift in Schaubildern, Adresse und Anker, Überspringen. `tools/pruef/weimar_pruef.py` gleicht Landkarte, Ebenen, Selbsttests und Operatoren ab.
- Moodle-Paket vom 18.11. (`dist/GGK-Labor_Moodle_2026-11-18.zip`, 14,8 MB) ging an Mario; Paketprüfung: 59 Seiten geöffnet, keine Meldung im Kapitel Weimar.

**Gelaufen:** Rauchprüfung aller 16 Stunden (958 Prüfungen bestanden, Chromium, 1180 × 820, `file://`), Zusammenfassung je 2 Seiten A4, Schreibblatt je 1 Seite; Kapitelübersicht und Startseite ohne Konsolenfehler und ohne Querlauf; Druck der Abschlussgeschichte.

**Nicht gelaufen:** andere Breiten als 1180 px, echtes iPad und Safari, Stift und Tastatur, GoodNotes, VoiceOver, Moodle-Upload, axe; die Module außerhalb von Weimar nach der Änderung an `blatt.js` (M22 nutzt `blatt.js` und wurde nicht neu gebaut).

**Wie es weitergeht, wenn Mario es sagt:**

1. M15 und M24 (Wurzel; `tools/bau_weimar.py` kann Wurzelmodule schon bauen: `src/weimar/m15.js`, `m24.js`).
2. Blatt-Standard und die Neuerungen vom 18.11. auf M16, M17, M25–M27 und Ost-West übertragen. Achtung: `kern.js` braucht `blatt.js`; `tools/bau_m25_m27.py` und `tools/bau_ost_west.py` binden es noch nicht ein – diese Seiten bis dahin nicht neu bauen.
3. Blatt-Standard auf M18–M21, M23 (von Hand gebaute Seiten); M22 mit dem geänderten `blatt.js` neu bauen und prüfen.
4. Gesamtprüfung, Abschluss-ZIP, Bericht, Pull Request.

Moodle-Material, das nicht im Repository liegt, entsteht so neu: `python3 tools/weimar_bilder.py <Heft.pdf>`, `python3 tools/texte_aus_heft.py <Heft.pdf>`, `python3 tools/owk_texte.py <Heft.pdf>` (danach `git checkout src/ost-west/quellen.js`). Lehrkraft-Texte: Klartext in `privat/lk/` (nicht im Repository) und gebündelt im Claude-Projekt (`claude/Lehrkraftbereiche_Klartext_Weimar.html`); verschlüsseln mit `LK_PASS='…' node tools/lk-bauen.mjs`.

## Stand am 17.11.2026, 15:30 Uhr

Branch `blatt-standard-und-weimar`, alles gepusht. Nichts ist zusammengeführt.

**Fertig gebaut und im Browser geprüft (Chromium, 1180 × 820, `file://`; Zusammenfassung je 2 Seiten A4, Schreibblatt je 1 Seite):**

- Blatt-Rahmen im gemeinsamen Kern (`src/m25-m27/blatt.js`, `blatt.css`), Grundgerüst Weimar (`src/weimar/weimar.js`, `weimar.css`), Bauwerkzeug `tools/bau_weimar.py`, Rauchtest `tools/pruef/blatt_rauch.py`.
- **Kapitel Weimar vollständig:** M1 bis M14.2 (16 Arbeitsblätter) und die Kapitelübersicht `weimar/index.html` – je mit Register, Landkarten-Auftrag, Schreibauftrag, Zusammenfassung und verschlüsseltem Lehrkraftbereich (`lk/w-*.enc.json`).
- Startseite mit Kapitel 1 (16 Module in Leiste und Regal).
- Wahldaten 1919–1933 mit Quelle in `weimar.js` (`W_WAHLEN`); Bausteine Halbrund, Linien, Stimmungskurve, Rechnen, Karten zum Anstreichen.
- Moodle-Paket: `tools/bau_moodle_paket.py` (braucht die geklonten eigenen Seiten: `--apps <Ordner>`) und `tools/pruef/paket_pruef.py`. Ein erster Zwischenstand ging am 17.11. an Mario.

**Noch offen, in dieser Reihenfolge:**

1. M15 und M24 als Module im NS-Kapitel (Wurzel, `src/m25-m27/`).
2. Blatt-Standard auf M16, M17, M25–M27 und Ost-West übertragen. Achtung: `kern.js` braucht jetzt `blatt.js`; `tools/bau_m25_m27.py` und `tools/bau_ost_west.py` binden es noch nicht ein – diese Seiten vorher nicht neu bauen.
3. Blatt-Standard auf M18–M21, M23 (von Hand gebaute Seiten).
4. Gesamtprüfung (weitere Breiten, alte Prüfungen), Abschluss-ZIP, Bericht, Pull Request.

Moodle-Material, das nicht im Repository liegt, entsteht so neu: `python3 tools/weimar_bilder.py <Heft.pdf>`, `python3 tools/texte_aus_heft.py <Heft.pdf>`, `python3 tools/owk_texte.py <Heft.pdf>` (danach `git checkout src/ost-west/quellen.js`). Links mit Schlüssel stehen in `privat/moodle-links.json`.

**Nicht gelaufen:** andere Breiten als 1180 px, echtes iPad, Stift, VoiceOver, Moodle-Upload, Zeitdiagnose mit 150 Wörtern pro Minute.

Branch `blatt-standard-und-weimar`. Auftrag vom 17.11.2026: Blatt-Standard aus M22 (Fassung 4.1) auf jedes Modul übertragen, alle Stunden zur Weimarer Republik (Heft M1–M15) neu bauen, alles als eine ZIP-Datei für Moodle. Zusammengeführt wird erst nach ausdrücklicher Freigabe.

Diese Datei wird nach jedem Paket fortgeschrieben, damit eine Unterbrechung höchstens einen Schritt kostet.

## Pakete

| Nr. | Paket | Stand |
| --- | --- | --- |
| 1 | Gemeinsamer Blatt-Rahmen im Kern (`src/m25-m27/`): Register auf altem Papier, ein Auftrag je Seite, Freigabe in drei Zuständen, Schreibauftrag im Klassenarbeitsformat, Zusammenfassung »wissen / können«, Landkarte als Auftrag L | in Arbeit |
| 2 | Weimarer Republik: Heft M1–M14.2 als Arbeitsblätter (`src/weimar/`), geschärft am 18.11. | fertig (M15 offen) |
| 3 | Startseite: Kapitel Weimar mit allen Modulen; Moodle-ZIP vom 17.11. und 18.11. | fertig |
| 4 | Übertragung auf M16, M17, M25–M27 und Ost-West (Kern) | offen |
| 5 | Übertragung auf M18, M19, M20, M21, M23 (eigene Dateien; Codewörter bleiben in M19/M20) | offen |
| 6 | M24 (Widerstand) neu | offen |
| 7 | Prüfen, endgültige Moodle-ZIP, Bericht, Pull Request | offen |

## Gesichtet (17.11.2026)

- Heft »Geschichte aktuell 1« (268 Seiten): Weimar = M1–M15 (S. 1–90); M24 (S. 164–168) fehlt als Modul.
- Tresor: »Digitale Didaktik – Prinzipien und Fachgrenzen«, »Erfahrungen aus Erprobungen«, »Didaktische Signatur – Lesart des Hefts«, »Geschichte aktuell – Material M1–M44«, Analyse vom 12.10.2026 (Sachfehler M2, M3, M4, M7, M8, M9, M12, M13, M14 werden beim Bauen korrigiert).
- Skill `lernseite-bauen` v2.3 mit Fallstricken.

## Regeln, die hier gelten

- Nichts erfinden; Status an jedem Element (belegte Quelle · Modell · ausgedachter Fall · noch offen).
- Fremde Texte im vollen Wortlaut und Bilder aus dem Heft liegen nur im Moodle-Paket (`.gitignore`), nicht im öffentlichen Repository.
- Lehrkrafttexte nur verschlüsselt (`lk/*.enc.json`); Klartext in `privat/` und im Claude-Projekt.
- Kein Passwort in einer Datei.
