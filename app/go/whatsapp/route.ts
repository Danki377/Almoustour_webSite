import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSiteContent } from "@/lib/content/server";
import { getAttribution } from "@/lib/server/attribution";
import { db, isDbConfigured } from "@/lib/server/db";
import { deviceOf, ipHash, isBot } from "@/lib/server/security";
import { whatsappUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

const slug = z
  .string()
  .regex(/^[\w-]{1,60}$/)
  .optional()
  .catch(undefined);

const query = z.object({
  text: z.string().trim().max(1000).optional().catch(undefined),
  src: slug,
  service: slug,
  dest: slug,
});

/** Records the click, then sends the visitor to the agency's WhatsApp. */
export async function GET(req: NextRequest) {
  const { settings } = await getSiteContent();
  const params = query.parse(Object.fromEntries(req.nextUrl.searchParams));
  const target = whatsappUrl(settings.whatsapp, params.text || settings.defaultMessage);

  const ua = req.headers.get("user-agent");
  if (isDbConfigured && !isBot(ua)) {
    const a = getAttribution();
    const record = db.whatsAppClick.create({
      data: {
        source: params.src ?? "autre",
        service: params.service,
        destinationId: params.dest,
        page: a.page,
        utmSource: a.utmSource,
        utmMedium: a.utmMedium,
        utmCampaign: a.utmCampaign,
        referrer: a.referrer,
        visitorId: a.visitorId,
        device: deviceOf(ua),
        ipHash: ipHash(),
      },
    });
    // Tracking must never delay or block the redirect for more than a moment
    await Promise.race([record, new Promise((r) => setTimeout(r, 1500))]).catch((e) => console.error("[whatsapp click]", e));
  }

  return NextResponse.redirect(target, {
    status: 302,
    headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
  });
}
