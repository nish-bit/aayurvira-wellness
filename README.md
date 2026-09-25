# Aayurvira Wellness — Website

Next.js 16 + TypeScript + Tailwind CSS v4. Bilingual (Hindi default / English), single-page site.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

> Note: `next/font/google` fetches Lora, Work Sans, Noto Serif Devanagari and Hind
> from Google Fonts at build time. This requires normal internet access — it will
> fail in network-restricted sandboxes but works on a standard dev machine or CI.

## Where things live

- `src/app/page.tsx` — assembles the single-page homepage from all sections
- `src/app/legal/[slug]/page.tsx` — placeholder route for Privacy/Terms/Shipping/Returns
- `src/components/` — one component per homepage section
- `src/data/products.ts` — product catalog (centralized, easy to edit)
- `src/data/testimonials.ts` — reviews + customer photos (both start empty on purpose)
- `src/data/site.ts` — brand contact info (currently: official email only)
- `src/lib/i18n/en.ts` / `src/lib/i18n/hi.ts` — all UI text, English and Hindi
- `src/lib/i18n/LanguageContext.tsx` — language state, defaults to Hindi, persists to localStorage
- `public/images/products/` — product photos
- `public/images/banners/` — certifications / expertise / why-choose-us banner art
- `public/images/people/` — put real customer photos here when available

## Contact

The site's only contact channel is the official email,
**aayurvirawellness@gmail.com**, shown as a `mailto:` link in the Contact
section, the footer, each product card's enquiry button, and the
testimonials "share your experience" CTA. There is no contact form, no
lead-capture API, and no WhatsApp integration — an earlier version of this
project had both a WhatsApp-based contact flow and a name+phone lead form
with its own API endpoint; both were removed at the client's request in
favor of email-only contact. If you want a form or another channel back in
the future, tell me and I'll rebuild it.

## Placeholders still needed (see PLACEHOLDERS.md)

This project deliberately ships with **no invented business information**.
See `PLACEHOLDERS.md` for the full list of what to fill in before launch
(prices, reviews, certifications, FAQ answers, legal pages).

## Analytics (Google Analytics 4, consent-gated)

No analytics system existed before this, so GA4 was implemented directly
with `next/script` (no extra dependency added).

- **Files:** `src/lib/analytics/gtag.ts` (GA4 helper, closed set of event
  names/params), `src/lib/analytics/consent.ts` (consent state),
  `src/components/analytics/GoogleAnalytics.tsx` (loads the GA script,
  only after consent),  `src/components/analytics/ConsentBanner.tsx` (the
  Hindi-first consent banner), wired into `src/app/layout.tsx`.
- **Env variable:** `NEXT_PUBLIC_GA_ID` (see `.env.example`) — copy to
  `.env.local` and set your real GA4 Measurement ID (`G-XXXXXXXXXX`).
  Leave it empty to run with analytics fully disabled; nothing errors.
- **Consent:** nothing analytics-related loads, and no analytics cookie is
  set, until the visitor clicks "स्वीकार करें" (Accept) or turns the
  toggle on in Settings. Declining never blocks any site functionality.
  A "Cookie Settings" link in the footer lets a visitor reopen the banner
  and change their mind at any time.
- **Events tracked:** `page_view` (fired manually on route change, GA's
  own automatic page_view is disabled to avoid double-counting),
  `cta_click` (Hero CTAs, Newsletter subscribe), `view_product` (fires
  once per product per visit, via IntersectionObserver — not just DOM
  presence), `email_click` (every mailto link: Contact, Footer, product
  enquiry buttons, testimonials share CTA), `contact_click` (the "Contact"
  nav link in the header/footer).
- **Not implemented:** `contact_form_submitted` (no contact form exists
  on this site anymore — removed at the client's request in an earlier
  change), and `add_to_cart` / `buy_now` / `begin_checkout` (the type
  definitions exist and are ready to use, but nothing calls them since
  this site has no cart or checkout).
- **Dashboard:** no custom in-app dashboard was built — there is no
  authentication system anywhere in this project, and building one solely
  to gate a dashboard felt like real scope creep. View analytics at
  https://analytics.google.com under the GA4 property that matches your
  Measurement ID — it already covers visitors, traffic sources, devices,
  geography, top pages, and lets you mark any event (e.g. `email_click`)
  as a conversion in its own UI.
- **UTM campaigns:** work automatically — GA4 reads `utm_source` /
  `utm_medium` / `utm_campaign` / `utm_content` / `utm_term` from the
  landing URL on its own; no extra code was needed for this.

Tested end-to-end with a real headless browser (Playwright): fresh visit
shows the banner with zero GA script/requests; accepting loads the script
and correctly fires cta_click / view_product / email_click with no
personal data in the params; reopening Settings correctly reflects the
prior choice; rejecting stores "denied". Zero console errors throughout.

## Product enquiry forms (Google Forms)

The "Enquire Now" / "अभी पूछताछ करें" button on each product card (used by
both the Featured Products grid and the "Popular in the Neuro Vira Range"
section — they share the same `ProductCard` component) opens a modal
containing that product's Google Form, instead of a `mailto:` link.

- **Files:** `src/lib/googleForms.ts` (config + embed-URL builder),
  `src/components/ProductEnquiryModal.tsx` (the modal), `ProductCard.tsx`
  (button now opens the modal instead of a mailto link).
- **One form per product, not one shared form.** Since the brief requires
  the form to contain only Name + Phone (no product field), there's no
  field to prefill with which product was selected — so a separate
  Google Form (and separate response Sheet) per product is what
  identifies which product an enquiry was about, exactly as your brief's
  own fallback said to do.

### Setting up each Google Form

1. Create a new Google Form for each product (Powder / Syrup / Nabhi Oil).
2. Add exactly two questions, both "Short answer", both required:
   **Name**, and **Phone Number**.
3. For the Phone Number question, click the ⋮ menu → **Response
   validation** → **Regular expression** → **Matches** → enter
   `^[6-9]\d{9}$` — this is the actual validation for a 10-digit Indian
   mobile number, and it has to be set up this way because **our website
   cannot inject its own validation into a Google-hosted form loaded in
   an iframe** (it's a different origin — the browser doesn't allow it,
   by design, for security). Add custom error text such as "कृपया सही
   10 अंकों का मोबाइल नंबर दर्ज करें।"
4. Click **Send** → the link icon → copy the URL. Paste it into the
   matching env var (below) exactly as copied — the site appends
   `?embedded=true` itself for the modal, and uses the plain link as-is
   for the "open in a new tab" fallback.
5. Responses land in that form's own Google Sheet automatically (Form's
   **Responses** tab → the green Sheets icon → "Create Spreadsheet").
   Each Sheet gets Timestamp, Name, Phone Number columns automatically.

### Env vars

**Easiest setup — one form for every product:**
```env
NEXT_PUBLIC_GOOGLE_FORM_URL=
```
Paste your Google Form's link here and every product's "Enquire Now"
button uses it immediately.

**Optional — a separate form per product** (so you can tell which
product a lead was asking about, since the form itself never says):
```env
NEXT_PUBLIC_NEURO_VIRA_POWDER_FORM_URL=
NEXT_PUBLIC_NEURO_VIRA_SYRUP_FORM_URL=
NEXT_PUBLIC_NEURO_VIRA_NABHI_OIL_FORM_URL=
```
A product-specific URL always takes priority over the shared one above.
See `.env.example`. Whatever's left unset (for a given product) shows an
honest "enquiry form coming soon" message with an email fallback — never
a broken embed, and never a silent failure.

### Testing

`npm run dev`, open the product section, click "अभी पूछताछ करें" on any
product. With no env vars set you'll see the "coming soon" placeholder
(expected, since no real Google Form is configured yet). Once you add
`NEXT_PUBLIC_GOOGLE_FORM_URL` (or a product-specific one) and restart the
dev server, the same button embeds that form in the modal, with an "open
in a new tab" link underneath it (in case a browser or extension blocks
the iframe). Verified with a real headless browser: setting just the one
shared URL correctly activates the real embedded form on all three
products at once, and the "coming soon"/email-fallback UI correctly
disappears; modal opens/closes via the close button, Escape key,
and backdrop click; fits correctly on a 375px mobile viewport with no
horizontal scroll; zero console errors in either language.

## Product enquiry form → Google Sheet (Apps Script)

The product enquiry modal (opened by "अभी पूछताछ करें" / "Enquire Now" on
any product card) now contains a native Name + Phone form that POSTs
directly to a Google Apps Script Web App, instead of embedding a Google
Form. This replaces the iframe-embed approach from the previous change —
an embedded Google Form can't be given custom "Submitting..."/success/
error UI since it's a cross-origin page we can't see inside, which this
request specifically needed.

- **Files:** `src/lib/leadSubmission.ts` (the endpoint constant,
  validation, and the `submitLead()` fetch call — the one place the URL
  lives), `src/components/ProductEnquiryModal.tsx` (the form UI).
- **Endpoint:** already set as a working default in
  `src/lib/leadSubmission.ts` — no setup needed to use it as-is. Override
  it with `NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT` in `.env.local` only if
  you redeploy the Apps Script and get a new URL.
- **Request shape:** `POST` with header `Content-Type:
  text/plain;charset=utf-8` and body `{"name":"...","phone":"..."}`.
  **Important:** the `text/plain` content-type is deliberate, not a
  mistake — Apps Script Web Apps don't reliably handle the CORS
  preflight (OPTIONS request) that `application/json` triggers in
  browsers, so `text/plain` (a CORS "simple request") is used to skip
  that entirely, while the body is still valid JSON text. **Your Apps
  Script's `doPost(e)` function needs to read it with
  `JSON.parse(e.postData.contents)`** — it won't be in `e.parameter`
  the way a form-encoded POST would be.
- **Validation:** name required (non-empty), phone must match a 10-digit
  Indian mobile number (`^[6-9]\d{9}$`), checked before any request is
  sent.
- **UI states:** submit button disables and reads "सबमिट हो रहा है..." /
  "Submitting..." while in flight; on success shows "धन्यवाद! हम जल्द ही
  आपसे संपर्क करेंगे।" / "Thank you! We will contact you soon." and
  clears the fields; on failure shows "कुछ समस्या हुई है। कृपया दोबारा
  प्रयास करें।" / "Something went wrong. Please try again." and leaves
  the fields filled in so the visitor doesn't have to retype anything to
  retry.
- **Privacy:** nothing about the submission (not the name, not the
  phone, not even the raw fetch error) is ever passed to
  `console.log`/`console.error`. The only analytics event fired is
  `contact_form_submitted` (Google Analytics, only after consent — see
  the Analytics section above), which carries just the product id, never
  the name or phone.
- **Vercel deployment:** since a real working default URL is committed
  directly in `leadSubmission.ts` (Apps Script Web App URLs are public
  execution endpoints by Google's own design, not a credential), **no
  environment variable needs to be set in Vercel for this to work.** Only
  add `NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT` there if you redeploy the
  script and get a different URL.
- **Previous Google Form iframe integration:** now unused by this modal.
  `src/lib/googleForms.ts` and the `NEXT_PUBLIC_GOOGLE_FORM_URL` /
  `NEXT_PUBLIC_NEURO_VIRA_*_FORM_URL` env vars are still in the project
  but nothing imports them anymore — I left the file in place rather than
  deleting a feature you didn't ask me to remove; say the word if you'd
  like it cleaned up.

Verified with a real headless browser: empty-field and invalid-phone
submissions are correctly blocked client-side with no request sent;
a valid submission sends exactly `POST` with `Content-Type:
text/plain;charset=utf-8` and body `{"name":"Test Parent","phone":
"9876543210"}`; the submit button is disabled and shows "submitting"
text for the duration of the request; success clears the fields;
a simulated server failure shows the error message and preserves the
entered values; and no console output (log, error, or otherwise) ever
contained the submitted name or phone number.
