import Link from "next/link";
import { ConceptView, type ConceptInitialData } from "@/components/concept-view";
import { getMessages } from "@/lib/i18n/get-messages";
import { pageMetadata } from "@/lib/i18n/metadata";
import { localizedPath } from "@/lib/i18n/paths";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import {
  conceptToApiResponse,
  getConcept,
} from "@/lib/design-system/store";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw, id } = await params;
  if (!isLocale(raw)) return {};
  const concept = await getConcept(id);
  const m = getMessages(raw);
  return {
    ...pageMetadata(raw, "concept", `/concepto/${id}`),
    title: concept ? `${m.concept.title} — ${concept.name}` : `${m.concept.title} ${id}`,
    robots: { index: false, follow: false },
  };
}

export default async function ConceptoPage({ params }: Props) {
  const { locale: raw, id } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const concept = await getConcept(id);
  const initialData: ConceptInitialData | null = concept
    ? conceptToApiResponse(concept)
    : null;
  const c = getMessages(locale).concept;
  const copyLabels = getMessages(locale).copyAdapt;

  return (
    <div className="site-shell py-12 sm:py-16">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
        {c.eyebrow}
      </p>
      <h1 className="font-display mt-3 text-4xl text-ink sm:text-5xl">
        {c.title}
      </h1>
      <p className="mt-3 max-w-2xl text-muted">{c.lead}</p>
      <p className="mt-2 text-sm">
        <Link
          href={localizedPath(locale, "/auditoria")}
          className="text-accent hover:underline"
        >
          {c.backLink}
        </Link>
      </p>

      <div className="mt-10">
        <ConceptView
          id={id}
          initialData={initialData}
          auditHref={localizedPath(locale, "/auditoria")}
          rawPath={localizedPath(locale, `/concepto/${id}/raw`)}
          uiLocale={locale}
          copyLabels={copyLabels}
          conceptLabels={c}
        />
      </div>
    </div>
  );
}
