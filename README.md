# Santi Villa — portafolio + demos
# https://santivilla.com

**En vivo:** https://santivilla-rxxn.vercel.app

## Briefing para Gemini
Ideas de copy, diseño y pitch: abre [`BRIEFING-GEMINI.md`](./BRIEFING-GEMINI.md), copia todo y pégalo en Gemini con el prompt del final.

## Mobile Erst + Santi Design Agent
1. `/de/auditoria` (o `/en/auditoria`) — pega URL → **UX score al instante** + **Lighthouse mobile** (Google PageSpeed)
2. **Diagnóstico IA** — 3 puntos críticos de pérdida de clientes + audio ~30s (Web Speech) + reporte imprimible `/auditoria/report/[id]`
3. **Concepto + imágenes** — entiende el negocio, genera fotos y HTML  
4. `/[locale]/concepto/[id]` — preview compartible + chat + WhatsApp  

## Mini-CRM + Portal del dueño (Micro-SaaS)
**Fase 1 — CRM interno**
- `/login` — Supabase Auth (email + password)
- `/admin` — pipeline de leads (contacto, audit, concepto, maps)
- `POST /api/leads` — formulario contacto guarda lead en Supabase
- Hooks automáticos tras diagnose, design y maps-konzept

**Fase 2 — Portal cliente**
- `/portal` — dueño edita menú del día, horarios festivos, avisos
- `/go/wa?site=slug` — tracking clics WhatsApp (redirect, sin cookies)
- Admin: convertir concepto → site (`/admin/leads/[id]`)

Migraciones: `006_auth_profiles.sql` … `009_cta_events.sql`

**Primer admin:** crea usuario en Supabase Auth → SQL:
```sql
update public.profiles set role = 'admin' where id = '<uuid>';
```

## Carta Digital (digitalizador IA)
1. `/de/digitalizar-carta` · `/en/digitize-menu` · `/es/digitalizar-carta` — sube foto de carta (móvil)
2. Claude Vision extrae platos, precios y alérgenos **solo del texto visible** (sin inventar)
3. `/[locale]/menu/[id]` — preview mobile compartible + CTA WhatsApp (demo: `/de/menu/demo-konzept`)

Keys: `ANTHROPIC_API_KEY` (obligatorio para OCR) + Supabase (`002_menu_drafts.sql`). La imagen **no se guarda** en v1.

## Micro-Bot WhatsApp
1. `/[locale]/micro-bot` — widget demo con 3 FAQs (sitio, horarios, aparcar)
2. Chips responden al instante; texto libre usa Claude para intención + handoff WhatsApp
3. Demo en vivo: `/demos/restaurant` (Gasthaus Am Hof ficticio)

Sin `ANTHROPIC_API_KEY`: chips FAQ siguen funcionando; texto libre devuelve 503.

## Copy local (adaptación cultural)
1. `/de/copy-lokal` · `/en/local-copy` · `/es/adaptar-copy` — pega texto, elige audiencias
2. IA adapta tono (no traduce literal): alemán formal AT, inglés turista, etc.
3. `/[locale]/copy/[id]` — preview compartible (demo: `/de/copy/demo-konzept`)
4. Tab **Copy** en `/[locale]/concepto/[id]` — pre-relleno desde el concepto

Requiere `ANTHROPIC_API_KEY` + migración `003_copy_drafts.sql`.

## Maps → Konzept Live (prospecting interno)
1. `/de/maps-konzept` — pega URL de Google Maps → Konzept con horarios y fotos reales
2. `/k/[slug]` — enlace corto pitch-ready (noindex, banner Konzept)
3. Batch: `npm run prospect:maps -- url1 url2` o archivo `.txt` (requiere servidor con keys)

Keys: `GOOGLE_PLACES_API_KEY` (Places API New, distinta de PageSpeed) + `ANTHROPIC_API_KEY` + Supabase (`004_konzept_slugs.sql`).

Sin `GOOGLE_PLACES_API_KEY`: herramienta devuelve 503.

## SEO estructurado automático (JSON-LD)
Cada concepto generado incluye **Schema.org JSON-LD** en el `<head>` del HTML:

- `LocalBusiness` / `Restaurant` / `ShoppingCenter` según tipo de negocio
- `OpeningHoursSpecification` desde horarios reales (audit, Maps o edición)
- `Menu` + `MenuItem` si vinculas una carta digitalizada (`menuDraftId` en el agente)
- Se re-sincroniza al guardar ediciones manuales o revisar por chat

Validar: abre `/[locale]/concepto/[id]/raw` → [Google Rich Results Test](https://search.google.com/test/rich-results).

Keys en `.env.local` / Vercel:
- `PAGESPEED_API_KEY` → Lighthouse real (LCP, FCP, CLS) en Mobile Erst  
- `GOOGLE_PLACES_API_KEY` → Maps → Konzept Live (Places API New)  
- `ANTHROPIC_API_KEY` → mejor HTML + comprensión del negocio + **OCR carta**  
- `HF_KEY=keyId:secret` → imágenes **Nano Banana Pro** (Higgsfield). Sin esto: Unsplash
- `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` → conceptos persistentes (obligatorio en prod)

Credenciales Higgsfield: [cloud.higgsfield.ai](https://cloud.higgsfield.ai/)

## Supabase (conceptos persistentes)
1. Crea proyecto en [supabase.com](https://supabase.com)
2. SQL Editor → ejecuta migraciones `001`–`009` en [`supabase/migrations/`](./supabase/migrations/) (concepts, menu, copy, slugs, audit_reports, profiles, leads, sites, cta_events)
3. Settings → API: copia URL, anon key y **service role key** a `.env.local` / Vercel
4. Regenerar tipos tras cambiar schema: `npm run gen:types` (requiere `SUPABASE_PROJECT_ID`)

Sin Supabase en local: fallback en memoria (conceptos se pierden al reiniciar).

### Benchmarks demo (Lugner)
Tras configurar `PAGESPEED_API_KEY`:

```bash
npm run benchmark:demos
npm run benchmark:portfolio
```

Actualiza [`src/lib/demos/benchmarks.ts`](src/lib/demos/benchmarks.ts) con LCP/Performance medidos (PSI/Lighthouse mobile). `benchmark:portfolio` actualiza solo el score de la home (`portfolioHomeBenchmark`; requiere `PAGESPEED_API_KEY`).

## Setup local
1. `npm install`
2. Copia `.env.example` → `.env.local`
3. `npm run dev` → http://localhost:3000

## Rutas
- `/` → redirige a `/de` o `/en` según `Accept-Language` (español manual: `/es/...`)
- `/de` · `/en` · `/es` — Home (ISR 1h)
- `/[locale]/auditoria` — Mobile Erst
- `/[locale]/digitalizar-carta` · `/en/digitize-menu` — Carta Digital (foto → preview)
- `/[locale]/menu/[id]` — preview menú OCR (noindex)
- `/[locale]/micro-bot` — Micro-Bot WhatsApp (FAQ + handoff)
- `/de/copy-lokal` · `/en/local-copy` · `/es/adaptar-copy` — Copy local
- `/[locale]/copy/[id]` — preview copy adaptado (noindex)
- `/[locale]/trabajos` — Demos + antes/después Lugner
- `/[locale]/servicios` · `/[locale]/contacto`
- `/de/impressum` · `/de/datenschutz` · `/en/imprint` · `/en/privacy`
- `/login` · `/admin` · `/portal` — CRM + portal (sin locale prefix)
- `/go/wa` — redirect WhatsApp con tracking
- `/[locale]/concepto/[id]` — preview del agente (SSR + Supabase)

## i18n
- Locales: `de` (default AT), `en`, `es` (no auto-detect — enlaces manuales)
- Cookie `sv_locale` al cambiar idioma en el header
- Sin librería i18n: diccionarios en `src/lib/i18n/messages/`

## Legal (Austria)
- Impressum + Datenschutz mínimos (nombre, email, Wien)
- Ampliar con `NEXT_PUBLIC_LEGAL_*` en `.env.example` cuando tengas UID/GISA

## Deploy (Vercel)
Proyecto: **`santivilla-rxxn`**

```bash
vercel link --project santivilla-rxxn --yes
vercel --prod
```

**Antes del pitch público:**
1. Vercel → Project Settings → **Deployment Protection** → desactiva **Vercel Authentication** en **Production** (el portfolio debe ser público)
2. Añade todas las env vars de `.env.example` en Vercel → Settings → Environment Variables
3. Dominio `santivilla.com` → apuntar al proyecto `santivilla-rxxn` (si aún no está activo)

Reglas IA del repo: [`.cursorrules`](./.cursorrules)
