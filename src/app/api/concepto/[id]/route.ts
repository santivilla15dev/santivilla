import {
  conceptEditTokenOk,
  conceptToApiResponse,
  getConcept,
  updateConcept,
} from "@/lib/design-system/store";
import { checkRateLimit } from "@/lib/audit/rate-limit";
import { syncConceptSeo } from "@/lib/seo/sync-concept-seo";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

const MAX_HTML = 500_000;

function clientKey(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return `concepto-patch:${forwarded.split(",")[0]?.trim()}`;
  return `concepto-patch:${req.headers.get("x-real-ip") || "unknown"}`;
}

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const concept = await getConcept(id);
    if (!concept) {
      return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    }
    return NextResponse.json(conceptToApiResponse(concept));
  } catch (err) {
    console.error("[concepto GET]", err);
    return NextResponse.json({ error: "INTERNAL" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: Params) {
  const limit = await checkRateLimit(clientKey(req));
  if (!limit.ok) {
    return NextResponse.json(
      {
        error: "RATE_LIMIT",
        message: `Demasiados guardados. Espera ${limit.retryAfterSec}s.`,
      },
      { status: 429 },
    );
  }

  try {
    const { id } = await params;
    let body: { html?: string; menuDraftId?: string | null; editToken?: string };
    try {
      body = (await req.json()) as typeof body;
    } catch {
      return NextResponse.json({ error: "BAD_JSON" }, { status: 400 });
    }

    const concept = await getConcept(id);
    if (!concept) {
      return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    }
    if (!conceptEditTokenOk(concept, body.editToken)) {
      return NextResponse.json(
        { error: "FORBIDDEN", message: "Solo quien generó el concepto puede editarlo." },
        { status: 403 },
      );
    }

    if (body.menuDraftId !== undefined) {
      const menuDraftId =
        typeof body.menuDraftId === "string" && body.menuDraftId.trim()
          ? body.menuDraftId.trim().slice(0, 80)
          : undefined;
      const next = {
        ...concept,
        menuDraftId,
      };
      const synced = await syncConceptSeo(next, {
        html: concept.html,
        mode: "create",
      });
      const updated = await updateConcept(id, {
        menuDraftId,
        html: synced.html,
        jsonLd: synced.jsonLd,
      });
      if (!updated) {
        return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
      }
      return NextResponse.json({
        id: updated.id,
        ok: true,
        name: updated.name,
        seoTypes: updated.jsonLd?.types || [],
      });
    }

    const html = typeof body.html === "string" ? body.html : "";
    if (html.length < 40 || html.length > MAX_HTML) {
      return NextResponse.json(
        { error: "BAD_HTML", message: "HTML inválido o demasiado grande." },
        { status: 400 },
      );
    }
    if (!/<html[\s>]/i.test(html) && !/<!DOCTYPE/i.test(html)) {
      return NextResponse.json(
        { error: "BAD_HTML", message: "Se espera un documento HTML completo." },
        { status: 400 },
      );
    }

    const synced = await syncConceptSeo(concept, { html, mode: "edit" });

    const updated = await updateConcept(id, {
      html: synced.html,
      siteFacts: synced.siteFacts,
      phoneHint: synced.phoneHint,
      emailHint: synced.emailHint,
      hoursHint: synced.hoursHint,
      jsonLd: synced.jsonLd,
    });
    if (!updated) {
      return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    }

    return NextResponse.json({
      id: updated.id,
      ok: true,
      name: updated.name,
      seoTypes: updated.jsonLd?.types || [],
    });
  } catch (err) {
    console.error("[concepto PATCH]", err);
    return NextResponse.json(
      { error: "INTERNAL", message: "No se pudo guardar el concepto." },
      { status: 500 },
    );
  }
}
