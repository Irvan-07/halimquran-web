import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, MessageCircle } from "lucide-react";

// Store card for the "Semua Produk" page, in the spirit of a marketplace
// seller page header. Location and opening hours are the ones published on
// the shop's own Blibli seller page; no follower/response statistics are
// shown since this site doesn't measure them.
export function BlibliStoreIntro() {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-border p-4 sm:flex-row sm:items-center sm:gap-6 lg:p-6">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <span className="relative size-16 shrink-0 overflow-hidden rounded-full bg-primary lg:size-20">
          <Image src="/logo-white.png" alt="" fill sizes="80px" className="object-contain p-3" />
        </span>
        <div className="flex min-w-0 flex-col gap-1.5">
          <h2 className="truncate text-xl font-semibold text-foreground lg:text-2xl">Halim Quran</h2>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="size-4 shrink-0" /> Jam buka: 08.00 – 17.00 WIB
          </p>
          <p className="flex w-fit items-center gap-1.5 rounded-lg bg-secondary px-2.5 py-1 text-sm text-foreground">
            <MapPin className="size-4 shrink-0" /> Cipagalo, Kab. Bandung
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <Link
          href="https://wa.me/6281128018990"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 flex-1 items-center justify-center gap-2 rounded-full border border-primary px-6 text-sm font-semibold text-primary hover:bg-accent sm:flex-none"
        >
          <MessageCircle className="size-4" />
          Chat
        </Link>
        <Link
          href="/pesanan/lacak"
          className="flex h-10 flex-1 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary-dark sm:flex-none"
        >
          Cek pesanan
        </Link>
      </div>
    </section>
  );
}
