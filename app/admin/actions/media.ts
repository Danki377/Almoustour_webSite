"use server";

import { revalidatePath } from "next/cache";
import { audit } from "@/lib/server/audit";
import { requireUser } from "@/lib/server/auth";
import { db } from "@/lib/server/db";
import { imageUsages } from "@/lib/server/media";
import { utapi } from "@/lib/server/uploadthing";

export type MediaItem = { id: string; url: string; name: string; width: number | null; height: number | null };

/** Latest uploads, for the image picker of the content forms. */
export async function listMedia(): Promise<MediaItem[]> {
  await requireUser("content");
  return db.media.findMany({
    orderBy: { createdAt: "desc" },
    take: 60,
    select: { id: true, url: true, name: true, width: true, height: true },
  });
}

export async function deleteMedia(id: string) {
  const user = await requireUser("content");
  const media = await db.media.findUnique({ where: { id } });
  if (!media) return;
  // An image still shown on the site is never deleted (the button is hidden, this is the server-side guard)
  if ((await imageUsages([media.url])).has(media.url)) return;

  await utapi.deleteFiles(media.key);
  await db.media.delete({ where: { id } });
  await audit(user.id, "media.delete", "Media", id, { name: media.name });
  revalidatePath("/admin/medias");
}
