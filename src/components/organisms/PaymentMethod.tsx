import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function PaymentMethod() {
  return (
    <section className="border rounded-lg p-4 space-y-4">
      <h2 className="text-lg font-semibold">Payment Method</h2>

      <RadioGroup defaultValue="card" className="space-y-3">
        <div className="flex items-center gap-3">
          <RadioGroupItem value="netbanking" id="netbanking" />
          <Label htmlFor="netbanking">Net Banking</Label>
        </div>

        <div className="flex items-center gap-3">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card">Credit / Debit Card</Label>
        </div>

        <div className="flex items-center gap-3">
          <RadioGroupItem value="cod" id="cod" />
          <Label htmlFor="cod">Cash on Delivery</Label>
        </div>
      </RadioGroup>
    </section>
  );
}
