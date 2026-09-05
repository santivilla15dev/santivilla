#!/usr/bin/env node
/**
 * Sube secretos de .env.local a Vercel (production + preview).
 * Uso: node scripts/push-vercel-secrets.mjs
 * Requiere: vercel login, .env.local guardado (Cmd+S).
 */

import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, ".env.local");

const KEYS = [
  { name: "ANTHROPIC_API_KEY", sensitive: true },
  { name: "HF_API_KEY_ID", sensitive: true },
  { name: "HF_API_KEY_SECRET", sensitive: true },
  { name: "PAGESPEED_API_KEY", sensitive: true },
  { name: "GOOGLE_PLACES_API_KEY", sensitive: true },
  { name: "NEXT_PUBLIC_SUPABASE_URL", sensitive: false },
  { name: "NEXT_PUBLIC_SUPABASE_ANON_KEY", sensitive: true },
  { name: "SUPABASE_SERVICE_ROLE_KEY", sensitive: true },
  { name: "NEXT_PUBLIC_WHATSAPP", sensitive: false },
  { name: "NEXT_PUBLIC_CAL_URL", sensitive: false },
  { name: "NEXT_PUBLIC_SITE_URL", sensitive: false },
  { name: "NEXT_PUBLIC_LEGAL_NAME", sensitive: false },
  { name: "NEXT_PUBLIC_LEGAL_ADDRESS", sensitive: false },
  { name: "NEXT_PUBLIC_LEGAL_EMAIL", sensitive: false },
  { name: "NEXT_PUBLIC_LEGAL_GISA", sensitive: false },
  { name: "NEXT_PUBLIC_LEGAL_FIRMENBUCH", sensitive: false },
  { name: "NEXT_PUBLIC_LEGAL_UID", sensitive: false },
  { name: "NEXT_PUBLIC_LEGAL_GEWERBEBEHOERDE", sensitive: false },
  { name: "NEXT_PUBLIC_LEGAL_WKO", sensitive: false },
];

function parseEnv(text) {
  const out = {};
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    out[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return out;
}

function addEnv(name, value, env, sensitive) {
  const args = [
    "env",
    "add",
    name,
    env,
    "--force",
    ...(sensitive ? ["--sensitive"] : []),
  ];
  const r = spawnSync("vercel", args, {
    input: value,
    cwd: root,
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
  });
  if (r.status !== 0) {
    console.error(`✗ ${name} (${env}):`, r.stderr || r.stdout);
    return false;
  }
  console.log(`✓ ${name} → ${env}`);
  return true;
}

if (!existsSync(envPath)) {
  console.error("No existe .env.local — guarda el archivo y vuelve a intentar.");
  process.exit(1);
}

const vars = parseEnv(readFileSync(envPath, "utf8"));
let ok = 0;
let skip = 0;

for (const { name, sensitive } of KEYS) {
  const value = vars[name];
  if (
    !value ||
    value.includes("tu-usuario") ||
    value === "436601234567" ||
    value === "436600000000" ||
    value === "573001234567"
  ) {
    console.log(`○ ${name} — omitido (placeholder o vacío)`);
    skip++;
    continue;
  }
  for (const env of ["production", "preview"]) {
    if (addEnv(name, value, env, sensitive)) ok++;
  }
}

console.log(`\nListo: ${ok} variables subidas, ${skip} omitidas.`);
console.log("Siguiente paso: vercel --prod");
