const steps = [
  {
    number: "1",
    title: "Explore",
    body: "Browse our kids wellness products."
  },
  {
    number: "2",
    title: "Enquire",
    body: "Submit your name and contact number."
  },
  {
    number: "3",
    title: "Connect",
    body: "Our team contacts you to provide product information."
  }
];

export default function HowItWorksSection() {
  return (
    <section className="border-y border-mist/60 bg-parchment2/40 py-16 md:py-20">
      <div className="container-site">
        <div className="mb-10 text-center">
          <p className="eyebrow mb-2">How It Works</p>
          <h2 className="text-3xl">Simple, From Start to Finish</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-lg font-semibold text-parchment">
                {step.number}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-1.5 text-sm text-ink/65">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
