"use client";

import { FormEvent, useState } from "react";
import { submitRequestCall } from "@/lib/submitEnquiry";

interface QuickEnquiryFormProps {
  source?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

export default function QuickEnquiryForm({ source = "Website" }: QuickEnquiryFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = "Please enter your full name.";
    if (!/^[0-9+\-\s]{7,15}$/.test(phone.trim())) {
      nextErrors.phone = "Please enter a valid contact number.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      await submitRequestCall({
        name: name.trim(),
        phone: phone.trim(),
        source
      });
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-card border border-forest/20 bg-forest/5 p-6 text-center">
        <p className="font-display text-lg text-forest">Thank you!</p>
        <p className="mt-2 text-sm text-ink/75">
          We've received your details. Our team will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="quick-name" className="mb-1.5 block text-sm font-medium text-ink/80">
          Full Name <span className="text-sandal-dark">*</span>
        </label>
        <input
          id="quick-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-base"
          autoComplete="name"
        />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="quick-phone" className="mb-1.5 block text-sm font-medium text-ink/80">
          Contact Number <span className="text-sandal-dark">*</span>
        </label>
        <input
          id="quick-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input-base"
          autoComplete="tel"
        />
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Something went wrong. Please try again or reach us on WhatsApp below.
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full">
        {status === "submitting" ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
