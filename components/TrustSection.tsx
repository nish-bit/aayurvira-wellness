const items = [
  { title: "Quality", icon: "check" },
  { title: "Natural", icon: "leaf" },
  { title: "Kids Focused", icon: "shield" },
  { title: "Customer Support", icon: "chat" }
] as const;

export default function TrustSection() {
  return (
    <section className="border-b border-mist/60 bg-parchment2/60">
      <div className="container-site grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col items-center gap-2 text-center">
            <TrustIcon name={item.icon} />
            <p className="text-sm font-medium text-ink/80">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrustIcon({ name }: { name: string }) {
  const common = "h-6 w-6 text-forest";
  switch (name) {
    case "leaf":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
          <path d="M4 20c8 0 16-8 16-16-8 0-16 8-16 16Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 20c4-4 8-8 12-12" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
          <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
          <path d="M4 5h16v11H8l-4 4V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
  }
}
