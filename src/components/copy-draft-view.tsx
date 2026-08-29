import Link from "next/link";
import type { CopyDraft } from "@/lib/copy/types";
import type { Locale } from "@/lib/i18n/locales";
import type { SiteMessages } from "@/lib/i18n/messages/types";
import { copyAdaptPath } from "@/lib/i18n/paths";

type Labels = SiteMessages["copyAdapt"];

function audienceLabel(labels: Labels, audience: CopyDraft["variants"][0]["audience"]) {
  if (audience === "local") return labels.audienceLocal;
  if (audience === "tourist") return labels.audienceTourist;
  return labels.audienceBusiness;
}

export function CopyDraftView({
  draft,
  labels,
  locale,
}: {
  draft: CopyDraft;
  labels: Labels;
  locale: Locale;
}) {
  return (
    <div className="min-h-screen bg-[#0b1016] text-[#e8e4dc]">
      <div className="bg-[#d4b45a] px-4 py-2.5 text-center text-[11px] font-semibold tracking-wide text-[#1a1408]">
        {labels.previewBanner}
      </div>

      <header className="mx-auto max-w-2xl px-5 pb-8 pt-10">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[#d4b45a]">
          Konzept · Copy
        </p>
        <h1 className="font-display mt-3 text-3xl leading-tight text-[#f5f1e8] sm:text-4xl">
          {labels.previewTitle}
        </h1>
        <p className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-[#e8e4dc]/85">
          {draft.sourceText}
        </p>
        <p className="mt-2 text-xs text-[#e8e4dc]/55">
          {labels.sourceLocaleLabel}: {draft.sourceLocale.toUpperCase()} ·{" "}
          {draft.contentType}
          {draft.city ? ` · ${draft.city}` : ""}
        </p>
      </header>

      <main className="mx-auto max-w-2xl space-y-6 px-5 pb-24">
        {draft.variants.map((v) => (
          <article
            key={`${v.locale}-${v.audience}`}
            className="rounded-lg border border-white/10 bg-[#0e100e] p-5"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4b45a]">
              {v.locale.toUpperCase()} · {audienceLabel(labels, v.audience)}
            </p>
            <p className="mt-3 text-base leading-relaxed text-[#f5f1e8]">{v.text}</p>
            <p className="mt-3 text-xs text-[#e8e4dc]/60">{v.toneNote}</p>
          </article>
        ))}

        <Link
          href={copyAdaptPath(locale)}
          className="inline-block text-sm text-[#d4b45a] underline underline-offset-4"
        >
          {labels.previewBack}
        </Link>
      </main>
    </div>
  );
}
