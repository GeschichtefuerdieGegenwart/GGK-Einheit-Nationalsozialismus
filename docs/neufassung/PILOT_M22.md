# Pilot M22 · Arbeitsblatt Geschichte

Stand: 18.11.2026, Abend · Branch `neufassung-arbeitsblatt-geschichte` · **Status: im Bau** (dieser Abschnitt ist der Plan; der Bericht folgt darunter, sobald gebaut und geprüft ist)

## 1 · Was vorliegt (gelesen am 18.11.2026)

- **Heft, M22 (Seiten 153–154 der PDF):** nur ein Infoblatt, keine Arbeitsaufträge. Die Aufträge der Stunde stammen aus der Seite, die Mario seit dem 08.11. geformt hat (Fassung 4.1 vom 16.11.2026).
- **Seite M22, Fassung 4.1:** zehn Aufträge (1–8, L, Z), 90 Minuten, Register links, ein Auftrag je Seite, Freigabe offen · auf Ansage · nach deiner Antwort, Schreibauftrag wie in der Klassenarbeit, Zusammenfassung auf zwei Seiten, Speicher `ggk-m22-taeter:v3` (M23 liest ihn).
- **Gemessen an der Fassung 4.1 (1180 × 820, voller Beispielstand):** je Auftrag 42 bis 73 Texte unter 16 px (Register 12,5 px, Blattzeile 12,8 px, Nachweise 13,6 px; in der Übersicht von Auftrag 4 bis hinunter zu 8,9 px) · Nachweis-Links nur 17 px hoch · Akzent Rot `#9B402D` an 28 Stellen, dazu im Zeichen oben links.

## 2 · Diagnose

| Frage | Befund |
| --- | --- |
| Folgt die Seite Marios Material? | Ja. Reihenfolge, Inhalte und Interaktionen bleiben. Kein Baustein wird dazuerfunden. |
| Lücke kognitive Landkarte? | Nein: Auftrag L (Perspektivität 2.1.2, Folgerung Kontroversität 2.1.9), dazu Triftigkeit an Goldhagen. |
| Lücke narrative Kompetenz? | Nein: Auftrag 7 verlangt eine Erklärung im Format der Klassenarbeit (Aufgabe C2 der Klassenarbeit Nr. 2). |
| Zeit | 90 Minuten geplant, nicht erprobt. Kein Auftrag ist Hausaufgabe. In den Hinweisen für die Lehrkraft standen noch drei Hausaufgaben-Varianten (K5, K8, Abrufübung) – die werden umformuliert. |
| Was fehlt zum Standard? | Farbwelt Archiv (kein Rot) · Blattkopf mit Platz im Hefter · Deckblatt mit Titelbild und Ablauf · 16-Pixel-Grenze · Stand als Datei · Hefter als Startdatei · Lehrkrafttext und erwartete Inhalte raus aus dem Blatt · Pakete. |

**Lehren aus anderen Fächern, die hier greifen** (Tresor: »Digitale Didaktik – Prinzipien und Fachgrenzen«, »Erfahrungen aus Erprobungen«):
Ergebnisse überleben den Gerätewechsel nur als Datei (Politik-Werkstatt, 08.11.) · Lehrkraftbereich von Anfang an getrennt (GGK, PR 25) · eine Übersicht darf nicht vorab zeigen, was die Aufgabe abfragt (M22 2.0) · Paket nicht nur aus `media/` bauen, sondern alle Pfade einsammeln (M22, 08.11.).
**Wo sie in Geschichte brechen:** Rückmeldung »richtig/falsch« gibt es beim Gewichten nicht – das Modell ist eine Setzung der Lehrkraft und so beschriftet.

## 3 · Plan

1. **Gemeinsame Schicht** `src/arbeitsblatt/` (`ab.css`, `ab.js`), eingesetzt mit `tools/ab_einsetzen.py`: Farbwelten, Kopf mit Reiter, Register, Blatt, Deckblatt, Linien, Werkzeuge (Stand als Datei sichern und laden, Ansicht Beamer), Druck. Dieselben Klassennamen wie in den Kernen der anderen Stunden, damit die Übertragung nur noch einsetzt.
2. **M22, Fassung 5.0:** Inhalte, Reihenfolge, Interaktionen und Speicher bleiben. Neu: Farbwelt Archiv (Rot entfällt; Ebene »Weltbild« bekommt eine eigene Kennfarbe), Kopf und Blattkopf mit »Blatt 7 von 11«, Deckblatt mit Titelbild (Tafel im Wald bei Józefów, CC BY-SA 4.0) und Ablauf, Schreibfelder mit Linien, nichts unter 16 px, Seite »Am Beamer« (Freigabe, Moderation, Tischmodelle – ohne Lösungen), freiwillige Extra-Aufgabe als Vorschlag.
3. **Lehrkraft getrennt:** Erwartete Inhalte des Schreibauftrags wandern in den Text der Lehrkraft. Im Paket für Lernende fehlen Schloss und verschlüsselter Text ganz.
4. **Hefter Nationalsozialismus** als Startdatei: elf Blätter in der Reihenfolge des Hefts, Stand je Blatt, Lernspur; zeigt nur Bearbeitetes.
5. **Pakete** mit `tools/bau_einheit_paket.py`: Lernende · Lehrkraft, je mit Anleitung für Moodle; entpackt per `file://` geprüft.
6. **Prüfen:** iPad quer und hoch, Beamer 1280 × 720, Telefon, Druck A4, Kontrast, Ziele, fremde Anfragen, Stand als Datei, Paket.
