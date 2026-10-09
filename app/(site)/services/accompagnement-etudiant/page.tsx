import { BookOpen, FileText, Plane, ShieldCheck, Wallet } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PageIntro } from "@/components/PageIntro";
import { CtaBanner } from "@/components/CtaBanner";
import { Head, HeadSplit } from "@/components/Head";
import { Reveal } from "@/components/Reveal";
import { StudyExplorer } from "@/components/StudyExplorer";
import { getSiteContent } from "@/lib/content/server";

const waMsg = "Bonjour Al-Moustour, je souhaite être accompagné pour mes études à l'étranger.";

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

export default async function AccompagnementPage() {
  const { destinations } = await getSiteContent();
  const scholarships = destinations.filter((d) => d.scholarship).length;

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
        service="accompagnement-etudiant"
        facts={[
          { value: String(destinations.length), label: "Pays de destination" },
          { value: "8+", label: "Années d'expérience" },
          { value: "100+", label: "Étudiants satisfaits" },
          { value: String(scholarships), label: "Pays avec bourse" },
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

      <StudyExplorer waMsg={waMsg} />

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
        service="accompagnement-etudiant"
      />

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
