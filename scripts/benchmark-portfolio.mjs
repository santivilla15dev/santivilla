#!/usr/bin/env node
/**
 * Measure mobile lab score for the portfolio home and update
 * portfolioHomeBenchmark in src/lib/demos/benchmarks.ts.
 *
 * Prefers PageSpeed Insights API (PAGESPEED_API_KEY).
 * Falls back: LH_URL=http://127.0.0.1:3456 CHROME_PATH=... (local next start).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const PSI =
  "https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed";
const CANONICAL_URL = "https://santivilla.com";
const BENCHMARKS_PATH = resolve(process.cwd(), "src/lib/demos/benchmarks.ts");

try {
  for (const line of readFileSync(
    resolve(process.cwd(), ".env.local"),
    "utf8",
  ).split("\n")) {
    const m = line.match(/^PAGESPEED_API_KEY=(.+)$/);
    if (m) process.env.PAGESPEED_API_KEY = m[1].trim();
  }
} catch {
  /* ignore */
}

async function psiApi(url, key) {
  const p = new URLSearchParams({ url, key, strategy: "mobile" });
  p.append("category", "performance");
  p.append("category", "accessibility");
  const res = await fetch(`${PSI}?${p}`);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  const data = await res.json();
  if (data.error?.message) throw new Error(data.error.message);
  const lr = data.lighthouseResult;
  if (!lr?.categories) throw new Error("No lighthouseResult");
  const a = lr.audits ?? {};
  const n = (id) => Math.round(a[id]?.numericValue ?? 0);
  const c = (id) => Math.round((lr.categories?.[id]?.score ?? 0) * 100);
  return {
    url: CANONICAL_URL,
    performance: c("performance"),
    accessibility: c("accessibility"),
    lcpMs: n("largest-contentful-paint"),
    fcpMs: n("first-contentful-paint"),
    measuredAt: new Date().toISOString(),
    source: "Google PageSpeed Insights API",
    strategy: "mobile",
  };
}

function writeSnapshot(snapshot) {
  const exportBlock = `export const portfolioHomeBenchmark: SiteSelfBenchmark = ${JSON.stringify(snapshot, null, 2)};`;
  let src = readFileSync(BENCHMARKS_PATH, "utf8");

  if (!src.includes("export type SiteSelfBenchmark")) {
    src += `
export type SiteSelfBenchmark = {
  url: string;
  performance: number;
  accessibility: number;
  lcpMs: number;
  fcpMs: number;
  measuredAt: string;
  source: string;
  strategy: "mobile";
};
`;
  }

  if (src.includes("export const portfolioHomeBenchmark")) {
    src = src.replace(
      /export const portfolioHomeBenchmark: SiteSelfBenchmark = \{[\s\S]*?\n\};/,
      exportBlock,
    );
  } else {
    src = `${src.trimEnd()}\n\n/** Portfolio home — refresh with \`npm run benchmark:portfolio\` */\n${exportBlock}\n`;
  }

  writeFileSync(BENCHMARKS_PATH, src);
  console.log("Updated portfolioHomeBenchmark in benchmarks.ts");
}

const key = process.env.PAGESPEED_API_KEY?.trim();
const measureUrl = process.env.LH_URL?.trim() || CANONICAL_URL;

if (key && !process.env.LH_URL) {
  console.log("Measuring via PSI API:", CANONICAL_URL);
  const snapshot = await psiApi(CANONICAL_URL, key);
  console.log(JSON.stringify(snapshot, null, 2));
  writeSnapshot(snapshot);
  process.exit(0);
}

console.error(
  [
    "No PAGESPEED_API_KEY (or LH_URL set for local fallback).",
    "Add PAGESPEED_API_KEY to .env.local, or:",
    "  1) npm run build && npm run start -- -p 3456",
    "  2) LH_URL=http://127.0.0.1:3456 CHROME_PATH=/path/to/chrome npm run benchmark:portfolio",
    "",
    `Target would be: ${measureUrl}`,
  ].join("\n"),
);
process.exit(1);
