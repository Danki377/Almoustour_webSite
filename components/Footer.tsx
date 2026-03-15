"use client";

import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Shield,
} from "lucide-react";

const WA_NUMBER = "22363711111";

export function Footer() {
  const quickLinks = [
    { name: "Accueil", href: "home" },
    { name: "Nos Services", href: "services" },

    { name: "À Propos", href: "about" },
    { name: "Témoignages", href: "testimonials" },
    { name: "Contact", href: "contact" },
  ];


  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="text-2xl font-extrabold text-[#00AEEF] mb-1">
                AL MOUSTOUR
                <span className="text-white ml-2">Voyages</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mt-3">
                Votre partenaire de confiance depuis plus de 8 ans. Études à l&#39;étranger, billetterie d&#39;avion, visa — tout en un.
              </p>
            </div>


            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start text-slate-400">
                <MapPin size={16} className="mr-3 text-[#00AEEF] flex-shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">Bamako, Sotuba ACI, Avenue de l&#39;Armée (près du 3ème pont)</span>
              </div>
              <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer" className="flex items-center text-slate-400 hover:text-[#25D366] transition-colors">
                <Phone size={16} className="mr-3 text-[#00AEEF]" />
                <span className="text-sm">+223 63 71 11 11</span>
              </a>
              <a href="mailto:Almoustourvoyage@gmail.com" className="flex items-center text-slate-400 hover:text-[#00AEEF] transition-colors">
                <Mail size={16} className="mr-3 text-[#00AEEF]" />
                <span className="text-xs">Almoustourvoyage@gmail.com</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 mt-6">
              <a
                href="https://www.facebook.com/agencedevoyagemali"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-slate-800 rounded-xl flex items-center justify-center hover:bg-[#00AEEF] hover:border-[#00AEEF] transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/almoustour_voyages?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-slate-800 rounded-xl flex items-center justify-center hover:bg-[#E1306C] hover:border-[#E1306C] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center hover:bg-[#1ebd5a] transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Naviguer</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-[#00AEEF] transition-colors duration-200 text-sm text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>



          {/* WhatsApp CTA */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact Direct</h3>
            <p className="text-slate-400 text-sm mb-5 leading-relaxed">
              Notre canal principal est WhatsApp. Contactez-nous pour toute question sur vos études ou une réservation de billet.
            </p>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour Al-Moustour ! Je souhaite me renseigner sur vos services.")}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 bg-[#25D366] text-white font-bold px-5 py-3.5 rounded-xl hover:bg-[#1ebd5a] transition-all w-full justify-center text-sm shadow-lg shadow-black/20"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Discuter sur WhatsApp
            </a>
            <p className="text-slate-500 text-xs text-center mt-3">
              +223 63 71 11 11 · Disponible 5j/7
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-500 text-sm">
              © 2025 Al Moustour Voyages. Tous droits réservés. — Bamako, Mali.
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-xs">
              <Shield size={12} className="text-green-500" />
              <span>8+ années d&#39;expérience · 500+ étudiants accompagnés · 8 destinations</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
