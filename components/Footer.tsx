"use client";

import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Globe,
} from "lucide-react";

export function Footer() {
  const quickLinks = [
    { name: "Accueil", href: "#home" },
    { name: "Nos Services", href: "#services" },
    { name: "À Propos", href: "#about" },
    { name: "Témoignages", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "Accompagnement Étudiant",
    "Achat & Réservation de Billets d'Avion",
    "Services de Voyage",
    "Assistance & Conseil",
  ];

  const destinations = [
    "États-Unis",
    "Canada",
    "France",
    "Russie",
    "Chine",
    "Maroc",
    "Turquie",
    "Inde",
  ];

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="text-2xl font-bold text-[#00AEEF] mb-2">
                AL MOUSTOUR
                <span className="text-white ml-2">Voyages</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Votre partenaire de confiance pour réaliser vos rêves
                d&#39;études à l&#39;international depuis plus de 10 ans.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <MapPin size={20} className="mr-3 text-[#00AEEF]" />
                <span className="text-[12px]">
                  BAMAKO, SOTUBA ACI AVENU DE L&#39;ARMEE (Prés Du Rond Point De
                  La Station Shell)
                </span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone size={16} className="mr-3 text-[#00AEEF]" />
                <span className="text-sm">+223 73 71 11 11 / 63 71 11 11</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail size={16} className="mr-3 text-[#00AEEF]" />
                <span className="text-sm">ALMOUSTOURVOYAGE@gmail.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <a
                href="https://www.facebook.com/agencedevoyagemali/?locale=fr_FR"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#00AEEF] transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/almoustour_voyages/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#00AEEF] transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Liens Rapides</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-[#00AEEF] transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Nos Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li
                  key={index}
                  className="text-gray-400 text-sm hover:text-[#00AEEF] transition-colors duration-300 cursor-pointer"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              Destinations Populaires
            </h3>
            <ul className="space-y-3">
              {destinations.map((destination, index) => (
                <li
                  key={index}
                  className="text-gray-400 text-sm hover:text-[#00AEEF] transition-colors duration-300 cursor-pointer"
                >
                  {destination}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 AL MOUSTOUR Voyages. Tous droits réservés.
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-[#00AEEF] transition-colors duration-300"
              >
                Politique de confidentialité
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#00AEEF] transition-colors duration-300"
              >
                Conditions d&#39;utilisation
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#00AEEF] transition-colors duration-300"
              >
                Mentions légales
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Certification Badge */}
      <div className="bg-gradient-to-r from-[#00AEEF] to-blue-600 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center text-center text-white">
            <Globe size={20} className="mr-2" />
            <span className="text-sm font-semibold">
              Agence certifiée et membre du réseau international des conseillers
              en éducation
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
