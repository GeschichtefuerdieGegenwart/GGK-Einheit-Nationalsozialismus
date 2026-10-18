#!/usr/bin/env python3
"""Orientierungskarten für M20 (Zweiter Weltkrieg – drei Dilemmata).

Grundlage wie bei M19: CShapes 2.0 (COW-Kodierung), CC BY-NC-SA 4.0.
Die Einfärbung (besetzt, verbündet, neutral …) ist eine eigene Zuordnung
zum jeweiligen Stichtag und steht in der Legende immer als Wort.
Frontverläufe sind nicht eingezeichnet, weil der Datensatz sie nicht enthält.

Aufruf: python3 tools/karten_m20.py <pfad/cshapes_2_cow.topojson> → assets/karten-m20.js
"""
import json, sys, pathlib

# Grundfunktionen aus tools/karten.py übernehmen (Projektion, Zeichnen, Legende)
basis = (pathlib.Path(__file__).parent / "karten.py").read_text(encoding="utf-8").split("# 1) Europa im März 1936")[0]
exec(basis)

FARBE = {
    "dr":   ("#E3C3B8", "Deutsches Reich"),
    "bes":  ("url(#{p}-bes)", "von Deutschland besetzt oder abhängig"),
    "kampf":("url(#{p}-kampf)", "Kämpfe (Mai 1940)"),
    "verb": ("#EAD9A6", "mit Deutschland verbündet"),
    "gb":   ("#C9DBD1", "Großbritannien"),
    "su":   ("#D5DDE8", "Sowjetunion"),
}

def karte_m20(p, k, datum, zuordnung, titel, beschreibung, beschriftung, staedte, legende_eintraege, legende_pos=None, extra=""):
    inh = nachbarn(k, datum, ohne=tuple(zuordnung.keys()))
    for code, kat in zuordnung.items():
        fill = FARBE[kat][0].format(p=p)
        stroke = {"dr": "#8E3B2A", "gb": "#2E5A47", "su": "#3E5878"}.get(kat, "#625F59")
        d = k.pfad(staat(code, datum))
        if d:
            inh += f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="1.1" stroke-linejoin="round"/>'
    inh += extra
    for t, lo, la, kl in beschriftung:
        inh += text(k, t, lo, la, kl)
    for n, lo, la, dx, dy, a, h in staedte:
        inh += stadt(k, n, lo, la, dx, dy, a, h)
    lx, ly = legende_pos or (12, 12)
    inh += legende(k, [(FARBE[x][0].format(p=p), FARBE[x][1]) if isinstance(x, str) else x for x in legende_eintraege], x=lx, y=ly)
    inh += massstab(k, 400)
    defs = muster(f"{p}-bes", "#8E3B2A", "#F3E3DD", 45, 3, 8) + muster(f"{p}-kampf", "#8C6717", "#F6EBC9", -45, 3, 8)
    return svg(k, inh, titel, beschreibung, defs)

KM = {}

# Dilemma 1 · 26. Mai 1940
k = Karte(-11, 40.5, 31, 62, tol=2.4)
KM["europa1940"] = karte_m20("k40", k, "1940-05-26",
    {255: "dr", 315: "bes", 290: "bes", 390: "bes", 385: "bes", 212: "bes", 210: "bes", 211: "kampf", 220: "kampf", 200: "gb", 325: "verb", 365: "su"},
    "Europa am 26. Mai 1940",
    "Karte Europas am 26. Mai 1940. Das Deutsche Reich hat Polen, Dänemark, Norwegen, Luxemburg und die Niederlande besetzt; Böhmen und Mähren sind besetzt, die Slowakei ist abhängig. In Belgien und Frankreich wird gekämpft, deutsche Truppen haben den Ärmelkanal erreicht. Großbritannien liegt jenseits des Kanals. Italien ist mit Deutschland verbündet, aber noch nicht im Krieg. Die Sowjetunion hat mit Deutschland einen Nichtangriffspakt.",
    [("GROSSBRITANNIEN",-2.3,53.6,"labg"),("DEUTSCHES REICH",11.2,52.0,"labg"),("Frankreich",2.3,46.8,"lab"),("Belgien",5.0,50.35,"lab"),("Niederlande",5.6,52.6,"lab"),
     ("Dänemark",9.3,56.0,"lab"),("Norwegen",9.0,61.0,"lab"),("Polen: Westen deutsch,",20.4,52.5,"lab"),("Osten sowjetisch besetzt",20.4,52.0,"lab"),("Italien",9.6,43.9,"lab"),("(noch nicht im Krieg)",9.6,43.4,"labk"),("Sowjetunion",28.6,55.6,"lab"),
     ("Schweden",15.2,60.6,"lab"),("Schweiz",8.1,46.75,"lab"),("Irland",-8.0,53.2,"lab"),("Ungarn",19.2,47.0,"lab"),("Rumänien",25.0,46.3,"lab"),("Jugoslawien",19.0,44.2,"lab"),
     ("Ärmelkanal",-1.6,50.0,"labk"),("Nordsee",3.2,55.6,"labk"),("Atlantik",-8.0,47.5,"labk")],
    [("London",-0.13,51.5,8,-6,"start",True),("Dünkirchen",2.38,51.03,8,13,"start",False),("Paris",2.35,48.86,8,13,"start",True),("Berlin",13.4,52.52,8,4,"start",True),("Rom",12.5,41.9,8,4,"start",True),("Rotterdam",4.48,51.92,8,14,"start",False)],
    ["dr","bes","kampf","gb","verb","su"], legende_pos=(k.W-330, k.H-176))

# Dilemma 2 · Anfang Juli 1941
k = Karte(-11, 40.5, 42, 63, tol=2.6)
KM["europa1941"] = karte_m20("k41", k, "1941-07-05",
    {255: "dr", 315: "bes", 290: "bes", 390: "bes", 385: "bes", 212: "bes", 210: "bes", 211: "bes", 220: "bes", 345: "bes", 350: "bes",
     200: "gb", 325: "verb", 310: "verb", 360: "verb", 355: "verb", 375: "verb", 365: "su"},
    "Europa Anfang Juli 1941",
    "Karte Europas Anfang Juli 1941. Das Deutsche Reich beherrscht große Teile des Kontinents: Polen, Dänemark, Norwegen, die Benelux-Staaten, Nordfrankreich, Jugoslawien und Griechenland sind besetzt. Italien, Ungarn, Rumänien, Bulgarien und Finnland sind mit Deutschland verbündet. Seit dem 22. Juni 1941 greift Deutschland die Sowjetunion an. Großbritannien kämpft seit einem Jahr ohne Verbündete auf dem Kontinent.",
    [("GROSSBRITANNIEN",-2.0,55.4,"labg"),("DEUTSCHES REICH",11.0,52.0,"labg"),("SOWJETUNION",34.0,55.0,"labg"),("seit 22. Juni 1941 angegriffen",33.5,53.9,"labk"),
     ("Frankreich: Norden besetzt,",2.2,48.2,"lab"),("Süden Vichy-Regime",2.2,47.6,"lab"),("Italien",12.6,43.0,"lab"),("Finnland",26.0,62.4,"lab"),("Schweden",15.2,60.6,"lab"),("Spanien",-3.8,40.9,"lab"),
     ("Ungarn",19.2,47.0,"lab"),("Rumänien",25.0,46.0,"lab"),("Bulgarien",25.2,42.8,"lab"),("Jugoslawien",18.5,44.2,"lab"),("Polen",19.8,52.0,"lab"),("Norwegen",9.0,61.0,"lab"),("Türkei",31.0,41.0,"lab"),("Irland",-8.0,53.2,"lab")],
    [("London",-0.13,51.5,8,-6,"start",True),("Berlin",13.4,52.52,8,4,"start",True),("Moskau",37.62,55.75,8,4,"start",True),("Leningrad",30.32,59.94,8,4,"start",False),("Murmansk",33.08,68.97,8,4,"start",False),("Vichy",3.43,46.13,8,13,"start",False)],
    ["dr","bes","gb","verb","su"], legende_pos=(12, 12))

# Dilemma 3 · Februar 1944
k = Karte(-7.5, 47.2, 20.5, 58.6, tol=1.8)
ziele = [("London",-0.13,51.5,"1940/41",13,"start",0),("Coventry",-1.51,52.41,"Nov. 1940",13,"start",0),("Lübeck",10.69,53.87,"März 1942",-13,"end",-20),("Rostock",12.10,54.09,"Apr. 1942",13,"start",0),("Köln",6.96,50.94,"Mai 1942",13,"start",0),("Hamburg",9.99,53.55,"Juli 1943",-13,"end",14),("Berlin",13.40,52.52,"seit Nov. 1943",13,"start",0)]
extra = ""
for n, lo, la, wann, dx, an, dy in ziele:
    x, y = k.pt(lo, la)
    extra += f'<circle cx="{x:.1f}" cy="{y:.1f}" r="9" fill="none" stroke="#24221F" stroke-width="2"/><circle cx="{x:.1f}" cy="{y:.1f}" r="3.4" fill="#24221F"/>'
    extra += f'<text x="{x+dx:.1f}" y="{y-2+dy:.1f}" text-anchor="{an}" class="k-st k-halo">{n}</text><text x="{x+dx:.1f}" y="{y+13+dy:.1f}" text-anchor="{an}" class="k-labk k-halo">{wann}</text>'
KM["luftkrieg1944"] = karte_m20("k44", k, "1944-02-09",
    {255: "dr", 315: "bes", 290: "bes", 390: "bes", 385: "bes", 212: "bes", 210: "bes", 211: "bes", 220: "bes", 200: "gb"},
    "Luftkrieg: Städte, die vor Februar 1944 schwer bombardiert wurden",
    "Karte von Großbritannien und Mitteleuropa im Februar 1944. Markiert sind Städte, die vor diesem Zeitpunkt schwer bombardiert wurden: London 1940/41 und Coventry im November 1940 durch die deutsche Luftwaffe; Lübeck im März 1942, Rostock im April 1942, Köln im Mai 1942, Hamburg im Juli 1943 und Berlin seit November 1943 durch britische Bomber. Von London nach Berlin sind es rund 900 Kilometer.",
    [("GROSSBRITANNIEN",-2.6,54.6,"labg"),("DEUTSCHES REICH",11.5,51.0,"labg"),("Frankreich (besetzt)",3.6,48.7,"lab"),("Niederlande",5.6,52.75,"lab"),("Belgien",4.3,50.45,"lab"),("Dänemark",9.3,56.1,"lab"),("Schweden",14.6,57.7,"lab"),("Schweiz",8.1,47.3,"lab"),("Polen",19.0,52.0,"lab"),("Nordsee",3.2,55.6,"labk"),("Ostsee",16.0,55.3,"labk")],
    [],
    ["dr","bes","gb",("none","◎ schwer bombardierte Stadt (mit Zeitpunkt)")], legende_pos=(k.W-330, k.H-150), extra=extra)

js = "/* Orientierungskarten M20 – erzeugt mit tools/karten_m20.py. " + QUELLE + ". Einfärbung: eigene Zuordnung zum Stichtag. Diese Karten: CC BY-NC-SA 4.0. */\nwindow.KARTEN_SVG = Object.assign(window.KARTEN_SVG || {}, " + json.dumps(KM, ensure_ascii=False) + ");\n"
pathlib.Path("assets/karten-m20.js").write_text(js, encoding="utf-8")
print({k: len(v) for k, v in KM.items()})
