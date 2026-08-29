import Link from "next/link";
import type { MenuDraft } from "@/lib/menu/types";
import type { SiteMessages } from "@/lib/i18n/messages/types";
import { menuDigitizerPath } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/locales";
import { whatsappHref } from "@/lib/site";

type Labels = SiteMessages["menuDigitizer"];

export function MenuPreviewView({
  draft,
  labels,
  locale,
}: {
  draft: MenuDraft;
  labels: Labels;
  locale: Locale;
}) {
  const title = draft.restaurantName || labels.previewTitleFallback;
  const wa = whatsappHref(labels.whatsappMessage);

  return (
    <div className="min-h-screen bg-[#0b1016] text-[#e8e4dc]">
      <div className="bg-[#d4b45a] px-4 py-2.5 text-center text-[11px] font-semibold tracking-wide text-[#1a1408]">
        {labels.previewBanner}
      </div>

      <header className="mx-auto max-w-lg px-5 pb-8 pt-10">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[#d4b45a]">
          Konzept · Mobile Erst
        </p>
        <h1 className="font-display mt-3 text-4xl leading-tight text-[#f5f1e8]">
          {title}
        </h1>
        {draft.warnings.length > 0 ? (
          <ul className="mt-4 space-y-1 text-xs text-[#e8e4dc]/70">
            {draft.warnings.map((w) => (
              <li key={w}>— {w}</li>
            ))}
          </ul>
        ) : null}
        {draft.confidence === "low" ? (
          <p className="mt-3 text-xs text-[#c9a227]">
            {locale === "de"
              ? "Niedrige Lesbarkeit — Preview zur Orientierung."
              : locale === "en"
                ? "Low readability — preview for orientation only."
                : "Baja legibilidad — preview orientativa."}
          </p>
        ) : null}
      </header>

      <main className="mx-auto max-w-lg px-5 pb-24">
        {draft.sections.length === 0 ? (
          <p className="text-muted">{labels.previewEmpty}</p>
        ) : (
          <div className="space-y-10">
            {draft.sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display border-b border-white/15 pb-3 text-2xl text-[#d4b45a]">
                  {section.title}
                </h2>
                <ul className="mt-4 space-y-5">
                  {section.items.map((item) => (
                    <li
                      key={`${section.title}-${item.name}`}
                      className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/8 pb-4"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-[#f5f1e8]">{item.name}</p>
                        {item.description ? (
                          <p className="mt-1 text-sm text-[#e8e4dc]/65">
                            {item.description}
                          </p>
                        ) : null}
                        {item.allergens && item.allergens.length > 0 ? (
                          <p className="mt-2 flex flex-wrap gap-1.5">
                            {item.allergens.map((a) => (
                              <span
                                key={a}
                                className="rounded-full border border-[#d4b45a]/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#d4b45a]"
                              >
                                {a}
                              </span>
                            ))}
                          </p>
                        ) : null}
                      </div>
                      <p className="shrink-0 font-display text-lg text-[#d4b45a]">
                        {item.price}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}

        <div className="mt-12 space-y-4 border-t border-white/15 pt-8">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full justify-center rounded-full bg-[#d4b45a] px-6 py-3.5 text-sm font-semibold text-[#1a1408]"
          >
            WhatsApp
          </a>
          <Link
            href={menuDigitizerPath(locale)}
            className="block text-center text-sm text-[#e8e4dc]/70 underline-offset-4 hover:underline"
          >
            {labels.previewBack}
          </Link>
        </div>
      </main>
    </div>
  );
}
