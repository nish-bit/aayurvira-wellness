const reasons = [
  {
    emoji: "🌿",
    title: "Carefully Selected Ingredients",
    body: "Thoughtfully selected herbs, prepared with care for growing families."
  },
  {
    emoji: "👨‍👩‍👧",
    title: "Made With Families in Mind",
    body: "Formulated with growing children and everyday family routines in mind."
  },
  {
    emoji: "✓",
    title: "Quality Focused",
    body: "Consistency and care in every product we offer."
  },
  {
    emoji: "🌱",
    title: "Inspired by Ayurveda",
    body: "Traditional Ayurvedic and herbal wellness knowledge, thoughtfully applied."
  },
  {
    emoji: "💚",
    title: "Customer Support",
    body: "A real person on WhatsApp or a call whenever you have a question."
  }
];

export default function WhyChooseUsSection() {
  return (
    <section id="why-choose-us" className="scroll-mt-20 border-y border-mist/60 bg-parchment2/50 py-16 md:py-20">
      <div className="container-site">
        <p className="eyebrow mb-2 text-center">Our Promise</p>
        <h2 className="text-center text-3xl">Why Parents Choose Aayurvira Wellness</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div key={reason.title} className="card-surface p-6">
              <span className="text-2xl" aria-hidden="true">{reason.emoji}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-forest">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{reason.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
