// Verschlüsselt privat/m19-lehrkraft.html → lk/m19-lehrkraft.enc.json
// Aufruf: LK_PASS='langes Passwort' node tools/lk-verschluesseln.mjs [quelle] [ziel]
// AES-GCM 256, Schlüssel per PBKDF2-SHA-256 (600 000 Runden), zufälliges Salz und IV.
import { readFileSync, writeFileSync } from "node:fs";
const [quelle = "privat/m19-lehrkraft.html", ziel = "lk/m19-lehrkraft.enc.json"] = process.argv.slice(2);
const pass = process.env.LK_PASS;
if (!pass || pass.length < 12) { console.error("LK_PASS fehlt oder ist kürzer als 12 Zeichen."); process.exit(1); }
const { subtle } = globalThis.crypto; const getRandomValues = a => globalThis.crypto.getRandomValues(a);
const salt = getRandomValues(new Uint8Array(16)), iv = getRandomValues(new Uint8Array(12)), iter = 600000;
const km = await subtle.importKey("raw", new TextEncoder().encode(pass), "PBKDF2", false, ["deriveKey"]);
const key = await subtle.deriveKey({ name: "PBKDF2", salt, iterations: iter, hash: "SHA-256" }, km, { name: "AES-GCM", length: 256 }, false, ["encrypt"]);
const ct = new Uint8Array(await subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(readFileSync(quelle, "utf8"))));
const b64 = u => Buffer.from(u).toString("base64");
writeFileSync(ziel, JSON.stringify({ v: 1, alg: "AES-GCM-256/PBKDF2-SHA256", iter, salt: b64(salt), iv: b64(iv), ct: b64(ct) }));
console.log("geschrieben:", ziel);
