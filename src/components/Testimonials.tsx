"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Container, SectionHeading, MailIcon } from "./ui";
import { testimonials } from "@/data/testimonials";
import { site } from "@/data/site";
import { trackEvent } from "@/lib/analytics/gtag";

export default function Testimonials() {
  const { t, lang } = useLanguage();

  return (
    <section id="reviews" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          heading={t.testimonials.heading}
          sub={t.testimonials.sub}
          align="center"
        />

        {testimonials.length > 0 ? (
          <p className="mt-4 max-w-2xl mx-auto text-center text-xs text-ink-soft/80 leading-relaxed italic">
            {t.testimonials.disclaimer}
          </p>
        ) : null}

        {testimonials.length === 0 ? (
          <div className="mt-10 rounded-lg border border-dashed border-line px-6 py-10 text-center max-w-xl mx-auto">
            <h3 className="font-display text-xl font-semibold text-forest">
              {t.testimonials.emptyTitle}
            </h3>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">
              {t.testimonials.emptyDesc}
            </p>
            {site.email ? (
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(
                  "My experience with Aayurvira Wellness"
                )}`}
                onClick={() => trackEvent("email_click", { location: "testimonials_share" })}
                className="mt-5 inline-flex items-center gap-2 rounded-sm bg-forest px-5 py-2.5 text-sm font-medium text-ivory hover:bg-forest-light"
              >
                <MailIcon className="h-4 w-4" />
                {t.testimonials.ctaShare}
              </a>
            ) : null}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((review) => {
              // Quotes are stored only in the language they were actually
              // given in. Prefer the site's current language, but fall
              // back to whichever is present rather than inventing a
              // translation.
              const quote =
                lang === "hi"
                  ? (review.quote.hi ?? review.quote.en)
                  : (review.quote.en ?? review.quote.hi);

              return (
                <figure
                  key={review.id}
                  className="flex flex-col rounded-lg border border-line bg-white p-5 shadow-sm"
                >
                  <blockquote className="text-sm text-ink leading-relaxed flex-1">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-3 pt-3 border-t border-line/70">
                    {review.photo ? (
                      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                        <Image src={review.photo} alt="" fill sizes="36px" className="object-cover" />
                      </span>
                    ) : null}
                    <span className="text-sm text-ink-soft">
                      {review.name ? (
                        <span className="font-medium text-forest">{review.name} · </span>
                      ) : null}
                      📍 {review.location.state}, {review.location.country}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
