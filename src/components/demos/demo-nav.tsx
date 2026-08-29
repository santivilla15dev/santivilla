import type { DemoNavItem } from "@/lib/demos/themes";

type Props = {
  items: DemoNavItem[];
  sticky?: boolean;
};

export function DemoNav({ items, sticky = true }: Props) {
  return (
    <nav
      className={
        sticky
          ? "sticky top-[2.75rem] z-40 border-b backdrop-blur-md"
          : "border-b"
      }
      style={{
        borderColor: "var(--demo-border)",
        background: sticky
          ? "color-mix(in srgb, var(--demo-bg) 92%, transparent)"
          : "var(--demo-bg)",
      }}
    >
      <div className="mx-auto flex max-w-[var(--demo-max)] gap-0.5 overflow-x-auto px-5 py-3 text-[11px] uppercase tracking-[0.18em] sm:px-8">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="demo-text-muted shrink-0 px-3 py-2 transition hover:text-[var(--demo-ink)]"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
