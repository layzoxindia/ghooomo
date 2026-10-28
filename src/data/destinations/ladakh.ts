import type { Destination } from "./types";

export const ladakh: Destination = {
  slug: "ladakh",
  name: "Ladakh",
  region: "India",
  country: "India",
  seoTitle: "Ladakh Tour Packages | Leh, Pangong, Nubra Valley",
  metaDescription: "Plan a Ladakh holiday: Leh, Pangong Lake, Nubra valley, Khardung La and monasteries. Best time to visit, entry fees, altitude tips and itineraries.",
  h1: "Ladakh holidays",
  tagline: "High passes, blue lakes, sand dunes and monasteries in the land beyond the Himalayas.",
  hero: { id: "ladakh-pangong", alt: "Pangong Lake below brown mountains" },
  gallery: [{ id: "ladakh-pangong-shore", alt: "Blue water of Pangong Lake under a clear sky" }],
  intro: [
    "Ladakh is a high-altitude desert between the Himalaya and the Karakoram, and one of the most dramatic landscapes in the world. Leh sits at about 3,500 metres, surrounded by monasteries, and from there roads climb over some of the highest passes in the world.",
    "A classic trip includes Nubra valley with its sand dunes and Bactrian camels, Pangong Lake, which changes colour through the day, and the monasteries of Thiksey, Hemis and Diskit.",
    "Altitude is the main thing to plan around. A slow start in Leh is essential, and we build rest days into every itinerary.",
  ],
  facts: [
    { label: "Best time", value: "May to September" },
    { label: "Ideal stay", value: "6 to 8 nights" },
    { label: "Fly into", value: "Leh" },
    { label: "Permits", value: "None for Indians; environment fee applies" },
    { label: "Altitude", value: "Leh about 3,500 m" },
    { label: "Known for", value: "Lakes, passes and monasteries" },
  ],
  goodFor: [
    { t: "Road-trippers", d: "Some of the world's highest motorable passes." },
    { t: "Photographers", d: "Clear light, lakes and night skies." },
    { t: "Couples", d: "Lake-side camps and quiet monastery mornings." },
  ],
  months: ["low", "low", "low", "good", "best", "best", "best", "best", "best", "good", "low", "low"],
  seasons: [
    { name: "Summer", when: "May to September", text: "All main roads open, warm days and cold nights. The main season." },
    { name: "Shoulder", when: "April and October", text: "Fewer visitors and colder weather. Some passes may close briefly." },
    { name: "Winter", when: "November to March", text: "Extremely cold. Leh is reached by air only, and Pangong freezes." },
  ],
  reach: [
    "Leh airport has direct flights from Delhi, Mumbai and other cities. The flight over the Himalayas takes about an hour and a half from Delhi.",
    "By road, Leh is reached from Manali (open roughly June to October) or Srinagar via Zoji La. Both are two-day journeys with an overnight stop.",
  ],
  entry: {
    title: "Permits and planning",
    text: [
      "Indian citizens no longer need an Inner Line Permit for Nubra valley, Pangong Lake, Tso Moriri and the other protected areas. An environment fee and a wildlife fee are still payable, and we arrange them with your itinerary. Foreign nationals need a Protected Area Permit.",
      "Rest for at least 24 to 36 hours in Leh after flying in before travelling to higher areas. Anyone with heart, lung or blood pressure conditions should consult a doctor before travel.",
    ],
    checklist: [
      "Government photo ID for all travellers",
      "Environment and wildlife fees paid",
      "Warm layers, sunglasses and high-SPF sunscreen",
      "Medical advice for high altitude if needed",
    ],
  },
  places: [
    { name: "Leh", text: "Leh Palace, Shanti Stupa and the old town." },
    { name: "Thiksey and Hemis monasteries", text: "Hilltop monasteries near Leh." },
    { name: "Khardung La", text: "A high mountain pass on the road to Nubra." },
    { name: "Nubra valley", text: "Sand dunes at Hunder, Diskit monastery and Bactrian camels." },
    { name: "Pangong Lake", text: "A long, high lake that shifts from blue to turquoise." },
    { name: "Magnetic Hill and Sangam", text: "A stretch of road where cars seem to roll uphill, and the meeting of the Indus and Zanskar rivers." },
  ],
  things: [
    { name: "Camel ride at Hunder", text: "Double-humped camels among the dunes." },
    { name: "Night at Pangong", text: "Lakeside camps and a sky full of stars." },
    { name: "Monastery morning prayers", text: "Join the chants at Thiksey at sunrise." },
    { name: "Rafting on the Zanskar", text: "A summer rafting trip near Leh." },
    { name: "Hall of Fame museum", text: "A tribute to the soldiers who have served in Ladakh." },
  ],
  stay: [
    { name: "Leh", text: "Comfortable hotels and boutique guesthouses with mountain views." },
    { name: "Nubra", text: "Desert camps and lodges in Hunder." },
    { name: "Pangong", text: "Lakeside camps and simple cottages." },
  ],
  itineraries: [
    { title: "6 nights: Leh, Nubra and Pangong", days: ["Fly to Leh, rest", "Leh and nearby monasteries", "Khardung La to Nubra", "Nubra valley", "Nubra to Pangong", "Pangong to Leh", "Departure"] },
  ],
  tips: [
    "Rest on day one, drink plenty of water and avoid alcohol for the first two days.",
    "Only postpaid mobile connections work in Ladakh.",
    "Carry cash; ATMs are limited outside Leh.",
    "Nights are cold even in July. Pack thermals.",
  ],
  faqs: [
    { q: "What is the best time to visit Ladakh?", a: "May to September, when all main roads and passes are open." },
    { q: "Do Indians need a permit for Ladakh?", a: "No. Indian citizens do not need an Inner Line Permit for Ladakh, including Nubra, Pangong and Tso Moriri, but an environment fee and a wildlife fee are payable. Carry a government photo ID for checkposts." },
    { q: "How many days are enough for Ladakh?", a: "Six nights covers Leh, Nubra and Pangong with a rest day." },
    { q: "Is Ladakh safe for senior citizens?", a: "Many older travellers visit safely with gradual acclimatisation and medical advice beforehand." },
    { q: "Does my mobile work in Ladakh?", a: "Only postpaid connections work in Ladakh; prepaid connections from outside the region do not." },
  ],
  packageSlugs: [],
};
