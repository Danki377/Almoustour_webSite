import Link from "next/link";
import type { ReactNode } from "react";
import { buttonClass } from "@/lib/admin/styles";
import { cn } from "@/lib/utils";

/** Surface shared by cards, tables and panels: graphite fill, hairline border, faint top light. */
export const panelClass = "rounded-xl border border-white/[0.07] bg-deep shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]";

export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  eyebrow?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex min-w-0 flex-col gap-1">
        {eyebrow && <p className="text-xs font-medium text-white/40">{eyebrow}</p>}
        <h1 className="text-[1.625rem] font-semibold leading-tight tracking-[-0.035em] text-white">{title}</h1>
        {description && <p className="text-sm text-white/50">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({
  title,
  description,
  actions,
  children,
  className,
  flush,
}: {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  /** No inner padding below the header (tables, lists that run edge to edge) */
  flush?: boolean;
}) {
  const head = title || actions;
  return (
    <section className={cn(panelClass, !flush && "p-5", className)}>
      {head && (
        <div className={cn("flex items-start justify-between gap-4", flush ? "px-5 pb-3 pt-5" : "mb-5")}>
          <div className="flex min-w-0 flex-col gap-0.5">
            {title && <h2 className="text-[0.8125rem] font-semibold text-white/90">{title}</h2>}
            {description && <p className="text-xs text-white/40">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

type Tone = "neutral" | "accent" | "sun" | "green" | "red" | "violet";

const TONE: Record<Tone, { box: string; dot: string }> = {
  neutral: { box: "bg-white/[0.04] text-white/65 ring-white/10", dot: "bg-white/40" },
  accent: { box: "bg-accent/10 text-accent ring-accent/20", dot: "bg-accent" },
  sun: { box: "bg-sun/10 text-sun ring-sun/20", dot: "bg-sun" },
  green: { box: "bg-whatsapp/10 text-whatsapp ring-whatsapp/20", dot: "bg-whatsapp" },
  red: { box: "bg-red-500/10 text-red-300 ring-red-400/20", dot: "bg-red-400" },
  violet: { box: "bg-violet-400/10 text-violet-300 ring-violet-400/20", dot: "bg-violet-400" },
};

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1 text-[0.6875rem] font-medium leading-none ring-1 ring-inset",
        TONE[tone].box
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", TONE[tone].dot)} aria-hidden />
      {children}
    </span>
  );
}

export function LinkButton({ href, children, variant = "secondary" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" }) {
  return (
    <Link href={href} className={buttonClass(variant)}>
      {children}
    </Link>
  );
}

export function EmptyState({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-white/10 px-6 py-12 text-center">
      {icon && <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] text-white/40 ring-1 ring-white/10">{icon}</span>}
      <p className="max-w-sm text-sm text-white/45">{children}</p>
    </div>
  );
}

/**
 * Data table. On phones each row becomes a card: first cell on its own line,
 * the other cells wrap below it, the last one (actions) aligned right.
 */
export function Table({ head, children }: { head: ReactNode[]; children: ReactNode }) {
  return (
    <div className={cn(panelClass, "overflow-x-auto")}>
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
          <tr className="border-b border-white/[0.07] bg-white/[0.015] text-[0.6875rem] uppercase tracking-[0.06em] text-white/40">
            {head.map((h, i) => (
              <th key={i} className="whitespace-nowrap px-4 py-2.5 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.05]">{children}</tbody>
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

export function formatNumber(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n);
}
