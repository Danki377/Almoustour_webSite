import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/server/auth";

// Better Auth HTTP endpoints (/api/auth/*). Sign-up is disabled; rate limited per IP.
export const { GET, POST } = toNextJsHandler(auth);
