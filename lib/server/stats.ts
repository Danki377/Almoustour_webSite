import "server-only";
import { db } from "./db";

export const PERIODS = [7, 30, 90] as const;
export type Period = (typeof PERIODS)[number];

export function parsePeriod(value: unknown): Period {
  const n = Number(value);
  return (PERIODS as readonly number[]).includes(n) ? (n as Period) : 30;
}

type Row = { label: string | null; count: number };
export type Point = { date: string; value: number };
export type MonthPoint = { month: string; visits: number; visitors: number; views: number };

const DAY = 86400000;
const iso = (d: Date) => new Date(d).toISOString().slice(0, 10);

/** Daily series over the period, missing days filled with 0 (dates in UTC = Bamako time). */
function fillDays<T extends { day: Date }>(rows: T[], since: Date, days: number, value: (r: T) => number): Point[] {
  const byDay = new Map(rows.map((r) => [iso(r.day), value(r)]));
  return Array.from({ length: days }, (_, i) => {
    const d = iso(new Date(since.getTime() + i * DAY));
    return { date: d, value: byDay.get(d) ?? 0 };
  });
}

const top = (rows: { _count: { _all: number } }[], key: (r: never) => string | null, limit = 6): Row[] =>
  rows
    .map((r) => ({ label: key(r as never), count: r._count._all }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);

/** Readable name for the site a visit came from. */
function sourceName(referrer: string | null, utmSource: string | null) {
  const s = (utmSource ?? referrer ?? "").toLowerCase();
  if (!s) return "Accès direct";
  const known: [RegExp, string][] = [
    [/google/, "Google"],
    [/facebook|fb\.|^fb$/, "Facebook"],
    [/instagram/, "Instagram"],
    [/tiktok/, "TikTok"],
    [/whatsapp|wa\.me/, "WhatsApp"],
    [/linkedin|lnkd/, "LinkedIn"],
    [/^t\.co$|twitter|^x\.com$/, "X (Twitter)"],
    [/youtube|youtu\.be/, "YouTube"],
    [/bing/, "Bing"],
    [/snapchat/, "Snapchat"],
  ];
  return known.find(([re]) => re.test(s))?.[1] ?? (utmSource || referrer)!;
}

const regionNames = new Intl.DisplayNames(["fr"], { type: "region" });
const countryName = (code: string | null) => {
  if (!code) return "Inconnu";
  try {
    return regionNames.of(code) ?? code;
  } catch {
    return code;
  }
};

/** Visits of the last 12 months (current month included), oldest first. */
async function monthly(ready: boolean): Promise<MonthPoint[]> {
  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 11, 1));
  const rows = !ready
    ? []
    : await db.$queryRaw<{ month: Date; visits: bigint; visitors: bigint; views: bigint }[]>`
    SELECT date_trunc('month', "createdAt") AS month,
           COUNT(*) FILTER (WHERE "isEntry") AS visits,
           COUNT(DISTINCT "visitorId") AS visitors,
           COUNT(*) AS views
    FROM "PageView" WHERE "createdAt" >= ${start} GROUP BY 1 ORDER BY 1`;
  const byMonth = new Map(rows.map((r) => [iso(r.month).slice(0, 7), r]));
  return Array.from({ length: 12 }, (_, i) => {
    const m = iso(new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + i, 1))).slice(0, 7);
    const r = byMonth.get(m);
    return { month: m, visits: Number(r?.visits ?? 0), visitors: Number(r?.visitors ?? 0), views: Number(r?.views ?? 0) };
  });
}

/** False until the PageView migration has been applied (the dashboard then shows a notice instead of crashing). */
async function hasPageViewTable() {
  const rows = await db.$queryRaw<{ ok: boolean }[]>`SELECT to_regclass('public."PageView"') IS NOT NULL AS ok`;
  return Boolean(rows[0]?.ok);
}

export async function getDashboardStats(days: Period) {
  const trafficReady = await hasPageViewTable();
  // Without the table, every traffic query resolves to "nothing"
  const traffic = <T>(query: () => Promise<T>, empty: T) => (trafficReady ? query() : Promise.resolve(empty));

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const since = new Date(today.getTime() - (days - 1) * DAY);
  const previousSince = new Date(since.getTime() - days * DAY);
  const range = { gte: since };
  const previous = { gte: previousSince, lt: since };

  const [
    visits,
    visitsPrev,
    views,
    viewsPrev,
    visitors,
    clicks,
    clicksPrev,
    leads,
    leadsPrev,
    converted,
    convertedPrev,
    revenue,
    trafficByDay,
    clicksByDay,
    leadsByDay,
    topPages,
    sources,
    countries,
    devices,
    bySource,
    byDestination,
    leadsByCampaign,
    clicksByCampaign,
    pipeline,
    recentLeads,
    months,
  ] = await Promise.all([
    traffic(() => db.pageView.count({ where: { isEntry: true, createdAt: range } }), 0),
    traffic(() => db.pageView.count({ where: { isEntry: true, createdAt: previous } }), 0),
    traffic(() => db.pageView.count({ where: { createdAt: range } }), 0),
    traffic(() => db.pageView.count({ where: { createdAt: previous } }), 0),
    traffic(() => db.$queryRaw<{ current: bigint; previous: bigint }[]>`
      SELECT COUNT(DISTINCT "visitorId") FILTER (WHERE "createdAt" >= ${since}) AS current,
             COUNT(DISTINCT "visitorId") FILTER (WHERE "createdAt" < ${since}) AS previous
      FROM "PageView" WHERE "createdAt" >= ${previousSince}`, []),
    db.whatsAppClick.count({ where: { createdAt: range } }),
    db.whatsAppClick.count({ where: { createdAt: previous } }),
    db.lead.count({ where: { createdAt: range } }),
    db.lead.count({ where: { createdAt: previous } }),
    db.lead.count({ where: { convertedAt: range } }),
    db.lead.count({ where: { convertedAt: previous } }),
    db.lead.aggregate({ where: { convertedAt: range }, _sum: { amount: true } }),
    traffic(() => db.$queryRaw<{ day: Date; visits: bigint; visitors: bigint; views: bigint }[]>`
      SELECT date_trunc('day', "createdAt") AS day,
             COUNT(*) FILTER (WHERE "isEntry") AS visits,
             COUNT(DISTINCT "visitorId") AS visitors,
             COUNT(*) AS views
      FROM "PageView" WHERE "createdAt" >= ${since} GROUP BY 1 ORDER BY 1`, []),
    db.$queryRaw<{ day: Date; count: bigint }[]>`
      SELECT date_trunc('day', "createdAt") AS day, COUNT(*) AS count
      FROM "WhatsAppClick" WHERE "createdAt" >= ${since} GROUP BY 1 ORDER BY 1`,
    db.$queryRaw<{ day: Date; count: bigint }[]>`
      SELECT date_trunc('day', "createdAt") AS day, COUNT(*) AS count
      FROM "Lead" WHERE "createdAt" >= ${since} GROUP BY 1 ORDER BY 1`,
    traffic(() => db.pageView.groupBy({ by: ["path"], where: { createdAt: range }, _count: { _all: true } }), []),
    traffic(() => db.pageView.groupBy({ by: ["referrer", "utmSource"], where: { isEntry: true, createdAt: range }, _count: { _all: true } }), []),
    traffic(() => db.pageView.groupBy({ by: ["country"], where: { isEntry: true, createdAt: range }, _count: { _all: true } }), []),
    traffic(() => db.pageView.groupBy({ by: ["device"], where: { isEntry: true, createdAt: range }, _count: { _all: true } }), []),
    db.whatsAppClick.groupBy({ by: ["source"], where: { createdAt: range }, _count: { _all: true } }),
    db.whatsAppClick.groupBy({ by: ["destinationId"], where: { createdAt: range, destinationId: { not: null } }, _count: { _all: true } }),
    db.lead.groupBy({ by: ["utmSource", "utmCampaign"], where: { createdAt: range }, _count: { _all: true } }),
    db.whatsAppClick.groupBy({ by: ["utmSource", "utmCampaign"], where: { createdAt: range }, _count: { _all: true } }),
    db.lead.groupBy({ by: ["status"], _count: { _all: true } }),
    db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 6, select: { id: true, name: true, phone: true, service: true, status: true, createdAt: true } }),
    monthly(trafficReady),
  ]);

  // Traffic sources, merged by readable name
  const sourceTotals = new Map<string, number>();
  for (const r of sources) {
    const k = sourceName(r.referrer, r.utmSource);
    sourceTotals.set(k, (sourceTotals.get(k) ?? 0) + r._count._all);
  }

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

  const v = visitors[0];
  return {
    days,
    trafficReady,
    kpis: {
      visits: { value: visits, previous: visitsPrev },
      visitors: { value: Number(v?.current ?? 0), previous: Number(v?.previous ?? 0) },
      views: { value: views, previous: viewsPrev },
      clicks: { value: clicks, previous: clicksPrev },
      leads: { value: leads, previous: leadsPrev },
      converted: { value: converted, previous: convertedPrev },
      revenue: revenue._sum.amount ?? 0,
      /** Share of leads that became clients over the period */
      closeRate: leads ? converted / leads : 0,
      /** Pages seen per visit */
      pagesPerVisit: visits ? views / visits : 0,
    },
    series: {
      visits: fillDays(trafficByDay, since, days, (r) => Number(r.visits)),
      visitors: fillDays(trafficByDay, since, days, (r) => Number(r.visitors)),
      views: fillDays(trafficByDay, since, days, (r) => Number(r.views)),
      clicks: fillDays(clicksByDay, since, days, (r) => Number(r.count)),
      leads: fillDays(leadsByDay, since, days, (r) => Number(r.count)),
    },
    months,
    topPages: top(topPages, (r: { path: string }) => r.path, 7),
    sources: Array.from(sourceTotals, ([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 7),
    countries: top(countries, (r: { country: string | null }) => countryName(r.country)),
    devices: top(devices, (r: { device: string | null }) => r.device),
    bySource: top(bySource, (r: { source: string }) => r.source),
    byDestination: top(byDestination, (r: { destinationId: string | null }) => r.destinationId),
    campaigns: Array.from(campaigns.values())
      .sort((a, b) => b.clicks + b.leads - (a.clicks + a.leads))
      .slice(0, 8),
    pipeline: Object.fromEntries(pipeline.map((p) => [p.status, p._count._all])) as Record<string, number>,
    recentLeads,
  };
}
