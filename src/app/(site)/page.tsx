import HeroCinematic, { type HeroSlide } from "@/components/home/HeroCinematic";
import JourneyRail, { type RailItem } from "@/components/home/JourneyRail";
import GlobeSection, { type GlobePoint } from "@/components/home/GlobeSection";
import TravellerTypes from "@/components/home/TravellerTypes";
import PricingTrust from "@/components/home/PricingTrust";
import ServiceTimeline from "@/components/home/ServiceTimeline";
import FactsStrip from "@/components/home/FactsStrip";
import EnquirySection from "@/components/EnquirySection";
import Testimonials from "@/components/Testimonials";
import { getCatalog } from "@/lib/server/catalog";
import { photoSrc } from "@/lib/site";

export const revalidate = 300;

// Order of the opening slideshow.
const heroOrder = ["maldives-overwater-villa", "vietnam-halong-hoian", "europe-paris-swiss-venice", "sri-lanka-hills-and-coast", "sikkim-darjeeling", "bali-ubud-uluwatu"];

export default async function Home() {
  const packages = await getCatalog();

  const slides: HeroSlide[] = heroOrder
    .map((slug) => packages.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      place: p.destination,
      country: p.country,
      coords: p.coords,
      timeZone: p.timeZone,
      photo: photoSrc(p.photos[0].id),
      alt: p.photos[0].alt,
    }));

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

  const points: GlobePoint[] = [...packages]
    .sort((a, b) => (a.region === b.region ? 0 : a.region === "International" ? -1 : 1))
    .map((p) => ({ slug: p.slug, place: p.destination, coords: p.coords, timeZone: p.timeZone, region: p.region }));

  const countries = new Set(packages.filter((p) => p.region === "International").flatMap((p) => p.country.split(", "))).size;
  const facts = [
    { n: packages.length, t: "Hand-picked journeys" },
    { n: countries, t: "Countries abroad" },
    { n: packages.filter((p) => p.region === "India").length, t: "Regions of India" },
    { n: 1, t: "Planner, start to finish" },
    { n: 0, t: "Charges added later" },
  ];

  return (
    <>
      {slides.length > 0 && <HeroCinematic slides={slides} />}
      <FactsStrip facts={facts} />
      <JourneyRail items={rail} />
      <GlobeSection points={points} />
      <TravellerTypes />
      <PricingTrust />
      <ServiceTimeline />
      <Testimonials />
      <EnquirySection />
    </>
  );
}
