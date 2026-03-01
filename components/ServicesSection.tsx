"use client";

import {
  Plane,
  GraduationCap,
  HeadphonesIcon,
  MapPin,
  Award,
  Users,
  Handshake,
  Shield,
} from "lucide-react";

const WA_NUMBER = "22373711111";

const services = [
  {
    icon: Plane,
    title: "Billetterie d'Avion",
    description:
      "Réservez vos vols au meilleur prix depuis Bamako vers toutes les destinations. Tarifs compétitifs, assistance complète pour votre départ.",
    features: [
      "Meilleures offres du marché",
      "Comparaison compagnies",
      "Assistance à la réservation",
      "Billets étudiants réduits",
    ],
    color: "from-sky-500 to-cyan-400",
    waMsg: "Bonjour Al-Moustour, je souhaite réserver un billet d'avion. Pouvez-vous m'aider ?",
  },
  {
    icon: GraduationCap,
    title: "Accompagnement Étudiant",
    description:
      "De l'inscription universitaire à l'obtention du visa, nous gérons tout votre dossier. Taux de réussite jusqu'à 100% selon la destination.",
    features: [
      "Choix de l'université",
      "Montage du dossier",
      "Préparation à l'interview visa",
      "Suivi tout au long du cycle",
    ],
    color: "from-blue-500 to-indigo-400",
    waMsg: "Bonjour Al-Moustour, je souhaite être accompagné pour mes études à l'étranger.",
  },
  {
    icon: MapPin,
    title: "Visa & Immigration",
    description:
      "Préparation experte de votre dossier de visa pour maximiser vos chances. Chine, Russie, Turquie, Maroc — garantie 100% sur les bourses.",
    features: [
      "Dossier visa complet",
      "France (COPACO)",
      "Canada (immigration.ca)",
      "USA (visa F-1)",
    ],
    color: "from-purple-500 to-violet-400",
    waMsg: "Bonjour Al-Moustour, j'ai besoin d'aide pour ma demande de visa étudiant.",
  },
  {
    icon: HeadphonesIcon,
    title: "Assistance Continue",
    description:
      "Nous sommes à vos côtés avant, pendant et après votre départ. Accueil à l'arrivée, aide pour le logement et les documents de séjour.",
    features: [
      "Accueil à l'arrivée",
      "Aide au logement",
      "Documents de séjour",
      "Support tout au long du cycle",
    ],
    color: "from-orange-500 to-amber-400",
    waMsg: "Bonjour Al-Moustour, j'ai besoin d'assistance pour mon installation à l'étranger.",
  },
];

const additionalServices = [
  { icon: Users, title: "Orientation Académique", description: "Aide au choix de filière et d'université selon votre profil" },
  { icon: Award, title: "Bourses d'Études", description: "Accès aux bourses en Chine, Russie, Turquie et Maroc" },
  { icon: Handshake, title: "Facilités de Paiement", description: "Des modalités de paiement flexibles adaptées à votre situation" },
  { icon: Shield, title: "Assistance à l'arrivée", description: "Accueil dans le pays, aide à l'installation" },
];

export function ServicesSection() {
  const openWhatsApp = (msg: string) => {
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="services" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
            Nos <span className="text-[#00AEEF]">Services</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Tout ce dont vous avez besoin pour réussir votre projet d'études à l'international.
          </p>

        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl mb-6 shadow-lg shadow-slate-200`}>
                <service.icon className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#00AEEF] transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-500 mb-6 leading-relaxed">{service.description}</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {service.features.map((feature, fi) => (
                  <div key={fi} className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-[#00AEEF] rounded-full mr-2 opacity-70" />
                    {feature}
                  </div>
                ))}
              </div>
              <button
                onClick={() => openWhatsApp(service.waMsg)}
                className="mt-auto w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md shadow-green-500/20"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Demander ce service
              </button>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Services <span className="text-[#00AEEF]">Complémentaires</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="text-center group border border-slate-100 rounded-xl p-6 transition-all duration-300 hover:bg-slate-50 hover:border-slate-200">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-900 rounded-xl mb-4">
                  <service.icon className="text-white" size={20} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{service.title}</h4>
                <p className="text-sm text-gray-500">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-slate-950 rounded-2xl p-10 text-white text-center shadow-2xl">
          <h3 className="text-3xl font-extrabold mb-3">Prêt à démarrer votre projet ?</h3>
          <p className="text-slate-400 mb-8 text-lg">
            Parlez directement à un conseiller sur WhatsApp. Réponse rapide garantie.
          </p>
          <button
            onClick={() => openWhatsApp("Bonjour Al-Moustour ! Je souhaite me renseigner sur vos services pour étudier à l'étranger.")}
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#1ebd5a] transition-all duration-300 transform hover:scale-105 shadow-xl shadow-green-600/30 text-lg"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Nous contacter sur WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
