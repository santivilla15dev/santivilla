import { Reveal } from "./reveal";
import { NovaSectionShell } from "./section-shell";
import { novaaiCopy } from "@/lib/demos/novaai";

export function NovaProcess() {
  const { process } = novaaiCopy;

  return (
    <NovaSectionShell
      id="process"
      eyebrow={process.eyebrow}
      title={process.title}
      lead={process.lead}
    >
      <ol className="grid gap-4 sm:grid-cols-2">
        {process.steps.map((step, i) => (
          <Reveal key={step.number} delay={100 + i * 90}>
            <li className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md sm:p-8">
              <span className="font-mono text-[11px] tracking-[0.15em] text-white/45">
                {step.number}
              </span>
              <h3 className="mt-4 text-xl font-medium text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{step.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </NovaSectionShell>
  );
}
