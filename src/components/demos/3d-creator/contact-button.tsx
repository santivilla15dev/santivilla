import type { Creator3dContent } from "@/lib/demos/3d-creator";
import { emailHref, hasWhatsApp, site, whatsappHref } from "@/lib/site";

export function ContactButton({
  content,
  className = "",
}: {
  content: Creator3dContent;
  className?: string;
}) {
  const href = hasWhatsApp()
    ? whatsappHref(content.contact.whatsapp)
    : emailHref();

  return (
    <a
      href={href}
      target={hasWhatsApp() ? "_blank" : undefined}
      rel={hasWhatsApp() ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-[#1a1408] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4b45a] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${className}`}
      style={{
        background: "#d4b45a",
        boxShadow: "0 8px 24px rgba(212, 180, 90, 0.28)",
      }}
    >
      {hasWhatsApp() ? content.contact.label : site.email}
    </a>
  );
}
