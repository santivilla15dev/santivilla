import { getSite, getSiteBySlug, recordCtaEvent } from "@/lib/crm/store";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const siteSlug = url.searchParams.get("site");
  const ctx = url.searchParams.get("ctx") ?? undefined;

  if (!siteSlug) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const site = (await getSiteBySlug(siteSlug)) ?? (await getSite(siteSlug));
  if (!site?.whatsappE164) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    await recordCtaEvent({ siteId: site.id, kind: "whatsapp", context: ctx });
  } catch {
    // redirect anyway
  }

  const waUrl = `https://wa.me/${site.whatsappE164.replace(/\D/g, "")}`;
  return NextResponse.redirect(waUrl);
}
