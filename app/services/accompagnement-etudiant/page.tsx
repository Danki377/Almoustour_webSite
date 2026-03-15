"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  GraduationCap, 
  CheckCircle2, 
  MapPin, 
  Wallet, 
  Globe, 
  FileText, 
  Plane, 
  HeartHandshake, 
  ChevronRight,
  Info,
  ShieldCheck,
  Star,
  Users,
  Search,
  BookOpen,
  ArrowRight,
  Luggage
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const WA_NUMBER = "22363711111";
const waMsg = "Bonjour Al-Moustour, je souhaite être accompagné pour mes études à l'étranger.";

const countries = [
  {
    id: "chine",
    name: "Chine",
    flag: "🇨🇳",
    intro: "Une expérience unique dans 'l'usine du monde'. La Chine accueille plus de 500 000 étudiants internationaux et offre des universités respectées mondialement.",
    procedure: "Deux options :\n1. Une année de formation en langue chinoise avant de commencer le cycle universitaire.\n2. Formation en anglais (avec attestation d'anglais obtenue au Mali) pour une intégration directe.",
    expenses: {
      bourse: "3.500.000 FCFA (Tout le cycle + logement + visa)",
      private: "1.600.000 FCFA / an",
      agency: "400.000 FCFA (Bourse) / 650.000 FCFA (Privé)",
      food: "60.000 FCFA / mois (Est.)",
      housing: "60.000 FCFA / mois (Est. si privé)"
    },
    image: "/china_hero.png"
  },
  {
    id: "russie",
    name: "Russie",
    flag: "🇷🇺",
    intro: "Destination de choix pour un enseignement rigoureux à coût abordable. Diplômes reconnus mondialement et environnement académique de haut niveau.",
    procedure: "L'agence gère tout : Inscription + Année de langue + Visa + 1ère année de logement + Accompagnement pendant tout le cycle.",
    expenses: {
      bourse: "2.500.000 FCFA (Visa + 1an logement + 1an langue + frais dossier)",
      private: "N/A",
      agency: "Inclus dans la bourse",
      food: "50.000 FCFA / mois (Est.)",
      housing: "Inclus la 1ère année"
    },
    image: "/russia_hero.png"
  },
  {
    id: "turquie",
    name: "Turquie",
    flag: "🇹🇷",
    intro: "Universités de qualité avec programmes en Turc ou Anglais. Système américain (Bachelor en 4 ans) et accueil chaleureux.",
    procedure: "Paiement unique pour tout le cycle (universités d'état) incluant : langue + visa + accueil + installation. Option universités privées avec frais annuels.",
    expenses: {
      bourse: "3.500.000 FCFA (Cycle complet + langue + frais agence + visa)",
      private: "1.500.000 FCFA / an",
      agency: "500.000 FCFA",
      food: "70.000 FCFA / mois (Est.)",
      housing: "50.000 FCFA / mois (Est.)"
    },
    image: "/turkey_hero.png"
  },
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    intro: "Sécurité, diversité et diplômes prestigieux. Le Canada offre des opportunités exceptionnelles de travail et de résidence.",
    procedure: "Bien choisir son programme, vérifier les conditions spécifiques, fournir des preuves financières solides. L'expertise d'Al Moustour maximise vos chances face à la complexité du visa.",
    expenses: {
      college: "A partir de 5.000.000 FCFA / an",
      procedure: "400.000 FCFA",
      agency: "850.000 FCFA",
      food: "250.000 FCFA / mois (Est.)",
      housing: "250.000 FCFA / mois (Est.)"
    },
    image: "/canada_hero.png"
  },
  {
    id: "france",
    name: "France",
    flag: "🇫🇷",
    intro: "Rejoignez les milliers d'étudiants maliens en France. Accompagnement complet de Campus France jusqu'au logement. Inscriptions dès le 1er octobre 2025.",
    procedure: "Création compte Campus France -> Interview -> Inscription université -> Compte bloqué (5 millions FCFA remboursables si refus).",
    expenses: {
      private: "2.500.000 FCFA / an",
      procedure: "250.000 FCFA (Publique) / 750.000 FCFA (Privé)",
      agency: "650.000 FCFA (Payable après visa)",
      food: "150.000 FCFA / mois (Est.)",
      housing: "200.000 FCFA / mois (Est.)"
    },
    image: "/france_hero.png"
  },
  {
    id: "usa",
    name: "USA",
    flag: "🇺🇸",
    intro: "Immersion totale dans la culture américaine. Le visa étudiant (F-1) est plus accessible qu'on ne le croit avec une préparation rigoureuse aux interviews.",
    procedure: "Sélection d'université adaptée à votre profil, obtention de l'I-20, et montage de dossier optimisé pour l'entretien consulaire.",
    expenses: {
      university: "10.000.000 FCFA / an",
      procedure: "650.000 FCFA",
      agency: "850.000 FCFA",
      food: "300$ / mois (Est.)",
      housing: "600$ / mois (Est.)"
    },
    image: "/usa_hero.png"
  },
  {
    id: "inde",
    name: "Inde",
    flag: "🇮🇳",
    intro: "Excellence en informatique, ingénierie et médecine à des coûts abordables. Intégration facile et formations de renommée mondiale.",
    procedure: "Le visa étudiant pour l'Inde est souvent plus simple. Nous assurons le choix de l'université, la préparation des dossiers et l'accueil.",
    expenses: {
      university: "A partir de 1.500.000 FCFA / an",
      procedure: "250.000 FCFA",
      agency: "700.000 FCFA",
      food: "50.000 FCFA / mois (Est.)",
      housing: "80.000 FCFA / mois (Est.)"
    },
    image: "/india_hero.png"
  },
  {
    id: "maroc",
    name: "Maroc",
    flag: "🇲🇦",
    intro: "Une puissance économique africaine avec des infrastructures modernes. Système éducatif dynamique (LMD) identique au modèle français.",
    procedure: "Établissements publics offrant des bourses (paiement unique pour tout le cycle) ou établissements privés spécialisés.",
    expenses: {
      bourse: "3.500.000 FCFA (Tout le cycle)",
      private: "1.500.000 FCFA / an",
      agency: "500.000 FCFA",
      food: "60.000 FCFA / mois (Est.)",
      housing: "60.000 FCFA / mois (Est.)"
    },
    image: "/morocco_hero.png"
  }
];

const filieres = [
  "Génie Civil", "Commerce international", "Management", "Génie industriel", "Droit", "Économie", 
  "Génie électrique", "Électronique", "Génie informatique", "Business Administration", "Génie mécanique", 
  "Architecture", "MBA", "Journalisme", "Finance", "Relations Internationales", "Logistique", "Banque",
  "Sciences politiques", "Histoire", "Théologie", "Archéologie", "Philosophie", "Mines", "Géologie",
  "Sociologie", "Médecine", "Pharmacie", "Biologie Moléculaire", "Génétique", "Agriculture", "Environnement",
  "Psychologie", "Art et Science", "Langues & Civilisation"
];

export default function AccompagnementPage() {
  const [activeTab, setActiveTab] = useState("chine");

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[600px] h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-slate-900">
          <Image 
            src="/student_hero.png"
            alt="Étudier à l'étranger"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/20" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20 pb-20">
          <Badge className="mb-6 py-1.5 px-4 bg-[#00AEEF] hover:bg-[#00AEEF] text-white border-none text-sm uppercase tracking-wider shadow-lg">
            Votre Avenir Commence Ici
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
            Accompagnement <span className="text-[#00AEEF]">Universitaire</span> International
          </h1>
          <p className="text-xl text-white mb-10 max-w-2xl mx-auto font-bold drop-shadow-lg opacity-90">
            Plus de 8 ans d'expertise dans l'assistance des étudiants maliens. Transformez votre rêve d'étudier à l'étranger en réalité concrète.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
             <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-black py-5 px-12 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_20px_50px_rgba(37,211,102,0.3)]"
              >
                Commencer mon projet
                <ArrowRight size={22} />
              </a>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-slate-50 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Al Moustour Voyages : <br />
                <span className="text-[#00AEEF]">Partenaire de votre réussite</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Depuis plus de 8 ans, nous accompagnons les étudiants maliens dans leurs projets d'études à l'étranger. Notre mission est de sécuriser votre admission et d'optimiser vos chances d'obtention de visa.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <span className="text-3xl font-bold text-[#00AEEF]">8+ ans</span>
                  <p className="text-sm text-slate-500">D'expérience</p>
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <span className="text-3xl font-bold text-[#00AEEF]">100+</span>
                  <p className="text-sm text-slate-500">Étudiants satisfaits</p>
                </div>
              </div>
              <div className="p-6 bg-[#00AEEF]/5 rounded-2xl border border-[#00AEEF]/10">
                <p className="text-slate-700 font-medium italic">
                  "Seul le Maroc, la France et la région du Québec au Canada étudient en français. Pour les autres destinations, une formation en langue est prévue."
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl relative z-10 border border-slate-100">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <ShieldCheck className="text-[#00AEEF]" size={28} />
                  Notre Engagement
                </h3>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                      <BookOpen size={20} className="text-[#00AEEF]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Inscriptions Stratégiques</h4>
                      <p className="text-slate-600 text-sm">Choix de l'université (publique ou privée) et obtention de bourses partielles.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                      <FileText size={20} className="text-[#00AEEF]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Expertise Visa</h4>
                      <p className="text-slate-600 text-sm">Montage minutieux de votre dossier pour maximiser les chances d'acceptation.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                      <Plane size={20} className="text-[#00AEEF]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Installation Sereine</h4>
                      <p className="text-slate-600 text-sm">Accueil à l'arrivée et assistance pour les dossiers de séjour et le logement.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Explorer */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Explorez nos <span className="text-[#00AEEF]">Destinations</span></h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
              Informations réelles et transparence totale sur les procédures et les frais par pays.
            </p>
          </div>

          <Tabs defaultValue="chine" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-12 overflow-x-auto pb-4 scrollbar-hide">
              <TabsList className="bg-slate-100/50 p-1.5 h-auto rounded-full border border-slate-200">
                {countries.map((country) => (
                  <TabsTrigger 
                    key={country.id} 
                    value={country.id}
                    className="rounded-full px-6 py-3 data-[state=active]:bg-white data-[state=active]:text-[#00AEEF] data-[state=active]:shadow-md transition-all font-semibold"
                  >
                    <span className="mr-2 hidden sm:inline">{country.flag}</span>
                    {country.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {countries.map((country) => (
              <TabsContent key={country.id} value={country.id} className="animate-in fade-in zoom-in-95 duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5">
                    <Card className="overflow-hidden border-none shadow-2xl rounded-3xl h-full sticky top-24">
                      <div className="relative h-64 sm:h-80 bg-slate-100">
                        <Image 
                          src={country.image}
                          alt={country.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 40vw"
                        />
                        <div className="absolute top-6 right-6">
                            <Badge className="bg-white/90 backdrop-blur-sm text-slate-900 px-4 py-2 border-none text-lg">
                                {country.flag} {country.name}
                            </Badge>
                        </div>
                      </div>
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-bold mb-4">Étudier en {country.name}</h3>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                          {country.intro}
                        </p>
                        <div className="flex items-center gap-2 text-green-600 font-bold mb-6">
                          <CheckCircle2 size={24} />
                          Accompagnement Expert
                        </div>
                        <a
                           href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg + " (" + country.name + ")")}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="w-full flex items-center justify-center gap-2 bg-[#00AEEF] hover:bg-sky-600 text-white font-bold py-4 rounded-2xl transition-all"
                        >
                           Dossier {country.name}
                        </a>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                      <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Info className="text-[#00AEEF]" size={22} />
                        Procédure
                      </h4>
                      <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm font-medium">
                        {country.procedure}
                      </p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                      <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Wallet className="text-[#00AEEF]" size={22} />
                        Frais détaillés
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.entries(country.expenses).map(([label, value]) => (
                          <div key={label} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                             <span className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1 block">
                                {label === "bourse" ? "Offre / Bourse" : 
                                 label === "private" ? "Université Privée" :
                                 label === "college" ? "Collège / Université" :
                                 label === "university" ? "Université" :
                                 label === "agency" ? "Frais d'agence" :
                                 label === "food" ? "Nourriture" :
                                 label === "housing" ? "Logement" : label}
                             </span>
                             <span className="text-slate-900 font-bold">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-sky-50 rounded-3xl p-6 border border-sky-100 flex items-start gap-4">
                        <ShieldCheck className="text-[#00AEEF] shrink-0 mt-1" size={24} />
                        <p className="text-sm text-sky-800">
                            <strong>Expertise :</strong> Les frais d'agence sont payables uniquement après obtention du visa. Un contrat signé à l'agence formalise votre procédure.
                        </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Filières Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Domaines d'études</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                    Plus d'une centaine de filières disponibles pour votre réussite future.
                </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
                {filieres.map((filiere, idx) => (
                    <div 
                        key={idx} 
                        className="px-4 py-2 bg-white rounded-full border border-slate-200 text-slate-700 text-xs font-bold hover:border-[#00AEEF] hover:text-[#00AEEF] transition-all cursor-default"
                    >
                        {filiere}
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Corporate Trust Section - Redesigned & Simplified */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00AEEF] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Pourquoi nous <span className="text-[#00AEEF]">Faire Confiance ?</span>
            </h2>
            <div className="h-1.5 w-24 bg-[#00AEEF] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500">
              <div className="w-14 h-14 bg-[#00AEEF]/20 rounded-2xl flex items-center justify-center mb-8 border border-[#00AEEF]/30 group-hover:scale-110 transition-transform">
                <FileText className="text-[#00AEEF]" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Contrat Officiel</h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                Chaque accompagnement est encadré par un contrat en bonne et due forme, signé physiquement dans nos bureaux à Bamako.
              </p>
            </div>

            <div className="group p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500">
              <div className="w-14 h-14 bg-[#25D366]/20 rounded-2xl flex items-center justify-center mb-8 border border-[#25D366]/30 group-hover:scale-110 transition-transform">
                <ShieldCheck className="text-[#25D366]" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Paiement sur Résultats</h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                Notre rémunération d'agence n'est exigée qu'une fois votre visa obtenu. Nous partageons votre objectif de réussite.
              </p>
            </div>

            <div className="group p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500">
              <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-8 border border-indigo-500/30 group-hover:scale-110 transition-transform">
                <Wallet className="text-indigo-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Transparence Totale</h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                Aucun frais caché. Tous les coûts (inscription, logement, repas, agence) sont détaillés avant le début de votre procédure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Votre projet d'études <span className="text-[#00AEEF]">Commence Maintenant</span></h2>
            <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto font-medium">
                Passez à l'agence à Bamako (Sotuba ACI) pour recevoir tous les détails et réponses à vos questions.
            </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-black py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl text-xl"
                >
                    Discuter avec un conseiller
                </a>
             </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
