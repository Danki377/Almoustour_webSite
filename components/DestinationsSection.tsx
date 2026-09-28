import { DestinationMap } from "@/components/DestinationMap";
import { Head } from "@/components/Head";
import { Reveal } from "@/components/Reveal";

export function DestinationsSection() {
  return (
    <section id="pays" className="section-y relative overflow-hidden">
      <div className="container-v">
        <Head
          label="Pays"
          title="Explorez par destination"
          className="lg:mb-4"
          lead={
            <>
              Trouvez votre prochaine étape : l&apos;Europe avec la France, la Turquie et la Russie,{" "}
              <br className="hidden lg:block" />
              l&apos;Amérique du Nord avec le Canada et les USA, l&apos;Asie avec la Chine et l&apos;Inde,{" "}
              <br className="hidden lg:block" />
              et le Maghreb avec le Maroc. Survolez un pays pour découvrir nos offres.
            </>
          }
        />
      </div>

      <Reveal>
        <DestinationMap />
      </Reveal>
    </section>
  );
}
