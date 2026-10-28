import type { Destination } from "./types";

export const egypt: Destination = {
  slug: "egypt",
  name: "Egypt",
  region: "International",
  country: "Egypt",
  seoTitle: "Egypt Tour Packages from India | Pyramids & Nile Cruise",
  metaDescription: "Plan an Egypt holiday from India: the Pyramids of Giza, a Nile cruise, Luxor, Aswan and Abu Simbel. E-visa for Indians, best time and itineraries.",
  h1: "Egypt holidays from India",
  tagline: "The Pyramids, the Nile and 5,000 years of history, best seen from the deck of a river cruise.",
  hero: { id: "egypt-giza", alt: "The Pyramids of Giza in the desert" },
  gallery: [{ id: "egypt-khafre", alt: "The Pyramid of Khafre under a blue sky" }],
  intro: [
    "Egypt is one of the great journeys of a lifetime. You stand in front of the Pyramids of Giza, walk through the temples of Karnak and Luxor, and sail the Nile past villages and palm groves, much as travellers have done for centuries.",
    "The classic trip combines Cairo with a three or four night Nile cruise between Luxor and Aswan, and an early morning visit to Abu Simbel. The new Grand Egyptian Museum near Giza now houses the treasures of Tutankhamun.",
    "With a few extra days, add the Red Sea coast at Hurghada or Sharm El Sheikh for snorkelling and beach time.",
  ],
  facts: [
    { label: "Best time", value: "October to April" },
    { label: "Ideal stay", value: "7 to 9 nights" },
    { label: "Flight from India", value: "About 6 to 7 hours to Cairo (direct)" },
    { label: "Visa for Indians", value: "E-visa, up to 30 days" },
    { label: "Currency", value: "Egyptian Pound (EGP)" },
    { label: "Time", value: "2 hours 30 minutes to 3 hours 30 minutes behind India" },
  ],
  goodFor: [
    { t: "History lovers", d: "Pyramids, tombs and temples at every stop." },
    { t: "Families", d: "A Nile cruise keeps sightseeing easy for children and grandparents." },
    { t: "Couples", d: "Sunset felucca rides and Red Sea resorts." },
  ],
  months: ["best", "best", "best", "good", "low", "low", "low", "low", "good", "best", "best", "best"],
  seasons: [
    { name: "Winter", when: "October to April", text: "Warm, sunny days and cool evenings. The best time for sightseeing and Nile cruises." },
    { name: "Summer", when: "May to September", text: "Very hot in Luxor and Aswan. Sightseeing is done early in the morning." },
  ],
  reach: [
    "EgyptAir and other airlines fly direct from Delhi and Mumbai to Cairo, taking about six to seven hours. One-stop routes through the Gulf are also available.",
    "Within Egypt, short flights connect Cairo with Luxor, Aswan and the Red Sea. Abu Simbel is reached by a three-hour drive from Aswan or a short flight.",
  ],
  entry: {
    title: "Visa for Indian passport holders",
    text: [
      "Indian citizens can apply online for an Egypt e-visa before travel. A single-entry e-visa allows a stay of up to 30 days. Apply at least a week before you fly.",
      "Visa on arrival is available to Indians only in specific cases, for example if you hold a valid US, UK or Schengen visa. We confirm which option applies to you.",
    ],
    checklist: [
      "Passport valid for at least 6 months",
      "Approved e-visa",
      "Return ticket and hotel or cruise bookings",
      "Travel insurance",
    ],
  },
  places: [
    { name: "Cairo and Giza", text: "The Pyramids and Sphinx, the Grand Egyptian Museum and Khan el-Khalili bazaar." },
    { name: "Luxor", text: "Karnak and Luxor temples, the Valley of the Kings and Hatshepsut's temple." },
    { name: "Aswan", text: "Philae temple, the High Dam and felucca rides past Elephantine Island." },
    { name: "Abu Simbel", text: "Ramesses II's giant rock temples on the shore of Lake Nasser." },
    { name: "Edfu and Kom Ombo", text: "Riverside temples visited from the Nile cruise." },
    { name: "Hurghada", text: "Red Sea beaches, coral reefs and snorkelling trips." },
  ],
  things: [
    { name: "Nile cruise", text: "Three or four nights between Luxor and Aswan with guided temple visits." },
    { name: "Hot-air balloon over Luxor", text: "Sunrise views over the temples and the West Bank." },
    { name: "Sound and light show", text: "Evening shows at the Pyramids or Karnak." },
    { name: "Felucca sail", text: "A traditional sailboat on the Nile at sunset in Aswan." },
    { name: "Snorkelling in the Red Sea", text: "Some of the richest coral reefs in the world." },
  ],
  stay: [
    { name: "Giza", text: "Hotels with pyramid views, close to the Grand Egyptian Museum." },
    { name: "Nile cruise ship", text: "Choose a five-star ship for comfort and good guides." },
    { name: "Red Sea resorts", text: "Beach resorts in Hurghada or Sharm El Sheikh." },
  ],
  itineraries: [
    { title: "7 nights: Cairo and the Nile", days: ["Arrive in Cairo", "Pyramids, Sphinx and Grand Egyptian Museum", "Fly to Luxor, board cruise", "Valley of the Kings", "Edfu and Kom Ombo", "Aswan and Philae", "Abu Simbel, fly to Cairo", "Departure"] },
  ],
  tips: [
    "Start sightseeing early; temples are cooler and quieter in the morning.",
    "Carry small notes for tips, which are customary across Egypt.",
    "Dress modestly in mosques and old Cairo.",
    "Drink bottled water and carry sunscreen and a hat.",
  ],
  faqs: [
    { q: "Do Indians need a visa for Egypt?", a: "Yes. Indian citizens can apply online for an e-visa, which allows a stay of up to 30 days. Visa on arrival is available only in specific cases." },
    { q: "What is the best time to visit Egypt?", a: "October to April, when days are warm rather than very hot." },
    { q: "How many days are enough for Egypt?", a: "Seven nights covers Cairo and a Nile cruise. Add three nights for the Red Sea." },
    { q: "Is a Nile cruise worth it?", a: "Yes. It is the most comfortable way to see the temples between Luxor and Aswan, with guides and meals included." },
    { q: "Is vegetarian food available in Egypt?", a: "Yes. Dishes like koshari, falafel, lentil soup and mezze are vegetarian, and Indian restaurants operate in Cairo." },
  ],
  packageSlugs: [],
};
