import "server-only";

import { generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import type {
  AiDiagnosis,
  AuditHtmlSnippets,
  AuditLang,
  AuditResult,
  CriticalPoint,
} from "./types";

const diagnosisSchema = z.object({
  headline: z.string().max(200),
  executiveSummary: z.string().max(500),
  criticalPoints: z
    .array(
      z.object({
        title: z.string().max(120),
        impact: z.string().max(220),
        recommendation: z.string().max(220),
      }),
    )
    .length(3),
  audioScript: z.string().max(600),
});

function formatLighthouseBlock(result: AuditResult): string {
  const lh = result.lighthouse;
  if (!lh) return "Lighthouse: not available";
  return [
    `Lighthouse mobile performance: ${lh.performance}/100`,
    `Accessibility: ${lh.accessibility}/100`,
    `LCP: ${Math.round(lh.lcpMs)}ms`,
    `FCP: ${Math.round(lh.fcpMs)}ms`,
    `CLS: ${lh.cls.toFixed(3)}`,
    `TBT: ${Math.round(lh.tbtMs)}ms`,
  ].join("\n");
}

function formatFindingsBlock(result: AuditResult): string {
  return result.findings
    .filter((f) => f.severity !== "ok")
    .map((f) => `[${f.severity}] ${f.title}: ${f.detail}`)
    .join("\n");
}

function formatSnippetsBlock(snippets?: AuditHtmlSnippets): string {
  if (!snippets) return "HTML snippets: none";
  return [
    `PDF links: ${snippets.pdfLinks.length ? snippets.pdfLinks.join(", ") : "none"}`,
    `Menu in PDF: ${snippets.menuInPdf ? "yes" : "no"}`,
    `WhatsApp on page: ${snippets.hasWhatsApp ? "yes" : "no"}`,
    `HTML fetch time: ${Math.round(snippets.fetchMs)}ms`,
  ].join("\n");
}

function fallbackDiagnosis(
  result: AuditResult,
  lang: AuditLang,
): AiDiagnosis {
  const issues = result.findings.filter((f) => f.severity !== "ok").slice(0, 3);
  while (issues.length < 3) {
    issues.push({
      id: `fallback-${issues.length}`,
      severity: "warn",
      title:
        lang === "de"
          ? "Conversion auf dem Handy"
          : "Conversión en móvil",
      detail:
        lang === "de"
          ? "Kontakt und Infos sollten ohne Scrollen erreichbar sein."
          : "Contacto e info deberían estar a un scroll.",
    });
  }

  const criticalPoints: CriticalPoint[] = issues.map((f) => ({
    title: f.title,
    impact: f.detail,
    recommendation:
      lang === "de"
        ? `Beheben: ${f.title} — spürbar mehr Anfragen auf Mobile.`
        : `Corregir: ${f.title} — más consultas desde el móvil.`,
  }));

  const headline = result.verdict;
  const executiveSummary =
    lang === "de"
      ? `UX-Score ${result.uxScore}/100 (${result.grade}). ${result.agentLines[0] || ""}`
      : `Score UX ${result.uxScore}/100 (${result.grade}). ${result.agentLines[0] || ""}`;

  const audioScript =
    lang === "de"
      ? `Hallo — Santi hier. Ich habe ${result.hostname} gescannt. Score ${result.uxScore} von 100. ${criticalPoints[0]?.title}. ${criticalPoints[1]?.title}. Wir können das in einem Sprint fixen — melde dich.`
      : `Hola — soy Santi. Analicé ${result.hostname}. Score ${result.uxScore} de 100. ${criticalPoints[0]?.title}. ${criticalPoints[1]?.title}. Lo arreglamos en un sprint — escríbeme.`;

  return {
    headline,
    executiveSummary,
    criticalPoints,
    audioScript: audioScript.slice(0, 550),
    generatedAt: new Date().toISOString(),
    source: "fallback",
  };
}

export function isDiagnoseConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY?.trim());
}

export async function generateAiDiagnosis(input: {
  result: AuditResult;
  lang: AuditLang;
  htmlSnippets?: AuditHtmlSnippets;
}): Promise<AiDiagnosis> {
  const { result, lang, htmlSnippets } = input;
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) return fallbackDiagnosis(result, lang);

  try {
    const anthropic = createAnthropic({ apiKey });
    const { text } = await generateText({
      model: anthropic("claude-sonnet-4-5"),
      prompt: `You are a direct web consultant for local businesses (restaurants, shops) in ${lang === "de" ? "Austria/Germany" : "Spain/LATAM"}.

Analyze this Mobile Erst audit and return ONLY valid JSON (no markdown):
{
  "headline": "one punchy sentence for the owner",
  "executiveSummary": "2 sentences max",
  "criticalPoints": [
    { "title": "...", "impact": "concrete customer loss (e.g. PDF menu 8s on 4G)", "recommendation": "actionable fix" }
  ],
  "audioScript": "~75-90 words, spoken tone, first person as Santi, ~30 seconds when read aloud"
}

RULES:
- Exactly 3 criticalPoints — real customer/revenue loss angles
- ONLY use facts from FINDINGS, Lighthouse, or SNIPPETS below — do NOT invent prices, dishes, or phone numbers
- Write in ${lang === "de" ? "German (AT tone)" : "Spanish"}
- If PDF menu detected, mention slow 4G download impact when relevant
- audioScript must be natural for text-to-speech

SITE: ${result.hostname} (${result.url})
UX score: ${result.uxScore}/100 (${result.grade})
Template: ${result.template}
Package suggestion: ${result.packageLabel}

${formatLighthouseBlock(result)}

FINDINGS:
${formatFindingsBlock(result)}

SNIPPETS:
${formatSnippetsBlock(htmlSnippets)}

Current verdict: ${result.verdict}`,
      maxOutputTokens: 1200,
    });

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return fallbackDiagnosis(result, lang);

    const parsed = diagnosisSchema.safeParse(JSON.parse(jsonMatch[0]));
    if (!parsed.success) return fallbackDiagnosis(result, lang);

    return {
      ...parsed.data,
      generatedAt: new Date().toISOString(),
      source: "anthropic",
    };
  } catch {
    return fallbackDiagnosis(result, lang);
  }
}
