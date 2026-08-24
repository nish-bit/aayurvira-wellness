import Link from "next/link";
import { getGeneralWhatsAppLink } from "@/lib/whatsapp";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Kids Products", href: "#products" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Contact", href: "#contact" }
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-mist/60 bg-parchment2">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-xl font-semibold text-forest">
            Aayur<span className="text-sandal">vira</span> Wellness
          </p>
          <p className="mt-2 text-sm text-ink/60">Kids Wellness</p>
          <div className="mt-5 flex gap-3">
            <SocialIcon label="Instagram" />
            <SocialIcon label="Facebook" />
            <SocialIcon label="YouTube" />
            <a
              href={getGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-forest/25 text-forest/80 transition-colors hover:bg-forest/10"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow mb-4">Quick Links</p>
          <ul className="space-y-2 text-sm text-ink/75">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-forest">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Legal</p>
          <ul className="space-y-2 text-sm text-ink/75">
            <li><Link href="/privacy" className="hover:text-forest">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-forest">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-mist/60 py-5 text-center text-xs text-ink/55">
        © {new Date().getFullYear()} Aayurvira Wellness. All rights reserved.
      </div>
    </footer>
  );
}

function SocialIcon({ label }: { label: string }) {
  return (
    <span
      className="flex h-9 w-9 items-center justify-center rounded-full border border-forest/25 text-xs font-semibold text-forest/80"
      aria-label={label}
      title={label}
    >
      {label[0]}
    </span>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.02 3C9.4 3 4.02 8.38 4.02 15c0 2.19.58 4.28 1.68 6.13L4 29l8.06-1.66A11.9 11.9 0 0 0 16.02 27C22.64 27 28 21.62 28 15S22.64 3 16.02 3Zm0 21.7c-1.9 0-3.75-.5-5.36-1.46l-.38-.22-4.78.98.99-4.66-.25-.4a9.6 9.6 0 0 1-1.5-5.14c0-5.34 4.36-9.7 9.7-9.7 5.34 0 9.7 4.36 9.7 9.7 0 5.34-4.36 9.9-9.12 9.9Zm5.34-7.28c-.29-.15-1.73-.85-2-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.15-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.91-2.18-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43 0 1.44 1.05 2.83 1.2 3.02.15.2 2.07 3.15 5.01 4.42.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.73-.71 1.98-1.39.24-.68.24-1.27.17-1.39-.07-.12-.26-.2-.55-.35Z"/>
    </svg>
  );
}
