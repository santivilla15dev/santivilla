import { requireSiteAccess } from "@/lib/auth/require-role";
import { getSiteContent, saveSiteContent } from "@/lib/crm/store";
import type { DailyMenuEntry, HoursOverride } from "@/lib/crm/types";
import { syncSiteContentToConcept } from "@/lib/site-builder/sync-content";
import { NextResponse } from "next/server";

type Body = {
  dailyMenu?: DailyMenuEntry[];
  hoursRegular?: string[];
  hoursOverrides?: HoursOverride[];
  announcements?: string;
};

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const user = await requireSiteAccess(id);
  if (!user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  try {
    const content = await getSiteContent(id);
    if (!content) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ error: "GET_FAILED" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const user = await requireSiteAccess(id);
  if (!user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "BAD_JSON" }, { status: 400 });
  }

  try {
    const current = await getSiteContent(id);
    if (!current) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

    const next = await saveSiteContent({
      ...current,
      dailyMenu: body.dailyMenu ?? current.dailyMenu,
      hoursRegular: body.hoursRegular ?? current.hoursRegular,
      hoursOverrides: body.hoursOverrides ?? current.hoursOverrides,
      announcements: body.announcements ?? current.announcements,
    });

    await syncSiteContentToConcept(id);

    return NextResponse.json({ content: next });
  } catch {
    return NextResponse.json({ error: "UPDATE_FAILED" }, { status: 500 });
  }
}
