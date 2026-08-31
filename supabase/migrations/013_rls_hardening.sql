-- RLS hardening: las lecturas de concepts/briefs pasan siempre por
-- service_role en API routes / Server Components. La política de lectura
-- pública (anon + authenticated) no se usa y expone datos de negocio
-- (payloads, prompts internos) a cualquiera con la anon key.

drop policy if exists "public read concepts" on public.concepts;
drop policy if exists "public read briefs" on public.briefs;
