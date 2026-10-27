# M23 · Die Gesellschaft, in der ich leb(t)e? – Bericht zur Fassung 1.1

Stand: 27.10.2026 (1.1: Film und induktiver Weg) · Datei `m23-die-gesellschaft.html` · Branch `m23-gesellschaft` · Skill-Kette: unterricht-digitalisieren → lernseite-bauen → bewegung-als-lernmittel → (signatur-design: nicht nötig, Projekt-System vorhanden) → schaubild-design (nur Säulen-Raster als statisches Modell) → website-design-workflow → digital-check.

## Grundlage

Unterrichtsheft „Geschichte aktuell 1“, M23: Karte „Ermordete Juden nach Land“, M23.1 Ländervergleich, Video „Voices in the Void“ (Bent Melchior), sechs Säulen mit Kernfragen, Ländertabelle, „niedrigste/höchste Opferraten“, Position A (kultureller Determinismus) / B (radikaler Individualismus), Erwartungshorizont.

1. **Lernproblem:** Die Täterforschung (M22) endet ohne Tätertyp. Der Ländervergleich liefert die Gegenprobe – mit der Gefahr, dass Lernende Opferraten als Moral-Ranking lesen („gute Dänen“).
2. **Denkhandlung:** vorhersagen (Karte), aus dem Film **induktiv Faktoren gewinnen**, einen Verlauf erkennen (Dänemark August–Oktober 1943), die eigene Liste mit dem Modell abgleichen und belegte Fakten zuordnen (Säulen), eine **These bilden und an drei Ländern testen**, sich positionieren mit Bezug zur eigenen M22-Position.
3. **Mehrwert in einem Satz:** Die Seite deckt die Zahlen erst nach der Vorhersage auf, lässt die Person selbst durch die sechs Wochen ziehen, erklärt zu jeder angebotenen Säule, wie gut sie passt, und legt die eigene M22-Marke neben die neue Position – Papier kann das nicht.
4. **Erfolg:** vier Sätze zur Position mit einem Land und einer Säule als Beleg.

## Umfang und Papierprobe

Durchgängig (Variante B). Plenum bei 80–90 analog.

| Min. | Phase | Papierprobe |
| --- | --- | --- |
| 0–8 | Die Karte | Zahlen erst nach Festlegung; Balken wachsen → Lernmehrwert |
| 8–38 | Der Film | Film am Beamer (18 Min.), Beobachtungsauftrag, sechs eigene Faktoren; Zeitleiste und Schieber: Verlauf und Tempo → hybrid (Faktoren gingen auf Papier, werden aber digital am Modell geprüft) |
| 38–55 | Sechs Säulen | eigene Faktoren am Modell (leere Säulen, „passt nirgends“), Erklärung je Säule erst nach Festlegung, These → Lernmehrwert |
| 55–72 | Thesen testen | These über den Ländern, Test-Satz, Lehrkraft-Fassung erst nach eigenen Sätzen → Lernmehrwert |
| 72–84 | Position | Marke aus M22 nur am Gerät → Lernmehrwert |
| 84–90 | Plenum | analog |

**Fassung 1.1 (27.10.2026):** Auf Wunsch der Lehrkraft induktiv: Film „Voices in the Void“ zuerst (lokale Kopie `media/m23-voices-in-the-void-2021.mp4`, 720p, 82 MB, **nur im Unterrichtspaket** – Rechte Humanity in Action; im Repository fehlt sie, die Seite bietet dann YouTube erst nach Klick über youtube-nocookie an), Beobachtungsauftrag mit fünf Fragen, bis zu sechs eigene Faktoren (mindestens drei), Abgleich am Modell per Auswahl je Faktor (Säule oder „passt nirgends“), These als Satz, Test an Niederlande/Bulgarien/Ungarn mit Test-Satz. Melchior-Textkarten entfallen (bleiben als Reserve im Code). Speicherschlüssel jetzt `ggk-m23-gesellschaft:v2`.

## Interaktionsmuster (Katalog `lernseite-bauen`)

- **1 Vorhersage → Auflösung:** vier Länder, Begründung (≥ 8 Zeichen), dann Balken (USHMM) und Frage-Feld.
- **3 Zuordnen mit Begründung:** sechs Dänemark-Fakten, drei Länder; je Fakt drei Säulen mit Erklärung zentral · auch begründbar · passt kaum. Keine Zuordnung ist „falsch“; die Stufe sagt, wie viel sie erklärt. Weiter ab 3 von 6 (plus These) bzw. 2 von 3. Davor die offene Variante: eigene Faktoren einer Säule zuordnen, ohne Wertung – der Abgleich zeigt leere Säulen.
- **10 Satzanfänge → Kriterienraster:** Urteil, Raster ab 40 Wörtern (Grundlegend · Sicher · Souverän).
- **Skala mit Bezugsmarke** (Gegenwart): Umwelt ↔ Ich; Marke = `pos` aus `ggk-m22-taeter:v2`, wenn auf dem Gerät vorhanden. Richtung bewusst gegenläufig zu M22 (dort Person ↔ Umstände); Hinweis auf der Seite.
- Abrufübung (2 Fragen, Muster 2) in der Zusammenfassung.

## Bewegung als Lernmittel (Skill `bewegung-als-lernmittel`)

Zwei Formen, beide mit Frage davor:

| Form | Baustein | Warum | Reglerweg / Dauer |
| --- | --- | --- | --- |
| Ziehen | `zeit` (Zeitleiste „Du bist hier“) | Der Verlauf April 1940 → Oktober 1943 ist der Lerngegenstand: Wann fiel der Schutz weg, wann kam die Warnung? | 6 Stationen; FLIP 440 ms |
| Vorher–nachher | `schieber` mit `data-autoplay`, `data-dauer="4"` | Veränderung erkennen: ≈ 7.500 ohne Stern → ≈ 7.200 in Schweden in sechs Wochen | 0–100, step any; Autoplay ein Durchlauf (4 s), dann Stand |

Autoplay-Bedingungen: startet erst im Blick (IntersectionObserver auf der Bühne), hält außer Sicht an, **pendelt höchstens einmal** (eigene Ergänzung `schieberEinmal()`, das Bundle pendelt sonst endlos), jede Berührung übernimmt (Regler, Finger, Tastatur), bei „weniger Bewegung“ nie. Zahl und Wort stehen neben der Bühne (`role="img"` mit `aria-label`, Stand-Text, `aria-live`). Gegenprobe: Eine statische Grafik mit zwei Zuständen zeigt die Zahlen, aber nicht, wie wenig Zeit dazwischen lag.

Nicht gebaut: Zeitstrahl Ungarn 1944 (keine belegten Tageszahlen), Simulation, Geste.

### Zustandskarten

**Schieber:** Ruhe (Griff rechts, August sichtbar, Knopf „Hin und her“) · Autoplay läuft (Knopf „Anhalten“, `aria-pressed=true`) · gezogen (Finger/Regler, Autoplay aus) · Ende (Griff links, Oktober sichtbar, Knopf „Hin und her“) · weniger Bewegung (kein Autoplay, Ziehen und Tastatur unverändert).

**Wahl (Säule):** offen (keine Option, Festlegen gesperrt) · gewählt ohne Begründung (gesperrt) · gewählt mit Begründung (Festlegen frei) · festgelegt (`data-zu`, Optionen gesperrt, Urteile je Säule sichtbar, Stempel, „Noch einmal“) · nach Neuladen (festgelegt ohne Bewegung).

**Skala:** Regler frei · Marke eingeblendet (Knopf gesperrt, Text „M22, Täter: eher …“) · ohne M22 (Hinweis statt Knopf).

## Gegenwart-Probe

Erste Stunde, die das Bundle von „Gegenwart“ (`assets/gegenwart/bundle.css`, `bundle.js`) nutzt. Alle Gegenwart-Tokens (`--grund`, `--petrol`, `--honig`, `--font-text`, `--dauer-*`, `--kurve-*` …) sind in `:root` auf die GGK-Labor-Farben und -Schriften gesetzt; Wortmarke (Boot-Zeichen in der Reihe Akte/Weichen/Brief), Kopf, Lernweg, Bänder und Karten bleiben GGK. Der Schalter „Weniger Bewegung“ setzt `html.ruhig` **und** `html[data-bewegung=weniger]`, damit beide Systeme ruhig werden.

Erfahrungen: Der Baustein `wahl` lässt eine leere Begründung durch (`data-mind` greift nur bei angefangenem Text) → eigene `pruefeWahl()`. Der Baustein speichert nichts → Stand in `S` und Wiederherstellung von `data-zu` vor `Gegenwart.init`. Der Stand-Text des Schiebers nennt die Prozente seitenverkehrt → eigener Stand-Text. Range mit `step=1` bleibt beim Scrub auf 0 → `step="any"`. `Gegenwart.staffel` bewegt nur acht Elemente → Balken mit eigener Staffelung (11 Zeilen).

## Zeitdiagnose (150 Wörter pro Minute)

Karte 229 Wörter (1,5 Min.) · Film-Seite rund 450 (3) + 18 Min. Film · Säulen rund 850 (5,7) · Länder rund 680 (4,5) · Position 363 (2,4) · Plenum 120. Lesen gesamt rund 18 Minuten, Film 18, dazu 1 Vorhersage, 6 Faktoren, 6 Auswahlen, 9 Zuordnungen mit Begründung, These, Test, 2 Sätze, Regler, 4 Sätze. **Straff:** 90 Minuten – mit dem Film ist die Stunde voll. Kürzung K1: nur drei der sechs belegten Fakten (4 Min.). K2: Bulgarien weglassen (4 Min.). K3: Urteil als Hausaufgabe (6 Min.).

## Was gegenüber dem Heft korrigiert ist

Siehe Lehrkraft-Ansicht: Opferraten aus USHMM-Zahlen (Belgien ≈ 27 % statt 40 %, Norwegen ≈ 42 % statt 35 %, Frankreich ≈ 23 %); „11 Millionen“ weggelassen; 470 statt 472 Deportierte; Bulgarien mit beiden Seiten (Kernland/besetzte Gebiete); Ungarn in den Grenzen von 1941; keine externen Links in der Arbeitsphase; die 67 KI-Quellen nicht übernommen.

## Prüfung

**Gelaufen (Cloud, Chromium):**
- Playwright-Durchlauf (`scratchpad/m23/t23.py`): Vorhersage gesperrt bis Wahl + Satz, Balken, Zeitleiste per Klick (Text und „Du bist hier“), Autoplay startet im Blick und steht nach einem Durchlauf, Tastatur am Regler (End → 0 % Oktober), neun Wahlen mit gesperrtem Festlegen ohne Begründung, Urteile sichtbar, Stand nach Neuladen, „Noch einmal“, Weiter-Sperren (4/6, 2/3), Lehrkraft-Fassung erst nach zwei Sätzen, Skala ohne/mit M22-Marke (72 → „eher Umstände“), Raster ab 40 Wörtern, Abrufübung, „weniger Bewegung“ ohne Autoplay, „Eingaben löschen“. 0 Skriptfehler, 0 Konsolenfehler, 0 fehlende Dateien.
- Mindestprüfung `pruef_seiten.py`: 5 Breiten × mit/ohne „weniger Bewegung“: 0 Probleme, kein waagerechtes Scrollen.
- Druck: Zusammenfassung = 2 Seiten A4 (auch mit langen Eingaben).
- Bildschirmfotos angesehen (Start, Karte, Dänemark, Säulen, Länder, Position, Plenum, Zusammenfassung, Lehrkraft; 390 px; Beamer 1280 × 720).
- Quellen geprüft: USHMM (Rescue in Denmark, Netherlands, Bulgaria, Hungary, Jewish Losses by Country), Bischofsbrief 3.10.1943 (Wikipedia/Fuglsang-Damgaard), Commons-Lizenz des Fotos.

**Nicht gelaufen:** axe-core (npm nicht erreichbar), echtes iPad/Safari, VoiceOver, Moodle-Upload, Beamer im Raum. Die lokale Videowiedergabe ließ sich im Cloud-Chromium nicht prüfen (kein H.264); die Datei ist mit ffprobe geprüft (H.264/AAC, faststart), der Ersatzweg (YouTube nach Klick) ist getestet.

## Offen

- Beobachtungsbogen nach dem ersten Einsatz (auf der Lehrkraft-Seite).
- Rückblick nach zwei bis drei Wochen: Hat der Schieber geholfen, das Tempo zu verstehen? Sonst ruhige Fassung ohne Autoplay.
- Zweite Lesestufe für die Länderkarten.
- Ob die M22-Marke gespiegelt werden soll (`data-referenz` = 100 − pos).
