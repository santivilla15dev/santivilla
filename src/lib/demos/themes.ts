export type DemoThemeId =
  | "lugner"
  | "stadtgalerie"
  | "gasthaus"
  | "villa-italia"
  | "solo-modas"
  | "universo-del-calzado";

export type DemoNavItem = {
  href: string;
  label: string;
};

export type DemoTheme = {
  id: DemoThemeId;
  nav: DemoNavItem[];
};

export const demoThemes: Record<DemoThemeId, DemoTheme> = {
  lugner: {
    id: "lugner",
    nav: [
      { href: "#zeiten", label: "Zeiten" },
      { href: "#shops", label: "Shops" },
      { href: "#anfahrt", label: "Anfahrt" },
      { href: "#kontakt", label: "Kontakt" },
    ],
  },
  stadtgalerie: {
    id: "stadtgalerie",
    nav: [
      { href: "#zeiten", label: "Zeiten" },
      { href: "#shops", label: "Shops" },
      { href: "#anfahrt", label: "Anfahrt" },
      { href: "#kontakt", label: "Kontakt" },
    ],
  },
  gasthaus: {
    id: "gasthaus",
    nav: [
      { href: "#speisekarte", label: "Speisekarte" },
      { href: "#zeiten", label: "Zeiten" },
      { href: "#anfahrt", label: "Anfahrt" },
      { href: "#kontakt", label: "Kontakt" },
    ],
  },
  "villa-italia": {
    id: "villa-italia",
    nav: [
      { href: "#especialidad", label: "Especialidad" },
      { href: "#pizzas", label: "Pizzas" },
      { href: "#pastas", label: "Pastas" },
      { href: "#ubicacion", label: "Ubicación" },
    ],
  },
  "solo-modas": {
    id: "solo-modas",
    nav: [
      { href: "#colecciones", label: "Colecciones" },
      { href: "#tiendas", label: "Tiendas" },
      { href: "#contacto", label: "Contacto" },
    ],
  },
  "universo-del-calzado": {
    id: "universo-del-calzado",
    nav: [
      { href: "#categorias", label: "Categorías" },
      { href: "#tiendas", label: "Tiendas" },
      { href: "#contacto", label: "Contacto" },
    ],
  },
};

export function getDemoTheme(id: DemoThemeId): DemoTheme {
  return demoThemes[id];
}
