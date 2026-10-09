"use client";

import { Field, Select } from "@/components/admin/form";
import { LEAD_CHANNEL, LEAD_CHANNELS, SERVICE_LABEL } from "@/lib/admin/labels";

export type LeadDefaults = {
  name?: string;
  phone?: string;
  email?: string | null;
  service?: string | null;
  destinationId?: string | null;
  channel?: string;
  assigneeId?: string | null;
};

/** Contact + project fields shared by "new lead" and "edit lead". */
export function LeadFormFields({
  lead = {},
  users,
  destinations,
}: {
  lead?: LeadDefaults;
  users: { id: string; name: string }[];
  destinations: { id: string; country: string }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field name="name" label="Nom complet" defaultValue={lead.name} required maxLength={80} />
      <Field name="phone" label="Téléphone / WhatsApp" type="tel" defaultValue={lead.phone} required hint="8 chiffres = numéro malien (+223 ajouté)." />
      <Field name="email" label="Email" type="email" defaultValue={lead.email ?? ""} />
      <Select
        name="channel"
        label="Canal d'arrivée"
        defaultValue={lead.channel ?? "WHATSAPP"}
        options={LEAD_CHANNELS.map((c) => ({ value: c, label: LEAD_CHANNEL[c] }))}
      />
      <Select
        name="service"
        label="Service"
        defaultValue={lead.service ?? ""}
        options={[{ value: "", label: "À préciser" }, ...Object.entries(SERVICE_LABEL).map(([value, label]) => ({ value, label }))]}
      />
      <Select
        name="destinationId"
        label="Destination"
        defaultValue={lead.destinationId ?? ""}
        options={[{ value: "", label: "Aucune / à définir" }, ...destinations.map((d) => ({ value: d.id, label: d.country }))]}
      />
      <Select
        name="assigneeId"
        label="Conseiller"
        defaultValue={lead.assigneeId ?? ""}
        options={[{ value: "", label: "Non assigné" }, ...users.map((u) => ({ value: u.id, label: u.name }))]}
      />
    </div>
  );
}
