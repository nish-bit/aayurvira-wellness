"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { submitRequestCall } from "@/lib/submitEnquiry";

type Status = "idle" | "submitting" | "success" | "error";

export default function ProductEnquiryModal({
  productName,
  triggerLabel = "Enquire Now",
  triggerClassName = "btn-primary"
}: {
  productName: string;
  triggerLabel?: string;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !/^[0-9+\-\s]{7,15}$/.test(phone.trim())) {
      setError("Please enter your name and a valid contact number.");
      return;
    }
    setError("");
    setStatus("submitting");
    try {
      await submitRequestCall({
        name: name.trim(),
        phone: phone.trim(),
        product: productName,
        source: "Website - Product Enquiry"
      });
      setStatus("success");
    } catch (err) {
      console.error(err);
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
          aria-labelledby="product-enquiry-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-parchment p-6 shadow-soft sm:rounded-3xl sm:p-8">
            <div className="mb-5 flex items-start justify-between">
              <h2 id="product-enquiry-title" className="font-display text-xl font-semibold text-ink">
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
                  Your enquiry has been received. Our team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-ink/50">
                    Interested In
                  </p>
                  <p className="font-display text-base font-semibold text-sandal-dark">{productName}</p>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink/80">
                    Full Name <span className="text-sandal-dark">*</span>
                  </label>
                  <input
                    className="input-base"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
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
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}
                {status === "error" && (
                  <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                    Something went wrong. Please try again or contact us on WhatsApp.
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
