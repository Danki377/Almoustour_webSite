"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Globe, Users, Award } from "lucide-react";

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Réalisez vos rêves d'études à l'international",
      subtitle:
        "Votre partenaire de confiance pour étudier dans les meilleures universités du monde.",
      image:
        "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
    },
    {
      title: "Accompagnement 100% Personnalisé",
      subtitle:
        "De l'inscription à l'obtention du visa, nous sommes à vos côtés à chaque étape.",
      image:
        "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
    },
    {
      title: "Voyagez en toute Sérénité",
      subtitle:
        "Trouvez et réservez facilement vos billets d'avion au meilleur prix.",
      image: "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden"
    >
      {/* Background Slides */}
      <div className="absolute inset-0 bg-black">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative w-full h-full">
               <Image 
                 src={slide.image}
                 alt={slide.title}
                 fill
                 className={`object-cover transition-transform duration-[8000ms] ease-linear ${
                   index === currentSlide ? "scale-110" : "scale-100"
                 }`}
                 priority={index === 0}
                 quality={90}
               />
               {/* Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-r from-sky-900/90 via-sky-900/60 to-transparent" />
               <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-3xl">
            <div className="overflow-hidden mb-6">
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-lg opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards]">
                {slides[currentSlide].title}
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-gray-100 mb-10 max-w-2xl font-light drop-shadow-md opacity-0 animate-[fadeInUp_1s_ease-out_0.7s_forwards]">
              {slides[currentSlide].subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-[fadeInUp_1s_ease-out_0.9s_forwards]">
              <button
                onClick={scrollToContact}
                className="bg-[#00AEEF] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[#009bd6] transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 group ring-4 ring-transparent hover:ring-[#00AEEF]/30"
              >
                Commencer maintenant
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform duration-300"
                  size={20}
                />
              </button>

              <button
                onClick={scrollToServices}
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Découvrir nos services
              </button>
            </div>

            {/* Stats - Horizontal Bar */}
            <div className="mt-16 pt-8 border-t border-white/20 flex flex-wrap gap-8 md:gap-16 opacity-0 animate-[fadeInUp_1s_ease-out_1.1s_forwards]">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
                   <Users className="text-[#00AEEF]" size={28} />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-sm text-gray-300 font-medium">Étudiants accompagnés</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
                   <Globe className="text-[#00AEEF]" size={28} />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">10+</div>
                  <div className="text-sm text-gray-300 font-medium">Pays partenaires</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
                   <Award className="text-[#00AEEF]" size={28} />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">98%</div>
                  <div className="text-sm text-gray-300 font-medium">Taux de réussite</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Aller à la diapositive ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-[#00AEEF]" : "w-4 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
