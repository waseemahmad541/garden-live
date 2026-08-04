import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/components/public/static-public-pages";
import { getPublicProject } from "@/lib/public/public-content-db";

export function generateStaticParams() {
  return [];
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getPublicProject(params.slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.image, width: 1200, height: 630, alt: project.title }]
    }
  };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getPublicProject(params.slug);
  if (!project) notFound();
  return <ProjectDetailPage project={project} />;
}
