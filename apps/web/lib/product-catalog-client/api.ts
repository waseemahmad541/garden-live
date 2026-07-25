import type { CatalogCategory, CatalogListResponse, CatalogMedia, CatalogProduct, CatalogProductPayload } from "@/lib/product-catalog-client/types";

type ApiEnvelope<T> = {
  ok: boolean;
  data?: T;
  error?: {
    message: string;
  };
};

async function request<T>(path: string, init?: RequestInit) {
  const response = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    }
  });
  const payload = (await response.json().catch(() => ({}))) as ApiEnvelope<T>;

  if (!response.ok || !payload.ok) {
    throw new Error(payload.error?.message ?? "Catalog request failed.");
  }

  return payload.data as T;
}

export function getCategories() {
  return request<CatalogCategory[]>("/api/product-catalog/categories");
}

export function seedCategories() {
  return request<CatalogCategory[]>("/api/product-catalog/categories", { method: "POST" });
}

export function getProducts(params: URLSearchParams) {
  const query = params.toString();
  return request<CatalogListResponse>(`/api/product-catalog/products${query ? `?${query}` : ""}`);
}

export function getProduct(id: string) {
  return request<CatalogProduct>(`/api/product-catalog/products/${id}`);
}

export function createProduct(payload: CatalogProductPayload) {
  return request<CatalogProduct>("/api/product-catalog/products", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function updateProduct(id: string, payload: Partial<CatalogProductPayload>) {
  return request<CatalogProduct>(`/api/product-catalog/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload)
  });
}

export function deleteProduct(id: string) {
  return request<CatalogProduct>(`/api/product-catalog/products/${id}`, { method: "DELETE" });
}

export function approveProduct(id: string, approved: boolean, notes?: string) {
  return request<CatalogProduct>(`/api/product-catalog/products/${id}/approval`, {
    method: "POST",
    body: JSON.stringify({ approved, notes })
  });
}

export function updateInventory(id: string, payload: { stockQuantity?: number; reservedQuantity?: number; lowStockThreshold?: number; warehouseLocation?: string; movementReason?: string }) {
  return request<CatalogProduct>(`/api/product-catalog/products/${id}/inventory`, {
    method: "PATCH",
    body: JSON.stringify(payload)
  });
}

export function updateMedia(id: string, payload: { images?: CatalogMedia[]; videos?: CatalogMedia[]; pdfCatalogue?: CatalogMedia | null }) {
  return request<CatalogProduct>(`/api/product-catalog/products/${id}/media`, {
    method: "PATCH",
    body: JSON.stringify(payload)
  });
}

export function bulkImport(rows: CatalogProductPayload[]) {
  return request<{ created: CatalogProduct[]; failed: unknown[] }>("/api/product-catalog/import", {
    method: "POST",
    body: JSON.stringify({ rows })
  });
}

export function bulkImages(images: Array<CatalogMedia & { sku: string }>) {
  return request<{ uploaded: unknown[]; failed: unknown[] }>("/api/product-catalog/bulk-images", {
    method: "POST",
    body: JSON.stringify({ images })
  });
}

export function getLowStock() {
  return request<{ items: CatalogProduct[]; total: number }>("/api/product-catalog/low-stock");
}

export function compareProducts(productIds: string[]) {
  return request<{ products: CatalogProduct[]; fields: string[] }>("/api/product-catalog/compare", {
    method: "POST",
    body: JSON.stringify({ productIds })
  });
}

export function shareProduct(productId: string) {
  return request<{ productId: string; title: string; url: string; text: string }>("/api/product-catalog/share", {
    method: "POST",
    body: JSON.stringify({ productId })
  });
}
