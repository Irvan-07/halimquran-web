export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** "Terjual" figure the way marketplaces show it: exact below 1,000, then "3 rb+", "10 rb+". */
export function formatSoldCount(n: number): string {
  return n >= 1000 ? `${Math.floor(n / 1000)} rb+` : String(n);
}
