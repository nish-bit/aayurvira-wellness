import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  heading,
  sub,
  align = "left",
}: {
  eyebrow?: string;
  heading: string;
  sub?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow ? (
        <p className="text-sm font-medium tracking-wide text-saffron-dark mb-2">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-forest leading-tight text-balance">
        {heading}
      </h2>
      {sub ? (
        <p className="mt-3 text-ink-soft leading-relaxed text-balance">{sub}</p>
      ) : null}
    </div>
  );
}

/** A quiet botanical rule used between sections, in place of a plain hairline. */
export function LeafRule({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 16"
      aria-hidden="true"
      className={`h-4 w-40 text-forest-light/60 ${className}`}
    >
      <line x1="0" y1="8" x2="100" y2="8" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M120 2 C126 6 126 10 120 14 C114 10 114 6 120 2 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <line x1="140" y1="8" x2="240" y2="8" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function MailIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6.5 9 6.5 9-6.5" />
    </svg>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  target,
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  target?: string;
  onClick?: () => void;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-medium transition-colors duration-150 focus-visible:outline-2";
  const styles: Record<string, string> = {
    primary: "bg-forest text-ivory hover:bg-forest-light",
    secondary:
      "border border-forest text-forest hover:bg-forest hover:text-ivory",
    ghost: "text-forest underline underline-offset-4 hover:text-saffron-dark",
  };
  return (
    <a href={href} target={target} onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </a>
  );
}
