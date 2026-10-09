import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, Phone, Trash2 } from "lucide-react";
import { addLeadNote, deleteLead, updateLead } from "@/app/admin/actions/leads";
import { ActionButton, ActionForm, Field, Select, Submit, TextArea } from "@/components/admin/form";
import { LeadFormFields } from "@/components/admin/LeadFormFields";
import { Badge, Card, formatDate, formatMoney } from "@/components/admin/ui";
import { CLICK_SOURCE, LEAD_CHANNEL, LEAD_STATUS, LEAD_STATUSES, SERVICE_LABEL } from "@/lib/admin/labels";
import { getSiteContent } from "@/lib/content/server";
import { whatsappTo } from "@/lib/phone";
import { can, requireUser } from "@/lib/server/auth";
import { ACTIVE_MEMBER, db } from "@/lib/server/db";

export const metadata = { title: "Lead" };

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 text-sm">
      <span className="text-white/40">{label}</span>
      <span className="text-right text-white/80">{children}</span>
    </div>
  );
}

export default async function LeadPage({ params }: { params: { id: string } }) {
  const user = await requireUser("leads");
  const [lead, users, { destinations }] = await Promise.all([
    db.lead.findUnique({
      where: { id: params.id },
      include: {
        assignee: { select: { name: true } },
        notes: { orderBy: { createdAt: "desc" }, include: { author: { select: { name: true } } } },
      },
    }),
    db.user.findMany({ where: ACTIVE_MEMBER, select: { id: true, name: true }, orderBy: { name: "asc" } }),
    getSiteContent(),
  ]);
  if (!lead) notFound();

  const country = destinations.find((d) => d.id === lead.destinationId)?.country;
  const project = [SERVICE_LABEL[lead.service ?? ""], country].filter(Boolean).join(" · ") || "Projet à préciser";
  const firstName = lead.name.split(" ")[0];
  const templates = [
    { label: "Premier contact", text: `Bonjour ${firstName}, ici Al Moustour Voyages. Merci pour votre demande (${project}). Quand êtes-vous disponible pour en parler ?` },
    { label: "Relance", text: `Bonjour ${firstName}, nous revenons vers vous au sujet de votre projet (${project}). Avez-vous pu avancer ? Nous restons à votre disposition.` },
    { label: "Documents", text: `Bonjour ${firstName}, pour lancer votre dossier merci de nous envoyer : passeport, derniers diplômes et relevés de notes.` },
  ];

  return (
    <>
      <Link href="/admin/leads" className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white">
        <ArrowLeft size={15} /> Tous les leads
      </Link>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-[-0.03em]">{lead.name}</h1>
            <Badge tone={LEAD_STATUS[lead.status].tone}>{LEAD_STATUS[lead.status].label}</Badge>
          </div>
          <p className="text-sm text-white/50">
            {project} · reçu le {formatDate(lead.createdAt)}
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href={`tel:${lead.phone}`}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-surface px-4 text-sm ring-1 ring-white/10 hover:bg-white/10"
          >
            <Phone size={15} /> Appeler
          </a>
          <a
            href={whatsappTo(lead.phone)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-whatsapp px-4 text-sm font-medium text-canvas hover:brightness-110"
          >
            <MessageCircle size={15} /> WhatsApp
          </a>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex flex-col gap-4">
          <Card title="Suivi du dossier">
            <ActionForm action={updateLead.bind(null, lead.id)} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Select
                  name="status"
                  label="Statut"
                  defaultValue={lead.status}
                  options={LEAD_STATUSES.map((s) => ({ value: s, label: LEAD_STATUS[s].label }))}
                />
                <Field
                  name="amount"
                  label="Montant du dossier (FCFA)"
                  inputMode="numeric"
                  defaultValue={lead.amount ?? ""}
                  hint="Compté dans le chiffre d'affaires quand le statut est « Client »."
                />
              </div>
              <div className="border-t border-white/5 pt-4">
                <LeadFormFields lead={lead} users={users} destinations={destinations} />
              </div>
              <div>
                <Submit />
              </div>
            </ActionForm>
          </Card>

          <Card title={`Notes & historique (${lead.notes.length})`}>
            <ActionForm action={addLeadNote.bind(null, lead.id)} resetOnSuccess className="mb-6 flex flex-col gap-3">
              <TextArea name="body" label="Ajouter une note" rows={3} maxLength={2000} placeholder="Appel effectué, documents reçus, rendez-vous…" />
              <div>
                <Submit>Ajouter la note</Submit>
              </div>
            </ActionForm>
            {lead.message && (
              <div className="mb-4 rounded-xl bg-canvas p-4 text-sm ring-1 ring-white/5">
                <p className="mb-1 text-xs text-white/40">Message initial</p>
                <p className="whitespace-pre-wrap text-white/80">{lead.message}</p>
              </div>
            )}
            <ol className="flex flex-col gap-4 border-l border-white/10 pl-5">
              {lead.notes.map((n) => (
                <li key={n.id} className="relative">
                  <span className="absolute -left-[1.6rem] top-1.5 h-2 w-2 rounded-full bg-accent/70" />
                  <p className="whitespace-pre-wrap text-sm text-white/85">{n.body}</p>
                  <p className="mt-1 text-xs text-white/35">
                    {n.author?.name ?? "Site web"} · {formatDate(n.createdAt)}
                  </p>
                </li>
              ))}
              <li className="relative">
                <span className="absolute -left-[1.6rem] top-1.5 h-2 w-2 rounded-full bg-white/30" />
                <p className="text-sm text-white/60">Lead créé ({LEAD_CHANNEL[lead.channel]})</p>
                <p className="mt-1 text-xs text-white/35">{formatDate(lead.createdAt)}</p>
              </li>
            </ol>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card title="Répondre sur WhatsApp">
            <div className="flex flex-col gap-2">
              {templates.map((t) => (
                <a
                  key={t.label}
                  href={whatsappTo(lead.phone, t.text)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-canvas p-3 text-sm ring-1 ring-white/5 transition-colors hover:ring-whatsapp/40"
                >
                  <span className="font-medium text-whatsapp">{t.label}</span>
                  <span className="mt-1 line-clamp-2 block text-xs text-white/45">{t.text}</span>
                </a>
              ))}
            </div>
          </Card>

          <Card title="Informations">
            <div className="divide-y divide-white/5">
              <Info label="Téléphone">{lead.phone}</Info>
              {lead.email && <Info label="Email">{lead.email}</Info>}
              <Info label="Conseiller">{lead.assignee?.name ?? "Non assigné"}</Info>
              {lead.amount != null && <Info label="Montant">{formatMoney(lead.amount)}</Info>}
              {lead.convertedAt && <Info label="Client depuis">{formatDate(lead.convertedAt, false)}</Info>}
            </div>
          </Card>

          <Card title="Provenance">
            <div className="divide-y divide-white/5">
              <Info label="Canal">{LEAD_CHANNEL[lead.channel]}</Info>
              {lead.source && <Info label="Formulaire">{CLICK_SOURCE[lead.source] ?? lead.source}</Info>}
              {lead.page && <Info label="Page">{lead.page === "/" ? "Accueil" : lead.page}</Info>}
              {lead.utmSource && <Info label="Source">{lead.utmSource}</Info>}
              {lead.utmMedium && <Info label="Support">{lead.utmMedium}</Info>}
              {lead.utmCampaign && <Info label="Campagne">{lead.utmCampaign}</Info>}
              {lead.referrer && <Info label="Site d'origine">{lead.referrer}</Info>}
              {!lead.utmSource && !lead.referrer && lead.channel === "WEBSITE" && <Info label="Accès">Direct</Info>}
            </div>
          </Card>

          {can(user, "admin") && (
            <ActionButton
              action={deleteLead.bind(null, lead.id)}
              confirm={`Supprimer définitivement le lead « ${lead.name} » et ses notes ?`}
              variant="danger"
              className="w-full"
            >
              <Trash2 size={15} /> Supprimer le lead
            </ActionButton>
          )}
        </div>
      </div>
    </>
  );
}
