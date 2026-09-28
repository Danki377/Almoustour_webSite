"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { HeadSplit } from "@/components/Head";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Quelles destinations proposez-vous pour les études ?",
    a: "Nous accompagnons les étudiants vers la France, le Canada, la Turquie, le Maroc, la Chine, la Russie, l'Inde et les USA.",
  },
  {
    q: "Comment obtenir un tarif étudiant pour mon billet d'avion ?",
    a: "Il suffit de nous présenter votre attestation d'inscription ou votre carte d'étudiant en cours de validité lors de votre réservation.",
  },
  {
    q: "Quel est votre taux de réussite pour les demandes de visa ?",
    a: "Grâce à notre expertise technique, nous affichons des taux de réussite élevés (jusqu'à 100% pour certaines destinations comme le Maroc ou la Chine).",
  },
  {
    q: "Proposez-vous des bourses d'études ?",
    a: "Oui, nous avons des programmes de bourses disponibles pour la Chine, la Russie, la Turquie et le Maroc couvrant souvent le logement et le cycle d'étude.",
  },
  {
    q: "Comment se passe l'accompagnement Campus France ?",
    a: "Nous gérons l'intégralité de votre compte, de la création du dossier à la préparation intensive pour l'entretien consulaire.",
  },
  {
    q: "Où se trouve votre agence à Bamako ?",
    a: "Notre agence est située à Sotuba ACI, Avenue de l'Armée, juste à côté du 3ème pont.",
  },
  {
    q: "Quels sont vos horaires d'ouverture ?",
    a: "Nous vous accueillons du lundi au samedi, de 08h30 à 18h30. Support WhatsApp disponible 7j/7.",
  },
  {
    q: "Est-il possible de payer en plusieurs fois ?",
    a: "Pour certains services d'accompagnement, des facilités de paiement peuvent être discutées avec nos conseillers.",
  },
];

export function FAQSection() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(0);

  const q = query.trim().toLowerCase();
  const items = FAQS.map((f, i) => ({ ...f, i })).filter((f) => !q || `${f.q} ${f.a}`.toLowerCase().includes(q));

  return (
    <section id="faq" className="section-y">
      <div className="container-v">
        <HeadSplit
          title={
            <>
              Questions <br className="hidden lg:block" />
              fréquentes
            </>
          }
          description="Tout ce que vous devez savoir sur nos services, en quelques lignes."
          aside={
            <label className="relative w-full lg:w-[20rem] lg:shrink-0">
              <span className="sr-only">Rechercher une question</span>
              <Search size={16} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Visa, bourse, horaires…"
                className="body-md h-12 w-full rounded-full bg-surface pl-12 pr-5 text-white outline-none ring-1 ring-transparent transition placeholder:text-white/40 focus:ring-accent"
              />
            </label>
          }
        />

        <ul className="bleed border-t border-white/10">
          {items.map((f) => {
            const isOpen = open === f.i;
            return (
              <li key={f.q} className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : f.i)}
                  aria-expanded={isOpen}
                  className="group grid w-full grid-cols-[2.5rem_minmax(0,1fr)_auto] items-start gap-4 px-5 py-6 text-left lg:grid-cols-[22.5%_minmax(0,1fr)_auto] lg:gap-8 lg:px-10 lg:py-8"
                >
                  <span className="title-xs pt-1.5 text-white/50">{String(f.i + 1).padStart(2, "0")}</span>
                  <span className={cn("body-xl transition-colors", isOpen ? "text-white" : "text-white/80 group-hover:text-white")}>
                    {f.q}
                  </span>
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300",
                      isOpen ? "rotate-45 bg-accent text-surface" : "bg-surface text-white group-hover:bg-accent group-hover:text-surface"
                    )}
                  >
                    <span className="text-lg leading-none">+</span>
                  </span>
                </button>
                <div className={cn("grid transition-[grid-template-rows] duration-500", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className="min-h-0 overflow-hidden">
                    <div className="grid grid-cols-[2.5rem_minmax(0,1fr)_2.25rem] gap-4 px-5 pb-8 lg:grid-cols-[22.5%_minmax(0,1fr)_2.25rem] lg:gap-8 lg:px-10">
                      <p className="body-md col-start-2 max-w-2xl text-white/60">{f.a}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {items.length === 0 && (
          <div className="flex flex-col items-center gap-6 py-14 text-center">
            <p className="body-lg text-white/60">Aucune question ne correspond à « {query} ».</p>
            <a
              href={waLink(`Bonjour Al-Moustour, j'ai une question : ${query}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span className="button-sm">Poser la question sur WhatsApp</span>
              <ArrowIcon />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
