import type { Metadata } from "next";
import { pageConfigs, PublicChrome } from "@/components/public/public-site";
import { Hero, FaqSection, EnquirySection } from "@/components/public/v4-public-sections";
import { PublicStoreWorkspace } from "@/components/public/public-store-workspace";

export const metadata: Metadata = {
  title: "Garden Store",
  description: "Shop the Garden Live premium marketplace for plants, indoor plants, outdoor plants, palm collection, fruit plants, pots, planters, fertilizers, plant medicines, seeds, tools, smart garden kits, irrigation, and furniture."
};

export default function GardenStorePage() {
  const config = pageConfigs["garden-store"];
  return (
    <PublicChrome>
      <Hero
        eyebrow={config.eyebrow}
        title={config.title}
        description={config.description}
        image={config.image}
        primaryLabel="Search Products"
        primaryHref="#store-products"
        secondaryLabel={config.secondaryCta}
        secondaryHref={config.secondaryHref}
      />
      <div id="store-products">
        <PublicStoreWorkspace />
      </div>
      <FaqSection />
      <EnquirySection title="Need help choosing plants?" description="Share your garden type and city. Garden Live will recommend plants, pots, medicines and care products for your space." />
    </PublicChrome>
  );
}
