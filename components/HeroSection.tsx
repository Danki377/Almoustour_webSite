"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { GraduationCap, Plane, ShieldCheck } from "lucide-react";
import { SplitFlap } from "@/components/SplitFlap";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ramp, useRamp } from "@/lib/motion";

// Re-encoded with a keyframe every 3 frames so seeking on scroll stays smooth
const VIDEO_DESKTOP = "/videos/hero-scroll.mp4";
const VIDEO_MOBILE = "/videos/hero-scroll-mobile.mp4";

const DEPARTURES = ["Paris", "Montréal", "Istanbul", "Casablanca", "Pékin", "Moscou", "New Delhi", "New York", "Dubaï"];

const FEATURES = [
  { icon: GraduationCap, title: "Études internationales", text: "France, Canada, Turquie, Maroc, Chine…" },
  { icon: Plane, title: "Billetterie toutes lignes", text: "Tarifs étudiants et meilleurs prix" },
  { icon: ShieldCheck, title: "Paiement sur résultats", text: "Frais d'agence perçus après obtention du visa" },
];

/** Fades a block in and/or out over slices of the hero's scroll progress. */
function Stage({
  progress,
  fadeIn,
  fadeOut,
  className,
  children,
}: {
  progress: MotionValue<number>;
  fadeIn?: [number, number];
  fadeOut?: [number, number];
  className?: string;
  children: ReactNode;
}) {
  const input: number[] = [];
  const alpha: number[] = [];
  const shift: number[] = [];
  if (fadeIn) {
    input.push(fadeIn[0], fadeIn[1]);
    alpha.push(0, 1);
    shift.push(48, 0);
  } else {
    input.push(0);
    alpha.push(1);
    shift.push(0);
  }
  if (fadeOut) {
    input.push(fadeOut[0], fadeOut[1]);
    alpha.push(1, 0);
    shift.push(0, -48);
  } else {
    input.push(1);
    alpha.push(1);
    shift.push(0);
  }
  const opacity = useRamp(progress, input, alpha);
  const y = useRamp(progress, input, shift);
  const pointerEvents = useTransform(opacity, (o) => (o > 0.5 ? "auto" : "none"));
  return (
    <motion.div style={{ opacity, y, pointerEvents }} className={className}>
      {children}
    </motion.div>
  );
}

function Word({ progress, at, children }: { progress: MotionValue<number>; at: number; children: ReactNode }) {
  const opacity = useRamp(progress, [at, at + 0.05], [0, 1]);
  const x = useRamp(progress, [at, at + 0.05], [-24, 0]);
  return (
    <motion.span style={{ opacity, x }} className="block">
      {children}
    </motion.span>
  );
}

function Ctas({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4", className)}>
      <Link href="/#services" className="btn-primary w-full justify-center shadow-2xl sm:w-auto">
        <span className="button-sm">Découvrir nos services</span>
        <ArrowIcon />
      </Link>
      <a
        href={waLink("Bonjour Al-Moustour, je souhaite échanger avec un conseiller pour mon projet de voyage ou d'études.")}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-wa w-full justify-center shadow-2xl shadow-whatsapp/25 sm:w-auto"
      >
        <WhatsAppIcon />
        <span className="button-sm font-semibold">Parler à un conseiller</span>
      </a>
    </div>
  );
}

function FeatureStrip() {
  return (
    <div className="border-t border-white/10 bg-canvas/70 backdrop-blur-xl">
      <div className="no-scrollbar flex snap-x overflow-x-auto divide-x divide-white/10 sm:container-v sm:grid sm:grid-cols-3 sm:overflow-visible">
        {FEATURES.map((f) => (
          <div key={f.title} className="flex min-w-[17rem] shrink-0 snap-start items-center gap-4 px-5 py-4 text-left sm:min-w-0 sm:px-6 sm:py-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-accent">
              <f.icon className="h-[18px] w-[18px]" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">{f.title}</p>
              <p className="text-xs text-white/60">{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Eyebrow() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-canvas/60 px-4 py-2 text-xs font-medium tracking-wide text-white shadow-xl backdrop-blur-md sm:text-sm">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <span className="font-semibold uppercase tracking-wider text-accent">Al Moustour Voyages</span>
      <span className="hidden text-white/40 sm:inline">·</span>
      <span className="hidden text-white/80 sm:inline">Votre passerelle vers le monde</span>
    </div>
  );
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  // Cabin interior is bright: shade it more at the start, less once we are in the sky
  const shade = useRamp(scrollYProgress, [0, 0.35, 0.7, 1], [0.55, 0.3, 0.25, 0.45]);
  const videoScale = useRamp(scrollYProgress, [0, 1], [1.04, 1]);
  const hintOpacity = useRamp(scrollYProgress, [0, 0.05], [1, 0]);
  const stripY = useTransform(scrollYProgress, (v) => `${ramp(v, [0.72, 0.85], [100, 0])}%`);
  const railScale = useRamp(scrollYProgress, [0, 1], [0, 1]);

  // Scrub the film with the scroll position (eased, so it glides instead of stepping)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;

    video.src = window.matchMedia("(max-width: 767px)").matches ? VIDEO_MOBILE : VIDEO_DESKTOP;
    video.load();

    let raf = 0;
    let current = 0;
    const tick = () => {
      const duration = video.duration;
      if (duration && Number.isFinite(duration)) {
        const target = scrollYProgress.get() * (duration - 0.05);
        current += (target - current) * 0.14;
        if (!video.seeking && Math.abs(video.currentTime - current) > 0.02) {
          video.currentTime = current;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // iOS Safari only paints seeked frames once the video has been "played" by a gesture
    const unlock = () => {
      video.play().then(() => video.pause()).catch(() => {});
    };
    window.addEventListener("touchstart", unlock, { once: true, passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("touchstart", unlock);
    };
  }, [reduceMotion, scrollYProgress]);

  // Reduced motion: a single static screen on the final frame, everything visible
  if (reduceMotion) {
    return (
      <section id="home" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-end.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas/70 via-canvas/30 to-canvas" />
        <div className="container-v relative flex flex-1 flex-col items-center justify-center gap-6 pt-28">
          <Eyebrow />
          <h1 className="h1">
            Voyagez<span className="text-accent">.</span>
          </h1>
          <p className="body-xl max-w-2xl">
            Études à l&apos;étranger, billetterie d&apos;avion et assistance visa, de Bamako vers le monde.
          </p>
          <Ctas />
        </div>
        <div className="relative mt-10">
          <FeatureStrip />
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="home" className="relative h-[280svh] lg:h-[320svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Film (poster shows instantly, video takes over once loaded) */}
        <motion.div style={{ scale: videoScale }} className="absolute inset-0">
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/hero-start-mobile.jpg" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero-start.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
          </picture>
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </motion.div>
        <motion.div style={{ opacity: shade }} className="absolute inset-0 bg-canvas" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-canvas/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-canvas to-transparent" />

        {/* 1 — Cabin: the promise */}
        <Stage
          progress={scrollYProgress}
          fadeOut={[0.18, 0.28]}
          className="container-v absolute inset-0 flex flex-col items-center justify-center pt-16 text-center"
        >
          <Eyebrow />
          <h1 className="h1 mt-6 font-bold drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)] lg:mt-8">
            Voyagez<span className="text-accent">.</span>
          </h1>
          <p className="body-xl mt-6 max-w-2xl drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)] sm:text-2xl">
            Études à l&apos;étranger, billetterie d&apos;avion et assistance visa.
            <br className="hidden sm:inline" />
            <span className="text-white/80"> De Bamako vers les plus grandes destinations mondiales.</span>
          </p>
        </Stage>

        {/* 2 — Through the window: what we handle */}
        <Stage
          progress={scrollYProgress}
          fadeIn={[0.3, 0.36]}
          fadeOut={[0.56, 0.64]}
          className="container-v absolute inset-0 flex flex-col justify-center"
        >
          <p className="title-xs mb-4 uppercase tracking-[0.3em] text-accent">On s&apos;occupe de tout</p>
          <div className="text-[clamp(3rem,10vw,8.5rem)] font-semibold leading-[0.95] tracking-[-0.06em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.45)]">
            <Word progress={scrollYProgress} at={0.33}>
              Admission.
            </Word>
            <Word progress={scrollYProgress} at={0.39}>
              Visa.
            </Word>
            <Word progress={scrollYProgress} at={0.45}>
              <span className="text-accent">Billet.</span>
            </Word>
          </div>
        </Stage>

        {/* 3 — Open sky: arrival + actions */}
        <Stage
          progress={scrollYProgress}
          fadeIn={[0.66, 0.74]}
          className="container-v absolute inset-0 flex flex-col items-start justify-end pb-36 text-left sm:pb-36 lg:pb-40"
        >
          <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-base sm:text-lg">
            <span className="title-xs uppercase tracking-[0.25em] text-white/70">Départ BKO</span>
            <span className="text-sun">→</span>
            <SplitFlap words={DEPARTURES} length={10} />
          </div>
          <h2 className="h2 max-w-3xl drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            Votre avenir <span className="text-accent">décolle</span> depuis Bamako.
          </h2>
          <Ctas className="mt-8 w-full sm:w-auto sm:justify-start" />
        </Stage>

        {/* Services strip slides up with the final stage */}
        <motion.div style={{ y: stripY }} className="absolute inset-x-0 bottom-0">
          <FeatureStrip />
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-3"
        >
          <span className="title-xs uppercase tracking-[0.3em] text-white/70">Faites défiler pour embarquer</span>
          <span className="relative h-10 w-px overflow-hidden bg-white/20">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-hint bg-white" />
          </span>
        </motion.div>

        {/* Flight progress rail (desktop) */}
        <div className="pointer-events-none absolute right-10 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
          <span className="title-xs text-white/60">BKO</span>
          <span className="relative h-40 w-px bg-white/15">
            <motion.span
              style={{ scaleY: railScale }}
              className="absolute inset-0 origin-top bg-accent"
            />
          </span>
          <span className="title-xs text-white/60">Monde</span>
        </div>
      </div>
    </section>
  );
}
