"use client";

import * as React from "react";
import Link from "next/link";
import {
  Activity,
  Bell,
  CheckCircle2,
  HeartPulse,
  Leaf,
  Loader2,
  PackageCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Zap
} from "lucide-react";
import { Badge, Button, Input } from "@/components";

type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

type RecommendedProduct = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: string;
  imageUrl: string;
  stockQuantity: number;
  whyRecommended: string;
  usageWindow: "Today" | "This Week" | "This Month";
};

type RecommendationEngine = {
  diagnosisResult: {
    plantName: string;
    problemDetected: string;
    problemType: "Disease" | "Deficiency" | "Pest" | "Plant Stress";
    severityLevel: Severity;
    recoveryTime: string;
    confidenceScore: number;
    gardenHealthScore: number;
  };
  treatmentPlan: {
    problemDetected: string;
    reason: string;
    solution: string;
    estimatedRecoveryTime: string;
    today: string[];
    thisWeek: string[];
    thisMonth: string[];
  };
  productRecommendations: RecommendedProduct[];
  recoveryKit: RecommendedProduct[];
  frequentlyBoughtTogether: RecommendedProduct[];
  relatedProducts: RecommendedProduct[];
  refillReminders: Array<{ productType: string; reminderInDays: number; reason: string }>;
  assistantMessage: string;
  lowHealthMessage?: string;
};

type Diagnosis = {
  plantName: string;
  diseaseName: string;
  diseaseProbability: number;
  pestName: string;
  pestProbability: number;
  healthScore: number;
  severity: Severity;
  waterRecommendation: string;
  fertilizerRecommendation: string;
  medicineRecommendation: string;
  treatmentTimeline: string[];
  expertConsultationRequired: boolean;
  summary: string;
  confidenceScore: number;
  recommendationEngine: RecommendationEngine;
};

type DiagnosisResponse = {
  ok: boolean;
  data?: Diagnosis;
  error?: { message?: string };
};

function visitorId() {
  const key = "garden-live-visitor-id";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const next = crypto.randomUUID();
  window.localStorage.setItem(key, next);
  return next;
}

export function AIPlantDoctorForm() {
  const [loading, setLoading] = React.useState(false);
  const [cartLoading, setCartLoading] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [diagnosis, setDiagnosis] = React.useState<Diagnosis | null>(null);
  const [imageDataUrl, setImageDataUrl] = React.useState<string>("");

  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setError(null);
    setMessage(null);
    setImageDataUrl("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid plant image.");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setError("Please upload an image under 4 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImageDataUrl(String(reader.result ?? ""));
    reader.onerror = () => setError("Could not read the uploaded image.");
    reader.readAsDataURL(file);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    setDiagnosis(null);

    const form = new FormData(event.currentTarget);
    try {
      const submittedImage = imageDataUrl || String(form.get("imageUrl") ?? "");
      if (!submittedImage) throw new Error("Upload a plant photo or paste a plant image URL.");
      const response = await fetch("/api/public/ai-plant-doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plantName: form.get("plantName"),
          imageUrl: submittedImage,
          symptoms: form.get("symptoms"),
          environment: form.get("environment"),
          membershipPlan: form.get("membershipPlan") || undefined
        })
      });
      const payload = (await response.json().catch(() => ({}))) as DiagnosisResponse;
      if (!response.ok || !payload.ok || !payload.data) throw new Error(payload.error?.message ?? "AI diagnosis failed.");
      setDiagnosis(payload.data);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "AI diagnosis failed.");
    } finally {
      setLoading(false);
    }
  }

  async function addProducts(products: RecommendedProduct[], label: string, redirectToCheckout = false) {
    if (!products.length) {
      setError("No active Garden Live Store products are available for this action.");
      return;
    }
    setCartLoading(label);
    setError(null);
    setMessage(null);
    try {
      await Promise.all(
        products.map(async (product) => {
          const response = await fetch("/api/public/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ visitorId: visitorId(), productId: product.id, quantity: 1 })
          });
          const payload = await response.json().catch(() => ({}));
          if (!response.ok || !payload.ok) throw new Error(payload.error?.message ?? `Could not add ${product.name}.`);
        })
      );
      setMessage(`${label} added to your Garden Live cart.`);
      if (redirectToCheckout) window.location.href = "/checkout";
    } catch (cartError) {
      setError(cartError instanceof Error ? cartError.message : "Could not update cart.");
    } finally {
      setCartLoading(null);
    }
  }

  return (
    <div className="grid gap-6 rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-[0_24px_80px_rgba(16,67,38,0.12)] backdrop-blur md:p-8 lg:grid-cols-[0.84fr_1.16fr]">
      <form className="space-y-4" onSubmit={submit}>
        <div>
          <label className="text-sm font-semibold text-neutral-slate" htmlFor="plantName">Plant name</label>
          <Input id="plantName" name="plantName" required minLength={2} placeholder="Areca Palm" />
        </div>
        <div>
          <label className="text-sm font-semibold text-neutral-slate" htmlFor="plantImage">Upload plant photo</label>
          <input id="plantImage" name="plantImage" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImage} className="mt-2 w-full rounded-2xl border border-botanical-green/15 bg-white px-4 py-3 text-sm font-medium outline-none file:mr-4 file:rounded-full file:border-0 file:bg-botanical-green file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white focus:border-botanical-green" />
          {imageDataUrl ? <div className="mt-3 h-40 overflow-hidden rounded-2xl border border-botanical-green/15 bg-cover bg-center" style={{ backgroundImage: `url(${imageDataUrl})` }} role="img" aria-label="Uploaded plant preview" /> : null}
        </div>
        <div>
          <label className="text-sm font-semibold text-neutral-slate" htmlFor="imageUrl">Or paste plant image URL</label>
          <Input id="imageUrl" name="imageUrl" type="url" placeholder="https://example.com/plant-photo.jpg" />
        </div>
        <div>
          <label className="text-sm font-semibold text-neutral-slate" htmlFor="environment">Garden environment</label>
          <select id="environment" name="environment" className="mt-2 h-12 w-full rounded-2xl border border-botanical-green/15 bg-white px-4 text-sm font-medium outline-none focus:border-botanical-green">
            <option value="INDOOR">Indoor</option>
            <option value="OUTDOOR">Outdoor</option>
            <option value="TERRACE">Terrace</option>
            <option value="BALCONY">Balcony</option>
            <option value="COMMERCIAL">Commercial</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-neutral-slate" htmlFor="membershipPlan">Membership plan</label>
          <select id="membershipPlan" name="membershipPlan" className="mt-2 h-12 w-full rounded-2xl border border-botanical-green/15 bg-white px-4 text-sm font-medium outline-none focus:border-botanical-green">
            <option value="">Not selected</option>
            <option value="Plant Care">Plant Care</option>
            <option value="Smart Garden">Smart Garden</option>
            <option value="Home Garden">Home Garden</option>
            <option value="Premium Garden">Premium Garden</option>
            <option value="Luxury Garden">Luxury Garden</option>
            <option value="Business & Villa">Business & Villa</option>
            <option value="Dedicated Gardener">Dedicated Gardener</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-neutral-slate" htmlFor="symptoms">Symptoms</label>
          <textarea id="symptoms" name="symptoms" required minLength={8} rows={5} placeholder="Yellowing leaves, brown tips, sticky residue..." className="mt-2 w-full rounded-2xl border border-botanical-green/15 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-botanical-green" />
        </div>
        <Button type="submit" disabled={loading} leftIcon={loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Stethoscope className="h-4 w-4" aria-hidden />}>
          {loading ? "Scanning Plant" : "Run AI Diagnosis"}
        </Button>
        {message ? <p className="rounded-2xl bg-botanical-mint p-3 text-sm font-semibold text-botanical-green">{message}</p> : null}
        {error ? <p className="rounded-2xl bg-[#FBE7E5] p-3 text-sm font-semibold text-status-error">{error}</p> : null}
      </form>

      <div className="rounded-[1.5rem] bg-[#07130d] p-5 text-white md:p-6">
        {diagnosis ? <DiagnosisExperience diagnosis={diagnosis} cartLoading={cartLoading} onAddProducts={addProducts} /> : <EmptyDiagnosis />}
      </div>
    </div>
  );
}

function EmptyDiagnosis() {
  return (
    <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
      <Activity className="h-12 w-12 text-botanical-lime" aria-hidden />
      <h2 className="mt-5 text-3xl font-semibold">Upload a plant case</h2>
      <p className="mt-3 max-w-md text-white/65">Garden Live will generate a treatment plan, Garden Health Score, refill reminders and relevant Garden Store recovery products from the submitted image.</p>
    </div>
  );
}

function DiagnosisExperience({ diagnosis, cartLoading, onAddProducts }: { diagnosis: Diagnosis; cartLoading: string | null; onAddProducts: (products: RecommendedProduct[], label: string, redirectToCheckout?: boolean) => Promise<void> }) {
  const engine = diagnosis.recommendationEngine;
  const health = engine.diagnosisResult.gardenHealthScore;
  const firstProduct = engine.productRecommendations[0];

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-botanical-lime">AI Recommendation Engine</p>
          <h2 className="mt-2 text-3xl font-semibold">{engine.diagnosisResult.plantName}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68">{diagnosis.summary}</p>
        </div>
        <div className="grid h-28 w-28 shrink-0 place-items-center rounded-full border border-botanical-lime/50 bg-botanical-lime/10 text-center">
          <span><span className="block text-4xl font-semibold text-botanical-lime">{health}</span><span className="text-[10px] uppercase tracking-[0.16em] text-white/45">Health</span></span>
        </div>
      </div>

      {engine.lowHealthMessage ? <div className="mt-5 rounded-2xl border border-botanical-lime/30 bg-botanical-lime/10 p-4 text-sm font-semibold text-botanical-lime">{engine.lowHealthMessage}</div> : null}

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <ReportMetric label="Problem Detected" value={engine.diagnosisResult.problemDetected} percent={diagnosis.diseaseProbability || diagnosis.pestProbability || 0.5} />
        <ReportMetric label="Type" value={engine.diagnosisResult.problemType} percent={diagnosis.confidenceScore} />
        <ReportMetric label="Severity" value={engine.diagnosisResult.severityLevel} percent={health / 100} />
        <ReportMetric label="Recovery Time" value={engine.diagnosisResult.recoveryTime} percent={0.8} />
        <ReportMetric label="Confidence" value={`${Math.round(engine.diagnosisResult.confidenceScore * 100)}%`} percent={engine.diagnosisResult.confidenceScore} />
        <ReportMetric label="Garden Health Score" value={`${health}/100`} percent={health / 100} />
      </div>

      <section className="mt-7 rounded-[1.5rem] bg-white/8 p-5">
        <div className="flex items-center gap-2 text-botanical-lime"><HeartPulse className="h-5 w-5" aria-hidden /><h3 className="text-xl font-semibold text-white">Treatment Plan</h3></div>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <TreatmentColumn title="What to do today" items={engine.treatmentPlan.today} />
          <TreatmentColumn title="What to do this week" items={engine.treatmentPlan.thisWeek} />
          <TreatmentColumn title="What to do this month" items={engine.treatmentPlan.thisMonth} />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <ReasonCard title="Reason" text={engine.treatmentPlan.reason} />
          <ReasonCard title="Solution" text={engine.treatmentPlan.solution} />
        </div>
      </section>

      <section className="mt-7">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-botanical-lime">Recovery Kit</p>
            <h3 className="mt-2 text-2xl font-semibold">Relevant Garden Live products only</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">{engine.assistantMessage}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" variant="secondary" isLoading={cartLoading === "Recovery Kit"} onClick={() => onAddProducts(engine.recoveryKit, "Recovery Kit")} leftIcon={<PackageCheck className="h-4 w-4" aria-hidden />}>Add Recovery Kit</Button>
            <Button type="button" size="sm" isLoading={cartLoading === "Complete Treatment Kit"} onClick={() => onAddProducts(engine.productRecommendations, "Complete Treatment Kit", true)} leftIcon={<ShoppingBag className="h-4 w-4" aria-hidden />}>Buy Complete Treatment Kit</Button>
          </div>
        </div>
        <ProductGrid products={engine.productRecommendations} firstProduct={firstProduct} cartLoading={cartLoading} onAddProducts={onAddProducts} />
      </section>

      <section className="mt-7 grid gap-5 lg:grid-cols-2">
        <ProductList title="Frequently Bought Together" products={engine.frequentlyBoughtTogether} />
        <ProductList title="Related Products" products={engine.relatedProducts} />
      </section>

      <section className="mt-7 rounded-[1.5rem] bg-white/8 p-5">
        <div className="flex items-center gap-2 text-botanical-lime"><Bell className="h-5 w-5" aria-hidden /><h3 className="text-xl font-semibold text-white">Smart Refill Reminders</h3></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {engine.refillReminders.length ? engine.refillReminders.map((reminder) => (
            <div key={reminder.productType} className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm font-semibold">{reminder.productType}</p>
              <p className="mt-1 text-xs text-botanical-lime">Reminder in {reminder.reminderInDays} days</p>
              <p className="mt-2 text-xs leading-5 text-white/60">{reminder.reason}</p>
            </div>
          )) : <p className="rounded-2xl bg-white/10 p-4 text-sm text-white/65">No refill reminder was created because no fertilizer, pesticide or plant food product matched the current recovery kit.</p>}
        </div>
      </section>
    </div>
  );
}

function TreatmentColumn({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-2xl bg-white/10 p-4"><p className="text-sm font-semibold text-botanical-lime">{title}</p><div className="mt-3 space-y-2">{items.map((item) => <p key={item} className="flex gap-2 text-xs leading-5 text-white/70"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-botanical-lime" aria-hidden />{item}</p>)}</div></div>;
}

function ReasonCard({ title, text }: { title: string; text: string }) {
  return <div className="rounded-2xl bg-white/10 p-4"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">{title}</p><p className="mt-2 text-sm leading-6 text-white/72">{text}</p></div>;
}

function ProductGrid({ products, firstProduct, cartLoading, onAddProducts }: { products: RecommendedProduct[]; firstProduct?: RecommendedProduct; cartLoading: string | null; onAddProducts: (products: RecommendedProduct[], label: string, redirectToCheckout?: boolean) => Promise<void> }) {
  if (!products.length) return <p className="mt-5 rounded-2xl bg-white/10 p-4 text-sm text-white/65">No active Garden Live Store product currently matches this diagnosis.</p>;
  return <><div className="mt-5 flex flex-wrap gap-2"><Button type="button" size="sm" variant="secondary" isLoading={cartLoading === "All Recommendations"} onClick={() => onAddProducts(products, "All Recommendations")} leftIcon={<ShoppingBag className="h-4 w-4" aria-hidden />}>Add All To Cart</Button>{firstProduct ? <Button type="button" size="sm" isLoading={cartLoading === firstProduct.name} onClick={() => onAddProducts([firstProduct], firstProduct.name, true)} leftIcon={<Zap className="h-4 w-4" aria-hidden />}>Buy Now</Button> : null}</div><div className="mt-5 grid gap-4 md:grid-cols-2">{products.map((product) => <ProductCard key={product.id} product={product} cartLoading={cartLoading} onAddProducts={onAddProducts} />)}</div></>;
}

function ProductCard({ product, cartLoading, onAddProducts }: { product: RecommendedProduct; cartLoading: string | null; onAddProducts: (products: RecommendedProduct[], label: string, redirectToCheckout?: boolean) => Promise<void> }) {
  return <article className="rounded-[1.35rem] border border-white/10 bg-white/10 p-4"><div className="flex items-start justify-between gap-4"><div><Badge tone="premium" className="bg-white/15 text-white">{product.usageWindow}</Badge><h4 className="mt-3 text-lg font-semibold">{product.name}</h4><p className="mt-1 text-sm text-botanical-lime">{product.price}</p></div><Leaf className="h-5 w-5 shrink-0 text-botanical-lime" aria-hidden /></div><p className="mt-3 text-xs leading-5 text-white/62">{product.whyRecommended}</p><p className="mt-3 text-xs text-white/45">{product.stockQuantity} available in Garden Live Store</p><div className="mt-4 grid grid-cols-2 gap-2"><Button type="button" size="sm" variant="secondary" isLoading={cartLoading === product.name} onClick={() => onAddProducts([product], product.name)}>Add to Cart</Button><Button asChild size="sm" className="bg-botanical-lime text-[#07130d] hover:bg-white"><Link href={`/garden-store/${product.id}`}>View</Link></Button></div></article>;
}

function ProductList({ title, products }: { title: string; products: RecommendedProduct[] }) {
  return <div className="rounded-[1.5rem] bg-white/8 p-5"><div className="flex items-center gap-2 text-botanical-lime"><Sparkles className="h-5 w-5" aria-hidden /><h3 className="text-xl font-semibold text-white">{title}</h3></div><div className="mt-4 space-y-3">{products.length ? products.map((product) => <Link key={product.id} href={`/garden-store/${product.id}`} className="flex items-center justify-between gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm transition hover:bg-white/15"><span>{product.name}</span><span className="text-botanical-lime">{product.price}</span></Link>) : <p className="text-sm text-white/60">No extra product matched this diagnosis.</p>}</div></div>;
}

function ReportMetric({ label, value, percent }: { label: string; value: string; percent: number }) {
  const width = `${Math.max(8, Math.min(100, Math.round(percent * 100)))}%`;
  return <div className="rounded-2xl bg-white/8 p-4"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">{label}</p><p className="mt-2 font-semibold">{value}</p><div className="mt-3 h-2 overflow-hidden rounded-full bg-white/12"><div className="h-full rounded-full bg-botanical-lime" style={{ width }} /></div></div>;
}
