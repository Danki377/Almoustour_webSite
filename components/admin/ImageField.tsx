"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { Field } from "@/components/admin/form";
import { MediaPicker, PickerButtons, UploadStatus, useImageDrop, useImageUpload } from "@/components/admin/ImageUpload";
import { cn } from "@/lib/utils";

/** Image of a content item: upload (compressed first), pick from the media library, or paste a URL. */
export function ImageField({ name = "image", label = "Image", defaultValue = "" }: { name?: string; label?: string; defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue);
  const [picking, setPicking] = useState(false);
  const { phase, upload, busy } = useImageUpload(setValue);
  const { input, dropProps, dragging, open } = useImageDrop(upload, busy);
  const valid = /^(\/[\w\-./]+\.(jpe?g|png|webp|avif)|https:\/\/\S+)$/i.test(value);

  return (
    <div className="grid gap-4 sm:grid-cols-[11rem_minmax(0,1fr)]">
      <button
        type="button"
        onClick={open}
        disabled={busy}
        {...dropProps}
        aria-label="Téléverser une image"
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-xl bg-canvas ring-1 transition",
          dragging ? "ring-2 ring-accent" : "ring-white/10 hover:ring-white/30"
        )}
      >
        {valid ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="Aperçu" className={cn("h-full w-full object-cover", busy && "opacity-40")} />
        ) : (
          <span className="flex h-full flex-col items-center justify-center gap-1.5 text-xs text-white/35">
            <ImageIcon size={20} strokeWidth={1.6} />
            Glissez une image
          </span>
        )}
      </button>

      <div className="flex min-w-0 flex-col gap-3">
        <span className="text-xs font-medium text-white/60">{label}</span>
        <PickerButtons onUpload={open} onLibrary={() => setPicking(true)} busy={busy} />
        <UploadStatus phase={phase} />
        <Field
          name={name}
          label="Adresse de l'image"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="/images/france.jpg ou https://…"
          hint="Remplie automatiquement après l'envoi. Les photos sont optimisées (WebP, 2000 px max) sans perte visible."
        />
      </div>
      {input}
      <MediaPicker open={picking} onClose={() => setPicking(false)} onPick={setValue} />
    </div>
  );
}
