"use client";

import { MessageSquare, X, Bot } from "lucide-react";

interface ChatBotButtonProps {
    isOpen: boolean;
    onToggle: () => void;
}

export function ChatBotButton({ isOpen, onToggle }: ChatBotButtonProps) {
    return (
        <button
            onClick={onToggle}
            className={`fixed ${isOpen ? 'bottom-8 right-8' : 'bottom-24 right-6 sm:bottom-6 sm:right-24'} z-50 bg-slate-950 text-white p-4 rounded-full shadow-2xl hover:bg-slate-900 transition-all duration-300 transform hover:scale-110 group border border-white/10`}
            aria-label={isOpen ? "Fermer le chat" : "Ouvrir l'assistant virtuel"}
        >
            {isOpen ? (
                <X size={28} />
            ) : (
                <div className="relative">
                    <Bot size={28} className="group-hover:animate-pulse" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00AEEF] rounded-full border-2 border-slate-950 animate-bounce" />
                </div>
            )}

            {/* Tooltip */}
            {!isOpen && (
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:block">
                    <div className="bg-slate-900 text-white text-sm px-4 py-2 rounded-xl whitespace-nowrap border border-white/10 shadow-xl">
                        Besoin d'aide ? Chattez avec notre assistant
                        <div className="absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 border-l-8 border-l-slate-900 border-t-8 border-t-transparent border-b-8 border-b-transparent"></div>
                    </div>
                </div>
            )}
        </button>
    );
}
