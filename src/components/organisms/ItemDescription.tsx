import React from "react";
import { Item } from "@/types/item.type";
export default function ItemDescription({
  item_id,
  item_name,
  description,
  item_price,
  variant,
  rating,
}: Item) {
  return (
    <section className="border rounded-lg p-4 space-y-2">
      <h2 className="text-lg font-semibold">Item Details</h2>

      <div className="text-sm text-gray-600">ID: {item_id}</div>
      <div className="text-base font-medium">{item_name}</div>
      <div className="text-sm text-gray-700">{description}</div>

      <div className="flex justify-between text-sm">
        <span>Variant: { variant && variant.map((v) =><><div> {v.Property_name}</div><div>{v.variant_value}</div> </>)}</span>
        <span className="font-semibold">₹{item_price}</span>
      </div>

      <div className="text-sm">Rating: ⭐ {rating}</div>
    </section>
  );
}
