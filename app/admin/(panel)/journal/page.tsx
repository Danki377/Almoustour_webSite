import { EmptyState, formatDate, LinkButton, PageHeader, Table, tdClass } from "@/components/admin/ui";
import { requireUser } from "@/lib/server/auth";
import { db } from "@/lib/server/db";
import { cn } from "@/lib/utils";

export const metadata = { title: "Journal d'activité" };

const PER_PAGE = 50;

const ACTION_LABEL: Record<string, string> = {
  "auth.login": "Connexion",
  "auth.logout": "Déconnexion",
  "auth.login_failed": "Échec de connexion",
  "auth.revoke_sessions": "Déconnexion des autres appareils",
  "lead.create": "Lead créé",
  "lead.update": "Lead modifié",
  "lead.delete": "Lead supprimé",
  "lead.export": "Export CSV des leads",
  "settings.update": "Paramètres modifiés",
  "service.update": "Service modifié",
  "user.create": "Membre ajouté",
  "user.update": "Membre modifié",
  "user.delete": "Membre supprimé",
  "user.cli_superadmin": "Super admin créé en ligne de commande",
  "user.reset_password": "Mot de passe réinitialisé",
  "user.change_password": "Mot de passe changé",
  "media.upload": "Image ajoutée",
  "media.delete": "Image supprimée",
};

function labelOf(action: string) {
  if (ACTION_LABEL[action]) return ACTION_LABEL[action];
  const [entity, verb] = action.split(".");
  const what = { destination: "Destination", visa: "Offre visa", temoignage: "Témoignage", faq: "Question FAQ" }[entity] ?? entity;
  const how = { create: "créée", update: "modifiée", delete: "supprimée", hide: "masquée", show: "affichée" }[verb] ?? verb;
  return `${what} ${how}`;
}

export default async function AuditPage({ searchParams }: { searchParams: { page?: string } }) {
  await requireUser("admin");
  const page = Math.max(1, Number(searchParams.page) || 1);
  const [logs, total] = await Promise.all([
    db.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PER_PAGE,
      take: PER_PAGE,
      include: { user: { select: { name: true } } },
    }),
    db.auditLog.count(),
  ]);
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));

  return (
    <>
      <PageHeader title="Journal d'activité" description="Qui a fait quoi dans l'administration (connexions, modifications, suppressions)." />
      {logs.length ? (
        <Table head={["Date", "Utilisateur", "Action", "Détails"]}>
          {logs.map((l) => (
            <tr key={l.id}>
              <td className={cn(tdClass, "whitespace-nowrap text-xs text-white/45")}>{formatDate(l.createdAt)}</td>
              <td className={tdClass}>{l.user?.name ?? <span className="text-white/40">—</span>}</td>
              <td className={cn(tdClass, l.action === "auth.login_failed" ? "text-sun" : "text-white/80")}>{labelOf(l.action)}</td>
              <td className={cn(tdClass, "max-w-[22rem] truncate text-xs text-white/40")}>
                {l.details ? Object.entries(l.details as Record<string, unknown>).map(([k, v]) => `${k}: ${String(v)}`).join(" · ") : l.entityId ?? ""}
              </td>
            </tr>
          ))}
        </Table>
      ) : (
        <EmptyState>Aucune activité enregistrée.</EmptyState>
      )}
      {pages > 1 && (
        <nav className="mt-5 flex items-center justify-between text-sm" aria-label="Pagination">
          <span className="text-white/40">
            Page {page} sur {pages}
          </span>
          <div className="flex gap-2">
            {page > 1 && <LinkButton href={`?page=${page - 1}`}>Précédent</LinkButton>}
            {page < pages && <LinkButton href={`?page=${page + 1}`}>Suivant</LinkButton>}
          </div>
        </nav>
      )}
    </>
  );
}
