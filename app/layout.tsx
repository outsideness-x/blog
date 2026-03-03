import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";
import { MobileMenu } from "@/components/mobile-menu";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen flex flex-col md:flex-row">
        <div className="scanlines fixed inset-0 pointer-events-none z-50 opacity-50" />
        
        <Sidebar />
        <MobileMenu />
        
        <main className="flex-1 md:ml-64 p-6 md:p-12 max-w-4xl mx-auto w-full mt-16 md:mt-0">
          {children}
        </main>
      </body>
    </html>
  );
}
