# Arbeitsstand · Blatt-Standard für alle Module und Kapitel Weimarer Republik

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
| 2 | Weimarer Republik: Heft M1–M15 als Arbeitsblätter (`src/weimar/`) | offen |
| 3 | Startseite: Kapitel Weimar mit allen Modulen; erste Moodle-ZIP | offen |
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
