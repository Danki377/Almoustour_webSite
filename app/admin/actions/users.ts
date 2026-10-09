"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { APIError } from "better-auth/api";
import { z } from "zod";
import type { ActionState } from "@/lib/admin/action";
import { APP_ROLES } from "@/lib/auth-permissions";
import { audit } from "@/lib/server/audit";
import { auth, requireUser } from "@/lib/server/auth";
import { db } from "@/lib/server/db";
import { errorsOf } from "@/lib/server/validation";

const password = z
  .string()
  .min(10, "10 caractères minimum.")
  .max(128)
  .refine((v) => /[a-zA-Z]/.test(v) && /\d/.test(v), "Au moins une lettre et un chiffre.");

const role = z.enum(APP_ROLES as [string, ...string[]]);
const INVALID = "Vérifiez les champs en rouge.";

/** Better Auth refusals → readable message (never leak internals). */
function failure(error: unknown, fallback = "L'opération a échoué."): ActionState {
  if (error instanceof APIError) {
    if (error.body?.code === "USER_ALREADY_EXISTS" || error.body?.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
      return { message: INVALID, errors: { email: "Cet email a déjà un compte." } };
    }
    if (error.status === "FORBIDDEN" || error.status === "UNAUTHORIZED") return { message: "Action non autorisée pour votre rôle." };
    if (error.body?.code === "INVALID_PASSWORD") return { message: INVALID, errors: { current: "Mot de passe actuel incorrect." } };
    if (error.body?.code === "PASSWORD_TOO_SHORT" || error.body?.code === "PASSWORD_TOO_LONG") {
      return { message: INVALID, errors: { password: "10 à 128 caractères." } };
    }
  } else {
    console.error("[users]", error);
  }
  return { message: fallback };
}

async function otherActiveSuperadmins(exceptId: string) {
  return db.user.count({ where: { role: "superadmin", NOT: [{ id: exceptId }, { banned: true }] } });
}

// ─── Team members (super admin) ─────────────────────────────────────────────

export async function createMember(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireUser("admin");
  const parsed = z
    .object({
      name: z.string().trim().min(2, "Nom requis.").max(80),
      email: z.string().trim().toLowerCase().email("Email invalide.").max(200),
      role,
      password,
    })
    .safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { message: INVALID, errors: errorsOf(parsed.error) };

  try {
    const { user } = await auth.api.createUser({
      body: { ...parsed.data, role: parsed.data.role as "member" },
      headers: headers(),
    });
    await audit(admin.id, "user.create", "User", user.id, { email: user.email, role: parsed.data.role });
  } catch (error) {
    return failure(error, "Impossible de créer ce membre.");
  }
  revalidatePath("/admin/utilisateurs");
  redirect("/admin/utilisateurs?ajoute=1");
}

export async function updateMember(id: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireUser("admin");
  const parsed = z
    .object({
      name: z.string().trim().min(2, "Nom requis.").max(80),
      role,
      active: z
        .string()
        .optional()
        .transform((v) => v === "on"),
    })
    .safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { message: INVALID, errors: errorsOf(parsed.error) };

  const user = await db.user.findUnique({ where: { id } });
  if (!user) return { message: "Membre introuvable." };
  const { name, role: newRole, active } = parsed.data;
  const wasActive = !user.banned;

  if (id === admin.id && (newRole !== "superadmin" || !active)) {
    return { message: "Vous ne pouvez pas retirer vos propres droits ni désactiver votre compte." };
  }
  if (user.role === "superadmin" && (newRole !== "superadmin" || !active) && (await otherActiveSuperadmins(id)) === 0) {
    return { message: "Il doit rester au moins un super admin actif." };
  }

  try {
    const h = headers();
    if (name !== user.name) await auth.api.adminUpdateUser({ body: { userId: id, data: { name } }, headers: h });
    if (newRole !== user.role) await auth.api.setRole({ body: { userId: id, role: newRole as "member" }, headers: h });
    // Deactivating = Better Auth ban: sign-in refused and every session revoked at once
    if (wasActive && !active) await auth.api.banUser({ body: { userId: id, banReason: `Désactivé par ${admin.name}` }, headers: h });
    if (!wasActive && active) await auth.api.unbanUser({ body: { userId: id }, headers: h });
  } catch (error) {
    return failure(error);
  }

  await audit(admin.id, "user.update", "User", id, { role: newRole, active });
  revalidatePath("/admin/utilisateurs");
  return { ok: true, message: "Membre mis à jour." };
}

export async function resetMemberPassword(id: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireUser("admin");
  const parsed = password.safeParse(formData.get("password"));
  if (!parsed.success) return { errors: { password: parsed.error.issues[0].message } };

  try {
    const h = headers();
    await auth.api.setUserPassword({ body: { userId: id, newPassword: parsed.data }, headers: h });
    await auth.api.revokeUserSessions({ body: { userId: id }, headers: h });
  } catch (error) {
    return failure(error);
  }
  await audit(admin.id, "user.reset_password", "User", id);
  return { ok: true, message: "Mot de passe réinitialisé et sessions fermées. Communiquez-le par un canal sûr." };
}

export async function removeMember(id: string) {
  const admin = await requireUser("admin");
  const user = await db.user.findUnique({ where: { id } });
  if (!user || id === admin.id) redirect("/admin/utilisateurs");
  if (user.role === "superadmin" && (await otherActiveSuperadmins(id)) === 0) redirect("/admin/utilisateurs");

  // Leads stay in the pipeline (unassigned); notes and audit entries keep their content
  await auth.api.removeUser({ body: { userId: id }, headers: headers() });
  await audit(admin.id, "user.delete", "User", id, { email: user.email });
  revalidatePath("/admin", "layout");
  redirect("/admin/utilisateurs");
}

// ─── My account ─────────────────────────────────────────────────────────────

export async function changeOwnPassword(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const me = await requireUser("leads");
  const parsed = z
    .object({ current: z.string().min(1, "Requis."), password, confirm: z.string() })
    .refine((v) => v.password === v.confirm, { path: ["confirm"], message: "Les deux mots de passe ne correspondent pas." })
    .safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { message: INVALID, errors: errorsOf(parsed.error) };

  try {
    await auth.api.changePassword({
      body: { currentPassword: parsed.data.current, newPassword: parsed.data.password, revokeOtherSessions: true },
      headers: headers(),
    });
  } catch (error) {
    return failure(error);
  }
  await audit(me.id, "user.change_password", "User", me.id);
  // Better Auth issued a new session cookie: reload the page with it
  redirect("/admin/compte?mdp=1");
}

export async function revokeOtherSessions() {
  const me = await requireUser("leads");
  await auth.api.revokeOtherSessions({ headers: headers() });
  await audit(me.id, "auth.revoke_sessions", "User", me.id);
  revalidatePath("/admin/compte");
}
