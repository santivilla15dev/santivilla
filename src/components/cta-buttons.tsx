import { Button } from "@/components/ui/button";
import {
  emailHref,
  hasCal,
  hasWhatsApp,
  site,
  whatsappHref,
} from "@/lib/site";

type CtaButtonsProps = {
  whatsappMessage?: string;
  className?: string;
  pulse?: boolean;
  whatsappLabel?: string;
  scheduleLabel?: string;
  emailLabel?: string;
};

export function CtaButtons({
  whatsappMessage,
  className = "",
  pulse = false,
  whatsappLabel = "WhatsApp",
  scheduleLabel = "Agendar 15 min",
  emailLabel,
}: CtaButtonsProps) {
  const wa = hasWhatsApp() ? whatsappHref(whatsappMessage) : "";

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {wa ? (
        <Button
          asChild
          size="lg"
          className={`h-auto rounded-full px-5 py-3 text-sm hover:brightness-110 ${
            pulse ? "cta-pulse" : ""
          }`}
        >
          <a href={wa} target="_blank" rel="noopener noreferrer">
            {whatsappLabel}
          </a>
        </Button>
      ) : (
        <Button
          asChild
          size="lg"
          className={`h-auto rounded-full px-5 py-3 text-sm hover:brightness-110 ${
            pulse ? "cta-pulse" : ""
          }`}
        >
          <a href={emailHref()}>{emailLabel ?? site.email}</a>
        </Button>
      )}
      {hasCal() ? (
        <Button
          asChild
          variant="outline"
          size="lg"
          className="h-auto rounded-full border-ink/20 bg-surface px-5 py-3 text-sm text-ink hover:border-accent hover:bg-accent-soft hover:text-ink"
        >
          <a href={site.calUrl} target="_blank" rel="noopener noreferrer">
            {scheduleLabel}
          </a>
        </Button>
      ) : null}
    </div>
  );
}
