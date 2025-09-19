import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // 👇 ajoute ceci avec ton domaine (utilise l’URL vercel si tu n’as pas encore ton propre domaine)

  metadataBase: new URL("https://al-moustour-voyage.vercel.app"),

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
    url: "https://al-moustour-voyage.vercel.app",
    images: ["/ALmoustour logo.jpg"], // chemin relatif → sera transformé en absolu
  },

  // twitter: {
  //   card: "summary_large_image",
  //   title: "AL MOUSTOUR Voyages",
  //   description:
  //     "Spécialiste de l'accompagnement étudiant pour étudier à l'étranger.",
  //   images: ["/og-image.png"],
  //   creator: "@almoustour", // si tu as un compte Twitter/X officiel
  // },
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
