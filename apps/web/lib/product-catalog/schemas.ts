import { z } from "zod";

const nullableString = z.string().trim().optional().nullable();
const mediaAssetSchema = z.object({
  url: z.string().trim().min(1),
  altText: nullableString,
  mimeType: nullableString,
  sizeBytes: z.coerce.number().int().positive().optional().nullable(),
  sortOrder: z.coerce.number().int().optional(),
  metadata: z.unknown().optional()
});

export const catalogProductSchema = z.object({
  productName: z.string().trim().min(1),
  sku: z.string().trim().min(1),
  categoryId: z.string().uuid().optional().nullable(),
  subCategoryId: z.string().uuid().optional().nullable(),
  brand: nullableString,
  description: nullableString,
  price: z.union([z.string().min(1), z.number()]),
  discountPrice: z.union([z.string().min(1), z.number()]).optional().nullable(),
  gst: z.union([z.string().min(1), z.number()]).optional().nullable(),
  stockQuantity: z.coerce.number().int().min(0).optional(),
  plantHeight: nullableString,
  potSize: nullableString,
  plantAge: nullableString,
  sunlightRequirement: nullableString,
  waterRequirement: nullableString,
  soilRequirement: nullableString,
  fertilizerSchedule: nullableString,
  maintenanceLevel: nullableString,
  indoorOutdoor: z.enum(["INDOOR", "OUTDOOR", "BOTH"]).optional().nullable(),
  airPurifying: z.boolean().optional(),
  floweringSeason: nullableString,
  fruitSeason: nullableString,
  images: z.array(mediaAssetSchema).optional(),
  videos: z.array(mediaAssetSchema).optional(),
  pdfCatalogue: mediaAssetSchema.optional().nullable(),
  relatedProductIds: z.array(z.string().uuid()).optional(),
  tags: z.array(z.string().trim().min(1)).optional(),
  status: z.enum(["DRAFT", "ACTIVE", "OUT_OF_STOCK", "ARCHIVED"]).optional(),
  featuredProduct: z.boolean().optional(),
  bestseller: z.boolean().optional(),
  newArrival: z.boolean().optional()
});

export const catalogProductUpdateSchema = catalogProductSchema.partial();

export const approvalSchema = z.object({
  approved: z.boolean(),
  notes: nullableString
});

export const inventorySchema = z.object({
  stockQuantity: z.coerce.number().int().min(0).optional(),
  reservedQuantity: z.coerce.number().int().min(0).optional(),
  lowStockThreshold: z.coerce.number().int().min(0).optional(),
  warehouseLocation: nullableString,
  movementReason: nullableString
});

export const bulkImportSchema = z.object({
  rows: z.array(catalogProductSchema).optional(),
  csv: z.string().optional(),
  excelRows: z.array(catalogProductSchema).optional()
});

export const bulkImagesSchema = z.object({
  images: z.array(
    mediaAssetSchema.extend({
      sku: z.string().trim().min(1)
    })
  )
});

export const compareSchema = z.object({
  productIds: z.array(z.string().uuid()).min(2).max(6)
});
