/**
 * Central WhatsApp helpers. Never hard-code the phone number in components —
 * always read it from NEXT_PUBLIC_WHATSAPP_NUMBER via these helpers.
 */

export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919528218326";
}

export function getGeneralWhatsAppLink(): string {
  const message =
    "Hello, I am interested in Aayurvira Wellness kids products. Please share more information.";
  return buildWhatsAppLink(message);
}

export function getProductWhatsAppLink(productName: string, customMessage?: string): string {
  const message =
    customMessage ||
    `Hello, I am interested in ${productName}. Please share more information about this product.`;
  return buildWhatsAppLink(message);
}

export function buildWhatsAppLink(message: string): string {
  const number = getWhatsAppNumber();
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}
