import type { MetadataRoute } from "next";
import { blogPosts, projectItems } from "@/components/public/public-content";

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
  "/book-garden-visit",
  "/book-visit",
  "/privacy-policy",
  "/terms",
  "/refund-policy",
  "/shipping-policy",
  "/careers",
  "/faqs"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const dynamicRoutes = [
    ...blogPosts.map((post) => `/blog/${post.slug}`),
    ...projectItems.map((project) => `/projects/${project.slug}`)
  ];

  return [...publicRoutes, ...dynamicRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
