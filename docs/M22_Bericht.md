# M22 · Bericht Fassung 3.0 – Dashboard und Landkarten-Moment

Stand 08.11.2026 · Branch `m22-dashboard-landkarte` · Grundlage: Fassung 2.0 (PR #5–#8), Prompt „M22 Dashboard statt Klickstrecke, Landkarten-Moment“ (Fassung 2), Musterbuch Haltepunkt 2 (Artefakte „Musterbuch M22 Dashboard“ und „AM 2“), Auswahl der Lehrkraft: AM 2 (Rad mit ganzem Satz im Feld) + AP + AQ + AR b) + AT + AU; AN nicht, AO nur als Ansicht „Vergleich“, AS nicht (Streitpaare bleiben auf dem Marktplatz).

## Was neu ist

| Stelle | Vorher (2.0) | Jetzt (3.0) |
|---|---|---|
| Phase 4 | Sechs Akten als Kartenliste; gewählte Akte öffnet unterhalb („Deckel“), Seite bis 6 Bildschirme | Dashboard: Frage im Zentrum, Rad der fünf Ebenen (jedes Feld mit Satz), sechs Erklärungen in zwei Spalten; Seitenpanel öffnet gegenüber der Karte; passt bei 1280 × 720 ohne Scrollen |
| Ebene der Akte | auf der Karte und im Deckel vorab sichtbar | erst nach dem Gewichtungs-Check (Karte, Panel, Linien, Marken im Rad) |
| Ansichten | – | Frage und Ebenen · Vergleich · Zeitachse, View Transitions 320 ms, Rückfall sofort; Filter über die Felder, nur für geprüfte Erklärungen |
| Fortschritt | „✓ Erklärungskarte geschrieben“ | gelesen · Karte · geprüft auf jeder Karte; Regelsatz; Empfehlung für die zweite Erklärung als Marke auf der Karte (statt Verweis auf den Marktplatz) |
| Phase 5 (neu) | – | Landkarten-Moment: vermuten → Landkarte 2.1 → Prinzip (9 Felder, Wortlaut und Anker aus der Landkarte) → Begründung → Rückmeldung zentral · auch begründbar · passt kaum → Kasten Triftigkeit (Goldhagen) |
| Zusammenfassung | 5 Abschnitte | Rad-Schaubild (Modell), Kasten „Landkarte: Perspektivität“ (Wortlaut der Landkarte), Aufgabe 4b mit Landkarten-Auftrag und Rasterzeile, Landkarten-Ergebnis in „Mein Weg“; weiterhin genau 2 Seiten A4 |
| Zeitplan | 10 · 10 · 12 · 23 · 15 · 12 · 8 | 10 · 9 · 9 · 22 · **8** · 17 · 10 · 5 (Runden à 5 Min., Diskussion 3+3+2+2); Kürzungen K1–K7 |
| Speicher | `ggk-m22-taeter:v2` | `:v3`, Übernahme aus v2; M23 liest v3, ersatzweise v2 |

Bewegung (signatur-design v7, bewegung-als-lernmittel v2): Panel `übergang 320 ms`, schließt `exit 150 ms`; Linien `reveal 360 ms`, Staffel 30 ms, höchstens 5 (One Moment Rule: der einzige große Moment der Übersicht); Marken und Stand `fast 150 ms`; Ansichtswechsel View Transitions 320 ms. Visible-at-Rest: nichts startet bei `opacity: 0`; Reader-Paced: nichts bewegt sich ohne Tippen; keine Belohnungsbewegung (Linien erscheinen bei jeder Gewichtung gleich). Grow-in-Place bewusst nicht: Das Panel gleitet, damit die Übersicht sichtbar bleibt.

## Prüfung (gelaufen)

- `pruef_seiten.py` (website-design-workflow 5a): Breiten 1440, 1280, 768, 390, 375, je mit und ohne „weniger Bewegung“: 0 Probleme (Startseite).
- Eigene Prüfung je Breite und Bewegungseinstellung auf den Seiten Erklärungen (Übersicht und Panel offen), Landkarte, Marktplatz, Zusammenfassung, Lehrkräfte: keine Überbreite, keine Konsolenfehler, keine Anfragen an fremde Server (Chromium, `file://`).
- Beamer 1280 × 720: Übersicht ohne Scrollen (Kopf 121 px, Bühne 520 px, Ende bei 700 px).
- Panel: Tastatur (Enter öffnet, Fokus auf „Schließen“), Escape schließt, Fokus kehrt auf die Karte zurück; Eingaben bleiben beim Ansichtswechsel und nach Neuladen (Seite, offene Erklärung, Text).
- Landkarten-Link absolut (`…/#s-2-1`), funktioniert damit über `file://`, im Moodle-Paket und auf GitHub Pages; die Landkarte liest `location.hash` und öffnet den Abschnitt.
- Zusammenfassung als PDF (Chromium, A4): genau 2 Seiten, mit Beispielstand.
- M23 lädt ohne Fehler und liest die Bezugsmarke aus v3.
- Klickzählung nachher, Phase 4: 2 Tipps bis zur ersten Antwort (Karte, Feld These), 0 Seitenwechsel, 0 Fenster; zweite Erklärung ohne Scrollen erreichbar. Phase 5: 1 Tipp (Feld), 0 Seitenwechsel; die Landkarte öffnet im neuen Tab (gewollt). Marktplatz unverändert (≈ 25 Tipps, 1 Fenster).
- Zeitdiagnose nachher (150 W/min + Eingaben): Übersicht 259 Wörter (1,7 Min.) + je Erklärung 1,7–2,5 Min. Lesen, 4,5 Min. Karte, 2,5 Min. Check → 20–24 Min. für zwei Erklärungen (Plan 22). Landkarte 337 Wörter (2,2) + Satz 1,5 + Landkarte lesen 2 + wählen/begründen 2 + Rückmeldung 0,5 ≈ 8 Min. (Plan 8).

## Nicht gelaufen (Nur du kannst das)

Impeccable audit/polish und Taste lint/inspect (Plugins fehlen) · axe-core (nicht installiert) · echtes iPad mit Safari hoch und quer, VoiceOver, Zoom 200 % · Moodle-Upload des neuen Pakets · Beamer im Klassenraum · Lesbarkeit der Feldsätze im Rad am Beamer aus der letzten Reihe (Schrift im Feld ≈ 10–11 px bei 1280 px; auf dem iPad quer ähnlich – Entscheidung der Lehrkraft nach dem Test).

## Zehn Prinzipien aus „Digitale Didaktik“ (Abhakliste)

1. Denken vor Klicken – erfüllt: Gewichtung vor Linien, Vermutung vor Landkarte, Prinzip vor Rückmeldung.
2. Abrufen statt Wiederlesen – erfüllt (Abrufübung bleibt), unverändert.
3. Rückmeldung, die erklärt – erfüllt: je Ebene, je Prinzip, je Streitpaar.
4. Unterstützung, die sich zurückzieht – erfüllt: Hilfe 1/2 im Panel, Lesestufen, Kürzung K3.
5. Belastung steuern – erfüllt: Übersicht ≈ 260 Wörter, ganzer Satz im Feld nur als Lesehilfe; noch offen: Schriftgröße im Feld am Beamer.
6. Vom Bildschirm in den Austausch – erfüllt, Marktplatz und Diskussion unverändert.
7. Fokus durch Struktur – erfüllt: ein Arbeitsfenster, Satz zur Bedienung neben dem Umschalter, Zeitfenster am Kopf.
8. Echt ist, was belegt ist – erfüllt: Landkarten-Wortlaut und Anker aus dem Repository, Modell-Hinweise, Jahre aus den Belegen.
9. Weniger Klicken, ein Arbeitsfenster (Ruhe-Prinzip, Vorschlag) – erfüllt in Phase 4 und 5; bewusst nicht in Einstieg, Józefów, Marktplatz (Entscheidung der Lehrkraft, 08.11.).
10. Weniger Linien, mehr Übersicht – erfüllt: Linien nur für die Auswahl, ab „wichtig“, am Rand entlang.

## Offen

- Beamer-Schalter „alle Linien aller geprüften Erklärungen“ für die Diskussion (AR a): nicht gebaut, Vorschlag.
- Grow-in-Place als Alternative zum Gleiten (AP): nicht gebaut.
- Marken-Schwelle „wichtig“ oder „sehr wichtig“: jetzt „wichtig“.
- Rückblick nach zwei bis drei Wochen: Status der Muster AM 2, AP, AQ, AR b, AT, AU von „Vorschlag“ auf „erprobt“ oder zurück.

## Nachtrag 08.11.2026 · Fassung 3.1 – Erklärfilm zu Phase 4 (Muster AV)

Anlass: Lernende sehen die Übersicht in Phase 4 zum ersten Mal. Ein kurzer Film am Beamer soll vorher zeigen, was sie dort tun und wohin die Stunde führt (Marktplatz).

- Neue Datei `m22-film-erklaerungen.html` (kein Netz, läuft über `file://`, Moodle und GitHub Pages; Schriften wie M22 aus `assets/fonts/`: Fraunces und Atkinson Hyperlegible). Bühne 1280 × 720, skaliert; Farben, Abstände und Bewegung aus dem Design-System „Gegenwart“ (Theme Hell), Ebenenfarben, dunkler Kern und Karten wie im Dashboard von M22, damit die Lernenden die Übersicht wiedererkennen. Die Vorschau-Fassung als Claude-Artefakt bettet die Gegenwart-Schriften (Bricolage Grotesque, Atkinson Hyperlegible Next) ein.
- Sieben Kapitel, 2:02 Min.: 1 Bis hierher (Józefów, Punktefeld 500, rund ein Dutzend tritt heraus, mindestens 1.500 Ermordete, „Wie war das möglich?“) · 2 Sechs Erklärungen · 3 Fünf Ebenen (Modell der Lehrkraft) · 4 Dein Auftrag (Panel Browning: Lesestufen, Erklärungskarte, Gewichtungs-Check mit Beispielschätzung und den echten Rückmeldewörtern; danach Marken am Rad; zweite Erklärung Adorno von einer anderen Ebene; „Der Marktplatz ist frei“) · 5 Wohin die Reise geht (Lernweg 4 → 5 → 6, zwei Runden am Stand wie im Marktplatz: A, C, E zuerst) · 6 Euer Modell (Tischgruppe, Balken als Beispiel) · 7 Jetzt du (Merksatz, Auftrag).
- In M22: Knopf „Film: So geht’s“ im Kopf der Übersicht (passt in die Zeile, Beamer-Fit bleibt), Film als Vollbild-Tafel im iframe, Schließen und Escape (auch aus dem Film heraus), Fokus kehrt auf den Knopf zurück. Absatz im Lehrkraftbereich.
- Bewegung: startet nur auf Knopfdruck, kein Autoplay, hält bei verdecktem Tab; Regler zum Ziehen, Kapitel, ‹ ›, Leertaste und Pfeiltasten. „Weniger Bewegung“ (Schalter oder Systemeinstellung): sieben Standbilder, Wechsel mit 150 ms Einblenden. Frage und Merksatz bauen sich wortweise auf (≤ 1 s); Text zum Film steht vollständig unter dem Film, Kapitelwechsel werden über `aria-live` angesagt.
- Abweichung vom Dashboard: Im Film zeigen nur Marken am Rad, wo eine Erklärung ansetzt (keine Linien), damit das Bild ruhig bleibt.

Geprüft (Chromium, gelaufen): keine Konsolenfehler im Film und in M22; Standbilder aller Kapitel; 1280 × 720 und 390 × 844 ohne waagerechtes Scrollen; „weniger Bewegung“ blättert Kapitel; Tafel öffnen, Film starten, Escape schließt, Fokus zurück.

Nicht gelaufen: echtes iPad, Beamer im Raum, VoiceOver. Kleinste Schrift im Film ist 16 px bei 1280 px Breite; auf dem iPad hochkant wird sie entsprechend kleiner (Film ist für den Beamer gedacht).
