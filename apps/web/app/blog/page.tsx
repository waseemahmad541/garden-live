import type { Metadata } from "next";
import { BlogListingPage } from "@/components/public/static-public-pages";
import { getPublishedBlogPosts } from "@/lib/public/public-content-db";

export const metadata: Metadata = {
  title: "Blog",
  description: "Garden Live blog with guides on digital garden memberships, terrace gardens, AI Plant Doctor, Green Promise, nursery selection, and corporate greenery."
};

export const dynamic = "force-dynamic";

export default async function BlogRoutePage({ searchParams }: { searchParams?: { q?: string } }) {
  const query = searchParams?.q ?? "";
  const posts = await getPublishedBlogPosts(query);
  return <BlogListingPage posts={posts} query={query} />;
}
