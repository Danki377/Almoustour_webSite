"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { ActionState } from "@/lib/admin/action";
import { LEAD_CHANNELS, LEAD_STATUS, LEAD_STATUSES } from "@/lib/admin/labels";
import { normalizePhone } from "@/lib/phone";
import { audit } from "@/lib/server/audit";
import { requireUser } from "@/lib/server/auth";
import { ACTIVE_MEMBER, db } from "@/lib/server/db";
import { errorsOf } from "@/lib/server/validation";

const text = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `${max} caractères maximum.`)
    .optional()
    .transform((v) => v || null);

const leadFields = z.object({
  name: z.string().trim().min(2, "Nom requis.").max(80),
  phone: z.string().trim().min(1, "Téléphone requis."),
  email: z
    .string()
    .trim()
    .max(200)
    .optional()
    .transform((v) => v || null)
    .refine((v) => !v || z.email().safeParse(v).success, "Email invalide."),
  service: text(60),
  destinationId: text(60),
  channel: z.enum(LEAD_CHANNELS as [string, ...string[]]),
  assigneeId: text(40),
});

const amountField = z
  .string()
  .optional()
  .transform((v) => (v ? v.replace(/[\s.]/g, "") : ""))
  .refine((v) => v === "" || /^\d{1,12}$/.test(v), "Montant invalide (nombre entier en FCFA).")
  .transform((v) => (v === "" ? null : Number(v)));

async function assigneeExists(id: string | null) {
  return !id || Boolean(await db.user.findFirst({ where: { id, ...ACTIVE_MEMBER }, select: { id: true } }));
}

export async function createLead(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser("leads");
  const parsed = leadFields.extend({ message: text(2000) }).safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { message: "Vérifiez les champs en rouge.", errors: errorsOf(parsed.error) };

  const phone = normalizePhone(parsed.data.phone);
  if (!phone) return { message: "Vérifiez les champs en rouge.", errors: { phone: "Numéro invalide." } };
  if (!(await assigneeExists(parsed.data.assigneeId))) return { message: "Conseiller introuvable." };

  const lead = await db.lead.create({
    data: { ...parsed.data, channel: parsed.data.channel as never, phone, source: "admin" },
  });
  await audit(user.id, "lead.create", "Lead", lead.id, { name: lead.name });
  revalidatePath("/admin", "layout");
  redirect(`/admin/leads/${lead.id}`);
}

export async function updateLead(id: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser("leads");
  const parsed = leadFields
    .extend({ status: z.enum(LEAD_STATUSES as [string, ...string[]]), amount: amountField })
    .safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { message: "Vérifiez les champs en rouge.", errors: errorsOf(parsed.error) };

  const phone = normalizePhone(parsed.data.phone);
  if (!phone) return { message: "Vérifiez les champs en rouge.", errors: { phone: "Numéro invalide." } };
  if (!(await assigneeExists(parsed.data.assigneeId))) return { message: "Conseiller introuvable." };

  const current = await db.lead.findUnique({ where: { id } });
  if (!current) return { message: "Lead introuvable." };

  const status = parsed.data.status as keyof typeof LEAD_STATUS;
  const statusChanged = status !== current.status;
  await db.lead.update({
    where: { id },
    data: {
      ...parsed.data,
      phone,
      status,
      channel: parsed.data.channel as never,
      convertedAt: status === "CONVERTED" ? (current.convertedAt ?? new Date()) : null,
      ...(statusChanged
        ? {
            notes: {
              create: {
                authorId: user.id,
                body: `Statut : ${LEAD_STATUS[current.status].label} → ${LEAD_STATUS[status].label}`,
              },
            },
          }
        : {}),
    },
  });
  await audit(user.id, "lead.update", "Lead", id, statusChanged ? { from: current.status, to: status } : undefined);
  revalidatePath("/admin", "layout");
  return { ok: true, message: "Lead mis à jour." };
}

export async function addLeadNote(id: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser("leads");
  const body = z.string().trim().min(1, "Note vide.").max(2000).safeParse(formData.get("body"));
  if (!body.success) return { errors: { body: body.error.issues[0].message } };
  if (!(await db.lead.findUnique({ where: { id }, select: { id: true } }))) return { message: "Lead introuvable." };

  await db.leadNote.create({ data: { leadId: id, authorId: user.id, body: body.data } });
  // Touch the lead so it moves up in "recently updated"
  await db.lead.update({ where: { id }, data: { updatedAt: new Date() } });
  revalidatePath(`/admin/leads/${id}`);
  return { ok: true };
}

export async function deleteLead(id: string) {
  const user = await requireUser("admin");
  const lead = await db.lead.delete({ where: { id } }).catch(() => null);
  if (lead) await audit(user.id, "lead.delete", "Lead", id, { name: lead.name, phone: lead.phone });
  revalidatePath("/admin", "layout");
  redirect("/admin/leads");
}
