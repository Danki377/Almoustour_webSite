// Creates or resets a super admin directly in the Better Auth tables (CLI scripts only).
import { randomUUID } from "node:crypto";
import { hashPassword } from "better-auth/crypto";
import type { PrismaClient } from "../lib/generated/prisma/client";

export function assertStrongPassword(password: string) {
  if (password.length < 10 || password.length > 128 || !/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
    throw new Error("Mot de passe trop faible : 10 caractères minimum, avec lettres et chiffres.");
  }
}

/** Same storage as Better Auth: user row + "credential" account holding the hashed password. */
export async function upsertSuperadmin(prisma: PrismaClient, email: string, password: string, name: string) {
  assertStrongPassword(password);
  const hash = await hashPassword(password);
  const existing = await prisma.user.findUnique({ where: { email } });

  const user = existing
    ? await prisma.user.update({ where: { id: existing.id }, data: { role: "superadmin", banned: false, banReason: null, banExpires: null, mustChangePassword: false } })
    : await prisma.user.create({ data: { id: randomUUID(), email, name, role: "superadmin", emailVerified: true } });

  const account = await prisma.account.findFirst({ where: { userId: user.id, providerId: "credential" } });
  if (account) await prisma.account.update({ where: { id: account.id }, data: { password: hash } });
  else await prisma.account.create({ data: { id: randomUUID(), userId: user.id, accountId: user.id, providerId: "credential", password: hash } });

  // Any previous session of this account is closed
  await prisma.session.deleteMany({ where: { userId: user.id } });
  return user;
}
