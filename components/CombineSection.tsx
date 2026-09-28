"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { ramp, useRamp, useSectionProgress } from "@/lib/motion";

const ITEMS = ["Visa", "Billet d'avion", "Installation"];

const STEPS = [
  ["Choisir sa", "formation"],
  ["Monter le", "dossier"],
  ["Obtenir", "le visa"],
  ["Réserver le billet", "& s'installer"],
];

/** A step "lights up" (and its top bar fills) as the section scrolls past it. */
function Step({ progress, index, a, b }: { progress: MotionValue<number>; index: number; a: string; b: string }) {
  const from = index / STEPS.length;
  const to = (index + 1) / STEPS.length;
  const opacity = useRamp(progress, [from, to], [0.3, 1]);
  const fill = useRamp(progress, [from, to], [0, 1]);
  return (
    <div className="relative border-t border-white/10 p-5 lg:border-t-0 lg:p-10">
      <span className={index % 2 === 1 ? "line-y left-0" : "line-y left-0 max-lg:hidden"} />
      <motion.span style={{ scaleX: fill }} className="absolute inset-x-0 top-0 h-[2px] origin-left bg-accent" />
      <motion.div style={{ opacity }} className="flex flex-col gap-2.5 lg:gap-[5.5rem]">
        <div className="flex items-start gap-2">
          <span className="h3 max-lg:text-4xl">0{index + 1}</span>
          <span className="title-xs text-white/50">Étape</span>
        </div>
        <p className="body-lg max-lg:text-base">
          {a}
          <br />
          {b}
        </p>
      </motion.div>
    </div>
  );
}

/** Each "+ item" slides in from the right, one after the other, as the section arrives. */
function Item({ progress, index, children }: { progress: MotionValue<number>; index: number; children: string }) {
  const from = 0.1 + index * 0.18;
  const x = useTransform(progress, (v) => ramp(v, [from, from + 0.4], [220 + index * 60, 0]));
  const opacity = useRamp(progress, [from, from + 0.3], [0, 1]);
  return (
    <motion.p style={{ x, opacity }} className="h4 lg:text-[2.8125rem] lg:leading-none lg:tracking-[-0.066em]">
      <span className="text-white/40">+ </span>
      {children}
    </motion.p>
  );
}

export function CombineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  // Background eases from a slow zoom to rest while the section crosses the screen
  const drift = useSectionProgress(sectionRef, ["start end", "end start"], 1);
  const bgScale = useTransform(drift, (v) => ramp(v, [0, 1], [1.2, 1]));
  // Steps light up one by one while the strip travels from the bottom to the middle of the screen
  const steps = useSectionProgress(stepsRef, ["start 0.95", "start 0.35"]);
  const arrive = useSectionProgress(sectionRef, ["start 0.95", "start 0.2"]);

  return (
    <section ref={sectionRef} id="dossier" className="relative overflow-hidden lg:[aspect-ratio:1440/863]">
      <motion.div style={{ scale: bgScale }} className="absolute inset-0">
        <Image
          src="/images/combine-travel.jpg"
          alt="Vol international vers votre destination d'études"
          fill
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-canvas/90 via-canvas/60 to-canvas/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-canvas/40 via-transparent to-canvas/80" />

      <div className="container-v relative pt-16 lg:pt-20">
        <Reveal className="mb-6 lg:mb-10">
          <h2 className="h3 lg:text-[3.75rem] lg:leading-[1.1]">Un seul dossier : admission</h2>
        </Reveal>
        <div className="flex flex-col gap-4 lg:gap-2">
          {ITEMS.map((item, i) => (
            <Item key={item} progress={arrive} index={i}>
              {item}
            </Item>
          ))}
        </div>
      </div>

      <div
        ref={stepsRef}
        className="relative mt-16 grid grid-cols-2 backdrop-blur-[10px] lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:grid-cols-6"
      >
        <span className="line-x top-0" />
        <span className="line-x bottom-0" />
        <div className="col-span-2 p-5 lg:p-10">
          <p className="body-xl">
            Admission, visa, billet et installation réunis dans un seul accompagnement. Un contrat signé à
            l&apos;agence, et des frais d&apos;agence payables après obtention du visa.
          </p>
        </div>
        {STEPS.map(([a, b], i) => (
          <Step key={a} progress={steps} index={i} a={a} b={b} />
        ))}
      </div>
    </section>
  );
}
