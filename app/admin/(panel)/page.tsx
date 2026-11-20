import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Eye,
  Info,
  Laptop,
  MessageCircle,
  Minus,
  MousePointerClick,
  Plus,
  ShieldAlert,
  Smartphone,
  Tablet,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { ActivityChart, MonthlyChart, Sparkline, type Point } from "@/components/admin/charts";
import { Badge, Card, EmptyState, formatDate, formatMoney, formatNumber, LinkButton, PageHeader, panelClass } from "@/components/admin/ui";
import { CLICK_SOURCE, LEAD_STATUS, LEAD_STATUSES, SERVICE_LABEL } from "@/lib/admin/labels";
import { getSiteContent } from "@/lib/content/server";
import { requireUser } from "@/lib/server/auth";
import { getDashboardStats, parsePeriod, PERIODS } from "@/lib/server/stats";
import { cn } from "@/lib/utils";

export const metadata = { title: "Tableau de bord" };

const COLOR = {
  visits: "#00AEEF",
  visitors: "#8B93FF",
  clicks: "#25D366",
  leads: "#F6A93B",
  clients: "#34D399",
};

const pct = (n: number) => `${Math.round(n * 100)} %`;

function Delta({ value, previous }: { value: number; previous: number }) {
  if (!previous) {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.04] px-1.5 py-0.5 text-[0.6875rem] font-medium text-white/40">
        <Minus size={11} /> nouveau
      </span>
    );
  }
  const change = (value - previous) / previous;
  const up = change >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[0.6875rem] font-semibold tabular-nums",
        up ? "bg-whatsapp/10 text-whatsapp" : "bg-red-500/10 text-red-300"
      )}
      title="Par rapport à la période précédente de même durée"
    >
      {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
      {Math.abs(Math.round(change * 100))} %
    </span>
  );
}

function Kpi({
  label,
  icon: Icon,
  value,
  delta,
  points,
  color,
  foot,
}: {
  label: string;
  icon: LucideIcon;
  value: number;
  delta: { value: number; previous: number };
  points: Point[];
  color: string;
  foot: string;
}) {
  return (
    <div className={cn(panelClass, "flex flex-col gap-3 p-4 lg:p-5")}>
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-xs font-medium text-white/55">
          <span className="flex h-6 w-6 items-center justify-center rounded-md" style={{ background: `${color}1a`, color }}>
            <Icon size={13} strokeWidth={2} />
          </span>
          {label}
        </span>
        <Delta {...delta} />
      </div>
      <span className="text-[1.875rem] font-semibold leading-none tracking-[-0.04em] tabular-nums">{formatNumber(value)}</span>
      <Sparkline points={points} color={color} />
      <span className="text-[0.6875rem] text-white/35">{foot}</span>
    </div>
  );
}

/** Ranked horizontal bars (one hue = magnitude), with the share of the total. */
function BarList({ rows, empty, color = COLOR.visits, mono }: { rows: { label: string; value: number }[]; empty: string; color?: string; mono?: boolean }) {
  if (!rows.length) return <p className="py-6 text-center text-sm text-white/35">{empty}</p>;
  const max = Math.max(...rows.map((r) => r.value));
  const total = rows.reduce((a, r) => a + r.value, 0);
  return (
    <ul className="flex flex-col gap-1">
      {rows.map((r) => (
        <li key={r.label} className="relative flex h-8 items-center justify-between gap-4 overflow-hidden rounded-md px-2.5 text-sm">
          <span className="absolute inset-y-0 left-0 rounded-md" style={{ width: `${(r.value / max) * 100}%`, background: `${color}1f` }} aria-hidden />
          <span className={cn("relative truncate text-white/80", mono && "font-mono text-xs")}>{r.label}</span>
          <span className="relative flex shrink-0 items-baseline gap-2 tabular-nums">
            <span className="font-medium text-white">{formatNumber(r.value)}</span>
            <span className="w-9 text-right text-xs text-white/35">{pct(r.value / total)}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function Funnel({ steps }: { steps: { label: string; value: number; color: string }[] }) {
  // Scale on the largest step: clicks can outnumber visits (tracking started later, or visits not recorded yet)
  const max = Math.max(1, ...steps.map((s) => s.value));
  return (
    <ol className="flex flex-col gap-3.5">
      {steps.map((s, i) => {
        const prev = steps[i - 1]?.value;
        return (
          <li key={s.label} className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="text-white/75">{s.label}</span>
              <span className="flex items-baseline gap-2 tabular-nums">
                <span className="font-semibold text-white">{formatNumber(s.value)}</span>
                {i > 0 && <span className="w-10 text-right text-xs text-white/40">{prev ? pct(s.value / prev) : "—"}</span>}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
              <div className="h-full rounded-full" style={{ width: `${Math.min(100, Math.max(s.value ? 2 : 0, (s.value / max) * 100))}%`, background: s.color }} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

const DEVICE_ICON: Record<string, LucideIcon> = { mobile: Smartphone, ordinateur: Laptop, tablette: Tablet };
const DEVICE_COLOR: Record<string, string> = { mobile: COLOR.visits, ordinateur: COLOR.visitors, tablette: COLOR.leads };

function Devices({ rows }: { rows: { label: string | null; count: number }[] }) {
  const total = rows.reduce((a, r) => a + r.count, 0);
  if (!total) return <p className="py-6 text-center text-sm text-white/35">Aucune visite sur la période.</p>;
  return (
    <div className="flex flex-col gap-5">
      <div className="flex h-2.5 gap-0.5 overflow-hidden rounded-full">
        {rows.map((r) => (
          <span key={r.label ?? "?"} style={{ width: `${(r.count / total) * 100}%`, background: DEVICE_COLOR[r.label ?? ""] ?? "rgba(255,255,255,0.3)" }} />
        ))}
      </div>
      <ul className="flex flex-col gap-3">
        {rows.map((r) => {
          const Icon = DEVICE_ICON[r.label ?? ""] ?? Laptop;
          return (
            <li key={r.label ?? "?"} className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2.5 capitalize text-white/75">
                <Icon size={15} style={{ color: DEVICE_COLOR[r.label ?? ""] ?? "rgba(255,255,255,0.5)" }} />
                {r.label ?? "inconnu"}
              </span>
              <span className="tabular-nums">
                <span className="font-medium text-white">{pct(r.count / total)}</span>
                <span className="ml-2 text-xs text-white/35">{formatNumber(r.count)}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default async function DashboardPage({ searchParams }: { searchParams: { p?: string; refus?: string } }) {
  const user = await requireUser("leads");
  const days = parsePeriod(searchParams.p);
  const [stats, { destinations }] = await Promise.all([getDashboardStats(days), getSiteContent()]);
  const countryOf = (id: string | null) => destinations.find((d) => d.id === id)?.country ?? id ?? "—";
  const { kpis, series } = stats;
  const noTraffic = stats.months.every((m) => m.views === 0);
  const today = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Bamako" }).format(new Date());

  return (
    <>
      {searchParams.refus && (
        <p className="mb-6 flex items-center gap-2 rounded-lg border border-sun/20 bg-sun/10 px-4 py-3 text-sm text-sun">
          <ShieldAlert size={16} />
          Votre rôle ne donne pas accès à cette page.
        </p>
      )}

      <PageHeader
        eyebrow={<span className="capitalize">{today}</span>}
        title={`Bonjour, ${user.name.split(" ")[0]}`}
        description={`Audience du site, contacts WhatsApp et demandes sur les ${days} derniers jours.`}
        actions={
          <>
            <div className="flex rounded-lg border border-white/[0.07] bg-deep p-0.5" role="group" aria-label="Période">
              {PERIODS.map((p) => (
                <Link
                  key={p}
                  href={`/admin?p=${p}`}
                  aria-current={p === days ? "true" : undefined}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    p === days ? "bg-white/[0.08] text-white" : "text-white/45 hover:text-white"
                  )}
                >
                  {p} j
                </Link>
              ))}
            </div>
            <LinkButton href="/admin/leads/new" variant="primary">
              <Plus size={15} /> Ajouter un lead
            </LinkButton>
          </>
        }
      />

      {!stats.trafficReady ? (
        <p className="mb-4 flex items-start gap-2.5 rounded-lg border border-sun/20 bg-sun/[0.07] px-4 py-3 text-sm text-white/75">
          <Info size={16} className="mt-0.5 shrink-0 text-sun" />
          <span>
            Le suivi des visites n&apos;est pas encore activé dans la base de données. Lancez{" "}
            <code className="rounded bg-white/[0.06] px-1 py-0.5 font-mono text-xs">pnpm db:deploy</code> ou redéployez le site sur Vercel :
            la table des visites sera créée automatiquement.
          </span>
        </p>
      ) : noTraffic && (
        <p className="mb-4 flex items-start gap-2.5 rounded-lg border border-accent/20 bg-accent/[0.07] px-4 py-3 text-sm text-white/75">
          <Info size={16} className="mt-0.5 shrink-0 text-accent" />
          Le suivi des visites est actif. Les chiffres apparaîtront dès les premières visites du site. Les membres de l&apos;équipe connectés et les
          robots ne sont pas comptés.
        </p>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Visites" icon={Eye} value={kpis.visits.value} delta={kpis.visits} points={series.visits} color={COLOR.visits} foot={`${kpis.pagesPerVisit.toFixed(1).replace(".", ",")} pages vues par visite`} />
        <Kpi label="Visiteurs uniques" icon={Users} value={kpis.visitors.value} delta={kpis.visitors} points={series.visitors} color={COLOR.visitors} foot={`${formatNumber(kpis.views.value)} pages vues au total`} />
        <Kpi label="Clics WhatsApp" icon={MessageCircle} value={kpis.clicks.value} delta={kpis.clicks} points={series.clicks} color={COLOR.clicks} foot={`${kpis.visits.value ? pct(kpis.clicks.value / kpis.visits.value) : "—"} des visites cliquent sur WhatsApp`} />
        <Kpi label="Leads" icon={UserPlus} value={kpis.leads.value} delta={kpis.leads} points={series.leads} color={COLOR.leads} foot={`${formatNumber(kpis.converted.value)} devenus clients sur la période`} />
      </div>

      {/* Monthly visits + funnel */}
      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <Card title="Visites par mois" description="Les 12 derniers mois, mois en cours inclus" className="lg:col-span-2">
          <MonthlyChart months={stats.months} />
        </Card>
        <Card title="Entonnoir de conversion" description={`Sur les ${days} derniers jours`}>
          <Funnel
            steps={[
              { label: "Visites", value: kpis.visits.value, color: COLOR.visits },
              { label: "Clics WhatsApp", value: kpis.clicks.value, color: COLOR.clicks },
              { label: "Leads", value: kpis.leads.value, color: COLOR.leads },
              { label: "Clients", value: kpis.converted.value, color: COLOR.clients },
            ]}
          />
          <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-5">
            <div>
              <dt className="text-xs text-white/45">Chiffre d&apos;affaires</dt>
              <dd className="mt-1 text-base font-semibold tabular-nums">{formatMoney(kpis.revenue)}</dd>
            </div>
            <div>
              <dt className="text-xs text-white/45">Leads → clients</dt>
              <dd className="mt-1 text-base font-semibold tabular-nums">{pct(kpis.closeRate)}</dd>
            </div>
          </dl>
        </Card>
      </div>

      {/* Daily activity + pipeline */}
      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <Card title="Activité par jour" description="Choisissez l'indicateur à afficher" className="lg:col-span-2">
          <ActivityChart
            series={[
              { key: "visits", label: "Visites", unit: "visites", color: COLOR.visits, points: series.visits },
              { key: "clicks", label: "Clics WhatsApp", unit: "clics", color: COLOR.clicks, points: series.clicks },
              { key: "leads", label: "Leads", unit: "leads", color: COLOR.leads, points: series.leads },
            ]}
          />
        </Card>
        <Card
          title="Pipeline"
          description="Tous les leads, par statut"
          actions={
            <Link href="/admin/leads" className="text-xs font-medium text-accent hover:underline">
              Ouvrir
            </Link>
          }
        >
          <ul className="flex flex-col gap-1">
            {LEAD_STATUSES.map((s) => (
              <li key={s}>
                <Link href={`/admin/leads?statut=${s}`} className="group flex items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-white/[0.04]">
                  <Badge tone={LEAD_STATUS[s].tone}>{LEAD_STATUS[s].label}</Badge>
                  <span className="flex items-center gap-2 tabular-nums text-white/80">
                    {stats.pipeline[s] ?? 0}
                    <ArrowRight size={13} className="text-white/0 transition-colors group-hover:text-white/40" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Audience */}
      <h2 className="mb-3 mt-8 text-xs font-medium uppercase tracking-[0.08em] text-white/35">Audience</h2>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Pages les plus vues">
          <BarList rows={stats.topPages.map((r) => ({ label: r.label ?? "/", value: r.count }))} empty="Aucune page vue sur la période." mono />
        </Card>
        <Card title="Sources de trafic" description="D'où viennent les visites">
          <BarList rows={stats.sources.map((r) => ({ label: r.label, value: r.count }))} empty="Aucune visite sur la période." color={COLOR.visitors} />
        </Card>
        <Card title="Pays">
          <BarList rows={stats.countries.map((r) => ({ label: r.label ?? "Inconnu", value: r.count }))} empty="Aucune visite sur la période." color={COLOR.leads} />
        </Card>
        <Card title="Appareils">
          <Devices rows={stats.devices} />
        </Card>
      </div>

      {/* WhatsApp & demand */}
      <h2 className="mb-3 mt-8 text-xs font-medium uppercase tracking-[0.08em] text-white/35">Contacts & demandes</h2>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <Card title="Boutons WhatsApp les plus cliqués">
          <BarList
            rows={stats.bySource.map((r) => ({ label: CLICK_SOURCE[r.label ?? ""] ?? r.label ?? "—", value: r.count }))}
            empty="Aucun clic sur la période."
            color={COLOR.clicks}
          />
        </Card>
        <Card title="Destinations demandées">
          <BarList rows={stats.byDestination.map((r) => ({ label: countryOf(r.label), value: r.count }))} empty="Aucun clic lié à une destination." color={COLOR.clicks} />
        </Card>
        <Card title="Campagnes" description="Clics WhatsApp et leads par source" className="md:col-span-2 xl:col-span-1" flush>
          {stats.campaigns.length ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-y border-white/[0.06] text-[0.6875rem] uppercase tracking-[0.06em] text-white/40">
                  <th className="px-5 py-2 text-left font-medium">Source</th>
                  <th className="px-3 py-2 text-right font-medium">Clics</th>
                  <th className="px-5 py-2 text-right font-medium">Leads</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {stats.campaigns.map((c) => (
                  <tr key={c.label}>
                    <td className="max-w-0 truncate px-5 py-2.5 text-white/80">{c.label}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-white/60">{c.clicks}</td>
                    <td className="px-5 py-2.5 text-right tabular-nums text-white/60">{c.leads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="px-5 pb-6 text-sm text-white/35">Aucune donnée sur la période.</p>
          )}
          <p className="border-t border-white/[0.06] px-5 py-3 text-xs text-white/35">
            Ajoutez <code className="rounded bg-white/[0.06] px-1 py-0.5 font-mono text-[0.6875rem] text-white/60">?utm_source=facebook&amp;utm_campaign=bourse-chine</code> à vos liens
            de publicité pour suivre chaque campagne.
          </p>
        </Card>
      </div>

      {/* Recent leads */}
      <Card
        title="Derniers leads"
        className="mt-3"
        flush
        actions={
          <Link href="/admin/leads" className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline">
            Tout voir <ArrowRight size={12} />
          </Link>
        }
      >
        {stats.recentLeads.length ? (
          <ul className="flex flex-col divide-y divide-white/[0.05] border-t border-white/[0.06]">
            {stats.recentLeads.map((l) => (
              <li key={l.id}>
                <Link href={`/admin/leads/${l.id}`} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 text-sm transition-colors hover:bg-white/[0.02]">
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-xs font-semibold text-white/70">
                      {l.name.slice(0, 1).toUpperCase()}
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate font-medium">{l.name}</span>
                      <span className="truncate text-xs text-white/40">
                        <span className="tabular-nums">{l.phone}</span> · {SERVICE_LABEL[l.service ?? ""] ?? "Projet à préciser"}
                      </span>
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <Badge tone={LEAD_STATUS[l.status].tone}>{LEAD_STATUS[l.status].label}</Badge>
                    <span className="hidden text-xs text-white/40 sm:inline">{formatDate(l.createdAt)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-5 pb-5">
            <EmptyState icon={<MousePointerClick size={18} />}>Aucun lead pour l&apos;instant. Ils apparaîtront ici dès le premier formulaire envoyé.</EmptyState>
          </div>
        )}
      </Card>
    </>
  );
}
