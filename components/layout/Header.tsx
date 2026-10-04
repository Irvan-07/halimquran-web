"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowLeft, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartIcon } from "@/components/cart/CartIcon";
import { BackButton } from "@/components/layout/BackButton";
import { MobileNav } from "@/components/layout/MobileNav";
import { DesktopNav } from "@/components/layout/DesktopNav";

// On halimquran.com the header starts transparent, overlapping the hero
// image (see HeroCarousel's matching negative margin), then gets a solid
// white background as soon as you scroll past it — confirmed by testing the
// live site directly, not just looking at a screenshot. Sizes below are
// measured off the live home: bar 56px (phone) / 86px (desktop), 8px side
// padding, 109x44 logo, 36px icon buttons. The separator is a box-shadow
// rather than a border so the bar's height is exactly that.
// On a PDP (/produk/{kategori}/{slug}) the live site's mobile header
// shows a back button in place of the hamburger — confirmed against the
// real site's own PDP, not guessed.
const PDP_PATTERN = /^\/produk\/[^/]+\/[^/]+/;
// A category page (/produk/{kategori}) gets the same back button. On both,
// it returns to the page the visitor came from (see BackButton), falling
// back to the category / all products when the page was opened directly.
const CATEGORY_PATTERN = /^\/produk\/[^/]+\/?$/;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const onCategory = CATEGORY_PATTERN.test(pathname);
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
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        scrolled ? "bg-background shadow-[0_1px_0_0_var(--color-border)]" : "bg-transparent"
      }`}
    >
      <div className="flex h-14 items-center gap-1 px-2 lg:h-[86px]">
        <div className="flex items-center lg:hidden">
          {backHref || onCategory ? (
            <BackButton
              fallbackHref={backHref ?? "/produk"}
              className="flex size-9 items-center justify-center text-foreground"
            >
              <ArrowLeft className="size-5" />
            </BackButton>
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
            className="h-11 w-auto"
            priority
          />
        </Link>

        <div className="ml-8 hidden lg:block">
          <DesktopNav />
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-lg"
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
            size="icon-lg"
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
