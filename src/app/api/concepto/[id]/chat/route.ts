import { reviseConceptHtml } from "@/lib/design-system/revise";
import {
  appendConceptMessages,
  getConcept,
  updateConcept,
} from "@/lib/design-system/store";
import { syncConceptSeo } from "@/lib/seo/sync-concept-seo";
import { checkRateLimit } from "@/lib/audit/rate-limit";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 120;

type Params = { params: Promise<{ id: string }> };

function clientKey(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return `concepto-chat:${forwarded.split(",")[0]?.trim()}`;
  return `concepto-chat:${req.headers.get("x-real-ip") || "unknown"}`;
}

export async function POST(req: Request, { params }: Params) {
  const limit = await checkRateLimit(clientKey(req));
  if (!limit.ok) {
    return NextResponse.json(
      {
        error: "RATE_LIMIT",
        message: `Demasiados mensajes. Espera ${limit.retryAfterSec}s.`,
      },
      { status: 429 },
    );
  }

  const { id } = await params;
  const concept = await getConcept(id);
  if (!concept) {
    return NextResponse.json(
      {
        error: "NOT_FOUND",
        message: "Concepto no encontrado o expirado. Genera uno de nuevo.",
      },
      { status: 404 },
    );
  }

  let body: { message?: string; lang?: string };
  try {
    body = (await req.json()) as { message?: string; lang?: string };
  } catch {
    return NextResponse.json({ error: "BAD_JSON" }, { status: 400 });
  }

  const message = (body.message || "").trim().slice(0, 4000);
  if (message.length < 2) {
    return NextResponse.json(
      { error: "BAD_MESSAGE", message: "Escribe qué quieres cambiar." },
      { status: 400 },
    );
  }

  const lang: "es" | "de" =
    body.lang === "de" || concept.lang === "de" ? "de" : "es";

  const now = new Date().toISOString();
  await appendConceptMessages(id, [
    { role: "user", content: message, at: now },
  ]);

  const fresh = await getConcept(id);
  if (!fresh) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  const result = await reviseConceptHtml({
    concept: fresh,
    message,
    lang,
  });

  const synced =
    result.source === "claude"
      ? await syncConceptSeo(fresh, { html: result.html, mode: "edit" })
      : null;

  const replyAt = new Date().toISOString();
  const nextMessages = [
    ...(fresh.messages || []),
    {
      role: "assistant" as const,
      content: result.reply,
      at: replyAt,
    },
  ].slice(-40);

  await updateConcept(id, {
    html: synced?.html ?? result.html,
    source: result.source === "claude" ? "claude" : fresh.source,
    messages: nextMessages,
    ...(synced
      ? {
          siteFacts: synced.siteFacts,
          phoneHint: synced.phoneHint,
          emailHint: synced.emailHint,
          hoursHint: synced.hoursHint,
          jsonLd: synced.jsonLd,
        }
      : {}),
  });

  const updated = await getConcept(id);

  return NextResponse.json({
    ok: true,
    reply: result.reply,
    html: synced?.html ?? result.html,
    source: result.source,
    messages: updated?.messages || [],
    seoTypes: updated?.jsonLd?.types || [],
  });
}
