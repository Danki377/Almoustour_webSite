"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, ChevronRight, Facebook, Instagram, Twitter } from "lucide-react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { id: "home", label: "Accueil" },
    { id: "services", label: "Nos Services" },
    { id: "destinations", label: "Destinations" },
    { id: "about", label: "À Propos" },
    { id: "testimonials", label: "Témoignages" },
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
              <Facebook size={14} className="cursor-pointer hover:text-white hover:-translate-y-0.5 transition-all" />
              <Instagram size={14} className="cursor-pointer hover:text-white hover:-translate-y-0.5 transition-all" />
              <Twitter size={14} className="cursor-pointer hover:text-white hover:-translate-y-0.5 transition-all" />
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
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 ${isScrolled
                    ? "text-slate-600 hover:text-[#00AEEF]"
                    : "text-white/90 hover:text-white"
                    }`}
                >
                  {link.label}
                </button>
              ))}

              <button
                onClick={() => scrollToSection("contact")}
                className="ml-4 bg-[#00AEEF] text-white px-7 py-2.5 rounded-xl text-sm font-semibold hover:bg-sky-500 hover:shadow-lg hover:shadow-[#00AEEF]/30 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 group"
              >
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
            } border-l border-white/20`}
        >
          <div className="flex flex-col h-full bg-gradient-to-b from-white/50 to-slate-50/80">
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
            <div className="flex-1 overflow-y-auto py-8 px-6 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="w-full text-left px-5 py-4 text-lg font-bold text-slate-700 hover:text-[#00AEEF] hover:bg-white rounded-xl transition-all duration-300 flex justify-between items-center group shadow-sm border border-transparent hover:border-sky-100 hover:shadow-md"
                >
                  <span className="flex items-center gap-4">
                    <span className="w-1.5 h-6 bg-[#00AEEF]/20 rounded-full group-hover:bg-[#00AEEF] transition-colors" />
                    {link.label}
                  </span>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-[#00AEEF] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="p-8 border-t border-slate-200/50 space-y-5">
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full bg-[#00AEEF] text-white px-6 py-5 rounded-xl text-lg font-black hover:bg-[#008cc2] active:scale-95 transition-all duration-300 shadow-xl shadow-[#00AEEF]/20 flex items-center justify-center gap-3"
              >
                <Phone size={20} />
                Contactez-nous
              </button>

              <div className="flex justify-center gap-8 pt-2 text-slate-400">
                <a href="https://www.facebook.com/agencedevoyagemali" target="_blank" rel="noreferrer" className="hover:text-[#00AEEF] transition-colors transform hover:scale-110"><Facebook size={24} /></a>
                <a href="#" className="hover:text-[#00AEEF] transition-colors transform hover:scale-110"><Instagram size={24} /></a>
                <a href="#" className="hover:text-[#00AEEF] transition-colors transform hover:scale-110"><Twitter size={24} /></a>
              </div>

              <p className="text-center text-[10px] uppercase tracking-widest text-slate-400 font-bold">Votre partenaire voyage au Mali</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
