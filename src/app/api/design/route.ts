import { generateConceptHtml } from "@/lib/design-system/generate";
import {
  generateConceptImages,
  hasHiggsfieldCredentials,
} from "@/lib/design-system/images";
import { makeConceptId, saveConcept } from "@/lib/design-system/store";
import { applySeoToConcept } from "@/lib/seo/sync-concept-seo";
import type { DesignBrief } from "@/lib/design-system/tokens";
import { understandBusiness } from "@/lib/design-system/understand";
import { fetchPageHtml, normalizeAuditUrl } from "@/lib/audit/heuristics";
import { checkRateLimit } from "@/lib/audit/rate-limit";
import type { AuditLang, BusinessTemplate } from "@/lib/audit/types";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 120;

function clientKey(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return `design:${forwarded.split(",")[0]?.trim()}`;
  return `design:${req.headers.get("x-real-ip") || "unknown"}`;
}

type Body = {
  name?: string;
  url?: string;
  hostname?: string;
  template?: BusinessTemplate;
  lang?: AuditLang;
  score?: number;
  findings?: string[];
  hoursHint?: string;
};

export async function POST(req: Request) {
  const limit = await checkRateLimit(clientKey(req));
  if (!limit.ok) {
    return NextResponse.json(
      {
        error: "RATE_LIMIT",
        message: `Demasiados conceptos. Espera ${limit.retryAfterSec}s.`,
      },
      { status: 429 },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "BAD_JSON" }, { status: 400 });
  }

  const urlRaw = (body.url || "").slice(0, 500);
  const hostname = (body.hostname || "negocio").slice(0, 120);
  const lang: AuditLang = body.lang === "de" ? "de" : "es";

  if (!urlRaw) {
    return NextResponse.json(
      { error: "BAD_URL", message: "Falta la URL del audit." },
      { status: 400 },
    );
  }

  try {
    const url = normalizeAuditUrl(urlRaw);
    const { html } = await fetchPageHtml(url);

    const understanding = await understandBusiness({
      html,
      url: url.toString(),
      lang,
      fallbackName: body.name,
    });

    const images = await generateConceptImages({
      kind: understanding.kind,
      prompts: understanding.imagePrompts,
      name: understanding.name,
      city: understanding.city,
    });

    const brief: DesignBrief = {
      name: understanding.name,
      subtitle: understanding.subtitle,
      city: understanding.city,
      hostname,
      url: url.toString(),
      template: understanding.template,
      lang: understanding.lang,
      score: typeof body.score === "number" ? body.score : 50,
      findings: Array.isArray(body.findings) ? body.findings.slice(0, 8) : [],
      hoursHint:
        understanding.hoursHint || body.hoursHint?.slice(0, 200),
      phoneHint: understanding.phoneHint,
      emailHint: understanding.emailHint,
      whatsappUrl: understanding.whatsappUrl,
      siteFacts: understanding.siteFacts,
      highlights: understanding.highlights,
      artDirection: understanding.artDirection,
      tagline: understanding.tagline,
      kind: understanding.kind,
      specialty: understanding.specialty,
      vibe: understanding.vibe,
      summary: understanding.summary,
      heroImageUrl: images.heroUrl,
      secondaryImageUrl: images.secondaryUrl,
      detailImageUrl: images.detailUrl,
      imageSource: images.source,
    };

    const { html: conceptHtml, source, art } = await generateConceptHtml(brief);
    const id = makeConceptId(hostname);
    const concept = await saveConcept(
      await applySeoToConcept({
        id,
        html: conceptHtml,
        name: brief.name,
        hostname,
        url: brief.url,
        template: brief.template,
        score: brief.score,
        source,
        createdAt: new Date().toISOString(),
        kind: brief.kind,
        specialty: brief.specialty,
        summary: brief.summary,
        imageSource: brief.imageSource,
        heroImageUrl: brief.heroImageUrl,
        secondaryImageUrl: brief.secondaryImageUrl,
        detailImageUrl: brief.detailImageUrl,
        lang: brief.lang,
        tagline: brief.tagline,
        phoneHint: brief.phoneHint,
        hoursHint: brief.hoursHint,
        emailHint: brief.emailHint,
        whatsappUrl: brief.whatsappUrl,
        highlights: brief.highlights,
        siteFacts: brief.siteFacts,
        artDirection: brief.artDirection,
        messages: [
          {
            role: "assistant",
            content:
              brief.lang === "de"
                ? "Konzept bereit. Sag mir, was du ändern willst — z. B. Speisekarte, mehr Infos, Sprache."
                : "Concepto listo. Dime qué quieres cambiar — por ejemplo menú, más info, idioma.",
            at: new Date().toISOString(),
          },
        ],
      }),
    );

    try {
      const { upsertLeadFromConcept } = await import("@/lib/crm/store");
      await upsertLeadFromConcept({
        conceptId: concept.id,
        url: concept.url,
        hostname: concept.hostname,
        businessName: concept.name,
        source: "concept",
      });
    } catch {
      // non-blocking
    }

    return NextResponse.json({
      id: concept.id,
      path: `/concepto/${concept.id}`,
      editToken: concept.editToken,
      source: concept.source,
      art,
      name: concept.name,
      score: concept.score,
      kind: concept.kind,
      specialty: concept.specialty,
      summary: concept.summary,
      imageSource: concept.imageSource,
      collected: {
        phones: understanding.siteFacts.phones.length,
        emails: understanding.siteFacts.emails.length,
        addresses: understanding.siteFacts.addresses.length,
        hours: understanding.siteFacts.hoursLines.length,
        highlights: understanding.highlights.length,
        nav: understanding.siteFacts.navLabels.length,
      },
      hasAnthropic: Boolean(process.env.ANTHROPIC_API_KEY),
      hasNanoBanana: hasHiggsfieldCredentials(),
    });
  } catch {
    return NextResponse.json(
      {
        error: "DESIGN_FAIL",
        message:
          lang === "de"
            ? "Konzept konnte nicht erzeugt werden."
            : "No se pudo generar el concepto.",
      },
      { status: 500 },
    );
  }
}
