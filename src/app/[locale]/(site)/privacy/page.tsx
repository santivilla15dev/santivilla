import { isLocale } from "@/lib/i18n/locales";
import { notFound, permanentRedirect } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

/** Legacy EN slug — canonical is /en/privacy-policy. */
export default async function PrivacyRedirectPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw) || raw !== "en") notFound();
  permanentRedirect("/en/privacy-policy");
}
