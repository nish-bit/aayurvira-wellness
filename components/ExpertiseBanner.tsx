import Image from "next/image";
import RequestCallModal from "./RequestCallModal";
import WhatsAppButton from "./WhatsAppButton";

export default function ExpertiseBanner() {
  return (
    <section className="container-site py-4 md:py-6">
      <div className="overflow-hidden rounded-card shadow-soft">
        <div className="relative aspect-[1735/906] w-full">
          <Image
            src="/images/brand/expertise-banner.jpg"
            alt="Aayurvira Wellness — Your Wellness, Our Expertise. Ayurvedic care rooted in nature, guided by experts."
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-center gap-3 border-t border-mist/60 bg-parchment2 px-6 py-6 text-center sm:flex-row sm:justify-center">
          <p className="text-sm font-medium text-ink/70">
            Have a question, or want personalised guidance?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <RequestCallModal triggerLabel="Enquire Now" triggerClassName="btn-primary" />
            <WhatsAppButton />
          </div>
        </div>
      </div>
    </section>
  );
}
