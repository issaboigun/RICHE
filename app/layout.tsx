import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RICHE | Women's Clothing brand",
  description: "Experience luxury and confidence for your everyday life with RICHE. Our collection of TOPS, PANTS, ABAYA, ISDAL, and HomeWear is designed for elegance and comfort.",
  keywords: "RICHE, fashion, luxury, TOPS, PANTS, ABAYA, ISDAL, HomeWear, modest fashion, elegant clothing",
  icons: {
    icon: "/logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.className} min-h-screen flex flex-col bg-white text-black`}>
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingChat />
        </Providers>
      </body>
    </html>
  );
}
