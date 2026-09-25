import type { Metadata, Viewport } from "next";
import { Archivo, Open_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CartProvider } from "@/components/cart/CartProvider";
import { GoogleTagManager } from "@/components/tracking";
import { siteConfig } from "@/config/site";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${archivo.variable} ${openSans.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <GoogleTagManager />
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
