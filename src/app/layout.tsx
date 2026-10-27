import type { Metadata, Viewport } from "next";
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
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        {/* Zodiak (display) + General Sans (body) by Indian Type Foundry, via Fontshare */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=zodiak@400,700,800&f[]=general-sans@400,500,600,700&display=swap"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body className="min-h-dvh bg-paper">{children}</body>
    </html>
  );
}
