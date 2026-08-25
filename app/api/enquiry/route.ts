import { NextRequest, NextResponse } from "next/server";

// Indian mobile numbers: exactly 10 digits, starting with 6, 7, 8, or 9.
const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

function normalizePhone(raw: string): string {
  // Strip spaces, dashes, and an optional leading +91 / 91 / 0 so we can
  // validate the core 10-digit number regardless of how the user typed it.
  let digits = raw.replace(/[^\d]/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  return digits;
}

export async function POST(request: NextRequest) {
  let body: { name?: unknown; phone?: unknown; product?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const rawPhone = typeof body.phone === "string" ? body.phone.trim() : "";
  const product = typeof body.product === "string" ? body.product.trim() : "";
  const phone = normalizePhone(rawPhone);

  if (!name) {
    return NextResponse.json(
      { success: false, message: "Full name is required." },
      { status: 400 }
    );
  }

  if (!INDIAN_MOBILE_REGEX.test(phone)) {
    return NextResponse.json(
      {
        success: false,
        message: "Please enter a valid 10-digit Indian mobile number."
      },
      { status: 400 }
    );
  }

  const endpoint = process.env.GOOGLE_SHEETS_ENDPOINT;

  if (!endpoint) {
    console.error(
      "[api/enquiry] GOOGLE_SHEETS_ENDPOINT is not set in the server environment."
    );
    return NextResponse.json(
      { success: false, message: "Google Sheets endpoint is not configured." },
      { status: 500 }
    );
  }

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ name, phone, product })
    });

    const rawText = await upstream.text();
    let upstreamData: { success?: boolean; message?: string } = {};
    try {
      upstreamData = JSON.parse(rawText);
    } catch {
      // Apps Script sometimes returns non-JSON on unhandled exceptions —
      // treat that as a failure and surface the raw text for debugging.
      console.error("[api/enquiry] Non-JSON response from Apps Script:", rawText);
      return NextResponse.json(
        { success: false, message: "Unable to submit enquiry. Please try again." },
        { status: 502 }
      );
    }

    if (!upstream.ok || upstreamData.success === false) {
      console.error("[api/enquiry] Apps Script reported an error:", upstreamData);
      return NextResponse.json(
        {
          success: false,
          message: upstreamData.message || "Unable to submit enquiry. Please try again."
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully"
    });
  } catch (error) {
    console.error("[api/enquiry] Failed to reach Google Apps Script:", error);
    return NextResponse.json(
      { success: false, message: "Unable to reach the enquiry service. Please try again." },
      { status: 502 }
    );
  }
}
