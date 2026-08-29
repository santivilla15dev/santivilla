export type MenuSection = {
  section: string;
  items: { name: string; price: string; note?: string }[];
};

type Props = {
  sections: MenuSection[];
  title?: string;
  subtitle?: string;
  id?: string;
};

export function DemoMenuGrid({ sections, title = "Speisekarte", subtitle, id }: Props) {
  return (
    <section
      id={id}
      className="scroll-mt-20 mx-auto max-w-[var(--demo-max)] px-5 py-20 sm:px-8 md:py-28"
    >
      <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)] tracking-tight text-[var(--demo-ink)]">
        {title}
      </h2>
      {subtitle ? (
        <p className="demo-text-subtle mt-3 text-sm">{subtitle}</p>
      ) : null}
      <div className="mt-14 space-y-14">
        {sections.map((group) => (
          <div key={group.section}>
            <h3 className="demo-eyebrow">{group.section}</h3>
            <ul className="mt-5">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-baseline justify-between gap-6 border-b py-5 last:border-b-0"
                  style={{ borderColor: "var(--demo-border)" }}
                >
                  <div>
                    <p className="font-display text-xl tracking-tight text-[var(--demo-ink)] sm:text-2xl">
                      {item.name}
                    </p>
                    {item.note ? (
                      <p className="demo-text-subtle mt-1.5 text-sm">{item.note}</p>
                    ) : null}
                  </div>
                  <p
                    className="shrink-0 tabular-nums"
                    style={{ color: "var(--demo-accent)" }}
                  >
                    {item.price}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
