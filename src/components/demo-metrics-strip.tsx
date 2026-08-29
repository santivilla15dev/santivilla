import { formatMs } from "@/lib/audit/pagespeed";
import type { DemoBenchmark } from "@/lib/demos/benchmarks";

type MetricsLabels = {
  metricsTitle: string;
  metricsSource: string;
  metricsBefore: string;
  metricsAfter: string;
  metricsPerformance: string;
  metricsLcp: string;
  metricsFcp: string;
  metricsUxNote: string;
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("de-AT", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}

export function DemoMetricsStrip({ benchmark, labels, compact = false }: {
  benchmark: DemoBenchmark;
  labels: MetricsLabels;
  compact?: boolean;
}) {
  const { before, after, measuredAt, source } = benchmark;
  if (compact) {
    return (
      <p className="text-[11px] leading-relaxed text-[#e8e4dc]/70">
        Demo LCP {formatMs(after.lcpMs)} · lugner.at LCP {formatMs(before.lcpMs)} · PSI mobile · {formatDate(measuredAt)}
      </p>
    );
  }
  return (
    <section className="mt-10 rounded-[var(--radius)] border border-line bg-surface/80 p-6 shadow-[var(--shadow)]">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent">{labels.metricsTitle}</p>
      <p className="mt-1 text-xs text-muted">{source} · {formatDate(measuredAt)}</p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[320px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-[0.14em] text-muted">
              <th className="pb-3 pr-4" />
              <th className="pb-3 pr-4">{labels.metricsBefore}</th>
              <th className="pb-3">{labels.metricsAfter}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-line/70">
              <td className="py-3 pr-4 text-muted">{labels.metricsPerformance}</td>
              <td className="py-3 pr-4 tabular-nums">{before.performance}/100</td>
              <td className="py-3 tabular-nums text-accent">{after.performance}/100</td>
            </tr>
            <tr className="border-b border-line/70">
              <td className="py-3 pr-4 text-muted">{labels.metricsLcp}</td>
              <td className="py-3 pr-4 tabular-nums">{formatMs(before.lcpMs)}</td>
              <td className="py-3 tabular-nums text-accent">{formatMs(after.lcpMs)}</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-muted">{labels.metricsFcp}</td>
              <td className="py-3 pr-4 tabular-nums">{formatMs(before.fcpMs)}</td>
              <td className="py-3 tabular-nums text-accent">{formatMs(after.fcpMs)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">{labels.metricsUxNote}</p>
    </section>
  );
}
