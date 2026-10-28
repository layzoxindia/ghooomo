import type { Destination } from "./types";

export const italy: Destination = {
  slug: "italy",
  name: "Italy",
  region: "International",
  country: "Italy",
  seoTitle: "Italy Tour Packages from India | Rome, Venice, Amalfi Coast",
  metaDescription: "Plan an Italy holiday from India: Rome, Florence, Venice, Tuscany and the Amalfi Coast. Schengen visa help, best time to visit and itineraries.",
  h1: "Italy holidays from India",
  tagline: "Ancient Rome, Renaissance Florence, the canals of Venice and cliffside villages above the sea.",
  hero: { id: "italy-positano", alt: "Colourful houses of Positano on the Amalfi Coast" },
  gallery: [{ id: "europe-venice", alt: "Grand Canal in Venice with the basilica" }],
  intro: [
    "Italy has more UNESCO World Heritage Sites than almost any other country, and it feels like it. In Rome you walk past the Colosseum on the way to dinner; in Florence the art of the Renaissance fills every church; and Venice floats on its lagoon as it has for a thousand years.",
    "The classic first trip links Rome, Florence and Venice by fast train. For a slower, more romantic holiday, add the Amalfi Coast, the hill towns of Tuscany or Lake Como.",
    "Italian food needs no introduction, and vegetarians eat very well: pasta, pizza, risotto and gelato are everywhere.",
  ],
  facts: [
    { label: "Best time", value: "April to June, September and October" },
    { label: "Ideal stay", value: "7 to 10 nights" },
    { label: "Flight from India", value: "About 8 to 10 hours to Rome or Milan" },
    { label: "Visa for Indians", value: "Schengen visa" },
    { label: "Currency", value: "Euro (EUR)" },
    { label: "Time", value: "3 hours 30 minutes to 4 hours 30 minutes behind India" },
  ],
  goodFor: [
    { t: "Honeymoons", d: "Gondolas in Venice, Amalfi sunsets and Tuscan villas." },
    { t: "Families", d: "Gladiators, gelato and easy fast trains between cities." },
    { t: "Art and history lovers", d: "The Vatican, the Uffizi and ancient ruins." },
  ],
  months: ["low", "low", "good", "best", "best", "best", "good", "good", "best", "best", "good", "low"],
  seasons: [
    { name: "Spring", when: "April to June", text: "Warm, sunny and green. The best time for sightseeing and the coast." },
    { name: "Summer", when: "July and August", text: "Hot and crowded in the cities. Ideal for the Amalfi Coast and the lakes." },
    { name: "Autumn", when: "September and October", text: "Warm sea, the grape harvest and fewer crowds." },
    { name: "Winter", when: "November to March", text: "Cool and quiet, with Christmas markets and lower prices." },
  ],
  reach: [
    "There are direct flights from Delhi to Milan and Rome on some days of the week, and many one-stop options through the Gulf and Europe, taking around 9 to 12 hours.",
    "Frecciarossa fast trains link Rome, Florence, Venice and Milan, each journey taking between one and a half and four hours. The Amalfi Coast is reached by train to Naples or Salerno, then car or ferry.",
  ],
  entry: {
    title: "Schengen visa for Indian passport holders",
    text: [
      "Italy is in the Schengen area, so Indian citizens need a Schengen visa. If Italy is your main destination, you apply to the Italian mission through its visa centre, with biometrics.",
      "Apply four to eight weeks before travel. We prepare the itinerary, bookings and document checklist.",
    ],
    checklist: [
      "Passport valid for at least 3 months after return",
      "Travel insurance with at least 30,000 euros of medical cover",
      "Flight and hotel bookings",
      "Bank statements, tax returns and employment or business proof",
    ],
  },
  places: [
    { name: "Rome", text: "The Colosseum, Roman Forum, Trevi Fountain, Pantheon and Vatican City." },
    { name: "Florence", text: "The Duomo, the Uffizi Gallery, Michelangelo's David and Ponte Vecchio." },
    { name: "Venice", text: "St Mark's Square, the Grand Canal and the islands of Murano and Burano." },
    { name: "Amalfi Coast", text: "Positano, Amalfi and Ravello on cliffs above the sea, with Capri nearby." },
    { name: "Tuscany", text: "Siena, San Gimignano and the vineyards of Chianti." },
    { name: "Lake Como", text: "Lakeside villas and gardens in the foothills of the Alps." },
  ],
  things: [
    { name: "Vatican Museums", text: "The Sistine Chapel and St Peter's Basilica, best with a guide." },
    { name: "Gondola ride", text: "A slow ride through Venice's smaller canals." },
    { name: "Boat to Capri", text: "The Blue Grotto and a day on the island." },
    { name: "Pisa day trip", text: "The Leaning Tower, an hour from Florence." },
    { name: "Cooking class", text: "Make fresh pasta or pizza with a local chef." },
  ],
  stay: [
    { name: "Rome: near the centre", text: "Walkable to the Pantheon, Trevi and Piazza Navona." },
    { name: "Venice", text: "A night on the island itself, not on the mainland, is worth it." },
    { name: "Amalfi Coast", text: "Sea-view hotels in Positano, Amalfi or Sorrento." },
  ],
  itineraries: [
    { title: "7 nights: Rome, Florence and Venice", days: ["Arrive in Rome", "Colosseum and the old city", "Vatican", "Train to Florence", "Florence and Pisa", "Train to Venice", "Venice islands", "Departure"] },
    { title: "9 nights: Italy with the Amalfi Coast", days: ["Arrive in Rome", "Rome", "Vatican", "To the Amalfi Coast", "Positano and Amalfi", "Capri", "Train to Florence", "Florence", "Venice", "Departure"] },
  ],
  tips: [
    "Book the Colosseum, Vatican and Uffizi in advance.",
    "Cover shoulders and knees when visiting churches.",
    "Validate regional train tickets before boarding.",
    "Watch for pickpockets at busy sights and on public transport.",
  ],
  faqs: [
    { q: "Do Indians need a visa for Italy?", a: "Yes. Italy is in the Schengen area, so Indian citizens need a Schengen visa." },
    { q: "What is the best time to visit Italy?", a: "April to June and September to October, when the weather is warm and crowds are smaller than in midsummer." },
    { q: "How many days are enough for Italy?", a: "Seven nights covers Rome, Florence and Venice. Add three nights for the Amalfi Coast." },
    { q: "Is Italy good for vegetarians?", a: "Very. Pasta, pizza, risotto, salads and gelato make Italy one of the easiest European countries for vegetarians." },
    { q: "Can we combine Italy and Switzerland?", a: "Yes. Milan to Switzerland is a short, scenic train journey." },
  ],
  packageSlugs: [],
};
