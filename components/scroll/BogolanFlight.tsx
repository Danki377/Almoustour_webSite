"use client";

import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { Plane } from "lucide-react";
import { BogolanStrip } from "@/components/BogolanStrip";
import { ramp, useSectionProgress } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** The bògòlan band, with a small plane that crosses it left → right while it scrolls past. */
export function BogolanFlight({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useSectionProgress(ref, ["start end", "end start"], 0.5);
  const left = useTransform(progress, (v) => `${ramp(v, [0.1, 0.9], [0, 100])}%`);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <BogolanStrip />
      <motion.span
        style={{ left }}
        aria-hidden="true"
        className="absolute top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-canvas text-accent ring-1 ring-accent/60"
      >
        <Plane className="h-3.5 w-3.5 rotate-45" strokeWidth={2} />
      </motion.span>
    </div>
  );
}
