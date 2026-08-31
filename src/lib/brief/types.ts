import type { BriefPayload } from "./schema";
import type { Locale } from "@/lib/i18n/locales";

export type BriefRecord = {
  id: string;
  locale: Locale;
  input: string;
  payload: BriefPayload;
  createdAt: string;
  editToken?: string;
};
