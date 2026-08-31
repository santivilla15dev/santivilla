export type PlaceReview = {
  text: string;
  rating?: number;
};

export type PlaceFacts = {
  placeId: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  mapsUrl: string;
  hours: string[];
  rating?: number;
  reviewCount?: number;
  reviews: PlaceReview[];
  photoUrls: string[];
  primaryType?: string;
  types: string[];
};

export type MapsKonzeptResult = {
  slug: string;
  conceptId: string;
  editToken?: string;
  path: string;
  previewUrl: string;
  name: string;
};
