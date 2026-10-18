/* =====================================================================
   GGK-Labor · Bewegung (Verhalten). Gestaltung: assets/motion.css.
   Eigenständig, ohne Abhängigkeiten. Speichert nichts außer einem
   Sitzungsmerker für D (sessionStorage, mit try/catch).

   Prinzip: Elemente mit data-mk="<Muster>:<Schlüssel>" werden genau einmal
   bewegt, wenn sie neu erscheinen. Beim ersten Zeichnen nach dem Laden und
   nach Tastaturaktionen wird nichts bewegt – der Endzustand steht sofort da.
   ===================================================================== */
(function(){
  "use strict";
  var gespielt = new Set(), erstes = true, tastatur = false, letzteMarke = null;
  var weniger = function(){ return window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches; };

  // Tastatur oder Zeiger? Tastaturaktionen werden nicht animiert.
  var letzterSummary = null;
  document.addEventListener("pointerdown", function(e){ tastatur = false; letzterSummary = e.target.closest ? e.target.closest("summary") : null; }, true);
  document.addEventListener("keydown", function(e){ if(e.key === "Enter" || e.key === " ") tastatur = true; }, true);
  document.addEventListener("click", function(e){ if(e.detail === 0) tastatur = true; }, true);

  function abspielen(els, staffel){
    if(!els.length) return;
    els.forEach(function(el, i){
      el.classList.add("mv-von");
      if(staffel) el.style.transitionDelay = (weniger() ? 0 : i * staffel) + "ms";
    });
    void document.body.offsetWidth;            // Anfangszustand übernehmen
    requestAnimationFrame(function(){ requestAnimationFrame(function(){
      els.forEach(function(el){ el.classList.remove("mv-von"); });
      if(staffel) setTimeout(function(){ els.forEach(function(el){ el.style.transitionDelay = ""; }); }, 600 + els.length * staffel);
    }); });
  }

  /* L · „Du bist hier“ fährt weiter: FLIP zwischen zwei Seiten */
  function marke(ruhig){
    var m = document.querySelector(".zeitleiste .zl-hier");
    if(!m){ letzteMarke = null; return; }
    var zl = m.closest(".zeitleiste"), li = m.closest("li"), d = m.getAttribute("data-ml") || "";
    // aktuelle Station sichtbar machen, frühere Stationen links davon (ohne Bewegung)
    if(zl && li && zl.scrollWidth > zl.clientWidth) zl.scrollLeft = Math.max(0, li.offsetLeft - zl.offsetLeft - zl.clientWidth * .65);
    if(!ruhig && letzteMarke && letzteMarke !== d){
      var alt = zl.querySelector('li[data-d="' + letzteMarke + '"]');
      if(alt){
        var dx = alt.getBoundingClientRect().left - li.getBoundingClientRect().left;
        m.classList.add("mv-L");
        m.style.transition = "none";
        m.style.transform = "translateX(" + dx + "px)";
        void m.offsetWidth;
        requestAnimationFrame(function(){ requestAnimationFrame(function(){ m.style.transition = ""; m.style.transform = ""; }); });
      }
    }
    letzteMarke = d;
  }

  /* K · Lupe: Herkunft aufklappen */
  document.addEventListener("toggle", function(e){
    var d = e.target;
    if(!d.matches || !d.matches("details.herkunft") || !d.open) return;
    if(tastatur || weniger() || d.querySelector("summary") !== letzterSummary) return;
    letzterSummary = null;
    var hk = d.querySelector(".hk"); if(hk) abspielen([hk]);
  }, true);

  function spiele(wurzel){
    wurzel = wurzel || document;
    var neu = Array.prototype.filter.call(wurzel.querySelectorAll("[data-mk]"), function(el){ return !gespielt.has(el.getAttribute("data-mk")); });
    neu.forEach(function(el){ gespielt.add(el.getAttribute("data-mk")); });
    var ruhig = erstes || tastatur;
    erstes = false; tastatur = false;
    marke(ruhig);
    if(ruhig || !neu.length) return;
    // Haken (G), Schwärzung (H) und Textmarker (I) gestaffelt, alles andere zugleich
    var G = [], H = [], I = [], rest = [];
    neu.forEach(function(el){ var b = el.getAttribute("data-mk").charAt(0); (b === "G" ? G : b === "H" ? H : b === "I" ? I : rest).push(el); });
    abspielen(rest); abspielen(G, 40); abspielen(H, 70); abspielen(I, 90);
  }

  /* D · Reiter: einmal je Sitzung beim Öffnen der Startseite */
  function einmal(el, key){
    if(!el) return;
    var schon = false;
    try { schon = sessionStorage.getItem("ggk-bewegung:" + key) === "1"; sessionStorage.setItem("ggk-bewegung:" + key, "1"); } catch(e){ schon = true; }
    if(schon || weniger()) return;
    el.classList.add("mv-von"); void el.offsetWidth;
    setTimeout(function(){ el.classList.remove("mv-von"); }, 180);
  }

  window.Bewegung = { spiele: spiele, einmal: einmal };
})();
