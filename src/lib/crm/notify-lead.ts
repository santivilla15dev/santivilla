import type { Lead } from "./types";

/** Optional webhook (Slack / n8n). No new email library. */
export async function notifyNewLead(lead: Lead): Promise<void> {
  const hook = process.env.LEAD_WEBHOOK_URL?.trim();
  if (!hook) return;
  try {
    await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `Nuevo lead (${lead.source}): ${lead.businessName || lead.name || lead.email || lead.id}`,
        lead,
      }),
    });
  } catch {
    console.error("[notify-lead] webhook failed");
  }
}
