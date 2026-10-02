import { Footer } from "@/components/layout/Footer";
import type { Theme } from "../types";
import { TikTokHeader } from "./Header";
import { TikTokProductCard } from "./ProductCard";

// Social-commerce look inspired by in-app shop pages (compact header with
// search pill + category chips, dense white cards on a light-grey page,
// accent-red prices). Colors/radius live in the [data-theme="tiktok"]
// block of app/globals.css; no third-party logos or assets are used.
export const tiktokTheme: Theme = {
  id: "tiktok",
  name: "Social commerce (gaya TikTok Shop)",
  slots: { Header: TikTokHeader, Footer, ProductCard: TikTokProductCard },
};
