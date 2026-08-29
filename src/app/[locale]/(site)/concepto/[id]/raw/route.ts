import { getConcept } from "@/lib/design-system/store";
import { localizedPath } from "@/lib/i18n/paths";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n/locales";

export const runtime = "nodejs";

type Params = { params: Promise<{ locale: string; id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { locale: raw, id } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const auditHref = localizedPath(locale, "/auditoria");

  const concept = await getConcept(id);
  if (!concept) {
    return new Response(
      `<!DOCTYPE html><html><body style="font-family:system-ui;padding:2rem"><h1>Konzept abgelaufen</h1><p>Bitte erneut unter Mobile Erst generieren.</p><a href="${auditHref}">Mobile Erst</a></body></html>`,
      { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }
  return new Response(concept.html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Security-Policy": "sandbox allow-scripts",
      "X-Robots-Tag": "noindex",
    },
  });
}
