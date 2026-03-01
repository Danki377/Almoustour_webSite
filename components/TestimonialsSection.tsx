"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Oumar Touré",
    program: "Spécialisation en Médecine",
    university: "Maroc",
    rating: 5,
    text: "L'agence m'a accompagné pour mon admission en faculté de médecine au Maroc. Démarches claires et transparentes. Une agence vraiment fiable à Bamako ! Je recommande vivement leurs services.",
    flag: "🇲🇦",
  },
  {
    name: "Awa Sidibé",
    program: "Licence en Économie",
    university: "Canada",
    rating: 5,
    text: "Je n'y croyais pas, mais AL MOUSTOUR a géré tout mon dossier d'admission au Canada et m'a préparé pour l'entrevue. Aujourd'hui, j'y suis pour mes études. Merci infiniment à toute l'équipe !",
    flag: "🇨🇦",
  },
  {
    name: "Mamadou Konaté",
    program: "Master en Informatique",
    university: "France",
    rating: 5,
    text: "La procédure Campus France nous effraie souvent, mais avec l'équipe de cette agence, j'ai été super bien orienté, du choix de la formation jusqu'au visa et à la réservation de mon billet.",
    flag: "🇫🇷",
  },
  {
    name: "Fatoumata Diarra",
    program: "Licence en Gestion",
    university: "Turquie",
    rating: 5,
    text: "J'ai obtenu mon visa d'études pour la Turquie en un temps record ! L'équipe est non seulement très professionnelle, mais ils m'ont même aidée à trouver un logement proche de mon campus.",
    flag: "🇹🇷",
  },
  {
    name: "Abdoulaye Keïta",
    program: "Cycle d'Ingénieur",
    university: "Tunisie",
    rating: 5,
    text: "Excellente agence à Bamako. J'ai eu mon admission dans une belle école d'ingénieurs tunisienne. Ils s'occupent de vous à chaque étape comme si vous étiez de leur propre famille.",
    flag: "🇹🇳",
  }
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-24 bg-white border-t border-slate-100"
    >


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ce que disent nos <span className="text-[#00AEEF]">étudiants</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les témoignages de nos étudiants qui ont réalisé leurs
            rêves grâce à notre accompagnement
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00AEEF] to-blue-600 mx-auto mt-8"></div>
        </div>

        {/* Testimonial Continuous Marquee */}
        <div className="relative mt-12 pb-16">
          {/* Gradient Edges to make it look like they appear from nowhere */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-gray-50/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-blue-50/90 to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden group">
            <div className="flex gap-6 items-stretch animate-marquee whitespace-normal min-w-max">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={index} className="w-[300px] md:w-[450px] flex-none">
                  <div className="bg-slate-50 rounded-2xl p-8 h-full shadow-sm hover:shadow-md border border-slate-100 transition-all duration-300 relative overflow-hidden group/card flex flex-col">
                    {/* Quotation shape in background */}
                    <Quote className="absolute right-4 top-4 text-blue-50 opacity-50 scale-[3] transform rotate-12 transition-transform group-hover/card:scale-[4] duration-500" />

                    <div className="relative z-10 flex-grow">
                      {/* Stars */}
                      <div className="flex justify-start mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="text-amber-400 fill-current" size={18} />
                        ))}
                      </div>

                      {/* Text */}
                      <blockquote className="text-gray-700 leading-relaxed mb-8 italic">
                        "{testimonial.text}"
                      </blockquote>
                    </div>

                    {/* Author Info */}
                    <div className="relative z-10 flex items-center justify-start gap-4 mt-auto pt-6 border-t border-gray-100">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00AEEF] to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-md ring-4 ring-blue-50">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-gray-900 leading-tight">
                            {testimonial.name}
                          </h4>
                          <span className="text-lg">{testimonial.flag}</span>
                        </div>
                        <p className="text-[#00AEEF] text-sm font-semibold mt-0.5">
                          {testimonial.program}
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">
                          {testimonial.university}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global style for animation */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}} />

        {/* Stats */}
        <div className="mt-20 bg-slate-900 border border-slate-800 rounded-2xl p-12 text-white text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-blue-100">Note moyenne</div>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-400 fill-current"
                    size={16}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Avis clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Recommandent nos services</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
