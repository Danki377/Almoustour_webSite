"use client";

import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Martinez",
    program: "Master en Business Administration",
    university: "Harvard Business School, USA",
    image:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    text: "Grâce à AL MOUSTOUR, j'ai pu intégrer Harvard Business School avec une bourse complète. Leur accompagnement personnalisé et leur expertise ont été déterminants dans ma réussite. Je recommande vivement leurs services !",
    flag: "🇪🇸",
  },
  {
    name: "Ahmed Ben Ali",
    program: "Doctorat en Intelligence Artificielle",
    university: "MIT, USA",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    text: "L'équipe d'AL MOUSTOUR m'a accompagné de A à Z dans mon projet d'études au MIT. Leur réseau et leurs conseils m'ont permis d'obtenir un financement complet pour mes recherches. Une expérience exceptionnelle !",
    flag: "🇹🇳",
  },
  {
    name: "Marie Dubois",
    program: "Master en Relations Internationales",
    university: "Sciences Po Paris - Campus International",
    image:
      "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    text: "Professionnalisme, écoute et efficacité : AL MOUSTOUR a dépassé toutes mes attentes. Ils m'ont aidée à décrocher une place dans le programme de mes rêves avec une bourse d'excellence.",
    flag: "🇫🇷",
  },
  {
    name: "Adama diarra",
    program: "MBA Executive",
    university: "INSEAD, France",
    image:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    text: "After working with AL MOUSTOUR, I successfully entered INSEAD's MBA program. Their international expertise and personalized approach made all the difference. Highly recommended for ambitious students!",
    flag: "🇰🇷",
  },
  {
    name: "Fatima Haidara",
    program: "Master en Médecine",
    university: "University of Toronto, Canada",
    image:
      "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    text: "AL MOUSTOUR a transformé mon rêve en réalité. Leur expertise dans les démarches médicales canadiennes et leur soutien constant m'ont permis d'intégrer l'une des meilleures facultés de médecine au monde.",
    flag: "🇲🇦",
  },
  {
    name: "Moussa coulibaly",
    program: "Ingénieur en Informatique",
    university: "ETH Zurich, Suisse",
    image:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    text: "Thanks to AL MOUSTOUR's guidance, I'm now studying at ETH Zurich with full funding. Their team understood my goals and provided the perfect roadmap to achieve them. Absolutely outstanding service!",
    flag: "🇬🇧",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section
      id="testimonials"
      className="py-24 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Testimonial Carousel */}
        <div
          className="relative overflow-hidden rounded-3xl"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 mx-4">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Quote Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#00AEEF] to-blue-600 rounded-full flex items-center justify-center">
                        <Quote className="text-white" size={28} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left">
                      {/* Stars */}
                      <div className="flex justify-center lg:justify-start mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="text-yellow-400 fill-current"
                            size={20}
                          />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                        &ldquo;{testimonial.text}&rdquo;
                      </blockquote>

                      {/* Author Info */}
                      <div className="flex items-center justify-center lg:justify-start gap-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-gray-900 text-lg">
                              {testimonial.name}
                            </h4>
                            <span className="text-xl">{testimonial.flag}</span>
                          </div>
                          <p className="text-[#00AEEF] font-semibold">
                            {testimonial.program}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {testimonial.university}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-[#00AEEF] hover:bg-white hover:scale-110 transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-[#00AEEF] hover:bg-white hover:scale-110 transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#00AEEF] scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 bg-gradient-to-r from-[#00AEEF] to-blue-600 rounded-3xl p-12 text-white text-center">
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
