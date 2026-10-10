import { changeOwnPassword, revokeOtherSessions } from "@/app/admin/actions/users";
import { ActionButton, ActionForm, Field, Submit } from "@/components/admin/form";
import { Card, formatDate, PageHeader } from "@/components/admin/ui";
import { requireUser, ROLE_LABEL } from "@/lib/server/auth";
import { db } from "@/lib/server/db";

export const metadata = { title: "Mon compte" };

export default async function AccountPage({ searchParams }: { searchParams: { mdp?: string } }) {
  const me = await requireUser("leads", { pendingPassword: true });
  const sessions = await db.session.findMany({
    where: { userId: me.id, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "desc" },
    select: { id: true, createdAt: true, userAgent: true },
  });

  return (
    <>
      <PageHeader title="Mon compte" description={`${me.name} · ${me.email} · ${ROLE_LABEL[me.role]}`} />
      {me.mustChangePassword && (
        <div role="alert" className="mb-6 max-w-4xl rounded-xl bg-accent/10 px-4 py-3 text-sm text-accent ring-1 ring-accent/20">
          <p className="font-medium">Choisissez votre propre mot de passe pour continuer.</p>
          <p className="mt-0.5 text-accent/80">
            Le mot de passe actuel vous a été donné par un administrateur. Remplacez-le par un mot de passe que vous seul connaissez.
          </p>
        </div>
      )}
      {searchParams.mdp && (
        <p role="status" className="mb-6 rounded-xl bg-whatsapp/10 px-4 py-3 text-sm text-whatsapp">
          Mot de passe modifié. Vos autres appareils ont été déconnectés.
        </p>
      )}
      <div className="grid max-w-4xl gap-4 lg:grid-cols-2">
        <Card title="Changer mon mot de passe">
          <ActionForm action={changeOwnPassword} resetOnSuccess className="flex flex-col gap-4">
            <Field name="current" label="Mot de passe actuel" type="password" autoComplete="current-password" />
            <Field
              name="password"
              label="Nouveau mot de passe"
              type="password"
              autoComplete="new-password"
              hint="10 caractères minimum, avec lettres et chiffres."
            />
            <Field name="confirm" label="Confirmer le nouveau mot de passe" type="password" autoComplete="new-password" />
            <div>
              <Submit>Changer le mot de passe</Submit>
            </div>
          </ActionForm>
        </Card>

        <Card title={`Sessions ouvertes (${sessions.length})`}>
          <ul className="mb-5 flex flex-col divide-y divide-white/5">
            {sessions.map((s) => (
              <li key={s.id} className="py-2.5 text-sm">
                <span className="line-clamp-1 text-white/70">{s.userAgent ?? "Navigateur inconnu"}</span>
                <span className="text-xs text-white/40">Connecté le {formatDate(s.createdAt)}</span>
              </li>
            ))}
          </ul>
          {sessions.length > 1 && (
            <ActionButton action={revokeOtherSessions} confirm="Déconnecter tous vos autres appareils ?">
              Déconnecter les autres appareils
            </ActionButton>
          )}
        </Card>
      </div>
    </>
  );
}
