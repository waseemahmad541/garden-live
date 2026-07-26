const LOCAL_URL_PATTERN = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/?$/i;

function firstValidUrl(value: string | undefined, preferPublic = false) {
  const candidates = String(value ?? "")
    .split(/\s+/)
    .map((candidate) => candidate.trim())
    .filter(Boolean);

  const validUrls = candidates.filter((candidate) => {
    try {
      const parsed = new URL(candidate);
      return parsed.protocol === "https:" || parsed.protocol === "http:";
    } catch {
      return false;
    }
  });

  if (!validUrls.length) return "";
  if (preferPublic) {
    return validUrls.find((candidate) => !LOCAL_URL_PATTERN.test(candidate)) ?? validUrls[0];
  }
  return validUrls[0];
}

export function canonicalSiteUrl() {
  const isProduction = process.env.NODE_ENV === "production";
  return (
    firstValidUrl(process.env.NEXT_PUBLIC_SITE_URL, isProduction) ||
    firstValidUrl(process.env.NEXT_PUBLIC_APP_URL, isProduction) ||
    firstValidUrl(process.env.AUTH_URL, isProduction) ||
    firstValidUrl(process.env.NEXTAUTH_URL, isProduction) ||
    (isProduction ? "https://gardenlive.in" : "http://localhost:3000")
  ).replace(/\/+$/, "");
}

export function normalizeAuthEnvironment() {
  const siteUrl = canonicalSiteUrl();
  process.env.AUTH_URL = siteUrl;
  process.env.NEXTAUTH_URL = siteUrl;
  return siteUrl;
}
