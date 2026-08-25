import { Testimonial } from "@/lib/types";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="card-surface flex h-full flex-col justify-between p-6">
      <blockquote className="text-sm leading-relaxed text-ink/80">“{testimonial.quote}”</blockquote>
      <figcaption className="mt-5 text-sm font-semibold text-forest">
        {testimonial.name}
        <span className="ml-1 font-normal text-ink/50">— {testimonial.location}</span>
        {testimonial.ageRange && (
          <span className="mt-0.5 block text-xs font-normal text-ink/40">{testimonial.ageRange}</span>
        )}
      </figcaption>
    </figure>
  );
}
