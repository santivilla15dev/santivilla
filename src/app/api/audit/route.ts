import {
  analyzeHtml,
  extractHtmlSnippets,
  fetchPageHtml,
  normalizeAuditUrl,
} from "@/lib/audit/heuristics";
import { appendLighthouseFindings } from "@/lib/audit/lighthouse-findings";
import {
  fetchPageSpeedInsights,
  isPageSpeedConfigured,
} from "@/lib/audit/pagespeed";
import { checkPsiRateLimit, checkRateLimit } from "@/lib/audit/rate-limit";
import type { AuditLang, AuditRequestBody, AuditResult } from "@/lib/audit/types";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function clientKey(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

function parseBody(body: AuditRequestBody, lang: AuditLang) {
  if (!body.url || typeof body.url !== "string" || body.url.length > 500) {
    return {
      error: NextResponse.json(
        { error: "BAD_URL", message: "Pega una URL válida." },
        { status: 400 },
      ),
    };
  }

  try {
    return { url: normalizeAuditUrl(body.url), lang };
  } catch {
    return {
      error: NextResponse.json(
        {
          error: "INVALID_URL",
          message:
            lang === "de"
              ? "URL ungültig oder nicht erlaubt."
              : "URL inválida o no permitida.",
        },
        { status: 400 },
      ),
    };
  }
}

export async function POST(req: Request) {
  const key = clientKey(req);
  const limit = await checkRateLimit(key);
  if (!limit.ok) {
    return NextResponse.json(
      {
        error: "RATE_LIMIT",
        message: `Demasiados escaneos. Prueba en ${limit.retryAfterSec}s.`,
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSec) },
      },
    );
  }

  let body: AuditRequestBody;
  try {
    body = (await req.json()) as AuditRequestBody;
  } catch {
    return NextResponse.json(
      { error: "BAD_JSON", message: "Cuerpo inválido." },
      { status: 400 },
    );
  }

  const lang: AuditLang = body.lang === "de" ? "de" : "es";
  const parsed = parseBody(body, lang);
  if ("error" in parsed) return parsed.error;
  const { url } = parsed;

  try {
    const { html, fetchMs } = await fetchPageHtml(url);
    const result = analyzeHtml(url, html, lang, fetchMs);
    const htmlSnippets = extractHtmlSnippets(html, fetchMs);
    return NextResponse.json({
      result,
      htmlSnippets,
      psiAvailable: isPageSpeedConfigured(),
    });
  } catch (err) {
    const code = err instanceof Error ? err.message : "FETCH_FAIL";
    const message =
      lang === "de"
        ? "Seite nicht lesbar (Timeout, Block oder kein HTML)."
        : "No pude leer la página (timeout, bloqueo o no es HTML).";
    return NextResponse.json({ error: code, message }, { status: 422 });
  }
}

export async function PATCH(req: Request) {
  if (!isPageSpeedConfigured()) {
    return NextResponse.json({ lighthouse: null, psiAvailable: false });
  }

  const key = clientKey(req);
  const psiLimit = await checkPsiRateLimit(key);
  if (!psiLimit.ok) {
    return NextResponse.json(
      {
        error: "PSI_RATE_LIMIT",
        message: `Lighthouse limit. Retry in ${psiLimit.retryAfterSec}s.`,
        retryAfterSec: psiLimit.retryAfterSec,
      },
      {
        status: 429,
        headers: { "Retry-After": String(psiLimit.retryAfterSec) },
      },
    );
  }

  try {
    let body: AuditRequestBody & { baseResult?: AuditResult };
    try {
      body = (await req.json()) as AuditRequestBody & { baseResult?: AuditResult };
    } catch {
      return NextResponse.json(
        { error: "BAD_JSON", message: "Cuerpo inválido." },
        { status: 400 },
      );
    }

    const lang: AuditLang = body.lang === "de" ? "de" : "es";
    const parsed = parseBody(body, lang);
    if ("error" in parsed) return parsed.error;
    const { url } = parsed;

    const lighthouse = await fetchPageSpeedInsights(url, "mobile");
    if (!lighthouse) {
      return NextResponse.json({ lighthouse: null, psiAvailable: true });
    }

    if (body.baseResult) {
      const merged = appendLighthouseFindings(body.baseResult, lighthouse, lang);
      return NextResponse.json({
        lighthouse,
        findings: merged.findings,
        psiAvailable: true,
      });
    }

    return NextResponse.json({ lighthouse, psiAvailable: true });
  } catch (err) {
    console.error("[audit PATCH]", err);
    return NextResponse.json(
      { error: "INTERNAL", message: "Lighthouse check failed." },
      { status: 500 },
    );
  }
}
