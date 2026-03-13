"use client";

import { Plane, GraduationCap, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

const WA_NUMBER = "22373711111";

const services = [
  {
    icon: Plane,
    tag: "Voyage",
    title: "Billetterie d'Avion",
    description:
      "Billets d'avion vers le monde entier — Europe, Amériques, Asie, Afrique, Moyen-Orient. Nous comparons les meilleures offres pour vous garantir le meilleur tarif.",
    details: ["Europe, Amériques, Asie, Afrique, Moyen-Orient", "Tarifs compétitifs & billets étudiants", "Réponse rapide sur WhatsApp"],
    slug: "billetterie",
    accent: "bg-sky-500",
  },
  {
    icon: GraduationCap,
    tag: "Éducation",
    title: "Accompagnement Étudiant",
    description:
      "De l'université au visa, nous gérons tout votre dossier. France, Canada, Turquie, Chine, Russie, Maroc, Inde, USA.",
    details: ["Choix université & dossier", "Préparation visa", "Suivi tout au long du cycle"],
    slug: "accompagnement-etudiant",
    accent: "bg-indigo-500",
  },
  {
    icon: MapPin,
    tag: "Administratif",
    title: "Assistance Visa",
    description:
      "Rendez-vous consulaires et montage de dossiers pour 12+ pays. Délais rapides, tarifs transparents, sans mauvaises surprises.",
    details: ["Allemagne, Canada, USA, Dubai…", "Tarifs officiels", "Délais garantis"],
    slug: "visa-et-immigration",
    accent: "bg-violet-500",
  },
];

export function ServicesSection() {
  const handleWhatsAppGeneral = () => {
    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour Al-Moustour, j'ai une question spécifique concernant vos services.")}`,
      "_blank"
    );
  };

  return (
    <section id="services" className="py-32 bg-white relative overflow-hidden">
      {/* Decorative Background Text — Luxury Editorial Feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.02]">
        <span className="text-[25vw] font-black tracking-tighter leading-none">
          SERVICES
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header — Refined & Bold */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-xl">
              <span className="inline-block text-[#00AEEF] text-xs font-black uppercase tracking-[0.3em] mb-4">
                Nos Expertises
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-none mb-6">
                Des Solutions <br /> Sur Mesure.
              </h2>
            </div>
            <p className="text-slate-500 max-w-sm text-base md:text-lg leading-relaxed border-l-2 border-slate-100 pl-6 py-2">
              Voyages, études ou visas — nous transformons vos projets internationaux en réalités concrètes et sécurisées.
            </p>
          </div>
        </div>

        {/* Cards Grid — Custom Pro Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="group flex flex-col bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-[2rem] overflow-hidden hover:border-[#00AEEF]/40 hover:shadow-[0_20px_50px_rgba(0,174,239,0.08)] transition-all duration-500"
            >
              {/* Top accent bar */}
              <div className={`h-1 w-full ${service.accent}`} />

              <div className="p-10 flex flex-col flex-1 relative">
                {/* Numeric Indicator — Subtle Luxury Detail */}
                <span className="absolute top-10 right-10 text-5xl font-black text-slate-50 italic opacity-[0.05] group-hover:opacity-10 transition-opacity">
                  0{index + 1}
                </span>

                {/* Icon row */}
                <div className="mb-10 text-[#00AEEF] bg-[#00AEEF]/5 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-[#00AEEF] group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                  <service.icon
                    size={28}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 leading-relaxed mb-8 flex-1">
                  {service.description}
                </p>

                {/* Details list — More refined */}
                <ul className="space-y-3 mb-10">
                  {service.details.map((d, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-semibold group/item">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover/item:bg-[#00AEEF] transition-colors" />
                      {d}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-auto relative overflow-hidden group/btn w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-4 rounded-2xl text-sm transition-all duration-300 hover:bg-[#00AEEF] hover:shadow-xl hover:shadow-[#00AEEF]/20 active:scale-95"
                >
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-25deg] -translate-x-full group-hover/btn:animate-[shine_0.75s_ease-in-out]" />
                  
                  En savoir plus
                  <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA — Direct Link */}
        <div className="mt-16 bg-slate-950 rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00AEEF]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Une question spécifique ?
            </h3>
            <p className="text-slate-400 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed font-light">
              Nos conseillers sont à votre disposition pour vous guider personnellement dans votre projet.
            </p>
            <button
              onClick={handleWhatsAppGeneral}
              className="relative overflow-hidden group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-black px-12 py-5 rounded-2xl text-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-2xl shadow-green-600/30 ring-4 ring-white/5 hover:ring-green-400/30"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-25deg] -translate-x-full group-hover:animate-[shine_0.75s_ease-in-out]" />
              
              Discutez avec nous
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
