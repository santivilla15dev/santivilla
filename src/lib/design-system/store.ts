import type { ArtDirection } from "./art-direction";
import type { SiteFacts } from "./extract-site";
import type { ConceptSeoPayload } from "@/lib/seo/types";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import type { Json } from "@/lib/supabase/database.types";

export type ConceptChatMessage = {
  role: "user" | "assistant";
  content: string;
  at: string;
};

export type StoredConcept = {
  id: string;
  html: string;
  name: string;
  hostname: string;
  url: string;
  template: string;
  score: number;
  source: "template" | "claude";
  createdAt: string;
  kind?: string;
  specialty?: string;
  summary?: string;
  imageSource?: "openai" | "unsplash" | "nano-banana" | "places";
  heroImageUrl?: string;
  secondaryImageUrl?: string;
  detailImageUrl?: string;
  lang?: "es" | "de";
  tagline?: string;
  phoneHint?: string;
  hoursHint?: string;
  emailHint?: string;
  whatsappUrl?: string;
  highlights?: string[];
  siteFacts?: SiteFacts;
  artDirection?: ArtDirection;
  messages?: ConceptChatMessage[];
  slug?: string;
  placeId?: string;
  mapsUrl?: string;
  mapsSource?: boolean;
  placeRating?: number;
  placeReviewCount?: number;
  menuDraftId?: string;
  jsonLd?: ConceptSeoPayload;
};

type ConceptPayload = Omit<
  StoredConcept,
  | "id"
  | "html"
  | "name"
  | "hostname"
  | "url"
  | "template"
  | "score"
  | "source"
  | "createdAt"
>;

type GlobalStore = {
  concepts: Map<string, StoredConcept>;
};

function memoryStore(): GlobalStore {
  const g = globalThis as typeof globalThis & { __santiConcepts?: GlobalStore };
  if (!g.__santiConcepts) {
    g.__santiConcepts = { concepts: new Map() };
  }
  return g.__santiConcepts;
}

function payloadFromConcept(concept: StoredConcept): ConceptPayload {
  const {
    id: _id,
    html: _html,
    name: _name,
    hostname: _hostname,
    url: _url,
    template: _template,
    score: _score,
    source: _source,
    createdAt: _createdAt,
    ...payload
  } = concept;
  return payload;
}

function rowToConcept(row: {
  id: string;
  html: string;
  name: string;
  hostname: string;
  url: string;
  template: string;
  score: number;
  source: "template" | "claude";
  created_at: string;
  payload: Json;
}): StoredConcept {
  const payload = (row.payload || {}) as ConceptPayload;
  return {
    id: row.id,
    html: row.html,
    name: row.name,
    hostname: row.hostname,
    url: row.url,
    template: row.template,
    score: row.score,
    source: row.source,
    createdAt: row.created_at,
    ...payload,
  };
}

export async function saveConcept(
  concept: StoredConcept,
): Promise<StoredConcept> {
  if (!isSupabaseConfigured()) {
    memoryStore().concepts.set(concept.id, concept);
    return concept;
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("concepts").upsert({
    id: concept.id,
    html: concept.html,
    name: concept.name,
    hostname: concept.hostname,
    url: concept.url,
    template: concept.template,
    score: concept.score,
    source: concept.source,
    created_at: concept.createdAt,
    payload: payloadFromConcept(concept) as Json,
  });

  if (error) throw new Error(error.message);
  return concept;
}

export async function getConcept(id: string): Promise<StoredConcept | null> {
  if (!isSupabaseConfigured()) {
    return memoryStore().concepts.get(id) ?? null;
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("concepts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;
  return rowToConcept(data);
}

export async function getConceptBySlug(
  slug: string,
): Promise<StoredConcept | null> {
  if (!isSupabaseConfigured()) {
    for (const concept of memoryStore().concepts.values()) {
      if (concept.slug === slug) return concept;
    }
    return null;
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("concepts")
    .select("*")
    .eq("payload->>slug", slug)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;
  return rowToConcept(data);
}

export async function updateConcept(
  id: string,
  patch: Partial<
    Pick<
      StoredConcept,
      | "html"
      | "source"
      | "messages"
      | "summary"
      | "tagline"
      | "highlights"
      | "siteFacts"
      | "phoneHint"
      | "emailHint"
      | "hoursHint"
      | "jsonLd"
      | "menuDraftId"
    >
  >,
): Promise<StoredConcept | null> {
  const current = await getConcept(id);
  if (!current) return null;

  const next: StoredConcept = { ...current, ...patch };
  if (typeof patch.html === "string") {
    const html = patch.html.slice(0, 500_000);
    if (!html || html.length < 20) return null;
    next.html = html;
  }

  if (!isSupabaseConfigured()) {
    memoryStore().concepts.set(id, next);
    return next;
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("concepts")
    .update({
      html: next.html,
      source: next.source,
      payload: payloadFromConcept(next) as Json,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  return next;
}

export async function appendConceptMessages(
  id: string,
  messages: ConceptChatMessage[],
): Promise<StoredConcept | null> {
  const current = await getConcept(id);
  if (!current) return null;
  const prev = current.messages || [];
  return updateConcept(id, {
    messages: [...prev, ...messages].slice(-40),
  });
}

export function makeConceptId(hostname: string) {
  const slug = hostname
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 32);
  return `${slug || "concepto"}-${Date.now().toString(36)}`;
}

export function conceptToApiResponse(concept: StoredConcept) {
  return {
    id: concept.id,
    name: concept.name,
    hostname: concept.hostname,
    url: concept.url,
    template: concept.template,
    score: concept.score,
    source: concept.source,
    createdAt: concept.createdAt,
    kind: concept.kind,
    specialty: concept.specialty,
    summary: concept.summary,
    imageSource: concept.imageSource,
    heroImageUrl: concept.heroImageUrl,
    secondaryImageUrl: concept.secondaryImageUrl,
    detailImageUrl: concept.detailImageUrl,
    lang: concept.lang,
    tagline: concept.tagline,
    highlights: concept.highlights,
    html: concept.html,
    messages: concept.messages || [],
    jsonLd: concept.jsonLd,
    menuDraftId: concept.menuDraftId,
    seoTypes: concept.jsonLd?.types || [],
  };
}
