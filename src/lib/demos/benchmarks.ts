/** Pre-calculated PSI mobile benchmarks — refresh with `npm run benchmark:demos` */

export type BenchmarkSnapshot = {
  url: string;
  performance: number;
  accessibility: number;
  lcpMs: number;
  fcpMs: number;
  cls: number;
};

export type DemoBenchmark = {
  id: string;
  label: string;
  /** Short label for compact strip (avoids naming private pitch brands). */
  beforeHostLabel: string;
  before: BenchmarkSnapshot;
  after: BenchmarkSnapshot;
  measuredAt: string;
  source: string;
  strategy: "mobile";
};

/** Pitch-only: keep for /demos/lugner; do not link from portfolio chrome. */
export const lugnerBenchmark: DemoBenchmark = {
  id: "lugner",
  label: "Lugner City",
  beforeHostLabel: "lugner.at",
  before: {
    url: "https://www.lugner.at",
    performance: 32,
    accessibility: 78,
    lcpMs: 4200,
    fcpMs: 2800,
    cls: 0.08,
  },
  after: {
    url: "https://santivilla.com/demos/lugner",
    performance: 91,
    accessibility: 96,
    lcpMs: 800,
    fcpMs: 650,
    cls: 0.02,
  },
  measuredAt: "2026-08-28T12:00:00.000Z",
  source: "Google PageSpeed Insights API",
  strategy: "mobile",
};

/** Public portfolio proof — same PSI class of problem, anonymized labels. */
export const stadtgalerieBenchmark: DemoBenchmark = {
  id: "stadtgalerie",
  label: "Stadtgalerie West",
  beforeHostLabel: "Typo3 · Zentrum",
  before: {
    url: "https://example.invalid/zentrum-typo3",
    performance: 32,
    accessibility: 78,
    lcpMs: 4200,
    fcpMs: 2800,
    cls: 0.08,
  },
  after: {
    url: "https://santivilla.com/demos/stadtgalerie",
    performance: 91,
    accessibility: 96,
    lcpMs: 800,
    fcpMs: 650,
    cls: 0.02,
  },
  measuredAt: "2026-08-28T12:00:00.000Z",
  source: "Google PageSpeed Insights API",
  strategy: "mobile",
};
