import { Head } from "@/components/Head";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { LeadForm } from "@/components/LeadForm";
import { getSiteContent } from "@/lib/content/server";
import { waLink } from "@/lib/site";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-white/10 py-4 last:border-b-0">
      <span className="body-sm text-white/50">{label}</span>
      <span className="body-md text-right">{children}</span>
    </div>
  );
}

export async function ContactSection() {
  const { settings } = await getSiteContent();
  return (
    <section id="contact" className="section-y">
      <div className="container-v">
        <Head
          label="Contacts"
          title={
            <>
              Parlons de votre projet. <br className="hidden lg:block" />
              Un conseiller vous répond sur WhatsApp.
            </>
          }
        />

        <div className="relative bleed grid grid-cols-1 lg:grid-cols-3">
          <span className="line-x top-0" />
          <span className="line-x bottom-0" />

          {/* Lead form → WhatsApp */}
          <Reveal className="relative flex flex-col gap-8 p-5 lg:p-10">
            <span className="line-y right-0 hidden lg:block" />
            <div className="flex flex-col gap-4">
              <p className="body-lg">Démarrer mon projet</p>
              <p className="body-md text-white/60">
                Laissez vos coordonnées : un conseiller reprend la conversation sur WhatsApp, même après la fermeture.
              </p>
            </div>
            <LeadForm source="contact" />
            <a
              href={waLink(settings.defaultMessage, { src: "contact-direct" })}
              target="_blank"
              rel="noopener noreferrer"
              className="button-sm inline-flex items-center justify-center gap-2 text-white/60 transition-colors hover:text-white"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Ou écrire directement sur WhatsApp
            </a>
          </Reveal>

          {/* Details */}
          <Reveal delay={100} className="relative border-t border-white/10 p-5 lg:border-t-0 lg:p-10">
            <span className="line-y right-0 hidden lg:block" />
            <p className="body-lg mb-4">Agence de Bamako</p>
            <Row label="Adresse">
              {settings.address}
              <br />
              <span className="text-white/50">{settings.addressHint}</span>
            </Row>
            <Row label="Téléphone">
              <a href={`tel:${settings.phone}`} className="hover:text-accent">
                {settings.phoneDisplay}
              </a>
            </Row>
            <Row label="Email">
              <a href={`mailto:${settings.email}`} className="break-all hover:text-accent">
                {settings.email}
              </a>
            </Row>
            {settings.hours.map((h) => (
              <Row key={h.day} label={h.day}>
                {h.time}
              </Row>
            ))}
          </Reveal>

          {/* Map */}
          <Reveal delay={200} className="border-t border-white/10 p-5 lg:border-t-0 lg:p-10">
            <div className="relative h-[22rem] overflow-hidden bg-surface lg:h-full lg:min-h-[26rem]">
              <iframe
                src={settings.mapsEmbed}
                className="absolute inset-0 h-full w-full grayscale-[0.6] invert-[0.9] hue-rotate-180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation — Al Moustour Voyages"
              />
              <a
                href={settings.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary absolute bottom-4 left-4 right-4 justify-between px-5 py-3.5"
              >
                <span className="button-sm">Itinéraire</span>
                <ArrowIcon />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
