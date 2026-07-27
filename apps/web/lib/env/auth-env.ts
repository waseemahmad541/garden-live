export function authSecret() {
  return process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "";
}

export function isProductionSite() {
  return process.env.NODE_ENV === "production";
}

export function sessionCookieNames() {
  return isProductionSite()
    ? ["__Secure-authjs.session-token", "__Secure-next-auth.session-token", "authjs.session-token", "next-auth.session-token"]
    : ["authjs.session-token", "next-auth.session-token", "__Secure-authjs.session-token", "__Secure-next-auth.session-token"];
}
