import type { Metadata } from "next";
import { headers } from "next/headers";
import { Fraunces, Manrope } from "next/font/google";
import { defaultLocale, isLocale } from "@/lib/i18n/locales";
import { getMessages } from "@/lib/i18n/get-messages";
import { site } from "@/lib/site";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const m = getMessages(defaultLocale);
  return {
    title: {
      default: m.meta.title,
      template: `%s · ${site.name}`,
    },
    description: m.meta.description,
    metadataBase: new URL(`https://${site.domain}`),
    openGraph: {
      title: site.name,
      description: m.meta.description,
      url: `https://${site.domain}`,
      siteName: site.name,
      locale: m.meta.ogLocale,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${site.name} — ${m.meta.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const localeHeader = h.get("x-locale") ?? defaultLocale;
  const lang = isLocale(localeHeader) ? localeHeader : defaultLocale;

  return (
    <html
      lang={lang}
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
