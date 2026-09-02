import { Button } from "@/components/ui/button";
import { site, whatsappHref } from "@/lib/site";

type CtaButtonsProps = {
  whatsappMessage?: string;
  className?: string;
  pulse?: boolean;
  whatsappLabel?: string;
  scheduleLabel?: string;
};

export function CtaButtons({
  whatsappMessage,
  className = "",
  pulse = false,
  whatsappLabel = "WhatsApp",
  scheduleLabel = "Agendar 15 min",
}: CtaButtonsProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Button
        asChild
        size="lg"
        className={`h-auto rounded-full px-5 py-3 text-sm hover:brightness-110 ${
          pulse ? "cta-pulse" : ""
        }`}
      >
        <a
          href={whatsappHref(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {whatsappLabel}
        </a>
      </Button>
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
    </div>
  );
}
