import { ProductCatalogWorkspace } from "@/components/product-catalog/product-catalog-workspace";

export default function ProductMediaManagerPage({ params }: { params: { id: string } }) {
  return <ProductCatalogWorkspace initialTab="Media Manager" productId={params.id} />;
}
