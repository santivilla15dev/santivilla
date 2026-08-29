import type { Json } from "@/lib/supabase/database.types";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import type {
  CtaEvent,
  CtaEventKind,
  DailyMenuEntry,
  HoursOverride,
  Lead,
  LeadInput,
  LeadStatus,
  Site,
  SiteContent,
} from "./types";

type GlobalStore = {
  leads: Map<string, Lead>;
  sites: Map<string, Site>;
  siteContent: Map<string, SiteContent>;
  ctaEvents: CtaEvent[];
};

function memoryStore(): GlobalStore {
  const g = globalThis as typeof globalThis & { __santiCrm?: GlobalStore };
  if (!g.__santiCrm) {
    g.__santiCrm = { leads: new Map(), sites: new Map(), siteContent: new Map(), ctaEvents: [] };
  }
  return g.__santiCrm;
}

export function makeLeadId(): string {
  return `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function makeSiteId(slug: string): string {
  return `site_${slug}`;
}

function rowToLead(row: {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  business_name: string | null;
  source: string;
  status: string;
  notes: string | null;
  audit_report_id: string | null;
  concept_id: string | null;
  url: string | null;
  hostname: string | null;
  utm: Json;
  created_at: string;
  updated_at: string;
}): Lead {
  return {
    id: row.id,
    name: row.name ?? undefined,
    email: row.email ?? undefined,
    phone: row.phone ?? undefined,
    businessName: row.business_name ?? undefined,
    source: row.source as Lead["source"],
    status: row.status as LeadStatus,
    notes: row.notes ?? undefined,
    auditReportId: row.audit_report_id ?? undefined,
    conceptId: row.concept_id ?? undefined,
    url: row.url ?? undefined,
    hostname: row.hostname ?? undefined,
    utm: (row.utm as Record<string, string>) ?? {},
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function leadToRow(lead: Lead) {
  return {
    id: lead.id,
    name: lead.name ?? null,
    email: lead.email ?? null,
    phone: lead.phone ?? null,
    business_name: lead.businessName ?? null,
    source: lead.source,
    status: lead.status,
    notes: lead.notes ?? null,
    audit_report_id: lead.auditReportId ?? null,
    concept_id: lead.conceptId ?? null,
    url: lead.url ?? null,
    hostname: lead.hostname ?? null,
    utm: (lead.utm ?? {}) as Json,
    created_at: lead.createdAt,
    updated_at: lead.updatedAt,
  };
}

export async function saveLead(input: LeadInput, existingId?: string): Promise<Lead> {
  const now = new Date().toISOString();
  const id = existingId ?? makeLeadId();

  if (!isSupabaseConfigured()) {
    const store = memoryStore();
    const prev = store.leads.get(id);
    const lead: Lead = {
      id,
      ...input,
      status: input.status ?? prev?.status ?? "new",
      createdAt: prev?.createdAt ?? now,
      updatedAt: now,
    };
    store.leads.set(id, lead);
    return lead;
  }

  const supabase = getSupabaseAdmin();
  const { data: existing } = await supabase.from("leads").select("*").eq("id", id).maybeSingle();

  const lead: Lead = {
    id,
    name: input.name ?? existing?.name ?? undefined,
    email: input.email ?? existing?.email ?? undefined,
    phone: input.phone ?? existing?.phone ?? undefined,
    businessName: input.businessName ?? existing?.business_name ?? undefined,
    source: input.source,
    status: input.status ?? (existing?.status as LeadStatus) ?? "new",
    notes: input.notes ?? existing?.notes ?? undefined,
    auditReportId: input.auditReportId ?? existing?.audit_report_id ?? undefined,
    conceptId: input.conceptId ?? existing?.concept_id ?? undefined,
    url: input.url ?? existing?.url ?? undefined,
    hostname: input.hostname ?? existing?.hostname ?? undefined,
    utm: input.utm ?? (existing?.utm as Record<string, string>) ?? {},
    createdAt: existing?.created_at ?? now,
    updatedAt: now,
  };

  const { error } = await supabase.from("leads").upsert(leadToRow(lead));
  if (error) throw new Error(error.message);
  return lead;
}

export async function upsertLeadFromAudit(params: {
  auditReportId: string;
  url: string;
  hostname: string;
  conceptId?: string;
}): Promise<Lead> {
  if (!isSupabaseConfigured()) {
    const existing = [...memoryStore().leads.values()].find((l) => l.auditReportId === params.auditReportId);
    return saveLead(
      {
        source: "audit",
        url: params.url,
        hostname: params.hostname,
        auditReportId: params.auditReportId,
        conceptId: params.conceptId,
        businessName: params.hostname,
      },
      existing?.id,
    );
  }

  const supabase = getSupabaseAdmin();
  const { data: existing } = await supabase
    .from("leads")
    .select("*")
    .eq("audit_report_id", params.auditReportId)
    .maybeSingle();

  return saveLead(
    {
      source: "audit",
      url: params.url,
      hostname: params.hostname,
      auditReportId: params.auditReportId,
      conceptId: params.conceptId ?? existing?.concept_id ?? undefined,
      businessName: params.hostname,
    },
    existing?.id,
  );
}

export async function upsertLeadFromConcept(params: {
  conceptId: string;
  url: string;
  hostname: string;
  businessName: string;
  source: "concept" | "maps";
}): Promise<Lead> {
  if (!isSupabaseConfigured()) {
    const existing = [...memoryStore().leads.values()].find((l) => l.conceptId === params.conceptId);
    return saveLead(
      {
        source: params.source,
        url: params.url,
        hostname: params.hostname,
        conceptId: params.conceptId,
        businessName: params.businessName,
      },
      existing?.id,
    );
  }

  const supabase = getSupabaseAdmin();
  const { data: existing } = await supabase.from("leads").select("*").eq("concept_id", params.conceptId).maybeSingle();

  return saveLead(
    {
      source: params.source,
      url: params.url,
      hostname: params.hostname,
      conceptId: params.conceptId,
      businessName: params.businessName,
    },
    existing?.id,
  );
}

export async function upsertLeadFromBrief(params: {
  briefId: string;
  businessName: string;
  path: string;
  notes: string;
}): Promise<Lead> {
  const url = params.path;
  const notes = params.notes.slice(0, 500);

  if (!isSupabaseConfigured()) {
    const existing = [...memoryStore().leads.values()].find(
      (l) =>
        (l.source === "brief" || l.notes?.startsWith("[brief]")) &&
        l.url === url,
    );
    return saveLead(
      {
        source: "brief",
        businessName: params.businessName,
        url,
        notes,
        hostname: params.briefId,
      },
      existing?.id,
    );
  }

  const supabase = getSupabaseAdmin();
  const { data: existingBrief } = await supabase
    .from("leads")
    .select("*")
    .eq("source", "brief")
    .eq("url", url)
    .maybeSingle();

  try {
    return await saveLead(
      {
        source: "brief",
        businessName: params.businessName,
        url,
        notes,
        hostname: params.briefId,
      },
      existingBrief?.id,
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    // Migración 012 no aplicada aún: guardar como manual etiquetado.
    if (!/leads_source_check|check constraint/i.test(msg)) throw err;
    console.warn(
      "[crm] source=brief rejected — apply supabase/migrations/012_leads_brief_source.sql",
    );
    const { data: existingManual } = await supabase
      .from("leads")
      .select("*")
      .eq("source", "manual")
      .eq("url", url)
      .maybeSingle();
    return saveLead(
      {
        source: "manual",
        businessName: params.businessName,
        url,
        notes: `[brief] ${notes}`.slice(0, 500),
        hostname: params.briefId,
      },
      existingManual?.id,
    );
  }
}

export async function listLeads(filters?: { status?: LeadStatus; source?: string; q?: string }): Promise<Lead[]> {
  if (!isSupabaseConfigured()) {
    let items = [...memoryStore().leads.values()];
    if (filters?.status) items = items.filter((l) => l.status === filters.status);
    if (filters?.source) items = items.filter((l) => l.source === filters.source);
    if (filters?.q) {
      const q = filters.q.toLowerCase();
      items = items.filter(
        (l) =>
          l.hostname?.toLowerCase().includes(q) ||
          l.businessName?.toLowerCase().includes(q) ||
          l.email?.toLowerCase().includes(q),
      );
    }
    return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  const supabase = getSupabaseAdmin();
  let query = supabase.from("leads").select("*").order("created_at", { ascending: false });
  if (filters?.status) query = query.eq("status", filters.status);
  if (filters?.source) query = query.eq("source", filters.source);
  if (filters?.q) query = query.ilike("hostname", `%${filters.q}%`);

  const { data, error } = await query.limit(200);
  if (error) throw new Error(error.message);
  return (data ?? []).map(rowToLead);
}

export async function getLead(id: string): Promise<Lead | null> {
  if (!isSupabaseConfigured()) return memoryStore().leads.get(id) ?? null;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("leads").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;
  return rowToLead(data);
}

export async function updateLead(id: string, patch: { status?: LeadStatus; notes?: string }): Promise<Lead | null> {
  const current = await getLead(id);
  if (!current) return null;
  return saveLead(
    {
      source: current.source,
      status: patch.status ?? current.status,
      notes: patch.notes ?? current.notes,
      name: current.name,
      email: current.email,
      phone: current.phone,
      businessName: current.businessName,
      auditReportId: current.auditReportId,
      conceptId: current.conceptId,
      url: current.url,
      hostname: current.hostname,
      utm: current.utm,
    },
    id,
  );
}

function rowToSite(row: {
  id: string;
  concept_id: string;
  owner_id: string;
  slug: string;
  business_name: string;
  whatsapp_e164: string | null;
  status: string;
  plan: string;
  created_at: string;
}): Site {
  return {
    id: row.id,
    conceptId: row.concept_id,
    ownerId: row.owner_id,
    slug: row.slug,
    businessName: row.business_name,
    whatsappE164: row.whatsapp_e164 ?? undefined,
    status: row.status as Site["status"],
    plan: row.plan as Site["plan"],
    createdAt: row.created_at,
  };
}

export async function createSite(params: {
  conceptId: string;
  ownerId: string;
  slug: string;
  businessName: string;
  whatsappE164?: string;
}): Promise<Site> {
  const id = makeSiteId(params.slug);
  const now = new Date().toISOString();
  const site: Site = {
    id,
    conceptId: params.conceptId,
    ownerId: params.ownerId,
    slug: params.slug,
    businessName: params.businessName,
    whatsappE164: params.whatsappE164,
    status: "active",
    plan: "basic",
    createdAt: now,
  };

  if (!isSupabaseConfigured()) {
    memoryStore().sites.set(id, site);
    memoryStore().siteContent.set(id, { siteId: id, dailyMenu: [], hoursOverrides: [], updatedAt: now });
    return site;
  }

  const supabase = getSupabaseAdmin();
  const { error: siteErr } = await supabase.from("sites").insert({
    id: site.id,
    concept_id: site.conceptId,
    owner_id: site.ownerId,
    slug: site.slug,
    business_name: site.businessName,
    whatsapp_e164: site.whatsappE164 ?? null,
    status: site.status,
    plan: site.plan,
    created_at: site.createdAt,
  });
  if (siteErr) throw new Error(siteErr.message);

  const { error: contentErr } = await supabase.from("site_content").insert({
    site_id: id,
    daily_menu: [] as Json,
    hours_overrides: [] as Json,
    updated_at: now,
  });
  if (contentErr) throw new Error(contentErr.message);
  return site;
}

export async function getSiteByOwner(ownerId: string): Promise<Site | null> {
  if (!isSupabaseConfigured()) {
    return [...memoryStore().sites.values()].find((s) => s.ownerId === ownerId) ?? null;
  }
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("sites").select("*").eq("owner_id", ownerId).eq("status", "active").maybeSingle();
  if (error) throw new Error(error.message);
  return data ? rowToSite(data) : null;
}

export async function getSiteBySlug(slug: string): Promise<Site | null> {
  if (!isSupabaseConfigured()) {
    return [...memoryStore().sites.values()].find((s) => s.slug === slug) ?? null;
  }
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("sites").select("*").eq("slug", slug).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? rowToSite(data) : null;
}

export async function getSite(id: string): Promise<Site | null> {
  if (!isSupabaseConfigured()) {
    return memoryStore().sites.get(id) ?? null;
  }
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("sites").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? rowToSite(data) : null;
}

export async function listSites(): Promise<Site[]> {
  if (!isSupabaseConfigured()) {
    return [...memoryStore().sites.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("sites").select("*").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(rowToSite);
}

function rowToSiteContent(row: {
  site_id: string;
  daily_menu: Json;
  hours_regular: Json | null;
  hours_overrides: Json;
  announcements: string | null;
  updated_at: string;
}): SiteContent {
  return {
    siteId: row.site_id,
    dailyMenu: (row.daily_menu as DailyMenuEntry[]) ?? [],
    hoursRegular: row.hours_regular ?? undefined,
    hoursOverrides: (row.hours_overrides as HoursOverride[]) ?? [],
    announcements: row.announcements ?? undefined,
    updatedAt: row.updated_at,
  };
}

export async function getSiteContent(siteId: string): Promise<SiteContent | null> {
  if (!isSupabaseConfigured()) return memoryStore().siteContent.get(siteId) ?? null;
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("site_content").select("*").eq("site_id", siteId).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? rowToSiteContent(data) : null;
}

export async function saveSiteContent(content: SiteContent): Promise<SiteContent> {
  const now = new Date().toISOString();
  const next = { ...content, updatedAt: now };
  if (!isSupabaseConfigured()) {
    memoryStore().siteContent.set(content.siteId, next);
    return next;
  }
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("site_content").upsert({
    site_id: next.siteId,
    daily_menu: next.dailyMenu as Json,
    hours_regular: (next.hoursRegular ?? null) as Json,
    hours_overrides: next.hoursOverrides as Json,
    announcements: next.announcements ?? null,
    updated_at: next.updatedAt,
  });
  if (error) throw new Error(error.message);
  return next;
}

export async function recordCtaEvent(params: { siteId: string; kind: CtaEventKind; context?: string }): Promise<void> {
  const now = new Date().toISOString();
  if (!isSupabaseConfigured()) {
    const store = memoryStore();
    store.ctaEvents.push({ id: store.ctaEvents.length + 1, siteId: params.siteId, kind: params.kind, context: params.context, createdAt: now });
    return;
  }
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("cta_events").insert({ site_id: params.siteId, kind: params.kind, context: params.context ?? null });
  if (error) throw new Error(error.message);
}

export async function countCtaEvents(siteId: string, sinceDays: number): Promise<number> {
  const since = new Date();
  since.setDate(since.getDate() - sinceDays);
  const sinceIso = since.toISOString();
  if (!isSupabaseConfigured()) {
    return memoryStore().ctaEvents.filter((e) => e.siteId === siteId && e.createdAt >= sinceIso && e.kind === "whatsapp").length;
  }
  const supabase = getSupabaseAdmin();
  const { count, error } = await supabase
    .from("cta_events")
    .select("*", { count: "exact", head: true })
    .eq("site_id", siteId)
    .eq("kind", "whatsapp")
    .gte("created_at", sinceIso);
  if (error) throw new Error(error.message);
  return count ?? 0;
}
