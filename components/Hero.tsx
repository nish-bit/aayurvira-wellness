import Image from "next/image";
import WhatsAppButton from "./WhatsAppButton";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden border-b border-mist/60 scroll-mt-20">
      <div className="container-site grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
        <div className="animate-fadeUp">
          <p className="eyebrow mb-4">Aayurvira Wellness</p>
          <h1 className="text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            Natural Wellness for{" "}
            <em className="not-italic text-forest">Growing Minds &amp; Bodies</em>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70">
            Thoughtfully selected Ayurvedic and herbal wellness products designed for children.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#products" className="btn-primary">
              Explore Kids Products
            </a>
            <WhatsAppButton
              variant="outline"
              label="WhatsApp Us"
            />
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card shadow-soft animate-fadeIn">
          <Image
            src="/images/categories/kids-wellness.jpg"
            alt="Happy children playing outdoors in a safe, green environment"
            fill
            priority
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-cover"
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="h-6 w-full bg-leaf-vein bg-[length:1200px_120px] bg-repeat-x opacity-70"
      />
    </section>
  );
}
