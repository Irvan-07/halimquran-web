"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowLeft, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartIcon } from "@/components/cart/CartIcon";
import { MobileNav } from "@/components/layout/MobileNav";
import { DesktopNav } from "@/components/layout/DesktopNav";

// On halimquran.com the header starts transparent, overlapping the hero
// image (see HeroCarousel's matching -mt-16), then gets a solid white
// background as soon as you scroll past it — confirmed by testing the
// live site directly, not just looking at a screenshot.
// On a PDP (/produk/{kategori}/{slug}) the live site's mobile header
// shows a back button in place of the hamburger — confirmed against the
// real site's own PDP, not guessed.
const PDP_PATTERN = /^\/produk\/[^/]+\/[^/]+/;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const pdpMatch = pathname.match(PDP_PATTERN);
  const backHref = pdpMatch ? `/produk/${pathname.split("/")[2]}` : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-200 ${
        scrolled ? "border-border bg-background" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 lg:hidden">
          {backHref ? (
            <Link
              href={backHref}
              aria-label="Kembali"
              className="flex size-9 items-center justify-center text-foreground"
            >
              <ArrowLeft className="size-5" />
            </Link>
          ) : (
            <MobileNav />
          )}
        </div>

        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="Halim Qur'an"
            width={130}
            height={52}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <div className="ml-6 hidden lg:block">
          <DesktopNav />
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            asChild
            aria-label="Cari produk"
          >
            <Link href="/pencarian">
              <Search className="size-5" />
            </Link>
          </Button>
          <CartIcon />
          <Button
            variant="ghost"
            size="icon"
            asChild
            aria-label="Akun saya"
          >
            <Link href="/akun">
              <User className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
