import "server-only";

import type { PlaceFacts, PlaceReview } from "./types";

const FIELD_MASK = [
  "displayName",
  "formattedAddress",
  "regularOpeningHours",
  "photos",
  "reviews",
  "rating",
  "userRatingCount",
  "websiteUri",
  "primaryType",
  "types",
  "internationalPhoneNumber",
  "googleMapsUri",
].join(",");

type PlacesResponse = {
  displayName?: { text?: string };
  formattedAddress?: string;
  regularOpeningHours?: { weekdayDescriptions?: string[] };
  photos?: { name?: string }[];
  reviews?: { text?: { text?: string }; rating?: number }[];
  rating?: number;
  userRatingCount?: number;
  websiteUri?: string;
  primaryType?: string;
  types?: string[];
  internationalPhoneNumber?: string;
  googleMapsUri?: string;
};

export function isPlacesConfigured(): boolean {
  return Boolean(process.env.GOOGLE_PLACES_API_KEY?.trim());
}

function apiKey(): string {
  const key = process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!key) throw new Error("PLACES_NOT_CONFIGURED");
  return key;
}

function photoMediaUrl(photoName: string): string {
  return `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=1200&key=${apiKey()}`;
}

function mapReviews(reviews?: PlacesResponse["reviews"]): PlaceReview[] {
  if (!reviews?.length) return [];
  return reviews
    .map((r) => ({
      text: (r.text?.text || "").trim(),
      rating: r.rating,
    }))
    .filter((r) => r.text.length > 8)
    .slice(0, 5);
}

function mapPlaceResponse(
  data: PlacesResponse,
  placeId: string,
  mapsUrl: string,
): PlaceFacts {
  const photos = (data.photos || [])
    .slice(0, 3)
    .map((p) => (p.name ? photoMediaUrl(p.name) : ""))
    .filter(Boolean);

  return {
    placeId,
    name: data.displayName?.text || "Local",
    address: data.formattedAddress || "",
    phone: data.internationalPhoneNumber,
    website: data.websiteUri,
    mapsUrl: data.googleMapsUri || mapsUrl,
    hours: data.regularOpeningHours?.weekdayDescriptions?.slice(0, 7) || [],
    rating: data.rating,
    reviewCount: data.userRatingCount,
    reviews: mapReviews(data.reviews),
    photoUrls: photos,
    primaryType: data.primaryType,
    types: data.types || [],
  };
}

export async function fetchPlaceById(
  placeId: string,
  mapsUrl: string,
): Promise<PlaceFacts> {
  const res = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey(),
        "X-Goog-FieldMask": FIELD_MASK,
      },
      signal: AbortSignal.timeout(15_000),
    },
  );
  if (!res.ok) throw new Error(`PLACES_FETCH_FAILED:${res.status}`);
  const data = (await res.json()) as PlacesResponse;
  return mapPlaceResponse(data, placeId, mapsUrl);
}

export async function searchPlaceByText(
  textQuery: string,
  mapsUrl: string,
): Promise<PlaceFacts> {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey(),
      "X-Goog-FieldMask": `places.id,${FIELD_MASK}`,
    },
    body: JSON.stringify({ textQuery, languageCode: "de" }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`PLACES_SEARCH_FAILED:${res.status}`);

  const body = (await res.json()) as {
    places?: (PlacesResponse & { id?: string })[];
  };
  const first = body.places?.[0];
  if (!first?.id) throw new Error("PLACES_NOT_FOUND");
  return mapPlaceResponse(first, first.id, mapsUrl);
}

function extractNameFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const m = u.pathname.match(/\/maps\/place\/([^/]+)/i);
    if (m?.[1]) return decodeURIComponent(m[1].replace(/\+/g, " "));
    return u.searchParams.get("q");
  } catch {
    return null;
  }
}

export async function fetchPlaceFromMapsUrl(
  resolvedUrl: string,
  placeId: string | null,
  textQuery: string | null,
): Promise<PlaceFacts> {
  if (placeId?.startsWith("ChIJ")) {
    return fetchPlaceById(placeId, resolvedUrl);
  }
  const query = textQuery || extractNameFromUrl(resolvedUrl);
  if (!query) throw new Error("PLACES_NO_QUERY");
  return searchPlaceByText(query, resolvedUrl);
}
