import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { ATTRIBUTION_COOKIE, AUTH_COOKIE_PREFIX, VISITOR_COOKIE } from "@/lib/auth-cookie";

const secure = process.env.NODE_ENV === "production";
const DAY = 60 * 60 * 24;

/** Last-touch attribution: UTM tags, Facebook / Google ad click ids, or the external referrer. */
function attributionOf(req: NextRequest): Record<string, string> | null {
  const q = req.nextUrl.searchParams;
  const cut = (v: string | null) => v?.slice(0, 100) || undefined;
  const utm = { s: cut(q.get("utm_source")), m: cut(q.get("utm_medium")), c: cut(q.get("utm_campaign")) };
  if (utm.s || utm.m || utm.c) return JSON.parse(JSON.stringify(utm));
  if (q.has("fbclid")) return { s: "facebook", m: "social" };
  if (q.has("gclid")) return { s: "google", m: "cpc" };

  // First visit coming from another site (Google, Facebook, Instagram…)
  if (!req.cookies.has(ATTRIBUTION_COOKIE)) {
    const referer = req.headers.get("referer");
    if (referer) {
      try {
        const host = new URL(referer).host;
        if (host && host !== req.nextUrl.host) return { r: host.slice(0, 100) };
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/api/")) return NextResponse.next();

  if (pathname.startsWith("/admin")) {
    // Quick gate; the session itself is verified against the database on every admin page and action
    if (pathname !== "/admin/login" && !getSessionCookie(req, { cookiePrefix: AUTH_COOKIE_PREFIX })) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.search = "";
      if (pathname !== "/admin") url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    res.headers.set("Cache-Control", "no-store");
    return res;
  }

  const res = NextResponse.next();
  if (!req.cookies.has(VISITOR_COOKIE)) {
    res.cookies.set(VISITOR_COOKIE, crypto.randomUUID(), { maxAge: 365 * DAY, httpOnly: true, sameSite: "lax", secure, path: "/" });
  }
  const attribution = attributionOf(req);
  if (attribution) {
    res.cookies.set(ATTRIBUTION_COOKIE, JSON.stringify(attribution), {
      maxAge: 30 * DAY,
      httpOnly: true,
      sameSite: "lax",
      secure,
      path: "/",
    });
  }
  return res;
}

export const config = {
  // Pages only: skip Next internals and static files (anything with an extension)
  matcher: ["/((?!_next/|.*\\.[\\w]+$).*)"],
};
