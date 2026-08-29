export type HoursRow = {
  days: string;
  time: string;
};

type Props = {
  rows: HoursRow[];
  subtitle?: string;
};

export function DemoHoursTable({ rows, subtitle }: Props) {
  return (
    <div>
      {subtitle ? (
        <p className="demo-text-muted mt-3 text-sm">{subtitle}</p>
      ) : null}
      <ul className="mt-6 space-y-0 text-[15px]">
        {rows.map((row) => (
          <li
            key={row.days}
            className="flex justify-between gap-4 border-b py-4 last:border-b-0"
            style={{ borderColor: "var(--demo-border)" }}
          >
            <span className="text-[var(--demo-ink)]">{row.days}</span>
            <span className="demo-text-muted text-right tabular-nums">{row.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
