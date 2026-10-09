import { saveSettings } from "@/app/admin/actions/content";
import { ActionForm, Field, Submit, TextArea } from "@/components/admin/form";
import { Card, PageHeader } from "@/components/admin/ui";
import { getSiteContent } from "@/lib/content/server";
import { requireUser } from "@/lib/server/auth";

export const metadata = { title: "Paramètres du site" };

export default async function SettingsPage() {
  await requireUser("admin");
  const { settings: s } = await getSiteContent();

  return (
    <>
      <PageHeader
        title="Paramètres du site"
        description="Coordonnées affichées partout sur le site. Le numéro WhatsApp est utilisé par tous les boutons."
      />
      <ActionForm action={saveSettings} className="flex flex-col gap-4">
        <Card title="WhatsApp">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              name="whatsapp"
              label="Numéro WhatsApp (format international, sans +)"
              defaultValue={s.whatsapp}
              inputMode="numeric"
              hint="Ex : 22363711111. Tous les boutons WhatsApp du site redirigent vers ce numéro."
            />
            <TextArea name="defaultMessage" label="Message pré-rempli par défaut" defaultValue={s.defaultMessage} rows={2} />
          </div>
        </Card>

        <Card title="Contact">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="phone" label="Téléphone (lien d'appel)" defaultValue={s.phone} placeholder="+22363711111" />
            <Field name="phoneDisplay" label="Téléphone (affiché)" defaultValue={s.phoneDisplay} placeholder="+223 63 71 11 11" />
            <Field name="email" label="Email" type="email" defaultValue={s.email} />
            <Field name="since" label="Année de création" type="number" defaultValue={s.since} />
            <Field name="address" label="Adresse" defaultValue={s.address} />
            <Field name="addressHint" label="Repère" defaultValue={s.addressHint} />
            <TextArea
              name="hours"
              label="Horaires d'ouverture"
              defaultValue={s.hours.map((h) => `${h.day} : ${h.time}`).join("\n")}
              rows={4}
              hint="Une ligne par jour, au format « Jour : horaires »."
              className="sm:col-span-2"
            />
          </div>
        </Card>

        <Card title="Réseaux & carte">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="facebook" label="Page Facebook" defaultValue={s.facebook} />
            <Field name="instagram" label="Compte Instagram" defaultValue={s.instagram} />
            <Field name="mapsLink" label="Lien Google Maps (bouton Itinéraire)" defaultValue={s.mapsLink} />
            <Field
              name="mapsEmbed"
              label="Carte intégrée Google Maps"
              defaultValue={s.mapsEmbed}
              hint="Google Maps → Partager → Intégrer une carte → copier l'adresse du src."
            />
          </div>
        </Card>

        <div>
          <Submit>Enregistrer les paramètres</Submit>
        </div>
      </ActionForm>
    </>
  );
}
