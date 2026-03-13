"use client";

import { MapPin, Phone, Mail, Clock, Shield, Facebook, X, GraduationCap, Plane, ArrowRight } from "lucide-react";
import { useState } from "react";

const WA_NUMBER = "22373711111";

export function ContactSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWhatsAppClick = (message: string) => {
    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    setIsModalOpen(false);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header — Editorial Style */}
        <div className="text-center mb-20">
          <span className="inline-block text-[#00AEEF] text-xs font-black uppercase tracking-[0.3em] mb-4">
            Parlons de votre projet
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-6">
            Contactez-<span className="text-[#00AEEF]">nous.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Un accompagnement humain et personnalisé pour transformer vos ambitions internationales en succès concrets.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Main Global CTA — Unified & Premium */}
          <div className="bg-slate-950 rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.2)] mb-12">
            {/* Background luxury accents */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#00AEEF]/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#25D366]/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#25D366] rounded-2xl flex items-center justify-center mx-auto mb-10 shadow-lg shadow-green-500/20 transform hover:rotate-6 transition-transform">
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Réalisons vos rêves ensemble</h3>
              <p className="text-slate-400 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed font-light">
                Obtenez une réponse directe de nos conseillers experts sur WhatsApp.
              </p>
              
              <button
                onClick={() => setIsModalOpen(true)}
                className="relative overflow-hidden group bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-black px-12 py-5 rounded-2xl text-lg transition-all duration-300 hover:scale-[1.05] active:scale-95 shadow-2xl shadow-green-600/30 ring-4 ring-white/5 hover:ring-green-400/30 flex items-center justify-center gap-3 mx-auto"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-25deg] -translate-x-full group-hover:animate-[shine_0.75s_ease-in-out]" />
                
                Commencer la discussion
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Info Card */}
            <div className="bg-white rounded-[2rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h4 className="text-xl font-black text-slate-900 mb-8 tracking-tight">Informations</h4>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="text-[#00AEEF]" size={22} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 mb-1">Adresse</h5>
                    <p className="text-slate-500 text-sm leading-loose">Bamako, Sotuba ACI, Avenue de l'Armée<br />(Près du rond-point du 3ème pont)</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center shrink-0">
                    <Phone className="text-green-600" size={22} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 mb-1">Téléphone</h5>
                    <a href="tel:+22373711111" className="text-slate-500 text-sm hover:text-[#00AEEF] transition-colors font-medium">+223 73 71 11 11</a>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0">
                    <Mail className="text-indigo-600" size={22} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 mb-1">Email</h5>
                    <a href="mailto:Almoustourvoyage@gmail.com" className="text-slate-500 text-sm hover:text-[#00AEEF] transition-colors font-medium">Almoustourvoyage@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Time & Trust Card */}
            <div className="flex flex-col gap-8">
              <div className="bg-white rounded-[2rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 flex-1">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
                    <Clock className="text-orange-500" size={22} />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 tracking-tight">Horaires</h4>
                </div>
                <div className="space-y-4 text-sm text-slate-600 font-semibold mb-8">
                  <div className="flex justify-between pb-3 border-b border-slate-50"><span>Lun - Ven</span><span className="text-slate-900">9h00 - 18h00</span></div>
                  <div className="flex justify-between pb-3 border-b border-slate-50"><span>Samedi</span><span className="text-red-500 capitalize">Fermé</span></div>
                  <div className="flex justify-between"><span>Dimanche</span><span className="text-red-500 capitalize">Fermé</span></div>
                </div>
                <p className="text-slate-400 text-xs italic bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed">
                  Note : Sur WhatsApp, nos conseillers restent disponibles même après la fermeture.
                </p>
              </div>
              
              <div className="bg-[#00AEEF] rounded-[1.5rem] p-6 text-white shadow-lg shadow-sky-200/50">
                <div className="flex items-start gap-4">
                  <Shield className="mt-1 flex-shrink-0" size={24} strokeWidth={2.5} />
                  <div>
                    <h5 className="font-black mb-1">8 ans d'expertise</h5>
                    <p className="text-white/80 text-xs font-medium leading-relaxed">Un accompagnement certifié et des centaines de dossiers réussis chaque année.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section — Refined Container */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-white p-4">
            <div className="rounded-[1.8rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124573.20965140348!2d-8.080053156640625!3d12.653721900000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe51d308cfb8890d%3A0x417f78c33f6489f2!2sAgence%20Almoustour%20Voyage!5e0!3m2!1sfr!2sml!4v1758208610701!5m2!1sfr!2sml"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation — Al Moustour Voyages"
              />
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl relative z-10 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-8 md:p-12">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#25D366] rounded-2xl flex items-center justify-center shadow-lg shadow-green-200 mb-8">
                  <svg viewBox="0 0 24 24" className="w-9 h-9 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                
                <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                  Comment pouvons-nous vous aider ?
                </h3>
                <p className="text-slate-500 font-medium text-base max-w-sm mx-auto mb-10 leading-relaxed">
                  Choisissez le service pour lequel vous souhaitez obtenir des informations.
                </p>
                
                <div className="flex flex-col gap-4 w-full">
                  <button
                    onClick={() => handleWhatsAppClick("Bonjour Al-Moustour, je souhaite me renseigner sur les études à l'étranger.")}
                    className="relative overflow-hidden flex items-center justify-between bg-slate-50 hover:bg-[#25D366] hover:text-white text-slate-900 font-bold px-8 py-5 rounded-2xl transition-all group/mbtn"
                  >
                    <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-25deg] -translate-x-full group-hover/mbtn:animate-[shine_0.75s_ease-in-out]" />
                    <div className="flex items-center gap-4">
                      <GraduationCap className="group-hover/mbtn:text-white text-[#00AEEF] transition-colors" />
                      <span>Études à l'étranger</span>
                    </div>
                    <ArrowRight size={20} className="opacity-0 group-hover/mbtn:opacity-100 transition-all -translate-x-2 group-hover/mbtn:translate-x-0" />
                  </button>
                  
                  <button
                    onClick={() => handleWhatsAppClick("Bonjour Al-Moustour, je souhaite réserver un billet d'avion.")}
                    className="relative overflow-hidden flex items-center justify-between bg-slate-50 hover:bg-[#25D366] hover:text-white text-slate-900 font-bold px-8 py-5 rounded-2xl transition-all group/mbtn"
                  >
                    <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-25deg] -translate-x-full group-hover/mbtn:animate-[shine_0.75s_ease-in-out]" />
                    <div className="flex items-center gap-4">
                      <Plane className="group-hover/mbtn:text-white text-[#00AEEF] transition-colors" />
                      <span>Billetterie d'avion</span>
                    </div>
                    <ArrowRight size={20} className="opacity-0 group-hover/mbtn:opacity-100 transition-all -translate-x-2 group-hover/mbtn:translate-x-0" />
                  </button>
                  
                  <button
                    onClick={() => handleWhatsAppClick("Bonjour Al-Moustour, je souhaite me renseigner sur l'assistance visa.")}
                    className="relative overflow-hidden flex items-center justify-between bg-slate-50 hover:bg-[#25D366] hover:text-white text-slate-900 font-bold px-8 py-5 rounded-2xl transition-all group/mbtn"
                  >
                    <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-25deg] -translate-x-full group-hover/mbtn:animate-[shine_0.75s_ease-in-out]" />
                    <div className="flex items-center gap-4">
                      <MapPin className="group-hover/mbtn:text-white text-[#00AEEF] transition-colors" />
                      <span>Assistance Visa</span>
                    </div>
                    <ArrowRight size={20} className="opacity-0 group-hover/mbtn:opacity-100 transition-all -translate-x-2 group-hover/mbtn:translate-x-0" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
