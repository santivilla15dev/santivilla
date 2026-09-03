import { Cormorant_Garamond, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";

export const gasthausDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-gasthaus-display",
  display: "swap",
});

export const gasthausBody = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-gasthaus-body",
  display: "swap",
});

export const gasthausMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-gasthaus-mono",
  display: "swap",
});
