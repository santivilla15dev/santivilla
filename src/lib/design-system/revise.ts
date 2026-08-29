import { generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { artDirectionPromptBlock } from "@/lib/design-system/art-direction";
import { siteFactsSummary } from "@/lib/design-system/extract-site";
import { systemPromptForDesign } from "@/lib/design-system/examples";
import {
  extractHtml,
  isPremiumHtml,
} from "@/lib/design-system/generate";
import type { ConceptChatMessage, StoredConcept } from "@/lib/design-system/store";
import type { DesignBrief } from "@/lib/design-system/tokens";

export type ReviseResult = {
  html: string;
  reply: string;
  source: "claude" | "unchanged";
};

function briefFromConcept(concept: StoredConcept): DesignBrief {
  return {
    name: concept.name,
    hostname: concept.hostname,
    url: concept.url,
    template: (concept.template as DesignBrief["template"]) || "shop",
    lang: concept.lang === "de" ? "de" : "es",
    score: concept.score,
    findings: [],
    tagline: concept.tagline,
    phoneHint: concept.phoneHint,
    hoursHint: concept.hoursHint,
    emailHint: concept.emailHint,
    whatsappUrl: concept.whatsappUrl,
    highlights: concept.highlights,
    siteFacts: concept.siteFacts,
    artDirection: concept.artDirection,
    kind: concept.kind,
    specialty: concept.specialty,
    summary: concept.summary,
    heroImageUrl: concept.heroImageUrl,
    secondaryImageUrl: concept.secondaryImageUrl,
    detailImageUrl: concept.detailImageUrl,
    imageSource: concept.imageSource,
  };
}

function extractReply(text: string, lang: "es" | "de"): string {
  const m = text.match(/REPLY:\s*([\s\S]*?)(?:\nHTML:|\n<!DOCTYPE|<html)/i);
  if (m?.[1]) return m[1].trim().slice(0, 400);
  const line = text
    .split("\n")
    .map((l) => l.trim())
    .find((l) => l && !l.startsWith("<") && !l.startsWith("```"));
  if (line) return line.slice(0, 400);
  return lang === "de"
    ? "Konzept aktualisiert."
    : "Concepto actualizado.";
}

function historyBlock(messages: ConceptChatMessage[] | undefined) {
  const recent = (messages || []).slice(-6);
  if (!recent.length) return "(sin historial)";
  return recent
    .map((m) => `${m.role === "user" ? "User" : "Agent"}: ${m.content}`)
    .join("\n");
}

export async function reviseConceptHtml(input: {
  concept: StoredConcept;
  message: string;
  lang: "es" | "de";
}): Promise<ReviseResult> {
  const { concept, message, lang } = input;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      html: concept.html,
      reply:
        lang === "de"
          ? "Ohne ANTHROPIC_API_KEY kann ich das Konzept nicht umbauen. Bitte Key setzen."
          : "Sin ANTHROPIC_API_KEY no puedo rediseñar el concepto. Configura la clave.",
      source: "unchanged",
    };
  }

  const brief = briefFromConcept(concept);
  const facts = concept.siteFacts
    ? siteFactsSummary(concept.siteFacts)
    : "No structured facts stored.";
  const art = concept.artDirection
    ? artDirectionPromptBlock(concept.artDirection)
    : "Keep dark editorial premium look.";

  // Keep prompt size manageable
  const htmlSnippet = concept.html.slice(0, 120_000);

  try {
    const anthropic = createAnthropic({ apiKey });
    const { text } = await generateText({
      model: anthropic("claude-sonnet-4-5"),
      system: `${systemPromptForDesign()}

You are now in REVISION mode. The user chats with you to change an EXISTING concept HTML.
Output format STRICTLY:
1) First line(s): REPLY: <one short sentence in ${lang === "de" ? "German" : "Spanish"} explaining what you did or what data is missing>
2) Then the COMPLETE updated HTML document starting with <!DOCTYPE html> or <html>

Revision rules:
- Apply the user's request to the current HTML.
- Keep Konzept banner, Fraunces/Manrope, no emojis, no invented phones/hours/dishes.
- Keep existing image URLs (hero/secondary/detail) unless user pastes new ones.
- If user asks for a menu/Speisekarte and FACTS have no dishes: add a tasteful menu section ONLY with real highlights/nav items, OR in REPLY ask them to paste 3–5 dishes — do NOT invent a full fake menu.
- If request is impossible with facts, keep HTML mostly same and explain in REPLY.`,
      prompt: `Business: ${concept.name}
URL: ${concept.url}
Kind: ${concept.kind || "n/a"} · Lang preference: ${lang}

${art}

SITE FACTS:
${facts}

Phone: ${concept.phoneHint || "n/a"}
Hours: ${concept.hoursHint || "n/a"}
Highlights: ${(concept.highlights || []).join(", ") || "n/a"}
heroImageUrl: ${concept.heroImageUrl || ""}
secondaryImageUrl: ${concept.secondaryImageUrl || ""}
detailImageUrl: ${concept.detailImageUrl || ""}

CHAT HISTORY:
${historyBlock(concept.messages)}

USER REQUEST:
${message.slice(0, 4000)}

CURRENT HTML:
${htmlSnippet}`,
      maxOutputTokens: 12000,
    });

    const reply = extractReply(text, lang);
    let html: string;
    try {
      html = extractHtml(text);
    } catch {
      return { html: concept.html, reply, source: "unchanged" };
    }

    // Soft premium check: don't reject solely on missing Fraunces if already in old html
    const premiumOk =
      isPremiumHtml(html, brief) ||
      (!/[\u{1F300}-\u{1FAFF}]/u.test(html) &&
        html.includes("Konzept") &&
        (!brief.heroImageUrl || html.includes(brief.heroImageUrl)));

    if (!premiumOk) {
      return {
        html: concept.html,
        reply:
          lang === "de"
            ? `${reply} (Qualitätsschutz: HTML verworfen — bitte anders formulieren.)`
            : `${reply} (Protección de calidad: HTML descartado — reformula la petición.)`,
        source: "unchanged",
      };
    }

    return { html, reply, source: "claude" };
  } catch {
    return {
      html: concept.html,
      reply:
        lang === "de"
          ? "Revision fehlgeschlagen. Bitte nochmal versuchen."
          : "La revisión falló. Inténtalo otra vez.",
      source: "unchanged",
    };
  }
}
