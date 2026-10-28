// Hero images live in /public/posters (and /public/photos). No background video:
// a still photo keeps attention on the words and loads faster.
export type HeroMedia = {
  poster: string;
  mobilePoster?: string;
  posterAlt: string;
};

export const heroMedia: Record<"home" | "solo" | "couple" | "group" | "stay", HeroMedia> = {
  home: {
    poster: "/posters/home.jpg",
    mobilePoster: "/posters/home-mobile.jpg",
    posterAlt: "Aerial view of a beach resort pool in the Maldives",
  },
  solo: {
    poster: "/posters/solo.jpg",
    posterAlt: "Aerial view of a tropical island beach with longtail boats",
  },
  couple: {
    poster: "/posters/couple.jpg",
    posterAlt: "A couple walking hand in hand on the beach",
  },
  group: {
    poster: "/posters/group.jpg",
    posterAlt: "Coastal highway between the sea and green hills",
  },
  stay: {
    poster: "/photos/28843966.jpg",
    posterAlt: "Overwater villa with a private pool in the Maldives",
  },
};
