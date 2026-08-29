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
  - Portafolio: español (+ alemán donde haga falta, porque el cliente está en Austria)
  - Demos de clientes austriacos (ej. Lugner): **alemán**
- **Cómo cierro ventas:** WhatsApp + cita de 15 min (Cal.com/Calendly)
- **Regla de negocio:** demos/conceptos gratis para pitch; código/entrega solo con depósito 30–50%

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

**Stack:** Next.js (App Router) + Tailwind + deploy en Vercel  
**URL actual en vivo:** https://santivilla-rxxn.vercel.app  
**Repo:** https://github.com/santivilla15dev/santivilla  
**Pendiente:** conectar dominio `santivilla.com`, WhatsApp real, Cal.com real

### Páginas del portafolio

| Ruta | Qué es |
|------|--------|
| `/` | Home: marca “Santi Villa” como héroe, tagline, CTA WhatsApp + Agendar, preview móvil |
| `/trabajos` | Demos + comparación antes/después Lugner + precios orientativos |
| `/servicios` | 3 paquetes |
| `/contacto` | WhatsApp, email, embed Cal.com, formulario mailto |
| `/demos/lugner` | Demo rediseño Lugner City (DE, mobile-first, banner no oficial) |
| `/demos/restaurant` | Plantilla ficticia “Gasthaus Am Hof” (menú, horarios, mapa, WhatsApp) |

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
   - Taglines más fuertes (ES + DE)
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
   - Ofertas de entrada (ej. “auditoría móvil gratis + mockup”)

6. **Contenido del sitio**
   - Textos de casos / FAQ / proceso de trabajo
   - Qué añadir a `/trabajos` y `/servicios` para convertir mejor

---

## Constraints que Gemini debe respetar

- Marca personal: **Santi Villa** / `santivilla.com` (no inventar nombre de agencia)
- Primero mobile; demos pensadas para enseñar en el teléfono
- No fingir proyectos oficiales de clientes reales
- No scrapear directorios enteros; demos conceptuales con datos públicos
- No CMS/Supabase todavía (sitio estático / Next simple)
- Copy en ES para portafolio; DE para demos austriacas
- Diseño: evitar purple gradients, Inter, cream+serif terracotta, dashboard clutter

---

## Prompt listo para pegar en Gemini

```text
Actúa como director creativo + estratega de marketing local en Viena.

Contexto (léelo completo): el briefing de arriba sobre Santi Villa.

Ya tengo el sitio en vivo en Vercel (https://santivilla-rxxn.vercel.app) y demos de Lugner + restaurante.
Quiero ideas, no código.

Entrégame:
1) 5 taglines ES + 5 DE para Santi Villa
2) 3 direcciones visuales distintas (mood, color, tipografía, atmósfera) respetando mis constraints
3) Mejoras concretas para la demo Lugner City (UX móvil, secciones, storytelling antes/después)
4) 3 plantillas de negocio adicionales para vender en Viena (estructura de secciones)
5) 5 mensajes cortos de WhatsApp/email para contactar negocios (incluido uno para Lugner, transparente y ético)
6) Checklist de mejoras del portafolio para subir conversión en 7 días

Sé concreto, accionable y local (Austria/Wien). Evita consejos genéricos de “agencia digital”.
```

---

## Preguntas opcionales si quieres afinar con Gemini

- ¿Mi look actual (teal + piedra) se siente “Viena” o demasiado tech?
- ¿Debo mostrar precios en la web o solo tras llamada?
- ¿La demo Lugner debe verse más “shopping center luxury” o más “útil y clara”?
- ¿Cómo nombrar los paquetes para que suenen menos “freelancer” y más “servicio local”?
