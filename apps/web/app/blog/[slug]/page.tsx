import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetailPage } from "@/components/public/static-public-pages";
import { blogPosts, findBlogPost } from "@/components/public/public-content";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = findBlogPost(params.slug);
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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = findBlogPost(params.slug);
  if (!post) notFound();
  return <BlogDetailPage post={post} />;
}
