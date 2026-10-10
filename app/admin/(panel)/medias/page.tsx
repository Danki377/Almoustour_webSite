import { Trash2 } from "lucide-react";
import { deleteMedia } from "@/app/admin/actions/media";
import { ActionButton } from "@/components/admin/form";
import { CopyLinkButton, MediaUploadZone } from "@/components/admin/MediaLibrary";
import { Badge, Card, EmptyState, formatDate, PageHeader } from "@/components/admin/ui";
import { formatBytes } from "@/lib/admin/compress-image";
import { requireUser } from "@/lib/server/auth";
import { db } from "@/lib/server/db";
import { imageUsages } from "@/lib/server/media";

export const metadata = { title: "Médiathèque" };

export default async function MediaPage() {
  await requireUser("content");
  const items = await db.media.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { uploadedBy: { select: { name: true } } },
  });
  const usages = await imageUsages(items.map((m) => m.url));
  const total = items.reduce((sum, m) => sum + m.size, 0);

  return (
    <>
      <PageHeader
        title="Médiathèque"
        description={`Images envoyées sur UploadThing · ${items.length} image${items.length > 1 ? "s" : ""} · ${formatBytes(total)}`}
      />
      <Card className="mb-6">
        <MediaUploadZone />
      </Card>

      {items.length ? (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((m) => {
            const usedBy = usages.get(m.url) ?? [];
            return (
              <li key={m.id} className="flex flex-col overflow-hidden rounded-2xl bg-deep ring-1 ring-white/10">
                <a href={m.url} target="_blank" rel="noopener noreferrer" className="block aspect-[4/3] bg-canvas">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.url} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
                </a>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <p className="truncate text-sm font-medium text-white" title={m.name}>
                    {m.name}
                  </p>
                  <p className="text-xs text-white/40">
                    {m.width && m.height ? `${m.width} × ${m.height} px · ` : ""}
                    {formatBytes(m.size)} · {formatDate(m.createdAt, false)}
                    {m.uploadedBy ? ` · ${m.uploadedBy.name}` : ""}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {usedBy.length ? usedBy.map((u) => <Badge key={u} tone="accent">{u}</Badge>) : <Badge>Non utilisée</Badge>}
                  </div>
                  <div className="mt-auto flex justify-end gap-1 pt-2">
                    <CopyLinkButton url={m.url} />
                    {usedBy.length === 0 && (
                      <ActionButton
                        action={deleteMedia.bind(null, m.id)}
                        confirm="Supprimer définitivement cette image ?"
                        variant="ghost"
                        className="h-8 px-2.5 hover:text-red-300"
                      >
                        <Trash2 size={15} /> Supprimer
                      </ActionButton>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyState>Aucune image pour l&apos;instant. Les images ajoutées ici ou depuis une offre apparaîtront dans cette liste.</EmptyState>
      )}
    </>
  );
}
