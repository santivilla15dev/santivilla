import { requireAdmin } from "@/lib/auth/require-role";
import { createSite, updateSiteStatus } from "@/lib/crm/store";
import { getConcept } from "@/lib/design-system/store";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

type Body = {
  conceptId?: string;
  ownerId?: string;
  ownerEmail?: string;
  slug?: string;
  businessName?: string;
  whatsappE164?: string;
};

async function resolveOwnerId(body: Body): Promise<string | null> {
  const direct = body.ownerId?.trim();
  if (direct) return direct;

  const email = body.ownerEmail?.trim().toLowerCase();
  if (!email) return null;

  // listUsers is paginated; per_page=1000 covers this project's scale.
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.auth.admin.listUsers({ perPage: 1000 });
  if (error) throw error;
  const match = data.users.find((u) => u.email?.toLowerCase() === email);
  if (match?.id) return match.id;

  const invited = await admin.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://santivilla-rxxn.vercel.app"}/portal`,
  });
  if (invited.error || !invited.data.user?.id) return null;
  return invited.data.user.id;
}

export async function PATCH(req: Request) {
  const adminUser = await requireAdmin();
  if (!adminUser) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  let body: { id?: string; status?: "active" | "paused" | "draft" };
  try {
    body = (await req.json()) as { id?: string; status?: "active" | "paused" | "draft" };
  } catch {
    return NextResponse.json({ error: "BAD_JSON" }, { status: 400 });
  }

  if (!body.id || !body.status) {
    return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
  }

  try {
    const site = await updateSiteStatus(body.id, body.status);
    if (!site) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    return NextResponse.json({ site });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "UPDATE_FAILED";
    return NextResponse.json({ error: "UPDATE_FAILED", message: msg }, { status: 500 });
  }
}

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
  const slug = body.slug?.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");

  if (!conceptId || !slug) {
    return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
  }

  let ownerId: string | null;
  try {
    ownerId = await resolveOwnerId(body);
  } catch {
    return NextResponse.json({ error: "OWNER_LOOKUP_FAILED" }, { status: 500 });
  }
  if (!ownerId) {
    return NextResponse.json({ error: "OWNER_NOT_FOUND" }, { status: 404 });
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
