"use client";
import React, { useState } from "react";
import TableWithFilter from "../organisms/TableWithFilter";
import { discountColumn } from "@/data/discountColumn";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Dialogbox from "@/components/organisms/discount/Dialogbox";
import { Discount } from "@/types/discount.type";
import { useAppDispatch } from "@/redux/store";
import { removeDiscount,fetchDiscounts } from "@/redux/features/discount-slice";
import { PageParams } from "@/types/pagination.type";
import { useAppSelector } from "@/redux/store";
export default function DiscountTemp() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);
  const  {discounts} = useAppSelector((state) => state.discount);  
  const dispatch = useAppDispatch();


  const handleAdd = () => {
    setSelectedDiscount(null);
    setDialogOpen(true);
  };

  const handleEdit = (row: Discount) => {
    setSelectedDiscount(row);
    setDialogOpen(true);
  };

  const handleDelete = async (row: Discount) => {
      await dispatch(removeDiscount(row.discount_id));
  };

  const handleSuccess = () => {
    setDialogOpen(false);
    setSelectedDiscount(null);
  };
  const fetchdata = async (PageParams: PageParams) => {
      const res = await  dispatch(fetchDiscounts(PageParams)).unwrap();
      return  res.meta.total;
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <Dialogbox
        isOpen={dialogOpen}
        item={selectedDiscount}
        onClose={() => setDialogOpen(false)}
        onSuccess={handleSuccess}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Discounts
        </h1>

        <Button className="flex items-center gap-2" onClick={handleAdd}>
          <PlusIcon className="h-4 w-4" />
          Add Discount
        </Button>
      </div>

      {/* Table Section */}
      <div className="rounded-lg border bg-background p-4">
        <TableWithFilter
          data={discounts}
          dataOfColumn={discountColumn}
          fetchData={fetchdata}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

    </div>
  );
}
