import { cn } from "@/lib/utils";

// Plain module (no "use client"): server pages and client components can both use these classes.

export const inputClass =
  "h-10 w-full rounded-lg border border-white/10 bg-canvas px-3.5 text-sm text-white outline-none transition placeholder:text-white/30 hover:border-white/20 focus:border-accent/60 focus:ring-2 focus:ring-accent/20 disabled:opacity-50 [&_option]:bg-deep";

export function buttonClass(variant: "primary" | "secondary" | "danger" | "ghost" = "secondary") {
  return cn(
    "inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3.5 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-60",
    variant === "primary" && "bg-accent text-canvas shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] hover:bg-accent-press",
    variant === "secondary" && "border border-white/10 bg-surface text-white hover:border-white/20 hover:bg-white/[0.08]",
    variant === "danger" && "border border-red-400/20 bg-red-500/10 text-red-300 hover:bg-red-500/20",
    variant === "ghost" && "text-white/60 hover:bg-white/5 hover:text-white"
  );
}
