"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Envoi des données du formulaire au webhook
      await fetch(
        "https://n8n.srv999393.hstgr.cloud/webhook/c1ed79c5-0fee-4e93-9a13-cdb054a1dc18",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      // Optionnel : gérer l'erreur d'envoi
      alert("Erreur lors de l'envoi du message. Veuillez réessayer.");
    }
    setIsLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contactez-<span className="text-[#00AEEF]">nous</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Prêt à commencer votre aventure académique ? Nous sommes là pour
            vous accompagner à chaque étape
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00AEEF] to-blue-600 mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Informations de contact
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00AEEF] to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Adresse
                    </h4>
                    <p className="text-gray-600">
                      BAMAKO, SOTUBA ACI AVENU DE L&#39;ARMEE (Prés Du Rond
                      Point De La Station Shell)
                      <br />
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Téléphone
                    </h4>
                    <p className="text-gray-600">
                      +223 73 71 11 11 / 63 71 11 11
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">ALMOUSTOURVOYAGE@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-400 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Horaires
                    </h4>
                    <p className="text-gray-600">
                      Lun - Ven: 9h00 - 18h00
                      <br />
                      Sam: 10h00 - 16h00
                      <br />
                      Dim: Fermé
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-r from-[#00AEEF] to-blue-600 rounded-3xl p-6 text-white">
              <h4 className="font-bold text-lg mb-3">💡 Conseil</h4>
              <p className="text-blue-100 text-sm">
                Pour une réponse plus rapide, n&#39;hésitez pas à préciser votre
                destination d&#39;études souhaitée et votre niveau d&#39;étude
                dans votre message.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-600" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Message envoyé avec succès !
                  </h3>
                  <p className="text-gray-600">
                    Merci pour votre message. Notre équipe vous contactera dans
                    les plus brefs délais.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">
                    Envoyez-nous un message
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent transition-all duration-200"
                          placeholder="Votre nom complet"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent transition-all duration-200"
                          placeholder="votre.email@exemple.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent transition-all duration-200"
                          placeholder="+33 1 23 45 67 89"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Sujet *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Sélectionnez un sujet</option>
                          <option value="etudes">
                            Études à l&#39;étranger
                          </option>
                          <option value="bourses">Recherche de bourses</option>
                          <option value="voyage">Services de voyage</option>
                          <option value="autre">Autre</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Décrivez votre projet d'études ou votre demande..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-[#00AEEF] to-blue-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-600 hover:to-[#00AEEF] transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Envoyer le message
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-20">
          <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-xl border border-gray-200">
            {/* Remplace ce bloc par l'iframe Google Maps */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124573.20965140348!2d-8.080053156640625!3d12.653721900000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe51d308cfb8890d%3A0x417f78c33f6489f2!2sAgence%20Almoustour%20Voyage!5e0!3m2!1sfr!2sml!4v1758208610701!5m2!1sfr!2sml"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Agence Almoustour Voyage"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
