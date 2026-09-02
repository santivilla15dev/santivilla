/** Datos centrales del sitio — cámbialos cuando tengas WhatsApp / Cal reales */
export const site = {
  name: "Santi Villa",
  shortName: "SantiVilla",
  domain: "santivilla.com",
  tagline: {
    es: "Webs modernas que se ven bien en cualquier dispositivo",
    de: "Moderne Websites — klar auf jedem Gerät",
  },
  email: "hola@santivilla.com",
  location: "Wien / Remote",
  /** Número internacional sin + ni espacios, ej: 436601234567 */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "436600000000",
  /** Enlace público de Cal.com o Calendly */
  calUrl:
    process.env.NEXT_PUBLIC_CAL_URL ?? "https://cal.com/santivilla/15min",
} as const;

export function whatsappHref(message?: string) {
  const text = encodeURIComponent(
    message ??
      "Hola Santi, vi tu portafolio y me interesa una web para mi negocio.",
  );
  return `https://wa.me/${site.whatsapp}?text=${text}`;
}

/** Origen público del sitio (WhatsApp / enlaces absolutos). */
export function siteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;
  return `https://${site.domain}`;
}

export function absoluteUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteOrigin()}${clean}`;
}

export const packages = [
  {
    id: "landing",
    name: "Landing",
    price: "€400–800",
    description:
      "Una página clara en móvil, tablet y desktop, con WhatsApp y dominio/hosting.",
    includes: [
      "Diseño responsive (todos los dispositivos)",
      "1 página + secciones",
      "Botón WhatsApp / reserva",
      "Setup dominio + Vercel",
    ],
  },
  {
    id: "negocio",
    name: "Sitio negocio",
    price: "€900–2.000",
    description:
      "Sitio completo (4–6 páginas) para restaurante, tienda o local.",
    includes: [
      "Menú / servicios / horarios",
      "Mapa y contacto",
      "SEO básico",
      "Hasta 2 rondas de cambios",
    ],
  },
  {
    id: "mensual",
    name: "Mantenimiento",
    price: "€50–150/mes",
    description: "Cambios de texto/fotos, uptime y peques mejoras cada mes.",
    includes: [
      "Cambios de contenido",
      "Monitoreo básico",
      "Soporte por WhatsApp",
      "Prioridad en nuevas features",
    ],
  },
] as const;

export const projects = [
  {
    slug: "auditoria",
    title: "Auditoría — score + concepto",
    type: "Producto",
    href: "/auditoria",
    blurb:
      "Pega una URL: score + concepto HTML automático (Santi Design Agent) para todos los dispositivos.",
    tags: ["Lead magnet", "Agente", "Responsive"],
  },
  {
    slug: "stadtgalerie",
    title: "Stadtgalerie West — Konzept centro",
    type: "Centro comercial",
    href: "/demos/stadtgalerie",
    blurb:
      "Plantilla mobile-first de centro comercial en Wien. Concepto ficticio, no un sitio oficial.",
    beforeNote:
      "Muchos centros aún viven en Typo3 antiguo: zoom en móvil, info clave enterrada.",
    afterNote:
      "Home clara: horarios, shops, anfahrt y contacto en un solo flujo táctil.",
    tags: ["Demo", "Mobile-first", "DE"],
  },
  {
    slug: "restaurant",
    title: "Gasthaus Am Hof — Plantilla",
    type: "Restaurante",
    href: "/demos/restaurant",
    blurb:
      "Plantilla reutilizable: menú, horarios, mapa y reserva por WhatsApp.",
    tags: ["Plantilla", "Gastro", "DE"],
  },
  {
    slug: "villa-italia",
    title: "Villa Italia — Pizzería",
    type: "Pizzería",
    href: "/demos/villa-italia",
    blurb:
      "Demo para pizzería en Colombia: carta, horarios, domicilios y WhatsApp — mobile-first.",
    tags: ["Demo", "Gastro", "CO"],
  },
  {
    slug: "solo-modas",
    title: "Solo Modas — Retail",
    type: "Moda",
    href: "/demos/solo-modas",
    blurb:
      "Demo tienda de ropa: categorías, varias sedes, horarios y WhatsApp — mobile-first.",
    tags: ["Demo", "Retail", "CO"],
  },
  {
    slug: "universo-del-calzado",
    title: "Universo del Calzado — Sports",
    type: "Sports retail",
    href: "/demos/universo-del-calzado",
    blurb:
      "Demo Santa Rosa de Osos: shoes, club shirts, two stores and WhatsApp — mobile-first.",
    tags: ["Demo", "Retail", "CO"],
  },
] as const;

export const viennaMallCase = projects.find((p) => p.slug === "stadtgalerie")!;

/** Copy de la home — narrativa para clientes locales */
export const homeContent = {
  heroLead:
    "Tus clientes deciden en segundos si se quedan. Yo construyo webs que ganan esos segundos — para restaurantes, locales y centros en Wien.",
  intro: {
    eyebrow: "De qué se trata",
    title: "Una web que tus clientes entienden en segundos",
    body: "Soy Santi Villa. Ayudo a negocios locales (Wien y remote) a tener una presencia online limpia: horarios, menú o servicios, mapa y WhatsApp a un toque. Sin líos técnicos, sin sitios que solo se ven bien en un monitor grande.",
  },
  advantages: [
    {
      title: "Se ve bien en cualquier pantalla",
      body: "Móvil, tablet y desktop. Tus clientes no pelean con el zoom ni con menús imposibles.",
    },
    {
      title: "Contacto en un toque",
      body: "WhatsApp, llamada o reserva visibles. Menos fricción = más clientes que te escriben.",
    },
    {
      title: "Ves el concepto antes de decidir",
      body: "Te muestro un redesign de ejemplo (Konzept). Si te gusta, lo convertimos en web real.",
    },
    {
      title: "Precios y alcance claros",
      body: "Landing, sitio de negocio o mantenimiento. Sabes qué incluye cada paquete desde el día uno.",
    },
  ],
  clientDesign: {
    eyebrow: "Diseño para clientes",
    title: "Así trabajamos el diseño juntos",
    body: "Primero creo un Konzept: una propuesta visual de cómo podría verse tu negocio online. No es el sitio oficial — es una demo honesta para que veas el salto. Puedes pedir cambios (menú, horarios, idioma) y, cuando encaje, lanzo la web real con dominio, hosting y WhatsApp listo.",
    steps: [
      "Audit o demo: vemos tu web actual o una plantilla cercana a tu rubro.",
      "Konzept: diseño responsive con tu info (o datos que me pases).",
      "Feedback: WhatsApp o el chat del agente — afinamos hasta que digas sí.",
      "Web real: publicamos, conectamos dominio y dejas de depender de sitios antiguos.",
    ],
    ctaDemo: "Ver demo Stadtgalerie",
    ctaAudit: "Probar con tu URL",
  },
  mobileErst: {
    eyebrow: "Producto",
    title: "Auditoría con tu URL",
    body: "Pega la URL de tu negocio: recibes un score responsive (0–100) y un concepto HTML automático con el Santi Design Agent. Ideal para enseñar el “antes / después” al dueño o a ti mismo.",
  },
  work: {
    title: "Trabajos y demos",
    body: "Ejemplos en vivo que puedes abrir y mandar por WhatsApp. Las demos son propuestas conceptuales, no sitios oficiales de esos negocios.",
  },
} as const;

