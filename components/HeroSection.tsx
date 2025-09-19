"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Globe, Users, Award } from "lucide-react";

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Réalisez vos rêves d'études à l'international",
      subtitle:
        "Votre partenaire de confiance pour étudier dans les meilleures universités du monde",
      image:
        "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
    },
    {
      title: "Accompagnement personnalisé",
      subtitle:
        "De l'inscription à l'obtention du visa, nous vous accompagnons à chaque étape",
      image:
        "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
    },
    {
      title: "Achat & Réservation de Billets d'Avion",
      subtitle:
        "Trouvez et réservez facilement vos billets d'avion au meilleur prix pour vos voyages",
      image: "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
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
      className="relative h-screen overflow-hidden pt-32 md:pt-10"
    >
      {/* Background Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 174, 239, 0.7), rgba(0, 0, 0, 0.5)), url(${slide.image})`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards] ">
            {slides[currentSlide].title}
          </h1>

          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-0 animate-[fadeInUp_1s_ease-out_0.7s_forwards]">
            {slides[currentSlide].subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center opacity-0 animate-[fadeInUp_1s_ease-out_0.9s_forwards]">
            <button
              onClick={scrollToContact}
              className="bg-[#00AEEF] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-2 group"
            >
              Contactez-nous
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform duration-300"
                size={20}
              />
            </button>

            <button
              onClick={scrollToServices}
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#00AEEF] transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Nos Services
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 opacity-0 animate-[fadeInUp_1s_ease-out_1.1s_forwards]">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <Users className="text-white" size={32} />
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Étudiants accompagnés</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <Globe className="text-white" size={32} />
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">7+</div>
              <div className="text-lg opacity-90">Destinations</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <Award className="text-white" size={32} />
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-lg opacity-90">Taux de réussite</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            title={`Aller à la diapositive ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Découvrir</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
