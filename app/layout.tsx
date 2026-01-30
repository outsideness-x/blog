import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Sidebar } from "@/components/sidebar";
import { MobileMenu } from "@/components/mobile-menu";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: "mini-blog",
  description: "Engineering and Web3 thoughts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
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
