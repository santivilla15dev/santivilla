import type { Json } from "@/lib/supabase/database.types";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import type { BriefPayload } from "./schema";
import type { BriefRecord } from "./types";
import type { Locale } from "@/lib/i18n/locales";
import { isLocale } from "@/lib/i18n/locales";

type GlobalBriefStore = {
  briefs: Map<string, BriefRecord>;
};

function memoryStore(): GlobalBriefStore {
  const g = globalThis as typeof globalThis & {
    __santiBriefs?: GlobalBriefStore;
  };
  if (!g.__santiBriefs) {
    g.__santiBriefs = { briefs: new Map() };
  }
  return g.__santiBriefs;
}

function normalizeBriefPayload(raw: unknown): BriefPayload {
  const p = raw as BriefPayload;
  if (p?.images?.heroUrl) return p;
  return {
    ...p,
    businessKind: p?.businessKind ?? "other",
    images: {
      heroUrl: "",
      secondaryUrl: "",
      detailUrl: "",
      source: "unsplash",
    },
  };
}

export function makeBriefId(): string {
  return `brief-${Date.now().toString(36)}`;
}

export async function saveBrief(record: BriefRecord): Promise<BriefRecord> {
  if (!isSupabaseConfigured()) {
    memoryStore().briefs.set(record.id, record);
    return record;
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("briefs").upsert({
    id: record.id,
    locale: record.locale,
    input: record.input,
    payload: record.payload as Json,
    created_at: record.createdAt,
  });

  if (error) throw new Error(error.message);
  return record;
}

export async function getBrief(id: string): Promise<BriefRecord | null> {
  if (!isSupabaseConfigured()) {
    const hit = memoryStore().briefs.get(id);
    if (!hit) return null;
    return { ...hit, payload: normalizeBriefPayload(hit.payload) };
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("briefs")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;

  const localeRaw = data.locale;
  const locale: Locale = isLocale(localeRaw) ? localeRaw : "es";

  return {
    id: data.id,
    locale,
    input: data.input,
    payload: normalizeBriefPayload(data.payload),
    createdAt: data.created_at,
  };
}
