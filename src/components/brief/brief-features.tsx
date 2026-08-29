import Image from "next/image";
import type { BriefImages, BriefPayload } from "@/lib/brief/schema";

export function BriefFeatures({
  features,
  sectionTitle,
  images,
}: {
  features: BriefPayload["features"];
  sectionTitle: string;
  images?: BriefImages;
}) {
  return (
    <section
      className="border-t"
      style={{
        borderColor: "color-mix(in srgb, var(--brief-ink) 12%, transparent)",
      }}
    >
      {images?.secondaryUrl ? (
        <div className="relative aspect-[21/9] w-full sm:aspect-[3/1]">
          <Image
            src={images.secondaryUrl}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="px-6 py-20 sm:px-10">
        <div className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-[1fr_minmax(0,1.1fr)] lg:items-start lg:gap-16">
          <div>
            <h2
              className="font-display text-3xl tracking-tight sm:text-4xl"
              style={{ color: "var(--brief-ink)" }}
            >
              {sectionTitle}
            </h2>
            <ul className="mt-12 space-y-12">
              {features.map((feature, i) => (
                <li
                  key={`${feature.title}-${i}`}
                  className="grid gap-2 sm:grid-cols-[3.5rem_1fr] sm:gap-6"
                >
                  <span
                    className="font-display text-2xl tabular-nums"
                    style={{ color: "var(--brief-secondary)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3
                      className="font-display text-xl sm:text-2xl"
                      style={{ color: "var(--brief-ink)" }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="mt-2 max-w-prose leading-relaxed"
                      style={{
                        color:
                          "color-mix(in srgb, var(--brief-ink) 68%, transparent)",
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {images?.detailUrl ? (
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden lg:mx-0 lg:mt-4">
              <Image
                src={images.detailUrl}
                alt=""
                fill
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
