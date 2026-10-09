import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { deleteListItem, saveListItem } from "@/app/admin/actions/content";
import { ActionButton, ActionForm, Checkbox, Field, Submit } from "@/components/admin/form";
import { Card, PageHeader } from "@/components/admin/ui";
import { requireUser } from "@/lib/server/auth";
import { db } from "@/lib/server/db";

export const metadata = { title: "Offre visa" };

export default async function VisaEditPage({ params }: { params: { id: string } }) {
  await requireUser("content");
  const o = params.id === "new" ? null : await db.visaOffer.findUnique({ where: { id: params.id } });
  if (params.id !== "new" && !o) notFound();

  return (
    <>
      <Link href="/admin/visas" className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white">
        <ArrowLeft size={15} /> Offres visa
      </Link>
      <PageHeader title={o ? `Visa ${o.country}` : "Nouvelle offre visa"} />
      <Card className="max-w-3xl">
        <ActionForm action={saveListItem.bind(null, "visa", o?.id ?? null)} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="country" label="Destination" defaultValue={o?.country} placeholder="Dubaï" />
            <Field name="code" label="Code (facultatif)" defaultValue={o?.code} placeholder="DXB" maxLength={5} />
            <Field name="service" label="Service" defaultValue={o?.service} placeholder="Visa touristique" />
            <Field name="price" label="Tarif" defaultValue={o?.price} placeholder="110.000 FCFA" />
            <Field name="delay" label="Délai estimé" defaultValue={o?.delay} placeholder="24h à 72h" />
            <Field name="order" label="Ordre d'affichage" type="number" min={0} defaultValue={o?.order ?? 0} />
          </div>
          <Checkbox name="active" label="Visible sur le site" defaultChecked={o?.active ?? true} />
          <div>
            <Submit>{o ? "Enregistrer" : "Créer l'offre"}</Submit>
          </div>
        </ActionForm>
      </Card>
      {o && (
        <div className="mt-8">
          <ActionButton action={deleteListItem.bind(null, "visa", o.id)} confirm={`Supprimer l'offre visa ${o.country} ?`} variant="danger">
            <Trash2 size={15} /> Supprimer
          </ActionButton>
        </div>
      )}
    </>
  );
}
