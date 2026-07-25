import type { Metadata } from "next";
import { ProjectsPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore Garden Live landscaping and garden care projects with survey, quotation, execution, documentation, and maintenance handover."
};

export default function ProjectsRoutePage() {
  return <ProjectsPage />;
}
