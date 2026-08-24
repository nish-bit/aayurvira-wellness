import Hero from "@/components/Hero";
import ExpertiseBanner from "@/components/ExpertiseBanner";
import TrustSection from "@/components/TrustSection";
import KidsProductCard from "@/components/KidsProductCard";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import OurApproachSection from "@/components/OurApproachSection";
import KidsWellnessInfoSection from "@/components/KidsWellnessInfoSection";
import ComparisonBanner from "@/components/ComparisonBanner";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialCard from "@/components/TestimonialCard";
import FAQAccordion from "@/components/FAQAccordion";
import SafetyDisclaimer from "@/components/SafetyDisclaimer";
import ContactSection from "@/components/ContactSection";
import { products } from "@/data/products";
import { testimonials } from "@/data/testimonials";
import { siteFaqs } from "@/data/faqs";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Hero />
      <ExpertiseBanner />
      <TrustSection />

      <section id="products" className="scroll-mt-20 container-site py-16 md:py-20">
        <div className="mb-10 text-center">
          <p className="eyebrow mb-2">Explore Our Kids Wellness Products</p>
          <h2 className="text-3xl">Kids Wellness</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <KidsProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <WhyChooseUsSection />
      <OurApproachSection />
      <KidsWellnessInfoSection />
      <ComparisonBanner />
      <HowItWorksSection />

      <section className="container-site py-16 md:py-20">
        <p className="eyebrow mb-2 text-center">What Parents Say</p>
        <h2 className="text-center text-3xl">What Parents Say</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-ink/40">
          Demo testimonials shown for development — replace with real, consented feedback before launch.
        </p>
      </section>

      <section id="faq" className="scroll-mt-20 border-t border-mist/60 bg-parchment2/40 py-16 md:py-20">
        <div className="container-site max-w-2xl">
          <p className="eyebrow mb-2 text-center">Support</p>
          <h2 className="mb-10 text-center text-3xl">Frequently Asked Questions</h2>
          <FAQAccordion items={siteFaqs} />
        </div>
      </section>

      <SafetyDisclaimer />
      <ContactSection />
    </>
  );
}
