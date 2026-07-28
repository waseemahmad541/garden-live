import type { Metadata } from "next";
import { ProjectsListingPage } from "@/components/public/static-public-pages";

export const metadata: Metadata = {
  title: "Projects Portfolio",
  description: "Explore the Garden Live projects portfolio for terrace gardens, corporate green walls, villa landscapes, project tracking, documents, and maintenance handover."
};

export default function ProjectsPortfolioPage() {
  return <ProjectsListingPage />;
}
