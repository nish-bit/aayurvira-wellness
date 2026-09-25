"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { isValidIndianMobile, submitLead } from "@/lib/leadSubmission";
import { trackEvent } from "@/lib/analytics/gtag";
import type { ProductId } from "@/data/products";

type Status = "idle" | "submitting" | "success" | "error";

export default function ProductEnquiryModal({
  productId,
  productName,
  onClose,
}: {
  productId: ProductId;
  productName: string;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const nameId = useId();
  const phoneId = useId();
  const phoneErrorId = useId();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    closeButtonRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const nameValid = name.trim().length > 0;
  const phoneValid = isValidIndianMobile(phone);
  const showNameError = touched && !nameValid;
  const showPhoneError = touched && phone.length > 0 && !phoneValid;

  function handlePhoneChange(value: string) {
    setPhone(value.replace(/\D/g, "").slice(0, 10));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);

    if (status === "submitting") return; // prevent duplicate submissions
    if (!nameValid || !phoneValid) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    const result = await submitLead(name.trim(), phone);

    if (result.ok) {
      setStatus("success");
      trackEvent("contact_form_submitted", { item_id: productId, location: "product_enquiry_modal" });
      setName("");
      setPhone("");
      setTouched(false);
    } else {
      setStatus("error");
    }
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-heading"
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
    >
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl sm:max-h-[85vh] sm:rounded-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
          <div>
            <h2 id="enquiry-modal-heading" className="font-display text-lg font-semibold text-forest">
              {t.enquiryModal.heading}
            </h2>
            <p className="mt-1 text-sm text-ink-soft">{productName}</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t.enquiryModal.close}
            className="shrink-0 rounded-full p-2 text-ink-soft hover:bg-ivory-deep hover:text-ink focus-visible:outline-2 focus-visible:outline-saffron"
          >
            <CloseGlyph />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
          {status === "success" ? (
            <div role="status" className="rounded-lg border border-line bg-ivory-deep/50 p-6 text-center">
              <p className="text-sm font-medium text-forest leading-relaxed">{t.enquiryModal.success}</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-ink-soft leading-relaxed">{t.enquiryModal.sub}</p>

              <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
                <div>
                  <label htmlFor={nameId} className="block text-sm font-medium text-ink mb-1">
                    {t.enquiryModal.name}
                  </label>
                  <input
                    id={nameId}
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.enquiryModal.namePlaceholder}
                    aria-invalid={showNameError}
                    className="w-full rounded-sm border border-line px-3 py-2.5 text-base outline-none focus-visible:outline-2 focus-visible:outline-saffron"
                  />
                  {showNameError ? (
                    <p role="alert" className="mt-1.5 text-sm text-red-700">
                      {t.enquiryModal.nameError}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor={phoneId} className="block text-sm font-medium text-ink mb-1">
                    {t.enquiryModal.phone}
                  </label>
                  <input
                    id={phoneId}
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    required
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onBlur={() => setTouched(true)}
                    placeholder={t.enquiryModal.phonePlaceholder}
                    aria-invalid={showPhoneError}
                    aria-describedby={showPhoneError ? phoneErrorId : undefined}
                    className="w-full rounded-sm border border-line px-3 py-2.5 text-base outline-none focus-visible:outline-2 focus-visible:outline-saffron"
                  />
                  {showPhoneError ? (
                    <p id={phoneErrorId} role="alert" className="mt-1.5 text-sm text-red-700">
                      {t.enquiryModal.phoneError}
                    </p>
                  ) : null}
                </div>

                {status === "error" && nameValid && phoneValid ? (
                  <p role="alert" className="text-sm text-red-700">
                    {t.enquiryModal.error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center rounded-sm bg-forest px-6 py-3 text-sm font-medium text-ivory hover:bg-forest-light transition-colors disabled:opacity-70 min-h-[48px]"
                >
                  {status === "submitting" ? t.enquiryModal.submitting : t.enquiryModal.submit}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

function CloseGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}
