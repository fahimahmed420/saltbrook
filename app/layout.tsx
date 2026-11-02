import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CallBar } from "@/components/CallBar";
import { DemoBadge } from "@/components/DemoBadge";
import { Reveal } from "@/components/Reveal";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-bricolage", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Raleigh AC, heat pump & furnace experts`, template: `%s | ${site.name}` },
  description: site.description,
  // Portfolio concept: never indexed.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#0c3b39" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only z-[60] rounded-full bg-spruce px-5 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <CallBar />
        <DemoBadge />
        <Reveal />
      </body>
    </html>
  );
}
