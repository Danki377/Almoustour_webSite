import "server-only";
import { db } from "./db";

/**
 * Fixed-window rate limit stored in Postgres (shared by every serverless instance).
 * One atomic upsert: a new window starts once the previous one has expired.
 * Returns true when the action is allowed.
 */
export async function rateLimit(key: string, limit: number, windowSeconds: number) {
  const rows = await db.$queryRaw<{ count: number }[]>`
    INSERT INTO "Throttle" ("key", "count", "expiresAt")
    VALUES (${key}, 1, NOW() + (${windowSeconds}::int * INTERVAL '1 second'))
    ON CONFLICT ("key") DO UPDATE SET
      "count"     = CASE WHEN "Throttle"."expiresAt" <= NOW() THEN 1 ELSE "Throttle"."count" + 1 END,
      "expiresAt" = CASE WHEN "Throttle"."expiresAt" <= NOW() THEN EXCLUDED."expiresAt" ELSE "Throttle"."expiresAt" END
    RETURNING "count"`;

  // Opportunistic cleanup of stale windows
  if (Math.random() < 0.02) {
    db.throttle.deleteMany({ where: { expiresAt: { lt: new Date() } } }).catch(() => {});
  }

  return Number(rows[0]?.count ?? 0) <= limit;
}

export async function resetRateLimit(key: string) {
  await db.throttle.deleteMany({ where: { key } });
}
