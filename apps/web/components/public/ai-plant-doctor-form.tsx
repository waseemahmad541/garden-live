"use client";

import * as React from "react";
import { Activity, CheckCircle2, Loader2, Stethoscope } from "lucide-react";
import { Button, Input } from "@/components";

type Diagnosis = {
  plantName: string;
  diseaseName: string;
  diseaseProbability: number;
  pestName: string;
  pestProbability: number;
  healthScore: number;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  waterRecommendation: string;
  fertilizerRecommendation: string;
  medicineRecommendation: string;
  treatmentTimeline: string[];
  expertConsultationRequired: boolean;
  summary: string;
  confidenceScore: number;
};

type DiagnosisResponse = {
  ok: boolean;
  data?: Diagnosis;
  error?: { message?: string };
};

export function AIPlantDoctorForm() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [diagnosis, setDiagnosis] = React.useState<Diagnosis | null>(null);
  const [imageDataUrl, setImageDataUrl] = React.useState<string>("");

  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setError(null);
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
          environment: form.get("environment")
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

  return (
    <div className="grid gap-6 rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-[0_24px_80px_rgba(16,67,38,0.12)] backdrop-blur md:p-8 lg:grid-cols-[0.9fr_1.1fr]">
      <form className="space-y-4" onSubmit={submit}>
        <div>
          <label className="text-sm font-semibold text-neutral-slate" htmlFor="plantName">Plant name</label>
          <Input id="plantName" name="plantName" required minLength={2} placeholder="Areca Palm" />
        </div>
        <div>
          <label className="text-sm font-semibold text-neutral-slate" htmlFor="plantImage">Upload plant photo</label>
          <input
            id="plantImage"
            name="plantImage"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleImage}
            className="mt-2 w-full rounded-2xl border border-botanical-green/15 bg-white px-4 py-3 text-sm font-medium outline-none file:mr-4 file:rounded-full file:border-0 file:bg-botanical-green file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white focus:border-botanical-green"
          />
          {imageDataUrl ? (
            <div
              className="mt-3 h-40 overflow-hidden rounded-2xl border border-botanical-green/15 bg-cover bg-center"
              style={{ backgroundImage: `url(${imageDataUrl})` }}
              role="img"
              aria-label="Uploaded plant preview"
            />
          ) : null}
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
          <label className="text-sm font-semibold text-neutral-slate" htmlFor="symptoms">Symptoms</label>
          <textarea id="symptoms" name="symptoms" required minLength={8} rows={5} placeholder="Yellowing leaves, brown tips, sticky residue..." className="mt-2 w-full rounded-2xl border border-botanical-green/15 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-botanical-green" />
        </div>
        <Button type="submit" disabled={loading} leftIcon={loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Stethoscope className="h-4 w-4" aria-hidden />}>
          {loading ? "Scanning Plant" : "Run AI Diagnosis"}
        </Button>
        {error ? <p className="rounded-2xl bg-[#FBE7E5] p-3 text-sm font-semibold text-status-error">{error}</p> : null}
      </form>

      <div className="rounded-[1.5rem] bg-[#07130d] p-5 text-white md:p-6">
        {diagnosis ? (
          <div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-botanical-lime">AI Report</p>
                <h2 className="mt-2 text-3xl font-semibold">{diagnosis.plantName}</h2>
              </div>
              <div className="grid h-24 w-24 place-items-center rounded-full border border-botanical-lime/50 bg-botanical-lime/10 text-3xl font-semibold text-botanical-lime">
                {diagnosis.healthScore}
              </div>
            </div>
            <p className="mt-5 text-white/72">{diagnosis.summary}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <ReportMetric label="Disease" value={diagnosis.diseaseName} percent={diagnosis.diseaseProbability} />
              <ReportMetric label="Pest" value={diagnosis.pestName} percent={diagnosis.pestProbability} />
              <ReportMetric label="Confidence" value="AI confidence" percent={diagnosis.confidenceScore} />
              <ReportMetric label="Severity" value={diagnosis.severity} percent={diagnosis.healthScore / 100} />
            </div>
            <div className="mt-6 space-y-3">
              {[diagnosis.waterRecommendation, diagnosis.fertilizerRecommendation, diagnosis.medicineRecommendation].map((item) => (
                <p key={item} className="flex gap-2 rounded-2xl bg-white/8 p-3 text-sm text-white/78">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-botanical-lime" aria-hidden />
                  {item}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
            <Activity className="h-12 w-12 text-botanical-lime" aria-hidden />
            <h2 className="mt-5 text-3xl font-semibold">Upload a plant case</h2>
            <p className="mt-3 max-w-md text-white/65">Garden Live will generate a disease, pest, water, fertilizer and medicine recommendation report from the submitted image.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ReportMetric({ label, value, percent }: { label: string; value: string; percent: number }) {
  const width = `${Math.round(percent * 100)}%`;
  return (
    <div className="rounded-2xl bg-white/8 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">{label}</p>
      <p className="mt-2 font-semibold">{value}</p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/12">
        <div className="h-full rounded-full bg-botanical-lime" style={{ width }} />
      </div>
    </div>
  );
}
