import "server-only";

import { generateConceptHtml } from "@/lib/design-system/generate";
import { generateConceptImages } from "@/lib/design-system/images";
import {
  getConceptBySlug,
  makeConceptId,
  saveConcept,
  type StoredConcept,
} from "@/lib/design-system/store";
import { applySeoToConcept } from "@/lib/seo/sync-concept-seo";
import type { DesignBrief } from "@/lib/design-system/tokens";
import { isPlacesConfigured, fetchPlaceFromMapsUrl } from "./places";
import { isMapsUrl, parseMapsUrl } from "./parse-url";
import { makeUniqueSlug, slugifyName } from "./slug";
import type { MapsKonzeptResult } from "./types";
import { understandFromPlace } from "./understand-place";

export function isMapsKonzeptConfigured(): boolean {
  return (
    isPlacesConfigured() && Boolean(process.env.ANTHROPIC_API_KEY?.trim())
  );
}

async function resolveUniqueSlug(name: string, placeId: string): Promise<string> {
  let slug = slugifyName(name);
  if (!slug) slug = "konzept";

  const existing = await getConceptBySlug(slug);
  if (!existing) return slug;

  const withSuffix = makeUniqueSlug(name, placeId);
  const collision = await getConceptBySlug(withSuffix);
  if (!collision) return withSuffix;

  return `${withSuffix}-${Date.now().toString(36).slice(-4)}`;
}

export async function konzeptFromMapsUrl(
  mapsUrlInput: string,
  lang: "de" | "es" = "de",
): Promise<MapsKonzeptResult> {
  if (!isMapsUrl(mapsUrlInput)) {
    throw new Error("INVALID_MAPS_URL");
  }
  if (!isPlacesConfigured()) {
    throw new Error("PLACES_NOT_CONFIGURED");
  }

  const { resolvedUrl, placeId, textQuery } = await parseMapsUrl(mapsUrlInput);
  const place = await fetchPlaceFromMapsUrl(resolvedUrl, placeId, textQuery);
  const understanding = await understandFromPlace(place, lang);

  const generatedImages = await generateConceptImages({
    kind: understanding.kind,
    prompts: understanding.imagePrompts,
    name: understanding.name,
    city: understanding.city,
  });

  const heroUrl = place.photoUrls[0] || generatedImages.heroUrl;
  const secondaryUrl = place.photoUrls[1] || generatedImages.secondaryUrl;
  const detailUrl = place.photoUrls[2] || generatedImages.detailUrl;
  const imageSource = place.photoUrls.length > 0 ? "places" : generatedImages.source;

  const slug = await resolveUniqueSlug(place.name, place.placeId);
  const hostname = slug;

  const brief: DesignBrief = {
    name: understanding.name,
    subtitle: understanding.subtitle,
    city: understanding.city,
    hostname,
    url: place.website || place.mapsUrl,
    template: understanding.template,
    lang: understanding.lang,
    score: 72,
    findings: [
      lang === "de"
        ? "Konzept aus Google Maps — echte Öffnungszeiten und Fotos wo verfügbar."
        : "Concepto desde Google Maps — horarios y fotos reales cuando existen.",
    ],
    hoursHint: understanding.hoursHint,
    phoneHint: understanding.phoneHint,
    whatsappUrl: understanding.whatsappUrl,
    siteFacts: understanding.siteFacts,
    highlights: understanding.highlights,
    artDirection: understanding.artDirection,
    tagline: understanding.tagline,
    kind: understanding.kind,
    specialty: understanding.specialty,
    vibe: understanding.vibe,
    summary: understanding.summary,
    heroImageUrl: heroUrl,
    secondaryImageUrl: secondaryUrl,
    detailImageUrl: detailUrl,
    imageSource: imageSource as DesignBrief["imageSource"],
  };

  const { html, source } = await generateConceptHtml(brief);
  const id = makeConceptId(hostname);

  const concept: StoredConcept = {
    id,
    html,
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
    imageSource: imageSource as StoredConcept["imageSource"],
    heroImageUrl: heroUrl,
    secondaryImageUrl: secondaryUrl,
    detailImageUrl: detailUrl,
    lang: brief.lang,
    tagline: brief.tagline,
    phoneHint: brief.phoneHint,
    hoursHint: brief.hoursHint,
    whatsappUrl: brief.whatsappUrl,
    highlights: brief.highlights,
    siteFacts: brief.siteFacts,
    artDirection: brief.artDirection,
    slug,
    placeId: place.placeId,
    mapsUrl: place.mapsUrl,
    mapsSource: true,
    placeRating: place.rating,
    placeReviewCount: place.reviewCount,
    messages: [
      {
        role: "assistant",
        content:
          lang === "de"
            ? "Konzept aus Google Maps erstellt. Daten stammen von Google — bitte vor Pitch prüfen."
            : "Concepto creado desde Google Maps. Datos de Google — revisa antes del pitch.",
        at: new Date().toISOString(),
      },
    ],
  };

  const saved = await saveConcept(await applySeoToConcept(concept));

  const path = `/k/${slug}`;
  return {
    slug,
    conceptId: id,
    editToken: saved.editToken,
    path,
    previewUrl: path,
    name: concept.name,
  };
}
