"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, Mail, ChevronRight, Facebook, Instagram, Twitter, ChevronDown, Plane, GraduationCap, MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsDropdownOpen(true);
  };

  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setIsDropdownOpen(false), 150);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    if (pathname !== "/") {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
      }
    }
  };

  const servicesList = [
    {
      title: "Billetterie d'Avion",
      href: "/services/billetterie",
      desc: "Le monde entier",
      icon: Plane
    },
    {
      title: "Études à l'étranger",
      href: "/services/accompagnement-etudiant",
      desc: "🇫🇷 France • 🇨🇦 Canada • 🇲🇦 Maroc • 🇹🇷 Turquie • 🇨🇳 Chine • 🇷🇺 Russie • 🇮🇳 Inde • 🇺🇸 USA",
      icon: GraduationCap
    },
    {
      title: "Assistance Visa",
      href: "/services/visa-et-immigration",
      desc: "Montage de dossiers et RDV",
      icon: MapPin
    }
  ];

  return (
    <>
      {/* Top Bar - Hidden on mobile for cleaner look, visible on md+ */}
      <div className="hidden md:block bg-slate-900 text-slate-300 py-2 px-4 transition-all duration-300 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs tracking-wide font-medium">
          <div className="flex items-center gap-6">
            <a href="tel:+22373711111" className="flex items-center gap-2 hover:text-white transition-colors duration-200">
              <Phone size={14} className="text-[#00AEEF]" />
              <span>+223 73 71 11 11</span>
            </a>
            <a href="mailto:ALMOUSTOURVOYAGE@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors duration-200">
              <Mail size={14} className="text-[#00AEEF]" />
              <span>ALMOUSTOURVOYAGE@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="opacity-80">Votre partenaire de confiance pour l'international</span>
            <div className="h-4 w-px bg-white/20"></div>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/agencedevoyagemali" target="_blank" rel="noopener noreferrer">
                <Facebook size={14} className="cursor-pointer hover:text-white hover:-translate-y-0.5 transition-all" />
              </a>
              <a href="https://www.instagram.com/almoustour_voyages?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
                <Instagram size={14} className="cursor-pointer hover:text-white hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${isScrolled
          ? "bg-white shadow-xl shadow-slate-200/50 border-b border-gray-100 py-3"
          : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center cursor-pointer group" onClick={() => scrollToSection("home")}>
              <div className="text-2xl font-black tracking-tight text-[#00AEEF]">
                AL MOUSTOUR
                <span className={`ml-2 transition-colors duration-500 font-bold ${isScrolled ? "text-gray-900" : "text-white drop-shadow-lg"}`}>Voyages</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              <button
                onClick={() => scrollToSection("home")}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 ${isScrolled
                  ? "text-slate-600 hover:text-[#00AEEF]"
                  : "text-white/90 hover:text-white"
                  }`}
              >
                Accueil
              </button>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <button
                  className={`flex items-center gap-1 px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all ${isScrolled ? 'text-slate-600 hover:text-[#00AEEF]' : 'text-white/90 hover:text-white'}`}
                >
                  Services
                  <ChevronDown size={13} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* DROPDOWN PANEL — minimal */}
                <div
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                  className={`absolute top-full left-0 w-64 pt-4 transition-all duration-200 ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1 pointer-events-none'}`}
                >
                  <div className="bg-white border border-slate-200/80 rounded-md shadow-lg shadow-black/8 overflow-hidden">
                    {servicesList.map((srv, idx) => (
                      <Link
                        key={idx}
                        href={srv.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className="group flex items-center gap-3 px-5 py-3.5 text-sm font-semibold text-slate-700 hover:text-[#00AEEF] hover:bg-slate-50 transition-all border-b border-slate-100 last:border-b-0"
                      >
                        <span className="w-0.5 h-4 bg-[#00AEEF] opacity-0 group-hover:opacity-100 rounded-full transition-opacity shrink-0" />
                        {srv.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => scrollToSection("about")}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 ${isScrolled
                  ? "text-slate-600 hover:text-[#00AEEF]"
                  : "text-white/90 hover:text-white"
                  }`}
              >
                À Propos
              </button>

              <button
                onClick={() => scrollToSection("testimonials")}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 ${isScrolled
                  ? "text-slate-600 hover:text-[#00AEEF]"
                  : "text-white/90 hover:text-white"
                  }`}
              >
                Témoignages
              </button>

              <button
                onClick={() => scrollToSection("faq")}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 ${isScrolled
                  ? "text-slate-600 hover:text-[#00AEEF]"
                  : "text-white/90 hover:text-white"
                  }`}
              >
                FAQ
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="relative overflow-hidden group ml-4 bg-gradient-to-r from-[#00AEEF] to-[#008CC2] text-white px-8 py-3 rounded-2xl text-sm font-bold transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-[#00AEEF]/25 flex items-center gap-2"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-25deg] -translate-x-full group-hover:animate-[shine_0.75s_ease-in-out]" />
                
                Contact
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${isScrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/20"
                }`}
              aria-label="Ouvrir le menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-500 ${isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white/90 backdrop-blur-2xl shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            } border-l border-white/20 overflow-y-auto`}
        >
          <div className="flex flex-col min-h-full bg-gradient-to-b from-white/50 to-slate-50/80">
            {/* Header */}
            <div className="p-6 flex justify-between items-center border-b border-slate-200/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#00AEEF] rounded-lg rotate-3" />
                <span className="text-xl font-black text-slate-900 tracking-tighter">AL MOUSTOUR</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                aria-label="Fermer le menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 py-8 px-6 space-y-3">
              <button
                onClick={() => scrollToSection("home")}
                className="w-full text-left px-5 py-4 text-lg font-bold text-slate-700 hover:text-[#00AEEF] hover:bg-white rounded-xl transition-all duration-300 flex justify-between items-center group shadow-sm border border-transparent"
              >
                Accueil
              </button>

              {/* Mobile Services list */}
              <div className="px-5 py-4 bg-slate-100/50 rounded-xl space-y-3">
                <div className="text-lg font-bold text-slate-900 mb-2">Nos Services</div>
                {servicesList.map((srv, idx) => (
                  <Link
                    key={idx}
                    href={srv.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center p-3 rounded-lg bg-white shadow-sm border border-slate-100"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00AEEF]/10 flex items-center justify-center text-[#00AEEF]">
                      <srv.icon size={16} />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-bold text-slate-800">{srv.title}</div>
                      <div className="text-[10px] text-slate-500">{srv.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>

              <button
                onClick={() => scrollToSection("about")}
                className="w-full text-left px-5 py-4 text-lg font-bold text-slate-700 hover:text-[#00AEEF] hover:bg-white rounded-xl transition-all duration-300 flex justify-between items-center group shadow-sm border border-transparent"
              >
                À Propos
              </button>

              <button
                onClick={() => scrollToSection("testimonials")}
                className="w-full text-left px-5 py-4 text-lg font-bold text-slate-700 hover:text-[#00AEEF] hover:bg-white rounded-xl transition-all duration-300 flex justify-between items-center group shadow-sm border border-transparent"
              >
                Témoignages
              </button>

              <button
                onClick={() => scrollToSection("faq")}
                className="w-full text-left px-5 py-4 text-lg font-bold text-slate-700 hover:text-[#00AEEF] hover:bg-white rounded-xl transition-all duration-300 flex justify-between items-center group shadow-sm border border-transparent"
              >
                FAQ
              </button>
            </div>

            {/* Footer Actions */}
            <div className="p-8 border-t border-slate-200/50 mt-auto">
              <button
                onClick={() => scrollToSection("contact")}
                className="relative overflow-hidden group w-full bg-gradient-to-r from-[#00AEEF] to-[#008CC2] text-white px-6 py-5 rounded-2xl text-lg font-black active:scale-95 transition-all duration-300 shadow-xl shadow-[#00AEEF]/20 flex items-center justify-center gap-3 mb-5"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-25deg] -translate-x-full group-hover:animate-[shine_0.75s_ease-in-out]" />
                
                <Phone size={20} />
                Contactez-nous
              </button>

              <div className="flex justify-center gap-8 pt-2 text-slate-400 mb-4">
                <a href="https://www.facebook.com/agencedevoyagemali" target="_blank" rel="noreferrer" className="hover:text-[#00AEEF] transition-colors"><Facebook size={24} /></a>
                <a href="https://www.instagram.com/almoustour_voyages?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="hover:text-[#00AEEF] transition-colors"><Instagram size={24} /></a>
              </div>

              <p className="text-center text-[10px] uppercase tracking-widest text-slate-400 font-bold">Votre partenaire voyage au Mali</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
