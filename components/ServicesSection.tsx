"use client";

import {
  GraduationCap,
  Search,
  Plane,
  HeadphonesIcon,
  Users,
  Award,
  MapPin,
  Handshake,
} from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "Accompagnement Étudiant",
    description:
      "Nous vous guidons dans toutes vos démarches pour étudier à l'étranger : choix de programme, dossier de candidature, et procédures d'inscription.",
    features: [
      "Conseil personnalisé",
      "Dossier de candidature",
      "Suivi administratif",
      "Préparation aux entretiens",
    ],
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Plane,
    title: "Achat & Réservation de Billets d'Avion",
    description:
      "Réservez vos vols facilement et au meilleur prix. Nous vous accompagnons dans la recherche, la comparaison et l'achat de billets adaptés à vos besoins.",
    features: [
      "Recherche des meilleures offres",
      "Comparaison des compagnies aériennes",
      "Assistance à la réservation",
      "Suivi et modifications des vols",
    ],
    color: "from-sky-500 to-indigo-400",
  },
  {
    icon: Plane,
    title: "Services de Voyage",
    description:
      "Réservation de billets d'avion, assurances voyage, et tous les services nécessaires pour votre séjour à l'étranger.",
    features: [
      "Billets d'avion",
      "Assurance voyage",
      "Hébergement",
      "Transport local",
    ],
    color: "from-purple-500 to-pink-400",
  },
  {
    icon: HeadphonesIcon,
    title: "Assistance & Conseil",
    description:
      "Un accompagnement personnalisé 7j/7 avec nos conseillers experts pour répondre à toutes vos questions et vous soutenir.",
    features: [
      "Support 24/7",
      "Conseil d'expert",
      "Urgences à l'étranger",
      "Suivi personnalisé",
    ],
    color: "from-orange-500 to-red-400",
  },
];

const additionalServices = [
  {
    icon: Users,
    title: "Orientation Académique",
    description: "Aide au choix de filière et d'université",
  },
  {
    icon: Award,
    title: "Préparation Linguistique",
    description: "Cours et tests de langue certifiants",
  },
  {
    icon: MapPin,
    title: "Visa & Immigration",
    description: "Assistance pour l'obtention des visas",
  },
  {
    icon: Handshake,
    title: "Accompagnement continu",
    description: "Soutien pendant toute la durée des études",
  },
];

export function ServicesSection() {
  const handleAccompagnementClick = () => {
    // Replace with actual WhatsApp number
    const phoneNumber = "+22363711111"; // Example: +22312345678 for Mali
    const message =
      "Bonjour! Je souhaiterais me faire accompagner par votre agence pour mes études à l'étranger.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };
  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nos <span className="text-[#00AEEF]">Services</span> Premium
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des solutions complètes et personnalisées pour concrétiser votre
            projet d&#39;études à l&#39;étranger
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
              ></div>

              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl mb-6 transform group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className="text-white" size={28} />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#00AEEF] transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3">
                {service.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-center text-sm text-gray-500"
                  >
                    <div className="w-2 h-2 bg-[#00AEEF] rounded-full mr-2 opacity-60"></div>
                    {feature}
                  </div>
                ))}
              </div>

              {/* Hover Effect */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-6 h-6 bg-[#00AEEF] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Services <span className="text-[#00AEEF]">Complémentaires</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="text-center group hover:bg-gray-50 rounded-2xl p-4 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#00AEEF] to-blue-600 rounded-xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="text-white" size={20} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {service.title}
                </h4>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#00AEEF] to-blue-600 rounded-3xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-3xl font-extrabold mb-4">
              Prêt à commencer votre aventure ?
            </h3>
            <p className="text-blue-100 mb-6 text-lg">
              Cliquez seulement si vous êtes prêt pour un accompagnement
              personnalisé !
            </p>
            <button
              onClick={handleAccompagnementClick}
              className="bg-white text-[#00AEEF] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Accompagnez-moi
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
