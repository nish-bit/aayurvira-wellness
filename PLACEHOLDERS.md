# Placeholders to replace before launch

Nothing below was invented — each item is either omitted, shown as an honest
"coming soon" state, or clearly marked. Replace in the file listed.

## 1. Prices
- File: `src/data/products.ts`
- Each product has an optional `priceINR?: number`. Currently unset for all
  three products, so the site shows "Price on request" / "कीमत जानने के लिए संपर्क करें".
  Add a number (e.g. `priceINR: 499`) to show a real price.

## 2. Product descriptions
- File: `src/lib/i18n/en.ts` and `src/lib/i18n/hi.ts`, under `products.items`.
- Current copy is drawn only from what's on your product packaging photos
  (100% Natural, No Side Effect, brain/nervous system support wording).
  Replace with your official copy if you have more detailed descriptions.

## 3. Customer reviews — DONE
- File: `src/data/testimonials.ts`
- 5 real parent-feedback entries are now in place (Bihar ×2, Chhattisgarh,
  Uttar Pradesh, Haryana), stored verbatim in the language each was given
  in (no names, ratings, or photos, since none were provided). To add
  more:
  ```ts
  {
    id: "unique-id",
    quote: { hi: "..." } | { en: "..." }, // whichever language you have
    location: { state: "...", country: "India" },
    name: "Only if the person gave one",  // optional
    rating: 5,                             // optional, only if actually given
    productId: "syrup",                    // optional
    photo: "/images/people/xyz.jpg",       // optional, real photo only
  }
  ```

## 4. Customer photos
- File: `src/data/testimonials.ts` — `customerPhotos` array (starts empty).
- Folder ready at `public/images/people/` — drop real customer photos there
  and reference them here. Until then, the section shows an honest
  "customer photos are on the way" placeholder.

## 5. Certifications (GMP / AYUSH / FSSAI / Lab Tested / ISO)
- File: `src/components/Certifications.tsx` shows your banner image
  (`certifications-banner.jpg`) with a caption stating these are from your
  own brand artwork and subject to verification — no certificate numbers
  or claims of verification are made anywhere on the site.
- If you can confirm any of these certifications with documentation, tell
  me and I'll update the caption/copy to state it as verified fact.

## 6. Contact details
- File: `src/data/site.ts`
- The only contact channel now is the verified email,
  `aayurvirawellness@gmail.com`. No phone/WhatsApp, address, or social
  links are shown anywhere on the site — a prior version had a WhatsApp
  number and placeholder social/address lines in the footer; these were
  removed at the client's request rather than being replaced with new
  placeholders. If you have a real address or social links, tell me and
  I'll add them back with real data.

## 7. FAQ answers
- File: `src/lib/i18n/en.ts` / `hi.ts`, under `faq.items`.
- The 5 questions currently there are answered honestly (e.g. shipping/
  returns says "email us and we'll confirm" rather than inventing a
  policy). Replace with your actual documented policies once you have
  them written down.

## 8. Legal pages
- Route: `src/app/legal/[slug]/page.tsx`
- Privacy Policy / Terms of Service / Shipping Policy / Return & Refund
  Policy all currently render a "page in progress, contact us directly"
  placeholder. Give me the real policy text and I'll turn these into full
  pages.

## 9. Wellness Categories (beyond Kids)
- File: `src/components/Categories.tsx`
- Only "Kids' Holistic Development" is shown, since it's the only category
  with real products. Women's/Men's/General/Heart/Daily/Herbal show a
  "more categories coming soon" card instead of empty or fake tiles.
  Add real product data first, then I can build out full category tiles.

## 10. Product enquiry lead capture — DONE
- File: `src/lib/leadSubmission.ts`
- The product enquiry modal now uses a native Name + Phone form that
  POSTs to a real, working Google Apps Script Web App endpoint (already
  set as the default in the file — nothing to configure). See the
  README's "Product enquiry form → Google Sheet" section for the request
  shape and what your Apps Script's `doPost` needs to do with it.
- The earlier Google-Form-iframe approach (`src/lib/googleForms.ts`,
  `NEXT_PUBLIC_GOOGLE_FORM_URL` and friends) is no longer used by this
  modal but is still in the project in case you want it back for
  something else.
