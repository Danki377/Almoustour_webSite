export const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Destinations", href: "/#destinations" },
  { label: "À propos", href: "/#about" },
  { label: "Témoignages", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
];

/** Where the click came from, for the conversion statistics of the back office. */
export type WaTrack = {
  /** Button location, e.g. "hero", "nav", "destination-card" */
  src?: string;
  service?: string;
  /** Destination id */
  dest?: string;
};

/**
 * Every WhatsApp button goes through /go/whatsapp: the click is recorded, then the
 * visitor is redirected to the agency's WhatsApp (number managed in the back office).
 */
export function waLink(text?: string, track: WaTrack = {}) {
  const params = new URLSearchParams();
  if (text) params.set("text", text);
  if (track.src) params.set("src", track.src);
  if (track.service) params.set("service", track.service);
  if (track.dest) params.set("dest", track.dest);
  const query = params.toString();
  return `/go/whatsapp${query ? `?${query}` : ""}`;
}

/** Direct wa.me URL (server side, once the number is known). */
export function whatsappUrl(number: string, text: string) {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}
