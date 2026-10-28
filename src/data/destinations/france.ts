import type { Destination } from "./types";

export const france: Destination = {
  slug: "france",
  name: "France",
  region: "International",
  country: "France",
  seoTitle: "France Tour Packages from India | Paris, Nice, Disneyland",
  metaDescription: "Plan a France holiday from India: Paris, Disneyland Paris, the French Riviera, Provence and the Loire. Schengen visa help, best time and itineraries.",
  h1: "France holidays from India",
  tagline: "Paris, the Riviera, lavender fields and châteaux, the most visited country in the world.",
  hero: { id: "europe-paris", alt: "Eiffel Tower and the Seine at dusk" },
  gallery: [{ id: "france-nice", alt: "The Promenade des Anglais and the bay in Nice" }],
  intro: [
    "France is the most visited country in the world, and Paris alone could fill a week: the Eiffel Tower, the Louvre, Montmartre, river cruises and long evenings in cafés. Disneyland Paris is just outside the city, which makes it a favourite for families.",
    "Beyond Paris, the French Riviera has Nice, Monaco and Cannes along a blue coastline. Provence has lavender fields and hill villages in summer, and the Loire Valley has fairy-tale châteaux.",
    "France also combines easily with Switzerland, Italy, Belgium and London by fast train.",
  ],
  facts: [
    { label: "Best time", value: "April to June, September and October" },
    { label: "Ideal stay", value: "6 to 9 nights" },
    { label: "Flight from India", value: "About 9 to 10 hours to Paris (direct)" },
    { label: "Visa for Indians", value: "Schengen visa" },
    { label: "Currency", value: "Euro (EUR)" },
    { label: "Time", value: "3 hours 30 minutes to 4 hours 30 minutes behind India" },
  ],
  goodFor: [
    { t: "Honeymoons", d: "Paris, Riviera sunsets and Provence villages." },
    { t: "Families", d: "Disneyland Paris, river cruises and museums made for children." },
    { t: "Food and wine lovers", d: "Bakeries, markets and vineyard regions." },
  ],
  months: ["low", "low", "good", "best", "best", "best", "good", "good", "best", "best", "good", "good"],
  seasons: [
    { name: "Spring", when: "April to June", text: "Mild, blossoms in Paris parks and fewer crowds than summer." },
    { name: "Summer", when: "July and August", text: "Warm and busy. Lavender in Provence in early July, beach season on the Riviera." },
    { name: "Autumn", when: "September and October", text: "Pleasant weather, grape harvests and autumn colours." },
    { name: "Winter", when: "November to March", text: "Cold, with Christmas markets and festive lights in December." },
  ],
  reach: [
    "There are direct flights from Delhi, Mumbai and Bengaluru to Paris, taking about nine to ten hours. Nice is reached by a short domestic flight or a fast train from Paris.",
    "France's TGV fast trains connect Paris with Nice, Lyon and Bordeaux, and the Eurostar reaches London in about two and a half hours.",
  ],
  entry: {
    title: "Schengen visa for Indian passport holders",
    text: [
      "France is in the Schengen area, so Indian citizens need a Schengen visa. If France is your main destination, you apply to the French mission through its visa centre, with biometrics.",
      "Apply four to eight weeks before travel, and earlier for summer. We prepare the itinerary, bookings and document checklist.",
    ],
    checklist: [
      "Passport valid for at least 3 months after return",
      "Travel insurance with at least 30,000 euros of medical cover",
      "Flight and hotel bookings",
      "Bank statements, tax returns and employment or business proof",
    ],
  },
  places: [
    { name: "Paris", text: "The Eiffel Tower, Louvre, Notre-Dame, Montmartre and the Champs-Élysées." },
    { name: "Disneyland Paris", text: "Two parks, 45 minutes from central Paris." },
    { name: "Versailles", text: "The royal palace and its gardens, a half-day trip from Paris." },
    { name: "Nice and the Riviera", text: "The Promenade des Anglais, Monaco, Cannes and the village of Èze." },
    { name: "Provence", text: "Lavender fields, Avignon and the hill villages of the Luberon." },
    { name: "Loire Valley", text: "Châteaux such as Chambord and Chenonceau." },
  ],
  things: [
    { name: "Seine river cruise", text: "Especially beautiful at night, when the monuments are lit." },
    { name: "Eiffel Tower summit", text: "Book timed tickets to avoid long queues." },
    { name: "Louvre", text: "The Mona Lisa and much more; a guided visit saves time." },
    { name: "Riviera day trip", text: "Monaco and Èze from Nice." },
    { name: "Cafés and bakeries", text: "Croissants, crêpes and macarons, with good vegetarian options." },
  ],
  stay: [
    { name: "Paris: central arrondissements", text: "Near the Seine, the Louvre or the Eiffel Tower." },
    { name: "Disneyland hotels", text: "Themed hotels at the park, ideal with children." },
    { name: "Nice", text: "Sea-view hotels on or near the Promenade." },
  ],
  itineraries: [
    { title: "6 nights: Paris and Disneyland", days: ["Arrive in Paris", "Eiffel Tower and Seine cruise", "Louvre and Montmartre", "Versailles", "Disneyland Paris", "Disneyland Paris", "Departure"] },
    { title: "8 nights: Paris and the Riviera", days: ["Arrive in Paris", "Paris sights", "Paris", "Versailles", "Fast train to Nice", "Monaco and Èze", "Cannes", "Nice old town", "Departure from Nice"] },
  ],
  tips: [
    "Book major museums and the Eiffel Tower in advance.",
    "Watch for pickpockets around busy sights and on the metro.",
    "Many shops close on Sundays outside central Paris.",
    "A Navigo or carnet of tickets makes the Paris metro simple.",
  ],
  faqs: [
    { q: "Do Indians need a visa for France?", a: "Yes. France is in the Schengen area, so Indian citizens need a Schengen visa." },
    { q: "What is the best time to visit France?", a: "April to June and September to October. Early July is the time for lavender in Provence." },
    { q: "How many days are enough for Paris?", a: "Four nights covers the main sights, and two more for Disneyland Paris." },
    { q: "Can we combine France with Switzerland?", a: "Yes. Paris to Switzerland is about four hours by fast train, and the combination is very popular." },
    { q: "Is France good for a honeymoon?", a: "Yes. Paris and the Riviera are among the most romantic places in Europe." },
  ],
  packageSlugs: [],
};
