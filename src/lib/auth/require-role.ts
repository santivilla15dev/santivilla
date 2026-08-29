import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import { createServerSupabase, isSupabaseServerConfigured } from "@/lib/supabase/server";

export type UserRole = "admin" | "client";

export type AuthUser = {
  id: string;
  email: string | undefined;
  role: UserRole;
};

async function getProfileRole(userId: string): Promise<UserRole | null> {
  if (!isSupabaseConfigured()) return null;
  const admin = getSupabaseAdmin();
  const { data } = await admin
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();
  if (data?.role === "admin" || data?.role === "client") return data.role;
  return null;
}

export async function getAuthUser(): Promise<AuthUser | null> {
  if (!isSupabaseServerConfigured()) return null;

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const role = (await getProfileRole(user.id)) ?? "client";
  return { id: user.id, email: user.email, role };
}

export async function requireAdmin(): Promise<AuthUser | null> {
  const user = await getAuthUser();
  if (!user || user.role !== "admin") return null;
  return user;
}

export async function requireAuthenticated(): Promise<AuthUser | null> {
  return getAuthUser();
}

export async function requireSiteAccess(siteId: string): Promise<AuthUser | null> {
  const user = await getAuthUser();
  if (!user) return null;
  if (user.role === "admin") return user;
  if (!isSupabaseConfigured()) return null;

  const admin = getSupabaseAdmin();
  const { data: site } = await admin
    .from("sites")
    .select("owner_id")
    .eq("id", siteId)
    .maybeSingle();

  if (!site || site.owner_id !== user.id) return null;
  return user;
}
