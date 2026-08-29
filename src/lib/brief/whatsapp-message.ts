import { absoluteUrl } from "@/lib/site";

/** Mensaje WhatsApp con el enlace del preview del brief. */
export function briefSalesWhatsAppMessage(
  baseMessage: string,
  sharePath: string,
): string {
  const preview =
    sharePath.startsWith("http://") || sharePath.startsWith("https://")
      ? sharePath
      : absoluteUrl(sharePath);
  return `${baseMessage.trim()}\n\nPreview: ${preview}`;
}
