"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import { ramp, useSectionProgress } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Image that drifts slightly slower than the page inside its frame, for depth.
 * `amount` is how far the image overflows the frame, in % of the frame height, on each side.
 */
export function ParallaxImage({
  src,
  alt,
  sizes,
  amount = 8,
  priority,
  className,
  imageClassName,
  children,
}: {
  src: string;
  alt: string;
  sizes: string;
  amount?: number;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useSectionProgress(ref, ["start end", "end start"], 0.5);
  // The inner layer is (100 + 2·amount)% tall; translating by ±travel% of its own height
  // moves it exactly ±amount% of the frame, so the edges never show.
  const travel = amount / (1 + (2 * amount) / 100);
  const y = useTransform(progress, (v) => `${ramp(v, [0, 1], [-travel, travel])}%`);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y, top: `-${amount}%`, bottom: `-${amount}%` }} className="absolute inset-x-0 will-change-transform">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", imageClassName)} />
      </motion.div>
      {children}
    </div>
  );
}
