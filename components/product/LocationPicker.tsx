"use client";

import { useState } from "react";
import { ArrowLeft, ChevronRight, Search } from "lucide-react";
import { indonesiaRegions } from "@/lib/data/indonesia-regions";

interface LocationPickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (location: string) => void;
}

// Matches halimquran.com's real "Pilih Area" flow exactly (confirmed by
// testing the live PDP): a full-screen, 2-step sheet — Provinsi, then
// Kota/Kabupaten within it — each with its own search box, closing on
// city selection. Only the location LABEL is functional here; it isn't
// wired to a real shipping-cost calculation yet (that depends on the
// Scalev integration, not built yet).
export function LocationPicker({ open, onClose, onSelect }: LocationPickerProps) {
  const [step, setStep] = useState<"province" | "city">("province");
  const [province, setProvince] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  if (!open) return null;

  const cities = indonesiaRegions.find((p) => p.name === province)?.cities ?? [];
  const list = step === "province" ? indonesiaRegions.map((p) => p.name) : cities;
  const filtered = list.filter((item) => item.toLowerCase().includes(query.toLowerCase()));

  function handleBack() {
    if (step === "city") {
      setStep("province");
      setProvince(null);
      setQuery("");
    } else {
      onClose();
    }
  }

  function handlePick(item: string) {
    if (step === "province") {
      setProvince(item);
      setStep("city");
      setQuery("");
    } else {
      onSelect(`${item}, ${province}`);
      onClose();
      setStep("province");
      setProvince(null);
      setQuery("");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      <div className="flex items-center gap-3 p-4">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Kembali"
          className="flex size-8 items-center justify-center text-foreground"
        >
          <ArrowLeft className="size-5" />
        </button>
      </div>

      <div className="flex flex-col gap-4 px-4 pb-4">
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">
            {step === "province" ? "1. Pilih Provinsi" : "2. Pilih Kota"}
          </h2>
          {step === "province" && (
            <p className="mt-1 text-sm text-muted-foreground">
              Ke mana kamu ingin mengirimkan paket?
            </p>
          )}
        </div>
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={step === "province" ? "Cari Provinsi" : "Cari Kota"}
            className="w-full rounded-full border border-input py-2.5 pl-4 pr-10 text-sm text-foreground outline-none focus:border-primary"
          />
          <Search className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      <div className="flex-1 divide-y divide-border overflow-y-auto">
        {filtered.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => handlePick(item)}
            className="flex w-full items-center justify-between px-4 py-4 text-left text-sm text-foreground hover:bg-secondary"
          >
            {item}
            <ChevronRight className="size-4 text-muted-foreground" />
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="px-4 py-6 text-center text-sm text-muted-foreground">
            Tidak ditemukan.
          </p>
        )}
      </div>
    </div>
  );
}
