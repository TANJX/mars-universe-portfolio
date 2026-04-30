import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
