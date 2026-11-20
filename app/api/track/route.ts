import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { z } from "zod";
import { AUTH_COOKIE_PREFIX, VISIT_COOKIE, VISITOR_COOKIE } from "@/lib/auth-cookie";
import { db, isDbConfigured } from "@/lib/server/db";
import { rateLimit } from "@/lib/server/rate-limit";
import { deviceOf, ipHash, isBot } from "@/lib/server/security";

export const dynamic = "force-dynamic";

/** A visit ends after 30 minutes without a new page (same rule as Google Analytics). */
const VISIT_SECONDS = 30 * 60;

const payload = z.object({
  /** Path of the page */
  p: z.string().startsWith("/").max(200),
  /** document.referrer, sent on the first page of the tab */
  r: z.string().max(500).optional().catch(undefined),
  /** location.search of the landing page (UTM tags, ad click ids) */
  q: z.string().max(500).optional().catch(undefined),
});

const cut = (v: string | null | undefined) => v?.trim().slice(0, 100) || null;

function externalHost(referrer: string | undefined, ownHost: string | null) {
  if (!referrer) return null;
  try {
    const host = new URL(referrer).host.replace(/^www\./, "");
    return host && host !== ownHost?.replace(/^www\./, "") ? host.slice(0, 100) : null;
  } catch {
    return null;
  }
}

function campaignOf(search: string | undefined) {
  const q = new URLSearchParams(search ?? "");
  if (q.get("utm_source") || q.get("utm_campaign")) return { utmSource: cut(q.get("utm_source")), utmCampaign: cut(q.get("utm_campaign")) };
  if (q.has("fbclid")) return { utmSource: "facebook", utmCampaign: null };
  if (q.has("gclid")) return { utmSource: "google", utmCampaign: null };
  return { utmSource: null, utmCampaign: null };
}

const done = () => new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });

/** Records one page view of the public site (called by components/PageViewTracker). */
export async function POST(req: NextRequest) {
  if (!isDbConfigured) return done();

  const ua = req.headers.get("user-agent");
  const host = req.headers.get("host");
  const fetchSite = req.headers.get("sec-fetch-site");
  const origin = req.headers.get("origin");
  if (isBot(ua) || (fetchSite && fetchSite !== "same-origin")) return done();
  if (origin) {
    try {
      if (new URL(origin).host !== host) return done();
    } catch {
      return done();
    }
  }
  // The team browsing its own site is not audience
  if (getSessionCookie(req, { cookiePrefix: AUTH_COOKIE_PREFIX })) return done();

  const raw = await req.text();
  if (raw.length > 2000) return done();
  let body: z.infer<typeof payload>;
  try {
    body = payload.parse(JSON.parse(raw));
  } catch {
    return done();
  }
  if (body.p.startsWith("/admin") || body.p.startsWith("/go/")) return done();

  if (!(await rateLimit(`pv:${ipHash()}`, 120, 60).catch(() => true))) return done();

  const isEntry = !req.cookies.has(VISIT_COOKIE);
  const country = req.headers.get("x-vercel-ip-country");

  try {
    await db.pageView.create({
      data: {
        path: body.p,
        visitorId: cut(req.cookies.get(VISITOR_COOKIE)?.value),
        isEntry,
        device: deviceOf(ua),
        country: country && /^[A-Z]{2}$/.test(country) ? country : null,
        ...(isEntry ? { referrer: externalHost(body.r, host), ...campaignOf(body.q) } : {}),
      },
    });
  } catch (e) {
    console.error("[page view]", e);
  }

  // Keep two years of history
  if (Math.random() < 0.001) {
    db.pageView.deleteMany({ where: { createdAt: { lt: new Date(Date.now() - 730 * 86400000) } } }).catch(() => {});
  }

  const res = done();
  res.cookies.set(VISIT_COOKIE, "1", {
    maxAge: VISIT_SECONDS,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return res;
}
