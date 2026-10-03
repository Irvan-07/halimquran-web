"use client";

import { useState, type ReactNode } from "react";
import { ChevronUp, X } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import {
  EMPTY_FILTERS,
  PRICE_RANGES,
  type FilterState,
  availableColorFamilies,
} from "@/lib/utils/product-filters";
import type { Product } from "@/types/product";

function Section({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="border-b border-border last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-6 py-4 text-left text-base text-foreground"
      >
        {title}
        <ChevronUp className={`size-5 transition-transform ${open ? "" : "rotate-180"}`} />
      </button>
      {open && <div className="px-6 pb-4">{children}</div>}
    </section>
  );
}

function Radio({ selected, label, onSelect }: { selected: boolean; label: string; onSelect: () => void }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`flex w-full items-center gap-3 py-2.5 text-left text-base ${selected ? "text-primary" : "text-foreground"}`}
    >
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-primary">
        {selected && <span className="size-2.5 rounded-full bg-primary" />}
      </span>
      {label}
    </button>
  );
}

// The Filter sheet from halimquran.com's category pages: Tipe Produk,
// Ketersediaan, Harga and Color, applied with one "Aplikasikan" button. The
// choices are held as a draft until Aplikasikan is pressed.
export function FilterSheet({
  open,
  onOpenChange,
  applied,
  onApply,
  products,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applied: FilterState;
  onApply: (filters: FilterState) => void;
  /** The category's products — used to offer only the colours that exist. */
  products: Product[];
}) {
  const [draft, setDraft] = useState<FilterState>(applied);
  const colors = availableColorFamilies(products);

  function handleOpenChange(next: boolean) {
    if (next) setDraft(applied);
    onOpenChange(next);
  }

  function toggleColor(id: string) {
    setDraft((d) => ({
      ...d,
      colors: d.colors.includes(id) ? d.colors.filter((c) => c !== id) : [...d.colors, id],
    }));
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="mx-auto max-h-[92vh] gap-0 overflow-y-auto rounded-t-3xl p-0 sm:max-w-md sm:rounded-3xl sm:bottom-6"
      >
        <div className="flex items-center justify-between px-6 pb-2 pt-6">
          <SheetTitle className="font-heading text-2xl font-bold">Filter</SheetTitle>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDraft(EMPTY_FILTERS)}
              className="text-sm font-medium text-primary hover:underline"
            >
              Reset
            </button>
            <button
              type="button"
              aria-label="Tutup"
              onClick={() => handleOpenChange(false)}
              className="flex size-9 items-center justify-center rounded-full text-foreground hover:bg-secondary"
            >
              <X className="size-6" />
            </button>
          </div>
        </div>
        <SheetDescription className="sr-only">Saring produk berdasarkan tipe, ketersediaan, harga, dan warna</SheetDescription>

        <div role="radiogroup" aria-label="Tipe Produk">
          <Section title="Tipe Produk">
            <Radio selected={!draft.featuredOnly} label="Semua Produk" onSelect={() => setDraft((d) => ({ ...d, featuredOnly: false }))} />
            <Radio selected={draft.featuredOnly} label="Produk Unggulan" onSelect={() => setDraft((d) => ({ ...d, featuredOnly: true }))} />
          </Section>
        </div>

        <div role="radiogroup" aria-label="Ketersediaan">
          <Section title="Ketersediaan">
            <Radio selected={!draft.inStockOnly} label="Semua" onSelect={() => setDraft((d) => ({ ...d, inStockOnly: false }))} />
            <Radio selected={draft.inStockOnly} label="Ada Stok" onSelect={() => setDraft((d) => ({ ...d, inStockOnly: true }))} />
          </Section>
        </div>

        <div role="radiogroup" aria-label="Harga">
          <Section title="Harga">
            {PRICE_RANGES.map((r) => (
              <Radio
                key={r.value}
                selected={draft.price === r.value}
                label={r.label}
                onSelect={() => setDraft((d) => ({ ...d, price: d.price === r.value ? null : r.value }))}
              />
            ))}
          </Section>
        </div>

        {colors.length > 0 && (
          <Section title="Color">
            <div className="flex flex-wrap gap-3">
              {colors.map((c) => {
                const selected = draft.colors.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-label={c.label}
                    aria-pressed={selected}
                    title={c.label}
                    onClick={() => toggleColor(c.id)}
                    className={`size-10 rounded-full border border-black/10 ${
                      selected ? "ring-2 ring-primary ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                );
              })}
            </div>
          </Section>
        )}

        <div className="sticky bottom-0 bg-popover px-6 pb-6 pt-3">
          <button
            type="button"
            onClick={() => {
              onApply(draft);
              onOpenChange(false);
            }}
            className="h-12 w-full rounded-2xl bg-primary text-base font-medium text-primary-foreground hover:bg-primary-dark"
          >
            Aplikasikan
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
