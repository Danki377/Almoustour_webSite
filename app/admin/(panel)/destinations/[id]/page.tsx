import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { deleteDestination, saveDestination } from "@/app/admin/actions/content";
import { ActionButton, ActionForm, Checkbox, Field, Submit, TextArea } from "@/components/admin/form";
import { ImageField } from "@/components/admin/ImageField";
import { Card, PageHeader } from "@/components/admin/ui";
import { requireUser } from "@/lib/server/auth";
import { db } from "@/lib/server/db";
import { COUNTRY_PATHS } from "@/lib/world-map";

export const metadata = { title: "Destination" };

export default async function DestinationEditPage({ params, searchParams }: { params: { id: string }; searchParams: { cree?: string } }) {
  await requireUser("content");
  const isNew = params.id === "new";
  const d = isNew ? null : await db.destination.findUnique({ where: { id: params.id } });
  if (!isNew && !d) notFound();

  const expenses = Array.isArray(d?.expenses) ? (d.expenses as { label: string; value: string }[]) : [];
  const mapCountries = Object.keys(COUNTRY_PATHS).filter((k) => k !== "mali");

  return (
    <>
      <Link href="/admin/destinations" className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white">
        <ArrowLeft size={15} /> Offres études
      </Link>
      <PageHeader
        title={d ? d.country : "Nouvelle destination"}
        description={d ? `Identifiant : ${d.id}` : "Elle apparaîtra sur l'accueil, la carte et la page Études."}
      />
      {searchParams.cree && (
        <p className="mb-6 rounded-xl bg-whatsapp/10 px-4 py-3 text-sm text-whatsapp">Destination créée et publiée.</p>
      )}

      <ActionForm action={saveDestination.bind(null, d?.id ?? null)} className="flex flex-col gap-4">
        <Card title="Carte de l'offre">
          <div className="grid gap-4 sm:grid-cols-2">
            {isNew && (
              <Field
                name="id"
                label="Identifiant (dans l'adresse)"
                placeholder="allemagne"
                hint={`Le pays est surligné sur la carte si l'identifiant est : ${mapCountries.join(", ")}. Sinon, seul le point apparaît.`}
                className="sm:col-span-2"
              />
            )}
            <Field name="country" label="Pays" defaultValue={d?.country} placeholder="Allemagne" />
            <Field name="city" label="Ville affichée" defaultValue={d?.city} placeholder="Berlin, Allemagne" />
            <Field name="title" label="Titre de l'offre" defaultValue={d?.title} className="sm:col-span-2" />
            <Field name="priceLabel" label="Libellé du prix" defaultValue={d?.priceLabel ?? "frais d'agence"} />
            <Field name="price" label="Prix" defaultValue={d?.price} placeholder="650.000 FCFA" />
            <Field name="info" label="Information clé" defaultValue={d?.info} placeholder="Logement + visa inclus" />
            <Field name="badge" label="Badge" defaultValue={d?.badge} placeholder="90% de réussite" />
            <TextArea name="description" label="Description courte (carte du monde)" defaultValue={d?.description} rows={3} className="sm:col-span-2" />
            <div className="flex flex-wrap gap-6 sm:col-span-2">
              <Checkbox name="scholarship" label="Bourse disponible" defaultChecked={d?.scholarship} />
              <Checkbox name="active" label="Visible sur le site" defaultChecked={d?.active ?? true} />
            </div>
          </div>
        </Card>

        <Card title="Photo">
          <ImageField defaultValue={d?.image ?? ""} />
        </Card>

        <Card title="Page Études : procédure et frais">
          <div className="grid gap-4">
            <TextArea name="intro" label="Introduction" defaultValue={d?.intro} rows={3} />
            <TextArea
              name="procedure"
              label="Étapes de la procédure"
              defaultValue={d?.procedure.join("\n")}
              rows={5}
              hint="Une étape par ligne."
            />
            <TextArea
              name="expenses"
              label="Frais détaillés"
              defaultValue={expenses.map((e) => `${e.label} : ${e.value}`).join("\n")}
              rows={6}
              hint="Une ligne par frais, au format « Libellé : montant ». Ex : Frais d'agence : 650.000 FCFA"
            />
          </div>
        </Card>

        <Card title="Carte du monde & affichage">
          <div className="grid gap-4 sm:grid-cols-4">
            <Field name="code" label="Code aéroport" defaultValue={d?.code} placeholder="BER" maxLength={5} />
            <Field name="lat" label="Latitude" defaultValue={d?.lat ?? ""} placeholder="52.52" inputMode="decimal" />
            <Field name="lon" label="Longitude" defaultValue={d?.lon ?? ""} placeholder="13.40" inputMode="decimal" />
            <Field name="order" label="Ordre d'affichage" type="number" min={0} defaultValue={d?.order ?? 0} />
          </div>
          <p className="mt-3 text-xs text-white/40">
            Coordonnées de la ville (clic droit sur Google Maps → la première ligne donne « latitude, longitude »).
          </p>
        </Card>

        <div className="flex items-center justify-between gap-4">
          <Submit>{d ? "Enregistrer" : "Créer la destination"}</Submit>
        </div>
      </ActionForm>

      {d && (
        <div className="mt-10 border-t border-white/10 pt-6">
          <ActionButton
            action={deleteDestination.bind(null, d.id)}
            confirm={`Supprimer définitivement « ${d.country} » ? Pour la retirer temporairement, décochez plutôt « Visible sur le site ».`}
            variant="danger"
          >
            <Trash2 size={15} /> Supprimer la destination
          </ActionButton>
        </div>
      )}
    </>
  );
}
