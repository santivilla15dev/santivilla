import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatMs } from "@/lib/audit/vitals-format";
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
    return new Date(iso).toLocaleDateString("de-AT", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export function DemoMetricsStrip({
  benchmark,
  labels,
  compact = false,
}: {
  benchmark: DemoBenchmark;
  labels: MetricsLabels;
  compact?: boolean;
}) {
  const { before, after, measuredAt, source, beforeHostLabel } = benchmark;
  if (compact) {
    return (
      <p className="text-[11px] leading-relaxed text-[#e8e4dc]/70">
        Demo LCP {formatMs(after.lcpMs)} · {beforeHostLabel} LCP{" "}
        {formatMs(before.lcpMs)} · PSI mobile · {formatDate(measuredAt)}
      </p>
    );
  }
  return (
    <Card className="mt-10 gap-0 rounded-[var(--radius-card)] border-line bg-surface/80 shadow-[var(--shadow)] ring-0 [--card-spacing:--spacing(6)]">
      <CardContent>
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
          {labels.metricsTitle}
        </p>
        <p className="mt-1 text-xs text-muted">
          {source} · {formatDate(measuredAt)}
        </p>
        <div className="mt-6">
          <Table className="min-w-[320px]">
            <TableHeader>
              <TableRow className="border-line text-xs uppercase tracking-[0.14em] hover:bg-transparent">
                <TableHead className="pr-4 text-muted" />
                <TableHead className="pr-4 text-muted">
                  {labels.metricsBefore}
                </TableHead>
                <TableHead className="text-muted">
                  {labels.metricsAfter}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-line/70 hover:bg-transparent">
                <TableCell className="py-3 pr-4 text-muted">
                  {labels.metricsPerformance}
                </TableCell>
                <TableCell className="py-3 pr-4 tabular-nums">
                  {before.performance}/100
                </TableCell>
                <TableCell className="py-3 tabular-nums text-accent">
                  {after.performance}/100
                </TableCell>
              </TableRow>
              <TableRow className="border-line/70 hover:bg-transparent">
                <TableCell className="py-3 pr-4 text-muted">
                  {labels.metricsLcp}
                </TableCell>
                <TableCell className="py-3 pr-4 tabular-nums">
                  {formatMs(before.lcpMs)}
                </TableCell>
                <TableCell className="py-3 tabular-nums text-accent">
                  {formatMs(after.lcpMs)}
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-transparent">
                <TableCell className="py-3 pr-4 text-muted">
                  {labels.metricsFcp}
                </TableCell>
                <TableCell className="py-3 pr-4 tabular-nums">
                  {formatMs(before.fcpMs)}
                </TableCell>
                <TableCell className="py-3 tabular-nums text-accent">
                  {formatMs(after.fcpMs)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted">
          {labels.metricsUxNote}
        </p>
      </CardContent>
    </Card>
  );
}
