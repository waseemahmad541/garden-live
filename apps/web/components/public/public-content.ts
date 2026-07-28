import { img } from "@/components/public/v4-public-data";

export const blogPosts = [
  {
    slug: "digital-garden-membership",
    title: "How Digital Garden Memberships Change Home Maintenance",
    category: "Membership",
    date: "2026-07-01",
    excerpt: "Garden memberships make visits, plant health, rewards and reports easier to understand for modern homes.",
    image: img.home,
    readTime: "4 min read",
    body: [
      "Garden Live turns gardening from an informal vendor experience into a visible membership system. Customers can understand visit history, garden health, plant records and upcoming care in one place.",
      "The membership model is designed for villas, apartments, rooftops, corporate spaces and premium homes that need predictable care rather than one-time fixes.",
      "With AI Plant Doctor, QR Plant Passport and Green Promise workflows, every plant can carry a care history that helps customers and field teams make better decisions."
    ]
  },
  {
    slug: "ai-plant-doctor-health-score",
    title: "AI Plant Doctor: What a Healthy Scan Should Show",
    category: "AI Plant Care",
    date: "2026-07-08",
    excerpt: "Disease, pest, water and fertilizer signals can become a practical treatment timeline.",
    image: img.ai,
    readTime: "5 min read",
    body: [
      "A useful plant diagnosis should not stop at naming a problem. It should show confidence, health score, possible cause, care urgency and the next treatment step.",
      "Garden Live presents AI Plant Doctor as a premium plant healthcare layer that can support customers, gardeners and supervisors with clearer recommendations.",
      "For production use, AI reports should connect to plant passport records, visit notes and expert consultation."
    ]
  },
  {
    slug: "premium-rooftop-garden-design",
    title: "Designing Premium Rooftop Gardens for Indian Homes",
    category: "Landscaping",
    date: "2026-07-15",
    excerpt: "Layered planting, irrigation readiness and service reporting create long-term rooftop value.",
    image: img.rooftop,
    readTime: "6 min read",
    body: [
      "A rooftop garden must balance structure, water access, drainage, sunlight, wind and long-term maintenance. Beautiful design needs operational planning.",
      "Garden Live recommends clear zones for seating, planting, lighting, irrigation and service access so the space remains easy to maintain.",
      "Before-after documentation and visit reports help customers see how the rooftop matures over time."
    ]
  }
] as const;

export const projectItems = [
  {
    slug: "luxury-villa-garden",
    title: "Luxury Villa Garden",
    location: "Hyderabad",
    category: "Luxury Landscaping",
    image: img.villa,
    summary: "A premium residential landscape with AI care records, visit tracking and plant passport readiness.",
    highlights: ["Luxury entrance planting", "Garden Health Score", "Before-after proof", "Maintenance handover"]
  },
  {
    slug: "rooftop-smart-garden",
    title: "Rooftop Smart Garden",
    location: "Bengaluru",
    category: "Terrace Garden",
    image: img.rooftop,
    summary: "A rooftop garden concept with irrigation readiness, weather-aware care and premium seating zones.",
    highlights: ["Rooftop zoning", "Water schedule", "Smart reminders", "Service reports"]
  },
  {
    slug: "corporate-campus-greenery",
    title: "Corporate Campus Greenery",
    location: "Pune",
    category: "Corporate Solutions",
    image: img.campus,
    summary: "Office greenery designed for reception impact, recurring maintenance and supervisor visibility.",
    highlights: ["Corporate AMC", "Office plants", "Supervisor checks", "Monthly reporting"]
  }
] as const;

export function findBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function findProject(slug: string) {
  return projectItems.find((project) => project.slug === slug);
}
