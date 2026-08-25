"use client";

import { getGeneralWhatsAppLink, getProductWhatsAppLink } from "@/lib/whatsapp";

interface WhatsAppButtonProps {
  productName?: string;
  customMessage?: string;
  floating?: boolean;
  variant?: "solid" | "outline";
  label?: string;
  className?: string;
}

export default function WhatsAppButton({
  productName,
  customMessage,
  floating = false,
  variant = "solid",
  label = "WhatsApp Us",
  className = ""
}: WhatsAppButtonProps) {
  const href = productName
    ? getProductWhatsAppLink(productName, customMessage)
    : getGeneralWhatsAppLink();

  if (floating) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#2E7D57] text-white shadow-soft transition-transform hover:scale-105 md:bottom-6"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    );
  }

  const base =
    variant === "solid"
      ? "btn-whatsapp"
      : "inline-flex items-center justify-center gap-2 rounded-full border border-[#2E7D57]/40 px-6 py-3 text-sm font-semibold text-[#256345] transition-colors hover:bg-[#2E7D57]/5";

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${className}`}>
      <WhatsAppIcon className="h-4 w-4" />
      {label}
    </a>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.02 3C9.4 3 4.02 8.38 4.02 15c0 2.19.58 4.28 1.68 6.13L4 29l8.06-1.66A11.9 11.9 0 0 0 16.02 27C22.64 27 28 21.62 28 15S22.64 3 16.02 3Zm0 21.7c-1.9 0-3.75-.5-5.36-1.46l-.38-.22-4.78.98.99-4.66-.25-.4a9.6 9.6 0 0 1-1.5-5.14c0-5.34 4.36-9.7 9.7-9.7 5.34 0 9.7 4.36 9.7 9.7 0 5.34-4.36 9.9-9.12 9.9Zm5.34-7.28c-.29-.15-1.73-.85-2-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.15-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.91-2.18-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43 0 1.44 1.05 2.83 1.2 3.02.15.2 2.07 3.15 5.01 4.42.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.73-.71 1.98-1.39.24-.68.24-1.27.17-1.39-.07-.12-.26-.2-.55-.35Z"/>
    </svg>
  );
}
