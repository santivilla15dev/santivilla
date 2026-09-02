import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { isLocale, LOCALE_COOKIE } from "@/lib/i18n/locales";
import { negotiateLocale } from "@/lib/i18n/negotiate";
import { localizedPath } from "@/lib/i18n/paths";

// La landing 3D es ahora la home del portfolio; esta ruta solo redirige
// al idioma adecuado (?lang > cookie > Accept-Language).
export default async function Creator3dDemoRedirect({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  if (lang && isLocale(lang)) redirect(localizedPath(lang, "/"));

  const fromCookie = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (fromCookie && isLocale(fromCookie)) redirect(localizedPath(fromCookie, "/"));

  redirect(
    localizedPath(negotiateLocale((await headers()).get("accept-language")), "/"),
  );
}
