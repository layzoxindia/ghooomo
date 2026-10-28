import type { Destination } from "./types";

export const newZealand: Destination = {
  slug: "new-zealand",
  name: "New Zealand",
  region: "International",
  country: "New Zealand",
  seoTitle: "New Zealand Tour Packages from India | Queenstown",
  metaDescription: "Plan a New Zealand holiday from India: Auckland, Rotorua, Queenstown and Milford Sound. Visitor visa help, best time to visit and itineraries.",
  h1: "New Zealand holidays from India",
  tagline: "Fiords, glaciers, lakes and mountains, with adventure around every bend in the road.",
  hero: { id: "nz-milford", alt: "Mitre Peak reflected in the water at Milford Sound" },
  gallery: [{ id: "nz-waterfall", alt: "Waterfall dropping into Milford Sound" }],
  intro: [
    "New Zealand is made for scenic journeys. In the North Island you will find Auckland, the geothermal pools of Rotorua and Hobbiton. The South Island has Queenstown, the glaciers of the west coast and the fiords of Milford Sound.",
    "It suits couples looking for a long, slow honeymoon, families who love the outdoors, and adventurous travellers who want to bungy jump, jet boat or ski.",
    "Most holidays fly into Auckland and out of Queenstown or Christchurch, with domestic flights or a self-drive in between.",
  ],
  facts: [
    { label: "Best time", value: "October to April" },
    { label: "Ideal stay", value: "10 to 14 nights" },
    { label: "Flight from India", value: "About 16 to 20 hours, one stop" },
    { label: "Visa for Indians", value: "Visitor visa (online)" },
    { label: "Currency", value: "New Zealand Dollar (NZD)" },
    { label: "Time", value: "6 hours 30 minutes to 7 hours 30 minutes ahead of India" },
  ],
  goodFor: [
    { t: "Honeymoons", d: "Lake-view lodges, scenic flights and long drives." },
    { t: "Families", d: "Hobbiton, geothermal parks and farm visits." },
    { t: "Adventure seekers", d: "Bungy, jet boats, skydiving and skiing." },
  ],
  months: ["best", "best", "best", "good", "good", "good", "good", "good", "good", "best", "best", "best"],
  seasons: [
    { name: "Summer", when: "December to February", text: "Long days and warm weather. Peak season for road trips and lake activities." },
    { name: "Autumn", when: "March to May", text: "Golden colours around Queenstown and Wanaka." },
    { name: "Winter", when: "June to August", text: "Snow and skiing near Queenstown. Some mountain roads can close." },
    { name: "Spring", when: "September to November", text: "Fresh green landscapes, waterfalls at their fullest and fewer crowds." },
  ],
  reach: [
    "Flights from India to Auckland usually connect through Singapore, Kuala Lumpur, Hong Kong, Sydney or the Gulf, taking around 16 to 20 hours in total.",
    "Between the islands, domestic flights connect Auckland with Queenstown and Christchurch. Many travellers self-drive on the South Island; an International Driving Permit is recommended alongside your Indian licence.",
  ],
  entry: {
    title: "Visa for Indian passport holders",
    text: [
      "Indian citizens need a New Zealand Visitor visa, applied for online. Processing times vary by season, so apply at least six to eight weeks before travel.",
      "You will need financial documents, a confirmed itinerary and return flights. We prepare the documents and checklist with you.",
    ],
    checklist: [
      "Passport valid for at least 3 months after departure",
      "Approved Visitor visa",
      "Bank statements and income proof",
      "Travel insurance",
    ],
  },
  places: [
    { name: "Auckland", text: "The harbour, Sky Tower and nearby Waiheke Island." },
    { name: "Rotorua", text: "Geysers, mud pools, Māori cultural evenings and Hobbiton nearby." },
    { name: "Queenstown", text: "The adventure capital, on Lake Wakatipu below the Remarkables." },
    { name: "Milford Sound", text: "A fiord of sheer cliffs and waterfalls, by cruise or scenic flight." },
    { name: "Franz Josef and Fox Glaciers", text: "Glacier walks and helicopter landings on the ice." },
    { name: "Lake Tekapo", text: "Turquoise water, lupins in spring and dark-sky stargazing." },
  ],
  things: [
    { name: "Milford Sound cruise", text: "Two hours past waterfalls, seals and dolphins." },
    { name: "Hobbiton movie set", text: "The village from the films, near Matamata." },
    { name: "Bungy jump", text: "The original Kawarau Bridge bungy near Queenstown." },
    { name: "Glacier helicopter flight", text: "Land on the snow high above the west coast." },
    { name: "Shotover jet boat", text: "A fast ride through narrow canyons." },
  ],
  stay: [
    { name: "Queenstown", text: "Lake-view hotels and lodges close to town." },
    { name: "Rotorua", text: "Lakeside hotels near the geothermal parks." },
    { name: "Lake Tekapo and Wanaka", text: "Quiet lodges for stargazing and slow mornings." },
  ],
  itineraries: [
    { title: "10 nights: North and South Island", days: ["Arrive in Auckland", "Hobbiton, drive to Rotorua", "Rotorua", "Fly to Queenstown", "Queenstown adventures", "Milford Sound", "Wanaka", "Franz Josef Glacier", "Lake Tekapo", "Christchurch", "Departure"] },
  ],
  tips: [
    "New Zealand has strict biosecurity rules. Declare all food and clean hiking shoes before you fly.",
    "Driving is on the left, as in India, but roads are winding. Allow extra time.",
    "Weather changes quickly in the mountains. Always carry a warm layer.",
    "Book Milford Sound and glacier flights with flexible dates in case of weather.",
  ],
  faqs: [
    { q: "Do Indians need a visa for New Zealand?", a: "Yes. Indian citizens apply online for a Visitor visa. Apply at least six to eight weeks before travel." },
    { q: "What is the best time to visit New Zealand?", a: "October to April for road trips and outdoor activities; June to August for snow and skiing." },
    { q: "How many days are enough for New Zealand?", a: "Ten nights covers the highlights of both islands. Fourteen nights is more relaxed." },
    { q: "Can Indians drive in New Zealand?", a: "Yes. You can drive with a valid Indian licence in English, and an International Driving Permit is recommended." },
    { q: "Is New Zealand good for a honeymoon?", a: "Yes. Scenic drives, lake-view lodges and helicopter flights make it one of the most romantic long-haul trips." },
  ],
  packageSlugs: [],
};
