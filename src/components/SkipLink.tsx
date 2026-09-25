"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function SkipLink() {
  const { t } = useLanguage();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-sm focus:bg-forest focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ivory"
    >
      {t.skipLink}
    </a>
  );
}
