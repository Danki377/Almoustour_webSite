// Default site content: seeds the database and is served if the database is unreachable.
// Once the database is seeded, edit the content from the back office (/admin), not here.
import type { SiteContent } from "./types";

export const DEFAULT_CONTENT: SiteContent = {
  "settings": {
    "whatsapp": "22363711111",
    "phone": "+22363711111",
    "phoneDisplay": "+223 63 71 11 11",
    "email": "Almoustourvoyage@gmail.com",
    "address": "Bamako, Sotuba ACI, Avenue de l'Armée",
    "addressHint": "Près du rond-point du 3ème pont",
    "facebook": "https://www.facebook.com/agencedevoyagemali",
    "instagram": "https://www.instagram.com/almoustour_voyages?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    "mapsEmbed": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124573.20965140348!2d-8.080053156640625!3d12.653721900000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe51d308cfb8890d%3A0x417f78c33f6489f2!2sAgence%20Almoustour%20Voyage!5e0!3m2!1sfr!2sml!4v1758208610701!5m2!1sfr!2sml",
    "mapsLink": "https://www.google.com/maps/search/?api=1&query=Agence+Almoustour+Voyage+Bamako",
    "since": 2016,
    "defaultMessage": "Bonjour Al-Moustour, je souhaite me renseigner sur vos services.",
    "hours": [
      {
        "day": "Lun – Ven",
        "time": "9h00 – 18h00"
      },
      {
        "day": "Samedi",
        "time": "Fermé"
      },
      {
        "day": "Dimanche",
        "time": "Fermé"
      }
    ]
  },
  "services": [
    {
      "slug": "billetterie",
      "href": "/services/billetterie",
      "title": "Billetterie d'avion",
      "image": "/images/billetterie.jpg",
      "waMsg": "Bonjour Al-Moustour, je souhaite réserver un billet d'avion."
    },
    {
      "slug": "accompagnement-etudiant",
      "href": "/services/accompagnement-etudiant",
      "title": "Études à l'étranger",
      "image": "/images/etudiant.jpg",
      "waMsg": "Bonjour Al-Moustour, je souhaite me renseigner sur les études à l'étranger."
    },
    {
      "slug": "visa-et-immigration",
      "href": "/services/visa-et-immigration",
      "title": "Assistance visa",
      "image": "/images/visa.jpg",
      "waMsg": "Bonjour Al-Moustour, je souhaite me renseigner sur l'assistance visa."
    }
  ],
  "destinations": [
    {
      "id": "france",
      "country": "France",
      "city": "Paris, France",
      "code": "CDG",
      "image": "/images/france.jpg",
      "title": "Études en France avec Campus France",
      "priceLabel": "frais d'agence",
      "price": "650.000 FCFA",
      "info": "Universités publiques & privées",
      "badge": "90% de réussite",
      "scholarship": false,
      "description": "Procédure Campus France + interview à l'Institut Français. Universités publiques et privées disponibles.",
      "lon": 2.35,
      "lat": 48.86,
      "intro": "Rejoignez les milliers d'étudiants maliens en France. Accompagnement complet de Campus France jusqu'au logement. Inscriptions dès le 1er octobre 2025.",
      "procedure": [
        "Création du compte Campus France",
        "Interview",
        "Inscription à l'université",
        "Compte bloqué (5 millions FCFA remboursables si refus)"
      ],
      "expenses": [
        {
          "label": "Université privée",
          "value": "2.500.000 FCFA / an"
        },
        {
          "label": "Frais de procédure",
          "value": "250.000 FCFA (Publique) / 750.000 FCFA (Privé)"
        },
        {
          "label": "Frais d'agence",
          "value": "650.000 FCFA (Payable après visa)"
        },
        {
          "label": "Nourriture",
          "value": "150.000 FCFA / mois (Est.)"
        },
        {
          "label": "Logement",
          "value": "200.000 FCFA / mois (Est.)"
        }
      ]
    },
    {
      "id": "canada",
      "country": "Canada",
      "city": "Montréal, Canada",
      "code": "YUL",
      "image": "/images/canada.jpg",
      "title": "Collèges et universités au Canada",
      "priceLabel": "frais d'agence",
      "price": "850.000 FCFA",
      "info": "Opportunités de travail & résidence",
      "badge": "65% de réussite",
      "scholarship": false,
      "description": "Collèges et universités reconnus mondialement. Dossier complet préparé pour maximiser vos chances de visa.",
      "lon": -73.57,
      "lat": 45.5,
      "intro": "Sécurité, diversité et diplômes prestigieux. Le Canada offre des opportunités exceptionnelles de travail et de résidence.",
      "procedure": [
        "Bien choisir son programme",
        "Vérifier les conditions spécifiques",
        "Fournir des preuves financières solides",
        "L'expertise d'Al Moustour maximise vos chances face à la complexité du visa."
      ],
      "expenses": [
        {
          "label": "Collège / Université",
          "value": "À partir de 5.000.000 FCFA / an"
        },
        {
          "label": "Frais de procédure",
          "value": "400.000 FCFA"
        },
        {
          "label": "Frais d'agence",
          "value": "850.000 FCFA"
        },
        {
          "label": "Nourriture",
          "value": "250.000 FCFA / mois (Est.)"
        },
        {
          "label": "Logement",
          "value": "250.000 FCFA / mois (Est.)"
        }
      ]
    },
    {
      "id": "turquie",
      "country": "Turquie",
      "city": "Istanbul, Turquie",
      "code": "IST",
      "image": "/images/turquie.jpg",
      "title": "Bourse d'études en Turquie",
      "priceLabel": "cycle complet",
      "price": "3.500.000 FCFA",
      "info": "Langue + visa + installation inclus",
      "badge": "87% de réussite",
      "scholarship": true,
      "description": "Système universitaire américain (Bachelor 4 ans). Cours en turc ou en anglais avec formation linguistique incluse.",
      "lon": 28.98,
      "lat": 41.01,
      "intro": "Universités de qualité avec programmes en turc ou en anglais. Système américain (Bachelor en 4 ans) et accueil chaleureux.",
      "procedure": [
        "Paiement unique pour tout le cycle (universités d'État) incluant : langue + visa + accueil + installation.",
        "Option universités privées avec frais annuels."
      ],
      "expenses": [
        {
          "label": "Offre / Bourse",
          "value": "3.500.000 FCFA (Cycle complet + langue + frais agence + visa)"
        },
        {
          "label": "Université privée",
          "value": "1.500.000 FCFA / an"
        },
        {
          "label": "Frais d'agence",
          "value": "500.000 FCFA"
        },
        {
          "label": "Nourriture",
          "value": "70.000 FCFA / mois (Est.)"
        },
        {
          "label": "Logement",
          "value": "50.000 FCFA / mois (Est.)"
        }
      ]
    },
    {
      "id": "maroc",
      "country": "Maroc",
      "city": "Casablanca, Maroc",
      "code": "CMN",
      "image": "/images/maroc.jpg",
      "title": "Bourse d'études au Maroc",
      "priceLabel": "cycle complet",
      "price": "3.500.000 FCFA",
      "info": "Enseignement en français",
      "badge": "Garantie 100%",
      "scholarship": true,
      "description": "Enseignement en français. Système identique au modèle malien/français. Environnement sécurisé et accueillant.",
      "lon": -7.59,
      "lat": 33.57,
      "intro": "Une puissance économique africaine avec des infrastructures modernes. Système éducatif dynamique (LMD) identique au modèle français.",
      "procedure": [
        "Établissements publics offrant des bourses (paiement unique pour tout le cycle)",
        "Établissements privés spécialisés"
      ],
      "expenses": [
        {
          "label": "Offre / Bourse",
          "value": "3.500.000 FCFA (Tout le cycle)"
        },
        {
          "label": "Université privée",
          "value": "1.500.000 FCFA / an"
        },
        {
          "label": "Frais d'agence",
          "value": "500.000 FCFA"
        },
        {
          "label": "Nourriture",
          "value": "60.000 FCFA / mois (Est.)"
        },
        {
          "label": "Logement",
          "value": "60.000 FCFA / mois (Est.)"
        }
      ]
    },
    {
      "id": "chine",
      "country": "Chine",
      "city": "Pékin, Chine",
      "code": "PEK",
      "image": "/images/chine.jpg",
      "title": "Bourse d'études en Chine",
      "priceLabel": "tout le cycle",
      "price": "3.500.000 FCFA",
      "info": "Logement + visa + cycle inclus",
      "badge": "Garantie 100%",
      "scholarship": true,
      "description": "2ème économie mondiale, +500 000 étudiants internationaux. Universités reconnues internationalement.",
      "lon": 116.4,
      "lat": 39.9,
      "intro": "Une expérience unique dans « l'usine du monde ». La Chine accueille plus de 500 000 étudiants internationaux et offre des universités respectées mondialement.",
      "procedure": [
        "Une année de formation en langue chinoise avant de commencer le cycle universitaire.",
        "Formation en anglais (avec attestation d'anglais obtenue au Mali) pour une intégration directe."
      ],
      "expenses": [
        {
          "label": "Offre / Bourse",
          "value": "3.500.000 FCFA (Tout le cycle + logement + visa)"
        },
        {
          "label": "Université privée",
          "value": "1.600.000 FCFA / an"
        },
        {
          "label": "Frais d'agence",
          "value": "400.000 FCFA (Bourse) / 650.000 FCFA (Privé)"
        },
        {
          "label": "Nourriture",
          "value": "60.000 FCFA / mois (Est.)"
        },
        {
          "label": "Logement",
          "value": "60.000 FCFA / mois (Est. si privé)"
        }
      ]
    },
    {
      "id": "russie",
      "country": "Russie",
      "city": "Moscou, Russie",
      "code": "SVO",
      "image": "/images/russie.jpg",
      "title": "Bourse d'études en Russie",
      "priceLabel": "1ère année",
      "price": "2.500.000 FCFA",
      "info": "Logement & année de langue inclus",
      "badge": "Garantie 100%",
      "scholarship": true,
      "description": "Diplômes reconnus mondialement. Enseignement supérieur rigoureux. Logement inclus la 1ère année.",
      "lon": 37.62,
      "lat": 55.75,
      "intro": "Destination de choix pour un enseignement rigoureux à coût abordable. Diplômes reconnus mondialement et environnement académique de haut niveau.",
      "procedure": [
        "L'agence gère tout : inscription + année de langue + visa + 1ère année de logement + accompagnement pendant tout le cycle."
      ],
      "expenses": [
        {
          "label": "Offre / Bourse",
          "value": "2.500.000 FCFA (Visa + 1an logement + 1an langue + frais dossier)"
        },
        {
          "label": "Université privée",
          "value": "N/A"
        },
        {
          "label": "Frais d'agence",
          "value": "Inclus dans la bourse"
        },
        {
          "label": "Nourriture",
          "value": "50.000 FCFA / mois (Est.)"
        },
        {
          "label": "Logement",
          "value": "Inclus la 1ère année"
        }
      ]
    },
    {
      "id": "inde",
      "country": "Inde",
      "city": "New Delhi, Inde",
      "code": "DEL",
      "image": "/images/inde.jpg",
      "title": "Médecine, IT & ingénierie en Inde",
      "priceLabel": "frais d'agence",
      "price": "700.000 FCFA",
      "info": "Visa étudiant simplifié",
      "badge": "Garantie 95%",
      "scholarship": false,
      "description": "Reconnue pour l'informatique, l'ingénierie et la médecine. Visa simple, coûts réduits, intégration facile.",
      "lon": 77.2,
      "lat": 28.61,
      "intro": "Excellence en informatique, ingénierie et médecine à des coûts abordables. Intégration facile et formations de renommée mondiale.",
      "procedure": [
        "Le visa étudiant pour l'Inde est souvent plus simple. Nous assurons le choix de l'université, la préparation des dossiers et l'accueil."
      ],
      "expenses": [
        {
          "label": "Université",
          "value": "À partir de 1.500.000 FCFA / an"
        },
        {
          "label": "Frais de procédure",
          "value": "250.000 FCFA"
        },
        {
          "label": "Frais d'agence",
          "value": "700.000 FCFA"
        },
        {
          "label": "Nourriture",
          "value": "50.000 FCFA / mois (Est.)"
        },
        {
          "label": "Logement",
          "value": "80.000 FCFA / mois (Est.)"
        }
      ]
    },
    {
      "id": "usa",
      "country": "États-Unis",
      "city": "New York, États-Unis",
      "code": "JFK",
      "image": "/images/usa.jpg",
      "title": "Études aux États-Unis, visa F-1",
      "priceLabel": "frais d'agence",
      "price": "850.000 FCFA",
      "info": "Préparation aux interviews incluse",
      "badge": "80% de réussite",
      "scholarship": false,
      "description": "Universités de réputation mondiale. Visa F-1 obtenu grâce à notre expertise en moins de 2 mois.",
      "lon": -74,
      "lat": 40.71,
      "intro": "Immersion totale dans la culture américaine. Le visa étudiant (F-1) est plus accessible qu'on ne le croit avec une préparation rigoureuse aux interviews.",
      "procedure": [
        "Sélection d'une université adaptée à votre profil",
        "Obtention de l'I-20",
        "Montage de dossier optimisé pour l'entretien consulaire"
      ],
      "expenses": [
        {
          "label": "Université",
          "value": "10.000.000 FCFA / an"
        },
        {
          "label": "Frais de procédure",
          "value": "650.000 FCFA"
        },
        {
          "label": "Frais d'agence",
          "value": "850.000 FCFA"
        },
        {
          "label": "Nourriture",
          "value": "300$ / mois (Est.)"
        },
        {
          "label": "Logement",
          "value": "600$ / mois (Est.)"
        }
      ]
    }
  ],
  "visaOffers": [
    {
      "id": "visa-1",
      "country": "Canada",
      "code": "YUL",
      "service": "Visa touristique",
      "price": "650.000 FCFA",
      "delay": "0 à 6 mois"
    },
    {
      "id": "visa-2",
      "country": "Dubaï",
      "code": "DXB",
      "service": "Visa express",
      "price": "110.000 FCFA",
      "delay": "24h à 72h"
    },
    {
      "id": "visa-3",
      "country": "Maroc",
      "code": "CMN",
      "service": "AEVM",
      "price": "55.000 FCFA",
      "delay": "24h à 72h"
    },
    {
      "id": "visa-4",
      "country": "Oumra",
      "code": "JED",
      "service": "Visa",
      "price": "210.000 FCFA",
      "delay": "24h à 72h"
    },
    {
      "id": "visa-5",
      "country": "Turquie",
      "code": "IST",
      "service": "Visa touristique",
      "price": "220.000 FCFA",
      "delay": "0 à 30 jours"
    },
    {
      "id": "visa-6",
      "country": "Russie",
      "code": "SVO",
      "service": "Visa touristique",
      "price": "250.000 FCFA",
      "delay": "0 à 2 mois"
    },
    {
      "id": "visa-7",
      "country": "USA / Europe",
      "code": "···",
      "service": "Rendez-vous & montage",
      "price": "Sur devis",
      "delay": "Variable"
    }
  ],
  "testimonials": [
    {
      "id": "temoignage-1",
      "name": "Oumar Touré",
      "program": "Spécialisation en Médecine",
      "country": "Maroc",
      "code": "CMN",
      "stampLabel": "Admis",
      "image": "/images/maroc.jpg",
      "text": "L'agence m'a accompagné pour mon admission en faculté de médecine au Maroc. Démarches claires et transparentes. Une agence vraiment fiable à Bamako ! Je recommande vivement leurs services."
    },
    {
      "id": "temoignage-2",
      "name": "Awa Sidibé",
      "program": "Licence en Économie",
      "country": "Canada",
      "code": "YUL",
      "stampLabel": "Admise",
      "image": "/images/canada.jpg",
      "text": "Je n'y croyais pas, mais AL MOUSTOUR a géré tout mon dossier d'admission au Canada et m'a préparé pour l'entrevue. Aujourd'hui, j'y suis pour mes études. Merci infiniment à toute l'équipe !"
    },
    {
      "id": "temoignage-3",
      "name": "Mamadou Konaté",
      "program": "Master en Informatique",
      "country": "France",
      "code": "CDG",
      "stampLabel": "Visa obtenu",
      "image": "/images/france.jpg",
      "text": "La procédure Campus France nous effraie souvent, mais avec l'équipe de cette agence, j'ai été super bien orienté, du choix de la formation jusqu'au visa et à la réservation de mon billet."
    },
    {
      "id": "temoignage-4",
      "name": "Fatoumata Diarra",
      "program": "Licence en Gestion",
      "country": "Turquie",
      "code": "IST",
      "stampLabel": "Visa obtenu",
      "image": "/images/turquie.jpg",
      "text": "J'ai obtenu mon visa d'études pour la Turquie en un temps record ! L'équipe est non seulement très professionnelle, mais ils m'ont même aidée à trouver un logement proche de mon campus."
    }
  ],
  "faqs": [
    {
      "id": "faq-1",
      "question": "Quelles destinations proposez-vous pour les études ?",
      "answer": "Nous accompagnons les étudiants vers la France, le Canada, la Turquie, le Maroc, la Chine, la Russie, l'Inde et les USA."
    },
    {
      "id": "faq-2",
      "question": "Comment obtenir un tarif étudiant pour mon billet d'avion ?",
      "answer": "Il suffit de nous présenter votre attestation d'inscription ou votre carte d'étudiant en cours de validité lors de votre réservation."
    },
    {
      "id": "faq-3",
      "question": "Quel est votre taux de réussite pour les demandes de visa ?",
      "answer": "Grâce à notre expertise technique, nous affichons des taux de réussite élevés (jusqu'à 100% pour certaines destinations comme le Maroc ou la Chine)."
    },
    {
      "id": "faq-4",
      "question": "Proposez-vous des bourses d'études ?",
      "answer": "Oui, nous avons des programmes de bourses disponibles pour la Chine, la Russie, la Turquie et le Maroc couvrant souvent le logement et le cycle d'étude."
    },
    {
      "id": "faq-5",
      "question": "Comment se passe l'accompagnement Campus France ?",
      "answer": "Nous gérons l'intégralité de votre compte, de la création du dossier à la préparation intensive pour l'entretien consulaire."
    },
    {
      "id": "faq-6",
      "question": "Où se trouve votre agence à Bamako ?",
      "answer": "Notre agence est située à Sotuba ACI, Avenue de l'Armée, juste à côté du 3ème pont."
    },
    {
      "id": "faq-7",
      "question": "Quels sont vos horaires d'ouverture ?",
      "answer": "Nous vous accueillons du lundi au samedi, de 08h30 à 18h30. Support WhatsApp disponible 7j/7."
    },
    {
      "id": "faq-8",
      "question": "Est-il possible de payer en plusieurs fois ?",
      "answer": "Pour certains services d'accompagnement, des facilités de paiement peuvent être discutées avec nos conseillers."
    }
  ]
};
