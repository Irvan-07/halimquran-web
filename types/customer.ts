// Shapes of the Scalev Storefront API v3 customer-account endpoints
// (dev.scalev.com/docs/storefront-api-auth, read 4 Oct 2026). Only the
// fields the account pages use are typed.

export interface CustomerTokens {
  access: string;
  refresh: string;
  token_type: "Bearer";
  /** Seconds until `access` expires (900 = 15 minutes). */
  expires_in: number;
  /** Seconds until `refresh` expires (2,592,000 = 30 days). */
  refresh_expires_in: number;
}

export type CustomerLoginResult =
  | { kind: "tokens"; tokens: CustomerTokens }
  | { kind: "otp"; message: string };

export interface CustomerProfile {
  id: number;
  email: string;
  name: string | null;
  phone: string | null;
}

/** Money fields come back as numbers or decimal strings ("49000.00"). */
export type CustomerMoney = number | string | null;

export interface CustomerOrderLine {
  id: number;
  quantity: number;
  product_name: string | null;
  variant_option1_value: string | null;
  variant_option2_value: string | null;
  variant_option3_value: string | null;
}

export interface CustomerOrder {
  id: number;
  /** Opens the existing public order page (/o/{secret_slug}/success). */
  secret_slug: string;
  /** Human order number shown to the customer. */
  order_id: string;
  /** draft | pending | confirmed | in_process | ready | shipped | completed | canceled | rts | closed */
  status: string;
  /** unpaid | paid | conflict | settled */
  payment_status: string | null;
  payment_method: string;
  created_at: string | null;
  gross_revenue: CustomerMoney;
  total_quantity: number | null;
  shipment_receipt: string | null;
  orderlines: CustomerOrderLine[];
}

export interface CustomerOrderPage {
  data: CustomerOrder[];
  has_next?: boolean;
  next_cursor?: string | null;
}
