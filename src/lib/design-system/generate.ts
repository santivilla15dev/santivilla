import "server-only";

import { generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { buildConceptHtml } from "@/lib/design-system/build-html";
import {
  systemPromptForDesign,
  userPromptForDesign,
} from "@/lib/design-system/examples";
import { isRetailImageUrl } from "@/lib/design-system/images";
import type { DesignBrief } from "@/lib/design-system/tokens";

export function extractHtml(text: string) {
  const fenced = text.match(/```html([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf("<!DOCTYPE");
  const startHtml = raw.indexOf("<html");
  const begin =
    start >= 0 ? start : startHtml >= 0 ? startHtml : raw.indexOf("<");
  const html = begin >= 0 ? raw.slice(begin) : raw;
  if (!/<html[\s>]/i.test(html) && !/<!DOCTYPE/i.test(html)) {
    throw new Error("BAD_HTML");
  }
  return html.trim().slice(0, 400_000);
}

function allowedImageUrls(brief: DesignBrief): Set<string> {
  const urls = new Set<string>();
  if (brief.heroImageUrl) urls.add(brief.heroImageUrl);
  if (brief.secondaryImageUrl) urls.add(brief.secondaryImageUrl);
  if (brief.detailImageUrl) urls.add(brief.detailImageUrl);
  return urls;
}

function countForeignImages(html: string, allowed: Set<string>): number {
  const imgRe = /<img[^>]+src=["']([^"']+)["']/gi;
  let foreign = 0;
  let m: RegExpExecArray | null;
  while ((m = imgRe.exec(html)) !== null) {
    const src = m[1];
    if (!allowed.has(src)) foreign += 1;
  }
  return foreign;
}

const RETAIL_SRC_RE =
  /(src=["'])(https?:\/\/[^"']*(?:1441986300917|1472851294608|1523275335684)[^"']*)(["'])/gi;

/** Replace retail image URLs in HTML with brief URLs as fallback. */
export function sanitizeConceptHtml(html: string, brief: DesignBrief): string {
  let out = html;
  if (isRetailImageUrl(out)) {
    const replacement =
      brief.heroImageUrl ||
      brief.secondaryImageUrl ||
      brief.detailImageUrl ||
      "";
    if (replacement) {
      out = out.replace(RETAIL_SRC_RE, `$1${replacement}$3`);
    }
  }
  return out;
}

/** Reject amateur Claude output (emojis / missing provided images). */
export function isPremiumHtml(html: string, brief: DesignBrief): boolean {
  const emojiRe =
    /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/u;
  if (emojiRe.test(html)) return false;

  if (/nuestras especialidades|our specialties|🍕|🇪🇸|🍷|🌿|🎉|📍/i.test(html)) {
    return false;
  }

  if (brief.heroImageUrl && !html.includes(brief.heroImageUrl)) return false;
  if (brief.secondaryImageUrl && !html.includes(brief.secondaryImageUrl)) {
    return false;
  }

  if (!/fonts\.googleapis\.com.*Fraunces/i.test(html) && !/Fraunces/i.test(html)) {
    return false;
  }

  const isCivic = brief.kind === "civic" || brief.template === "civic";
  if (isCivic && isRetailImageUrl(html)) return false;

  const allowed = allowedImageUrls(brief);
  if (allowed.size > 0 && countForeignImages(html, allowed) > 0) {
    return false;
  }

  return true;
}

export async function generateConceptHtml(brief: DesignBrief): Promise<{
  html: string;
  source: "template" | "claude";
  art: "premium";
}> {
  const fallback = buildConceptHtml(brief);

  if (brief.kind === "civic" || brief.template === "civic") {
    return { html: fallback, source: "template", art: "premium" };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return { html: fallback, source: "template", art: "premium" };
  }

  try {
    const anthropic = createAnthropic({ apiKey });
    const { text } = await generateText({
      model: anthropic("claude-sonnet-4-5"),
      system: systemPromptForDesign(),
      prompt: userPromptForDesign(brief),
      maxOutputTokens: 12000,
    });
    let html = extractHtml(text);
    html = sanitizeConceptHtml(html, brief);
    if (!isPremiumHtml(html, brief)) {
      return { html: fallback, source: "template", art: "premium" };
    }
    return { html, source: "claude", art: "premium" };
  } catch {
    return { html: fallback, source: "template", art: "premium" };
  }
}
