"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Container } from "./ui";
import { trackEvent } from "@/lib/analytics/gtag";

type Status = "idle" | "submitting" | "success" | "error";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function Newsletter() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    // NOTE: no email backend is wired up yet. This simulates a
    // successful subscribe locally — connect a real provider
    // (e.g. Mailchimp, Brevo, a Sheets webhook) before launch.
    window.setTimeout(() => {
      setStatus("success");
      trackEvent("cta_click", { cta_name: "newsletter_subscribe", location: "newsletter" });
    }, 600);
  }

  return (
    <section className="py-16 sm:py-20 bg-forest text-ivory">
      <Container className="max-w-xl text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold">{t.newsletter.heading}</h2>
        <p className="mt-3 text-ivory/80 leading-relaxed">{t.newsletter.sub}</p>

        {status === "success" ? (
          <p className="mt-6 rounded-sm bg-ivory/10 px-4 py-3 text-sm font-medium">
            {t.newsletter.success}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
            <label htmlFor="newsletter-email" className="sr-only">
              {t.newsletter.placeholder}
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder={t.newsletter.placeholder}
              className="flex-1 rounded-sm px-4 py-3 text-ink placeholder:text-ink-soft/70 outline-none focus-visible:outline-2 focus-visible:outline-saffron"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-sm bg-saffron px-6 py-3 text-sm font-medium text-ivory hover:bg-saffron-dark transition-colors disabled:opacity-70"
            >
              {status === "submitting" ? t.newsletter.submitting : t.newsletter.submit}
            </button>
          </form>
        )}

        {status === "error" ? (
          <p className="mt-3 text-sm text-amber-200">{t.newsletter.error}</p>
        ) : null}

        <p className="mt-4 text-xs text-ivory/50">{t.newsletter.disclaimer}</p>
      </Container>
    </section>
  );
}
