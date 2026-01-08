import React from "react";
import type { GetAllItemCartType } from "@/types/itemcart.types";
export default function ItemDescription({
  item_id,
  item_name,
  item_price,
}: GetAllItemCartType) {
  return (
    <section className="border rounded-lg p-4 space-y-2">
      <h2 className="text-lg font-semibold">Item Details</h2>
      <div className="text-sm text-gray-600">ID: {item_id}</div>
      <div className="text-base font-medium">{item_name}</div>
      <div className="flex justify-between text-sm">
        <span className="font-semibold">₹{item_price}</span>
      </div>
    </section>
  );
}
