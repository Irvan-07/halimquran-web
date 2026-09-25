import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/lib/mock-data/products";

// Content on this page is copied from the live halimquran.com Wakaf Quran
// page (verified 2026-09-16), not invented — see the FAQ answers' comments
// for which ones are direct quotes vs. a documented "ask us" deferral where
// the real answer wasn't available from the page text.
export const metadata: Metadata = {
  title: "Wakaf Quran",
};

const akadOptions = [
  {
    title: "1. Titip Ke Halim Quran",
    description:
      "Beli Al-Quran lalu titipkan penyalurannya kepada Halim Quran untuk disalurkan melalui mitra yayasan, masjid, pesantren, atau lembaga yang membutuhkan.",
  },
  {
    title: "2. Kirim ke Tujuan Pilihan",
    description:
      "Beli Al-Quran lalu paket langsung kami kirim ke alamat yayasan, pesantren, masjid, atau lembaga yang dipilih oleh pembeli.",
  },
];

const orderSteps = [
  {
    title: "Pilih Mushaf",
    description:
      "Pilih mushaf yang ingin Anda wakafkan sesuai kebutuhan dan anggaran yang tersedia.",
  },
  {
    title: "Pilih Warna Mushaf",
    description: "Tentukan warna mushaf yang paling sesuai dengan preferensi Anda.",
  },
  {
    title: "Cover Doa (Opsional)",
    description:
      "Jika ingin mencantumkan identitas pewakaf dan doa khusus, pilih opsi Quran + Cover Doa.",
  },
  {
    title: "Isi Data Wakaf (Opsional)",
    description:
      "Lengkapi Program Penyaluran Wakaf dan Catatan Wakaf apabila diperlukan.",
  },
  {
    title: "Tentukan Alamat Pengiriman",
    description:
      "Saat checkout, pilih alamat pengiriman sesuai tujuan wakaf Anda. Untuk penitipan melalui program wakaf Halim Quran, gunakan alamat Kantor Halim Quran. Jika ingin dikirim ke lokasi tertentu, cukup isi alamat tujuan yang diinginkan.",
  },
];

const faq = [
  {
    q: "Apakah bisa wakaf mulai dari 1 mushaf?",
    a: "Bisa. Wakaf Quran dapat dimulai dari 1 mushaf saja.",
  },
  {
    q: "Apakah perbedaan titip penyaluran & kirim langsung?",
    a: '"Titip Ke Halim Quran": beli Al-Quran lalu titipkan penyalurannya kepada Halim Quran untuk disalurkan melalui mitra yayasan, masjid, pesantren, atau lembaga yang membutuhkan. "Kirim ke Tujuan Pilihan": beli Al-Quran lalu paket langsung dikirim ke alamat yayasan, pesantren, masjid, atau lembaga yang Anda pilih sendiri.',
  },
  {
    q: "Apakah nama wakif dan titipan doa bisa dicantumkan?",
    a: 'Bisa, dan sifatnya opsional — pilih opsi Quran + Cover Doa saat memesan. Jika tidak diisi, mushaf tetap dapat diwakafkan dan disalurkan seperti biasa.',
  },
  {
    q: "Kapan mushaf wakaf disalurkan?",
    a: "Penyaluran dilakukan secara berkala bersama amanah dari para pewakaf lainnya.",
  },
  {
    q: "Apakah saya akan mendapatkan dokumentasi penyaluran?",
    a: "Setiap program penyaluran wakaf yang dilakukan melalui Halim Quran akan diinformasikan kepada para pewakaf.",
  },
  {
    q: "Apakah saya bisa memilih tujuan penyaluran sendiri?",
    a: 'Bisa, melalui opsi "Kirim ke Tujuan Pilihan" — paket dikirim langsung ke alamat yayasan, pesantren, masjid, atau lembaga yang Anda pilih.',
  },
  {
    q: "Apakah mushaf yang dipilih akan sama dengan yang disalurkan?",
    // Not stated anywhere on the live page — answered honestly rather than guessed.
    a: "Informasi ini belum tercantum di halaman Wakaf Quran — silakan tanyakan melalui Konsultasi Wakaf di bawah.",
  },
];

const WHATSAPP_NUMBER = "6281128018990"; // published on qurancustom.com (Halim Quran)

export default function WakafPage() {
  const wakafProducts = mockProducts.filter((p) => p.wakafEligible);

  return (
    <div className="flex flex-col">
      {/* Hero — real copy from the live page; no fabricated campaign photo. */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-3 px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Satu Mushaf Untuk Mereka
          </h1>
          <p className="text-lg font-medium text-primary">
            Satu Amal Jariyah untuk Selamanya
          </p>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Setiap mushaf yang diwakafkan berpotensi menjadi sarana belajar,
            membaca, dan menghafal Al-Quran bagi banyak orang. Karena itu,
            manfaatnya dapat terus hidup bahkan setelah mushaf tersebut
            berpindah tangan.
          </p>
        </div>
      </section>

      {/* Titip Penyaluran banner */}
      <section className="bg-primary">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xl font-semibold text-primary-foreground">
            Titip Penyaluran Wakaf Quran Mulai Dari 1 Mushaf
          </h2>
          <ul className="flex flex-col gap-1.5">
            {[
              "Pilih mushaf yang ingin diwakafkan",
              "Nama & Doa Dapat Dicantumkan",
              "Bisa dititipkan penyalurannya melalui Halim Quran",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-primary-foreground"
              >
                <Check className="size-4 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2 akad options */}
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          Terdapat 2 pilihan akad. Pilih cara penyaluran yang paling sesuai
          dengan kebutuhan Anda.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {akadOptions.map((option) => (
            <div
              key={option.title}
              className="flex flex-col gap-2 rounded-lg border border-border p-4"
            >
              <h3 className="font-heading text-base font-semibold text-foreground">
                {option.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {option.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Cara Memesan */}
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Cara Memesan Mushaf Wakaf
        </h2>
        <p className="text-sm text-muted-foreground">
          Ikuti langkah berikut untuk memilih mushaf wakaf dan melengkapi
          informasi yang diperlukan sebelum checkout.
        </p>
        <ol className="flex flex-col gap-4">
          {orderSteps.map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {i + 1}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-foreground">
                  {step.title}
                </span>
                <span className="text-sm text-muted-foreground">
                  {step.description}
                </span>
              </div>
            </li>
          ))}
        </ol>
        <p className="rounded-md bg-secondary p-3 text-xs text-muted-foreground">
          Catatan: Pencantuman nama dan titipan doa bersifat opsional. Jika
          tidak diisi, mushaf tetap dapat diwakafkan dan disalurkan seperti
          biasa.
        </p>
      </section>

      {/* Wakaf-eligible products */}
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Mulai Pilih Mushaf Wakaf Anda
        </h2>
        <p className="text-sm text-muted-foreground">
          Setiap mushaf memiliki karakteristik yang berbeda. Pilih mushaf yang
          ingin Anda wakafkan sesuai kebutuhan dan preferensi Anda.
        </p>
        {wakafProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {wakafProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Belum ada produk contoh yang ditandai cocok untuk wakaf.
          </p>
        )}
      </section>

      {/* Konsultasi CTA */}
      <section className="bg-primary">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-3 px-4 py-10 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xl font-semibold text-primary-foreground">
            Masih Ada Yang Ingin Ditanyakan?
          </h2>
          <p className="text-sm text-primary-foreground/90">
            Jika Anda masih bingung menentukan mushaf, tujuan penyaluran, atau
            memiliki pertanyaan lainnya, tim kami siap membantu.
          </p>
          <Button variant="secondary" asChild>
            <Link
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Konsultasi Wakaf
            </Link>
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Pertanyaan Yang Sering Diajukan
        </h2>
        <Accordion type="single" collapsible>
          {faq.map((item, i) => (
            <AccordionItem key={i} value={`wakaf-faq-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
