"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { submitEnquiry } from "@/lib/submitEnquiry";
import { products } from "@/data/products";

type Status = "idle" | "submitting" | "success" | "error";

const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

function normalizePhone(raw: string): string {
  let digits = raw.replace(/[^\d]/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

export default function RequestCallModal({
  triggerLabel = "Enquire Now",
  triggerClassName = "btn-secondary"
}: {
  triggerLabel?: string;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(() => {
      setOpen(false);
      setStatus("idle");
      setName("");
      setPhone("");
      setProduct("");
    }, 2500);
    return () => clearTimeout(timer);
  }, [status]);

  function validate(): boolean {
    let valid = true;
    if (!name.trim()) {
      setNameError("Full name is required.");
      valid = false;
    } else {
      setNameError("");
    }

    const digits = normalizePhone(phone);
    if (!INDIAN_MOBILE_REGEX.test(digits)) {
      setPhoneError("Please enter a valid 10-digit Indian mobile number.");
      valid = false;
    } else {
      setPhoneError("");
    }

    return valid;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    setStatus("submitting");
    try {
      await submitEnquiry({
        name: name.trim(),
        phone: normalizePhone(phone),
        product: product || undefined
      });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setSubmitError(err instanceof Error ? err.message : "Unable to submit enquiry.");
      setStatus("error");
    }
  }

  return (
    <>
      <button type="button" className={triggerClassName} onClick={() => setOpen(true)}>
        {triggerLabel}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm animate-fadeIn sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="request-call-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-parchment p-6 shadow-soft sm:rounded-3xl sm:p-8">
            <div className="mb-5 flex items-start justify-between">
              <h2 id="request-call-title" className="font-display text-xl font-semibold text-ink">
                Enquire Now
              </h2>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close enquiry form"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-mist text-ink/70 hover:bg-mist/40"
              >
                ✕
              </button>
            </div>

            {status === "success" ? (
              <div className="rounded-card border border-forest/20 bg-forest/5 p-6 text-center">
                <p className="font-display text-lg text-forest">Thank you!</p>
                <p className="mt-2 text-sm text-ink/75">
                  Your enquiry has been submitted successfully. Our team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink/80">
                    Full Name <span className="text-sandal-dark">*</span>
                  </label>
                  <input
                    className="input-base"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    aria-invalid={!!nameError}
                  />
                  {nameError && <p className="mt-1 text-xs text-red-600">{nameError}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink/80">
                    Contact Number <span className="text-sandal-dark">*</span>
                  </label>
                  <input
                    className="input-base"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    placeholder="10-digit mobile number"
                    aria-invalid={!!phoneError}
                  />
                  {phoneError && <p className="mt-1 text-xs text-red-600">{phoneError}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink/80">
                    Product Interested In
                  </label>
                  <select
                    className="input-base"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                  >
                    <option value="">Not sure / General enquiry</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {status === "error" && submitError && (
                  <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                    {submitError}
                  </p>
                )}

                <button type="submit" disabled={status === "submitting"} className="btn-primary w-full">
                  {status === "submitting" ? "Submitting..." : "Submit Enquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
