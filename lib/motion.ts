"use client";

import { type RefObject } from "react";
import { useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

/** Piecewise-linear mapping, clamped at both ends. */
export function ramp(v: number, input: number[], output: number[]) {
  if (v <= input[0]) return output[0];
  for (let i = 1; i < input.length; i++) {
    if (v <= input[i]) {
      const t = (v - input[i - 1]) / (input[i] - input[i - 1] || 1);
      return output[i - 1] + t * (output[i] - output[i - 1]);
    }
  }
  return output[output.length - 1];
}

/**
 * Scroll-linked value through a *function* transform. The array form of useTransform
 * lets framer-motion hand opacity/transform to a browser ScrollTimeline, which tracks
 * the wrong range for targets inside sticky/pinned layouts — so we always go through JS.
 */
export function useRamp(progress: MotionValue<number>, input: number[], output: number[]) {
  return useTransform(progress, (v) => ramp(v, input, output));
}

/**
 * Scroll progress (0 → 1) of `ref` through the viewport.
 * With reduced motion, returns a fixed value (`rest`) so effects sit in their settled state.
 */
export function useSectionProgress(
  ref: RefObject<HTMLElement>,
  offset: ScrollOffset = ["start end", "end start"],
  rest = 1
) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const still = useMotionValue(rest);
  return reduce ? still : scrollYProgress;
}
