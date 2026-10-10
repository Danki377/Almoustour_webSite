import { NextResponse, type NextRequest } from "next/server";
import { LEAD_CHANNEL, LEAD_STATUS, SERVICE_LABEL } from "@/lib/admin/labels";
import { audit } from "@/lib/server/audit";
import { can, getSessionUser } from "@/lib/server/auth";
import { db } from "@/lib/server/db";
import { leadWhere } from "@/lib/server/leads";

export const dynamic = "force-dynamic";

/** Escapes a CSV cell and neutralises spreadsheet formulas (CSV injection). */
function cell(value: unknown) {
  let s = value == null ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return new NextResponse("Non autorisé", { status: 401 });
  if (user.mustChangePassword || !can(user, "export")) return new NextResponse("Accès refusé", { status: 403 });

  const filters = Object.fromEntries(req.nextUrl.searchParams);
  const leads = await db.lead.findMany({
    where: leadWhere(filters, user.id),
    orderBy: { createdAt: "desc" },
    take: 10000,
    include: { assignee: { select: { name: true } } },
  });

  const header = ["Date", "Nom", "Téléphone", "Email", "Service", "Destination", "Statut", "Montant (FCFA)", "Canal", "Conseiller", "Source", "Campagne", "Message"];
  const rows = leads.map((l) => [
    l.createdAt.toISOString().slice(0, 16).replace("T", " "),
    l.name,
    l.phone,
    l.email,
    SERVICE_LABEL[l.service ?? ""] ?? l.service,
    l.destinationId,
    LEAD_STATUS[l.status].label,
    l.amount,
    LEAD_CHANNEL[l.channel],
    l.assignee?.name,
    l.utmSource ?? l.referrer,
    l.utmCampaign,
    l.message,
  ]);
  // ";" separator + BOM: opens correctly in Excel with French settings
  const csv = "﻿" + [header, ...rows].map((r) => r.map(cell).join(";")).join("\r\n");

  await audit(user.id, "lead.export", "Lead", undefined, { count: leads.length });
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
