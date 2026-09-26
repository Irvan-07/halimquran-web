"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Matches the floating WhatsApp button present on every halimquran.com
// page (bottom-right, all pages). Number reused from the one already
// verified for this business in app/wakaf/page.tsx (published on
// qurancustom.com) rather than re-guessing a different one here.
const WHATSAPP_NUMBER = "6281128018990";

// PDP's own mobile sticky bar (see PurchasePanel) already has a WhatsApp
// button next to "Tambah Ke Keranjang" — this global one would just
// duplicate it there, so it hides on PDP specifically on mobile widths
// (still shown on desktop, where there's no sticky bar to cover it).
const PDP_PATTERN = /^\/produk\/[^/]+\/[^/]+/;

export function WhatsAppButton() {
  const pathname = usePathname();
  const isPdp = PDP_PATTERN.test(pathname);

  return (
    <Link
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className={`fixed bottom-4 right-4 z-50 size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 ${
        isPdp ? "hidden sm:flex" : "flex"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.001 2c-5.522 0-10 4.477-10 10 0 1.766.462 3.492 1.34 5.008L2 22l5.13-1.317A9.958 9.958 0 0 0 12 22c5.523 0 10-4.477 10-10S17.524 2 12.001 2zm0 18.333a8.29 8.29 0 0 1-4.223-1.156l-.303-.18-3.146.807.84-3.068-.198-.315A8.293 8.293 0 0 1 3.667 12c0-4.595 3.738-8.333 8.334-8.333 4.595 0 8.333 3.738 8.333 8.333 0 4.596-3.738 8.333-8.333 8.333z" />
      </svg>
    </Link>
  );
}
