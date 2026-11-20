"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CornerDownLeft,
  ExternalLink,
  GraduationCap,
  HelpCircle,
  Images,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareQuote,
  Plane,
  Plus,
  ScrollText,
  Search,
  Settings,
  Stamp,
  UserCircle,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { SIDEBAR_COOKIE } from "@/lib/auth-cookie";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  leads: Users,
  destinations: GraduationCap,
  visas: Stamp,
  services: Plane,
  testimonials: MessageSquareQuote,
  faq: HelpCircle,
  media: Images,
  settings: Settings,
  users: UserCircle,
  audit: ScrollText,
  account: KeyRound,
};

export type NavItem = { href: string; label: string; icon: keyof typeof ICONS; badge?: number; group: string };

type User = { name: string; role: string };

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

function Avatar({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent/80 to-violet-500/80 text-[0.6875rem] font-semibold text-white",
        className
      )}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}

function useIsActive() {
  const pathname = usePathname();
  return useCallback((href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href)), [pathname]);
}

function NavList({ items, collapsed }: { items: NavItem[]; collapsed?: boolean }) {
  const isActive = useIsActive();
  const groups = Array.from(new Set(items.map((i) => i.group)));

  return (
    <nav className="flex flex-1 flex-col gap-5 overflow-y-auto overflow-x-hidden px-3 py-4" aria-label="Navigation de l'administration">
      {groups.map((g) => (
        <div key={g} className="flex flex-col gap-0.5">
          {collapsed ? (
            <div className="mx-auto mb-1.5 h-px w-6 bg-white/10" aria-hidden />
          ) : (
            <p className="px-2.5 pb-1.5 text-[0.6875rem] font-medium text-white/35">{g}</p>
          )}
          {items
            .filter((i) => i.group === g)
            .map((item) => {
              const Icon = ICONS[item.icon];
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative flex h-9 items-center gap-3 rounded-lg text-[0.8125rem] font-medium transition-colors",
                    collapsed ? "justify-center px-0" : "px-2.5",
                    active ? "bg-white/[0.07] text-white" : "text-white/55 hover:bg-white/[0.04] hover:text-white"
                  )}
                >
                  {active && <span className="absolute -left-3 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-accent" aria-hidden />}
                  <Icon size={17} strokeWidth={1.8} className={cn("shrink-0", active ? "text-accent" : "text-white/45 group-hover:text-white/80")} />
                  {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                  {item.badge ? (
                    <span
                      className={cn(
                        "rounded-full bg-accent text-[0.625rem] font-semibold leading-none text-canvas tabular-nums",
                        collapsed ? "absolute right-1 top-1 h-2 w-2" : "px-1.5 py-[3px]"
                      )}
                    >
                      {collapsed ? <span className="sr-only">{item.badge}</span> : item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
        </div>
      ))}
    </nav>
  );
}

function UserBlock({ user, logout, collapsed }: { user: User; logout: () => Promise<void>; collapsed?: boolean }) {
  return (
    <div className="flex flex-col gap-1 border-t border-white/[0.07] p-3">
      <Link
        href="/admin/compte"
        title={collapsed ? `${user.name} · ${user.role}` : undefined}
        className={cn("flex items-center gap-3 rounded-lg py-2 hover:bg-white/[0.04]", collapsed ? "justify-center" : "px-2")}
      >
        <Avatar name={user.name} className="h-8 w-8" />
        {!collapsed && (
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-[0.8125rem] font-medium text-white">{user.name}</span>
            <span className="truncate text-xs text-white/40">{user.role}</span>
          </span>
        )}
      </Link>
      <form action={logout}>
        <button
          type="submit"
          title={collapsed ? "Déconnexion" : undefined}
          className={cn(
            "flex h-9 w-full items-center gap-3 rounded-lg text-[0.8125rem] font-medium text-white/50 transition-colors hover:bg-red-500/10 hover:text-red-300",
            collapsed ? "justify-center" : "px-2.5"
          )}
        >
          <LogOut size={17} strokeWidth={1.8} />
          {!collapsed && "Déconnexion"}
        </button>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Command menu (Ctrl / ⌘ + K)                                         */
/* ------------------------------------------------------------------ */

type Command = { id: string; label: string; hint: string; icon: LucideIcon; run: () => void };

function CommandMenu({ open, onClose, items, canAddLead }: { open: boolean; onClose: () => void; items: NavItem[]; canAddLead: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Command[]>(() => {
    const go = (href: string) => () => router.push(href);
    const list: Command[] = items.map((i) => ({ id: i.href, label: i.label, hint: i.group, icon: ICONS[i.icon], run: go(i.href) }));
    if (canAddLead) list.unshift({ id: "new-lead", label: "Ajouter un lead", hint: "Action", icon: Plus, run: go("/admin/leads/new") });
    list.push({ id: "site", label: "Voir le site public", hint: "Lien externe", icon: ExternalLink, run: () => window.open("/", "_blank", "noopener") });
    return list;
  }, [items, canAddLead, router]);

  const normalize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase();
  const results = commands.filter((c) => normalize(`${c.label} ${c.hint}`).includes(normalize(query.trim())));

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);
  useEffect(() => setIndex(0), [query]);

  if (!open) return null;

  const run = (c?: Command) => {
    if (!c) return;
    onClose();
    c.run();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Recherche rapide">
      <div className="absolute inset-0 animate-fade-in bg-black/60 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full max-w-lg animate-pop-in overflow-hidden rounded-xl border border-white/10 bg-deep shadow-2xl shadow-black/50">
        <div className="flex items-center gap-3 border-b border-white/[0.07] px-4">
          <Search size={16} className="shrink-0 text-white/40" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setIndex((i) => Math.min(results.length - 1, i + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setIndex((i) => Math.max(0, i - 1));
              } else if (e.key === "Enter") {
                e.preventDefault();
                run(results[index]);
              } else if (e.key === "Escape") {
                onClose();
              }
            }}
            placeholder="Aller à une page, lancer une action…"
            aria-label="Rechercher une page ou une action"
            className="h-12 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
          />
          <kbd className="rounded border border-white/10 px-1.5 py-0.5 text-[0.625rem] text-white/40">Échap</kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto p-1.5" role="listbox">
          {results.length ? (
            results.map((c, i) => (
              <li key={c.id} role="option" aria-selected={i === index}>
                <button
                  type="button"
                  onMouseMove={() => setIndex(i)}
                  onClick={() => run(c)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm",
                    i === index ? "bg-white/[0.07] text-white" : "text-white/70"
                  )}
                >
                  <c.icon size={16} strokeWidth={1.8} className={i === index ? "text-accent" : "text-white/40"} />
                  <span className="flex-1">{c.label}</span>
                  <span className="text-xs text-white/35">{c.hint}</span>
                  {i === index && <CornerDownLeft size={13} className="text-white/40" />}
                </button>
              </li>
            ))
          ) : (
            <li className="px-3 py-8 text-center text-sm text-white/40">Aucun résultat pour « {query} »</li>
          )}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shell                                                               */
/* ------------------------------------------------------------------ */

const SEGMENT_LABEL: Record<string, string> = { new: "Nouveau", export: "Export" };

function Breadcrumb({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const section = [...items].sort((a, b) => b.href.length - a.href.length).find((i) => (i.href === "/admin" ? pathname === "/admin" : pathname.startsWith(i.href)));
  const rest = section && section.href !== "/admin" ? pathname.slice(section.href.length).split("/").filter(Boolean) : [];

  return (
    <nav aria-label="Fil d'Ariane" className="flex min-w-0 items-center gap-1.5 text-sm">
      <Link href="/admin" className="hidden text-white/40 hover:text-white sm:inline">
        Admin
      </Link>
      {section && (
        <>
          <ChevronRight size={14} className="hidden shrink-0 text-white/25 sm:block" />
          {rest.length ? (
            <Link href={section.href} className="truncate text-white/40 hover:text-white">
              {section.label}
            </Link>
          ) : (
            <span className="truncate font-medium text-white">{section.label}</span>
          )}
        </>
      )}
      {rest.length > 0 && (
        <>
          <ChevronRight size={14} className="shrink-0 text-white/25" />
          <span className="truncate font-medium text-white">{SEGMENT_LABEL[rest[0]] ?? "Détail"}</span>
        </>
      )}
    </nav>
  );
}

export function Sidebar({
  items,
  user,
  logout,
  initialCollapsed = false,
  canAddLead = false,
  children,
}: {
  items: NavItem[];
  user: User;
  logout: () => Promise<void>;
  initialCollapsed?: boolean;
  canAddLead?: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [drawer, setDrawer] = useState(false);
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const [palette, setPalette] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => setDrawer(false), [pathname]);
  useEffect(() => setIsMac(/mac|iphone|ipad/i.test(navigator.platform)), []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((c) => {
      document.cookie = `${SIDEBAR_COOKIE}=${c ? "0" : "1"}; path=/admin; max-age=31536000; samesite=lax`;
      return !c;
    });
  };

  const brand = (compact?: boolean) => (
    <Link href="/admin" className={cn("flex items-center gap-2.5 font-semibold tracking-[-0.03em]", compact && "justify-center")}>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] ring-1 ring-white/10">
        <LogoMark className="h-[18px] w-[18px]" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-sm text-white">Al Moustour</span>
          <span className="mt-1 text-[0.6875rem] font-medium text-white/40">Back-office</span>
        </span>
      )}
    </Link>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-white/[0.07] bg-deep/60 transition-[width] duration-200 lg:flex",
          collapsed ? "w-[4.5rem]" : "w-60"
        )}
      >
        <div className={cn("flex h-14 items-center border-b border-white/[0.07]", collapsed ? "justify-center" : "px-4")}>{brand(collapsed)}</div>
        <NavList items={items} collapsed={collapsed} />
        <div className="px-3 pb-1">
          <button
            type="button"
            onClick={toggleCollapsed}
            className={cn(
              "flex h-8 w-full items-center gap-3 rounded-lg text-xs text-white/40 transition-colors hover:bg-white/[0.04] hover:text-white",
              collapsed ? "justify-center" : "px-2.5"
            )}
            aria-label={collapsed ? "Déplier le menu" : "Replier le menu"}
          >
            {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
            {!collapsed && "Replier"}
          </button>
        </div>
        <UserBlock user={user} logout={logout} collapsed={collapsed} />
      </aside>

      {/* Mobile drawer */}
      <div className={cn("fixed inset-0 z-40 lg:hidden", drawer ? "visible" : "invisible")}>
        <div className={cn("absolute inset-0 bg-black/60 transition-opacity", drawer ? "opacity-100" : "opacity-0")} onClick={() => setDrawer(false)} />
        <aside
          className={cn(
            "absolute inset-y-0 left-0 flex w-72 flex-col border-r border-white/10 bg-deep transition-transform duration-300",
            drawer ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-14 items-center justify-between border-b border-white/[0.07] px-4">
            {brand()}
            <button type="button" onClick={() => setDrawer(false)} aria-label="Fermer le menu" className="rounded-lg p-1.5 text-white/60 hover:bg-white/5">
              <X size={18} />
            </button>
          </div>
          <NavList items={items} />
          <UserBlock user={user} logout={logout} />
        </aside>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-white/[0.07] bg-canvas/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setDrawer(true)}
            aria-label="Ouvrir le menu"
            className="-ml-1.5 rounded-lg p-1.5 text-white/70 hover:bg-white/5 lg:hidden"
          >
            <Menu size={20} />
          </button>
          <Breadcrumb items={items} />
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPalette(true)}
              className="flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 text-sm text-white/45 transition-colors hover:border-white/20 hover:text-white/80 sm:w-56"
            >
              <Search size={15} />
              <span className="hidden flex-1 text-left sm:inline">Rechercher…</span>
              <kbd className="hidden rounded border border-white/10 px-1.5 py-0.5 text-[0.625rem] text-white/40 sm:inline">
                {isMac ? "⌘" : "Ctrl"} K
              </kbd>
              <span className="sr-only">Recherche rapide</span>
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm text-white/50 transition-colors hover:bg-white/5 hover:text-white"
            >
              <ExternalLink size={15} />
              <span className="hidden md:inline">Voir le site</span>
            </a>
            <Link href="/admin/compte" aria-label="Mon compte" className="lg:hidden">
              <Avatar name={user.name} className="h-8 w-8" />
            </Link>
          </div>
        </header>

        <main className="min-w-0 flex-1 px-4 py-7 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>

      <CommandMenu open={palette} onClose={() => setPalette(false)} items={items} canAddLead={canAddLead} />
    </div>
  );
}
