import type { Photo } from "@/data/packages";

export type GuidePick = {
  name: string;
  /** Destination guide slug, when we have one. Its hero photo is used on the card. */
  dest?: string;
  when: string;
  text: string;
};

export type Guide = {
  slug: string;
  nav: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  hero: Photo;
  intro: string[];
  picksTitle: string;
  picksIntro: string;
  picks: GuidePick[];
  sections: { heading: string; paras: string[]; bullets?: string[] }[];
  table?: {
    heading: string;
    intro: string;
    groups: { label: string; note: string; countries: string[] }[];
    source: string;
  };
  faqs: { q: string; a: string }[];
};

export const guides: Guide[] = [
  {
    slug: "honeymoon-packages",
    nav: "Honeymoon destinations",
    seoTitle: "Honeymoon Packages from India | Best Honeymoon Destinations",
    metaDescription: "The best honeymoon destinations from India: Maldives, Bali, Switzerland, Santorini, Mauritius, Kashmir and more, with the right month for each.",
    h1: "Honeymoon destinations from India",
    tagline: "Where to go, when to go and how to plan a honeymoon you will both remember.",
    hero: { id: "world-santorini-oia", alt: "Oia village in Santorini at sunset" },
    intro: [
      "The right honeymoon depends on three things: the month of your wedding, how many days you can take off and what the two of you enjoy. A couple who wants to do nothing but swim and sleep will be happiest in the Maldives; a couple who wants mountains, trains and long walks will love Switzerland.",
      "Below are the honeymoon destinations Indian couples choose most often, abroad and in India, with the best season for each. Every one of them can be planned around your dates, with private transfers, rooms chosen for the view and the small surprises arranged quietly with the hotel.",
    ],
    picksTitle: "Our favourite honeymoon destinations",
    picksIntro: "Ten places that work beautifully for couples, with the months they are at their best.",
    picks: [
      { name: "Maldives", dest: "maldives", when: "November to April", text: "A water villa over the lagoon, a private pool and nothing to do. The classic choice for a first holiday together." },
      { name: "Bali", dest: "bali", when: "April to October", text: "Pool villas in the Ubud jungle, cliff-top sunsets at Uluwatu and great value for a longer trip." },
      { name: "Switzerland", dest: "switzerland", when: "May to September", text: "Lakeside hotels, snow on the peaks in summer and the world's most scenic train journeys." },
      { name: "Greece", dest: "greece", when: "May, June and September", text: "Cave hotels in Santorini with plunge pools facing the caldera and the most famous sunset in Europe." },
      { name: "Mauritius", dest: "mauritius", when: "May to December", text: "Beach resorts plus mountains, waterfalls and catamaran days, with a warm Indian welcome." },
      { name: "Sri Lanka", dest: "sri-lanka", when: "December to April", text: "Tea-country bungalows, the train to Ella and beach villas, an hour from south India." },
      { name: "Kashmir", dest: "kashmir", when: "April to October", text: "A night on a houseboat, Gulmarg's meadows and Pahalgam's valleys." },
      { name: "Andaman", dest: "andaman", when: "October to May", text: "White sand, turquoise water and a first dive together, with no passport needed." },
      { name: "Kerala", dest: "kerala", when: "September to March", text: "Tea hills in Munnar, a private houseboat on the backwaters and a quiet beach finish." },
      { name: "Rajasthan", dest: "rajasthan", when: "October to March", text: "Lake-view palace suites in Udaipur and a night in a luxury desert camp." },
    ],
    sections: [
      {
        heading: "Choosing a honeymoon by your wedding month",
        paras: [
          "Most Indian weddings take place between November and February, and that is good news: it is the best season for the Maldives, Sri Lanka, Mauritius, Rajasthan, Kerala, Goa and the Andamans. For a summer wedding, look at Bali, Switzerland, Greece, Kashmir or the rest of Europe.",
        ],
        bullets: [
          "November to February: Maldives, Mauritius, Sri Lanka, Dubai, Rajasthan, Kerala, Andaman",
          "March to May: Maldives, Bali, Japan, Sikkim, Kashmir",
          "June to September: Bali, Switzerland, Greece, Europe, Kashmir",
          "October: Bali, Dubai, Rajasthan, Andaman, Sikkim",
        ],
      },
      {
        heading: "How many days do you need?",
        paras: [
          "Five to six nights is enough for a single destination such as the Maldives, Mauritius or the Andamans. Seven to ten nights suits Bali, Switzerland, Sri Lanka or Greece, and lets you combine two styles: a few busy days of sightseeing followed by a few slow days by the water.",
          "Long flights and visas need planning too. Schengen visas for Switzerland and Greece take a few weeks, so apply as soon as your dates are fixed. The Maldives, Mauritius and Sri Lanka are much simpler for Indian passport holders.",
        ],
      },
      {
        heading: "What makes it feel like a honeymoon",
        paras: [
          "It is usually the small things: a private car instead of a shared shuttle, a room with a view rather than a room near the lift, a free afternoon with nothing planned. Tell us about any surprises you want and we arrange them with the hotel without a word to your partner.",
        ],
        bullets: [
          "Room decoration and a cake on arrival",
          "A candlelight dinner on the beach, a terrace or your own deck",
          "A couple's spa session",
          "An hour with a local photographer",
          "A room upgrade or late check-out, when available",
        ],
      },
    ],
    faqs: [
      { q: "Which is the best honeymoon destination from India?", a: "It depends on the month and what you enjoy. The Maldives and Bali are the most popular abroad; Switzerland and Santorini for Europe; Kashmir, Kerala, the Andamans and Udaipur in India." },
      { q: "Which honeymoon destinations do not need a visa in advance for Indians?", a: "The Maldives and Mauritius give entry on arrival, Bali (Indonesia) has visa on arrival, and Sri Lanka has a free online travel authorisation. Rules can change, so we confirm them for your dates." },
      { q: "How early should we book our honeymoon?", a: "Two to four months ahead is ideal, and earlier for December and January, when water villas, palace hotels and Santorini cave hotels fill up." },
      { q: "Maldives or Bali for a honeymoon?", a: "The Maldives is about the villa, the water and complete rest. Bali offers more to see and do, with temples, rice terraces and beach clubs, and is better value for longer trips." },
      { q: "Can you arrange surprises for my partner?", a: "Yes. Tell your planner what you have in mind and we arrange it with the hotel quietly." },
      { q: "Can we combine two countries on our honeymoon?", a: "Yes. Popular combinations are Sri Lanka with the Maldives, Singapore with Bali, and Switzerland with Paris or Italy." },
    ],
  },
  {
    slug: "family-holidays",
    nav: "Family holidays",
    seoTitle: "Family Holiday Packages from India | Best Family Destinations",
    metaDescription: "The best family holiday destinations from India for children, parents and grandparents: Singapore, Dubai, Thailand, Switzerland, Japan, Kerala and more.",
    h1: "Family holidays from India",
    tagline: "Destinations that keep children busy, parents relaxed and grandparents comfortable.",
    hero: { id: "world-singapore", alt: "Marina Bay Sands and the Singapore skyline" },
    intro: [
      "A family holiday has to work for everyone at once. Children want theme parks, pools and animals; parents want a little rest; grandparents need short drives, easy walks and food they enjoy. The best destinations manage all three without long days in a car.",
      "These are the family holidays we plan most often, abroad and in India, with the best time to go and what makes each one easy with children and older travellers.",
    ],
    picksTitle: "Our favourite family destinations",
    picksIntro: "Ten places that suit three generations travelling together.",
    picks: [
      { name: "Singapore", dest: "singapore", when: "February to April, July to September", text: "Universal Studios, the Night Safari, aquariums and Indian food everywhere. The easiest first trip abroad." },
      { name: "Dubai", dest: "dubai", when: "November to March", text: "Theme parks, a desert safari, water parks and malls, a short flight from most Indian cities." },
      { name: "Thailand", dest: "thailand", when: "November to April", text: "Calm beaches, island boat trips and family resorts in Phuket and Krabi." },
      { name: "Switzerland", dest: "switzerland", when: "May to September", text: "Snow in summer at Titlis and Jungfraujoch, and trains and cable cars that do the climbing." },
      { name: "Japan", dest: "japan", when: "March to May, October to November", text: "Disney, Universal Studios Japan, bullet trains and some of the safest cities in the world." },
      { name: "Sri Lanka", dest: "sri-lanka", when: "December to April", text: "Elephant safaris, a famous train ride and beaches, with short drives and no time difference." },
      { name: "Mauritius", dest: "mauritius", when: "May to December", text: "Calm lagoons, kids clubs and plenty to see beyond the beach." },
      { name: "Kerala", dest: "kerala", when: "September to March", text: "Houseboats, tea hills, elephants and gentle beaches." },
      { name: "Rajasthan", dest: "rajasthan", when: "October to March", text: "Forts, palace hotels, camel rides and tiger safaris that children remember." },
      { name: "Sikkim", dest: "sikkim", when: "March to May, October to December", text: "Snow at Tsomgo lake, cable cars and the Darjeeling toy train." },
    ],
    sections: [
      {
        heading: "Planning around school holidays",
        paras: [
          "Most families travel in the summer holidays, at Diwali or over Christmas and New Year, which is when flights and hotels are busiest. For May and June, Singapore, Switzerland, Europe, Kashmir and Sikkim work well. For October to January, look at Dubai, Thailand, Sri Lanka, Kerala and Rajasthan.",
          "Book three to five months ahead for school holiday dates. Family rooms, connecting rooms and villas sell out first.",
        ],
      },
      {
        heading: "Travelling with grandparents",
        paras: [
          "With older travellers, the pace matters more than the destination. We plan fewer hotel changes, shorter drives, lifts or ground-floor rooms where needed, and wheelchair assistance at airports on request.",
        ],
        bullets: [
          "Two or three bases rather than a new hotel every night",
          "Private transfers instead of shared coaches",
          "Late starts and free afternoons",
          "Vegetarian and Jain meals arranged in advance",
          "Medical advice before high-altitude trips such as Sikkim or Ladakh",
        ],
      },
      {
        heading: "What we take care of",
        paras: [
          "Visas for the whole family, flights that suit children's sleep, cots and extra beds, kids clubs, child seats in cars and attraction tickets with fixed time slots so you do not queue in the heat. One planner handles everything, and you have one number to call during the trip.",
        ],
      },
    ],
    faqs: [
      { q: "Which is the best family holiday destination from India?", a: "Singapore and Dubai are the easiest first trips abroad. Thailand, Sri Lanka and Mauritius add beaches; Switzerland and Japan are wonderful for longer trips. In India, Kerala, Rajasthan, Goa and Sikkim are family favourites." },
      { q: "Which destinations are best with small children?", a: "Places with short flights, little time difference and easy food: Singapore, Dubai, Sri Lanka, Thailand, Kerala and Goa." },
      { q: "Which destinations suit grandparents?", a: "Singapore, Dubai, Switzerland, Kerala and Sri Lanka, planned with fewer hotel changes and shorter drives." },
      { q: "How early should we book a family holiday?", a: "Three to five months before school holidays, and earlier for Christmas, New Year and Diwali." },
      { q: "Can you arrange vegetarian or Jain food?", a: "Yes. We tell hotels in advance and share lists of Indian and vegetarian restaurants at each stop." },
      { q: "Do you handle visas for the whole family?", a: "Yes. We prepare the checklist and documents for every traveller, including children." },
    ],
  },
  {
    slug: "visa-free-countries-for-indians",
    nav: "Visa-free countries for Indians",
    seoTitle: "Visa-Free Countries for Indians 2026 | Visa on Arrival List",
    metaDescription: "Countries Indians can visit without a visa in advance in 2026: the full visa-free, visa on arrival and eTA list, plus the best holiday picks.",
    h1: "Visa-free countries for Indians in 2026",
    tagline: "Where you can go on an Indian passport without applying for a visa in advance.",
    hero: { id: "thailand-phi-phi", alt: "Long-tail boats in the bay at Phi Phi, Thailand" },
    intro: [
      "An Indian passport gives easy access to more than 50 countries and territories in 2026. In some you simply land and walk through immigration; in others you get a visa on arrival or fill in a short online travel authorisation before you fly.",
      "Not every country on the list is an easy holiday, so we have picked the ones Indian travellers actually enjoy, with the full list below. Entry still depends on a valid passport, a return ticket, hotel bookings and enough funds, and immigration officers have the final say.",
    ],
    picksTitle: "The best holidays without a visa in advance",
    picksIntro: "Beaches, mountains and cities you can plan quickly, without embassy appointments.",
    picks: [
      { name: "Thailand", dest: "thailand", when: "November to April", text: "Visa-free for Indians. Bangkok, Phuket, Krabi and the islands, a few hours from most cities." },
      { name: "Maldives", dest: "maldives", when: "November to April", text: "Free visa on arrival. Water villas and resort islands with seaplane transfers." },
      { name: "Bali, Indonesia", dest: "bali", when: "April to October", text: "Visa on arrival, also available online before you fly. Villas, temples and beaches." },
      { name: "Sri Lanka", dest: "sri-lanka", when: "December to April", text: "Free online travel authorisation. Hill country, wildlife and beaches." },
      { name: "Mauritius", dest: "mauritius", when: "May to December", text: "Visa-free entry. Lagoons, mountains and a warm Indian welcome." },
      { name: "Malaysia", dest: "malaysia", when: "December to April", text: "Visa-free. Kuala Lumpur, Langkawi and Penang, an easy add-on to Singapore." },
      { name: "Bhutan", dest: "bhutan", when: "March to May, September to November", text: "No visa needed for Indians, though an entry permit and fee apply. Monasteries, valleys and calm." },
      { name: "Nepal", dest: "nepal", when: "October to May", text: "No visa or passport needed for Indians with valid ID. Kathmandu, Pokhara and the Himalayas." },
      { name: "Seychelles", dest: "seychelles", when: "April, May, October, November", text: "Electronic travel authorisation before you fly. Granite beaches and island hopping." },
      { name: "Kazakhstan", dest: "kazakhstan", when: "May to September", text: "Visa-free. Almaty's mountains, lakes and canyons, a new favourite for Indian travellers." },
    ],
    sections: [
      {
        heading: "Visa-free, visa on arrival and eTA: what is the difference?",
        paras: [
          "Visa-free means you need no visa at all for a short tourist stay. Visa on arrival means you get the visa at the airport, sometimes for a fee. An electronic travel authorisation (eTA or ETA) is a short online form you complete before you fly, usually approved within days.",
          "In all three cases immigration may ask for a return ticket, hotel bookings and proof of funds, and your passport should normally be valid for at least six months.",
        ],
      },
      {
        heading: "Before you book",
        paras: [
          "Visa rules change often. Thailand, Sri Lanka and Malaysia have all changed their rules for Indians in the last two years. We check the current requirement for your dates and route, including any transit country, before you pay for anything.",
        ],
        bullets: [
          "Passport valid for at least 6 months from your return date",
          "Return or onward ticket",
          "Hotel bookings for the whole stay",
          "Some cash or a card in the local currency",
          "Travel insurance, strongly recommended",
        ],
      },
    ],
    table: {
      heading: "Full list for Indian passport holders",
      intro: "In the October 2026 Henley Passport Index, India ranks 84th, with access to 55 destinations without a visa in advance. The list below is a guide to those options; requirements can change at short notice.",
      groups: [
        {
          label: "Visa-free",
          note: "No visa needed for a short tourist stay.",
          countries: ["Angola", "Barbados", "Bhutan", "British Virgin Islands", "Cook Islands", "Dominica", "Fiji", "Grenada", "Haiti", "Jamaica", "Kazakhstan", "Kiribati", "Macao", "Malaysia", "Mauritius", "Micronesia", "Montserrat", "Nepal", "Niue", "Rwanda", "Senegal", "St Vincent and the Grenadines", "Thailand", "Trinidad and Tobago", "Vanuatu"],
        },
        {
          label: "Visa on arrival",
          note: "Visa issued at the airport or border, sometimes for a fee.",
          countries: ["Burundi", "Cambodia", "Cape Verde", "Comoros", "Djibouti", "Guinea-Bissau", "Indonesia", "Jordan", "Laos", "Madagascar", "Maldives", "Marshall Islands", "Mongolia", "Mozambique", "Palau", "Philippines", "Qatar", "Samoa", "Sierra Leone", "Somalia", "Sri Lanka", "St Lucia", "Tanzania", "Timor-Leste", "Tuvalu", "Zimbabwe"],
        },
        {
          label: "Electronic travel authorisation",
          note: "A short online form before you fly.",
          countries: ["Kenya", "Myanmar", "Seychelles", "St Kitts and Nevis"],
        },
      ],
      source: "Source: Henley Passport Index, October 2026, and official government sites. Some countries offer more than one option; Sri Lanka, for example, also offers a free online ETA.",
    },
    faqs: [
      { q: "How many countries can Indians visit without a visa in 2026?", a: "According to the Henley Passport Index of October 2026, Indian passport holders can visit 55 destinations without a visa in advance, through visa-free entry, visa on arrival or an electronic travel authorisation." },
      { q: "Which countries are visa-free for Indians for a holiday?", a: "Popular choices include Thailand, Malaysia, Mauritius, Bhutan, Nepal, Kazakhstan and Fiji. The Maldives, Indonesia and Sri Lanka are also easy, with visa on arrival or an online authorisation." },
      { q: "Is Dubai visa-free for Indians?", a: "Not usually. Most Indian travellers need a UAE tourist visa in advance. Indians with a valid US visa or green card, or a UK or EU residence permit, may be eligible for visa on arrival." },
      { q: "Is Europe visa-free for Indians?", a: "No. Indian passport holders need a Schengen visa for most of Europe, including France, Switzerland, Italy and Greece." },
      { q: "Do I still need documents for a visa-free country?", a: "Yes. Carry a passport valid for at least six months, a return ticket, hotel bookings and proof of funds. Immigration officers can ask for any of these." },
      { q: "Can visa rules change after I book?", a: "Yes, which is why we check the current rules for your dates before you pay, and again before you travel." },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
