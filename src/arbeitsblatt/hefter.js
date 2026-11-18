/* ===== Arbeitsblatt Geschichte · die Hefter · Quelle: src/arbeitsblatt/hefter.js – nur dort ändern =====
   Je Einheit: Name, Startdatei, Muster der Speicherschlüssel und die Blätter in der Reihenfolge des Hefts.
   Titel wie auf der Startseite (tools/bau_startseite.py). Weimar und Ost-West kommen mit der Übertragung dazu. */
window.GGK_HEFTER = {
  ns: {
    name: "Nationalsozialismus", start: "hefter-nationalsozialismus.html",
    frage: "Was macht den Menschen zum Menschen?", frageOrt: "Mit dieser Frage beginnt die Einheit in M16.",
    schluessel: "^(ggk-m(1[6-9]|2[0-7])[-:]|ggklabor:|ggk-hefter-ns:)",
    blaetter: [
      { nr: "M16", titel: "Was macht den Menschen zum Menschen?", kurz: "Was macht den Menschen zum Menschen?", datei: "m16-was-macht-den-menschen.html" },
      { nr: "M17", titel: "Mein Leben in der NS-Diktatur I – Ausgrenzung 1933 bis 1939 aus zwei Blickwinkeln", kurz: "Leben in der NS-Diktatur", datei: "m17-leben-in-der-diktatur.html" },
      { nr: "M18", titel: "Die fünf Säulen der NS-Ideologie", kurz: "Die fünf Säulen der NS-Ideologie", datei: "ns-ideologie.html" },
      { nr: "M19", titel: "Appeasement-Politik – der Weg zum Frieden oder in den Zweiten Weltkrieg?", kurz: "Appeasement-Politik", datei: "appeasement.html" },
      { nr: "M20", titel: "Der Verlauf des Zweiten Weltkriegs. Der Krieg und seine Dilemmata.", kurz: "Der Krieg und seine Dilemmata", datei: "m20-dilemmata.html" },
      { nr: "M21", titel: "Es geht um Menschen – Shoa oder Holocaust?", kurz: "Es geht um Menschen", datei: "m21-es-geht-um-menschen.html" },
      { nr: "M22", titel: "„Große Verbrechen brauchen keine Monster!“ – Wie war das möglich?", kurz: "Wie war das möglich?", datei: "m22-wie-war-das-moeglich.html" },
      { nr: "M23", titel: "Die Gesellschaft, in der ich leb(t)e? – Die Shoa im Ländervergleich", kurz: "Die Shoa im Ländervergleich", datei: "m23-die-gesellschaft.html" },
      { nr: "M25", titel: "Kriegsende 1945: Leben in Ruinen und der Umgang mit Schuld", kurz: "Kriegsende 1945", datei: "m25-leben-in-ruinen.html" },
      { nr: "M26", titel: "Ende gut, alles gut? Kontinuitäten des Nationalsozialismus in der Bundesrepublik", kurz: "Kontinuitäten in der Bundesrepublik", datei: "m26-kontinuitaeten.html" },
      { nr: "M27", titel: "Die Vergessenen! Eine Globalgeschichte des Zweiten Weltkriegs", kurz: "Die Vergessenen", datei: "m27-die-vergessenen.html" }
    ]
  }
};
