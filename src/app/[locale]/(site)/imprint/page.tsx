import { isLocale } from "@/lib/i18n/locales";
import { notFound, permanentRedirect } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

/** Legacy EN slug — keep for bookmarks; canonical is /en/impressum. */
export default async function ImprintRedirectPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw) || raw !== "en") notFound();
  permanentRedirect("/en/impressum");
}
