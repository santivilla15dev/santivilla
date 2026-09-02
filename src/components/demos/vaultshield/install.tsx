import { FadeIn } from "@/components/demos/3d-creator/fade-in";
import { VsIllustration } from "./illustration";
import { VsSection } from "./section";
import { vaultshieldAssets, type VaultshieldContent } from "@/lib/demos/vaultshield";

export function VsInstall({ content }: { content: VaultshieldContent }) {
  const { install } = content;

  return (
    <VsSection
      id="install"
      eyebrow={install.eyebrow}
      title={install.title}
      lead={install.lead}
      tinted
    >
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-50">
            {install.platformsLabel}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {install.platforms.map((p) => (
              <li
                key={p}
                className="rounded-full border border-[#192837]/10 bg-white px-3.5 py-1.5 text-sm"
              >
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] opacity-50">
            {install.browsersLabel}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {install.browsers.map((p) => (
              <li
                key={p}
                className="rounded-full bg-[#192837] px-3.5 py-1.5 text-sm text-white"
              >
                {p}
              </li>
            ))}
          </ul>
        </FadeIn>
        <FadeIn delay={0.08}>
          <VsIllustration src={vaultshieldAssets.devices} alt={install.imageAlt} kind="devices" />
        </FadeIn>
      </div>
    </VsSection>
  );
}
