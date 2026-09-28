"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function pad(word: string, length: number) {
  return word.toUpperCase().padEnd(length, " ").slice(0, length).split("");
}

/**
 * Airport departure-board (Solari) text: each letter tile shuffles through a few
 * glyphs before settling, then the board moves on to the next word.
 */
export function SplitFlap({
  words,
  length,
  interval = 2800,
  className,
}: {
  words: string[];
  length?: number;
  interval?: number;
  className?: string;
}) {
  const size = length ?? Math.max(...words.map((w) => w.length));
  const [index, setIndex] = useState(0);
  const [tiles, setTiles] = useState(() => pad(words[0], size));
  const [flipping, setFlipping] = useState<boolean[]>(() => Array(size).fill(false));
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  useEffect(() => {
    const target = pad(words[index], size);
    if (reduced.current) {
      setTiles(target);
      return;
    }
    // Each tile shuffles a random number of times, so letters land one after another
    const steps = target.map((_, i) => 3 + Math.floor(Math.random() * 4) + Math.floor(i / 2));
    let tick = 0;
    const id = setInterval(() => {
      tick++;
      setTiles((prev) =>
        prev.map((ch, i) => {
          if (tick >= steps[i]) return target[i];
          return target[i] === " " && ch === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
      );
      setFlipping(target.map((_, i) => tick <= steps[i]));
      if (tick > Math.max(...steps)) clearInterval(id);
    }, 60);
    return () => clearInterval(id);
  }, [index, size, words]);

  return (
    <span className={cn("inline-flex gap-[0.12em]", className)} aria-label={words[index]} role="text">
      {tiles.map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="relative inline-flex h-[1.45em] w-[0.95em] items-center justify-center overflow-hidden rounded-[0.14em] bg-surface font-semibold tabular-nums text-white shadow-[inset_0_-1px_0_rgba(255,255,255,0.06),0_1px_0_rgba(0,0,0,0.5)] ring-1 ring-white/15"
        >
          <span key={flipping[i] ? `${ch}-${i}-f` : `${ch}-${i}`} className={flipping[i] ? "animate-flap" : undefined}>
            {ch === " " ? " " : ch}
          </span>
          {/* the hinge between the two flaps */}
          <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-black/70" />
        </span>
      ))}
    </span>
  );
}
