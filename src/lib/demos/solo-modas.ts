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
};

export const soloModasDemo = {
  name: "Solo Modas",
  city: "Colombia",
  tagline: "Moda para toda la familia — tendencia, calidad y precio justo.",
  konzeptNote:
    "Konzept / demo — no es el sitio oficial de Solo Modas. Datos de ejemplo.",
  whatsapp: "",
  phone: "+57 300 123 4567",
  categories: [
    {
      title: "Mujer",
      description: "Vestidos, blusas, pantalones y conjuntos de temporada.",
      priceFrom: "Desde $45.000",
    },
    {
      title: "Hombre",
      description: "Camisas, jeans, polos y ropa casual para el día a día.",
      priceFrom: "Desde $55.000",
    },
    {
      title: "Accesorios",
      description: "Bolsos, cinturones, bisutería y complementos.",
      priceFrom: "Desde $25.000",
    },
  ] satisfies CategoryHighlight[],
  stores: [
    {
      name: "Solo Modas — Centro",
      address: "Calle 50 # 45-12",
      city: "Medellín",
      hours: "Lun–Sáb 9:00 – 19:00 · Dom 10:00 – 17:00",
      mapsQuery: "Medellín+Colombia+centro+comercial",
    },
    {
      name: "Solo Modas — Laureles",
      address: "Circular 3 # 70-25",
      city: "Medellín",
      hours: "Lun–Sáb 9:30 – 19:30 · Dom cerrado",
      mapsQuery: "Laureles+Medellín",
    },
    {
      name: "Solo Modas — Envigado",
      address: "Cra 43A # 37 Sur-50",
      city: "Envigado",
      hours: "Lun–Sáb 9:00 – 19:00 · Dom 11:00 – 16:00",
      mapsQuery: "Envigado+Antioquia",
    },
  ] satisfies StoreLocation[],
  heroImage:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=85",
  lookbookImages: [
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=85",
  ],
} as const;

export function soloModasWhatsAppHref(message?: string) {
  return whatsappHref(
    message ??
      "Hola Santi, vi la demo Solo Modas y me interesa una web así.",
  );
}

export function soloModasMapsEmbedUrl(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}
