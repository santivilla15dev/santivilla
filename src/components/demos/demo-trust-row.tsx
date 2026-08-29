type TrustItem = {
  label: string;
  value: string;
};

type Props = {
  items: TrustItem[];
};

export function DemoTrustRow({ items }: Props) {
  return (
    <div
      className="border-b"
      style={{ borderColor: "var(--demo-border)", background: "var(--demo-panel)" }}
    >
      <div className="mx-auto grid max-w-[var(--demo-max)] grid-cols-1 gap-px sm:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="px-5 py-5 text-center sm:px-6 sm:py-6"
          >
            <p className="demo-eyebrow text-[10px]">{item.label}</p>
            <p className="font-display mt-2 text-lg tracking-tight text-[var(--demo-ink)] sm:text-xl">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
