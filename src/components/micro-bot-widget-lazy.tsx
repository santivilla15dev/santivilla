"use client";

import dynamic from "next/dynamic";
import type { Locale } from "@/lib/i18n/locales";
import type { SiteMessages } from "@/lib/i18n/messages/types";
import { DEMO_BOT_PROFILE_ID } from "@/lib/bot/get-profile";

const MicroBotWidget = dynamic(
  () =>
    import("@/components/micro-bot-widget").then((m) => m.MicroBotWidget),
  { ssr: false },
);

export function MicroBotWidgetLazy({
  locale,
  labels,
  profileId = DEMO_BOT_PROFILE_ID,
}: {
  locale: Locale;
  labels: SiteMessages["microBot"];
  profileId?: string;
}) {
  return (
    <MicroBotWidget profileId={profileId} locale={locale} labels={labels} />
  );
}
