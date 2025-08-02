import type { Metadata } from "next";
import { GoogleTagManager } from '@next/third-parties/google' 
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
  title: "weird.cloud",
  description: "AI-generated",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-WCW4WPQ6" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WCW4WPQ6"
height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
        {children}
      </body>
    </html>
  );
}
