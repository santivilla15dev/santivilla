import type { Json } from "@/lib/supabase/database.types";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import type { CopyDraft } from "./types";

type GlobalCopyStore = {
  drafts: Map<string, CopyDraft>;
};

function memoryStore(): GlobalCopyStore {
  const g = globalThis as typeof globalThis & {
    __santiCopyDrafts?: GlobalCopyStore;
  };
  if (!g.__santiCopyDrafts) {
    g.__santiCopyDrafts = { drafts: new Map() };
  }
  return g.__santiCopyDrafts;
}

export const DEMO_COPY_ID = "demo-konzept";

export const demoCopyDraft: CopyDraft = {
  id: DEMO_COPY_ID,
  sourceText:
    "Wiener Schnitzel vom Kalb mit Erdäpfelsalat — knusprig, buttrig, ein Klassiker seit Generationen.",
  sourceLocale: "de",
  contentType: "dish",
  businessKind: "gasthaus",
  city: "Wien",
  createdAt: "2026-08-28T12:00:00.000Z",
  variants: [
    {
      locale: "de",
      audience: "local",
      text: "Wiener Schnitzel vom Kalb mit Erdäpfelsalat — außen goldbraun, innen zart. Ein Klassiker, den wir mit Sorgfalt zubereiten.",
      toneNote: "Formelles Österreichisches Deutsch (Sie), lokaler Bezug.",
    },
    {
      locale: "en",
      audience: "tourist",
      text: "Classic Viennese schnitzel — golden, buttery, served with potato salad. A must-try while you're in town.",
      toneNote: "Fresh, inviting English for visitors — not a literal translation.",
    },
    {
      locale: "es",
      audience: "tourist",
      text: "Schnitzel vienés de ternera con ensalada de patata — crujiente por fuera, tierno por dentro. Imprescindible en tu visita.",
      toneNote: "Español acogedor para turistas, tono directo.",
    },
  ],
};

function rowToDraft(row: {
  id: string;
  payload: Json;
  created_at: string;
}): CopyDraft {
  const payload = row.payload as Omit<CopyDraft, "id" | "createdAt">;
  return {
    id: row.id,
    createdAt: row.created_at,
    ...payload,
  };
}

export function makeCopyId(): string {
  return `copy-${Date.now().toString(36)}`;
}

export async function saveCopyDraft(draft: CopyDraft): Promise<CopyDraft> {
  if (!isSupabaseConfigured()) {
    memoryStore().drafts.set(draft.id, draft);
    return draft;
  }

  const { id, createdAt, ...payload } = draft;
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("copy_drafts").upsert({
    id,
    created_at: createdAt,
    payload: payload as Json,
  });

  if (error) throw new Error(error.message);
  return draft;
}

export async function getCopyDraft(id: string): Promise<CopyDraft | null> {
  if (id === DEMO_COPY_ID) return demoCopyDraft;

  if (!isSupabaseConfigured()) {
    return memoryStore().drafts.get(id) ?? null;
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("copy_drafts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;
  return rowToDraft(data);
}
