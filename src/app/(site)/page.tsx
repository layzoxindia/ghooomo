import HeroWorld, { type HeroPlace } from "@/components/home/HeroWorld";
import JourneyRail, { type RailItem } from "@/components/home/JourneyRail";
import GlobeSection from "@/components/home/GlobeSection";
import TravellerTypes from "@/components/home/TravellerTypes";
import WhyUs from "@/components/home/WhyUs";
import EnquirySection from "@/components/EnquirySection";
import Testimonials from "@/components/Testimonials";
import { getCatalog } from "@/lib/server/catalog";
import { photoSrc } from "@/lib/site";

export const revalidate = 300;

// Destinations drifting past in the opening section. Mixed on purpose: the
// company plans holidays worldwide, not only the trips listed on the site.
const heroPlaces: HeroPlace[] = [
  { name: "Santorini", country: "Greece", photo: "/photos/world-santorini.jpg" },
  { name: "Maldives", country: "Indian Ocean", photo: photoSrc(28843922) },
  { name: "Swiss Alps", country: "Switzerland", photo: "/photos/europe-swiss-train.jpg" },
  { name: "Kyoto", country: "Japan", photo: "/photos/world-kyoto.jpg" },
  { name: "Bali", country: "Indonesia", photo: "/photos/bali-villa.jpg" },
  { name: "Dubai", country: "United Arab Emirates", photo: "/photos/world-dubai.jpg" },
  { name: "Cappadocia", country: "Türkiye", photo: "/photos/world-cappadocia.jpg" },
  { name: "Ha Long Bay", country: "Vietnam", photo: "/photos/vietnam-halong-dusk.jpg" },
  { name: "Udaipur", country: "Rajasthan, India", photo: "/photos/world-udaipur.jpg" },
  { name: "Mauritius", country: "Indian Ocean", photo: "/photos/world-mauritius.jpg" },
  { name: "Paris", country: "France", photo: "/photos/europe-paris.jpg" },
  { name: "Kashmir", country: "India", photo: "/photos/world-kashmir.jpg" },
  { name: "Singapore", country: "Singapore", photo: "/photos/world-singapore.jpg" },
  { name: "Phi Phi", country: "Thailand", photo: "/photos/thailand-maya-bay.jpg" },
  { name: "Venice", country: "Italy", photo: "/photos/europe-venice.jpg" },
  { name: "Sigiriya", country: "Sri Lanka", photo: "/photos/srilanka-sigiriya.jpg" },
  { name: "Kerala", country: "India", photo: photoSrc(34489429) },
  { name: "Kanchenjunga", country: "Sikkim, India", photo: "/photos/sikkim-kanchenjunga.jpg" },
];

export default async function Home() {
  const packages = await getCatalog();

  const rail: RailItem[] = packages.map((p) => ({
    slug: p.slug,
    title: p.title,
    country: p.country,
    region: p.region,
    nights: p.nights,
    days: p.days,
    bestTime: p.bestTime,
    idealFor: p.idealFor,
    photo: photoSrc(p.photos[0].id),
    alt: p.photos[0].alt,
  }));

  return (
    <>
      <HeroWorld places={heroPlaces} />
      <JourneyRail items={rail} />
      <GlobeSection />
      <TravellerTypes />
      <WhyUs />
      <Testimonials />
      <EnquirySection />
    </>
  );
}
