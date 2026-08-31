import "server-only";

import type { Json } from "@/lib/supabase/database.types";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import { DEMO_MENU_ID, type MenuDraft } from "./types";

type GlobalMenuStore = {
  drafts: Map<string, MenuDraft>;
};

function memoryStore(): GlobalMenuStore {
  const g = globalThis as typeof globalThis & {
    __santiMenuDrafts?: GlobalMenuStore;
  };
  if (!g.__santiMenuDrafts) {
    g.__santiMenuDrafts = { drafts: new Map() };
  }
  return g.__santiMenuDrafts;
}

export const demoMenuDraft: MenuDraft = {
  id: DEMO_MENU_ID,
  restaurantName: "Gasthaus Am Hof (Demo)",
  locale: "de",
  confidence: "high",
  warnings: ["Konzept-Demo — keine echte Speisekarte eines Betriebs."],
  createdAt: "2026-08-28T12:00:00.000Z",
  sections: [
    {
      title: "Vorspeisen",
      items: [
        { name: "Rindssuppe", price: "€5,90", description: "mit Frittaten" },
        { name: "Käseknödel", price: "€8,50", description: "auf Blattsalat" },
      ],
    },
    {
      title: "Hauptgerichte",
      items: [
        {
          name: "Wiener Schnitzel",
          price: "€18,90",
          description: "vom Kalb, Erdäpfelsalat",
        },
        {
          name: "Tafelspitz",
          price: "€21,50",
          description: "Apfelkren, Schnittlauchsauce",
        },
      ],
    },
  ],
};

function rowToDraft(row: {
  id: string;
  payload: Json;
  created_at: string;
}): MenuDraft {
  const payload = row.payload as Omit<MenuDraft, "id" | "createdAt">;
  return {
    id: row.id,
    createdAt: row.created_at,
    ...payload,
  };
}

export function makeMenuId(): string {
  return `menu-${Date.now().toString(36)}`;
}

export async function saveMenuDraft(draft: MenuDraft): Promise<MenuDraft> {
  if (!isSupabaseConfigured()) {
    memoryStore().drafts.set(draft.id, draft);
    return draft;
  }

  const { id, createdAt, ...payload } = draft;
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("menu_drafts").upsert({
    id,
    created_at: createdAt,
    payload: payload as Json,
  });

  if (error) throw new Error(error.message);
  return draft;
}

export async function getMenuDraft(id: string): Promise<MenuDraft | null> {
  if (id === DEMO_MENU_ID) return demoMenuDraft;

  if (!isSupabaseConfigured()) {
    return memoryStore().drafts.get(id) ?? null;
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("menu_drafts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;
  return rowToDraft(data);
}
