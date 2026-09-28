import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative block shrink-0 overflow-hidden rounded-full bg-white", className)}>
      <Image src="/logo.png" alt="" fill sizes="32px" className="object-contain" />
    </span>
  );
}

export function Logo({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-white", className)} aria-label="Al Moustour Voyages — Accueil">
      <LogoMark className={size === "lg" ? "h-6 w-6" : "h-5 w-5"} />
      <span className={cn("font-semibold tracking-[-0.08em]", size === "lg" ? "text-2xl" : "text-xl")}>Al Moustour</span>
    </Link>
  );
}
