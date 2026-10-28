import type { Metadata, Viewport } from "next";
import "./fonts.css";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Holiday Packages from India | Tailor-made Holidays | Ghooomo",
    template: "%s | Ghooomo",
  },
  description: site.description,
  applicationName: site.name,
  keywords: ["luxury holiday packages", "tailor-made holidays", "honeymoon packages", "Maldives", "Bali", "Vietnam", "Thailand", "Sri Lanka", "Europe tour from India", "Kerala", "Andaman", "Sikkim", "Gujarat Rann Utsav", "Noida travel company"],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    title: "Ghooomo | Your world, beautifully planned",
    images: [{ url: "/photos/world-santorini.jpg", width: 1200, height: 831, alt: "Santorini, Greece" }],
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
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/general-sans-700.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/general-sans-500.woff2" as="font" type="font/woff2" crossOrigin="" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body className="min-h-dvh bg-paper">{children}</body>
    </html>
  );
}
