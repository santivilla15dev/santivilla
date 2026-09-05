import { requireAdmin } from "@/lib/auth/require-role";
import { listLeads } from "@/lib/crm/store";
import { NextResponse } from "next/server";

function csvCell(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  const leads = await listLeads();
  const header = ["id", "status", "source", "name", "email", "business", "notes", "created"];
  const rows = leads.map((lead) =>
    [
      lead.id,
      lead.status,
      lead.source,
      lead.name ?? "",
      lead.email ?? "",
      lead.businessName ?? "",
      (lead.notes ?? "").replace(/\s+/g, " "),
      lead.createdAt,
    ].map((cell) => csvCell(String(cell))),
  );

  const body = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=leads.csv",
    },
  });
}
