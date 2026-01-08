"use client";

import React, { useState } from "react";
import TableWithFilter from "../organisms/TableWithFilter";
import Dialogbox from "../organisms/category/Dialogbox";
import { cetogoryColumn } from "@/data/cetagoryColumn";
import { Button } from "@/components/atoms/Button";
import { PlusIcon } from "lucide-react";
import { useAppDispatch } from "@/redux/store";
import { removeCategory } from "@/redux/features/category-slice";
import type { Category } from "@/types/category.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/Avatar";
import { fetchCategories } from "@/redux/features/category-slice";
import { useAppSelector } from "@/redux/store";
import type { PageParams } from "@/types/pagination.types";
export default function CategoterTemp() {
  const dispatch = useAppDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  const { categories } = useAppSelector((state) => state.category);

  const handleAdd = () => {
    setSelectedCategory(undefined);
    setIsDialogOpen(true);
  };


  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsDialogOpen(true);
  };

  const handleDelete = async (category: Category) => {
    try {
      await dispatch(removeCategory(category.category_id));
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  const columnRenderers = {
    image_url: (value: string | number | null | undefined) => (
      <Avatar className="h-10 w-10 border border-slate-200">
        <AvatarImage src={String(value ?? "")} className="object-cover" />
        <AvatarFallback className="bg-slate-100 text-slate-400 font-bold text-[10px]">CAT</AvatarFallback>
      </Avatar>
    )
  };
  const fetchData = async (params: PageParams): Promise<number> => {
    const response = await dispatch(fetchCategories(params)).unwrap();
    return response.meta.total;
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Category Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Organize your product hierarchy and inventory collections.
          </p>
        </div>
        <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all flex items-center gap-2">
          <PlusIcon className="w-4 h-4" />
          Add Category
        </Button>
      </div>

      {/* Dialog Box */}
      <Dialogbox
        category={selectedCategory}
        isOpen={isDialogOpen}
        onClose={() => { setIsDialogOpen(false); }}
      />

      {/* Table Section */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <TableWithFilter<Category>
          data={categories}
          dataOfColumn={cetogoryColumn}
          fetchData={fetchData}
          onEdit={handleEdit}
          onDelete={(category) => { void handleDelete(category); }}
          columnRenderers={columnRenderers}
        />
      </div>
    </div>
  );
}
