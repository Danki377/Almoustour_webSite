import "server-only";
import { db } from "./db";

export const PERIODS = [7, 30, 90] as const;
export type Period = (typeof PERIODS)[number];

export function parsePeriod(value: unknown): Period {
  const n = Number(value);
  return (PERIODS as readonly number[]).includes(n) ? (n as Period) : 30;
}

type Row = { label: string | null; count: number };

/** Daily series over the period, with missing days filled with 0 (dates in UTC = Bamako time). */
function fillDays(rows: { day: Date; count: bigint | number }[], since: Date, days: number) {
  const byDay = new Map(rows.map((r) => [new Date(r.day).toISOString().slice(0, 10), Number(r.count)]));
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(since.getTime() + i * 86400000).toISOString().slice(0, 10);
    return { date: d, value: byDay.get(d) ?? 0 };
  });
}

const top = (rows: { _count: { _all: number } }[], key: (r: never) => string | null): Row[] =>
  rows
    .map((r) => ({ label: key(r as never), count: r._count._all }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

export async function getDashboardStats(days: Period) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const since = new Date(today.getTime() - (days - 1) * 86400000);
  const previousSince = new Date(since.getTime() - days * 86400000);
  const range = { gte: since };
  const previous = { gte: previousSince, lt: since };

  const [
    clicks,
    clicksPrev,
    leads,
    leadsPrev,
    converted,
    convertedPrev,
    revenue,
    clicksByDay,
    leadsByDay,
    bySource,
    byDestination,
    leadsByCampaign,
    clicksByCampaign,
    byDevice,
    pipeline,
    recentLeads,
  ] = await Promise.all([
    db.whatsAppClick.count({ where: { createdAt: range } }),
    db.whatsAppClick.count({ where: { createdAt: previous } }),
    db.lead.count({ where: { createdAt: range } }),
    db.lead.count({ where: { createdAt: previous } }),
    db.lead.count({ where: { convertedAt: range } }),
    db.lead.count({ where: { convertedAt: previous } }),
    db.lead.aggregate({ where: { convertedAt: range }, _sum: { amount: true } }),
    db.$queryRaw<{ day: Date; count: bigint }[]>`
      SELECT date_trunc('day', "createdAt") AS day, COUNT(*) AS count
      FROM "WhatsAppClick" WHERE "createdAt" >= ${since} GROUP BY 1 ORDER BY 1`,
    db.$queryRaw<{ day: Date; count: bigint }[]>`
      SELECT date_trunc('day', "createdAt") AS day, COUNT(*) AS count
      FROM "Lead" WHERE "createdAt" >= ${since} GROUP BY 1 ORDER BY 1`,
    db.whatsAppClick.groupBy({ by: ["source"], where: { createdAt: range }, _count: { _all: true } }),
    db.whatsAppClick.groupBy({ by: ["destinationId"], where: { createdAt: range, destinationId: { not: null } }, _count: { _all: true } }),
    db.lead.groupBy({ by: ["utmSource", "utmCampaign"], where: { createdAt: range }, _count: { _all: true } }),
    db.whatsAppClick.groupBy({ by: ["utmSource", "utmCampaign"], where: { createdAt: range }, _count: { _all: true } }),
    db.whatsAppClick.groupBy({ by: ["device"], where: { createdAt: range }, _count: { _all: true } }),
    db.lead.groupBy({ by: ["status"], _count: { _all: true } }),
    db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 6, select: { id: true, name: true, phone: true, service: true, status: true, createdAt: true } }),
  ]);

  // Campaigns: clicks and leads side by side, keyed by "source / campaign"
  const campaigns = new Map<string, { label: string; clicks: number; leads: number }>();
  const campaignKey = (s: string | null, c: string | null) => (s || c ? [s ?? "—", c].filter(Boolean).join(" / ") : "Accès direct");
  for (const r of clicksByCampaign) {
    const k = campaignKey(r.utmSource, r.utmCampaign);
    campaigns.set(k, { label: k, clicks: (campaigns.get(k)?.clicks ?? 0) + r._count._all, leads: campaigns.get(k)?.leads ?? 0 });
  }
  for (const r of leadsByCampaign) {
    const k = campaignKey(r.utmSource, r.utmCampaign);
    campaigns.set(k, { label: k, clicks: campaigns.get(k)?.clicks ?? 0, leads: (campaigns.get(k)?.leads ?? 0) + r._count._all });
  }

  return {
    days,
    kpis: {
      clicks: { value: clicks, previous: clicksPrev },
      leads: { value: leads, previous: leadsPrev },
      converted: { value: converted, previous: convertedPrev },
      revenue: revenue._sum.amount ?? 0,
      /** Share of leads that became clients over the period */
      closeRate: leads ? converted / leads : 0,
    },
    series: {
      clicks: fillDays(clicksByDay, since, days),
      leads: fillDays(leadsByDay, since, days),
    },
    bySource: top(bySource, (r: { source: string }) => r.source),
    byDestination: top(byDestination, (r: { destinationId: string | null }) => r.destinationId),
    byDevice: top(byDevice, (r: { device: string | null }) => r.device),
    campaigns: Array.from(campaigns.values())
      .sort((a, b) => b.clicks + b.leads - (a.clicks + a.leads))
      .slice(0, 8),
    pipeline: Object.fromEntries(pipeline.map((p) => [p.status, p._count._all])) as Record<string, number>,
    recentLeads,
  };
}
