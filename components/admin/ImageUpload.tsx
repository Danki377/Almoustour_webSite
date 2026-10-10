"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ImagePlus, Images, Loader2, UploadCloud, X } from "lucide-react";
import { listMedia, type MediaItem } from "@/app/admin/actions/media";
import { buttonClass } from "@/lib/admin/styles";
import { ACCEPTED_IMAGES, compressImage, formatBytes, ImageError } from "@/lib/admin/compress-image";
import { useUploadThing } from "@/lib/admin/uploadthing";
import { cn } from "@/lib/utils";

type Phase = { step: "idle" } | { step: "compressing" } | { step: "uploading"; progress: number } | { step: "done"; note: string } | { step: "error"; message: string };

/** Compresses the image in the browser, then sends it to UploadThing. */
export function useImageUpload(onUploaded: (url: string) => void) {
  const [phase, setPhase] = useState<Phase>({ step: "idle" });
  const { startUpload } = useUploadThing("siteImage", {
    onUploadProgress: (progress) => setPhase({ step: "uploading", progress }),
  });

  const upload = useCallback(
    async (file: File | undefined) => {
      if (!file) return;
      try {
        setPhase({ step: "compressing" });
        const image = await compressImage(file);
        setPhase({ step: "uploading", progress: 0 });
        const [result] = (await startUpload([image.file], { width: image.width, height: image.height })) ?? [];
        if (!result?.serverData?.url) throw new Error();
        const saved = image.originalSize > image.file.size ? ` (${formatBytes(image.originalSize)} → ${formatBytes(image.file.size)})` : "";
        setPhase({ step: "done", note: `Image ajoutée${saved}, ${image.width} × ${image.height} px.` });
        onUploaded(result.serverData.url);
      } catch (error) {
        const message =
          error instanceof ImageError
            ? error.message
            : error instanceof Error && /droit|forbidden/i.test(error.message)
              ? "Vous n'avez pas le droit d'ajouter des images."
              : "L'envoi a échoué. Vérifiez la connexion et réessayez.";
        setPhase({ step: "error", message });
      }
    },
    [startUpload, onUploaded]
  );

  return { phase, upload, busy: phase.step === "compressing" || phase.step === "uploading" };
}

export function UploadStatus({ phase }: { phase: Phase }) {
  if (phase.step === "idle") return null;
  if (phase.step === "error") return <p role="alert" className="text-xs text-red-300">{phase.message}</p>;
  if (phase.step === "done") return <p role="status" className="text-xs text-whatsapp">{phase.note}</p>;
  const progress = phase.step === "uploading" ? phase.progress : 0;
  return (
    <div role="status" className="flex flex-col gap-1.5">
      <p className="flex items-center gap-2 text-xs text-white/60">
        <Loader2 size={13} className="animate-spin" />
        {phase.step === "compressing" ? "Optimisation de l'image…" : `Envoi… ${progress} %`}
      </p>
      <div className="h-1 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-accent transition-[width]" style={{ width: `${phase.step === "compressing" ? 8 : Math.max(8, progress)}%` }} />
      </div>
    </div>
  );
}

/** Hidden file input + drag and drop on any area. */
export function useImageDrop(onFile: (file: File | undefined) => void, disabled?: boolean) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const input = (
    <input
      ref={inputRef}
      type="file"
      accept={ACCEPTED_IMAGES.join(",")}
      className="sr-only"
      tabIndex={-1}
      aria-hidden
      onChange={(e) => {
        onFile(e.target.files?.[0]);
        e.target.value = "";
      }}
    />
  );
  const dropProps = {
    onDragOver: (e: React.DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      setDragging(true);
    },
    onDragLeave: () => setDragging(false),
    onDrop: (e: React.DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      setDragging(false);
      onFile(e.dataTransfer.files?.[0]);
    },
  };
  return { input, dropProps, dragging, open: () => inputRef.current?.click() };
}

/** Large drop zone (media library page). */
export function UploadDropzone({ onUploaded }: { onUploaded: (url: string) => void }) {
  const { phase, upload, busy } = useImageUpload(onUploaded);
  const { input, dropProps, dragging, open } = useImageDrop(upload, busy);

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={open}
        disabled={busy}
        {...dropProps}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed px-6 py-10 text-center transition-colors",
          dragging ? "border-accent bg-accent/10" : "border-white/15 hover:border-white/30 hover:bg-white/[0.03]",
          busy && "cursor-wait opacity-70"
        )}
      >
        <UploadCloud size={26} className="text-accent" strokeWidth={1.6} />
        <span className="text-sm font-medium text-white">Glissez une image ici ou cliquez pour la choisir</span>
        <span className="text-xs text-white/40">JPG, PNG, WebP ou AVIF · optimisée automatiquement avant l&apos;envoi</span>
      </button>
      {input}
      <UploadStatus phase={phase} />
    </div>
  );
}

const SITE_IMAGES = [
  "billetterie",
  "canada",
  "chine",
  "etudiant",
  "france",
  "inde",
  "maroc",
  "russie",
  "turquie",
  "usa",
  "visa",
  "combine-travel",
  "footer-travel",
].map((n) => `/images/${n}.jpg`);

/** Modal grid: uploaded images first, then the photos shipped with the site. */
export function MediaPicker({ open, onClose, onPick }: { open: boolean; onClose: () => void; onPick: (url: string) => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [media, setMedia] = useState<MediaItem[] | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      listMedia()
        .then(setMedia)
        .catch(() => setMedia([]));
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const tile = (url: string, label: string, key: string) => (
    <button
      key={key}
      type="button"
      onClick={() => {
        onPick(url);
        onClose();
      }}
      className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-canvas ring-1 ring-white/10 transition hover:ring-2 hover:ring-accent focus-visible:ring-2 focus-visible:ring-accent"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={label} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-[1.03]" />
      <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/80 to-transparent px-2 pb-1.5 pt-4 text-left text-[0.6875rem] text-white/80">
        {label}
      </span>
    </button>
  );

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      className="w-[min(56rem,calc(100vw-2rem))] rounded-2xl bg-deep p-0 text-white ring-1 ring-white/10 backdrop:bg-black/70"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <h2 className="text-sm font-semibold">Choisir une image</h2>
        <button type="button" onClick={onClose} aria-label="Fermer" className="rounded-lg p-1.5 text-white/60 hover:bg-white/5 hover:text-white">
          <X size={18} />
        </button>
      </div>
      <div className="max-h-[70vh] overflow-y-auto p-5">
        <PickerSection title="Images téléversées">
          {media === null ? (
            <p className="col-span-full flex items-center gap-2 text-sm text-white/50">
              <Loader2 size={14} className="animate-spin" /> Chargement…
            </p>
          ) : media.length === 0 ? (
            <p className="col-span-full text-sm text-white/40">Aucune image pour l&apos;instant. Utilisez « Téléverser » pour en ajouter.</p>
          ) : (
            media.map((m) => tile(m.url, m.name, m.id))
          )}
        </PickerSection>
        <PickerSection title="Photos du site">{SITE_IMAGES.map((src) => tile(src, src.split("/").pop()!, src))}</PickerSection>
      </div>
    </dialog>
  );
}

function PickerSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-6 last:mb-0">
      <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-white/40">{title}</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">{children}</div>
    </section>
  );
}

export function PickerButtons({ onUpload, onLibrary, busy }: { onUpload: () => void; onLibrary: () => void; busy: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={onUpload} disabled={busy} className={buttonClass("secondary")}>
        {busy ? <Loader2 size={15} className="animate-spin" /> : <ImagePlus size={15} />}
        Téléverser une image
      </button>
      <button type="button" onClick={onLibrary} disabled={busy} className={buttonClass("ghost")}>
        <Images size={15} />
        Médiathèque
      </button>
    </div>
  );
}
