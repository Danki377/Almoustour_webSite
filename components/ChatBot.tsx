"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";

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
    triggers: ["bonjour", "salut", "hello", "bonsoir"],
    response:
      "Bonjour ! Je suis l'assistant virtuel d'AL MOUSTOUR Voyages. Comment puis-je vous aider aujourd'hui ? 😊",
  },
  {
    triggers: ["études", "étudier", "université", "étude"],
    response:
      "Excellent ! Nous accompagnons les étudiants dans leurs projets d'études à l'étranger. Dans quel pays souhaitez-vous étudier ? 🎓",
  },
  {
    triggers: ["bourse", "financement", "argent", "coût"],
    response:
      "Nous vous aidons à trouver des bourses et solutions de financement. Avez-vous déjà une destination en tête ? 💰",
  },
  {
    triggers: ["canada", "usa", "états-unis", "france", "royaume-uni"],
    response:
      "Parfait ! Nous avons une excellente expertise dans cette destination. Souhaitez-vous planifier un rendez-vous avec nos conseillers ? 📞",
  },
  {
    triggers: ["contact", "rendez-vous", "conseiller"],
    response:
      "Vous pouvez nous contacter au +33 1 23 45 67 89 ou via WhatsApp. Nos conseillers sont disponibles du lundi au vendredi. 📞",
  },
  {
    triggers: ["prix", "tarif", "combien"],
    response:
      "Nos tarifs varient selon les services. Nous offrons une consultation gratuite ! Contactez-nous pour plus d'informations. 💼",
  },
];

export function ChatBot({ isOpen, onToggle }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Bonjour ! Je suis l'assistant virtuel d'AL MOUSTOUR. Comment puis-je vous aider ?",
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
      if (
        responseObj.triggers.some((trigger) => lowerMessage.includes(trigger))
      ) {
        return responseObj.response;
      }
    }

    return "Merci pour votre message ! Pour une réponse plus précise, n'hésitez pas à nous contacter directement au +33 1 23 45 67 89. 😊";
  };

  // Fonction pour générer un ID de session unique
  const generateSessionId = () => {
    return (
      "session-" + Math.random().toString(36).substr(2, 16) + "-" + Date.now()
    );
  };

  // Fonction pour récupérer ou créer la session
  const getOrCreateSession = () => {
    let sessionId = localStorage.getItem("chatbot_session_id");
    if (!sessionId) {
      sessionId = generateSessionId();
      localStorage.setItem("chatbot_session_id", sessionId);
    }
    return sessionId;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Vérifier/créer la session avant d'envoyer le message
    const sessionId = getOrCreateSession();

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Envoi du message et session au webhook
      const response = await fetch(
        "https://n8n.srv999393.hstgr.cloud/webhook/AL-Moustour-WebSite-ChatBot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: inputValue, session: sessionId }),
        }
      );
      const data = await response.json();

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text:
          data.output ||
          "Merci pour votre message ! Nous reviendrons vers vous bientôt.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text: "Une erreur est survenue. Veuillez réessayer plus tard.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 left-6 z-50 bg-[#00AEEF] text-white p-4 rounded-full shadow-2xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 group"
        aria-label="Ouvrir le chat"
      >
        <MessageCircle size={28} />

        {/* Notification Badge */}
        {/* <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
          !
        </div> */}

        {/* Tooltip */}
        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
            Besoin d&#39;aide ? Chattez avec nous !
            <div className="absolute top-1/2 -translate-y-1/2 right-full w-0 h-0 border-r-4 border-r-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6  left-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00AEEF] to-blue-600 px-6 py-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Assistant AL MOUSTOUR</h3>
              <p className="text-blue-100 text-sm">En ligne</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="text-white hover:text-blue-100 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs ${
                message.sender === "user" ? "order-1" : "order-2"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-[#00AEEF] text-white"
                    : "bg-white text-gray-800 border border-gray-200"
                }`}
              >
                {message.text}
              </div>
              <div
                className={`text-xs text-gray-500 mt-1 ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === "user"
                  ? "order-2 ml-2 bg-[#00AEEF]"
                  : "order-1 mr-2 bg-gray-200"
              }`}
            >
              {message.sender === "user" ? (
                <User size={16} className="text-white" />
              ) : (
                <Bot size={16} className="text-gray-600" />
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
              <Bot size={16} className="text-gray-600" />
            </div>
            <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent outline-none"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="w-10 h-10 bg-[#00AEEF] text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
