import { requireAdmin } from "@/lib/auth/require-role";
import { getLead, listLeads, updateLead } from "@/lib/crm/store";
import type { LeadStatus } from "@/lib/crm/types";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  const url = new URL(req.url);
  const status = url.searchParams.get("status") as LeadStatus | null;
  const source = url.searchParams.get("source");
  const q = url.searchParams.get("q") ?? undefined;

  try {
    const leads = await listLeads({
      status: status ?? undefined,
      source: source ?? undefined,
      q,
    });
    return NextResponse.json({ leads });
  } catch {
    return NextResponse.json({ error: "LIST_FAILED" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  let body: { id?: string; status?: LeadStatus; notes?: string };
  try {
    body = (await req.json()) as { id?: string; status?: LeadStatus; notes?: string };
  } catch {
    return NextResponse.json({ error: "BAD_JSON" }, { status: 400 });
  }

  if (!body.id) return NextResponse.json({ error: "MISSING_ID" }, { status: 400 });

  try {
    const lead = await updateLead(body.id, { status: body.status, notes: body.notes });
    if (!lead) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    return NextResponse.json({ lead });
  } catch {
    return NextResponse.json({ error: "UPDATE_FAILED" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "MISSING_ID" }, { status: 400 });

  try {
    const lead = await getLead(id);
    if (!lead) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    return NextResponse.json({ lead });
  } catch {
    return NextResponse.json({ error: "GET_FAILED" }, { status: 500 });
  }
}
