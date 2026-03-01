"use client";

import { Target, Heart, Users, TrendingUp, Globe, Shield, Award } from "lucide-react";

export function AboutSection() {
  const values = [
    {
      icon: Heart,
      title: "Confiance",
      description: "Assistance à l'arrivée dans le pays d'accueil et aide à l'installation. Transparence totale sur chaque étape de votre projet.",
    },
    {
      icon: Users,
      title: "Accompagnement",
      description: "Un suivi personnalisé de A à Z — du choix de l'université à l'installation dans le pays d'accueil.",
    },
    {
      icon: Award,
      title: "Réussite",
      description: "Bourses garanties à 100% pour la Chine, la Russie, le Maroc et la Turquie. Plus de 500 étudiants satisfaits de nos services.",
    },
  ];

  const stats = [
    { number: "8+", label: "Années d'expérience" },
    { number: "500+", label: "Étudiants accompagnés" },
    { number: "8", label: "Pays partenaires" },
    { number: "90%+", label: "Taux de satisfaction" },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
            À Propos d&#39;<span className="text-[#00AEEF]">Al Moustour</span> Voyages
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#00AEEF] to-blue-600 mx-auto mb-8 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
              Votre partenaire de confiance pour réaliser vos rêves d&#39;études à l&#39;étranger
            </h3>

            <p className="text-lg text-gray-600 mb-5 leading-relaxed">
              Depuis plus de <strong>8 ans</strong>, Al Moustour Voyages accompagne les étudiants maliens ambitieux dans leur projet d&#39;études à l&#39;étranger — Chine, Russie, Turquie, Maroc, France, Canada, Inde et États-Unis.
            </p>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Plus d&#39;une centaine d&#39;étudiants affirment tous avoir été satisfaits, au-delà de leurs attentes. Nous savons combien votre projet est important — c&#39;est pourquoi nous mettons toutes les chances de votre côté.
            </p>

            {/* Mission */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-9 h-9 bg-[#00AEEF] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <Target className="text-white" size={18} />
                </div>
                <h4 className="text-xl font-bold text-gray-900">Notre Rôle</h4>
              </div>
              <ul className="space-y-2 text-gray-600">
                {[
                  "Inscription dans les meilleures universités privées ou bourses partielles",
                  "Montage de dossier minutieusement préparé",
                  "Demande et suivi du visa étudiant",
                  "Accueil à l'arrivée et assistance à l'installation",
                  "Suivi et assistance tout au long du cycle d'études",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#00AEEF] mt-2.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Trust Badge */}
            <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-5">
              <Shield className="text-green-600 mt-0.5 flex-shrink-0" size={22} />
              <div>
                <h5 className="font-bold text-green-800 mb-1">Notre engagement unique</h5>
                <p className="text-green-700 text-sm">
                  Accompagnement sérieux et professionnel, suivi personnalisé tout au long de votre parcours d&#39;études. Toutes nos inscriptions sont encadrées par nos conseillers.
                </p>
              </div>
            </div>
          </div>

          {/* Visual side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800 p-8">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { flag: "🇫🇷", country: "France", rate: "90%" },
                  { flag: "🇨🇳", country: "Chine", rate: "100%" },
                  { flag: "🇲🇦", country: "Maroc", rate: "100%" },
                  { flag: "🇹🇷", country: "Turquie", rate: "87%" },
                  { flag: "🇷🇺", country: "Russie", rate: "100%" },
                  { flag: "🇨🇦", country: "Canada", rate: "65%" },
                  { flag: "🇮🇳", country: "Inde", rate: "95%" },
                  { flag: "🇺🇸", country: "USA", rate: "80%" },
                ].map((d, i) => (
                  <div key={i} className="bg-slate-800/50 border border-white/5 rounded-xl p-4 hover:bg-slate-800 transition-all">
                    <span className="text-3xl">{d.flag}</span>
                    <div className="mt-2 text-white font-semibold text-sm">{d.country}</div>
                    <div className="text-[#00AEEF] font-bold text-xs uppercase tracking-tighter">Réussite {d.rate}</div>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
              <div className="relative text-center mt-4">
                <p className="text-white/60 text-sm">8 destinations disponibles</p>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-5 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-[#00AEEF] to-blue-600 rounded-xl flex items-center justify-center">
                  <Globe className="text-white" size={22} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">8 Pays</div>
                  <div className="text-sm text-gray-500">Destinations</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white rounded-xl p-5 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Shield className="text-white" size={22} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-500">Garanti sur bourses</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nos <span className="text-[#00AEEF]">Valeurs</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group hover:bg-gradient-to-br hover:from-[#00AEEF]/5 hover:to-blue-600/5 rounded-2xl p-8 transition-all duration-300 border border-transparent hover:border-[#00AEEF]/10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00AEEF] to-blue-600 rounded-xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="text-white" size={28} />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-slate-950 rounded-2xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-12">Nos Résultats en Chiffres</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="text-5xl md:text-6xl font-extrabold mb-2 text-[#00AEEF] group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-slate-400 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
