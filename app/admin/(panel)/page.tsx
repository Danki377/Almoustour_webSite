import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, ShieldAlert } from "lucide-react";
import { TrendChart } from "@/components/admin/TrendChart";
import { Badge, Card, EmptyState, formatDate, formatMoney, PageHeader } from "@/components/admin/ui";
import { CLICK_SOURCE, LEAD_STATUS, LEAD_STATUSES, SERVICE_LABEL } from "@/lib/admin/labels";
import { getSiteContent } from "@/lib/content/server";
import { requireUser } from "@/lib/server/auth";
import { getDashboardStats, parsePeriod, PERIODS } from "@/lib/server/stats";
import { cn } from "@/lib/utils";

export const metadata = { title: "Tableau de bord" };

const CLICK_COLOR = "#0096D1";
const LEAD_COLOR = "#C97C1F";

function Delta({ value, previous }: { value: number; previous: number }) {
  if (!previous) return <span className="text-xs text-white/35">vs période précédente : —</span>;
  const change = (value - previous) / previous;
  const up = change >= 0;
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs", up ? "text-whatsapp" : "text-red-300")}>
      {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
      {Math.abs(Math.round(change * 100))} % vs période précédente
    </span>
  );
}

function Kpi({ label, value, children }: { label: string; value: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-deep p-5 ring-1 ring-white/10">
      <span className="text-xs font-medium text-white/50">{label}</span>
      <span className="text-[1.75rem] font-semibold leading-none tracking-[-0.04em] tabular-nums">{value}</span>
      {children}
    </div>
  );
}

/** Ranked horizontal bars (single hue = magnitude). */
function BarList({ rows, empty }: { rows: { label: string; value: number }[]; empty: string }) {
  if (!rows.length) return <p className="text-sm text-white/40">{empty}</p>;
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <ul className="flex flex-col gap-3">
      {rows.map((r) => (
        <li key={r.label} className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-4 text-sm">
            <span className="truncate text-white/80">{r.label}</span>
            <span className="tabular-nums text-white/60">{r.value}</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5">
            <div className="h-full rounded-full" style={{ width: `${(r.value / max) * 100}%`, background: CLICK_COLOR }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default async function DashboardPage({ searchParams }: { searchParams: { p?: string; refus?: string } }) {
  await requireUser("leads");
  const days = parsePeriod(searchParams.p);
  const [stats, { destinations }] = await Promise.all([getDashboardStats(days), getSiteContent()]);
  const countryOf = (id: string | null) => destinations.find((d) => d.id === id)?.country ?? id ?? "—";
  const { kpis } = stats;
  const clickToLead = kpis.clicks.value ? kpis.leads.value / kpis.clicks.value : 0;

  return (
    <>
      {searchParams.refus && (
        <p className="mb-6 flex items-center gap-2 rounded-xl bg-sun/10 px-4 py-3 text-sm text-sun">
          <ShieldAlert size={16} />
          Votre rôle ne donne pas accès à cette page.
        </p>
      )}

      <PageHeader
        title="Tableau de bord"
        description="Clics WhatsApp, demandes et clients sur la période."
        actions={
          <div className="flex rounded-xl bg-deep p-1 ring-1 ring-white/10">
            {PERIODS.map((p) => (
              <Link
                key={p}
                href={`/admin?p=${p}`}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm transition-colors",
                  p === days ? "bg-surface text-white" : "text-white/50 hover:text-white"
                )}
              >
                {p} jours
              </Link>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Kpi label="Clics WhatsApp" value={String(kpis.clicks.value)}>
          <Delta {...kpis.clicks} />
        </Kpi>
        <Kpi label="Leads" value={String(kpis.leads.value)}>
          <Delta {...kpis.leads} />
        </Kpi>
        <Kpi label="Nouveaux clients" value={String(kpis.converted.value)}>
          <Delta {...kpis.converted} />
        </Kpi>
        <Kpi label="Taux de conversion" value={`${Math.round(kpis.closeRate * 100)} %`}>
          <span className="text-xs text-white/35">leads devenus clients</span>
        </Kpi>
        <Kpi label="Chiffre d'affaires" value={formatMoney(kpis.revenue)}>
          <span className="text-xs text-white/35">montants des dossiers gagnés</span>
        </Kpi>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <Card>
          <TrendChart title="Clics WhatsApp par jour" total={kpis.clicks.value} unit="clics" points={stats.series.clicks} color={CLICK_COLOR} />
        </Card>
        <Card>
          <TrendChart title="Leads par jour" total={kpis.leads.value} unit="leads" points={stats.series.leads} color={LEAD_COLOR} />
          <p className="mt-3 text-xs text-white/40">
            {Math.round(clickToLead * 100)} % des clics WhatsApp donnent un lead enregistré.
          </p>
        </Card>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <Card title="Boutons les plus cliqués">
          <BarList
            rows={stats.bySource.map((r) => ({ label: CLICK_SOURCE[r.label ?? ""] ?? r.label ?? "—", value: r.count }))}
            empty="Aucun clic sur la période."
          />
        </Card>
        <Card title="Destinations demandées">
          <BarList
            rows={stats.byDestination.map((r) => ({ label: countryOf(r.label), value: r.count }))}
            empty="Aucun clic lié à une destination."
          />
        </Card>
        <Card title="Pipeline (tous les leads)">
          <ul className="flex flex-col divide-y divide-white/5">
            {LEAD_STATUSES.map((s) => (
              <li key={s}>
                <Link href={`/admin/leads?statut=${s}`} className="flex items-center justify-between py-2.5 text-sm hover:text-accent">
                  <Badge tone={LEAD_STATUS[s].tone}>{LEAD_STATUS[s].label}</Badge>
                  <span className="tabular-nums text-white/70">{stats.pipeline[s] ?? 0}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <Card title="Campagnes & provenance" className="lg:col-span-2">
          {stats.campaigns.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-white/40">
                    <th className="pb-2 font-medium">Source / campagne</th>
                    <th className="pb-2 text-right font-medium">Clics</th>
                    <th className="pb-2 text-right font-medium">Leads</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {stats.campaigns.map((c) => (
                    <tr key={c.label}>
                      <td className="py-2.5 text-white/80">{c.label}</td>
                      <td className="py-2.5 text-right tabular-nums text-white/60">{c.clicks}</td>
                      <td className="py-2.5 text-right tabular-nums text-white/60">{c.leads}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-xs text-white/35">
                Astuce : ajoutez <code className="text-white/60">?utm_source=facebook&utm_campaign=bourse-chine</code> à vos liens de
                publicité pour suivre chaque campagne.
              </p>
            </div>
          ) : (
            <p className="text-sm text-white/40">Aucune donnée sur la période.</p>
          )}
        </Card>
        <Card title="Appareils">
          <BarList rows={stats.byDevice.map((r) => ({ label: r.label ?? "inconnu", value: r.count }))} empty="Aucun clic sur la période." />
        </Card>
      </div>

      <Card
        title="Derniers leads"
        className="mt-3"
        actions={
          <Link href="/admin/leads" className="text-sm text-accent hover:underline">
            Tout voir
          </Link>
        }
      >
        {stats.recentLeads.length ? (
          <ul className="flex flex-col divide-y divide-white/5">
            {stats.recentLeads.map((l) => (
              <li key={l.id}>
                <Link href={`/admin/leads/${l.id}`} className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm hover:text-accent">
                  <span className="flex flex-col">
                    <span className="font-medium">{l.name}</span>
                    <span className="text-xs text-white/40">
                      {l.phone} · {SERVICE_LABEL[l.service ?? ""] ?? "Projet à préciser"}
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <Badge tone={LEAD_STATUS[l.status].tone}>{LEAD_STATUS[l.status].label}</Badge>
                    <span className="text-xs text-white/40">{formatDate(l.createdAt)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState>Aucun lead pour l&apos;instant. Ils apparaîtront ici dès le premier formulaire envoyé.</EmptyState>
        )}
      </Card>
    </>
  );
}
