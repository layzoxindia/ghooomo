import type { Photo } from "@/data/packages";

export type Rating = "best" | "good" | "low";

export type Destination = {
  slug: string;
  name: string;
  region: "International" | "India";
  country: string;
  /** <title> text, keyword first. Keep under ~60 characters. */
  seoTitle: string;
  /** Meta description, under ~155 characters. */
  metaDescription: string;
  h1: string;
  tagline: string;
  hero: Photo;
  gallery: Photo[];
  intro: string[];
  facts: { label: string; value: string }[];
  goodFor: { t: string; d: string }[];
  /** One rating per month, January first. */
  months: [Rating, Rating, Rating, Rating, Rating, Rating, Rating, Rating, Rating, Rating, Rating, Rating];
  seasons: { name: string; when: string; text: string }[];
  reach: string[];
  /** Visa / permits for Indian travellers. */
  entry: { title: string; text: string[]; checklist: string[] };
  places: { name: string; text: string }[];
  things: { name: string; text: string }[];
  stay: { name: string; text: string }[];
  itineraries: { title: string; days: string[] }[];
  tips: string[];
  faqs: { q: string; a: string }[];
  packageSlugs: string[];
};
