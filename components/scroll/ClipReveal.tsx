"use client";

import { useRef, type ReactNode } from "react";
import { motion, useTransform } from "framer-motion";
import { ramp, useSectionProgress } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Opens its content like a curtain as it scrolls into view: the frame widens from a
 * narrow window to full size while the content settles from a slight zoom.
 */
export function ClipReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useSectionProgress(ref, ["start 0.95", "start 0.35"]);
  const clipPath = useTransform(progress, (v) => {
    const x = ramp(v, [0, 1], [18, 0]);
    const y = ramp(v, [0, 1], [10, 0]);
    return `inset(${y}% ${x}% ${y}% ${x}%)`;
  });
  const scale = useTransform(progress, (v) => ramp(v, [0, 1], [1.18, 1]));

  return (
    <motion.div ref={ref} style={{ clipPath }} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ scale }} className="absolute inset-0">
        {children}
      </motion.div>
    </motion.div>
  );
}
