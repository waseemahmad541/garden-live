import type { Metadata } from "next";
import { ProjectsPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  title: "Projects Portfolio",
  description: "Explore the Garden Live projects portfolio for terrace gardens, corporate green walls, villa landscapes, project tracking, documents, and maintenance handover."
};

export default function ProjectsPortfolioPage() {
  return <ProjectsPage />;
}
