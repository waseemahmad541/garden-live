import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/components/public/static-public-pages";
import { findProject, projectItems } from "@/components/public/public-content";

export function generateStaticParams() {
  return projectItems.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = findProject(params.slug);
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

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = findProject(params.slug);
  if (!project) notFound();
  return <ProjectDetailPage project={project} />;
}
