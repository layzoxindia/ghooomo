import type { Destination } from "./types";

export const hongKong: Destination = {
  slug: "hong-kong",
  name: "Hong Kong",
  region: "International",
  country: "Hong Kong",
  seoTitle: "Hong Kong Tour Packages from India | Disneyland & Macau",
  metaDescription: "Plan a Hong Kong holiday from India: Victoria Peak, Disneyland, Ocean Park, Lantau and Macau. Pre-arrival registration for Indians and itineraries.",
  h1: "Hong Kong holidays from India",
  tagline: "A skyline on the water, two theme parks, island ferries and food at every corner.",
  hero: { id: "hongkong-harbour", alt: "Hong Kong skyline and a Star Ferry on Victoria Harbour" },
  gallery: [{ id: "hongkong-ferry", alt: "A ferry crossing Victoria Harbour at dusk" }],
  intro: [
    "Hong Kong is one of the most exciting cities in Asia: skyscrapers rising straight from the harbour, green hills behind them, and old markets and temples between the towers. It is also one of the easiest short holidays from India.",
    "Families come for Hong Kong Disneyland and Ocean Park. Couples come for the views from Victoria Peak, harbour cruises and rooftop dinners. Lantau Island has the Big Buddha and a long cable car ride, and Macau is an hour away by bridge or ferry.",
    "Four or five nights is enough for most trips, and it combines well with Singapore or Thailand.",
  ],
  facts: [
    { label: "Best time", value: "October to December" },
    { label: "Ideal stay", value: "4 to 5 nights" },
    { label: "Flight from Delhi", value: "About 5 hours (direct)" },
    { label: "Visa for Indians", value: "Free pre-arrival registration, 14 days" },
    { label: "Currency", value: "Hong Kong Dollar (HKD)" },
    { label: "Time", value: "2 hours 30 minutes ahead of India" },
  ],
  goodFor: [
    { t: "Families", d: "Disneyland, Ocean Park and easy public transport." },
    { t: "Couples", d: "Harbour views, the Peak and Macau's resorts." },
    { t: "Food lovers", d: "Dim sum, street food and Michelin-starred restaurants." },
  ],
  months: ["good", "good", "good", "good", "good", "low", "low", "low", "good", "best", "best", "best"],
  seasons: [
    { name: "Autumn", when: "October to December", text: "Clear skies, low humidity and comfortable temperatures. The best time to visit." },
    { name: "Spring", when: "March to May", text: "Warm with rising humidity and some fog." },
    { name: "Summer", when: "June to September", text: "Hot, humid and the typhoon season. Indoor attractions are a good backup." },
    { name: "Winter", when: "January and February", text: "Cool and dry. Chinese New Year brings fireworks and crowds." },
  ],
  reach: [
    "There are direct flights to Hong Kong from Delhi, Mumbai and other Indian cities, taking around five hours from Delhi.",
    "The Airport Express train reaches Central in about 25 minutes. The MTR metro, ferries and taxis make getting around easy. Macau is about an hour away by bus over the Hong Kong-Zhuhai-Macao Bridge, or by ferry.",
  ],
  entry: {
    title: "Entry for Indian passport holders",
    text: [
      "Indian nationals must complete Pre-arrival Registration (PAR) online before visiting Hong Kong. It is free, valid for six months, and allows multiple visits of up to 14 days each. Apply online well before you fly and carry the approval slip.",
      "Macau is visa-free for Indian citizens for short stays. If you plan to visit mainland China, a separate Chinese visa is needed.",
    ],
    checklist: [
      "Passport valid for at least 6 months",
      "Printed PAR notification slip",
      "Return ticket and hotel bookings",
      "Same passport used for the PAR",
    ],
  },
  places: [
    { name: "Victoria Peak", text: "Ride the Peak Tram for the classic view over the harbour." },
    { name: "Tsim Sha Tsui", text: "The harbourfront promenade, Avenue of Stars and the nightly light show." },
    { name: "Hong Kong Disneyland", text: "On Lantau Island, with the World of Frozen land." },
    { name: "Ocean Park", text: "Rides, pandas, an aquarium and cable cars over the sea." },
    { name: "Lantau Island", text: "The Ngong Ping cable car, the Big Buddha and Tai O fishing village." },
    { name: "Macau", text: "Portuguese-era streets, the Ruins of St Paul's and resort shows." },
  ],
  things: [
    { name: "Star Ferry ride", text: "A short, cheap crossing with one of the best views in the world." },
    { name: "Symphony of Lights", text: "A free light show across the skyline every evening." },
    { name: "Ngong Ping 360", text: "A 25-minute cable car ride to the Big Buddha." },
    { name: "Dim sum", text: "Plenty of vegetarian options in tea houses." },
    { name: "Markets", text: "The Ladies' Market, Temple Street night market and Stanley Market." },
  ],
  stay: [
    { name: "Tsim Sha Tsui", text: "Harbour-view hotels close to shopping and the MTR." },
    { name: "Central and Admiralty", text: "Business and luxury hotels near the Peak Tram." },
    { name: "Disneyland resort hotels", text: "Themed hotels next to the park, ideal with children." },
  ],
  itineraries: [
    { title: "4 nights: Hong Kong with Disneyland", days: ["Arrive, harbour and Symphony of Lights", "Victoria Peak and city tour", "Disneyland", "Lantau and the Big Buddha", "Departure"] },
    { title: "5 nights: Hong Kong and Macau", days: ["Arrive in Hong Kong", "City tour and the Peak", "Ocean Park", "Macau", "Lantau Island", "Departure"] },
  ],
  tips: [
    "Get an Octopus card for the MTR, buses, ferries and many shops.",
    "Apply for PAR early; it can take time during busy periods.",
    "Check the typhoon forecast if travelling between June and September.",
    "Walk a lot: the city is compact and full of escalators and footbridges.",
  ],
  faqs: [
    { q: "Do Indians need a visa for Hong Kong?", a: "Indian nationals do not need a visa for short visits but must complete the free online Pre-arrival Registration (PAR), which allows stays of up to 14 days per visit for six months." },
    { q: "What is the best time to visit Hong Kong?", a: "October to December, when the weather is clear and comfortable." },
    { q: "How many days are enough for Hong Kong?", a: "Four nights covers the city and Disneyland. Five nights lets you add Macau." },
    { q: "Do Indians need a visa for Macau?", a: "Indian citizens can visit Macau visa-free for short stays." },
    { q: "Is Hong Kong good for families?", a: "Yes. Two theme parks, easy transport and plenty of child-friendly hotels make it a great family trip." },
  ],
  packageSlugs: [],
};
