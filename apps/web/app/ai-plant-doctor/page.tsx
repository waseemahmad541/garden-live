import type { Metadata } from "next";
import { PublicChrome } from "@/components/public/public-site";
import { AIPlantDoctorForm } from "@/components/public/ai-plant-doctor-form";
import { EnquirySection, FaqSection, Hero, ProjectGallery } from "@/components/public/v4-public-sections";
import { img } from "@/components/public/v4-public-data";

export const metadata: Metadata = {
  title: "AI Plant Doctor",
  description: "Garden Live AI Plant Doctor scans plant photos for disease, pests, water needs, fertilizer recommendations, medicines, health scores, and expert consultation."
};

export default function AIPlantDoctorPage() {
  return (
    <PublicChrome>
      <Hero
        eyebrow="AI Plant Doctor"
        title="Scan your plant and get a Garden Live diagnosis."
        description="Submit a plant image and symptoms to receive disease detection, pest risk, health score, watering advice, fertilizer guidance, treatment timeline and expert consultation signals."
        image={img.ai}
        primaryLabel="Run AI Diagnosis"
        primaryHref="#ai-plant-doctor"
        secondaryLabel="Book Plant Expert"
        secondaryHref="/book-garden-visit"
      />
      <section id="ai-plant-doctor" className="py-24">
        <div className="gl-container">
          <AIPlantDoctorForm />
        </div>
      </section>
      <ProjectGallery />
      <FaqSection />
      <EnquirySection
        title="Need expert plant care after the scan?"
        description="Garden Live can turn the AI report into a visit, treatment plan, membership care schedule or QR Plant Passport record."
      />
    </PublicChrome>
  );
}
