import Image from "next/image";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
  variant?: "default" | "split" | "panel";
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export function DemoSection({
  id,
  eyebrow,
  title,
  lead,
  children,
  variant = "default",
  imageSrc,
  imageAlt,
  className = "",
}: Props) {
  const inner = (
    <>
      {eyebrow ? <p className="demo-eyebrow">{eyebrow}</p> : null}
      <h2 className="font-display mt-4 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.05] tracking-tight text-[var(--demo-ink)]">
        {title}
      </h2>
      {lead ? (
        <p className="demo-text-muted mt-5 max-w-md text-[15px] leading-relaxed sm:text-base">
          {lead}
        </p>
      ) : null}
      {children ? <div className="mt-8">{children}</div> : null}
    </>
  );

  if (variant === "split" && imageSrc) {
    return (
      <section
        id={id}
        className={`scroll-mt-20 mx-auto grid max-w-[var(--demo-max)] gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center md:gap-14 md:py-28 ${className}`}
      >
        <div>{inner}</div>
        <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--demo-radius)]">
          <Image src={imageSrc} alt={imageAlt ?? ""} fill className="object-cover" sizes="(max-width: 768px) 100vw, 45vw" />
        </div>
      </section>
    );
  }

  const panelClass =
    variant === "panel"
      ? "border-y"
      : "";

  return (
    <section
      id={id}
      className={`scroll-mt-20 ${panelClass} ${className}`}
      style={variant === "panel" ? { borderColor: "var(--demo-border)", background: "var(--demo-panel)" } : undefined}
    >
      <div className="mx-auto max-w-[var(--demo-max)] px-5 py-16 sm:px-8 md:py-20">
        {inner}
      </div>
    </section>
  );
}
