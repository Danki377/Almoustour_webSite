import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({ title, description, actions }: { title: string; description?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h1>
        {description && <p className="text-sm text-white/50">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ title, actions, children, className }: { title?: ReactNode; actions?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-2xl bg-deep p-5 ring-1 ring-white/10 lg:p-6", className)}>
      {(title || actions) && (
        <div className="mb-5 flex items-center justify-between gap-4">
          {title && <h2 className="text-sm font-semibold text-white/80">{title}</h2>}
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "accent" | "sun" | "green" | "red" | "violet" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-[0.6875rem] font-medium leading-none",
        tone === "neutral" && "bg-white/5 text-white/60",
        tone === "accent" && "bg-accent/15 text-accent",
        tone === "sun" && "bg-sun/15 text-sun",
        tone === "green" && "bg-whatsapp/15 text-whatsapp",
        tone === "red" && "bg-red-500/15 text-red-300",
        tone === "violet" && "bg-violet-400/15 text-violet-300"
      )}
    >
      {children}
    </span>
  );
}

export function LinkButton({ href, children, variant = "secondary" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors",
        variant === "primary" ? "bg-accent text-canvas hover:bg-accent-press" : "bg-surface text-white ring-1 ring-white/10 hover:bg-white/10"
      )}
    >
      {children}
    </Link>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <p className="rounded-2xl border border-dashed border-white/10 px-6 py-12 text-center text-sm text-white/40">{children}</p>;
}

/**
 * Data table. On phones each row becomes a card: first cell on its own line,
 * the other cells wrap below it, the last one (actions) aligned right.
 */
export function Table({ head, children }: { head: ReactNode[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-deep ring-1 ring-white/10">
      <table
        className={cn(
          "w-full text-left text-sm sm:min-w-[42rem]",
          "max-sm:block max-sm:[&_tbody]:block",
          "max-sm:[&_tr]:flex max-sm:[&_tr]:flex-wrap max-sm:[&_tr]:items-center max-sm:[&_tr]:gap-x-3 max-sm:[&_tr]:gap-y-2 max-sm:[&_tr]:px-4 max-sm:[&_tr]:py-4",
          "max-sm:[&_td]:block max-sm:[&_td]:min-w-0 max-sm:[&_td]:max-w-full max-sm:[&_td]:p-0",
          "max-sm:[&_td:first-child]:w-full max-sm:[&_td:last-child]:ml-auto"
        )}
      >
        <thead className="max-sm:hidden">
          <tr className="border-b border-white/10 text-xs text-white/40">
            {head.map((h, i) => (
              <th key={i} className="whitespace-nowrap px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">{children}</tbody>
      </table>
    </div>
  );
}

export const tdClass = "px-4 py-3 align-middle";

export function formatDate(date: Date, withTime = true) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
    timeZone: "Africa/Bamako",
  }).format(date);
}

export function formatMoney(amount: number) {
  return `${new Intl.NumberFormat("fr-FR").format(amount)} FCFA`;
}
