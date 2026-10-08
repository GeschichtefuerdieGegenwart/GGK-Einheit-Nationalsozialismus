# GGK-Labor

Interaktive Quellen-Labore für Geschichte (GGK) am beruflichen Gymnasium – gebaut nach dem Orientierungsmodell „Lernwirksame digitale Lernumgebungen“ und mit derselben Technik wie das [Psycho-Labor](https://github.com/GeschichtefuerdieGegenwart/psycho-labor).

**Für Schüler\*innen:** https://geschichtefuerdiegegenwart.github.io/ggk-labor/

| Datei | Inhalt |
| --- | --- |
| `index.html` | Übersicht aller Bausteine |
| `ns-ideologie.html` | M19 · Die fünf Säulen der NS-Ideologie (eine Datei, aus `src/` erzeugt) |
| `auswertung.html` | Kursbild für die Lehrkraft (QR-Codes scannen) |
| `lehrkraft.html` | Diagnose, Entscheidung, Stundenablauf, Quellenprüfung |
| `assets/` | gemeinsames Design und Werkzeuge, Schaubilder, Foto |
| `docs/Prompt_NS-Ideologie.md` | Prompt für die Überarbeitung |

Druckvorlagen: `ns-ideologie.html?druck=leer`, `?druck=beispiel`, `?druck=loesung`.

Bauen: `node tools/inline.js src/ns-ideologie.html` bettet CSS, Skripte und das Foto in eine einzige Datei ein.

## Datenschutz

Keine externen Skripte, Schriften oder Tracking. Eingaben bleiben im Browser des iPads (localStorage). Der QR-Code enthält nur Zahlen; die Daten stehen im Anker der Adresse und werden nicht an den Server übertragen.

## Bilder und Lizenzen

- Boykott jüdischer Geschäfte, Berlin, 1.4.1933: Bundesarchiv, Bild 102-14468, Foto: Georg Pahl, CC BY-SA 3.0 DE (via Wikimedia Commons), in Graustufen verkleinert.
- Schaubilder und Logo: selbst gezeichnet (SVG).
- QR-Code-Erzeugung: Kazuhiko Arase, MIT-Lizenz.
