import { CalendarClock, MapPin, ShieldCheck } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PageIntro } from "@/components/PageIntro";
import { CtaBanner } from "@/components/CtaBanner";
import { Head, HeadSplit } from "@/components/Head";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { waLink } from "@/lib/site";

const waMsg = "Bonjour Al-Moustour, j'ai besoin d'informations pour une demande de visa touristique.";

const OFFERS = [
  { country: "Canada", code: "YUL", flag: "🇨🇦", service: "Visa touristique", price: "650.000 FCFA", delay: "0 à 6 mois" },
  { country: "Dubaï", code: "DXB", flag: "🇦🇪", service: "Visa express", price: "110.000 FCFA", delay: "24h à 72h" },
  { country: "Maroc", code: "CMN", flag: "🇲🇦", service: "AEVM", price: "55.000 FCFA", delay: "24h à 72h" },
  { country: "Oumra", code: "JED", flag: "🇸🇦", service: "Visa", price: "210.000 FCFA", delay: "24h à 72h" },
  { country: "Turquie", code: "IST", flag: "🇹🇷", service: "Visa touristique", price: "220.000 FCFA", delay: "0 à 30 jours" },
  { country: "Russie", code: "SVO", flag: "🇷🇺", service: "Visa touristique", price: "250.000 FCFA", delay: "0 à 2 mois" },
  { country: "USA / Europe", code: "···", flag: "🌐", service: "Rendez-vous & montage", price: "Sur devis", delay: "Variable" },
];

const FEATURES = [
  { icon: ShieldCheck, title: ["Dossiers", "sécurisés"], text: "Expertise en montage de dossier pour optimiser vos chances." },
  { icon: CalendarClock, title: ["Délais", "respectés"], text: "Suivi rigoureux des calendriers consulaires et rendez-vous." },
  { icon: MapPin, title: ["Suivi à", "l'arrivée"], text: "Conseils pour votre installation et vos premiers jours sur place." },
];

export default function VisaPage() {
  return (
    <main className="min-h-screen overflow-x-clip">
      <Navigation />

      <PageIntro
        label="Assistance visa"
        title={
          <>
            Assistance visa <br className="hidden lg:block" />& dossiers
          </>
        }
        lead="Simplifiez vos démarches pour l'obtention de vos visas vers le monde entier. Rendez-vous consulaires et montage de dossiers, tarifs publiés."
        image="/images/visa.jpg"
        imageAlt="Passeport ouvert avec tampons de visa"
        cta="Lancer ma demande"
        waMsg={waMsg}
        facts={[
          { value: "12+", label: "Pays couverts" },
          { value: "24h", label: "Délai express (Dubaï, Maroc, Oumra)" },
          { value: "8+", label: "Années d'expérience" },
          { value: "100%", label: "Tarifs transparents" },
        ]}
      />

      <section className="section-y">
        <div className="container-v">
          <HeadSplit
            title={
              <>
                Nos offres <br className="hidden lg:block" />
                visa
              </>
            }
            description="Tarifs transparents et accompagnement personnalisé, sans mauvaises surprises. Délais donnés à titre indicatif."
          />

          <div className="bleed border-t border-white/10">
            <div className="hidden grid-cols-[22.5%_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-8 border-b border-white/10 px-10 py-4 lg:grid">
              {["Destination", "Service", "Tarif", "Délai estimé"].map((h) => (
                <span key={h} className="title-xs text-white/50">
                  {h}
                </span>
              ))}
              <span className="w-[8.5rem]" />
            </div>
            {OFFERS.map((o, i) => (
              <Reveal key={o.country} delay={i * 50}>
                <div className="grid grid-cols-2 items-center gap-x-4 gap-y-4 border-b border-white/10 px-5 py-6 lg:grid-cols-[22.5%_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] lg:gap-8 lg:px-10 lg:py-8">
                  <span className="col-span-2 flex items-center gap-3 lg:col-span-1">
                    <span className="title-xs w-10 text-white/50">{o.code}</span>
                    <span className="h4">{o.country}</span>
                  </span>
                  <span className="body-md text-white/60">{o.service}</span>
                  <span className="body-lg text-right font-semibold text-accent lg:text-left">{o.price}</span>
                  <span className="body-md text-white/60">{o.delay}</span>
                  <a
                    href={waLink(`Bonjour Al-Moustour, je souhaite un visa ${o.country} (${o.service}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary justify-self-end px-5 py-3"
                  >
                    <span className="button-sm">Demander</span>
                    <ArrowIcon />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-v">
          <Head
            label="Nos engagements"
            title={
              <>
                Un dossier solide, <br className="hidden lg:block" />
                des délais tenus.
              </>
            }
          />
          <div className="grid grid-cols-2 gap-x-6 gap-y-16 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.text} delay={i * 90} className="flex flex-col gap-10 lg:gap-[8.375rem]">
                <div className="flex items-start gap-3">
                  <f.icon className="h-[3.0625rem] w-[3.0625rem] text-accent" strokeWidth={1.1} />
                  <span className="text-[0.625rem] font-semibold text-white/50">0{i + 1}</span>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="body-md">
                    {f.title[0]}
                    <br />
                    {f.title[1]}
                  </p>
                  <p className="body-md text-white/50">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={
          <>
            Prêt à voyager ? <br className="hidden lg:block" />
            Lançons votre dossier.
          </>
        }
        text="Contactez-nous sur WhatsApp pour lancer votre dossier de visa immédiatement."
        cta="Lancer ma demande"
        waMsg={waMsg}
      />

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
