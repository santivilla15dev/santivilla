import { CtaButtons } from "@/components/cta-buttons";
import { getConceptBySlug } from "@/lib/design-system/store";
import { emailHref, hasWhatsApp, whatsappHref } from "@/lib/site";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const concept = await getConceptBySlug(slug);
  return {
    title: concept ? `Konzept — ${concept.name}` : "Konzept Live",
    robots: { index: false, follow: false },
  };
}

export default async function KonzeptLivePage({ params }: Props) {
  const { slug } = await params;
  const concept = await getConceptBySlug(slug);
  if (!concept) notFound();

  const whatsappMessage = `Hallo Santi, ich habe das Konzept für ${concept.name} gesehen (/k/${slug}) und möchte mehr erfahren.`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#d4b45a]">
            Konzept Live
          </p>
          <h1 className="mt-1 font-display text-2xl text-[#f3efe6] sm:text-3xl">
            {concept.name}
          </h1>
          {concept.summary ? (
            <p className="mt-1 max-w-2xl text-sm text-[#e8e4dc]/70">
              {concept.summary}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={`/k/${slug}/raw`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-[#f3efe6] transition hover:border-[#d4b45a]/50"
          >
            Vollbild
          </a>
          <CtaButtons
            whatsappMessage={whatsappMessage}
            scheduleLabel="Termin"
            whatsappLabel="WhatsApp"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111412] shadow-2xl">
        <iframe
          title={`Konzept ${concept.name}`}
          srcDoc={concept.html}
          className="h-[78vh] w-full bg-white"
          sandbox="allow-same-origin"
        />
      </div>

      <p className="mt-4 text-center text-[11px] text-[#e8e4dc]/50">
        Daten aus Google Maps · vor Pitch prüfen ·{" "}
        <a
          href={hasWhatsApp() ? whatsappHref(whatsappMessage) : emailHref()}
          className="text-[#d4b45a] hover:underline"
        >
          {hasWhatsApp() ? "Feedback per WhatsApp" : "Feedback per E-Mail"}
        </a>
      </p>
    </div>
  );
}
