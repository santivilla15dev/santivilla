import { site, whatsappHref } from "@/lib/site";

type CtaButtonsProps = {
  whatsappMessage?: string;
  className?: string;
  pulse?: boolean;
};

export function CtaButtons({
  whatsappMessage,
  className = "",
  pulse = false,
}: CtaButtonsProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href={whatsappHref(whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition hover:brightness-110 ${pulse ? "cta-pulse" : ""}`}
      >
        WhatsApp
      </a>
      <a
        href={site.calUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full border border-ink/20 bg-surface px-5 py-3 text-sm font-medium text-ink transition hover:border-accent hover:bg-accent-soft"
      >
        Agendar 15 min
      </a>
    </div>
  );
}
