// Hero videos live in /public/videos, posters (first frame) in /public/posters.
// Every video is muted, looped, H.264 MP4 (~1080p, under ~3.5 MB) with no audio track.
export type HeroMedia = {
  video?: { src: string; mobileSrc?: string; ready: boolean };
  poster: string;
  posterAlt: string;
};

export const heroMedia: Record<"home" | "solo" | "couple" | "group" | "stay", HeroMedia> = {
  home: {
    video: { src: "/videos/home.mp4", mobileSrc: "/videos/home-mobile.mp4", ready: true },
    poster: "/posters/home.jpg",
    posterAlt: "Aerial view of a beach resort pool in the Maldives",
  },
  solo: {
    video: { src: "/videos/solo.mp4", ready: true },
    poster: "/posters/solo.jpg",
    posterAlt: "Aerial view of a tropical island beach with longtail boats",
  },
  couple: {
    video: { src: "/videos/couple.mp4", ready: true },
    poster: "/posters/couple.jpg",
    posterAlt: "A couple walking hand in hand on the beach",
  },
  group: {
    video: { src: "/videos/group.mp4", ready: true },
    poster: "/posters/group.jpg",
    posterAlt: "Coastal highway between the sea and green hills",
  },
  stay: {
    poster: "/photos/28843966.jpg",
    posterAlt: "Overwater villa with a private pool in the Maldives",
  },
};
