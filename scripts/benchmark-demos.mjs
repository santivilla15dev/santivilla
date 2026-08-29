#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const PSI = "https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed";
const BEFORE = "https://www.lugner.at";
const AFTER = "https://santivilla.com/demos/lugner";

try {
  for (const line of readFileSync(resolve(process.cwd(), ".env.local"), "utf8").split("\n")) {
    const m = line.match(/^PAGESPEED_API_KEY=(.+)$/);
    if (m) process.env.PAGESPEED_API_KEY = m[1].trim();
  }
} catch { /* ignore */ }

async function psi(url, key) {
  const p = new URLSearchParams({ url, key, strategy: "mobile" });
  p.append("category", "performance");
  p.append("category", "accessibility");
  const res = await fetch(`${PSI}?${p}`);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  const data = await res.json();
  const lr = data.lighthouseResult;
  const a = lr.audits ?? {};
  const n = (id) => a[id]?.numericValue ?? 0;
  const c = (id) => Math.round((lr.categories?.[id]?.score ?? 0) * 100);
  return { url, performance: c("performance"), accessibility: c("accessibility"), lcpMs: n("largest-contentful-paint"), fcpMs: n("first-contentful-paint"), cls: n("cumulative-layout-shift") };
}

const key = process.env.PAGESPEED_API_KEY?.trim();
if (!key) { console.error("Missing PAGESPEED_API_KEY"); process.exit(1); }

const [before, after] = await Promise.all([psi(BEFORE, key), psi(AFTER, key)]);
const benchmark = { id: "lugner", label: "Lugner City", before, after, measuredAt: new Date().toISOString(), source: "Google PageSpeed Insights API", strategy: "mobile" };
const out = `/** Pre-calculated PSI mobile benchmarks — refresh with \`npm run benchmark:demos\` */\n\nexport type BenchmarkSnapshot = { url: string; performance: number; accessibility: number; lcpMs: number; fcpMs: number; cls: number; };\nexport type DemoBenchmark = { id: string; label: string; before: BenchmarkSnapshot; after: BenchmarkSnapshot; measuredAt: string; source: string; strategy: "mobile"; };\nexport const lugnerBenchmark: DemoBenchmark = ${JSON.stringify(benchmark, null, 2)};\n`;
writeFileSync(resolve(process.cwd(), "src/lib/demos/benchmarks.ts"), out);
console.log("Updated benchmarks.ts");
