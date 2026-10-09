"use client";

import { useMemo, useState } from "react";

type Point = { date: string; value: number };

const W = 600;
const H = 180;
const PAD = { top: 12, right: 8, bottom: 24, left: 32 };

const dayLabel = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" }).format(new Date(iso));

/** Nice round maximum for the y axis (1, 2, 5 × 10ⁿ). */
function niceMax(v: number) {
  if (v <= 4) return 4;
  const p = 10 ** Math.floor(Math.log10(v));
  return [1, 2, 5, 10].map((m) => m * p).find((m) => m >= v) ?? v;
}

/**
 * Single-series daily trend (2px line + light area) with a crosshair tooltip.
 * The title names the series, so there is no legend box.
 */
export function TrendChart({ title, total, points, color, unit }: { title: string; total: number; points: Point[]; color: string; unit: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = niceMax(Math.max(0, ...points.map((p) => p.value)));
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const x = (i: number) => PAD.left + (points.length > 1 ? (i / (points.length - 1)) * innerW : innerW / 2);
  const y = (v: number) => PAD.top + innerH - (v / max) * innerH;

  const { line, area } = useMemo(() => {
    const coords = points.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`);
    return {
      line: `M${coords.join("L")}`,
      area: `M${x(0)},${PAD.top + innerH}L${coords.join("L")}L${x(points.length - 1)},${PAD.top + innerH}Z`,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, max]);

  const ticks = [0, max / 2, max];
  const labelEvery = Math.ceil(points.length / 6);
  const active = hover !== null ? points[hover] : null;

  return (
    <figure className="flex flex-col gap-4">
      <figcaption className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-semibold text-white/80">{title}</span>
        <span className="text-sm tabular-nums text-white/50">
          {total} {unit}
        </span>
      </figcaption>

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full touch-none select-none"
          role="img"
          aria-label={`${title} : ${total} ${unit} sur la période`}
          onPointerMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const px = ((e.clientX - rect.left) / rect.width) * W;
            const i = Math.round(((px - PAD.left) / innerW) * (points.length - 1));
            setHover(Math.max(0, Math.min(points.length - 1, i)));
          }}
          onPointerLeave={() => setHover(null)}
        >
          {/* Recessive grid + y labels */}
          {ticks.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke="rgba(255,255,255,0.07)" />
              <text x={PAD.left - 8} y={y(t) + 4} textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.4)">
                {Number.isInteger(t) ? t : t.toFixed(1)}
              </text>
            </g>
          ))}
          {points.map((p, i) =>
            i % labelEvery === 0 ? (
              <text key={p.date} x={x(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)">
                {dayLabel(p.date)}
              </text>
            ) : null
          )}

          <path d={area} fill={color} opacity={0.12} />
          <path d={line} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

          {active && hover !== null && (
            <g>
              <line x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={PAD.top + innerH} stroke="rgba(255,255,255,0.25)" />
              <circle cx={x(hover)} cy={y(active.value)} r={4.5} fill={color} stroke="#081B2D" strokeWidth={2} />
            </g>
          )}
        </svg>

        {active && hover !== null && (
          <div
            className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-lg bg-surface px-3 py-2 text-xs shadow-lg ring-1 ring-white/10"
            style={{ left: `${(x(hover) / W) * 100}%` }}
          >
            <p className="text-white/50">{dayLabel(active.date)}</p>
            <p className="mt-0.5 flex items-center gap-1.5 font-semibold tabular-nums text-white">
              <span className="h-2 w-2 rounded-full" style={{ background: color }} />
              {active.value} {unit}
            </p>
          </div>
        )}
      </div>

      {/* Table view for screen readers */}
      <table className="sr-only">
        <caption>{title}</caption>
        <tbody>
          {points.map((p) => (
            <tr key={p.date}>
              <th scope="row">{dayLabel(p.date)}</th>
              <td>{p.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
