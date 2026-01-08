"use client";

import React from "react";
import VarientConfig from "../organisms/products/VarientConfig";
import TableWithFilter from "../organisms/TableWithFilter";
import { varientconfigColumn } from "@/data/varientColumn";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { removeVariantValue, fetchVariantValuePage } from "@/redux/features/variant-slice";
import EditVariantValueDialog from "../organisms/products/EditVariantValueDialog";
import type { PageParams } from "@/types/pagination.types";


export default function VarientConfigPage() {
  const dispatch = useAppDispatch();
  const [editValue, setEditValue] = React.useState<{
    variantValue_id: string;
    variant_value: string;
    variantProperty_id: string;
  } | null>(null);
  const { values } = useAppSelector((state) => state.variant);


  const handleDeleteValue = (row: { variantValue_id: string }) => {
    void dispatch(removeVariantValue(row.variantValue_id));
  };

  const handleEditValue = (row: {
    variantValue_id: string;
    variant_value: string;
    variantProperty_id: string;
  }) => {
    setEditValue(row);
  };
  const fetchdata = async (PageParams: PageParams) => {
    const data = await dispatch(fetchVariantValuePage(PageParams)).unwrap();
    return data.values.meta.total;
  }
  return (
    <div className="flex flex-col gap-6 p-4">
      {editValue && (
        <EditVariantValueDialog
          isOpen={!!editValue}
          variantValue={editValue}
          onClose={() => {
            setEditValue(null);
          }}
        />
      )}

      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Variant Configuration
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Define global product variant properties and coordinate their allowed value sets.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {/* Variant Config Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800">
              Create Property & Values
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Add new variant properties (e.g., Color, Size) and map specific values to them.
            </p>
          </div>
          <div className="p-6">
            <VarientConfig />
          </div>
        </div>

        {/* Variants Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800">
              Existing Variant Values
            </h2>
            <p className="text-xs text-slate-500 font-medium tracking-tight">
              A comprehensive list of all configured variant values and their parent properties.
            </p>
          </div>

          <div className="p-0">
            <TableWithFilter<{
              variantValue_id: string;
              variant_value: string;
              variantProperty_id: string;
            }>
              data={values}
              dataOfColumn={varientconfigColumn}
              fetchData={fetchdata}
              onEdit={handleEditValue}
              onDelete={handleDeleteValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
