const PREFIX = "edit-token";

function key(kind: "concept" | "brief", id: string) {
  return `${PREFIX}:${kind}:${id}`;
}

/** Persist the write credential returned when a concept/brief is created. */
export function saveEditToken(
  kind: "concept" | "brief",
  id: string,
  token: string,
): void {
  try {
    window.localStorage.setItem(key(kind, id), token);
  } catch {
    /* private mode / quota — edits just won't be authorized */
  }
}

export function loadEditToken(
  kind: "concept" | "brief",
  id: string,
): string | undefined {
  try {
    return window.localStorage.getItem(key(kind, id)) ?? undefined;
  } catch {
    return undefined;
  }
}
