"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Navigation as NavIcon,
  ChevronRight
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Badge } from "@/components/ui/badge";

const WA_NUMBER = "22363711111";
const waMsg = "Bonjour Al-Moustour, j'ai besoin d'informations pour une demande de visa touristique.";

export default function VisaPage() {
  const visaOffers = [
    { country: "CANADA", flag: "🇨🇦", service: "VISA Touristique", tarif: "650.000 FCFA", delai: "0 à 6 mois" },
    { country: "DUBAI", flag: "🇦🇪", service: "VISA Express", tarif: "110.000 FCFA", delai: "24h à 72h" },
    { country: "MAROC", flag: "🇲🇦", service: "AEVM", tarif: "55.000 FCFA", delai: "24h à 72h" },
    { country: "OUMRA", flag: "🇸🇦", service: "VISA", tarif: "210.000 FCFA", delai: "24h à 72h" },
    { country: "TURQUIE", flag: "🇹🇷", service: "VISA Touristique", tarif: "220.000 FCFA", delai: "0 à 30 jours" },
    { country: "RUSSIE", flag: "🇷🇺", service: "VISA Touristique", tarif: "250.000 FCFA", delai: "0 à 2 mois" },
    { country: "USA / EUROPE", flag: "🌐", service: "Rendez-vous & Montage", tarif: "Sur devis", delai: "Variable" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-slate-900">
          <Image 
            src="/visa_hero.png"
            alt="Assistance Visa Al Moustour"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-white" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
          <Badge className="mb-6 py-1.5 px-4 bg-[#00AEEF] hover:bg-[#00AEEF] text-white border-none text-sm uppercase tracking-wider">
            Expertise Consulaire
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">
            Assistance <span className="text-[#00AEEF]">Visa</span> & Dossiers
          </h1>
          <p className="text-lg text-white max-w-xl mx-auto font-bold drop-shadow-md">
            Simplifiez vos démarches pour l'obtention de vos visas vers le monde entier.
          </p>
        </div>
      </section>

      {/* Pricing & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Nos Offres <span className="text-[#00AEEF]">Visa</span></h2>
            <p className="text-slate-600 font-medium">Tarifs transparents et accompagnement personnalisé.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden mb-16">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-white">
                    <th className="py-6 px-8 font-black uppercase tracking-widest text-xs">Destination</th>
                    <th className="py-6 px-8 font-black uppercase tracking-widest text-xs">Service</th>
                    <th className="py-6 px-8 font-black uppercase tracking-widest text-xs">Tarif</th>
                    <th className="py-6 px-8 font-black uppercase tracking-widest text-xs">Délai Est.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visaOffers.map((offer, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-5 px-8 font-black text-slate-900 flex items-center gap-4">
                        <span className="text-2xl">{offer.flag}</span>
                        {offer.country}
                      </td>
                      <td className="py-5 px-8 font-bold text-slate-600 text-sm">{offer.service}</td>
                      <td className="py-5 px-8 font-black text-[#00AEEF]">{offer.tarif}</td>
                      <td className="py-5 px-8 text-slate-500 font-bold text-sm">{offer.delai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Minimal Trust Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Dossiers Sécurisés", desc: "Expertise en montage de dossier pour optimiser vos chances." },
              { icon: Clock, title: "Délais Respectés", desc: "Suivi rigoureux des calendriers consulaires et rendez-vous." },
              { icon: NavIcon, title: "Suivi à l'arrivée", desc: "Conseils pour votre installation et vos premiers jours sur place." }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 text-center">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <feature.icon className="text-[#00AEEF]" size={24} />
                </div>
                <h4 className="font-black text-slate-900 mb-2">{feature.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00AEEF] rounded-full blur-[100px] opacity-20 -mr-32 -mt-32" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Prêt à voyager ?</h2>
          <p className="text-slate-400 text-lg mb-10 font-bold">
            Contactez-nous sur WhatsApp pour lancer votre dossier de visa immédiatement.
          </p>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-black py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl text-xl"
          >
            Lancer ma demande
            <ArrowRight size={24} />
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
