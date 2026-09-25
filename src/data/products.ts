export type ProductId = "powder" | "syrup" | "oil";

export type Product = {
  id: ProductId;
  slug: string;
  image: string;
  imageAlt: { en: string; hi: string };
  category: "kids-holistic-development";
  /**
   * No verified price data was supplied for these products.
   * Leave this undefined (shows "price on request") until real
   * pricing is confirmed, rather than inventing a number.
   */
  priceINR?: number;
};

export const products: Product[] = [
  {
    id: "powder",
    slug: "neuro-vira-ayurvedic-powder",
    image: "/images/products/neuro-vira-powder.jpg",
    imageAlt: {
      en: "Neuro Vira Ayurvedic Powder, 100 g jar",
      hi: "न्यूरो वीरा आयुर्वेदिक पाउडर, 100 ग्राम जार",
    },
    category: "kids-holistic-development",
  },
  {
    id: "syrup",
    slug: "neuro-vira-ayurvedic-syrup",
    image: "/images/products/neuro-vira-syrup.jpg",
    imageAlt: {
      en: "Neuro Vira Ayurvedic Syrup, 200 ml bottle",
      hi: "न्यूरो वीरा आयुर्वेदिक सिरप, 200 मिली बोतल",
    },
    category: "kids-holistic-development",
  },
  {
    id: "oil",
    slug: "neuro-vira-nabhi-oil",
    image: "/images/products/neuro-vira-nabhi-oil.jpg",
    imageAlt: {
      en: "Neuro Vira Nabhi Oil, 30 ml dropper bottle",
      hi: "न्यूरो वीरा नाभि तेल, 30 मिली ड्रॉपर बोतल",
    },
    category: "kids-holistic-development",
  },
];

export const showcaseImage = {
  src: "/images/products/neuro-vira-family.jpg",
  alt: {
    en: "The full Neuro Vira range: powder, syrup and Nabhi oil",
    hi: "पूरी न्यूरो वीरा रेंज: पाउडर, सिरप और नाभि तेल",
  },
};
