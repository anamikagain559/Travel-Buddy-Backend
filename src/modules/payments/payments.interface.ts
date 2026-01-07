export interface IPaymentIntentPayload {
  price: number; // amount in USD
  plan?: "MONTHLY" | "YEARLY";
}
