# GGK-Labor

Interaktive Quellen-Labore für Geschichte (GGK) am beruflichen Gymnasium – gebaut nach dem Orientierungsmodell „Lernwirksame digitale Lernumgebungen“ und mit derselben Technik wie das [Psycho-Labor](https://github.com/GeschichtefuerdieGegenwart/psycho-labor).

**Für Schüler\*innen:** https://geschichtefuerdiegegenwart.github.io/GGK-Einheit-Nationalsozialismus/

| Datei | Inhalt |
| --- | --- |
| `index.html` | Übersicht aller Bausteine |
| `ns-ideologie.html` | M18 · Die fünf Säulen der NS-Ideologie (eine Datei, aus `src/` erzeugt) |
| `appeasement.html` | M19 · Appeasement-Politik – der Weg zum Frieden oder in den Zweiten Weltkrieg? (iPad-Fassung nach der Print-Stunde; `?ansicht=lehrkraft` zeigt Ablauf, Codewörter, Tafelbild) |
| `docs/M19_Faktensicherung.pdf` | Faktensicherung M19, 2 Seiten (Quelle: `src/m19-faktensicherung.html`) |
| `auswertung.html` | Kursbild für die Lehrkraft (QR-Codes scannen) |
| `lehrkraft.html` | Diagnose, Entscheidung, Stundenablauf, Quellenprüfung |
| `assets/` | gemeinsames Design und Werkzeuge, Schaubilder, Foto |
| `docs/M18_*.pdf` | Lernmappe, Lösungskarte und Hinweise zu M18 (früher als M19 nummeriert) |
| `docs/Prompt_NS-Ideologie.md` | Prompt für die Überarbeitung |

Druckvorlagen: `ns-ideologie.html?druck=leer`, `?druck=beispiel`, `?druck=loesung`.

Bauen: `node tools/inline.js src/ns-ideologie.html` bettet CSS, Skripte und das Foto in eine einzige Datei ein.

## Datenschutz

Keine externen Skripte oder Tracking. Schriften liegen lokal in `assets/fonts/`. Ausnahme in `appeasement.html`: Das Foto und der Originalton werden von der Science Museum Group bzw. Wikimedia Commons nachgeladen; liegen die Dateien in `media/`, wird nichts extern geladen. Eingaben bleiben im Browser des iPads (localStorage). Der QR-Code enthält nur Zahlen; die Daten stehen im Anker der Adresse und werden nicht an den Server übertragen.

## Bilder und Lizenzen

- Boykott jüdischer Geschäfte, Berlin, 1.4.1933: Bundesarchiv, Bild 102-14468, Foto: Georg Pahl, CC BY-SA 3.0 DE (via Wikimedia Commons), in Graustufen verkleinert.
- Schaubilder und Logo: selbst gezeichnet (SVG).
- QR-Code-Erzeugung: Kazuhiko Arase, MIT-Lizenz.
- Schriften: Fraunces (Undercase Type) und Atkinson Hyperlegible (Braille Institute), beide SIL Open Font License 1.1 – Lizenztexte in `assets/fonts/`.
- Appeasement: Foto „Digging In“, 27.9.1938, Reg Sayers / Daily Herald Archive, Science Museum Group Collection 1983-5236/10691 (nicht-kommerziell, Bedingungen prüfen); Originalton Chamberlain, Heston, 30.9.1938, Wikimedia Commons (dort gemeinfrei); Zitate aus Hansard (Open Parliament Licence).
