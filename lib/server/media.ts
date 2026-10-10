import "server-only";
import { db } from "./db";

/** Where each image is displayed on the site: url → labels (an image in use is never deleted). */
export async function imageUsages(urls?: string[]) {
  const where = urls ? { image: { in: urls } } : {};
  const [destinations, services, testimonials] = await Promise.all([
    db.destination.findMany({ where, select: { image: true, city: true } }),
    db.service.findMany({ where, select: { image: true, title: true } }),
    db.testimonial.findMany({ where, select: { image: true, name: true } }),
  ]);
  const usages = new Map<string, string[]>();
  const add = (url: string, label: string) => usages.set(url, [...(usages.get(url) ?? []), label]);
  destinations.forEach((d) => add(d.image, `Offre ${d.city}`));
  services.forEach((s) => add(s.image, `Service ${s.title}`));
  testimonials.forEach((t) => add(t.image, `Témoignage ${t.name}`));
  return usages;
}
