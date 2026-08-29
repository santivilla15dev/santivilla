import { generateAiDiagnosis } from "@/lib/audit/diagnose";
import { checkDiagnoseRateLimit } from "@/lib/audit/rate-limit";
import { saveAuditReport } from "@/lib/audit/store";
import type {
  AuditHtmlSnippets,
  AuditLang,
  AuditReport,
  AuditResult,
} from "@/lib/audit/types";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

function clientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

type Body = {
  result?: AuditResult;
  lang?: AuditLang;
  htmlSnippets?: AuditHtmlSnippets;
  conceptId?: string;
};

export async function POST(req: Request) {
  const limit = await checkDiagnoseRateLimit(clientKey(req));
  if (!limit.ok) {
    return NextResponse.json(
      {
        error: "RATE_LIMIT",
        message: `Too many diagnoses. Try again in ${Math.ceil(limit.retryAfterSec / 60)} min.`,
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

  const result = body.result;
  const lang: AuditLang = body.lang === "de" ? "de" : "es";

  if (!result?.id || !result.url) {
    return NextResponse.json(
      { error: "BAD_RESULT", message: "Missing audit result." },
      { status: 400 },
    );
  }

  try {
    const diagnosis = await generateAiDiagnosis({
      result,
      lang,
      htmlSnippets: body.htmlSnippets,
    });

    const report: AuditReport = {
      ...result,
      lang,
      diagnosis,
      htmlSnippets: body.htmlSnippets,
      conceptId: body.conceptId?.slice(0, 80),
    };

    await saveAuditReport(report);

    try {
      const { upsertLeadFromAudit } = await import("@/lib/crm/store");
      await upsertLeadFromAudit({
        auditReportId: result.id,
        url: result.url,
        hostname: result.hostname,
        conceptId: body.conceptId,
      });
    } catch {
      // non-blocking
    }

    const reportPath = `/${lang}/auditoria/report/${result.id}`;

    return NextResponse.json({
      reportId: result.id,
      diagnosis,
      reportPath,
    });
  } catch {
    return NextResponse.json(
      {
        error: "DIAGNOSE_FAILED",
        message:
          lang === "de"
            ? "Diagnose fehlgeschlagen."
            : "Diagnóstico fallido.",
      },
      { status: 500 },
    );
  }
}
