"use client";

import { Shield, Award, Users, Check, Globe, Sparkles, Target } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export function AboutSection() {
  const stats = [
    { target: 8, suffix: "+", label: "Années d'expérience" },
    { target: 500, suffix: "+", label: "Clients accompagnés" },
    { target: 100, suffix: "%", label: "Transparence totale" },
    { target: 6, suffix: "j/7", label: "Disponibilité" },
  ];

  const statsRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          stats.forEach((stat, i) => {
            const duration = 1500;
            const steps = 60;
            const timer = setInterval(() => {
              let step = 0;
              const interval = setInterval(() => {
                step++;
                const progress = step / steps;
                const eased = 1 - Math.pow(1 - progress, 4);
                const current = Math.round(eased * stat.target);

                setCounts(prev => {
                  const next = [...prev];
                  next[i] = current;
                  return next;
                });

                if (step >= steps) {
                  clearInterval(interval);
                  clearInterval(timer);
                }
              }, duration / steps);
            }, 0);
          });
        }
      },
      { threshold: 0.2 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [animated]);

  const qualities = [
    {
      icon: Target,
      title: "Vision & Clarté",
      desc: "Nous ne vendons pas seulement des services, nous construisons des parcours de vie sécurisés vers l'international."
    },
    {
      icon: Sparkles,
      title: "Excellence Opérationnelle",
      desc: "Chaque dossier est traité avec une rigueur absolue, garantissant des taux de réussite inégalés sur le marché."
    },
    {
      icon: Shield,
      title: "Éthique Professionnelle",
      desc: "La transparence est notre pilier. Aucun frais caché, aucune promesse non tenue. La confiance avant tout."
    }
  ];

  return (
    <section id="about" className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative luxury circles */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-50 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-100 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Editorial Layout Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-end">
          <div className="lg:col-span-8">
            <span className="inline-block text-[#00AEEF] text-xs font-black uppercase tracking-[0.3em] mb-6">
              Héritage & Valeurs
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.9] mb-0">
              Plus qu'une Agence, <br />
              <span className="text-[#00AEEF]">Votre Allié Stratégique.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 pb-2">
            <p className="text-slate-500 text-lg leading-relaxed font-medium border-l-4 border-[#00AEEF] pl-6 py-2">
              Depuis 2016, Al Moustour Voyages redéfinit les standards de l'accompagnement vers l'international à Bamako.
            </p>
          </div>
        </div>

        {/* Content Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
          {/* Left Block — Story */}
          <div className="space-y-8">
            <div className="prose prose-slate prose-lg max-w-none">
              <p className="text-slate-600 text-xl leading-loose font-light">
                Fondée sur une volonté de <span className="text-slate-900 font-bold italic">transparence radicale</span>, notre agence s'est imposée comme le choix numéro un des familles et professionnels exigeants au Mali.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                Nous ne nous contentons pas de remplir des formulaires. Nous analysons chaque cas de manière unique pour maximiser les chances de succès, que ce soit pour une <span className="text-slate-900 font-semibold underline decoration-[#00AEEF]/30">admission universitaire de prestige</span> ou un projet de voyage complexe.
              </p>
            </div>

            <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Disponibilité Totale",
                "Expertise Consulaire",
                "Suivi Post-Arrivée",
                "Réseau International"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-[#00AEEF]/10 flex items-center justify-center">
                    <Check size={14} className="text-[#00AEEF]" strokeWidth={3} />
                  </div>
                  <span className="text-slate-700 font-bold text-sm tracking-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block — Premium Values */}
          <div className="space-y-6">
            {qualities.map((q, i) => (
              <div
                key={i}
                className="group flex items-start gap-8 p-8 bg-white rounded-[2rem] border border-slate-100 hover:border-[#00AEEF]/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-500"
              >
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#00AEEF] group-hover:text-white transition-all duration-500">
                  <q.icon size={26} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">{q.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    {q.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Stats Bar — Refined Performance Overlay */}
        <div
          ref={statsRef}
          className="relative bg-slate-950 rounded-[3rem] p-1 shadow-2xl overflow-hidden"
        >
          {/* Inner glass effect */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 md:p-12 relative z-10">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter transition-transform group-hover:scale-110 duration-500">
                  {counts[i]}{stat.suffix}
                </div>
                <div className="text-[10px] md:text-xs text-[#00AEEF] font-black uppercase tracking-[0.3em] opacity-80 group-hover:opacity-100 transition-opacity">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#00AEEF]/20 rounded-full blur-[100px] -translate-y-1/2 opacity-20" />
        </div>

      </div>
    </section>
  );
}
