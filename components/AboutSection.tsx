import Image from "next/image";
import { Head } from "@/components/Head";
import { Reveal } from "@/components/Reveal";
import { ClipReveal } from "@/components/scroll/ClipReveal";
import { SplitFlap } from "@/components/SplitFlap";
import { DESTINATIONS } from "@/lib/site";

export function AboutSection() {
  return (
    <section id="about" className="section-y">
      <div className="container-v">
        <Head
          label="À propos"
          title={
            <>
              Pas seulement des démarches, des <br className="hidden lg:block" />
              parcours qui construisent votre avenir
            </>
          }
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ClipReveal className="aspect-[4/3] bg-surface lg:aspect-auto lg:min-h-[34rem]">
            <Image
              src="/images/etudiant.jpg"
              alt="Étudiante accompagnée par Al Moustour Voyages"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </ClipReveal>

          <div className="flex flex-col gap-10">
            <Reveal delay={100}>
              <p className="body-xl text-white">
                Depuis 2016, Al Moustour Voyages redéfinit les standards de l&apos;accompagnement vers
                l&apos;international à Bamako. Fondée sur une volonté de transparence radicale, notre agence analyse
                chaque cas de manière unique pour maximiser vos chances de succès.
              </p>
            </Reveal>

            <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2">
              <Reveal delay={150} className="flex flex-col justify-between gap-8 border-b border-white/10 pb-8 lg:gap-32">
                <div className="flex flex-col gap-5">
                  <SplitFlap words={["8+"]} className="self-start text-[2.4rem]" />
                  <span className="body-lg">
                    Années
                    <br />
                    d&apos;expérience
                  </span>
                </div>
                <p className="body-md text-white/60">
                  Aucun frais caché, aucune promesse non tenue. La confiance avant tout.
                </p>
              </Reveal>

              <Reveal delay={220} className="flex flex-col justify-between gap-8 border-b border-white/10 pb-8 lg:gap-32">
                <div className="flex flex-col gap-5">
                  <SplitFlap words={["500+"]} className="self-start text-[2.4rem]" />
                  <span className="body-lg">
                    Clients
                    <br />
                    accompagnés
                  </span>
                </div>
                <div className="flex justify-between" aria-label="Destinations">
                  {DESTINATIONS.slice(0, 5).map((d) => (
                    <span key={d.id} title={d.country} className="button-sm text-white/60">
                      {d.code}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
