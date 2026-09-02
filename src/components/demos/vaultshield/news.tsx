import { FadeIn } from "@/components/demos/3d-creator/fade-in";
import { VsSection } from "./section";
import type { VaultshieldContent } from "@/lib/demos/vaultshield";

export function VsNews({ content }: { content: VaultshieldContent }) {
  const { news } = content;

  return (
    <VsSection id="news" eyebrow={news.eyebrow} title={news.title} lead={news.lead}>
      <ol className="divide-y divide-[#192837]/10 border-y border-[#192837]/10">
        {news.items.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.05} as="li">
            <article className="grid gap-2 py-7 md:grid-cols-[140px_1fr] md:gap-10">
              <time className="text-sm opacity-50">{item.date}</time>
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 max-w-[62ch] text-sm leading-relaxed opacity-70">{item.body}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </ol>
    </VsSection>
  );
}
