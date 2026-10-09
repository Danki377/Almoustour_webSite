import { ParallaxImage } from "@/components/scroll/ParallaxImage";
import { MapPin, Quote, Star } from "lucide-react";
import { HeadLabel } from "@/components/Head";
import { Reveal } from "@/components/Reveal";
import { getSiteContent } from "@/lib/content/server";
import type { Testimonial } from "@/lib/content/types";

function Person({ t }: { t: Testimonial }) {
  return (
    <div
      tabIndex={0}
      className="group relative w-[18.75rem] shrink-0 border-y border-white/10 p-5 outline-none lg:w-auto lg:border-y-0 lg:p-10"
    >
      <div className="relative aspect-[335/340] overflow-hidden bg-surface lg:aspect-[373/387]">
        {/* Passport stamp */}
        <span className="absolute right-4 top-4 z-[1] -rotate-[9deg] rounded-[6px] border-2 border-sun bg-canvas/55 p-[3px] text-sun backdrop-blur-[2px]">
          <span className="flex flex-col items-center rounded-[3px] border border-sun/70 px-2.5 py-1 leading-none">
            <span className="text-[0.625rem] font-bold uppercase tracking-[0.18em]">{t.stampLabel}</span>
            <span className="mt-1 text-[0.5625rem] font-semibold tracking-[0.2em]">BKO → {t.code}</span>
          </span>
        </span>
        <ParallaxImage src={t.image} alt="" sizes="(max-width: 1024px) 300px, 25vw" amount={7} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 z-[1] flex flex-col gap-1">
          <span className="body-lg">{t.name}</span>
          <span className="body-sm text-white/80">{t.program}</span>
        </div>

        {/* Detail card (hover / focus) */}
        <div className="pointer-events-none absolute inset-0 z-[2] flex flex-col justify-between bg-deep p-5 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus:opacity-100 lg:p-8">
          <span className="body-sm inline-flex items-center gap-2 self-start">
            {t.country}
            <MapPin size={14} className="opacity-60" />
          </span>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="body-lg">{t.name}</span>
              <span className="body-sm">{t.program}</span>
            </div>
            <p className="body-sm text-white/60">{t.text}</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="body-sm flex items-center justify-between">
              <span>Destination :</span>
              <span>
                {t.country}
              </span>
            </div>
            <div className="body-sm flex items-center justify-between">
              <span>Note :</span>
              <span className="flex gap-0.5 text-sun">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={12} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function TestimonialsSection() {
  const { testimonials } = await getSiteContent();
  return (
    <section id="testimonials" className="overflow-hidden pb-8 pt-16 lg:py-20">
      <div className="relative flex flex-col-reverse lg:grid lg:grid-cols-2">
        <span className="line-x top-0 hidden lg:block" />
        <span className="line-x bottom-0 hidden lg:block" />
        <span className="line-y left-1/2 hidden -translate-x-1/2 lg:block" />

        {/* People */}
        <div className="relative">
          <span className="line-y left-1/2 hidden -translate-x-1/2 lg:block" />
          <span className="line-x top-1/2 hidden lg:block" />
          <div className="no-scrollbar flex overflow-x-auto lg:grid lg:grid-cols-2 lg:overflow-visible">
            {testimonials.map((t) => (
              <Person key={t.id} t={t} />
            ))}
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col lg:grid lg:grid-rows-2">
          <Reveal className="flex flex-col gap-5 px-5 pb-8 lg:p-10">
            <HeadLabel>Témoignages</HeadLabel>
            <h2 className="h2">
              Plus de 500 étudiants <br className="hidden lg:block" />
              accompagnés vers l&apos;étranger
            </h2>
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-1 items-end gap-8 px-5 pb-8 lg:grid-cols-2 lg:gap-0 lg:px-10 lg:pb-14">
            <div className="flex h-full flex-col justify-between gap-6">
              <Quote className="h-4 w-4 opacity-30" />
              <div className="flex flex-col gap-4">
                <p className="body-lg">4.9/5 de note moyenne</p>
                <p className="body-md text-white/60">
                  95% de nos clients recommandent nos services. <br className="hidden lg:block" />
                  Passez sur une photo pour lire leur histoire.
                </p>
              </div>
            </div>
            <p className="body-xl">
              Du Maroc au Canada, de la France à la Turquie, nos étudiants racontent un accompagnement clair,
              transparent et humain, à chaque étape.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
