-- Multi-tenant client sites
create table if not exists public.sites (
  id text primary key,
  concept_id text not null references public.concepts(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  slug text unique not null,
  business_name text not null,
  whatsapp_e164 text,
  status text not null default 'active'
    check (status in ('draft', 'active', 'paused')),
  plan text not null default 'basic'
    check (plan in ('basic', 'pro')),
  created_at timestamptz not null default now()
);

create index if not exists sites_owner_idx on public.sites (owner_id);
create index if not exists sites_concept_idx on public.sites (concept_id);

create table if not exists public.site_content (
  site_id text primary key references public.sites(id) on delete cascade,
  daily_menu jsonb not null default '[]'::jsonb,
  hours_regular jsonb,
  hours_overrides jsonb not null default '[]'::jsonb,
  announcements text,
  updated_at timestamptz not null default now()
);

alter table public.sites enable row level security;
alter table public.site_content enable row level security;

drop policy if exists "owner read own sites" on public.sites;
create policy "owner read own sites"
  on public.sites
  for select
  to authenticated
  using (
    owner_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "owner read own site content" on public.site_content;
create policy "owner read own site content"
  on public.site_content
  for select
  to authenticated
  using (
    exists (
      select 1 from public.sites s
      where s.id = site_content.site_id
        and (
          s.owner_id = auth.uid()
          or exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );
