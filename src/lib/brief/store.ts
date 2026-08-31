import type { Json } from "@/lib/supabase/database.types";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import { briefPayloadStoredSchema, type BriefPayload } from "./schema";
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

function normalizeBriefPayload(raw: unknown): BriefPayload | null {
  const p = raw as BriefPayload & { imagePrompts?: unknown };
  // Never expose LLM imagePrompts on persisted/UI payloads.
  const { imagePrompts: _omit, ...rest } = p ?? {};
  const base = rest as BriefPayload;
  const withDefaults = base?.images?.heroUrl
    ? base
    : {
        ...base,
        businessKind: base?.businessKind ?? "other",
        images: {
          heroUrl: "",
          secondaryUrl: "",
          detailUrl: "",
          source: "unsplash" as const,
        },
      };
  // Payload corrupto/incompleto → null (la página responde 404, no 500).
  const parsed = briefPayloadStoredSchema.safeParse(withDefaults);
  return parsed.success ? parsed.data : null;
}

export function makeBriefId(): string {
  return `brief-${Date.now().toString(36)}`;
}

export async function saveBrief(record: BriefRecord): Promise<BriefRecord> {
  const withToken: BriefRecord = record.editToken
    ? record
    : { ...record, editToken: crypto.randomUUID() };

  if (!isSupabaseConfigured()) {
    memoryStore().briefs.set(withToken.id, withToken);
    return withToken;
  }

  const supabase = getSupabaseAdmin();
  const row = {
    id: withToken.id,
    locale: withToken.locale,
    input: withToken.input,
    payload: withToken.payload as Json,
    created_at: withToken.createdAt,
    edit_token: withToken.editToken,
  };

  let { error } = await supabase.from("briefs").upsert(row);
  // Pre-migration 010 remote DBs lack edit_token: degrade gracefully.
  if (error?.code === "42703") {
    const { edit_token: _omit, ...withoutToken } = row;
    ({ error } = await supabase.from("briefs").upsert(withoutToken));
  }

  if (error) throw new Error(error.message);
  return withToken;
}

export async function getBrief(id: string): Promise<BriefRecord | null> {
  if (!isSupabaseConfigured()) {
    const hit = memoryStore().briefs.get(id);
    if (!hit) return null;
    const payload = normalizeBriefPayload(hit.payload);
    if (!payload) return null;
    return { ...hit, payload };
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
  const payload = normalizeBriefPayload(data.payload);
  if (!payload) return null;

  return {
    id: data.id,
    locale,
    input: data.input,
    payload,
    createdAt: data.created_at,
    editToken: data.edit_token,
  };
}

export function briefEditTokenOk(
  record: BriefRecord,
  token: string | undefined,
): boolean {
  if (!record.editToken) return true;
  return token === record.editToken;
}
