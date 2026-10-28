import type { Destination } from "./types";

export const agra: Destination = {
  slug: "agra",
  name: "Agra",
  region: "India",
  country: "India",
  seoTitle: "Agra Tour Packages | Taj Mahal and Golden Triangle",
  metaDescription: "Plan an Agra holiday: the Taj Mahal at sunrise, Agra Fort, Fatehpur Sikri and the Golden Triangle with Delhi and Jaipur. Best time and itineraries.",
  h1: "Agra and Taj Mahal holidays",
  tagline: "The Taj Mahal at sunrise, Mughal forts and the classic Golden Triangle.",
  hero: { id: "agra-taj-mahal", alt: "The Taj Mahal and its reflecting pool" },
  gallery: [{ id: "agra-taj-sunset", alt: "The Taj Mahal under a golden evening sky" }],
  intro: [
    "The Taj Mahal is one of the most recognised buildings in the world, and seeing it at sunrise, as the white marble turns pink and gold, is a moment few travellers forget. Agra also has the red sandstone Agra Fort and the abandoned Mughal city of Fatehpur Sikri.",
    "Most visitors combine Agra with Delhi and Jaipur on the Golden Triangle, India's most popular first-time route. With an extra day, add Ranthambore for tigers or Mathura and Vrindavan for temples.",
    "Agra is easy to reach from Delhi by expressway or fast train, so even a day trip is possible.",
  ],
  facts: [
    { label: "Best time", value: "October to March" },
    { label: "Ideal stay", value: "1 to 2 nights (6 for the Golden Triangle)" },
    { label: "From Delhi", value: "About 3 to 4 hours by road; under 2 hours by fast train" },
    { label: "Permits", value: "None; online tickets for monuments" },
    { label: "Taj Mahal closed", value: "Fridays" },
    { label: "Known for", value: "Taj Mahal and Mughal monuments" },
  ],
  goodFor: [
    { t: "First-time visitors", d: "The essential India experience." },
    { t: "Families", d: "History that children can see and touch." },
    { t: "Couples", d: "Sunrise at the Taj and dinner with a view of it." },
  ],
  months: ["best", "best", "good", "low", "low", "low", "low", "low", "good", "best", "best", "best"],
  seasons: [
    { name: "Winter", when: "October to March", text: "Cool and pleasant. December and January mornings can be foggy." },
    { name: "Summer", when: "April to June", text: "Very hot. Visit at sunrise and late afternoon." },
    { name: "Monsoon", when: "July to September", text: "Humid with showers; gardens are green." },
  ],
  reach: [
    "Agra is about three to four hours from Delhi by the Yamuna Expressway. Fast trains like the Gatimaan Express and Vande Bharat take under two hours.",
    "Agra airport has limited flights. Jaipur is about four to five hours by road, completing the Golden Triangle.",
  ],
  entry: {
    title: "Planning your visit",
    text: [
      "Tickets for the Taj Mahal and Agra Fort can be bought online from the Archaeological Survey of India. The Taj Mahal is closed on Fridays, and night viewing is available on a few nights around the full moon.",
      "Food, tripods and large bags are not allowed inside the Taj complex. Small bags are checked at security.",
    ],
    checklist: [
      "Government photo ID",
      "Online monument tickets",
      "Minimal bags for the Taj Mahal",
      "Arrive before sunrise for the best light and fewer people",
    ],
  },
  places: [
    { name: "Taj Mahal", text: "The white marble mausoleum built by Shah Jahan for Mumtaz Mahal." },
    { name: "Agra Fort", text: "A UNESCO-listed Mughal fort with palaces and views of the Taj." },
    { name: "Fatehpur Sikri", text: "Akbar's red sandstone capital and the Buland Darwaza." },
    { name: "Mehtab Bagh", text: "Gardens across the river with a sunset view of the Taj." },
    { name: "Itmad-ud-Daulah", text: "The 'Baby Taj', with delicate inlay work." },
    { name: "Mathura and Vrindavan", text: "Temples linked to Lord Krishna, an hour away." },
  ],
  things: [
    { name: "Taj Mahal at sunrise", text: "The gates open about 30 minutes before sunrise." },
    { name: "Sunset at Mehtab Bagh", text: "A quiet view of the Taj across the Yamuna." },
    { name: "Marble inlay workshop", text: "See artisans continue the craft used in the Taj." },
    { name: "Mughlai and Agra food", text: "Petha, bedai with sabzi and Mughlai dishes." },
    { name: "Golden Triangle", text: "Delhi, Agra and Jaipur in one week." },
  ],
  stay: [
    { name: "Taj-view hotels", text: "Rooms and restaurants with views of the monument." },
    { name: "Taj East Gate area", text: "Hotels close to the eastern entrance." },
    { name: "Fatehabad Road", text: "A wide choice of comfortable hotels." },
  ],
  itineraries: [
    { title: "6 nights: Golden Triangle", days: ["Arrive in Delhi", "Old and New Delhi", "Drive to Agra, Mehtab Bagh sunset", "Taj Mahal sunrise, Fatehpur Sikri, drive to Jaipur", "Amber Fort and the old city", "Jaipur", "Departure from Jaipur or Delhi"] },
  ],
  tips: [
    "Do not plan a Taj Mahal visit on a Friday.",
    "Winter fog can delay trains and hide the Taj in the early morning.",
    "Hire only licensed guides at the monuments.",
    "Wear comfortable shoes; there is a lot of walking.",
  ],
  faqs: [
    { q: "Which day is the Taj Mahal closed?", a: "The Taj Mahal is closed to visitors on Fridays." },
    { q: "Can we do Agra as a day trip from Delhi?", a: "Yes. By fast train or expressway you can see the Taj Mahal and Agra Fort and return the same day, though one night is more relaxed." },
    { q: "What is the best time to visit the Taj Mahal?", a: "October to March, at sunrise for the best light and fewer people." },
    { q: "What is the Golden Triangle?", a: "The classic route connecting Delhi, Agra and Jaipur, usually over five to seven nights." },
    { q: "Is night viewing of the Taj Mahal possible?", a: "Yes, on a few nights around each full moon, with limited tickets booked in advance." },
  ],
  packageSlugs: [],
};
