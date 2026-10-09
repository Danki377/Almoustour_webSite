import { Plus } from "lucide-react";
import { ListRowActions } from "@/components/admin/ListRowActions";
import { Badge, EmptyState, LinkButton, PageHeader, Table, tdClass } from "@/components/admin/ui";
import { requireUser } from "@/lib/server/auth";
import { db } from "@/lib/server/db";
import { cn } from "@/lib/utils";

export const metadata = { title: "FAQ" };

export default async function FaqAdminPage() {
  await requireUser("content");
  const items = await db.faq.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });

  return (
    <>
      <PageHeader
        title="Questions fréquentes"
        description="Questions et réponses de la section FAQ de l'accueil."
        actions={
          <LinkButton href="/admin/faq/new" variant="primary">
            <Plus size={15} /> Ajouter une question
          </LinkButton>
        }
      />
      {items.length ? (
        <Table head={["#", "Question", "Statut", ""]}>
          {items.map((f) => (
            <tr key={f.id} className={cn(!f.active && "opacity-50")}>
              <td className={cn(tdClass, "w-12 tabular-nums text-white/40")}>{f.order}</td>
              <td className={tdClass}>
                <span className="font-medium">{f.question}</span>
                <span className="mt-0.5 line-clamp-1 block text-xs text-white/40">{f.answer}</span>
              </td>
              <td className={tdClass}>{f.active ? <Badge tone="green">En ligne</Badge> : <Badge>Masquée</Badge>}</td>
              <td className={tdClass}>
                <ListRowActions kind="faq" id={f.id} active={f.active} href={`/admin/faq/${f.id}`} />
              </td>
            </tr>
          ))}
        </Table>
      ) : (
        <EmptyState>Aucune question.</EmptyState>
      )}
    </>
  );
}
