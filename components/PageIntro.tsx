import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BogolanStrip } from "@/components/BogolanStrip";
import { HeadLabel } from "@/components/Head";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { waLink } from "@/lib/site";

export function PageIntro({
  label,
  title,
  lead,
  image,
  imageAlt,
  cta,
  waMsg,
  service,
  facts,
}: {
  label: string;
  title: ReactNode;
  lead: string;
  image: string;
  imageAlt: string;
  cta: string;
  waMsg: string;
  service?: string;
  facts: { value: string; label: string }[];
}) {
  return (
    <section className="pt-[4.5rem]">
      <div className="container-v pb-10 pt-12 lg:pb-16 lg:pt-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <div className="flex flex-col gap-3 lg:w-[22.5%] lg:shrink-0">
            <HeadLabel>{label}</HeadLabel>
            <nav aria-label="Fil d'Ariane" className="title-xs text-white/40">
              <Link href="/" className="hover:text-white">
                Accueil
              </Link>{" "}
              /{" "}
              <Link href="/#services" className="hover:text-white">
                Services
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-8 lg:gap-10">
            <h1 className="animate-fade-up text-[3rem] font-semibold leading-none tracking-[-0.06em] lg:text-[7rem]">{title}</h1>
            <p className="body-xl animate-fade-up max-w-3xl [animation-delay:150ms]">{lead}</p>
            <div className="animate-fade-up [animation-delay:300ms]">
              <a href={waLink(waMsg, { src: "page-intro", service })} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <span className="button-sm">{cta}</span>
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface sm:aspect-[16/9] lg:aspect-[1440/560]">
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 backdrop-blur-[10px] lg:grid-cols-4">
          <span className="line-x top-0" />
          {facts.map((f, i) => (
            <div key={f.label} className="relative flex flex-col gap-2 p-5 lg:p-10">
              {i > 0 && <span className={i === 2 ? "line-y left-0 max-lg:hidden" : "line-y left-0"} />}
              <span className="h3 max-lg:text-3xl">{f.value}</span>
              <span className="body-sm text-white/70">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
      <BogolanStrip />
    </section>
  );
}
