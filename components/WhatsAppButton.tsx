"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export function WhatsAppButton() {
  // Hidden over the hero so it never covers the main call-to-action
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={waLink("Bonjour ! Je souhaiterais obtenir des informations sur vos services.", { src: "floating" })}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_12px_30px_-10px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-105 lg:bottom-8 lg:right-8",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
      aria-label="Contacter via WhatsApp"
      tabIndex={visible ? 0 : -1}
    >
      <span className="absolute inset-0 animate-soft-ping rounded-full bg-whatsapp" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </a>
  );
}
