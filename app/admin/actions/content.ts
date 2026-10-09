"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { ActionState } from "@/lib/admin/action";
import { revalidateContent } from "@/lib/content/server";
import { audit } from "@/lib/server/audit";
import { requireUser } from "@/lib/server/auth";
import { db } from "@/lib/server/db";
import { errorsOf, lines, pairs } from "@/lib/server/validation";

// ─── Field helpers ──────────────────────────────────────────────────────────

const str = (max: number, label = "Champ requis.") => z.string().trim().min(1, label).max(max, `${max} caractères maximum.`);
const checkbox = z
  .string()
  .optional()
  .transform((v) => v === "on");
const order = z.coerce.number().int().min(0).max(999).catch(0);
const image = z
  .string()
  .trim()
  .regex(/^(\/[\w\-./]+\.(jpe?g|png|webp|avif)|https:\/\/[^\s"'<>]+)$/i, "Chemin (/images/xxx.jpg) ou URL https d'une image.");
const airportCode = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-Z·.]{2,5}$/, "2 à 5 lettres (ex : CDG).");
const coordinate = (min: number, max: number) =>
  z
    .string()
    .trim()
    .transform((v) => Number(v.replace(",", ".")))
    .refine((v) => Number.isFinite(v) && v >= min && v <= max, `Valeur entre ${min} et ${max}.`);

const INVALID = "Vérifiez les champs en rouge.";

function done(message = "Modifications enregistrées et publiées sur le site.") {
  revalidateContent();
  return { ok: true, message } satisfies ActionState;
}

// ─── Study destinations ─────────────────────────────────────────────────────

const destinationSchema = z.object({
  country: str(60),
  city: str(80),
  code: airportCode,
  image,
  title: str(120),
  priceLabel: str(40),
  price: str(40),
  info: str(120),
  badge: str(40),
  description: str(400),
  intro: str(800),
  procedure: z
    .string()
    .transform(lines)
    .refine((l) => l.length > 0, "Au moins une étape.")
    .refine((l) => l.length <= 15 && l.every((s) => s.length <= 300), "15 étapes de 300 caractères maximum."),
  expenses: z
    .string()
    .transform((v) => pairs(v))
    .refine((l) => l.length <= 15 && l.every((p) => p.label && p.value), "Une ligne par frais, au format « Libellé : montant »."),
  lon: coordinate(-180, 180),
  lat: coordinate(-90, 90),
  scholarship: checkbox,
  active: checkbox,
  order,
});

export async function saveDestination(id: string | null, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser("content");
  const raw = Object.fromEntries(formData);
  const parsed = destinationSchema.safeParse(raw);
  if (!parsed.success) return { message: INVALID, errors: errorsOf(parsed.error) };

  if (!id) {
    const newId = z
      .string()
      .trim()
      .toLowerCase()
      .regex(/^[a-z0-9-]{2,40}$/, "Lettres minuscules, chiffres et tirets (ex : allemagne).")
      .safeParse(raw.id);
    if (!newId.success) return { message: INVALID, errors: { id: newId.error.issues[0].message } };
    if (await db.destination.findUnique({ where: { id: newId.data } })) return { message: INVALID, errors: { id: "Cet identifiant existe déjà." } };
    await db.destination.create({ data: { id: newId.data, ...parsed.data } });
    await audit(user.id, "destination.create", "Destination", newId.data, { country: parsed.data.country });
    revalidateContent();
    redirect(`/admin/destinations/${newId.data}?cree=1`);
  }

  await db.destination.update({ where: { id }, data: parsed.data });
  await audit(user.id, "destination.update", "Destination", id, { country: parsed.data.country });
  return done();
}

export async function deleteDestination(id: string) {
  const user = await requireUser("content");
  const d = await db.destination.delete({ where: { id } }).catch(() => null);
  if (d) await audit(user.id, "destination.delete", "Destination", id, { country: d.country });
  revalidateContent();
  redirect("/admin/destinations");
}

// ─── Simple lists: visa offers, testimonials, FAQ ───────────────────────────

const visaSchema = z.object({
  country: str(60),
  code: z
    .string()
    .trim()
    .max(5)
    .transform((v) => v.toUpperCase() || "···"),
  service: str(80),
  price: str(40),
  delay: str(40),
  active: checkbox,
  order,
});

const testimonialSchema = z.object({
  name: str(80),
  program: str(80),
  country: str(60),
  code: airportCode,
  stampLabel: str(20),
  image,
  text: str(600),
  active: checkbox,
  order,
});

const faqSchema = z.object({
  question: str(200),
  answer: str(1200),
  active: checkbox,
  order,
});

const LISTS = {
  visa: { schema: visaSchema, model: () => db.visaOffer, path: "/admin/visas", entity: "VisaOffer" },
  temoignage: { schema: testimonialSchema, model: () => db.testimonial, path: "/admin/temoignages", entity: "Testimonial" },
  faq: { schema: faqSchema, model: () => db.faq, path: "/admin/faq", entity: "Faq" },
} as const;

export type ListKind = keyof typeof LISTS;

type AnyDelegate = {
  create(args: { data: object }): Promise<{ id: string }>;
  update(args: { where: { id: string }; data: object }): Promise<{ id: string }>;
  delete(args: { where: { id: string } }): Promise<{ id: string }>;
};

export async function saveListItem(kind: ListKind, id: string | null, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser("content");
  const cfg = LISTS[kind];
  const parsed = cfg.schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { message: INVALID, errors: errorsOf(parsed.error) };
  const model = cfg.model() as unknown as AnyDelegate;

  if (!id) {
    const item = await model.create({ data: parsed.data });
    await audit(user.id, `${kind}.create`, cfg.entity, item.id);
    revalidateContent();
    redirect(cfg.path);
  }
  await model.update({ where: { id }, data: parsed.data });
  await audit(user.id, `${kind}.update`, cfg.entity, id);
  return done();
}

export async function deleteListItem(kind: ListKind, id: string) {
  const user = await requireUser("content");
  const cfg = LISTS[kind];
  const model = cfg.model() as unknown as AnyDelegate;
  const removed = await model.delete({ where: { id } }).catch(() => null);
  if (removed) await audit(user.id, `${kind}.delete`, cfg.entity, id);
  revalidateContent();
  redirect(cfg.path);
}

/** Show / hide an item on the site without deleting it. */
export async function toggleActive(kind: ListKind | "destination", id: string) {
  const user = await requireUser("content");
  const model = (
    kind === "destination" ? db.destination : kind === "visa" ? db.visaOffer : kind === "temoignage" ? db.testimonial : db.faq
  ) as unknown as {
    findUnique(a: { where: { id: string } }): Promise<{ active: boolean } | null>;
    update(a: { where: { id: string }; data: { active: boolean } }): Promise<unknown>;
  };
  const item = await model.findUnique({ where: { id } });
  if (!item) return;
  await model.update({ where: { id }, data: { active: !item.active } });
  await audit(user.id, `${kind}.${item.active ? "hide" : "show"}`, kind, id);
  revalidateContent();
  revalidatePath("/admin", "layout");
}

// ─── Services ───────────────────────────────────────────────────────────────

const serviceSchema = z.object({ title: str(60), image, waMsg: str(300) });

export async function saveService(slug: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser("content");
  const parsed = serviceSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { message: INVALID, errors: errorsOf(parsed.error) };
  const updated = await db.service.update({ where: { slug }, data: parsed.data }).catch(() => null);
  if (!updated) return { message: "Service introuvable." };
  await audit(user.id, "service.update", "Service", slug);
  return done();
}

// ─── Site settings (super admin) ────────────────────────────────────────────

const https = z
  .string()
  .trim()
  .url("URL invalide.")
  .refine((v) => v.startsWith("https://"), "L'adresse doit commencer par https://");

const settingsSchema = z.object({
  whatsapp: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => v.length >= 8 && v.length <= 15, "Numéro au format international, ex : 22363711111."),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s]{8,20}$/, "Numéro invalide.")
    .transform((v) => v.replace(/\s/g, "")),
  phoneDisplay: str(30),
  email: z.string().trim().email("Email invalide."),
  address: str(150),
  addressHint: z.string().trim().max(150),
  facebook: https,
  instagram: https,
  mapsEmbed: https.refine((v) => v.startsWith("https://www.google.com/maps/embed"), "Lien « Intégrer une carte » de Google Maps."),
  mapsLink: https,
  since: z.coerce.number().int().min(1950).max(new Date().getFullYear()),
  defaultMessage: str(300),
  hours: z
    .string()
    .transform((v) => pairs(v, ["day", "time"]) as { day: string; time: string }[])
    .refine((l) => l.length > 0 && l.length <= 10 && l.every((h) => h.day && h.time), "Une ligne par jour, au format « Jour : horaires »."),
});

export async function saveSettings(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser("admin");
  const parsed = settingsSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { message: INVALID, errors: errorsOf(parsed.error) };
  await db.siteSettings.upsert({ where: { id: "site" }, create: { id: "site", ...parsed.data }, update: parsed.data });
  await audit(user.id, "settings.update", "SiteSettings", "site");
  return done();
}
