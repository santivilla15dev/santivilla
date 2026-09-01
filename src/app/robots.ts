import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        // CRM, portal de cliente y API
        "/admin",
        "/portal",
        "/login",
        "/api",
        // Páginas compartidas por token/id (contenido por usuario, no indexable)
        "/de/concepto",
        "/en/concepto",
        "/es/concepto",
        "/de/brief/",
        "/en/brief/",
        "/es/brief/",
        "/de/auditoria/report",
        "/en/auditoria/report",
        "/es/auditoria/report",
      ],
    },
    sitemap: `https://${site.domain}/sitemap.xml`,
  };
}
