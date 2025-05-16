import type { Metadata } from "next";
import { Figtree, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "../lib/providers";

const figSans = Figtree({
  variable: "--font-fig-sans",
  subsets: ["latin"],
  fallback: ["sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: "Scribble Dao",
  description: "Earn Crypto for your Efforts!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figSans.variable} ${geistMono.variable} `}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
