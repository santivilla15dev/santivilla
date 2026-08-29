import type { Locale } from "@/lib/i18n/locales";

export type MenuItem = {
  name: string;
  price: string;
  description?: string;
  allergens?: string[];
};

export type MenuSection = {
  title: string;
  items: MenuItem[];
};

export type MenuConfidence = "high" | "medium" | "low";

export type MenuDraft = {
  id: string;
  restaurantName: string | null;
  locale: Locale;
  sections: MenuSection[];
  confidence: MenuConfidence;
  warnings: string[];
  sourceImageHash?: string;
  createdAt: string;
};

export type MenuExtractResult = Omit<MenuDraft, "id" | "createdAt">;
