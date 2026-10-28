import type { Destination } from "./types";

export const ooty: Destination = {
  slug: "ooty",
  name: "Ooty",
  region: "India",
  country: "India",
  seoTitle: "Ooty Tour Packages | Ooty, Coonoor and the Nilgiris",
  metaDescription: "Plan an Ooty holiday: the Nilgiri Mountain Railway, Ooty Lake, Botanical Garden, Coonoor tea estates and Doddabetta. Best time and itineraries.",
  h1: "Ooty and Nilgiris holidays",
  tagline: "Tea gardens, a toy train through the hills and cool air in the Blue Mountains.",
  hero: { id: "ooty-tea-hills", alt: "Tea gardens and a lake in the Nilgiri hills" },
  gallery: [{ id: "ooty-toy-train", alt: "The Nilgiri Mountain Railway passing through Ooty" }],
  intro: [
    "Ooty, officially Udhagamandalam, is the classic hill station of south India, set in the Nilgiris, or Blue Mountains, of Tamil Nadu. The air is cool all year, the hills are covered in tea gardens and eucalyptus, and colonial bungalows line the slopes.",
    "The highlight for many is the Nilgiri Mountain Railway, a UNESCO-listed toy train that climbs from Mettupalayam to Ooty through tunnels and over bridges. Coonoor, quieter and greener, is the best base for tea estate stays.",
    "Ooty combines well with Coorg, Mysuru or the forests of Mudumalai.",
  ],
  facts: [
    { label: "Best time", value: "October to June" },
    { label: "Ideal stay", value: "3 to 4 nights" },
    { label: "Fly into", value: "Coimbatore" },
    { label: "Permits", value: "None needed" },
    { label: "Altitude", value: "About 2,240 m" },
    { label: "Known for", value: "Toy train and tea gardens" },
  ],
  goodFor: [
    { t: "Families", d: "Lake boating, gardens and the toy train." },
    { t: "Couples", d: "Tea estate bungalows and misty walks." },
    { t: "Senior travellers", d: "Cool weather and gentle sightseeing." },
  ],
  months: ["good", "good", "best", "best", "best", "good", "low", "low", "good", "best", "best", "good"],
  seasons: [
    { name: "Summer", when: "March to June", text: "Pleasant days and the flower show at the Botanical Garden in May." },
    { name: "Autumn", when: "September to November", text: "Green hills after the rains and fewer visitors." },
    { name: "Winter", when: "December to February", text: "Cold nights, sometimes near freezing, with clear days." },
    { name: "Monsoon", when: "July and August", text: "Heavy rain and occasional landslides on the ghat roads." },
  ],
  reach: [
    "Coimbatore airport is about three hours by road from Ooty, with flights from most major cities.",
    "The Nilgiri Mountain Railway runs from Mettupalayam, near Coimbatore, to Ooty, taking about five hours. Bengaluru and Mysuru are connected to Ooty by road through Bandipur and Mudumalai.",
  ],
  entry: {
    title: "Permits and planning",
    text: [
      "No permits are needed for Ooty. The roads through Bandipur and Mudumalai are closed to traffic at night, so plan to drive in daylight.",
      "The toy train has limited seats and books out early, especially on weekends and in summer.",
    ],
    checklist: [
      "Government photo ID",
      "Toy train booking",
      "Warm layers for evenings",
      "Daylight travel through the forest reserves",
    ],
  },
  places: [
    { name: "Ooty Lake", text: "Boating and a lakeside walk." },
    { name: "Government Botanical Garden", text: "Terraced gardens with old trees and a summer flower show." },
    { name: "Doddabetta Peak", text: "The highest point in the Nilgiris, with a viewing tower." },
    { name: "Coonoor", text: "Sim's Park, Dolphin's Nose and tea estates." },
    { name: "Pykara", text: "Waterfalls, a lake and pine forests." },
    { name: "Avalanche Lake", text: "A quiet lake in the forest, with eco-tourism trips." },
  ],
  things: [
    { name: "Toy train ride", text: "Mettupalayam to Coonoor is the most scenic stretch." },
    { name: "Tea factory visit", text: "See how Nilgiri tea is made and taste it fresh." },
    { name: "Homemade chocolates", text: "A local speciality sold across Ooty." },
    { name: "Mudumalai safari", text: "Elephants and deer in the forest reserve below Ooty." },
    { name: "Rose Garden", text: "One of the largest rose gardens in India." },
  ],
  stay: [
    { name: "Ooty", text: "Heritage hotels and resorts near the lake and Charing Cross." },
    { name: "Coonoor", text: "Tea estate bungalows and quiet boutique stays." },
    { name: "Masinagudi", text: "Jungle lodges near Mudumalai." },
  ],
  itineraries: [
    { title: "4 nights: Ooty and Coonoor", days: ["Arrive at Coimbatore, toy train or drive to Ooty", "Ooty Lake, Botanical Garden, Doddabetta", "Pykara and Avalanche", "Coonoor tea estates", "Departure"] },
  ],
  tips: [
    "Book toy train tickets as soon as reservations open.",
    "Stay in Coonoor if you prefer quiet; Ooty town is busy in season.",
    "Carry warm clothes; nights are cold even in summer.",
    "Avoid long weekends in May, when the hills are crowded.",
  ],
  faqs: [
    { q: "What is the best time to visit Ooty?", a: "October to June. March to May is the main season, with the flower show in May." },
    { q: "How do we book the Ooty toy train?", a: "Seats are booked through Indian Railways and fill quickly. We book them as soon as your dates are confirmed." },
    { q: "How many days are enough for Ooty?", a: "Three nights covers Ooty and Coonoor. Add a night for Mudumalai." },
    { q: "How do we reach Ooty?", a: "Fly to Coimbatore and drive about three hours, or take the toy train from Mettupalayam." },
    { q: "Ooty or Coorg?", a: "Ooty has the toy train, gardens and cooler weather. Coorg has coffee estates and a quieter, more rural feel." },
  ],
  packageSlugs: [],
};
