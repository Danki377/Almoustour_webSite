import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#061423",
};

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
        url: "/og-image.jpg",
        width: 959,
        height: 960,
        alt: "AL MOUSTOUR Voyages Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AL MOUSTOUR Voyages",
    description:
      "Spécialiste de l'accompagnement étudiant pour étudier à l'étranger.",
    images: ["/og-image.jpg"],
    creator: "@almoustour",
  },
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
    <html lang="fr">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
