import type { Locale } from "@/lib/i18n/locales";
import type { BotProfile, FaqAnswer, FaqTopic } from "./types";

function formatHours(profile: BotProfile, locale: Locale): string {
  const lines = profile.hours.map((h) => `${h.label}: ${h.value}`);
  if (profile.closedDays?.length) {
    const closed =
      locale === "de"
        ? "Geschlossen"
        : locale === "en"
          ? "Closed"
          : "Cerrado";
    lines.push(
      ...profile.closedDays.map((d) => `${d}: ${closed}`),
    );
  }
  return lines.join("\n");
}

function defaultReserveMessage(
  profile: BotProfile,
  locale: Locale,
): string {
  if (profile.reservePrompt && locale === "de") {
    return profile.reservePrompt;
  }
  if (locale === "en") {
    return `Hi! I'd like to book a table at ${profile.businessName}.`;
  }
  if (locale === "de") {
    return `Hallo! Ich möchte einen Tisch im ${profile.businessName} reservieren.`;
  }
  return `¡Hola! Me gustaría reservar mesa en ${profile.businessName}.`;
}

function tonightTimeHint(locale: Locale): string {
  const now = new Date();
  const hour = now.getHours();
  const evening = hour >= 17 ? `${hour}:00` : "19:00";
  if (locale === "de") return `heute gegen ${evening} Uhr`;
  if (locale === "en") return `today around ${evening}`;
  return `hoy sobre las ${evening}`;
}

export function answerFaq(
  profile: BotProfile,
  topic: FaqTopic,
  locale: Locale,
): FaqAnswer {
  if (topic === "hours") {
    const text =
      locale === "de"
        ? `Öffnungszeiten — ${profile.businessName}:\n${formatHours(profile, locale)}`
        : locale === "en"
          ? `Opening hours — ${profile.businessName}:\n${formatHours(profile, locale)}`
          : `Horarios — ${profile.businessName}:\n${formatHours(profile, locale)}`;
    return { text };
  }

  if (topic === "parking") {
    const transit = profile.transit ? `\n${profile.transit}` : "";
    const text =
      locale === "de"
        ? `Anfahrt: ${profile.address}${transit}\n\nParken: ${profile.parking.summary}. ${profile.parking.detail}`
        : locale === "en"
          ? `Address: ${profile.address}${transit}\n\nParking: ${profile.parking.summary}. ${profile.parking.detail}`
          : `Dirección: ${profile.address}${transit}\n\nAparcamiento: ${profile.parking.summary}. ${profile.parking.detail}`;
    return { text };
  }

  const timeHint = tonightTimeHint(locale);
  const waBase = defaultReserveMessage(profile, locale);

  if (profile.availability.policy === "walk_in_only") {
    const text =
      locale === "de"
        ? `Wir nehmen Laufkundschaft entgegen. ${profile.availability.note}`
        : locale === "en"
          ? `Walk-ins welcome. ${profile.availability.note}`
          : `Aceptamos clientes sin reserva. ${profile.availability.note}`;
    return { text };
  }

  const text =
    locale === "de"
      ? `Verfügbarkeit ${timeHint}: ${profile.availability.note} Schreib uns kurz per WhatsApp — wir antworten in Minuten.`
      : locale === "en"
        ? `Availability ${timeHint}: ${profile.availability.note} Message us on WhatsApp — we reply within minutes.`
        : `Disponibilidad ${timeHint}: ${profile.availability.note} Escríbenos por WhatsApp — respondemos en minutos.`;

  const whatsappMessage =
    locale === "de"
      ? `${waBase} Habt ihr ${timeHint} Platz für 2 Personen?`
      : locale === "en"
        ? `${waBase} Do you have space for 2 ${timeHint}?`
        : `${waBase} ¿Tenéis sitio para 2 ${timeHint}?`;

  return { text, whatsappMessage, shouldHandoff: true };
}

export function whatsappHref(number: string, message?: string): string {
  const digits = number.replace(/\D/g, "");
  if (!digits) return "";
  const base = `https://wa.me/${digits}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
