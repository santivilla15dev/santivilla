import type { Json } from "@/lib/supabase/database.types";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import type { AuditReport } from "./types";

type ReportPayload = Omit<
  AuditReport,
  "id" | "url" | "hostname" | "scannedAt"
> & { scannedAt?: string };

type GlobalStore = {
  reports: Map<string, AuditReport>;
};

function memoryStore(): GlobalStore {
  const g = globalThis as typeof globalThis & {
    __santiAuditReports?: GlobalStore;
  };
  if (!g.__santiAuditReports) {
    g.__santiAuditReports = { reports: new Map() };
  }
  return g.__santiAuditReports;
}

function payloadFromReport(report: AuditReport): ReportPayload {
  const {
    id: _id,
    url: _url,
    hostname: _hostname,
    ...payload
  } = report;
  return payload;
}

function rowToReport(row: {
  id: string;
  url: string;
  hostname: string;
  lang: string;
  payload: Json;
  created_at: string;
}): AuditReport {
  const payload = (row.payload || {}) as ReportPayload;
  const scannedAt = payload.scannedAt || row.created_at;
  const { scannedAt: _s, ...rest } = payload;
  return {
    id: row.id,
    url: row.url,
    hostname: row.hostname,
    lang: row.lang === "de" ? "de" : "es",
    scannedAt,
    ...rest,
  } as AuditReport;
}

export async function saveAuditReport(report: AuditReport): Promise<AuditReport> {
  const lang: "es" | "de" = report.lang === "de" ? "de" : "es";
  if (!isSupabaseConfigured()) {
    memoryStore().reports.set(report.id, report);
    return report;
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("audit_reports").upsert({
    id: report.id,
    url: report.url,
    hostname: report.hostname,
    lang,
    payload: payloadFromReport(report) as Json,
    created_at: report.scannedAt,
  });

  if (error) throw new Error(error.message);
  return report;
}

export async function getAuditReport(id: string): Promise<AuditReport | null> {
  if (!isSupabaseConfigured()) {
    return memoryStore().reports.get(id) ?? null;
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("audit_reports")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;
  return rowToReport(data);
}

export async function updateAuditReportConceptId(
  id: string,
  conceptId: string,
): Promise<AuditReport | null> {
  const current = await getAuditReport(id);
  if (!current) return null;
  const next: AuditReport = { ...current, conceptId };
  await saveAuditReport(next);
  return next;
}
