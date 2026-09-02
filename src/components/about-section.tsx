import Image from "next/image";

export type AboutSectionCopy = {
  eyebrow: string;
  title: string;
  body: string;
  stackLabel: string;
  stack: string;
  photoAlt: string;
};

type Props = {
  copy: AboutSectionCopy;
};

// Retrato 3D estilizado de Santi (mismo asset que la demo 3D Creator), 4:5 a 2x.
const PHOTO_SRC = "/about/santi.webp";

export function AboutSection({ copy }: Props) {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-line/70 py-16 sm:py-20"
    >
      <div className="site-shell grid items-start gap-10 md:grid-cols-[200px_1fr] md:gap-14">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[200px] overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-2">
          <Image
            src={PHOTO_SRC}
            alt={copy.photoAlt}
            fill
            className="object-cover"
            sizes="200px"
          />
        </div>
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {copy.eyebrow}
          </p>
          <h2 className="font-display mt-3 text-4xl text-ink sm:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{copy.body}</p>
          <div className="mt-8 border-t border-line pt-6">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
              {copy.stackLabel}
            </p>
            <p className="mt-2 text-sm font-medium text-accent sm:text-base">
              {copy.stack}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
