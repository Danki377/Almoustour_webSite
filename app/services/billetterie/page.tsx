"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Plane, 
  CheckCircle2, 
  ArrowRight,
  Luggage,
  ShieldCheck,
  CreditCard,
  Headphones
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Badge } from "@/components/ui/badge";

const WA_NUMBER = "22363711111";
const waMsg = "Bonjour Al-Moustour, je souhaite réserver un billet d'avion. Pouvez-vous m'aider ?";

export default function BilletteriePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Short Hero */}
      <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-slate-900">
          <Image 
            src="/airplane_billetterie.png"
            alt="Billetterie d'avion Al Moustour"
            fill
            className="object-cover opacity-60"
            priority
          />
          {/* Bottom gradient overlay to transition to white page */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">
            Billetterie d'<span className="text-[#00AEEF]">Avion</span>
          </h1>
          <p className="text-lg text-white max-w-xl mx-auto font-bold drop-shadow-md">
            Réservez vos vols au meilleur prix depuis Bamako vers toutes les destinations mondiales.
          </p>
        </div>
      </section>

      {/* Minimalist Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Le monde à votre portée</h2>
              <p className="text-slate-600 leading-relaxed">
                Al Moustour Voyages vous accompagne dans la recherche et la réservation de vos billets d'avion. Nous collaborons avec toutes les compagnies aériennes majeures pour vous offrir les tarifs les plus compétitifs.
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: Luggage, text: "Tarifs préférentiels pour étudiants (bagages inclus)" },
                  { icon: ShieldCheck, text: "Assistance complète avant et après le départ" },
                  { icon: CreditCard, text: "Facilités de paiement disponibles" },
                  { icon: Headphones, text: "Gestion des changements et annulations" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <item.icon className="text-[#00AEEF] shrink-0" size={20} />
                    <span className="text-slate-700 font-medium text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#000d20] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00AEEF] rounded-full blur-3xl opacity-20 -mr-16 -mt-16 text-white" />
              
              <div className="relative z-10">
                <Badge className="bg-[#00AEEF] text-white border-none mb-6">Contact Instantané</Badge>
                <h3 className="text-2xl font-bold mb-4">Prêt à voyager ?</h3>
                <p className="text-slate-400 text-sm mb-8">
                  Contactez-nous directement sur WhatsApp pour obtenir un devis personnalisé en fonction de vos dates et de votre destination.
                </p>
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold py-4 px-8 rounded-2xl transition-all w-full shadow-lg shadow-green-600/20"
                >
                  <Plane size={20} />
                  Réserver sur WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
