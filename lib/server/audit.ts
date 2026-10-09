import "server-only";
import { db } from "./db";
import { ipHash } from "./security";
import type { Prisma } from "@/lib/generated/prisma/client";

/** Records who did what in the back office. Never throws: auditing must not break the action. */
export async function audit(
  userId: string | null,
  action: string,
  entity?: string,
  entityId?: string,
  details?: Prisma.InputJsonValue
) {
  try {
    await db.auditLog.create({ data: { userId, action, entity, entityId, details, ipHash: ipHash() } });
  } catch (e) {
    console.error("[audit]", e);
  }
}
