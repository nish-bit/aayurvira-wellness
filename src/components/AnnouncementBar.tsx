"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Container } from "./ui";

export default function AnnouncementBar() {
  const { t } = useLanguage();
  return (
    <div className="bg-forest text-ivory text-sm">
      <Container className="flex items-center justify-between gap-4 py-2">
        <p className="truncate">{t.announcement.text}</p>
        <a
          href="#products"
          className="hidden sm:inline whitespace-nowrap font-medium underline-offset-4 hover:underline"
        >
          {t.announcement.cta}
        </a>
      </Container>
    </div>
  );
}
