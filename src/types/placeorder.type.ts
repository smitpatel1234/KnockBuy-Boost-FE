export interface placeorder {
  address_id?: string;
  discount_id?: string;
  payment_method?: payment_method;
}
export type payment_method = "CREDIT_CARD" | "DEBIT_CARD" | "PAYPAL" | "CASH_ON_DELIVERY"