"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Link2 } from "lucide-react";
import { UploadDropzone } from "@/components/admin/ImageUpload";
import { buttonClass } from "@/lib/admin/styles";

export function MediaUploadZone() {
  const router = useRouter();
  return <UploadDropzone onUploaded={() => router.refresh()} />;
}

export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(url).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }}
      className={buttonClass("ghost") + " h-8 px-2.5"}
    >
      {copied ? <Check size={15} className="text-whatsapp" /> : <Link2 size={15} />}
      {copied ? "Copié" : "Lien"}
    </button>
  );
}
