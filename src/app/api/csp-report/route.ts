import { NextResponse } from "next/server";

export const runtime = "nodejs";

type CspReport = {
  "csp-report"?: {
    "document-uri"?: string;
    "violated-directive"?: string;
    "blocked-uri"?: string;
  };
};

// Receptor de violaciones CSP (modo report-only). Los reportes salen en los
// logs de Vercel para afinar la política antes de enforce.
export async function POST(req: Request) {
  try {
    const report = (await req.json()) as CspReport;
    const r = report["csp-report"];
    if (r) {
      console.warn("CSP-REPORT", {
        document: r["document-uri"],
        directive: r["violated-directive"],
        blocked: r["blocked-uri"],
      });
    }
  } catch {
    // body vacío o malformado — igualmente 204
  }
  return new NextResponse(null, { status: 204 });
}
