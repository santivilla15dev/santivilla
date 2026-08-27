/** Datos centrales del sitio — cámbialos cuando tengas WhatsApp / Cal reales */
export const site = {
  name: "Santi Villa",
  shortName: "SantiVilla",
  domain: "santivilla.com",
  tagline: {
    es: "Webs modernas para negocios locales",
    de: "Moderne Websites für lokale Betriebe",
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

export const packages = [
  {
    id: "landing",
    name: "Landing",
    price: "€400–800",
    description:
      "Una página clara, perfecta en móvil, con WhatsApp y dominio/hosting.",
    includes: [
      "Diseño mobile-first",
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
    slug: "lugner",
    title: "Lugner City — Redesign Konzept",
    type: "Centro comercial",
    href: "/demos/lugner",
    blurb:
      "Propuesta mobile-first del sitio de Lugner City (Wien). Concepto, no sitio oficial.",
    beforeNote:
      "El sitio actual (lugner.at) viene de Typo3 clásico: difícil de usar en el móvil.",
    afterNote:
      "Nueva home con horarios, shops, anfahrt y contacto en un solo flujo táctil.",
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
] as const;
