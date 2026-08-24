import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Aayurvira Wellness collects, uses and protects the information you share with us.",
  alternates: { canonical: "/privacy" }
};

export default function PrivacyPage() {
  return (
    <section className="container-site max-w-3xl py-14 md:py-20">
      <h1 className="text-4xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-ink/50">Last updated: [Placeholder date]</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink/75">
        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-ink">Information We Collect</h2>
          <p>
            When you submit an enquiry or request a call, we collect the information you provide —
            typically your name, phone number, WhatsApp number, email address, product of interest, and
            any message you include.
          </p>
        </div>
        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-ink">How We Use Your Information</h2>
          <p>
            We use this information solely to respond to your enquiry, share product details, and
            follow up by phone or WhatsApp. We do not sell your information to third parties.
          </p>
        </div>
        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-ink">Data Storage</h2>
          <p>
            Enquiry details are stored securely in our internal systems for the purpose of managing and
            responding to your request. [Placeholder — describe your actual data retention practices.]
          </p>
        </div>
        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-ink">Your Choices</h2>
          <p>
            You may contact us at any time to ask what information we hold about you, or to request
            that it be deleted. [Placeholder — add your business's contact process.]
          </p>
        </div>
        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-ink">Contact</h2>
          <p>
            For any privacy-related questions, please reach out through our Contact page.
            [Placeholder — replace with finalized legal text reviewed by a professional before launch.]
          </p>
        </div>
      </div>
    </section>
  );
}
