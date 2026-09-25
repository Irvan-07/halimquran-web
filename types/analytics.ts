// GA4-standard ecommerce event shapes (https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
// — a stable public spec, unlike the Scalev types which are guesses. Fields
// are kept to product/order facts only; no customer PII per project's
// privacy rule.

export interface AnalyticsItem {
  item_id: string;
  item_name: string;
  item_category?: string;
  price: number;
  quantity?: number;
}

export interface ViewItemEvent {
  name: "view_item";
  items: AnalyticsItem[];
}

export interface AddToCartEvent {
  name: "add_to_cart";
  items: AnalyticsItem[];
  value: number;
}

export interface BeginCheckoutEvent {
  name: "begin_checkout";
  items: AnalyticsItem[];
  value: number;
}

export interface PurchaseEvent {
  name: "purchase";
  transaction_id: string;
  items: AnalyticsItem[];
  value: number;
}

export type AnalyticsEvent =
  | ViewItemEvent
  | AddToCartEvent
  | BeginCheckoutEvent
  | PurchaseEvent;
