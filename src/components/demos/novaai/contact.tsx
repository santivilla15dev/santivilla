import { Reveal } from "./reveal";
import { NovaSectionShell } from "./section-shell";
import { novaaiCopy } from "@/lib/demos/novaai";
import { ChevronRight } from "lucide-react";

export function NovaContact() {
  const { contact } = novaaiCopy;

  return (
    <NovaSectionShell
      id="contact"
      eyebrow={contact.eyebrow}
      title={contact.title}
      lead={contact.lead}
    >
      <Reveal delay={160}>
        <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md sm:p-10">
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:hello@santivilla.com?subject=NovaAI%20concept%20%E2%80%94%2015-min%20call"
              className="inline-flex items-center gap-1 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors duration-300 hover:bg-white/85"
            >
              {contact.primary}
              <ChevronRight size={14} aria-hidden />
            </a>
            <a
              href="mailto:hello@santivilla.com?subject=NovaAI%20concept%20%E2%80%94%20consultation"
              className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm transition-colors duration-300 hover:bg-white/20"
            >
              {contact.secondary}
            </a>
          </div>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/55">{contact.note}</p>
        </div>
      </Reveal>
    </NovaSectionShell>
  );
}
