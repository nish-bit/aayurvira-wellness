import type { Metadata } from "next";
import { Suspense } from "react";
import { Lora, Work_Sans, Noto_Serif_Devanagari, Hind } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import hi from "@/lib/i18n/hi";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import ConsentBanner from "@/components/analytics/ConsentBanner";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  variable: "--font-noto-serif-dev",
  subsets: ["devanagari"],
  weight: ["500", "600", "700"],
});

const hind = Hind({
  variable: "--font-hind",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: hi.meta.title,
  description: hi.meta.description,
  openGraph: {
    title: hi.meta.title,
    description: hi.meta.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: hi.meta.title,
    description: hi.meta.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="hi"
      data-lang="hi"
      className={`${lora.variable} ${workSans.variable} ${notoSerifDevanagari.variable} ${hind.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-ink">
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <LanguageProvider>
          {children}
          <ConsentBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
