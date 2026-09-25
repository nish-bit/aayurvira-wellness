/**
 * Google Apps Script Web App endpoint that writes Name + Phone leads
 * directly into the connected Google Sheet.
 *
 * This URL is safe to ship in client-side code: a Web App deployed with
 * "Execute as: Me / Who has access: Anyone" is, by Google's own design,
 * a public execution endpoint meant to be called from a browser — it is
 * not a credential, API key, or service-account secret. It can still be
 * overridden without touching this file via
 * NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT (e.g. if the deployment URL ever
 * changes) — this is the one place that value lives, never duplicated
 * elsewhere in the code.
 */
export const GOOGLE_SHEETS_ENDPOINT =
  process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT ||
  "https://script.google.com/macros/s/AKfycbyOWiHC0CsGCyagGtltuSR3UmQ1wgbO_Xo_8QNCVn6S6hl7RCyiK6J62WzSpCfJtqJu/exec";

const INDIAN_MOBILE_RE = /^[6-9]\d{9}$/;

export function isValidIndianMobile(phone: string): boolean {
  return INDIAN_MOBILE_RE.test(phone);
}

export type LeadSubmissionResult = { ok: true } | { ok: false };

/**
 * Sends { name, phone } to the Apps Script endpoint.
 *
 * Deliberately uses `Content-Type: text/plain` rather than
 * `application/json`: Apps Script Web Apps do not reliably handle the
 * CORS preflight (OPTIONS) request that a JSON content-type triggers in
 * the browser — a well-known limitation of Apps Script's HTTP handling.
 * text/plain is a CORS "simple request" and skips the preflight, while
 * the body is still exactly the JSON string `{"name": "...", "phone":
 * "..."}` the brief asked for. On the Apps Script side, doPost(e) should
 * read it with JSON.parse(e.postData.contents).
 */
export async function submitLead(name: string, phone: string): Promise<LeadSubmissionResult> {
  try {
    const response = await fetch(GOOGLE_SHEETS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ name, phone }),
    });
    return response.ok ? { ok: true } : { ok: false };
  } catch {
    // No details are logged here — not the error, not the response body
    // — so nothing that could ever contain the submitted name or phone
    // number reaches the browser console.
    return { ok: false };
  }
}
