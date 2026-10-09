import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements } from "better-auth/plugins/admin/access";

/**
 * What each role may do. Better Auth's admin plugin enforces the `user` / `session`
 * statements itself (creating members, changing roles…); the others are checked by `can()`.
 */
export const statement = {
  ...defaultStatements,
  lead: ["read", "update", "delete", "export"],
  content: ["update"],
  settings: ["update"],
  audit: ["read"],
} as const;

export const ac = createAccessControl(statement);

export const roles = {
  superadmin: ac.newRole({
    user: ["create", "list", "set-role", "ban", "delete", "set-password", "get", "update"],
    session: ["list", "revoke", "delete"],
    lead: ["read", "update", "delete", "export"],
    content: ["update"],
    settings: ["update"],
    audit: ["read"],
  }),
  editor: ac.newRole({
    lead: ["read", "update", "export"],
    content: ["update"],
  }),
  member: ac.newRole({
    lead: ["read", "update"],
  }),
};

export type AppRole = keyof typeof roles;
export const APP_ROLES = Object.keys(roles) as AppRole[];

export const ROLE_LABEL: Record<AppRole, string> = {
  superadmin: "Super admin",
  editor: "Éditeur",
  member: "Membre",
};

export function isAppRole(value: unknown): value is AppRole {
  return typeof value === "string" && value in roles;
}

/** Page-level permissions used by the back office. */
export type Permission = "leads" | "export" | "content" | "admin";

const REQUIRED: Record<Permission, Parameters<(typeof roles)["member"]["authorize"]>[0]> = {
  leads: { lead: ["read"] },
  export: { lead: ["export"] },
  content: { content: ["update"] },
  admin: { settings: ["update"], user: ["list"] },
};

export function roleCan(role: string | null | undefined, permission: Permission) {
  if (!isAppRole(role)) return false;
  return roles[role].authorize(REQUIRED[permission]).success;
}
