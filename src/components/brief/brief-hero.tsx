import Image from "next/image";
import type { BriefPayload } from "@/lib/brief/schema";

export function BriefHero({ payload }: { payload: BriefPayload }) {
  const heroUrl = payload.images?.heroUrl;

  return (
    <header className="relative flex min-h-[78vh] flex-col justify-end overflow-hidden">
      {heroUrl ? (
        <>
          <Image
            src={heroUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                linear-gradient(180deg,
                  color-mix(in srgb, var(--brief-ink) 35%, transparent) 0%,
                  color-mix(in srgb, var(--brief-ink) 55%, transparent) 45%,
                  color-mix(in srgb, var(--brief-ink) 88%, transparent) 100%
                )
              `,
            }}
            aria-hidden
          />
        </>
      ) : (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 10%, color-mix(in srgb, var(--brief-primary) 35%, transparent), transparent),
              radial-gradient(ellipse 70% 50% at 90% 80%, color-mix(in srgb, var(--brief-secondary) 28%, transparent), transparent),
              linear-gradient(165deg, var(--brief-bg) 0%, color-mix(in srgb, var(--brief-bg) 85%, var(--brief-ink)) 100%)
            `,
          }}
          aria-hidden
        />
      )}

      <div className="relative mx-auto w-full max-w-3xl px-6 pb-16 pt-32 sm:px-10 sm:pb-20">
        <p
          className="font-display text-2xl tracking-tight sm:text-4xl"
          style={{
            color: heroUrl ? "color-mix(in srgb, var(--brief-primary) 85%, white)" : "var(--brief-primary)",
          }}
        >
          {payload.businessName}
        </p>
        <h1
          className="font-display mt-4 max-w-[16ch] text-4xl leading-[1.08] tracking-tight sm:text-5xl md:text-6xl"
          style={{ color: heroUrl ? "#f7f4ef" : "var(--brief-ink)" }}
        >
          {payload.headline}
        </h1>
        <p
          className="mt-5 max-w-xl text-lg leading-relaxed sm:text-xl"
          style={{
            color: heroUrl
              ? "rgba(247,244,239,0.78)"
              : "color-mix(in srgb, var(--brief-ink) 72%, transparent)",
          }}
        >
          {payload.subheadline}
        </p>
        <a
          href="#brief-contact"
          className="mt-10 inline-flex rounded-full px-6 py-3 text-sm font-medium transition hover:brightness-110"
          style={{
            backgroundColor: "var(--brief-primary)",
            color: "var(--brief-bg)",
          }}
        >
          {payload.ctaLabel}
        </a>
      </div>
    </header>
  );
}
