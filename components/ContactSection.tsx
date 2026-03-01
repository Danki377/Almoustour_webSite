"use client";

import { MapPin, Phone, Mail, Clock, Shield, Facebook } from "lucide-react";

const WA_NUMBER = "22373711111";

export function ContactSection() {
  const openWhatsApp = (msg: string) => {
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
            Contactez-<span className="text-[#00AEEF]">nous</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Notre canal principal est WhatsApp — contactez-nous directement pour un accompagnement rapide et personnalisé.
          </p>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#00AEEF] to-blue-600 mx-auto mt-8 rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* WhatsApp CTA — Primary */}
          <div className="bg-slate-950 rounded-3xl p-10 md:p-14 text-white text-center mb-8 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(37,211,102,0.1)_0%,_transparent_60%)]" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/30">
                <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4">Discutez avec nous sur WhatsApp</h3>
              <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
                Obtenez une réponse rapide de nos conseillers. Posez toutes vos questions sur les pays, les frais, les procédures et les filières disponibles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => openWhatsApp("Bonjour Al-Moustour ! Je souhaite me renseigner sur vos services pour étudier à l'étranger.")}
                  className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold px-10 py-4 rounded-full hover:bg-[#1ebd5a] transition-all shadow-xl shadow-green-600/30 transform hover:scale-105 text-lg"
                >
                  Études à l&#39;étranger
                </button>
                <button
                  onClick={() => openWhatsApp("Bonjour Al-Moustour, je souhaite réserver un billet d'avion. Pouvez-vous m'aider ?")}
                  className="inline-flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-white font-bold px-10 py-4 rounded-full hover:bg-white/20 transition-all transform hover:scale-105 text-lg"
                >
                  Billetterie d&#39;avion
                </button>
              </div>
            </div>
          </div>

          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Info Card */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Informations de contact</h4>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#00AEEF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#00AEEF]" size={20} />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-0.5">Adresse</h5>
                    <p className="text-gray-500 text-sm leading-relaxed">Bamako, Sotuba ACI, Avenue de l&#39;Armée<br />(Près du rond-point du 3ème pont)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-0.5">Téléphone / WhatsApp</h5>
                    <a href="tel:+22373711111" className="text-gray-500 text-sm hover:text-[#00AEEF] transition-colors">+223 73 71 11 11</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-0.5">Email</h5>
                    <a href="mailto:Almoustourvoyage@gmail.com" className="text-gray-500 text-sm hover:text-[#00AEEF] transition-colors">Almoustourvoyage@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Facebook className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-0.5">Facebook</h5>
                    <a href="https://www.facebook.com/agencedevoyagemali" target="_blank" rel="noreferrer" className="text-gray-500 text-sm hover:text-[#00AEEF] transition-colors">Almoustour Voyage</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours + Trust */}
            <div className="flex flex-col gap-5">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 flex-grow">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="text-orange-500" size={20} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Horaires d&#39;ouverture</h4>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between"><span className="font-medium">Lun - Ven</span><span>9h00 - 18h00</span></div>
                  <div className="flex justify-between"><span className="font-medium">Samedi</span><span>10h00 - 16h00</span></div>
                  <div className="flex justify-between"><span className="font-medium">Dimanche</span><span className="text-red-500">Fermé</span></div>
                </div>
                <p className="text-slate-500 text-xs mt-5 italic">Sur WhatsApp, nos conseillers répondent en dehors des heures de bureau.</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-3xl p-6">
                <div className="flex items-start gap-3">
                  <Shield className="text-green-600 mt-0.5 flex-shrink-0" size={22} />
                  <div>
                    <h5 className="font-bold text-green-800 mb-1">Pourquoi nous faire confiance ?</h5>
                    <p className="text-green-700 text-sm">8+ ans d&#39;expérience. 500+ étudiants satisfaits. Accompagnement personnalisé de A à Z.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124573.20965140348!2d-8.080053156640625!3d12.653721900000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe51d308cfb8890d%3A0x417f78c33f6489f2!2sAgence%20Almoustour%20Voyage!5e0!3m2!1sfr!2sml!4v1758208610701!5m2!1sfr!2sml"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Al Moustour Voyages — Localisation Bamako"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
