import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";
import ws from "ws";

/**
 * Neon URL → Neon serverless driver (production on Vercel).
 * Any other PostgreSQL URL (local Docker, `prisma dev`…) → standard pg driver.
 */
export function createAdapter(connectionString: string) {
  if (/\.neon\.tech\b/.test(connectionString)) {
    // Node runtimes without a global WebSocket need the `ws` implementation for Neon's pool
    if (typeof WebSocket === "undefined") neonConfig.webSocketConstructor = ws;
    return new PrismaNeon({ connectionString });
  }
  // Optional `?connection_limit=1` for single-connection local servers such as `prisma dev`
  let limit = 0;
  try {
    limit = Number(new URL(connectionString).searchParams.get("connection_limit"));
  } catch {
    // No / invalid URL: the site runs on its built-in content (see isDbConfigured)
  }
  return new PrismaPg({ connectionString, ...(limit > 0 ? { max: limit } : {}) });
}
