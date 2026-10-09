import { saveService } from "@/app/admin/actions/content";
import { ActionForm, Field, Submit, TextArea } from "@/components/admin/form";
import { ImageField } from "@/components/admin/ImageField";
import { Card, EmptyState, PageHeader } from "@/components/admin/ui";
import { requireUser } from "@/lib/server/auth";
import { db } from "@/lib/server/db";

export const metadata = { title: "Services" };

export default async function ServicesAdminPage() {
  await requireUser("content");
  const services = await db.service.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <PageHeader
        title="Services"
        description="Titre et photo des trois cartes de l'accueil, et message WhatsApp pré-rempli de chaque service."
      />
      {services.length ? (
        <div className="flex flex-col gap-4">
          {services.map((s) => (
            <Card key={s.slug} title={s.title}>
              <ActionForm action={saveService.bind(null, s.slug)} className="flex flex-col gap-4">
                <Field name="title" label="Titre" defaultValue={s.title} />
                <ImageField defaultValue={s.image} />
                <TextArea name="waMsg" label="Message WhatsApp pré-rempli" defaultValue={s.waMsg} rows={2} />
                <div>
                  <Submit />
                </div>
              </ActionForm>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState>Aucun service : lancez le seed de la base de données.</EmptyState>
      )}
    </>
  );
}
