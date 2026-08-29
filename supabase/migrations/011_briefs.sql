-- Brief Agent: textarea → structured landing payload
create table if not exists public.briefs (
  id text primary key,
  locale text not null default 'es',
  input text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists briefs_created_at_idx
  on public.briefs (created_at desc);

alter table public.briefs enable row level security;

drop policy if exists "public read briefs" on public.briefs;
create policy "public read briefs"
  on public.briefs
  for select
  to anon, authenticated
  using (true);

-- Writes only via service_role (Next.js API routes)
