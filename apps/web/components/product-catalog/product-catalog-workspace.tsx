"use client";

import Image from "next/image";
import * as React from "react";
import {
  AlertTriangle,
  ArrowUpDown,
  BadgeCheck,
  Boxes,
  Check,
  Copy,
  Download,
  Eye,
  Edit3,
  FileImage,
  FileSpreadsheet,
  Filter,
  Heart,
  ImagePlus,
  Link2,
  Loader2,
  PackagePlus,
  Search,
  Share2,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Tags,
  Trash2,
  Upload,
  X
} from "lucide-react";
import Link from "next/link";
import { Badge, Button, Input, Modal, Select, Textarea, ToastProvider, useToast } from "@/components";
import * as catalogApi from "@/lib/product-catalog-client/api";
import type { CatalogCategory, CatalogListResponse, CatalogMedia, CatalogProduct, CatalogProductPayload } from "@/lib/product-catalog-client/types";

const tabs = [
  "Dashboard",
  "Add Product",
  "Edit Product",
  "Categories",
  "Inventory",
  "Bulk Upload",
  "Image Upload",
  "Approvals",
  "Low Stock",
  "Search",
  "Compare",
  "Share",
  "Details",
  "Media Manager"
] as const;

type Tab = (typeof tabs)[number];

const emptyPayload: CatalogProductPayload = {
  productName: "",
  sku: "",
  categoryId: "",
  subCategoryId: "",
  brand: "",
  description: "",
  price: "",
  discountPrice: "",
  gst: "",
  stockQuantity: 0,
  plantHeight: "",
  potSize: "",
  plantAge: "",
  sunlightRequirement: "",
  waterRequirement: "",
  soilRequirement: "",
  fertilizerSchedule: "",
  maintenanceLevel: "Medium",
  indoorOutdoor: "BOTH",
  airPurifying: false,
  floweringSeason: "",
  fruitSeason: "",
  images: [],
  videos: [],
  pdfCatalogue: null,
  relatedProductIds: [],
  tags: [],
  status: "DRAFT",
  featuredProduct: false,
  bestseller: false,
  newArrival: false
};

function formatMoney(value: string | number | null | undefined) {
  const amount = Number(value ?? 0);
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

function compactPayload(payload: CatalogProductPayload) {
  return {
    ...payload,
    categoryId: payload.categoryId || null,
    subCategoryId: payload.subCategoryId || null,
    discountPrice: payload.discountPrice || null,
    gst: payload.gst || null,
    tags: payload.tags?.filter(Boolean) ?? [],
    relatedProductIds: payload.relatedProductIds?.filter(Boolean) ?? [],
    images: payload.images?.filter((item) => item.url),
    videos: payload.videos?.filter((item) => item.url),
    pdfCatalogue: payload.pdfCatalogue?.url ? payload.pdfCatalogue : null
  };
}

function productToPayload(product: CatalogProduct): CatalogProductPayload {
  return {
    ...emptyPayload,
    productName: product.productName,
    sku: product.sku,
    categoryId: product.categoryId ?? product.category?.id ?? "",
    subCategoryId: product.subCategoryId ?? "",
    brand: product.brand ?? "",
    description: product.description ?? "",
    price: product.price,
    discountPrice: product.discountPrice ?? "",
    gst: product.gst ?? "",
    stockQuantity: product.stockQuantity ?? 0,
    plantHeight: product.plantHeight ?? "",
    potSize: product.potSize ?? "",
    plantAge: product.plantAge ?? "",
    sunlightRequirement: product.sunlightRequirement ?? "",
    waterRequirement: product.waterRequirement ?? "",
    soilRequirement: product.soilRequirement ?? "",
    fertilizerSchedule: product.fertilizerSchedule ?? "",
    maintenanceLevel: product.maintenanceLevel ?? "Medium",
    indoorOutdoor: product.indoorOutdoor ?? "BOTH",
    airPurifying: product.airPurifying ?? false,
    floweringSeason: product.floweringSeason ?? "",
    fruitSeason: product.fruitSeason ?? "",
    images: product.images ?? [],
    videos: product.videos ?? [],
    pdfCatalogue: product.pdfCatalogue ?? null,
    relatedProductIds: product.relatedProductIds ?? [],
    tags: product.tags ?? [],
    status: product.status,
    featuredProduct: product.featuredProduct ?? false,
    bestseller: product.bestseller ?? false,
    newArrival: product.newArrival ?? false
  };
}

function Panel({ title, action, children, className }: { title: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-[#E3E8E2] bg-white p-5 shadow-glXs ${className ?? ""}`}>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-botanical-black">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Metric({ label, value, detail, icon }: { label: string; value: string; detail: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#E3E8E2] bg-white p-5 shadow-glXs">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-neutral-slate">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-[0] text-botanical-black">{value}</p>
          <p className="mt-2 text-sm text-neutral-slate">{detail}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-gl bg-botanical-mint text-botanical-green">{icon}</div>
      </div>
    </div>
  );
}

function ProductForm({
  categories,
  value,
  onChange,
  onSubmit,
  submitLabel,
  loading
}: {
  categories: CatalogCategory[];
  value: CatalogProductPayload;
  onChange: (value: CatalogProductPayload) => void;
  onSubmit: () => void;
  submitLabel: string;
  loading?: boolean;
}) {
  const categoryOptions = [{ label: "Select category", value: "" }, ...categories.map((category) => ({ label: category.name, value: category.id }))];
  const set = <K extends keyof CatalogProductPayload>(key: K, fieldValue: CatalogProductPayload[K]) => onChange({ ...value, [key]: fieldValue });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Input label="Product Name" value={value.productName} onChange={(event) => set("productName", event.target.value)} />
        <Input label="SKU" value={value.sku} onChange={(event) => set("sku", event.target.value)} />
        <Input label="Brand" value={value.brand ?? ""} onChange={(event) => set("brand", event.target.value)} />
        <Select label="Category" value={value.categoryId ?? ""} onChange={(event) => set("categoryId", event.target.value)} options={categoryOptions} />
        <Select label="Sub Category" value={value.subCategoryId ?? ""} onChange={(event) => set("subCategoryId", event.target.value)} options={categoryOptions} />
        <Select label="Status" value={value.status ?? "DRAFT"} onChange={(event) => set("status", event.target.value as CatalogProductPayload["status"])} options={["DRAFT", "ACTIVE", "OUT_OF_STOCK", "ARCHIVED"].map((item) => ({ label: item.replaceAll("_", " "), value: item }))} />
      </div>

      <Textarea label="Description" value={value.description ?? ""} onChange={(event) => set("description", event.target.value)} />

      <div className="grid gap-4 md:grid-cols-4">
        <Input label="Price" inputMode="decimal" value={String(value.price ?? "")} onChange={(event) => set("price", event.target.value)} />
        <Input label="Discount Price" inputMode="decimal" value={String(value.discountPrice ?? "")} onChange={(event) => set("discountPrice", event.target.value)} />
        <Input label="GST %" inputMode="decimal" value={String(value.gst ?? "")} onChange={(event) => set("gst", event.target.value)} />
        <Input label="Stock Quantity" inputMode="numeric" value={String(value.stockQuantity ?? 0)} onChange={(event) => set("stockQuantity", Number(event.target.value || 0))} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Input label="Plant Height" value={value.plantHeight ?? ""} onChange={(event) => set("plantHeight", event.target.value)} />
        <Input label="Pot Size" value={value.potSize ?? ""} onChange={(event) => set("potSize", event.target.value)} />
        <Input label="Plant Age" value={value.plantAge ?? ""} onChange={(event) => set("plantAge", event.target.value)} />
        <Input label="Sunlight Requirement" value={value.sunlightRequirement ?? ""} onChange={(event) => set("sunlightRequirement", event.target.value)} />
        <Input label="Water Requirement" value={value.waterRequirement ?? ""} onChange={(event) => set("waterRequirement", event.target.value)} />
        <Input label="Soil Requirement" value={value.soilRequirement ?? ""} onChange={(event) => set("soilRequirement", event.target.value)} />
        <Input label="Fertilizer Schedule" value={value.fertilizerSchedule ?? ""} onChange={(event) => set("fertilizerSchedule", event.target.value)} />
        <Input label="Maintenance Level" value={value.maintenanceLevel ?? ""} onChange={(event) => set("maintenanceLevel", event.target.value)} />
        <Select label="Indoor / Outdoor" value={value.indoorOutdoor ?? "BOTH"} onChange={(event) => set("indoorOutdoor", event.target.value as CatalogProductPayload["indoorOutdoor"])} options={["INDOOR", "OUTDOOR", "BOTH"].map((item) => ({ label: item, value: item }))} />
        <Input label="Flowering Season" value={value.floweringSeason ?? ""} onChange={(event) => set("floweringSeason", event.target.value)} />
        <Input label="Fruit Season" value={value.fruitSeason ?? ""} onChange={(event) => set("fruitSeason", event.target.value)} />
        <Input label="Tags" helperText="Comma separated" value={(value.tags ?? []).join(", ")} onChange={(event) => set("tags", event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean))} />
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {[
          ["airPurifying", "Air Purifying"],
          ["featuredProduct", "Featured Product"],
          ["bestseller", "Bestseller"],
          ["newArrival", "New Arrival"]
        ].map(([key, label]) => (
          <label key={key} className="flex items-center justify-between rounded-gl border border-[#DDE5DC] bg-neutral-cloud px-3 py-2 text-sm font-semibold text-botanical-black">
            {label}
            <input
              type="checkbox"
              checked={Boolean(value[key as keyof CatalogProductPayload])}
              onChange={(event) => set(key as keyof CatalogProductPayload, event.target.checked as never)}
              className="h-4 w-4 accent-botanical-green"
            />
          </label>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Input label="Image URLs" helperText="Comma separated" value={(value.images ?? []).map((item) => item.url).join(", ")} onChange={(event) => set("images", event.target.value.split(",").map((url, index) => ({ url: url.trim(), sortOrder: index })).filter((item) => item.url))} />
        <Input label="Video URLs" helperText="Comma separated" value={(value.videos ?? []).map((item) => item.url).join(", ")} onChange={(event) => set("videos", event.target.value.split(",").map((url, index) => ({ url: url.trim(), sortOrder: index })).filter((item) => item.url))} />
        <Input label="PDF Catalogue URL" value={value.pdfCatalogue?.url ?? ""} onChange={(event) => set("pdfCatalogue", event.target.value ? { url: event.target.value } : null)} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={() => onChange(emptyPayload)}>Reset</Button>
        <Button onClick={onSubmit} isLoading={loading} leftIcon={<PackagePlus className="h-4 w-4" aria-hidden />}>{submitLabel}</Button>
      </div>
    </div>
  );
}

function CatalogApp({ initialTab = "Dashboard", productId }: { initialTab?: Tab; productId?: string }) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = React.useState<Tab>(initialTab);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [categories, setCategories] = React.useState<CatalogCategory[]>([]);
  const [products, setProducts] = React.useState<CatalogProduct[]>([]);
  const [lowStock, setLowStock] = React.useState<CatalogProduct[]>([]);
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [sortBy, setSortBy] = React.useState("createdAt");
  const [page, setPage] = React.useState(1);
  const [pagination, setPagination] = React.useState<CatalogListResponse["pagination"] | null>(null);
  const [selectedProductId, setSelectedProductId] = React.useState("");
  const [form, setForm] = React.useState<CatalogProductPayload>(emptyPayload);
  const [inventoryDraft, setInventoryDraft] = React.useState({ stockQuantity: 0, reservedQuantity: 0, lowStockThreshold: 5, warehouseLocation: "" });
  const [bulkText, setBulkText] = React.useState("");
  const [bulkImageText, setBulkImageText] = React.useState("");
  const [compareIds, setCompareIds] = React.useState<string[]>([]);
  const [compareResult, setCompareResult] = React.useState<CatalogProduct[]>([]);
  const [shareLink, setShareLink] = React.useState("");
  const [deleteTarget, setDeleteTarget] = React.useState<CatalogProduct | null>(null);

  const selectedProduct = React.useMemo(() => products.find((product) => product.id === selectedProductId), [products, selectedProductId]);

  const fetchCatalog = React.useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.set("search", query);
      if (status) params.set("status", status);
      params.set("sortBy", sortBy);
      params.set("page", String(page));
      params.set("limit", "12");
      const [categoryData, productData] = await Promise.all([catalogApi.getCategories(), catalogApi.getProducts(params)]);
      setCategories(categoryData);
      setProducts(productData.items);
      setPagination(productData.pagination);
      if (!selectedProductId && productData.items[0]) setSelectedProductId(productData.items[0].id);
    } catch (error) {
      showToast({ tone: "error", title: "Catalog failed to load", description: error instanceof Error ? error.message : "Check your session and API." });
    } finally {
      setLoading(false);
    }
  }, [page, query, selectedProductId, showToast, sortBy, status]);

  React.useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  React.useEffect(() => {
    if (!productId) return;
    setSelectedProductId(productId);
    catalogApi
      .getProduct(productId)
      .then((product) => {
        setProducts((current) => (current.some((item) => item.id === product.id) ? current : [product, ...current]));
        setForm(productToPayload(product));
      })
      .catch((error) => showToast({ tone: "error", title: "Product failed to load", description: error instanceof Error ? error.message : "Open the product list and try again." }));
  }, [productId, showToast]);

  React.useEffect(() => {
    if (selectedProduct) {
      setForm(productToPayload(selectedProduct));
      setInventoryDraft({
        stockQuantity: selectedProduct.stockQuantity ?? 0,
        reservedQuantity: selectedProduct.reservedQuantity ?? 0,
        lowStockThreshold: selectedProduct.lowStockThreshold ?? 5,
        warehouseLocation: ""
      });
    }
  }, [selectedProduct]);

  async function runAction<T>(title: string, action: () => Promise<T>, after?: (data: T) => void) {
    setSaving(true);
    try {
      const data = await action();
      after?.(data);
      showToast({ tone: "success", title });
      await fetchCatalog();
    } catch (error) {
      showToast({ tone: "error", title: "Action failed", description: error instanceof Error ? error.message : "Please try again." });
    } finally {
      setSaving(false);
    }
  }

  async function loadLowStock() {
    await runAction("Low stock dashboard refreshed", catalogApi.getLowStock, (data) => setLowStock(data.items));
  }

  function parseBulkProducts() {
    return bulkText
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => {
        const [productName, sku, price, stockQuantity, categoryId] = line.split(",").map((item) => item.trim());
        return { ...emptyPayload, productName, sku, price, stockQuantity: Number(stockQuantity || 0), categoryId: categoryId || "" };
      });
  }

  function parseBulkImages() {
    return bulkImageText
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => {
        const [sku, url, altText] = line.split(",").map((item) => item.trim());
        return { sku, url, altText };
      });
  }

  async function runCompare() {
    await runAction("Compare view ready", () => catalogApi.compareProducts(compareIds), (data) => setCompareResult(data.products));
  }

  async function runShare(productId: string) {
    await runAction("Share link generated", () => catalogApi.shareProduct(productId), (data) => {
      setShareLink(data.url);
      navigator.clipboard?.writeText(data.url).catch(() => undefined);
    });
  }

  const draftProducts = products.filter((product) => product.status === "DRAFT");

  return (
    <main className="min-h-screen bg-neutral-cloud text-botanical-black">
      <div className="border-b border-[#E3E8E2] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Badge tone="premium">Product Catalog Management</Badge>
              <h1 className="mt-4 text-3xl font-semibold tracking-[0] sm:text-4xl">Garden Live Catalog Studio</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-slate">
                Manage plant categories, products, approvals, inventory, bulk uploads, customer search, comparison, and share flows from one responsive workspace.
              </p>
            </div>
          <div className="flex flex-wrap gap-3">
              <Button variant="secondary" leftIcon={<Upload className="h-4 w-4" />} onClick={() => runAction("Categories seeded", catalogApi.seedCategories)}>Seed Categories</Button>
              <Button asChild leftIcon={<PackagePlus className="h-4 w-4" />}>
                <Link href="/admin/product-catalog/products/add">Add Product</Link>
              </Button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 rounded-gl px-3 py-2 text-sm font-semibold transition ${activeTab === tab ? "bg-botanical-green text-white shadow-glXs" : "bg-neutral-cloud text-neutral-slate hover:bg-neutral-mist"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric label="Products" value={String(products.length)} detail="Loaded from catalog API" icon={<Boxes className="h-5 w-5" />} />
          <Metric label="Categories" value={String(categories.length)} detail="Managed taxonomy" icon={<Tags className="h-5 w-5" />} />
          <Metric label="Draft Approvals" value={String(draftProducts.length)} detail="Awaiting product approval" icon={<BadgeCheck className="h-5 w-5" />} />
          <Metric label="Low Stock" value={String(products.filter((p) => p.stockQuantity <= (p.lowStockThreshold ?? 5)).length)} detail="Needs replenishment" icon={<AlertTriangle className="h-5 w-5" />} />
        </div>

        <Panel title="Catalog Controls">
          <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_auto]">
            <Input placeholder="Search products, SKU, description" value={query} onChange={(event) => { setPage(1); setQuery(event.target.value); }} leftIcon={<Search className="h-4 w-4" />} />
            <Select value={status} onChange={(event) => { setPage(1); setStatus(event.target.value); }} options={[{ label: "All status", value: "" }, "DRAFT", "ACTIVE", "OUT_OF_STOCK", "ARCHIVED"].map((item) => typeof item === "string" ? { label: item, value: item } : item)} />
            <Select value={sortBy} onChange={(event) => { setPage(1); setSortBy(event.target.value); }} options={["createdAt", "name", "price", "status", "sku"].map((item) => ({ label: item, value: item }))} />
            <Button variant="secondary" isLoading={loading} leftIcon={<Filter className="h-4 w-4" />} onClick={fetchCatalog}>Apply</Button>
          </div>
        </Panel>

        {loading ? (
          <div className="grid min-h-64 place-items-center rounded-xl border border-[#E3E8E2] bg-white">
            <div className="text-center">
              <Loader2 className="mx-auto h-7 w-7 animate-spin text-botanical-green" />
              <p className="mt-3 text-sm font-semibold text-neutral-slate">Loading catalog workspace</p>
            </div>
          </div>
        ) : null}

        {activeTab === "Dashboard" || activeTab === "Search" ? (
          <Panel title={activeTab === "Search" ? "Product Search" : "Admin Product Dashboard"} action={<Button variant="secondary" leftIcon={<Download className="h-4 w-4" />}>Export View</Button>}>
            <ProductTable
              products={products}
              onEdit={(product) => {
                setSelectedProductId(product.id);
                window.location.href = `/admin/product-catalog/products/${product.id}/edit`;
              }}
              onDelete={setDeleteTarget}
              onApprove={(product) => runAction("Product approved", () => catalogApi.approveProduct(product.id, true))}
              onShare={(product) => runShare(product.id)}
              compareIds={compareIds}
              onToggleCompare={(productId) => setCompareIds((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId].slice(0, 6))}
            />
            <PaginationControls pagination={pagination} onPageChange={setPage} />
          </Panel>
        ) : null}

        {activeTab === "Add Product" ? (
          <Panel title="Add Product Page">
            <ProductForm categories={categories} value={form} onChange={setForm} loading={saving} submitLabel="Create Product" onSubmit={() => runAction("Product created", () => catalogApi.createProduct(compactPayload(form)), (product) => { setForm(emptyPayload); window.location.href = `/admin/product-catalog/products/${product.id}`; })} />
          </Panel>
        ) : null}

        {activeTab === "Edit Product" ? (
          <Panel title="Edit Product">
            <div className="mb-5">
              <Select label="Select Product" value={selectedProductId} onChange={(event) => setSelectedProductId(event.target.value)} options={products.map((product) => ({ label: `${product.productName} (${product.sku})`, value: product.id }))} />
            </div>
            <ProductForm categories={categories} value={form} onChange={setForm} loading={saving} submitLabel="Save Changes" onSubmit={() => selectedProductId ? runAction("Product updated", () => catalogApi.updateProduct(selectedProductId, compactPayload(form))) : undefined} />
          </Panel>
        ) : null}

        {activeTab === "Categories" ? (
          <Panel title="Category Management" action={<Button leftIcon={<Sparkles className="h-4 w-4" />} onClick={() => runAction("Categories synced", catalogApi.seedCategories)}>Sync Required Categories</Button>}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <div key={category.id} className="rounded-xl border border-[#E3E8E2] bg-neutral-cloud p-4">
                  <p className="font-semibold text-botanical-black">{category.name}</p>
                  <p className="mt-1 text-sm text-neutral-slate">{category.slug}</p>
                </div>
              ))}
            </div>
          </Panel>
        ) : null}

        {activeTab === "Inventory" ? (
          <Panel title="Inventory Management">
            <div className="grid gap-4 md:grid-cols-5">
              <Select label="Product" value={selectedProductId} onChange={(event) => setSelectedProductId(event.target.value)} options={products.map((product) => ({ label: product.productName, value: product.id }))} />
              <Input label="Stock" inputMode="numeric" value={String(inventoryDraft.stockQuantity)} onChange={(event) => setInventoryDraft({ ...inventoryDraft, stockQuantity: Number(event.target.value || 0) })} />
              <Input label="Reserved" inputMode="numeric" value={String(inventoryDraft.reservedQuantity)} onChange={(event) => setInventoryDraft({ ...inventoryDraft, reservedQuantity: Number(event.target.value || 0) })} />
              <Input label="Low Stock Alert" inputMode="numeric" value={String(inventoryDraft.lowStockThreshold)} onChange={(event) => setInventoryDraft({ ...inventoryDraft, lowStockThreshold: Number(event.target.value || 0) })} />
              <Input label="Warehouse" value={inventoryDraft.warehouseLocation} onChange={(event) => setInventoryDraft({ ...inventoryDraft, warehouseLocation: event.target.value })} />
            </div>
            <Button className="mt-5" isLoading={saving} leftIcon={<Boxes className="h-4 w-4" />} onClick={() => selectedProductId ? runAction("Inventory updated", () => catalogApi.updateInventory(selectedProductId, { ...inventoryDraft, movementReason: "Admin inventory management" })) : undefined}>Update Inventory</Button>
          </Panel>
        ) : null}

        {activeTab === "Bulk Upload" ? (
          <Panel title="Bulk Product Upload" action={<Badge tone="info">CSV / Excel rows</Badge>}>
            <Textarea rows={8} value={bulkText} onChange={(event) => setBulkText(event.target.value)} label="Rows" helperText="One product per line: Product Name, SKU, Price, Stock, Category ID" />
            <Button className="mt-4" isLoading={saving} leftIcon={<FileSpreadsheet className="h-4 w-4" />} onClick={() => runAction("Bulk import completed", () => catalogApi.bulkImport(parseBulkProducts()))}>Import Products</Button>
          </Panel>
        ) : null}

        {activeTab === "Image Upload" ? (
          <Panel title="Bulk Image Upload">
            <DropZone onDropText={(text) => setBulkImageText((current) => `${current}${current ? "\n" : ""}${text}`)} />
            <Textarea rows={8} value={bulkImageText} onChange={(event) => setBulkImageText(event.target.value)} label="Image rows" helperText="One image per line: SKU, Image URL, Alt Text" />
            <Button className="mt-4" isLoading={saving} leftIcon={<ImagePlus className="h-4 w-4" />} onClick={() => runAction("Bulk images uploaded", () => catalogApi.bulkImages(parseBulkImages()))}>Upload Images</Button>
          </Panel>
        ) : null}

        {activeTab === "Approvals" ? (
          <Panel title="Product Approval Screen">
            <ProductTable products={draftProducts} onEdit={(product) => setSelectedProductId(product.id)} onDelete={setDeleteTarget} onApprove={(product) => runAction("Product approved", () => catalogApi.approveProduct(product.id, true, "Approved from catalog workspace"))} onShare={(product) => runShare(product.id)} compareIds={compareIds} onToggleCompare={(id) => setCompareIds([...compareIds, id].slice(0, 6))} />
          </Panel>
        ) : null}

        {activeTab === "Low Stock" ? (
          <Panel title="Low Stock Dashboard" action={<Button variant="secondary" leftIcon={<SlidersHorizontal className="h-4 w-4" />} onClick={loadLowStock}>Refresh Low Stock</Button>}>
            <ProductTable products={lowStock.length ? lowStock : products.filter((product) => product.stockQuantity <= (product.lowStockThreshold ?? 5))} onEdit={(product) => setSelectedProductId(product.id)} onDelete={setDeleteTarget} onApprove={(product) => runAction("Product approved", () => catalogApi.approveProduct(product.id, true))} onShare={(product) => runShare(product.id)} compareIds={compareIds} onToggleCompare={(id) => setCompareIds([...compareIds, id].slice(0, 6))} />
          </Panel>
        ) : null}

        {activeTab === "Compare" ? (
          <Panel title="Product Compare" action={<Button leftIcon={<ArrowUpDown className="h-4 w-4" />} disabled={compareIds.length < 2} onClick={runCompare}>Compare Selected</Button>}>
            <p className="mb-4 text-sm text-neutral-slate">Select 2 to 6 products from the dashboard table. Selected: {compareIds.length}</p>
            <CompareTable products={compareResult} />
          </Panel>
        ) : null}

        {activeTab === "Details" && selectedProduct ? (
          <ProductDetails product={selectedProduct} onShare={() => runShare(selectedProduct.id)} />
        ) : null}

        {activeTab === "Media Manager" && selectedProduct ? (
          <Panel title="Product Media Manager">
            <MediaManager
              product={selectedProduct}
              saving={saving}
              onSave={(payload) => runAction("Media updated", () => catalogApi.updateMedia(selectedProduct.id, payload))}
            />
          </Panel>
        ) : null}

        {activeTab === "Share" ? (
          <Panel title="Product Share Link">
            <div className="grid gap-4 md:grid-cols-[1fr_auto]">
              <Select label="Product" value={selectedProductId} onChange={(event) => setSelectedProductId(event.target.value)} options={products.map((product) => ({ label: product.productName, value: product.id }))} />
              <Button className="self-end" leftIcon={<Share2 className="h-4 w-4" />} onClick={() => selectedProductId ? runShare(selectedProductId) : undefined}>Generate Link</Button>
            </div>
            {shareLink ? (
              <div className="mt-5 flex flex-col gap-3 rounded-xl border border-[#E3E8E2] bg-neutral-cloud p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="break-all text-sm font-semibold text-botanical-black">{shareLink}</p>
                <Button variant="secondary" leftIcon={<Copy className="h-4 w-4" />} onClick={() => navigator.clipboard?.writeText(shareLink)}>Copy</Button>
              </div>
            ) : null}
          </Panel>
        ) : null}
      </div>

      <Modal
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Product"
        description="This archives the product through the existing catalog API."
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" isLoading={saving} onClick={() => deleteTarget ? runAction("Product deleted", () => catalogApi.deleteProduct(deleteTarget.id), () => setDeleteTarget(null)) : undefined}>Delete</Button>
          </div>
        }
      >
        <p className="text-sm text-neutral-slate">Delete {deleteTarget?.productName}? This keeps audit history and marks the product as archived.</p>
      </Modal>
    </main>
  );
}

function ProductTable({
  products,
  onEdit,
  onDelete,
  onApprove,
  onShare,
  compareIds,
  onToggleCompare
}: {
  products: CatalogProduct[];
  onEdit: (product: CatalogProduct) => void;
  onDelete: (product: CatalogProduct) => void;
  onApprove: (product: CatalogProduct) => void;
  onShare: (product: CatalogProduct) => void;
  compareIds: string[];
  onToggleCompare: (productId: string) => void;
}) {
  if (!products.length) {
    return (
      <div className="grid min-h-48 place-items-center rounded-xl border border-dashed border-[#C9D4C8] bg-neutral-cloud p-8 text-center">
        <div>
          <FileImage className="mx-auto h-8 w-8 text-neutral-stone" />
          <p className="mt-3 font-semibold text-botanical-black">No products found</p>
          <p className="mt-1 text-sm text-neutral-slate">Adjust filters or add a product to begin.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#E3E8E2]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse text-left">
          <thead className="bg-neutral-cloud">
            <tr>
              {["Compare", "Product", "SKU", "Category", "Price", "Stock", "Status", "Flags", "Actions"].map((heading) => (
                <th key={heading} className="px-4 py-3 text-xs font-semibold uppercase text-neutral-slate">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3E8E2] bg-white">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-4">
                  <input type="checkbox" checked={compareIds.includes(product.id)} onChange={() => onToggleCompare(product.id)} className="h-4 w-4 accent-botanical-green" />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-gl bg-botanical-mint">
                      {product.images?.[0]?.url ? (
                        <Image src={product.images[0].url} alt="" width={48} height={48} unoptimized className="h-full w-full object-cover" />
                      ) : null}
                    </div>
                    <div>
                      <p className="font-semibold text-botanical-black">{product.productName}</p>
                      <p className="text-xs text-neutral-slate">{product.brand || "Garden Live"}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-neutral-slate">{product.sku}</td>
                <td className="px-4 py-4 text-sm text-neutral-slate">{product.category?.name ?? "Unassigned"}</td>
                <td className="px-4 py-4 text-sm font-semibold text-botanical-black">{formatMoney(product.discountPrice ?? product.price)}</td>
                <td className="px-4 py-4">
                  <Badge tone={product.stockQuantity <= (product.lowStockThreshold ?? 5) ? "warning" : "success"}>{product.stockQuantity} in stock</Badge>
                </td>
                <td className="px-4 py-4"><Badge tone={product.status === "ACTIVE" ? "success" : product.status === "DRAFT" ? "warning" : "neutral"}>{product.status}</Badge></td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {product.featuredProduct ? <Badge tone="premium">Featured</Badge> : null}
                    {product.bestseller ? <Badge tone="success">Best</Badge> : null}
                    {product.newArrival ? <Badge tone="info">New</Badge> : null}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Button asChild variant="ghost" size="icon" aria-label="View product"><Link href={`/admin/product-catalog/products/${product.id}`}><Eye className="h-4 w-4" /></Link></Button>
                    <Button variant="ghost" size="icon" aria-label="Edit product" onClick={() => onEdit(product)}><Edit3 className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" aria-label="Approve product" onClick={() => onApprove(product)}><Check className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" aria-label="Wishlist preview"><Heart className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" aria-label="Add to cart preview"><ShoppingCart className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" aria-label="Share product" onClick={() => onShare(product)}><Link2 className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" aria-label="Delete product" onClick={() => onDelete(product)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CompareTable({ products }: { products: CatalogProduct[] }) {
  if (!products.length) {
    return <p className="rounded-xl border border-[#E3E8E2] bg-neutral-cloud p-5 text-sm text-neutral-slate">Choose products and click compare.</p>;
  }

  const fields: Array<keyof CatalogProduct> = ["productName", "brand", "price", "discountPrice", "gst", "stockQuantity", "plantHeight", "potSize", "plantAge", "sunlightRequirement", "waterRequirement", "soilRequirement", "maintenanceLevel", "indoorOutdoor", "airPurifying", "floweringSeason", "fruitSeason"];

  return (
    <div className="overflow-hidden rounded-xl border border-[#E3E8E2]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] border-collapse text-left">
          <thead className="bg-neutral-cloud">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold uppercase text-neutral-slate">Field</th>
              {products.map((product) => <th key={product.id} className="px-4 py-3 text-xs font-semibold uppercase text-neutral-slate">{product.productName}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3E8E2] bg-white">
            {fields.map((field) => (
              <tr key={field}>
                <td className="px-4 py-3 text-sm font-semibold text-botanical-black">{field}</td>
                {products.map((product) => <td key={`${product.id}-${field}`} className="px-4 py-3 text-sm text-neutral-slate">{String(product[field] ?? "-")}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PaginationControls({ pagination, onPageChange }: { pagination: CatalogListResponse["pagination"] | null; onPageChange: (page: number) => void }) {
  if (!pagination) return null;
  return (
    <div className="mt-4 flex flex-col gap-3 text-sm text-neutral-slate sm:flex-row sm:items-center sm:justify-between">
      <p>
        Page {pagination.page} of {Math.max(pagination.totalPages, 1)} · {pagination.total} products
      </p>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" disabled={pagination.page <= 1} onClick={() => onPageChange(pagination.page - 1)}>Previous</Button>
        <Button variant="secondary" size="sm" disabled={pagination.page >= pagination.totalPages} onClick={() => onPageChange(pagination.page + 1)}>Next</Button>
      </div>
    </div>
  );
}

function DropZone({ onDropText }: { onDropText: (text: string) => void }) {
  const [dragging, setDragging] = React.useState(false);
  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        const urls = Array.from(event.dataTransfer.files).map((file) => `SKU-HERE, ${URL.createObjectURL(file)}, ${file.name}`);
        const text = event.dataTransfer.getData("text/plain");
        onDropText([...urls, text].filter(Boolean).join("\n"));
      }}
      className={`mb-4 grid min-h-36 place-items-center rounded-xl border border-dashed p-6 text-center transition ${dragging ? "border-botanical-green bg-botanical-mint" : "border-[#C9D4C8] bg-neutral-cloud"}`}
    >
      <div>
        <ImagePlus className="mx-auto h-8 w-8 text-botanical-green" />
        <p className="mt-3 text-sm font-semibold text-botanical-black">Drag images or URL rows here</p>
        <p className="mt-1 text-xs text-neutral-slate">Dropped files are converted to local preview URLs; replace SKU-HERE before upload.</p>
      </div>
    </div>
  );
}

function ProductDetails({ product, onShare }: { product: CatalogProduct; onShare: () => void }) {
  const facts = [
    ["SKU", product.sku],
    ["Brand", product.brand ?? "Garden Live"],
    ["Category", product.category?.name ?? "Unassigned"],
    ["Price", formatMoney(product.price)],
    ["Discount", product.discountPrice ? formatMoney(product.discountPrice) : "-"],
    ["GST", product.gst ? `${product.gst}%` : "-"],
    ["Stock", String(product.stockQuantity)],
    ["Maintenance", product.maintenanceLevel ?? "-"],
    ["Sunlight", product.sunlightRequirement ?? "-"],
    ["Water", product.waterRequirement ?? "-"],
    ["Soil", product.soilRequirement ?? "-"],
    ["Indoor / Outdoor", product.indoorOutdoor ?? "-"]
  ];
  return (
    <Panel
      title="Product Details"
      action={
        <div className="flex gap-2">
          <Button asChild variant="secondary"><Link href={`/admin/product-catalog/products/${product.id}/edit`}>Edit</Link></Button>
          <Button leftIcon={<Share2 className="h-4 w-4" />} onClick={onShare}>Share</Button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="overflow-hidden rounded-xl bg-neutral-cloud">
          {product.images?.[0]?.url ? (
            <Image src={product.images[0].url} alt={product.productName} width={720} height={480} unoptimized className="h-80 w-full object-cover" />
          ) : <div className="grid h-80 place-items-center text-neutral-slate">No image</div>}
        </div>
        <div>
          <Badge tone={product.status === "ACTIVE" ? "success" : "warning"}>{product.status}</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-[0]">{product.productName}</h2>
          <p className="mt-3 text-sm leading-6 text-neutral-slate">{product.description || "No description available."}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {facts.map(([label, value]) => (
              <div key={label} className="rounded-gl border border-[#E3E8E2] bg-neutral-cloud p-3">
                <p className="text-xs font-semibold uppercase text-neutral-slate">{label}</p>
                <p className="mt-1 text-sm font-semibold text-botanical-black">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {product.tags?.map((tag) => <Badge key={tag} tone="info">{tag}</Badge>)}
          </div>
        </div>
      </div>
    </Panel>
  );
}

function MediaManager({ product, saving, onSave }: { product: CatalogProduct; saving?: boolean; onSave: (payload: { images?: CatalogMedia[]; videos?: CatalogMedia[]; pdfCatalogue?: CatalogMedia | null }) => void }) {
  const [imageText, setImageText] = React.useState((product.images ?? []).map((item) => item.url).join(", "));
  const [videoText, setVideoText] = React.useState((product.videos ?? []).map((item) => item.url).join(", "));
  const [pdfUrl, setPdfUrl] = React.useState(product.pdfCatalogue?.url ?? "");
  const payload = {
    images: imageText.split(",").map((url, index) => ({ url: url.trim(), sortOrder: index })).filter((item) => item.url),
    videos: videoText.split(",").map((url, index) => ({ url: url.trim(), sortOrder: index })).filter((item) => item.url),
    pdfCatalogue: pdfUrl ? { url: pdfUrl } : null
  };
  return (
    <div className="space-y-5">
      <DropZone onDropText={(text) => setImageText((current) => `${current}${current ? ", " : ""}${text.split("\n").map((row) => row.split(",")[1]?.trim()).filter(Boolean).join(", ")}`)} />
      <div className="grid gap-4 md:grid-cols-3">
        <Input label="Image URLs" value={imageText} onChange={(event) => setImageText(event.target.value)} />
        <Input label="Video URLs" value={videoText} onChange={(event) => setVideoText(event.target.value)} />
        <Input label="PDF Catalogue URL" value={pdfUrl} onChange={(event) => setPdfUrl(event.target.value)} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {payload.images.map((image) => (
          <div key={image.url} className="overflow-hidden rounded-xl border border-[#E3E8E2] bg-neutral-cloud">
            <Image src={image.url} alt="" width={320} height={180} unoptimized className="h-36 w-full object-cover" />
          </div>
        ))}
      </div>
      <Button isLoading={saving} leftIcon={<ImagePlus className="h-4 w-4" />} onClick={() => onSave(payload)}>Save Media</Button>
    </div>
  );
}

export function ProductCatalogWorkspace({ initialTab, productId }: { initialTab?: Tab; productId?: string }) {
  return (
    <ToastProvider>
      <CatalogApp initialTab={initialTab} productId={productId} />
    </ToastProvider>
  );
}
