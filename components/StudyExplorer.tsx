"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShieldCheck, Wallet } from "lucide-react";
import { useContent } from "@/components/ContentProvider";
import { HeadSplit } from "@/components/Head";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Country tabs with the procedure and detailed fees of each study destination. */
export function StudyExplorer({ waMsg }: { waMsg: string }) {
  const { destinations } = useContent();
  const [activeId, setActiveId] = useState(destinations[0]?.id ?? "");
  const country = destinations.find((d) => d.id === activeId) ?? destinations[0];

  // Deep-link from the homepage cards (/services/accompagnement-etudiant#france)
  useEffect(() => {
    const syncFromHash = () => {
      const id = window.location.hash.replace("#", "");
      if (destinations.some((d) => d.id === id)) {
        setActiveId(id);
        document.getElementById("explorer")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [destinations]);

  if (!country) return null;

  return (
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
          {destinations.map((c) => (
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
            <p className="body-xl">{country.intro}</p>
          </div>

          {/* Right: procedure + fees */}
          <div className="animate-fade-up flex flex-col justify-between gap-10 border-t border-white/10 p-5 [animation-delay:120ms] lg:border-t-0 lg:p-10">
            <div className="flex flex-col gap-10">
              <div>
                <p className="body-lg mb-4">Procédure</p>
                <ol className="flex flex-col">
                  {country.procedure.map((s, i) => (
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
                  {country.expenses.map((e) => (
                    <div key={e.label} className="flex items-start justify-between gap-6 border-b border-white/10 py-3 last:border-b-0">
                      <dt className="title-xs pt-0.5 text-white/60">{e.label}</dt>
                      <dd className="body-md text-right font-semibold">{e.value}</dd>
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
                href={waLink(`${waMsg} (${country.country})`, { src: "study-explorer", service: "accompagnement-etudiant", dest: country.id })}
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

  );
}
