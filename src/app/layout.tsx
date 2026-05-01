import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import { LangProvider } from "@/components/LangContext";
import { LangSwitcher } from "@/components/LangSwitcher";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marstanjx.com"),
  title: "Mars Tan",
  description:
    "Mars Tan — Senior Design Engineer at InstaLILY AI. Building AI-native experiences and the design systems behind them.",
  openGraph: {
    title: "Mars Tan",
    description:
      "Senior Design Engineer at InstaLILY AI. Building AI-native experiences and the design systems behind them.",
    url: "https://marstanjx.com",
    siteName: "Mars Tan",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Mars Tan",
    description:
      "Senior Design Engineer at InstaLILY AI. Building AI-native experiences and the design systems behind them.",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <LangProvider>
          <LangSwitcher />
          {children}
        </LangProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
