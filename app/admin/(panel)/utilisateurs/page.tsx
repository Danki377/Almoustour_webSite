import Link from "next/link";
import { UserPlus } from "lucide-react";
import { createMember } from "@/app/admin/actions/users";
import { ActionForm, Field, Select, Submit } from "@/components/admin/form";
import { Badge, Card, formatDate, PageHeader, Table, tdClass } from "@/components/admin/ui";
import { ROLE_OPTIONS } from "@/lib/admin/labels";
import { isAppRole, ROLE_LABEL } from "@/lib/auth-permissions";
import { requireUser } from "@/lib/server/auth";
import { db } from "@/lib/server/db";
import { cn } from "@/lib/utils";

export const metadata = { title: "Équipe" };

const ROLE_TONE = { superadmin: "accent", editor: "violet", member: "neutral" } as const;

export default async function TeamPage({ searchParams }: { searchParams: { ajoute?: string } }) {
  const me = await requireUser("admin");
  const users = await db.user.findMany({
    orderBy: [{ name: "asc" }],
    include: { _count: { select: { assignedLeads: true } } },
  });
  const active = users.filter((u) => !u.banned);

  return (
    <>
      <PageHeader
        title="Équipe"
        description={`${active.length} membre${active.length > 1 ? "s" : ""} actif${active.length > 1 ? "s" : ""}. Chaque personne a son propre accès et ses propres droits.`}
      />
      {searchParams.ajoute && (
        <p className="mb-6 rounded-xl bg-whatsapp/10 px-4 py-3 text-sm text-whatsapp">
          Membre ajouté. Transmettez-lui son email et son mot de passe provisoire : il pourra le changer dans « Mon compte ».
        </p>
      )}

      <Table head={["Membre", "Rôle", "Leads assignés", "Dernière connexion", ""]}>
        {users.map((u) => (
          <tr key={u.id} className={cn(u.banned && "opacity-50")}>
            <td className={tdClass}>
              <span className="font-medium">{u.name}</span>
              {u.id === me.id && <span className="ml-2 text-xs text-white/40">(vous)</span>}
              <span className="block text-xs text-white/40">{u.email}</span>
            </td>
            <td className={tdClass}>
              <span className="flex gap-1">
                <Badge tone={isAppRole(u.role) ? ROLE_TONE[u.role] : "neutral"}>{isAppRole(u.role) ? ROLE_LABEL[u.role] : u.role}</Badge>
                {u.banned && <Badge tone="red">Désactivé</Badge>}
                {!u.banned && u.mustChangePassword && <Badge tone="sun">Mot de passe provisoire</Badge>}
              </span>
            </td>
            <td className={cn(tdClass, "tabular-nums text-white/60")}>{u._count.assignedLeads}</td>
            <td className={cn(tdClass, "text-xs text-white/45")}>{u.lastLoginAt ? formatDate(u.lastLoginAt) : "Jamais"}</td>
            <td className={cn(tdClass, "text-right")}>
              <Link href={`/admin/utilisateurs/${u.id}`} className="text-sm text-accent hover:underline">
                Gérer
              </Link>
            </td>
          </tr>
        ))}
      </Table>

      <Card
        title={
          <span className="flex items-center gap-2">
            <UserPlus size={16} className="text-accent" /> Ajouter un membre
          </span>
        }
        className="mt-6 max-w-3xl"
      >
        <ActionForm action={createMember} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="name" label="Nom complet" autoComplete="off" />
            <Field name="email" label="Email (identifiant de connexion)" type="email" autoComplete="off" />
            <Select name="role" label="Rôle" defaultValue="member" options={ROLE_OPTIONS} />
            <Field
              name="password"
              label="Mot de passe provisoire"
              type="password"
              autoComplete="new-password"
              hint="10 caractères minimum, avec lettres et chiffres. Il le remplacera par le sien à sa première connexion."
            />
          </div>
          <div>
            <Submit>Ajouter le membre</Submit>
          </div>
        </ActionForm>
      </Card>
    </>
  );
}
