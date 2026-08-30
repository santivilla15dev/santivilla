import type { LegalPageContent } from "@/lib/legal/impressum-content";

export function LegalPageView({ content }: { content: LegalPageContent }) {
  return (
    <div className="site-shell py-16 sm:py-20">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
        {content.updated}
      </p>
      <h1 className="font-display mt-3 text-5xl text-ink sm:text-6xl">
        {content.title}
      </h1>
      <div className="mt-12 max-w-3xl space-y-10">
        {content.sections.map((section) => (
          <section
            key={section.id ?? section.title}
            id={section.id}
            className={section.id ? "scroll-mt-28" : undefined}
          >
            <h2 className="font-display text-2xl text-ink">{section.title}</h2>
            <div className="mt-4 space-y-3 text-muted leading-relaxed">
              {section.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
