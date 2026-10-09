import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";

export function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

/** Same secret as Better Auth, used to salt hashes. Required in production. */
function secret() {
  const s = process.env.BETTER_AUTH_SECRET ?? process.env.AUTH_SECRET;
  if (!s && process.env.NODE_ENV === "production") throw new Error("BETTER_AUTH_SECRET is not set");
  return s ?? "dev-only-secret";
}

/** Client IP as seen by Vercel / the reverse proxy. */
export function clientIp() {
  const h = headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "0.0.0.0";
}

/** IPs are never stored in clear: only a salted hash, enough to rate-limit and spot duplicates. */
export function ipHash(ip = clientIp()) {
  return sha256(`${secret()}:${ip}`).slice(0, 32);
}

export function userAgent() {
  return headers().get("user-agent")?.slice(0, 300) ?? null;
}

export function deviceOf(ua: string | null) {
  if (!ua) return "inconnu";
  if (/ipad|tablet/i.test(ua)) return "tablette";
  if (/mobi|android|iphone/i.test(ua)) return "mobile";
  return "ordinateur";
}

export function isBot(ua: string | null) {
  return !ua || /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|headless|lighthouse/i.test(ua);
}

/** Only allow redirects to internal admin paths (no open redirect). */
export function safeAdminPath(next: unknown, fallback = "/admin") {
  return typeof next === "string" && /^\/admin(\/[\w\-/?=&%.]*)?$/.test(next) && !next.startsWith("//") ? next : fallback;
}
