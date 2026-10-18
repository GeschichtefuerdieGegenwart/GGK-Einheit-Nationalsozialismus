/* Verzeichnis aller Bausteine des GGK-Labors – für die Startseite und die Kursauswertung der Lehrkraft.
   Neue Bausteine werden hier ergänzt. */
(function () {
  "use strict";
  var B = {};
  var SAEULEN = [["R", "Rassismus", "#0e6b68"], ["A", "Antisemitismus", "#d9643f"], ["V", "Volksgemeinschaft", "#b9871c"], ["F", "Führerprinzip", "#545b6b"], ["L", "Lebensraum im Osten", "#2f7d4a"]];

  B.m18 = {
    nr: "M18",
    titel: "Die fünf Säulen der NS-Ideologie",
    thema: "NS-Herrschaft · Quellen-Labor zu Ideologie",
    datei: "ns-ideologie.html",
    zeugnisse: [
      { t: "Parteiprogramm 1920, Punkt 4 („Kein Jude kann daher Volksgenosse sein“)", kern: ["V", "R", "A"] },
      { t: "Parteiprogramm 1920, Punkt 24 („Gemeinnutz geht vor Eigennutz“)", kern: ["V"] },
      { t: "Boykott-Plakat 1933 („Deutsche! Wehrt Euch! Kauft nicht bei Juden!“)", kern: ["A"] },
      { t: "Hitler vor Generälen 1933 („Eroberung neuen Lebensraums im Osten“)", kern: ["L"] },
      { t: "Eid der Soldaten 1934 („unbedingten Gehorsam“)", kern: ["F"] },
      { t: "Reichsbürgergesetz 1935 („deutschen oder artverwandten Blutes“)", kern: ["R", "V"] }
    ],
    vermutung: ["vor allem Angst", "vor allem überzeugt", "vor allem Vorteile", "mehrere Gründe"],
    /* Code: m18. (ältere Codes mit m19. werden in der Auswertung umgeschrieben) id.z1.z2.z3.z4.z5.z6.vermutung – z = Bitmaske der gewählten Säulen (R=1, A=2, V=4, F=8, L=16) */
    decode: function (parts) {
      if (parts.length !== 9) return null;
      var z = parts.slice(2, 8).map(Number);
      if (z.some(function (x) { return isNaN(x) || x < 0 || x > 31; })) return null;
      var v = +parts[8]; if (isNaN(v) || v < 0 || v > 3) return null;
      return { id: parts[1], z: z, v: v };
    },
    render: function (recs) {
      var self = this, n = recs.length;
      var main = '<p class="small" style="margin-top:0">Jede Zeile zeigt, wie viele Personen ein Denkmuster gewählt haben (eines oder zwei pro Person). <b>Fett</b> = trifft laut Auflösung den Kern.</p>';
      self.zeugnisse.forEach(function (z, i) {
        var counts = SAEULEN.map(function (s, k) { return recs.filter(function (r) { return r.z[i] & Math.pow(2, k); }).length; });
        /* „uneinig“: mehr als 30 % aller Wahlen fielen auf Säulen, die nicht den Kern treffen */
        var all = counts.reduce(function (a, c) { return a + c; }, 0), off = counts.reduce(function (a, c, k) { return a + (z.kern.indexOf(SAEULEN[k][0]) < 0 ? c : 0); }, 0);
        var spread = all && off / all > 0.3 ? 3 : 0;
        main += '<div style="margin:14px 0 6px"><b>' + (i + 1) + " · " + Lab.esc(z.t) + "</b>" + (spread >= 3 ? ' <span class="demo-flag">uneinig</span>' : "") + "</div>";
        SAEULEN.forEach(function (s, k) {
          var c = counts[k], w = n ? Math.round(c / n * 100) : 0, isK = z.kern.indexOf(s[0]) >= 0;
          main += '<div style="display:grid;grid-template-columns:190px 1fr 46px;gap:10px;align-items:center;font-size:16px;margin:3px 0">' +
            '<span style="' + (isK ? "font-weight:700" : "color:var(--ink-soft)") + '">' + s[1] + "</span>" +
            '<span style="background:var(--bg);border-radius:6px;height:18px;overflow:hidden"><span style="display:block;height:100%;width:' + w + "%;background:" + s[2] + ";opacity:" + (isK ? 1 : .55) + '"></span></span>' +
            '<span style="text-align:right;font-variant-numeric:tabular-nums">' + c + "</span></div>";
        });
      });
      var vc = [0, 0, 0, 0]; recs.forEach(function (r) { vc[r.v]++; });
      var rest = '<div class="card"><h3>Vermutungen zu Beginn</h3><p>Warum machten so viele mit oder sahen weg? ' + self.vermutung.map(function (t, i) { return t + ": <b>" + vc[i] + "</b>"; }).join(" · ") + "</p></div>";
      return { main: main, rest: rest };
    },
    befund: "Die Forschung betont: Die Ideologie allein erklärt nicht, warum so viele mitmachten oder wegsahen – auch Angst, Vorteile, Anpassung und Gruppendruck spielten eine Rolle. Die Ideologie lieferte aber die Begründungen, die Ausgrenzung und Entrechtung als „richtig“ erscheinen ließen. Ihre gemeinsame Grundlage war die Einteilung der Menschen nach „Rasse“.",
    fragen: [
      "Bei welchem Zeugnis war sich der Kurs am wenigsten einig? Lest es noch einmal genau: Welche Wörter sprechen für welche Säule?",
      "Welche Zeugnisse verbinden mehrere Säulen? Was sagt das über die Ideologie?",
      "Welche Säule kommt am häufigsten vor – und warum?",
      "Vergleicht mit den Vermutungen vom Anfang: Was erklärt die Ideologie – und was nicht?"
    ],
    beispiel: function () {
      /* klar gekennzeichnete Beispieldaten zum Ausprobieren */
      var rows = [[6, 4, 2, 16, 8, 5, 3], [5, 4, 6, 17, 8, 1, 3], [7, 12, 2, 16, 12, 5, 1], [4, 4, 3, 16, 8, 4, 3], [6, 8, 6, 1, 8, 5, 0], [2, 4, 2, 16, 4, 1, 3], [5, 6, 2, 16, 8, 5, 2]];
      return rows.map(function (r, i) { return ["m18", "bsp" + i].concat(r).join("."); });
    }
  };

  B.m19 = {
    nr: "M19",
    titel: "Appeasement-Politik – der Weg zum Frieden oder in den Zweiten Weltkrieg?",
    thema: "NS-Außenpolitik 1933–1939 · fünf Bausteine, drei Entscheidungen",
    datei: "appeasement.html"
  };

  B.m20 = {
    nr: "M20",
    titel: "Großbritannien im Zweiten Weltkrieg – drei Dilemmata",
    thema: "Mai 1940, Juli 1941, Februar 1944 · drei Entscheidungen mit geprüften Quellen",
    datei: "m20-dilemmata.html"
  };

  B.geplant = [];
  window.BAUSTEINE = B;
})();
