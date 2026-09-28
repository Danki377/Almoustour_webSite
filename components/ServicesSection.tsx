import { ParallaxImage } from "@/components/scroll/ParallaxImage";
import Link from "next/link";
import { Head } from "@/components/Head";
import { Reveal } from "@/components/Reveal";
import { SERVICES } from "@/lib/site";

const COUNTS: Record<string, string> = {
  billetterie: "/ Monde entier",
  "accompagnement-etudiant": "/ 8 pays",
  "visa-et-immigration": "/ 12+ pays",
};

export function ServicesSection() {
  return (
    <section id="services" className="section-y overflow-hidden">
      <div className="container-v">
        <Head
          label="Services"
          title={
            <>
              Billets, études et visas vers plus <br className="hidden lg:block" />
              de 12 pays depuis Bamako. <br className="hidden lg:block" />
              À vous de choisir.
            </>
          }
        />

        <div className="relative bleed">
          <span className="line-x top-0" />
          <span className="line-x bottom-0" />
          <div className="no-scrollbar flex overflow-x-auto lg:grid lg:grid-cols-3 lg:overflow-visible">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 100} className="relative w-[21.25rem] shrink-0 lg:w-auto">
                <Link href={s.href} className="group flex flex-col gap-6 p-5 lg:gap-10 lg:p-10">
                  <div className="flex items-baseline gap-1.5">
                    <span className="body-lg font-semibold transition-colors group-hover:text-accent">{s.title}</span>
                    <span className="body-md text-white/50">{COUNTS[s.slug]}</span>
                  </div>
                  <ParallaxImage
                    src={s.image}
                    alt={s.title}
                    sizes="(max-width: 1024px) 340px, 33vw"
                    amount={10}
                    className="aspect-[400/437] w-full bg-surface"
                    imageClassName="transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                {i < SERVICES.length - 1 && <span className="line-y right-0" />}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
