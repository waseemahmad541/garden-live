export function authSecret() {
  return process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "";
}

export function isProductionSite() {
  return process.env.NODE_ENV === "production";
}

export function sessionCookieName() {
  return isProductionSite() ? "__Secure-authjs.session-token" : "authjs.session-token";
}

export function sessionCookieNames() {
  const primary = sessionCookieName();
  const fallbacks = [
    "__Secure-authjs.session-token",
    "authjs.session-token",
    "__Secure-next-auth.session-token",
    "next-auth.session-token"
  ];

  return isProductionSite()
    ? [primary, ...fallbacks.filter((name) => name !== primary)]
    : [primary, ...fallbacks.filter((name) => name !== primary)];
}
