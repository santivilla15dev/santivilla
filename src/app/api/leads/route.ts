import { saveLead } from "@/lib/crm/store";
import { NextResponse } from "next/server";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  message?: string;
  utm?: Record<string, string>;
};

export async function POST(req: Request) {
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
      source: "contact",
      name: name || undefined,
      email: email || undefined,
      phone: body.phone?.trim() || undefined,
      businessName: businessName || undefined,
      notes: body.message?.trim() || undefined,
      utm: body.utm,
    });

    return NextResponse.json({ id: lead.id, ok: true });
  } catch {
    return NextResponse.json({ error: "SAVE_FAILED" }, { status: 500 });
  }
}
