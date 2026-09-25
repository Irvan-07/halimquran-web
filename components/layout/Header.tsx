import Link from "next/link";
import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartIcon } from "@/components/cart/CartIcon";
import { MobileNav } from "@/components/layout/MobileNav";
import { DesktopNav } from "@/components/layout/DesktopNav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 lg:hidden">
          <MobileNav />
        </div>

        <Link href="/" className="flex flex-col leading-none">
          <span className="font-heading text-lg font-bold text-foreground">
            Halim
          </span>
          <span className="font-heading text-lg font-bold text-primary">
            Qur&apos;an
          </span>
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
