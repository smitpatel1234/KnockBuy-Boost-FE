"use client";

import React from "react";
import TableWithFilter from "../organisms/TableWithFilter";
import { itemColumn } from "@/data/itemColumn";
import { Button } from "@/components/atoms/Button";
import { PlusIcon } from "lucide-react";
import type { Item } from "@/types/item.types";
import { useAppDispatch } from "@/redux/store";
import { fetchCategoriesAll } from "@/redux/features/category-slice";
import { fetchVariantData } from "@/redux/features/variant-slice";
import { removeItem, fetchItems } from "@/redux/features/item-slice";
import type { PageParams } from "@/types/pagination.types";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
export default function ProductTemp() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items } = useAppSelector((state) => state.item);
  const handleAdd = () => {
    void dispatch(fetchVariantData());
    void dispatch(fetchCategoriesAll());
    router.push('/adminLogin/admin/item/add');
  };

  const handleEdit = (item: Item) => {
    void dispatch(fetchVariantData());
    void dispatch(fetchCategoriesAll());
    router.push(`/adminLogin/admin/item/${item.item_id}`);
  };

  const fetchProducts = async (PageParams: PageParams): Promise<number> => {
    const res = await dispatch(fetchItems(PageParams)).unwrap();
    return res.meta.total;
  }

  const handleDelete = async (item: Item) => {
    try {
      await dispatch(removeItem(item.item_id));
      void fetchProducts({
        pagination: { page: 1, limit: 10 },
        filters: [],
        sort: []
      });
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Product Inventory
          </h1>
          <p className="text-sm text-slate-500">View and manage your product stock, pricing, and variants.</p>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all">
          <PlusIcon className="h-4 w-4" />
          Add New Product
        </Button>
      </div>

      {/* Table Section */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <TableWithFilter<Item>
          data={items}
          dataOfColumn={itemColumn}
          fetchData={fetchProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
