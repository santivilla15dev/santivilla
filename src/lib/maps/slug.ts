export function slugifyName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

export function makeUniqueSlug(base: string, suffix?: string): string {
  const clean = slugifyName(base) || "konzept";
  if (!suffix) return clean;
  const short = suffix.replace(/[^a-zA-Z0-9]/g, "").slice(-6).toLowerCase();
  return `${clean}-${short}`;
}
