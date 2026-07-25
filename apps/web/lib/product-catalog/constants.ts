export const productCatalogCategories = [
  "Indoor Plants",
  "Palm Collection",
  "Fruit Plants",
  "Timber Plants",
  "Shrubs",
  "Creepers",
  "Ground Cover",
  "Topiary",
  "Vertical Garden",
  "Flower Plants",
  "Pots & Planters",
  "Garden Accessories",
  "Seeds",
  "Fertilizers",
  "Pesticides",
  "Garden Tools"
] as const;

export const productCatalogCategorySeeds = productCatalogCategories.map((name) => ({
  name,
  slug: name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}));

export const catalogMetadataKind = "PRODUCT_CATALOG_METADATA";
