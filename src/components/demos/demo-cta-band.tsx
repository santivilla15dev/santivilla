import Link from "next/link";

type Props = {
  title: string;
  lead: string;
  ctaHref: string;
  ctaLabel: string;
  external?: boolean;
  footer?: React.ReactNode;
};

export function DemoCtaBand({
  title,
  lead,
  ctaHref,
  ctaLabel,
  external,
  footer,
}: Props) {
  return (
    <section
      className="px-5 py-16 text-center sm:px-8 sm:py-20"
      style={{
        background: "var(--demo-cta-band-bg)",
        color: "var(--demo-cta-band-ink)",
      }}
    >
      <div className="mx-auto max-w-[var(--demo-max)]">
        <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)] tracking-tight">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed opacity-85">
          {lead}
        </p>
        <a
          href={ctaHref}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="mt-8 inline-flex rounded-full px-6 py-3.5 text-sm font-semibold transition hover:brightness-110"
          style={{
            background: "var(--demo-bg)",
            color: "var(--demo-ink)",
          }}
        >
          {ctaLabel}
        </a>
        {footer ? (
          <p className="mt-10 text-xs opacity-70">{footer}</p>
        ) : null}
      </div>
    </section>
  );
}

export function DemoCtaFooterSanti() {
  return (
    <>
      Demo de{" "}
      <Link href="/" className="underline underline-offset-2">
        Santi Villa
      </Link>
    </>
  );
}
