import "server-only";

import { generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import type { BusinessTemplate } from "@/lib/audit/types";
import {
  getArtDirection,
  type ArtDirection,
  type BusinessKind,
} from "@/lib/design-system/art-direction";
import {
  detectSiteTheme,
  parseBusinessTemplate,
  reconcileTheme,
} from "@/lib/design-system/classify-site";
import {
  extractSiteFacts,
  siteFactsSummary,
  type SiteFacts,
} from "@/lib/design-system/extract-site";
import { sanitizePromptsForKind } from "@/lib/design-system/images";

export type { BusinessKind };

export type BusinessUnderstanding = {
  name: string;
  subtitle: string;
  city: string;
  kind: BusinessKind;
  specialty: string;
  vibe: string;
  template: BusinessTemplate;
  lang: "es" | "de";
  tagline: string;
  imagePrompts: [string, string, string];
  summary: string;
  siteFacts: SiteFacts;
  phoneHint?: string;
  hoursHint?: string;
  emailHint?: string;
  whatsappUrl?: string;
  highlights: string[];
  artDirection: ArtDirection;
};

function stripTags(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function metaContent(html: string, name: string) {
  const re = new RegExp(
    `<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']+)["']`,
    "i",
  );
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']${name}["']`,
    "i",
  );
  return html.match(re)?.[1] || html.match(re2)?.[1] || "";
}

function extractTitle(html: string) {
  return stripTags(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
}

function extractH1(html: string) {
  return stripTags(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "");
}

/** Split long SEO titles into name + subtitle */
export function cleanBusinessName(raw: string) {
  const cleaned = raw
    .replace(/\s*[|\-–—]\s*/g, " | ")
    .replace(/\s+/g, " ")
    .trim();
  const parts = cleaned.split(" | ").map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 2) {
    return { name: parts[0].slice(0, 60), subtitle: parts.slice(1).join(" · ").slice(0, 80) };
  }
  const m = cleaned.match(/^(.{3,45}?)\s+(\d{4}\s+Wien.*)$/i);
  if (m) return { name: m[1].trim(), subtitle: m[2].trim().slice(0, 80) };
  return { name: cleaned.slice(0, 60), subtitle: "" };
}

function kindTagline(kind: BusinessKind, lang: "es" | "de", city: string) {
  const place = city || (lang === "de" ? "Wien" : "tu ciudad");
  const map: Record<BusinessKind, { es: string; de: string }> = {
    pizzeria: {
      es: `Pizza · ${place}`,
      de: `Pizza · ${place}`,
    },
    gasthaus: {
      es: `Cocina local · ${place}`,
      de: `Gastlichkeit · ${place}`,
    },
    cafe: {
      es: `Café · ${place}`,
      de: `Kaffee & Mehr · ${place}`,
    },
    friseur: {
      es: `Estilo · ${place}`,
      de: `Schnitt & Style · ${place}`,
    },
    shop: {
      es: `Local · ${place}`,
      de: `Lokal · ${place}`,
    },
    center: {
      es: `Shoppen & mehr · ${place}`,
      de: `Shoppen & mehr · ${place}`,
    },
    civic: {
      es: `Servicios ciudadanos · ${place}`,
      de: `Bürgerservice · ${place}`,
    },
    healthcare: {
      es: `Salud · ${place}`,
      de: `Gesundheit · ${place}`,
    },
    hotel: {
      es: `Hospitalidad · ${place}`,
      de: `Gastfreundschaft · ${place}`,
    },
    professional: {
      es: `Asesoría · ${place}`,
      de: `Beratung · ${place}`,
    },
    other: {
      es: `Claro en cada dispositivo`,
      de: `Klar auf jedem Gerät`,
    },
  };
  return map[kind][lang];
}

function applyThemeReconciliation(
  partial: Omit<BusinessUnderstanding, "artDirection" | "imagePrompts"> & {
    imagePrompts?: [string, string, string];
  },
  url: string,
  blob: string,
): BusinessUnderstanding {
  const reconciled = reconcileTheme({
    kind: partial.kind,
    specialty: partial.specialty,
    template: partial.template,
    name: partial.name,
    city: partial.city,
    summary: partial.summary,
    url,
    blob,
  });

  const imagePrompts = partial.imagePrompts
    ? sanitizePromptsForKind(
        reconciled.kind,
        partial.imagePrompts,
        partial.name,
        partial.city,
      )
    : reconciled.imagePrompts;

  return {
    ...partial,
    kind: reconciled.kind,
    specialty: reconciled.specialty,
    template: reconciled.template,
    artDirection: reconciled.artDirection,
    imagePrompts,
    vibe: partial.vibe || reconciled.artDirection.mood.slice(0, 80),
  };
}

function heuristicUnderstand(
  html: string,
  url: string,
  lang: "es" | "de",
): BusinessUnderstanding {
  const siteFacts = extractSiteFacts(html, url);
  const title = extractTitle(html);
  const h1 = extractH1(html);
  const desc =
    siteFacts.description ||
    metaContent(html, "description") ||
    metaContent(html, "og:description");
  const text = stripTags(html).slice(0, 4000);
  const blob = `${title} ${h1} ${desc} ${text} ${url}`;
  const { name, subtitle } = cleanBusinessName(h1 || title || new URL(url).hostname);
  const { kind, specialty, template } = detectSiteTheme({ blob, url });
  const cityMatch = blob.match(/\b(1\d{3})\s*Wien\b/i) || blob.match(/\bWien\b/i);
  const city = cityMatch
    ? cityMatch[0].includes("Wien")
      ? cityMatch[0]
      : "Wien"
    : /wien|vienna/i.test(blob)
      ? "Wien"
      : "";
  const summary =
    desc.slice(0, 120) ||
    `${specialty} — ${name}${city ? ` · ${city}` : ""}`;

  const partial = {
    name,
    subtitle: subtitle || siteFacts.addresses[0] || city,
    city: city || "Wien",
    kind,
    specialty,
    vibe: "",
    template,
    lang,
    tagline:
      desc.slice(0, 90) ||
      siteFacts.rawSnippets[0]?.slice(0, 90) ||
      kindTagline(kind, lang, city || "Wien"),
    summary,
    siteFacts,
    phoneHint: siteFacts.phones[0],
    hoursHint: siteFacts.hoursLines.slice(0, 3).join(" · ") || undefined,
    emailHint: siteFacts.emails[0],
    whatsappUrl: siteFacts.whatsapp || undefined,
    highlights: siteFacts.highlights.slice(0, 10),
  };

  return applyThemeReconciliation(partial, url, blob);
}

export async function understandBusiness(input: {
  html: string;
  url: string;
  lang: "es" | "de";
  fallbackName?: string;
}): Promise<BusinessUnderstanding> {
  const title = extractTitle(input.html);
  const h1 = extractH1(input.html);
  const text = stripTags(input.html).slice(0, 4000);
  const blob = `${title} ${h1} ${text} ${input.url}`;

  let base = heuristicUnderstand(input.html, input.url, input.lang);
  if (input.fallbackName && input.fallbackName.length > 2) {
    const cleaned = cleanBusinessName(input.fallbackName);
    if (cleaned.name.length >= 3) {
      base.name = cleaned.name;
      if (cleaned.subtitle) base.subtitle = cleaned.subtitle;
    }
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return base;

  try {
    const anthropic = createAnthropic({ apiKey });
    const snippet = stripTags(input.html).slice(0, 6000);
    const factsBlock = siteFactsSummary(base.siteFacts);
    const { text: claudeText } = await generateText({
      model: anthropic("claude-sonnet-4-5"),
      prompt: `Analyze this website and identify its REAL theme/purpose. Return ONLY valid JSON (no markdown) with keys:
name (short brand name, no address), subtitle (prefer real address from FACTS), city,
kind (pizzeria|gasthaus|cafe|friseur|shop|center|civic|healthcare|hotel|professional|other),
specialty (short label of what the site actually is),
vibe, template (restaurant|shop|center|civic), lang (es|de),
tagline (short; prefer real description from FACTS, do not invent),
imagePrompts (array of exactly 3 English cinematic photo prompts: hero 16:9, interior 4:3, detail 1:1; photorealistic; no text in image; MUST match the site's actual theme),
summary (one line from real site info).

THEME RULES (critical):
- Identify the site's REAL purpose from URL, title, and content — not random keywords.
- City portals (Stadt Wien, wien.at, municipal/government sites) = kind "civic", template "civic". NEVER "shop".
- Government sites may mention "shop" for online services — that is NOT retail.
- imagePrompts must match specialty: civic = city hall/plaza/public architecture; NOT boutique/clothing/store.
- Prefer extracted FACTS for address, phone, hours, description. Do NOT invent contact data.

URL: ${input.url}
Preferred lang: ${input.lang}
Heuristic guess: ${JSON.stringify({ ...base, siteFacts: undefined, artDirection: undefined, imagePrompts: undefined })}

EXTRACTED FACTS FROM WEBSITE:
${factsBlock}

Website text:
${snippet}`,
      maxOutputTokens: 1000,
    });
    const jsonMatch = claudeText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return base;

    const parsed = JSON.parse(jsonMatch[0]) as Partial<BusinessUnderstanding>;
    const kind = (parsed.kind || base.kind) as BusinessKind;
    const template = parseBusinessTemplate(parsed.template, base.template);
    const name = (parsed.name || base.name).slice(0, 60);
    const city = (parsed.city || base.city).slice(0, 40);
    const summary = (parsed.summary || base.summary).slice(0, 160);

    const artDirection = getArtDirection(kind, name, city);
    const rawPrompts =
      Array.isArray(parsed.imagePrompts) && parsed.imagePrompts.length >= 3
        ? ([
            parsed.imagePrompts[0],
            parsed.imagePrompts[1],
            parsed.imagePrompts[2],
          ] as [string, string, string])
        : Array.isArray(parsed.imagePrompts) && parsed.imagePrompts.length >= 2
          ? ([
              parsed.imagePrompts[0],
              parsed.imagePrompts[1],
              artDirection.imagePrompts[2],
            ] as [string, string, string])
          : artDirection.imagePrompts;

    return applyThemeReconciliation(
      {
        name,
        subtitle: (
          parsed.subtitle ||
          base.siteFacts.addresses[0] ||
          base.subtitle
        ).slice(0, 80),
        city,
        kind,
        specialty: (parsed.specialty || base.specialty).slice(0, 40),
        vibe: (parsed.vibe || artDirection.mood || base.vibe).slice(0, 80),
        template,
        lang: parsed.lang === "de" || parsed.lang === "es" ? parsed.lang : input.lang,
        tagline: (parsed.tagline || base.tagline).slice(0, 100),
        imagePrompts: rawPrompts,
        summary,
        siteFacts: base.siteFacts,
        phoneHint: base.phoneHint,
        hoursHint: base.hoursHint,
        emailHint: base.emailHint,
        whatsappUrl: base.whatsappUrl,
        highlights: base.highlights,
      },
      input.url,
      blob,
    );
  } catch {
    return base;
  }
}
