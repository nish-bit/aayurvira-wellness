import Image from "next/image";

export default function ComparisonBanner() {
  return (
    <section className="container-site py-4 md:py-6">
      <div className="overflow-hidden rounded-card shadow-soft">
        <div className="relative aspect-[1774/887] w-full">
          <Image
            src="/images/brand/why-choose-us-comparison.jpg"
            alt="Why thousands of families choose Aayurvira Wellness — comparison of Aayurvira Wellness against other Ayurvedic brands across specialised formulations, expert support, ISO and GMP certification, lab testing, and clear ingredient disclosure"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
