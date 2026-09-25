/**
 * Genuine parent/customer feedback only.
 *
 * Per the project brief: do NOT invent names, quotes, ratings, dates,
 * locations, "verified customer" badges, or photos. Quotes are stored
 * in the language they were actually given in and are never translated
 * by us — translating health-related feedback risks subtly shifting its
 * meaning or emphasis, which the brief explicitly forbids. The
 * component falls back to whichever language is actually present
 * rather than inventing a translation.
 *
 * To add a real piece of feedback, push an object shaped like:
 * {
 *   id: "unique-id",
 *   quote: { hi: "..." } | { en: "..." } | { hi: "...", en: "..." },
 *   location: { state: "Bihar", country: "India" },
 *   name: "Only if the person gave one",       // optional
 *   rating: 5,                                  // optional, only if actually given
 *   productId: "powder",                        // optional
 *   photo: "/images/people/xyz.jpg",             // optional, real photo only
 * }
 */

import type { ProductId } from "./products";

export type Testimonial = {
  id: string;
  quote: { en?: string; hi?: string };
  location: { state: string; country: string };
  name?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  productId?: ProductId;
  photo?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "parent-bihar-1",
    quote: {
      hi: "मेरे बेटे को बोलने में देरी थी और वह अपनी जरूरतें ठीक से बता नहीं पाता था। Neuro Vira का नियमित उपयोग शुरू करने के बाद हमने उसकी Communication और Interaction में सकारात्मक बदलाव महसूस किए। उसके छोटे-छोटे प्रयास हमारे लिए बहुत मायने रखते हैं।",
    },
    location: { state: "Bihar", country: "India" },
  },
  {
    id: "parent-chhattisgarh-1",
    quote: {
      hi: "मेरी बेटी को Walking के दौरान Balance बनाए रखने में परेशानी होती थी। Neuro Vira के नियमित उपयोग के साथ हमें उसकी Body Movement और Balance में धीरे-धीरे सकारात्मक बदलाव महसूस हुए। यह हमारे परिवार के लिए एक सुखद अनुभव रहा।",
    },
    location: { state: "Chhattisgarh", country: "India" },
  },
  {
    id: "parent-up-1",
    quote: {
      hi: "मेरे बच्चे को चलने और संतुलन बनाने में परेशानी होती थी। हमने Neuro Vira का नियमित उपयोग शुरू किया। धीरे-धीरे हमें उसकी Body Balance और रोज़मर्रा की गतिविधियों में सकारात्मक बदलाव देखने को मिले।",
    },
    location: { state: "Uttar Pradesh", country: "India" },
  },
  {
    id: "parent-haryana-1",
    quote: {
      hi: "मेरी बेटी दूसरे बच्चों की तरह हँस-खेल नहीं पाती थी। उसकी मांसपेशियों की कमजोरी और Body Movement से जुड़ी परेशानियों के कारण वह रोज़मर्रा की गतिविधियों में भी आसानी से भाग नहीं ले पाती थी। हमने Neuro Vira को अपनी Daily Routine का हिस्सा बनाया। कुछ समय बाद हमें उसकी Activities और Interaction में सकारात्मक बदलाव महसूस होने लगे। अब वह पहले की तुलना में खेलने और अपनी पसंदीदा गतिविधियों में भाग लेने की ज़्यादा कोशिश करती है।",
    },
    location: { state: "Haryana", country: "India" },
  },
  {
    id: "parent-bihar-2",
    quote: {
      en: "My son had a lot of difficulty controlling his body movements. He was unable to properly control his hands, legs, and other physical activities, which affected his daily routine. We made Neuro Vira a part of his daily routine. After some time, we began noticing positive changes in his body control and activities. Now, compared to before, he is making better efforts to control his body movements.",
    },
    location: { state: "Bihar", country: "India" },
  },
];

/**
 * Real customer photos only (see brief section 17). Starts empty for
 * the same reason as above. Add entries like:
 * { name: "...", image: "/images/people/person-1.jpg" }
 */
export type CustomerPhoto = {
  name: string;
  image: string;
};

export const customerPhotos: CustomerPhoto[] = [];
