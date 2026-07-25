import type { NextRequest } from "next/server";
import type { RoleName } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { ApiError } from "@/lib/api/errors";
import { requireRoles, type ApiSession } from "@/lib/api/auth";
import { catalogMetadataKind, productCatalogCategorySeeds } from "@/lib/product-catalog/constants";
import type { z } from "zod";
import type { catalogProductSchema, catalogProductUpdateSchema } from "@/lib/product-catalog/schemas";

type ProductInput = z.infer<typeof catalogProductSchema>;
type ProductUpdateInput = z.infer<typeof catalogProductUpdateSchema>;
type MediaAsset = NonNullable<ProductInput["images"]>[number];

export const catalogAdminRoles: RoleName[] = ["SUPER_ADMIN", "ADMIN", "NURSERY_PARTNER", "LANDSCAPE_PARTNER", "FRANCHISE_PARTNER"];
export const catalogReadRoles: RoleName[] = [
  "SUPER_ADMIN",
  "ADMIN",
  "SUPERVISOR",
  "GARDENER",
  "CUSTOMER",
  "NURSERY_PARTNER",
  "LANDSCAPE_PARTNER",
  "FRANCHISE_PARTNER"
];

export function requireCatalogAdmin(session: ApiSession) {
  requireRoles(session, catalogAdminRoles);
}

export function requireCatalogRead(session: ApiSession) {
  requireRoles(session, catalogReadRoles);
}

export async function auditCatalog(request: NextRequest, session: ApiSession, action: string, entityId: string | null, oldValue?: unknown, newValue?: unknown) {
  await prisma.activityLog.create({
    data: {
      actorUserId: session.userId,
      action,
      entityType: "ProductCatalog",
      entityId,
      oldValue: oldValue === undefined ? undefined : JSON.parse(JSON.stringify(oldValue)),
      newValue: newValue === undefined ? undefined : JSON.parse(JSON.stringify(newValue)),
      ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
      userAgent: request.headers.get("user-agent")
    }
  });
}

export function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function metadataFromInput(input: Partial<ProductInput>) {
  return {
    kind: catalogMetadataKind,
    brand: input.brand ?? null,
    subCategoryId: input.subCategoryId ?? null,
    plantHeight: input.plantHeight ?? null,
    potSize: input.potSize ?? null,
    plantAge: input.plantAge ?? null,
    sunlightRequirement: input.sunlightRequirement ?? null,
    waterRequirement: input.waterRequirement ?? null,
    soilRequirement: input.soilRequirement ?? null,
    fertilizerSchedule: input.fertilizerSchedule ?? null,
    maintenanceLevel: input.maintenanceLevel ?? null,
    indoorOutdoor: input.indoorOutdoor ?? null,
    airPurifying: input.airPurifying ?? false,
    floweringSeason: input.floweringSeason ?? null,
    fruitSeason: input.fruitSeason ?? null,
    relatedProductIds: input.relatedProductIds ?? [],
    tags: input.tags ?? [],
    featuredProduct: input.featuredProduct ?? false,
    bestseller: input.bestseller ?? false,
    newArrival: input.newArrival ?? false
  };
}

function mergeMetadata(existing: unknown, input: ProductUpdateInput) {
  const base = existing && typeof existing === "object" ? (existing as Record<string, unknown>) : {};
  return {
    ...base,
    ...Object.fromEntries(Object.entries(metadataFromInput(input)).filter(([, value]) => value !== undefined)),
    kind: catalogMetadataKind
  };
}

async function upsertCatalogMetadata(productId: string, metadata: unknown, userId: string) {
  const existing = await prisma.mediaFile.findFirst({
    where: {
      productId,
      type: "OTHER",
      deletedAt: null,
      metadata: {
        path: ["kind"],
        equals: catalogMetadataKind
      }
    }
  });

  if (existing) {
    return prisma.mediaFile.update({
      where: { id: existing.id },
      data: { metadata: metadata as any }
    });
  }

  return prisma.mediaFile.create({
    data: {
      uploadedById: userId,
      productId,
      type: "OTHER",
      url: `metadata://product-catalog/${productId}`,
      altText: "Product catalog metadata",
      metadata: metadata as any
    }
  });
}

async function replaceMedia(productId: string, userId: string, images?: MediaAsset[], videos?: MediaAsset[], pdfCatalogue?: MediaAsset | null) {
  if (images !== undefined || videos !== undefined || pdfCatalogue !== undefined) {
    const types = [
      ...(images !== undefined ? ["IMAGE" as const] : []),
      ...(videos !== undefined ? ["VIDEO" as const] : []),
      ...(pdfCatalogue !== undefined ? ["DOCUMENT" as const] : [])
    ];

    if (types.length) {
      await prisma.mediaFile.updateMany({
        where: {
          productId,
          type: { in: types },
          deletedAt: null
        },
        data: { deletedAt: new Date() }
      });
    }
  }

  const createData = [
    ...(images ?? []).map((asset, index) => ({ asset, type: "IMAGE" as const, kind: "PRODUCT_IMAGE", index })),
    ...(videos ?? []).map((asset, index) => ({ asset, type: "VIDEO" as const, kind: "PRODUCT_VIDEO", index })),
    ...(pdfCatalogue ? [{ asset: pdfCatalogue, type: "DOCUMENT" as const, kind: "PDF_CATALOGUE", index: 0 }] : [])
  ];

  if (!createData.length) return;

  await prisma.mediaFile.createMany({
    data: createData.map(({ asset, type, kind, index }) => ({
      uploadedById: userId,
      productId,
      type,
      url: asset.url,
      altText: asset.altText ?? null,
      mimeType: asset.mimeType ?? null,
      sizeBytes: asset.sizeBytes ?? null,
      sortOrder: asset.sortOrder ?? index,
      metadata: {
        kind,
        ...(asset.metadata && typeof asset.metadata === "object" ? (asset.metadata as Record<string, unknown>) : {})
      }
    }))
  });
}

export async function ensureCatalogCategories() {
  const categories = [];

  for (const seed of productCatalogCategorySeeds) {
    categories.push(
      await prisma.category.upsert({
        where: { slug: seed.slug },
        update: {
          name: seed.name,
          deletedAt: null
        },
        create: seed
      })
    );
  }

  return categories;
}

export async function listCatalogCategories() {
  return prisma.category.findMany({
    where: {
      deletedAt: null,
      OR: productCatalogCategorySeeds.map((seed) => ({ slug: seed.slug }))
    },
    include: { children: { where: { deletedAt: null } } },
    orderBy: { name: "asc" }
  });
}

export async function composeProduct(product: any) {
  const metadataFile = product.mediaFiles?.find((file: any) => file.type === "OTHER" && file.metadata?.kind === catalogMetadataKind);
  const metadata = metadataFile?.metadata ?? {};
  const images = product.mediaFiles?.filter((file: any) => file.type === "IMAGE") ?? [];
  const videos = product.mediaFiles?.filter((file: any) => file.type === "VIDEO") ?? [];
  const pdfCatalogue = product.mediaFiles?.find((file: any) => file.type === "DOCUMENT" && file.metadata?.kind === "PDF_CATALOGUE") ?? null;

  return {
    id: product.id,
    productName: product.name,
    sku: product.sku,
    category: product.category,
    categoryId: product.categoryId,
    subCategoryId: metadata.subCategoryId ?? null,
    brand: metadata.brand ?? null,
    description: product.description,
    price: product.price,
    discountPrice: product.salePrice,
    gst: product.gstRate,
    stockQuantity: product.inventory?.stockQuantity ?? 0,
    reservedQuantity: product.inventory?.reservedQuantity ?? 0,
    lowStockThreshold: product.inventory?.lowStockThreshold ?? 5,
    plantHeight: metadata.plantHeight ?? null,
    potSize: metadata.potSize ?? null,
    plantAge: metadata.plantAge ?? null,
    sunlightRequirement: metadata.sunlightRequirement ?? null,
    waterRequirement: metadata.waterRequirement ?? null,
    soilRequirement: metadata.soilRequirement ?? null,
    fertilizerSchedule: metadata.fertilizerSchedule ?? null,
    maintenanceLevel: metadata.maintenanceLevel ?? null,
    indoorOutdoor: metadata.indoorOutdoor ?? null,
    airPurifying: metadata.airPurifying ?? false,
    floweringSeason: metadata.floweringSeason ?? null,
    fruitSeason: metadata.fruitSeason ?? null,
    images,
    videos,
    pdfCatalogue,
    relatedProductIds: metadata.relatedProductIds ?? [],
    tags: metadata.tags ?? [],
    status: product.status,
    featuredProduct: metadata.featuredProduct ?? false,
    bestseller: metadata.bestseller ?? false,
    newArrival: metadata.newArrival ?? false,
    isAiRecommended: product.isAiRecommended,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt
  };
}

export async function getProductForCatalog(id: string) {
  const product = await prisma.product.findFirst({
    where: { id, deletedAt: null },
    include: {
      category: true,
      inventory: true,
      mediaFiles: {
        where: { deletedAt: null },
        orderBy: { sortOrder: "asc" }
      }
    }
  });

  if (!product) throw new ApiError(404, "Product not found.", "PRODUCT_NOT_FOUND");
  return composeProduct(product);
}

export async function createCatalogProduct(input: ProductInput, session: ApiSession) {
  const product = await prisma.$transaction(async (tx) => {
    const created = await tx.product.create({
      data: {
        categoryId: input.subCategoryId ?? input.categoryId ?? null,
        name: input.productName,
        slug: slugify(`${input.productName}-${input.sku}`),
        description: input.description ?? null,
        sku: input.sku,
        gstRate: input.gst ?? null,
        price: input.price,
        salePrice: input.discountPrice ?? null,
        status: input.status ?? "DRAFT",
        isAiRecommended: false,
        inventory: {
          create: {
            stockQuantity: input.stockQuantity ?? 0,
            lowStockThreshold: 5
          }
        }
      }
    });

    return created;
  });

  await upsertCatalogMetadata(product.id, metadataFromInput(input), session.userId);
  await replaceMedia(product.id, session.userId, input.images, input.videos, input.pdfCatalogue);
  return getProductForCatalog(product.id);
}

export async function updateCatalogProduct(id: string, input: ProductUpdateInput, session: ApiSession) {
  const existing = await prisma.product.findFirst({
    where: { id, deletedAt: null },
    include: {
      inventory: true,
      mediaFiles: {
        where: { deletedAt: null }
      }
    }
  });

  if (!existing) throw new ApiError(404, "Product not found.", "PRODUCT_NOT_FOUND");

  await prisma.product.update({
    where: { id },
    data: {
      categoryId: input.subCategoryId ?? input.categoryId ?? existing.categoryId,
      name: input.productName ?? existing.name,
      description: input.description ?? existing.description,
      sku: input.sku ?? existing.sku,
      gstRate: input.gst === undefined ? existing.gstRate : input.gst,
      price: input.price ?? existing.price,
      salePrice: input.discountPrice === undefined ? existing.salePrice : input.discountPrice,
      status: input.status ?? existing.status
    }
  });

  if (input.stockQuantity !== undefined) {
    await prisma.inventory.upsert({
      where: { productId: id },
      update: { stockQuantity: input.stockQuantity },
      create: { productId: id, stockQuantity: input.stockQuantity }
    });
  }

  const metadataFile = existing.mediaFiles.find((file) => file.type === "OTHER" && (file.metadata as any)?.kind === catalogMetadataKind);
  await upsertCatalogMetadata(id, mergeMetadata(metadataFile?.metadata, input), session.userId);
  await replaceMedia(id, session.userId, input.images, input.videos, input.pdfCatalogue);
  return getProductForCatalog(id);
}

export async function listCatalogProducts(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const page = Math.max(Number(params.get("page") ?? 1), 1);
  const limit = Math.min(Math.max(Number(params.get("limit") ?? 20), 1), 100);
  const search = params.get("search")?.trim();
  const categoryId = params.get("categoryId");
  const status = params.get("status");
  const featured = params.get("featuredProduct");
  const bestseller = params.get("bestseller");
  const newArrival = params.get("newArrival");
  const lowStock = params.get("lowStock") === "true";
  const sortBy = params.get("sortBy") ?? "createdAt";
  const sortOrder = params.get("sortOrder") === "asc" ? "asc" : "desc";

  const allowedSorts = ["createdAt", "updatedAt", "name", "price", "salePrice", "status", "sku"];
  if (!allowedSorts.includes(sortBy)) throw new ApiError(400, "Invalid product sort field.", "INVALID_SORT");

  const where: any = {
    deletedAt: null,
    ...(categoryId ? { categoryId } : {}),
    ...(status ? { status } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { sku: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } }
          ]
        }
      : {})
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        category: true,
        inventory: true,
        mediaFiles: {
          where: { deletedAt: null },
          orderBy: { sortOrder: "asc" }
        }
      },
      skip: lowStock ? undefined : (page - 1) * limit,
      take: lowStock ? undefined : limit,
      orderBy: { [sortBy]: sortOrder }
    }),
    prisma.product.count({ where })
  ]);

  const items = await Promise.all(products.map(composeProduct));
  const filtered = items.filter((item: any) => {
    if (lowStock && item.stockQuantity > item.lowStockThreshold) return false;
    if (featured !== null && String(item.featuredProduct) !== featured) return false;
    if (bestseller !== null && String(item.bestseller) !== bestseller) return false;
    if (newArrival !== null && String(item.newArrival) !== newArrival) return false;
    return true;
  });
  const paginated = lowStock ? filtered.slice((page - 1) * limit, page * limit) : filtered;
  const effectiveTotal = lowStock ? filtered.length : total;

  return {
    items: paginated,
    pagination: {
      page,
      limit,
      total: effectiveTotal,
      totalPages: Math.ceil(effectiveTotal / limit)
    }
  };
}

export async function softDeleteCatalogProduct(id: string) {
  const existing = await prisma.product.findFirst({ where: { id, deletedAt: null } });
  if (!existing) throw new ApiError(404, "Product not found.", "PRODUCT_NOT_FOUND");
  return prisma.product.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      status: "ARCHIVED"
    }
  });
}

export async function parseCsvProducts(csv: string): Promise<ProductInput[]> {
  const rows = csv.split(/\r?\n/).filter(Boolean);
  if (rows.length < 2) return [];
  const headers = rows[0].split(",").map((header) => header.trim());

  return rows.slice(1).map((row) => {
    const values = row.split(",").map((value) => value.trim());
    return headers.reduce<Record<string, unknown>>((acc, header, index) => {
      acc[header] = values[index] ?? "";
      return acc;
    }, {}) as ProductInput;
  });
}
