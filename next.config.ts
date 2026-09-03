import type { NextConfig } from "next";

// CSP en modo report-only: no bloquea nada, solo reporta violaciones a
// /api/csp-report (logs de Vercel). Cuando los reportes estén limpios se
// puede promover a Content-Security-Policy.
// Notas: script-src/style-src necesitan 'unsafe-inline' (hidratación de Next
// y estilos inline); los conceptos generados se renderizan en iframes srcDoc
// que heredan esta CSP — de ahí fonts.googleapis/gstatic, unsplash y places.
const cspReportOnly = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://images.unsplash.com https://places.googleapis.com https://shrug-person-78902957.figma.site https://motionsites.ai https://images.higgs.ai https://d8j0ntlcm91z4.cloudfront.net",
  "media-src 'self' https://d8j0ntlcm91z4.cloudfront.net",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://d8j0ntlcm91z4.cloudfront.net",
  "frame-src 'self' https://maps.google.com https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "report-uri /api/csp-report",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "places.googleapis.com",
      },
    ],
  },
  async headers() {
    const securityBase = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      {
        key: "Content-Security-Policy-Report-Only",
        value: cspReportOnly,
      },
    ];

    return [
      // Previews en vivo en la home: permitir iframe same-origin solo en demos.
      {
        source: "/demos/:path*",
        headers: [
          ...securityBase,
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        source: "/((?!demos/).*)",
        headers: [
          ...securityBase,
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
