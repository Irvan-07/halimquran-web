"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { mainNav } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { LocaleDialog } from "@/components/layout/LocaleDialog";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Buka menu navigasi"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex w-72 flex-col overflow-y-auto">
        {/* Title stays for screen readers; the live site's drawer shows a
            search shortcut here instead of a text title. */}
        <SheetHeader className="sr-only">
          <SheetTitle className="font-heading">{siteConfig.name}</SheetTitle>
        </SheetHeader>
        <div className="px-4 pt-4">
          <Button
            variant="secondary"
            size="icon"
            asChild
            aria-label="Cari produk"
          >
            <Link href="/pencarian" onClick={() => setOpen(false)}>
              <Search className="size-5" />
            </Link>
          </Button>
        </div>
        <nav className="flex flex-col gap-1 px-2">
          {mainNav.map((item) =>
            item.children ? (
              <Accordion key={item.href} type="single" collapsible>
                <AccordionItem value={item.href} className="border-none">
                  <AccordionTrigger className="rounded-md px-2 py-3 text-sm font-medium text-foreground hover:bg-secondary hover:no-underline">
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-1 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="mt-auto border-t border-border px-2 pb-2">
          <LocaleDialog />
        </div>
      </SheetContent>
    </Sheet>
  );
}
