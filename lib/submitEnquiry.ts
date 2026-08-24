import { RequestCallPayload } from "./types";

const ENDPOINT = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT || "";

/**
 * Google Apps Script Web Apps do not return normal CORS headers when called
 * with a JSON body, so we send the payload as `text/plain` (which Apps
 * Script can still parse as JSON on the server) and request `mode: "cors"`.
 * If the endpoint has not been configured yet, we fail fast with a clear
 * error instead of silently pretending to succeed.
 *
 * Only Full Name, Contact Number, and Product are ever sent — this is a
 * single-page, enquiry-based kids wellness site. The Apps Script is
 * responsible for stamping Date and defaulting Status to "New" on its side.
 */
async function postToSheet(body: Record<string, unknown>): Promise<void> {
  if (!ENDPOINT) {
    throw new Error(
      "Google Sheets endpoint is not configured. Set NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT in .env.local."
    );
  }

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`Enquiry submission failed with status ${response.status}`);
  }

  const data = await response.json().catch(() => ({ result: "success" }));
  if (data && data.result === "error") {
    throw new Error(data.message || "Enquiry submission failed.");
  }
}

export async function submitRequestCall(payload: RequestCallPayload): Promise<void> {
  await postToSheet({
    type: "enquiry",
    ...payload
  });
}
