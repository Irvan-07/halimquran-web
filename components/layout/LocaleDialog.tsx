"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Globe } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// halimquran.com's mobile drawer ends with an "IDR" row that opens a
// Deliver to / Language / Currency dialog (confirmed on the live site).
// Halim Quran only ships within Indonesia in Bahasa/IDR, so these are
// fixed values rather than working selectors — matching the live site's
// look without inventing a multi-region/multi-currency feature Scalev
// doesn't have.
function FieldRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center justify-between rounded-md border border-border px-3 py-2.5">
        <span className="flex items-center gap-2 text-sm text-foreground">
          {icon}
          {value}
        </span>
        <ChevronDown className="size-4 text-muted-foreground" />
      </div>
    </div>
  );
}

export function LocaleDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-md px-2 py-3 text-sm text-foreground hover:bg-secondary"
        >
          <span className="flex items-center gap-2">
            <span aria-hidden="true">🇮🇩</span>
            IDR
          </span>
          <ChevronRight className="size-4 text-muted-foreground" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pengaturan Wilayah</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <FieldRow
            label="Deliver to"
            value="Indonesia"
            icon={<span aria-hidden="true">🇮🇩</span>}
          />
          <FieldRow
            label="Language"
            value="Bahasa"
            icon={<Globe className="size-4 text-muted-foreground" />}
          />
          <FieldRow label="Currency" value="IDR - Indonesian Rupiah" icon={null} />
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} className="w-full">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
