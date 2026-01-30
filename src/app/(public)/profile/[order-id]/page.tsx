"use client";

import React from "react";
import OrderDetailsTemplate from "@/components/templates/OrderDetailsTemplate";

export default function AdminOrderDetailsPage({
  params,
}: {
  readonly params: Promise<{ "order-id": string }>;
}) {
  const unwrappedParams = React.use(params);
  return <OrderDetailsTemplate orderId={unwrappedParams["order-id"]} />;
}
