"use client";

import { Fragment, useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { ramp, useSectionProgress } from "@/lib/motion";

const ROW_A = ["Paris", "Montréal", "Istanbul", "Casablanca", "Pékin"];
const ROW_B = ["Moscou", "New Delhi", "New York", "Dubaï", "Bamako"];

function Row({ cities, outline }: { cities: string[]; outline?: boolean }) {
  // Repeated so the band never runs out while it slides
  const items = [...cities, ...cities, ...cities];
  return (
    <div className="flex w-max items-center whitespace-nowrap">
      {items.map((city, i) => (
        <Fragment key={i}>
          <span
            className={
              outline
                ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]"
                : city === "Bamako"
                  ? "text-accent"
                  : "text-white"
            }
          >
            {city}
          </span>
          <span className="mx-[0.35em] inline-block h-[0.14em] w-[0.14em] rounded-full bg-sun align-middle" aria-hidden="true" />
        </Fragment>
      ))}
    </div>
  );
}

/**
 * Two giant bands of destination names that slide sideways — in opposite
 * directions — as the page scrolls down.
 */
export function CityMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useSectionProgress(ref, ["start end", "end start"], 0.5);
  const xA = useTransform(progress, (v) => `${ramp(v, [0, 1], [0, -28])}%`);
  const xB = useTransform(progress, (v) => `${ramp(v, [0, 1], [-28, 0])}%`);

  return (
    <div
      ref={ref}
      aria-label="Paris, Montréal, Istanbul, Casablanca, Pékin, Moscou, New Delhi, New York, Dubaï"
      className="overflow-hidden border-y border-white/10 py-8 text-[clamp(3.25rem,10vw,9.5rem)] font-semibold leading-[1.02] tracking-[-0.06em] lg:py-12"
    >
      <motion.div style={{ x: xA }} aria-hidden="true">
        <Row cities={ROW_A} />
      </motion.div>
      <motion.div style={{ x: xB }} aria-hidden="true">
        <Row cities={ROW_B} outline />
      </motion.div>
    </div>
  );
}
