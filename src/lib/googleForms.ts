import type { ProductId } from "@/data/products";

/**
 * Each product's enquiry button can use its own dedicated Google Form
 * (so responses land in a separate Sheet per product, identifying which
 * product an enquiry was about — since the form itself only contains
 * Name + Phone, with no product field). If a product-specific URL isn't
 * set, it falls back to one shared form (NEXT_PUBLIC_GOOGLE_FORM_URL) so
 * a single pasted link works everywhere immediately.
 *
 * Env vars are read at build time. If neither a product-specific nor the
 * shared URL is set, that product's enquiry button shows an honest
 * "coming soon" placeholder instead of a broken embed — never a silent
 * failure or a fallback to something the client didn't ask for.
 */
const PRODUCT_FORM_URLS: Record<ProductId, string | undefined> = {
  powder: process.env.NEXT_PUBLIC_NEURO_VIRA_POWDER_FORM_URL || undefined,
  syrup: process.env.NEXT_PUBLIC_NEURO_VIRA_SYRUP_FORM_URL || undefined,
  oil: process.env.NEXT_PUBLIC_NEURO_VIRA_NABHI_OIL_FORM_URL || undefined,
};

const SHARED_FORM_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || undefined;

export function getFormUrlForProduct(productId: ProductId): string | undefined {
  return PRODUCT_FORM_URLS[productId] ?? SHARED_FORM_URL;
}

/**
 * Google Forms' normal share link (".../viewform") renders its own page
 * chrome. Appending "embedded=true" (Google's own documented parameter,
 * exactly what "Send > Embed HTML" generates) gives the stripped-down
 * version meant for an <iframe>.
 */
export function toEmbedUrl(formUrl: string): string {
  try {
    const url = new URL(formUrl);
    url.searchParams.set("embedded", "true");
    return url.toString();
  } catch {
    // Not a valid absolute URL — return as-is rather than throwing;
    // the modal's own rendering will simply fail visibly if this
    // happens, which is preferable to crashing the page.
    return formUrl;
  }
}
