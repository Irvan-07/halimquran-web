"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { LocationPicker } from "@/components/product/LocationPicker";

export function ShippingAreaField() {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState<string | null>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-primary"
      >
        {location ?? "Pilih Area"}
        <ChevronDown className="size-4" />
      </button>
      <LocationPicker open={open} onClose={() => setOpen(false)} onSelect={setLocation} />
    </>
  );
}
