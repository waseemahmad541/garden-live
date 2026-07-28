import type { Metadata } from "next";
import { BlogListingPage } from "@/components/public/static-public-pages";

export const metadata: Metadata = {
  title: "Blog",
  description: "Garden Live blog with guides on digital garden memberships, terrace gardens, AI Plant Doctor, Green Promise, nursery selection, and corporate greenery."
};

export default function BlogRoutePage() {
  return <BlogListingPage />;
}
