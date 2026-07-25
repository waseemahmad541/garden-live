import { ProductCatalogWorkspace } from "@/components/product-catalog/product-catalog-workspace";

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  return <ProductCatalogWorkspace initialTab="Details" productId={params.id} />;
}
