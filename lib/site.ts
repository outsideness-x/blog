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

export const SITE_NAME = "Alex — Design engineer";
export const SITE_DESCRIPTION = "UI/UX designer and iOS developer. Thoughtful apps for reading, learning and keeping ideas — OROT, diple. and inkept.";
export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
