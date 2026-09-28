import type { ReactNode } from "react";
import { LogoMark } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { ScrollWords } from "@/components/scroll/ScrollWords";
import { cn } from "@/lib/utils";

/** Section label: mini logo + small caption (Vita's `.head__title`). */
export function HeadLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <LogoMark className="h-[1.125rem] w-[1.125rem]" />
      <span className="body-md">{children}</span>
    </div>
  );
}

/** 3 / 9 split header: label on the left, big title (+ optional lead) on the right. */
export function Head({
  label,
  title,
  lead,
  className,
}: {
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-8 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:gap-8", className)}>
      <div className="lg:w-[22.5%] lg:shrink-0">
        <HeadLabel>{label}</HeadLabel>
      </div>
      <div className="flex flex-col gap-8 lg:gap-10">
        <ScrollWords className="h2">{title}</ScrollWords>
        {lead && <p className="body-xl text-white">{lead}</p>}
      </div>
    </Reveal>
  );
}

/** 6 / 6 split header: title left, muted description bottom-right. */
export function HeadSplit({
  title,
  description,
  aside,
  className,
}: {
  title: ReactNode;
  description: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-8 flex flex-col gap-4 lg:mb-16 lg:flex-row lg:items-end", className)}>
      <ScrollWords className="h2 lg:w-1/2">{title}</ScrollWords>
      <div className="flex flex-col items-start gap-4 lg:w-1/2 lg:flex-row lg:items-end lg:justify-between lg:gap-24">
        <p className="body-md max-w-[26rem] text-white/60">{description}</p>
        {aside}
      </div>
    </Reveal>
  );
}
