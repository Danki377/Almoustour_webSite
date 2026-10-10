import { cn } from "@/lib/utils";

// Plain module (no "use client"): server pages and client components can both use these classes.

export const inputClass =
  "h-11 w-full rounded-xl bg-canvas px-4 text-sm text-white outline-none ring-1 ring-white/10 transition placeholder:text-white/30 focus:ring-accent disabled:opacity-50";

export function buttonClass(variant: "primary" | "secondary" | "danger" | "ghost" = "secondary") {
  return cn(
    "inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors disabled:opacity-60",
    variant === "primary" && "bg-accent text-canvas hover:bg-accent-press",
    variant === "secondary" && "bg-surface text-white ring-1 ring-white/10 hover:bg-white/10",
    variant === "danger" && "bg-red-500/10 text-red-300 ring-1 ring-red-400/20 hover:bg-red-500/20",
    variant === "ghost" && "text-white/60 hover:bg-white/5 hover:text-white"
  );
}
