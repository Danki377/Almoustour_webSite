import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AL MOUSTOUR Voyages - Votre Partenaire pour Étudier à l'Étranger",
    template: "%s | AL MOUSTOUR Voyages",
  },
  description:
    "Expert en accompagnement étudiant pour études à l'étranger. Inscriptions universitaires, bourses, visas et billetterie. Plus de 10 ans d'expérience au service de votre avenir.",
  keywords: [
    "étudier à l'étranger",
    "bourses d'études",
    "inscription université",
    "visa étudiant",
    "voyage étudiant",
    "agence de voyage mali",
    "étudier en france",
    "étudier au canada",
  ],
  authors: [{ name: "AL MOUSTOUR Voyages" }],
  creator: "AL MOUSTOUR Voyages",
  publisher: "AL MOUSTOUR Voyages",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://al-moustour-voyage.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AL MOUSTOUR Voyages - Réalisez vos rêves d'études à l'international",
    description:
      "Accompagnement personnalisé pour vos études à l'étranger. Inscriptions, bourses, visas et conseils d'experts.",
    url: "https://al-moustour-voyage.vercel.app",
    siteName: "AL MOUSTOUR Voyages",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/ALmoustour logo.jpg",
        width: 800,
        height: 600,
        alt: "AL MOUSTOUR Voyages Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AL MOUSTOUR Voyages",
    description:
      "Spécialiste de l'accompagnement étudiant pour étudier à l'étranger.",
    images: ["/ALmoustour logo.jpg"],
    creator: "@almoustour",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: "#00AEEF",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/almoustour logo.png" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
