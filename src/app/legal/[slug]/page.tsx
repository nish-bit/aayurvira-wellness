"use client";

import Link from "next/link";
import { use } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Container } from "@/components/ui";

const TITLE_KEY = {
  "privacy-policy": "privacy",
  "terms-of-service": "terms",
  "shipping-policy": "shipping",
  "return-refund-policy": "returns",
} as const;

export default function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { t } = useLanguage();
  const key = (TITLE_KEY as Record<string, keyof typeof t.footer>)[slug];
  const title = key ? t.footer[key] : t.legal.placeholderTitle;

  return (
    <main className="min-h-[60vh]">
      <Container className="max-w-2xl py-20">
        <h1 className="font-display text-3xl font-semibold text-forest">{title}</h1>
        <div className="mt-6 rounded-lg border border-dashed border-line px-6 py-10 text-center">
          <h2 className="font-display text-xl font-semibold text-forest">
            {t.legal.placeholderTitle}
          </h2>
          <p className="mt-2 text-sm text-ink-soft leading-relaxed">
            {t.legal.placeholderBody}
          </p>
        </div>
        <Link href="/" className="mt-8 inline-block text-sm font-medium text-forest hover:text-saffron-dark">
          ← {t.legal.back}
        </Link>
      </Container>
    </main>
  );
}
