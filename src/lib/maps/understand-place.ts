import {
  getArtDirection,
  type BusinessKind,
} from "@/lib/design-system/art-direction";
import {
  parseBusinessTemplate,
} from "@/lib/design-system/classify-site";
import type { SiteFacts } from "@/lib/design-system/extract-site";
import type { BusinessUnderstanding } from "@/lib/design-system/understand";
import { generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import type { PlaceFacts } from "./types";

function placeTypeToKind(primaryType?: string, types: string[] = []): BusinessKind {
  const blob = `${primaryType || ""} ${types.join(" ")}`.toLowerCase();
  if (/restaurant|gasthaus|meal|food|pizza|bar|cafe|coffee/i.test(blob)) {
    if (/pizza/i.test(blob)) return "pizzeria";
    if (/cafe|coffee/i.test(blob)) return "cafe";
    return "gasthaus";
  }
  if (/hair|beauty|salon|barber|friseur/i.test(blob)) return "friseur";
  if (/hotel|lodging/i.test(blob)) return "hotel";
  if (/store|shop|retail/i.test(blob)) return "shop";
  if (/doctor|health|hospital|pharmacy/i.test(blob)) return "healthcare";
  return "other";
}

function cityFromAddress(address: string): string {
  const wien = address.match(/\b(\d{4})\s+(Wien|Vienna)\b/i);
  if (wien) return "Wien";
  const parts = address.split(",").map((p) => p.trim());
  return parts[parts.length - 2] || parts[parts.length - 1] || "Wien";
}

function placeToSiteFacts(place: PlaceFacts): SiteFacts {
  const highlights = place.reviews
    .map((r) => r.text.slice(0, 120))
    .filter(Boolean);

  return {
    title: place.name,
    description: highlights[0] || place.address,
    phones: place.phone ? [place.phone] : [],
    emails: [],
    whatsapp: null,
    addresses: place.address ? [place.address] : [],
    hoursLines: place.hours,
    socialLinks: [{ label: "Google Maps", href: place.mapsUrl }],
    navLabels: [],
    ctas: place.website ? ["Website"] : [],
    highlights,
    rawSnippets: place.reviews.map((r) => r.text).slice(0, 5),
  };
}

function heuristicFromPlace(place: PlaceFacts, lang: "de" | "es"): BusinessUnderstanding {
  const kind = placeTypeToKind(place.primaryType, place.types);
  const city = cityFromAddress(place.address);
  const siteFacts = placeToSiteFacts(place);
  const template = parseBusinessTemplate(undefined, kind === "civic" ? "civic" : kind === "shop" ? "shop" : "restaurant");
  const artDirection = getArtDirection(kind, place.name, city);

  const ratingNote =
    place.rating && place.reviewCount
      ? `${place.rating}/5 (${place.reviewCount} Google)`
      : "";

  return {
    name: place.name,
    subtitle: place.address,
    city,
    kind,
    specialty: place.primaryType?.replace(/_/g, " ") || kind,
    vibe: "",
    template,
    lang,
    tagline: siteFacts.highlights[0]?.slice(0, 90) || place.name,
    imagePrompts: artDirection.imagePrompts,
    summary: `${place.name}${ratingNote ? ` · ${ratingNote}` : ""} — ${city}`,
    siteFacts,
    phoneHint: place.phone,
    hoursHint: place.hours.slice(0, 3).join(" · ") || undefined,
    whatsappUrl: undefined,
    highlights: siteFacts.highlights,
    artDirection,
  };
}

export async function understandFromPlace(
  place: PlaceFacts,
  lang: "de" | "es",
): Promise<BusinessUnderstanding> {
  const base = heuristicFromPlace(place, lang);
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) return base;

  try {
    const anthropic = createAnthropic({ apiKey });
    const reviewsBlock = place.reviews
      .map((r) => `- (${r.rating ?? "?"}★) ${r.text.slice(0, 200)}`)
      .join("\n");

    const { text } = await generateText({
      model: anthropic("claude-sonnet-4-5"),
      prompt: `Analyze this Google Maps business. Return ONLY valid JSON (no markdown):
{ name, subtitle, city, kind (pizzeria|gasthaus|cafe|friseur|shop|center|civic|healthcare|hotel|professional|other),
specialty, vibe, template (restaurant|shop|center|civic), lang (${lang}),
tagline (short, from reviews/facts only), summary (one line),
imagePrompts (array of 3 English photo prompts matching the business) }

Do NOT invent menu items, prices, or contact data not in PLACE FACTS.

PLACE FACTS:
Name: ${place.name}
Address: ${place.address}
Phone: ${place.phone || "—"}
Hours: ${place.hours.join("; ") || "—"}
Rating: ${place.rating ?? "—"} (${place.reviewCount ?? 0} reviews)
Type: ${place.primaryType || "—"}
Reviews:
${reviewsBlock || "—"}`,
      maxOutputTokens: 900,
    });

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return base;

    const parsed = JSON.parse(jsonMatch[0]) as Partial<BusinessUnderstanding>;
    const kind = (parsed.kind || base.kind) as BusinessKind;
    const city = (parsed.city || base.city).slice(0, 40);
    const artDirection = getArtDirection(kind, parsed.name || base.name, city);

    return {
      ...base,
      name: (parsed.name || base.name).slice(0, 60),
      subtitle: (parsed.subtitle || base.subtitle).slice(0, 120),
      city,
      kind,
      specialty: (parsed.specialty || base.specialty).slice(0, 60),
      vibe: (parsed.vibe || base.vibe).slice(0, 80),
      template: parseBusinessTemplate(parsed.template, base.template),
      lang: parsed.lang === "de" ? "de" : lang,
      tagline: (parsed.tagline || base.tagline).slice(0, 120),
      summary: (parsed.summary || base.summary).slice(0, 160),
      imagePrompts:
        Array.isArray(parsed.imagePrompts) && parsed.imagePrompts.length >= 3
          ? ([
              String(parsed.imagePrompts[0]),
              String(parsed.imagePrompts[1]),
              String(parsed.imagePrompts[2]),
            ] as [string, string, string])
          : artDirection.imagePrompts,
      artDirection,
    };
  } catch {
    return base;
  }
}
