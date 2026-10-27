import type { Segment } from "@/lib/site";

export type Photo = { id: number; alt: string };
export type Day = { title: string; desc: string };

export type TravelPackage = {
  slug: string;
  title: string;
  segment: Segment;
  region: "India" | "International";
  destination: string;
  route: string;
  nights: number;
  days: number;
  price: number;
  priceBasis: string;
  startCity: string;
  bestTime: string;
  pace: string;
  summary: string;
  highlights: string[];
  itinerary: Day[];
  inclusions: string[];
  exclusions: string[];
  photos: Photo[];
};

export const packages: TravelPackage[] = [
  {
    slug: "spiti-valley-circuit",
    title: "Spiti Valley Circuit",
    segment: "solo",
    region: "India",
    destination: "Himachal Pradesh",
    route: "Delhi → Shimla → Kalpa → Kaza → Chandratal → Manali → Delhi",
    nights: 6,
    days: 7,
    price: 16999,
    priceBasis: "per person · triple sharing · ex-Delhi",
    startCity: "Delhi",
    bestTime: "May – October",
    pace: "Moderate · high altitude",
    summary:
      "The full Spiti loop in a small batch of solo travellers — monasteries on cliffs, fossil villages and a night by the moon lake, with a trip captain on the road.",
    highlights: ["Key Monastery & Kibber", "Chicham bridge, Asia’s highest", "Langza, Hikkim & Komic", "Camping at Chandratal lake"],
    itinerary: [
      { title: "Delhi → Shimla (overnight)", desc: "Evening departure from Delhi by tempo traveller. Meet your batch and trip captain." },
      { title: "Shimla → Kalpa", desc: "Drive along the Sutlej through Kinnaur. Sunset over the Kinner Kailash range from Kalpa." },
      { title: "Kalpa → Kaza", desc: "Via Nako lake and the Gue mummy. A long drive with big views and regular rest stops." },
      { title: "Key, Kibber & Chicham", desc: "Key Monastery, Kibber village and the Chicham suspension bridge. Homestay dinner in Kaza." },
      { title: "Langza, Hikkim & Komic", desc: "The Buddha of Langza, the world’s highest post office at Hikkim and Komic village." },
      { title: "Kaza → Chandratal", desc: "Over Kunzum Pass to the moon lake. Night in camps under a clear sky." },
      { title: "Chandratal → Manali → Delhi", desc: "Cross Atal Tunnel into Manali, lunch break, and overnight return to Delhi." },
    ],
    inclusions: [
      "Tempo traveller from Delhi and back",
      "5 nights stay: hotels, homestays and camps (triple sharing)",
      "Breakfast and dinner daily",
      "Trip captain throughout the journey",
      "Inner line permits and driver allowances",
    ],
    exclusions: ["Lunch and snacks", "Monument and entry fees", "Personal expenses and tips", "Travel insurance", "Anything not listed above"],
    photos: [
      { id: 38056503, alt: "Key Monastery in Spiti Valley under a blue sky" },
      { id: 38041591, alt: "Spiti Valley with a winding river and rugged mountains" },
      { id: 31346694, alt: "Kibber village in the snowy mountains of Spiti" },
      { id: 24532212, alt: "Chicham village houses in Spiti, Himachal Pradesh" },
    ],
  },
  {
    slug: "ladakh-leh-nubra-pangong",
    title: "Ladakh: Leh, Nubra & Pangong",
    segment: "solo",
    region: "India",
    destination: "Ladakh",
    route: "Leh → Nubra Valley → Pangong Tso → Leh",
    nights: 6,
    days: 7,
    price: 22999,
    priceBasis: "per person · twin sharing · ex-Leh",
    startCity: "Leh airport",
    bestTime: "May – September",
    pace: "Moderate · acclimatisation built in",
    summary:
      "Two easy days in Leh to acclimatise, then over Khardung La to the dunes of Nubra and a night beside the blue of Pangong.",
    highlights: ["Khardung La pass", "Hunder sand dunes & Diskit", "A night at Pangong Tso", "Thiksey & Shey monasteries"],
    itinerary: [
      { title: "Arrive in Leh", desc: "Airport pickup and full rest to acclimatise. Short evening walk to the Leh market." },
      { title: "Leh local sightseeing", desc: "Shanti Stupa, Leh Palace, Hall of Fame and the Sangam of the Indus and Zanskar." },
      { title: "Leh → Nubra Valley", desc: "Over Khardung La. Diskit Monastery and the Hunder sand dunes at sunset." },
      { title: "Nubra → Pangong Tso", desc: "Via the Shyok river road to Pangong. Overnight in lakeside camps." },
      { title: "Pangong → Leh", desc: "Sunrise at the lake, then back over Chang La with stops at Thiksey and Shey." },
      { title: "Free day in Leh", desc: "Café hopping, shopping or an optional river-rafting session on the Zanskar." },
      { title: "Departure", desc: "Drop at Leh airport." },
    ],
    inclusions: [
      "6 nights stay: hotels in Leh, camps in Nubra and Pangong (twin sharing)",
      "Breakfast and dinner daily",
      "Shared SUV for all transfers and sightseeing",
      "Inner line permits and environment fees",
      "Airport pickup and drop",
    ],
    exclusions: ["Flights to and from Leh", "Lunch", "Camel ride and rafting", "Monument entry fees", "Travel insurance"],
    photos: [
      { id: 18014641, alt: "Pangong Tso lake in Ladakh" },
      { id: 26870963, alt: "Wide view of Pangong Tso and the mountains" },
    ],
  },
  {
    slug: "meghalaya-living-roots",
    title: "Meghalaya Living Roots",
    segment: "solo",
    region: "India",
    destination: "Meghalaya",
    route: "Guwahati → Shillong → Cherrapunji → Dawki → Shillong → Guwahati",
    nights: 5,
    days: 6,
    price: 18999,
    priceBasis: "per person · twin sharing · shared cab",
    startCity: "Guwahati",
    bestTime: "October – May",
    pace: "Easy to moderate · one trek",
    summary:
      "Waterfalls, caves and the double-decker living root bridge — Meghalaya at a slow pace with a small group of solo travellers.",
    highlights: ["Double-decker root bridge trek", "Umngot river at Dawki", "Mawlynnong village", "Seven Sisters falls"],
    itinerary: [
      { title: "Guwahati → Shillong", desc: "Pickup from Guwahati. Stop at Umiam lake, evening at Police Bazaar." },
      { title: "Shillong → Cherrapunji", desc: "Elephant Falls, Mawkdok valley, Seven Sisters falls and Mawsmai cave." },
      { title: "Double-decker root bridge", desc: "Trek down to Nongriat’s living root bridge and natural pools. Return to Cherrapunji." },
      { title: "Mawlynnong & Dawki", desc: "Asia’s cleanest village and boating on the clear Umngot river. Overnight in Shillong." },
      { title: "Shillong at leisure", desc: "Laitlum canyons in the morning, cafés and markets in the afternoon." },
      { title: "Departure", desc: "Drop at Guwahati airport or railway station." },
    ],
    inclusions: [
      "5 nights stay in hotels and homestays (twin sharing)",
      "Breakfast daily",
      "Shared cab for all transfers and sightseeing",
      "Local guide for the root bridge trek",
      "Parking, tolls and driver allowances",
    ],
    exclusions: ["Flights or train to Guwahati", "Lunch and dinner", "Boating and entry fees", "Personal expenses", "Travel insurance"],
    photos: [{ id: 34182421, alt: "Living root bridge in Meghalaya" }],
  },
  {
    slug: "andaman-havelock-neil",
    title: "Andaman: Havelock & Neil",
    segment: "couple",
    region: "India",
    destination: "Andaman Islands",
    route: "Port Blair → Havelock → Neil → Port Blair",
    nights: 5,
    days: 6,
    price: 15999,
    priceBasis: "per person · twin sharing · 3★ stays",
    startCity: "Port Blair airport",
    bestTime: "October – May",
    pace: "Easy · beach days",
    summary:
      "White sand, glass-clear water and long sunsets — Radhanagar beach, a coral walk at Neil and two quiet nights on Havelock.",
    highlights: ["Radhanagar beach sunset", "Elephant beach snorkelling", "Natural bridge at Neil", "Cellular Jail light show"],
    itinerary: [
      { title: "Arrive Port Blair", desc: "Airport pickup, Corbyn’s Cove beach and the Cellular Jail light & sound show." },
      { title: "Port Blair → Havelock", desc: "Morning ferry to Havelock. Sunset at Radhanagar beach." },
      { title: "Elephant beach", desc: "Boat to Elephant beach for snorkelling and glass-bottom rides. Evening at leisure." },
      { title: "Havelock → Neil", desc: "Ferry to Neil. Bharatpur beach, Laxmanpur sunset and the natural rock bridge." },
      { title: "Neil → Port Blair", desc: "Ferry back to Port Blair. Evening shopping at Aberdeen Bazaar." },
      { title: "Departure", desc: "Drop at Port Blair airport." },
    ],
    inclusions: [
      "5 nights stay in 3★ hotels (twin sharing)",
      "Breakfast daily",
      "Private cab for transfers and sightseeing",
      "Ferry tickets between islands",
      "Elephant beach boat transfer and entry permits",
    ],
    exclusions: ["Flights to Port Blair", "Lunch and dinner", "Scuba diving and water sports", "Light show tickets", "Travel insurance"],
    photos: [
      { id: 32959235, alt: "Coconut on a beach on Havelock Island, Andaman" },
      { id: 29175703, alt: "Tropical beach in the Andaman Islands" },
      { id: 37949154, alt: "Aerial view of Jolly Buoy Island, Andaman" },
    ],
  },
  {
    slug: "bali-ubud-nusa-dua",
    title: "Bali: Ubud & Nusa Dua",
    segment: "couple",
    region: "International",
    destination: "Bali, Indonesia",
    route: "Ubud (3 nights) → Nusa Dua (3 nights)",
    nights: 6,
    days: 7,
    price: 24499,
    priceBasis: "per person · twin sharing · land only",
    startCity: "Bali (Denpasar) airport",
    bestTime: "April – October",
    pace: "Easy · couple-paced",
    summary:
      "Rice terraces and jungle swings in Ubud, then a beach resort in Nusa Dua — private transfers, a candlelight dinner and nothing to rush.",
    highlights: ["Tegallalang rice terraces", "Bali jungle swing", "Uluwatu temple sunset", "Candlelight dinner on the beach"],
    itinerary: [
      { title: "Arrive in Bali → Ubud", desc: "Private airport pickup and check-in to your Ubud stay." },
      { title: "Ubud highlights", desc: "Tegallalang rice terraces, a jungle swing and Tegenungan waterfall." },
      { title: "Kintamani & coffee", desc: "Mount Batur views, a coffee plantation visit and Tirta Empul water temple." },
      { title: "Ubud → Nusa Dua", desc: "Transfer to your beach resort. Afternoon by the pool." },
      { title: "Uluwatu", desc: "Clifftop Uluwatu temple and the Kecak fire dance at sunset, followed by a candlelight dinner." },
      { title: "Beach day", desc: "Free day for water sports, spa or simply the beach." },
      { title: "Departure", desc: "Private drop at Bali airport." },
    ],
    inclusions: [
      "6 nights stay: 3 in Ubud, 3 in Nusa Dua (twin sharing)",
      "Daily breakfast and one candlelight dinner",
      "Private airport transfers and sightseeing",
      "Jungle swing and temple entry tickets",
      "Honeymoon room decor on request",
    ],
    exclusions: ["International flights", "Indonesia visa on arrival", "Lunch and other dinners", "Water sports and spa", "Travel insurance"],
    photos: [
      { id: 36965361, alt: "Aerial view of Tegallalang rice terraces in Bali" },
      { id: 35720624, alt: "Swing above Bali rice terraces" },
      { id: 29655839, alt: "Bali rice terrace with palm trees" },
    ],
  },
  {
    slug: "kerala-munnar-thekkady-alleppey",
    title: "Kerala: Munnar, Thekkady & Alleppey",
    segment: "couple",
    region: "India",
    destination: "Kerala",
    route: "Kochi → Munnar → Thekkady → Alleppey → Kochi",
    nights: 5,
    days: 6,
    price: 11999,
    priceBasis: "per person · twin sharing · ex-Kochi",
    startCity: "Kochi",
    bestTime: "September – March",
    pace: "Easy",
    summary:
      "Misty tea hills, a spice-scented jungle and a night on a private houseboat on the backwaters — Kerala as it should be done for two.",
    highlights: ["Munnar tea gardens", "Periyar lake & spice walk", "Private houseboat night", "Fort Kochi evening"],
    itinerary: [
      { title: "Kochi → Munnar", desc: "Pickup from Kochi. Cheeyappara and Valara waterfalls on the way up to the tea hills." },
      { title: "Munnar", desc: "Eravikulam National Park, Mattupetty dam, Echo Point and the tea museum." },
      { title: "Munnar → Thekkady", desc: "Drive through cardamom country. Spice plantation walk in the evening." },
      { title: "Thekkady → Alleppey", desc: "Board your private houseboat on the backwaters. All meals on board." },
      { title: "Alleppey → Kochi", desc: "Fort Kochi, Chinese fishing nets and Jew Town by evening." },
      { title: "Departure", desc: "Drop at Kochi airport or railway station." },
    ],
    inclusions: [
      "4 nights hotels and 1 night private houseboat (twin sharing)",
      "Daily breakfast; all meals on the houseboat",
      "Private cab for all transfers and sightseeing",
      "Driver allowances, tolls and parking",
      "Honeymoon cake and flower decor on request",
    ],
    exclusions: ["Flights or train to Kochi", "Lunch and dinner (except houseboat)", "Entry tickets and boating", "Personal expenses", "Travel insurance"],
    photos: [
      { id: 34489429, alt: "Traditional houseboat on the Alappuzha backwaters, Kerala" },
      { id: 32262521, alt: "Aerial view of tea plantations in Kerala" },
      { id: 14479189, alt: "Sunset over the Kuttanad backwaters" },
    ],
  },
  {
    slug: "maldives-resort-escape",
    title: "Maldives Resort Escape",
    segment: "couple",
    region: "International",
    destination: "Maldives",
    route: "Malé → island resort → Malé",
    nights: 3,
    days: 4,
    price: 29499,
    priceBasis: "per person · twin sharing · 4★ resort · land only",
    startCity: "Malé airport",
    bestTime: "November – April",
    pace: "Easy · resort stay",
    summary:
      "Three nights on a private island resort with speedboat transfers, sunset views and the clearest water you will ever swim in.",
    highlights: ["Speedboat to your island", "House-reef snorkelling", "Sunset from the jetty", "Upgrade to a water villa"],
    itinerary: [
      { title: "Arrive Malé → resort", desc: "Met at Malé airport and transferred by speedboat to your island resort." },
      { title: "Island day", desc: "Snorkel the house reef, kayak in the lagoon, or just do nothing at all." },
      { title: "Your way", desc: "Optional sandbank picnic, dolphin cruise or couple spa — your planner books it." },
      { title: "Departure", desc: "Breakfast and speedboat transfer back to Malé airport." },
    ],
    inclusions: [
      "3 nights in a 4★ island resort, beach villa (twin sharing)",
      "Breakfast and dinner daily",
      "Return shared speedboat transfers",
      "Maldives green tax and service charges",
      "Water villa upgrade on request (extra)",
    ],
    exclusions: ["International flights", "Lunch and drinks", "Excursions and spa", "Seaplane transfers", "Travel insurance"],
    photos: [
      { id: 28843922, alt: "Overwater villas at dusk in the Maldives" },
      { id: 28843928, alt: "Aerial view of Maldivian overwater bungalows" },
      { id: 28843966, alt: "Luxury water villa in the Maldives" },
    ],
  },
  {
    slug: "goa-gang-trip",
    title: "Goa Gang Trip",
    segment: "group",
    region: "India",
    destination: "Goa",
    route: "North Goa → South Goa",
    nights: 3,
    days: 4,
    price: 4799,
    priceBasis: "per person · quad sharing · min 6 people",
    startCity: "Goa airport or railway station",
    bestTime: "October – March",
    pace: "Easy · party-friendly",
    summary:
      "Three nights near the North Goa beaches with both coast tours sorted — you bring the gang, we handle the stay and the wheels.",
    highlights: ["Baga, Anjuna & Vagator", "Fort Aguada & Chapora", "Old Goa churches", "Mandovi river cruise (add-on)"],
    itinerary: [
      { title: "Arrive in Goa", desc: "Pickup from airport or station and check-in near Calangute–Baga. Evening free." },
      { title: "North Goa", desc: "Fort Aguada, Sinquerim, Baga, Anjuna and Vagator beaches, Chapora fort at sunset." },
      { title: "South Goa", desc: "Old Goa churches, Panjim, Miramar beach and Dona Paula jetty." },
      { title: "Departure", desc: "Breakfast, check-out and drop to airport or station." },
    ],
    inclusions: [
      "3 nights stay near Calangute–Baga (quad sharing)",
      "Breakfast daily",
      "AC coach for North and South Goa tours",
      "Airport or station pickup and drop",
      "Group coordinator on WhatsApp",
    ],
    exclusions: ["Travel to Goa", "Lunch and dinner", "Water sports and river cruise", "Club entry", "Personal expenses"],
    photos: [
      { id: 28550376, alt: "Aerial view of Chapora beach, Goa" },
      { id: 37940208, alt: "Anjuna beach with palm trees, Goa" },
      { id: 30441277, alt: "Beach hut on the shore of Kola beach, Goa" },
    ],
  },
  {
    slug: "manali-kasol-volvo",
    title: "Manali & Kasol by Volvo",
    segment: "group",
    region: "India",
    destination: "Himachal Pradesh",
    route: "Delhi → Manali → Solang → Kasol → Delhi",
    nights: 4,
    days: 5,
    price: 9999,
    priceBasis: "per person · triple sharing · ex-Delhi",
    startCity: "Delhi",
    bestTime: "All year (snow: Dec – Feb)",
    pace: "Easy",
    summary:
      "Overnight Volvo both ways, two nights in Manali with Solang valley and a riverside night in Kasol — the classic gang trip from Delhi.",
    highlights: ["Solang valley & Atal Tunnel", "Old Manali cafés", "Riverside camp in Kasol", "Manikaran gurudwara"],
    itinerary: [
      { title: "Delhi → Manali (overnight Volvo)", desc: "Evening Volvo departure from Delhi." },
      { title: "Manali", desc: "Check-in. Hadimba temple, Vashisht hot springs and Old Manali in the evening." },
      { title: "Solang valley", desc: "Solang valley and Atal Tunnel (Sissu) — snow in winter, paragliding in summer." },
      { title: "Manali → Kasol", desc: "Drive to Parvati valley. Manikaran gurudwara, riverside camp and bonfire in Kasol." },
      { title: "Kasol → Delhi (overnight Volvo)", desc: "Morning at leisure, evening Volvo back to Delhi." },
    ],
    inclusions: [
      "Return Volvo seats Delhi–Manali–Delhi",
      "2 nights Manali hotel and 1 night Kasol camp (triple sharing)",
      "Breakfast and dinner daily",
      "Sightseeing by tempo traveller",
      "Bonfire night in Kasol",
    ],
    exclusions: ["Lunch", "Paragliding and snow activities", "Rohtang permit", "Personal expenses", "Travel insurance"],
    photos: [
      { id: 29494184, alt: "Manali mountains and the Beas river" },
      { id: 29494585, alt: "River view in Kasol, Parvati valley" },
      { id: 28206557, alt: "Manali village with prayer flags and the Himalayas" },
    ],
  },
  {
    slug: "phuket-krabi",
    title: "Phuket & Krabi",
    segment: "group",
    region: "International",
    destination: "Thailand",
    route: "Phuket (3 nights) → Krabi (2 nights)",
    nights: 5,
    days: 6,
    price: 59999,
    priceBasis: "per person · twin sharing · with flights ex-Delhi",
    startCity: "Delhi",
    bestTime: "November – April",
    pace: "Easy · island hopping",
    summary:
      "Phi Phi island, the four islands of Krabi and Patong nights — with return flights from Delhi, so the whole group just shows up at the airport.",
    highlights: ["Phi Phi & Maya Bay", "Krabi four-island tour", "Big Buddha & old town", "Patong beach nights"],
    itinerary: [
      { title: "Fly to Phuket", desc: "Arrive in Phuket, transfer to your hotel. Evening on Patong beach." },
      { title: "Phi Phi islands", desc: "Full-day speedboat tour: Maya Bay, Pileh lagoon and snorkelling. Lunch on the tour." },
      { title: "Phuket city tour", desc: "Big Buddha, Wat Chalong, old Phuket town and Karon viewpoint." },
      { title: "Phuket → Krabi", desc: "Road transfer to Krabi. Ao Nang beach in the evening." },
      { title: "Four-island tour", desc: "Longtail boat to Koh Poda, Chicken island, Tup island and Phra Nang cave." },
      { title: "Fly home", desc: "Transfer to Krabi or Phuket airport for your flight to Delhi." },
    ],
    inclusions: [
      "Return economy flights from Delhi",
      "5 nights in 3★ hotels (twin sharing)",
      "Daily breakfast",
      "Phi Phi and four-island tours with lunch",
      "All transfers in Thailand",
    ],
    exclusions: ["Thailand visa (if applicable)", "National park fees", "Lunch and dinner on other days", "Personal expenses", "Travel insurance"],
    photos: [{ id: 37292541, alt: "Limestone cliffs and sea in Krabi, Thailand" }],
  },
];

export function getPackage(slug: string) {
  return packages.find((p) => p.slug === slug);
}

export function bySegment(segment: Segment) {
  return packages.filter((p) => p.segment === segment);
}
