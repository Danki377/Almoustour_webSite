"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BookOpen, FileText, Plane, ShieldCheck, Wallet } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PageIntro } from "@/components/PageIntro";
import { CtaBanner } from "@/components/CtaBanner";
import { Head, HeadSplit } from "@/components/Head";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { DESTINATIONS, waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const waMsg = "Bonjour Al-Moustour, je souhaite être accompagné pour mes études à l'étranger.";

/** Study details per destination (name, airport code and photo come from DESTINATIONS). */
type StudyInfo = {
  intro: string;
  procedure: string[];
  expenses: Record<string, string>;
};

const STUDY: Record<string, StudyInfo> = {
  chine: {
    intro:
      "Une expérience unique dans « l'usine du monde ». La Chine accueille plus de 500 000 étudiants internationaux et offre des universités respectées mondialement.",
    procedure: [
      "Une année de formation en langue chinoise avant de commencer le cycle universitaire.",
      "Formation en anglais (avec attestation d'anglais obtenue au Mali) pour une intégration directe.",
    ],
    expenses: {
      bourse: "3.500.000 FCFA (Tout le cycle + logement + visa)",
      private: "1.600.000 FCFA / an",
      agency: "400.000 FCFA (Bourse) / 650.000 FCFA (Privé)",
      food: "60.000 FCFA / mois (Est.)",
      housing: "60.000 FCFA / mois (Est. si privé)",
    },
  },
  russie: {
    intro:
      "Destination de choix pour un enseignement rigoureux à coût abordable. Diplômes reconnus mondialement et environnement académique de haut niveau.",
    procedure: [
      "L'agence gère tout : inscription + année de langue + visa + 1ère année de logement + accompagnement pendant tout le cycle.",
    ],
    expenses: {
      bourse: "2.500.000 FCFA (Visa + 1an logement + 1an langue + frais dossier)",
      private: "N/A",
      agency: "Inclus dans la bourse",
      food: "50.000 FCFA / mois (Est.)",
      housing: "Inclus la 1ère année",
    },
  },
  turquie: {
    intro:
      "Universités de qualité avec programmes en turc ou en anglais. Système américain (Bachelor en 4 ans) et accueil chaleureux.",
    procedure: [
      "Paiement unique pour tout le cycle (universités d'État) incluant : langue + visa + accueil + installation.",
      "Option universités privées avec frais annuels.",
    ],
    expenses: {
      bourse: "3.500.000 FCFA (Cycle complet + langue + frais agence + visa)",
      private: "1.500.000 FCFA / an",
      agency: "500.000 FCFA",
      food: "70.000 FCFA / mois (Est.)",
      housing: "50.000 FCFA / mois (Est.)",
    },
  },
  canada: {
    intro:
      "Sécurité, diversité et diplômes prestigieux. Le Canada offre des opportunités exceptionnelles de travail et de résidence.",
    procedure: [
      "Bien choisir son programme",
      "Vérifier les conditions spécifiques",
      "Fournir des preuves financières solides",
      "L'expertise d'Al Moustour maximise vos chances face à la complexité du visa.",
    ],
    expenses: {
      college: "À partir de 5.000.000 FCFA / an",
      procedure: "400.000 FCFA",
      agency: "850.000 FCFA",
      food: "250.000 FCFA / mois (Est.)",
      housing: "250.000 FCFA / mois (Est.)",
    },
  },
  france: {
    intro:
      "Rejoignez les milliers d'étudiants maliens en France. Accompagnement complet de Campus France jusqu'au logement. Inscriptions dès le 1er octobre 2025.",
    procedure: [
      "Création du compte Campus France",
      "Interview",
      "Inscription à l'université",
      "Compte bloqué (5 millions FCFA remboursables si refus)",
    ],
    expenses: {
      private: "2.500.000 FCFA / an",
      procedure: "250.000 FCFA (Publique) / 750.000 FCFA (Privé)",
      agency: "650.000 FCFA (Payable après visa)",
      food: "150.000 FCFA / mois (Est.)",
      housing: "200.000 FCFA / mois (Est.)",
    },
  },
  usa: {
    intro:
      "Immersion totale dans la culture américaine. Le visa étudiant (F-1) est plus accessible qu'on ne le croit avec une préparation rigoureuse aux interviews.",
    procedure: [
      "Sélection d'une université adaptée à votre profil",
      "Obtention de l'I-20",
      "Montage de dossier optimisé pour l'entretien consulaire",
    ],
    expenses: {
      university: "10.000.000 FCFA / an",
      procedure: "650.000 FCFA",
      agency: "850.000 FCFA",
      food: "300$ / mois (Est.)",
      housing: "600$ / mois (Est.)",
    },
  },
  inde: {
    intro:
      "Excellence en informatique, ingénierie et médecine à des coûts abordables. Intégration facile et formations de renommée mondiale.",
    procedure: [
      "Le visa étudiant pour l'Inde est souvent plus simple. Nous assurons le choix de l'université, la préparation des dossiers et l'accueil.",
    ],
    expenses: {
      university: "À partir de 1.500.000 FCFA / an",
      procedure: "250.000 FCFA",
      agency: "700.000 FCFA",
      food: "50.000 FCFA / mois (Est.)",
      housing: "80.000 FCFA / mois (Est.)",
    },
  },
  maroc: {
    intro:
      "Une puissance économique africaine avec des infrastructures modernes. Système éducatif dynamique (LMD) identique au modèle français.",
    procedure: [
      "Établissements publics offrant des bourses (paiement unique pour tout le cycle)",
      "Établissements privés spécialisés",
    ],
    expenses: {
      bourse: "3.500.000 FCFA (Tout le cycle)",
      private: "1.500.000 FCFA / an",
      agency: "500.000 FCFA",
      food: "60.000 FCFA / mois (Est.)",
      housing: "60.000 FCFA / mois (Est.)",
    },
  },
};

const EXPENSE_LABELS: Record<string, string> = {
  bourse: "Offre / Bourse",
  private: "Université privée",
  college: "Collège / Université",
  university: "Université",
  procedure: "Frais de procédure",
  agency: "Frais d'agence",
  food: "Nourriture",
  housing: "Logement",
};

const FILIERES = [
  "Génie Civil", "Commerce international", "Management", "Génie industriel", "Droit", "Économie",
  "Génie électrique", "Électronique", "Génie informatique", "Business Administration", "Génie mécanique",
  "Architecture", "MBA", "Journalisme", "Finance", "Relations Internationales", "Logistique", "Banque",
  "Sciences politiques", "Histoire", "Théologie", "Archéologie", "Philosophie", "Mines", "Géologie",
  "Sociologie", "Médecine", "Pharmacie", "Biologie Moléculaire", "Génétique", "Agriculture", "Environnement",
  "Psychologie", "Art et Science", "Langues & Civilisation",
];

const COMMITMENTS = [
  {
    icon: BookOpen,
    title: "Inscriptions stratégiques",
    text: "Choix de l'université (publique ou privée) et obtention de bourses partielles.",
  },
  {
    icon: FileText,
    title: "Expertise visa",
    text: "Montage minutieux de votre dossier pour maximiser les chances d'acceptation.",
  },
  {
    icon: Plane,
    title: "Installation sereine",
    text: "Accueil à l'arrivée et assistance pour les dossiers de séjour et le logement.",
  },
];

const TRUST = [
  {
    icon: FileText,
    title: "Contrat officiel",
    text: "Chaque accompagnement est encadré par un contrat en bonne et due forme, signé physiquement dans nos bureaux à Bamako.",
  },
  {
    icon: ShieldCheck,
    title: "Paiement sur résultats",
    text: "Notre rémunération d'agence n'est exigée qu'une fois votre visa obtenu. Nous partageons votre objectif de réussite.",
  },
  {
    icon: Wallet,
    title: "Transparence totale",
    text: "Aucun frais caché. Tous les coûts (inscription, logement, repas, agence) sont détaillés avant le début de votre procédure.",
  },
];

export default function AccompagnementPage() {
  const [activeId, setActiveId] = useState(DESTINATIONS[0].id);
  const country = DESTINATIONS.find((d) => d.id === activeId) ?? DESTINATIONS[0];
  const study = STUDY[country.id];

  // Deep-link from the homepage cards (/services/accompagnement-etudiant#france)
  useEffect(() => {
    const syncFromHash = () => {
      const id = window.location.hash.replace("#", "");
      if (id in STUDY) {
        setActiveId(id);
        document.getElementById("explorer")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  return (
    <main className="min-h-screen overflow-x-clip">
      <Navigation />

      <PageIntro
        label="Études à l'étranger"
        title={
          <>
            Étudier à l&apos;étranger, <br className="hidden lg:block" />
            de A à Z
          </>
        }
        lead="Plus de 8 ans d'expertise dans l'assistance des étudiants maliens. Transformez votre rêve d'étudier à l'étranger en réalité concrète."
        image="/images/etudiant.jpg"
        imageAlt="Étudiante souriante sur un campus universitaire"
        cta="Commencer mon projet"
        waMsg={waMsg}
        facts={[
          { value: "8", label: "Pays de destination" },
          { value: "8+", label: "Années d'expérience" },
          { value: "100+", label: "Étudiants satisfaits" },
          { value: "4", label: "Pays avec bourse" },
        ]}
      />

      {/* Commitments */}
      <section className="section-y">
        <div className="container-v">
          <Head
            label="Notre engagement"
            title={
              <>
                Sécuriser votre admission, <br className="hidden lg:block" />
                optimiser votre visa.
              </>
            }
            lead="Seuls le Maroc, la France et la région du Québec au Canada étudient en français. Pour les autres destinations, une formation en langue est prévue."
          />
          <div className="grid grid-cols-2 gap-x-6 gap-y-16 lg:grid-cols-4">
            {COMMITMENTS.map((c, i) => (
              <Reveal key={c.title} delay={i * 90} className="flex flex-col gap-10 lg:gap-[8.375rem]">
                <div className="flex items-start gap-3">
                  <c.icon className="h-[3.0625rem] w-[3.0625rem] text-accent" strokeWidth={1.1} />
                  <span className="text-[0.625rem] font-semibold text-white/50">0{i + 1}</span>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="body-md">{c.title}</p>
                  <p className="body-md text-white/50">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Destination explorer */}
      <section id="explorer" className="section-y">
        <div className="container-v">
          <HeadSplit
            title={
              <>
                Frais et procédures <br className="hidden lg:block" />
                par pays
              </>
            }
            description="Informations réelles et transparence totale sur les procédures et les frais, pays par pays."
          />

          <div role="tablist" aria-label="Pays" className="no-scrollbar bleed flex gap-2 overflow-x-auto px-5 pb-6 lg:px-10">
            {DESTINATIONS.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={c.id === activeId}
                onClick={() => setActiveId(c.id)}
                className={cn(
                  "button-sm flex shrink-0 items-center gap-2 rounded-full px-5 py-3.5 transition-colors duration-200",
                  c.id === activeId ? "bg-white text-surface" : "bg-surface text-white hover:bg-accent hover:text-surface"
                )}
              >
                {c.country}
              </button>
            ))}
          </div>

          <div key={country.id} className="relative bleed grid grid-cols-1 lg:grid-cols-2">
            <span className="line-x top-0" />
            <span className="line-x bottom-0" />
            <span className="line-y left-1/2 hidden -translate-x-1/2 lg:block" />

            {/* Left: visual + intro */}
            <div className="animate-fade-up flex flex-col gap-8 p-5 lg:p-10">
              <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                <Image
                  src={country.image}
                  alt={`Étudier en ${country.country}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <span className="h3">{country.country}</span>
                  <span className="title-xs text-white/70">BKO → {country.code}</span>
                </div>
              </div>
              <p className="body-xl">{study.intro}</p>
            </div>

            {/* Right: procedure + fees */}
            <div className="animate-fade-up flex flex-col justify-between gap-10 border-t border-white/10 p-5 [animation-delay:120ms] lg:border-t-0 lg:p-10">
              <div className="flex flex-col gap-10">
                <div>
                  <p className="body-lg mb-4">Procédure</p>
                  <ol className="flex flex-col">
                    {study.procedure.map((s, i) => (
                      <li key={s} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-2 border-b border-white/10 py-3 last:border-b-0">
                        <span className="title-xs pt-1 text-white/50">0{i + 1}</span>
                        <span className="body-md">{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <p className="body-lg mb-4 flex items-center gap-2">
                    <Wallet size={16} className="text-accent" />
                    Frais détaillés
                  </p>
                  <dl className="flex flex-col">
                    {Object.entries(study.expenses).map(([key, value]) => (
                      <div key={key} className="flex items-start justify-between gap-6 border-b border-white/10 py-3 last:border-b-0">
                        <dt className="title-xs pt-0.5 text-white/60">{EXPENSE_LABELS[key] ?? key}</dt>
                        <dd className="body-md text-right font-semibold">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <p className="body-sm flex items-start gap-3 text-white/60">
                  <ShieldCheck size={16} className="mt-0.5 shrink-0 text-accent" />
                  Les frais d&apos;agence sont payables uniquement après obtention du visa. Un contrat signé à
                  l&apos;agence formalise votre procédure.
                </p>
                <a
                  href={waLink(`${waMsg} (${country.country})`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full justify-between py-5 pl-5 pr-[1.03rem]"
                >
                  <span className="button-sm">Ouvrir mon dossier {country.country}</span>
                  <ArrowIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fields of study */}
      <section className="section-y">
        <div className="container-v">
          <Head
            label="Domaines d'études"
            title={
              <>
                Plus d&apos;une centaine <br className="hidden lg:block" />
                de filières disponibles
              </>
            }
          />
          <Reveal>
            <ul className="flex flex-wrap gap-2">
              {FILIERES.map((f) => (
                <li key={f} className="button-sm rounded-full bg-surface px-5 py-3.5 transition-colors hover:bg-accent hover:text-surface">
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Trust */}
      <section className="section-y">
        <div className="container-v">
          <HeadSplit
            title={
              <>
                Pourquoi nous <br className="hidden lg:block" />
                faire confiance
              </>
            }
            description="Un cadre clair, des coûts détaillés et une rémunération liée à votre réussite."
          />
          <div className="relative bleed grid grid-cols-1 lg:grid-cols-3">
            <span className="line-x top-0" />
            <span className="line-x bottom-0" />
            {TRUST.map((t, i) => (
              <Reveal
                key={t.title}
                delay={i * 90}
                className="relative flex flex-col gap-10 border-t border-white/10 p-5 first:border-t-0 lg:gap-24 lg:border-t-0 lg:p-10"
              >
                {i > 0 && <span className="line-y left-0 hidden lg:block" />}
                <t.icon className="h-[3.0625rem] w-[3.0625rem] text-accent" strokeWidth={1.1} />
                <div className="flex flex-col gap-4">
                  <p className="h4">{t.title}</p>
                  <p className="body-md text-white/60">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={
          <>
            Votre projet d&apos;études <br className="hidden lg:block" />
            commence maintenant
          </>
        }
        text="Passez à l'agence à Bamako (Sotuba ACI) ou écrivez-nous pour recevoir tous les détails et réponses à vos questions."
        cta="Discuter avec un conseiller"
        waMsg={waMsg}
      />

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
