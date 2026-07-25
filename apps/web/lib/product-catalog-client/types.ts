export type CatalogCategory = {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  children?: CatalogCategory[];
};

export type CatalogMedia = {
  id?: string;
  url: string;
  altText?: string | null;
  mimeType?: string | null;
  sizeBytes?: number | null;
  sortOrder?: number | null;
};

export type CatalogProduct = {
  id: string;
  productName: string;
  sku: string;
  categoryId?: string | null;
  category?: CatalogCategory | null;
  subCategoryId?: string | null;
  brand?: string | null;
  description?: string | null;
  price: string | number;
  discountPrice?: string | number | null;
  gst?: string | number | null;
  stockQuantity: number;
  reservedQuantity?: number;
  lowStockThreshold?: number;
  plantHeight?: string | null;
  potSize?: string | null;
  plantAge?: string | null;
  sunlightRequirement?: string | null;
  waterRequirement?: string | null;
  soilRequirement?: string | null;
  fertilizerSchedule?: string | null;
  maintenanceLevel?: string | null;
  indoorOutdoor?: "INDOOR" | "OUTDOOR" | "BOTH" | null;
  airPurifying?: boolean;
  floweringSeason?: string | null;
  fruitSeason?: string | null;
  images?: CatalogMedia[];
  videos?: CatalogMedia[];
  pdfCatalogue?: CatalogMedia | null;
  relatedProductIds?: string[];
  tags?: string[];
  status: "DRAFT" | "ACTIVE" | "OUT_OF_STOCK" | "ARCHIVED";
  featuredProduct?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type CatalogProductPayload = Omit<CatalogProduct, "id" | "category" | "createdAt" | "updatedAt" | "stockQuantity"> & {
  productName: string;
  sku: string;
  price: string | number;
  stockQuantity?: number;
};

export type CatalogListResponse = {
  items: CatalogProduct[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
