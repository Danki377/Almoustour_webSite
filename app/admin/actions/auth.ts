"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { APIError } from "better-auth/api";
import { z } from "zod";
import type { ActionState } from "@/lib/admin/action";
import { audit } from "@/lib/server/audit";
import { auth, getSessionUser } from "@/lib/server/auth";
import { isDbConfigured } from "@/lib/server/db";
import { rateLimit, resetRateLimit } from "@/lib/server/rate-limit";
import { ipHash, safeAdminPath, sha256 } from "@/lib/server/security";

const schema = z.object({
  email: z.string().trim().toLowerCase().max(200),
  password: z.string().max(200),
  next: z.string().optional(),
});

const WRONG = "Email ou mot de passe incorrect.";

export async function login(_prev: ActionState, formData: FormData): Promise<ActionState> {
  if (!isDbConfigured) return { message: "La base de données n'est pas encore configurée (DATABASE_URL)." };

  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success || !parsed.data.email || !parsed.data.password) return { message: WRONG };
  const { email, password, next } = parsed.data;

  // Brute-force protection on top of Better Auth's own limits: per address and per IP
  const emailKey = `login:email:${sha256(email)}`;
  const [ipOk, emailOk] = await Promise.all([
    rateLimit(`login:ip:${ipHash()}`, 20, 15 * 60),
    rateLimit(emailKey, 5, 15 * 60),
  ]);
  if (!ipOk || !emailOk) return { message: "Trop de tentatives. Réessayez dans 15 minutes." };

  try {
    // nextCookies() sets the session cookie on this server action's response
    await auth.api.signInEmail({ body: { email, password }, headers: headers() });
  } catch (error) {
    await audit(null, "auth.login_failed", "User", undefined, { email });
    if (error instanceof APIError && error.status === "FORBIDDEN") {
      return { message: error.body?.message ?? "Ce compte a été désactivé." };
    }
    if (!(error instanceof APIError)) console.error("[login]", error);
    return { message: WRONG };
  }

  await resetRateLimit(emailKey);
  redirect(safeAdminPath(next));
}

export async function logout() {
  const user = await getSessionUser();
  await auth.api.signOut({ headers: headers() }).catch(() => {});
  if (user) await audit(user.id, "auth.logout");
  redirect("/admin/login");
}
