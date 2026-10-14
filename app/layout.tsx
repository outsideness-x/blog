import type { Metadata } from "next";
import { Header, Footer } from "@/components/site-shell";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";
import "./cases.css";
import "./portfolio.css";
import "./contact.css";
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
};
const languageScript = `(function(){try{var l=localStorage.getItem('portfolio-language');if(l==='ru'){document.documentElement.lang=l;document.documentElement.dataset.lang=l}}catch(e){}})()`;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: languageScript }} />
      </head>
      <body>
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
