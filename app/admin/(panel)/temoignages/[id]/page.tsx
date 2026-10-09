import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { deleteListItem, saveListItem } from "@/app/admin/actions/content";
import { ActionButton, ActionForm, Checkbox, Field, Submit, TextArea } from "@/components/admin/form";
import { ImageField } from "@/components/admin/ImageField";
import { Card, PageHeader } from "@/components/admin/ui";
import { requireUser } from "@/lib/server/auth";
import { db } from "@/lib/server/db";

export const metadata = { title: "Témoignage" };

export default async function TestimonialEditPage({ params }: { params: { id: string } }) {
  await requireUser("content");
  const t = params.id === "new" ? null : await db.testimonial.findUnique({ where: { id: params.id } });
  if (params.id !== "new" && !t) notFound();

  return (
    <>
      <Link href="/admin/temoignages" className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white">
        <ArrowLeft size={15} /> Témoignages
      </Link>
      <PageHeader title={t ? t.name : "Nouveau témoignage"} />
      <ActionForm action={saveListItem.bind(null, "temoignage", t?.id ?? null)} className="flex max-w-3xl flex-col gap-4">
        <Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="name" label="Nom de l'étudiant" defaultValue={t?.name} />
            <Field name="program" label="Formation" defaultValue={t?.program} placeholder="Master en Informatique" />
            <Field name="country" label="Pays" defaultValue={t?.country} />
            <Field name="code" label="Code aéroport (tampon)" defaultValue={t?.code} placeholder="CDG" maxLength={5} />
            <Field name="stampLabel" label="Texte du tampon" defaultValue={t?.stampLabel ?? "Visa obtenu"} placeholder="Admis / Visa obtenu" />
            <Field name="order" label="Ordre d'affichage" type="number" min={0} defaultValue={t?.order ?? 0} />
            <TextArea name="text" label="Témoignage" defaultValue={t?.text} rows={5} className="sm:col-span-2" />
          </div>
        </Card>
        <Card title="Photo">
          <ImageField defaultValue={t?.image ?? ""} />
        </Card>
        <Checkbox name="active" label="Visible sur le site" defaultChecked={t?.active ?? true} />
        <div>
          <Submit>{t ? "Enregistrer" : "Créer le témoignage"}</Submit>
        </div>
      </ActionForm>
      {t && (
        <div className="mt-8">
          <ActionButton action={deleteListItem.bind(null, "temoignage", t.id)} confirm={`Supprimer le témoignage de ${t.name} ?`} variant="danger">
            <Trash2 size={15} /> Supprimer
          </ActionButton>
        </div>
      )}
    </>
  );
}
