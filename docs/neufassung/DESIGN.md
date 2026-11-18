# DESIGN · Arbeitsblatt Geschichte

Stand: 18.11.2026, später Abend, nach dem Pilot M22 in **Fassung 5.1** · Branch `neufassung-arbeitsblatt-geschichte`
**Status:** gilt seit Marios Auswahl vom 18.11.2026, 18:31 Uhr (Farbwelten, kein starres Baustein-System, zwei Pakete, keine Hausaufgaben) und seiner Rückmeldung von 19:48 Uhr: **Darstellung und Größe des Blatts exakt wie im Modul Motivation des Psycho-Labors; unnötige Klicks vermeiden.**
Gebaut ist der Standard in `src/arbeitsblatt/` (gemeinsame Schicht) und zum ersten Mal angewendet in M22. Das Vorbild liegt in `psycho-labor/src/motivation/kern.css` (Stand 17.11.2026); gemessen wurde gegen `ds06-antrieb.html` (Abschnitt 12).

Dieses Dokument beschreibt **ein** Blatt für alle Stunden der drei Einheiten Weimarer Republik, Nationalsozialismus und Ost-West-Konflikt. Was hier als gemessen steht, ist an M22 gemessen. Was erst mit der Übertragung kommt, ist als »noch nicht gebaut« gekennzeichnet.

## 1 · Leitbild

**Ein Modul ist ein Arbeitsblatt. Die Arbeitsblätter liegen im Hefter. Die Nummer ist der gemeinsame Anker.**

- Das Blatt hat Größe und Aufbau des Moduls Motivation im Psycho-Labor – **bei jedem Auftrag dasselbe Blatt**: Blattkopf, Nummer, Titel, Marken für Sozialform und Minuten, Auftrag, Material, Linien zum Schreiben. Es druckt auf DIN A4.
- Das Register zeigt immer, wo man ist und was kommt. »Wir sind bei Auftrag 3« gilt vorn am Board und an jedem Platz.
- **Die Aufträge folgen Marios Material** – dem Heft und den Seiten, die er geformt hat. Es gibt kein Baustein-System, das jede Stunde in dieselbe Form presst.
- Das Gerät verdeckt, deckt auf, misst und sammelt. Gedeutet, gestritten und geurteilt wird im Raum.

## 2 · Bildwelt

**Der Hefter.** Alle Bilder der Gestaltung kommen aus der Arbeit mit Papier, mit der das Fach selbst arbeitet: Blatt, Reiter, Register, Rand, Linie, Stempel. Sie kommen nie aus der Bildsprache einer Epoche – und im Kapitel Nationalsozialismus nie aus der Ästhetik der Täter.

| Ding aus dem Hefter | wird auf der Seite zu |
| --- | --- |
| Reiter am Registerblatt | Nummernfeld des Moduls (»M22«) in der Kopfzeile, im Deckblatt und im Hefter |
| Register | Leiste links mit allen Aufträgen und ihrem Stand, auf altem Papier mit Maserung |
| Nummer am Blatt | runde Scheibe am Auftragskopf, dieselbe Nummer wie im Register und im Ablauf |
| Linien | Schreibfelder – getippt und, im Ausdruck, von Hand |
| Stempel | »versiegelt« nach einer Festlegung |
| Farbplatte unter dem Blatt | »du bist hier«, wichtigster Knopf, Aufgabe der Klassenarbeit |

## 3 · Aufbau eines Blatts

### 3.1 Rahmen (Maße des Vorbilds)

- **Kopfzeile** (64 px, bleibt oben stehen): Reiter mit der Modulnummer · Titel · »Hefter Nationalsozialismus · Arbeitsblatt 7 von 11« · **»Stand sichern«** · »← Hefter«.
- **Register** (links, 250 bis 290 px, altes Papier mit Maserung in der Farbe der Einheit – Entscheidung vom 16.11.2026): Deckblatt, dann alle Aufträge mit Nummer (38 px), **Titel, Minuten und Stand**. Die Sozialform steht am Auftragskopf und im Ablauf auf dem Deckblatt (mit drei Zeilen je Eintrag passen zwölf Einträge nicht auf ein iPad). Darunter stehen die **Werkzeuge offen da**: Stand als Datei sichern · Stand aus Datei laden · Eingaben löschen · Am Beamer · Ansicht für den Beamer · Stand als Text. Bis 980 px Breite wird das Register zur Nummernleiste oben, die Werkzeuge stehen dann unter dem Blatt.
- **Blatt** (rechts): höchstens 66 rem breit, Innenrand `clamp(18px, 3vw, 44px)`, Ecke 4 px, versetzter Schatten 6 px in Karton. Auf dem iPad quer (1180 × 820) ist es **829 px breit mit 35 px Innenrand** – bei jedem Auftrag. Ein Auftrag je Blatt, das Blatt scrollt senkrecht; unter dem Blatt: zurück und weiter.
- **Breiter wird das Blatt nur für ein Schaubild zum Arbeiten** (in M22 die Übersicht von Auftrag 4): Dann wird das Register zur Nummernleiste (76 px), und dasselbe Blatt darf bis 84 rem wachsen – wie die breiten Aufträge im Vorbild. Andere »breite« Seiten gibt es nicht mehr.
- **Blattkopf** auf jedem Blatt: »GGK · Einheit │ M22 · Blatt 7 von 11 im Hefter │ Datum«, darunter eine Linie. Er druckt mit.
- **Auftragskopf:** Nummer in einer runden Scheibe (52 px) · kleine Zeile »Arbeitsauftrag 4« · Titel · Marken für Sozialform und Minuten (und »wie in der Klassenarbeit«).

### 3.2 Deckblatt (Aufbau des Vorbilds)

Kleine Zeile mit Modulnummer und **Platz im Hefter** (Blatt 7 von 11, davor, danach, 90 Minuten) · Titel · **Zentrale Frage** · Knopf »Los geht’s: Auftrag 1« und, wenn schon gearbeitet wurde, »Weiter, wo du warst« · daneben das **Titelbild** mit Nachweis · darunter zwei Spalten »Darum geht es« und »So arbeitest du mit diesem Blatt« · »So läuft dieses Blatt« (alle Aufträge mit Sozialform und Minuten, Summe) · bei belastenden Inhalten der Hinweis.

### 3.3 Aufträge folgen dem Material

- **Nummern und Buchstaben** stehen so, wie das Material sie hat. In M22 heißen Landkarte und Zusammenfassung schon seit dem 13.11. »L« und »Z«; das bleibt. Neue Buchstaben-Bausteine werden nicht eingeführt.
- **Eingegriffen wird nur bei einer deutlichen Lücke:** wenn über mehrere Module kein Bezug zur kognitiven Landkarte oder zur narrativen Kompetenz vorkommt. Dann steht der Vorschlag in der Liste zur Auswahl, nicht still im Blatt.
- **Abrufen, Landkarte, Schreibauftrag, Verorten, Zusammenfassung** stehen dort, wo das Material sie hat. Der Schreibauftrag im Format der Klassenarbeit bleibt, wo er ist (Aufgabe, Operator, Sie-Form; erst Stichpunkte; getippt oder von Hand; Kriterien in drei Stufen erst nach dem eigenen Text; keine Punkte).
- **Keine Hausaufgaben.** Die Stunde geht in der Unterrichtszeit auf. Kürzungen stehen als Liste (K1 …) im Text für die Lehrkraft.
- **Extra:** höchstens eine freiwillige Aufgabe je Blatt, nur wenn sie passt. Sie steht als letzter Eintrag im Register (eckiges Feld »＋«), zählt nicht zu den Minuten und nicht zum Stand. Regel: Sie hängt an etwas, das nur in dieser Stunde und bei dieser Person vorliegt (eigene Festlegung, Ergebnis der Klasse, ein Ort oder Gegenstand vor der eigenen Tür, ein Gespräch, die Handschrift), verlangt eine Fundstelle aus dem Blatt und endet mit einem Satz zum eigenen Urteil. Gezeigt wird sie im Gespräch.

### 3.4 Kästen

| Kasten | Aussehen | Aufgabe |
| --- | --- | --- |
| Auftrag | dunkel (Tinte), helle Schrift, Sozialform in der Farbe der Einheit | sagt, was zu tun ist |
| Material | Karton, links eine Linie in der Farbe der Einheit, darunter der Nachweis | Quelle, Zitat, Zahl |
| Sichern | Blatt mit Rahmen und versetzter Farbplatte | Aufgabe der Klassenarbeit, Rückfrage |
| geschlossen | gestrichelter Rahmen, Wortlaut des Vorbilds | sagt, wann sich etwas öffnet: auf Ansage (ein Tipp auf »Auftrag öffnen«, keine Rückfrage) oder nach deiner Antwort |

### 3.5 Hefter (Startdatei jedes Pakets)

Name der Einheit und die Frage, mit der sie beginnt · alle Blätter in der Reihenfolge des Hefts mit ihrem Stand (»4 von 10 Aufträgen fertig«, »✓ fertig«, »Hier hast du zuletzt gearbeitet«) · Lernspur: je Blatt ein Satz, den die Lernenden selbst geschrieben haben · Stand als Datei sichern und laden · alle Eingaben löschen. **Der Hefter zeigt nur, was schon bearbeitet ist.** Noch nicht gebaut: Lernzettel, Ich-kann-Liste und Operatoren für die Klassenarbeit.

### 3.6 Lehrkraft

Im Blatt der Lernenden steht kein Text für die Lehrkraft und kein erwarteter Inhalt. Die Seite **»Am Beamer«** (Freigabe aller Aufträge, Moderation, Tafeln der Klasse) gehört zum Blatt; sie enthält keine Lösungen. Auflösungen der Entscheidungsstunden bleiben im Blatt hinter Ansage oder Codewort. Alles andere liegt im Paket für die Lehrkraft. Im öffentlichen Repository bleibt der Text verschlüsselt in der Seite; das Paket für die Lernenden wird ohne ihn gebaut.

## 4 · Farben

### 4.1 Zwei Tinten

Jede Einheit hat **zwei Tinten**: Schreibschwarz und die Farbe der Einheit. Alles andere ist Papier.

| Rolle | Wert | Wo |
| --- | --- | --- |
| Grund | `#F3EFE7` | Schreibtisch |
| Blatt | `#FAF8F3` | Arbeitsfläche (wie im Vorbild) |
| Karton | `#E9E2D7` | Material, Schatten des Blatts |
| Tinte | `#2A2622` | Schrift, Auftragskasten, Rahmen, wichtigster Knopf (14,1 : 1 auf Blatt) |
| Leise | `#625A52` | Nachweise, Hinweise (6,4 : 1 auf Blatt) |
| Stahl | `#7D7364` | Rahmen von Feldern und Karten, Marken (4,4 : 1 auf Blatt; nur für Linien, nicht für Schrift) |
| Linie | `#E4DCCF` | Blattkopf, Trennlinien |
| **Platte** | je Einheit | Fläche: Reiter, »du bist hier«, Schatten der Aufgabe aus der Klassenarbeit. Darauf steht nur Tinte |
| **Tief** | je Einheit | Schrift und Linien: Zentrale Frage, Rand des Materials, Linien in Schaubildern |
| **Hauch** | je Einheit | gewählte Antwort, Lernspur |
| **Register** | je Einheit | altes Papier der Leiste |
| Erledigt | `#2E6B34` | nur mit dem Wort »✓ fertig« (6,1 : 1 auf Blatt) |
| Achtung | `#8A5300` | nur mit Wort: »auf Ansage«, »auch begründbar«, Hinweis auf belastende Inhalte (6,0 : 1 auf Blatt) |

**Kein Rot.** Rückmeldungen haben drei Stufen mit Wort und Linie (durchgezogen · gestrichelt · gepunktet). Einzige Ausnahme: in der Ost-West-Einheit die zweite Tinte für die zweite Stimme eines Quellenpaars.

### 4.2 Die drei Farbwelten (gewählt am 18.11.2026)

| Einheit | Farbwelt | Platte | Tief | Hauch | Register | Tief auf Blatt | Tinte auf Platte | Warum |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Weimar | **Litfaßsäule** | `#E3B94E` | `#6F4A00` | `#F6EBC9` | `#E4D5A9` | 7,5 : 1 | 8,1 : 1 | Politik zieht auf die Straße: Aufrufe, Plakate, Notgeld |
| Nationalsozialismus | **Archiv** | `#A9BDD1` | `#2C4763` | `#DFE7EF` | `#D4D6D5` | 9,0 : 1 | 7,8 : 1 | Archivkarton, Aktenrücken, Findbuch: die Arbeit der Historiker*innen. Abstand ohne Kälte |
| Ost-West | **Zwei Tinten** | `#A9C2F0` | `#173F86` (zweite Stimme `#8A3A28`) | `#DEE8F8` | `#D2DCE9` | 9,5 : 1 (7,3 : 1) | 8,3 : 1 | Die Einheit denkt in Paaren: zwei Reden, zwei Staaten, zwei Schulbücher |

Gesetzt wird die Farbwelt mit `data-einheit` am Wurzelelement (`weimar` · `ns` · `ost-west`). **Für das Kapitel Nationalsozialismus gilt:** kein Rot, kein Schwarz-Weiß-Rot, kein Braun, kein Feldgrau, keine Fraktur, keine Belohnungsbewegung, keine Geräusche.

### 4.3 Begründete Ausnahmen

- **Kennfarben für Modelle mit Kategorien.** Ein Modell wie die fünf Ebenen in M22 braucht fünf unterscheidbare Felder. Sie tragen gedämpfte Kennfarben, immer mit Wort: Person `#1E4FB5` · Situation `#2E6B34` · Weltbild `#6A3B6E` (Pflaume, statt des früheren Rots; 6,6 : 1 auf ihrer hellen Fläche) · Apparat `#4B4F57` · Vorteil `#8A5300`. Stufen innerhalb eines Modells tragen Form statt Durchsichtigkeit: gefüllt · grau · Rahmen (Marken am Rad).
- **Warmes Papier** als Grund: Das Fach arbeitet mit Papier; Blatt, Karton und Register sind die Metapher, kein Dekor.
- **Maserung** nur im Register (Entscheidung vom 16.11.2026). Das Blatt bleibt glatt.
- **Dunkler Auftragskasten:** die eine starke Fläche je Blatt; sie trägt die Bedeutung »Auftrag«.

### 4.4 Ansichten

**Hell** ist die Regel. **Ansicht für den Beamer** (Schalter bei den Werkzeugen, gilt für alle Blätter auf dem Gerät) setzt Grund und Blatt auf Weiß und Schrift auf Schwarz. Eine dunkle Ansicht gibt es bewusst nicht: Das Blatt ist Papier und wird gedruckt.

## 5 · Schrift

- **Fraunces SemiBold** (Titel, Nummern) und **Fraunces SemiBold kursiv** (Zentrale Frage). **Atkinson Hyperlegible** (Text). Beide liegen lokal, Lizenz OFL. Das ist die eine bewusste Abweichung vom Vorbild, das seine Titel in Bricolage Grotesque setzt: Die Schrift gehört zum Gesicht des GGK-Labors.
- **Größen des Vorbilds:** Fließtext `clamp(1.0625rem, 1.02rem + .2vw, 1.1875rem)` (auf dem iPad quer 18,7 px, Zeile 29 px) · Titel des Auftrags `clamp(1.6rem, 1.25rem + 1.3vw, 2.3rem)` (35 px) · Titel des Deckblatts `clamp(2.1rem, 1.5rem + 2.4vw, 3.4rem)` (52 px) · Zentrale Frage `clamp(1.4rem, 1.2rem + .8vw, 1.9rem)` (29 px) · Zeilen höchstens 68 Zeichen.
- **Nichts unter 16 px** – auch nicht im Register, in Nachweisen und in Schaubildern.
- In Schaubildern zählt die wirksame Größe (Schrift × gezeigte Breite ÷ Breite der Zeichenfläche). Reicht der Platz nicht, zeigt das Bild nur Namen; die Erklärung steht darunter.
- **Filme im Blatt** rechnen mit 18 px als kleinster Schrift auf der Bühne 1280 × 720 und füllen das Fenster: Auf dem iPad quer sind das rund 16 px.

## 6 · Formen und Tiefe

Ecken wie im Vorbild: 4 px (Blatt, Knöpfe, Marken), 10 px (Kästen); Kartenstapel der Stunde 0,3 rem. Rahmen 2 px in Tinte (wichtigster Knopf, Kästen), in Stahl bei zweiten Knöpfen und antippbaren Karten; ruhende Karten tragen nur eine feine Linie. Tiefe nur als **versetzte Farbplatte** (4–6 px, ohne Weichzeichnung); keine weichen Schatten, keine Verläufe. Linien tragen immer eine Beziehung: Blattkopf, Randlinie des Materials, Schreiblinien.

## 7 · Benannte Regeln

| Regel | Satz |
| --- | --- |
| **Material-First** | Die Aufträge folgen Marios Material. Ein Baustein kommt nur dazu, wo eine deutliche Lücke ist – und dann als Vorschlag. |
| **Two-Inks** | Schreibschwarz und die Farbe der Einheit; Kennfarben nur für Modelle mit Kategorien, immer mit Wort. |
| **One-Sheet** | Ein Auftrag ist ein Blatt; das Blatt darf scrollen, das Register nicht verschwinden. |
| **Same-Sheet** | Jedes Blatt hat dieselbe Größe. Breiter wird es nur für ein Schaubild zum Arbeiten; dann wird das Register zur Nummernleiste. |
| **Few-Taps** | Kein Tipp ohne Zweck: Sichern ein Tipp von überall, Laden öffnet sofort die Dateiwahl, Werkzeuge stehen offen, Freigabe ohne Rückfrage, die Festlegung löst die Auflösung selbst aus. Rückfragen nur vor dem Löschen. |
| **First-Action / Beamer** | Der erste Knopf steht bei 1280 × 720 im ersten Bildschirm. |
| **Three-Tap** | Höchstens drei Tipps bis zur ersten eigenen Antwort. |
| **Decide-First** | Vor jeder Auflösung, jedem Material mit Antwort und jeder Bewegung steht eine eigene Festlegung. |
| **Silent-Judgement** | Beim Urteil schweigt das Blatt: nur Kriterien, erst nach dem eigenen Text. |
| **Input-First / Quiet Work** | Nach dem Laden bewegt sich nichts. In der Arbeitsphase bewegt sich nur die Antwort auf die eigene Handlung. |
| **One Moment** | Höchstens eine Bewegung als Erkenntnis je Blatt, höchstens zwei je Stunde. |
| **Word-with-Colour** | Jeder Zustand und jede Stufe steht als Wort da; Farbe allein trägt nie. |
| **Source-Line** | Unter jedem Bild und jeder Zahl: Herkunft · Datum · Urheber · Lizenz, dazu der Status (belegt · Modell · ausgedacht · offen). |
| **Only-Worked** | Der Hefter zeigt nur Bearbeitetes. |
| **Device-Switch** | Der Stand lässt sich als Datei sichern und laden – eine Datei je Hefter, Text als Rückfall. |
| **Teacher-Apart** | Im Paket der Lernenden steht kein Lehrkrafttext und kein erwarteter Inhalt, auch nicht im Quelltext. |
| **No-Homework** | Die Stunde geht in der Unterrichtszeit auf. Ein Extra ist freiwillig und hängt an etwas, das nur diese Person hat. |
| **Paper-Proof** | Jedes Blatt druckt als A4: Deckblatt eine Seite, Schreibblatt eine Seite, Zusammenfassung zwei. |
| **16-Pixel Floor** | Keine Schrift unter 16 px, kein Ziel unter 44 px. |

## 8 · Bewegung

Dauern: Knopf 100 ms · Aufdecken und Wechsel bis 360 ms; Kurve `cubic-bezier(.23,1,.32,1)`; nur `transform` und `opacity`. »Weniger Bewegung« (Systemeinstellung) und der Druck zeigen den Endzustand sofort. In M22 kam mit den Fassungen 5.0 und 5.1 **keine** Bewegung als Erkenntnis dazu: Die Stunde hat ihre Momente schon (Karte dreht mit der Schätzung, Siegel, Linien ins Rad nach dem Gewichtungs-Check). Neu ist nur eine Bewegung als Antwort auf eine Handlung: Ein Tipp auf eine Erklärung holt die Übersicht ganz ins Bild.

Für die Übertragung bleiben die Muster aus dem Inventar (`PHASE1_INVENTAR.md`, Block E): Zeit ziehen · Vorher–nachher · Aufdecken nach Festlegung · Spielraum, Position oder Gewicht verschieben. Vor jeder Bewegung als Erkenntnis steht eine Frage; daneben stehen Zahl und Wort; alles lässt sich mit Finger, Regler und Knopf bedienen. Kein Autoplay, kein sich aufbauender Text, kein Scrollytelling. Beim Zeit-Ziehen zeigen spätere Jahre keine Höhe.

## 9 · Bilder

- **Titelbild** je Modul: im Deckblatt. Erlaubt sind alle Bilder aus Marios Material, dazu frei lizenzierte und gemeinfreie Bilder und eigene Grafiken (Entscheidung vom 18.11.2026). **Zwei Orte:** Nicht freie Bilder liegen nur im Moodle-Paket (Kurs mit Anmeldung, § 60a UrhG); ins öffentliche Repository kommt nur Freies – oder das, wofür Mario die Verantwortung ausdrücklich übernommen hat.
- **Nie als Titelbild:** Propaganda, Täterfotos, Bilder von Gewalt oder Demütigung, Standbilder aus Spielfilmen.
- **In der Stunde:** nur Bilder, die Quelle, Beleg oder Denkanstoß sind – jedes mit Auftrag oder Einordnung. Bilder in Reserve stehen nicht in der Seite; sonst reisen sie ungenutzt im Paket mit.
- **Nachweis** unter jedem Bild: Herkunft · Datum · Urheber · Lizenz. Alternativtext für jedes Bild.
- **Belastende Bilder** erst nach Hinweis und eigenem Tippen.
- **Bildliste** je Modul (Motiv · Quelle · Lizenz · Platz · Zweck · Status) zur Freigabe; Ungeklärtes heißt »offen«.

## 10 · Druck

Seite A4 hoch, Ränder 14 mm, links 22 mm (Heftrand). Kopfzeile, Register, Werkzeuge und Knöpfe drucken nicht; der Blattkopf druckt mit. Der Auftragskasten druckt weiß mit schwarzem Rahmen. **Schreibfelder werden beim Drucken zu Text auf Linien** – ein Feld druckt sonst nur seinen sichtbaren Ausschnitt; die Linien erscheinen auch ohne Hintergrunddruck. Die Druckseite ist schmaler als 980 px: Deckblatt und Stichpunkte behalten ihre Spalten durch eigene Druckregeln.

## 11 · Speichern

- **Jedes Blatt behält seinen eigenen Speicherschlüssel** (M22: `ggk-m22-taeter:v3`; M23 liest ihn weiter). Dazu meldet es dem Hefter nur zwei Dinge: wie viele Aufträge fertig sind und den eigenen Satz vom Schluss (`ggk-hefter-<einheit>:v1`).
- **Eine Datei je Hefter:** »Stand sichern« (Kopfzeile, Register, Hefter) lädt mit **einem Tipp** `Hefter-<Einheit>_<Datum>.json` herunter – ohne Fenster; der Knopf zeigt kurz »✓ Gesichert«, die Meldung steht bei den Werkzeugen. »Stand aus Datei laden« öffnet sofort die Dateiwahl und schreibt die Schlüssel zurück. Was nicht in der Datei steht, bleibt auf dem Gerät. Eine falsche Datei wird mit einem Satz abgewiesen; »Stand als Text« ist der Rückfall, wenn keine Datei geht.
- »Eingaben löschen …« mit Rückfrage auf der Seite: im Blatt nur dieses Blatt (samt seinem Eintrag im Hefter), im Hefter der ganze Hefter.
- Nur im Browser und in der Datei. Keine Namen, keine Anmeldung, kein Server.

## 12 · Gemessen an M22, Fassung 5.1 (18.11.2026, Chromium, `file://`)

**Blatt gegen Vorbild** (1180 × 820, `ds06-antrieb.html` gegen M22):

| Maß | Modul Motivation | M22 |
| --- | --- | --- |
| Kopfzeile | 64 px | 64 px |
| Register | 290 px, Innenrand 16 / 12 / 32 px | 290 px, Innenrand 16 / 12 / 32 px |
| Nummer im Register | 38 px | 38 px |
| Blatt: Abstand von links · von oben | 321 px · 88 px | 321 px · 88 px |
| Blatt: Breite · Innenrand | 829 px · 35,4 px | 829 px · 35,4 px |
| Blatt: Ecke · Schatten · Grund | 4 px · 6 px Karton · `#FAF8F3` | 4 px · 6 px Karton · `#FAF8F3` |
| Blatt: größte Breite | 1056 px (66 rem) | 1056 px (66 rem) |
| Blattkopf | 16 px, Linie 2 px, Abstand 24 px | 16 px, Linie 2 px, Abstand 24 px |
| Nummer am Auftrag | 52 px, Ziffer 24 px | 52 px, Ziffer 24 px |
| Kleine Zeile · Titel · Marken | 16 px · 35,3 px · 16 px | 16 px · 35,3 px · 16 px |
| Fließtext | 18,7 px, Zeile 29 px | 18,7 px, Zeile 29 px |
| Titel des Deckblatts · Zentrale Frage | 52,3 px · 28,6 px | 52,3 px · 28,6 px |
| Abweichung | Titel in Bricolage Grotesque, fett · Register dreizeilig, glatt · Felder mit Rahmen | Titel in Fraunces, halbfett · Register zweizeilig auf altem Papier · Felder mit Linien |

**Prüfung** (`tools/pruef/ab_pruef.py`, Repository und entpacktes Paket):

| Prüfung | Ergebnis |
| --- | --- |
| 1180 × 820 · 820 × 1180 · 1280 × 720 · 1080 × 810 · 390 × 844, je 14 Seiten (Paket: 13), Auftrag 4 in sechs Zuständen, voller Beispielstand mit geprüften Erklärungen | kein waagerechter Überlauf |
| Schrift unter 16 px (auch in Schaubildern, wirksame Größe) | keine |
| Ziele unter 44 px | keine |
| Textkontrast unter 4,5 : 1 (große Schrift 3 : 1) | keiner; nicht messbar: Text auf Fotos und die helle Schrift auf dem dunklen Kreis des Rads (Hell auf Tinte, 13,1 : 1) |
| Übersicht bei 1180 × 820 · 1180 × 712 · 1150 × 700 · 1280 × 720 · 1440 × 900 | sechs Karten ohne Überlauf, Linien beginnen an den Karten, nach einem Tipp liegt die Bühne ganz im Bild |
| Übersicht bei offenem Panel (Erklärung C, F, B), dieselben Größen | der Satz unter dem Rad steht frei. **Befund:** Das wichtigste Feld der offenen Erklärung liegt bei C zu 87 % und bei F zu 50 % unter dem Panel (Fassung 4.1: 63 % und 29 %); bei A, B, D, E liegt es frei |
| Beamer 1280 × 720: Unterkante des ersten Knopfs | 607 px von 720 px |
| laufende Animationen nach dem Laden | 0 |
| Anfragen an fremde Server · Fehler in der Konsole | 0 · 0 |
| Stand nach Neuladen · sichern mit einem Tipp · löschen · laden · falsche Datei · Freigabe mit einem Tipp | bleibt · Datei mit 2 Schlüsseln, kein Fenster · wieder da · abgewiesen · offen |
| Druck A4 (ohne Hintergrunddruck): Deckblatt · Auftrag 7 getippt · Schreibblatt für den Stift · Zusammenfassung · Extra | 1 · 1 · 1 · 2 · 1 Seite; angesehen; frei bis zum Rand mindestens 12 mm |
| Paket für die Lernenden, entpackt | ohne Befund, kein Rest des Lehrkraftbereichs, alle Bilder laden |
| Erklärfilm (`tools/pruef/film_pruef.py`, 261 Zeitpunkte) | nichts unter 18 px, nichts außerhalb der sicheren Fläche, kein Text über Text, kein Kontrastfehler, alle 25 Sätze stehen lang genug; Daten wie im Blatt |

Nicht geprüft: Safari auf dem iPad, Stift und Tastatur, GoodNotes, VoiceOver, Zoom 200 %, Moodle selbst, axe-core, Taste und Impeccable; nichts davon im Unterricht.

## 13 · Offen

- **Übersicht in M22 unter 1150 px Breite:** Das Rad erscheint ab 1150 px (iPad 10 und 11 quer mit 1180 px, iPad Air, Beamer). Darunter wird die Übersicht zur Liste – auch auf älteren iPads mit 1080 px und im Hochformat.
- **Hochformat und ältere Safari-Fassungen:** Das Panel der Übersicht kommt dort von unten und ist am Fenster verankert. Ob das in Safari auf dem iPad so steht, lässt sich nur am Gerät sehen.
- **Offenes Panel in M22, Auftrag 4:** Das Panel verdeckt einen Teil des Rads; bei Browning und bei Bauman · Welzer endet die Linie unter dem Panel (Regel »Linien enden am Ziel« ist dort nicht erfüllt). Vorschlag V8 in `PILOT_M22.md`: Karten werden bei offenem Panel zu schmalen Kacheln, das Rad rückt daneben. Nicht gebaut, weil sich dabei Aussehen und Film ändern.
- **»Akte« oder »Erklärung«:** Auftrag 4 spricht von Erklärungen, Auftrag 5 und 6 sprechen noch von Akten (»Meinen Stand zeigen (Akte A)«). Vorschlag: überall »Erklärung«. Marios Wortlaut – deshalb nicht still geändert.
- Übertragung der gemeinsamen Schicht auf die Kerne der anderen Stunden (`src/m25-m27/blatt.css`, `src/weimar/`, `src/ost-west/`): dieselben Klassennamen, noch nicht eingesetzt.
- Hefter für Weimar und Ost-West; im Hefter Lernzettel, Ich-kann-Liste, Operatoren.
- Schreibblatt von Hand: eine Seite oder Vorder- und Rückseite.
- Nummern im Ost-West-Kapitel: Heftnummern im Reiter (»M36–39«).
- Rückblick nach zwei bis drei Wochen Unterricht: Welche Bewegung hat geholfen, etwas zu verstehen? Was nichts bringt, wird still gesetzt.
