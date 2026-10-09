import { createLead } from "@/app/admin/actions/leads";
import { ActionForm, Submit, TextArea } from "@/components/admin/form";
import { LeadFormFields } from "@/components/admin/LeadFormFields";
import { Card, PageHeader } from "@/components/admin/ui";
import { getSiteContent } from "@/lib/content/server";
import { requireUser } from "@/lib/server/auth";
import { ACTIVE_MEMBER, db } from "@/lib/server/db";

export const metadata = { title: "Nouveau lead" };

export default async function NewLeadPage() {
  const user = await requireUser("leads");
  const [users, { destinations }] = await Promise.all([
    db.user.findMany({ where: ACTIVE_MEMBER, select: { id: true, name: true }, orderBy: { name: "asc" } }),
    getSiteContent(),
  ]);

  return (
    <>
      <PageHeader
        title="Ajouter un lead"
        description="Pour les demandes reçues directement sur WhatsApp, par téléphone ou à l'agence."
      />
      <Card className="max-w-3xl">
        <ActionForm action={createLead} className="flex flex-col gap-4">
          <LeadFormFields lead={{ assigneeId: user.id }} users={users} destinations={destinations} />
          <TextArea name="message" label="Demande / premières informations" rows={4} maxLength={2000} />
          <div>
            <Submit>Créer le lead</Submit>
          </div>
        </ActionForm>
      </Card>
    </>
  );
}
