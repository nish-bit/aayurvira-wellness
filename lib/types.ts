export interface Ingredient {
  name: string;
  description: string;
  icon?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  images: string[];
  ingredients: Ingredient[];
  wellnessInformation: string;
  howToUse: string[];
  faq: FaqItem[];
  featured: boolean;
  whatsappMessage: string;
  isDemo?: boolean;
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  ageRange?: string;
  isDemo?: boolean;
}

/**
 * Only Full Name, Contact Number, and Product are collected — this is a
 * single-page, enquiry-based kids wellness site. Do not add email, message,
 * address, gender, age or other fields here.
 */
export interface RequestCallPayload {
  name: string;
  phone: string;
  product?: string;
  source: string;
}
