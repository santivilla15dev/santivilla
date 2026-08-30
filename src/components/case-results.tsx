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
        <li
          key={item.id}
          className="flex flex-col rounded-[var(--radius)] border border-line bg-surface p-6 shadow-[var(--shadow)] sm:p-7"
        >
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-display text-xs uppercase tracking-[0.16em] text-accent">
              {item.sector}
            </p>
            {item.isPlaceholder ? (
              <span className="rounded-md border border-line bg-surface-2 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted">
                {placeholderBadge}
              </span>
            ) : null}
          </div>
          <h3 className="font-display mt-3 text-2xl text-ink">{item.name}</h3>
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
        </li>
      ))}
    </ul>
  );
}
