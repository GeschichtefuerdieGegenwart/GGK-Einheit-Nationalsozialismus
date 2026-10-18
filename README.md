# GGK-Labor

Interaktive Quellen-Labore für Geschichte (GGK) am beruflichen Gymnasium – gebaut nach dem Orientierungsmodell „Lernwirksame digitale Lernumgebungen“ und mit derselben Technik wie das [Psycho-Labor](https://github.com/GeschichtefuerdieGegenwart/psycho-labor).

**Für Schüler\*innen:** https://geschichtefuerdiegegenwart.github.io/GGK-Einheit-Nationalsozialismus/

| Datei | Inhalt |
| --- | --- |
| `index.html` | Übersicht aller Bausteine |
| `ns-ideologie.html` | M18 · Die fünf Säulen der NS-Ideologie (eine Datei, aus `src/` erzeugt) |
| `appeasement.html` | M19 · Appeasement-Politik – der Weg zum Frieden oder in den Zweiten Weltkrieg? (iPad-Fassung nach der Print-Stunde; drei Entscheidungen in je sieben Schritten; `?ansicht=lehrkraft` öffnet den verschlüsselten Lehrkraftbereich) |
| `m20-dilemmata.html` | M20 · Großbritannien im Zweiten Weltkrieg – drei Dilemmata (Mai 1940, Juli 1941, Februar 1944), durchgängige iPad-Fassung mit geprüften Quellen; `?ansicht=lehrkraft` öffnet den verschlüsselten Lehrkraftbereich (`lk/m20-lehrkraft.enc.json`). Karten: `tools/karten_m20.py` → `assets/karten-m20.js` (CShapes 2.0, CC BY-NC-SA 4.0) |
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

**Lehrkraftbereich M19:** `lk/m19-lehrkraft.enc.json` ist mit AES-GCM verschlüsselt (Schlüssel per PBKDF2 aus dem Passwort). Der Klartext liegt nicht im Repository (`privat/` steht in `.gitignore`). Neu verschlüsseln: `tools/lk-verschluesseln.html` im Browser öffnen oder `LK_PASS='…' node tools/lk-verschluesseln.mjs`. Grenzen: Wer das Passwort kennt, kann es weitergeben; ein Widerruf ist nur durch Neuverschlüsselung möglich. Ältere Fassungen im Git-Verlauf enthalten die früheren Hinweise im Klartext. Eingaben bleiben im Browser des iPads (localStorage). Der QR-Code enthält nur Zahlen; die Daten stehen im Anker der Adresse und werden nicht an den Server übertragen.

## Bilder und Lizenzen

- Boykott jüdischer Geschäfte, Berlin, 1.4.1933: Bundesarchiv, Bild 102-14468, Foto: Georg Pahl, CC BY-SA 3.0 DE (via Wikimedia Commons), in Graustufen verkleinert.
- Schaubilder und Logo: selbst gezeichnet (SVG).
- QR-Code-Erzeugung: Kazuhiko Arase, MIT-Lizenz.
- Schriften: Fraunces (Undercase Type) und Atkinson Hyperlegible (Braille Institute), beide SIL Open Font License 1.1 – Lizenztexte in `assets/fonts/`.
- Appeasement: Foto „Digging In“, 27.9.1938, Reg Sayers / Daily Herald Archive, Science Museum Group Collection 1983-5236/10691 (nicht-kommerziell, Bedingungen prüfen); Originalton Chamberlain, Heston, 30.9.1938, Wikimedia Commons (dort gemeinfrei); Zitate aus Hansard (Open Parliament Licence).
