import type { Metadata, Viewport } from "next";
import "./fonts.css";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ghooomo | Solo, Couple and Group Holiday Packages",
    template: "%s · Ghooomo",
  },
  description: site.description,
  applicationName: site.name,
  keywords: ["holiday packages", "solo trips India", "honeymoon packages", "group tours", "Spiti", "Ladakh", "Bali", "Maldives", "Goa", "Noida travel agency"],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    title: "Ghooomo | Holidays planned around who is coming",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0F2B5B",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phoneE164,
  address: { "@type": "PostalAddress", streetAddress: "Sector 121", addressLocality: "Noida", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
  areaServed: "IN",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preload" href="/fonts/zodiak-800.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/general-sans-500.woff2" as="font" type="font/woff2" crossOrigin="" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body className="min-h-dvh bg-paper">{children}</body>
    </html>
  );
}
