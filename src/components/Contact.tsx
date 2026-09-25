"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Container, SectionHeading, MailIcon } from "./ui";
import { site } from "@/data/site";
import { trackEvent } from "@/lib/analytics/gtag";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-16 sm:py-20 bg-ivory-deep/60">
      <Container className="max-w-xl mx-auto text-center">
        <SectionHeading heading={t.contact.heading} sub={t.contact.sub} align="center" />
        <a
          href={`mailto:${site.email}`}
          onClick={() => trackEvent("email_click", { location: "contact_section" })}
          className="mt-6 inline-flex items-center gap-2 rounded-sm bg-forest px-6 py-3 text-base font-medium text-ivory hover:bg-forest-light transition-colors"
        >
          <MailIcon className="h-4 w-4" />
          {site.email}
        </a>
      </Container>
    </section>
  );
}
