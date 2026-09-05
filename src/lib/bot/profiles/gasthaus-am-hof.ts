import { site } from "@/lib/site";
import type { BotProfile } from "../types";

export const gasthausAmHofProfile: BotProfile = {
  id: "gasthaus-am-hof",
  businessName: "Gasthaus Am Hof",
  whatsapp: site.whatsapp,
  address: "Am Hof 1, 1010 Wien",
  transit: "U1 / U3 Stephansplatz",
  hours: [
    { label: "Di–Fr", value: "11.30–14.30 · 17.30–22.00" },
    { label: "Sa–So", value: "11.30–22.00" },
  ],
  closedDays: ["Montag"],
  parking: {
    summary: "Garagen in der Innenstadt + Kurzparkzone",
    detail:
      "Garage Am Hof / Freyung in Gehweite. Kurzparkzone Mo–Fr 9–22 Uhr, Sa 18–22 Uhr (Wien 1).",
  },
  availability: {
    policy: "whatsapp_confirm",
    note: "Plätze bestätigen wir per WhatsApp — keine Online-Garantie ohne Rückmeldung.",
  },
  reservePrompt:
    "Hallo! Ich möchte einen Tisch im Gasthaus Am Hof reservieren.",
};
