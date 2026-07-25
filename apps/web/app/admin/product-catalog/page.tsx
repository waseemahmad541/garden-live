import type { Metadata } from "next";
import { ProductCatalogWorkspace } from "@/components/product-catalog/product-catalog-workspace";

export const metadata: Metadata = {
  title: "Product Catalog Management",
  description: "Garden Live admin product catalog management frontend connected to the existing catalog APIs.",
  robots: {
    index: false,
    follow: false
  }
};

export default function ProductCatalogPage() {
  return <ProductCatalogWorkspace />;
}
