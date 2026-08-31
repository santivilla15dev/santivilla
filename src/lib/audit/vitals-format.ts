/** Pure vitals formatters/raters — safe to import from client components. */

export function formatMs(ms: number): string {
  if (!ms || ms <= 0) return "—";
  if (ms < 1000) return `${Math.round(ms)} ms`;
  return `${(ms / 1000).toFixed(1)} s`;
}

export function formatCls(cls: number): string {
  if (!cls && cls !== 0) return "—";
  return cls.toFixed(2);
}

export type VitalRating = "good" | "needs-improvement" | "poor";

export function rateLcp(ms: number): VitalRating {
  if (ms <= 0) return "needs-improvement";
  if (ms <= 2500) return "good";
  if (ms <= 4000) return "needs-improvement";
  return "poor";
}

export function rateFcp(ms: number): VitalRating {
  if (ms <= 0) return "needs-improvement";
  if (ms <= 1800) return "good";
  if (ms <= 3000) return "needs-improvement";
  return "poor";
}

export function rateCls(cls: number): VitalRating {
  if (cls <= 0.1) return "good";
  if (cls <= 0.25) return "needs-improvement";
  return "poor";
}

export function rateTbt(ms: number): VitalRating {
  if (ms <= 0) return "needs-improvement";
  if (ms <= 200) return "good";
  if (ms <= 600) return "needs-improvement";
  return "poor";
}
