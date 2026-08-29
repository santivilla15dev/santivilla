-- Copy drafts (multilingual local adaptation hook)
create table if not exists public.copy_drafts (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists copy_drafts_created_at_idx
  on public.copy_drafts (created_at desc);

alter table public.copy_drafts enable row level security;

drop policy if exists "public read copy_drafts" on public.copy_drafts;
create policy "public read copy_drafts"
  on public.copy_drafts
  for select
  to anon, authenticated
  using (true);

-- Writes only via service_role (Next.js API routes)
