import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/go/"] },
    sitemap: "https://al-moustour-voyage.vercel.app/sitemap.xml",
  };
}
