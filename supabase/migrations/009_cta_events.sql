-- WhatsApp / CTA click events (server-side redirect, no cookies)
create table if not exists public.cta_events (
  id bigserial primary key,
  site_id text not null references public.sites(id) on delete cascade,
  kind text not null check (kind in ('whatsapp', 'phone', 'reserve')),
  context text,
  created_at timestamptz not null default now()
);

create index if not exists cta_events_site_idx on public.cta_events (site_id, created_at desc);

alter table public.cta_events enable row level security;

drop policy if exists "owner read own cta events" on public.cta_events;
create policy "owner read own cta events"
  on public.cta_events
  for select
  to authenticated
  using (
    exists (
      select 1 from public.sites s
      where s.id = cta_events.site_id
        and (
          s.owner_id = auth.uid()
          or exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );
