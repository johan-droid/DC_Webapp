import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Detective Conan News - One Truth Prevails",
  description: "Official Detective Conan news portal. Explore the latest news, updates, and characters from the world of Detective Conan.",
  keywords: ["Detective Conan", "Case Closed", "Anime", "News", "Characters"],
  authors: [{ name: "Detective Boys" }],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Detective Conan News - One Truth Prevails",
    description: "Official Detective Conan news and character portal",
    siteName: "Detective Conan News",
  },
  twitter: {
    card: "summary_large_image",
    title: "Detective Conan - One Truth Prevails",
    description: "Official Detective Conan case files database",
  },
  verification: {
    google: "your-google-verification-code",
  },
  other: {
    'revisit-after': '7 days',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0d0d0d" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}