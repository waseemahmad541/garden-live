import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetailPage } from "@/components/public/static-public-pages";
import { getPublishedBlogPost, getPublishedBlogPosts } from "@/lib/public/public-content-db";

export function generateStaticParams() {
  return [];
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPublishedBlogPost(params.slug);
  if (!post) return { title: "Blog Article" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }]
    }
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPublishedBlogPost(params.slug);
  if (!post) notFound();
  const related = (await getPublishedBlogPosts()).filter((item) => item.slug !== post.slug).slice(0, 2);
  return <BlogDetailPage post={post} related={related} />;
}
