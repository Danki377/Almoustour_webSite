import type { LeadChannel, LeadStatus } from "@/lib/generated/prisma/enums";

export const LEAD_STATUS: Record<LeadStatus, { label: string; tone: "accent" | "sun" | "violet" | "green" | "red" }> = {
  NEW: { label: "Nouveau", tone: "accent" },
  CONTACTED: { label: "Contacté", tone: "sun" },
  QUALIFIED: { label: "Dossier en cours", tone: "violet" },
  CONVERTED: { label: "Client", tone: "green" },
  LOST: { label: "Perdu", tone: "red" },
};

export const LEAD_STATUSES = Object.keys(LEAD_STATUS) as LeadStatus[];

export const LEAD_CHANNEL: Record<LeadChannel, string> = {
  WEBSITE: "Site web",
  WHATSAPP: "WhatsApp",
  PHONE: "Téléphone",
  WALK_IN: "En agence",
  SOCIAL: "Réseaux sociaux",
  REFERRAL: "Recommandation",
};

export const LEAD_CHANNELS = Object.keys(LEAD_CHANNEL) as LeadChannel[];

export const SERVICE_LABEL: Record<string, string> = {
  billetterie: "Billetterie",
  "accompagnement-etudiant": "Études",
  "visa-et-immigration": "Visa",
};

/** Readable names for the WhatsApp button locations (`src` of /go/whatsapp). */
export const CLICK_SOURCE: Record<string, string> = {
  hero: "Hero (accueil)",
  nav: "Menu",
  "nav-mobile": "Menu mobile",
  floating: "Bouton flottant",
  footer: "Pied de page",
  "page-intro": "Haut de page service",
  "cta-banner": "Bannière d'appel",
  "contact-direct": "Contact (lien direct)",
  "faq-search": "Recherche FAQ",
  "visa-offer": "Offre visa",
  "study-explorer": "Fiche pays études",
  autre: "Autre",
  contact: "Formulaire contact",
  formulaire: "Formulaire",
  admin: "Ajouté dans l'admin",
};

export const ROLE_OPTIONS = [
  { value: "member", label: "Membre — suivi des leads" },
  { value: "editor", label: "Éditeur — leads + offres et contenu du site" },
  { value: "superadmin", label: "Super admin — accès complet (équipe, paramètres)" },
];
