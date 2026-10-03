import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";

// Shop card for the "Semua Produk" page, like a marketplace shop header:
// avatar, name, city and two actions. No follower/rating statistics are
// shown since this site doesn't measure them.
export function TokopediaStoreIntro() {
  return (
    <section className="flex flex-col gap-4 rounded-lg border border-border p-4 shadow-[0_1px_6px_rgba(141,150,170,0.25)] sm:flex-row sm:items-center sm:gap-6 lg:p-6">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <span className="relative size-16 shrink-0 overflow-hidden rounded-full border border-border bg-secondary lg:size-20">
          <Image src="/logo.png" alt="" fill sizes="80px" className="object-contain p-2" />
        </span>
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="truncate text-lg font-extrabold text-foreground lg:text-2xl">Halim Qur&apos;an</h2>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0" /> Kab. Bandung
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Link
          href="https://wa.me/6281128018990"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-primary px-6 text-sm font-extrabold text-primary hover:bg-accent sm:flex-none"
        >
          <MessageCircle className="size-4" /> Chat Penjual
        </Link>
        <Link
          href="/pesanan/lacak"
          className="flex h-10 flex-1 items-center justify-center rounded-lg bg-primary px-6 text-sm font-extrabold text-primary-foreground hover:bg-primary-dark sm:flex-none"
        >
          Cek Pesanan
        </Link>
      </div>
    </section>
  );
}
