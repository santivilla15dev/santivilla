-- Konzept demo reservation forms (Gasthaus, Kellerlicht)
alter table public.leads drop constraint if exists leads_source_check;

alter table public.leads
  add constraint leads_source_check
  check (source in ('contact', 'audit', 'concept', 'maps', 'manual', 'brief', 'demo'));
