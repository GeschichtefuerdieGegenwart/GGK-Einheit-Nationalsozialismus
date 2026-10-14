#!/usr/bin/env python3
"""Erzeugt die Orientierungskarten für M19 aus CShapes 2.0 (COW-Kodierung).

Daten: Schvitz, Rüegger, Girardin, Cederman, Weidmann, Gleditsch (2022):
Mapping the International System, 1886-2017: The CShapes 2.0 Dataset.
Journal of Conflict Resolution 66(1), 144-161. Lizenz CC BY-NC-SA 4.0.
Die erzeugten Karten stehen deshalb ebenfalls unter CC BY-NC-SA 4.0.

Aufruf: python3 tools/karten.py <pfad/cshapes_2_cow.topojson>  → assets/karten.js
"""
import json, math, sys

TOPO = sys.argv[1]
t = json.load(open(TOPO))
obj = list(t["objects"].values())[0]
ARCS = t["arcs"]
tr = t.get("transform")
if tr:  # quantisierte Bögen dekodieren
    sx, sy = tr["scale"]; tx, ty = tr["translate"]; dec = []
    for a in ARCS:
        x = y = 0; pts = []
        for dx, dy in a: x += dx; y += dy; pts.append((x*sx+tx, y*sy+ty))
        dec.append(pts)
    ARCS = dec

def arc(i):
    return ARCS[i] if i >= 0 else list(reversed(ARCS[~i]))
def ring(idx):
    pts = []
    for i in idx:
        a = arc(i); pts.extend(a if not pts else a[1:])
    return pts
def polys(g):
    if g["type"] == "Polygon": return [[ring(r) for r in g["arcs"]]]
    if g["type"] == "MultiPolygon": return [[ring(r) for r in p] for p in g["arcs"]]
    return []

def staat(code, datum):
    for g in obj["geometries"]:
        p = g["properties"]
        if p.get("cowcode") == code and p["start"] <= datum <= p["end"]:
            return polys(g)
    raise SystemExit(f"nicht gefunden: {code} {datum}")

# Lambert flächentreue Azimutalprojektion, Mitte 12° O / 50° N
L0, P0, R = math.radians(12), math.radians(50), 6371.0
def proj(lon, lat):
    l, p = math.radians(lon), math.radians(lat)
    k = math.sqrt(2/(1+math.sin(P0)*math.sin(p)+math.cos(P0)*math.cos(p)*math.cos(l-L0)))
    return R*k*math.cos(p)*math.sin(l-L0), -R*k*(math.cos(P0)*math.sin(p)-math.sin(P0)*math.cos(p)*math.cos(l-L0))

class Karte:
    def __init__(self, lon0, lat0, lon1, lat1, breite=900, tol=1.5):
        self.tol = tol
        xs, ys = [], []
        for lo in [lon0 + (lon1-lon0)*i/20 for i in range(21)]:
            for la in (lat0, lat1):
                x, y = proj(lo, la); xs.append(x); ys.append(y)
        for la in [lat0 + (lat1-lat0)*i/20 for i in range(21)]:
            for lo in (lon0, lon1):
                x, y = proj(lo, la); xs.append(x); ys.append(y)
        cx = (min(xs)+max(xs))/2; w = (max(xs)-min(xs))*0.86
        y0, y1 = min(ys)+ (max(ys)-min(ys))*0.04, max(ys)-(max(ys)-min(ys))*0.04
        self.x0 = cx - w/2; self.y0 = y0; self.s = breite / w
        self.W = breite; self.H = round((y1-y0)*self.s)
    def pt(self, lon, lat):
        x, y = proj(lon, lat); return (x-self.x0)*self.s, (y-self.y0)*self.s
    def km(self, d): return d*self.s
    def pfad(self, ps):
        out = []
        for poly in ps:
            for r in poly:
                pts = [self.pt(*c) for c in r]
                if not pts: continue
                xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
                if max(xs) < -50 or min(xs) > self.W+50 or max(ys) < -50 or min(ys) > self.H+50: continue
                keep = [pts[0]]
                for p in pts[1:]:
                    if abs(p[0]-keep[-1][0]) + abs(p[1]-keep[-1][1]) >= self.tol: keep.append(p)
                if len(keep) < 3: continue
                out.append("M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in keep) + "Z")
        return "".join(out)

STIL = """<style>
.k-meer{fill:#D7E3E6}.k-land{fill:#EFEAE1;stroke:#B9B1A5;stroke-width:.8;stroke-linejoin:round}
.k-dr{fill:#E3C3B8;stroke:#8E3B2A;stroke-width:1.6}.k-gb{fill:#C9DBD1;stroke:#2E5A47;stroke-width:1.4}
.k-cs{fill:#F6EBC9;stroke:#8C6717;stroke-width:1.8}.k-pl{fill:#EFEAE1;stroke:#625F59;stroke-width:1.2}
.k-lab{font:600 15px 'Atkinson Hyperlegible',Arial,sans-serif;fill:#3B3833}.k-labk{font:italic 400 13px 'Atkinson Hyperlegible',Arial,sans-serif;fill:#625F59}
.k-labg{font:700 17px 'Atkinson Hyperlegible',Arial,sans-serif;fill:#6E2A1C;letter-spacing:.04em}
.k-stadt{fill:#24221F}.k-st{font:400 13px 'Atkinson Hyperlegible',Arial,sans-serif;fill:#24221F}
.k-halo{paint-order:stroke;stroke:#FFFDF8;stroke-width:3.5px;stroke-linejoin:round}
.k-leg{font:400 13px 'Atkinson Hyperlegible',Arial,sans-serif;fill:#24221F}.k-legt{font:700 13px 'Atkinson Hyperlegible',Arial,sans-serif;fill:#24221F}
.k-mass{font:400 11px 'Atkinson Hyperlegible',Arial,sans-serif;fill:#3B3833}
</style>"""

def muster(id, farbe, hinter="none", winkel=45, breite=4, abstand=9):
    return f'<pattern id="{id}" width="{abstand}" height="{abstand}" patternUnits="userSpaceOnUse" patternTransform="rotate({winkel})"><rect width="{abstand}" height="{abstand}" fill="{hinter}"/><rect width="{breite}" height="{abstand}" fill="{farbe}"/></pattern>'

def stadt(k, name, lon, lat, dx=7, dy=4, anker="start", haupt=False):
    x, y = k.pt(lon, lat)
    sym = f'<rect x="{x-4:.1f}" y="{y-4:.1f}" width="8" height="8" class="k-stadt"/>' if haupt else f'<circle cx="{x:.1f}" cy="{y:.1f}" r="3.4" class="k-stadt"/>'
    return sym + f'<text x="{x+dx:.1f}" y="{y+dy:.1f}" text-anchor="{anker}" class="k-st k-halo">{name}</text>'
def text(k, t, lon, lat, kl="lab", anker="middle"):
    x, y = k.pt(lon, lat); return f'<text x="{x:.1f}" y="{y:.1f}" text-anchor="{anker}" class="k-{kl} k-halo">{t}</text>'
def massstab(k, km=200):
    x0, y0 = 26, k.H-24; w = k.km(km)
    return f'<g><rect x="{x0-10}" y="{y0-12}" width="{w+66}" height="24" rx="4" fill="#FFFDF8" opacity=".85"/><path d="M{x0} {y0}h{w:.1f}" stroke="#24221F" stroke-width="2"/><path d="M{x0} {y0-4}v8M{x0+w:.1f} {y0-4}v8M{x0+w/2:.1f} {y0-3}v6" stroke="#24221F" stroke-width="1.5"/><text x="{x0+w+12:.1f}" y="{y0+4}" class="k-mass">{km} km</text></g>'
def legende(k, eintraege, x=None, y=12):
    breite = 18 + max(len(t) for _, t in eintraege)*6.6 + 16
    x = k.W - breite - 12 if x is None else x
    h = 26 + 22*len(eintraege)
    out = f'<g><rect x="{x}" y="{y}" width="{breite:.0f}" height="{h}" rx="6" fill="#FFFDF8" stroke="#B9B1A5" opacity=".94"/><text x="{x+10}" y="{y+18}" class="k-legt">Legende</text>'
    for i, (fill, t) in enumerate(eintraege):
        yy = y + 30 + i*22
        if fill.startswith("linie:"):
            out += f'<path d="M{x+10} {yy-3}h16" stroke="{fill[6:]}" stroke-width="1.6" stroke-dasharray="5 3"/><text x="{x+32}" y="{yy+1}" class="k-leg">{t}</text>'
        else:
            out += f'<rect x="{x+10}" y="{yy-10}" width="16" height="13" fill="{fill}" stroke="#625F59" stroke-width=".8"/><text x="{x+32}" y="{yy+1}" class="k-leg">{t}</text>'
    return out + "</g>"

def svg(k, inhalt, titel, beschreibung, defs=""):
    return (f'<svg viewBox="0 0 {k.W} {k.H}" role="img" aria-labelledby="kt kd" xmlns="http://www.w3.org/2000/svg">'
            f'<title id="kt">{titel}</title><desc id="kd">{beschreibung}</desc>{STIL}<defs>{defs}</defs>'
            f'<rect width="{k.W}" height="{k.H}" class="k-meer"/>{inhalt}</svg>')

def nachbarn(k, datum, ohne=()):
    out = ""
    for g in obj["geometries"]:
        p = g["properties"]
        if p["start"] <= datum <= p["end"] and p.get("cowcode") not in ohne:
            d = k.pfad(polys(g))
            if d: out += f'<path d="{d}" class="k-land"/>'
    return out

# Rhein (Oberrhein bis zur niederländischen Grenze), vereinfacht
RHEIN = [(7.59,47.56),(7.56,47.83),(7.58,48.03),(7.70,48.33),(7.81,48.57),(8.02,48.80),(8.18,48.97),(8.31,49.04),(8.44,49.32),(8.46,49.49),(8.37,49.63),(8.36,49.86),(8.28,50.00),(8.05,50.00),(7.90,49.97),(7.80,50.04),(7.71,50.15),(7.60,50.36),(7.40,50.44),(7.23,50.58),(7.11,50.74),(6.97,50.94),(6.77,51.23),(6.73,51.43),(6.62,51.66),(6.25,51.83),(6.12,51.86)]
def zone_maske(k, id):
    """Maske der Zone: alles links des Rheins plus 50-km-Puffer um den Fluss (Strich mit 100 km Breite)."""
    westen = [(lon, lat) for lon, lat in RHEIN] + [(RHEIN[-1][0], 53.5), (-2, 53.5), (-2, 47.0), (RHEIN[0][0], 47.0)]
    d = "M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in (k.pt(*c) for c in westen)) + "Z"
    fluss = "M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in (k.pt(*c) for c in RHEIN))
    return f'<mask id="{id}" maskUnits="userSpaceOnUse" x="0" y="0" width="{k.W}" height="{k.H}"><rect width="{k.W}" height="{k.H}" fill="black"/><path d="{d}" fill="white"/><path d="{fluss}" fill="none" stroke="white" stroke-width="{k.km(100):.1f}" stroke-linecap="round" stroke-linejoin="round"/></mask>'
def zone_clip(k):
    """Entmilitarisierte Zone nach Art. 42–43 Versailler Vertrag: links des Rheins und 50 km rechts davon."""
    ost = []
    for lon, lat in RHEIN:
        ost.append((lon + 50/(111.32*math.cos(math.radians(lat))), lat))
    ost = [(ost[0][0], 47.0)] + ost + [(ost[-1][0]+0.2, 53.5)]
    ring = ost + [(-2, 53.5), (-2, 47.0)]
    return "M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in (k.pt(*c) for c in ring)) + "Z"
def rhein(k):
    return '<path d="M' + "L".join(f"{x:.1f} {y:.1f}" for x, y in (k.pt(*c) for c in RHEIN)) + '" fill="none" stroke="#5B8FA3" stroke-width="2.4" stroke-linejoin="round"/>'

QUELLE = "Kartengrundlage: CShapes 2.0 (Schvitz u. a. 2022), CC BY-NC-SA 4.0"
KARTEN = {}

# 1) Europa im März 1936
k = Karte(-10.5, 41.5, 31, 60.5, tol=2.4)
D = "1936-03-07"
de = staat(255, D)
inh = nachbarn(k, D, ohne=(255, 200))
inh += f'<path d="{k.pfad(staat(200, D))}" class="k-gb"/>'
inh += f'<path d="{k.pfad(de)}" class="k-dr"/>'
inh += zone_maske(k,"eu-zone") + f'<path d="{k.pfad(de)}" fill="url(#eu-sch)" mask="url(#eu-zone)"/>'
inh += text(k,"GROSSBRITANNIEN",-2.2,53.3,"labg") + text(k,"DEUTSCHES REICH",11.2,52.0,"labg")
for t,lo,la in [("Frankreich",2.4,46.6),("Italien",12.6,43.2),("Polen",19.6,52.3),("Tschecho-",16.4,49.75),("slowakei",16.6,49.33),("Österreich",14.4,47.45),("Ungarn",19.2,46.9),("Spanien",-3.8,42.4),("Sowjetunion",28.5,55.5),("Belgien",4.1,50.45),("Niederlande",5.6,52.55),("Schweiz",8.0,46.75),("Jugoslawien",19.6,44.3),("Rumänien",25.0,46.3),("Dänemark",9.3,56.2),("Schweden",15.3,59.3),("Irland",-8.0,53.1),("Litauen",24.0,55.5)]:
    inh += text(k,t,lo,la)
inh += text(k,"Nordsee",3.2,55.6,"labk") + text(k,"Ostsee",18.2,55.5,"labk") + text(k,"Ärmelkanal",-1.5,50.1,"labk") + text(k,"Atlantik",-7.5,47.5,"labk")
for n,lo,la,dx,dy,a,h in [("London",-0.13,51.5,8,-6,"start",True),("Paris",2.35,48.86,7,13,"start",True),("Berlin",13.4,52.52,8,4,"start",True),("Warschau",21.0,52.23,8,4,"start",True),("Prag",14.42,50.08,8,-6,"start",True),("Wien",16.37,48.21,8,13,"start",True),("Rom",12.5,41.9,8,4,"start",True),("Köln",6.96,50.94,-8,4,"end",False)]:
    inh += stadt(k,n,lo,la,dx,dy,a,h)
inh += legende(k,[("#C9DBD1","Großbritannien"),("#E3C3B8","Deutsches Reich (Grenzen 1936)"),("url(#eu-sch)","entmilitarisierte Zone (Rheinland)")], x=k.W-300, y=k.H-108)
inh += massstab(k, 400)
KARTEN["europa1936"] = svg(k, inh, "Europa im März 1936", "Politische Karte Europas im März 1936. Großbritannien liegt im Nordwesten, durch den Ärmelkanal vom Festland getrennt. Östlich davon Frankreich, Belgien und die Niederlande, dann das Deutsche Reich. Das Rheinland im Westen Deutschlands ist als entmilitarisierte Zone schraffiert. Von London bis Köln sind es rund 500 Kilometer.",
    muster("eu-sch","#8E3B2A","#F3E3DD"))

# 2) Rheinland 1936
k = Karte(1.8, 47.2, 13.2, 53.6)
inh = nachbarn(k, D, ohne=(255,))
inh += f'<path d="{k.pfad(de)}" class="k-dr"/>'
inh += zone_maske(k,"rh-zone") + f'<path d="{k.pfad(de)}" fill="url(#rh-sch)" mask="url(#rh-zone)"/>'
inh += rhein(k)
inh += text(k,"DEUTSCHES REICH",11.0,51.7,"labg")
for t,lo,la in [("Frankreich",3.6,48.3),("Belgien",4.5,50.6),("Niederlande",5.3,52.5),("Luxemburg",5.9,49.45),("Schweiz",8.3,47.38),("Dänemark",9.6,54.95)]:
    inh += text(k,t,lo,la)
inh += text(k,"Nordsee",5.5,53.45,"labk") + text(k,"Rhein",7.25,50.53,"labk","end")
for n,lo,la,dx,dy,a,h in [("Berlin",13.4,52.52,-8,4,"end",True),("Paris",2.35,48.86,8,4,"start",True),("Brüssel",4.35,50.85,8,4,"start",True),("Köln",6.96,50.94,-8,4,"end",False),("Düsseldorf",6.77,51.23,-8,4,"end",False),("Koblenz",7.6,50.36,8,12,"start",False),("Mainz",8.27,50.0,-8,13,"end",False),("Frankfurt",8.68,50.11,8,4,"start",False),("Saarbrücken",6.99,49.23,-8,4,"end",False),("Karlsruhe",8.4,49.0,8,4,"start",False),("Straßburg",7.75,48.58,-8,4,"end",False),("Münster",7.63,51.96,8,4,"start",False)]:
    inh += stadt(k,n,lo,la,dx,dy,a,h)
inh += legende(k,[("#E3C3B8","Deutsches Reich (1936)"),("url(#rh-sch)","entmilitarisierte Zone"),("#5B8FA3","Rhein")], x=k.W-268, y=k.H-110)
inh += massstab(k, 100)
KARTEN["rheinland"] = svg(k, inh, "Das entmilitarisierte Rheinland 1936", "Karte Westdeutschlands und seiner Nachbarn 1936. Schraffiert ist die entmilitarisierte Zone: alles deutsche Gebiet links des Rheins und ein 50 Kilometer breiter Streifen rechts des Rheins, mit Städten wie Köln, Düsseldorf, Koblenz, Mainz, Frankfurt und Saarbrücken. Die Zone grenzt an die Niederlande, Belgien, Luxemburg und Frankreich.",
    muster("rh-sch","#8E3B2A","#F3E3DD"))

# 3) Mitteleuropa nach dem „Anschluss“ (Mitte März 1938)
k = Karte(5.5, 45.4, 25.5, 55.4, tol=2.0)
D = "1938-03-20"
de = staat(255, D); at = staat(305, "1938-01-01"); cs = staat(315, D)
inh = nachbarn(k, D, ohne=(255,315))
inh += f'<path d="{k.pfad(de)}" class="k-dr"/>'
inh += f'<clipPath id="m38-at"><path d="{k.pfad(at)}"/></clipPath><path d="{k.pfad(de)}" fill="url(#m38-sch)" clip-path="url(#m38-at)"/>'
inh += f'<path d="{k.pfad(at)}" fill="none" stroke="#8E3B2A" stroke-width="1.2" stroke-dasharray="5 4"/>'
inh += f'<path d="{k.pfad(cs)}" class="k-cs"/>'
inh += text(k,"DEUTSCHES REICH",10.8,52.0,"labg") + text(k,"ehemals Österreich",14.2,47.35,"lab")
inh += text(k,"TSCHECHOSLOWAKEI",17.6,49.25,"labg")
for t,lo,la in [("Polen",20.6,52.6),("Ungarn",19.4,46.75),("Italien",11.8,45.9),("Schweiz",8.2,46.75),("Jugoslawien",16.6,45.75),("Rumänien",23.8,46.6),("Litauen",23.8,55.0),("Sowjetunion",25.0,53.4)]:
    inh += text(k,t,lo,la)
inh += text(k,"Ostsee",15.2,54.9,"labk")
for n,lo,la,dx,dy,a,h in [("Berlin",13.4,52.52,8,4,"start",True),("Wien",16.37,48.21,8,13,"start",False),("Prag",14.42,50.08,8,4,"start",True),("Warschau",21.0,52.23,8,4,"start",True),("Budapest",19.04,47.5,8,4,"start",True),("Danzig",18.65,54.35,8,4,"start",False),("München",11.58,48.14,-8,4,"end",False),("Dresden",13.74,51.05,-8,4,"end",False)]:
    inh += stadt(k,n,lo,la,dx,dy,a,h)
inh += legende(k,[("#E3C3B8","Deutsches Reich"),("url(#m38-sch)","Österreich, angegliedert 13. März 1938"),("#F6EBC9","Tschechoslowakei")], x=12, y=12)
inh += massstab(k, 200).replace('x="14"','x="14"')
KARTEN["lage1938"] = svg(k, inh, "Mitteleuropa nach dem „Anschluss“, März 1938", "Karte Mitteleuropas im März 1938. Das Deutsche Reich hat Österreich angegliedert. Die Tschechoslowakei ist nun im Norden, Westen und Süden von deutschem Gebiet umgeben. Im Osten grenzt sie an Polen, Rumänien und Ungarn.",
    muster("m38-sch","#8E3B2A","#F3E3DD"))

# 4) Mitteleuropa Mitte März 1939
D = "1939-03-20"
de = staat(255, D); cs18 = staat(315, "1938-01-01"); csb = staat(315, D)
inh = nachbarn(k, D, ohne=(255,315))
inh += f'<path d="{k.pfad(de)}" class="k-dr"/>'
inh += f'<clipPath id="m39-at"><path d="{k.pfad(at)}"/></clipPath><path d="{k.pfad(de)}" fill="url(#m39-at-s)" clip-path="url(#m39-at)"/>'
inh += f'<clipPath id="m39-cs"><path d="{k.pfad(cs18)}"/></clipPath><path d="{k.pfad(de)}" fill="url(#m39-su)" clip-path="url(#m39-cs)"/>'
ku = "M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in (k.pt(*c) for c in [(22.57,49.6),(22.57,49.08),(22.15,48.40),(22.0,47.5),(5,47.5),(5,51.5),(22.57,51.5)])) + "Z"
inh += f'<clipPath id="m39-ku"><path d="{ku}"/></clipPath><path d="{k.pfad(csb)}" fill="url(#m39-pr)" stroke="#8E3B2A" stroke-width="1.6" clip-path="url(#m39-ku)"/>'
ko = "M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in (k.pt(*c) for c in [(22.57,49.6),(22.57,49.08),(22.15,48.40),(22.0,47.5),(26,47.5),(26,49.6)])) + "Z"
inh += f'<clipPath id="m39-ko"><path d="{ko}"/></clipPath><path d="{k.pfad(csb)}" class="k-land" clip-path="url(#m39-ko)"/>'
inh += text(k,"Karpato-Ukraine:",23.3,48.72,"labk") + text(k,"an Ungarn",23.3,48.5,"labk")
inh += f'<path d="{k.pfad(staat(291,"1936-01-01"))}" class="k-land" stroke="#625F59" stroke-dasharray="3 2"/>'
inh += f'<path d="{k.pfad(cs18)}" fill="none" stroke="#8C6717" stroke-width="1.4" stroke-dasharray="6 4"/>'
inh += text(k,"DEUTSCHES REICH",10.8,52.0,"labg")
inh += text(k,"Böhmen und Mähren",15.4,49.55,"lab") + text(k,"Slowakei",19.4,48.75,"lab") + text(k,"ehem. Österreich",14.3,47.3,"labk") + text(k,"Sudetengebiet",13.3,50.62,"labk")
for t,lo,la in [("Polen",20.6,52.6),("Ungarn",19.4,46.75),("Italien",11.8,45.9),("Schweiz",8.2,46.75),("Jugoslawien",16.6,45.75),("Rumänien",23.8,46.6),("Litauen",23.8,55.0),("Sowjetunion",25.0,53.4)]:
    inh += text(k,t,lo,la)
inh += text(k,"Ostsee",15.2,54.9,"labk")
for n,lo,la,dx,dy,a,h in [("Berlin",13.4,52.52,8,4,"start",True),("Wien",16.37,48.21,-8,4,"end",False),("Prag",14.42,50.08,8,4,"start",False),("Warschau",21.0,52.23,8,4,"start",True),("Budapest",19.04,47.5,8,4,"start",True),("Danzig",18.65,54.35,8,4,"start",False),("Pressburg",17.11,48.15,8,14,"start",False)]:
    inh += stadt(k,n,lo,la,dx,dy,a,h)
inh += legende(k,[("#E3C3B8","Deutsches Reich"),("url(#m39-at-s)","Österreich (seit März 1938)"),("url(#m39-su)","Sudetengebiet (seit Oktober 1938)"),("url(#m39-pr)","seit 15. März 1939 besetzt bzw. abhängig"),("linie:#8C6717","Grenze der Tschechoslowakei bis 1938"),("#EFEAE1","Freie Stadt Danzig (Völkerbund)")], x=12, y=12)
inh += massstab(k, 200)
KARTEN["lage1939"] = svg(k, inh, "Mitteleuropa Mitte März 1939", "Karte Mitteleuropas Mitte März 1939. Das Deutsche Reich umfasst nun auch Österreich und das Sudetengebiet. Böhmen und Mähren sind seit dem 15. März besetzt, die Slowakei ist ein von Deutschland abhängiger Staat. Gestrichelt ist die frühere Grenze der Tschechoslowakei. Polen grenzt nun im Westen, Norden und Süden an deutsches oder deutsch kontrolliertes Gebiet.",
    muster("m39-at-s","#8E3B2A","#F3E3DD",45,3,8)+muster("m39-su","#8E3B2A","#F3E3DD",-45,3,8)+muster("m39-pr","#8E3B2A","#F6EBC9",0,3,7))

js = "/* Orientierungskarten M19 – erzeugt mit tools/karten.py. " + QUELLE + ". Diese Karten: CC BY-NC-SA 4.0. */\nwindow.KARTEN_SVG = " + json.dumps(KARTEN, ensure_ascii=False) + ";\n"
open("assets/karten.js", "w").write(js)
print({k: len(v) for k, v in KARTEN.items()})
