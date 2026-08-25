# Google Sheets Setup (Lead Storage)

This project has no traditional database. Every enquiry and "Request a Call" submission is sent to a
Google Apps Script Web App, which appends a row to a Google Sheet. Follow the steps below in order.

---

## 1. Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet.
2. Rename it, e.g. **"Aayurvira Wellness Leads"**.

## 2. Create the Leads sheet (tab)

1. Rename the first tab (bottom-left) to **`Leads`** exactly (case-sensitive — the script below looks
   for this name).

## 3. Add column headers

In row 1 of the `Leads` tab, add these headers exactly, one per column (A → N):

| A | B | C | D | E | F | G | H | I | J | K | L | M | N |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Lead ID | Date | Time | Name | Phone | WhatsApp | Email | Product | Message | Contact Method | Source | Status | Notes | Type |

## 4. Create the Google Apps Script

1. In the sheet, go to **Extensions → Apps Script**.
2. Delete any starter code in `Code.gs` and paste in the script below.
3. Click the disk icon to save. Name the project (e.g. "Aayurvira Wellness Leads API").

```javascript
/**
 * Aayurvira Wellness — Enquiry & Request-Call intake script.
 * Deploy as a Web App (see step 5) and put the resulting URL into
 * NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT in .env.local
 */

const SHEET_NAME = "Leads";

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return jsonResponse({ result: "error", message: "Leads sheet not found." });
    }

    const data = JSON.parse(e.postData.contents);

    // Basic spam / bot protection: reject empty or absurdly long submissions.
    if (!data.name || !data.phone) {
      return jsonResponse({ result: "error", message: "Name and phone are required." });
    }
    if (String(data.name).length > 200 || String(data.message || "").length > 2000) {
      return jsonResponse({ result: "error", message: "Submission too long." });
    }

    const now = new Date();
    const leadId = "LEAD-" + now.getTime();

    sheet.appendRow([
      leadId,                                   // Lead ID
      Utilities.formatDate(now, "GMT+5:30", "yyyy-MM-dd"), // Date
      Utilities.formatDate(now, "GMT+5:30", "HH:mm:ss"),   // Time
      sanitize(data.name),                       // Name
      sanitize(data.phone),                       // Phone
      sanitize(data.whatsapp || ""),               // WhatsApp
      sanitize(data.email || ""),                   // Email
      sanitize(data.product || ""),                  // Product
      sanitize(data.message || ""),                    // Message
      sanitize(data.contactMethod || ""),               // Contact Method
      sanitize(data.source || "Website"),                // Source
      "New",                                              // Status
      "",                                                  // Notes
      sanitize(data.type || "enquiry")                      // Type (enquiry / request-call)
    ]);

    return jsonResponse({ result: "success" });
  } catch (err) {
    return jsonResponse({ result: "error", message: String(err) });
  }
}

function sanitize(value) {
  // Strip characters that could be interpreted as spreadsheet formulas.
  const str = String(value).trim();
  return str.replace(/^[=+\-@]/, "'$&");
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
```

## 5. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Description: "Aayurvira Wellness leads intake".
4. **Execute as:** Me (your Google account).
5. **Who has access:** Anyone (this makes the endpoint callable from the website; the script itself
   does not expose the sheet contents — it only accepts new rows).
6. Click **Deploy**.
7. Authorize the script when prompted (click through the Google "unverified app" warning — this is
   expected for a script you wrote yourself).

## 6. Set access appropriately

- Do **not** share the underlying Google Sheet publicly — keep sharing set to "Restricted" so only
  your team can view leads.
- Only the Apps Script Web App URL (which can append rows, not read them) is public.
- Review the sheet's sharing settings periodically.

## 7. Copy the deployment URL

After deploying, copy the **Web app URL** shown (it looks like
`https://script.google.com/macros/s/AKfycb.../exec`).

## 8. Add the URL to `.env.local`

In your project root, create `.env.local` (copy from `.env.example`) and set:

```
NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT=https://script.google.com/macros/s/AKfycb.../exec
```

## 9. Test an enquiry

1. Run the site locally (`npm run dev`), open a product page, click **Enquire Now**, and submit the form.
2. You should see the "Thank you!" success message.

## 10. Verify data appears in Google Sheets

1. Open your Google Sheet and check the `Leads` tab.
2. A new row should appear with a `Lead ID`, timestamp, and the details you submitted, with
   `Status = New` and `Type = enquiry` (or `request-call` for the callback form).

---

### Updating the script later

If you ever edit `Code.gs`, you must create a **new deployment** (or use "Manage deployments →
Edit → New version") for the changes to take effect — saving the script alone does not update the
live Web App URL's behavior.

### Notes on security

- The script only ever **appends** rows — it has no endpoint for reading, updating, or deleting data,
  so exposing the Web App URL publicly does not expose lead data.
- No API keys or credentials are stored in the frontend code; the Apps Script deployment itself is
  the only "credential," and it only accepts writes.
- Basic input length checks are included above; for higher-volume production use, consider adding
  Google reCAPTCHA or a honeypot field for stronger spam protection.
