import type { Metadata } from "next";
import { GalleryPage } from "@/components/public/public-site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "View Garden Live terrace gardens, vertical gardens, nursery collections, plant health moments, maintenance visits, and premium landscaping details."
};

export default function GalleryRoutePage() {
  return <GalleryPage />;
}
