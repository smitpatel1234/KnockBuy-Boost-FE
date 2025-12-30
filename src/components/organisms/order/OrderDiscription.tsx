import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React from "react";

export default function OrderDiscription() {
  return (
    <div className="flex flex-col gap-6 p-4">

      {/* Order Meta Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="flex flex-col gap-1">
          <Label className="text-muted-foreground">Order By</Label>
          <p className="font-medium">Unknown User</p>
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-muted-foreground">Order Date</Label>
          <p className="font-medium">Unknown Date</p>
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-muted-foreground">Order Value</Label>
          <p className="font-medium">₹ 0.00</p>
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-muted-foreground">Order Status</Label>
          <p className="font-medium text-green-600">Pending</p>
        </div>

      </div>

      {/* Order Items */}
      <div className="flex flex-col gap-3">
        <Label className="text-muted-foreground">Order Items</Label>

        <div className="flex gap-4 overflow-x-auto pb-2">
          <Card className="min-w-[220px]">
            <CardHeader>
              <CardTitle className="text-base">Item One</CardTitle>
              <CardDescription>Item is good</CardDescription>
            </CardHeader>

            <CardContent className="text-sm text-muted-foreground">
              Quantity: 1
            </CardContent>

            <CardFooter className="text-sm font-medium">
              ₹ 500
            </CardFooter>
          </Card>

          {/* Duplicate Card for more items */}
          <Card className="min-w-[220px]">
            <CardHeader>
              <CardTitle className="text-base">Item Two</CardTitle>
              <CardDescription>Item is good</CardDescription>
            </CardHeader>

            <CardContent className="text-sm text-muted-foreground">
              Quantity: 2
            </CardContent>

            <CardFooter className="text-sm font-medium">
              ₹ 900
            </CardFooter>
          </Card>
        </div>
      </div>

    </div>
  );
}
