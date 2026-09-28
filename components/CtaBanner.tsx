import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { SITE, waLink } from "@/lib/site";

export function CtaBanner({ title, text, cta, waMsg }: { title: ReactNode; text: string; cta: string; waMsg: string }) {
  return (
    <section className="relative overflow-hidden">
      <Image src="/images/combine-travel.jpg" alt="Voyage et études à l'étranger" fill sizes="100vw" className="object-cover object-[70%_center]" />
      <div className="absolute inset-0 bg-canvas/60" />
      <span className="line-x top-0" />
      <span className="line-x bottom-0" />
      <div className="container-v relative flex min-h-[26rem] flex-col justify-between gap-12 py-16 lg:min-h-[34rem] lg:py-20">
        <Reveal>
          <h2 className="h2 max-w-4xl">{title}</h2>
        </Reveal>
        <Reveal delay={120} className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <p className="body-xl max-w-xl">{text}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={waLink(waMsg)} target="_blank" rel="noopener noreferrer" className="btn-primary justify-center">
              <span className="button-sm">{cta}</span>
              <ArrowIcon />
            </a>
            <a href={`tel:${SITE.phone}`} className="btn-secondary justify-center px-8 py-5">
              <span className="button-sm">{SITE.phoneDisplay}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
