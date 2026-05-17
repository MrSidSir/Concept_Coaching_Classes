export const SOCIAL_LINKS = {
  youtube:   "https://www.youtube.com/channel/UCxFBR8b8Ymse145eJw4kqAQ",
  instagram: "https://www.instagram.com/conceptcoachingclassesnewdelhi?igsh=eWxkcW9tcGV1bjFu",
  facebook:  "https://www.facebook.com/sayyad.irshad.92/",
  whatsapp:  "https://wa.me/917355534404",
  phone:     "+91-7355534404",
  phoneHref: "tel:+917355534404",
  whatsappMessage: encodeURIComponent(
    "Hello Sir, I want information about Concept Coaching Classes."
  ),
} as const;

/** Generates a WhatsApp click-to-chat URL with the pre-filled message */
export function whatsappChatUrl(): string {
  return `${SOCIAL_LINKS.whatsapp}?text=${SOCIAL_LINKS.whatsappMessage}`;
}

export const BRAND = {
  name:     "Concept Coaching Classes",
  tagline:  "Expert-led coaching by Mr. Sidsir",
  teacher:  "Mr. Sidsir",
  location: "New Delhi, India",
  email:    "irshad1554@gmail.com",
} as const;
