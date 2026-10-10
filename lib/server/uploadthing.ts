import "server-only";
import { revalidatePath } from "next/cache";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";
import { z } from "zod";
import { audit } from "./audit";
import { can, sessionUserFrom } from "./auth";
import { db } from "./db";
import { resilientFetch } from "./resilient-fetch";

const f = createUploadthing();

/** Images arrive already compressed by the browser (WebP, ≤ 2000 px): the limits only stop abuse. */
export const uploadRouter = {
  siteImage: f({
    "image/webp": { maxFileSize: "8MB", maxFileCount: 1 },
    "image/jpeg": { maxFileSize: "8MB", maxFileCount: 1 },
    "image/png": { maxFileSize: "8MB", maxFileCount: 1 },
    "image/avif": { maxFileSize: "8MB", maxFileCount: 1 },
  })
    .input(z.object({ width: z.number().int().min(1).max(10000), height: z.number().int().min(1).max(10000) }))
    .middleware(async ({ req, input }) => {
      const user = await sessionUserFrom(req.headers);
      if (!user || user.mustChangePassword || !can(user, "content")) {
        throw new UploadThingError({ code: "FORBIDDEN", message: "Vous n'avez pas le droit d'ajouter des images." });
      }
      return { userId: user.id, ...input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const media = await db.media.create({
        data: {
          key: file.key,
          url: file.ufsUrl,
          name: file.name.slice(0, 200),
          size: file.size,
          width: metadata.width,
          height: metadata.height,
          uploadedById: metadata.userId,
        },
      });
      await audit(metadata.userId, "media.upload", "Media", media.id, { name: media.name, size: media.size });
      revalidatePath("/admin/medias");
      return { id: media.id, url: media.url };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;

export const uploadConfig = { fetch: resilientFetch };

export const utapi = new UTApi(uploadConfig);
