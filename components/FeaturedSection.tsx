"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin, Star, Users } from "lucide-react";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { DESTINATIONS } from "@/lib/site";
import { cn } from "@/lib/utils";

function Property({ children, icon }: { children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="title-xs">{children}</span>
      {icon}
    </div>
  );
}

/**
 * Pinned horizontal gallery: the section sticks to the screen and scrolling down
 * slides the destinations from right to left.
 */
export function FeaturedSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const distanceRef = useRef(0);
  const [height, setHeight] = useState<number | null>(null);
  const [current, setCurrent] = useState(1);
  const total = DESTINATIONS.length;

  // The section is exactly as tall as the horizontal distance to travel (+ one screen)
  useEffect(() => {
    if (reduce) return;
    const measure = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;
      const distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      distanceRef.current = distance;
      setHeight(distance + window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => -v * distanceRef.current);
  const bar = useTransform(scrollYProgress, (v) => v);
  useMotionValueEvent(scrollYProgress, "change", (v) => setCurrent(Math.min(total, Math.floor(v * total) + 1)));

  return (
    <section
      id="destinations"
      ref={sectionRef}
      className="relative"
      style={!reduce && height ? { height } : undefined}
    >
      <div className={cn("flex flex-col overflow-hidden pt-[4.5rem]", !reduce && "sticky top-0 h-[100svh]")}>
        {/* Header */}
        <div className="container-v flex items-end justify-between gap-6 pb-6 pt-6 lg:pb-8 lg:pt-10">
          <h2 className="h2">
            Destinations <br className="hidden lg:block" />à la une
          </h2>
          <div className="flex flex-col items-end gap-4">
            <p className="body-md hidden max-w-[24rem] text-right text-white/60 lg:block">
              Des universités reconnues, des bourses disponibles et un accompagnement complet, de l&apos;inscription
              jusqu&apos;à l&apos;installation.
            </p>
            <div className="flex items-center gap-4">
              <span className="title-xs tabular-nums text-white/70">
                <span className="text-white">{String(current).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
              </span>
              <span className="relative h-px w-24 bg-white/15 lg:w-40">
                <motion.span style={{ scaleX: bar }} className="absolute inset-0 origin-left bg-accent" />
              </span>
            </div>
          </div>
        </div>

        {/* Track */}
        <div
          ref={viewportRef}
          className={cn("relative min-h-0 flex-1 border-y border-white/10", reduce && "no-scrollbar overflow-x-auto")}
        >
          <motion.div ref={trackRef} style={reduce ? undefined : { x }} className="flex h-full w-max">
            {/* Intro panel */}
            <div className="flex w-[70vw] shrink-0 flex-col justify-between border-r border-white/10 p-5 sm:w-[20rem] lg:w-[24rem] lg:p-10">
              <p className="body-xl">
                {total} pays, un même accompagnement. Choisissez votre destination.
              </p>
              <p className="flex items-center gap-3 text-sm text-white/60">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-accent">
                  <ArrowRight className="h-4 w-4" />
                </span>
                Faites défiler pour voyager
              </p>
            </div>

            {DESTINATIONS.map((d, i) => (
              <article
                key={d.id}
                className="group flex h-full w-[85vw] shrink-0 flex-col border-r border-white/10 p-5 sm:w-[24rem] lg:w-[28rem] lg:p-8"
              >
                <div className="relative min-h-[9rem] flex-1 overflow-hidden bg-surface">
                  <Image
                    src={d.image}
                    alt={`Étudier en ${d.country}`}
                    fill
                    sizes="(max-width: 640px) 85vw, 28rem"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="title-xs absolute left-3 top-3 rounded-full bg-canvas/70 px-2.5 py-1 tabular-nums text-white backdrop-blur">
                    {String(i + 1).padStart(2, "0")} · BKO → {d.code}
                  </span>
                </div>

                <div className="mt-5 flex flex-col gap-4 lg:mt-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="h4">{d.title}</h3>
                    <p className="flex items-baseline gap-1">
                      <span className="body-md text-white/60">{d.priceLabel}</span>
                      <span className="body-lg font-semibold">{d.price}</span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Property icon={<MapPin size={14} className="opacity-20" />}>{d.city}</Property>
                    <Property icon={<CalendarDays size={14} className="opacity-20" />}>{d.info}</Property>
                    <Property icon={<Users size={14} className="opacity-20" />}>
                      {d.badge}
                      {d.scholarship && <span className="text-white/60"> · Bourse disponible</span>}
                    </Property>
                    <Property
                      icon={
                        <span className="flex gap-0.5 text-sun">
                          {Array.from({ length: 5 }).map((_, k) => (
                            <Star key={k} size={11} fill="currentColor" strokeWidth={0} />
                          ))}
                        </span>
                      }
                    >
                      Accompagnement <span className="text-white/60">de A à Z</span>
                    </Property>
                  </div>
                  <Link
                    href={`/services/accompagnement-etudiant#${d.id}`}
                    className="btn-secondary w-full justify-between pl-5 pr-[1.03rem]"
                  >
                    <span className="button-sm">Voir la destination</span>
                    <ArrowIcon />
                  </Link>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
