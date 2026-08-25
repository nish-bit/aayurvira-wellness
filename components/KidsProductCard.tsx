import Image from "next/image";
import type { Product } from "@/lib/types";
import ProductEnquiryModal from "./ProductEnquiryModal";
import WhatsAppButton from "./WhatsAppButton";

export default function KidsProductCard({ product }: { product: Product }) {
  return (
    <div className="card-surface flex flex-col overflow-hidden">
      <div className="relative h-52 w-full overflow-hidden bg-parchment2">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-ink">{product.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{product.shortDescription}</p>
        <p className="mt-3 text-xs leading-relaxed text-forest/80">{product.wellnessInformation}</p>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <ProductEnquiryModal productName={product.name} triggerClassName="btn-primary flex-1 !py-2.5 text-sm" />
          <WhatsAppButton
            productName={product.name}
            variant="outline"
            className="flex-1 !py-2.5 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
