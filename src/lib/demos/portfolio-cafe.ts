export const portfolioCafeAssets = {
  video: "/demos/portfolio-cafe/hero.mp4",
  poster: "/demos/portfolio-cafe/hero-poster.jpg",
  end: "/demos/portfolio-cafe/hero-end.jpg",
} as const;

export type CafeScrollBand = {
  from: number;
  to: number;
  line: string;
};
