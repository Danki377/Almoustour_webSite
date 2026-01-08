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
    { id: "about", label: "À Propos" },
    { id: "testimonials", label: "Témoignages" },
  ];

  return (
    <>
      {/* Top Bar - Hidden on mobile for cleaner look, visible on md+ */}
      <div className="hidden md:block bg-gradient-to-r from-[#00AEEF] to-[#0077A3] text-white py-2.5 px-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm font-medium">
          <div className="flex items-center gap-6">
            <a href="tel:+22373711111" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <Phone size={14} />
              <span>+223 73 71 11 11</span>
            </a>
            <a href="mailto:ALMOUSTOURVOYAGE@gmail.com" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <Mail size={14} />
              <span>ALMOUSTOURVOYAGE@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span>Votre partenaire de confiance pour l'international</span>
            <div className="h-4 w-px bg-white/30"></div>
            <div className="flex gap-3">
               {/* Social placeholders */}
               <Facebook size={14} className="cursor-pointer hover:scale-110 transition-transform" />
               <Instagram size={14} className="cursor-pointer hover:scale-110 transition-transform" />
               <Twitter size={14} className="cursor-pointer hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center cursor-pointer group" onClick={() => scrollToSection("home")}>
              <div className="text-2xl font-black tracking-tight text-[#00AEEF]">
                AL MOUSTOUR
                <span className={`ml-2 transition-colors duration-300 ${isScrolled ? "text-gray-900" : "text-white drop-shadow-md"}`}>Voyages</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isScrolled
                      ? "text-gray-700 hover:text-[#00AEEF] hover:bg-sky-50"
                      : "text-white hover:bg-white/20 drop-shadow-sm"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              
              <button
                onClick={() => scrollToSection("contact")}
                className="ml-4 bg-[#00AEEF] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#008cc2] transition-all duration-300 transform hover:scale-105 shadow-lg group flex items-center gap-2"
              >
                Contact
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
                 isScrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/20"
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
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div 
          className={`absolute top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 flex justify-between items-center border-b border-gray-100">
              <span className="text-xl font-black text-[#00AEEF]">MENU</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 overflow-y-auto py-6 px-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="w-full text-left px-4 py-4 text-lg font-medium text-gray-700 hover:text-[#00AEEF] hover:bg-sky-50 rounded-xl transition-all duration-200 flex justify-between items-center group"
                >
                  {link.label}
                  <ChevronRight size={20} className="text-gray-300 group-hover:text-[#00AEEF] transition-colors" />
                </button>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-100 space-y-4 bg-gray-50">
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full bg-[#00AEEF] text-white px-6 py-4 rounded-xl text-lg font-bold hover:bg-[#008cc2] transition-all duration-300 shadow-lg text-center"
              >
                Demander un devis
              </button>
              
              <div className="flex justify-center gap-6 pt-2 text-gray-400">
                 <a href="#" className="hover:text-[#00AEEF] transition-colors"><Facebook size={20} /></a>
                 <a href="#" className="hover:text-[#00AEEF] transition-colors"><Instagram size={20} /></a>
                 <a href="#" className="hover:text-[#00AEEF] transition-colors"><Twitter size={20} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
