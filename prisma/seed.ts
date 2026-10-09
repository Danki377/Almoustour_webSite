/**
 * Fills an empty database with the current site content and creates the first super admin.
 * Safe to run again: existing rows are never overwritten (edits made in /admin are kept).
 *
 *   pnpm db:seed
 */
import { DEFAULT_CONTENT } from "../lib/content/defaults";
import { prisma } from "./client";
import { upsertSuperadmin } from "./superadmin";

async function main() {
  const { settings, services, destinations, visaOffers, testimonials, faqs } = DEFAULT_CONTENT;

  await prisma.siteSettings.upsert({ where: { id: "site" }, create: { id: "site", ...settings }, update: {} });

  for (const [order, s] of services.entries()) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      create: { slug: s.slug, title: s.title, image: s.image, waMsg: s.waMsg, order },
      update: {},
    });
  }

  for (const [order, d] of destinations.entries()) {
    await prisma.destination.upsert({ where: { id: d.id }, create: { ...d, order }, update: {} });
  }

  // Lists without natural keys: only filled when empty
  if ((await prisma.visaOffer.count()) === 0) {
    await prisma.visaOffer.createMany({ data: visaOffers.map(({ id: _id, ...o }, order) => ({ ...o, order })) });
  }
  if ((await prisma.testimonial.count()) === 0) {
    await prisma.testimonial.createMany({ data: testimonials.map(({ id: _id, ...t }, order) => ({ ...t, order })) });
  }
  if ((await prisma.faq.count()) === 0) {
    await prisma.faq.createMany({ data: faqs.map(({ id: _id, ...f }, order) => ({ ...f, order })) });
  }

  // First super admin
  const email = process.env.SUPERADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.SUPERADMIN_PASSWORD;
  if ((await prisma.user.count({ where: { role: "superadmin" } })) > 0) {
    console.log("✓ Super admin déjà présent");
  } else if (email && password) {
    await upsertSuperadmin(prisma, email, password, process.env.SUPERADMIN_NAME ?? "Super admin");
    console.log(`✓ Super admin créé : ${email} (retirez SUPERADMIN_PASSWORD du .env maintenant)`);
  } else {
    console.warn("! Aucun super admin : définissez SUPERADMIN_EMAIL et SUPERADMIN_PASSWORD puis relancez pnpm db:seed");
  }

  console.log("✓ Contenu du site initialisé");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
