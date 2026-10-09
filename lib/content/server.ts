import "server-only";
import { cache } from "react";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { db, isDbConfigured } from "@/lib/server/db";
import { DEFAULT_CONTENT } from "./defaults";
import { SERVICE_HREF, type Expense, type OpeningHours, type ServiceSlug, type SiteContent } from "./types";

const CONTENT_TAG = "site-content";

function asList<T>(value: unknown, keys: (keyof T)[]): T[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v) => v && typeof v === "object" && keys.every((k) => typeof v[k] === "string")) as T[];
}

const loadFromDb = unstable_cache(
  async (): Promise<SiteContent> => {
    const [settings, services, destinations, visaOffers, testimonials, faqs] = await Promise.all([
      db.siteSettings.findUnique({ where: { id: "site" } }),
      db.service.findMany({ orderBy: { order: "asc" } }),
      db.destination.findMany({ where: { active: true }, orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
      db.visaOffer.findMany({ where: { active: true }, orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
      db.testimonial.findMany({ where: { active: true }, orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
      db.faq.findMany({ where: { active: true }, orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
    ]);

    // Database not seeded yet: keep serving the built-in content
    if (!settings) return DEFAULT_CONTENT;

    return {
      settings: {
        whatsapp: settings.whatsapp,
        phone: settings.phone,
        phoneDisplay: settings.phoneDisplay,
        email: settings.email,
        address: settings.address,
        addressHint: settings.addressHint,
        facebook: settings.facebook,
        instagram: settings.instagram,
        mapsEmbed: settings.mapsEmbed,
        mapsLink: settings.mapsLink,
        since: settings.since,
        defaultMessage: settings.defaultMessage,
        hours: asList<OpeningHours>(settings.hours, ["day", "time"]),
      },
      services: services
        .filter((s) => s.slug in SERVICE_HREF)
        .map((s) => ({
          slug: s.slug as ServiceSlug,
          href: SERVICE_HREF[s.slug as ServiceSlug],
          title: s.title,
          image: s.image,
          waMsg: s.waMsg,
        })),
      destinations: destinations.map((d) => ({
        id: d.id,
        country: d.country,
        city: d.city,
        code: d.code,
        image: d.image,
        title: d.title,
        priceLabel: d.priceLabel,
        price: d.price,
        info: d.info,
        badge: d.badge,
        scholarship: d.scholarship,
        description: d.description,
        lon: d.lon,
        lat: d.lat,
        intro: d.intro,
        procedure: d.procedure,
        expenses: asList<Expense>(d.expenses, ["label", "value"]),
      })),
      visaOffers: visaOffers.map(({ id, country, code, service, price, delay }) => ({ id, country, code, service, price, delay })),
      testimonials: testimonials.map(({ id, name, program, country, code, stampLabel, image, text }) => ({
        id,
        name,
        program,
        country,
        code,
        stampLabel,
        image,
        text,
      })),
      faqs: faqs.map(({ id, question, answer }) => ({ id, question, answer })),
    };
  },
  ["site-content"],
  { tags: [CONTENT_TAG], revalidate: 600 }
);

/**
 * Everything the public site displays. Cached and invalidated by the back office;
 * falls back to the built-in content if the database is missing or unreachable.
 */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  if (!isDbConfigured) return DEFAULT_CONTENT;
  try {
    return await loadFromDb();
  } catch (error) {
    console.error("[content] database unreachable, serving default content", error);
    return DEFAULT_CONTENT;
  }
});

/** Call after any content change in the back office. */
export function revalidateContent() {
  revalidateTag(CONTENT_TAG);
  revalidatePath("/", "layout");
}
