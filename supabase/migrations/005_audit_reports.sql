-- Audit reports (AI diagnosis + shareable report)
-- Apply after 001_concepts.sql

create table if not exists public.audit_reports (
  id text primary key,
  url text not null,
  hostname text not null,
  lang text not null check (lang in ('es', 'de')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_reports_created_at_idx
  on public.audit_reports (created_at desc);

alter table public.audit_reports enable row level security;

drop policy if exists "public read audit_reports" on public.audit_reports;
create policy "public read audit_reports"
  on public.audit_reports
  for select
  to anon, authenticated
  using (true);

-- Writes only via service_role (Next.js API routes)
