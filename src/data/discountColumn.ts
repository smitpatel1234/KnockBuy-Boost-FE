import { filter } from "lodash";

export const discountColumn = [
  {
    title: "Discount Name",
    key: "discount_name",
    filterKey: "discount_code",
    sortable: true,
    searchable: true,
  },
  {
    title: "Code",
    key: "discount_code",
    filterKey: "discount_code",
    sortable: true,
    searchable: true,
  },
  {
    title: "Type",
    key: "discount_type",
    filterKey: "discount_type",
    sortable: true,
  },
  {
    title: "Amount",
    key: "discount_amount",
    filterKey: "discount_amount",
    sortable: true,
    searchable: true,
  },
  {
    title: "Start Date",
    key: "discount_start_date",
    filterKey: "discount_start_date",
    sortable: true,
    searchable: true,
  },
  {
    title: "Duration",
    key: "duration",
    filterKey: "duration",
    sortable: true,
    searchable: true,
  },
  {
    title: "Active",
    key: "active_flag",
    sortable: true,
  },
];
