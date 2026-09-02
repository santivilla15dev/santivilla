import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { ResolvedCaseResult } from "@/lib/cases/results";

type Props = {
  items: ResolvedCaseResult[];
  placeholderBadge: string;
  beforeLabel: string;
  afterLabel: string;
};

export function CaseResults({
  items,
  placeholderBadge,
  beforeLabel,
  afterLabel,
}: Props) {
  return (
    <ul className="mt-12 grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <li key={item.id}>
          <Card className="h-full gap-0 rounded-[var(--radius-card)] border border-line bg-surface shadow-[var(--shadow)] ring-0 [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(7)]">
            <CardContent className="flex h-full flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-display text-xs uppercase tracking-[0.16em] text-accent">
                  {item.sector}
                </p>
                {item.isPlaceholder ? (
                  <Badge
                    variant="outline"
                    className="border-line bg-surface-2 text-[10px] font-medium uppercase tracking-wide text-muted"
                  >
                    {placeholderBadge}
                  </Badge>
                ) : null}
              </div>
              <h3 className="font-display mt-3 text-2xl text-ink">
                {item.name}
              </h3>
              <p className="mt-6 text-xs font-medium uppercase tracking-[0.14em] text-muted">
                {item.metricLabel}
              </p>
              <div className="mt-3 flex items-end gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-muted">
                    {beforeLabel}
                  </p>
                  <p className="mt-1 font-display text-3xl tabular-nums text-ink/45">
                    {item.before}
                  </p>
                </div>
                <span className="mb-2 text-muted" aria-hidden>
                  →
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-muted">
                    {afterLabel}
                  </p>
                  <p className="mt-1 font-display text-3xl tabular-nums text-accent">
                    {item.after}
                  </p>
                </div>
              </div>
              {item.quote ? (
                <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                  {item.quote}
                </p>
              ) : null}
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
