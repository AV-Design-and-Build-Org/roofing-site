import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const headingFont = Bebas_Neue({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

const bodyFont = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.businessName} | Roofing in ${siteConfig.primaryCity}, ${siteConfig.state}`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description: siteConfig.metaDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.businessName} | Roofing in ${siteConfig.primaryCity}, ${siteConfig.state}`,
    description: siteConfig.metaDescription,
    url: siteConfig.siteUrl,
    siteName: siteConfig.businessName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/site/og-rise-roofing.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.businessName} roofing in ${siteConfig.primaryCity}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.businessName} | Roofing in ${siteConfig.primaryCity}, ${siteConfig.state}`,
    description: siteConfig.metaDescription,
    images: ["/site/og-rise-roofing.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headingFont.variable} bg-[#f7f4ee] text-slate-900 antialiased`}>
        <div className="min-h-screen bg-[#f7f4ee]">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
