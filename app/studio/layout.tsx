import type { Metadata, Viewport } from "next";
import { metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio";

export const metadata: Metadata = { ...studioMetadata, title: "Halim Quran Studio" };
export const viewport: Viewport = studioViewport;

// The Studio is a full-screen app of its own; cover the storefront header,
// footer and floating buttons that the root layout renders around every page.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 z-[9999] overflow-auto bg-white">{children}</div>;
}
