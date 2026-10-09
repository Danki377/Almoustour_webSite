import "server-only";
import type { Prisma } from "@/lib/generated/prisma/client";
import { LEAD_CHANNELS, LEAD_STATUSES } from "@/lib/admin/labels";

export type LeadFilters = {
  statut?: string;
  service?: string;
  canal?: string;
  assigne?: string;
  q?: string;
  page?: string;
};

export const LEADS_PER_PAGE = 25;

/** Builds the Prisma filter shared by the leads list and the CSV export. */
export function leadWhere(f: LeadFilters, currentUserId: string): Prisma.LeadWhereInput {
  const where: Prisma.LeadWhereInput = {};
  if (f.statut && (LEAD_STATUSES as string[]).includes(f.statut)) where.status = f.statut as never;
  if (f.canal && (LEAD_CHANNELS as string[]).includes(f.canal)) where.channel = f.canal as never;
  if (f.service) where.service = f.service.slice(0, 60);
  if (f.assigne === "moi") where.assigneeId = currentUserId;
  else if (f.assigne === "aucun") where.assigneeId = null;
  else if (f.assigne) where.assigneeId = f.assigne.slice(0, 40);

  const q = f.q?.trim().slice(0, 100);
  if (q) {
    const digits = q.replace(/\D/g, "");
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      ...(digits.length >= 3 ? [{ phone: { contains: digits } }] : []),
    ];
  }
  return where;
}
