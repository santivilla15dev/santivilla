"use client";

import { MicroBotWidgetLazy } from "@/components/micro-bot-widget-lazy";
import { getMessages } from "@/lib/i18n/get-messages";
import { useSearchParams } from "next/navigation";

/** Micro-Bot solo fuera del preview embebido. */
export function KellerlichtChrome() {
  const preview = useSearchParams().get("preview") === "1";
  if (preview) return null;
  const botLabels = getMessages("de").microBot;
  return <MicroBotWidgetLazy locale="de" labels={botLabels} />;
}
