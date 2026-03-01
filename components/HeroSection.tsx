"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Shield, Star, Users, Globe } from "lucide-react";

const WA_NUMBER = "22373711111";

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Réservez vos billets d'avion au meilleur prix",
      subtitle:
        "Départ depuis Bamako vers toutes les destinations mondiales. Assistance complète, tarifs compétitifs, réponse rapide sur WhatsApp.",
      image:
        "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
      cta: "Réserver un billet",
      tag: "Nouveauté",
      waMsg: "Bonjour Al-Moustour, je souhaite réserver un billet d'avion.",
    },
    {
      title: "Réalisez votre rêve d'étudier à l'étranger",
      subtitle:
        "Canada, France, Turquie, Maroc, Chine, Russie, Inde, USA — Nous vous accompagnons de A à Z.",
      image:
        "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
      cta: "Commencer mon projet",
      tag: null,
      waMsg: "Bonjour Al-Moustour, je souhaite me renseigner sur les études à l'étranger.",
    },
    {
      title: "Accompagnement complet & Immigration réussie",
      subtitle:
        "Notre engagement : un suivi personnalisé de A à Z, votre inscription garantie et une assistance totale à votre arrivée.",
      image:
        "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
      cta: "Nous contacter",
      tag: null,
      waMsg: "Bonjour Al-Moustour, je veux en savoir plus sur vos services.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const openWhatsApp = (msg: string) => {
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative h-[100dvh] overflow-hidden">
      {/* Background Slides */}
      <div className="absolute inset-0 bg-black">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className={`object-cover transition-transform duration-[10000ms] ease-linear ${index === currentSlide ? "scale-110" : "scale-100"
                  }`}
                priority={index === 0}
                quality={90}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-[#00AEEF]/20 rounded-lg px-3 py-1.5 mb-6 sm:mb-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
              <Shield size={12} className="text-[#00AEEF]" />
              <span className="text-white/80 text-[10px] sm:text-xs font-semibold uppercase tracking-widest">Expertise & Confiance depuis 8 ans</span>
            </div>

            <div className="overflow-hidden mb-6">
              <h1 className="text-[11vw] sm:text-6xl xl:text-7xl font-black text-white leading-[1.1] drop-shadow-2xl opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
                {slides[currentSlide].title}
              </h1>
            </div>

            <p className="text-base sm:text-xl text-slate-100 mb-8 sm:mb-10 max-w-2xl font-light leading-relaxed opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
              {slides[currentSlide].subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards] max-w-sm sm:max-w-none">
              <button
                onClick={() => openWhatsApp(slides[currentSlide].waMsg)}
                className="bg-[#25D366] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#1ebd5a] transition-all duration-300 transform active:scale-95 shadow-2xl shadow-green-500/20 flex items-center justify-center gap-3 group ring-4 ring-transparent hover:ring-green-400/30"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {slides[currentSlide].cta}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </button>

              <button
                onClick={() => scrollToSection("destinations")}
                className="bg-slate-900 border border-white/10 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-800 active:scale-95 transition-all duration-300"
              >
                Explorer pays
              </button>
            </div>

            {/* Stats Bar - Hidden on mobile, visible on desktop */}
            <div className="hidden md:grid mt-16 pt-8 border-t border-white/10 grid-cols-4 gap-6 opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
              {[
                { icon: Users, value: "500+", label: "Étudiants" },
                { icon: Globe, value: "8", label: "Destinations" },
                { icon: Star, value: "8+", label: "Années" },
                { icon: Shield, value: "100%", label: "Succès" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-white/5 p-2 rounded-xl flex-shrink-0">
                    <stat.icon className="text-[#00AEEF]" size={20} />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white leading-none">{stat.value}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-1">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 sm:bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Diapositive ${index + 1}`}
            className={`h-1 rounded-full transition-all duration-500 ${index === currentSlide ? "w-8 bg-[#00AEEF]" : "w-3 bg-white/30 hover:bg-white/70"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
