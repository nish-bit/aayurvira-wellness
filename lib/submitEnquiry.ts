import { EnquiryPayload } from "./types";

/**
 * The ONLY enquiry submission path in this project.
 *
 * This calls our own same-origin Next.js API route (/api/enquiry), which
 * then forwards the request to Google Apps Script server-side. We do NOT
 * call script.google.com directly from the browser: Google Apps Script Web
 * App responses do not carry the CORS headers a browser `fetch()` requires,
 * so a direct client-side call can appear to fail (or silently swallow the
 * real error) even when Apps Script successfully wrote the row to the
 * sheet. Routing through our own API sidesteps CORS entirely, since
 * server-to-server requests are not subject to it.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<void> {
  const response = await fetch("/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({
    success: false,
    message: "Unable to submit enquiry. Please try again."
  }));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Unable to submit enquiry. Please try again.");
  }
}
