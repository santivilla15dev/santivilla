import { vsBody, vsHeading } from "./font";
import { VsFaq } from "./faq";
import { VsFeatures } from "./features";
import { VsFinalCta } from "./final-cta";
import { VsFooter } from "./footer";
import { VaultshieldHero } from "./hero";
import { VsHowItWorks } from "./how-it-works";
import { VsInstall } from "./install";
import { VaultshieldNavbar } from "./navbar";
import { VsNews } from "./news";
import { VsPlans } from "./plans";
import { VsSecurity } from "./security";
import { VsStrengthChecker } from "./strength-checker";
import { VsTestimonials } from "./testimonials";
import { VsTrustBar } from "./trust-bar";
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
      className={`${vsHeading.variable} ${vsBody.variable} w-full font-[family-name:var(--font-vs-body)] [overflow-x:clip]`}
      style={
        {
          "--color-text": vaultshieldTheme.text,
          "--color-accent": vaultshieldTheme.accent,
          "--color-login-bg": vaultshieldTheme.loginBg,
          color: vaultshieldTheme.text,
          background: "#FFFFFF",
        } as React.CSSProperties
      }
    >
      <section className="relative flex min-h-[calc(100svh-3.25rem)] flex-col [overflow-x:clip]">
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
        <div className="mt-auto" />
      </section>

      <VsTrustBar content={content} />
      <VsFeatures content={content} />
      <VsHowItWorks content={content} />
      <VsStrengthChecker content={content} />
      <VsSecurity content={content} />
      <VsPlans content={content} />
      <VsTestimonials content={content} />
      <VsInstall content={content} />
      <VsNews content={content} />
      <VsFaq content={content} />
      <VsFinalCta content={content} />
      <VsFooter content={content} />
    </div>
  );
}
