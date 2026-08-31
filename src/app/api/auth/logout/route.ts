import { createServerSupabase } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const loginUrl = new URL(
    "/login",
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  );
  try {
    const supabase = await createServerSupabase();
    await supabase.auth.signOut();
  } catch (err) {
    console.error("[auth/logout]", err);
  }
  return NextResponse.redirect(loginUrl);
}
