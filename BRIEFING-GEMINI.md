# Briefing para Gemini: Santi Villa — webs para negocios locales

Copia este archivo completo y pégaselo a Gemini. Al final tienes un prompt listo.

---

## Quién soy y qué negocio estoy montando

- **Nombre / marca:** Santi Villa (marca personal, no agencia inventada)
- **Dominio objetivo:** `santivilla.com`
- **Ubicación:** Wien (Viena), Austria / trabajo remote
- **Negocio:** crear y vender websites modernas a negocios locales (restaurantes, locales, centros comerciales)
- **Objetivo:** ingresos extra vendiendo sitios mobile-first + mantenimiento mensual
- **Idiomas:**
  - Portafolio: español / alemán / inglés
  - Demos de clientes austriacos (ej. Lugner): **alemán**
- **Cómo cierro ventas:** WhatsApp + cita de 15 min (Cal.com)
- **Regla de negocio:** demos/conceptos gratis para pitch; código/entrega solo con depósito 30–50%

---

## Posicionamiento (regla fija)

**Un solo producto público: websites** para negocios locales.

- Nav del portafolio: solo **Trabajos · Servicios · Contacto** (sin “Mobile Erst”, “Brief”, bots, etc. en el chrome).
- Hero: marca + **promesa afilada** (segundos / quedarse) + Wien/rubros · subtexto *Klar. Schnell. Mobile zuerst.* debajo del lead · **CTA primario** = Mobile Erst / URL (`/auditoria`, botón sólido + pulse) · **CTA secundario** = WhatsApp (borde/discreto, sin pulse). Demo Lugner **no** en el hero: solo en el bloque de 4 pasos. Sin “Agendar” en el hero.
- Brief Agent no va en el nav: vive en **Kontakt** como alternativa (“¿preferís escribir un brief…?”) y en Servicios; en home, “Qué incluye” es solo título + descripción (sin links a tools).
- Herramientas IA (auditoría responsive, Design Agent, Brief→landing, carta digital, Micro-Bot WhatsApp, copy local, Maps→Konzept) son **features / cómo demuestras valor** dentro del servicio — no líneas de producto competidoras en la primera impresión.
- Un dueño que entra debe entender en segundos: *vendes webs*; el lead magnet fuerte es **probar con su URL**; WhatsApp queda a un clic. No elegir entre “auditoría vs bot vs brief” en el hero.
- **Casos Viena ≠ plantillas por rubro:** en home y `/trabajos`, **Wien = solo Lugner** (lead caliente); Gasthaus + Villa Italia / Solo Modas / Universo van en “Vorlagen nach Branche” / plantillas — sin vender Colombia como mercado; una línea de prueba social (*Auch international getestet*).
- **Prueba social en home:** métricas Lighthouse PSI del caso Lugner (antes live / después Konzept). Sin testimonios inventados ni conteos falsos; citas solo con permiso real de un piloto.

---

## Estrategia de venta

1. Tener portafolio propio creíble
2. Crear demo ya hecha (o personalizada) del negocio del cliente
3. Mostrarla por WhatsApp / reunión corta
4. Cobrar depósito y entregar

Flujo: Portafolio (`santivilla.com`) → Demo personalizada → Pitch antes/después + WhatsApp → Depósito + entrega

**Lead caliente actual:** https://www.lugner.at — Lugner City, centro comercial en Viena 15 (Gablenzgasse). Su web es Typo3 antigua, muy mala en móvil, poco responsive.

**Ética / legal en demos:**
- Banner claro: concepto / rediseño, **no es el sitio oficial**
- No fingir ser su agencia
- Pitch transparente: “Hice un rediseño conceptual del móvil; ¿les interesa modernizarlo?”

---

## Qué ya está construido (estado real)

**Stack:** Next.js 16 (App Router) + React 19 + Tailwind 4 + Supabase + deploy en Vercel  
**URL actual en vivo:** https://santivilla-rxxn.vercel.app  
**Repo:** https://github.com/santivilla15dev/santivilla  
**Pendiente:** conectar dominio `santivilla.com`, WhatsApp/Cal reales si faltan

### Páginas del portafolio (chrome)

| Ruta | Qué es |
|------|--------|
| `/` | Home: marca “Santi Villa”, promesa webs, CTA primario auditoría URL + WhatsApp secundario; demo en proceso 4 pasos; prueba social = métricas Lugner PSI; teaser **Desde €400** → `/servicios`; “Qué incluye” sin links |
| `/trabajos` | Wien (Lugner) + Vorlagen nach Branche (Gasthaus + plantillas) + precios |
| `/servicios` | 3 paquetes + extras del proyecto (carta, bot, copy, brief…) |
| `/contacto` | WhatsApp, email, Cal.com, formulario → lead |

### Lead magnets / tools (existen; no van en nav; auditoría sí es CTA primario del hero)

| Ruta | Rol |
|------|-----|
| `/auditoria` | Mobile Erst — score + Konzept desde URL (**CTA primario home**) |
| `/brief` | Brief Agent — texto → landing conceptual |
| `/digitalizar-carta` | OCR carta → preview |
| `/micro-bot` | FAQ + handoff WhatsApp |
| `/copy-lokal` | Adaptación cultural de copy |
| `/maps-konzept` | Prospección interna Maps → Konzept |
| `/demos/lugner` | Demo rediseño Lugner City (DE) |
| `/demos/restaurant` | “Gasthaus Am Hof” + Micro-Bot |
| `/admin` · `/portal` | Mini-CRM + portal del dueño (Supabase Auth) |

### Paquetes / precios orientativos (Austria / EU)

- **Landing:** €400–800 — 1 página, móvil, WhatsApp, setup dominio/hosting
- **Sitio negocio:** €900–2.000 — 4–6 páginas, menú/horarios/mapa, SEO básico
- **Centro comercial:** ~€3.000–8.000+ según alcance
- **Mantenimiento:** €50–150/mes

### Dirección visual actual (ya implementada)

- Tipografías: **Fraunces** (display) + **Manrope** (body) — no Inter/Roboto
- Paleta: piedra vienesa + pino/teal (`#0b5f63`), acento cálido (`#c45c26`), fondos con gradientes suaves (no flat blanco)
- Evitar looks genéricos AI: púrpura-on-white, cream+terracotta, dark mode purple glow, pills excesivas
- Hero: una sola composición; marca primero; sin cards en el hero; sin clutter de stats
- Motion: animaciones de entrada (rise/fade) + pulse suave en CTA

### Demo Lugner (contenido basado en lugner.at)

Secciones: hero marca, Öffnungszeiten (City / Gastro Mörtelmarkt / Kino), Shops por categorías, Anfahrt (U6, buses), Kontakt (Gablenzgasse 11, tel, email público).  
Banner: “Konzept / Redesign-Vorschlag — keine offizielle Website von Lugner City”

### Demo restaurante

“Gasthaus Am Hof” (ficticio): Speisekarte, Öffnungszeiten, mapa, CTA Reservieren por WhatsApp.

---

## Qué quiero que Gemini me ayude a inventar

No quiero que reescriba el stack técnico. Quiero ideas creativas y de negocio:

1. **Posicionamiento y copy**
   - Taglines más fuertes (ES + DE) que digan “websites”, no catálogo de tools
   - Frases de hero / servicios / pitch WhatsApp
   - Cómo sonar local en Viena sin parecer agencia genérica

2. **Dirección de diseño / moodboard verbal**
   - Variaciones de look para el portafolio (sin caer en clichés AI)
   - Cómo hacer el home más “premium pero cercano”
   - Ideas de motion (2–3 momentos, no ruido)

3. **Mejoras de la demo Lugner**
   - Ideas de UX mobile para un centro comercial
   - Secciones que faltan (eventos, kino, Ärztezentrum, freie Flächen, gutschein…)
   - Cómo presentar el “antes vs después” de forma más convincente

4. **Plantillas reutilizables**
   - Más tipos de negocio además de restaurante (café, Friseur, Zahnarzt, Handel…)
   - Estructura mínima de cada plantilla para vender rápido

5. **Go-to-market en Viena**
   - Cómo contactar dueños / managers (WhatsApp, email, visita)
   - Scripts de mensaje cortos
   - Ofertas de entrada enmarcadas como *paso del servicio web* (ej. “te muestro cómo se vería tu sitio en móvil”), no como segundo producto

6. **Contenido del sitio**
   - Textos de casos / FAQ / proceso de trabajo
   - Qué añadir a `/trabajos` y `/servicios` para convertir mejor **sin** volver a llenar el nav de ofertas

---

## Constraints que Gemini debe respetar

- Marca personal: **Santi Villa** / `santivilla.com` (no inventar nombre de agencia)
- **Un producto en hero/nav: websites.** Tools IA = features del servicio
- **Jerarquía CTA home:** 1) auditoría/URL · 2) WhatsApp · demo Lugner solo en el flujo de 4 pasos · “Qué incluye” sin links a tools
- Primero mobile; demos pensadas para enseñar en el teléfono
- No fingir proyectos oficiales de clientes reales
- No scrapear directorios enteros; demos conceptuales con datos públicos
- Stack real: Next.js + Supabase + Vercel (no asumir sitio estático puro)
- Copy ES/DE/EN en portafolio; DE para demos austriacas
- Diseño: evitar purple gradients, Inter, cream+serif terracotta, dashboard clutter

---

## Prompt listo para pegar en Gemini

```text
Actúa como director creativo + estratega de marketing local en Viena.

Contexto (léelo completo): el briefing de arriba sobre Santi Villa.

Ya tengo el sitio en vivo en Vercel (https://santivilla-rxxn.vercel.app) y demos de Lugner + restaurante.
Posicionamiento fijo: vendo WEBSITES; las tools IA no compiten en hero/nav.
Quiero ideas, no código.

Entrégame:
1) 5 taglines ES + 5 DE para Santi Villa (producto = webs)
2) 3 direcciones visuales distintas (mood, color, tipografía, atmósfera) respetando mis constraints
3) Mejoras concretas para la demo Lugner City (UX móvil, secciones, storytelling antes/después)
4) 3 plantillas de negocio adicionales para vender en Viena (estructura de secciones)
5) 5 mensajes cortos de WhatsApp/email para contactar negocios (incluido uno para Lugner, transparente y ético)
6) Checklist de mejoras del portafolio para subir conversión en 7 días — sin volver a fragmentar la oferta en el nav

Sé concreto, accionable y local (Austria/Wien). Evita consejos genéricos de “agencia digital”.
```

---

## Preguntas opcionales si quieres afinar con Gemini

- ¿Mi look actual (teal + piedra) se siente “Viena” o demasiado tech?
- ¿Debo mostrar precios en la web o solo tras llamada?
- ¿La demo Lugner debe verse más “shopping center luxury” o más “útil y clara”?
- ¿Cómo nombrar los paquetes para que suenen menos “freelancer” y más “servicio local”?
