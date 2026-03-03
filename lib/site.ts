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

export const SITE_NAME = "mini-blog";
export const SITE_DESCRIPTION = "Engineering, cryptography, and Web3 research notes.";
export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
