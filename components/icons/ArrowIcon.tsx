export function ArrowIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" className={className} aria-hidden="true">
      <path d="M1 11 11 1M11 1H3.5M11 1v7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}
