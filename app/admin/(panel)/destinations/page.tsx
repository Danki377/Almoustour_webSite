import { Plus } from "lucide-react";
import { ListRowActions } from "@/components/admin/ListRowActions";
import { Badge, EmptyState, LinkButton, PageHeader, Table, tdClass } from "@/components/admin/ui";
import { requireUser } from "@/lib/server/auth";
import { db } from "@/lib/server/db";
import { cn } from "@/lib/utils";

export const metadata = { title: "Offres études" };

export default async function DestinationsAdminPage() {
  await requireUser("content");
  const destinations = await db.destination.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });

  return (
    <>
      <PageHeader
        title="Offres études"
        description="Destinations affichées sur l'accueil (galerie, carte du monde) et sur la page Études à l'étranger."
        actions={
          <LinkButton href="/admin/destinations/new" variant="primary">
            <Plus size={15} /> Ajouter une destination
          </LinkButton>
        }
      />
      {destinations.length ? (
        <Table head={["Destination", "Offre", "Prix", "Badge", "Statut", ""]}>
          {destinations.map((d) => (
            <tr key={d.id} className={cn(!d.active && "opacity-50")}>
              <td className={tdClass}>
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.image} alt="" className="h-10 w-14 rounded-lg object-cover" />
                  <span className="flex flex-col">
                    <span className="font-medium">{d.country}</span>
                    <span className="text-xs text-white/40">
                      BKO → {d.code} · ordre {d.order}
                    </span>
                  </span>
                </div>
              </td>
              <td className={cn(tdClass, "max-w-[16rem] truncate text-white/70")}>{d.title}</td>
              <td className={cn(tdClass, "whitespace-nowrap")}>
                <span className="text-white/45">{d.priceLabel} </span>
                {d.price}
              </td>
              <td className={tdClass}>
                <span className="flex flex-wrap gap-1">
                  <Badge tone="sun">{d.badge}</Badge>
                  {d.scholarship && <Badge tone="accent">Bourse</Badge>}
                </span>
              </td>
              <td className={tdClass}>{d.active ? <Badge tone="green">En ligne</Badge> : <Badge>Masquée</Badge>}</td>
              <td className={tdClass}>
                <ListRowActions kind="destination" id={d.id} active={d.active} href={`/admin/destinations/${d.id}`} />
              </td>
            </tr>
          ))}
        </Table>
      ) : (
        <EmptyState>Aucune destination. Lancez le seed de la base ou ajoutez-en une.</EmptyState>
      )}
    </>
  );
}
