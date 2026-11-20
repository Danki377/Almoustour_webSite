"use client";

import { useId, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export type Point = { date: string; value: number };

const nf = new Intl.NumberFormat("fr-FR");
const dayLabel = (iso: string) => new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" }).format(new Date(iso));
const monthShort = (ym: string) =>
  new Intl.DateTimeFormat("fr-FR", { month: "short", timeZone: "UTC" }).format(new Date(`${ym}-01T00:00:00Z`)).replace(".", "");
const monthLong = (ym: string) =>
  new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${ym}-01T00:00:00Z`));

/** Nice round maximum for the y axis (1, 2, 5 × 10ⁿ). */
function niceMax(v: number) {
  if (v <= 4) return 4;
  const p = 10 ** Math.floor(Math.log10(v));
  return [1, 2, 5, 10].map((m) => m * p).find((m) => m >= v) ?? v;
}

const GRID = "rgba(255,255,255,0.06)";
const AXIS = "rgba(255,255,255,0.38)";

/* ------------------------------------------------------------------ */
/* Sparkline: trend shape only, no axes                                */
/* ------------------------------------------------------------------ */

export function Sparkline({ points, color, className }: { points: Point[]; color: string; className?: string }) {
  const id = useId();
  const W = 120;
  const H = 36;
  const max = Math.max(1, ...points.map((p) => p.value));
  const x = (i: number) => (points.length > 1 ? (i / (points.length - 1)) * W : W / 2);
  const y = (v: number) => H - 2 - (v / max) * (H - 4);
  const coords = points.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`);
  if (!coords.length) return null;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className={cn("h-9 w-full", className)} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.28} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={`M0,${H}L${coords.join("L")}L${W},${H}Z`} fill={`url(#${id})`} />
      <path d={`M${coords.join("L")}`} fill="none" stroke={color} strokeWidth={1.5} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Tabs shared by the two big charts                                   */
/* ------------------------------------------------------------------ */

function Tabs<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: { value: T; label: string; color: string }[] }) {
  return (
    <div className="flex rounded-lg border border-white/[0.07] bg-canvas p-0.5" role="tablist">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="tab"
          aria-selected={o.value === value}
          onClick={() => onChange(o.value)}
          className={cn(
            "flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
            o.value === value ? "bg-white/[0.08] text-white" : "text-white/45 hover:text-white/80"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: o.color }} aria-hidden />
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Monthly visits (12 bars)                                            */
/* ------------------------------------------------------------------ */

export type MonthPoint = { month: string; visits: number; visitors: number; views: number };
type MonthMetric = "visits" | "visitors" | "views";

const MONTH_METRICS: { value: MonthMetric; label: string; unit: string; color: string }[] = [
  { value: "visits", label: "Visites", unit: "visites", color: "#00AEEF" },
  { value: "visitors", label: "Visiteurs", unit: "visiteurs", color: "#8B93FF" },
  { value: "views", label: "Pages vues", unit: "pages vues", color: "#F6A93B" },
];

export function MonthlyChart({ months }: { months: MonthPoint[] }) {
  const [metric, setMetric] = useState<MonthMetric>("visits");
  const [hover, setHover] = useState<number | null>(null);
  const m = MONTH_METRICS.find((x) => x.value === metric)!;

  const W = 720;
  const H = 240;
  const PAD = { top: 16, right: 4, bottom: 26, left: 38 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const values = months.map((p) => p[metric]);
  const max = niceMax(Math.max(0, ...values));
  const slot = innerW / months.length;
  const barW = Math.min(34, slot * 0.58);
  const y = (v: number) => PAD.top + innerH - (v / max) * innerH;
  const ticks = [0, max / 4, max / 2, (max * 3) / 4, max];

  const total = values.reduce((a, b) => a + b, 0);
  const current = values[values.length - 1] ?? 0;
  const last = values[values.length - 2] ?? 0;
  const best = values.reduce((bi, v, i) => (v > values[bi] ? i : bi), 0);
  const active = hover !== null ? months[hover] : null;

  return (
    <figure className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <div>
            <p className="text-xs text-white/45">Ce mois-ci</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums tracking-[-0.03em]">{nf.format(current)}</p>
            <p className="mt-0.5 text-xs text-white/40">
              {last ? (
                <span className={current >= last ? "text-whatsapp" : "text-red-300"}>
                  {current >= last ? "+" : "−"}
                  {Math.abs(Math.round(((current - last) / last) * 100))} %
                </span>
              ) : (
                "—"
              )}{" "}
              vs mois dernier
            </p>
          </div>
          <div>
            <p className="text-xs text-white/45">12 derniers mois</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums tracking-[-0.03em]">{nf.format(total)}</p>
            <p className="mt-0.5 text-xs text-white/40">{m.unit}</p>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs text-white/45">Meilleur mois</p>
            <p className="mt-1 text-2xl font-semibold capitalize tracking-[-0.03em]">{values[best] ? monthShort(months[best].month) : "—"}</p>
            <p className="mt-0.5 text-xs text-white/40">{values[best] ? `${nf.format(values[best])} ${m.unit}` : "pas encore de données"}</p>
          </div>
        </div>
        <Tabs value={metric} onChange={setMetric} options={MONTH_METRICS} />
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full select-none"
          role="img"
          aria-label={`${m.label} par mois sur les 12 derniers mois : ${total} au total`}
          onPointerLeave={() => setHover(null)}
        >
          {ticks.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke={GRID} strokeDasharray={t ? "3 4" : undefined} />
              <text x={PAD.left - 10} y={y(t) + 3.5} textAnchor="end" fontSize="10" fill={AXIS} className="tabular-nums">
                {Number.isInteger(t) ? nf.format(t) : t.toFixed(1)}
              </text>
            </g>
          ))}
          {months.map((p, i) => {
            const cx = PAD.left + slot * i + slot / 2;
            const v = p[metric];
            const top = y(v);
            const h = PAD.top + innerH - top;
            const isCurrent = i === months.length - 1;
            const dim = hover !== null && hover !== i;
            return (
              <g key={p.month} onPointerEnter={() => setHover(i)}>
                <rect x={PAD.left + slot * i} y={PAD.top} width={slot} height={innerH} fill={hover === i ? "rgba(255,255,255,0.03)" : "transparent"} />
                {v > 0 && (
                  <path
                    d={`M${cx - barW / 2},${top + h}V${top + Math.min(4, h)}Q${cx - barW / 2},${top} ${cx - barW / 2 + Math.min(4, h)},${top}H${cx + barW / 2 - Math.min(4, h)}Q${cx + barW / 2},${top} ${cx + barW / 2},${top + Math.min(4, h)}V${top + h}Z`}
                    fill={m.color}
                    opacity={dim ? 0.35 : isCurrent ? 1 : 0.8}
                    className="transition-opacity"
                  />
                )}
                <text x={cx} y={H - 8} textAnchor="middle" fontSize="10" fill={isCurrent ? "rgba(255,255,255,0.75)" : AXIS} className="capitalize">
                  {monthShort(p.month)}
                </text>
              </g>
            );
          })}
        </svg>

        {active && hover !== null && (
          <div
            className="pointer-events-none absolute top-0 z-10 w-44 -translate-x-1/2 rounded-lg border border-white/10 bg-surface/95 px-3 py-2.5 text-xs shadow-xl shadow-black/40 backdrop-blur"
            style={{ left: `${Math.min(88, Math.max(12, ((PAD.left + slot * hover + slot / 2) / W) * 100))}%` }}
          >
            <p className="mb-1.5 font-medium capitalize text-white">{monthLong(active.month)}</p>
            {MONTH_METRICS.map((x) => (
              <p key={x.value} className="flex items-center justify-between gap-3 py-0.5">
                <span className="flex items-center gap-1.5 text-white/55">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: x.color }} />
                  {x.label}
                </span>
                <span className="font-semibold tabular-nums text-white">{nf.format(active[x.value])}</span>
              </p>
            ))}
          </div>
        )}
      </div>

      <table className="sr-only">
        <caption>Visites par mois</caption>
        <thead>
          <tr>
            <th>Mois</th>
            <th>Visites</th>
            <th>Visiteurs</th>
            <th>Pages vues</th>
          </tr>
        </thead>
        <tbody>
          {months.map((p) => (
            <tr key={p.month}>
              <th scope="row">{monthLong(p.month)}</th>
              <td>{p.visits}</td>
              <td>{p.visitors}</td>
              <td>{p.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Daily activity: one series at a time, chosen with tabs              */
/* ------------------------------------------------------------------ */

export type Series = { key: string; label: string; unit: string; color: string; points: Point[] };

export function ActivityChart({ series }: { series: Series[] }) {
  const [key, setKey] = useState(series[0]?.key);
  const [hover, setHover] = useState<number | null>(null);
  const s = series.find((x) => x.key === key) ?? series[0];
  const points = s.points;

  const W = 720;
  const H = 220;
  const PAD = { top: 14, right: 8, bottom: 26, left: 38 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const max = niceMax(Math.max(0, ...points.map((p) => p.value)));
  const x = (i: number) => PAD.left + (points.length > 1 ? (i / (points.length - 1)) * innerW : innerW / 2);
  const y = (v: number) => PAD.top + innerH - (v / max) * innerH;
  const gradId = useId();

  const { line, area } = useMemo(() => {
    const coords = points.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`);
    return {
      line: `M${coords.join("L")}`,
      area: `M${x(0)},${PAD.top + innerH}L${coords.join("L")}L${x(points.length - 1)},${PAD.top + innerH}Z`,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, max]);

  const ticks = [0, max / 2, max];
  const labelEvery = Math.ceil(points.length / 7);
  const active = hover !== null ? points[hover] : null;
  const total = points.reduce((a, p) => a + p.value, 0);

  return (
    <figure className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-white/50">
          <span className="text-lg font-semibold tabular-nums text-white">{nf.format(total)}</span> {s.unit} sur la période
        </p>
        <Tabs value={s.key} onChange={(k) => setKey(k)} options={series.map((x) => ({ value: x.key, label: x.label, color: x.color }))} />
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full touch-none select-none"
          role="img"
          aria-label={`${s.label} par jour : ${total} ${s.unit} sur la période`}
          onPointerMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const px = ((e.clientX - rect.left) / rect.width) * W;
            const i = Math.round(((px - PAD.left) / innerW) * (points.length - 1));
            setHover(Math.max(0, Math.min(points.length - 1, i)));
          }}
          onPointerLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity={0.22} />
              <stop offset="100%" stopColor={s.color} stopOpacity={0} />
            </linearGradient>
          </defs>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke={GRID} strokeDasharray={t ? "3 4" : undefined} />
              <text x={PAD.left - 10} y={y(t) + 3.5} textAnchor="end" fontSize="10" fill={AXIS}>
                {Number.isInteger(t) ? nf.format(t) : t.toFixed(1)}
              </text>
            </g>
          ))}
          {points.map((p, i) =>
            i % labelEvery === 0 ? (
              <text key={p.date} x={x(i)} y={H - 8} textAnchor="middle" fontSize="10" fill={AXIS}>
                {dayLabel(p.date)}
              </text>
            ) : null
          )}

          <path d={area} fill={`url(#${gradId})`} />
          <path d={line} fill="none" stroke={s.color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

          {active && hover !== null && (
            <g>
              <line x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={PAD.top + innerH} stroke="rgba(255,255,255,0.2)" />
              <circle cx={x(hover)} cy={y(active.value)} r={4.5} fill={s.color} stroke="rgb(var(--c-deep))" strokeWidth={2} />
            </g>
          )}
        </svg>

        {active && hover !== null && (
          <div
            className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-lg border border-white/10 bg-surface/95 px-3 py-2 text-xs shadow-xl shadow-black/40 backdrop-blur"
            style={{ left: `${Math.min(90, Math.max(10, (x(hover) / W) * 100))}%` }}
          >
            <p className="text-white/50">{dayLabel(active.date)}</p>
            <p className="mt-0.5 flex items-center gap-1.5 font-semibold tabular-nums text-white">
              <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
              {nf.format(active.value)} {s.unit}
            </p>
          </div>
        )}
      </div>

      <table className="sr-only">
        <caption>{s.label} par jour</caption>
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
