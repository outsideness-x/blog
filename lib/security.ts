const ALLOWED_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

export function sanitizeHref(href?: string) {
  if (!href) return "#";

  if (href.startsWith("/") || href.startsWith("#")) {
    return href;
  }

  const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(href);
  if (!hasScheme && !href.startsWith("//")) {
    return href;
  }

  try {
    const parsed = new URL(href);
    return ALLOWED_PROTOCOLS.has(parsed.protocol) ? href : "#";
  } catch {
    return "#";
  }
}

export function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}
