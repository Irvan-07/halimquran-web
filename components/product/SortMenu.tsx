"use client";

import { Check, X } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { SORT_OPTIONS, type SortOption } from "@/lib/utils/product-filters";

// "Urutkan produk berdasarkan" — the sheet behind the toolbar's Urutan
// button, as on halimquran.com's category pages: title + close, then one row
// per option with the current one in bold with a check.
export function SortSheet({
  open,
  onOpenChange,
  sort,
  onSortChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="mx-auto max-h-[90vh] gap-0 overflow-y-auto rounded-t-3xl p-0 sm:max-w-md sm:rounded-3xl sm:bottom-6"
      >
        <div className="flex items-center justify-between px-6 pb-3 pt-6">
          <SheetTitle className="font-heading text-xl font-bold">Urutkan produk berdasarkan</SheetTitle>
          <button
            type="button"
            aria-label="Tutup"
            onClick={() => onOpenChange(false)}
            className="flex size-9 items-center justify-center rounded-full text-foreground hover:bg-secondary"
          >
            <X className="size-6" />
          </button>
        </div>
        <SheetDescription className="sr-only">Pilih urutan tampilan produk</SheetDescription>
        <ul className="flex flex-col pb-4">
          {SORT_OPTIONS.map((option) => {
            const selected = option.value === sort;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    onSortChange(option.value);
                    onOpenChange(false);
                  }}
                  className={`flex w-full items-center justify-between px-6 py-3.5 text-left text-base hover:bg-secondary ${
                    selected ? "font-bold text-foreground" : "text-foreground"
                  }`}
                >
                  {option.label}
                  {selected && <Check className="size-5" />}
                </button>
              </li>
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
