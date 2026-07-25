import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/customer", "/gardener", "/supervisor", "/api"]
      }
    ],
    sitemap: "https://gardenlive.in/sitemap.xml"
  };
}
