// Shapes of the editable site content. Client-safe (no server imports).

export type OpeningHours = { day: string; time: string };

export type SiteSettings = {
  whatsapp: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  address: string;
  addressHint: string;
  facebook: string;
  instagram: string;
  mapsEmbed: string;
  mapsLink: string;
  since: number;
  defaultMessage: string;
  hours: OpeningHours[];
};

export type ServiceSlug = "billetterie" | "accompagnement-etudiant" | "visa-et-immigration";

export type Service = {
  slug: ServiceSlug;
  href: string;
  title: string;
  image: string;
  waMsg: string;
};

export type Expense = { label: string; value: string };

export type Destination = {
  id: string;
  country: string;
  city: string;
  /** Airport code shown as "BKO → CODE" */
  code: string;
  image: string;
  title: string;
  priceLabel: string;
  price: string;
  info: string;
  badge: string;
  scholarship: boolean;
  description: string;
  /** City coordinates for the map pin */
  lon: number;
  lat: number;
  /** Student page: introduction, procedure steps and detailed fees */
  intro: string;
  procedure: string[];
  expenses: Expense[];
};

export type VisaOffer = {
  id: string;
  country: string;
  code: string;
  service: string;
  price: string;
  delay: string;
};

export type Testimonial = {
  id: string;
  name: string;
  program: string;
  country: string;
  code: string;
  stampLabel: string;
  image: string;
  text: string;
};

export type Faq = { id: string; question: string; answer: string };

export type SiteContent = {
  settings: SiteSettings;
  services: Service[];
  destinations: Destination[];
  visaOffers: VisaOffer[];
  testimonials: Testimonial[];
  faqs: Faq[];
};

export const SERVICE_HREF: Record<ServiceSlug, string> = {
  billetterie: "/services/billetterie",
  "accompagnement-etudiant": "/services/accompagnement-etudiant",
  "visa-et-immigration": "/services/visa-et-immigration",
};
