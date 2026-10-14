const FALLBACK_SITE_URL = "https://mini-blog.vercel.app";

function normalizeSiteUrl(input?: string) {
  if (!input) return FALLBACK_SITE_URL;

  try {
    const url = new URL(input);
    return url.origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const SITE_NAME = "Alex — UI/UX designer & iOS developer";
export const SITE_DESCRIPTION =
  "Alex designs and builds native apps for iPhone, iPad and Mac, from the first idea to the App Store. Three of them, OROT, diple. and inkept, are live.";
export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const CONTACT = {
  email: "outsidenessx@gmail.com",
  telegram: "coldd_me",
  github: "outsideness-x",
} as const;
export const CONTACT_LINKS = {
  email: `mailto:${CONTACT.email}`,
  telegram: `https://t.me/${CONTACT.telegram}`,
  github: `https://github.com/${CONTACT.github}`,
} as const;

export const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alex",
  alternateName: "chemical pink",
  jobTitle: "UI/UX designer and iOS developer",
  url: SITE_URL,
  email: `mailto:${CONTACT.email}`,
  sameAs: [CONTACT_LINKS.github, CONTACT_LINKS.telegram],
  knowsAbout: ["UI/UX design", "Product design", "iOS development", "SwiftUI"],
  knowsLanguage: ["en", "ru"],
};
