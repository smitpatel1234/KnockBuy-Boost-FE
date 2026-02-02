import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { payment_method } from "@/types/placeorder.type";
export interface PaymentProps {
  payment_method: payment_method
  SetPayment_Method: (value: payment_method) => void
}
export default function PaymentMethod({ payment_method, SetPayment_Method }: Readonly<PaymentProps>) {
  return (
    <section className="border rounded-lg p-4 space-y-4">
      <h2 className="text-lg font-semibold">Payment Method</h2>

      <RadioGroup defaultValue="CASH_ON_DELIVERY" className="space-y-3" value={payment_method} onValueChange={SetPayment_Method}>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="CREDIT_CARD" id="CREDIT_CARD" />
          <Label htmlFor="CREDIT_CARD">CREDIT_CARD</Label>
        </div>

        <div className="flex items-center gap-3">
          <RadioGroupItem value="DEBIT_CARD" id="DEBIT_CARD" />
          <Label htmlFor="DEBIT_CARD">DEBIT_CARD</Label>
        </div>

        <div className="flex items-center gap-3">
          <RadioGroupItem value="PAYPAL" id="PAYPAL" />
          <Label htmlFor="PAYPAL">PAYPAL</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="CASH_ON_DELIVERY" id="CASH_ON_DELIVERY" />
          <Label htmlFor="CASH_ON_DELIVERY">CASH_ON_DELIVERY</Label>
        </div>
      </RadioGroup>
    </section>
  );
}
