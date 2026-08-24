import WhatsAppButton from "./WhatsAppButton";
import RequestCallModal from "./RequestCallModal";

const businessPhone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+91 95282 18326";
const businessPhoneHref = process.env.NEXT_PUBLIC_BUSINESS_PHONE_TEL || "tel:+919528218326";
const businessEmail = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "hello@aayurvirawellness.com";

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 border-y border-mist/60 bg-forest">
      <div className="container-site flex flex-col items-center gap-6 py-16 text-center md:py-20">
        <h2 className="text-3xl font-semibold text-parchment">Have Questions?</h2>
        <p className="max-w-xl text-sm leading-relaxed text-parchment/75">
          Our team is happy to help you learn more about our kids wellness products — reach out
          however is easiest for you.
        </p>

        <dl className="flex flex-col gap-2 text-sm text-parchment/85 sm:flex-row sm:gap-8">
          <div>
            <dt className="inline font-semibold text-parchment">Phone: </dt>
            <dd className="inline">
              <a href={businessPhoneHref} className="hover:underline">
                {businessPhone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="inline font-semibold text-parchment">WhatsApp: </dt>
            <dd className="inline">{businessPhone}</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-parchment">Email: </dt>
            <dd className="inline">{businessEmail}</dd>
          </div>
        </dl>

        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <WhatsAppButton label="WhatsApp Us" />
          <RequestCallModal
            triggerLabel="Enquire Now"
            triggerClassName="rounded-full bg-parchment px-6 py-3 text-sm font-semibold text-forest transition-colors hover:bg-white"
          />
        </div>
      </div>
    </section>
  );
}
