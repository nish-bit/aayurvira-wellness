import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms and conditions for using the Aayurvira Wellness website and enquiry process.",
  alternates: { canonical: "/terms" }
};

export default function TermsPage() {
  return (
    <section className="container-site max-w-3xl py-14 md:py-20">
      <h1 className="text-4xl">Terms &amp; Conditions</h1>
      <p className="mt-3 text-sm text-ink/50">Last updated: [Placeholder date]</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink/75">
        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-ink">Website Purpose</h2>
          <p>
            This website is for informational purposes and to help you enquire about our Ayurvedic and
            herbal wellness products. We do not process online orders, payments, or accounts through
            this website.
          </p>
        </div>
        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-ink">Product Information</h2>
          <p>
            Product descriptions are provided for general informational purposes and are not intended
            to diagnose, treat, cure or prevent any disease. Please consult a qualified practitioner
            before use, especially if pregnant, nursing, or managing a medical condition.
          </p>
        </div>
        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-ink">Enquiries</h2>
          <p>
            By submitting an enquiry or call request, you agree that our team may contact you by phone,
            WhatsApp or email regarding your request.
          </p>
        </div>
        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-ink">Limitation of Liability</h2>
          <p>
            [Placeholder — replace with finalized legal text reviewed by a professional before launch.]
          </p>
        </div>
      </div>
    </section>
  );
}
