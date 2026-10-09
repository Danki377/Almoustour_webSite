/**
 * Normalises a phone number to international format (+XXXXXXXX).
 * Malian numbers typed without the country code (8 digits) get +223.
 */
export function normalizePhone(raw: string): string | null {
  let value = raw.trim().replace(/[\s.\-()]/g, "");
  if (value.startsWith("00")) value = `+${value.slice(2)}`;
  const digits = value.replace(/\D/g, "");
  if (!value.startsWith("+") && digits.length === 8) return `+223${digits}`;
  if (digits.length < 8 || digits.length > 15) return null;
  return `+${digits}`;
}

/** wa.me link to write to a lead from the back office. */
export function whatsappTo(phone: string, text?: string) {
  const base = `https://wa.me/${phone.replace(/\D/g, "")}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
