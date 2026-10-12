export const WHATSAPP_NUMBER = "6281128018990";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://halimquran.com").replace(/\/$/, "");

function link(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Link to the shop's WhatsApp with the first message already written, so the
 * team can tell at a glance the chat came from the website and from which
 * page. The buyer can still edit the text before sending.
 */
export function whatsappHref(pathname: string, productName?: string): string {
  const intro = productName
    ? `Halo Halim Quran, saya lihat produk ${productName} di website halimquran.com dan mau tanya.`
    : "Halo Halim Quran, saya dari website halimquran.com dan mau tanya.";
  return link(`${intro}\n\n${SITE}${pathname}`);
}

/** Same message without a page address, for places that cannot know the page. */
export const WHATSAPP_LINK = link("Halo Halim Quran, saya dari website halimquran.com dan mau tanya.");
