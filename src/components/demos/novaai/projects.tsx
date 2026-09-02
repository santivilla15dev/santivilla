import { Reveal } from "./reveal";
import { NovaSectionShell } from "./section-shell";
import { novaaiCopy } from "@/lib/demos/novaai";

export function NovaProjects() {
  const { projects } = novaaiCopy;

  return (
    <NovaSectionShell
      id="projects"
      eyebrow={projects.eyebrow}
      title={projects.title}
      lead={projects.lead}
    >
      <ul className="divide-y divide-white/15 border-y border-white/15">
        {projects.items.map((item, i) => (
          <Reveal key={item.number} delay={80 + i * 70}>
            <li className="grid gap-3 py-7 sm:grid-cols-[4rem_minmax(0,1fr)_8rem] sm:items-baseline sm:gap-8 md:grid-cols-[4rem_14rem_minmax(0,1fr)]">
              <span className="font-mono text-[11px] tracking-[0.15em] text-white/45">
                {item.number}
              </span>
              <div>
                <h3 className="text-lg font-medium text-white sm:text-xl">{item.name}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-white/45 sm:hidden">
                  {item.sector}
                </p>
              </div>
              <p className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-white/45 sm:block md:hidden">
                {item.sector}
              </p>
              <div className="sm:col-span-3 md:col-span-1 md:col-start-3">
                <p className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-white/45 md:mb-2 md:block">
                  {item.sector}
                </p>
                <p className="text-sm leading-relaxed text-white/70">{item.result}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ul>
    </NovaSectionShell>
  );
}
