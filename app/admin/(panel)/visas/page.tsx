import { Plus } from "lucide-react";
import { ListRowActions } from "@/components/admin/ListRowActions";
import { Badge, EmptyState, LinkButton, PageHeader, Table, tdClass } from "@/components/admin/ui";
import { requireUser } from "@/lib/server/auth";
import { db } from "@/lib/server/db";
import { cn } from "@/lib/utils";

export const metadata = { title: "Offres visa" };

export default async function VisasAdminPage() {
  await requireUser("content");
  const offers = await db.visaOffer.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });

  return (
    <>
      <PageHeader
        title="Offres visa"
        description="Tableau des tarifs de la page Assistance visa."
        actions={
          <LinkButton href="/admin/visas/new" variant="primary">
            <Plus size={15} /> Ajouter une offre
          </LinkButton>
        }
      />
      {offers.length ? (
        <Table head={["Destination", "Service", "Tarif", "Délai", "Statut", ""]}>
          {offers.map((o) => (
            <tr key={o.id} className={cn(!o.active && "opacity-50")}>
              <td className={tdClass}>
                <span className="font-medium">{o.country}</span>
                <span className="ml-2 text-xs text-white/40">{o.code}</span>
              </td>
              <td className={cn(tdClass, "text-white/70")}>{o.service}</td>
              <td className={cn(tdClass, "whitespace-nowrap font-medium text-accent")}>{o.price}</td>
              <td className={cn(tdClass, "text-white/60")}>{o.delay}</td>
              <td className={tdClass}>{o.active ? <Badge tone="green">En ligne</Badge> : <Badge>Masquée</Badge>}</td>
              <td className={tdClass}>
                <ListRowActions kind="visa" id={o.id} active={o.active} href={`/admin/visas/${o.id}`} />
              </td>
            </tr>
          ))}
        </Table>
      ) : (
        <EmptyState>Aucune offre visa.</EmptyState>
      )}
    </>
  );
}
