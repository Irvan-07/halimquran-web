import type { Metadata, Viewport } from "next";
import { Archivo, Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/themes/client";
import { getActiveTheme } from "@/themes/server";
import { Toaster } from "@/components/ui/sonner";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { InAppNavigationTracker } from "@/components/layout/BackButton";
import { CartProvider } from "@/components/cart/CartProvider";
import Script from "next/script";
import { GoogleTagManager, MetaPixelPageView } from "@/components/tracking";
import { META_PIXEL_BASE_CODE } from "@/lib/analytics/meta-pixel";
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
  // "./" = each page's own address (no query string), on the canonical host
  // from NEXT_PUBLIC_SITE_URL, so Google settles on halimquran.com/... for
  // every page instead of guessing between the old www/apex duplicates.
  alternates: { canonical: "./" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getActiveTheme();
  const { Header, Footer } = theme.slots;

  return (
    <html lang="id" data-theme={theme.id} className={`${archivo.variable} ${openSans.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        {/* Meta Pixel base code: must sit in the root layout to run before hydration (so fbq exists
            when a page fires its first event). Only active on the real storefront hosts. */}
        <Script id="meta-pixel" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: META_PIXEL_BASE_CODE }} />
        <MetaPixelPageView />
        <GoogleTagManager />
        <ThemeProvider themeId={theme.id}>
          <CartProvider>
            <InAppNavigationTracker />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster />
            <WhatsAppButton />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
