// Verschlüsselt alle Texte für Lehrkräfte: privat/lk/<schluessel>.html → lk/<schluessel>.enc.json
// Aufruf:  LK_PASS='das Passwort' node tools/lk-bauen.mjs            (verschlüsselt, was sich geändert hat)
//          LK_PASS='das Passwort' node tools/lk-bauen.mjs --pruefen  (öffnet alle Dateien probeweise, schreibt nichts)
//          LK_PASS='neues Passwort' node tools/lk-bauen.mjs --neu    (neues Salz, alles neu – nach einem Passwortwechsel)
// AES-GCM 256, Schlüssel per PBKDF2-SHA-256 (600 000 Runden). Ein gemeinsames Salz für alle Dateien, damit ein
// einmal eingegebenes Passwort in derselben Browser-Sitzung alle Module öffnet; je Datei ein eigener Zufallswert (IV).
// Das Passwort steht nur in der Umgebungsvariablen. privat/ steht in .gitignore. M19 und M20 haben ein eigenes,
// älteres Verfahren (tools/lk-verschluesseln.mjs).
// Danach: python3 tools/bau_m25_m27.py && python3 tools/bau_ost_west.py && python3 tools/lk_einsetzen.py
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
const args = process.argv.slice(2), PRUEFEN = args.includes("--pruefen"), NEU = args.includes("--neu");
const QUELLE = "privat/lk", ZIEL = "lk", ITER = 600000;
const pass = (process.env.LK_PASS || "").normalize("NFC").trim().replace(/\s+/g, " ");
if (pass.length < 12) { console.error("LK_PASS fehlt oder ist kürzer als 12 Zeichen."); process.exit(1); }
const { subtle } = globalThis.crypto, zufall = n => globalThis.crypto.getRandomValues(new Uint8Array(n));
const b64 = u => Buffer.from(u).toString("base64"), von = s => new Uint8Array(Buffer.from(s, "base64"));
const neueDateien = () => readdirSync(ZIEL).filter(f => f.endsWith(".enc.json")).filter(f => JSON.parse(readFileSync(`${ZIEL}/${f}`, "utf8")).v === 2);
if (!existsSync(ZIEL)) mkdirSync(ZIEL);
const alt = neueDateien();
const salt = (!NEU && alt.length) ? von(JSON.parse(readFileSync(`${ZIEL}/${alt[0]}`, "utf8")).salt) : zufall(16);
const km = await subtle.importKey("raw", new TextEncoder().encode(pass), "PBKDF2", false, ["deriveBits"]);
const roh = new Uint8Array(await subtle.deriveBits({ name: "PBKDF2", salt, iterations: ITER, hash: "SHA-256" }, km, 256));
const key = await subtle.importKey("raw", roh, "AES-GCM", false, ["encrypt", "decrypt"]);
const oeffne = async d => new TextDecoder().decode(await subtle.decrypt({ name: "AES-GCM", iv: von(d.iv) }, key, von(d.ct)));

if (PRUEFEN) {
  let fehler = 0;
  for (const f of alt) {
    const k = f.replace(".enc.json", "");
    try {
      const klar = await oeffne(JSON.parse(readFileSync(`${ZIEL}/${f}`, "utf8")));
      const q = `${QUELLE}/${k}.html`, gleich = existsSync(q) ? (readFileSync(q, "utf8") === klar ? "gleich wie privat/lk" : "WEICHT AB von privat/lk") : "kein Klartext vorhanden";
      if (gleich.startsWith("WEICHT")) fehler++;
      console.log(`${k}: öffnet · ${klar.length} Zeichen · ${gleich}`);
    } catch (e) { fehler++; console.log(`${k}: ÖFFNET NICHT mit diesem Passwort`); }
  }
  console.log(fehler ? `${fehler} Datei(en) mit Fehler.` : `Alle ${alt.length} Dateien öffnen.`);
  process.exit(fehler ? 1 : 0);
}

if (!existsSync(QUELLE)) { console.error(`${QUELLE}/ fehlt. Klartext aus dem Projekt holen: python3 tools/lk_buendel.py teilen <Datei>`); process.exit(1); }
let neu = 0, gleich = 0;
for (const f of readdirSync(QUELLE).filter(f => f.endsWith(".html")).sort()) {
  const k = f.replace(".html", ""), ziel = `${ZIEL}/${k}.enc.json`, klar = readFileSync(`${QUELLE}/${f}`, "utf8");
  if (!NEU && existsSync(ziel)) { try { if (await oeffne(JSON.parse(readFileSync(ziel, "utf8"))) === klar) { gleich++; continue; } } catch (e) {} }
  const iv = zufall(12), ct = new Uint8Array(await subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(klar)));
  writeFileSync(ziel, JSON.stringify({ v: 2, alg: "AES-GCM-256/PBKDF2-SHA256", iter: ITER, salt: b64(salt), iv: b64(iv), ct: b64(ct) }) + "\n");
  neu++; console.log("geschrieben:", ziel);
}
console.log(`${neu} neu verschlüsselt, ${gleich} unverändert.`);
