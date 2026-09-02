import { Inter, Inter_Tight } from "next/font/google";

// Sustituye a "Helvetica Now Display Bold" (fuente de pago servida desde un
// host sin licencia en la spec original). Inter Tight 800 tiene proporciones
// muy parecidas y se autoaloja vía next/font.
export const vsHeading = Inter_Tight({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-vs-heading",
  display: "swap",
});

export const vsBody = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-vs-body",
  display: "swap",
});
