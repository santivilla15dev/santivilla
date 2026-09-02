import { vsBody, vsHeading } from "./font";
import { VaultshieldHero } from "./hero";
import { VaultshieldNavbar } from "./navbar";
import {
  getVaultshieldContent,
  vaultshieldAssets,
  vaultshieldTheme,
} from "@/lib/demos/vaultshield";
import type { Locale } from "@/lib/i18n/locales";

export function VaultshieldLanding({
  locale,
  langHrefs,
}: {
  locale: Locale;
  langHrefs: Record<Locale, string>;
}) {
  const content = getVaultshieldContent(locale);

  return (
    <div
      // flex-1: el layout de demos es una columna flex, así el hero ocupa
      // exactamente el alto restante bajo el banner Konzept sin scroll sobrante.
      className={`${vsHeading.variable} ${vsBody.variable} relative flex w-full flex-1 flex-col font-[family-name:var(--font-vs-body)] [overflow-x:clip]`}
      style={
        {
          "--color-text": vaultshieldTheme.text,
          "--color-accent": vaultshieldTheme.accent,
          "--color-login-bg": vaultshieldTheme.loginBg,
          color: vaultshieldTheme.text,
          background: "#dedbd6",
        } as React.CSSProperties
      }
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={vaultshieldAssets.video}
        poster={vaultshieldAssets.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
      />

      <VaultshieldNavbar content={content} langHrefs={langHrefs} />
      <VaultshieldHero content={content} />

      <p className="relative mx-auto mt-auto w-full max-w-[1280px] px-5 pb-5 pt-16 text-xs opacity-60 sm:px-8">
        {content.conceptNote}
      </p>
    </div>
  );
}
