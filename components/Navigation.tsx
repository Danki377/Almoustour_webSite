"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#00AEEF] text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>+223 73 71 11 11</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>ALMOUSTOURVOYAGE@gmail.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Votre partenaire pour étudier à l&#39;étranger</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-[#00AEEF]">
                AL MOUSTOUR
                <span className="text-black ml-2">Voyages</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-gray-800 hover:text-[#00AEEF] font-medium transition-colors duration-200"
              >
                Accueil
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-gray-800 hover:text-[#00AEEF] font-medium transition-colors duration-200"
              >
                Nos Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-800 hover:text-[#00AEEF] font-medium transition-colors duration-200"
              >
                À Propos
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-gray-800 hover:text-[#00AEEF] font-medium transition-colors duration-200"
              >
                Témoignages
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-[#00AEEF] text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-800 hover:text-[#00AEEF] transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              <button
                onClick={() => scrollToSection("home")}
                className="block w-full text-left text-gray-800 hover:text-[#00AEEF] font-medium py-2 transition-colors duration-200"
              >
                Accueil
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left text-gray-800 hover:text-[#00AEEF] font-medium py-2 transition-colors duration-200"
              >
                Nos Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left text-gray-800 hover:text-[#00AEEF] font-medium py-2 transition-colors duration-200"
              >
                À Propos
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="block w-full text-left text-gray-800 hover:text-[#00AEEF] font-medium py-2 transition-colors duration-200"
              >
                Témoignages
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full bg-[#00AEEF] text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-center mt-4"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
