import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins/admin";
import { AUTH_COOKIE_PREFIX } from "@/lib/auth-cookie";
import { ac, isAppRole, roleCan, roles, type AppRole, type Permission } from "@/lib/auth-permissions";
import { db } from "./db";
import { audit } from "./audit";

const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;
const vercelBranchUrl = process.env.VERCEL_BRANCH_URL ? `https://${process.env.VERCEL_BRANCH_URL}` : undefined;

export const auth = betterAuth({
  appName: "Al Moustour Voyages",
  // Secret: BETTER_AUTH_SECRET (or AUTH_SECRET). Base URL: BETTER_AUTH_URL, else the Vercel deployment URL.
  baseURL: process.env.BETTER_AUTH_URL ?? vercelUrl ?? "http://localhost:3000",
  trustedOrigins: [process.env.BETTER_AUTH_URL, vercelUrl, vercelBranchUrl, "http://localhost:3000"].filter(Boolean) as string[],
  database: prismaAdapter(db, { provider: "postgresql" }),

  emailAndPassword: {
    enabled: true,
    // No public sign-up: members are added by a super admin from /admin/utilisateurs
    disableSignUp: true,
    minPasswordLength: 10,
    maxPasswordLength: 128,
    autoSignIn: false,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // extended at most once a day
    // No cookie cache: a banned member or a revoked session is locked out immediately
  },

  user: {
    additionalFields: {
      lastLoginAt: { type: "date", required: false, input: false },
    },
  },

  rateLimit: {
    enabled: true,
    storage: "database",
    window: 60,
    max: 100,
    customRules: {
      "/sign-in/email": { window: 15 * 60, max: 10 },
      "/change-password": { window: 15 * 60, max: 5 },
    },
  },

  advanced: {
    cookiePrefix: AUTH_COOKIE_PREFIX,
    ipAddress: { ipAddressHeaders: ["x-forwarded-for", "x-real-ip"] },
  },

  databaseHooks: {
    session: {
      create: {
        after: async (session) => {
          await db.user.update({ where: { id: session.userId }, data: { lastLoginAt: new Date() } }).catch(() => {});
          await audit(session.userId, "auth.login");
        },
      },
    },
  },

  plugins: [
    admin({
      ac,
      roles,
      defaultRole: "member",
      adminRoles: ["superadmin"],
      bannedUserMessage: "Ce compte a été désactivé. Contactez un administrateur.",
    }),
    nextCookies(), // must stay last: lets server actions set the session cookie
  ],
});

export type SessionUser = { id: string; email: string; name: string; role: AppRole };

/** Current user, validated against the database once per request. */
export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  const session = await auth.api.getSession({ headers: headers() }).catch(() => null);
  if (!session || session.user.banned || !isAppRole(session.user.role)) return null;
  const { id, email, name, role } = session.user;
  return { id, email, name, role: role as AppRole };
});

export function can(user: Pick<SessionUser, "role"> | null, permission: Permission) {
  return roleCan(user?.role, permission);
}

/** For pages and server actions: redirects to the login page, or to the dashboard if the role is insufficient. */
export async function requireUser(permission: Permission = "leads") {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  if (!can(user, permission)) redirect("/admin?refus=1");
  return user;
}

export { ROLE_LABEL } from "@/lib/auth-permissions";
export type { Permission } from "@/lib/auth-permissions";
