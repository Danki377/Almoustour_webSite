import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { removeMember, resetMemberPassword, updateMember } from "@/app/admin/actions/users";
import { ActionButton, ActionForm, Checkbox, Field, Select, Submit } from "@/components/admin/form";
import { Card, formatDate, PageHeader } from "@/components/admin/ui";
import { ROLE_OPTIONS } from "@/lib/admin/labels";
import { requireUser } from "@/lib/server/auth";
import { db } from "@/lib/server/db";

export const metadata = { title: "Membre" };

export default async function MemberPage({ params }: { params: { id: string } }) {
  const me = await requireUser("admin");
  const user = await db.user.findUnique({
    where: { id: params.id },
    include: { _count: { select: { assignedLeads: true } } },
  });
  if (!user) notFound();
  const isMe = user.id === me.id;
  const openSessions = await db.session.count({ where: { userId: user.id, expiresAt: { gt: new Date() } } });

  return (
    <>
      <Link href="/admin/utilisateurs" className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white">
        <ArrowLeft size={15} /> Équipe
      </Link>
      <PageHeader
        title={user.name}
        description={`${user.email} · membre depuis le ${formatDate(user.createdAt, false)} · ${openSessions} session(s) ouverte(s) · ${user._count.assignedLeads} lead(s) assigné(s)`}
      />

      <div className="grid max-w-4xl gap-4 lg:grid-cols-2">
        <Card title="Profil et accès">
          <ActionForm action={updateMember.bind(null, user.id)} className="flex flex-col gap-4">
            <Field name="name" label="Nom" defaultValue={user.name} />
            <Select name="role" label="Rôle" defaultValue={user.role} options={ROLE_OPTIONS} disabled={isMe} />
            {isMe && <input type="hidden" name="role" value={user.role} />}
            {isMe ? (
              <input type="hidden" name="active" value="on" />
            ) : (
              <Checkbox name="active" label="Accès actif (peut se connecter)" defaultChecked={!user.banned} />
            )}
            <p className="text-xs text-white/40">Désactiver l&apos;accès déconnecte immédiatement la personne sur tous ses appareils.</p>
            <div>
              <Submit />
            </div>
          </ActionForm>
        </Card>

        {!isMe && (
          <Card title="Réinitialiser le mot de passe">
            <ActionForm action={resetMemberPassword.bind(null, user.id)} resetOnSuccess className="flex flex-col gap-4">
              <Field
                name="password"
                label="Nouveau mot de passe provisoire"
                type="password"
                autoComplete="new-password"
                hint="10 caractères minimum, avec lettres et chiffres. Toutes ses sessions seront fermées."
              />
              <div>
                <Submit>Réinitialiser</Submit>
              </div>
            </ActionForm>
          </Card>
        )}
      </div>

      {!isMe && (
        <div className="mt-10 max-w-4xl border-t border-white/10 pt-6">
          <ActionButton
            action={removeMember.bind(null, user.id)}
            confirm={`Supprimer définitivement le compte de ${user.name} ? Ses leads restent dans le suivi, sans conseiller. Pour un départ temporaire, désactivez plutôt l'accès.`}
            variant="danger"
          >
            <Trash2 size={15} /> Supprimer ce membre
          </ActionButton>
        </div>
      )}
    </>
  );
}
