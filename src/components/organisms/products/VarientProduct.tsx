"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { FormikProps } from "formik";
import { Item } from "@/types/item.type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchVariantData } from "@/redux/features/variant-slice";

interface VarientProductProps {
  formik: FormikProps<Item>;
}

export default function VarientProduct({ formik }: VarientProductProps) {
  const dispatch = useAppDispatch();
  const { properties, values } = useAppSelector((state) => state.variant);


  useEffect(() => {
    dispatch(fetchVariantData());
  }, [dispatch]);

  const addVariant = () => {
    formik.setFieldValue("variant", [
      ...(formik.values.variant ?? []),
      {
        variantProperty_id: "",
        variantValue_id: "",
        item_variantvalue_mapping_id: Math.random().toString(36).substr(2, 9),
      },
    ]);
  };


  const removeVariant = (index: number) => {
    const updated = [...(formik.values.variant ?? [])];
    updated.splice(index, 1);
    formik.setFieldValue("variant", updated);
  };


  const updateVariantField = (
    index: number,
    field: "variantProperty_id" | "variantValue_id",
    value: string
  ) => {
    const updated = [...(formik.values.variant ?? [])];

    updated[index] = {
      ...updated[index],
      [field]: value,
      ...(field === "variantProperty_id"
        ? { variantValue_id: "" }
        : {}),
    };

    formik.setFieldValue("variant", updated);
  };

  const variants = formik.values.variant ?? [];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Configure product options like size, color, etc.
        </p>
        <Button
          type="button"
          onClick={addVariant}
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white h-9"
        >
          <PlusCircleIcon className="w-4 h-4" />
          Add Option
        </Button>
      </div>

      {/* Variant Rows */}
      <div className="space-y-3">
        {variants.map((variant, index) => {
          const allowedValues = values.filter(
            (v) => v.variantProperty_id === variant.variantProperty_id
          );

          return (
            <div
              key={variant.item_variantvalue_mapping_id || index}
              className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center gap-4"
            >
              <div className="flex-1 grid grid-cols-2 gap-4">
                {/* Property */}
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase font-bold text-gray-500">
                    Property
                  </Label>
                  <Select
                    value={variant.variantProperty_id}
                    onValueChange={(val) =>
                      updateVariantField(index, "variantProperty_id", val)
                    }
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select Property" />
                    </SelectTrigger>
                    <SelectContent>
                      {properties.map((p) => (
                        <SelectItem
                          key={p.variantProperty_id}
                          value={p.variantProperty_id}
                        >
                          {p.property_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Value */}
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase font-bold text-gray-500">
                    Value
                  </Label>
                  <Select
                    value={variant.variantValue_id}
                    disabled={!variant.variantProperty_id}
                    onValueChange={(val) =>
                      updateVariantField(index, "variantValue_id", val)
                    }
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select Value" />
                    </SelectTrigger>
                    <SelectContent>
                      {allowedValues.map((val) => (
                        <SelectItem
                          key={val.variantValue_id}
                          value={val.variantValue_id}
                        >
                          {val.variant_value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Remove */}
              <div className="pt-5">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeVariant(index)}
                >
                  <Trash2Icon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {variants.length === 0 && (
          <div className="text-center py-6 bg-slate-50 border border-dashed border-slate-300 rounded-lg text-gray-400">
            No variants added. Click “Add Option” to get started.
          </div>
        )}
      </div>
    </div>
  );
}
