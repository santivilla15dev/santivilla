import { checkLeadRateLimit } from "@/lib/audit/rate-limit";
import { notifyNewLead } from "@/lib/crm/notify-lead";
import { saveLead } from "@/lib/crm/store";
import { NextResponse } from "next/server";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  message?: string;
  source?: "contact" | "demo";
  utm?: Record<string, string>;
};

export async function POST(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  const key = forwarded
    ? forwarded.split(",")[0]?.trim() || "unknown"
    : req.headers.get("x-real-ip") || "unknown";
  const limit = await checkLeadRateLimit(key);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "RATE_LIMIT", message: "Demasiados envíos. Prueba más tarde." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "BAD_JSON" }, { status: 400 });
  }

  const email = (body.email || "").trim();
  const name = (body.name || "").trim();
  const businessName = (body.businessName || "").trim();

  if (!email && !name && !businessName) {
    return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
  }

  try {
    const lead = await saveLead({
      source: body.source === "demo" ? "demo" : "contact",
      name: name || undefined,
      email: email || undefined,
      phone: body.phone?.trim() || undefined,
      businessName: businessName || undefined,
      notes: body.message?.trim() || undefined,
      utm: body.utm,
    });

    void notifyNewLead(lead);
    return NextResponse.json({ id: lead.id, ok: true });
  } catch {
    return NextResponse.json({ error: "SAVE_FAILED" }, { status: 500 });
  }
}
