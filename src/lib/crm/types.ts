export type LeadSource = "contact" | "audit" | "concept" | "maps" | "manual" | "brief" | "demo";

export type LeadStatus = "new" | "contacted" | "proposal" | "won" | "lost";

export type Lead = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  source: LeadSource;
  status: LeadStatus;
  notes?: string;
  auditReportId?: string;
  conceptId?: string;
  url?: string;
  hostname?: string;
  utm?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
};

export type LeadInput = {
  name?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  source: LeadSource;
  status?: LeadStatus;
  notes?: string;
  auditReportId?: string;
  conceptId?: string;
  url?: string;
  hostname?: string;
  utm?: Record<string, string>;
};

export type MenuItem = {
  name: string;
  price?: string;
  note?: string;
};

export type DailyMenuEntry = {
  date: string;
  items: MenuItem[];
};

export type HoursOverride = {
  date: string;
  open?: string;
  close?: string;
  closed?: boolean;
  label?: string;
};

export type SiteStatus = "draft" | "active" | "paused";

export type Site = {
  id: string;
  conceptId: string;
  ownerId: string;
  slug: string;
  businessName: string;
  whatsappE164?: string;
  status: SiteStatus;
  plan: "basic" | "pro";
  createdAt: string;
};

export type SiteContent = {
  siteId: string;
  dailyMenu: DailyMenuEntry[];
  hoursRegular?: unknown;
  hoursOverrides: HoursOverride[];
  announcements?: string;
  updatedAt: string;
};

export type CtaEventKind = "whatsapp" | "phone" | "reserve";

export type CtaEvent = {
  id: number;
  siteId: string;
  kind: CtaEventKind;
  context?: string;
  createdAt: string;
};
