#!/usr/bin/env node
/**
 * Batch prospect: Google Maps URL → Konzept Live via API.
 * Usage:
 *   npm run prospect:maps -- "https://maps.app.goo.gl/..."
 *   npm run prospect:maps -- urls.txt
 *
 * Requires dev server (npm run dev) or PROSPECT_BASE_URL pointing to deployed app.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvLocal() {
  try {
    const text = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of text.split("\n")) {
      const m = line.match(/^([A-Z_]+)=(.+)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
    }
  } catch {
    /* ignore */
  }
}

function collectUrls(argv) {
  const args = argv.slice(2).filter(Boolean);
  if (args.length === 0) {
    console.error("Usage: npm run prospect:maps -- <maps-url> [url2…]");
    console.error("   or: npm run prospect:maps -- urls.txt");
    process.exit(1);
  }

  if (args.length === 1 && args[0].endsWith(".txt")) {
    const file = resolve(process.cwd(), args[0]);
    return readFileSync(file, "utf8")
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"));
  }

  return args;
}

async function createKonzept(baseUrl, mapsUrl) {
  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/api/maps/konzept`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mapsUrl, lang: "de" }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.error || `HTTP ${res.status}`);
  }
  return data;
}

loadEnvLocal();

const baseUrl =
  process.env.PROSPECT_BASE_URL?.trim() || "http://localhost:3000";
const urls = collectUrls(process.argv);

console.log(`Base: ${baseUrl}`);
console.log(`URLs: ${urls.length}\n`);

const results = [];

for (const mapsUrl of urls) {
  process.stdout.write(`→ ${mapsUrl.slice(0, 60)}… `);
  try {
    const data = await createKonzept(baseUrl, mapsUrl);
    console.log(`OK  ${data.path}  (${data.name})`);
    results.push({ mapsUrl, ok: true, ...data });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.log(`FAIL  ${msg}`);
    results.push({ mapsUrl, ok: false, error: msg });
  }
}

const ok = results.filter((r) => r.ok).length;
console.log(`\nDone: ${ok}/${results.length} OK`);

if (ok < results.length) process.exit(1);
