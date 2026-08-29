"use client";

import { useState } from "react";
import { BriefPreview } from "@/components/brief/brief-preview";
import { BriefRevisePanel } from "@/components/brief/brief-revise-panel";
import { briefSalesWhatsAppMessage } from "@/lib/brief/whatsapp-message";
import type { BriefPayload } from "@/lib/brief/schema";
import type { Locale } from "@/lib/i18n/locales";
import type { SiteMessages } from "@/lib/i18n/messages/types";
import { localizedPath } from "@/lib/i18n/paths";
import { absoluteUrl } from "@/lib/site";

type Labels = SiteMessages["briefAgent"];

export function BriefShareClient({
  briefId,
  locale,
  initialPayload,
  labels,
}: {
  briefId: string;
  locale: Locale;
  initialPayload: BriefPayload;
  labels: Labels;
}) {
  const [payload, setPayload] = useState(initialPayload);
  const sharePath = localizedPath(locale, `/brief/${briefId}`);
  const whatsappMessage = briefSalesWhatsAppMessage(
    labels.salesWhatsapp,
    absoluteUrl(sharePath),
  );

  return (
    <div className="overflow-hidden rounded-sm border border-line">
      <BriefPreview
        payload={payload}
        labels={{
          banner: labels.previewBanner,
          featuresTitle: labels.featuresTitle,
          contactTitle: labels.contactTitle,
          contactBody: labels.contactBody,
          whatsappLabel: labels.whatsappLabel,
          whatsappMessage,
        }}
      />
      <BriefRevisePanel
        briefId={briefId}
        locale={locale}
        labels={{
          reviseLabel: labels.reviseLabel,
          revisePlaceholder: labels.revisePlaceholder,
          reviseSubmit: labels.reviseSubmit,
          revising: labels.revising,
          reviseError: labels.reviseError,
          reviseHint: labels.reviseHint,
        }}
        onRevised={setPayload}
      />
    </div>
  );
}
