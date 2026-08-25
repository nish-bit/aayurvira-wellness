import RequestCallModal from "./RequestCallModal";
import WhatsAppButton from "./WhatsAppButton";

export default function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-mist/60 bg-parchment/95 p-3 backdrop-blur-md md:hidden">
      <RequestCallModal triggerClassName="btn-primary flex-1 !py-2.5 text-sm" />
      <WhatsAppButton variant="outline" className="flex-1 !py-2.5 text-sm" />
    </div>
  );
}
