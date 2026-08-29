-- Slug index for Maps → Konzept live URLs (/k/[slug])
-- Apply after 001_concepts.sql

create index if not exists concepts_payload_slug_idx
  on public.concepts ((payload->>'slug'))
  where (payload->>'slug') is not null;
