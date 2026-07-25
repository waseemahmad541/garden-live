import { ProductCatalogWorkspace } from "@/components/product-catalog/product-catalog-workspace";

export default function EditProductPage({ params }: { params: { id: string } }) {
  return <ProductCatalogWorkspace initialTab="Edit Product" productId={params.id} />;
}
