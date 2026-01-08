import type { ColumnConfig } from "@/types/generic-table.types";

export const cetogoryColumn: ColumnConfig[] = [
   {
      title: "Image",
      key: "image_url",
      searchable: false,
      sortable: false
   },
   {
      title: "Category Name",
      key: "category_name",
      filterKey: "category.category_name",
      sortable: true,
      searchable: true
   },
   {
      title: "Parent Category",
      key: "parent_category_name",
      filterKey: "parent.category_name",
      sortable: true,
      searchable: true
   },
   {
      title: "Description",
      key: "description",
      filterKey: "category.description",
      searchable: true
   },
];