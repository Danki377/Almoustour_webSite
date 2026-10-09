import "server-only";
import { cookies, headers } from "next/headers";
import { ATTRIBUTION_COOKIE, VISITOR_COOKIE } from "@/lib/auth-cookie";

export type Attribution = {
  visitorId: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  referrer: string | null;
  /** Path of the site page the request came from */
  page: string | null;
};

const clean = (v: unknown, max = 100) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null);

/** Campaign (UTM / Facebook / Google) and visitor captured by the middleware. */
export function getAttribution(): Attribution {
  const jar = cookies();
  let src: Record<string, unknown> = {};
  try {
    src = JSON.parse(jar.get(ATTRIBUTION_COOKIE)?.value ?? "{}");
  } catch {
    src = {};
  }

  let page: string | null = null;
  const referer = headers().get("referer");
  const host = headers().get("host");
  if (referer) {
    try {
      const url = new URL(referer);
      if (url.host === host) page = url.pathname.slice(0, 200);
    } catch {
      page = null;
    }
  }

  return {
    visitorId: clean(jar.get(VISITOR_COOKIE)?.value, 64),
    utmSource: clean(src.s),
    utmMedium: clean(src.m),
    utmCampaign: clean(src.c),
    referrer: clean(src.r),
    page,
  };
}
