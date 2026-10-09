import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { deleteListItem, saveListItem } from "@/app/admin/actions/content";
import { ActionButton, ActionForm, Checkbox, Field, Submit, TextArea } from "@/components/admin/form";
import { Card, PageHeader } from "@/components/admin/ui";
import { requireUser } from "@/lib/server/auth";
import { db } from "@/lib/server/db";

export const metadata = { title: "Question" };

export default async function FaqEditPage({ params }: { params: { id: string } }) {
  await requireUser("content");
  const f = params.id === "new" ? null : await db.faq.findUnique({ where: { id: params.id } });
  if (params.id !== "new" && !f) notFound();

  return (
    <>
      <Link href="/admin/faq" className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white">
        <ArrowLeft size={15} /> Questions fréquentes
      </Link>
      <PageHeader title={f ? "Modifier la question" : "Nouvelle question"} />
      <Card className="max-w-3xl">
        <ActionForm action={saveListItem.bind(null, "faq", f?.id ?? null)} className="flex flex-col gap-4">
          <Field name="question" label="Question" defaultValue={f?.question} />
          <TextArea name="answer" label="Réponse" defaultValue={f?.answer} rows={5} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="order" label="Ordre d'affichage" type="number" min={0} defaultValue={f?.order ?? 0} />
          </div>
          <Checkbox name="active" label="Visible sur le site" defaultChecked={f?.active ?? true} />
          <div>
            <Submit>{f ? "Enregistrer" : "Ajouter la question"}</Submit>
          </div>
        </ActionForm>
      </Card>
      {f && (
        <div className="mt-8">
          <ActionButton action={deleteListItem.bind(null, "faq", f.id)} confirm="Supprimer cette question ?" variant="danger">
            <Trash2 size={15} /> Supprimer
          </ActionButton>
        </div>
      )}
    </>
  );
}
