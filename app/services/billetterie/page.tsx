import { CreditCard, Headphones, Luggage, ShieldCheck } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PageIntro } from "@/components/PageIntro";
import { CtaBanner } from "@/components/CtaBanner";
import { Head, HeadSplit } from "@/components/Head";
import { Reveal } from "@/components/Reveal";

const waMsg = "Bonjour Al-Moustour, je souhaite réserver un billet d'avion. Pouvez-vous m'aider ?";

const FEATURES = [
  { icon: Luggage, title: ["Tarifs", "étudiants"], text: "Tarifs préférentiels pour étudiants (bagages inclus)." },
  { icon: ShieldCheck, title: ["Assistance", "complète"], text: "Assistance complète avant et après le départ." },
  { icon: CreditCard, title: ["Paiement", "facilité"], text: "Facilités de paiement disponibles." },
  { icon: Headphones, title: ["Changements &", "annulations"], text: "Gestion des changements et annulations." },
];

const REGIONS = [
  { name: "Europe", note: "Paris, Istanbul, Moscou…" },
  { name: "Amériques", note: "Montréal, New York…" },
  { name: "Asie", note: "Pékin, New Delhi…" },
  { name: "Afrique", note: "Casablanca et tout le continent" },
  { name: "Moyen-Orient", note: "Dubaï, Djeddah…" },
];

export default function BilletteriePage() {
  return (
    <main className="min-h-screen overflow-x-clip">
      <Navigation />

      <PageIntro
        label="Billetterie d'avion"
        title={
          <>
            Le monde entier, <br className="hidden lg:block" />
            au meilleur tarif
          </>
        }
        lead="Réservez vos vols au meilleur prix depuis Bamako vers toutes les destinations mondiales. Nous comparons les offres des compagnies majeures pour vous."
        image="/images/billetterie.jpg"
        imageAlt="Vue d'un hublot d'avion au coucher du soleil"
        cta="Réserver sur WhatsApp"
        waMsg={waMsg}
        facts={[
          { value: "5", label: "Régions du monde" },
          { value: "8+", label: "Années d'expérience" },
          { value: "500+", label: "Clients accompagnés" },
          { value: "6j/7", label: "Disponibilité" },
        ]}
      />

      <section className="section-y">
        <div className="container-v">
          <Head
            label="Le monde à votre portée"
            title={
              <>
                Nous comparons, <br className="hidden lg:block" />
                vous voyagez.
              </>
            }
            lead="Al Moustour Voyages vous accompagne dans la recherche et la réservation de vos billets d'avion, avec les compagnies aériennes majeures."
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

      <section className="section-y">
        <div className="container-v">
          <HeadSplit
            title={
              <>
                Départs depuis <br className="hidden lg:block" />
                Bamako
              </>
            }
            description="Aller simple ou aller-retour, vers toutes les régions du monde. Indiquez vos dates et votre destination, nous revenons avec les meilleures options."
          />
          <ul className="bleed border-t border-white/10">
            {REGIONS.map((r, i) => (
              <Reveal key={r.name} delay={i * 60}>
                <li className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-4 border-b border-white/10 px-5 py-6 lg:grid-cols-[22.5%_minmax(0,1fr)_auto] lg:gap-8 lg:px-10 lg:py-8">
                  <span className="title-xs text-white/50">0{i + 1}</span>
                  <span className="h4">{r.name}</span>
                  <span className="body-md col-start-2 text-white/60 lg:col-start-auto">{r.note}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner
        title={
          <>
            Votre prochain vol <br className="hidden lg:block" />
            commence ici
          </>
        }
        text="Contactez-nous sur WhatsApp pour obtenir un devis personnalisé en fonction de vos dates et de votre destination."
        cta="Obtenir mon devis"
        waMsg={waMsg}
      />

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
