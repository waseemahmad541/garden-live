import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Badge, Button } from "@/components";
import { PublicChrome } from "@/components/public/public-site";
import { ProductDetailActions } from "@/components/public/product-detail-actions";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

type PageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await prisma.product.findFirst({
    where: { id: params.id, deletedAt: null, status: { in: ["ACTIVE", "OUT_OF_STOCK"] } },
    select: { name: true, description: true }
  });
  if (!product) return { title: "Product Not Found | Garden Live" };
  return {
    title: `${product.name} | Garden Live Store`,
    description: product.description ?? `Buy ${product.name} from Garden Live Garden Store.`
  };
}

function money(value: unknown) {
  return `Rs. ${Number(value ?? 0).toLocaleString("en-IN")}`;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await prisma.product.findFirst({
    where: { id: params.id, deletedAt: null, status: { in: ["ACTIVE", "OUT_OF_STOCK"] } },
    include: {
      category: true,
      inventory: true,
      mediaFiles: { where: { deletedAt: null }, orderBy: { sortOrder: "asc" } }
    }
  });

  if (!product) notFound();

  const image = product.mediaFiles.find((file) => file.type === "IMAGE" && file.url.startsWith("/"))?.url ?? "/images/v4/garden-store.svg";
  const metadata = product.mediaFiles.find((file) => file.type === "OTHER" && typeof file.metadata === "object")?.metadata as Record<string, unknown> | undefined;
  const features = [
    product.category?.name,
    metadata?.brand ? `Brand: ${metadata.brand}` : null,
    metadata?.sunlightRequirement ? `Sunlight: ${metadata.sunlightRequirement}` : null,
    metadata?.waterRequirement ? `Water: ${metadata.waterRequirement}` : null,
    metadata?.maintenanceLevel ? `Maintenance: ${metadata.maintenanceLevel}` : null
  ].filter(Boolean);

  return (
    <PublicChrome>
      <section className="bg-[#07130d] py-20 text-white">
        <div className="gl-container">
          <Button asChild variant="secondary" className="mb-8 bg-white/10 text-white hover:bg-white/15" leftIcon={<ArrowLeft className="h-4 w-4" aria-hidden />}>
            <Link href="/garden-store">Back to Store</Link>
          </Button>
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/10">
              <Image src={image} alt={product.name} fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" priority />
            </div>
            <div>
              <Badge tone="premium" className="bg-white/15 text-white">{product.category?.name ?? "Garden Live Store"}</Badge>
              <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">{product.name}</h1>
              <p className="mt-5 text-base leading-8 text-white/72">{product.description ?? "Premium Garden Live catalog product."}</p>
              <div className="mt-7 flex flex-wrap items-end gap-4">
                <p className="text-4xl font-semibold text-botanical-lime">{money(product.salePrice ?? product.price)}</p>
                {product.salePrice ? <p className="text-lg text-white/45 line-through">{money(product.price)}</p> : null}
                <p className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">{product.inventory?.stockQuantity ?? 0} in stock</p>
              </div>
              <div className="mt-8">
                <ProductDetailActions productId={product.id} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="gl-container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-botanical-green">Product Details</p>
            <h2 className="mt-4 text-4xl font-semibold">Care, inventory and purchase information.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={String(feature)} className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/85 p-4 shadow-glSm">
                <CheckCircle2 className="h-5 w-5 text-botanical-green" aria-hidden />
                <span className="font-semibold">{String(feature)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicChrome>
  );
}
