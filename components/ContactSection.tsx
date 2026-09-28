import { Head } from "@/components/Head";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { SERVICES, SITE, waLink } from "@/lib/site";

const HOURS = [
  { day: "Lun – Ven", time: "9h00 – 18h00" },
  { day: "Samedi", time: "Fermé" },
  { day: "Dimanche", time: "Fermé" },
];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-white/10 py-4 last:border-b-0">
      <span className="body-sm text-white/50">{label}</span>
      <span className="body-md text-right">{children}</span>
    </div>
  );
}

export function ContactSection() {
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

          {/* Choose a subject */}
          <Reveal className="relative flex flex-col justify-between gap-10 p-5 lg:p-10">
            <span className="line-y right-0 hidden lg:block" />
            <div className="flex flex-col gap-4">
              <p className="body-lg">Choisissez votre sujet</p>
              <p className="body-md text-white/60">
                Réponse directe de nos conseillers. Sur WhatsApp, ils restent disponibles même après la fermeture.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {SERVICES.map((s) => (
                <a
                  key={s.slug}
                  href={waLink(s.waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full justify-between pl-5 pr-[1.03rem]"
                >
                  <span className="button-sm">{s.title}</span>
                  <ArrowIcon />
                </a>
              ))}
              <a
                href={waLink("Bonjour Al-Moustour, je souhaite me renseigner sur vos services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa mt-2 w-full justify-center"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span className="button-sm">Écrire sur WhatsApp</span>
              </a>
            </div>
          </Reveal>

          {/* Details */}
          <Reveal delay={100} className="relative border-t border-white/10 p-5 lg:border-t-0 lg:p-10">
            <span className="line-y right-0 hidden lg:block" />
            <p className="body-lg mb-4">Agence de Bamako</p>
            <Row label="Adresse">
              {SITE.address}
              <br />
              <span className="text-white/50">{SITE.addressHint}</span>
            </Row>
            <Row label="Téléphone">
              <a href={`tel:${SITE.phone}`} className="hover:text-accent">
                {SITE.phoneDisplay}
              </a>
            </Row>
            <Row label="Email">
              <a href={`mailto:${SITE.email}`} className="break-all hover:text-accent">
                {SITE.email}
              </a>
            </Row>
            {HOURS.map((h) => (
              <Row key={h.day} label={h.day}>
                {h.time}
              </Row>
            ))}
          </Reveal>

          {/* Map */}
          <Reveal delay={200} className="border-t border-white/10 p-5 lg:border-t-0 lg:p-10">
            <div className="relative h-[22rem] overflow-hidden bg-surface lg:h-full lg:min-h-[26rem]">
              <iframe
                src={SITE.mapsEmbed}
                className="absolute inset-0 h-full w-full grayscale-[0.6] invert-[0.9] hue-rotate-180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation — Al Moustour Voyages"
              />
              <a
                href={SITE.mapsLink}
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
