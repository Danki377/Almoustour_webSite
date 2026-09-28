import { cn } from "@/lib/utils";

/**
 * Decorative band drawn from bògòlanfini (Malian mud-cloth) motifs:
 * zigzags, paired dots, a lozenge and triple strokes, framed by two rules.
 */
export function BogolanStrip({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("h-6 w-full text-white/[0.16]", className)}>
      <svg className="h-full w-full">
        <defs>
          <pattern id="bogolan" width="72" height="24" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="2,17 6,7 10,17 14,7 18,17" />
              <path d="M40 5 L46 12 L40 19 L34 12 Z" />
              <path d="M54 7 V17 M58 7 V17 M62 7 V17" />
            </g>
            <circle cx="25" cy="8.5" r="1.3" fill="currentColor" />
            <circle cx="25" cy="15.5" r="1.3" fill="currentColor" />
            <circle cx="40" cy="12" r="1.5" fill="#00AEEF" fillOpacity="0.8" />
            <circle cx="68.5" cy="12" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" />
        <rect y="0" width="100%" height="24" fill="url(#bogolan)" />
        <line x1="0" y1="23.5" x2="100%" y2="23.5" stroke="currentColor" />
      </svg>
    </div>
  );
}
