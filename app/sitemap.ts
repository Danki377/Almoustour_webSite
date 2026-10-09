import type { MetadataRoute } from "next";

const BASE = "https://al-moustour-voyage.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/services/accompagnement-etudiant", "/services/visa-et-immigration", "/services/billetterie"].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "weekly",
    priority: path ? 0.8 : 1,
  }));
}
