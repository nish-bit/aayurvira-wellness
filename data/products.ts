import { Product } from "@/lib/types";

/**
 * KIDS WELLNESS ONLY. Aayurvira Wellness is a single-category children's
 * wellness brand — do not add adult, men's, women's, or general wellness
 * products here. All entries below except real photography callouts are
 * demo placeholders for development — replace with real, verified product
 * information before launch. See README.md → "How to add a new product".
 */
export const products: Product[] = [
  {
    id: "p2",
    slug: "kids-wellness-support",
    name: "Kids Wellness Support",
    category: "Kids Wellness",
    categorySlug: "kids-wellness",
    shortDescription: "A gentle formulation designed to support everyday wellness in children.",
    description:
      "Kids Wellness Support is formulated with children in mind — a mild, easy-to-take format designed to fit into an everyday family routine. (Demo product description.)",
    images: ["/images/lifestyle/kids-pickleball.jpg"],
    ingredients: [
      { name: "Giloy", description: "Traditionally used in Ayurveda to support the body's natural defenses." },
      { name: "Honey base", description: "Used as a mild, palatable carrier suited to children." }
    ],
    wellnessInformation:
      "Designed to support everyday wellness in children as part of a balanced diet and routine. Not intended to diagnose, treat, cure or prevent any disease. (Demo content.)",
    howToUse: [
      "Give as directed by a qualified pediatric practitioner.",
      "Keep out of reach of very young children.",
      "Store in a cool, dry place."
    ],
    faq: [
      {
        question: "What age is this formulated for?",
        answer: "Demo placeholder — confirm the exact age range with a qualified practitioner before launch."
      }
    ],
    featured: true,
    whatsappMessage: "",
    isDemo: true
  },
  {
    id: "p8",
    slug: "kids-herbal-wellness-syrup",
    name: "Kids Herbal Wellness Syrup",
    category: "Kids Wellness",
    categorySlug: "kids-wellness",
    shortDescription: "A gentle, tasty herbal syrup for growing kids' everyday wellness routine.",
    description:
      "Kids Herbal Wellness Syrup is a demo placeholder product for a gentle, everyday herbal syrup formulated with children in mind. Replace with verified product information before launch. [Demo content.]",
    images: ["/images/lifestyle/kids-soccer.jpg"],
    ingredients: [
      { name: "Amla", description: "Traditionally used in Ayurveda as a source of natural antioxidants. [Demo content.]" },
      { name: "Tulsi", description: "A revered herb, traditionally used for everyday wellness. [Demo content.]" }
    ],
    wellnessInformation:
      "This is a demo placeholder for everyday wellness support as part of a balanced routine. It is not intended to diagnose, treat, cure or prevent any disease. Age suitability should be confirmed against real, verified manufacturer information before launch.",
    howToUse: [
      "[Demo content — replace with verified manufacturer dosage and usage instructions before launch.]",
      "Always check age suitability against the product label."
    ],
    faq: [
      {
        question: "Is this suitable for my child's age?",
        answer: "Age suitability should always be confirmed against the real product label. This is demo placeholder content."
      }
    ],
    featured: true,
    whatsappMessage: "",
    isDemo: true
  },
  {
    id: "p9",
    slug: "kids-digestive-wellness",
    name: "Kids Digestive Wellness",
    category: "Kids Wellness",
    categorySlug: "kids-wellness",
    shortDescription: "A gentle formula to support children's everyday digestive comfort.",
    description:
      "Kids Digestive Wellness is a demo placeholder product for a gentle herbal formula supporting children's everyday digestive routine. Replace with verified product information before launch. [Demo content.]",
    images: ["/images/lifestyle/kids-hockey.jpg"],
    ingredients: [
      { name: "Fennel", description: "Traditionally used in Ayurveda to support everyday digestive comfort. [Demo content.]" }
    ],
    wellnessInformation:
      "This is a demo placeholder for digestive wellness support as part of a balanced routine. It is not intended to diagnose, treat, cure or prevent any disease.",
    howToUse: ["[Demo content — replace with verified manufacturer dosage and usage instructions before launch.]"],
    faq: [
      {
        question: "What are the ingredients?",
        answer: "Full ingredient information will be shown here once verified product data is available. This is demo placeholder content."
      }
    ],
    featured: true,
    whatsappMessage: "",
    isDemo: true
  },
  {
    id: "p10",
    slug: "kids-daily-wellness-formula",
    name: "Kids Daily Wellness Formula",
    category: "Kids Wellness",
    categorySlug: "kids-wellness",
    shortDescription: "An everyday herbal formula for growing kids' daily wellness routine.",
    description:
      "Kids Daily Wellness Formula is a demo placeholder product for an everyday herbal blend supporting children's general wellness routine. Replace with verified product information before launch. [Demo content.]",
    images: ["/images/lifestyle/kids-basketball.jpg"],
    ingredients: [
      { name: "Ashwagandha", description: "Traditionally used in Ayurveda for everyday vitality. [Demo content.]" }
    ],
    wellnessInformation:
      "This is a demo placeholder for general wellness support as part of a balanced routine. It is not intended to diagnose, treat, cure or prevent any disease.",
    howToUse: ["[Demo content — replace with verified manufacturer dosage and usage instructions before launch.]"],
    faq: [
      {
        question: "How should this product be stored?",
        answer: "Storage information will be shown here once verified product data is available. This is demo placeholder content."
      }
    ],
    featured: true,
    whatsappMessage: "",
    isDemo: true
  },
  {
    id: "p11",
    slug: "kids-nutrition-support",
    name: "Kids Nutrition Support",
    category: "Kids Wellness",
    categorySlug: "kids-wellness",
    shortDescription: "A herbal nutritional support formula for growing children.",
    description:
      "Kids Nutrition Support is a demo placeholder product for a herbal formula supporting children's everyday nutrition as part of a balanced diet. Replace with verified product information before launch. [Demo content.]",
    images: ["/images/lifestyle/kids-baseball.jpg"],
    ingredients: [
      { name: "Shatavari", description: "Traditionally used in Ayurveda as a general nourishing herb. [Demo content.]" }
    ],
    wellnessInformation:
      "This is a demo placeholder for nutritional wellness support as part of a balanced diet. It is not intended to diagnose, treat, cure or prevent any disease.",
    howToUse: ["[Demo content — replace with verified manufacturer dosage and usage instructions before launch.]"],
    faq: [
      {
        question: "Is this a substitute for a balanced diet?",
        answer: "No — this is intended as a supplement to, not a replacement for, a balanced diet. This is demo placeholder content."
      }
    ],
    featured: true,
    whatsappMessage: "",
    isDemo: true
  },
  {
    id: "p12",
    slug: "neuro-vira",
    name: "Neuro Vira",
    category: "Kids Wellness",
    categorySlug: "kids-wellness",
    shortDescription: "An Ayurvedic formula supporting children's everyday focus and memory.",
    description:
      "Neuro Vira draws on classical Ayurvedic herbs traditionally valued for cognitive and nervous system support, reformulated with children in mind. Available as a syrup, powder and Nabhi oil, each format is prepared in small batches with no artificial additives.",
    images: [
      "/images/products/neuro-vira/neuro-vira-hero.jpg",
      "/images/products/neuro-vira/neuro-vira-lifestyle.jpg"
    ],
    ingredients: [
      { name: "Brahmi (Bacopa monnieri)", description: "A classical Ayurvedic herb traditionally associated with memory and focus." },
      { name: "Shankhpushpi", description: "Traditionally used in Ayurveda to support nervous system balance." },
      { name: "Jatamansi", description: "A traditional herb valued for calming, everyday nervous system support." }
    ],
    wellnessInformation:
      "Neuro Vira is formulated to support focus, memory and everyday nervous system wellness in children as part of a balanced routine. It is not intended to diagnose, treat, cure or prevent any disease, including ADHD or other learning or developmental conditions.",
    howToUse: [
      "Syrup: give as directed with warm water after meals, or as advised by a qualified pediatric practitioner.",
      "Powder: mix one measured scoop into warm milk or water.",
      "Nabhi oil: for external application to the navel region as part of an evening ritual.",
      "Shake well before use. Keep out of reach of very young children. Store in a cool, dry place."
    ],
    faq: [
      {
        question: "Is this suitable for my child's age?",
        answer: "Age suitability should always be confirmed against the real product label and a qualified pediatric practitioner before use."
      },
      {
        question: "Which format should I choose — syrup, powder or oil?",
        answer: "All three formats share the same core herbs. Syrup and powder are taken internally; the Nabhi oil is for external, topical use as part of a daily ritual."
      }
    ],
    featured: true,
    whatsappMessage: "",
    isDemo: false
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}
