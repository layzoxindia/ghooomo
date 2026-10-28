import type { Destination } from "./types";

export const himachal: Destination = {
  slug: "himachal",
  name: "Himachal Pradesh",
  region: "India",
  country: "India",
  seoTitle: "Himachal Tour Packages | Manali, Shimla, Dharamshala",
  metaDescription: "Plan a Himachal holiday: Manali, Solang, Atal Tunnel, Shimla, Dharamshala and Spiti. Best time to visit, permits, how to reach and itineraries.",
  h1: "Himachal Pradesh holidays",
  tagline: "Snow peaks, apple orchards, pine forests and mountain towns a night's drive from Delhi.",
  hero: { id: "himachal-manali", alt: "Snow-covered mountains above Manali" },
  gallery: [{ id: "himachal-river", alt: "A mountain river below snowy peaks in Himachal" }],
  intro: [
    "Himachal Pradesh is India's favourite mountain escape. Manali has snow at Solang and beyond the Atal Tunnel, Shimla has colonial charm and the toy train, and Dharamshala and McLeod Ganj have Tibetan monasteries with the Dhauladhar range behind them.",
    "For something quieter, choose Kasol and the Parvati valley, the old wooden villages of Kalpa and Sangla in Kinnaur, or the high desert of Spiti.",
    "Himachal works in every season: snow from December to February, cool summers when the plains are hot, and clear autumn skies.",
  ],
  facts: [
    { label: "Best time", value: "March to June, September to February" },
    { label: "Ideal stay", value: "5 to 8 nights" },
    { label: "Fly into", value: "Kullu (Bhuntar), Shimla, Dharamshala or Chandigarh" },
    { label: "Permits", value: "Rohtang Pass permit for vehicles" },
    { label: "Highest road", value: "Atal Tunnel, about 3,000 m" },
    { label: "Known for", value: "Snow, valleys and hill towns" },
  ],
  goodFor: [
    { t: "Couples", d: "Riverside cottages in Manali and orchard stays." },
    { t: "Families", d: "Snow play at Solang, cable cars and the toy train." },
    { t: "Adventure seekers", d: "Paragliding, rafting, skiing and treks." },
  ],
  months: ["good", "good", "good", "best", "best", "best", "low", "low", "good", "best", "best", "good"],
  seasons: [
    { name: "Summer", when: "April to June", text: "Pleasant days in Manali and Shimla, and the high passes begin to open." },
    { name: "Autumn", when: "September to November", text: "Clear skies, apple harvest and golden valleys." },
    { name: "Winter", when: "December to February", text: "Snow in Manali, Solang and Shimla. Some high roads close." },
    { name: "Monsoon", when: "July and August", text: "Heavy rain and landslides; travel only with flexible plans." },
  ],
  reach: [
    "Kullu-Manali's Bhuntar airport, Shimla and Dharamshala (Gaggal) have limited flights from Delhi. Many travellers fly to Chandigarh and drive, or take an overnight Volvo bus or car from Delhi.",
    "Delhi to Manali is about 12 to 14 hours by road, and Chandigarh to Shimla about three to four hours. The Kalka-Shimla toy train is a UNESCO-listed mountain railway.",
  ],
  entry: {
    title: "Permits and planning",
    text: [
      "No permit is needed to visit Himachal. A permit is required for vehicles going to Rohtang Pass, and the number of daily permits is limited. The Atal Tunnel to Lahaul does not need the Rohtang permit.",
      "Some parts of Kinnaur and Spiti near the border need an Inner Line Permit for foreign nationals; Indian citizens carry photo ID. Roads to Spiti and Lahaul can close in winter.",
    ],
    checklist: [
      "Government photo ID for all adults",
      "Rohtang permit if visiting the pass",
      "Warm clothing, even in summer",
      "Snow boots and gloves for winter trips",
    ],
  },
  places: [
    { name: "Manali", text: "Old Manali, the Hadimba temple, Vashisht hot springs and the Mall Road." },
    { name: "Solang and Atal Tunnel", text: "Snow play, a cable car and the road to Sissu in Lahaul." },
    { name: "Shimla", text: "The Ridge, Mall Road, Jakhu temple and day trips to Kufri." },
    { name: "Dharamshala and McLeod Ganj", text: "The Dalai Lama temple, Bhagsu waterfall and Triund trek." },
    { name: "Kasol and Parvati valley", text: "Riverside cafés, the Manikaran gurdwara and forest walks." },
    { name: "Spiti valley", text: "High desert, Key monastery and villages like Kibber and Langza." },
  ],
  things: [
    { name: "Paragliding at Solang or Bir", text: "Bir Billing is one of the world's best paragliding sites." },
    { name: "River rafting on the Beas", text: "Gentle to moderate rapids near Kullu." },
    { name: "Toy train to Shimla", text: "Through tunnels and pine forests." },
    { name: "Skiing", text: "Beginner slopes at Solang in winter." },
    { name: "Monastery visits", text: "Tibetan monasteries in McLeod Ganj and Spiti." },
  ],
  stay: [
    { name: "Manali", text: "Riverside resorts, cottages and boutique hotels in Old Manali." },
    { name: "Shimla", text: "Heritage hotels near the Mall." },
    { name: "Dharamshala", text: "Mountain-view hotels in McLeod Ganj and Dharamkot." },
  ],
  itineraries: [
    { title: "6 nights: Shimla and Manali", days: ["Arrive at Chandigarh, drive to Shimla", "Shimla and Kufri", "Drive to Manali", "Manali sights", "Solang and Atal Tunnel", "Kullu and rafting", "Departure"] },
    { title: "7 nights: Manali, Dharamshala and Bir", days: ["Arrive in Manali", "Manali", "Solang and Sissu", "Drive to Bir", "Paragliding at Bir", "Dharamshala and McLeod Ganj", "Triund or tea gardens", "Departure"] },
  ],
  tips: [
    "Start long mountain drives early to avoid traffic and evening fog.",
    "Snow can block roads suddenly in winter. Keep a spare day.",
    "Carry cash for small villages; ATMs can be far apart.",
    "Respect local rules on plastic and littering in the hills.",
  ],
  faqs: [
    { q: "What is the best time to visit Manali?", a: "March to June for pleasant weather, and December to February for snow." },
    { q: "Do we need a permit for Rohtang Pass?", a: "Yes. Vehicles need a permit for Rohtang Pass, with a daily limit. The Atal Tunnel route to Sissu does not need it." },
    { q: "How many days are enough for Himachal?", a: "Five nights covers Manali or Shimla and Manali. Seven to eight nights lets you add Dharamshala or Kasol." },
    { q: "Where can we see snow in Himachal?", a: "Solang, the Atal Tunnel area, Sissu and Kufri usually have snow from December to March." },
    { q: "How do we reach Manali from Delhi?", a: "By overnight bus or car (12 to 14 hours), or by flight to Bhuntar or Chandigarh and then by road." },
  ],
  packageSlugs: [],
};
