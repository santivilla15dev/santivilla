-- CRM leads pipeline
create table if not exists public.leads (
  id text primary key,
  name text,
  email text,
  phone text,
  business_name text,
  source text not null check (source in ('contact', 'audit', 'concept', 'maps', 'manual')),
  status text not null default 'new'
    check (status in ('new', 'contacted', 'proposal', 'won', 'lost')),
  notes text,
  audit_report_id text references public.audit_reports(id) on delete set null,
  concept_id text references public.concepts(id) on delete set null,
  url text,
  hostname text,
  utm jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_source_idx on public.leads (source);
create index if not exists leads_hostname_idx on public.leads (hostname);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;
-- Writes via service_role in API routes; no public policies in v1
