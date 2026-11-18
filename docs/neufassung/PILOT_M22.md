# Pilot M22 · Arbeitsblatt Geschichte · Bericht

Stand: 18.11.2026, Abend · Branch `neufassung-arbeitsblatt-geschichte` · **Status: gebaut und gemessen – Stopp »Zeig sie mir«.** Nichts ist zusammengeführt.

M22 ist der Pilot, weil Mario die Stunde als Nächstes unterrichtet (Auswahl vom 18.11.2026, 18:31 Uhr). Grundlage sind `ENTSCHEIDUNGEN.md` und `DESIGN.md` in diesem Ordner.

## 1 · Was vorlag (gelesen am 18.11.2026)

- **Heft, M22:** nur ein Infoblatt, keine Arbeitsaufträge. Die Aufträge der Stunde stammen aus der Seite, die Mario seit dem 08.11. geformt hat (Fassung 4.1 vom 16.11.2026).
- **Seite M22, Fassung 4.1:** zehn Aufträge (1–8, L, Z), 90 Minuten, Register links, ein Auftrag je Seite, Freigabe offen · auf Ansage · nach deiner Antwort, Schreibauftrag wie in der Klassenarbeit, Zusammenfassung auf zwei Seiten, Speicher `ggk-m22-taeter:v3` (M23 liest ihn).
- **Gemessen an der Fassung 4.1** (1180 × 820, voller Beispielstand): je Auftrag 42 bis 73 Texte unter 16 px (Register 12,5 px, Blattzeile 12,8 px, Nachweise 13,6 px; in der Übersicht von Auftrag 4 bis hinunter zu 8,9 px) · Nachweis-Links nur 17 px hoch · Akzent Rot `#9B402D` an 28 Stellen und im Zeichen oben links.

## 2 · Diagnose

| Frage | Befund |
| --- | --- |
| Folgt die Seite Marios Material? | Ja. Reihenfolge, Inhalte und Interaktionen bleiben. Kein Baustein ist dazuerfunden. |
| Lücke kognitive Landkarte? | Nein: Auftrag L (Perspektivität 2.1.2, Folgerung Kontroversität 2.1.9), dazu Triftigkeit an Goldhagen. |
| Lücke narrative Kompetenz? | Nein: Auftrag 7 verlangt eine Erklärung im Format der Klassenarbeit (Aufgabe C2 der Klassenarbeit Nr. 2). |
| Zeit | 90 Minuten geplant, nicht erprobt und in dieser Fassung nicht neu gemessen (die Aufträge sind unverändert). Im Text für die Lehrkraft standen noch drei Hausaufgaben-Varianten; sie sind umformuliert. |
| Was fehlte zum Standard? | Farbwelt Archiv · Blattkopf mit Platz im Hefter · Deckblatt mit Titelbild und Ablauf · 16-Pixel-Grenze · Stand als Datei · Hefter als Startdatei · Lehrkrafttext und erwartete Inhalte raus aus dem Blatt · Pakete. |

**Lehren aus anderen Fächern, die hier greifen** (Tresor: »Digitale Didaktik – Prinzipien und Fachgrenzen«, »Erfahrungen aus Erprobungen«): Ergebnisse überleben den Gerätewechsel nur als Datei (Politik-Werkstatt, 08.11.) · Lehrkraftbereich von Anfang an getrennt (GGK, 13.11.) · eine Übersicht darf nicht vorab zeigen, was die Aufgabe abfragt (M22 2.0) · ein Paket nicht nur aus `media/` bauen, sondern alle Pfade einsammeln (M22, 08.11.).
**Wo sie in Geschichte brechen:** Beim Gewichten gibt es kein »richtig« oder »falsch«. Das Modell ist eine Setzung der Lehrkraft und so beschriftet; die Rückmeldung vergleicht, sie bewertet nicht.

### M22 in der Zuordnung Prinzip × Technik × Lerngewinn

| Prinzip | Digitale Technik | Lerngewinn gegenüber Papier |
| --- | --- | --- |
| Urteilsbildung: erst festlegen | Auftrag 1: erste Antwort versiegeln; Auftrag 8: Siegel öffnen | Die erste Antwort kommt am Ende unverändert zurück. Auf Papier wird sie überschrieben oder vergessen. |
| Sachanalyse: verbreitete Sätze am Befund prüfen | Auftrag 2: schätzen, dann dreht sich die Karte zum Befund | Die eigene Schätzung steht fest, bevor der Befund sichtbar ist. |
| Kontroversität und Perspektivität (2.1.9, 2.1.2) | Auftrag 4: sechs Erklärungen um ein Rad mit fünf Ebenen; die Linien erscheinen erst nach dem eigenen Gewichtungs-Check | Sechs Erklärungen bleiben nebeneinander sichtbar und lassen sich ordnen. Das Blatt verrät die Ordnung nicht vorab. |
| Pluralität begründeter Urteile | Auftrag 5 und 6: Modelle der Tische nebeneinander am Beamer | Unterschiede zwischen den Tischen werden sofort sichtbar und besprechbar. |
| Narrative Kompetenz | Auftrag 7: Schreibauftrag wie in der Klassenarbeit, Kriterien erst nach dem Text | Beim Urteil schweigt das Blatt. Getippt oder von Hand auf dem Schreibblatt. |

Mit der Fassung 5.0 kam **keine** neue Bewegung dazu: Die Stunde hat ihre Momente schon.

## 3 · Was geändert wurde

**Gemeinsame Schicht (neu, für alle Stunden gedacht):** `src/arbeitsblatt/` mit `ab.css` (Farbwelten, Kopf mit Reiter, Register, Blatt, Deckblatt, Linien, Werkzeuge, Druck), `ab.js` (Platz im Hefter, Meldung an den Hefter, Stand als Datei sichern und laden, Ansicht für den Beamer, Druck der Schreibfelder), `hefter.js` (Blätter der Einheit), `hefter.html`, `basis.css`. Eingesetzt mit `python3 tools/ab_einsetzen.py`. Die Schicht benutzt die Klassennamen, die auch die Kerne der anderen Stunden haben.

**M22, Fassung 5.0** (`m22-wie-war-das-moeglich.html`; der Umbau steht nachvollziehbar in `docs/neufassung/werkzeug/umbau_m22_4-1_auf_5-0.py`):

| Bereich | Vorher (4.1) | Jetzt (5.0) |
| --- | --- | --- |
| Farben | Rot als Akzent, Blau für »aktiv« | Farbwelt **Archiv**: Schieferblau als zweite Tinte, kein Rot. Rückmeldung in drei Stufen mit Wort und Linie. Ebene »Weltbild« trägt Pflaume statt Rot. |
| Kopfzeile | Zeichen, Titel, »← GGK-Labor« | Reiter »M22«, Titel, »Hefter Nationalsozialismus · Arbeitsblatt 7 von 11«, »← Hefter« |
| Deckblatt | Titel, Frage, zwei Textspalten | Reiter, Titel, Zentrale Frage, **Platz im Hefter**, Knopf, **Titelbild** mit Nachweis, »Darum geht es«, »So arbeitest du«, **Ablauf** mit Sozialform und Minuten (Summe 90) |
| Register | 15 rem, Schrift 12,5 px, drei Zeilen | 17 rem, Schrift 16 px, Titel + Minuten + Stand; Deckblatt als erster Eintrag; Werkzeuge eingeklappt |
| Blatt | immer volle Breite | A4-Grundlage mit hängender Nummer für Deckblatt, Auftrag 7, 8 und Extra; volle Breite für Aufträge 1–6 und L (wie am 16.11. gewünscht); Zusammenfassung 62 rem |
| Schreibfelder | Kästen | Linien; im Druck Text auf Linien |
| Schrift | bis hinunter zu 8,9 px | nichts unter 16 px |
| Auftrag 4, Karten | Kennung, Name, Jahr, Frage in 11 bis 15 px | Name, »Erklärung A · Jahr«, Frage, Marken – alles 16 px |
| Auftrag 4, Rad | Name und Erklärung der Ebene im Feld (10 px) | nur der Name im Feld (rund 18 px); die Erklärung der fünf Ebenen steht darunter. Rad ab 1150 px Breite, darunter Liste |
| Auftrag 4, Zeitachse | Karten mit Porträt und Marken | Karten mit Name und Kennung; eng stehende Jahre wechseln die Zeile |
| Auftrag 7 | Kriterien **und erwartete Inhalte** nach dem Text | nur die Kriterien in drei Stufen; erwartete Inhalte stehen im Text für die Lehrkraft |
| Lehrkraft | Bereich mit Passwort im Blatt, darin die Beamer-Werkzeuge | Seite **»Am Beamer«** (Freigabe, Moderation, Modelle der Tische – ohne Lösungen). Der Text für die Lehrkraft bleibt im öffentlichen Repository verschlüsselt in der Seite; im Paket für die Lernenden fehlt er ganz. |
| Speichern | nur im Browser | zusätzlich **Stand als Datei sichern und laden** (eine Datei für den ganzen Hefter); »Eingaben löschen« nimmt auch den Eintrag im Hefter weg |
| Druck | Zusammenfassung zwei Seiten | A4 mit Heftrand und Blattkopf: Deckblatt 1, Auftrag 7 getippt 1, Schreibblatt für den Stift 1, Zusammenfassung 2, Extra 1 Seite |
| Extra | – | **Vorschlag:** »Ein Gespräch über einen Satz«, freiwillig, außerhalb der 90 Minuten (siehe 6) |
| Bilder | 16 in der Seite, 12 gezeigt | 12 in der Seite; die vier in Reserve bleiben in `media/` und in der Bildliste |
| Erklärfilm | alte Farben | Farben des Blatts; der Inhalt ist noch der alte (siehe 5) |

**Hefter Nationalsozialismus** (`hefter-nationalsozialismus.html`, im Paket `index.html`): elf Blätter in der Reihenfolge des Hefts, Stand je Blatt, Lernspur, Stand als Datei, alles löschen.

**Text für die Lehrkraft** (`privat/lk/m22.html`, nicht im Repository; neu verschlüsselt als `lk/m22.enc.json`): Abschnitt zur Fassung 5.0, erwartete Inhalte zum Schreibauftrag, Extra, Verweise auf »Am Beamer«, keine Hausaufgaben mehr (K5, K8 und die Abrufübung beginnen jetzt die nächste Stunde).

**Pakete** (`python3 tools/bau_einheit_paket.py --einheit ns --nur M22 --apps <Ordner>`):
- `Hefter-Nationalsozialismus_Lernende_Pilot-M22_<Datum>.zip` (1,8 MB): `index.html` (Hefter), M22, Erklärfilm, Bildliste, 12 Bilder, Schriften, Kopie der kognitiven Landkarte, Anleitung.
- `Hefter-Nationalsozialismus_Lehrkraft_Pilot-M22_<Datum>.zip` (0,2 MB): Übersicht, Hinweise zu M22, Schriften, Anleitung.

**Was entfallen oder gewandert ist** (nichts davon ist Inhalt der Stunde): erwartete Inhalte im Blatt → Lehrkraft · Unterzeile der Ebenen im Rad → unter das Rad · Zeile »Sechs Erklärungen … eine Frage« über dem Rad → in den Modellhinweis · Porträts und Marken in der Zeitachse · vier Reserve-Bilder aus der Seite · das Zeichen oben links (der Reiter trägt die Nummer).

## 4 · Was geprüft wurde (gelaufen am 18.11.2026)

Chromium über Playwright, per `file://`, mit `python3 tools/pruef/ab_pruef.py` (Repository und entpacktes Paket), dazu Druck als PDF und Bildschirmfotos.

| Prüfung | Ergebnis |
| --- | --- |
| iPad quer 1180 × 820 · iPad hoch 820 × 1180 · Beamer 1280 × 720 · iPad 9 quer 1080 × 810 · Telefon 390 × 844; je 14 Seiten, Auftrag 4 zusätzlich mit Panel, Vergleich, Zeitachse | kein waagerechter Überlauf |
| Schrift unter 16 px (auch Schaubilder, wirksame Größe) | keine |
| Ziele unter 44 px | keine |
| Textkontrast unter 4,5 : 1 (große Schrift 3 : 1) | keiner. Nicht messbar: Text auf Fotos (Bildbänder) und die helle Schrift auf dem dunklen Kreis des Rads (gerechnet 15,3 : 1) |
| Beamer: Unterkante des ersten Knopfs | 615 px von 720 px |
| Animationen nach dem Laden · Fehler in der Konsole · Anfragen an fremde Server | 0 · 0 · 0 |
| Stand nach Neuladen | bleibt |
| Stand als Datei sichern → alles löschen → aus Datei laden | Datei mit zwei Schlüsseln; danach ist alles wieder da |
| falsche Datei | abgewiesen mit einem Satz |
| »Eingaben löschen« im Blatt | Blatt leer; im Hefter »noch nicht begonnen«, Lernspur leer |
| Druck A4 ohne Hintergrunddruck | Deckblatt 1 · Auftrag 7 getippt 1 · Schreibblatt für den Stift 1 · Zusammenfassung 2 · Extra 1 · Auftrag 8 1 Seite; Linien erscheinen; frei bis zum unteren Rand mindestens 13 mm |
| Paket für die Lernenden, entpackt | 13 Seiten ohne Befund · Hefter → M22 → Hefter · Landkarte öffnet als Kopie im Paket · Film lädt · alle Bilder laden · keine Anfrage an fremde Server · gesucht und nicht gefunden: Datenblock, Schloss, verschlüsselte Datei, erwartete Inhalte |
| Paket für die Lehrkraft, entpackt | Übersicht → Hinweise zu M22 mit den erwarteten Inhalten |
| Öffentliche Fassung mit Schloss | »Für Lehrkräfte« öffnet mit dem Passwort; falsches Passwort wird abgewiesen |
| Passwort in Dateien | 0 Fundstellen im Arbeitsordner |

**Angesehen:** Deckblatt, alle zehn Aufträge, Extra, Am Beamer (1180 × 820) · Auftrag 4 mit Panel, Vergleich, Zeitachse, als Liste bei 1080 und 820 px · Hefter leer und mit Stand · Ansicht für den Beamer · alle Druckseiten · Hefter und Lehrkraftseite aus dem Paket · zwei Standbilder des Films.

**Nicht gelaufen:** Moodle (Hochladen, Entpacken, Hauptdatei, Moodle-App) · Safari auf einem echten iPad, hoch und quer · Stift und Tastatur · Sichern der Stand-Datei in Safari und in der Moodle-App · Drucken → PDF → GoodNotes · VoiceOver · Zoom 200 % · axe-core, Taste, Impeccable · Zeitdiagnose mit 150 Wörtern je Minute für diese Fassung · nichts im Unterricht.

## 5 · Was offen ist

1. **Moodle:** Das Paket ist entpackt geprüft, nicht in Moodle. Das kannst nur du.
2. **Welche iPads hat die Klasse?** Das Rad in Auftrag 4 erscheint ab 1150 px Breite (iPad 10 und iPad Air quer: 1180 px). Auf iPad 9 und iPad mini quer wird die Übersicht zur Liste. Wer das Rad auch dort will, braucht kleinere Schrift (14 bis 15 px) – siehe V2.
3. **Erklärfilm:** trägt die Farben des Blatts, zeigt aber den Ablauf vor dem 13.11.2026 (Leiste mit acht Phasen, zwei Runden am Marktplatz). Siehe V3.
4. **Öffentliches Labor:** Der Hefter verlinkt dort auch die zehn Blätter der früheren Fassung. Sie melden noch keinen Stand und führen noch zum GGK-Labor zurück. Die Startseite des Labors verlinkt den Hefter noch nicht.
5. **Bildrechte:** unverändert – Fotos von Yad Vashem und das Familienfoto Willner sind für den Unterricht eingebunden (§ 60a UrhG), Entscheidung der Lehrkraft. Abbildung 20 im Heft ist ohne Angabe und nicht eingebaut.
6. **Schreibblatt von Hand:** eine Seite mit 20 Linien. Vorder- und Rückseite?
7. **Zeit:** 90 Minuten, geschätzt, nicht erprobt.

## 6 · Vorschläge zur Auswahl

| Nr. | Vorschlag | Stand |
| --- | --- | --- |
| V1 | **Extra »Ein Gespräch über einen Satz«** (freiwillig): eine erwachsene Person fragen »Waren die Täter Monster – oder ganz normale Menschen?«, Antwort in zwei Sätzen ohne Namen, einer der fünf Ebenen zuordnen, mit einer Fundstelle aus dem Blatt antworten, ein Satz zum eigenen Urteil. Zu Beginn der nächsten Stunde zwei oder drei Gespräche hören. | eingebaut als Vorschlag – behalten, ändern oder streichen |
| V2 | Rad in Auftrag 4 auch auf schmaleren iPads zeigen, dafür Schrift in den Karten 14 bis 15 px | nicht gebaut; widerspricht der 16-Pixel-Grenze |
| V3 | Erklärfilm: (a) neu fassen als eigener Schritt · (b) Knopf »Film: So geht’s« ausblenden, bis er neu ist · (c) so lassen | offen; jetzt (c) |
| V4 | Abrufübung (sechs Fragen der Zusammenfassung) als Einstieg in M23 statt als Hausaufgabe | steht so im Text für die Lehrkraft; in M23 noch nicht gebaut |
| V5 | Abbildung 20 aus dem Heft (Nürnberger Prozesse) in Auftrag 2 | erst nach geklärter Fundstelle |

Kürzungen für den Notfall (K1 bis K8) stehen im Text für die Lehrkraft. Still gekürzt wurde nichts.

## 7 · Bildliste

`M22_Bildliste.html` (im Paket und im Repository): 16 Bilder mit Motiv, Quelle, Lizenz, Platz, Zweck und Status. Zwölf sind eingebaut, vier liegen in Reserve, eines ist offen.

| Platz | Bild | Lizenz | Zweck |
| --- | --- | --- | --- |
| **Deckblatt (Titelbild)**, Auftrag 3 | Tafel im Wald bei Józefów, 2022 · Foto: Paweł Byra, Wikimedia Commons | CC BY-SA 4.0 | der Ort des Falls heute, ohne Gewalt und ohne Täter |
| Auftrag 3, Bildband | Gedenkstein »Mazewa der Erinnerung«, Józefów 2022 · Paweł Byra | CC BY-SA 4.0 | kündigt den Fall an |
| Auftrag 1 | Zalman Levinson 1939 · Emanuel Aschkenasi 1939 (Yad Vashem) · Familie Willner 1923 (privat, nach dem Heft) | nicht frei · § 60a UrhG | Menschen aus M21 mit Namen |
| Auftrag 1 | Janusz Korczak, Postkarte 1933 | gemeinfrei | wie oben |
| Auftrag 4, Zusammenfassung | Adorno/Horkheimer 1964 · Arendt 1933 · Browning 2019 · Goldhagen 2011 · Milgram 1954 · Welzer 2013 (Wikimedia Commons) | CC BY-SA 3.0 / 4.0, CC BY 2.0, gemeinfrei | Forschung hat Urheber und ein Jahr |
| nicht eingebaut | Familie Aschkenasi 1914 · Bauman 2005 · Todesanzeige 1946 · Eichmann 1961 (Täterfoto) | – | Reserve |
| **offen** | Abbildung 20 im Heft: Nürnberger Prozesse | im Heft ohne Angabe | Kandidat für Auftrag 2 |

## 8 · Nur du kannst das

- Beide Pakete in Moodle hochladen (Anleitung liegt in jedem Paket), das Paket für die Lehrkraft verbergen, einmal mit einem Schülerzugang auf dem iPad öffnen.
- Auf dem iPad in Safari: Deckblatt, Auftrag 4, Auftrag 7; Stand als Datei sichern und auf einem zweiten Gerät laden; Schreibblatt drucken → als PDF sichern → in GoodNotes öffnen.
- Entscheiden: V1 bis V5, Schreibblatt, Bildrechte.
- Nach der Stunde: Notiz nach »Vorlage – Nach der Stunde«.

## 9 · Fallstrick-Vorschläge für die Skills

| Skill | Fallstrick | Regel |
| --- | --- | --- |
| `website-design-workflow` | Die Druckseite ist schmaler als der Umbruchpunkt: A4 misst rund 660 px, also greifen die Regeln für schmale Bildschirme. Das Deckblatt druckte einspaltig auf zwei Seiten. | Im Druck die Spalten ausdrücklich setzen und Seitenzahlen in der Druckansicht zählen. |
| `lernseite-bauen` | Ein Schreibfeld druckt nur seinen sichtbaren Ausschnitt; langer Text ist im Ausdruck abgeschnitten. | Vor dem Druck jedes Feld in Text auf Linien verwandeln, danach zurück. |
| `signatur-design` | Eine Bühne, die mit ihrem Behälter skaliert, zieht die Schrift unter 16 px (hier bis 8,9 px), ohne dass es im Stil auffällt. | Feste Schriftgrößen; im Bild nur Namen, Erklärung darunter; unter einer gemessenen Breite Liste statt Bühne. Wirksame Größe messen. |
| `lernseite-bauen` | Eine Kopfzeile, deren Mindesthöhe aus ihrer eigenen gemessenen Höhe kommt, wächst mit jedem Neuzeichnen. | Einen Messwert nie an das gemessene Element zurückbinden. |
| `lernseite-bauen` | Wandert etwas im Blatt (Werkzeuge, erwartete Inhalte), stimmen die Verweise im Text für die Lehrkraft nicht mehr (»unten bei den Werkzeugen«, »als Hausaufgabe«). | »Dokument gegen Seite« gilt auch für den Lehrkrafttext: nach jedem Umbau nach Ortsangaben und alten Entscheidungen suchen. |
| `film-regie` | Ein Erklärfilm altert mit jeder Fassung der Oberfläche; hier zeigte er seit dem 13.11. einen Ablauf, den es nicht mehr gibt. | Bei jeder Änderung der Oberfläche den Film prüfen – sonst den Knopf ausblenden. |
| `unterricht-digitalisieren` | Wer Bilder nach Nennung im Quelltext einsammelt, packt auch Reserve-Bilder ein – hier ein ungenutztes Täterfoto. | Nur gezeigte Bilder stehen in der Seite; Reserve bleibt in der Bildliste. |
| `website-design-workflow` | Die Kontrastmessung findet keinen Grund, wenn Text auf einer Form in einer Grafik steht, und meldet 1,0 : 1. | Solche Stellen benennen, von Hand rechnen und im Bericht als »nicht messbar« ausweisen – nicht stillschweigend ausnehmen. |

## 10 · Was ich in den Tresor eintragen würde (geschrieben wird erst nach »Sichern«)

**Stand-Notiz, Verlauf:** `18.11.2026 · Neufassung »Arbeitsblatt Geschichte«: Auswahl am ersten Stopp (Litfaßsäule · Archiv · Zwei Tinten; kein starres System). Pilot M22 in Fassung 5.0 gebaut und gemessen, zwei Pakete für Moodle. Stopp vor der Übertragung.`
**Stand-Notiz, offen:** Moodle-Test · iPad-Breite der Klasse (Rad oder Liste) · Erklärfilm M22 · Extra behalten? · Übertragung auf die anderen Stunden der NS-Einheit.
**Entscheidungen-Notiz:** die sechs Entscheidungen vom 18.11.2026, 18:31 Uhr, mit Grund (wie in `ENTSCHEIDUNGEN.md`).
**»Erfahrungen aus Erprobungen«:** nichts – es ist nichts erprobt.
