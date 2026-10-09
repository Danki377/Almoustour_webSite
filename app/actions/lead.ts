"use server";

import { z } from "zod";
import { getSiteContent } from "@/lib/content/server";
import { normalizePhone } from "@/lib/phone";
import { getAttribution } from "@/lib/server/attribution";
import { db, isDbConfigured } from "@/lib/server/db";
import { rateLimit } from "@/lib/server/rate-limit";
import { ipHash } from "@/lib/server/security";
import { whatsappUrl } from "@/lib/site";

export type LeadFormState = {
  ok: boolean;
  /** wa.me URL the visitor is sent to after submitting */
  redirect?: string;
  error?: string;
  fieldErrors?: Partial<Record<"name" | "phone", string>>;
};

const optional = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => v || undefined);

const schema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom.").max(80, "Nom trop long."),
  phone: z.string().trim().min(1, "Indiquez votre numéro WhatsApp."),
  service: optional(60),
  destination: optional(60),
  message: optional(1000),
  /** Honeypot: invisible to people, filled by bots */
  website: z.string().optional(),
  source: optional(60),
});

const OPEN_STATUSES = ["NEW", "CONTACTED", "QUALIFIED"] as const;

const INVALID_PHONE = "Numéro invalide. Exemple : +223 70 00 00 00";

export async function submitLead(_prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  const rawPhone = String(formData.get("phone") ?? "");
  const phone = normalizePhone(rawPhone);
  if (!parsed.success || !phone) {
    // Report every problem at once (name and phone)
    const fields = parsed.success ? {} : z.flattenError(parsed.error).fieldErrors;
    return {
      ok: false,
      fieldErrors: { name: fields.name?.[0], phone: fields.phone?.[0] ?? (phone ? undefined : INVALID_PHONE) },
    };
  }
  const input = parsed.data;

  const { settings, services, destinations } = await getSiteContent();
  const service = services.find((s) => s.slug === input.service);
  const destination = destinations.find((d) => d.id === input.destination);

  const subject = [service?.title, destination?.country].filter(Boolean).join(" — ");
  const text = [
    `Bonjour Al-Moustour, je m'appelle ${input.name}.`,
    subject ? `Je suis intéressé(e) par : ${subject}.` : "Je souhaite des informations sur vos services.",
    input.message,
  ]
    .filter(Boolean)
    .join(" ");
  const redirect = whatsappUrl(settings.whatsapp, text);

  // Bots get the same answer but nothing is stored
  if (input.website) return { ok: true, redirect };
  if (!isDbConfigured) return { ok: true, redirect };

  try {
    const hash = ipHash();
    // Above the limit the visitor still reaches WhatsApp: only the storage is skipped
    if (!(await rateLimit(`lead:${hash}`, 6, 15 * 60))) return { ok: true, redirect };

    const attribution = getAttribution();
    const details = [subject, input.message].filter(Boolean).join(" · ") || "Demande d'informations";

    // Same person already in the pipeline: add the new request to their file instead of a duplicate
    const existing = await db.lead.findFirst({
      where: {
        phone,
        status: { in: [...OPEN_STATUSES] },
        createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      },
      orderBy: { createdAt: "desc" },
    });

    if (existing) {
      await db.lead.update({
        where: { id: existing.id },
        data: {
          notes: { create: { body: `Nouvelle demande depuis le site : ${details}` } },
          service: existing.service ?? service?.slug,
          destinationId: existing.destinationId ?? destination?.id,
        },
      });
    } else {
      await db.lead.create({
        data: {
          name: input.name,
          phone,
          service: service?.slug,
          destinationId: destination?.id,
          message: input.message,
          channel: "WEBSITE",
          source: input.source ?? "formulaire",
          page: attribution.page,
          utmSource: attribution.utmSource,
          utmMedium: attribution.utmMedium,
          utmCampaign: attribution.utmCampaign,
          referrer: attribution.referrer,
          visitorId: attribution.visitorId,
          ipHash: hash,
        },
      });
    }
  } catch (error) {
    // Never lose the visitor because of a storage problem
    console.error("[lead]", error);
  }

  return { ok: true, redirect };
}
