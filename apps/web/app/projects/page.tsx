import type { Metadata } from "next";
import { ProjectsListingPage } from "@/components/public/static-public-pages";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore Garden Live landscaping and garden care projects with survey, quotation, execution, documentation, and maintenance handover."
};

export default function ProjectsRoutePage() {
  return <ProjectsListingPage />;
}
