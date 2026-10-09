// Applies pending database migrations during the build, when a database is configured.
// Without DATABASE_URL the build still succeeds and the site serves its built-in content.
import { execSync } from "node:child_process";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  console.log("[migrate] DATABASE_URL absent : migrations ignorées.");
  process.exit(0);
}
execSync("prisma migrate deploy", { stdio: "inherit" });
