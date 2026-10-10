import Link from "next/link";
import { Download, MessageCircle, Plus, Search } from "lucide-react";
import { inputClass } from "@/lib/admin/styles";
import { Badge, EmptyState, formatDate, LinkButton, PageHeader, Table, tdClass } from "@/components/admin/ui";
import { LEAD_CHANNEL, LEAD_CHANNELS, LEAD_STATUS, LEAD_STATUSES, SERVICE_LABEL } from "@/lib/admin/labels";
import { getSiteContent } from "@/lib/content/server";
import { whatsappTo } from "@/lib/phone";
import { requireUser } from "@/lib/server/auth";
import { ACTIVE_MEMBER, db } from "@/lib/server/db";
import { leadWhere, LEADS_PER_PAGE, type LeadFilters } from "@/lib/server/leads";
import { cn } from "@/lib/utils";

export const metadata = { title: "Leads" };

export default async function LeadsPage({ searchParams }: { searchParams: LeadFilters }) {
  const user = await requireUser("leads");
  const page = Math.max(1, Number(searchParams.page) || 1);
  const where = leadWhere(searchParams, user.id);

  const [leads, total, users, { destinations }] = await Promise.all([
    db.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * LEADS_PER_PAGE,
      take: LEADS_PER_PAGE,
      include: { assignee: { select: { name: true } }, _count: { select: { notes: true } } },
    }),
    db.lead.count({ where }),
    db.user.findMany({ where: ACTIVE_MEMBER, select: { id: true, name: true }, orderBy: { name: "asc" } }),
    getSiteContent(),
  ]);
  const pages = Math.max(1, Math.ceil(total / LEADS_PER_PAGE));
  const countryOf = (id: string | null) => destinations.find((d) => d.id === id)?.country;

  const query = (patch: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries({ ...searchParams, ...patch })) if (v) params.set(k, v);
    return `?${params.toString()}`;
  };
  const filtersOnly = { ...searchParams, page: undefined };
  const exportHref = `/admin/leads/export${query({ ...filtersOnly })}`;

  return (
    <>
      <PageHeader
        title="Leads"
        description={`${total} demande${total > 1 ? "s" : ""}${Object.values(filtersOnly).some(Boolean) ? " correspondant aux filtres" : ""}.`}
        actions={
          <>
            <a href={exportHref} className="inline-flex h-10 items-center gap-2 rounded-xl bg-surface px-4 text-sm ring-1 ring-white/10 hover:bg-white/10">
              <Download size={15} /> Export CSV
            </a>
            <LinkButton href="/admin/leads/new" variant="primary">
              <Plus size={15} /> Ajouter un lead
            </LinkButton>
          </>
        }
      />

      {/* Status tabs */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {[{ value: "", label: "Tous" }, ...LEAD_STATUSES.map((s) => ({ value: s, label: LEAD_STATUS[s].label }))].map((s) => (
          <Link
            key={s.value}
            href={query({ statut: s.value || undefined, page: undefined })}
            className={cn(
              "whitespace-nowrap rounded-lg px-3 py-1.5 text-sm transition-colors",
              (searchParams.statut ?? "") === s.value ? "bg-surface text-white ring-1 ring-white/10" : "text-white/50 hover:text-white"
            )}
          >
            {s.label}
          </Link>
        ))}
      </div>

      {/* Filters (plain GET form: shareable URLs) */}
      <form className="mb-5 grid grid-cols-2 gap-2 lg:grid-cols-[minmax(0,1fr)_10rem_10rem_11rem_auto]">
        {searchParams.statut && <input type="hidden" name="statut" value={searchParams.statut} />}
        <label className="relative col-span-2 lg:col-span-1">
          <span className="sr-only">Rechercher</span>
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
          <input name="q" defaultValue={searchParams.q} placeholder="Nom, téléphone, email…" className={cn(inputClass, "pl-10")} />
        </label>
        <select name="service" defaultValue={searchParams.service ?? ""} className={cn(inputClass, "[&_option]:bg-deep")} aria-label="Service">
          <option value="">Tous services</option>
          {Object.entries(SERVICE_LABEL).map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
        <select name="canal" defaultValue={searchParams.canal ?? ""} className={cn(inputClass, "[&_option]:bg-deep")} aria-label="Canal">
          <option value="">Tous canaux</option>
          {LEAD_CHANNELS.map((c) => (
            <option key={c} value={c}>
              {LEAD_CHANNEL[c]}
            </option>
          ))}
        </select>
        <select name="assigne" defaultValue={searchParams.assigne ?? ""} className={cn(inputClass, "[&_option]:bg-deep")} aria-label="Conseiller">
          <option value="">Tous conseillers</option>
          <option value="moi">Mes leads</option>
          <option value="aucun">Non assignés</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
        <button type="submit" className="h-11 rounded-xl bg-surface px-4 text-sm ring-1 ring-white/10 hover:bg-white/10">
          Filtrer
        </button>
      </form>

      {leads.length ? (
        <Table head={["Contact", "Projet", "Statut", "Canal", "Conseiller", "Reçu le", ""]}>
          {leads.map((l) => (
            <tr key={l.id} className="transition-colors hover:bg-white/[0.02]">
              <td className={tdClass}>
                <Link href={`/admin/leads/${l.id}`} className="flex flex-col hover:text-accent">
                  <span className="font-medium">{l.name}</span>
                  <span className="text-xs tabular-nums text-white/45">{l.phone}</span>
                </Link>
              </td>
              <td className={cn(tdClass, "text-white/70")}>
                {SERVICE_LABEL[l.service ?? ""] ?? "—"}
                {countryOf(l.destinationId) && <span className="text-white/40"> · {countryOf(l.destinationId)}</span>}
              </td>
              <td className={tdClass}>
                <Badge tone={LEAD_STATUS[l.status].tone}>{LEAD_STATUS[l.status].label}</Badge>
              </td>
              <td className={cn(tdClass, "text-white/60")}>
                {LEAD_CHANNEL[l.channel]}
                {l.utmSource && <span className="block text-xs text-white/35">{l.utmSource}</span>}
              </td>
              <td className={cn(tdClass, "text-white/60")}>{l.assignee?.name ?? <span className="text-white/30">—</span>}</td>
              <td className={cn(tdClass, "whitespace-nowrap text-xs text-white/45")}>{formatDate(l.createdAt)}</td>
              <td className={cn(tdClass, "text-right")}>
                <a
                  href={whatsappTo(l.phone, `Bonjour ${l.name}, c'est Al Moustour Voyages.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Écrire à ${l.name} sur WhatsApp`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-whatsapp hover:bg-whatsapp/10"
                >
                  <MessageCircle size={16} />
                </a>
              </td>
            </tr>
          ))}
        </Table>
      ) : (
        <EmptyState>Aucun lead ne correspond à ces critères.</EmptyState>
      )}

      {pages > 1 && (
        <nav className="mt-5 flex items-center justify-between text-sm" aria-label="Pagination">
          <span className="text-white/40">
            Page {page} sur {pages}
          </span>
          <div className="flex gap-2">
            {page > 1 && <LinkButton href={query({ page: String(page - 1) })}>Précédent</LinkButton>}
            {page < pages && <LinkButton href={query({ page: String(page + 1) })}>Suivant</LinkButton>}
          </div>
        </nav>
      )}
    </>
  );
}
