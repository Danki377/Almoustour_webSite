/**
 * Browser-side image compression before upload.
 * Resizes to at most MAX_EDGE px on the long side (sharp on retina screens, light to load)
 * and re-encodes in WebP at high quality, lowering it only for unusually heavy photos.
 */

export const ACCEPTED_IMAGES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_INPUT_BYTES = 30 * 1024 * 1024;
const MAX_EDGE = 2000;
const TARGET_BYTES = 600 * 1024;
const QUALITY = { start: 0.86, floor: 0.72, step: 0.05 };

export type CompressedImage = { file: File; width: number; height: number; originalSize: number };

export class ImageError extends Error {}

async function decode(file: File): Promise<CanvasImageSource & { width: number; height: number }> {
  try {
    // Applies the EXIF orientation of phone photos
    return await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    const url = URL.createObjectURL(file);
    try {
      const img = new Image();
      img.src = url;
      await img.decode();
      return Object.assign(img, { width: img.naturalWidth, height: img.naturalHeight });
    } catch {
      throw new ImageError("Cette image n'a pas pu être lue. Utilisez une photo JPG, PNG ou WebP.");
    } finally {
      URL.revokeObjectURL(url);
    }
  }
}

function encode(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
}

/** Downscales in halving steps: smoother than a single large reduction. */
function draw(source: CanvasImageSource & { width: number; height: number }, width: number, height: number) {
  let current: CanvasImageSource = source;
  let w = source.width;
  let h = source.height;
  while (w / 2 >= width && h / 2 >= height) {
    w = Math.round(w / 2);
    h = Math.round(h / 2);
    const step = document.createElement("canvas");
    step.width = w;
    step.height = h;
    const ctx = step.getContext("2d")!;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(current, 0, 0, w, h);
    current = step;
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(current, 0, 0, width, height);
  return canvas;
}

export async function compressImage(file: File): Promise<CompressedImage> {
  if (!ACCEPTED_IMAGES.includes(file.type)) throw new ImageError("Format non pris en charge : utilisez une image JPG, PNG, WebP ou AVIF.");
  if (file.size > MAX_INPUT_BYTES) throw new ImageError("Image trop lourde (30 Mo maximum).");

  const source = await decode(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(source.width, source.height));
  const width = Math.max(1, Math.round(source.width * scale));
  const height = Math.max(1, Math.round(source.height * scale));
  const canvas = draw(source, width, height);
  if ("close" in source && typeof source.close === "function") source.close();

  let quality = QUALITY.start;
  let blob = await encode(canvas, "image/webp", quality);
  if (blob?.type === "image/webp") {
    while (blob && blob.size > TARGET_BYTES && quality - QUALITY.step >= QUALITY.floor) {
      quality -= QUALITY.step;
      blob = await encode(canvas, "image/webp", quality);
    }
  } else {
    // Browsers without WebP encoding (older Safari): JPEG on a white background
    const flat = document.createElement("canvas");
    flat.width = width;
    flat.height = height;
    const ctx = flat.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(canvas, 0, 0);
    blob = await encode(flat, "image/jpeg", 0.85);
  }
  if (!blob) throw new ImageError("La compression de l'image a échoué.");

  // Already small and optimised: keep the original rather than re-encoding it
  if (scale === 1 && blob.size >= file.size && (file.type === "image/webp" || file.type === "image/jpeg")) {
    return { file, width, height, originalSize: file.size };
  }

  const base =
    file.name
      .replace(/\.[^.]+$/, "")
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "") // "Étudiant" → "Etudiant"
      .replace(/[^\w\-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "image";
  const ext = blob.type === "image/webp" ? "webp" : "jpg";
  return { file: new File([blob], `${base}.${ext}`, { type: blob.type }), width, height, originalSize: file.size };
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} Ko`;
  return `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} Mo`;
}
