"use client";

import { Target, Heart, Users, TrendingUp, Globe, Star } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
  const values = [
    {
      icon: Heart,
      title: "Confiance",
      description:
        "Nous bâtissons des relations durables basées sur la transparence et l'honnêteté.",
    },
    {
      icon: Users,
      title: "Accompagnement",
      description:
        "Un suivi personnalisé et attentionné tout au long de votre parcours.",
    },
    {
      icon: TrendingUp,
      title: "Réussite",
      description:
        "Votre succès est notre priorité absolue, nous mettons tout en œuvre pour l'atteindre.",
    },
  ];

  const stats = [
    { number: "7+", label: "Années d'expérience" },
    { number: "500+", label: "Étudiants accompagnés" },
    { number: "7+", label: "Pays partenaires" },
    { number: "95%", label: "Taux de satisfaction" },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            À Propos d&#39;<span className="text-[#00AEEF]">AL MOUSTOUR</span>{" "}
            Voyages
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00AEEF] to-blue-600 mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Votre partenaire de confiance pour réaliser vos rêves d&#39;études
              à l&#39;étranger
            </h3>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Depuis plus de 7 ans, AL MOUSTOUR Voyages accompagne les étudiants
              ambitieux dans leur quête d&#39;excellence académique
              internationale. Notre expertise et notre réseau mondial nous
              permettent d&#39;ouvrir les portes des meilleures universités du
              monde.
            </p>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Nous croyons fermement que chaque étudiant mérite d&#39;accéder
              aux meilleures opportunités éducatives, peu importe son origine ou
              sa situation financière. C&#39;est pourquoi nous mettons tout en
              œuvre pour rendre l&#39;éducation internationale accessible à
              tous.
            </p>

            {/* Mission */}
            <div className="bg-gradient-to-r from-[#00AEEF]/10 to-blue-600/10 rounded-2xl p-6 border border-[#00AEEF]/20">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#00AEEF] rounded-full flex items-center justify-center mr-3">
                  <Target className="text-white" size={16} />
                </div>
                <h4 className="text-xl font-bold text-gray-900">
                  Notre Mission
                </h4>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Démocratiser l&#39;accès à l&#39;éducation internationale en
                offrant un accompagnement personnalisé, des conseils
                d&#39;experts et des solutions innovantes pour chaque étudiant.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Étudiants internationaux"
                className="w-full h-[500px] object-cover"
                width={800}
                height={500}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00AEEF] to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <Globe className="text-white" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">7+</div>
                  <div className="text-sm text-gray-600">Destinations</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center mr-4">
                  <Star className="text-white" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nos <span className="text-[#00AEEF]">Valeurs</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center group hover:bg-gradient-to-br hover:from-[#00AEEF]/5 hover:to-blue-600/5 rounded-3xl p-8 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00AEEF] to-blue-600 rounded-2xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="text-white" size={28} />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-[#00AEEF] to-blue-600 rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-12">
            Nos Résultats en Chiffres
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
