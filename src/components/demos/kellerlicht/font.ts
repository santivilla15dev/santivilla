import { Cormorant_Garamond, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";

export const kellerlichtDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-kellerlicht-display",
  display: "swap",
});

export const kellerlichtBody = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-kellerlicht-body",
  display: "swap",
});

export const kellerlichtMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-kellerlicht-mono",
  display: "swap",
});
