import type { BriefPayload } from "@/lib/brief/schema";
import type { CSSProperties, ReactNode } from "react";
import { BriefContact } from "./brief-contact";
import { BriefFeatures } from "./brief-features";
import { BriefHero } from "./brief-hero";

type PreviewLabels = {
  banner: string;
  featuresTitle: string;
  contactTitle: string;
  contactBody: string;
  whatsappLabel: string;
  whatsappMessage: string;
};

export function BriefPreview({
  payload,
  labels,
  footer,
}: {
  payload: BriefPayload;
  labels: PreviewLabels;
  footer?: ReactNode;
}) {
  const style = {
    "--brief-primary": payload.colors.primary,
    "--brief-secondary": payload.colors.secondary,
    "--brief-bg": payload.colors.background,
    "--brief-ink": payload.colors.ink,
    backgroundColor: payload.colors.background,
    color: payload.colors.ink,
  } as CSSProperties;

  return (
    <div className="overflow-hidden rounded-sm shadow-[0_24px_80px_-40px_rgba(0,0,0,0.45)]" style={style}>
      <p
        className="border-b px-4 py-2 text-center text-xs tracking-wide"
        style={{
          borderColor: "color-mix(in srgb, var(--brief-ink) 12%, transparent)",
          color: "color-mix(in srgb, var(--brief-ink) 55%, transparent)",
          backgroundColor:
            "color-mix(in srgb, var(--brief-secondary) 12%, var(--brief-bg))",
        }}
      >
        {labels.banner}
      </p>
      <BriefHero payload={payload} />
      <BriefFeatures
        features={payload.features}
        sectionTitle={labels.featuresTitle}
        images={payload.images}
      />
      <BriefContact
        title={labels.contactTitle}
        body={labels.contactBody}
        whatsappLabel={labels.whatsappLabel}
        whatsappMessage={labels.whatsappMessage}
        ctaLabel={payload.ctaLabel}
      />
      {footer}
    </div>
  );
}
