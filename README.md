# Aayurvira Wellness — Ayurvedic Product Showcase & Lead Generation Website

A production-ready Next.js 14 (App Router) + TypeScript + Tailwind CSS website for an Ayurvedic /
wellness product brand. There is **no e-commerce**: visitors browse products and submit an enquiry
(or request a callback), which is stored as a lead in a Google Sheet via Google Apps Script. The
team then follows up by phone or WhatsApp.

Design direction: warm parchment background, deep forest green, sandalwood gold accents, Fraunces
(display serif) + Manrope (body sans) — an original palette, not a copy of any reference site.

---

## 1. Project structure

```
app/                  Next.js App Router pages
  about/ products/ products/[slug]/ wellness/ contact/ faq/ privacy/ terms/
  layout.tsx          Root layout, fonts, global metadata
  page.tsx            Homepage
  sitemap.ts robots.ts
components/           Reusable UI components (Header, Footer, ProductCard, EnquiryModal, etc.)
data/                 Central content: products.ts, categories.ts, testimonials.ts, faqs.ts
lib/                  types.ts, whatsapp.ts, submitEnquiry.ts
public/images/        Static assets (leaf-vein.svg signature motif)
GOOGLE_SHEETS_SETUP.md  Full Apps Script + Sheet setup instructions
.env.example          Environment variable template
```

## 2. Local development

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev
```

Visit `http://localhost:3000`.

## 3. Environment variables (`.env.local`)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Used for canonical URLs, sitemap, Open Graph |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | International format, digits only, e.g. `919876543210` |
| `NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT` | Apps Script Web App URL — see `GOOGLE_SHEETS_SETUP.md` |
| `NEXT_PUBLIC_BUSINESS_PHONE` | Shown on Contact page / footer |
| `NEXT_PUBLIC_BUSINESS_EMAIL` | Shown on Contact page / footer |
| `NEXT_PUBLIC_BUSINESS_ADDRESS` | Shown on Contact page |

Never commit `.env.local` — it's already in `.gitignore`.

## 4. How to add a new product

Open `data/products.ts` and add a new object to the `products` array:

```ts
{
  id: "p7",
  slug: "your-product-slug",
  name: "Your Product Name",
  category: "General Wellness",          // must match a category `name` in data/categories.ts
  categorySlug: "general-wellness",      // must match that category's `slug`
  shortDescription: "One-line summary shown on cards.",
  description: "Longer paragraph shown on the product page.",
  images: ["https://...", "https://..."],
  ingredients: [{ name: "...", description: "..." }],
  wellnessInformation: "Safe, non-medical positioning copy.",
  howToUse: ["Step one.", "Step two."],
  faq: [{ question: "...", answer: "..." }],
  featured: true,      // shows on homepage "Featured Products"
  whatsappMessage: "", // leave blank to use the default auto-generated message
}
```

The product page at `/products/[slug]` and its metadata/structured data are generated automatically
— no extra code needed. Remove `isDemo: true` once real content replaces the placeholder.

## 5. How to change the WhatsApp number

Update `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` (and in your hosting provider's environment
variables for production). Every WhatsApp button on the site reads from this single value via
`lib/whatsapp.ts` — nothing else needs to change.

## 6. How to change the Google Sheets endpoint

Update `NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT` in `.env.local` / your hosting provider's environment
variables. See `GOOGLE_SHEETS_SETUP.md` for the full setup and redeployment process.

## 7. Production build

```bash
npm run build
npm run start
```

`npm run build` runs type-checking and generates static pages for every product. Fix any errors it
reports before deploying.

## 8. Deploying to Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. In **Project Settings → Environment Variables**, add the same variables from `.env.local`.
4. Deploy. Vercel automatically runs `npm run build`.
5. Once live, update `NEXT_PUBLIC_SITE_URL` to your production domain and redeploy so canonical URLs
   and the sitemap are correct.

## 9. What this project intentionally does NOT include

Per the brief: no prices, no cart, no checkout, no online payment, no accounts, no subscriptions, no
AI chatbot, no AI recommendations, and no complex CRM/admin/inventory system. The entire funnel is
**Browse → Enquire → Lead in Google Sheets → Team calls or WhatsApps the customer**.

## 10. Before launch checklist

- [ ] Replace all demo products in `data/products.ts` with real, verified product content
- [ ] Replace demo testimonials in `data/testimonials.ts` with real, consented feedback
- [ ] Replace placeholder About page copy with your brand's real story
- [ ] Have Privacy Policy and Terms & Conditions reviewed by a professional
- [ ] Confirm all wellness/ingredient claims are accurate and compliant (avoid "cures", "treats",
      "guaranteed" language — see existing copy for the safe pattern used throughout)
- [ ] Set real environment variables in production (WhatsApp number, Sheets endpoint, contact info)
- [ ] Run a Lighthouse audit and fix any accessibility/performance issues before going live
