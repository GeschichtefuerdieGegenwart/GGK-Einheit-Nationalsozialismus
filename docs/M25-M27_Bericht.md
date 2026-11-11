# M25–M27 · Bericht Fassung 1.0

Stand 11.11.2026 · Branch `m25-m27-digital` · Grundlage: Heft „Geschichte aktuell 1“ (PDF, 268 Seiten), M25 (S. 169–177), M26 (S. 178–180), M27 (S. 181–186); Tresor-Notizen „Digitale Didaktik – Prinzipien und Fachgrenzen“, „Erfahrungen aus Erprobungen“ (Stand 09.11.), Sorgfaltsregeln für NS-Themen, Merkseite, Bildrechte; Designsystem „GGK-Labor · Gegenwart“; Skills `lernseite-bauen` v2, `signatur-design` v7, `bewegung-als-lernmittel` v2, `website-design-workflow` v5.

Auftrag: die Grundideen des Hefts beibehalten und in eine digitale Fassung mit Mehrwert überführen. Es gab keinen Musterbuch-Haltepunkt; Gestaltungs- und Einstufungsentscheidungen sind unten als Vorschlag gekennzeichnet.

## Diagnose: Welche Lehren greifen

| Lehre (Tresor) | Umsetzung |
|---|---|
| Standard hybrid: Das Gerät übernimmt, was nur das Gerät kann; lange Texte auf Papier | BND-Text (M26) und Artikel von Sandrisser (M27) bleiben im Heft. Quellen in M25 stärker gekürzt, volle Auszüge im Heft |
| Ruhe-Prinzip: ein Arbeitsfenster je Phase, weniger Klicken | Je Phase eine Seite, Lernweg im Kopf, Quelle und Belege nebeneinander; keine Fenster außer Stimmkarte und Präsentation |
| Erst denken, dann zeigen; eine Frage vor jeder Bewegung | Festlegung vor Quellen (M25), Schätzung vor Zahlen (M26), eigene Orte vor dem Artikel und eine Frage vor der drehbaren Karte (M27) |
| Bild, Zahl, Wort; Modelle heißen Modell | Punktefelder, Vergleichstafel und Weltkarte mit Zahl und Satz daneben und Status „Modell“ |
| Ergebnisse zurück in den Raum; Zusammenführen per QR hat nicht funktioniert | Ein Gerät je Gruppe zeigt den Steckbrief am Beamer (M26); Stimmkarte wird hochgehalten; keine Übertragung |
| Kategorien in die Figur der Frage | Strukturbild M27: Begriffe und Beispiele liegen in der Figur |
| Prüfen, ob eine Übersicht etwas vorwegnimmt | Lösung des Strukturbilds und Zeitleisten erst auf der Zusammenfassung bzw. nach der Festlegung |
| Landkarte in jeder Stunde benennen | M25: Perspektivität, Multiperspektivität · M26: Vom Sachurteil zum Werturteil (2.4.3) · M27: Perspektivität, Standortgebundenheit; Wortlaut aus der Landkarte |
| Lernhilfe, keine Leistungsmessung | Keine Punkte, keine Zähler „richtig“; Raster zur Selbstprüfung erst nach dem eigenen Text |

## Was das Gerät je Stunde leistet (Papierprobe)

| Stunde | Mehrwert in einem Satz | Auf Papier besser |
|---|---|---|
| M25 | Markierungen werden zu geordneten Belegen neben dem Schreibfeld; Fotos erscheinen nur nach Hinweis und eigener Entscheidung; die Wortwahl wird in Ausdruck · Deutung · Urteil sortiert | lange Quellen, Gespräch |
| M26 | Die eigene Schätzung steht neben Gehlens „ein Prozent“ und der Studie; der Steckbrief ist zugleich die Präsentation; die Vergleichstafel entsteht beim Zuhören | BND-Text, Diskussion |
| M27 | Das eigene Bild vom Krieg wird als Karte sichtbar und lässt sich mit dem Artikel vergleichen; die Karte lässt sich drehen; das Strukturbild lässt sich legen, prüfen und umlegen | Artikel, Vorlesen |

## Prüfung (gelaufen)

- `pruef_seiten.py` (website-design-workflow 5a), Startseiten der drei Dateien, Breiten 1440, 1280, 768, 390, 375, je mit und ohne „weniger Bewegung“: 0 Probleme.
- Eigener Rundgang über alle Seiten jeder Stunde (9 + 8 + 9 Seiten) mit Beispielstand, dieselben fünf Breiten × zwei Bewegungseinstellungen: keine Überbreite, keine Konsolenfehler, keine Anfragen an fremde Server (Chromium, `file://`).
- 35 Interaktionstests (Chromium), 35 bestanden: Quellen erst nach Festlegung; Markieren per Klick und Tastatur; Belege aktualisieren sich; Raster ab Wortzahl; Stand nach Neuladen; Fotos nicht ohne Klick, fehlende Dateien → Hinweis; Stimmkarte, Escape; „Eingaben löschen“; Schätzung → Punktefeld; Steckbrief → Präsentation; Vergleichstafel übernimmt Gruppe; Wahl mit Rückmeldung; Marke vom Anfang; eigene Karte und Zählung; Artikelorte; Karte gesperrt vor der Frage, Fokus bleibt im Feld; Drehen, Ansage über `aria-live`; Strukturbild legen, prüfen, korrigieren; Landkarten-Rückmeldung.
- Zusammenfassung als PDF (Chromium, A4), leer und mit Beispielstand: jeweils genau 2 Seiten, in allen drei Stunden.
- Zeitdiagnose bei 150 Wörtern pro Minute, gemessen an den fertigen Seiten: M25 rund 2.700 Wörter (18 Min. Lesen) – **mit sieben Schreibaufträgen fast 100 Minuten, passt nur mit einer Kürzung (K1–K4 im Lehrkraftbereich)**. M26 rund 1.600 Wörter (10 Min.) plus BND-Text 340 Wörter. M27 rund 1.600 Wörter (10 Min.) plus Artikel 970 Wörter; 90 Minuten ohne Puffer, Kurzfassung für 45 Minuten im Lehrkraftbereich.
- Dokument gegen Seite: Speicherschlüssel, Dauern (260/360/440 ms), Musterzahlen in README und diesem Bericht mit dem Code abgeglichen.

## Nicht gelaufen (Nur du kannst das)

Impeccable audit/polish, Taste lint/inspect (Plugins fehlen) · axe-core (nicht installiert) · Kontrast neuer Farbpaare nicht eigens gerechnet (es werden die Tokens von M23 verwendet; neu ist nur das Meerblau der Karte als Fläche ohne Text) · echtes iPad mit Safari hoch und quer, VoiceOver, Zoom 200 % · Beamer und AirPlay im Raum · Moodle-Paket (nicht gebaut) · Erprobung im Unterricht.

## Bewusst nicht übernommen

- Fotos aus Buchenwald (Bourke-White / Getty), Foto des „Vermessens“ (Stadtarchiv Münster), Poster der Upside-down-Karte (interkart.de): nicht im Repository.
- Volltexte von tagesschau.de und welt.de: nicht abgedruckt.
- Zahlen der Infoseite „NS-Kontinuitäten“: nicht auf die Lernseite übernommen (teils prüfbedürftig); die Seite verlinkt nur.
- Kein Erklärfilm, kein Scrollytelling, keine Belohnungsbewegung.

## Vor dem Einsatz prüfen

1. M26: Zahlen und Zitate zum BND stammen aus dem Heft (dort nach tagesschau.de, 10.10.2022). Der Artikel war aus dieser Umgebung nicht abrufbar. Am Original prüfen: Bezug der „10 bis 20 Prozent“, Wortlaut der Zitate von Sälter und Gehlen.
2. M25: Angaben zu Nico Rost (niederländischer Journalist, Tagebuch; Befreiung Dachaus am 29. April 1945) stammen aus dem Gedächtnis des Modells. Geprüft an der Gedenkstätte Buchenwald: 16. April 1945, Befehl Pattons, rund 1.000 Menschen aus Weimar; Schwur am 19. April; 51 000 als damalige Schätzung; Zurückweisung von Schuld durch Vertreter der Stadt.
3. M25: Umfang der Zitate von Rost, Kuby (Hg.), Hillers, Bourke-White auf einer öffentlichen Seite (§ 51 UrhG) – Entscheidung der Lehrkraft; sonst nur im Moodle-Kurs einsetzen.
4. M27: Kurzsätze zu den zwölf Orten gegen den Artikel lesen; 2. September 1945 (Kapitulation Japans) ist ergänzt.
5. Einstufungen in den Landkarten-Momenten und die Sortierung der 18 Wörter (M25) sind Vorschläge.

## Offen

- Rückblick nach der ersten Erprobung: Markieren → Belege (M25), Steckbrief als Präsentation (M26), drehbare Karte und Strukturbild (M27) von „Vorschlag“ auf „erprobt“ oder zurück.
- M24 fehlt im Labor (Lücke zwischen M23 und M25).
- Moodle-Pakete für M25–M27.
