export const SITE = {
  since: 2016,
  whatsapp: "22363711111",
  phone: "+22363711111",
  phoneDisplay: "+223 63 71 11 11",
  email: "Almoustourvoyage@gmail.com",
  address: "Bamako, Sotuba ACI, Avenue de l'Armée",
  addressHint: "Près du rond-point du 3ème pont",
  facebook: "https://www.facebook.com/agencedevoyagemali",
  instagram:
    "https://www.instagram.com/almoustour_voyages?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124573.20965140348!2d-8.080053156640625!3d12.653721900000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe51d308cfb8890d%3A0x417f78c33f6489f2!2sAgence%20Almoustour%20Voyage!5e0!3m2!1sfr!2sml!4v1758208610701!5m2!1sfr!2sml",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Agence+Almoustour+Voyage+Bamako",
};

export function waLink(message?: string) {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export type Service = {
  slug: string;
  href: string;
  title: string;
  image: string;
  waMsg: string;
};

export const SERVICES: Service[] = [
  {
    slug: "billetterie",
    href: "/services/billetterie",
    title: "Billetterie d'avion",
    image: "/images/billetterie.jpg",
    waMsg: "Bonjour Al-Moustour, je souhaite réserver un billet d'avion.",
  },
  {
    slug: "accompagnement-etudiant",
    href: "/services/accompagnement-etudiant",
    title: "Études à l'étranger",
    image: "/images/etudiant.jpg",
    waMsg: "Bonjour Al-Moustour, je souhaite me renseigner sur les études à l'étranger.",
  },
  {
    slug: "visa-et-immigration",
    href: "/services/visa-et-immigration",
    title: "Assistance visa",
    image: "/images/visa.jpg",
    waMsg: "Bonjour Al-Moustour, je souhaite me renseigner sur l'assistance visa.",
  },
];

export const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Destinations", href: "/#destinations" },
  { label: "À propos", href: "/#about" },
  { label: "Témoignages", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
];

export type Destination = {
  id: string;
  country: string;
  city: string;
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
};

export const DESTINATIONS: Destination[] = [
  {
    id: "france",
    country: "France",
    city: "Paris, France",
    code: "CDG",
    image: "/images/france.jpg",
    title: "Études en France avec Campus France",
    priceLabel: "frais d'agence",
    price: "650.000 FCFA",
    info: "Universités publiques & privées",
    badge: "90% de réussite",
    scholarship: false,
    description:
      "Procédure Campus France + interview à l'Institut Français. Universités publiques et privées disponibles.",
    lon: 2.35,
    lat: 48.86,
  },
  {
    id: "canada",
    country: "Canada",
    city: "Montréal, Canada",
    code: "YUL",
    image: "/images/canada.jpg",
    title: "Collèges et universités au Canada",
    priceLabel: "frais d'agence",
    price: "850.000 FCFA",
    info: "Opportunités de travail & résidence",
    badge: "65% de réussite",
    scholarship: false,
    description:
      "Collèges et universités reconnus mondialement. Dossier complet préparé pour maximiser vos chances de visa.",
    lon: -73.57,
    lat: 45.5,
  },
  {
    id: "turquie",
    country: "Turquie",
    city: "Istanbul, Turquie",
    code: "IST",
    image: "/images/turquie.jpg",
    title: "Bourse d'études en Turquie",
    priceLabel: "cycle complet",
    price: "3.500.000 FCFA",
    info: "Langue + visa + installation inclus",
    badge: "87% de réussite",
    scholarship: true,
    description:
      "Système universitaire américain (Bachelor 4 ans). Cours en turc ou en anglais avec formation linguistique incluse.",
    lon: 28.98,
    lat: 41.01,
  },
  {
    id: "maroc",
    country: "Maroc",
    city: "Casablanca, Maroc",
    code: "CMN",
    image: "/images/maroc.jpg",
    title: "Bourse d'études au Maroc",
    priceLabel: "cycle complet",
    price: "3.500.000 FCFA",
    info: "Enseignement en français",
    badge: "Garantie 100%",
    scholarship: true,
    description:
      "Enseignement en français. Système identique au modèle malien/français. Environnement sécurisé et accueillant.",
    lon: -7.59,
    lat: 33.57,
  },
  {
    id: "chine",
    country: "Chine",
    city: "Pékin, Chine",
    code: "PEK",
    image: "/images/chine.jpg",
    title: "Bourse d'études en Chine",
    priceLabel: "tout le cycle",
    price: "3.500.000 FCFA",
    info: "Logement + visa + cycle inclus",
    badge: "Garantie 100%",
    scholarship: true,
    description:
      "2ème économie mondiale, +500 000 étudiants internationaux. Universités reconnues internationalement.",
    lon: 116.4,
    lat: 39.9,
  },
  {
    id: "russie",
    country: "Russie",
    city: "Moscou, Russie",
    code: "SVO",
    image: "/images/russie.jpg",
    title: "Bourse d'études en Russie",
    priceLabel: "1ère année",
    price: "2.500.000 FCFA",
    info: "Logement & année de langue inclus",
    badge: "Garantie 100%",
    scholarship: true,
    description:
      "Diplômes reconnus mondialement. Enseignement supérieur rigoureux. Logement inclus la 1ère année.",
    lon: 37.62,
    lat: 55.75,
  },
  {
    id: "inde",
    country: "Inde",
    city: "New Delhi, Inde",
    code: "DEL",
    image: "/images/inde.jpg",
    title: "Médecine, IT & ingénierie en Inde",
    priceLabel: "frais d'agence",
    price: "700.000 FCFA",
    info: "Visa étudiant simplifié",
    badge: "Garantie 95%",
    scholarship: false,
    description:
      "Reconnue pour l'informatique, l'ingénierie et la médecine. Visa simple, coûts réduits, intégration facile.",
    lon: 77.2,
    lat: 28.61,
  },
  {
    id: "usa",
    country: "États-Unis",
    city: "New York, États-Unis",
    code: "JFK",
    image: "/images/usa.jpg",
    title: "Études aux États-Unis, visa F-1",
    priceLabel: "frais d'agence",
    price: "850.000 FCFA",
    info: "Préparation aux interviews incluse",
    badge: "80% de réussite",
    scholarship: false,
    description:
      "Universités de réputation mondiale. Visa F-1 obtenu grâce à notre expertise en moins de 2 mois.",
    lon: -74,
    lat: 40.71,
  },
];
