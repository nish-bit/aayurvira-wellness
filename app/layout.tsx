import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aayurvirawellness.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aayurvira Wellness | Natural Wellness for Growing Minds & Bodies",
    template: "%s | Aayurvira Wellness"
  },
  description:
    "Thoughtfully selected Ayurvedic and herbal wellness products designed for children. Enquire by phone or WhatsApp.",
  openGraph: {
    type: "website",
    siteName: "Aayurvira Wellness",
    title: "Aayurvira Wellness | Natural Wellness for Growing Minds & Bodies",
    description:
      "Thoughtfully selected Ayurvedic and herbal wellness products designed for children. Enquire by phone or WhatsApp.",
    url: siteUrl
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Aayurvira Wellness",
    url: siteUrl,
    description:
      "Aayurvira Wellness is a children's wellness brand showcasing thoughtfully selected natural products for growing kids and the families who care for them.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "",
      contactType: "customer service"
    }
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="pb-20 md:pb-0">{children}</main>
        <Footer />
        <WhatsAppButton floating />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
