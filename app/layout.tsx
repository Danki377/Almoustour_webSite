import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AL MOUSTOUR Voyages - Votre Partenaire pour Étudier à l'Étranger",
  description:
    "Spécialiste de l'accompagnement étudiant pour étudier à l'étranger. Inscriptions universitaires, recherche de bourses, visas et services de voyage. Plus de 10 ans d'expérience.",
  keywords:
    "étudier à l'étranger, bourses d'études, inscription université, visa étudiant, voyage étudiant",
  authors: [{ name: "AL MOUSTOUR Voyages" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title:
      "AL MOUSTOUR Voyages - Réalisez vos rêves d'études à l'international",
    description:
      "Accompagnement personnalisé pour vos études à l'étranger. Inscriptions, bourses, visas et conseils d'experts.",
    type: "website",
    locale: "fr_FR",
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
