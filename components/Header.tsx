"use client";

import { useState } from "react";
import WhatsAppButton from "./WhatsAppButton";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Kids Products", href: "#products" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
];

export default function Header() {
  const [open, setOpen] = useState(false);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-mist/60 bg-parchment/90 backdrop-blur-md">
      <div className="container-site flex h-18 items-center justify-between py-3">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="font-display text-2xl font-semibold tracking-tight text-forest"
        >
          Aayur<span className="text-sandal">vira</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-forest"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <WhatsAppButton label="WhatsApp Us" />
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-mist md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle navigation</span>
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4l12 12M16 4L4 16" stroke="#22281F" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M2 5h16M2 10h16M2 15h16" stroke="#22281F" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden border-t border-mist/60 bg-parchment transition-[max-height] duration-300 ease-out ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="container-site flex flex-col gap-1 py-4" aria-label="Mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="rounded-lg px-2 py-3 text-base font-medium text-ink/85 hover:bg-forest/5"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2">
            <WhatsAppButton label="WhatsApp Us" className="w-full" />
          </div>
        </nav>
      </div>
    </header>
  );
}
