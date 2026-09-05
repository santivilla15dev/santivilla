/** Plantilla Konzept. CTA WhatsApp va a Santi. */
import { whatsappHref } from "@/lib/site";

export type StoreLocation = {
  name: string;
  address: string;
  city: string;
  hours: string;
  mapsQuery: string;
};

export type CategoryHighlight = {
  title: string;
  description: string;
  priceFrom: string;
  image: string;
};

export const universoDelCalzadoDemo = {
  name: "Universo del Calzado",
  city: "Santa Rosa de Osos",
  region: "Antioquia, Colombia",
  tagline:
    "Zapatos, camisetas de club y balones — dos tiendas, un WhatsApp.",
  konzeptNote:
    "Konzept / demo — no es el sitio oficial de Universo del Calzado. Datos de ejemplo.",
  whatsapp: "",
  phone: "+57 300 123 4567",
  categories: [
    {
      title: "Zapatos",
      description: "Deportivos, casuales y talla completa — pregunta por la 42.",
      priceFrom: "Desde $89.000",
      image:
        "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=85",
    },
    {
      title: "Camisetas de club",
      description: "Nacionales e internacionales. Consulta disponibilidad por WhatsApp.",
      priceFrom: "Desde $75.000",
      image:
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=85",
    },
    {
      title: "Balones y más",
      description: "Balones, medias, gorras y accesorios para el partido.",
      priceFrom: "Desde $45.000",
      image:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=85",
    },
  ] satisfies CategoryHighlight[],
  stores: [
    {
      name: "Universo del Calzado — Centro",
      address: "Carrera 29 # 29-14",
      city: "Santa Rosa de Osos",
      hours: "Lun–Sáb 8:30 – 19:00 · Dom 9:00 – 13:00",
      mapsQuery: "Santa Rosa de Osos Antioquia centro",
    },
    {
      name: "Universo del Calzado — Parque",
      address: "Calle 30 # 28-08, frente al parque",
      city: "Santa Rosa de Osos",
      hours: "Lun–Sáb 9:00 – 19:30 · Dom cerrado",
      mapsQuery: "Parque principal Santa Rosa de Osos",
    },
  ] satisfies StoreLocation[],
  heroImage:
    "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=2000&q=85",
  detailImage:
    "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1400&q=85",
} as const;

export function universoWhatsAppHref(message?: string) {
  return whatsappHref(
    message ??
      "Hola Santi, vi la demo Universo del Calzado y me interesa una web así.",
  );
}

export function universoMapsEmbedUrl(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}
