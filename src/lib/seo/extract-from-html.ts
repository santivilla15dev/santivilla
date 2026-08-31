import "server-only";

import type { SiteFacts } from "@/lib/design-system/extract-site";
import { generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import type { ExtractedMenuSection, HtmlExtractResult } from "./types";

const extractSchema = z.object({
  phones: z.array(z.string()).max(3),
  emails: z.array(z.string()).max(3),
  addresses: z.array(z.string()).max(3),
  hoursLines: z.array(z.string()).max(10),
  menuSections: z
    .array(
      z.object({
        title: z.string(),
        items: z
          .array(
            z.object({
              name: z.string(),
              price: z.string().optional(),
              description: z.string().optional(),
            }),
          )
          .max(20),
      }),
    )
    .max(8)
    .optional(),
});

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function uniq(items: string[], max = 8): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    const t = item.trim();
    if (!t || seen.has(t.toLowerCase())) continue;
    seen.add(t.toLowerCase());
    out.push(t);
    if (out.length >= max) break;
  }
  return out;
}

function isValidPhone(s: string): boolean {
  const digits = s.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function heuristicExtract(html: string): HtmlExtractResult {
  const text = stripHtml(html);

  const phones = uniq(
    [
      ...(text.match(/\+?\d[\d\s\-()/]{7,18}\d/g) || []),
      ...(html.match(/href=["']tel:([^"']+)["']/gi)?.map((m) =>
        m.replace(/href=["']tel:/i, "").replace(/["']$/, ""),
      ) || []),
    ].filter(isValidPhone),
    3,
  );

  const emails = uniq(
    [
      ...(text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || []),
      ...(html.match(/href=["']mailto:([^"']+)["']/gi)?.map((m) =>
        m.replace(/href=["']mailto:/i, "").replace(/["']$/, ""),
      ) || []),
    ].filter(isValidEmail),
    3,
  );

  const dayRe =
    /\b(?:Mo|Di|Mi|Do|Fr|Sa|So|Mon|Tue|Wed|Thu|Fri|Sat|Sun|Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag)[a-zäöüß.]*\s*[-–bisàto]*\s*(?:Mo|Di|Mi|Do|Fr|Sa|So|Mon|Tue|Wed|Thu|Fri|Sat|Sun|Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag)?[a-zäöüß.]*\s*[:.]?\s*\d{1,2}[:.]\d{2}\s*[-–]\s*\d{1,2}[:.]\d{2}/gi;
  const hoursLines = uniq(text.match(dayRe) || [], 10);

  const addresses = uniq(
    text.match(
      /\b\d{4}\s+Wien(?:[,\s]+[A-Za-zÄÖÜäöüß\-]+\s+\d+[a-zA-Z]?)?\b/gi,
    ) || [],
    3,
  );

  return { phones, emails, addresses, hoursLines };
}

function mergeFacts(
  existing: SiteFacts | undefined,
  extracted: HtmlExtractResult,
): SiteFacts {
  const base: SiteFacts = existing || {
    title: "",
    description: "",
    phones: [],
    emails: [],
    whatsapp: null,
    addresses: [],
    hoursLines: [],
    socialLinks: [],
    navLabels: [],
    ctas: [],
    highlights: [],
    rawSnippets: [],
  };

  return {
    ...base,
    phones: extracted.phones.length ? extracted.phones : base.phones,
    emails: extracted.emails.length ? extracted.emails : base.emails,
    addresses: extracted.addresses.length ? extracted.addresses : base.addresses,
    hoursLines: extracted.hoursLines.length
      ? extracted.hoursLines
      : base.hoursLines,
  };
}

export async function extractFactsFromHtml(
  html: string,
  existing?: SiteFacts,
): Promise<{ extracted: HtmlExtractResult; siteFacts: SiteFacts }> {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  let extracted: HtmlExtractResult;

  if (apiKey && html.length > 200) {
    try {
      const anthropic = createAnthropic({ apiKey });
      const plain = stripHtml(html).slice(0, 12_000);
      const { text } = await generateText({
        model: anthropic("claude-sonnet-4-5"),
        prompt: `Extract ONLY facts visibly present in this HTML text. Return ONLY valid JSON matching this shape:
{"phones":[],"emails":[],"addresses":[],"hoursLines":[],"menuSections":[{"title":"Section","items":[{"name":"Dish","price":"€12,90","description":"optional"}]}]}

Rules:
- Do NOT invent phone numbers, prices, or hours.
- menuSections only if dishes with names appear in the HTML.
- Max 8 menu sections, 20 items each.
- hoursLines as printed (e.g. "Mo–Fr 10:00–22:00").

HTML TEXT:
${plain}`,
        maxOutputTokens: 1200,
      });

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = extractSchema.safeParse(JSON.parse(jsonMatch[0]));
        if (parsed.success) {
          extracted = parsed.data;
        } else {
          extracted = heuristicExtract(html);
        }
      } else {
        extracted = heuristicExtract(html);
      }
    } catch {
      extracted = heuristicExtract(html);
    }
  } else {
    extracted = heuristicExtract(html);
  }

  extracted.phones = extracted.phones.filter(isValidPhone);
  extracted.emails = extracted.emails.filter(isValidEmail);

  return {
    extracted,
    siteFacts: mergeFacts(existing, extracted),
  };
}

export function hintsFromSiteFacts(siteFacts: SiteFacts): {
  phoneHint?: string;
  emailHint?: string;
  hoursHint?: string;
} {
  return {
    phoneHint: siteFacts.phones[0],
    emailHint: siteFacts.emails[0],
    hoursHint: siteFacts.hoursLines.slice(0, 3).join(" · ") || undefined,
  };
}
