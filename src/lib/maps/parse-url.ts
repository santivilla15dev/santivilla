export function isMapsUrl(url: string): boolean {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return (
      u.hostname.includes("google") ||
      u.hostname === "maps.app.goo.gl" ||
      u.hostname === "g.page" ||
      u.hostname === "goo.gl"
    );
  } catch {
    return false;
  }
}

export async function resolveMapsUrl(input: string): Promise<string> {
  let url = input.trim();
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;

  const host = new URL(url).hostname;
  if (host === "maps.app.goo.gl" || host === "goo.gl" || host === "g.page") {
    const res = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    return res.url;
  }
  return url;
}

export function extractPlaceIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const qPlace = u.searchParams.get("place_id");
    if (qPlace?.startsWith("ChIJ")) return qPlace;

    const qParam = u.searchParams.get("q");
    if (qParam?.startsWith("place_id:")) {
      return qParam.replace("place_id:", "").trim();
    }
  } catch {
    return null;
  }
  return null;
}

export function extractTextQueryFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const q = u.searchParams.get("q");
    if (q && !q.startsWith("place_id:")) return q;

    const placePath = u.pathname.match(/\/maps\/place\/([^/]+)/i);
    if (placePath?.[1]) {
      return decodeURIComponent(placePath[1].replace(/\+/g, " "));
    }
  } catch {
    return null;
  }
  return null;
}

export async function parseMapsUrl(input: string): Promise<{
  resolvedUrl: string;
  placeId: string | null;
  textQuery: string | null;
}> {
  const resolvedUrl = await resolveMapsUrl(input);
  return {
    resolvedUrl,
    placeId: extractPlaceIdFromUrl(resolvedUrl),
    textQuery: extractTextQueryFromUrl(resolvedUrl),
  };
}
