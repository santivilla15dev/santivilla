-- Menu drafts (Carta Digital — vision OCR hook)
create table if not exists public.menu_drafts (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists menu_drafts_created_at_idx
  on public.menu_drafts (created_at desc);

alter table public.menu_drafts enable row level security;

drop policy if exists "public read menu_drafts" on public.menu_drafts;
create policy "public read menu_drafts"
  on public.menu_drafts
  for select
  to anon, authenticated
  using (true);

-- Writes only via service_role (Next.js API routes)
