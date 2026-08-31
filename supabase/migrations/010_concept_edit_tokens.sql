-- Edit tokens: only the creator of a concept/brief can mutate it.
-- The token is returned once at creation and stored client-side (localStorage).
alter table public.concepts
  add column if not exists edit_token uuid not null default gen_random_uuid();

alter table public.briefs
  add column if not exists edit_token uuid not null default gen_random_uuid();

-- The token is a write credential: never expose it via public SELECT.
revoke select (edit_token) on public.concepts from anon, authenticated;
revoke select (edit_token) on public.briefs from anon, authenticated;
