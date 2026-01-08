import type { ColumnConfig } from "@/types/generic-table.types";

export const discountColumn: ColumnConfig[] = [
  {
    title: "Discount Name",
    key: "discount_name",
    filterKey: "discount.discount_name",
    sortable: true,
    searchable: true,
  },
  {
    title: "Code",
    key: "discount_code",
    filterKey: "discount.discount_code",
    sortable: true,
    searchable: true,
  },
  {
    title: "Type",
    key: "discount_type",
    filterKey: "discount.discount_type",
    sortable: true,
  },
  {
    title: "Amount",
    key: "discount_amount",
    filterKey: "discount.discount_amount",
    sortable: true,
    searchable: true,
  },
  {
    title: "Start Date",
    key: "discount_start_date",
    filterKey: "discount.discount_start_date",
    sortable: true,
    searchable: true,
  },
  {
    title: "Duration",
    key: "duration",
    filterKey: "discount.duration",
    sortable: true,
    searchable: true,
  },
  {
    title: "Active",
    key: "active_flag",
    sortable: true,
  },
];
