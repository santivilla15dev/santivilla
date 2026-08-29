import { requireAdmin } from "@/lib/auth/require-role";
import { createSite } from "@/lib/crm/store";
import { getConcept } from "@/lib/design-system/store";
import { NextResponse } from "next/server";

type Body = {
  conceptId?: string;
  ownerId?: string;
  slug?: string;
  businessName?: string;
  whatsappE164?: string;
};

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "BAD_JSON" }, { status: 400 });
  }

  const conceptId = body.conceptId?.trim();
  const ownerId = body.ownerId?.trim();
  const slug = body.slug?.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");

  if (!conceptId || !ownerId || !slug) {
    return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
  }

  const concept = await getConcept(conceptId);
  if (!concept) {
    return NextResponse.json({ error: "CONCEPT_NOT_FOUND" }, { status: 404 });
  }

  try {
    const site = await createSite({
      conceptId,
      ownerId,
      slug,
      businessName: body.businessName?.trim() || concept.name,
      whatsappE164: body.whatsappE164?.trim(),
    });
    return NextResponse.json({ site });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "CREATE_FAILED";
    return NextResponse.json({ error: "CREATE_FAILED", message: msg }, { status: 500 });
  }
}
