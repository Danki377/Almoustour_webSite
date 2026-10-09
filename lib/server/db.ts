import "server-only";
import { createAdapter } from "@/lib/db-adapter";
import { PrismaClient } from "@/lib/generated/prisma/client";

export const isDbConfigured = Boolean(process.env.DATABASE_URL);

// Reuse one client across hot reloads in development
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter: createAdapter(process.env.DATABASE_URL ?? "") });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

/** Members who can still sign in (not deactivated / banned). */
export const ACTIVE_MEMBER = { OR: [{ banned: false }, { banned: null }] };
