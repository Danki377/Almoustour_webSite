// Prisma client for CLI scripts (seed, create-admin). The app uses lib/server/db.ts.
import "dotenv/config";
import { createAdapter } from "../lib/db-adapter";
import { PrismaClient } from "../lib/generated/prisma/client";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL manquant : ajoutez l'URL Neon dans le fichier .env");
  process.exit(1);
}

export const prisma = new PrismaClient({ adapter: createAdapter(process.env.DATABASE_URL) });
