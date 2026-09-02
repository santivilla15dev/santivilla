import { notFound } from "next/navigation";
import { Creator3dLanding } from "@/components/demos/3d-creator/landing";
import { getMessages } from "@/lib/i18n/get-messages";
import { isLocale, locales, type Locale } from "@/lib/i18n/locales";
import { pageMetadata } from "@/lib/i18n/metadata";
import { localizedPath } from "@/lib/i18n/paths";
import { site } from "@/lib/site";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return pageMetadata(raw, "meta", "/");
}

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const messages = getMessages(locale);

  const langHrefs = Object.fromEntries(
    locales.map((code) => [code, localizedPath(code, "/")]),
  ) as Record<Locale, string>;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: messages.meta.description,
    url: `https://${site.domain}`,
    email: site.email,
    areaServed: { "@type": "City", name: "Wien" },
    knowsLanguage: ["de", "en", "es"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Creator3dLanding locale={locale} langHrefs={langHrefs} />
    </>
  );
}
