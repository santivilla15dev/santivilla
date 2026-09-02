import { Reveal } from "./reveal";
import { NovaSectionShell } from "./section-shell";
import { novaaiCopy } from "@/lib/demos/novaai";

export function NovaServices() {
  const { offerings } = novaaiCopy;

  return (
    <NovaSectionShell
      id="services"
      eyebrow={offerings.eyebrow}
      title={offerings.title}
      lead={offerings.lead}
    >
      <ul className="divide-y divide-white/15 border-y border-white/15">
        {offerings.items.map((item, i) => (
          <Reveal key={item.index} delay={120 + i * 100}>
            <li className="grid gap-6 py-10 md:grid-cols-[5rem_1fr_1.2fr] md:gap-10">
              <span className="font-mono text-[11px] tracking-[0.15em] text-white/45">
                {item.index}
              </span>
              <div>
                <h3 className="text-xl font-medium text-white sm:text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-[15px]">
                  {item.lead}
                </p>
              </div>
              <ul className="space-y-3">
                {item.bullets.map((b) => (
                  <li
                    key={b}
                    className="border-l border-white/20 pl-4 text-sm leading-relaxed text-white/65"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          </Reveal>
        ))}
      </ul>
    </NovaSectionShell>
  );
}
