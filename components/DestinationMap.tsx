"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { useContent } from "@/components/ContentProvider";
import type { Destination } from "@/lib/content/types";
import { BASE_PATH, COUNTRY_PATHS, MAP_HEIGHT, MAP_WIDTH, project } from "@/lib/world-map";
import { cn } from "@/lib/utils";
import { ramp, useSectionProgress } from "@/lib/motion";

const ORIGIN = project(-8, 12.64); // Bamako

function toPins(destinations: Destination[]) {
  return destinations.map((d) => {
    const [x, y] = project(d.lon, d.lat);
    return { ...d, x, y, px: (x / MAP_WIDTH) * 100, py: (y / MAP_HEIGHT) * 100 };
  });
}

function arcPath(x: number, y: number) {
  const [ox, oy] = ORIGIN;
  const dist = Math.hypot(x - ox, y - oy);
  const cx = (ox + x) / 2;
  const cy = Math.min(oy, y) - dist * 0.28;
  return `M${ox.toFixed(1)} ${oy.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
}

/** Scroll timing: routes draw one after another, then each pin pops in. */
const drawStart = (i: number) => 0.05 + i * 0.06;
const pinAt = (i: number) => drawStart(i) + 0.3;

/** A dashed route that "draws" itself from Bamako as the map scrolls into view. */
function RouteArc({ d, id, index, reveal, on }: { d: string; id: string; index: number; reveal: MotionValue<number>; on: boolean }) {
  const start = drawStart(index);
  const pathLength = useTransform(reveal, (v) => ramp(v, [start, start + 0.35], [0, 1]));
  const maskId = `route-${id}`;
  return (
    <g className="pointer-events-none">
      <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={MAP_WIDTH} height={MAP_HEIGHT}>
        <motion.path d={d} fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" style={{ pathLength }} />
      </mask>
      <path
        d={d}
        mask={`url(#${maskId})`}
        fill="none"
        stroke="#F6A93B"
        strokeOpacity={on ? 0.9 : 0.3}
        strokeWidth={1}
        strokeDasharray="3 5"
        vectorEffect="non-scaling-stroke"
        className="transition-[stroke-opacity] duration-300"
      />
    </g>
  );
}

/** Pops a pin in once its route has arrived. */
function Appear({ reveal, at, children }: { reveal: MotionValue<number>; at: number; children: ReactNode }) {
  const opacity = useTransform(reveal, (v) => ramp(v, [at, at + 0.08], [0, 1]));
  const scale = useTransform(reveal, (v) => ramp(v, [at, at + 0.08], [0.4, 1]));
  return (
    <motion.span style={{ opacity, scale }} className="relative flex items-center">
      {children}
    </motion.span>
  );
}

function DestinationCard({ d, className }: { d: Destination; className?: string }) {
  return (
    <div className={cn("w-full overflow-hidden bg-deep/95 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10 backdrop-blur-md", className)}>
      <div className="relative aspect-[16/10] bg-surface">
        <Image src={d.image} alt={`Étudier en ${d.country}`} fill sizes="288px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-transparent" />
        <span className="title-xs absolute left-3 top-3 rounded-full bg-sun px-2.5 py-1 font-semibold text-surface">
          {d.badge}
        </span>
        {d.scholarship && (
          <span className="title-xs absolute right-3 top-3 rounded-full bg-canvas/70 px-2.5 py-1 text-white backdrop-blur">
            Bourse disponible
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="body-lg font-semibold">{d.country}</span>
          <span className="title-xs whitespace-nowrap text-white/50">BKO → {d.code}</span>
        </div>
        <p className="body-sm text-white/60">{d.description}</p>
        <p className="flex items-baseline gap-1">
          <span className="body-sm text-white/50">{d.priceLabel}</span>
          <span className="body-md font-semibold">{d.price}</span>
        </p>
        <Link
          href={`/services/accompagnement-etudiant#${d.id}`}
          className="btn-secondary w-full justify-between py-3 pl-5 pr-4"
        >
          <span className="button-sm">Voir la destination</span>
          <ArrowIcon />
        </Link>
      </div>
    </div>
  );
}

export function DestinationMap() {
  const { destinations } = useContent();
  const pins = useMemo(() => toPins(destinations), [destinations]);
  // `active` follows the pointer (desktop floating card); `selected` sticks (mobile panel)
  const [active, setActive] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>(destinations[0]?.id ?? "");
  const scroller = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  // 0 → 1 while the map rises from the bottom of the screen to its middle
  const reveal = useSectionProgress(mapRef, ["start 0.9", "center 0.5"]);

  const activePin = pins.find((p) => p.id === active);
  const selectedDest = destinations.find((d) => d.id === selected) ?? destinations[0];

  // The floating card follows hover: it hides as soon as the pointer leaves the
  // country / pin, with a short grace period so the pointer can reach the card.
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const show = (id: string) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setActive(id);
  };
  const hide = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setActive(null), 180);
  };
  useEffect(() => () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, []);

  const pick = (id: string) => {
    show(id);
    setSelected(id);
  };

  // On narrow screens the map scrolls horizontally: start centred on Bamako / Europe
  useEffect(() => {
    const el = scroller.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    el.scrollLeft = (ORIGIN[0] / MAP_WIDTH) * el.scrollWidth - el.clientWidth / 2;
  }, []);

  return (
    <div>
      <div className="relative" onMouseLeave={hide}>
        <div ref={scroller} className="no-scrollbar overflow-x-auto lg:overflow-visible">
          <div
            ref={mapRef}
            className="relative min-w-[60rem] lg:min-w-0"
            style={{ aspectRatio: `${MAP_WIDTH} / ${MAP_HEIGHT}` }}
          >
            <svg
              viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
              className="absolute inset-0 h-full w-full"
              onClick={() => setActive(null)}
              role="img"
              aria-label="Carte des pays où Al Moustour Voyages accompagne les étudiants"
            >
              <path
                d={BASE_PATH}
                fill="#0B2135"
                stroke="#17354F"
                strokeWidth={0.8}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              {/* Mali — the starting point */}
              <path
                d={COUNTRY_PATHS.mali}
                fill="rgba(0,174,239,0.14)"
                stroke="rgba(0,174,239,0.45)"
                strokeWidth={0.8}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              {/* Destinations */}
              {pins.map((p) => (
                <path
                  key={p.id}
                  d={COUNTRY_PATHS[p.id]}
                  fill={active === p.id ? "rgba(246,169,59,0.30)" : "rgba(246,169,59,0.10)"}
                  stroke={active === p.id ? "rgba(246,169,59,0.9)" : "rgba(246,169,59,0.35)"}
                  strokeWidth={active === p.id ? 1.2 : 0.8}
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  className="cursor-pointer transition-[fill,stroke] duration-300"
                  onMouseEnter={() => show(p.id)}
                  onMouseLeave={hide}
                  onClick={(e) => {
                    e.stopPropagation();
                    pick(p.id);
                  }}
                />
              ))}
              {/* Routes from Bamako */}
              {pins.map((p, i) => (
                <RouteArc key={`arc-${p.id}`} id={p.id} d={arcPath(p.x, p.y)} index={i} reveal={reveal} on={active === p.id} />
              ))}
            </svg>

            {/* Vignette, as on the reference */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_45%_55%,transparent_40%,#061423_95%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-canvas to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-canvas to-transparent" />

            {/* Bamako */}
            <div
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${(ORIGIN[0] / MAP_WIDTH) * 100}%`, top: `${(ORIGIN[1] / MAP_HEIGHT) * 100}%` }}
            >
              <span className="relative block h-2.5 w-2.5">
                <span className="absolute inset-0 animate-soft-ping rounded-full bg-accent" />
                <span className="relative block h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_14px_4px_rgba(0,174,239,0.55)]" />
              </span>
              <span className="title-xs absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-white/80">
                Bamako
              </span>
            </div>

            {/* City pins */}
            {pins.map((p, i) => {
              const on = active === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  className="group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center p-3 outline-none"
                  style={{ left: `${p.px}%`, top: `${p.py}%` }}
                  onMouseEnter={() => show(p.id)}
                  onMouseLeave={hide}
                  onFocus={() => show(p.id)}
                  onBlur={hide}
                  onClick={(e) => {
                    e.stopPropagation();
                    pick(p.id);
                  }}
                  aria-label={`${p.country} — voir les détails`}
                  aria-expanded={on}
                >
                  <Appear reveal={reveal} at={pinAt(i)}>
                  <span className="pointer-events-none absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun/20 blur-md" />
                  <span
                    className={cn(
                      "relative block rounded-full bg-sun shadow-[0_0_16px_5px_rgba(246,169,59,0.45)] transition-transform duration-300",
                      on ? "h-3.5 w-3.5 scale-110" : "h-2.5 w-2.5 group-hover:scale-125"
                    )}
                  >
                    {on && <span className="absolute inset-0 animate-soft-ping rounded-full bg-sun" />}
                  </span>
                  <span
                    className={cn(
                      "title-xs pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap transition-colors",
                      on ? "text-white" : "text-white/55"
                    )}
                  >
                    {p.country}
                  </span>
                  </Appear>
                </button>
              );
            })}

            {/* Floating card (desktop) */}
            {activePin && (
              <div
                key={activePin.id}
                className="absolute z-20 hidden w-[18rem] animate-pop-in lg:block"
                style={{
                  ...(activePin.px > 60
                    ? { right: `calc(${100 - activePin.px}% + 1.25rem)` }
                    : { left: `calc(${activePin.px}% + 1.25rem)` }),
                  // Centre the card (~24rem tall) on the pin, kept inside the map
                  top: `clamp(0.5rem, calc(${activePin.py}% - 12rem), calc(100% - 24.5rem))`,
                }}
                onMouseEnter={() => show(activePin.id)}
                onMouseLeave={hide}
              >
                <DestinationCard d={activePin} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: country picker + selected card below the map */}
      <div className="container-v lg:hidden">
        <p className="title-xs mb-3 mt-2 text-white/50">Touchez un pays sur la carte ou choisissez-le :</p>
        <div className="no-scrollbar -mx-5 mb-5 flex gap-2 overflow-x-auto px-5">
          {destinations.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => pick(d.id)}
              className={cn(
                "button-sm shrink-0 rounded-full px-4 py-3 transition-colors",
                selected === d.id ? "bg-white text-surface" : "bg-surface text-white"
              )}
            >
              {d.country}
            </button>
          ))}
        </div>
        {selectedDest && <DestinationCard key={selectedDest.id} d={selectedDest} className="animate-fade-in" />}
      </div>
    </div>
  );
}
