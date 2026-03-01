"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, User, Phone } from "lucide-react";

const WA_NUMBER = "22373711111";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
}

const botResponses = [
  {
    triggers: ["bonjour", "salut", "hello", "bonsoir", "hi"],
    response: "Bonjour ! 👋 Je suis l'assistant virtuel d'Al Moustour Voyages. Je peux répondre à vos questions rapidement. Pour un accompagnement complet, contactez-nous directement sur WhatsApp. Comment puis-je vous aider ?",
  },
  {
    triggers: ["france", "campus france", "français"],
    response: "🇫🇷 **Études en France**\n• Procédure Campus France (gratuite)\n• Frais proc. publique : 250 000 FCFA\n• Frais proc. privée : 750 000 FCFA\n• Frais agence : 650 000 FCFA\n• Taux de réussite : **90%**\n• Compte bloqué : 5 000 000 FCFA (remboursable)\n\nVous souhaitez commencer ?",
  },
  {
    triggers: ["canada", "canadien", "québec"],
    response: "🇨🇦 **Études au Canada**\n• Collèges : 5 000 000 FCFA/an\n• Frais procédures : 400 000 FCFA\n• Frais agence : 850 000 FCFA\n• Logement : ~250 000 FCFA/mois\n• Taux de réussite : 65%\n\nNos experts maximisent vos chances avec un dossier solide !",
  },
  {
    triggers: ["maroc", "morocco"],
    response: "🇲🇦 **Études au Maroc**\n• Bourse : 3 500 000 FCFA (tout le cycle !)\n• Frais agence : 500 000 FCFA\n• **Garantie 100%** sur les bourses\n• Logement : ~60 000 FCFA/mois\n\nEnseignement en français, système similaire au Mali.",
  },
  {
    triggers: ["turquie", "turkey"],
    response: "🇹🇷 **Études en Turquie**\n• Bourse : 3 500 000 FCFA (tout le cycle, tout inclus !)\n• Université privée : 1 500 000 FCFA/an\n• Taux de réussite : **87%**\n• Logement : ~50 000 FCFA/mois\n\nUn seul paiement couvre inscription + langue + visa + agence.",
  },
  {
    triggers: ["chine", "china"],
    response: "🇨🇳 **Études en Chine**\n• Bourse : 3 500 000 FCFA (logement + visa inclus)\n• Université privée : 1 600 000 FCFA/an\n• **Garantie 100%**\n• Frais agence bourse : 400 000 FCFA\n\n2 options : formation en chinois ou en anglais.",
  },
  {
    triggers: ["russie", "russia"],
    response: "🇷🇺 **Études en Russie**\n• Bourse : 2 500 000 FCFA\n• Tout inclus 1ère année : inscription + langue + visa + logement\n• **Garantie 100%**\n• Nourriture : ~50 000 FCFA/mois\n\nDiplômes reconnus mondialement.",
  },
  {
    triggers: ["inde", "india"],
    response: "🇮🇳 **Études en Inde**\n• Dès 1 500 000 FCFA/an\n• Frais procédures : 250 000 FCFA\n• Frais agence : 700 000 FCFA\n• **Garantie 95%**\n• Excellente en médecine, informatique, ingénierie.",
  },
  {
    triggers: ["usa", "états-unis", "etats-unis", "américain", "american"],
    response: "🇺🇸 **Études aux États-Unis**\n• Universités : dès 10 000 000 FCFA/an\n• Frais procédures : 650 000 FCFA\n• Frais agence : 850 000 FCFA\n• Taux de réussite : 80%\n\nVisa F-1 obtenu grâce à notre expertise !",
  },
  {
    triggers: ["bourse", "bourses", "financement"],
    response: "🎓 **Bourses disponibles**\n• 🇨🇳 Chine : **3 500 000 FCFA** — Garantie 100%\n• 🇷🇺 Russie : **2 500 000 FCFA** — Garantie 100%\n• 🇹🇷 Turquie : **3 500 000 FCFA** — 87% réussite\n• 🇲🇦 Maroc : **3 500 000 FCFA** — Garantie 100%\n\nLes places sont limitées, postulez tôt !",
  },
  {
    triggers: ["billet", "avion", "vol", "ticket", "voyager", "réserver"],
    response: "✈️ **Billetterie d'Avion**\nNous réservons vos billets depuis Bamako vers toutes les destinations mondiales au meilleur prix.\n\nContactez-nous directement sur WhatsApp pour un devis rapide !",
  },
  {
    triggers: ["visa", "document"],
    response: "📋 **Préparation Visa**\nNous préparons votre dossier de visa avec soin pour maximiser vos chances. Tous les refus viennent de dossiers incomplets — avec nous, c'est fait correctement.\n\nContactez-nous pour en savoir plus sur la procédure selon votre destination !",
  },
  {
    triggers: ["prix", "tarif", "combien", "coût", "frais", "payer"],
    response: "💰 **Nos Services**\nNous proposons un accompagnement complet pour vos études à l'étranger.\n\nVoulez-vous les informations pour un pays spécifique ? (France, Canada, Maroc, Turquie, Chine, Russie, Inde, USA)",
  },
  {
    triggers: ["contact", "appel", "téléphone", "whatsapp"],
    response: "📱 **Contactez-nous directement**\n• WhatsApp / Tel : +223 73 71 11 11\n• Email : Almoustourvoyage@gmail.com\n• Adresse : Sotuba ACI, avenue de l'armée (près du 3ème pont), Bamako\n\nNos conseillers vous répondent rapidement sur WhatsApp !",
  },
  {
    triggers: ["bonjour", "merci", "au revoir"],
    response: "Avec plaisir ! N'hésitez pas à revenir si vous avez d'autres questions. Bonne chance pour votre projet d'études ! 🌟",
  },
];

export function ChatBot({ isOpen, onToggle }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Bonjour ! 👋 Je suis l'assistant Al Moustour. Je peux répondre à vos questions sur nos destinations, frais et procédures.\n\nPour un accompagnement personnalisé, utilisez le bouton WhatsApp vert. Comment puis-je vous aider ?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    for (const responseObj of botResponses) {
      if (responseObj.triggers.some((trigger) => lowerMessage.includes(trigger))) {
        return responseObj.response;
      }
    }
    return "Je n'ai pas bien compris votre question. 🤔 Vous pouvez me poser des questions sur la France, le Canada, le Maroc, la Turquie, la Chine, la Russie, l'Inde ou les USA.\n\nOu contactez directement nos conseillers sur WhatsApp pour une réponse immédiate !";
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = findBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const goToWhatsApp = () => {
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour Al-Moustour ! J'ai une question sur vos services.")}`, "_blank");
  };

  const formatMessage = (text: string) => {
    return text.split("\n").map((line, i) => (
      <span key={i}>
        {line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .split(/(<strong>.*?<\/strong>)/)
          .map((part, j) =>
            part.startsWith("<strong>") ? (
              <strong key={j}>{part.replace(/<\/?strong>/g, "")}</strong>
            ) : (
              part
            )
          )}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm sm:max-w-md">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-100" style={{ height: "540px" }}>
        {/* Header */}
        <div className="bg-slate-950 px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00AEEF] rounded-2xl flex items-center justify-center">
              <Bot className="text-white" size={20} />
            </div>
            <div>
              <div className="text-white font-bold text-sm">Assistant Al Moustour</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs font-medium">En ligne</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={goToWhatsApp}
              title="Continuer sur WhatsApp"
              className="w-8 h-8 bg-[#25D366] rounded-xl flex items-center justify-center hover:bg-[#1ebd5a] transition-colors"
            >
              <Phone size={14} className="text-white" />
            </button>
            <button
              onClick={onToggle}
              className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        </div>

        {/* WA Banner */}
        <div
          className="bg-green-50 border-b border-green-100 px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-green-100 transition-colors flex-shrink-0"
          onClick={goToWhatsApp}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-green-600 flex-shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="text-green-700 text-xs font-medium">Pour un accompagnement rapide → Contactez-nous sur WhatsApp</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} items-end gap-2`}>
              {message.sender === "bot" && (
                <div className="w-8 h-8 bg-slate-900 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Bot size={14} className="text-[#00AEEF]" />
                </div>
              )}
              <div className={`max-w-[82%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${message.sender === "user"
                ? "bg-[#00AEEF] text-white rounded-br-sm"
                : "bg-white text-gray-700 border border-gray-100 rounded-bl-sm"
                }`}>
                {formatMessage(message.text)}
              </div>
              {message.sender === "user" && (
                <div className="w-8 h-8 bg-[#00AEEF] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <User size={14} className="text-white" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start items-end gap-2">
              <div className="w-8 h-8 bg-slate-900 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Bot size={14} className="text-[#00AEEF]" />
              </div>
              <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                <div className="flex space-x-1.5">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick questions */}
        <div className="px-3 py-2 border-t border-gray-100 bg-white flex-shrink-0">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {["🇫🇷 France", "🇨🇦 Canada", "🇲🇦 Maroc", "🇨🇳 Chine", "✈️ Billet"].map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInputValue(q.split(" ")[1] || q);
                  setTimeout(sendMessage, 10);
                }}
                className="whitespace-nowrap text-xs bg-slate-100 hover:bg-[#00AEEF]/10 text-slate-700 hover:text-[#00AEEF] px-3 py-1.5 rounded-full transition-all flex-shrink-0"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="px-3 pb-3 bg-white flex-shrink-0">
          <div className="flex items-center gap-2 bg-slate-50 border border-gray-200 rounded-2xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#00AEEF]/30 focus-within:border-[#00AEEF]/50">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Posez votre question..."
              className="flex-1 text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
            />
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim()}
              className="w-8 h-8 bg-[#00AEEF] rounded-xl flex items-center justify-center hover:bg-sky-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send size={14} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
