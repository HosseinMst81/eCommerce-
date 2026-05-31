import type { Metadata } from "next";
import { Geist, Geist_Mono, Jost } from "next/font/google";
import { Providers } from "@/lib/providers/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const jost = Jost({
  variable: "--font-jost",
  display: "swap",
  preload: true,
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nike Store | Just Do It",
  description:
    "Shop the latest Nike shoes, clothing, and accessories. Free shipping on orders over $50.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jost.variable} h-full antialiased`}
    >
      <body className={`min-h-full flex flex-col ${jost.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
