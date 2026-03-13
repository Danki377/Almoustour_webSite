"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export default function FAQWithSpiral() {
  const spiralRef = useRef<HTMLDivElement | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Spiral configuration
  const [cfg, setCfg] = useState({
    points: 700,
    dotRadius: 1.8,
    duration: 3.0,
    color: "#00AEEF",
    gradient: "none" as
      | "none"
      | "rainbow"
      | "sunset"
      | "ocean"
      | "fire"
      | "neon"
      | "pastel"
      | "grayscale",
    pulseEffect: true,
    opacityMin: 0.25,
    opacityMax: 0.8,
    sizeMin: 0.4,
    sizeMax: 1.2,
    background: "#ffffff",
  });

  // Gradient presets
  const gradients: Record<string, string[]> = useMemo(
    () => ({
      none: [],
      rainbow: ["#ff0000", "#ff9900", "#ffff00", "#00ff00", "#0099ff", "#6633ff"],
      sunset: ["#ff0000", "#ff9900", "#ffcc00"],
      ocean: ["#0066ff", "#00ccff", "#00ffcc"],
      fire: ["#ff0000", "#ff6600", "#ffcc00"],
      neon: ["#ff00ff", "#00ffff", "#ffff00"],
      pastel: ["#ffcccc", "#ccffcc", "#ccccff"],
      grayscale: ["#000000", "#666666", "#cccccc"],
    }),
    []
  );

  // --- Dev "tests" (runtime assertions) ------------------------------------
  useEffect(() => {
    try {
      console.assert(Array.isArray(gradients.none) && gradients.none.length === 0, "Gradient 'none' must be an empty array");
      console.assert(cfg.sizeMin <= cfg.sizeMax, "sizeMin should be <= sizeMax");
      console.assert(cfg.opacityMin <= cfg.opacityMax, "opacityMin should be <= opacityMax");
    } catch {}
  }, [cfg.opacityMax, cfg.opacityMin, cfg.sizeMax, cfg.sizeMin, gradients.none]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "h") setPanelOpen((v) => !v);
      if (k === "r") randomize();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Generate spiral SVG and mount
  useEffect(() => {
    if (!spiralRef.current) return;

    const SIZE = 560; 
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const N = cfg.points;
    const DOT = cfg.dotRadius;
    const CENTER = SIZE / 2;
    const PADDING = 4;
    const MAX_R = CENTER - PADDING - DOT;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", String(SIZE));
    svg.setAttribute("height", String(SIZE));
    svg.setAttribute("viewBox", `0 0 ${SIZE} ${SIZE}`);

    // Gradient
    if (cfg.gradient !== "none") {
      const defs = document.createElementNS(svgNS, "defs");
      const g = document.createElementNS(svgNS, "linearGradient");
      g.setAttribute("id", "spiralGradient");
      g.setAttribute("gradientUnits", "userSpaceOnUse");
      g.setAttribute("x1", "0%");
      g.setAttribute("y1", "0%");
      g.setAttribute("x2", "100%");
      g.setAttribute("y2", "100%");
      gradients[cfg.gradient].forEach((color, idx, arr) => {
        const stop = document.createElementNS(svgNS, "stop");
        stop.setAttribute("offset", `${(idx * 100) / (arr.length - 1)}%`);
        stop.setAttribute("stop-color", color);
        g.appendChild(stop);
      });
      defs.appendChild(g);
      svg.appendChild(defs);
    }

    for (let i = 0; i < N; i++) {
      const idx = i + 0.5;
      const frac = idx / N;
      const r = Math.sqrt(frac) * MAX_R;
      const theta = idx * GOLDEN_ANGLE;
      const x = CENTER + r * Math.cos(theta);
      const y = CENTER + r * Math.sin(theta);

      const c = document.createElementNS(svgNS, "circle");
      c.setAttribute("cx", x.toFixed(3));
      c.setAttribute("cy", y.toFixed(3));
      c.setAttribute("r", String(DOT));
      c.setAttribute("fill", cfg.gradient === "none" ? cfg.color : "url(#spiralGradient)");
      c.setAttribute("opacity", "0.6");

      if (cfg.pulseEffect) {
        const animR = document.createElementNS(svgNS, "animate");
        animR.setAttribute("attributeName", "r");
        animR.setAttribute("values", `${DOT * cfg.sizeMin};${DOT * cfg.sizeMax};${DOT * cfg.sizeMin}`);
        animR.setAttribute("dur", `${cfg.duration}s`);
        animR.setAttribute("begin", `${(frac * cfg.duration).toFixed(3)}s`);
        animR.setAttribute("repeatCount", "indefinite");
        animR.setAttribute("calcMode", "spline");
        animR.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
        c.appendChild(animR);

        const animO = document.createElementNS(svgNS, "animate");
        animO.setAttribute("attributeName", "opacity");
        animO.setAttribute("values", `${cfg.opacityMin};${cfg.opacityMax};${cfg.opacityMin}`);
        animO.setAttribute("dur", `${cfg.duration}s`);
        animO.setAttribute("begin", `${(frac * cfg.duration).toFixed(3)}s`);
        animO.setAttribute("repeatCount", "indefinite");
        animO.setAttribute("calcMode", "spline");
        animO.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
        c.appendChild(animO);
      }

      svg.appendChild(c);
    }

    spiralRef.current.innerHTML = "";
    spiralRef.current.appendChild(svg);
  }, [cfg, gradients]);

  const randomize = () => {
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const lightColors = ["#ffffff"];
    const darkColors = ["#222222", "#111111"];
    const useLightBg = Math.random() > 0.5;

    setCfg((c) => ({
      ...c,
      points: Math.floor(rand(300, 1600)),
      dotRadius: rand(0.8, 3.2),
      duration: rand(1.2, 7.5),
      pulseEffect: Math.random() > 0.35,
      opacityMin: rand(0.1, 0.4),
      opacityMax: rand(0.6, 1.0),
      sizeMin: rand(0.4, 0.9),
      sizeMax: rand(1.2, 2.2),
      background: useLightBg ? "#f5f5f5" : "#000000",
      color: useLightBg
        ? darkColors[Math.floor(Math.random() * darkColors.length)]
        : lightColors[Math.floor(Math.random() * lightColors.length)],
      gradient:
        Math.random() > 0.6
          ? (["rainbow", "ocean", "grayscale", "neon"] as const)[
              Math.floor(Math.random() * 4)
            ]
          : "none",
    }));
  };

  const faqs = [
    {
      q: "Quelles destinations proposez-vous pour les études ?",
      a: "Nous accompagnons les étudiants vers la France, le Canada, la Turquie, le Maroc, la Chine, la Russie, l'Inde et les USA.",
    },
    {
      q: "Comment obtenir un tarif étudiant pour mon billet d'avion ?",
      a: "Il suffit de nous présenter votre attestation d'inscription ou votre carte d'étudiant en cours de validité lors de votre réservation.",
    },
    {
      q: "Quel est votre taux de réussite pour les demandes de visa ?",
      a: "Grâce à notre expertise technique, nous affichons des taux de réussite élevés (jusqu'à 100% pour certaines destinations comme le Maroc ou la Chine).",
    },
    {
      q: "Proposez-vous des bourses d'études ?",
      a: "Oui, nous avons des programmes de bourses disponibles pour la Chine, la Russie, la Turquie et le Maroc couvrant souvent le logement et le cycle d'étude.",
    },
    {
      q: "Comment se passe l'accompagnement Campus France ?",
      a: "Nous gérons l'intégralité de votre compte, de la création du dossier à la préparation intensive pour l'entretien consulaire.",
    },
    {
      q: "Où se trouve votre agence à Bamako ?",
      a: "Notre agence est située à Sotuba ACI, Avenue de l'Armée, juste à côté du 3ème pont.",
    },
    {
      q: "Quels sont vos horaires d'ouverture ?",
      a: "Nous vous accueillons du lundi au samedi, de 08h30 à 18h30. Support WhatsApp disponible 7j/7.",
    },
    {
      q: "Est-il possible de payer en plusieurs fois ?",
      a: "Pour certains services d'accompagnement, des facilités de paiement peuvent être discutées avec nos conseillers.",
    },
  ];

  const filtered = query
    ? faqs.filter(({ q, a }) => (q + a).toLowerCase().includes(query.toLowerCase()))
    : faqs;

  return (
    <div
      id="faq"
      className="relative min-h-[70vh] w-full overflow-hidden bg-white text-slate-900"
    >
      {/* Background Spiral - Very subtle */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.07]"
      >
        <div ref={spiralRef} />
      </div>

      {/* Layout */}
      <div className="relative mx-auto max-w-5xl px-6 py-24">
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row items-baseline md:items-end justify-between border-b border-slate-100 pb-8 gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900">FAQ</h1>
            <p className="mt-3 text-sm md:text-base text-slate-400 font-medium">
              Tout ce que vous devez savoir sur nos services.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une question…"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 pr-10 text-sm text-slate-900 outline-none transition-all focus:border-[#00AEEF] focus:bg-white focus:ring-4 focus:ring-[#00AEEF]/5"
              />
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>
        </header>

        {/* Content */}
        <section className="relative">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {filtered.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} index={i + 1} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-slate-100 pt-6 text-xs text-slate-400">
          © {new Date().getFullYear()} Al-Moustour Voyages — Expertise & Transparence.
        </footer>
      </div>

      {/* Control Panel (Hidden by default, can be toggled via 'H' key as per component logic) */}
      {panelOpen && (
        <aside className="fixed right-4 top-4 z-20 w-[320px] rounded-2xl border border-slate-200 bg-white/95 p-4 backdrop-blur shadow-2xl text-slate-900">
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-900">Spiral Controls</h3>
          <div className="space-y-3 text-xs">
            <Slider label="Points" min={100} max={2000} step={50} value={cfg.points} onChange={(v)=> setCfg({...cfg, points: v})} />
            <Slider label="Dot radius" min={0.5} max={5} step={0.1} value={cfg.dotRadius} onChange={(v)=> setCfg({...cfg, dotRadius: v})} />
            <Slider label="Duration" min={1} max={10} step={0.1} value={cfg.duration} onChange={(v)=> setCfg({...cfg, duration: v})} />

            <Toggle label="Pulse" value={cfg.pulseEffect} onChange={(v)=> setCfg({...cfg, pulseEffect: v})} />
            <Slider label="Opacity min" min={0} max={1} step={0.05} value={cfg.opacityMin} onChange={(v)=> setCfg({...cfg, opacityMin: v})} />
            <Slider label="Opacity max" min={0} max={1} step={0.05} value={cfg.opacityMax} onChange={(v)=> setCfg({...cfg, opacityMax: v})} />
            <Slider label="Size min" min={0.1} max={2} step={0.1} value={cfg.sizeMin} onChange={(v)=> setCfg({...cfg, sizeMin: v})} />
            <Slider label="Size max" min={0.1} max={3} step={0.1} value={cfg.sizeMax} onChange={(v)=> setCfg({...cfg, sizeMax: v})} />

            <Select
              label="Gradient"
              value={cfg.gradient}
              options={[
                { label: "None", value: "none" },
                { label: "Rainbow", value: "rainbow" },
                { label: "Sunset", value: "sunset" },
                { label: "Ocean", value: "ocean" },
                { label: "Fire", value: "fire" },
                { label: "Neon", value: "neon" },
                { label: "Pastel", value: "pastel" },
                { label: "Grayscale", value: "grayscale" },
              ]}
              onChange={(v)=> setCfg({...cfg, gradient: v as any})}
            />

            <div className="flex gap-2">
              <button
                onClick={randomize}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs hover:border-[#00AEEF] hover:bg-slate-50 transition-colors"
              >
                Randomize (R)
              </button>
              <button
                onClick={() => setPanelOpen(false)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs hover:border-slate-400 transition-colors"
              >
                Close (H)
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 transition-all duration-300 hover:border-[#00AEEF]/30 hover:shadow-[0_20px_40px_rgba(0,174,239,0.06)] text-slate-900">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-[10px] text-[#00AEEF] font-black group-hover:bg-[#00AEEF] group-hover:text-white transition-colors uppercase tracking-widest">{String(index).padStart(2, "0")}</span>
          <h3 className="text-base md:text-lg font-bold leading-tight text-slate-900 tracking-tight">{q}</h3>
        </div>
        <div className={`ml-4 w-6 h-6 rounded-full border border-slate-100 flex items-center justify-center transition-all ${open ? "bg-[#00AEEF] border-[#00AEEF] text-white rotate-180" : "text-slate-400 group-hover:text-[#00AEEF] group-hover:border-[#00AEEF]"}`}>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </button>
      <div
        className={`grid transition-[grid-template-rows,margin] duration-500 ease-[cubic-bezier(.4,0,.2,1)] ${open ? "mt-5 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="text-sm md:text-base text-slate-500 leading-relaxed pl-12">{a}</p>
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between">
        <span>{label}</span>
        <span className="tabular-nums text-slate-500">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-[#00AEEF]"
      />
    </label>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between">
      <span>{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`h-6 w-10 min-w-[40px] rounded-full border border-slate-200 transition ${value ? "bg-[#00AEEF]" : "bg-slate-200"}`}
        aria-pressed={value}
      >
        <span className={`block h-5 w-5 translate-x-0.5 rounded-full bg-white transition shadow-sm ${value ? "translate-x-4" : "translate-x-0"}`} />
      </button>
    </label>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <div className="mb-1">{label}</div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#00AEEF]"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
      </div>
    </label>
  );
}
