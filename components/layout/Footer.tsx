import Image from "next/image";

// Matches the real halimquran.com footer exactly (re-verified 26 Sep
// 2026, including computed bg-color #006EDB and the white logo mark
// asset — the content-only match from 16 Sep was missing both): solid
// primary-blue background, white reversed logo icon, left-aligned text.
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-10 sm:px-6 lg:px-8">
        <Image src="/logo-white.png" alt="" width={80} height={80} className="size-20" />
        <p className="text-base font-medium text-primary-foreground">
          HalimQuran &reg; {year} - 100% Guaranteed
        </p>
        <p className="max-w-md text-sm text-primary-foreground/90">
          Jalan Raya Bojongsoang, Buat Batu Square no.B22 Cipagalo, Kota
          Bandung, Jawa Barat 40287
        </p>
      </div>
    </footer>
  );
}
