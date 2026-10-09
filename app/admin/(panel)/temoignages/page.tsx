import { Plus } from "lucide-react";
import { ListRowActions } from "@/components/admin/ListRowActions";
import { Badge, EmptyState, LinkButton, PageHeader, Table, tdClass } from "@/components/admin/ui";
import { requireUser } from "@/lib/server/auth";
import { db } from "@/lib/server/db";
import { cn } from "@/lib/utils";

export const metadata = { title: "Témoignages" };

export default async function TestimonialsAdminPage() {
  await requireUser("content");
  const items = await db.testimonial.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });

  return (
    <>
      <PageHeader
        title="Témoignages"
        description="Étudiants affichés dans la section Témoignages de l'accueil (4 recommandés)."
        actions={
          <LinkButton href="/admin/temoignages/new" variant="primary">
            <Plus size={15} /> Ajouter un témoignage
          </LinkButton>
        }
      />
      {items.length ? (
        <Table head={["Étudiant", "Destination", "Tampon", "Statut", ""]}>
          {items.map((t) => (
            <tr key={t.id} className={cn(!t.active && "opacity-50")}>
              <td className={tdClass}>
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                  <span className="flex flex-col">
                    <span className="font-medium">{t.name}</span>
                    <span className="text-xs text-white/40">{t.program}</span>
                  </span>
                </div>
              </td>
              <td className={cn(tdClass, "text-white/70")}>{t.country}</td>
              <td className={tdClass}>
                <Badge tone="sun">
                  {t.stampLabel} · {t.code}
                </Badge>
              </td>
              <td className={tdClass}>{t.active ? <Badge tone="green">En ligne</Badge> : <Badge>Masqué</Badge>}</td>
              <td className={tdClass}>
                <ListRowActions kind="temoignage" id={t.id} active={t.active} href={`/admin/temoignages/${t.id}`} />
              </td>
            </tr>
          ))}
        </Table>
      ) : (
        <EmptyState>Aucun témoignage.</EmptyState>
      )}
    </>
  );
}
