"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  GraduationCap,
  HelpCircle,
  LogOut,
  Menu,
  MessageSquareQuote,
  Plane,
  ScrollText,
  Settings,
  Stamp,
  UserCircle,
  Users,
  X,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  dashboard: BarChart3,
  leads: Users,
  destinations: GraduationCap,
  visas: Stamp,
  services: Plane,
  testimonials: MessageSquareQuote,
  faq: HelpCircle,
  settings: Settings,
  users: UserCircle,
  audit: ScrollText,
  account: FileText,
};

export type NavItem = { href: string; label: string; icon: keyof typeof ICONS; badge?: number; group: string };

export function Sidebar({
  items,
  user,
  logout,
}: {
  items: NavItem[];
  user: { name: string; role: string };
  logout: () => Promise<void>;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));
  const groups = Array.from(new Set(items.map((i) => i.group)));

  const nav = (
    <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-5">
      {groups.map((g) => (
        <div key={g} className="flex flex-col gap-0.5">
          <p className="px-3 pb-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-white/30">{g}</p>
          {items
            .filter((i) => i.group === g)
            .map((item) => {
              const Icon = ICONS[item.icon];
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-9 items-center gap-3 rounded-lg px-3 text-sm transition-colors",
                    active ? "bg-accent/10 text-accent" : "text-white/65 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon size={16} strokeWidth={1.8} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge ? (
                    <span className="rounded-full bg-accent px-1.5 py-0.5 text-[0.625rem] font-semibold leading-none text-canvas">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
        </div>
      ))}
    </nav>
  );

  const footer = (
    <div className="flex flex-col gap-1 border-t border-white/10 p-3">
      <Link
        href="/admin/compte"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/65 hover:bg-white/5 hover:text-white"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface text-xs font-semibold text-white">
          {user.name.slice(0, 1).toUpperCase()}
        </span>
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-white">{user.name}</span>
          <span className="text-xs text-white/40">{user.role}</span>
        </span>
      </Link>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 items-center gap-3 rounded-lg px-3 text-sm text-white/65 hover:bg-white/5 hover:text-white"
      >
        <ExternalLink size={16} strokeWidth={1.8} />
        Voir le site
      </a>
      <form action={logout}>
        <button
          type="submit"
          className="flex h-9 w-full items-center gap-3 rounded-lg px-3 text-sm text-white/65 hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut size={16} strokeWidth={1.8} />
          Déconnexion
        </button>
      </form>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/10 bg-canvas/90 px-4 backdrop-blur lg:hidden">
        <Link href="/admin" className="flex items-center gap-2 font-semibold tracking-[-0.04em]">
          <LogoMark className="h-5 w-5" /> Admin
        </Link>
        <button type="button" onClick={() => setOpen(true)} aria-label="Ouvrir le menu" className="p-2 text-white/80">
          <Menu size={20} />
        </button>
      </header>

      {/* Mobile drawer */}
      <div className={cn("fixed inset-0 z-40 lg:hidden", open ? "visible" : "invisible")}>
        <div
          className={cn("absolute inset-0 bg-black/60 transition-opacity", open ? "opacity-100" : "opacity-0")}
          onClick={() => setOpen(false)}
        />
        <aside
          className={cn(
            "absolute inset-y-0 left-0 flex w-72 flex-col bg-deep transition-transform duration-300",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-14 items-center justify-between border-b border-white/10 px-5">
            <span className="font-semibold tracking-[-0.04em]">Al Moustour · Admin</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Fermer le menu" className="p-1 text-white/60">
              <X size={18} />
            </button>
          </div>
          {nav}
          {footer}
        </aside>
      </div>

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-deep lg:flex">
        <Link href="/admin" className="flex h-16 items-center gap-2.5 border-b border-white/10 px-6 font-semibold tracking-[-0.04em]">
          <LogoMark className="h-6 w-6" />
          Al Moustour <span className="font-normal text-white/40">Admin</span>
        </Link>
        {nav}
        {footer}
      </aside>
    </>
  );
}
