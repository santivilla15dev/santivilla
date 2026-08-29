/** Datos demo Villa Italia — sustituir con info real de la tía antes del pitch. */

export type DemoMenuItem = {
  name: string;
  price: string;
  note?: string;
};

export type DemoMenuSection = {
  id: string;
  section: string;
  items: DemoMenuItem[];
};

export type DemoHours = {
  days: string;
  time: string;
};

export const villaItaliaDemo = {
  name: "Villa Italia",
  city: "Medellín",
  region: "Antioquia, Colombia",
  tagline: "Pizza al horno de leña y pasta casera — como en casa.",
  konzeptNote:
    "Konzept / demo — no es el sitio oficial de Villa Italia. Datos de ejemplo.",
  whatsapp: "573001234567",
  phone: "+57 300 123 4567",
  address: "Cra 48 # 10-45, El Poblado",
  mapsQuery: "Medellín+Colombia+pizzería",
  deliveryNote: "Domicilios por WhatsApp — respuesta en minutos.",
  hours: [
    { days: "Lun–Jue", time: "11:00 – 22:00" },
    { days: "Vie–Sáb", time: "11:00 – 23:00" },
    { days: "Domingo", time: "12:00 – 22:00" },
  ] satisfies DemoHours[],
  menu: [
    {
      id: "pizzas",
      section: "Pizzas",
      items: [
        {
          name: "Margherita",
          price: "$32.000",
          note: "Salsa de tomate, mozzarella, albahaca",
        },
        {
          name: "Quattro Formaggi",
          price: "$38.000",
          note: "Cuatro quesos, orégano",
        },
        {
          name: "Prosciutto",
          price: "$42.000",
          note: "Jamón serrano, rúcula, parmesano",
        },
        {
          name: "Vegetariana",
          price: "$36.000",
          note: "Verduras asadas, aceite de oliva",
        },
      ],
    },
    {
      id: "pastas",
      section: "Pastas",
      items: [
        {
          name: "Spaghetti Bolognese",
          price: "$28.000",
          note: "Salsa casera de carne",
        },
        {
          name: "Lasagna della casa",
          price: "$34.000",
          note: "Receta de la familia",
        },
        {
          name: "Penne al pesto",
          price: "$26.000",
          note: "Albahaca fresca, piñones",
        },
      ],
    },
    {
      id: "bebidas",
      section: "Bebidas",
      items: [
        { name: "Limonada casera", price: "$8.000", note: "Natural o hierbabuena" },
        { name: "Gaseosa", price: "$6.000", note: "Coca-Cola, Sprite, Colombiana" },
        { name: "Cerveza nacional", price: "$10.000", note: "Botella 330 ml" },
      ],
    },
  ] satisfies DemoMenuSection[],
  heroImage:
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=2000&q=85",
  detailImage:
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=85",
  specialtyBand: {
    title: "Margherita al horno",
    note: "Masa 48 h, mozzarella fior di latte — la que más piden.",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=2000&q=85",
  },
} as const;

export function villaItaliaWhatsAppHref(message?: string) {
  const text = encodeURIComponent(
    message ??
      "Hola Villa Italia, quiero hacer un pedido / reservar mesa. Gracias.",
  );
  return `https://wa.me/${villaItaliaDemo.whatsapp}?text=${text}`;
}

export function villaItaliaMapsEmbedUrl() {
  const q = encodeURIComponent(`${villaItaliaDemo.name} ${villaItaliaDemo.city}`);
  return `https://maps.google.com/maps?q=${q}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}
