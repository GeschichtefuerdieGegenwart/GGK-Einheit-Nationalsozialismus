/* GGK-Labor · Schaubilder zur NS-Ideologie (selbst gezeichnet, SVG).
   Modell: Die Pfeile sind eine Vereinfachung für den Unterricht, keine vollständige Darstellung. */
(function () {
  "use strict";
  var INK = "#1d2230", SOFT = "#545b6b", ACC = "#0e6b68", WARM = "#d9643f", LINE = "#cfc7ba";

  var BOX = {
    F: { x: 290, y: 18, w: 180, h: 48, t: "Führerprinzip" },
    V: { x: 280, y: 178, w: 200, h: 48, t: "Volksgemeinschaft" },
    A: { x: 14, y: 178, w: 196, h: 48, t: "Antisemitismus" },
    L: { x: 534, y: 178, w: 216, h: 48, t: "Lebensraum im Osten" },
    R: { x: 200, y: 352, w: 360, h: 52, t: "Rassismus" }
  };

  function box(b, strong) {
    return '<rect x="' + b.x + '" y="' + b.y + '" width="' + b.w + '" height="' + b.h + '" rx="12" fill="' + (strong ? "#d8ecea" : "#fff") + '" stroke="' + ACC + '" stroke-width="2.5"/>' +
      '<text x="' + (b.x + b.w / 2) + '" y="' + (b.y + b.h / 2 + 7) + '" text-anchor="middle" font-size="18.5" font-weight="700" fill="' + INK + '">' + b.t + "</text>";
  }
  function label(x, y, lines, anchor) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + (anchor || "start") + '" font-size="14" fill="' + INK + '">' +
      lines.map(function (l, i) { return '<tspan x="' + x + '" dy="' + (i ? 18 : 0) + '">' + l + "</tspan>"; }).join("") + "</text>";
  }
  function arrow(x1, y1, x2, y2, color, both) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + color + '" stroke-width="3" marker-end="url(#ah)"' + (both ? ' marker-start="url(#ah)"' : "") + "/>";
  }
  var DEFS = '<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="' + WARM + '"/></marker></defs>';

  /* voll: alle Zusammenhänge beschriftet · leer: nur ein Beispielpfeil, Rest selbst einzeichnen */
  function zusammenhang(mode) {
    var leer = mode === "leer";
    var s = '<svg viewBox="0 0 760 440" role="img" aria-label="Schaubild: Wie die fünf Säulen der NS-Ideologie zusammenhängen" font-family="-apple-system, Segoe UI, Roboto, Arial, sans-serif">' + DEFS;
    if (!leer) s += '<text x="380" y="430" text-anchor="middle" font-size="13.5" fill="' + SOFT + '">' + "Grundlage aller Säulen: die Einteilung der Menschen nach „Rasse“" + "</text>";
    // Pfeile
    s += arrow(300, 352, 150, 230, WARM);                     // R -> A (Beispiel)
    s += label(24, 286, ["erklärt Juden", "zur „Rasse“ und", "zum „Feind“"]);
    if (!leer) {
      s += arrow(380, 352, 380, 230, WARM);                   // R -> V
      s += label(370, 280, ["bestimmt, wer", "dazugehört", "(„deutsches Blut“)"], "end");
      s += arrow(460, 352, 620, 230, WARM);                   // R -> L
      s += label(598, 286, ["„Kampf der Rassen“", "um Boden"]);
      s += arrow(212, 202, 276, 202, WARM);                   // A -> V
      s += label(244, 166, ["schließt Juden aus"], "middle");
      s += arrow(380, 70, 380, 174, WARM, true);              // F <-> V
      s += label(392, 112, ["Der „Führer“ verkörpert", "angeblich den „Volkswillen“;", "alle müssen gehorchen"]);
    }
    s += box(BOX.F) + box(BOX.V) + box(BOX.A) + box(BOX.L) + box(BOX.R, true);
    if (leer) {
      s += '<text x="380" y="132" text-anchor="middle" font-size="14" fill="' + SOFT + '">Zeichne weitere Pfeile ein und beschrifte sie.</text>';
      s += '<text x="24" y="346" font-size="12.5" fill="' + SOFT + '">(Beispiel)</text>';
    }
    return s + "</svg>";
  }

  window.FIGUREN_NS = { zusammenhang: zusammenhang };
})();
