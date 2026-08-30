/** Pre-calculated PSI mobile benchmarks — refresh demos with `npm run benchmark:demos`; portfolio with `npm run benchmark:portfolio` */

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

/**
 * Portfolio home — refresh with `npm run benchmark:portfolio`.
 * Measured 2026-08-30 via Lighthouse mobile lab against
 * https://santivilla-rxxn.vercel.app/ (santivilla.com returned DEPLOYMENT_DISABLED).
 */
export const portfolioHomeBenchmark: SiteSelfBenchmark = {
  url: "https://santivilla-rxxn.vercel.app",
  performance: 97,
  accessibility: 96,
  lcpMs: 2558,
  fcpMs: 1058,
  measuredAt: "2026-08-30T11:29:04.420Z",
  source: "Google Lighthouse (mobile lab)",
  strategy: "mobile",
};
