# M21 · Es geht um Menschen – Bericht zur Fassung 1.0

Stand: 26.10.2026 · Datei `m21-es-geht-um-menschen.html` · Branch `m21-es-geht-um-menschen`

## Grundlage

Unterrichtsheft „Geschichte aktuell 1“, M21 (Public History, letzter Brief Zalman Levinson, Shoa/Holocaust, vier Biografien mit Phasen-Matrix, Infomaterial Zahlen/Phasen/Lagertypen). Die vier Fragen vor dem Bauen:

1. **Lernproblem:** Sechs Millionen bleibt abstrakt; Lernende vermischen Ghetto, KZ und Vernichtungslager und urteilen im Rückblick („man hätte doch merken müssen“).
2. **Denkhandlung:** festlegen und aufdecken (Brief, Wort, Zahlen), in eigenen Worten zusammenfassen (Stationen), vergleichen und begründen (Matrix, Lager), beurteilen mit Rückschau (Das wird ernst), erklären (fünf Sätze).
3. **Mehrwert in einem Satz:** Die Seite deckt erst nach der eigenen Festlegung auf, legt die eigene Zeile neben die der Lehrkraft und zählt die Klasse an der Tafel – Papier kann das nicht.
4. **Erfolg:** fünf Sätze über einen Lebensweg mit Begriff je Phase und begründetem Wort.

## Umfang und Papierprobe

Durchgängig (Variante B), weil Festlegung → Auflösung, eigene Zeile neben Lehrkraft-Zeile, Schätzen vor der Zahl und Erklärung je Option den Kern tragen. Zwei Plenumsphasen mit iPad zu.

| Min. | Phase | Papierprobe |
| --- | --- | --- |
| 0–8 | Der Brief | aufdecken erst nach Festlegung → Lernmehrwert |
| 8–16 | Das Wort | Erklärkarten erst nach eigener Wahl; Abruf mit Erklärung → Lernmehrwert |
| 16–44 | Vier Menschen | Kartenstapel mit Stichworten je Station, Rückmeldung je Station → Lernmehrwert (auf Papier nur Verteilen) |
| 44–58 | Die Matrix | eigene Zeile blau neben drei fremden; gestufte Erklärung → Lernmehrwert |
| 58–72 | Die Zahl | Schätzen vor der Auflösung, Zuordnung mit Erklärung → Lernmehrwert |
| 72–84 | Plenum | Gespräch bleibt analog; Tafel am Beamer nur als Zählhilfe → hybrid |
| 84–90 | Rückblick | Vergleich mit dem Anfang, Raster erst nach dem Text → Lernmehrwert |

## Interaktionsmuster (Katalog `lernseite-bauen`)

- **1 Festlegung → Auflösung:** Brief (Satz, dann „Was wurde aus der Familie“), Wort (Wahl + Begründung vor den Erklärkarten), Zahl (zwei Regler vor den USHMM-Spannen).
- **2 Einfachwahl mit Erklärung je Option:** Abruf M18/M20, „Das wird ernst“ (Erklärung je Station: was damals wissbar war – keine „richtige“ Station), drei Vergleichsfragen, vier Lagertypen, Abrufübung. Stufen: trifft · auch begründbar · passt kaum.
- **10 Satzanfänge → Kriterienraster:** fünf Sätze, Raster Grundlegend · Sicher · Souverän ab 40 Wörtern.
- Dazu Stimmkarte (groß am Gerät) und Tafel am Beamer (Zählung durch die Lehrkraft).

Bewegung nur in drei Rollen: Rückmeldung (Erklärung erscheint, 220 ms), Zustandswechsel (Aufdecken 360 ms, Bildband 650 ms einmal je Abschnitt), Übergang (Kartenstapel, Scroll-Snap). Schalter „Weniger Bewegung“ auf jeder Seite; Systemeinstellung wird beachtet. Keine Belohnung.

## Zeitdiagnose (150 Wörter pro Minute)

Brief 361 Wörter (2,4 Min.) · Wort 436 (2,9) · ein Lebensweg 386–435 (2,6–2,9) + Seite 749 (5,0) · Matrix 521 (3,5) · Zahl 627 (4,2) · Plenum 227 · Rückblick 147. Lesen gesamt rund 20 Minuten, dazu 2 Sätze, 4 Stichwortfelder, 1 Entscheidung, 11 Einfachwahlen, 2 Regler, 5 Sätze. **Straff:** etwa 80 Minuten. **Mit Puffer:** 90 Minuten; die fünf Sätze können als Hausaufgabe enden. Kürzung K1: Abruffragen weglassen (3 Min.). K2: Lagertypen nur zwei (2 Min.).

## Was gegenüber dem Heft korrigiert ist

Siehe Lehrkraft-Ansicht auf der Seite (Marie Nedvědová überlebte; Willner-Daten nach Joods Monument; „11 Millionen“ nicht belegt; Lagerzahlen nach USHMM; Warschauer Ghetto über 400.000 auf etwa 3,4 km²; Piotr London ohne Beruf).

## Prüfung

**Gelaufen (Cloud, Chromium):**
- Playwright-Durchlauf aller Seiten mit Eingaben (`scratchpad/m21/t21.py`): Aufdecken erst nach Satz, Wort erst nach Begründung, Matrix erst nach einem Weg, Pfeiltasten im Stapel, Vergleich mit „Noch einmal wählen“, Schätzen, Lager, Stimmkarte, Tafel zählt, Raster ab 40 Wörtern, Zusammenfassung, Lehrkraft. Stand bleibt nach Neuladen, „Eingaben löschen“ setzt zurück. 0 Skriptfehler, 0 Konsolenfehler, 0 fehlende Dateien.
- Mindestprüfung `pruef_seiten.py`: 5 Breiten (1440, 1280, 768, 390, 375) × mit/ohne „weniger Bewegung“, hell: 0 Probleme, kein waagerechtes Scrollen.
- Druck: Zusammenfassung = genau 2 Seiten A4 (Chromium-PDF, 12/13 mm Rand).
- Bildschirmfotos angesehen (Start, Brief, Wort, Vier Menschen, Matrix, Zahl, Stimmkarte, Tafel 1280 × 720, Rückblick, Zusammenfassung, Lehrkraft; 390 px).
- Quellen am Original geprüft: Yad Vashem (Levinson, Kiew), romatestimonies.org (Nedvědová), Joods Monument (Willner, Muller), USHMM (Korczak, Numbers of Victims, Roma), holocaust.cz (Transporte 1943), Wikimedia Commons (Lizenzen der fünf Gedenkort-Fotos).

**Nicht gelaufen:** axe-core (npm nicht erreichbar), Impeccable/Taste (Plugins fehlen), echtes iPad/Safari, VoiceOver, Moodle-Upload, Beamer im Raum.

## Bewusst nicht übernommen

- Die 103 KI-Quellen des Hefts; die Phase „Ausgrenzung“ für die Familie in Kiew als Jahre (es waren Wochen); das Heft-Foto „Jezová, 1967“ für Marie; die Zahl „11 Millionen“; Majdanek in der Lagertabelle (ältere Zahlen 130.000–360.000 sind überholt, neuere etwa 78.000 – hier weggelassen statt unsicher).
- Public-History-Teil des Hefts (Serie „Holocaust“) nur als Kasten auf der Wort-Seite, nicht als eigene Aufgabe.

## Offen

- Beobachtungsbogen nach dem ersten Einsatz.
- Zweite Lesestufe je Station (nur „Mehr dazu“ als Aufklapper vorhanden).
- Kursbild der „Das wird ernst“-Verteilung per QR (wie M18) – vorerst Tafelzählung.
