import { Reveal } from "./reveal";
import { NovaSectionShell } from "./section-shell";
import { novaaiCopy } from "@/lib/demos/novaai";

export function NovaBlog() {
  const { blog } = novaaiCopy;

  return (
    <NovaSectionShell
      id="blog"
      eyebrow={blog.eyebrow}
      title={blog.title}
      lead={blog.lead}
    >
      <ul className="grid gap-4 md:grid-cols-3">
        {blog.items.map((post, i) => (
          <Reveal key={post.title} delay={100 + i * 90}>
            <li className="flex h-full flex-col rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
              <time className="font-mono text-[11px] tracking-[0.12em] text-white/45">
                {post.date}
              </time>
              <h3 className="mt-4 text-lg font-medium leading-snug text-white">
                {post.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/65">
                {post.excerpt}
              </p>
            </li>
          </Reveal>
        ))}
      </ul>
    </NovaSectionShell>
  );
}
