import type { MetadataRoute } from "next";

const baseUrl = "https://gardenlive.in";

const publicRoutes = [
  "",
  "/about",
  "/services",
  "/landscaping",
  "/plant-nursery",
  "/garden-maintenance",
  "/dedicated-gardener",
  "/membership-plans",
  "/corporate-solutions",
  "/ai-plant-doctor",
  "/plant-scanner",
  "/qr-plant-passport",
  "/garden-store",
  "/garden-health-reports",
  "/projects",
  "/projects-portfolio",
  "/gallery",
  "/testimonials",
  "/blog",
  "/contact",
  "/book-garden-visit"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
