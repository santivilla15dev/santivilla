const FAKE_WHATSAPP = new Set([
  "436600000000",
  "436601234567",
  "573001234567",
]);

function readPublicEnv(key: string): string {
  return process.env[key]?.trim() ?? "";
}

function cleanWhatsApp(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits || FAKE_WHATSAPP.has(digits)) return "";
  return digits;
}

/** Datos centrales del sitio. WhatsApp y Cal solo existen si hay env real. */
export const site = {
  name: "Santi Villa",
  shortName: "SantiVilla",
  domain: "santivilla.com",
  tagline: {
    es: "Webs modernas que se ven bien en cualquier dispositivo",
    de: "Moderne Websites - klar auf jedem Gerät",
  },
  email: "hola@santivilla.com",
  location: "Wien / Remote",
  /** E.164 sin +. Vacío si falta env o es un placeholder. */
  whatsapp: cleanWhatsApp(readPublicEnv("NEXT_PUBLIC_WHATSAPP")),
  /** Vacío si no hay calendario real configurado. */
  calUrl: readPublicEnv("NEXT_PUBLIC_CAL_URL"),
} as const;

export function hasWhatsApp(): boolean {
  return site.whatsapp.length > 0;
}

export function hasCal(): boolean {
  return site.calUrl.length > 0;
}

export function emailHref(subject?: string, body?: string): string {
  const q = new URLSearchParams();
  if (subject) q.set("subject", subject);
  if (body) q.set("body", body);
  const qs = q.toString();
  return qs ? `mailto:${site.email}?${qs}` : `mailto:${site.email}`;
}

export function whatsappHref(message?: string): string {
  if (!hasWhatsApp()) return "";
  const text = encodeURIComponent(
    message ??
      "Hola Santi, vi tu portafolio y me interesa una web para mi negocio.",
  );
  return `https://wa.me/${site.whatsapp}?text=${text}`;
}

/**
 * Origen público. santivilla.com está en otra cuenta Vercel (402) —
 * no lo usamos como fallback hasta que el dominio viva en santivilla-rxxn.
 */
export function siteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;
  return "https://santivilla-rxxn.vercel.app";
}

export function absoluteUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteOrigin()}${clean}`;
}

export const packages = [
  {
    id: "landing",
    name: "Landing",
    price: "€400-800",
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
    price: "€900-2.000",
    description:
      "Sitio completo (4-6 páginas) para restaurante, tienda o local.",
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
    price: "€50-150/mes",
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
    slug: "stadtgalerie",
    title: "Stadtgalerie West - Konzept centro",
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
    title: "Gasthaus Am Hof - Cinemática",
    type: "Restaurante",
    href: "/demos/restaurant",
    blurb:
      "Landing con vídeo scroll: Speisekarte, horarios y reserva WhatsApp.",
    tags: ["Demo", "Gastro", "DE"],
  },
  {
    slug: "kellerlicht",
    title: "Kellerlicht - Weinbar cinemática",
    type: "Weinbar",
    href: "/demos/kellerlicht",
    blurb:
      "Landing con vídeo scroll: Am Glas, horarios y reserva WhatsApp.",
    tags: ["Demo", "Gastro", "DE"],
  },
  {
    slug: "villa-italia",
    title: "Villa Italia - Pizzería",
    type: "Pizzería",
    href: "/demos/villa-italia",
    blurb:
      "Demo para pizzería en Colombia: carta, horarios, domicilios y WhatsApp - mobile-first.",
    tags: ["Demo", "Gastro", "CO"],
  },
  {
    slug: "solo-modas",
    title: "Solo Modas - Retail",
    type: "Moda",
    href: "/demos/solo-modas",
    blurb:
      "Demo tienda de ropa: categorías, varias sedes, horarios y WhatsApp - mobile-first.",
    tags: ["Demo", "Retail", "CO"],
  },
  {
    slug: "universo-del-calzado",
    title: "Universo del Calzado - Sports",
    type: "Sports retail",
    href: "/demos/universo-del-calzado",
    blurb:
      "Demo Santa Rosa de Osos: shoes, club shirts, two stores and WhatsApp - mobile-first.",
    tags: ["Demo", "Retail", "CO"],
  },
  {
    slug: "vaultshield",
    title: "VaultShield - SaaS",
    type: "Landing de producto",
    href: "/demos/vaultshield",
    blurb:
      "Concepto de gestor de contraseñas: hero con vídeo a pantalla completa, menú lateral en móvil y animaciones.",
    tags: ["Concepto", "SaaS", "EN/DE/ES"],
  },
  {
    slug: "novaai",
    title: "NovaAI - SaaS",
    type: "Landing cinematográfica",
    href: "/demos/novaai",
    blurb:
      "Landing de IA: vídeo ligado al scroll, cristal esmerilado y tipografía editorial.",
    tags: ["Concepto", "SaaS", "EN"],
  },
] as const;

export const viennaMallCase = projects.find((p) => p.slug === "stadtgalerie")!;

