"use client";

import { Shield, TrendingUp, ArrowRight } from "lucide-react";

const WA_NUMBER = "22363711111";

const destinations = [
  {
    flag: "🇫🇷",
    country: "France",
    emoji_bg: "from-blue-600 to-indigo-600",
    badge: "90% de réussite",
    badgeColor: "bg-blue-600",
    highlight: "Campus France gratuit",
    description: "Procédure Campus France + interview à l'Institut Français. Universités publiques et privées disponibles.",
    guarantee_type: "success",
    points: [
      "Universités publiques & privées",
      "Formation préparatoire à l'interview",
      "Mauvaises moyennes ? On a des recours",
      "Assistance visa complète",
    ],
    waMsg: "Bonjour Al-Moustour, je suis intéressé(e) par les études en France. Pouvez-vous me donner plus d'informations ?",
  },
  {
    flag: "🇨🇦",
    country: "Canada",
    emoji_bg: "from-red-600 to-rose-600",
    badge: "65% de réussite",
    badgeColor: "bg-rose-600",
    highlight: "Bilinguisme & opportunités de résidence",
    description: "Collèges et universités reconnus mondialement. Dossier complet préparé pour maximiser vos chances de visa.",
    guarantee_type: "success",
    points: [
      "Collèges et universités de renom",
      "Dossier visa préparé par nos experts",
      "Assistance à l'arrivée & installation",
      "Opportunités de travail et résidence",
    ],
    waMsg: "Bonjour Al-Moustour, je suis intéressé(e) par les études au Canada. Pouvez-vous me donner plus d'informations ?",
  },
  {
    flag: "🇹🇷",
    country: "Turquie",
    emoji_bg: "from-red-700 to-orange-600",
    badge: "87% de réussite",
    badgeColor: "bg-orange-600",
    highlight: "Bourse disponible — Garantie 87%",
    description: "Système universitaire américain (Bachelor 4 ans). Cours en turc ou en anglais avec formation linguistique incluse.",
    guarantee_type: "success",
    points: [
      "Bourse : inscription + langue + visa inclus",
      "Universités publiques & privées",
      "Formation linguistique incluse",
      "Accueil et installation à l'arrivée",
    ],
    waMsg: "Bonjour Al-Moustour, je suis intéressé(e) par les études en Turquie. Pouvez-vous me donner plus d'informations ?",
  },
  {
    flag: "🇲🇦",
    country: "Maroc",
    emoji_bg: "from-green-700 to-emerald-600",
    badge: "Garantie 100%",
    badgeColor: "bg-emerald-600",
    highlight: "Bourse disponible — Garantie 100%",
    description: "Enseignement en français. Système identique au modèle malien/français. Environnement sécurisé et accueillant.",
    guarantee_type: "full",
    points: [
      "Bourse pour tout le cycle (Licence/Master)",
      "Enseignement en français",
      "Universités publiques & privées",
      "Infrastructure moderne, sécurité élevée",
    ],
    waMsg: "Bonjour Al-Moustour, je suis intéressé(e) par les études au Maroc. Pouvez-vous me donner plus d'informations ?",
  },
  {
    flag: "🇨🇳",
    country: "Chine",
    emoji_bg: "from-red-700 to-yellow-600",
    badge: "Garantie 100%",
    badgeColor: "bg-yellow-600",
    highlight: "Bourse disponible — Garantie 100%",
    description: "2ème économie mondiale, +500 000 étudiants internationaux. Université reconnue internationalement.",
    guarantee_type: "full",
    points: [
      "Bourse : logement + visa + cycle inclus",
      "Cursus en chinois ou en anglais",
      "Universités internationalement reconnues",
      "Accompagnement dès l'arrivée",
    ],
    waMsg: "Bonjour Al-Moustour, je suis intéressé(e) par les études en Chine. Pouvez-vous me donner plus d'informations ?",
  },
  {
    flag: "🇷🇺",
    country: "Russie",
    emoji_bg: "from-slate-700 to-blue-800",
    badge: "Garantie 100%",
    badgeColor: "bg-blue-700",
    highlight: "Bourse disponible — Garantie 100%",
    description: "Diplômes reconnus mondialement. Enseignement supérieur rigoureux. Logement inclus la 1ère année.",
    guarantee_type: "full",
    points: [
      "1 seul paiement — tout inclus 1ère année",
      "Logement inclus dans la bourse",
      "Diplôme reconnu internationalement",
      "Formation linguistique avant le cycle",
    ],
    waMsg: "Bonjour Al-Moustour, je suis intéressé(e) par les études en Russie. Pouvez-vous me donner plus d'informations ?",
  },
  {
    flag: "🇮🇳",
    country: "Inde",
    emoji_bg: "from-orange-600 to-amber-600",
    badge: "Garantie 95%",
    badgeColor: "bg-amber-600",
    highlight: "Études abordables, qualité mondiale",
    description: "Reconnue pour l'informatique, l'ingénierie et la médecine. Visa simple, coûts réduits, intégration facile.",
    guarantee_type: "full",
    points: [
      "Universités de renommée mondiale",
      "Visa étudiant parmi les plus simples",
      "Excellence en médecine, IT, ingénierie",
      "Aide au logement & installation",
    ],
    waMsg: "Bonjour Al-Moustour, je suis intéressé(e) par les études en Inde. Pouvez-vous me donner plus d'informations ?",
  },
  {
    flag: "🇺🇸",
    country: "États-Unis",
    emoji_bg: "from-blue-700 to-sky-700",
    badge: "80% de réussite",
    badgeColor: "bg-sky-700",
    highlight: "Immersion en anglais, diplôme mondial",
    description: "Universités de réputation mondiale. Visa F-1 obtenu grâce à notre expertise en moins de 2 mois.",
    guarantee_type: "success",
    points: [
      "Universités de réputation mondiale",
      "Visa F-1 préparé par nos experts",
      "Préparation aux interviews incluse",
      "Assistance dossier complète",
    ],
    waMsg: "Bonjour Al-Moustour, je suis intéressé(e) par les études aux États-Unis. Pouvez-vous me donner plus d'informations ?",
  },
];

export function DestinationsSection() {

  const openWhatsApp = (msg: string) => {
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="destinations" className="py-24 bg-[#0B1120] relative border-t border-slate-800">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#00AEEF]/10 border border-[#00AEEF]/30 rounded-lg px-4 py-1.5 mb-6">
            <Globe2 className="text-[#00AEEF]" size={16} />
            <span className="text-[#00AEEF] text-sm font-semibold tracking-wide">8 Destinations</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5">
            Nos <span className="text-[#00AEEF]">Destinations</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Choisissez votre pays d'étude et contactez nos conseillers pour recevoir une orientation personnalisée.
          </p>
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg px-5 py-2 mt-6">
            <Shield size={16} className="text-green-400" />
            <span className="text-green-300 text-sm font-semibold">Bourses disponibles : Chine, Russie, Turquie & Maroc</span>
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {destinations.map((dest, index) => (
            <div
              key={index}
              className="group relative bg-slate-900 border border-slate-800 hover:border-[#00AEEF]/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 flex flex-col"
            >
              {/* Top Gradient Bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${dest.emoji_bg}`} />

              <div className="p-6 flex flex-col flex-grow">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{dest.flag}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white">{dest.country}</h3>
                      <span className={`text-xs font-bold text-white px-2 py-0.5 rounded-lg ${dest.badgeColor}`}>
                        {dest.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Highlight */}
                <div className="flex items-center gap-2 mb-4">
                  {dest.guarantee_type === "full" ? (
                    <Shield size={14} className="text-green-400 flex-shrink-0" />
                  ) : (
                    <TrendingUp size={14} className="text-[#00AEEF] flex-shrink-0" />
                  )}
                  <span className="text-sm font-semibold text-slate-300">{dest.highlight}</span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  {dest.description}
                </p>

                {/* Points */}
                <ul className="space-y-2 mb-5">
                  {dest.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00AEEF] mt-1.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Spacer */}
                <div className="flex-grow" />

                {/* CTA */}
                <button
                  onClick={() => openWhatsApp(dest.waMsg)}
                  className="relative overflow-hidden group/btn w-full mt-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white flex items-center justify-center gap-2.5 py-4 px-4 rounded-xl transition-all font-bold text-sm tracking-wide shadow-lg shadow-green-900/20 active:scale-95"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-25deg] -translate-x-full group-hover/btn:animate-[shine_0.75s_ease-in-out]" />
                  
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white flex-shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Contact
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-slate-900/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-3">Votre filière n'est pas listée ?</h3>
            <p className="text-slate-400 mb-6">
              Nous couvrons des dizaines de filières : médecine, droit, informatique, architecture, pharmacie, ingénierie et bien d'autres. Contactez-nous pour une orientation personnalisée.
            </p>
            <button
              onClick={() => openWhatsApp("Bonjour Al-Moustour, je voudrais me renseigner sur les filières disponibles pour mes études à l'étranger.")}
              className="relative overflow-hidden group/cbtn bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-10 py-5 rounded-2xl text-lg font-black transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-2xl shadow-green-600/30 ring-4 ring-white/5 hover:ring-green-400/30"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-25deg] -translate-x-full group-hover/cbtn:animate-[shine_0.75s_ease-in-out]" />
              
              <span className="relative flex items-center gap-3">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Parler à un conseiller
                <ArrowRight size={18} className="group-hover/cbtn:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Missing import fix
function Globe2({ className, size }: { className?: string; size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? 24}
      height={size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
