"use client";

import React from "react";
import { MultiSelectVirtual } from "./multi-select-virtual";
import { useVariantCollectionItems } from "@/hooks/useVariantCollectionItems";
import type { VariantCollectionProps, MultiSelectItem } from "@/types/item.types";



export default function VariantCollectionComponent({
  formik,
}: VariantCollectionProps) {
  const { items, loading, error } = useVariantCollectionItems();
  const productId = formik.values.item_id;


  const availableItems: MultiSelectItem[] = React.useMemo(() => {
    const result = (Array.isArray(items) ? items : [])
      .filter((item) => item.item_id !== productId)
      .map((item) => ({
        item_id: item.item_id,
        item_name: item.item_name,
      }));

    return result;
  }, [items, productId]);


  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="text-sm text-gray-500">Loading items...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-6 bg-red-50 rounded-lg border border-red-200">
        <div className="text-sm text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (availableItems.length === 0) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="text-sm text-gray-500">No items available for variant collection</div>
      </div>
    );
  }
  const handleSelect = (value: MultiSelectItem[]) => {
    void formik.setFieldValue("variant_collections", value);
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Select items to group together as variant collections
      </p>
      <MultiSelectVirtual
        items={availableItems}
        value={formik.values.variant_collections ?? []}
        onChange={handleSelect}
        placeholder="Search and selected items..."
      />
    </div>
  );
}
