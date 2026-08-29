"use client";

import { AuditAudioPlayer } from "@/components/audit-audio-player";
import type { SiteMessages } from "@/lib/i18n/messages/types";

type Props = {
  labels: SiteMessages["audit"];
  lang: "es" | "de";
  audioScript?: string;
};

export function AuditReportActions({ labels, lang, audioScript }: Props) {
  return (
    <div className="no-print mb-8 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white"
      >
        {labels.printPdf}
      </button>
      {audioScript ? (
        <AuditAudioPlayer
          script={audioScript}
          lang={lang}
          playLabel={labels.audioPlay}
          pauseLabel={labels.audioPause}
          stopLabel={labels.audioStop}
          unsupportedLabel={labels.audioUnsupported}
        />
      ) : null}
    </div>
  );
}
