"""Zeichnet die drei Kacheln für M16, M17 und M18 (eigene Grafiken aus den Modulen, keine Fotos) als JPG nach media/.
M16: Wörter aus dem Humanismus-Text im Heft · M17: das leere Feld der Spielraum-Linie mit den vier Stationen · M18: das Schaubild der fünf Säulen (Modell).
Das Wichtige steht in der Mitte (822 × 381 von 900 × 600), weil Karte und Fenster das Bild verschieden beschneiden.
Braucht Python-Playwright mit Chromium. Aufruf: python3 tools/kacheln_m16_m18.py"""
import pathlib, tempfile
from playwright.sync_api import sync_playwright
R = pathlib.Path(__file__).resolve().parent.parent
GRUND, TINTE, LEISE, LINIE = '#D8D9DB', '#26292E', '#6B7077', '#A9ADB3'
KOPF = f"""<!doctype html><meta charset="utf-8"><style>
@font-face{{font-family:F;src:url(file://{R}/assets/fonts/Fraunces72pt-SemiBold.woff)}}
@font-face{{font-family:A;font-weight:700;src:url(file://{R}/assets/fonts/AtkinsonHyperlegible-Bold.woff2)}}
@font-face{{font-family:A;font-weight:400;src:url(file://{R}/assets/fonts/AtkinsonHyperlegible-Regular.woff2)}}
html,body{{margin:0}} svg{{display:block}} text{{font-family:A}} .f{{font-family:F}}
</style>"""
def svg(innen): return KOPF + f'<svg id="k" xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600"><rect width="900" height="600" fill="{GRUND}"/>{innen}</svg>'
# M16: acht Wörter aus dem Humanismus-Text (Heft M16)
W = [('Würde', 450, 312, 108, TINTE), ('Vernunft', 225, 196, 52, LEISE), ('Bildung', 462, 176, 44, TINTE), ('Freiheit', 705, 204, 68, TINTE), ('Toleranz', 158, 306, 44, LEISE),
     ('Solidarität', 742, 310, 44, LEISE), ('Verantwortung', 300, 418, 62, TINTE), ('Empathie', 700, 414, 54, LEISE)]
M16 = svg(''.join(f'<text class="f" x="{x}" y="{y}" font-size="{g}" text-anchor="middle" fill="{f}">{w}</text>' for w, x, y, g, f in W))
# M17: Feld der Spielraum-Linie – Skala 1 bis 5, vier Stationen, keine Linie (die zeichnen die Lernenden)
ST = [('1.4.1933', 210), ('7.4.1933', 400), ('15.9.1935', 590), ('9.11.1938', 780)]
gitter = ''.join(f'<line x1="130" x2="840" y1="{150 + i * 60}" y2="{150 + i * 60}" stroke="{LINIE}" stroke-width="2"/><text x="96" y="{159 + i * 60}" font-size="26" font-weight="700" fill="{TINTE}" text-anchor="middle">{5 - i}</text>' for i in range(5))
stationen = ''.join(f'<line x1="{x}" x2="{x}" y1="150" y2="390" stroke="{LEISE}" stroke-width="2" stroke-dasharray="5 9"/><circle cx="{x}" cy="390" r="8" fill="{GRUND}" stroke="{TINTE}" stroke-width="4"/><text x="{x}" y="440" font-size="24" font-weight="700" fill="{TINTE}" text-anchor="middle">{d}</text>' for d, x in ST)
M17 = svg(gitter + stationen)
# M18: Schaubild der fünf Säulen wie im Modul (assets/figuren-ns.js), ohne Beschriftung der Pfeile
def kasten(x, y, w, t, stark=False): return (f'<rect x="{x}" y="{y}" width="{w}" height="64" rx="10" fill="{"#C3C6CA" if stark else "#EEEFF0"}" stroke="{TINTE}" stroke-width="3"/>'
                                            f'<text x="{x + w / 2}" y="{y + 41}" font-size="25" font-weight="700" fill="{TINTE}" text-anchor="middle">{t}</text>')
def linie(x1, y1, x2, y2): return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{LEISE}" stroke-width="4"/>'
M18 = svg(linie(450, 194, 450, 268) + linie(330, 404, 170, 332) + linie(450, 404, 450, 332) + linie(570, 404, 730, 332)
          + kasten(330, 130, 240, 'Führerprinzip') + kasten(36, 268, 250, 'Antisemitismus') + kasten(306, 268, 288, 'Volksgemeinschaft') + kasten(614, 268, 250, 'Lebensraum') + kasten(250, 404, 400, 'Rassismus', True))
with sync_playwright() as p:
    b = p.chromium.launch(); q = b.new_page(viewport={'width': 900, 'height': 600})
    for name, html in (('m16-kachel-werte', M16), ('m17-kachel-spielraum', M17), ('m18-kachel-saeulen', M18)):
        with tempfile.NamedTemporaryFile('w', suffix='.html', delete=False, encoding='utf-8') as f: f.write(html)   # als Datei laden, damit die lokalen Schriften greifen
        q.goto('file://' + f.name); q.wait_for_timeout(400); pathlib.Path(f.name).unlink()
        q.locator('#k').screenshot(path=str(R / 'media' / f'{name}.jpg'), type='jpeg', quality=86); print('media/' + name + '.jpg')
    b.close()
