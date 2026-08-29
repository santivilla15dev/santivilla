import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { negotiateLocale } from "@/lib/i18n/negotiate";
import {
  isLocale,
  LOCALE_COOKIE,
  defaultLocale,
  type Locale,
} from "@/lib/i18n/locales";
import { stripLocalePrefix } from "@/lib/i18n/paths";
import { updateSession } from "@/lib/supabase/middleware";

const LOCALE_HEADER = "x-locale";

const PROTECTED_PREFIXES = ["/admin", "/portal"];

function shouldSkipLocale(pathname: string): boolean {
  if (pathname.startsWith("/api")) return true;
  if (pathname.startsWith("/demos")) return true;
  if (pathname.startsWith("/k")) return true;
  if (pathname.startsWith("/go")) return true;
  if (pathname.startsWith("/admin")) return true;
  if (pathname.startsWith("/portal")) return true;
  if (pathname.startsWith("/login")) return true;
  if (pathname.startsWith("/_next")) return true;
  if (pathname.startsWith("/favicon")) return true;
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) return true;
  return false;
}

function isProtected(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
}

function resolveLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const accept = request.headers.get("accept-language");
  const negotiated = negotiateLocale(accept);
  if (negotiated === "es") return defaultLocale;
  return negotiated;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasSupabase =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (hasSupabase && (isProtected(pathname) || pathname === "/login")) {
    const { supabaseResponse, user } = await updateSession(request);

    if (isProtected(pathname) && !user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (pathname === "/login" && user) {
      const next = request.nextUrl.searchParams.get("next") || "/admin";
      const dest = request.nextUrl.clone();
      dest.pathname = next.startsWith("/") ? next : "/admin";
      dest.search = "";
      return NextResponse.redirect(dest);
    }

    supabaseResponse.headers.set(LOCALE_HEADER, defaultLocale);
    return supabaseResponse;
  }

  if (shouldSkipLocale(pathname)) {
    const res = NextResponse.next();
    res.headers.set(LOCALE_HEADER, defaultLocale);
    return res;
  }

  const { locale: pathLocale, pathname: barePath } = stripLocalePrefix(pathname);

  if (pathLocale) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(LOCALE_HEADER, pathLocale);
    const res = NextResponse.next({
      request: { headers: requestHeaders },
    });
    res.cookies.set(LOCALE_COOKIE, pathLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return res;
  }

  const locale = resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = barePath === "/" ? `/${locale}` : `/${locale}${barePath}`;

  const res = NextResponse.redirect(url);
  res.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
