"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Sends one page view to /api/track on each page change (visits statistics of the back office). */
export function PageViewTracker() {
  const pathname = usePathname();
  const last = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || last.current === pathname) return;
    const first = last.current === null;
    last.current = pathname;

    const body = JSON.stringify(first ? { p: pathname, r: document.referrer, q: location.search } : { p: pathname });
    try {
      if (navigator.sendBeacon?.("/api/track", body)) return;
    } catch {
      // Fall back to fetch below
    }
    fetch("/api/track", { method: "POST", body, keepalive: true, credentials: "same-origin" }).catch(() => {});
  }, [pathname]);

  return null;
}
