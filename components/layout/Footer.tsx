// Matches the real halimquran.com footer (verified 2026-09-16), which is
// intentionally minimal — brand line + address, no link columns.
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-1 px-4 py-8 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-foreground">
          HalimQuran &reg; {year} - 100% Guaranteed
        </p>
        <p className="max-w-md text-xs text-muted-foreground">
          Jalan Raya Bojongsoang, Buat Batu Square no.B22 Cipagalo, Kota
          Bandung, Jawa Barat 40287
        </p>
      </div>
    </footer>
  );
}
