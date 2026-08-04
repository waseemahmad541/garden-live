import type { Metadata } from "next";
import { ProjectsListingPage } from "@/components/public/static-public-pages";
import { getPublicProjects } from "@/lib/public/public-content-db";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore Garden Live landscaping and garden care projects with survey, quotation, execution, documentation, and maintenance handover."
};

export const dynamic = "force-dynamic";

export default async function ProjectsRoutePage() {
  const projects = await getPublicProjects();
  return <ProjectsListingPage projects={projects} />;
}
