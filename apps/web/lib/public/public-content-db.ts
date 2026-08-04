import { prisma } from "@/lib/db/prisma";
import { img } from "@/components/public/v4-public-data";

export type PublicBlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  readTime: string;
  body: string[];
};

export type PublicProject = {
  slug: string;
  title: string;
  location: string;
  category: string;
  image: string;
  summary: string;
  highlights: string[];
};

function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function asString(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function asStringArray(value: unknown, fallback: string[]) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0) : fallback;
}

function blogFromMetadata(metadata: unknown, createdAt: Date): PublicBlogPost | null {
  const data = asRecord(metadata);
  const title = asString(data.title, "");
  if (!title) return null;

  return {
    slug: slugify(asString(data.slug, title)),
    title,
    category: asString(data.category, "Garden Live"),
    date: asString(data.date, createdAt.toISOString().slice(0, 10)),
    excerpt: asString(data.excerpt, asString(data.description, "Garden Live insight.")),
    image: asString(data.image, img.night),
    readTime: asString(data.readTime, "4 min read"),
    body: asStringArray(data.body, [asString(data.content, asString(data.excerpt, "Garden Live insight."))])
  };
}

export async function getPublishedBlogPosts(query?: string): Promise<PublicBlogPost[]> {
  const search = query?.trim().toLowerCase();
  const entries = await prisma.activityLog.findMany({
    where: {
      deletedAt: null,
      entityType: "BlogPost",
      action: { in: ["PUBLISHED_BLOG_POST", "WEBSITE_CMS_BLOG_PUBLISHED", "PUBLIC_BLOG_PUBLISHED"] }
    },
    orderBy: { createdAt: "desc" },
    take: 50
  });

  const posts = entries.map((entry) => blogFromMetadata(entry.metadata ?? entry.newValue, entry.createdAt)).filter((post): post is PublicBlogPost => Boolean(post));
  if (!search) return posts;
  return posts.filter((post) => [post.title, post.category, post.excerpt, ...post.body].some((value) => value.toLowerCase().includes(search)));
}

export async function getPublishedBlogPost(slug: string): Promise<PublicBlogPost | null> {
  const posts = await getPublishedBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getPublicProjects(): Promise<PublicProject[]> {
  const projects = await prisma.gardenProject.findMany({
    where: { deletedAt: null, status: { in: ["APPROVED", "IN_PROGRESS", "COMPLETED"] } },
    include: { mediaFiles: { where: { deletedAt: null, type: "IMAGE" }, orderBy: { sortOrder: "asc" }, take: 1 } },
    orderBy: { createdAt: "desc" },
    take: 50
  });

  return projects.map((project) => ({
    slug: slugify(`${project.title}-${project.id.slice(0, 8)}`),
    title: project.title,
    location: "India",
    category: project.projectType ?? "Garden Project",
    image: project.mediaFiles[0]?.url?.startsWith("/") ? project.mediaFiles[0].url : img.villa,
    summary: project.description ?? "Garden Live project with survey, execution, documentation and maintenance visibility.",
    highlights: [
      project.status.replace(/_/g, " ").toLowerCase(),
      project.budgetEstimate ? `Estimated budget Rs. ${Number(project.budgetEstimate).toLocaleString("en-IN")}` : "Digital project record",
      project.startDate ? `Started ${project.startDate.toISOString().slice(0, 10)}` : "Garden Live workflow",
      project.endDate ? `Completed ${project.endDate.toISOString().slice(0, 10)}` : "Maintenance-ready handover"
    ]
  }));
}

export async function getPublicProject(slug: string): Promise<PublicProject | null> {
  const projects = await getPublicProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}
