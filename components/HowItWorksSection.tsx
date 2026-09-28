"use client";

import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { Compass, FileSignature, MessageCircle, Plane, PlaneTakeoff } from "lucide-react";
import { HeadSplit } from "@/components/Head";
import { ramp, useRamp, useSectionProgress } from "@/lib/motion";

const STEPS = [
  {
    icon: MessageCircle,
    title: ["Parlez-nous de", "votre projet"],
    text: "Un simple message WhatsApp suffit pour démarrer.",
  },
  {
    icon: Compass,
    title: ["Recevez une", "orientation"],
    text: "Pays, filière et université adaptés à votre profil.",
  },
  {
    icon: FileSignature,
    title: ["Signez votre", "contrat à l'agence"],
    text: "Chaque procédure est formalisée dans nos bureaux à Bamako.",
  },
  {
    icon: PlaneTakeoff,
    title: ["Partez l'esprit", "serein"],
    text: "Frais d'agence payables uniquement après obtention du visa.",
  },
];

/** Where the plane crosses step `i` on the flight line (0 → 1). */
const stopAt = (i: number) => (i + 0.15) / STEPS.length;

function Step({ progress, index, step }: { progress: MotionValue<number>; index: number; step: (typeof STEPS)[number] }) {
  const at = stopAt(index);
  const opacity = useRamp(progress, [at - 0.12, at], [0.28, 1]);
  const y = useRamp(progress, [at - 0.12, at], [18, 0]);
  return (
    <motion.div style={{ opacity, y }} className="flex flex-col gap-10 lg:gap-[8.375rem]">
      <div className="flex items-start gap-3">
        <step.icon className="h-[3.0625rem] w-[3.0625rem] text-accent" strokeWidth={1.1} />
        <span className="text-[0.625rem] font-semibold leading-[0.6875rem] text-white/50">0{index + 1}</span>
      </div>
      <div className="flex flex-col gap-4">
        <p className="body-md">
          {step.title[0]}
          <br />
          {step.title[1]}
        </p>
        <p className="body-md text-white/50">{step.text}</p>
      </div>
    </motion.div>
  );
}

function Stop({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const at = stopAt(index);
  const lit = useRamp(progress, [at - 0.02, at], [0, 1]);
  return (
    <span
      className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-canvas"
      style={{ left: `${at * 100}%` }}
    >
      <motion.span style={{ opacity: lit }} className="absolute inset-[-1px] rounded-full bg-accent shadow-[0_0_12px_2px_rgba(0,174,239,0.6)]" />
    </span>
  );
}

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  // The plane flies across while the steps travel from low on the screen to its middle
  const progress = useSectionProgress(ref, ["start 0.85", "end 0.55"]);
  const fill = useRamp(progress, [0, 1], [0, 1]);
  const planeLeft = useTransform(progress, (v) => `${ramp(v, [0, 1], [0, 100])}%`);

  return (
    <section id="parcours" className="pb-16 pt-16 lg:py-20">
      <div className="container-v">
        <HeadSplit
          title="Comment ça marche"
          description={
            <>
              Un accompagnement humain, du premier message <br className="hidden lg:block" />
              jusqu&apos;à votre installation à l&apos;étranger.
            </>
          }
        />

        <div ref={ref}>
          {/* Flight line */}
          <div className="relative mb-12 hidden h-8 lg:block" aria-hidden="true">
            <span className="absolute inset-x-0 top-1/2 h-px border-t border-dashed border-white/20" />
            <motion.span style={{ scaleX: fill }} className="absolute inset-x-0 top-1/2 h-px origin-left bg-accent" />
            {STEPS.map((_, i) => (
              <Stop key={i} progress={progress} index={i} />
            ))}
            <motion.span
              style={{ left: planeLeft }}
              className="absolute top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-canvas text-accent ring-1 ring-accent/50"
            >
              <Plane className="h-4 w-4 rotate-45" strokeWidth={1.8} />
            </motion.span>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-16 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Step key={s.text} progress={progress} index={i} step={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
