import React from "react";
import TableWithFilter from "@/components/organisms/TableWithFilter";
import { orderColumn } from "@/data/orderColumn";

export default function OrderTemp() {
  return (
    <div className="flex flex-col gap-6 p-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Orders
        </h1>
      </div>

      {/* Table Section */}
      <div className="rounded-lg border bg-background p-4">
        {/* <TableWithFilter
          dataOfColumn={orderColumn}
         
        /> */}
      </div>

    </div>
  );
}
