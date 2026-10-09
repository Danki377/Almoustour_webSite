/**
 * Creates a super admin, or resets the password of an existing account (and reactivates it).
 * Emergency access when nobody can sign in anymore.
 *
 *   pnpm admin:create email@exemple.com "MotDePasseSolide2026" "Nom Prénom"
 */
import { prisma } from "../prisma/client";
import { upsertSuperadmin } from "../prisma/superadmin";

async function main() {
  const [emailArg, password, name = "Super admin"] = process.argv.slice(2);
  const email = emailArg?.trim().toLowerCase();
  if (!email || !password) {
    console.error('Usage : pnpm admin:create <email> "<mot de passe>" "[nom]"');
    process.exit(1);
  }
  const user = await upsertSuperadmin(prisma, email, password, name);
  await prisma.auditLog.create({ data: { userId: user.id, action: "user.cli_superadmin", entity: "User", entityId: user.id } });
  console.log(`✓ Super admin prêt : ${email}`);
}

main()
  .catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
