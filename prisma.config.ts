import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * Migrations need a direct connection (not Neon's pooler). Use DIRECT_URL when set,
 * otherwise derive it from DATABASE_URL by dropping "-pooler" from the Neon host.
 */
function migrationUrl() {
  if (process.env.DIRECT_URL) return process.env.DIRECT_URL;
  return (process.env.DATABASE_URL ?? "").replace(/-pooler(\.[^/]*\.neon\.tech)/, "$1");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: migrationUrl(),
  },
});
