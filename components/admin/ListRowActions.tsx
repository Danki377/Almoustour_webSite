import Link from "next/link";
import { Eye, EyeOff, Pencil } from "lucide-react";
import { toggleActive, type ListKind } from "@/app/admin/actions/content";
import { ActionButton } from "@/components/admin/form";

/** Edit + show/hide buttons at the end of a content table row. */
export function ListRowActions({ kind, id, active, href }: { kind: ListKind | "destination"; id: string; active: boolean; href: string }) {
  return (
    <div className="flex justify-end gap-1">
      <ActionButton action={toggleActive.bind(null, kind, id)} variant="ghost" className="h-8 px-2.5">
        {active ? <EyeOff size={15} /> : <Eye size={15} />}
        <span className="sr-only sm:not-sr-only">{active ? "Masquer" : "Afficher"}</span>
      </ActionButton>
      <Link href={href} className="inline-flex h-8 items-center gap-2 rounded-xl px-2.5 text-sm text-white/60 hover:bg-white/5 hover:text-white">
        <Pencil size={15} />
        <span className="sr-only sm:not-sr-only">Modifier</span>
      </Link>
    </div>
  );
}
