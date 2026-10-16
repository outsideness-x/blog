import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Literata } from "next/font/google";
import { Header, Footer } from "@/components/site-shell";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";
import "./cases.css";
import "./portfolio.css";
import "./contact.css";
import "./motion.css";
import "./brand.css";
import "./type.css";
import "./sketchbook.css";
import "./artbook.css";
const geist = localFont({
  src: "./fonts/Geist-Variable.woff2",
  weight: "100 900",
  variable: "--font-geist",
  display: "swap",
  adjustFontFallback: "Arial",
});
// diple's own editorial face, used only where its case sets type in serif.
const literata = Literata({
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-literata",
  display: "swap",
  preload: false,
});
export const viewport: Viewport = {
  themeColor: "#f2ede2",
  colorScheme: "light",
};
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s — chemical pink` },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: "chemical pink",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  authors: [{ name: "Alex", url: SITE_URL }],
  creator: "Alex",
};
const languageScript = `(function(){try{var l=localStorage.getItem('portfolio-language');if(l==='ru'){document.documentElement.lang=l;document.documentElement.dataset.lang=l}}catch(e){}})()`;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-lang="en"
      className={`${geist.variable} ${literata.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: languageScript }} />
        <link
          rel="preload"
          href="/fonts/chemical-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="artbook">
        <a className="skip-link" href="#main">
          Skip to content / К содержимому
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
