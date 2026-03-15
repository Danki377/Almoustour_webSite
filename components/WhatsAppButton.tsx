"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    // Replace with actual WhatsApp number
    const phoneNumber = "+22363711111";
    const message =
      "Bonjour! Je souhaiterais obtenir des informations sur vos services d'accompagnement pour étudier à l'étranger.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="flex fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-2xl shadow-2xl hover:bg-[#1ebd5a] transition-all duration-300 transform hover:scale-110 group"
      aria-label="Contacter via WhatsApp"
    >
      <MessageCircle size={28} className="group-hover:animate-pulse" />

      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
          Contactez-nous sur WhatsApp
          <div className="absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
        </div>
      </div>

      {/* Pulse Effect */}
      <div className="absolute inset-0 bg-[#25D366] rounded-2xl animate-ping opacity-20"></div>
    </button>
  );
}
