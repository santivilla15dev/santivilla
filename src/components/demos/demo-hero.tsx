import Image from "next/image";

type Cta = {
  href: string;
  label: string;
  external?: boolean;
  variant?: "primary" | "ghost";
};

type Props = {
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  lead: string;
  ctas: Cta[];
  /** overlay = full-bleed text on image; compact = shorter hero; split = text + image side by side */
  variant?: "overlay" | "compact" | "split";
};

function CtaRow({ ctas }: { ctas: Cta[] }) {
  return (
    <div className="mt-9 flex flex-wrap gap-3">
      {ctas.map((cta) => (
        <a
          key={cta.href}
          href={cta.href}
          target={cta.external ? "_blank" : undefined}
          rel={cta.external ? "noopener noreferrer" : undefined}
          className={cta.variant === "ghost" ? "demo-btn-ghost" : "demo-btn-primary"}
        >
          {cta.label}
        </a>
      ))}
    </div>
  );
}

export function DemoHero({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  lead,
  ctas,
  variant = "overlay",
}: Props) {
  if (variant === "split") {
    return (
      <header className="mx-auto grid max-w-[var(--demo-max)] gap-0 md:grid-cols-[0.95fr_1.05fr] md:min-h-[85svh]">
        <div className="flex flex-col justify-end px-5 py-16 sm:px-8 sm:py-20 md:py-24">
          <p className="demo-eyebrow">{eyebrow}</p>
          <h1 className="font-display mt-5 max-w-[12ch] text-[clamp(3rem,10vw,5.5rem)] leading-[0.9] tracking-tight text-[var(--demo-ink)]">
            {title}
          </h1>
          <p className="demo-text-muted mt-6 max-w-md text-base leading-relaxed sm:text-lg">
            {lead}
          </p>
          <CtaRow ctas={ctas} />
        </div>
        <div className="relative min-h-[50svh] md:min-h-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 55vw"
          />
        </div>
      </header>
    );
  }

  const heightClass =
    variant === "compact" ? "min-h-[70svh]" : "min-h-[100svh]";

  return (
    <header
      className={`relative flex ${heightClass} flex-col justify-end overflow-hidden bg-[var(--demo-bg)]`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="animate-fade object-cover object-center"
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--demo-hero-gradient)" }}
        aria-hidden
      />
      <div className="animate-rise relative z-10 mx-auto w-full max-w-[var(--demo-max)] px-5 pb-14 pt-24 sm:px-8 sm:pb-16">
        <p className="demo-eyebrow">{eyebrow}</p>
        <h1 className="font-display mt-5 max-w-[12ch] text-[clamp(3rem,11vw,5.75rem)] leading-[0.9] tracking-tight text-[var(--demo-ink)]">
          {title}
        </h1>
        <p className="demo-text-muted mt-6 max-w-md text-base leading-relaxed sm:text-lg">
          {lead}
        </p>
        <CtaRow ctas={ctas} />
      </div>
    </header>
  );
}
