import { whatsappHref } from "@/lib/site";

export function BriefContact({
  title,
  body,
  whatsappLabel,
  whatsappMessage,
  ctaLabel,
}: {
  title: string;
  body: string;
  whatsappLabel: string;
  whatsappMessage: string;
  ctaLabel: string;
}) {
  return (
    <section
      id="brief-contact"
      className="border-t px-6 py-20 sm:px-10"
      style={{
        borderColor: "color-mix(in srgb, var(--brief-ink) 12%, transparent)",
        background:
          "linear-gradient(180deg, transparent, color-mix(in srgb, var(--brief-primary) 8%, transparent))",
      }}
    >
      <div className="mx-auto max-w-3xl">
        <h2
          className="font-display text-3xl tracking-tight sm:text-4xl"
          style={{ color: "var(--brief-ink)" }}
        >
          {title}
        </h2>
        <p
          className="mt-4 max-w-xl text-lg leading-relaxed"
          style={{
            color: "color-mix(in srgb, var(--brief-ink) 70%, transparent)",
          }}
        >
          {body}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={whatsappHref(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full px-6 py-3 text-sm font-medium transition hover:brightness-110"
            style={{
              backgroundColor: "var(--brief-primary)",
              color: "var(--brief-bg)",
            }}
          >
            {ctaLabel}
          </a>
          <a
            href={whatsappHref(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border px-6 py-3 text-sm font-medium transition hover:opacity-80"
            style={{
              borderColor: "color-mix(in srgb, var(--brief-ink) 25%, transparent)",
              color: "var(--brief-ink)",
            }}
          >
            {whatsappLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
