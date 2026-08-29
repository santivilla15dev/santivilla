import { getConceptBySlug } from "@/lib/design-system/store";

export const runtime = "nodejs";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;
  const concept = await getConceptBySlug(slug);

  if (!concept) {
    return new Response(
      `<!DOCTYPE html><html><body style="font-family:system-ui;padding:2rem;background:#0a0c0b;color:#f3efe6"><h1>Konzept nicht gefunden</h1><p>Slug: ${slug}</p></body></html>`,
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
