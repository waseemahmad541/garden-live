"use client";

import * as React from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button, Input, Textarea } from "@/components";

type FormState = {
  name: string;
  phone: string;
  city: string;
  service: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  city: "",
  service: "",
  message: ""
};

function validate(values: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (values.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!/^[+\d][\d\s-]{7,18}$/.test(values.phone.trim())) errors.phone = "Enter a valid phone number.";
  if (values.city.trim().length < 2) errors.city = "Enter your city.";
  if (values.service.trim().length < 3) errors.service = "Tell us what service you need.";
  if (values.message.trim().length < 12) errors.message = "Share a few garden details.";
  return errors;
}

export function EnquiryForm({ booking = false }: { booking?: boolean }) {
  const [values, setValues] = React.useState<FormState>(initialState);
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormState, string>>>({});
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  function update(field: keyof FormState, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setError(null);
    setSuccess(null);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    try {
      const response = await fetch(booking ? "/api/bookings" : "/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          source: booking ? "book-garden-visit" : "public-enquiry"
        })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) throw new Error(payload.error?.message ?? "Unable to submit your request.");
      setSuccess(payload.data?.message ?? "Garden Live received your request.");
      setValues(initialState);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit your request.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="rounded-3xl border border-white bg-white/90 p-6 shadow-glLg backdrop-blur" onSubmit={submit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Full name" name="name" placeholder="Your name" value={values.name} onChange={(event) => update("name", event.target.value)} error={errors.name} required />
        <Input label="Phone number" name="phone" placeholder="Your mobile number" value={values.phone} onChange={(event) => update("phone", event.target.value)} error={errors.phone} required />
        <Input label="City" name="city" placeholder="Your city" value={values.city} onChange={(event) => update("city", event.target.value)} error={errors.city} required />
        <Input
          label={booking ? "Preferred visit time" : "Service needed"}
          name="service"
          placeholder={booking ? "Preferred day and time" : "Membership, landscaping, nursery, maintenance"}
          value={values.service}
          onChange={(event) => update("service", event.target.value)}
          error={errors.service}
          required
        />
      </div>
      <Textarea
        className="mt-4"
        label="Garden details"
        name="message"
        placeholder="Share garden type, area, plants, sunlight, water access, service need, and any urgent plant health concerns."
        value={values.message}
        onChange={(event) => update("message", event.target.value)}
        error={errors.message}
      />
      {success ? (
        <div className="mt-4 flex items-start gap-3 rounded-2xl bg-botanical-mint p-3 text-sm font-medium text-botanical-green">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {success}
        </div>
      ) : null}
      {error ? <p className="mt-4 rounded-2xl bg-[#FBE7E5] p-3 text-sm font-medium text-status-error">{error}</p> : null}
      <Button className="mt-5 w-full" type="submit" disabled={loading} rightIcon={loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <ArrowRight className="h-4 w-4" aria-hidden />}>
        {booking ? "Submit Garden Visit Request" : "Send Garden Live Enquiry"}
      </Button>
    </form>
  );
}
