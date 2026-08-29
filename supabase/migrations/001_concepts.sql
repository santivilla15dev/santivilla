-- Concepts (Santi Design Agent) + rate limit buckets
-- Apply in Supabase SQL Editor or: supabase db push

create table if not exists public.concepts (
  id text primary key,
  html text not null,
  name text not null,
  hostname text not null,
  url text not null,
  template text not null,
  score integer not null default 0,
  source text not null check (source in ('template', 'claude')),
  created_at timestamptz not null default now(),
  payload jsonb not null default '{}'::jsonb
);

create index if not exists concepts_created_at_idx
  on public.concepts (created_at desc);

alter table public.concepts enable row level security;

drop policy if exists "public read concepts" on public.concepts;
create policy "public read concepts"
  on public.concepts
  for select
  to anon, authenticated
  using (true);

-- Writes only via service_role (Next.js API routes)

create table if not exists public.rate_limit_buckets (
  bucket_key text primary key,
  count integer not null default 0,
  reset_at timestamptz not null
);

alter table public.rate_limit_buckets enable row level security;
-- No anon policies: only service_role access
