const topics = [
  {
    title: "Growing & Development",
    body: "Traditionally inspired support for everyday growth and development."
  },
  {
    title: "Daily Wellness",
    body: "Gentle formulas designed for children's everyday wellness routine."
  },
  {
    title: "Focus & Learning Support",
    body: "Herbal support that fits into a growing child's daily learning routine."
  },
  {
    title: "General Child Wellness",
    body: "Everyday wellness support designed for children's wellness."
  },
  {
    title: "Healthy Lifestyle",
    body: "Simple, natural additions to a healthy family lifestyle."
  }
];

export default function KidsWellnessInfoSection() {
  return (
    <section className="container-site py-16 md:py-20">
      <div className="mb-10 text-center">
        <p className="eyebrow mb-2">Kids Wellness</p>
        <h2 className="text-3xl">Supporting Everyday Wellness</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <div key={topic.title} className="card-surface p-6">
            <h3 className="font-display text-lg font-semibold text-ink">{topic.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">{topic.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
