"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Logo } from "@/components/Logo";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { useContent } from "@/components/ContentProvider";
import { NAV_LINKS, waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navigation() {
  const { settings } = useContent();
  // Reading progress, shown as a thin cyan line under the header
  const { scrollYProgress } = useScroll();
  const readScale = useTransform(scrollYProgress, (v) => v);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open ? "bg-canvas/80 backdrop-blur-md" : "bg-transparent max-lg:backdrop-blur-md"
      )}
    >
      <div className="relative z-10 flex h-[4.5rem] items-stretch justify-between">
        {/* Logo cell */}
        <div className="relative flex items-center px-5 lg:px-10">
          <Logo />
          <span className="absolute bottom-0 right-0 top-0 hidden w-px bg-white/20 lg:block" />
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-stretch lg:flex" aria-label="Navigation principale">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="button-sm text-white transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={waLink("Bonjour Al-Moustour, je souhaite me renseigner sur vos services.", { src: "nav" })}
            target="_blank"
            rel="noopener noreferrer"
            className="button-sm relative ml-6 flex items-center px-10 text-white transition-colors hover:text-accent"
          >
            <span className="absolute bottom-0 left-0 top-0 w-px bg-white/20" />
            Contact
          </a>
        </nav>

        {/* Burger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative flex w-[4.5rem] items-center justify-center border-l border-white/20 lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          <span className="relative block h-3 w-6">
            <span
              className={cn(
                "absolute left-0 right-0 h-px bg-white transition-all duration-300",
                open ? "top-1/2 rotate-45" : "top-0"
              )}
            />
            <span
              className={cn(
                "absolute left-0 right-0 h-px bg-white transition-all duration-300",
                open ? "top-1/2 -rotate-45" : "top-full"
              )}
            />
          </span>
        </button>
      </div>
      <span className="absolute bottom-0 left-0 right-0 z-10 h-px bg-white/20" />
      <motion.span
        style={{ scaleX: readScale }}
        className="absolute bottom-0 left-0 right-0 z-10 h-px origin-left bg-accent"
        aria-hidden="true"
      />

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 top-[4.5rem] flex flex-col justify-between bg-canvas px-5 pb-6 transition-all duration-500 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <ul className="flex flex-col gap-2 pt-16">
          {[...NAV_LINKS, { label: "Contact", href: "/#contact" }].map((l, i) => (
            <li
              key={l.href}
              className={cn("transition-all duration-500", open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}
              style={{ transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }}
            >
              <Link href={l.href} onClick={() => setOpen(false)} className="h3 text-white">
                <span className="text-white/40">+</span>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-4">
          <a href={`tel:${settings.phone}`} className="body-lg text-white/60">
            {settings.phoneDisplay}
          </a>
          <a
            href={waLink("Bonjour Al-Moustour, je souhaite me renseigner sur vos services.", { src: "nav-mobile" })}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full justify-center"
          >
            <span className="button-sm">Écrire sur WhatsApp</span>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
